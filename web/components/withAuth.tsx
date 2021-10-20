import * as React from "react";
import { NextPage, NextPageContext } from "next";

import redirect from "../lib/redirect";
import { useCurrentUserQuery, CurrentUserQuery } from "../generated/graphql";

const withAuth = <T extends object>(C: NextPage) => {
  return class AuthComponent extends React.Component<T> {
    static async getInitialProps(ctx: NextPageContext) {
      const { data, error, loading } = useCurrentUserQuery();
      if (!data?.currentUser?.id || error) {
        redirect(ctx, "/");
        return {
          currentUser: null,
        };
      }

      return {
        currentUser: data.currentUser,
      };
    }

    render() {
      return <C {...this.props} />;
    }
  };
};

export default withAuth;
