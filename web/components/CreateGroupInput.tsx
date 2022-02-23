import { ChangeEvent } from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  margin-top: 24px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 52px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  border-bottom: 3px solid #00a884;
  font-size: 16px;
  height: 38px;
  width: 80%;

  &::placeholder {
    font-size: 16px;
    color: ${({ theme }) => theme.globalTheme.secondaryGreyFont};
  }
`;

interface CreateGroupInputProps {
  groupName: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CreateGroupInput: React.FC<CreateGroupInputProps> = ({
  groupName,
  onChange,
}) => {
  return (
    <InputContainer>
      <Input
        onChange={onChange}
        value={groupName}
        type="text"
        placeholder="Group Subject"
      />
    </InputContainer>
  );
};

export default CreateGroupInput;
