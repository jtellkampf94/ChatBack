import { useState } from "react";
import styled from "styled-components";
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

  const handleSubmit = () => {
    useSendMessageMutation({ variables: { chatId, text: messageText } });
    scrollToBottom();
  };

  return (
    <ChatBox onSubmit={handleSubmit}>
      <AddAPhotoOutlinedIcon
        style={{ fill: globalTheme.iconColor, width: "30px", height: "30px" }}
      />
      <MessageInput
        onChange={(e) => setMessageText(e.target.value)}
        value={messageText}
        placeholder="Type a message"
      />
      <SendIcon
        style={{ fill: globalTheme.iconColor, width: "30px", height: "30px" }}
      />
    </ChatBox>
  );
};

export default ChatForm;
