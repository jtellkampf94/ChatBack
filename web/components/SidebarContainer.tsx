import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const SidebarContainer: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default SidebarContainer;
