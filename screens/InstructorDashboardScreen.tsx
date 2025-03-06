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
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#0070f3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  followerCard: {
    flexDirection: 'column',
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 10,
  },
  followerName: {
    fontSize: 16,
    marginBottom: 10,
  },
});
