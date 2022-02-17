import styled from "styled-components";
import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import SearchBar from "./SearchBar";
import { globalTheme } from "../themes/globalTheme";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.globalTheme.primaryGrey};
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  height: 67px;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ChatContainer = styled.div`
  width: 100%;
  height: calc(100vh - 120px);
  overflow-y: auto;

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

interface SidebarProps {
  toContactsTab: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ children, toContactsTab }) => {
  return (
    <Container>
      <Header>
        <UserAvatar
          style={{
            width: "44px",
            height: "44px",
          }}
        />

        <IconsContainer>
          <IconButton onClick={toContactsTab}>
            <ChatIcon style={{ fill: globalTheme.iconColor }} />
          </IconButton>
          <IconButton>
            <MoreVertIcon style={{ fill: globalTheme.iconColor }} />
          </IconButton>
        </IconsContainer>
      </Header>

      <SearchBar placeholder="Search in chats" />
      <ChatContainer>{children}</ChatContainer>
    </Container>
  );
};

export default Sidebar;
