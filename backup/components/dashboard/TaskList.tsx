import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import TaskItem from './TaskItem';
import { useTaskContext } from '../../context/TaskContext';

const TaskList: React.FC = () => {
  const { currentProtocol, todaysTasks, toggleTask } = useTaskContext();

  // If no protocol is selected or no tasks are available
  if (!currentProtocol || !todaysTasks || todaysTasks.length === 0) {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>
            {!currentProtocol 
              ? 'No active protocol selected.' 
              : 'No tasks available for today.'}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Today's Tasks</Text>
      <Text style={styles.helpText}>Tap a task to mark it as complete</Text>
      <View style={styles.taskListContainer}>
        {todaysTasks.map((task, index) => (
          <View key={task.id || `task-${index}`} style={styles.taskWrapper}>
            <TaskItem 
              item={task} 
              index={index} 
              onToggle={() => toggleTask(task.id)} 
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  helpText: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 8,
    textAlign: 'center',
  },
  taskListContainer: {
    width: '100%',
  },
  taskWrapper: {
    width: '100%',
    marginBottom: 12,
  },
  emptyStateContainer: {
    padding: 20,
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  emptyStateText: {
    color: '#8E8E93',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default React.memo(TaskList); 