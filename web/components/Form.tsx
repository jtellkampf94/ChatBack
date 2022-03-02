import { FormEvent } from "react";

import styled from "styled-components";

const FormElement = styled.form`
  width: 100%;
  height: 100%;
`;

interface FormProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

const Form: React.FC<FormProps> = ({ children, onSubmit }) => {
  return <FormElement onSubmit={onSubmit}>{children}</FormElement>;
};

export default Form;
