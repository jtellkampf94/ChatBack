import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/router";

import { useLoginMutation } from "../generated/graphql";
import Input from "../components/Input";
import Form from "../components/Form";
import FormContainer from "../components/FormContainer";
import SubmitButton from "../components/SubmitButton";
import OrSection from "../components/OrSection";
import RerouteSection from "../components/RerouteSection";

const LoginForm: React.FC = () => {
  const [login, { loading, data, error }] = useLoginMutation();
  const [credentials, setCredentials] = useState({
    emailOrUsername: "",
    password: "",
  });
  const { emailOrUsername, password } = credentials;
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login({
      variables: { options: credentials },
    });
    router.push("/");
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <Input
          isActive={!!emailOrUsername}
          type="text"
          name="emailOrUsername"
          value={emailOrUsername}
          onChange={handleChange}
          placeholder="Email address or username"
        />
        <Input
          isActive={!!password}
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Password"
        />
        <SubmitButton loading={loading}>Log In</SubmitButton>
      </Form>

      <OrSection />

      <RerouteSection text="Don't have an account? Sign up" href="/register" />
    </FormContainer>
  );
};

export default LoginForm;
