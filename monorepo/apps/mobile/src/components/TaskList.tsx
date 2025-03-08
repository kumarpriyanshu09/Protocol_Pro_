import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TextInput } from 'react-native';
import { useAppSelector, useAppDispatch, addTask, deleteTask, toggleTaskCompletion } from 'store';
import { Button, Card, CardContent, CardHeader, CardTitle, Text } from 'ui';

export const TaskList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: tasks, isLoading, error } = useAppSelector((state) => state.tasks);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      dispatch(
        addTask({
          title: newTaskTitle,
          completed: false,
          strategies: [],
        })
      );
      setNewTaskTitle('');
    }
  };

  const handleToggleTask = (id: string) => {
    dispatch(toggleTaskCompletion(id));
  };

  const handleDeleteTask = (id: string) => {
    dispatch(deleteTask(id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Text>Loading tasks...</Text>
        ) : error ? (
          <Text style={{ color: 'red' }}>{error}</Text>
        ) : (
          <>
            <View style={styles.addTaskContainer}>
              <TextInput
                style={styles.input}
                value={newTaskTitle}
                onChangeText={setNewTaskTitle}
                placeholder="Add a new task"
              />
              <Button onPress={handleAddTask}>Add</Button>
            </View>
            {tasks.length === 0 ? (
              <Text>No tasks available</Text>
            ) : (
              <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.taskItem}>
                    <View style={styles.taskContent}>
                      <Text
                        style={[
                          styles.taskTitle,
                          item.completed && styles.completedTask,
                        ]}
                      >
                        {item.title}
                      </Text>
                      {item.description && (
                        <Text style={styles.taskDescription}>{item.description}</Text>
                      )}
                    </View>
                    <View style={styles.taskActions}>
                      <Button onPress={() => handleToggleTask(item.id)}>
                        {item.completed ? 'Undo' : 'Complete'}
                      </Button>
                      <Button onPress={() => handleDeleteTask(item.id)}>
                        Delete
                      </Button>
                    </View>
                  </View>
                )}
              />
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

const styles = StyleSheet.create({
  addTaskContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  taskActions: {
    flexDirection: 'row',
  },
}); 