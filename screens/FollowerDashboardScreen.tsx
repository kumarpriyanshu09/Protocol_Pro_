import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ProgressBar from '../components/ProgressBar';
import { mockProtocols } from '../data/mockData';

export default function FollowerDashboardScreen() {
  const currentProtocol = mockProtocols[0]; // Using first protocol as current

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{currentProtocol.title}</Text>
        <View style={styles.progressContainer}>
          <ProgressBar progress={currentProtocol.progress} />
          <Text style={styles.progressText}>
            {currentProtocol.progress}% Complete
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Today's Tasks</Text>
      <FlatList
        data={currentProtocol.steps}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <Text style={styles.taskText}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000000',
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  progressContainer: {
    marginBottom: 8,
  },
  progressText: {
    marginTop: 8,
    color: '#8E8E93',
    fontSize: 14,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  taskCard: {
    backgroundColor: '#1C1C1E',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  taskText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});