import {
  useState,
  FormEvent,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
import styled from "styled-components";
import axios from "axios";

import {
  useGetPresignedUrlLazyQuery,
  useSendMessageMutation,
} from "../generated/graphql";

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
}

const MessageWithImageForm: React.FC<MessageWithImageFormProps> = ({
  chatId,
  setMessageText,
  messageText,
  scrollToBottom,
}) => {
  const [croppedImage, setCroppedImage] = useState<Blob | null>(null);
  const [getPresignedUrl, { data }] = useGetPresignedUrlLazyQuery();
  const [sendMessage] = useSendMessageMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await getPresignedUrl();
    if (data && croppedImage) {
      const { presignedUrl, key } = data.getPresignedUrl;
      await axios.put(presignedUrl, croppedImage, {
        headers: { "Content-Type": croppedImage.type },
      });
      const imageUrl = `${process.env.AWS_S3_URL}/${key}`;
      await sendMessage({ variables: { chatId, text: messageText, imageUrl } });
      setMessageText("");
      scrollToBottom();
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input type="text" onChange={handleChange} value={messageText} />
      </Form>
    </Container>
  );
};

export default MessageWithImageForm;
