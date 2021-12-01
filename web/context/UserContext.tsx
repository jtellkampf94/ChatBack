import {
  createContext,
  useContext,
  useState,
  useMemo,
  Dispatch,
  SetStateAction,
} from "react";

import { User } from "../generated/graphql";

export const UserContext = createContext<{
  user: User | null;
  setUser?: Dispatch<SetStateAction<User | null>>;
}>({ user: null });

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const userProvider = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <UserContext.Provider value={userProvider}>{children}</UserContext.Provider>
  );
};
