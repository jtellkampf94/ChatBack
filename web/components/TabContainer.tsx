import { CSSTransition } from "react-transition-group";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;

  &.tab-enter {
    transform: translateX(-100%);
    transition: transform 200ms ease-in;
  }

  &.tab-enter-active {
    transform: translateX(0%);
  }

  &.tab-exit {
    transform: translateX(0%);
    z-index: -1;
    transition: transform 200ms ease-in;
  }

  &.tab-exit-active {
    transform: translateX(100%);
    z-index: -1;
  }
`;

interface TabContainerProps {
  tabIn: boolean;
}

const TabContainer: React.FC<TabContainerProps> = ({ tabIn, children }) => {
  return (
    <CSSTransition in={tabIn} classNames="tab" unmountOnExit timeout={300}>
      <Container>{children}</Container>
    </CSSTransition>
  );
};

export default TabContainer;
