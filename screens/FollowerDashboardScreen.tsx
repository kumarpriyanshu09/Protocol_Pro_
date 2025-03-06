import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Animated,
  Pressable,
  TouchableOpacity,
  Platform
} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import ProgressBar from '../components/ProgressBar';
import ProgressChart from '../components/charts/ProgressChart';
import { mockProtocols } from '../data/mockData';
import { Props } from '../types';
import NotificationToast from '../components/NotificationToast';

// Mock data for charts
const weeklyProgress = [30, 45, 55, 60, 70, 65, 80];
const categoryProgress = [
  { category: 'Exercise', progress: 75 },
  { category: 'Nutrition', progress: 40 },
  { category: 'Meditation', progress: 60 },
];

export default function FollowerDashboardScreen({ navigation }: Props) {
  const currentProtocol = mockProtocols[0];
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [pressedId, setPressedId] = useState<string | null>(null);
  const [notification, setNotification] = useState({
    message: '',
    isVisible: false
  });

  const showNotification = (message: string) => {
    setNotification({
      message,
      isVisible: true
    });
  };

  const toggleTask = (task: string) => {
    setCompletedTasks(prev => {
      const newTasks = prev.includes(task)
        ? prev.filter(t => t !== task)
        : [...prev, task];

      // Check for milestones
      if (newTasks.length === 3) {
        showNotification('🏆 Achievement Unlocked: Task Master!');
      }

      return newTasks;
    });
  };

  const handleVoiceCommand = (task: string) => {
    showNotification('🎤 Voice command detected: "Complete task"');
    setTimeout(() => toggleTask(task), 1000);
  };

  const renderTask = ({ item, index }: { item: string; index: number }) => {
    const translateX = new Animated.Value(0);
    const [isHovered, setIsHovered] = useState(false);

    const onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
      const { translationX } = event.nativeEvent;
      if (translationX <= 0) { // Only allow left swipe
        translateX.setValue(translationX);
      }
    };

    const onHandlerStateChange = (event: PanGestureHandlerGestureEvent) => {
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
    };

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

  return (
    <SafeAreaView style={styles.container}>
      <NotificationToast
        message={notification.message}
        isVisible={notification.isVisible}
        onDismiss={() => setNotification(prev => ({ ...prev, isVisible: false }))}
      />
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={true}
      >
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
          <Text style={styles.helpText}>Swipe left to complete</Text>
          <View style={styles.taskListContainer}>
            {currentProtocol.steps.map((item, index) => (
              <View key={index} style={styles.taskWrapper}>
                {renderTask({ item, index })}
              </View>
            ))}
          </View>
        </View>
        <TouchableOpacity
          style={styles.achievementsButton}
          onPress={() => navigation.navigate('Achievements')}
        >
          <Text style={styles.achievementsButtonText}>View Achievements</Text>
        </TouchableOpacity>
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
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
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
  helpText: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 8,
    textAlign: 'center',
  },
  taskListContainer: {
    width: '100%',
  },
  taskWrapper: {
    width: '100%',
    marginBottom: 12,
  },
  taskCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    overflow: 'hidden',
  },
  taskPressed: {
    backgroundColor: '#2C2C2E',
  },
  taskHovered: {
    backgroundColor: '#2C2C2E',
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
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
  achievementsButton: {
    backgroundColor: '#1C1C1E',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  achievementsButtonText: {
    color: '#0A84FF',
    fontSize: 16,
    fontWeight: '600',
  },
  voiceButton: {
    padding: 8,
    marginLeft: 8,
  },
});