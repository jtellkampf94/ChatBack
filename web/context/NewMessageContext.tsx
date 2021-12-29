import {
  createContext,
  useContext,
  useState,
  useMemo,
  Dispatch,
  SetStateAction,
} from "react";

import { NewMessageSubscription } from "../generated/graphql";

export const NewMessageContext = createContext<{
  newMessage: NewMessageSubscription["newMessage"] | null;
  setNewMessage?: Dispatch<
    SetStateAction<NewMessageSubscription["newMessage"] | null>
  >;
}>({ newMessage: null });

export const useNewMessage = () => useContext(NewMessageContext);

export const NewMessageProvider: React.FC = ({ children }) => {
  const [newMessage, setNewMessage] = useState<
    NewMessageSubscription["newMessage"] | null
  >(null);

  const newMessageProvider = useMemo(
    () => ({ newMessage, setNewMessage }),
    [newMessage, setNewMessage]
  );

  return (
    <NewMessageContext.Provider value={newMessageProvider}>
      {children}
    </NewMessageContext.Provider>
  );
};
