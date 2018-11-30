import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import typeDefs from './schema';
import resolvers from './resolvers';

import tasks from '../fixtures/tasks';

const context = {
  tasks,
};

const app = express();

function start(port, log = console.log) {
  const server = new ApolloServer({ typeDefs, resolvers, context });

  server.applyMiddleware({ app });

  return new Promise((resolve, reject) => {
    const httpServer = app.listen({ port }, error => {
      if (error) reject(error);
      log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
      resolve(httpServer);
    });
  });
}

export default start;
