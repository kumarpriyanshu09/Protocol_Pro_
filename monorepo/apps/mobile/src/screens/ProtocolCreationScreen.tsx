import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { useTaskContext } from '../context/TaskContext';
import { ProtocolTask } from '../data/mockData';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ProtocolCreation'>;
};

interface TaskInput {
  id: string;
  title: string;
  description: string;
  frequency: string;
}

export default function ProtocolCreationScreen({ navigation }: Props) {
  // Access the task context
  const { availableProtocols } = useTaskContext();
  
  // State for protocol details
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState<TaskInput[]>([
    { 
      id: '1', 
      title: '', 
      description: '',
      frequency: 'Daily'
    }
  ]);

  // Add a new task
  const addTask = () => {
    setTasks([...tasks, { 
      id: Date.now().toString(), 
      title: '', 
      description: '',
      frequency: 'Daily'
    }]);
  };

  // Update task title
  const updateTaskTitle = (id: string, title: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, title } : task
    ));
  };
  
  // Update task description
  const updateTaskDescription = (id: string, description: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, description } : task
    ));
  };
  
  // Update task frequency
  const updateTaskFrequency = (id: string, frequency: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, frequency } : task
    ));
  };
  
  // Remove a task
  const removeTask = (id: string) => {
    if (tasks.length <= 1) {
      Alert.alert('Cannot Remove', 'A protocol must have at least one task.');
      return;
    }
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Validate the protocol before saving
  const validateProtocol = () => {
    if (!title.trim()) {
      Alert.alert('Missing Information', 'Please enter a protocol title.');
      return false;
    }
    
    if (!description.trim()) {
      Alert.alert('Missing Information', 'Please enter a protocol description.');
      return false;
    }
    
    // Check if all tasks have titles
    const emptyTasks = tasks.filter(task => !task.title.trim());
    if (emptyTasks.length > 0) {
      Alert.alert('Missing Information', 'All tasks must have a title.');
      return false;
    }
    
    return true;
  };

  // Save the protocol
  const handleSave = () => {
    if (!validateProtocol()) return;
    
    // In a real app, this would save to a database
    // For now, we'll just log it and navigate back
    const newProtocol = {
      id: `template-${Date.now()}`,
      title,
      description,
      createdBy: 'instructor1', // In a real app, this would be the current user's ID
      tasks: tasks.map(task => ({
        id: `task-${task.id}`,
        title: task.title,
        description: task.description,
        frequency: task.frequency
      })) as ProtocolTask[],
      enrolledCount: 0
    };
    
    console.log('Saving protocol:', newProtocol);
    Alert.alert('Success', 'Protocol created successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Protocol Details</Text>
          
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter protocol title"
            placeholderTextColor="#8E8E93"
            accessibilityLabel="Protocol title input"
          />
          
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter protocol description"
            placeholderTextColor="#8E8E93"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            accessibilityLabel="Protocol description input"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tasks</Text>
          <Text style={styles.sectionDescription}>
            Add tasks that followers will need to complete as part of this protocol.
          </Text>
          
          {tasks.map((task) => (
            <View key={task.id} style={styles.taskContainer}>
              <View style={styles.taskHeader}>
                <Text style={styles.taskNumber}>Task {tasks.indexOf(task) + 1}</Text>
                <TouchableOpacity 
                  onPress={() => removeTask(task.id)}
                  style={styles.removeButton}
                  accessibilityLabel={`Remove task ${tasks.indexOf(task) + 1}`}
                  accessibilityRole="button"
                >
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
              
              <Text style={styles.label}>Title</Text>
              <TextInput
                style={styles.input}
                value={task.title}
                onChangeText={(text) => updateTaskTitle(task.id, text)}
                placeholder="Enter task title"
                placeholderTextColor="#8E8E93"
                accessibilityLabel={`Task ${tasks.indexOf(task) + 1} title input`}
              />
              
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={task.description}
                onChangeText={(text) => updateTaskDescription(task.id, text)}
                placeholder="Enter task description"
                placeholderTextColor="#8E8E93"
                multiline
                numberOfLines={2}
                textAlignVertical="top"
                accessibilityLabel={`Task ${tasks.indexOf(task) + 1} description input`}
              />
              
              <Text style={styles.label}>Frequency</Text>
              <View style={styles.frequencyContainer}>
                {['Daily', 'Weekly', 'Monthly'].map((freq) => (
                  <TouchableOpacity
                    key={freq}
                    style={[
                      styles.frequencyOption,
                      task.frequency === freq && styles.frequencyOptionSelected
                    ]}
                    onPress={() => updateTaskFrequency(task.id, freq)}
                    accessibilityLabel={`Set task ${tasks.indexOf(task) + 1} frequency to ${freq}`}
                    accessibilityRole="button"
                  >
                    <Text 
                      style={[
                        styles.frequencyText,
                        task.frequency === freq && styles.frequencyTextSelected
                      ]}
                    >
                      {freq}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}

          <TouchableOpacity 
            style={styles.addButton} 
            onPress={addTask}
            accessibilityLabel="Add new task"
            accessibilityRole="button"
          >
            <Text style={styles.addButtonText}>Add Task</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}
          accessibilityLabel="Save protocol"
          accessibilityRole="button"
        >
          <Text style={styles.saveButtonText}>Save Protocol</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000000',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#FFFFFF',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  taskContainer: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  taskNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  removeButton: {
    padding: 8,
  },
  removeButtonText: {
    color: '#FF453A',
    fontSize: 14,
    fontWeight: '500',
  },
  frequencyContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  frequencyOption: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#2C2C2E',
    marginRight: 8,
    alignItems: 'center',
  },
  frequencyOptionSelected: {
    backgroundColor: '#0A84FF',
  },
  frequencyText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  frequencyTextSelected: {
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#2C2C2E',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    color: '#0A84FF',
    fontSize: 16,
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: '#0A84FF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});