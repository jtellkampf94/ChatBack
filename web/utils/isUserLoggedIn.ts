import type { GetServerSideProps, GetServerSidePropsContext } from "next";

import { createApolloClient } from "./createApolloClient";
import { GetCurrentUserDocument } from "../generated/graphql";

export const isUserLoggedIn: GetServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  const cookies = req.cookies;

  const cookieName = Object.keys(cookies);

  let cookie = "";

  cookieName.forEach((c) => {
    const newCookie = ` ${c}=${cookies[c]};`;
    cookie = cookie + newCookie;
  });

  const result = await createApolloClient({ cookie }).query({
    query: GetCurrentUserDocument,
  });

  if (!result.data.currentUser) {
    res.writeHead(301, { Location: "/login" });
    res.end();
  }

  return { props: {} };
};
