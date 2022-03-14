import styled from "styled-components";

import Header from "../components/Header";

interface SearchUsersProps {
  backToSidebar: () => void;
}

const Container = styled.div``;

const SearchUsers: React.FC<SearchUsersProps> = ({ backToSidebar }) => {
  return (
    <Container>
      <Header heading="Search users" onClick={backToSidebar} />
    </Container>
  );
};

export default SearchUsers;
