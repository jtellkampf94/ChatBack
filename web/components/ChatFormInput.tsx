import { ChangeEvent } from "react";
import styled from "styled-components";

const Input = styled.input`
  outline-width: 0;
  padding-left: 17px;
  border: none;
  width: 100%;
  margin: 0 17px;
  font-size: 16px;
  height: 36px;
  border-radius: 18px;

  &::placeholder {
    color: ${({ theme }) => theme.globalTheme.greyFontColor};
  }
`;

interface ChatFormInputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const ChatFormInput: React.FC<ChatFormInputProps> = ({ onChange, value }) => {
  return (
    <Input onChange={onChange} value={value} placeholder="Type a message" />
  );
};

export default ChatFormInput;
