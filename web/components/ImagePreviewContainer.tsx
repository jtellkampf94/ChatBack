import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 360px;
`;

const ImagePreviewContainer: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default ImagePreviewContainer;
