import styled from "styled-components";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SendIcon from "@material-ui/icons/Send";

import { useState, FormEvent, Fragment } from "react";

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 77.5px 0;
  height: 100vh;
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

const Title = styled.h1`
  margin: 15px 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Box = styled.div`
  margin-top: 15px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  margin-top: 15px;
`;

const Input = styled.input`
  display: none;
`;

const Register: React.FC = () => {
  const [page, setPage] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [about, setAbout] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const renderRegisterMultiPageForm = () => {
    switch (page) {
      case 1:
      default:
        return (
          <Fragment>
            <Box>
              <TextField
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                name="firstName"
                placeholder="First Name"
                label="First Name"
                variant="outlined"
                type="text"
              />
            </Box>
            <Box>
              <TextField
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                name="lastName"
                placeholder="Last Name"
                label="Last Name"
                variant="outlined"
                type="text"
              />
            </Box>
            <ButtonContainer>
              <Button
                variant="outlined"
                type="button"
                onClick={() => setPage(2)}
                endIcon={<NavigateNextIcon />}
              >
                Next
              </Button>
            </ButtonContainer>
          </Fragment>
        );
      case 2:
        return (
          <Fragment>
            <Box>
              <TextField
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email"
                label="Email"
                variant="outlined"
                name="email"
              />
            </Box>
            <Box>
              <TextField
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                name="username"
                placeholder="Username"
                label="Username"
                variant="outlined"
                type="text"
              />
            </Box>
            <Box>
              <TextField
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                name="password"
                placeholder="Password"
                label="Password"
                variant="outlined"
                type="password"
              />
            </Box>
            <ButtonContainer>
              <Button
                variant="outlined"
                type="button"
                onClick={() => setPage(3)}
                endIcon={<NavigateNextIcon />}
              >
                Next
              </Button>
              <Button
                variant="outlined"
                type="button"
                onClick={() => setPage(1)}
                startIcon={<NavigateBeforeIcon />}
              >
                Back
              </Button>
            </ButtonContainer>
          </Fragment>
        );
      case 3:
        return (
          <Fragment>
            <Box>
              <TextField
                variant="outlined"
                id="outlined-multiline-flexible"
                label="About"
                name="about"
                placeholder="Tell us about yourself..."
                multiline
                maxRows={4}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
              <Box>
                <label htmlFor="contained-button-file">
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    // onChange={(e) => setProfilePicture(e.target.files)}
                    // value={profilePicture}
                  />
                  <Button
                    startIcon={<AccountCircleIcon />}
                    variant="outlined"
                    component="span"
                  >
                    Upload
                  </Button>
                </label>
              </Box>
            </Box>
            <ButtonContainer>
              <Button
                onClick={() => setPage(4)}
                endIcon={<NavigateNextIcon />}
                variant="outlined"
                type="button"
              >
                Skip
              </Button>
              <Button
                variant="outlined"
                type="button"
                onClick={() => setPage(2)}
                startIcon={<NavigateBeforeIcon />}
              >
                Back
              </Button>
            </ButtonContainer>
          </Fragment>
        );
      case 4:
        return (
          <Fragment>
            <ButtonContainer>
              <Button endIcon={<SendIcon />} variant="outlined" type="submit">
                Submit
              </Button>
              <Button
                variant="outlined"
                type="button"
                onClick={() => setPage(3)}
                startIcon={<NavigateBeforeIcon />}
              >
                Back
              </Button>
            </ButtonContainer>
          </Fragment>
        );
    }
  };

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
        <Form onSubmit={handleSubmit}>{renderRegisterMultiPageForm()}</Form>
      </RegisterBox>
    </Container>
  );
};

export default Register;
