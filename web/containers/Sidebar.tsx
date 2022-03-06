import { useEffect } from "react";
import styled from "styled-components";
import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import {
  useGetChatsQuery,
  NewMessageDocument,
  GetCurrentUserQuery,
  GetChatsQuery,
} from "../generated/graphql";
import SearchBar from "../components/SearchBar";
import Chat from "../components/Chat";
import QueryResult from "../components/QueryResult";
import { getUsersFullname } from "../utils/getUsersFullname";
import { formatDate } from "../utils/dateFunctions";
import { globalTheme } from "../themes/globalTheme";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.globalTheme.primaryGrey};
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  height: 67px;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ChatContainer = styled.div`
  width: 100%;
  height: calc(100vh - 120px);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px !important;
    height: 6px !important;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
  }

  &::-webkit-scrollbar-track {
    background: hsla(0, 0%, 100%, 0.1);
  }
`;

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
    <Container>
      <Header>
        <UserAvatar
          onClick={toEditProfileTab}
          style={{
            width: "44px",
            height: "44px",
          }}
          src={
            currentUser?.profilePictureUrl
              ? currentUser.profilePictureUrl
              : undefined
          }
        />

        <IconsContainer>
          <IconButton onClick={toContactsTab}>
            <ChatIcon style={{ fill: globalTheme.iconColor }} />
          </IconButton>
          <IconButton>
            <MoreVertIcon style={{ fill: globalTheme.iconColor }} />
          </IconButton>
        </IconsContainer>
      </Header>

      <SearchBar placeholder="Search in chats" />
      <ChatContainer>
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
      </ChatContainer>
    </Container>
  );
};

export default Sidebar;
