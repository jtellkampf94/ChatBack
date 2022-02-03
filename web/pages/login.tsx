import { useState, Fragment, FormEvent } from "react";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import Head from "next/head";
import { useRouter } from "next/router";

import { useLoginMutation } from "../generated/graphql";

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`;

const LoginContainer = styled.div`
  padding: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
`;

const Logo = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 50px;
`;

const Login: React.FC = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, { loading, data, error }] = useLoginMutation();
  const router = useRouter();

  const handleClick = () => {};

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login({
      variables: { options: { emailOrUsername, password } },
    });
    router.push("/");
  };

  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>

      <LoginContainer>
        <Logo src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png" />
        {loading ? (
          "loading..."
        ) : (
          <Fragment>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="emailOrUsername"
                placeholder="Email Or Username"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant="outlined" type="submit" onClick={handleClick}>
                Sign in
              </Button>
            </form>
            <Button variant="outlined" onClick={handleClick}>
              Sign in with Google
            </Button>
          </Fragment>
        )}
      </LoginContainer>
    </Container>
  );
};

export default Login;
