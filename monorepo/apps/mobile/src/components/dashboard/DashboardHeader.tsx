import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProgressBar from '../ProgressBar';
import { Protocol } from '../../types';

interface DashboardHeaderProps {
  protocol: Protocol;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ protocol }) => {
  // Ensure progress is a valid number
  const progress = protocol?.progress || 0;
  
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{protocol?.title || 'Protocol'}</Text>
      <View style={styles.progressContainer}>
        <ProgressBar progress={progress} />
        <Text style={styles.progressText}>
          {progress}% Complete
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default React.memo(DashboardHeader); 