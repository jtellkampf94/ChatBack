import { Avatar } from "@material-ui/core";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

const TextContainer = styled.div``;

const Name = styled.h4``;

const About = styled.p``;

interface ContactProps {
  profilePictureUrl: null | undefined | string;
  firstName: string;
  lastName: string;
  about: null | undefined | string;
  onClick: () => void;
}

const Contact: React.FC<ContactProps> = ({
  profilePictureUrl,
  firstName,
  lastName,
  about,
  onClick,
}) => {
  return (
    <Container onClick={onClick}>
      <Avatar
        src={profilePictureUrl ? profilePictureUrl : undefined}
        style={{ width: "52px", height: "52px" }}
      />
      <TextContainer>
        <Name>{`${firstName} ${lastName}`}</Name>
        <About>{about}</About>
      </TextContainer>
    </Container>
  );
};

export default Contact;
