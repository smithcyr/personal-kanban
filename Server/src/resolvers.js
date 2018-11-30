import { keyBy, isEqual, difference } from 'lodash/fp';

export default {
  Query: {
    task: (_rootValue, { id }, context) => {
      return getTask(context, id);
    },
    tasks: (_rootValue, { state, priority }, context) => {
      return context.tasks.filter(task => (!state || task.state === state) && (!priority || task.priority === priority));
    },
  },
  Mutation: {
    addTask: (_, { name, content, state, priority }, context) => {
      const id = getNextId(context);
      const task = { name, content, state, priority, id };
      context.tasks.push(task);
      return task;
    },
    setPriority: (_, { id, priority }, context) => {
      const task = getTask(context, id);
      if (task) {
        task.priority = priority;
      }
      return task;
    },
    setState: (_, { id, state }, context) => {
      const task = getTask(context, id);
      if (task) {
        task.state = state;
      }
      return task;
    },
  },
};

function getTask(context, id) {
  return context.tasks.find(task => task.id === id);
}

// todo something better
function getNextId(context) {
  return context.tasks.reduce((id, task) => Math.max(id, task.id), 0) + 1;
}