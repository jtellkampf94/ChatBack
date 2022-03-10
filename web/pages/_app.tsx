import "../styles/globals.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";

import { Theme } from "../themes";
import { createApolloClient } from "../utils/createApolloClient";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={createApolloClient()}>
      <Theme>
        <Component {...pageProps} />
      </Theme>
    </ApolloProvider>
  );
}
export default MyApp;
