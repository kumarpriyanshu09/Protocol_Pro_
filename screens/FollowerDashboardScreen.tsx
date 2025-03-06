import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import ProgressBar from '../components/ProgressBar';
import ProgressChart from '../components/charts/ProgressChart';
import { mockProtocols } from '../data/mockData';

// Mock data for charts
const weeklyProgress = [30, 45, 55, 60, 70, 65, 80];
const categoryProgress = [
  { category: 'Exercise', progress: 75 },
  { category: 'Nutrition', progress: 40 },
  { category: 'Meditation', progress: 60 },
];

export default function FollowerDashboardScreen() {
  const currentProtocol = mockProtocols[0];
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  const toggleTask = (task: string) => {
    setCompletedTasks(prev => 
      prev.includes(task) 
        ? prev.filter(t => t !== task)
        : [...prev, task]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{currentProtocol.title}</Text>
          <View style={styles.progressContainer}>
            <ProgressBar progress={currentProtocol.progress} />
            <Text style={styles.progressText}>
              {currentProtocol.progress}% Complete
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Progress Overview</Text>
          <Text style={styles.sectionSubtitle}>Weekly Progress</Text>
          <ProgressChart
            progressData={weeklyProgress}
            categoryData={categoryProgress}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Tasks</Text>
          <FlatList
            data={currentProtocol.steps}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.taskCard}
                onPress={() => toggleTask(item)}
              >
                <View style={styles.taskRow}>
                  <View style={[
                    styles.checkbox,
                    completedTasks.includes(item) && styles.checkboxChecked
                  ]}>
                    {completedTasks.includes(item) && (
                      <View style={styles.checkmark} />
                    )}
                  </View>
                  <Text style={[
                    styles.taskText,
                    completedTasks.includes(item) && styles.taskTextCompleted
                  ]}>{item}</Text>
                </View>
              </TouchableOpacity>
            )}
            scrollEnabled={false}
            style={styles.taskList}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
    padding: 20,
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 12,
  },
  taskList: {
    flex: 1,
  },
  taskCard: {
    backgroundColor: '#1C1C1E',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#0A84FF',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#0A84FF',
  },
  checkmark: {
    width: 12,
    height: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  taskText: {
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
  },
  taskTextCompleted: {
    opacity: 0.6,
    textDecorationLine: 'line-through',
  },
});