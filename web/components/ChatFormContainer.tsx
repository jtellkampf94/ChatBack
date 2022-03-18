import styled from "styled-components";

const Container = styled.div`
  background-color: ${({ theme }) => theme.globalTheme.chatBoxBackground};
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid ${({ theme }) => theme.globalTheme.greyLineColor};
  border-bottom: 1px solid ${({ theme }) => theme.globalTheme.greyLineColor};
`;

const ChatFormContainer: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default ChatFormContainer;
