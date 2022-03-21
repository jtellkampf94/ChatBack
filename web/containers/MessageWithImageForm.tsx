import {
  useState,
  FormEvent,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
} from "react";
import axios from "axios";
import Cropper from "react-easy-crop";

import {
  useGetPresignedUrlLazyQuery,
  useSendMessageMutation,
} from "../generated/graphql";
import { useImageEditor } from "../hooks/useImageEditor";
import getCroppedImg from "../utils/cropImage";
import MessageWithImageFormContainer from "../components/MessageWithImageFormContainer";
import ImageForm from "../components/ImageForm";
import ImageFormButtons from "../components/ImageFormButtons";
import ImageFormInput from "../components/ImageFormInput";
import ImageFormCropperContainer from "../components/ImageFormCropperContainer";
import ImageFormSubmitButton from "../components/ImageFormSubmitButton";

interface MessageWithImageFormProps {
  chatId: number;
  setMessageText: Dispatch<SetStateAction<string>>;
  messageText: string;
  scrollToBottom: () => void;
  preview: string;
  close: () => void;
}

const MessageWithImageForm: React.FC<MessageWithImageFormProps> = ({
  chatId,
  setMessageText,
  messageText,
  scrollToBottom,
  preview,
  close,
}) => {
  const [getPresignedUrl, { data }] = useGetPresignedUrlLazyQuery();
  const [sendMessage] = useSendMessageMutation();
  const [croppedImage, setCroppedImage] = useState<Blob | null>(null);
  const {
    crop,
    setCrop,
    zoom,
    setZoom,
    zoomIn,
    zoomOut,
    rotation,
    setRotation,
    rotateClockwise,
    rotateAntiClockwise,
    onCropComplete,
    croppedAreaPixels,
  } = useImageEditor();

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        if (croppedAreaPixels) {
          const croppedImage = await getCroppedImg(
            preview,
            croppedAreaPixels,
            rotation
          );
          setCroppedImage(croppedImage);
          await getPresignedUrl();
        }
      } catch (error) {
        console.log(error);
      }
    },
    [croppedAreaPixels]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value);
  };

  useEffect(() => {
    const sendMessageWithImage = async () => {
      if (data && croppedImage) {
        const { presignedUrl, key } = data.getPresignedUrl;
        await axios.put(presignedUrl, croppedImage, {
          headers: { "Content-Type": croppedImage.type },
        });
        const imageUrl = `${process.env.NEXT_PUBLIC_AWS_S3_URL}/${key}`;
        await sendMessage({
          variables: { chatId, text: messageText, imageUrl },
          update: async (cache, { data }) => {
            cache.modify({
              fields: {
                getPresignedUrl() {
                  return undefined;
                },
              },
            });
          },
        });
        setMessageText("");
        close();
        scrollToBottom();
      }
    };

    if (data && croppedImage) sendMessageWithImage();
  }, [data]);

  return (
    <MessageWithImageFormContainer>
      <ImageForm onSubmit={handleSubmit}>
        <ImageFormButtons
          close={close}
          zoomIn={zoomIn}
          zoomOut={zoomOut}
          rotateClockwise={rotateClockwise}
          rotateAntiClockwise={rotateAntiClockwise}
        />

        <ImageFormCropperContainer>
          <Cropper
            image={preview}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            rotation={rotation}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </ImageFormCropperContainer>

        <ImageFormInput value={messageText} onChange={handleChange} />

        <ImageFormSubmitButton />
      </ImageForm>
    </MessageWithImageFormContainer>
  );
};

export default MessageWithImageForm;
