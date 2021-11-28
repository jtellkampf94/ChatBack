import styled from "styled-components";
import { Avatar } from "@material-ui/core";

import { GetChatsQuery } from "../generated/graphql";

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
  font-size: 19px;
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

interface ChatProps {
  chat: GetChatsQuery["getChats"][0];
  userId: number;
}

const Chat: React.FC<ChatProps> = ({ chat, userId }) => {
  const isGroupChat = chat.members.length > 2;
  const otherUser = chat.members.filter(
    (member) => Number(member.id) !== userId
  );

  return (
    <Container>
      <Avatar style={{ width: "52px", height: "52px" }} />
      <TextContainer>
        <Name>{isGroupChat ? chat.groupName : otherUser[0].username}</Name>
        <LastMessage>{chat.latestMessage?.text}</LastMessage>
      </TextContainer>
      <TimeOfLastMessage>{chat.latestMessage?.createdAt}</TimeOfLastMessage>
    </Container>
  );
};

export default Chat;
