import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0 40px 0;
  width: 100%;
`;

const Button = styled.button`
  background-color: #25d366;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.globalTheme.white};
  outline: none;
  border-radius: 3px;
  border: none;
  height: 34px;
  width: 130px;
  &:hover {
    cursor: pointer;
    filter: brightness(105%);
  }
`;

const EditProfileSubmitButton: React.FC = ({ children }) => {
  return (
    <ButtonContainer>
      <Button type="submit">{children}</Button>
    </ButtonContainer>
  );
};

export default EditProfileSubmitButton;
