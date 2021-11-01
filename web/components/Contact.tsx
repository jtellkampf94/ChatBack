import styled from "styled-components";
import { Avatar } from "@material-ui/core";

const Container = styled.div`
  width: 100%;
  height: 77px;
  padding: 10px 24px 10px 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.globalTheme.greyLineColor};

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.globalTheme.primaryGrey};
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  justify-content: space-between;
  width: 100%;
`;

const Name = styled.p`
  font-size: 20px;
  font-weight: 400;
`;

const LastMessage = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.globalTheme.greyMessageColor};
  font-weight: 300;
`;

const TimeOfLastMessage = styled.div`
  margin-top: 10px;
  align-self: start;
  font-size: 12px;
  color: ${({ theme }) => theme.globalTheme.greyMessageColor};
  font-weight: 300;
`;

const Contact: React.FC = () => {
  return (
    <Container>
      <Avatar style={{ width: "52px", height: "52px" }} />
      <TextContainer>
        <Name>Jonathan Tellkampf</Name>
        <LastMessage>Tant que je puis</LastMessage>
      </TextContainer>
      <TimeOfLastMessage>12:33</TimeOfLastMessage>
    </Container>
  );
};

export default Contact;
