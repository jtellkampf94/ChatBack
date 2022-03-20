import {
  useState,
  useEffect,
  useRef,
  FormEvent,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  MouseEvent,
} from "react";
import IconButton from "@material-ui/core/IconButton";
import AddAPhotoOutlinedIcon from "@material-ui/icons/AddAPhotoOutlined";
import SendIcon from "@material-ui/icons/Send";

import { useSendMessageMutation } from "../generated/graphql";
import { globalTheme } from "../themes/globalTheme";
import ChatFormContainer from "../components/ChatFormContainer";
import ChatFormForm from "../components/ChatFormForm";
import ChatFormInput from "../components/ChatFormInput";

interface ChatFormProps {
  chatId: number;
  setPreview: Dispatch<SetStateAction<string | null>>;
  setMessageText: Dispatch<SetStateAction<string>>;
  messageText: string;
  scrollToBottom: () => void;
}

const ChatForm: React.FC<ChatFormProps> = ({
  chatId,
  setMessageText,
  setPreview,
  messageText,
  scrollToBottom,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [sendMessage] = useSendMessageMutation();

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }, [file]);

  const handleClick = () => {
    fileInputRef?.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files ? e.target.files[0] : null);
  };

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value);
  };

  const handleFileClick = (
    e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>
  ) => {
    //@ts-ignore
    e.target.value = "";
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!messageText) return;
    await sendMessage({ variables: { chatId, text: messageText } });
    setMessageText("");
    scrollToBottom();
  };

  return (
    <ChatFormContainer>
      <ChatFormForm onSubmit={handleSubmit}>
        <IconButton onClick={handleClick} type="button">
          <AddAPhotoOutlinedIcon
            style={{
              fill: globalTheme.iconColor,
              width: "30px",
              height: "30px",
            }}
          />
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
            onClick={handleFileClick}
            ref={fileInputRef}
          />
        </IconButton>
        <ChatFormInput onChange={handleMessageChange} value={messageText} />
        <IconButton type="submit">
          <SendIcon
            style={{
              fill: globalTheme.iconColor,
              width: "30px",
              height: "30px",
            }}
          />
        </IconButton>
      </ChatFormForm>
    </ChatFormContainer>
  );
};

export default ChatForm;
