import {
  createContext,
  useContext,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

export const ChatContext = createContext<{
  chatId: number | null;
  setChatId?: Dispatch<SetStateAction<number | null>>;
}>({ chatId: null });

export const useChatId = () => useContext(ChatContext);

export const ChatProvider: React.FC = ({ children }) => {
  const [chatId, setChatId] = useState<number | null>(null);
  const providerChatId = useMemo(
    () => ({ chatId, setChatId }),
    [chatId, setChatId]
  );

  return (
    <ChatContext.Provider value={providerChatId}>
      {children}
    </ChatContext.Provider>
  );
};
