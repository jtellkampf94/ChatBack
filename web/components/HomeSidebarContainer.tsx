import styled from "styled-components";

const Container = styled.div`
  flex: 40%;
  position: relative;
  min-width: 330px;
  border-right: 1px solid ${({ theme }) => theme.globalTheme.greyLineColor};
  ${({ theme }) => theme.homePageTheme.mediumScreen`
  flex: 35%;
`};
`;

const HomeSidebarContainer: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default HomeSidebarContainer;
