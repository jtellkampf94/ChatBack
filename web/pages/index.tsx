import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Head from "next/head";
import styled from "styled-components";

import {
  useGetChatsQuery,
  useNewMessageSubscription,
  User,
  NewMessageSubscription,
  NewMessageDocument,
} from "../generated/graphql";
import { isUserLoggedIn } from "../utils/isUserLoggedIn";
import { getUsersFullname } from "../utils/getUsersFullname";
import { formatDate } from "../utils/dateFunctions";

import ChatSection from "../containers/ChatSection";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import ChatPlaceholder from "../components/ChatPlaceholder";
import QueryResult from "../components/QueryResult";
import ContactsTab from "../containers/ContactsTab";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const SidebarContainer = styled.div`
  width: 100%;
  height: 100%;
  flex: 40%;
  min-width: 330px;
  border-right: 1px solid ${({ theme }) => theme.globalTheme.greyLineColor};
  ${({ theme }) => theme.homePageTheme.mediumScreen`
    flex: 35%;
  `};
`;

const ChatWrapper = styled.div`
  width: 100%;
  height: 100%;
  flex: 60%;
  ${({ theme }) => theme.homePageTheme.mediumScreen`
    flex: 65%;
  `};
`;

interface HomePageProps {
  currentUser: User;
}

const Home: NextPage<HomePageProps> = ({ currentUser }) => {
  const [chatId, setChatId] = useState<null | number>(null);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const { data, loading, error, subscribeToMore } = useGetChatsQuery({
    variables: { limit: 1 },
  });
  useNewMessageSubscription();

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

  const handleClick = (selectedChatId: number) => {
    setChatId(selectedChatId);
  };

  return (
    <div>
      <Head>
        <title>Whatsapp Clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <SidebarContainer>
          {toggleSidebar ? (
            <ContactsTab onClick={() => setToggleSidebar(!toggleSidebar)} />
          ) : (
            <Sidebar onClick={() => setToggleSidebar(!toggleSidebar)}>
              <QueryResult loading={loading} error={error}>
                {data?.getChats.map((chat) => {
                  const selectedChatId = Number(chat.id);
                  return (
                    <Chat
                      key={`chatId-${chat.id}`}
                      isHighlighted={chatId === selectedChatId}
                      onClick={() => handleClick(selectedChatId)}
                      name={
                        chat.groupName
                          ? chat.groupName
                          : getUsersFullname(
                              chat.members,
                              Number(currentUser.id)
                            )
                      }
                      isGroupChat={!!chat.groupName}
                      latestMessage={chat.messages?.[0].text}
                      timeOfLatestMessage={formatDate(
                        chat.messages?.[0].createdAt
                      )}
                    />
                  );
                })}
              </QueryResult>
            </Sidebar>
          )}
        </SidebarContainer>
        <ChatWrapper>
          {chatId && data?.getChats ? (
            <ChatSection
              chatId={chatId}
              chat={
                data.getChats.filter((chat) => Number(chat.id) === chatId)[0]
              }
              userId={Number(currentUser.id)}
            />
          ) : (
            <ChatPlaceholder />
          )}
        </ChatWrapper>
      </Container>
    </div>
  );
};

export const getServerSideProps = isUserLoggedIn;

export default Home;
