import styled from "styled-components";
import { useApolloClient } from "@apollo/client";

import Header from "../components/Header";
import ContactsContainer from "../components/ContactsContainer";
import Contact from "../components/Contact";
import { GetContactsDocument, GetContactsQuery } from "../generated/graphql";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";

const Container = styled.div``;

const AddBlock = styled.div`
  height: 77px;
  width: 100%;
`;

interface AddGroupParticipantsProps {}

const AddGroupParticipants: React.FC<AddGroupParticipantsProps> = () => {
  const client = useApolloClient();
  const { getContacts } = client.readQuery({
    query: GetContactsDocument,
  });
  return (
    <Container>
      <Header onClick={() => {}} heading="Add group participants" />
      <AddBlock></AddBlock>
      <ContactsContainer>
        {getContacts.map((contact: GetContactsQuery["getContacts"][0]) => {
          return (
            <Contact
              key={`contactId-${contact.id}`}
              firstName={capitalizeFirstLetter(contact.firstName)}
              lastName={capitalizeFirstLetter(contact.lastName)}
              about={contact.about}
              profilePictureUrl={contact.profilePictureUrl}
              onClick={() => {}}
            />
          );
        })}
      </ContactsContainer>
    </Container>
  );
};

export default AddGroupParticipants;
