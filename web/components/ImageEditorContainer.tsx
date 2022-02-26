import { Fragment } from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
`;

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 500px;
  border-radius: 5px;
  overflow: hidden;
`;

const ImageEditorContainer: React.FC = ({ children }) => {
  return (
    <Fragment>
      <Overlay />
      <Container>{children}</Container>
    </Fragment>
  );
};

export default ImageEditorContainer;
