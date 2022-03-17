import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
`;

const ImageEditorOverlay: React.FC = ({ children }) => {
  return <Overlay>{children}</Overlay>;
};

export default ImageEditorOverlay;
