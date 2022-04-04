import { useState, FormEvent, ChangeEvent, Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";

import { useLoginMutation } from "../generated/graphql";
import Input from "../components/Input";
import Form from "../components/Form";
import FormContainer from "../components/FormContainer";
import SubmitButton from "../components/SubmitButton";
import OrSection from "../components/OrSection";
import RerouteSection from "../components/RerouteSection";
import FormHeader from "../components/FormHeader";

const LoginForm: React.FC = () => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 880px)" });
  const [login, { loading, data }] = useLoginMutation();
  const [credentials, setCredentials] = useState({
    emailOrUsername: "",
    password: "",
  });
  const [errors, setErrors] = useState<null | Record<string, string>>(null);
  const { emailOrUsername, password } = credentials;
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(null);
    await login({
      variables: { options: credentials },
    });
  };

  useEffect(() => {
    if (data) {
      if (data.login.ok === true) {
        router.push("/");
      } else {
        let loginErrors: Record<string, string> = {};
        data.login.errors?.forEach((error) => {
          loginErrors[error.field] = error.message;
        });
        setErrors(loginErrors);
      }
    }
  }, [data]);

  return (
    <Fragment>
      {isSmallScreen && <FormHeader />}
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <Input
            isActive={!!emailOrUsername}
            type="text"
            name="emailOrUsername"
            value={emailOrUsername}
            onChange={handleChange}
            placeholder="Email address or username"
            error={
              errors && errors.emailOrUsername
                ? errors.emailOrUsername
                : undefined
            }
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
          <SubmitButton loading={loading}>Log In</SubmitButton>
        </Form>

        <OrSection />

        <RerouteSection
          text="Don't have an account? Sign up"
          href="/register"
        />
      </FormContainer>
    </Fragment>
  );
};

export default LoginForm;
