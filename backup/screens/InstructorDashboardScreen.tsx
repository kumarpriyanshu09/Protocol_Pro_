import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { mockProtocolTemplates, mockFollowers } from '../data/mockData';
import ProgressBar from '../components/ProgressBar';
import { CustomTabBar } from '../navigation';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'InstructorDashboard'>;
};

export default function InstructorDashboardScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState('InstructorDashboard');
  
  // Define tab items for instructor
  const tabItems = [
    { name: 'Protocols', screen: 'ProtocolsScreen' },
    { name: 'Dashboard', screen: 'InstructorDashboard' },
    { name: 'Messages', screen: 'MessagesScreen' },
    { name: 'Settings', screen: 'SettingsScreen' },
  ];
  
  // Calculate followers with 80%+ completion
  const highPerformingFollowers = mockFollowers.filter(f => f.progress >= 80);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>High Performing Followers</Text>
          <Text style={styles.statsNumber}>{highPerformingFollowers.length}</Text>
          <Text style={styles.statsSubtext}>
            followers at 80%+ completion
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Protocols</Text>
            <TouchableOpacity
              style={styles.createButton}
              onPress={() => navigation.navigate('ProtocolCreation')}
            >
              <Text style={styles.createButtonText}>Create New</Text>
            </TouchableOpacity>
          </View>

          {mockProtocolTemplates.map(item => (
            <TouchableOpacity key={item.id} style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <View style={styles.progressContainer}>
                {/* Convert enrolledCount to a percentage scale for ProgressBar (assuming 20 enrollments is 100%) */}
                <ProgressBar progress={Math.min(((item.enrolledCount || 0) / 20) * 100, 100)} />
                <Text style={styles.progressText}>{item.enrolledCount || 0} enrollments</Text>
              </View>
              <Text style={styles.stepsCount}>{item.tasks.length} tasks</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Followers</Text>
          {mockFollowers.map(item => (
            <View key={item.id} style={styles.followerCard}>
              <View style={styles.followerHeader}>
                <Text style={styles.followerName}>{item.name}</Text>
                <Text style={[
                  styles.progressText,
                  item.progress >= 80 && styles.highPerformingText
                ]}>{item.progress}%</Text>
              </View>
              <ProgressBar progress={item.progress} />
            </View>
          ))}
        </View>
        
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
    padding: 20,
  },
  statsCard: {
    backgroundColor: '#1C1C1E',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  statsTitle: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 8,
  },
  statsNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#0A84FF',
    marginBottom: 4,
  },
  statsSubtext: {
    fontSize: 14,
    color: '#8E8E93',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  createButton: {
    backgroundColor: '#0A84FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#1C1C1E',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  progressContainer: {
    marginBottom: 8,
  },
  progressText: {
    color: '#8E8E93',
    fontSize: 14,
    marginTop: 8,
  },
  highPerformingText: {
    color: '#0A84FF',
  },
  stepsCount: {
    color: '#8E8E93',
    fontSize: 12,
    marginTop: 4,
  },
  followerCard: {
    backgroundColor: '#1C1C1E',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  followerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  followerName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
});