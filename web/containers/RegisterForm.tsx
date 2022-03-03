import { FormEvent, ChangeEvent, useState, Fragment } from "react";
import styled from "styled-components";

import WhatsAppLogo from "../assets/images/whats-app-logo.svg";
import FormContainer from "../components/FormContainer";
import Form from "../components/Form";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import OrSection from "../components/OrSection";
import RerouteSection from "../components/RerouteSection";

const Header = styled.div`
  background-color: ${({ theme }) => theme.globalTheme.darkGreen};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  border-top: 1px solid ${({ theme }) => theme.globalTheme.greyLineColor};
  border-left: 1px solid ${({ theme }) => theme.globalTheme.greyLineColor};
  border-right: 1px solid ${({ theme }) => theme.globalTheme.greyLineColor};
  height: 80px;
`;

const RegisterForm: React.FC = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    about: "",
  });
  const {
    username,
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    about,
  } = credentials;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Fragment>
      <Header>
        <WhatsAppLogo />
      </Header>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <Input
            isActive={!!email}
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Email address"
          />
          <Input
            isActive={!!username}
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            placeholder="Username"
          />
          <Input
            isActive={!!firstName}
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleChange}
            placeholder="First name"
          />
          <Input
            isActive={!!lastName}
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleChange}
            placeholder="Last name"
          />
          <Input
            isActive={!!password}
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
          />
          <Input
            isActive={!!confirmPassword}
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
          />
          <SubmitButton>Register</SubmitButton>
        </Form>

        <OrSection />

        <RerouteSection text="Have an account? Log in" href="/login" />
      </FormContainer>
    </Fragment>
  );
};

export default RegisterForm;
