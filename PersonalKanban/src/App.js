import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import TaskList from './TaskList';
import { InMemoryCache } from 'apollo-cache-inmemory';

export const link = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

export const cache = new InMemoryCache();

export default class extends Component {
  constructor(...args) {
    super(...args);

    this.client = new ApolloClient({
      cache,
      link,
    });
  }
  render() {
    return (
      <ApolloProvider client={this.client}>
        <TaskList />
      </ApolloProvider>
    );
  }
}