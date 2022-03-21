import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const ImageCropperContainer = styled.div`
  position: relative;
  width: 490px;
  height: 285px;
  box-shadow: 0 3px 12px rgba(11, 20, 26, 0.16);
  border-radius: 3px;
  overflow: hidden;
`;

const ImageFormCropperContainer: React.FC = ({ children }) => {
  return (
    <Container>
      <ImageCropperContainer>{children}</ImageCropperContainer>
    </Container>
  );
};

export default ImageFormCropperContainer;
