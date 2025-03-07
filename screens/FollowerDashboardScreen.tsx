import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import { Props } from '../types';
import { useTaskContext } from '../context/TaskContext';
import NotificationToast from '../components/NotificationToast';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import ProgressOverview from '../components/dashboard/ProgressOverview';
import TaskList from '../components/dashboard/TaskList';
import { CustomTabBar } from '../navigation';

// Mock data for charts - in a real app, this would come from an API or context
const weeklyProgress = [30, 45, 55, 60, 70, 65, 80];
const categoryProgress = [
  { category: 'Exercise', progress: 75 },
  { category: 'Nutrition', progress: 40 },
  { category: 'Meditation', progress: 60 },
];

export default function FollowerDashboardScreen({ navigation }: Props) {
  const { currentProtocol, notification, dismissNotification } = useTaskContext();
  const [activeTab, setActiveTab] = useState('FollowerDashboard');

  // Define tab items for follower
  const tabItems = [
    { name: 'Protocols', screen: 'ProtocolsScreen' },
    { name: 'Tasks', screen: 'FollowerDashboard' },
    { name: 'Journal', screen: 'JournalScreen' },
    { name: 'Settings', screen: 'SettingsScreen' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <NotificationToast
        message={notification.message}
        isVisible={notification.isVisible}
        onDismiss={dismissNotification}
      />
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={true}
      >
        <DashboardHeader protocol={currentProtocol} />
        
        <ProgressOverview 
          weeklyProgress={weeklyProgress}
          categoryProgress={categoryProgress}
        />
        
        <TaskList />
        
        <TouchableOpacity
          style={styles.achievementsButton}
          onPress={() => navigation.navigate('Achievements')}
        >
          <Text style={styles.achievementsButtonText}>View Achievements</Text>
        </TouchableOpacity>
        
        {/* Add extra padding at the bottom to account for the tab bar */}
        <View style={{ height: 100 }} />
      </ScrollView>
      
      {/* Add the custom tab bar */}
      <CustomTabBar items={tabItems} activeTab={activeTab} />
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
  achievementsButton: {
    backgroundColor: '#0A84FF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  achievementsButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});