import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { gql } from "@apollo/client";

import { createApolloClient } from "../pages/_app";

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

  const CURRENT_USER_QUERY = gql`
    query GetCurrentUser {
      currentUser {
        id
        email
        username
        updatedAt
        createdAt
      }
    }
  `;

  const result = await createApolloClient({ cookie }).query({
    query: CURRENT_USER_QUERY,
  });

  if (!result.data.currentUser) {
    res.writeHead(301, { Location: "/login" });
    res.end();
  }

  return {
    props: {},
  };
};