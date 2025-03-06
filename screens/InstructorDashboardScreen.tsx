import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { mockProtocols, mockFollowers } from '../data/mockData';
import ProgressBar from '../components/ProgressBar';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'InstructorDashboard'>;
};

export default function InstructorDashboardScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Protocols</Text>
        <FlatList
          data={mockProtocols}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <ProgressBar progress={item.progress} />
              <Text style={styles.progressText}>{item.progress}% Complete</Text>
            </View>
          )}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ProtocolCreation')}
        >
          <Text style={styles.buttonText}>Create New Protocol</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Followers</Text>
        <FlatList
          data={mockFollowers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.followerCard}>
              <Text style={styles.followerName}>{item.name}</Text>
              <ProgressBar progress={item.progress} />
              <Text style={styles.progressText}>{item.progress}% Complete</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000000',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#1C1C1E',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  progressText: {
    color: '#8E8E93',
    fontSize: 14,
    marginTop: 8,
  },
  button: {
    backgroundColor: '#0A84FF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  followerCard: {
    backgroundColor: '#1C1C1E',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  followerName: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 12,
  },
});