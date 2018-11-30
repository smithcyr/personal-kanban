import React from 'react';
import { Text, View } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const styles = {
  outer: { paddingTop: 32, paddingLeft: 10, paddingRight: 10 },
  wrapper: { marginBottom: 15, flex: 1, flexDirection: 'row' },
  header: { fontSize: 20 },
  subtextWrapper: { flex: 1, flexDirection: 'row' },
  votes: { color: '#999' },
}

// The data prop, which is provided by the wrapper below contains,
// a `loading` key while the query is in flight and posts when ready
function TaskList({ data: { loading, tasks } }) {
  if (loading) {
    return <Text style={styles.outer}>Loading</Text>;
  } else {
    return (
      <View style={styles.outer}>
        <Text>Tasks</Text>
        {(tasks || []).sort((x, y) => y.id - x.id).map(task => (
          <View key={task.id} style={styles.wrapper}>
            <View>
              <Text style={styles.header}>{task.name}</Text>
              <Text>{task.state}</Text>
              <Text>{task.priority}</Text>
              <View style={styles.subtextWrapper}>
                <Text>{task.content}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  }
}

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (TaskList here)
export default graphql(gql`
query {
  tasks {
    id
    name
    content
    state
    priority
  }
}
`)(TaskList);