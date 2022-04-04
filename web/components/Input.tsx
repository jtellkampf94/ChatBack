import { ChangeEvent } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;

const Label = styled.label`
  position: relative;
  height: 36px;
`;

const Placeholder = styled("span")<{ isActive: boolean }>`
  font-size: ${(props) => (props.isActive ? "12px" : "14px")};
  color: ${({ theme }) => theme.globalTheme.secondaryGreyFont};
  text-overflow: ellipsis;
  height: 36px;
  left: 10px;
  line-height: 36px;
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: ${(props) => (props.isActive ? "-23px" : "-6px")};
  transition: top 200ms ease-out, font-size 200ms ease-out;
`;

const InputElement = styled("input")<{ isActive: boolean }>`
  outline: none;
  font-size: 14px;
  border: 1px solid ${({ theme }) => theme.globalTheme.greyLineColor};
  border-radius: 3px;
  width: 100%;
  height: 40px;
  padding: ${(props) => (props.isActive ? "14px 0px 2px 10px" : "5px 10px")};
  text-overflow: ellipsis;
  margin-bottom: 10px;

  &:focus {
    border: 1px solid #c4c3c3;
  }
`;

const ErrorMessage = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.globalTheme.errorRed};
`;

interface InputProps {
  value: string;
  type: "text" | "password" | "email";
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isActive: boolean;
  name: string;
  placeholder: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  value,
  type,
  name,
  onChange,
  isActive,
  placeholder,
  error,
}) => {
  return (
    <Container>
      <Label>
        <InputElement
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          isActive={isActive}
        />
        <Placeholder isActive={isActive}>{placeholder}</Placeholder>
      </Label>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};

export default Input;
