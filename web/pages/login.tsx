import { NextPage } from "next";
import Head from "next/head";
import { useMediaQuery } from "react-responsive";

import LoginForm from "../containers/LoginForm";
import LoginContainer from "../components/LoginContainer";
import LoginHeaderSection from "../components/LoginHeaderSection";
import LoginFormContainer from "../components/LoginFormContainer";
import { userLoggedIn } from "../utils/isUserLoggedIn";

const Login: NextPage = () => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 880px)" });
  return (
    <LoginContainer>
      <Head>
        <title>Login</title>
      </Head>

      {!isSmallScreen && <LoginHeaderSection />}

      <LoginFormContainer>
        <LoginForm />
      </LoginFormContainer>
    </LoginContainer>
  );
};

export const getServerSideProps = userLoggedIn;

export default Login;
