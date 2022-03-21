import styled from "styled-components";
import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";

import { globalTheme } from "../themes/globalTheme";

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

interface SidebarHeaderProps {
  profilePictureUrl: string | undefined;
  onAvatarClick: () => void;
  onContactsClick: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  onAvatarClick,
  profilePictureUrl,
  onContactsClick,
  children,
}) => {
  return (
    <Header>
      <UserAvatar
        onClick={onAvatarClick}
        style={{
          width: "44px",
          height: "44px",
        }}
        src={profilePictureUrl}
      />

      <IconsContainer>
        <IconButton onClick={onContactsClick}>
          <ChatIcon style={{ fill: globalTheme.iconColor }} />
        </IconButton>
        {children}
      </IconsContainer>
    </Header>
  );
};

export default SidebarHeader;
