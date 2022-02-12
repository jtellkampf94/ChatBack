import styled from "styled-components";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { IconButton } from "@material-ui/core";

import Contact from "../components/Contact";
import SearchBar from "../components/SearchBar";
import { globalTheme } from "../themes/globalTheme";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import { useGetContactsQuery } from "../generated/graphql";

const Container = styled.div``;

const Header = styled.div`
  width: 100%;
  height: 108px;
  background-color: #008069;
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

const ContactsList = styled.div``;

interface ContactsTabProps {
  onClick: () => void;
}

const ContactsTab: React.FC<ContactsTabProps> = ({ onClick }) => {
  const { data, loading, error } = useGetContactsQuery();

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

      <ContactsList>
        {data?.getContacts.map((contact) => {
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
      </ContactsList>
    </Container>
  );
};

export default ContactsTab;
