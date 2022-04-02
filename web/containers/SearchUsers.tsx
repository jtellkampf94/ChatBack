import { useState, ChangeEvent } from "react";
import { useApolloClient } from "@apollo/client";

import {
  useSearchUsersLazyQuery,
  useGetContactsQuery,
  useAddToContactsMutation,
  useRemoveFromContactsMutation,
  GetContactsQuery,
  GetContactsDocument,
  GetCurrentUserDocument,
} from "../generated/graphql";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import { sortAlphabetically } from "../utils/sortAlphabetically";
import Container from "../components/Container";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import QueryResult from "../components/QueryResult";
import User from "../components/User";
import UserButtons from "../components/UserButtons";
import SearchUsersContainer from "../components/SearchUsersContainer";
import GetMoreUsersButton from "../components/GetMoreUsersButton";

interface SearchUsersProps {
  backToSidebar: () => void;
}

const SearchUsers: React.FC<SearchUsersProps> = ({ backToSidebar }) => {
  const client = useApolloClient();
  const { currentUser } = client.readQuery({ query: GetCurrentUserDocument });
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [searchUsers, { data, loading, error, fetchMore }] =
    useSearchUsersLazyQuery();
  const { data: contactsData } = useGetContactsQuery();
  const [addContact] = useAddToContactsMutation();
  const [removeFromContacts] = useRemoveFromContactsMutation();

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(0);
    await searchUsers({
      variables: { searchTerm: e.target.value, page: 0, limit },
    });
  };

  const handleClick = async () => {
    if (fetchMore) {
      await fetchMore({ variables: { searchTerm, page: page + 1, limit } });
    }
    setPage(page + 1);
  };

  const handleAddToContacts = async (contactId: number) => {
    await addContact({
      variables: { contactId },
      update: (cache, { data }) => {
        if (!data) return cache;

        const contact = data.addToContacts.contact;
        cache.modify({
          fields: {
            getContacts(existingCachedContacts = []) {
              if (existingCachedContacts.length === 0) {
                return [contact];
              }

              const { getContacts } = client.readQuery({
                query: GetContactsDocument,
              });

              const allContacts = [{ ...contact }, ...getContacts];

              sortAlphabetically(allContacts);

              return allContacts;
            },
          },
        });
      },
    });
  };

  const handleRemoveFromContacts = async (contactId: number) => {
    await removeFromContacts({
      variables: { contactId },
      update(cache, { data }) {
        if (!data) return cache;

        cache.modify({
          fields: {
            getContacts(existingContacts) {
              const { getContacts } = client.readQuery({
                query: GetContactsDocument,
              });

              return getContacts.filter(
                (contact: GetContactsQuery["getContacts"][0]) =>
                  Number(contact.id) !== contactId
              );
            },
          },
        });
      },
    });
  };

  return (
    <Container>
      <Header heading="Search users" onClick={backToSidebar} />
      <SearchBar
        onChange={handleChange}
        value={searchTerm}
        placeholder="Search for users"
      />
      <SearchUsersContainer>
        <QueryResult loading={loading} error={error}>
          {contactsData &&
            data?.searchUsers.users.map((user) => {
              return (
                <User
                  key={`searched-user-id-${user.id}`}
                  username={user.username}
                  name={`${capitalizeFirstLetter(
                    user.firstName
                  )} ${capitalizeFirstLetter(user.lastName)}`}
                  profilePictureUrl={
                    user.profilePictureUrl ? user.profilePictureUrl : undefined
                  }
                >
                  <UserButtons
                    addContact={() => handleAddToContacts(Number(user.id))}
                    removeContact={() =>
                      handleRemoveFromContacts(Number(user.id))
                    }
                    isContact={
                      !!contactsData.getContacts.find(
                        (contact) => Number(contact.id) === Number(user.id)
                      )
                    }
                    isCurrentUser={Number(user.id) === Number(currentUser.id)}
                  />
                </User>
              );
            })}
        </QueryResult>

        {data?.searchUsers.hasMore && (
          <GetMoreUsersButton onClick={handleClick}>More</GetMoreUsersButton>
        )}
      </SearchUsersContainer>
    </Container>
  );
};

export default SearchUsers;
