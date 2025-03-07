import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTaskContext } from '../context/TaskContext';
import { useNavigation } from '@react-navigation/native';



const TasksScreen = () => {
  const navigation = useNavigation();
  const { 
    currentProtocol, 
    todaysTasks, 
    toggleTask,
    availableProtocols
  } = useTaskContext();
  
  // Get protocol title from the template
  const protocolTitle = currentProtocol 
    ? availableProtocols.find(p => p.id === currentProtocol.templateId)?.title || 'Current Protocol'
    : 'No Active Protocol';
    
  // Handle when no protocol is selected
  const handleNoProtocol = () => {
    Alert.alert(
      'No Active Protocol', 
      'You need to enroll in a protocol to see tasks.', 
      [{ text: 'Browse Protocols', onPress: () => navigation.navigate('ProtocolsScreen' as never) }]
    );
  };

  // If no protocol is selected, show a message
  if (!currentProtocol) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No Active Protocol</Text>
          <Text style={styles.emptyText}>You need to enroll in a protocol to see tasks.</Text>
          <TouchableOpacity 
            style={styles.browseButton}
            onPress={() => navigation.navigate('ProtocolsScreen' as never)}
          >
            <Text style={styles.browseButtonText}>Browse Protocols</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Today's Tasks</Text>
          <Text style={styles.subtitle}>{protocolTitle}</Text>
        </View>
        
        {todaysTasks.length > 0 ? (
          <View style={styles.taskList}>
            {todaysTasks.map(task => (
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
                <View style={styles.taskContent}>
                  <Text style={[
                    styles.taskText,
                    task.completed && styles.taskTextCompleted
                  ]}>
                    {task.title}
                  </Text>
                  {task.completedDate && (
                    <Text style={styles.dateText}>Completed: {task.completedDate}</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No tasks for today.</Text>
          </View>
        )}
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
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
  },
  taskList: {
    marginTop: 10,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  taskContent: {
    flex: 1,
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
    marginBottom: 4,
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#8E8E93',
  },
  dateText: {
    fontSize: 12,
    color: '#8E8E93',
  },
  emptyState: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 24,
  },
  browseButton: {
    backgroundColor: '#3E7BFA',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '100%',
    maxWidth: 300,
  },
  browseButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TasksScreen; 