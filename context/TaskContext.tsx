import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { NotificationState } from '../types';
import { mockProtocols } from '../data/mockData';

interface TaskContextType {
  completedTasks: string[];
  toggleTask: (task: string) => void;
  notification: NotificationState;
  showNotification: (message: string) => void;
  dismissNotification: () => void;
  currentProtocol: typeof mockProtocols[0];
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [notification, setNotification] = useState<NotificationState>({
    message: '',
    isVisible: false
  });
  const currentProtocol = mockProtocols[0];

  const showNotification = useCallback((message: string) => {
    setNotification({
      message,
      isVisible: true
    });
  }, []);

  const dismissNotification = useCallback(() => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  }, []);

  const toggleTask = useCallback((task: string) => {
    setCompletedTasks(prev => {
      const newTasks = prev.includes(task)
        ? prev.filter(t => t !== task)
        : [...prev, task];

      // Check for milestones
      if (newTasks.length === 3) {
        showNotification('🏆 Achievement Unlocked: Task Master!');
      }

      return newTasks;
    });
  }, [showNotification]);

  const value = {
    completedTasks,
    toggleTask,
    notification,
    showNotification,
    dismissNotification,
    currentProtocol
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}; 