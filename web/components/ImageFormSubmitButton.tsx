import styled from "styled-components";
import SendIcon from "@material-ui/icons/Send";

const Button = styled.button`
  background-color: #00a884;
  box-shadow: 0 3px 12px rgba(11, 20, 26, 0.16);
  border-radius: 50%;
  border: none;
  outline: none;
  width: 60px;
  height: 60px;
  position: absolute;
  bottom: 20px;
  right: 20px;
  color: ${({ theme }) => theme.globalTheme.white};
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    filter: brightness(105%);
    cursor: pointer;
  }
`;

const ImageFormSubmitButton: React.FC = () => {
  return (
    <Button type="submit">
      <SendIcon />
    </Button>
  );
};

export default ImageFormSubmitButton;
