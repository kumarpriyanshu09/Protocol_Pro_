import React from 'react';
import { Modal, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAppSelector, useAppDispatch, closeTaskStrategiesModal, toggleTaskCompletion } from 'store';
import { Button, Card, CardContent, CardHeader, CardTitle, Text } from 'ui';

export const TaskStrategiesModal = () => {
  const dispatch = useAppDispatch();
  const { items: tasks } = useAppSelector((state) => state.tasks);
  const { isTaskStrategiesModalOpen, selectedTaskId } = useAppSelector((state) => state.ui);

  const handleClose = () => {
    dispatch(closeTaskStrategiesModal());
  };

  const handleToggleCompletion = (taskId: string) => {
    dispatch(toggleTaskCompletion(taskId));
  };

  // Filter tasks if a specific task is selected
  const tasksToDisplay = selectedTaskId 
    ? tasks.filter(task => task.id === selectedTaskId)
    : tasks;

  return (
    <Modal
      visible={isTaskStrategiesModalOpen}
      transparent={true}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 15 }}>
              Task Strategies
            </Text>
          </View>
          <ScrollView style={styles.scrollView}>
            {tasksToDisplay.length > 0 ? (
              tasksToDisplay.map((task) => (
                <Card key={task.id} style={styles.taskCard}>
                  <CardHeader>
                    <View style={styles.taskHeader}>
                      <Text 
                        style={[
                          styles.taskTitle, 
                          task.completed && styles.completedTask
                        ]}
                      >
                        {task.title}
                      </Text>
                      <TouchableOpacity
                        style={[
                          styles.checkbox,
                          task.completed && styles.checkboxChecked
                        ]}
                        onPress={() => handleToggleCompletion(task.id)}
                      >
                        {task.completed && <Text style={styles.checkmark}>✓</Text>}
                      </TouchableOpacity>
                    </View>
                  </CardHeader>
                  <CardContent>
                    {task.description && (
                      <Text style={styles.taskDescription}>{task.description}</Text>
                    )}
                    <Text style={styles.strategiesTitle}>Strategies:</Text>
                    {task.strategies && task.strategies.length > 0 ? (
                      task.strategies.map((strategy, index) => (
                        <View key={index} style={styles.strategyItem}>
                          <Text style={styles.bulletPoint}>•</Text>
                          <Text style={styles.strategyText}>{strategy}</Text>
                        </View>
                      ))
                    ) : (
                      <Text>No strategies available for this task.</Text>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <Text style={styles.noTasksText}>No tasks available</Text>
            )}
          </ScrollView>
          <View style={styles.buttonContainer}>
            <Button onPress={handleClose}>
              <Text>Close</Text>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  scrollView: {
    marginVertical: 10,
    maxHeight: '80%',
  },
  taskCard: {
    marginBottom: 15,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#71717a',
  },
  taskDescription: {
    fontSize: 14,
    color: '#52525b',
    marginBottom: 10,
  },
  strategiesTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 8,
  },
  strategyItem: {
    flexDirection: 'row',
    marginBottom: 5,
    paddingLeft: 5,
  },
  bulletPoint: {
    marginRight: 8,
    fontSize: 16,
  },
  strategyText: {
    fontSize: 14,
    flex: 1,
  },
  noTasksText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#71717a',
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 15,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#0891b2',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  checkboxChecked: {
    backgroundColor: '#0891b2',
  },
  checkmark: {
    color: 'white',
    fontSize: 16,
  },
}); 