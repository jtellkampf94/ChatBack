import styled from "styled-components";
import { Avatar } from "@material-ui/core";

const Container = styled.div`
  width: 100%;
  height: 77px;
  padding: 10px 24px 10px 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.globalTheme.greyLineColor};
  background-color: ${({ theme }) => theme.globalTheme.white};

  &:hover {
    background-color: ${({ theme }) => theme.globalTheme.hoverGrey};
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
`;

const Username = styled.p`
  font-size: 16px;
  font-weight: 400;
`;

const Name = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.globalTheme.secondaryGreyFont};
`;

interface UserProps {
  name: string;
  username: string;
  profilePictureUrl?: string;
}

const User: React.FC<UserProps> = ({
  name,
  username,
  profilePictureUrl,
  children,
}) => {
  return (
    <Container>
      <Avatar
        style={{ width: "52px", height: "52px" }}
        src={profilePictureUrl}
      />
      <TextContainer>
        <Username>{username}</Username>
        <Name>{name}</Name>
      </TextContainer>
      {children}
    </Container>
  );
};

export default User;
