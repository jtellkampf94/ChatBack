import { FormEvent, ChangeEvent, useState, Fragment } from "react";
import { useRouter } from "next/router";

import { useRegisterMutation } from "../generated/graphql";
import FormContainer from "../components/FormContainer";
import Form from "../components/Form";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import OrSection from "../components/OrSection";
import RerouteSection from "../components/RerouteSection";
import FormHeader from "../components/FormHeader";

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [register, { data, loading, error }] = useRegisterMutation();
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });
  const { username, email, password, confirmPassword, firstName, lastName } =
    credentials;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) return;
    await register({
      variables: {
        options: {
          username,
          email,
          password,
          firstName,
          lastName,
        },
      },
    });
    router.push("/");
  };

  return (
    <Fragment>
      <FormHeader />

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
          <SubmitButton loading={loading}>Register</SubmitButton>
        </Form>

        <OrSection />

        <RerouteSection text="Have an account? Log in" href="/login" />
      </FormContainer>
    </Fragment>
  );
};

export default RegisterForm;
