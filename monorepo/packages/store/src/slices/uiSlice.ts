import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types
interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

interface UIState {
  theme: 'light' | 'dark' | 'system';
  notifications: Notification[];
  isLoading: boolean;
  isDrawerOpen: boolean;
  isModalOpen: boolean;
  modalContent: string | null;
  // Task strategies modal state
  isTaskStrategiesModalOpen: boolean;
  selectedTaskId: string | null;
}

// Define initial state
const initialState: UIState = {
  theme: 'system',
  notifications: [],
  isLoading: false,
  isDrawerOpen: false,
  isModalOpen: false,
  modalContent: null,
  // Task strategies modal initial state
  isTaskStrategiesModalOpen: false,
  selectedTaskId: null,
};

// Create slice
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.theme = action.payload;
    },
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id'>>) => {
      const id = Math.random().toString(36).substring(2, 9);
      state.notifications.push({
        ...action.payload,
        id,
      });
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    toggleDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
    setDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.isDrawerOpen = action.payload;
    },
    openModal: (state, action: PayloadAction<string>) => {
      state.isModalOpen = true;
      state.modalContent = action.payload;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.modalContent = null;
    },
    // Task strategies modal actions
    openTaskStrategiesModal: (state, action: PayloadAction<string | null>) => {
      state.isTaskStrategiesModalOpen = true;
      state.selectedTaskId = action.payload;
    },
    closeTaskStrategiesModal: (state) => {
      state.isTaskStrategiesModalOpen = false;
      state.selectedTaskId = null;
    },
  },
});

// Export actions and reducer
export const {
  setTheme,
  addNotification,
  removeNotification,
  clearNotifications,
  setLoading,
  toggleDrawer,
  setDrawerOpen,
  openModal,
  closeModal,
  openTaskStrategiesModal,
  closeTaskStrategiesModal,
} = uiSlice.actions;
export default uiSlice.reducer; 