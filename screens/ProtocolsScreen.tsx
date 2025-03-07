import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTaskContext } from '../context/TaskContext';

interface ProtocolsScreenProps {
  isInstructor?: boolean;
}

const ProtocolsScreen: React.FC<ProtocolsScreenProps> = ({ isInstructor = false }) => {
  const navigation = useNavigation();
  const { 
    availableProtocols, 
    enrolledProtocols, 
    enrollInProtocol,
    setCurrentProtocol
  } = useTaskContext();
  
  // Determine which protocols to display based on user type
  const protocols = isInstructor 
    ? availableProtocols.map(protocol => ({
        id: protocol.id,
        title: protocol.title,
        description: `${protocol.enrolledCount || 0} followers enrolled`,
        templateData: protocol
      }))
    : enrolledProtocols.map(protocol => ({
        id: protocol.id,
        title: availableProtocols.find(t => t.id === protocol.templateId)?.title || protocol.id,
        description: availableProtocols.find(t => t.id === protocol.templateId)?.description || '',
        progress: protocol.progress,
        userProtocolData: protocol
      }));
  
  // Handle protocol selection
  const handleProtocolSelect = (protocolId: string) => {
    if (isInstructor) {
      // For instructors, navigate to protocol details/edit screen
      // This would be implemented in a real app
      Alert.alert('View Protocol', 'You would see protocol details and enrolled followers here.');
    } else {
      // For followers, set as current protocol and navigate to tasks
      setCurrentProtocol(protocolId);
      navigation.navigate('TasksScreen' as never);
    }
  };
  
  // Handle enrollment in a protocol
  const handleEnrollInProtocol = (templateId: string) => {
    enrollInProtocol(templateId);
    Alert.alert('Success', 'You have enrolled in this protocol!');
  };
  
  // Handle creating a new protocol (for instructors)
  const handleCreateProtocol = () => {
    navigation.navigate('ProtocolCreation' as never);
  };
  
  // Show available protocols for enrollment if the user is a follower
  const renderAvailableProtocols = () => {
    if (isInstructor) return null;
    
    // Filter out protocols the user is already enrolled in
    const enrolledTemplateIds = enrolledProtocols.map(p => p.templateId);
    const availableForEnrollment = availableProtocols.filter(
      p => !enrolledTemplateIds.includes(p.id)
    );
    
    if (availableForEnrollment.length === 0) return null;
    
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Protocols</Text>
        {availableForEnrollment.map(protocol => (
          <TouchableOpacity 
            key={protocol.id}
            style={styles.protocolCard}
            onPress={() => handleEnrollInProtocol(protocol.id)}
            activeOpacity={0.8}
          >
            <View style={styles.protocolHeader}>
              <Text style={styles.protocolTitle}>{protocol.title}</Text>
            </View>
            <Text style={styles.protocolDescription}>{protocol.description}</Text>
            <TouchableOpacity 
              style={styles.enrollButton}
              onPress={() => handleEnrollInProtocol(protocol.id)}
            >
              <Text style={styles.enrollButtonText}>Enroll</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    );
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
        
        {protocols.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {isInstructor ? 'Created Protocols' : 'Enrolled Protocols'}
            </Text>
            <View style={styles.protocolList}>
              {protocols.map(protocol => (
                <TouchableOpacity 
                  key={protocol.id}
                  style={styles.protocolCard}
                  onPress={() => handleProtocolSelect(protocol.id)}
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
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              {isInstructor 
                ? 'You haven\'t created any protocols yet.' 
                : 'You aren\'t enrolled in any protocols yet.'}
            </Text>
          </View>
        )}
        
        {/* Available protocols for enrollment (followers only) */}
        {renderAvailableProtocols()}
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
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
  emptyState: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
  },
  enrollButton: {
    backgroundColor: '#3E7BFA',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  enrollButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ProtocolsScreen; 