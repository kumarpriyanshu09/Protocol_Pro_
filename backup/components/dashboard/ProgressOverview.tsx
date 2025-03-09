import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProgressChart from '../charts/ProgressChart';
import { CategoryProgress } from '../../types';

interface ProgressOverviewProps {
  weeklyProgress: number[];
  categoryProgress: CategoryProgress[];
}

const ProgressOverview: React.FC<ProgressOverviewProps> = ({ 
  weeklyProgress, 
  categoryProgress 
}) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Progress Overview</Text>
      <Text style={styles.sectionSubtitle}>Weekly Progress</Text>
      <ProgressChart
        progressData={weeklyProgress}
        categoryData={categoryProgress}
      />
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
  sectionSubtitle: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 12,
  },
});

export default React.memo(ProgressOverview); 