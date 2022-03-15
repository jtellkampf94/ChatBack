import { useState, ChangeEvent } from "react";

import { useSearchUsersLazyQuery } from "../generated/graphql";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import Container from "../components/Container";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import QueryResult from "../components/QueryResult";
import User from "../components/User";
import SearchUsersContainer from "../components/SearchUsersContainer";

interface SearchUsersProps {
  backToSidebar: () => void;
}

const SearchUsers: React.FC<SearchUsersProps> = ({ backToSidebar }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [searchUsers, { data, loading, error, fetchMore }] =
    useSearchUsersLazyQuery();

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

  const handleAddToContacts = async (contactId: number) => {};

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
          {data?.searchUsers.users.map((user) => {
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
                onClick={() => handleAddToContacts(Number(user.id))}
              />
            );
          })}
        </QueryResult>

        {data?.searchUsers.hasMore && (
          <button onClick={handleClick}>More</button>
        )}
      </SearchUsersContainer>
    </Container>
  );
};

export default SearchUsers;
