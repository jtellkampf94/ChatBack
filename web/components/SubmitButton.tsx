import styled from "styled-components";

const Button = styled.button`
  color: ${({ theme }) => theme.globalTheme.white};
  font-size: 14px;
  font-weight: 600;
  width: 100%;
  background-color: #25d366;
  height: 34px;
  margin-top: 10px;
  outline: none;
  border-radius: 3px;
  border: none;

  &:hover {
    cursor: pointer;
    filter: brightness(105%);
  }
`;

const SubmitButton: React.FC = ({ children }) => {
  return <Button>{children}</Button>;
};

export default SubmitButton;
