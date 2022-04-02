import { useState } from "react";
import { IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import OutsideClickHandler from "react-outside-click-handler";

import { globalTheme } from "../themes/globalTheme";
import SidebarMenuContainer from "../components/SidebarMenuContainer";
import DropdownContent from "../components/DropdownContent";

const SidebarMenu: React.FC = ({ children }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  return (
    <SidebarMenuContainer>
      <IconButton onClick={() => setOpenDropdown(!openDropdown)}>
        <MoreVertIcon style={{ fill: globalTheme.iconColor }} />
      </IconButton>

      <OutsideClickHandler onOutsideClick={() => setOpenDropdown(false)}>
        <DropdownContent dropdownIn={openDropdown}>{children}</DropdownContent>
      </OutsideClickHandler>
    </SidebarMenuContainer>
  );
};

export default SidebarMenu;
