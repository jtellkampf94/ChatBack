import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  split,
  ApolloLink,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";

import { Theme } from "../themes";
import { UserProvider } from "../context/UserContext";

export const createApolloClient = (headers?: Record<string, string>) => {
  const httpLink = new HttpLink({
    uri: "http://localhost:4000/",
    credentials: "include",
    headers: headers || {},
  });

  let splitLink: HttpLink | ApolloLink = httpLink;

  if (process.browser) {
    const wsLink = new WebSocketLink({
      uri: "ws://localhost:4000/",
      options: {
        reconnect: true,
      },
    });

    splitLink = split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink,
      httpLink
    );
  }

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink,
  });
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={createApolloClient()}>
      <Theme>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </Theme>
    </ApolloProvider>
  );
}
export default MyApp;
