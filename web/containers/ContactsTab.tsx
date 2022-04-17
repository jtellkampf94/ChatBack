import { useState, ChangeEvent } from "react";

import Contact from "../components/Contact";
import Container from "../components/Container";
import SearchBar from "../components/SearchBar";
import QueryResult from "../components/QueryResult";
import Header from "../components/Header";
import AddToGroup from "../components/AddToGroup";
import ContactsListContainer from "../components/ContactsListContainer";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import {
  useGetContactsQuery,
  useCreateChatMutation,
  ChatFragmentFragmentDoc,
  GetChatsDocument,
  GetChatsQuery,
} from "../generated/graphql";

interface ContactsTabProps {
  backToSidebar: () => void;
  toGroupParticipants: () => void;
  selectChat: (selectedChatId: number) => void;
}

const ContactsTab: React.FC<ContactsTabProps> = ({
  backToSidebar,
  selectChat,
  toGroupParticipants,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, loading, error } = useGetContactsQuery();
  const [createChat] = useCreateChatMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClick = async (contactId: number) => {
    await createChat({
      variables: { userIds: [contactId], limit: 1 },
      update: (cache, { data }) => {
        if (!data) return cache;

        const newChat = data.createChat;

        cache.modify({
          fields: {
            getChats(existingChats = [], { readField }) {
              const isAlreadyInChat = existingChats.filter(
                // @ts-ignore
                (chat) => Number(readField("id", chat)) === Number(newChat.id)
              );

              if (isAlreadyInChat.length === 1) return existingChats;

              const newChatRef = cache.writeFragment({
                data: newChat,
                fragment: ChatFragmentFragmentDoc,
              });

              return [...existingChats, newChatRef];
            },
          },
        });
        selectChat(Number(newChat.id));
      },
    });
    backToSidebar();
  };

  const handleToGroupParticipants = () => {
    if (data?.getContacts) {
      toGroupParticipants();
    }
  };

  return (
    <Container>
      <Header onClick={backToSidebar} heading="New Chat" />
      <SearchBar
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search in contacts"
      />
      <AddToGroup onClick={handleToGroupParticipants} />

      <ContactsListContainer>
        <QueryResult loading={loading} error={error}>
          {data?.getContacts
            .filter(
              (contact) =>
                contact.firstName.includes(searchTerm) ||
                contact.lastName.includes(searchTerm)
            )
            .map((contact) => {
              return (
                <Contact
                  key={`contactId-${contact.id}`}
                  firstName={capitalizeFirstLetter(contact.firstName)}
                  lastName={capitalizeFirstLetter(contact.lastName)}
                  about={contact.about}
                  profilePictureUrl={contact.profilePictureUrl}
                  onClick={() => handleClick(Number(contact.id))}
                />
              );
            })}
        </QueryResult>
      </ContactsListContainer>
    </Container>
  );
};

export default ContactsTab;
