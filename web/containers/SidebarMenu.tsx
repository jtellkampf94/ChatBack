import { useState } from "react";
import { IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { globalTheme } from "../themes/globalTheme";
import SidebarMenuContainer from "../components/SidebarMenuContainer";
import DropdownContent from "../components/DropdownContent";

const SidebarMenu: React.FC = ({ children }) => {
  const [openDropdown, setOpenDrpopdown] = useState(false);
  return (
    <SidebarMenuContainer>
      <IconButton onClick={() => setOpenDrpopdown(!openDropdown)}>
        <MoreVertIcon style={{ fill: globalTheme.iconColor }} />
      </IconButton>

      <DropdownContent dropdownIn={openDropdown}>{children}</DropdownContent>
    </SidebarMenuContainer>
  );
};

export default SidebarMenu;
