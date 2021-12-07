import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import GroupIcon from "@material-ui/icons/Group";
import Moment from "react-moment";

import { GetChatsQuery } from "../generated/graphql";
import { isSameDay, getDifferenceInDays } from "../utils/dateFunctions";
import { useChatId } from "../context/ChatContext";

const Container = styled("div")<{ highlighted: boolean }>`
  width: 100%;
  height: 77px;
  padding: 10px 24px 10px 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.globalTheme.greyLineColor};
  background-color: ${(props) =>
    props.highlighted ? props.theme.globalTheme.selectGrey : "white"};

  &:hover {
    cursor: pointer;
    background-color: ${(props) =>
      props.highlighted
        ? props.theme.globalTheme.selectGrey
        : props.theme.globalTheme.hoverGrey};
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
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  align-self: start;
  font-size: 12px;
  color: ${({ theme }) => theme.globalTheme.greyMessageColor};
  font-weight: 300;
  width: 75px;
`;

interface ChatProps {
  chat: GetChatsQuery["getChats"][0];
  userId: number;
}

const Chat: React.FC<ChatProps> = ({ chat, userId }) => {
  const { chatId, setChatId } = useChatId();
  const isGroupChat = chat.members.length > 2;
  const otherUser = chat.members.filter(
    (member) => Number(member.id) !== userId
  );
  const nowDate = new Date();
  const latestMessageDate = new Date(chat.latestMessage?.createdAt);
  let dateFormat;

  if (isSameDay(nowDate, latestMessageDate)) {
    dateFormat = (
      <Moment format="HH:mm">{chat.latestMessage?.createdAt}</Moment>
    );
  } else if (
    getDifferenceInDays(nowDate, latestMessageDate) < 1 &&
    nowDate.getDay() !== latestMessageDate.getDay()
  ) {
    dateFormat = "Yesterday";
  } else {
    dateFormat = (
      <Moment format="DD-MM-YYYY">{chat.latestMessage?.createdAt}</Moment>
    );
  }

  const handleClick = () => {
    if (setChatId) {
      setChatId(Number(chat.id));
    }
  };

  return (
    <Container highlighted={chatId === Number(chat.id)} onClick={handleClick}>
      {isGroupChat ? (
        <Avatar style={{ width: "52px", height: "52px" }}>
          <GroupIcon style={{ width: "40px", height: "40px" }} />
        </Avatar>
      ) : (
        <Avatar style={{ width: "52px", height: "52px" }} />
      )}
      <TextContainer>
        <Name>{isGroupChat ? chat.groupName : otherUser[0].username}</Name>
        <LastMessage>{chat.latestMessage?.text}</LastMessage>
      </TextContainer>
      <TimeOfLastMessage>{dateFormat}</TimeOfLastMessage>
    </Container>
  );
};

export default Chat;
