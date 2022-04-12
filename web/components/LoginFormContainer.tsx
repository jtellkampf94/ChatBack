import styled from "styled-components";

const Container = styled.div`
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 880px) {
    width: 100%;
    background-color: ${({ theme }) => theme.globalTheme.smokeGrey};
  }
`;

const LoginFormContainer: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default LoginFormContainer;
