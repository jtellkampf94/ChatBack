import styled from "styled-components";

import WhatsAppLogo from "../assets/images/whats-app-logo.svg";
import DownloadOnTheAppStoreLogo from "./DownloadOnTheAppStoreLogo";
import GooglePlayDownloadLogo from "./GooglePlayDownloadLogo";

const Container = styled.div`
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

const LoginHeaderSection: React.FC = () => {
  return (
    <Container>
      <WhatsAppLogo />
      <Heading>
        Simple. Secure. <br /> Reliable Messaging.
      </Heading>
      <Subheading>
        With WhatsApp web, you<span>&#39;</span>ll get fast, simple and secure
        messaging on your laptop or desktop.
      </Subheading>
      <HeaderSectionFooter>
        <FooterText>Get the app.</FooterText>
        <IconsContainer>
          <DownloadOnTheAppStoreLogo width="136px" height="40px" />
          <GooglePlayDownloadLogo width={150} height={44} />
        </IconsContainer>
      </HeaderSectionFooter>
    </Container>
  );
};

export default LoginHeaderSection;
