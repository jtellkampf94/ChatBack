import { FormEvent } from "react";
import styled from "styled-components";

const Form = styled.form`
  padding: 10px 17px;
  display: flex;
  align-items: center;
  width: 100%;
`;

interface ChatFormFormProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

const ChatFormForm: React.FC<ChatFormFormProps> = ({ children, onSubmit }) => {
  return <Form onSubmit={onSubmit}>{children}</Form>;
};

export default ChatFormForm;
