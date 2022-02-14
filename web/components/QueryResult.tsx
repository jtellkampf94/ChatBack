import { Fragment } from "react";
import styled from "styled-components";
import { ApolloError } from "@apollo/client";

import Spinner from "./Spinner";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ErrorText = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.globalTheme.errorRed};
`;

interface QueryResultProps {
  loading: boolean;
  error: undefined | ApolloError;
}

const QueryResult: React.FC<QueryResultProps> = ({
  loading,
  error,
  children,
}) => {
  if (loading) return <Spinner />;

  if (error)
    return (
      <Container>
        <ErrorText>{error.message}</ErrorText>
      </Container>
    );

  return <Fragment>{children}</Fragment>;
};

export default QueryResult;
