import React, { useState, useEffect, useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SectionList, 
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  StatusBar,
  Dimensions,
  ActivityIndicator,
  Platform,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTaskContext } from '../context/TaskContext';
// We'll still use the protocolData for strategies, but match it to the real protocol
import { protocolData } from '../data/protocolData';

interface Strategy {
  id: string;
  text: string;
}

interface Task {
  id: string;
  title: string;
  strategies: Strategy[];
  completed?: boolean;
}

interface Section {
  title: string;
  data: Task[];
}

const ProtocolScreen: React.FC = () => {
  const { currentProtocol, todaysTasks, toggleTask } = useTaskContext();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedStrategies, setSelectedStrategies] = useState<Strategy[]>([]);
  const [selectedTaskTitle, setSelectedTaskTitle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  // Debug log for initial render
  console.log('ProtocolScreen rendering, current protocol:', currentProtocol?.title);

  useEffect(() => {
    // Set loading to false once we have the current protocol
    if (currentProtocol) {
      setLoading(false);
    }
  }, [currentProtocol]);
  
  // Create sections by matching the task titles with protocolData strategies
  const sections: Section[] = useMemo(() => {
    if (!currentProtocol || !Array.isArray(currentProtocol.tasks) || currentProtocol.tasks.length === 0) {
      return [];
    }
    
    // Create a mapping of categories from protocolData
    const categoryMap: Record<string, Task[]> = {};
    
    try {
      // This is where we map the tasks from the current protocol with strategies from protocolData
      Object.keys(protocolData).forEach(category => {
        const categoryTasks: Task[] = [];
        
        if (protocolData[category]) {
          Object.keys(protocolData[category]).forEach(taskTitle => {
            // Find if this task exists in the current protocol
            const matchingTask = currentProtocol.tasks.find(task => 
              task && task.title && (
                task.title.toLowerCase().includes(taskTitle.toLowerCase()) || 
                taskTitle.toLowerCase().includes(task.title.toLowerCase())
              )
            );
            
            if (matchingTask) {
              categoryTasks.push({
                id: matchingTask.id,
                title: matchingTask.title,
                completed: matchingTask.completed || false,
                strategies: protocolData[category][taskTitle].map((strategy, index) => ({
                  id: `strategy-${index}`,
                  text: strategy
                }))
              });
            }
          });
          
          if (categoryTasks.length > 0) {
            categoryMap[category] = categoryTasks;
          }
        }
      });
      
      // Convert to the format expected by SectionList
      return Object.keys(categoryMap).map(category => ({
        title: category,
        data: categoryMap[category] || []
      }));
    } catch (error) {
      console.error('Error creating sections:', error);
      return [];
    }
  }, [currentProtocol]);

  // Handle long press on a task to show strategies
  const handleTaskLongPress = (task: Task) => {
    console.log('LONG PRESS HANDLER ACTIVATED on task:', task.title);
    console.log('Task strategies:', JSON.stringify(task.strategies || []));
    
    // Add a direct test to verify strategies exist
    if (!task.strategies || task.strategies.length === 0) {
      console.error('No strategies found for task:', task.title);
      
      // Create placeholder strategies if none exist
      const placeholderStrategies = [
        { id: 'placeholder-1', text: 'Strategy information not available' },
        { id: 'placeholder-2', text: 'Try updating the protocol data' }
      ];
      setSelectedStrategies(placeholderStrategies);
    } else {
      setSelectedStrategies(task.strategies);
    }
    
    setSelectedTaskTitle(task.title);
    
    // For iOS, we need to bypass the React state update and force the modal to appear
  if (Platform.OS === 'ios') {
    console.log('iOS LONG PRESS - Bypassing normal flow');
    // Force immediate UI update with requestAnimationFrame
    requestAnimationFrame(() => {
      // Use state updater function to ensure we get the latest state
      setModalVisible(true);
      
      // Provide visual feedback that long press was detected
      DEV_ALERT(
        'Strategy Details', 
        `${task.strategies?.length || 0} strategies available for "${task.title}"`
      );
      
      // Schedule a verification check
      setTimeout(() => {
        console.log('iOS verification check - Modal should be visible now');
        // If modal still not showing, trigger a second attempt
        if (!modalVisible) {
          console.log('iOS fallback - Forcing second attempt');
          setModalVisible(true);
        }
      }, 300);
    });
  } else {
    // Normal flow for Android/Web
    setModalVisible(true);
  }
  };
  
  // Handle tap on a task to toggle completion
  const handleTaskPress = (taskId: string) => {
    toggleTask(taskId);
  };

  // Dismiss the modal when tapping outside or on close button
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Huberman Productivity Protocol</Text>
        <Text style={styles.subtitle}>Tap to mark complete • Long-press for strategies</Text>
        {/* Debug button to manually trigger modal */}
        <TouchableOpacity 
          style={styles.debugButton}
          onPress={() => {
            // Show feedback before opening modal
            if (Platform.OS === 'ios') {
              // On iOS, display a quick alert to confirm button press
              DEV_ALERT('iOS Debug Test', 'Testing modal on iOS...');
            }
            
            const mockTask = {
              id: 'debug-task',
              title: 'Debug Task for iOS',
              strategies: [
                { id: 'debug-1', text: 'This is a debug strategy to test modal' },
                { id: 'debug-2', text: 'If you see this, modal rendering works' },
                { id: 'debug-3', text: 'Try long-pressing on actual tasks' }
              ]
            };
            
            console.log('Debug button pressed - opening modal with mock data');
            handleTaskLongPress(mockTask);
          }}
        >
          <Text style={styles.debugButtonText}>TEST MODAL ON {Platform.OS.toUpperCase()}</Text>
        </TouchableOpacity>
      </View>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading protocol...</Text>
        </View>
      ) : !currentProtocol ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No protocol selected</Text>
        </View>
      ) :
      
      <SectionList
        sections={sections || []}
        keyExtractor={(item) => item?.id || Math.random().toString()}
        renderItem={({ item }) => {
          if (!item) return null;
          return (
            <TouchableOpacity
              style={[styles.taskItem, item.completed && styles.taskCompleted]}
              onPress={() => item.id && handleTaskPress(item.id)}
              onLongPress={() => {
                console.log('Long press triggered on:', item.title);
                if (item) handleTaskLongPress(item);
              }}
              activeOpacity={0.5}
              delayLongPress={Platform.OS === 'ios' ? 800 : 300}
              pressRetentionOffset={{ top: 50, left: 50, bottom: 50, right: 50 }}
              hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
            >
              <View style={styles.taskContent}>
                <View style={[styles.checkbox, item.completed && styles.checkboxChecked]}>
                  {item.completed && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={[styles.taskText, item.completed && styles.taskTextCompleted]}>
                  {item.title || 'Untitled Task'}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        renderSectionHeader={({ section }) => {
          if (!section || !section.title) return null;
          return (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>{section.title}</Text>
            </View>
          );
        }}
        stickySectionHeadersEnabled={true}
        contentContainerStyle={styles.listContent}
      />
      
      {/* Modal for displaying strategies - completely revamped implementation */}
      {Platform.OS === 'ios' ? (
        // iOS-specific modal implementation
        <Modal
          animationType="slide" 
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
          onShow={() => console.log('iOS MODAL ONSHOW CALLED')}
          presentationStyle="formSheet"
        >
          <View style={[styles.modalContainer, styles.iosModalContainer]}>
            <View style={styles.iosModalContent}>
              <View style={styles.iosModalHeader}>
                <Text style={styles.iosModalTitle}>{selectedTaskTitle}</Text>
                <TouchableOpacity
                  style={styles.iosCloseButton}
                  onPress={handleCloseModal}
                >
                  <Text style={styles.iosCloseButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
              
              <Text style={styles.iosModalSubtitle}>Strategies</Text>
              
              <View style={styles.iosStrategyList}>
                {(selectedStrategies || []).map((strategy) => 
                  strategy ? (
                    <View key={strategy.id || Math.random().toString()} style={styles.iosStrategyItem}>
                      <Text style={styles.iosStrategyBullet}>•</Text>
                      <Text style={styles.iosStrategyText}>{strategy.text || ''}</Text>
                    </View>
                  ) : null
                )}
              </View>
              
              <TouchableOpacity
                style={styles.iosDoneButton}
                onPress={handleCloseModal}
              >
                <Text style={styles.iosDoneButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      ) : (
        // Android/Web modal implementation
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
          statusBarTranslucent={true}
          hardwareAccelerated={true}
        >
          <TouchableWithoutFeedback onPress={handleCloseModal}>
            <View style={styles.modalOverlay}>
              {console.log('Modal overlay rendering - visible state:', modalVisible)}
              <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>{selectedTaskTitle}</Text>
                  <Text style={styles.modalSubtitle}>Strategies</Text>
                  
                  <View style={styles.strategyList}>
                    {(selectedStrategies || []).map((strategy) => 
                      strategy ? (
                        <View key={strategy.id || Math.random().toString()} style={styles.strategyItem}>
                          <Text style={styles.strategyBullet}>•</Text>
                          <Text style={styles.strategyText}>{strategy.text || ''}</Text>
                        </View>
                      ) : null
                    )}
                </View>
                
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => {
                    console.log('Close button pressed');
                    handleCloseModal();
                  }}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Modal>
    )
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');

// Add iOS-specific alert if DEBUG is true
const DEV_ALERT = (title: string, message: string) => {
  if (__DEV__ && Platform.OS === 'ios') {
    Alert.alert(title, message);
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  // iOS Modal specific styles
  iosModalContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    flex: 1,
  },
  iosModalContent: {
    backgroundColor: '#1C1C1E',
    borderRadius: 14,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  iosModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingBottom: 10,
  },
  iosModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
  },
  iosModalSubtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#CCCCCC',
    marginBottom: 15,
    alignSelf: 'flex-start',
  },
  iosStrategyList: {
    width: '100%',
    marginBottom: 20,
  },
  iosStrategyItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  iosStrategyBullet: {
    fontSize: 18,
    color: '#007AFF',
    marginRight: 8,
    marginTop: -2,
  },
  iosStrategyText: {
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
    lineHeight: 22,
  },
  iosCloseButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#333',
  },
  iosCloseButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  iosDoneButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 12,
    width: '100%',
    alignItems: 'center',
  },
  iosDoneButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
  },
  listContent: {
    paddingBottom: 20,
  },
  sectionHeader: {
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  taskItem: {
    backgroundColor: '#1C1C1E',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginHorizontal: 12,
    marginTop: 12,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#007AFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  taskCompleted: {
    borderLeftColor: '#34C759',
    opacity: 0.8,
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#34C759',
    borderColor: '#34C759',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  taskText: {
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    opacity: 0.7,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#8E8E93',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#8E8E93',
  },
  debugButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  debugButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 9999,
  },
  modalContent: {
    width: width * 0.9,
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    padding: 24,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    borderWidth: 2,
    borderColor: '#007AFF',
    maxHeight: '80%',
    zIndex: 10000,
    alignSelf: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#007AFF',
    marginBottom: 16,
    fontWeight: '600',
  },
  strategyList: {
    marginBottom: 20,
  },
  strategyItem: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingRight: 10,
  },
  strategyBullet: {
    fontSize: 16,
    color: '#007AFF',
    marginRight: 8,
    marginTop: -2,
  },
  strategyText: {
    fontSize: 16,
    color: '#D3D3D3',
    flex: 1,
  },
  closeButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProtocolScreen;
