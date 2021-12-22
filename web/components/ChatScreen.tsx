import { useRef, useState } from "react";
import styled from "styled-components";
import { IconButton, Avatar } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import AddAPhotoOutlinedIcon from "@material-ui/icons/AddAPhotoOutlined";
import SendIcon from "@material-ui/icons/Send";
import GroupIcon from "@material-ui/icons/Group";

import { globalTheme } from "../themes/globalTheme";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import { getRandomColor } from "../utils/getRandomColor";
import Message from "./Message";

import {
  useGetChatQuery,
  useGetMessagesQuery,
  GetChatQuery,
  useSendMessageMutation,
} from "../generated/graphql";
import { useUser } from "../context/UserContext";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Header = styled.div`
  padding: 10px 17px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 67px;
  background-color: ${({ theme }) => theme.globalTheme.primaryGrey};
  border-bottom: 1px solid ${({ theme }) => theme.globalTheme.greyLineColor};
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const Name = styled.p`
  font-size: 19px;
  font-weight: 400;
  margin-left: 17px;
`;

const EndOfMessage = styled.div``;

const MessagesContainer = styled.div`
  background-color: ${({ theme }) => theme.globalTheme.chatScreenBackground};
  height: calc(100vh - 144px);
  overflow-y: scroll;
  display: flex;
  flex-direction: column-reverse;
  padding: 0 9%;

  &::-webkit-scrollbar {
    width: 6px !important;
    height: 6px !important;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
  }

  &::-webkit-scrollbar-track {
    background: hsla(0, 0%, 100%, 0.1);
  }
`;

const ChatBox = styled.form`
  height: 77px;
  padding: 10px 17px;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.globalTheme.chatBoxBackground};
  border-top: 1px solid ${({ theme }) => theme.globalTheme.greyLineColor};
  width: 100%;
`;

const MessageInput = styled.input`
  outline-width: 0;
  padding-left: 17px;
  border: none;
  width: 100%;
  margin: 0 17px;
  font-size: 16px;
  height: 36px;
  border-radius: 18px;

  &::placeholder {
    color: ${({ theme }) => theme.globalTheme.greyFontColor};
  }
`;

interface ChatScreenProps {
  chatId: number;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ chatId }) => {
  const endOfMessageRef = useRef<null | HTMLDivElement>(null);
  const [messageText, setMessageText] = useState("");
  const { data, loading, error } = useGetChatQuery({ variables: { chatId } });
  const {
    data: messageData,
    loading: messageLoading,
    error: messageError,
  } = useGetMessagesQuery({ variables: { chatId } });
  const { user } = useUser();

  const userId = user ? Number(user.id) : null;
  const isGroupChat = data ? data.getChat.members.length > 2 : null;

  const chatMembersMap: {
    [key: number]: {
      member: GetChatQuery["getChat"]["members"][0];
      color: string;
    };
  } = {};

  data?.getChat.members.forEach((member) => {
    chatMembersMap[Number(member.id)] = { member, color: getRandomColor() };
  });

  const scrollToBottom = () => {
    endOfMessageRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSubmit = () => {
    useSendMessageMutation({ variables: { chatId, text: messageText } });
    scrollToBottom();
  };

  return (
    <Container>
      <Header>
        <IconsContainer>
          {!isGroupChat ? (
            <UserAvatar
              style={{
                width: "44px",
                height: "44px",
              }}
            />
          ) : (
            <UserAvatar
              style={{
                width: "44px",
                height: "44px",
              }}
            >
              <GroupIcon style={{ width: "34px", height: "34px" }} />
            </UserAvatar>
          )}
          <Name>
            {userId && isGroupChat
              ? data?.getChat.groupName
              : data?.getChat.members.filter(
                  (member) => Number(member.id) !== userId
                )[0].username}
          </Name>
        </IconsContainer>

        <IconsContainer>
          <IconButton>
            <SearchIcon style={{ fill: globalTheme.iconColor }} />
          </IconButton>
          <IconButton>
            <MoreVertIcon style={{ fill: globalTheme.iconColor }} />
          </IconButton>
        </IconsContainer>
      </Header>

      <MessagesContainer>
        {messageData &&
          messageData.getMessages?.map((message) => {
            const isUser = userId === Number(message.userId);
            const isChatMembersMapEmpty =
              Object.keys(chatMembersMap).length === 0;
            const messageUserId = Number(message.userId);
            return (
              <Message
                key={message.id}
                text={message.text}
                isUser={isUser}
                sender={
                  !isUser && !isChatMembersMapEmpty
                    ? `${capitalizeFirstLetter(
                        chatMembersMap[messageUserId].member.firstName
                      )} ${capitalizeFirstLetter(
                        chatMembersMap[messageUserId].member.lastName
                      )}`
                    : undefined
                }
                color={
                  !isUser && !isChatMembersMapEmpty
                    ? chatMembersMap[messageUserId].color
                    : undefined
                }
                read
              />
            );
          })}
        <EndOfMessage ref={endOfMessageRef} />
      </MessagesContainer>

      <ChatBox onSubmit={handleSubmit}>
        <AddAPhotoOutlinedIcon
          style={{ fill: globalTheme.iconColor, width: "30px", height: "30px" }}
        />
        <MessageInput
          onChange={(e) => setMessageText(e.target.value)}
          value={messageText}
          placeholder="Type a message"
        />
        <SendIcon
          style={{ fill: globalTheme.iconColor, width: "30px", height: "30px" }}
        />
      </ChatBox>
    </Container>
  );
};

export default ChatScreen;
