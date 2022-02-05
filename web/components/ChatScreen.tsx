import { MutableRefObject } from "react";
import styled from "styled-components";
import { IconButton, Avatar } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import GroupIcon from "@material-ui/icons/Group";

import { globalTheme } from "../themes/globalTheme";

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 77px);
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

interface ChatScreenProps {
  name: string;
  isGroupChat: boolean;
  endOfMessageRef: MutableRefObject<HTMLDivElement | null>;
}

const ChatScreen: React.FC<ChatScreenProps> = ({
  name,
  isGroupChat,
  endOfMessageRef,
  children,
}) => {
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
          <Name>{name}</Name>
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
        <EndOfMessage ref={endOfMessageRef} />
        {children}
      </MessagesContainer>
    </Container>
  );
};

export default ChatScreen;
