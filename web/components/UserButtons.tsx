import { Fragment } from "react";
import styled from "styled-components";

const Button = styled("button")<{ isContact: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  font-size: 14px;
  background-color: ${(props) => (props.isContact ? "#25d366" : "#00a884")};
  color: ${({ theme }) => theme.globalTheme.white};
  font-weight: 600;
  outline: none;
  border-radius: 3px;
  border: none;
  padding: 10px 15px;
  width: 75px;

  &:hover {
    cursor: pointer;
    filter: brightness(105%);
  }
`;

interface UserButtonsProps {
  addContact: () => Promise<void>;
  removeContact: () => Promise<void>;
  isContact: boolean;
  isCurrentUser: boolean;
}

const UserButtons: React.FC<UserButtonsProps> = ({
  addContact,
  removeContact,
  isContact,
  isCurrentUser,
}) => {
  if (isCurrentUser) return <Fragment></Fragment>;

  if (isContact) {
    return (
      <Button isContact={isContact} onClick={removeContact}>
        Added
      </Button>
    );
  }

  return (
    <Button isContact={isContact} onClick={addContact}>
      Add
    </Button>
  );
};

export default UserButtons;
