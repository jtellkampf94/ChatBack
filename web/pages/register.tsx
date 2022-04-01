import styled from "styled-components";

import RegisterForm from "../containers/RegisterForm";
import { userLoggedIn } from "../utils/isUserLoggedIn";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.globalTheme.smokeGrey};
  flex-direction: column;
`;

const Register: React.FC = () => {
  return (
    <Container>
      <RegisterForm />
    </Container>
  );
};

export const getServerSideProps = userLoggedIn;

export default Register;
