import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

interface Protocol {
  id: string;
  title: string;
  description: string;
  progress?: number;
}

interface ProtocolsScreenProps {
  isInstructor?: boolean;
}

const ProtocolsScreen: React.FC<ProtocolsScreenProps> = ({ isInstructor = false }) => {
  const navigation = useNavigation();
  
  const followerProtocols: Protocol[] = [
    { 
      id: '1', 
      title: '30-Day Fitness Challenge', 
      description: 'Build strength and endurance over 30 days',
      progress: 0.65
    },
    { 
      id: '2', 
      title: 'Morning Routine', 
      description: 'Start your day with energy and focus',
      progress: 0.8
    },
    { 
      id: '3', 
      title: 'Nutrition Plan', 
      description: 'Balanced meals for optimal performance',
      progress: 0.3
    },
  ];
  
  const instructorProtocols: Protocol[] = [
    { 
      id: '1', 
      title: '30-Day Fitness Challenge', 
      description: '12 followers enrolled'
    },
    { 
      id: '2', 
      title: 'Morning Routine', 
      description: '8 followers enrolled'
    },
    { 
      id: '3', 
      title: 'Nutrition Plan', 
      description: '5 followers enrolled'
    },
  ];
  
  const protocols = isInstructor ? instructorProtocols : followerProtocols;
  
  const handleCreateProtocol = () => {
    navigation.navigate('ProtocolCreation' as never);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>
          {isInstructor ? 'Your Protocols' : 'My Protocols'}
        </Text>
        
        {isInstructor && (
          <TouchableOpacity 
            style={styles.createButton}
            onPress={handleCreateProtocol}
            activeOpacity={0.8}
          >
            <Text style={styles.createButtonText}>Create New Protocol</Text>
          </TouchableOpacity>
        )}
        
        <View style={styles.protocolList}>
          {protocols.map(protocol => (
            <TouchableOpacity 
              key={protocol.id}
              style={styles.protocolCard}
              activeOpacity={0.8}
            >
              <View style={styles.protocolHeader}>
                <Text style={styles.protocolTitle}>{protocol.title}</Text>
              </View>
              <Text style={styles.protocolDescription}>{protocol.description}</Text>
              
              {!isInstructor && 'progress' in protocol && (
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { width: `${(protocol.progress || 0) * 100}%` }
                      ]} 
                    />
                  </View>
                  <Text style={styles.progressText}>
                    {`${Math.round((protocol.progress || 0) * 100)}%`}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: '#3E7BFA',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  protocolList: {
    marginTop: 10,
  },
  protocolCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  protocolHeader: {
    marginBottom: 8,
  },
  protocolTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  protocolDescription: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#2C2C2E',
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3E7BFA',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#FFFFFF',
    width: 40,
    textAlign: 'right',
  },
});

export default ProtocolsScreen; 