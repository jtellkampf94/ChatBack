import styled from "styled-components";
import Image from "next/image";
import ComputerOutlined from "@material-ui/icons/ComputerOutlined";
import React from "react";

import image from "../assets/images/intro-connection-light.jpg";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.globalTheme.smokeGrey};
  border-bottom: 6px solid #25d366;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-width: 560px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.globalTheme.secondaryGreyFont};
`;

const Header = styled.h1`
  margin-top: 28px;
  text-align: center;
  font-size: 32px;
  font-weight: 300;
`;

const TextBody = styled.p`
  margin-top: 18px;
  text-align: center;
  padding-bottom: 34px;
  font-size: 14px;
  border-bottom: 1px solid ${({ theme }) => theme.globalTheme.greyLineColor};
`;

const Footer = styled.div`
  margin-top: 34px;
  font-size: 14px;
  display: flex;
  justify-content: center;
`;

const FooterText = styled.p`
  margin-left: 5px;
`;

const ChatPlaceholder: React.FC = () => {
  return (
    <Container>
      <ContentContainer>
        <Image src={image} width={250} height={250} alt="keep connected" />
        <TextContainer>
          <Header>Keep your phone connected</Header>
          <TextBody>
            WhatsApp connects to your phone to sync messages. To reduce data
            usage, connect your phone to Wi-Fi.
          </TextBody>
          <Footer>
            <ComputerOutlined style={{ fontSize: "20px" }} />
            <FooterText>
              Make calls from desktop with WhatsApp for Windows.
            </FooterText>
          </Footer>
        </TextContainer>
      </ContentContainer>
    </Container>
  );
};

export default ChatPlaceholder;
