import RegisterForm from "../containers/RegisterForm";
import RegisterContainer from "../components/RegisterContainer";
import { userLoggedIn } from "../utils/isUserLoggedIn";

const Register: React.FC = () => {
  return (
    <RegisterContainer>
      <RegisterForm />
    </RegisterContainer>
  );
};

export const getServerSideProps = userLoggedIn;

export default Register;
