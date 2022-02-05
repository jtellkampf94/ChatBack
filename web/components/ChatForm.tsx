import { FormEvent, ChangeEvent } from "react";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import AddAPhotoOutlinedIcon from "@material-ui/icons/AddAPhotoOutlined";
import SendIcon from "@material-ui/icons/Send";

import { globalTheme } from "../themes/globalTheme";

const Container = styled.div`
  background-color: ${({ theme }) => theme.globalTheme.chatBoxBackground};
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid ${({ theme }) => theme.globalTheme.greyLineColor};
  border-bottom: 1px solid ${({ theme }) => theme.globalTheme.greyLineColor};
`;

const ChatBox = styled.form`
  padding: 10px 17px;
  display: flex;
  align-items: center;
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
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const ChatForm: React.FC<ChatFormProps> = ({ onSubmit, onChange, value }) => {
  return (
    <Container>
      <ChatBox onSubmit={onSubmit}>
        <IconButton type="button">
          <AddAPhotoOutlinedIcon
            style={{
              fill: globalTheme.iconColor,
              width: "30px",
              height: "30px",
            }}
          />
        </IconButton>
        <MessageInput
          onChange={onChange}
          value={value}
          placeholder="Type a message"
        />
        <IconButton type="submit">
          <SendIcon
            style={{
              fill: globalTheme.iconColor,
              width: "30px",
              height: "30px",
            }}
          />
        </IconButton>
      </ChatBox>
    </Container>
  );
};

export default ChatForm;
