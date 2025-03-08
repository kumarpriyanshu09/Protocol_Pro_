import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';

export interface ProgressBarProps extends ViewProps {
  value: number;
  max?: number;
  color?: string;
  backgroundColor?: string;
  height?: number;
}

export const ProgressBar = ({
  value,
  max = 100,
  color = '#0891b2',
  backgroundColor = '#e4e4e7',
  height = 8,
  style,
  ...props
}: ProgressBarProps) => {
  // Ensure value is between 0 and max
  const clampedValue = Math.max(0, Math.min(value, max));
  const percentage = (clampedValue / max) * 100;

  return (
    <View
      style={[
        styles.container,
        { height, backgroundColor },
        style,
      ]}
      {...props}
    >
      <View
        style={[
          styles.progress,
          {
            width: `${percentage}%`,
            backgroundColor: color,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
  },
}); 