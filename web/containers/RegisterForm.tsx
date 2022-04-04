import { FormEvent, ChangeEvent, useState, Fragment, useEffect } from "react";
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
  const [errors, setErrors] = useState<null | Record<string, string>>(null);
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
    setErrors(null);
    if (confirmPassword.length === 0) {
      setErrors({ confirmPassword: "Please enter confirm password" });
    }
    if (confirmPassword.length === 0 && password.length > 0) {
      setErrors({ confirmPassword: "Please enter confirm password" });
      return;
    }
    if (confirmPassword.length > 0 && password !== confirmPassword) {
      setErrors({
        confirmPassword: "Confirm password does not match password",
      });
      return;
    }
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
  };

  useEffect(() => {
    if (data) {
      if (data.register.ok) {
        router.push("/");
      } else {
        let registerErrors: Record<string, string> = {};
        data.register.errors?.forEach((error) => {
          registerErrors[error.field] = error.message;
        });
        setErrors({ ...errors, ...registerErrors });
      }
    }
  }, [data]);

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
            error={errors && errors.email ? errors.email : undefined}
          />
          <Input
            isActive={!!username}
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            placeholder="Username"
            error={errors && errors.username ? errors.username : undefined}
          />
          <Input
            isActive={!!firstName}
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleChange}
            placeholder="First name"
            error={errors && errors.firstName ? errors.firstName : undefined}
          />
          <Input
            isActive={!!lastName}
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleChange}
            placeholder="Last name"
            error={errors && errors.lastName ? errors.lastName : undefined}
          />
          <Input
            isActive={!!password}
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
            error={errors && errors.password ? errors.password : undefined}
          />
          <Input
            isActive={!!confirmPassword}
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            error={
              errors && errors.confirmPassword
                ? errors.confirmPassword
                : undefined
            }
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
