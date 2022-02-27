import { useState, Fragment, FormEvent } from "react";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import Head from "next/head";
import { useRouter } from "next/router";

import { useLoginMutation } from "../generated/graphql";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: ${({ theme }) => theme.globalTheme.white};
`;

const HeaderSection = styled.div`
  width: 55%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 100px;
`;

const Heading = styled.h1``;

const Subheading = styled.h4``;

const HeaderSectionFooter = styled.div``;

const LoginSection = styled.div`
  width: 45%;
  height: 100%;
  background-color: ${({ theme }) => theme.globalTheme.darkGreen};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled.div`
  padding: 100px;
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 5px;
`;

const Logo = styled.img`
  height: 50px;
  width: 50px;
`;

const Login: React.FC = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, { loading, data, error }] = useLoginMutation();
  const router = useRouter();

  const handleClick = () => {};

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login({
      variables: { options: { emailOrUsername, password } },
    });
    router.push("/");
  };

  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>

      <HeaderSection>
        <Logo src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png" />
        <Heading>Simple. Secure. Reliable Messaging.</Heading>
        <Subheading>
          With WhatsApp web, you'll get fast, simple and secure messaging on
          your laptop or desktop.
        </Subheading>
        <HeaderSectionFooter></HeaderSectionFooter>
      </HeaderSection>

      <LoginSection>
        <LoginContainer>
          {loading ? (
            "loading..."
          ) : (
            <Fragment>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="emailOrUsername"
                  placeholder="Email Or Username"
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="outlined" type="submit" onClick={handleClick}>
                  Sign in
                </Button>
              </form>
            </Fragment>
          )}
        </LoginContainer>
      </LoginSection>
    </Container>
  );
};

export default Login;
