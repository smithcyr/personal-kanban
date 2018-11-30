import { gql } from 'apollo-server-express';

export default gql`
  enum Priority {
    CRITICAL
    HIGH
    NORMAL
    LOW
  }

  enum State {
    TODO
    IN_PROGRESS
    BLOCKED
    DONE
  }

  type Task {
    id: Int!
    name: String!
    content: String
    state: State
    priority: Priority
  }

  type Query {
    task(id: Int!): Task
    tasks(state: State, priority: Priority): [Task!]!
  }

  type Mutation {
    addTask(name: String!, content: String, state: State, priority: Priority): Task
    setPriority(id: Int!, priority: Priority!): Task
    setState(id: Int!, state: State!): Task
  }
`;
