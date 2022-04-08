import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const HomePageContainer: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default HomePageContainer;
