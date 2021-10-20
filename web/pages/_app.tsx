import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

const createApolloClient = () => {
  const link = createHttpLink({
    uri: "http://localhost:4000/",
    credentials: "include",
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link,
  });
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={createApolloClient()}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
export default MyApp;
