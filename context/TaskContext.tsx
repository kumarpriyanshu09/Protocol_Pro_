import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { NotificationState } from '../types';
import { mockProtocolTemplates, mockUserProtocols, ProtocolTemplate, UserProtocol, UserTask } from '../data/mockData';

interface TaskContextType {
  // Protocol management
  availableProtocols: ProtocolTemplate[];
  enrolledProtocols: UserProtocol[];
  currentProtocol: UserProtocol | null;
  setCurrentProtocol: (protocolId: string) => void;
  enrollInProtocol: (templateId: string) => void;
  
  // Task management
  todaysTasks: UserTask[];
  toggleTask: (taskId: string) => void;
  
  // Notification system
  notification: NotificationState;
  showNotification: (message: string) => void;
  dismissNotification: () => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State for protocols and tasks
  const [availableProtocols, setAvailableProtocols] = useState<ProtocolTemplate[]>(mockProtocolTemplates);
  const [enrolledProtocols, setEnrolledProtocols] = useState<UserProtocol[]>(mockUserProtocols);
  // Specifically select the Huberman protocol (up0) as the default protocol
  const hubermanProtocol = mockUserProtocols.find(p => p.id === 'up0');
  const [currentProtocol, setCurrentProtocolState] = useState<UserProtocol | null>(hubermanProtocol || mockUserProtocols[0] || null);
  const [todaysTasks, setTodaysTasks] = useState<UserTask[]>([]);
  
  // Notification state
  const [notification, setNotification] = useState<NotificationState>({
    message: '',
    isVisible: false
  });

  // Update today's tasks whenever the current protocol changes
  useEffect(() => {
    if (currentProtocol && Array.isArray(currentProtocol.tasks)) {
      // Make sure we have valid tasks with all required properties
      const validTasks = currentProtocol.tasks.map(task => ({
        ...task,
        // Ensure each task has these required properties
        id: task.id || `task-${Math.random().toString(36).substr(2, 9)}`,
        title: task.title || 'Untitled Task',
        completed: typeof task.completed === 'boolean' ? task.completed : false
      }));
      setTodaysTasks(validTasks);
    } else {
      // Always initialize with an empty array to prevent undefined errors
      setTodaysTasks([]);
    }
  }, [currentProtocol]);

  // Show notification
  const showNotification = useCallback((message: string) => {
    setNotification({
      message,
      isVisible: true
    });
  }, []);

  // Set the current protocol by ID
  const setCurrentProtocol = useCallback((protocolId: string) => {
    const protocol = enrolledProtocols.find(p => p.id === protocolId) || null;
    setCurrentProtocolState(protocol);
  }, [enrolledProtocols]);

  // Enroll in a new protocol
  const enrollInProtocol = useCallback((templateId: string) => {
    // Find the template
    const template = availableProtocols.find(p => p.id === templateId);
    if (!template) return;

    // Create a new user protocol instance
    const newUserProtocol: UserProtocol = {
      id: `up${Date.now()}`,
      userId: 'user1', // In a real app, this would be the current user's ID
      templateId: template.id,
      progress: 0,
      startDate: new Date().toISOString().split('T')[0],
      tasks: template.tasks.map(task => ({
        id: `ut${Date.now()}-${task.id}`,
        protocolTaskId: task.id,
        title: task.title,
        completed: false
      }))
    };

    // Add to enrolled protocols
    setEnrolledProtocols(prev => [...prev, newUserProtocol]);
    
    // Set as current protocol
    setCurrentProtocolState(newUserProtocol);
    
    // Show notification
    showNotification(`Enrolled in ${template.title}`);
  }, [availableProtocols, showNotification]);

  // Dismiss notification
  const dismissNotification = useCallback(() => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  }, []);

  // Toggle task completion
  const toggleTask = useCallback((taskId: string) => {
    if (!currentProtocol || !taskId) return;
    
    // Update the task in the current protocol
    setEnrolledProtocols(prevProtocols => {
      return prevProtocols.map(protocol => {
        if (protocol.id !== currentProtocol.id) return protocol;
        
        // Update tasks in this protocol
        const updatedTasks = protocol.tasks.map(task => {
          if (task.id !== taskId) return task;
          
          // Toggle completion and set completion date if completed
          const completed = !task.completed;
          return {
            ...task,
            completed,
            completedDate: completed ? new Date().toISOString().split('T')[0] : undefined
          };
        });
        
        // Calculate new progress as a percentage (0-100)
        const completedCount = updatedTasks.filter(t => t.completed).length;
        const progress = updatedTasks.length > 0 ? Math.round((completedCount / updatedTasks.length) * 100) : 0;
        
        // Check for milestones
        if (completedCount === 3) {
          showNotification('🏆 Achievement Unlocked: Task Master!');
        }
        
        return {
          ...protocol,
          tasks: updatedTasks,
          progress
        };
      });
    });
    
    // Also update today's tasks
    setTodaysTasks(prev => {
      // Guard against prev being undefined
      if (!Array.isArray(prev)) return [];
      
      return prev.map(task => {
        if (!task || task.id !== taskId) return task;
        
        const completed = !task.completed;
        return {
          ...task,
          completed,
          completedDate: completed ? new Date().toISOString().split('T')[0] : undefined
        };
      });
    });
  }, [currentProtocol, showNotification]);

  // Ensure we always have a valid value for todaysTasks
  const safeTasksList = Array.isArray(todaysTasks) ? todaysTasks : [];
  
  const value = {
    availableProtocols,
    enrolledProtocols,
    currentProtocol,
    setCurrentProtocol,
    enrollInProtocol,
    todaysTasks: safeTasksList,
    toggleTask,
    notification,
    showNotification,
    dismissNotification
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