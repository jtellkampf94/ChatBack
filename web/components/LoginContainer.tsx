import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: ${({ theme }) => theme.globalTheme.white};
`;

const LoginContainer: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default LoginContainer;
