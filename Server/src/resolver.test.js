import { cloneDeep } from 'lodash/fp';
import gql from 'graphql-tag';
import { print } from 'graphql/language/printer';

import { makeExecutableSchema } from 'graphql-tools';
import { graphql } from 'graphql';

import typeDefs from '../src/schema';
import resolvers from '../src/resolvers';

import tasks from '../fixtures/tasks';

const createContext = () =>
  cloneDeep({
    tasks,
  });

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const fetch = (query, variables, context = createContext()) =>
  graphql(schema, query, {}, context, variables);

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
  expect(result.data.tasks).toEqual([{ name: 'Go to store' }, { name: 'Exercise' }, { name: 'Type on computer' }, { name: 'Learn Lisp' }]);
});

it('Fetches task content', async () => {
  const result = await fetch(
    print(gql`
      query($id: Int) {
        task(id: $id) {
          content
        }
      }
    `),
    { id: 0 }
  );
  expect(result.data.content).toEqual({ title: 'Buy things 1, 2, 3, 4' });
});
