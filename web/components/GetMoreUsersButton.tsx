import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px 0;
`;

const Button = styled.button`
  border-radius: 3px;
  outline: none;
  border: none;
  background-color: ${({ theme }) => theme.globalTheme.secondaryGreyFont};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.globalTheme.white};
  padding: 10px 15px;
  width: 75px;
  font-weight: 600;

  &:hover {
    cursor: pointer;
    filter: brightness(105%);
  }
`;

interface GetMoreUsersButtonProps {
  onClick: () => Promise<void>;
}

const GetMoreUsersButton: React.FC<GetMoreUsersButtonProps> = ({
  children,
  onClick,
}) => {
  return (
    <Container>
      <Button onClick={onClick}>{children}</Button>
    </Container>
  );
};

export default GetMoreUsersButton;
