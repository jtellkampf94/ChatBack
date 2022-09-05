import { useRef, useState, useEffect, Fragment } from "react";
import { Waypoint } from "react-waypoint";
import { useMediaQuery } from "react-responsive";

import {
  useGetMessagesQuery,
  GetChatsQuery,
  NewMessageDocument,
} from "../generated/graphql";
import { getUsersFullname } from "../utils/getUsersFullname";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import { formatDate } from "../utils/dateFunctions";

import ChatScreen from "../components/ChatScreen";
import Message from "../components/Message";
import ChatForm from "./ChatForm";
import Spinner from "../components/Spinner";
import MessageWithImageForm from "./MessageWithImageForm";

interface ChatSectionProps {
  chatId: number;
  chat: GetChatsQuery["getChats"][0];
  userId: number;
  backToMessages: () => void;
}

const ChatSection: React.FC<ChatSectionProps> = ({
  chatId,
  chat,
  userId,
  backToMessages,
}) => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 880px)" });
  const endOfMessageRef = useRef<null | HTMLDivElement>(null);
  const [messageText, setMessageText] = useState("");
  const [limit, setLimit] = useState(10);
  const [preview, setPreview] = useState<string | null>(null);
  const { loading, error, refetch, data, subscribeToMore, fetchMore } =
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

        if (chatId === newMessageChatId) {
          if (prev.getMessages?.messages) {
            if (
              prev.getMessages.messages.filter(
                (message) => Number(message.id) === Number(newMessage.id)
              ).length === 0
            ) {
              return {
                getMessages: {
                  messages: [newMessage, ...prev.getMessages.messages],
                  hasMore: prev.getMessages.hasMore,
                },
              };
            } else {
              return {
                getMessages: {
                  messages: prev.getMessages.messages.map((message) => {
                    if (Number(message.id) === Number(newMessage.id))
                      return newMessage;
                    return message;
                  }),
                  hasMore: prev.getMessages.hasMore,
                },
              };
            }
          }

          if (!prev.getMessages?.messages) {
            return { getMessages: { messages: [newMessage], hasMore: false } };
          }
        }

        return prev;
      },
    });

  useEffect(() => {
    refetch();
    const unsubscribe = subscribe(chatId);

    return () => unsubscribe();
  }, [chatId]);

  const scrollToBottom = () => {
    endOfMessageRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
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

  const handleClosePreview = () => {
    setPreview(null);
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
        isSmallScreen={isSmallScreen}
        onClick={backToMessages}
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
              imageUrl={message.imageUrl ? message.imageUrl : undefined}
            />
          );
        })}
        {loading && data?.getMessages && <Spinner small />}
        {loading && !data?.getMessages && <Spinner />}
        {data?.getMessages?.hasMore && <Waypoint onEnter={handleFetchMore} />}
      </ChatScreen>

      {!preview ? (
        <ChatForm
          chatId={chatId}
          setPreview={setPreview}
          setMessageText={setMessageText}
          messageText={messageText}
          scrollToBottom={scrollToBottom}
        />
      ) : (
        <MessageWithImageForm
          chatId={chatId}
          setMessageText={setMessageText}
          messageText={messageText}
          scrollToBottom={scrollToBottom}
          preview={preview}
          close={handleClosePreview}
        />
      )}
    </Fragment>
  );
};

export default ChatSection;
