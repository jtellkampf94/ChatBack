import { useState, ChangeEvent } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 30px;
  width: 350px;
  display: flex;
  border: 1px solid ${({ theme }) => theme.globalTheme.greyLineColor};
  flex-direction: column;
  align-items: center;
  background-color: white;
`;

const Form = styled.form`
  width: 100%;
  height: 100%;
`;

const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;

const InputLabel = styled.label`
  position: relative;
  height: 36px;
`;

const InputPlaceholder = styled("span")<{ isActive: boolean }>`
  font-size: ${(props) => (props.isActive ? "12px" : "14px")};
  color: ${({ theme }) => theme.globalTheme.secondaryGreyFont};
  text-overflow: ellipsis;
  height: 36px;
  left: 10px;
  line-height: 36px;
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: ${(props) => (props.isActive ? "-23px" : "-6px")};
  transition: top 200ms ease-out, font-size 200ms ease-out;
`;

const Input = styled("input")<{ isActive: boolean }>`
  outline: none;
  font-size: 14px;
  border: 1px solid ${({ theme }) => theme.globalTheme.greyLineColor};
  border-radius: 3px;
  width: 100%;
  height: 40px;
  padding: ${(props) => (props.isActive ? "14px 0px 2px 10px" : "5px 10px")};
  text-overflow: ellipsis;

  &:focus {
    border: 1px solid #c4c3c3;
  }
`;

const Button = styled.button`
  color: ${({ theme }) => theme.globalTheme.white};
  font-size: 14px;
  font-weight: 600;
  width: 100%;
  background-color: #25d366;
  height: 34px;
  margin-top: 10px;
  outline: none;
  border-radius: 3px;
  border: none;

  &:hover {
    cursor: pointer;
    filter: brightness(105%);
  }
`;

const OrSection = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  align-items: center;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.globalTheme.greyLineColor};
`;

const OrText = styled.p`
  margin: 0 10px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${({ theme }) => theme.globalTheme.secondaryGreyFont};
`;

const SignUpSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const SignUpText = styled.p`
  color: ${({ theme }) => theme.globalTheme.secondaryGreyFont};
  font-size: 14px;
`;

interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = () => {
  const [credentials, setCredentials] = useState({
    emailOrUsername: "",
    password: "",
  });
  const { emailOrUsername, password } = credentials;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Form>
        <InputContainer>
          <InputLabel>
            <Input
              type="text"
              name="emailOrUsername"
              value={emailOrUsername}
              onChange={handleChange}
              isActive={!!emailOrUsername}
            />
            <InputPlaceholder isActive={!!emailOrUsername}>
              Email address or username
            </InputPlaceholder>
          </InputLabel>
        </InputContainer>

        <InputContainer>
          <InputLabel>
            <Input
              isActive={!!password}
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
            <InputPlaceholder isActive={!!password}>Password</InputPlaceholder>
          </InputLabel>
        </InputContainer>

        <Button>Log In</Button>
      </Form>

      <OrSection>
        <Line />
        <OrText>Or</OrText>
        <Line />
      </OrSection>

      <SignUpSection>
        <SignUpText>Don't have an account? Sign up here.</SignUpText>
      </SignUpSection>
    </Container>
  );
};

export default LoginForm;
