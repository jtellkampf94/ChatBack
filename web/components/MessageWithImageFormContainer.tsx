import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 67px;
  width: 100%;
  height: calc(100vh - 67px);
  background-color: #e9edef;
`;

const MessageWithImageFormContainer: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default MessageWithImageFormContainer;
