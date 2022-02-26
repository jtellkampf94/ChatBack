import styled from "styled-components";
import DoneIcon from "@material-ui/icons/Done";

const Container = styled.div`
  height: 90px;
  background-color: ${({ theme }) => theme.globalTheme.white};
  position: relative;
`;

const DoneButton = styled.button`
  border: none;
  outline: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background-color: ${({ theme }) => theme.globalTheme.buttonGreen};
  position: absolute;
  right: 40px;
  top: -100%;
  transform: translateY(100%);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
    filter: brightness(105%);
  }
`;

interface ImageEditorFooterProps {
  onClick: () => void;
}

const ImageEditorFooter: React.FC<ImageEditorFooterProps> = ({ onClick }) => {
  return (
    <Container>
      <DoneButton onClick={onClick}>
        <DoneIcon style={{ fill: "#fff", width: "30px", height: "30px" }} />
      </DoneButton>
    </Container>
  );
};

export default ImageEditorFooter;
