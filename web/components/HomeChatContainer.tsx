import styled from "styled-components";

const Container = styled.div`
  flex: 60%;
  position: relative;
  ${({ theme }) => theme.homePageTheme.mediumScreen`
    flex: 65%;
  `};
`;

const HomeChatContainer: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default HomeChatContainer;
