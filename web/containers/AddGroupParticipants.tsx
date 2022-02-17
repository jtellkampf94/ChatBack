import { useState, ChangeEvent } from "react";
import styled from "styled-components";
import { useApolloClient } from "@apollo/client";

import Header from "../components/Header";
import ContactsContainer from "../components/ContactsContainer";
import Contact from "../components/Contact";
import ContactChip from "../components/ContactChip";
import GroupParticipants from "../components/GroupParticipants";

import { GetContactsDocument, GetContactsQuery } from "../generated/graphql";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

type Contact = GetContactsQuery["getContacts"][0];

interface AddGroupParticipantsProps {
  toContactsTab: () => void;
}

const AddGroupParticipants: React.FC<AddGroupParticipantsProps> = ({
  toContactsTab,
}) => {
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const client = useApolloClient();
  const { getContacts } = client.readQuery({
    query: GetContactsDocument,
  });

  const filteredContacts = (searchTerm: string): Contact[] => {
    return getContacts.filter((contact: Contact) => {
      if (!searchTerm) return contact;
      return (
        contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  };

  const handleSelectContact = (contact: Contact) => {
    const isDuplicate = selectedContacts.find(
      (c) => Number(c.id) === Number(contact.id)
    );
    if (isDuplicate) return;
    setSelectedContacts([...selectedContacts, contact]);
    setSearchTerm("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleRemoveFromSelectedContacts = (contactId: number) => {
    const newContacts = selectedContacts.filter(
      (contact) => Number(contact.id) !== contactId
    );
    setSelectedContacts(newContacts);
  };

  return (
    <Container>
      <Header onClick={toContactsTab} heading="Add group participants" />
      <GroupParticipants onChange={handleChange} value={searchTerm}>
        {selectedContacts.length > 0 &&
          selectedContacts.map((contact) => {
            return (
              <ContactChip
                key={`selectedContactId-${contact.id}`}
                onDelete={() =>
                  handleRemoveFromSelectedContacts(Number(contact.id))
                }
                name={`${capitalizeFirstLetter(
                  contact.firstName
                )} ${capitalizeFirstLetter(contact.lastName)}`}
              />
            );
          })}
      </GroupParticipants>
      <ContactsContainer>
        {filteredContacts(searchTerm).map((contact: Contact) => {
          return (
            <Contact
              key={`contactId-${contact.id}`}
              firstName={capitalizeFirstLetter(contact.firstName)}
              lastName={capitalizeFirstLetter(contact.lastName)}
              about={contact.about}
              profilePictureUrl={contact.profilePictureUrl}
              onClick={() => handleSelectContact(contact)}
            />
          );
        })}
      </ContactsContainer>
    </Container>
  );
};

export default AddGroupParticipants;
