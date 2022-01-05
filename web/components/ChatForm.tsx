import { useState, FormEvent } from "react";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import AddAPhotoOutlinedIcon from "@material-ui/icons/AddAPhotoOutlined";
import SendIcon from "@material-ui/icons/Send";

import { globalTheme } from "../themes/globalTheme";
import { useSendMessageMutation } from "../generated/graphql";

const ChatBox = styled.form`
  height: 77px;
  padding: 10px 17px;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.globalTheme.chatBoxBackground};
  border-top: 1px solid ${({ theme }) => theme.globalTheme.greyLineColor};
  width: 100%;
`;

const MessageInput = styled.input`
  outline-width: 0;
  padding-left: 17px;
  border: none;
  width: 100%;
  margin: 0 17px;
  font-size: 16px;
  height: 36px;
  border-radius: 18px;

  &::placeholder {
    color: ${({ theme }) => theme.globalTheme.greyFontColor};
  }
`;

interface ChatFormProps {
  scrollToBottom: () => void;
  chatId: number;
}

const ChatForm: React.FC<ChatFormProps> = ({ chatId, scrollToBottom }) => {
  const [messageText, setMessageText] = useState("");
  const [sendMessage] = useSendMessageMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendMessage({ variables: { chatId, text: messageText } });
    setMessageText("");
    scrollToBottom();
  };

  return (
    <ChatBox onSubmit={handleSubmit}>
      <IconButton type="button">
        <AddAPhotoOutlinedIcon
          style={{ fill: globalTheme.iconColor, width: "30px", height: "30px" }}
        />
      </IconButton>
      <MessageInput
        onChange={(e) => setMessageText(e.target.value)}
        value={messageText}
        placeholder="Type a message"
      />
      <IconButton type="submit">
        <SendIcon
          style={{ fill: globalTheme.iconColor, width: "30px", height: "30px" }}
        />
      </IconButton>
    </ChatBox>
  );
};

export default ChatForm;
