import { useEffect, useState, ChangeEvent } from "react";

import {
  useGetChatsQuery,
  NewMessageDocument,
  GetCurrentUserQuery,
  GetChatsQuery,
} from "../generated/graphql";
import SidebarMenu from "../containers/SidebarMenu";
import SearchBar from "../components/SearchBar";
import Chat from "../components/Chat";
import QueryResult from "../components/QueryResult";
import SidebarContainer from "../components/SidebarContainer";
import SidebarHeader from "../components/SidebarHeader";
import SidebarChatContainer from "../components/SidebarChatContainer";
import DropdownItem from "../components/DropdownItem";
import { getUsersFullname } from "../utils/getUsersFullname";
import { formatDate } from "../utils/dateFunctions";

interface SidebarProps {
  toContactsTab: () => void;
  toEditProfileTab: () => void;
  toSearchUsers: () => void;
  currentUser: GetCurrentUserQuery["currentUser"];
  handleClick: (selectedChatId: number) => void;
  handleSetChat: (chat: GetChatsQuery["getChats"][0]) => void;
  handleLogout: () => Promise<void>;
  chatId: number | null;
}

const Sidebar: React.FC<SidebarProps> = ({
  toContactsTab,
  toEditProfileTab,
  toSearchUsers,
  currentUser,
  handleSetChat,
  handleLogout,
  chatId,
  handleClick,
}) => {
  const { data, loading, error, subscribeToMore } = useGetChatsQuery({
    variables: { limit: 1 },
  });
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

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
      >
        <SidebarMenu>
          <DropdownItem onClick={toSearchUsers}>Search users</DropdownItem>
          <DropdownItem onClick={handleLogout}>Log out</DropdownItem>
        </SidebarMenu>
      </SidebarHeader>

      <SearchBar
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search in chats"
      />

      <SidebarChatContainer>
        <QueryResult loading={loading} error={error}>
          {currentUser &&
            data?.getChats
              .filter((chat) => chat.messages?.[0].text.includes(searchTerm))
              .map((chat) => {
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
                    groupAvatarUrl={
                      chat.groupAvatarUrl ? chat.groupAvatarUrl : undefined
                    }
                    profilePictureUrl={
                      chat.members[0].profilePictureUrl
                        ? chat.members[0].profilePictureUrl
                        : undefined
                    }
                    latestMessage={chat.messages?.[0].text}
                    timeOfLatestMessage={formatDate(
                      chat.messages?.[0].createdAt
                    )}
                  />
                );
              })}
        </QueryResult>
      </SidebarChatContainer>
    </SidebarContainer>
  );
};

export default Sidebar;
