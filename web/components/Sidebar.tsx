import styled from "styled-components";
import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";

import Chat from "./Chat";
import { globalTheme } from "../themes/globalTheme";

const Container = styled.div`
  width: 100%;
  height: 100%;
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

const IconsContainer = styled.div``;

const Search = styled.div`
  display: flex;
  align-items: center;
  height: 53px;
  padding: 7px 14px;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.globalTheme.searchBarColor};
  border-bottom: 1px solid ${({ theme }) => theme.globalTheme.greyLineColor};
`;

const SearchBar = styled.div`
  background-color: white;
  border-radius: 18px;
  width: 100%;
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0 20px;
`;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
  width: 100%;
  font-size: 15px;
  margin-left: 20px;
  height: 20px;
  &::placeholder {
    color: ${({ theme }) => theme.globalTheme.greyFontColor};
  }
`;

const ChatContainer = styled.div`
  width: 100%;
  height: calc(100vh - 120px);
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

const Sidebar: React.FC = () => {
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
          <IconButton>
            <ChatIcon style={{ fill: globalTheme.iconColor }} />
          </IconButton>
          <IconButton>
            <MoreVertIcon style={{ fill: globalTheme.iconColor }} />
          </IconButton>
        </IconsContainer>
      </Header>

      <Search>
        <SearchBar>
          <SearchIcon
            fontSize="small"
            style={{ fill: globalTheme.iconColor }}
          />
          <SearchInput placeholder="Search in chats" />
        </SearchBar>
      </Search>
      <ChatContainer>
        <Chat />
        <Chat />
        <Chat />
        <Chat />
        <Chat />
        <Chat />
        <Chat />
        <Chat />
        <Chat />
        <Chat />
      </ChatContainer>
    </Container>
  );
};

export default Sidebar;
