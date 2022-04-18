import { ChangeEvent } from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100px;
  width: 100%;
  padding: 10px 36px 10px 36px;
  border-bottom: 1px solid ${({ theme }) => theme.globalTheme.greyLineColor};
  display: flex;
  flex-direction: column;
`;

const ChipContainer = styled.div`
  display: flex;
  align-items: center;

  padding-bottom: 10px;

  overflow-x: auto;
  overflow-y: hidden;

  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 6px !important;
    height: 6px !important;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
  }

  &::-webkit-scrollbar-track {
    background: hsla(0, 0%, 100%, 0.1);
  }
`;

const InputContainer = styled.div``;

const Input = styled.input`
  width: 100%;
  height: 32px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.globalTheme.greyLineColor};
  outline: none;
  font-size: 16px;

  &::placeholder {
    font-size: 16px;
    color: ${({ theme }) => theme.globalTheme.secondaryGreyFont};
  }
`;

interface GroupParticipantsProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const GroupParticipants: React.FC<GroupParticipantsProps> = ({
  children,
  onChange,
  value,
}) => {
  return (
    <Container>
      <ChipContainer>{children}</ChipContainer>
      <InputContainer>
        <Input
          placeholder="Type contact name"
          onChange={onChange}
          value={value}
        />
      </InputContainer>
    </Container>
  );
};

export default GroupParticipants;
