import React, { memo } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

interface LoadingIndicatorProps {
  message?: string;
  fullScreen?: boolean;
}

/**
 * A reusable loading indicator component that displays an activity spinner and optional message.
 * 
 * @param message - Optional text to display below the spinner (defaults to "Loading...")
 * @param fullScreen - Whether the indicator should take up the full screen (defaults to false)
 */
const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ 
  message = 'Loading...', 
  fullScreen = false 
}) => {
  return (
    <View 
      style={[styles.container, fullScreen && styles.fullScreen]}
      testID="loading-container"
      accessible={true}
      accessibilityLabel={`Loading indicator. ${message}`}
      accessibilityRole="progressbar"
      accessibilityState={{ busy: true }}
    >
      <ActivityIndicator 
        size="large" 
        color="#0A84FF" 
        accessibilityLabel="Loading spinner"
      />
      {message && (
        <Text 
          style={styles.message}
          accessibilityLiveRegion="polite"
        >
          {message}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreen: {
    flex: 1,
    backgroundColor: '#000000',
  },
  message: {
    marginTop: 12,
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
  },
});

export default memo(LoadingIndicator); 