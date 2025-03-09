// Re-export store and persistor
export { store, persistor } from './store';

// Re-export types
export type { RootState, AppDispatch } from './store';

// Re-export actions from auth slice
export { 
  login, 
  logout, 
  setUser, 
  setToken, 
  clearAuth 
} from './slices/authSlice';

// Re-export actions from tasks slice
export { 
  fetchTasks, 
  addTask, 
  updateTask, 
  deleteTask,
  clearTasks,
  toggleTaskCompletion,
  updateTaskStrategies
} from './slices/tasksSlice';

// Re-export actions from protocols slice
export { 
  fetchProtocols
} from './slices/protocolsSlice';

// Re-export actions from ui slice
export { 
  setTheme
} from './slices/uiSlice';

// Re-export task type
export type { Task } from './slices/tasksSlice';

// Export hooks
export * from './hooks/useAppDispatch';
export * from './hooks/useAppSelector'; 