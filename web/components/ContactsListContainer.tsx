import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 238px);
  overflow-y: scroll;
  flex: 1;

  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 6px !important;
    height: 6px !important;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
  }

  &::-webkit-scrollbar-track {
    background: hsla(0, 0%, 100%, 0.1);
  }
`;

const ContactsListContainer: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default ContactsListContainer;
