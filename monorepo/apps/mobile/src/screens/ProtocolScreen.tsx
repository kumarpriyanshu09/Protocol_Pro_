import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SectionList, 
  TouchableOpacity, 
  Modal, 
  Platform,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTaskContext } from '../context/TaskContext';

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

const ProtocolScreen = () => {
  const { currentProtocol, todaysTasks, toggleTask } = useTaskContext();
  const [sections, setSections] = useState<Section[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  
  useEffect(() => {
    // Create sections for the SectionList
    if (currentProtocol && todaysTasks) {
      const morningTasks = todaysTasks.filter(task => 
        task.title.toLowerCase().includes('morning') || 
        task.title.toLowerCase().includes('wake')
      );
      
      const eveningTasks = todaysTasks.filter(task => 
        task.title.toLowerCase().includes('evening') || 
        task.title.toLowerCase().includes('sleep') || 
        task.title.toLowerCase().includes('night')
      );
      
      const otherTasks = todaysTasks.filter(task => 
        !morningTasks.includes(task) && !eveningTasks.includes(task)
      );
      
      const newSections = [];
      
      if (morningTasks.length > 0) {
        newSections.push({ title: 'Morning Routine', data: morningTasks });
      }
      
      if (otherTasks.length > 0) {
        newSections.push({ title: 'Daily Tasks', data: otherTasks });
      }
      
      if (eveningTasks.length > 0) {
        newSections.push({ title: 'Evening Routine', data: eveningTasks });
      }
      
      setSections(newSections);
    }
  }, [currentProtocol, todaysTasks]);
  
  const handleTaskPress = (taskId: string) => {
    toggleTask(taskId);
  };
  
  const handleTaskLongPress = (task: Task) => {
    setSelectedTask(task);
    setModalVisible(true);
  };
  
  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedTask(null);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {currentProtocol ? `Protocol #${currentProtocol.id}` : 'No Protocol Selected'}
        </Text>
      </View>
      
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
          </View>
        )}
        renderItem={({ item }) => {
          return (
            <View style={styles.taskContainer}>
              <TouchableOpacity
                style={styles.task}
                onPress={() => handleTaskPress(item.id)}
                onLongPress={() => handleTaskLongPress(item)}
              >
                <View style={[styles.checkbox, item.completed && styles.checkboxChecked]}>
                  {item.completed && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={[styles.taskText, item.completed && styles.taskTextCompleted]}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
        stickySectionHeadersEnabled={true}
        contentContainerStyle={styles.listContent}
      />
      
      <Modal
        animationType="slide" 
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {selectedTask ? selectedTask.title : 'Task Strategies'}
            </Text>
            
            {selectedTask && selectedTask.strategies && selectedTask.strategies.length > 0 ? (
              selectedTask.strategies.map(strategy => (
                <View key={strategy.id} style={styles.strategyItem}>
                  <Text style={styles.strategyText}>{strategy.text}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noStrategiesText}>
                No strategies available for this task.
              </Text>
            )}
            
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseModal}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#0891b2',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  listContent: {
    paddingBottom: 20,
  },
  sectionHeader: {
    backgroundColor: '#e5e5e5',
    padding: 10,
  },
  sectionHeaderText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  taskContainer: {
    backgroundColor: 'white',
    marginVertical: 4,
    marginHorizontal: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#0891b2',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#0891b2',
  },
  checkmark: {
    color: 'white',
    fontSize: 16,
  },
  taskText: {
    fontSize: 16,
    flex: 1,
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  strategyItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
  },
  strategyText: {
    fontSize: 16,
  },
  noStrategiesText: {
    fontSize: 16,
    color: '#888',
    marginVertical: 20,
  },
  closeButton: {
    backgroundColor: '#0891b2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProtocolScreen;
