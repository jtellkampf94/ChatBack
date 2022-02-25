import { useState, useCallback, Fragment } from "react";
import styled from "styled-components";
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop/types";
import { ButtonGroup, Button } from "@material-ui/core";
// import UploadIcon from "@material-ui/icons/ArrowCircleUp";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import CloseIcon from "@material-ui/icons/Close";

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

const Header = styled.header`
  display: flex;
  background-color: ${({ theme }) => theme.globalTheme.darkGreen};
  color: ${({ theme }) => theme.globalTheme.white};
  align-items: center;
  height: 50px;
  padding: 0 24px;
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  outline: none;
  border: none;
  margin-right: 24px;

  &:hover {
    cursor: pointer;
  }
`;

const Heading = styled.h1`
  font-size: 19px;
  font-weight: 500;
`;

const UploadButton = styled.button`
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  outline: none;
  border: none;

  &:hover {
    cursor: pointer;
  }
`;

const UploadText = styled.span`
  color: ${({ theme }) => theme.globalTheme.white};
`;

const ImagePreviewContainer = styled.div`
  position: relative;
  width: 100%;
  height: 360px;
`;

interface ImageEditorProps {
  imageUrl: null | string;
}

const ImageEditor: React.FC<ImageEditorProps> = ({ imageUrl }) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      console.log(croppedArea, croppedAreaPixels);
    },
    []
  );

  return (
    <Fragment>
      <Overlay />
      <Container>
        <Header>
          <CloseButton>
            <CloseIcon style={{ fill: "#b2d8d1" }} />
          </CloseButton>
          <Heading>Drag image to adjust</Heading>

          <UploadButton>
            {/* <UploadIcon /> */}
            <UploadText>Upload</UploadText>
          </UploadButton>
        </Header>

        <ImagePreviewContainer>
          <Cropper
            image={
              imageUrl
                ? imageUrl
                : "https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000"
            }
            crop={crop}
            zoom={zoom}
            cropShape="round"
            aspect={1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </ImagePreviewContainer>

        <div>
          <ButtonGroup orientation="vertical">
            <Button value={zoom} onClick={(e) => setZoom((z) => z + 0.1)}>
              <AddIcon />
            </Button>
            <Button value={zoom} onClick={(e) => setZoom((z) => z - 0.1)}>
              <RemoveIcon />
            </Button>
          </ButtonGroup>
        </div>
      </Container>
    </Fragment>
  );
};

export default ImageEditor;
