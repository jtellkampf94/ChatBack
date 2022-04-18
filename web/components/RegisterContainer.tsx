import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  flex-direction: column;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.globalTheme.smokeGrey};
`;

const RegisterContainer: React.FC = ({ children }) => (
  <Container>{children}</Container>
);

export default RegisterContainer;
