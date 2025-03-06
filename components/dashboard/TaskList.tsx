import React, { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TaskItem from './TaskItem';
import { useTaskContext } from '../../context/TaskContext';

const TaskList: React.FC = () => {
  const { currentProtocol } = useTaskContext();

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Today's Tasks</Text>
      <Text style={styles.helpText}>Swipe left to complete</Text>
      <View style={styles.taskListContainer}>
        {currentProtocol.steps.map((item, index) => (
          <View key={`task-${index}`} style={styles.taskWrapper}>
            <TaskItem item={item} index={index} />
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
});

export default React.memo(TaskList); 