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
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressText: {
    marginTop: 5,
    textAlign: 'center',
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  taskCard: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
});
