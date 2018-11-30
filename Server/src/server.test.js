import { createApolloFetch } from 'apollo-fetch';
import gql from 'graphql-tag';
import { print } from 'graphql/language/printer';

import start from './server';

const PORT = 4444;

const fetch = createApolloFetch({
  uri: `http://localhost:${PORT}/graphql`,
});

{
  let httpServer;
  beforeEach(async () => {
    httpServer = await start(PORT, () => { });
  });
  afterEach(async () => httpServer.close());
}

it('Fetches tasks', async () => {
  const result = await fetch({
    query: print(gql`
      query {
        tasks {
          name
        }
      }
    `),
    variables: {},
  });
  expect(result.data.apps).toEqual([{ name: 'Go to store' }, { name: 'Exercise' }, { name: 'Type on computer' }, { name: 'Learn Lisp' }]);
});
