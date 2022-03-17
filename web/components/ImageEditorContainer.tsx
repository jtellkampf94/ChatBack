import styled from "styled-components";

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
  return <Container>{children}</Container>;
};

export default ImageEditorContainer;
