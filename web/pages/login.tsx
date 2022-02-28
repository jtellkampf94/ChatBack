import { useState, Fragment, FormEvent } from "react";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import Head from "next/head";
import { useRouter } from "next/router";

import { useLoginMutation } from "../generated/graphql";
import WhatsAppLogo from "../assets/images/whats-app-logo.svg";
import DownloadOnTheAppStoreLogo from "../components/DownloadOnTheAppStoreLogo";
import GooglePlayDownloadLogo from "../components/GooglePlayDownloadLogo";

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
  color: ${({ theme }) => theme.globalTheme.white};
  padding: 100px;
  background-color: ${({ theme }) => theme.globalTheme.darkGreen};
`;

const Heading = styled.h1`
  font-size: 32px;
  font-weight: 600;
  margin-top: 40px;
`;

const Subheading = styled.h4`
  font-size: 18px;
  font-weight: 300;
  margin-top: 10px;
`;

const HeaderSectionFooter = styled.div`
  margin-top: 40px;
`;

const FooterText = styled.p`
  font-size: 18px;
  font-weight: 300;
`;

const IconsContainer = styled.div`
  margin-top: 10px;
  height: 50px;
  display: flex;
  align-items: center;
`;

const LoginSection = styled.div`
  width: 45%;
  height: 100%;
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
        <WhatsAppLogo />
        <Heading>
          Simple. Secure. <br /> Reliable Messaging.
        </Heading>
        <Subheading>
          With WhatsApp web, you'll get fast, simple and secure messaging on
          your laptop or desktop.
        </Subheading>
        <HeaderSectionFooter>
          <FooterText>Get the app.</FooterText>
          <IconsContainer>
            <DownloadOnTheAppStoreLogo width="136px" height="40px" />
            <GooglePlayDownloadLogo width={150} height={44} />
          </IconsContainer>
        </HeaderSectionFooter>
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
