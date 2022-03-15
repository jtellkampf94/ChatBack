import { useState, ChangeEvent, useEffect } from "react";
import styled from "styled-components";

import { useSearchUsersLazyQuery } from "../generated/graphql";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import QueryResult from "../components/QueryResult";

interface SearchUsersProps {
  backToSidebar: () => void;
}

const Container = styled.div``;

const SearchUsers: React.FC<SearchUsersProps> = ({ backToSidebar }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [searchUsers, { data, loading, error, fetchMore }] =
    useSearchUsersLazyQuery();

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    await searchUsers({
      variables: { searchTerm: e.target.value, page, limit },
    });
  };

  const handleClick = async () => {
    if (fetchMore) {
      await fetchMore({ variables: { searchTerm, page, limit } });
    }
  };

  return (
    <Container>
      <Header heading="Search users" onClick={backToSidebar} />
      <SearchBar
        onChange={handleChange}
        value={searchTerm}
        placeholder="Search for users"
      />
      <QueryResult loading={loading} error={error}>
        {data?.searchUsers.users.map((user) => user.username)}
      </QueryResult>
      {data?.searchUsers.hasMore && <button onClick={handleClick}>More</button>}
    </Container>
  );
};

export default SearchUsers;
