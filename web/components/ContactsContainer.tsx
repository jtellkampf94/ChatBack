import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  overflow-y: auto;
  flex: 1;

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

const ContactsContainer: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default ContactsContainer;
