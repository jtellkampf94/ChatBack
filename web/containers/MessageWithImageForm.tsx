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
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import RotateRightIcon from "@material-ui/icons/RotateRight";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import CloseIcon from "@material-ui/icons/Close";
import SendIcon from "@material-ui/icons/Send";

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
  background-color: #e9edef;
`;

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const FormActions = styled.div`
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

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px;
  margin-top: 20px;
`;

const Input = styled.input`
  height: 45px;
  outline: none;
  border: none;
  border-radius: 5px;
  width: 70%;
  padding: 20px;
  font-size: 16px;

  &::placeholder {
    color: ${({ theme }) => theme.globalTheme.greyFontColor};
  }
`;

const CropperSection = styled.div`
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

const SubmitButton = styled.button`
  background-color: #00a884;
  box-shadow: 0 3px 12px rgba(11, 20, 26, 0.16);
  border-radius: 50%;
  border: none;
  outline: none;
  width: 60px;
  height: 60px;
  position: absolute;
  bottom: 20px;
  right: 20px;
  color: ${({ theme }) => theme.globalTheme.white};
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    filter: brightness(105%);
    cursor: pointer;
  }
`;

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
          const croppedImage = await getCroppedImg(preview, croppedAreaPixels);
          setCroppedImage(croppedImage);
          await getPresignedUrl();
          console.log(croppedImage, data);
          if (data && croppedImage) {
            console.log(data);
            const { presignedUrl, key } = data.getPresignedUrl;
            await axios.put(presignedUrl, croppedImage, {
              headers: { "Content-Type": croppedImage.type },
            });
            const imageUrl = `${process.env.NEXT_PUBLIC_AWS_S3_URL}/${key}`;
            await sendMessage({
              variables: { chatId, text: messageText, imageUrl },
            });
            setMessageText("");
            close();
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
        <FormActions>
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
        </FormActions>

        <CropperSection>
          <ImageCropperContainer>
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
          </ImageCropperContainer>
        </CropperSection>

        <InputContainer>
          <Input
            type="text"
            placeholder="Type a message"
            onChange={handleChange}
            value={messageText}
          />
        </InputContainer>
        <SubmitButton type="submit">
          <SendIcon />
        </SubmitButton>
      </Form>
    </Container>
  );
};

export default MessageWithImageForm;
