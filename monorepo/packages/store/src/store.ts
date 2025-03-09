import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import reducers
import authReducer from './slices/authSlice';
import tasksReducer from './slices/tasksSlice';
import protocolsReducer from './slices/protocolsSlice';
import uiReducer from './slices/uiSlice';

// Configure persist
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'], // Only persist auth state
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  tasks: tasksReducer,
  protocols: protocolsReducer,
  ui: uiReducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create persistor
export const persistor = persistStore(store);

// Export types
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

// Re-export actions from slices to avoid type issues
export { 
  login, 
  logout, 
  setUser, 
  setToken, 
  clearAuth 
} from './slices/authSlice';

export { 
  fetchTasks, 
  addTask, 
  updateTask, 
  deleteTask,
  clearTasks,
  toggleTaskCompletion,
  updateTaskStrategies
} from './slices/tasksSlice';

export { 
  fetchProtocols
} from './slices/protocolsSlice';

export { 
  setTheme
} from './slices/uiSlice'; 