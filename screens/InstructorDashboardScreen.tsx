import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { mockProtocols, mockFollowers } from '../data/mockData';
import ProgressBar from '../components/ProgressBar';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'InstructorDashboard'>;
};

export default function InstructorDashboardScreen({ navigation }: Props) {
  // Calculate followers with 80%+ completion
  const highPerformingFollowers = mockFollowers.filter(f => f.progress >= 80);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
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

          <FlatList
            data={mockProtocols}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.card}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <View style={styles.progressContainer}>
                  <ProgressBar progress={item.progress} />
                  <Text style={styles.progressText}>{item.progress}% Complete</Text>
                </View>
                <Text style={styles.stepsCount}>{item.steps.length} steps</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Followers</Text>
          <FlatList
            data={mockFollowers}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.followerCard}>
                <View style={styles.followerHeader}>
                  <Text style={styles.followerName}>{item.name}</Text>
                  <Text style={[
                    styles.progressText,
                    item.progress >= 80 && styles.highPerformingText
                  ]}>{item.progress}%</Text>
                </View>
                <ProgressBar progress={item.progress} />
              </View>
            )}
          />
        </View>
      </View>
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