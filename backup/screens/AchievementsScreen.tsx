import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
} from 'react-native';

type Achievement = {
  id: string;
  title: string;
  description: string;
  progress: number;
  isUnlocked: boolean;
};

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: '7-Day Streak',
    description: 'Complete tasks for 7 consecutive days',
    progress: 5,
    isUnlocked: false,
  },
  {
    id: '2',
    title: 'Perfect Week',
    description: 'Complete all tasks in a week',
    progress: 100,
    isUnlocked: true,
  },
  {
    id: '3',
    title: 'Early Bird',
    description: 'Complete morning tasks before 8 AM',
    progress: 80,
    isUnlocked: false,
  },
];

export default function AchievementsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Achievements</Text>
        <Text style={styles.subtitle}>Track your milestones</Text>

        {mockAchievements.map((achievement) => (
          <Pressable
            key={achievement.id}
            style={({ pressed }) => [
              styles.achievementCard,
              pressed && styles.pressed
            ]}
          >
            <View style={styles.cardContent}>
              <View style={styles.badgeContainer}>
                <View style={[
                  styles.badge,
                  achievement.isUnlocked && styles.badgeUnlocked
                ]} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.description}>{achievement.description}</Text>
                <View style={styles.progressBar}>
                  <View style={[
                    styles.progressFill,
                    { width: `${achievement.progress}%` }
                  ]} />
                </View>
                <Text style={styles.progressText}>
                  {achievement.progress}% Complete
                </Text>
              </View>
            </View>
          </Pressable>
        ))}
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 24,
  },
  achievementCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  pressed: {
    backgroundColor: '#2C2C2E',
  },
  cardContent: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeContainer: {
    marginRight: 16,
  },
  badge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2C2C2E',
    borderWidth: 2,
    borderColor: '#8E8E93',
  },
  badgeUnlocked: {
    backgroundColor: '#0A84FF',
    borderColor: '#0A84FF',
  },
  textContainer: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 12,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#2C2C2E',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0A84FF',
  },
  progressText: {
    fontSize: 12,
    color: '#8E8E93',
  },
});
