import styled from "styled-components";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import TextField from "@material-ui/core/TextField";

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 77.5px 0;
  ${({ theme }) => theme.registerPageTheme.smallScreen`
    padding: 0;
  `};
  background-color: ${({ theme }) => theme.globalTheme.registerBackgroundGrey};
`;

const RegisterBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  padding: 50px 40px;
  border: 1px solid ${({ theme }) => theme.globalTheme.greyLineColor};
  background-color: ${({ theme }) => theme.globalTheme.white};
  align-items: center;
  ${({ theme }) => theme.registerPageTheme.smallScreen`
    width: 100%;
    border: none;
    background-color: #f8f9fa;
  `};
`;

const Title = styled.h1``;

const Register: React.FC = () => {
  return (
    <Container>
      <RegisterBox>
        <WhatsAppIcon
          style={{
            width: "50px",
            height: "50px",
            fill: "green",
          }}
        />
        <Title>Register</Title>
        <input name="firstName" placeholder="First Name" type="text" />
        <input name="lastName" placeholder="Last Name" type="text" />
        <input type="email" placeholder="Email" name="email" />
        <input name="username" placeholder="Username" type="text" />
        <input name="password" placeholder="password" type="password" />
      </RegisterBox>
    </Container>
  );
};

export default Register;
