import { FormEvent } from "react";
import styled from "styled-components";

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

interface CreateGroupFormProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

const CreateGroupForm: React.FC<CreateGroupFormProps> = ({
  onSubmit,
  children,
}) => {
  return <Form onSubmit={onSubmit}>{children}</Form>;
};

export default CreateGroupForm;
