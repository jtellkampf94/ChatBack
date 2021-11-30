import styled from "styled-components";

import { useChatId } from "../context/ChatContext";
import ChatScreen from "./ChatScreen";

const ChatScreenContainer = styled.div`
  width: 100%;
  height: 100%;
  flex: 60%;
  ${({ theme }) => theme.homePageTheme.mediumScreen`
    flex: 65%;
  `};
`;

const ChatSection: React.FC = () => {
  const { chatId } = useChatId();
  return (
    <ChatScreenContainer>
      {chatId && <ChatScreen chatId={chatId} />}
    </ChatScreenContainer>
  );
};

export default ChatSection;
