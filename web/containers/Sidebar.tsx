import { useEffect } from "react";

import {
  useGetChatsQuery,
  NewMessageDocument,
  GetCurrentUserQuery,
  GetChatsQuery,
} from "../generated/graphql";
import SearchBar from "../components/SearchBar";
import Chat from "../components/Chat";
import QueryResult from "../components/QueryResult";
import SidebarContainer from "../components/SidebarContainer";
import SidebarHeader from "../components/SidebarHeader";
import SidebarChatContainer from "../components/SidebarChatContainer";
import { getUsersFullname } from "../utils/getUsersFullname";
import { formatDate } from "../utils/dateFunctions";

interface SidebarProps {
  toContactsTab: () => void;
  toEditProfileTab: () => void;
  currentUser: GetCurrentUserQuery["currentUser"];
  handleClick: (selectedChatId: number) => void;
  handleSetChat: (chat: GetChatsQuery["getChats"][0]) => void;
  chatId: number | null;
}

const Sidebar: React.FC<SidebarProps> = ({
  toContactsTab,
  toEditProfileTab,
  currentUser,
  handleSetChat,
  chatId,
  handleClick,
}) => {
  const { data, loading, error, subscribeToMore } = useGetChatsQuery({
    variables: { limit: 1 },
  });

  const subscribe = () =>
    subscribeToMore({
      document: NewMessageDocument,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        //@ts-ignore
        const newMessage = subscriptionData.data.newMessage;
        const newChats = prev.getChats.map((chat) => {
          if (Number(chat.id) === Number(newMessage.chatId)) {
            return { ...chat, messages: [newMessage] };
          }
          return chat;
        });

        return { getChats: newChats };
      },
    });

  useEffect(() => {
    const unsubscribe = subscribe();

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (data && chatId) {
      handleSetChat(
        data.getChats.filter((chat) => Number(chat.id) === chatId)[0]
      );
    }
  }, [chatId]);

  return (
    <SidebarContainer>
      <SidebarHeader
        profilePictureUrl={
          currentUser?.profilePictureUrl
            ? currentUser.profilePictureUrl
            : undefined
        }
        onAvatarClick={toEditProfileTab}
        onContactsClick={toContactsTab}
      />

      <SearchBar placeholder="Search in chats" />

      <SidebarChatContainer>
        <QueryResult loading={loading} error={error}>
          {currentUser &&
            data?.getChats.map((chat) => {
              const selectedChatId = Number(chat.id);

              return (
                <Chat
                  key={`chatId-${chat.id}`}
                  isHighlighted={chatId === selectedChatId}
                  onClick={() => handleClick(selectedChatId)}
                  name={
                    chat.groupName
                      ? chat.groupName
                      : getUsersFullname(chat.members, Number(currentUser.id))
                  }
                  isGroupChat={!!chat.groupName}
                  latestMessage={chat.messages?.[0].text}
                  timeOfLatestMessage={formatDate(chat.messages?.[0].createdAt)}
                />
              );
            })}
        </QueryResult>
      </SidebarChatContainer>
    </SidebarContainer>
  );
};

export default Sidebar;