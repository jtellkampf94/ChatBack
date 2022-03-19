import {
  useState,
  FormEvent,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";
import styled from "styled-components";
import axios from "axios";
import Cropper from "react-easy-crop";

import {
  useGetPresignedUrlLazyQuery,
  useSendMessageMutation,
} from "../generated/graphql";
import { useImageEditor } from "../hooks/useImageEditor";
import getCroppedImg from "../utils/cropImage";

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 67px;
  background-color: white;
`;

const Form = styled.form``;

const Input = styled.input``;

interface MessageWithImageFormProps {
  chatId: number;
  setMessageText: Dispatch<SetStateAction<string>>;
  messageText: string;
  scrollToBottom: () => void;
  preview: string;
}

const MessageWithImageForm: React.FC<MessageWithImageFormProps> = ({
  chatId,
  setMessageText,
  messageText,
  scrollToBottom,
  preview,
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
    onCropComplete,
    croppedAreaPixels,
  } = useImageEditor();

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        if (croppedAreaPixels) {
          const croppedImage = await getCroppedImg(preview, croppedAreaPixels);
          setCroppedImage(croppedImage);
          await getPresignedUrl();
          if (data && croppedImage) {
            const { presignedUrl, key } = data.getPresignedUrl;
            await axios.put(presignedUrl, croppedImage, {
              headers: { "Content-Type": croppedImage.type },
            });
            const imageUrl = `${process.env.AWS_S3_URL}/${key}`;
            await sendMessage({
              variables: { chatId, text: messageText, imageUrl },
            });
            setMessageText("");
            scrollToBottom();
          }
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

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input type="text" onChange={handleChange} value={messageText} />
        <Cropper
          image={preview}
          crop={crop}
          zoom={zoom}
          cropShape="round"
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
        <button type="button" onClick={zoomIn}>
          +
        </button>{" "}
        <button type="button" onClick={zoomOut}>
          -
        </button>
      </Form>
    </Container>
  );
};

export default MessageWithImageForm;
