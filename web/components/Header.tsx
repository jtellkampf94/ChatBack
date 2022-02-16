import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import { globalTheme } from "../themes/globalTheme";

interface HeaderProps {
  onClick: () => void;
  heading: string;
}

const Container = styled.div`
  width: 100%;
  height: 108px;
  background-color: ${({ theme }) => theme.globalTheme.darkGreen};
  color: ${({ theme }) => theme.globalTheme.white};
  padding: 16px 28px;
  display: flex;
  align-items: flex-end;
`;

const Heading = styled.h1`
  font-size: 19px;
  margin-bottom: 5px;
  font-weight: 500;
  margin-left: 27px;
`;

const Header: React.FC<HeaderProps> = ({ onClick, heading }) => {
  return (
    <Container>
      <IconButton onClick={onClick} size="small">
        <ArrowBackIcon style={{ fill: globalTheme.white, fontSize: "24px" }} />
      </IconButton>
      <Heading>{heading}</Heading>
    </Container>
  );
};

export default Header;
