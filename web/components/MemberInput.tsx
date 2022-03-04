import { ChangeEvent } from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  margin-top: 24px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 52px;
  padding: 0 10%;
`;

const Input = styled.input`
  border: none;
  outline: none;
  border-bottom: 3px solid #00a884;
  font-size: 16px;
  height: 38px;
  width: 100%;

  &::placeholder {
    font-size: 16px;
    color: ${({ theme }) => theme.globalTheme.secondaryGreyFont};
  }
`;

const Label = styled.label`
  color: #00a884;
  font-size: 14px;
`;

interface MemberInputProps {
  name: string;
  placeholder: string;
  type: "text" | "password" | "email";
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const MemberInput: React.FC<MemberInputProps> = ({
  value,
  onChange,
  placeholder,
  type,
  name,
}) => {
  return (
    <InputContainer>
      <Label>{placeholder}</Label>
      <Input onChange={onChange} value={value} type={type} name={name} />
    </InputContainer>
  );
};

export default MemberInput;
