import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split,
  ApolloLink,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";

import { PaginatedMessages, PaginatedUsers } from "../generated/graphql";

export const createApolloClient = (headers?: Record<string, string>) => {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_SERVER_URL,
    credentials: "include",
    headers: headers || {},
  });

  let splitLink: HttpLink | ApolloLink = httpLink;

  if (process.browser) {
    const wsLink = new WebSocketLink({
      uri: process.env.NEXT_PUBLIC_SERVER_WS as string,
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
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getMessages: {
              keyArgs: ["chatId"],
              merge(
                //@ts-ignore
                existing: PaginatedMessages = {},
                incoming: PaginatedMessages,
                //@ts-ignore
                { args: { cursor } }
              ) {
                if (cursor)
                  return {
                    messages: [...existing.messages, ...incoming.messages],
                    hasMore: incoming.hasMore,
                  };

                return incoming;
              },
            },
            searchUsers: {
              keyArgs: ["searchTerm"],
              merge(
                //@ts-ignore
                existing: PaginatedUsers = {},
                incoming: PaginatedUsers,
                //@ts-ignore
                { args: { page } }
              ) {
                if (page > 0) {
                  return {
                    users: [...existing.users, ...incoming.users],
                    hasMore: incoming.hasMore,
                  };
                }
                return incoming;
              },
            },
          },
        },
      },
    }),
    link: splitLink,
  });
};
