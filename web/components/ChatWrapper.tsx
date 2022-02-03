import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  flex: 60%;
  ${({ theme }) => theme.homePageTheme.mediumScreen`
    flex: 65%;
  `};
`;

const ChatWrapper: React.FC = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default ChatWrapper;
