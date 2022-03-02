import styled from "styled-components";
import Head from "next/head";

import WhatsAppLogo from "../assets/images/whats-app-logo.svg";
import LoginForm from "../containers/LoginForm";
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
  margin-bottom: 20px;
`;

const IconsContainer = styled.div`
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

const Login: React.FC = () => {
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
        <LoginForm />
      </LoginSection>
    </Container>
  );
};

export default Login;
