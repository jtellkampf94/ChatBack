import styled from "styled-components";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { IconButton, Avatar } from "@material-ui/core";
import GroupAddIcon from "@material-ui/icons/GroupAdd";

import Contact from "../components/Contact";
import SearchBar from "../components/SearchBar";
import QueryResult from "../components/QueryResult";
import { globalTheme } from "../themes/globalTheme";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import {
  useGetContactsQuery,
  useCreateChatMutation,
  ChatFragmentFragmentDoc,
} from "../generated/graphql";

const Container = styled.div``;

const Header = styled.div`
  width: 100%;
  height: 108px;
  background-color: ${({ theme }) => theme.globalTheme.darkGreen};
  color: ${({ theme }) => theme.globalTheme.white};
  padding: 16px 28px;
  display: flex;
  align-items: flex-end;
`;

const Heading = styled.h1`
  font-size: 19px;
  margin-bottom: 5px;
  font-weight: 500;
  margin-left: 27px;
`;

const ContactsList = styled.div`
  width: 100%;
  height: calc(100vh - 238px);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px !important;
    height: 6px !important;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
  }

  &::-webkit-scrollbar-track {
    background: hsla(0, 0%, 100%, 0.1);
  }
`;

const AddToGroup = styled.div`
  padding: 10px 24px 10px 16px;
  height: 77px;
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.globalTheme.greyLineColor};

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.globalTheme.hoverGrey};
  }
`;

const AddToGroupText = styled.p`
  margin-left: 16px;
`;

interface ContactsTabProps {
  onClick: () => void;
  selectChat: (selectedChatId: number) => void;
}

const ContactsTab: React.FC<ContactsTabProps> = ({ onClick, selectChat }) => {
  const { data, loading, error } = useGetContactsQuery();
  const [createChat] = useCreateChatMutation();

  const handleClick = async (contactId: number) => {
    await createChat({
      variables: { userIds: [contactId], limit: 1 },
      update: (cache, { data }) => {
        if (!data) return cache;

        const newChat = data.createChat;

        cache.modify({
          fields: {
            getChats(existingChats = []) {
              const isAlreadyInChat = existingChats.filter(
                // @ts-ignore
                (chat) => Number(chat.id) === Number(newChat.id)
              );

              if (isAlreadyInChat.length === 0) return existingChats;

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
    onClick();
  };

  return (
    <Container>
      <Header>
        <IconButton onClick={onClick} size="small">
          <ArrowBackIcon
            style={{ fill: globalTheme.white, fontSize: "24px" }}
          />
        </IconButton>
        <Heading>New Chat</Heading>
      </Header>

      <SearchBar placeholder="Search in contacts" />

      <AddToGroup>
        <Avatar
          style={{ width: "52px", height: "52px", backgroundColor: "#00a884" }}
        >
          <GroupAddIcon style={{ width: "32px", height: "32px" }} />
        </Avatar>
        <AddToGroupText>New Group</AddToGroupText>
      </AddToGroup>

      <ContactsList>
        <QueryResult loading={loading} error={error}>
          {data?.getContacts.map((contact) => {
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
      </ContactsList>
    </Container>
  );
};

export default ContactsTab;
