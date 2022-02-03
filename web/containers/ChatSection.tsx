import { useRef, useState, FormEvent, Fragment, ChangeEvent } from "react";

import { useSendMessageMutation } from "../generated/graphql";
import ChatWrapper from "../components/ChatWrapper";
import ChatScreen from "../components/ChatScreen";
import Message from "../components/Message";
import ChatForm from "../components/ChatForm";

interface ChatSectionProps {
  chatId: number | null;
}

const ChatSection: React.FC<ChatSectionProps> = ({ chatId }) => {
  const endOfMessageRef = useRef<null | HTMLDivElement>(null);
  const [messageText, setMessageText] = useState("");
  const [sendMessage] = useSendMessageMutation();

  const scrollToBottom = () => {
    endOfMessageRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (chatId) {
      await sendMessage({ variables: { chatId, text: messageText } });
      setMessageText("");
      scrollToBottom();
    }
  };

  return (
    <ChatWrapper>
      {chatId && (
        <Fragment>
          <ChatScreen
            name="tttt"
            isGroupChat={true}
            endOfMessageRef={endOfMessageRef}
          ></ChatScreen>
          <ChatForm
            onSubmit={handleSubmit}
            onChange={handleChange}
            value={messageText}
          />
        </Fragment>
      )}
    </ChatWrapper>
  );
};

export default ChatSection;
