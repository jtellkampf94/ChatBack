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
    cursor: pointer;
    background-color: ${({ theme }) => theme.globalTheme.hoverGrey};
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  /* justify-content: space-between; */
`;

const Username = styled.p`
  font-size: 16px;
  font-weight: 400;
`;

const Name = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.globalTheme.secondaryGreyFont};
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  font-size: 14px;
  background-color: #00a884;
  color: ${({ theme }) => theme.globalTheme.white};
  font-weight: 600;
  outline: none;
  border-radius: 3px;
  border: none;
  padding: 10px 15px;

  &:hover {
    cursor: pointer;
    filter: brightness(105%);
  }
`;

interface UserProps {
  name: string;
  username: string;
  profilePictureUrl?: string;
  onClick: () => Promise<void>;
}

const User: React.FC<UserProps> = ({
  name,
  username,
  profilePictureUrl,
  onClick,
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
      <Button onClick={onClick}>Add </Button>
    </Container>
  );
};

export default User;
