import { useState } from "react";
import { IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { globalTheme } from "../themes/globalTheme";
import SidebarMenuContainer from "../components/SidebarMenuContainer";
import DropdownContent from "../components/DropdownContent";
import DropdownItem from "../components/DropdownItem";

interface SidebarMenuProps {
  toSearchUsers: () => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ toSearchUsers }) => {
  const [openDropdown, setOpenDrpopdown] = useState(false);
  return (
    <SidebarMenuContainer>
      <IconButton onClick={() => setOpenDrpopdown(!openDropdown)}>
        <MoreVertIcon style={{ fill: globalTheme.iconColor }} />
      </IconButton>

      <DropdownContent dropdownIn={openDropdown}>
        <DropdownItem onClick={toSearchUsers}>Search users</DropdownItem>
        <DropdownItem onClick={() => {}}>Log out</DropdownItem>
      </DropdownContent>
    </SidebarMenuContainer>
  );
};

export default SidebarMenu;
