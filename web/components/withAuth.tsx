import * as React from "react";
import { NextPageContext } from "next";

import redirect from "../lib/redirect";
import { useCurrentUserQuery } from "../generated/graphql";

export const withAuth = <T extends object>(C: React.ComponentClass<T>) => {
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
