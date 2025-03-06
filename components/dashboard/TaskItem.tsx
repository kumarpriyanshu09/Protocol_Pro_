import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
  TouchableOpacity,
  Platform
} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import { useTaskContext } from '../../context/TaskContext';

interface TaskItemProps {
  item: string;
  index: number;
}

const TaskItem: React.FC<TaskItemProps> = ({ item, index }) => {
  const { completedTasks, toggleTask, showNotification } = useTaskContext();
  const [isHovered, setIsHovered] = useState(false);
  const [pressedId, setPressedId] = useState<string | null>(null);
  const translateX = useRef(new Animated.Value(0)).current;

  const onGestureEvent = useCallback((event: PanGestureHandlerGestureEvent) => {
    const { translationX } = event.nativeEvent;
    if (translationX <= 0) { // Only allow left swipe
      translateX.setValue(translationX);
    }
  }, [translateX]);

  const onHandlerStateChange = useCallback((event: PanGestureHandlerGestureEvent) => {
    if (event.nativeEvent.state === 5) { // END state
      const { translationX } = event.nativeEvent;
      if (translationX < -100) { // Threshold for completing task
        toggleTask(item);
      }
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [item, toggleTask, translateX]);

  const handleVoiceCommand = useCallback((task: string) => {
    showNotification('🎤 Voice command detected: "Complete task"');
    setTimeout(() => toggleTask(task), 1000);
  }, [showNotification, toggleTask]);

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
    >
      <Animated.View style={[
        styles.taskCard,
        { transform: [{ translateX }] }
      ]}>
        <Pressable
          onPressIn={() => setPressedId(index.toString())}
          onPressOut={() => setPressedId(null)}
          onPress={() => toggleTask(item)}
          {...(Platform.OS === 'web' ? {
            onMouseEnter: () => setIsHovered(true),
            onMouseLeave: () => setIsHovered(false),
          } : {})}
          style={({ pressed }) => [
            styles.taskRow,
            pressed && styles.taskPressed,
            isHovered && styles.taskHovered
          ]}
        >
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
          <TouchableOpacity
            onPress={() => handleVoiceCommand(item)}
            style={styles.voiceButton}
          >
            <Text>🎤</Text>
          </TouchableOpacity>
        </Pressable>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  taskCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    overflow: 'hidden',
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#0A84FF',
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#0A84FF',
  },
  checkmark: {
    width: 12,
    height: 6,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#FFFFFF',
    transform: [{ rotate: '-45deg' }],
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#8E8E93',
  },
  taskPressed: {
    opacity: 0.7,
  },
  taskHovered: {
    backgroundColor: '#2C2C2E',
  },
  voiceButton: {
    padding: 8,
  },
});

export default React.memo(TaskItem); 