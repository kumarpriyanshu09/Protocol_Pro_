import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ProgressBarProps {
  /**
   * The progress value between 0 and 100
   */
  progress: number;
  
  /**
   * Optional label for accessibility
   */
  accessibilityLabel?: string;
}

/**
 * A progress bar component that visually represents completion progress.
 * 
 * @param progress - A number between 0 and 100 representing the progress percentage
 * @param accessibilityLabel - Optional custom accessibility label
 */
export default function ProgressBar({ 
  progress, 
  accessibilityLabel 
}: ProgressBarProps) {
  // Ensure progress is between 0 and 100 and convert to integer to avoid precision errors
  const clampedProgress = Math.min(Math.max(0, progress), 100);
  // Round to nearest integer for accessibilityValue to avoid precision errors
  const intProgress = Math.round(clampedProgress);
  
  return (
    <View 
      style={styles.container}
      accessible={true}
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel || `Progress: ${intProgress}%`}
      accessibilityValue={{ min: 0, max: 100, now: intProgress }}
    >
      <View 
        style={[styles.bar, { width: `${clampedProgress}%` }]}
        testID="progress-bar"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 8,
    backgroundColor: '#2C2C2E',
    borderRadius: 4,
    overflow: 'hidden',
    width: '100%',
  },
  bar: {
    height: '100%',
    backgroundColor: '#0A84FF',
    shadowColor: '#0A84FF',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
});