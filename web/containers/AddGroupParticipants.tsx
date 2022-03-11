import { useState, ChangeEvent, Dispatch, SetStateAction } from "react";
import { useApolloClient } from "@apollo/client";

import ParticipantsContainer from "../components/ParticipantsContainer";
import Header from "../components/Header";
import ContactsContainer from "../components/ContactsContainer";
import Contact from "../components/Contact";
import ContactChip from "../components/ContactChip";
import GroupParticipants from "../components/GroupParticipants";
import NextButton from "../components/NextButton";

import { GetContactsDocument } from "../generated/graphql";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import { ContactType } from "../pages";

interface AddGroupParticipantsProps {
  toContactsTab: () => void;
  toCreateGroup: () => void;
  selectedContacts: ContactType[];
  setSelectedContacts: Dispatch<SetStateAction<ContactType[]>>;
}

const AddGroupParticipants: React.FC<AddGroupParticipantsProps> = ({
  toContactsTab,
  toCreateGroup,
  selectedContacts,
  setSelectedContacts,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const client = useApolloClient();
  const { getContacts } = client.readQuery({
    query: GetContactsDocument,
  });

  const filteredContacts = (searchTerm: string): ContactType[] => {
    return getContacts.filter((contact: ContactType) => {
      if (!searchTerm) return contact;
      return (
        contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  };

  const handleSelectContact = (contact: ContactType) => {
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
    <ParticipantsContainer>
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
                profilePictureUrl={
                  contact.profilePictureUrl
                    ? contact.profilePictureUrl
                    : undefined
                }
              />
            );
          })}
      </GroupParticipants>
      <ContactsContainer>
        {filteredContacts(searchTerm).map((contact: ContactType) => {
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
      {selectedContacts.length > 0 && <NextButton onClick={toCreateGroup} />}
    </ParticipantsContainer>
  );
};

export default AddGroupParticipants;
