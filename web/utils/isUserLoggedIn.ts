import type { GetServerSideProps, GetServerSidePropsContext } from "next";

import { createApolloClient } from "./createApolloClient";
import { GetCurrentUserDocument } from "../generated/graphql";

export const isUserLoggedIn: GetServerSideProps = async ({
  req,
  res,
  resolvedUrl,
}: GetServerSidePropsContext) => {
  const cookies = req.cookies;

  const cookieName = Object.keys(cookies);

  let cookie = "";

  cookieName.forEach((c) => {
    const newCookie = ` ${c}=${cookies[c]};`;
    cookie = cookie + newCookie;
  });

  try {
    const result = await createApolloClient({ cookie }).query({
      query: GetCurrentUserDocument,
    });

    console.log(resolvedUrl);

    if (!result.data.currentUser && resolvedUrl === "/") {
      res.writeHead(301, { Location: "/login" });
      res.end();
    }

    if (result.data.currentUser && resolvedUrl === "/login") {
      res.writeHead(301, { Location: "/" });
      res.end();
    }

    return { props: {} };
  } catch (e) {
    res.writeHead(301, { Location: "/login" });
    res.end();
    return { props: {} };
  }
};
