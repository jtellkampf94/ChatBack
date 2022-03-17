import {
  useState,
  useCallback,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop/types";
import OutsideClickHandler from "react-outside-click-handler";

import ImageEditorHeader from "../components/ImageEditorHeader";
import ImageEditorContainer from "../components/ImageEditorContainer";
import ImagePreviewContainer from "../components/ImagePreviewContainer";
import ImageEditorOverlay from "../components/ImageEditorOverlay";

import ZoomButtons from "../components/ZoomButtons";
import ImageEditorFooter from "../components/ImageEditorFooter";
import getCroppedImg from "../utils/cropImage";

interface ImageEditorProps {
  imageUrl: string;
  closePreview: () => void;
  changeFile: (e: ChangeEvent<HTMLInputElement>) => void;
  setCroppedImage: Dispatch<SetStateAction<Blob | null>>;
}

const ImageEditor: React.FC<ImageEditorProps> = ({
  imageUrl,
  closePreview,
  changeFile,
  setCroppedImage,
}) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const cropImage = useCallback(async () => {
    try {
      if (croppedAreaPixels) {
        const croppedImage = await getCroppedImg(imageUrl, croppedAreaPixels);
        setCroppedImage(croppedImage);
        closePreview();
      }
    } catch (error) {
      console.log(error);
    }
  }, [croppedAreaPixels]);

  const zoomIn = () => {
    setZoom((z) => z + 0.1);
  };

  const zoomOut = () => {
    setZoom((z) => z - 0.1);
  };

  return (
    <ImageEditorOverlay>
      <OutsideClickHandler
        onOutsideClick={() => {
          closePreview();
        }}
      >
        <ImageEditorContainer>
          <ImageEditorHeader close={closePreview} changeFile={changeFile} />

          <ImagePreviewContainer>
            <Cropper
              image={imageUrl}
              crop={crop}
              zoom={zoom}
              cropShape="round"
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
            <ZoomButtons zoom={zoom} zoomIn={zoomIn} zoomOut={zoomOut} />
          </ImagePreviewContainer>

          <ImageEditorFooter onClick={cropImage} />
        </ImageEditorContainer>
      </OutsideClickHandler>
    </ImageEditorOverlay>
  );
};

export default ImageEditor;
