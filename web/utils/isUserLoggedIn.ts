import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { gql } from "@apollo/client";

import { createApolloClient } from "../pages/_app";
import { GetCurrentUserDocument } from "../generated/graphql";

export const CURRENT_USER_QUERY = gql`
  query GetCurrentUser {
    currentUser {
      id
      username
      firstName
      lastName
      about
      profilePictureUrl
    }
  }
`;

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

  return {
    props: {
      currentUser: result.data.currentUser,
    },
  };
};
