import { ChangeEvent } from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px;
  margin-top: 20px;
`;

const Input = styled.input`
  height: 45px;
  outline: none;
  border: none;
  border-radius: 5px;
  width: 70%;
  padding: 20px;
  font-size: 16px;

  &::placeholder {
    color: ${({ theme }) => theme.globalTheme.greyFontColor};
  }
`;

interface ImageFormInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ImageFormInput: React.FC<ImageFormInputProps> = ({ value, onChange }) => {
  return (
    <InputContainer>
      <Input
        type="text"
        placeholder="Type a message"
        onChange={onChange}
        value={value}
      />
    </InputContainer>
  );
};

export default ImageFormInput;
