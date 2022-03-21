import styled from "styled-components";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import RotateRightIcon from "@material-ui/icons/RotateRight";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import CloseIcon from "@material-ui/icons/Close";

const Container = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  padding: 20px;
`;

const ImageButtonsContainer = styled.div`
  display: flex;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const Button = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  outline: none;
  border-radius: 3px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #54656f;
  font-size: 32px;
  margin: 0 10px;

  &:hover {
    cursor: pointer;
  }
`;

interface ImageFormButtonsProps {
  close: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  rotateClockwise: () => void;
  rotateAntiClockwise: () => void;
}

const ImageFormButtons: React.FC<ImageFormButtonsProps> = ({
  close,
  zoomIn,
  zoomOut,
  rotateClockwise,
  rotateAntiClockwise,
}) => {
  return (
    <Container>
      <Button type="button" onClick={close}>
        <CloseIcon style={{ fontSize: "32px" }} />
      </Button>
      <ImageButtonsContainer>
        <Button type="button" onClick={zoomIn}>
          <AddIcon style={{ fontSize: "32px" }} />
        </Button>
        <Button type="button" onClick={zoomOut}>
          <RemoveIcon style={{ fontSize: "32px" }} />
        </Button>
        <Button type="button" onClick={rotateClockwise}>
          <RotateRightIcon style={{ fontSize: "32px" }} />
        </Button>
        <Button type="button" onClick={rotateAntiClockwise}>
          <RotateLeftIcon style={{ fontSize: "32px" }} />
        </Button>
      </ImageButtonsContainer>
    </Container>
  );
};

export default ImageFormButtons;
