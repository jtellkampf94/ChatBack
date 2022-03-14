import styled from "styled-components";

const Container = styled.div`
  position: relative;
`;

const SidebarMenuContainer: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default SidebarMenuContainer;
