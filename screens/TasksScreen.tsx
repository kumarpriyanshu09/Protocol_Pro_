import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

const TasksScreen = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Morning Meditation', completed: false },
    { id: '2', title: 'Run 5K', completed: false },
    { id: '3', title: 'Protein Breakfast', completed: true },
    { id: '4', title: 'Read 30 Minutes', completed: false },
    { id: '5', title: 'Evening Stretch', completed: false },
  ]);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Today's Tasks</Text>
        
        <View style={styles.taskList}>
          {tasks.map(task => (
            <TouchableOpacity 
              key={task.id}
              style={styles.taskItem}
              onPress={() => toggleTask(task.id)}
              activeOpacity={0.7}
            >
              <View style={[
                styles.checkbox, 
                task.completed && styles.checkboxCompleted
              ]}>
                {task.completed && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={[
                styles.taskText,
                task.completed && styles.taskTextCompleted
              ]}>
                {task.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  taskList: {
    marginTop: 10,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#3E7BFA',
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#3E7BFA',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  taskText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#8E8E93',
  },
});

export default TasksScreen; 