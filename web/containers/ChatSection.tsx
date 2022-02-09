import {
  useRef,
  useState,
  useEffect,
  FormEvent,
  Fragment,
  ChangeEvent,
} from "react";

import {
  useSendMessageMutation,
  useGetMessagesQuery,
  GetChatsQuery,
  NewMessageDocument,
} from "../generated/graphql";
import { getUsersFullname } from "../utils/getUsersFullname";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import { formatDate } from "../utils/dateFunctions";

import ChatScreen from "../components/ChatScreen";
import Message from "../components/Message";
import ChatForm from "../components/ChatForm";

interface ChatSectionProps {
  chatId: number;
  chat: GetChatsQuery["getChats"][0];
  userId: number;
}

const ChatSection: React.FC<ChatSectionProps> = ({ chatId, chat, userId }) => {
  const endOfMessageRef = useRef<null | HTMLDivElement>(null);
  const [messageText, setMessageText] = useState("");
  const [limit, setLimit] = useState(80);
  const [cursor, setCursor] = useState(null);
  const [sendMessage] = useSendMessageMutation();
  const { loading, error, data, subscribeToMore } = useGetMessagesQuery({
    variables: { chatId, limit, cursor },
  });

  const subscribe = (chatId: number) =>
    subscribeToMore({
      document: NewMessageDocument,
      variables: { chatId, limit, cursor },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        //@ts-ignore
        const newMessage = subscriptionData.data.newMessage;
        const newMessageChatId = Number(newMessage.chatId);
        if (prev.getMessages && chatId === newMessageChatId) {
          return { getMessages: [newMessage, ...prev.getMessages] };
        }

        if (!prev.getMessages && chatId === newMessageChatId) {
          return { getMessages: [newMessage] };
        }

        return prev;
      },
    });

  useEffect(() => {
    const unsubscribe = subscribe(chatId);

    return () => unsubscribe();
  }, [chatId]);

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
    await sendMessage({ variables: { chatId, text: messageText } });
    setMessageText("");
    scrollToBottom();
  };

  return (
    <Fragment>
      <ChatScreen
        name={
          chat.groupName
            ? chat.groupName
            : getUsersFullname(chat.members, userId)
        }
        isGroupChat={!!chat.groupName}
        endOfMessageRef={endOfMessageRef}
      >
        {data?.getMessages?.map((message) => {
          const isUser = userId === Number(message.user.id);
          return (
            <Message
              key={`messageId-${message.id}`}
              isUser={isUser}
              text={message.text}
              sender={
                isUser
                  ? undefined
                  : `${capitalizeFirstLetter(
                      message.user.firstName
                    )} ${capitalizeFirstLetter(message.user.lastName)}`
              }
              dateSent={formatDate(message.createdAt)}
            />
          );
        })}
      </ChatScreen>

      <ChatForm
        onSubmit={handleSubmit}
        onChange={handleChange}
        value={messageText}
      />
    </Fragment>
  );
};

export default ChatSection;