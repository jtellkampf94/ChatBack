import { ChangeEvent, Dispatch, SetStateAction, useCallback } from "react";
import Cropper from "react-easy-crop";
import OutsideClickHandler from "react-outside-click-handler";

import ImageEditorHeader from "../components/ImageEditorHeader";
import ImageEditorContainer from "../components/ImageEditorContainer";
import ImagePreviewContainer from "../components/ImagePreviewContainer";
import ImageEditorOverlay from "../components/ImageEditorOverlay";
import ZoomButtons from "../components/ZoomButtons";
import ImageEditorFooter from "../components/ImageEditorFooter";
import { useImageEditor } from "../hooks/useImageEditor";
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
  const {
    crop,
    setCrop,
    zoom,
    setZoom,
    zoomIn,
    zoomOut,
    onCropComplete,
    croppedAreaPixels,
  } = useImageEditor();

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
