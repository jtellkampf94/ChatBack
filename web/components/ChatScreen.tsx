import { MutableRefObject } from "react";
import styled from "styled-components";
import { Avatar, IconButton } from "@material-ui/core";
import GroupIcon from "@material-ui/icons/Group";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import ChatScreenBackground from "../assets/images/chat-section-background.png";
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
  background-image: url(${ChatScreenBackground.src});
  background-color: ${({ theme }) => theme.globalTheme.chatScreenBackground};
  height: calc(100vh - 144px);
  overflow-y: scroll;
  display: flex;
  flex-direction: column-reverse;
  padding: 0 9%;

  scrollbar-width: thin;

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

const BackButtonContainer = styled.div`
  margin-right: 10px;
`;

interface ChatScreenProps {
  name: string;
  isGroupChat: boolean;
  endOfMessageRef: MutableRefObject<HTMLDivElement | null>;
  groupAvatarUrl?: string;
  profilePictureUrl?: string;
  isSmallScreen: boolean;
  onClick: () => void;
}

const ChatScreen: React.FC<ChatScreenProps> = ({
  name,
  isGroupChat,
  endOfMessageRef,
  groupAvatarUrl,
  profilePictureUrl,
  children,
  isSmallScreen,
  onClick,
}) => {
  return (
    <Container>
      <Header>
        <IconsContainer>
          {isSmallScreen && (
            <BackButtonContainer>
              <IconButton onClick={onClick} size="small">
                <ArrowBackIcon
                  style={{ fill: globalTheme.greyFontColor, fontSize: "24px" }}
                />
              </IconButton>
            </BackButtonContainer>
          )}
          {!isGroupChat ? (
            <UserAvatar
              style={{
                width: "44px",
                height: "44px",
              }}
              src={profilePictureUrl}
            />
          ) : (
            <UserAvatar
              style={{
                width: "44px",
                height: "44px",
              }}
              src={groupAvatarUrl}
            >
              <GroupIcon style={{ width: "34px", height: "34px" }} />
            </UserAvatar>
          )}
          <Name>{name}</Name>
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
