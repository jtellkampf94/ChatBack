import { Avatar } from "@material-ui/core";
import styled from "styled-components";

const Container = styled.div`
  padding: 10px 24px 10px 16px;
  display: flex;
  align-items: center;
  width: 100%;
  height: 77px;
  border-bottom: 1px solid ${({ theme }) => theme.globalTheme.greyLineColor};

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.globalTheme.hoverGrey};
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  width: 100%;
`;

const Name = styled.h4`
  font-size: 16px;
  font-weight: 400;
`;

const About = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.globalTheme.secondaryGreyFont};
`;

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
