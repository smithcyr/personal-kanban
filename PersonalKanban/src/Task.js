import React from 'react';
import { Text, View, Button } from 'react-native';
import gql from 'graphql-tag';
import { Mutation } from "react-apollo";

const styles = {
  wrapper: { marginBottom: 15, flex: 1, flexDirection: 'row' },
  header: { fontSize: 20 },
  subtextWrapper: { margin: 10, flex: 1, flexDirection: 'row' },
}

const stateStyle = (state) => {
  switch (state) {
    case "TODO":
      return { color: "grey" };
    case "IN_PROGRESS":
      return { color: "green" };
    case "BLOCKED":
      return { color: "red" };
    case "DONE":
      return { color: "blue" };
    default:
      return {};
  }
}

const COMPLETE_TASK = gql`
  mutation SetState($id: Int!, $state: State!) {
    setState(id: $id, state: $state) {
      id
      state
    }
  }
`;

const Task = ({ task }) =>
  <Mutation mutation={COMPLETE_TASK}>
    {(setState) =>
      <View key={task.id} style={styles.wrapper}>
        <View>
          <Text style={styles.header}>{task.name}</Text>
          <Text style={stateStyle(task.state)}>{task.state}</Text>
          <Text>{task.priority}</Text>
          <View style={styles.subtextWrapper}>
            <Text>{task.content}</Text>
          </View>
          <Button onPress={() => setState({ variables: { id: task.id, state: "DONE" } })} title="Complete Task" />
        </View>
      </View>
    }
  </Mutation>;

export default Task;