import styled from "styled-components";
import { IconButton, Avatar } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import AddAPhotoOutlinedIcon from "@material-ui/icons/AddAPhotoOutlined";
import SendIcon from "@material-ui/icons/Send";

import { globalTheme } from "../themes/globalTheme";
import Message from "./Message";

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

const MessagesContainer = styled.div`
  background-color: ${({ theme }) => theme.globalTheme.chatScreenBackground};
  height: calc(100vh - 144px);
  overflow-y: scroll;

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

const ChatBox = styled.div`
  height: 77px;
  padding: 10px 17px;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.globalTheme.chatBoxBackground};
  border-top: 1px solid ${({ theme }) => theme.globalTheme.greyLineColor};
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

const ChatScreen: React.FC = () => {
  return (
    <Container>
      <Header>
        <IconsContainer>
          <UserAvatar
            style={{
              width: "44px",
              height: "44px",
            }}
          />
          <Name>Jonathan Tellkampf</Name>
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
        <Message read />
      </MessagesContainer>

      <ChatBox>
        <AddAPhotoOutlinedIcon
          style={{ fill: globalTheme.iconColor, width: "30px", height: "30px" }}
        />
        <MessageInput placeholder="Type a message" />
        <SendIcon
          style={{ fill: globalTheme.iconColor, width: "30px", height: "30px" }}
        />
      </ChatBox>
    </Container>
  );
};

export default ChatScreen;
