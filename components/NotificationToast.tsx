import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';

interface NotificationToastProps {
  message: string;
  isVisible: boolean;
  onDismiss: () => void;
}

export default function NotificationToast({ 
  message, 
  isVisible, 
  onDismiss 
}: NotificationToastProps) {
  const translateY = new Animated.Value(-100);

  useEffect(() => {
    if (isVisible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();

      // Auto dismiss after 3 seconds
      const timer = setTimeout(() => {
        handleDismiss();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const handleDismiss = () => {
    Animated.spring(translateY, {
      toValue: -100,
      useNativeDriver: true,
    }).start(() => onDismiss());
  };

  if (!isVisible) return null;

  return (
    <Animated.View 
      style={[
        styles.container,
        { transform: [{ translateY }] }
      ]}
    >
      <View style={styles.content}>
        <Text style={styles.message}>{message}</Text>
        <TouchableOpacity onPress={handleDismiss}>
          <Text style={styles.dismissButton}>✕</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    padding: 16,
  },
  content: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  message: {
    color: '#FFFFFF',
    fontSize: 16,
    flex: 1,
    marginRight: 8,
  },
  dismissButton: {
    color: '#8E8E93',
    fontSize: 18,
    padding: 4,
  },
});
