import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
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
  const { currentProtocol, todaysTasks, notification, dismissNotification } = useTaskContext();
  const [activeTab, setActiveTab] = useState('FollowerDashboard');
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

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
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0A84FF" />
            <Text style={styles.loadingText}>Loading your dashboard...</Text>
          </View>
        ) : (
          <>
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
          </>
        )}
        
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 300,
  },
  loadingText: {
    color: '#FFFFFF',
    marginTop: 16,
    fontSize: 16,
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