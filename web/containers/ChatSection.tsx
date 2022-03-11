import {
  useRef,
  useState,
  useEffect,
  FormEvent,
  Fragment,
  ChangeEvent,
} from "react";
import { Waypoint } from "react-waypoint";

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
import Spinner from "../components/Spinner";

interface ChatSectionProps {
  chatId: number;
  chat: GetChatsQuery["getChats"][0];
  userId: number;
}

const ChatSection: React.FC<ChatSectionProps> = ({ chatId, chat, userId }) => {
  const endOfMessageRef = useRef<null | HTMLDivElement>(null);
  const [messageText, setMessageText] = useState("");
  const [limit, setLimit] = useState(10);
  const [sendMessage] = useSendMessageMutation();
  const { loading, error, data, subscribeToMore, fetchMore, networkStatus } =
    useGetMessagesQuery({
      variables: { chatId, limit },
      notifyOnNetworkStatusChange: true,
    });

  const subscribe = (chatId: number) =>
    subscribeToMore({
      document: NewMessageDocument,
      variables: { chatId, limit },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        //@ts-ignore
        const newMessage = subscriptionData.data.newMessage;
        const newMessageChatId = Number(newMessage.chatId);
        if (prev.getMessages?.messages && chatId === newMessageChatId) {
          return {
            getMessages: {
              messages: [newMessage, ...prev.getMessages.messages],
              hasMore: prev.getMessages.hasMore,
            },
          };
        }

        if (!prev.getMessages?.messages && chatId === newMessageChatId) {
          return { getMessages: { messages: [newMessage], hasMore: false } };
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

  const handleFetchMore = () => {
    if (data?.getMessages) {
      fetchMore({
        variables: {
          limit,
          cursor:
            data.getMessages.messages[data.getMessages.messages.length - 1]
              .createdAt,
        },
      });
    }
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
        profilePictureUrl={
          chat.members[0].profilePictureUrl
            ? chat.members[0].profilePictureUrl
            : undefined
        }
        groupAvatarUrl={chat.groupAvatarUrl ? chat.groupAvatarUrl : undefined}
        endOfMessageRef={endOfMessageRef}
      >
        {data?.getMessages?.messages.map((message) => {
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
        {loading && data?.getMessages && <Spinner small />}
        {loading && !data?.getMessages && <Spinner />}
        {data?.getMessages?.hasMore && <Waypoint onEnter={handleFetchMore} />}
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
