import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ProtocolCreation'>;
};

interface Step {
  id: string;
  text: string;
  completed: boolean;
}

export default function ProtocolCreationScreen({ navigation }: Props) {
  const [title, setTitle] = useState('');
  const [steps, setSteps] = useState<Step[]>([{ id: '1', text: '', completed: false }]);

  const addStep = () => {
    setSteps([...steps, { id: Date.now().toString(), text: '', completed: false }]);
  };

  const updateStep = (id: string, text: string) => {
    setSteps(steps.map(step => 
      step.id === id ? { ...step, text } : step
    ));
  };

  const handleSave = () => {
    console.log('Saving protocol:', { title, steps });
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Protocol Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter protocol title"
        placeholderTextColor="#8E8E93"
      />

      <Text style={styles.label}>Steps</Text>
      {steps.map((step) => (
        <TextInput
          key={step.id}
          style={styles.input}
          value={step.text}
          onChangeText={(text) => updateStep(step.id, text)}
          placeholder="Enter step description"
          placeholderTextColor="#8E8E93"
        />
      ))}

      <TouchableOpacity style={styles.addButton} onPress={addStep}>
        <Text style={styles.addButtonText}>Add Step</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.saveButton}
        onPress={handleSave}
      >
        <Text style={styles.saveButtonText}>Save Protocol</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000000',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#FFFFFF',
  },
  addButton: {
    backgroundColor: '#1C1C1E',
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