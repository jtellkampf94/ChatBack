import { useState, useContext, createContext } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

const useProvideAuth = () => {
  const [authToken, setAuthToken] = useState(null);

  const getAuthHeaders = () => {
    if (!authToken) return null;

    return {
      authorization: `Bearer ${authToken}`,
    };
  };

  const createApolloClient = () => {
    const link = createHttpLink({
      uri: "http://localhost:4000/",
      credentials: "include",
      headers: getAuthHeaders(),
    });

    return new ApolloClient({
      cache: new InMemoryCache(),
      link,
    });
  };

  return {
    createApolloClient,
  };
};
const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      <ApolloProvider client={auth.createApolloClient()}>
        {children}
      </ApolloProvider>
    </authContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(authContext);
};
