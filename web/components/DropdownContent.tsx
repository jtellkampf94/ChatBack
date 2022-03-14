import styled from "styled-components";
import { CSSTransition } from "react-transition-group";

const ContentContainer = styled.div`
  position: absolute;
  right: 0px;
  top: calc(100% + 5px);
  overflow: hidden;
  border-radius: 3px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
  padding: 7px 0;
  background-color: ${({ theme }) => theme.globalTheme.white};
  width: 200px;
  font-size: 14px;
  color: ${({ theme }) => theme.globalTheme.secondaryGreyFont};

  &.dropdown-enter {
    pointer-events: none;
    opacity: 0;
    transform: translateY(-10px);
  }

  &.dropdown-enter-active {
    opacity: 1;
    transform: translateY(0px);
    pointer-events: auto;
    transition: opacity, transform 200ms ease-in-out;
  }

  &.dropdown-exit {
    transform: translateY(0px);
    transition: opacity, transform 200ms ease-in-out;
  }

  &.dropdown-exit-active {
    transform: translateY(-10px);
    opacity: 0;
    pointer-events: none;
  }
`;

interface DropdownContentProps {
  dropdownIn: boolean;
}

const DropdownContent: React.FC<DropdownContentProps> = ({
  dropdownIn,
  children,
}) => {
  return (
    <CSSTransition
      classNames="dropdown"
      in={dropdownIn}
      timeout={300}
      unmountOnExit
    >
      <ContentContainer>{children}</ContentContainer>
    </CSSTransition>
  );
};

export default DropdownContent;
