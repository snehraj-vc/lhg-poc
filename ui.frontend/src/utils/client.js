import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from "@apollo/client";
// import { RestLink } from "apollo-link-rest";
import { MOCK_GRAPHQL_CLIENT_URL } from './constants';

const httpLink = new HttpLink({
  uri: MOCK_GRAPHQL_CLIENT_URL,
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([httpLink]),
});