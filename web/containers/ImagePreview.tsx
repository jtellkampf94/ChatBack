import React, { useState, useCallback } from "react";
import Slider from "@material-ui/core/Slider";
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop/types";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
`;

interface ImagePreviewProps {
  imageUrl: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl }) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      console.log(croppedArea, croppedAreaPixels);
    },
    []
  );

  return (
    <div>
      <Container>
        <Cropper
          image="https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000"
          crop={crop}
          zoom={zoom}
          cropShape="round"
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </Container>
      <div className="controls">
        <Slider
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={(e, zoom) => setZoom(Number(zoom))}
          classes={{ root: "slider" }}
        />
      </div>
    </div>
  );
};

export default ImagePreview;
