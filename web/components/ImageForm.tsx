import { FormEvent } from "react";
import styled from "styled-components";

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

interface ImageFormProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

const ImageForm: React.FC<ImageFormProps> = ({ children, onSubmit }) => {
  return <Form onSubmit={onSubmit}>{children}</Form>;
};

export default ImageForm;
