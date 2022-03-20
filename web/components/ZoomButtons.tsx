import styled from "styled-components";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const Container = styled.div`
  background-color: ${({ theme }) => theme.globalTheme.white};
  position: absolute;
  display: flex;
  flex-direction: column;
  border: none;
  outline: none;
  border-radius: 3px;
  right: 7px;
  top: 50%;
  transform: translateY(-50%);
  background-color: ${({ theme }) => theme.globalTheme.white};
`;

const ZoomButton = styled.button`
  width: 28px;
  height: 28px;
  border: none;
  outline: none;
  border-radius: 3px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.globalTheme.hoverGrey};
  }
`;

interface ZoomButtonsProps {
  zoom: number;
  zoomIn: () => void;
  zoomOut: () => void;
}

const ZoomButtons: React.FC<ZoomButtonsProps> = ({ zoomIn, zoomOut, zoom }) => {
  return (
    <Container>
      <ZoomButton value={zoom} onClick={zoomIn}>
        <AddIcon />
      </ZoomButton>
      <ZoomButton value={zoom} onClick={zoomOut}>
        <RemoveIcon />
      </ZoomButton>
    </Container>
  );
};

export default ZoomButtons;
