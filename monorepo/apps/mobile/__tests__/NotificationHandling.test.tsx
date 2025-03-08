import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from 'store/src/slices/tasksSlice';
import uiReducer from 'store/src/slices/uiSlice';

// Define a type for the mocked Notifications module
interface MockedNotifications {
  setNotificationHandler: jest.Mock;
  addNotificationReceivedListener: jest.Mock;
  addNotificationResponseReceivedListener: jest.Mock;
  getPermissionsAsync: jest.Mock;
  requestPermissionsAsync: jest.Mock;
  getExpoPushTokenAsync: jest.Mock;
  scheduleNotificationAsync: jest.Mock;
  notificationResponseCallback: ((response: any) => void) | null;
}

// Mock the components that are not directly related to our tests
jest.mock('../src/components/AuthStatus', () => ({
  AuthStatus: () => null
}));

jest.mock('../src/components/TaskList', () => ({
  TaskList: () => null
}));

jest.mock('../src/components/modals/TaskStrategiesModal', () => ({
  TaskStrategiesModal: () => null
}));

// Mock the expo-notifications module
jest.mock('expo-notifications', () => {
  const originalModule = jest.requireActual('expo-notifications');
  
  // Create mock functions that we can spy on
  const mockFunctions: MockedNotifications = {
    setNotificationHandler: jest.fn(),
    addNotificationReceivedListener: jest.fn(() => ({ remove: jest.fn() })),
    addNotificationResponseReceivedListener: jest.fn(callback => {
      // Store the callback so we can call it in our tests
      mockFunctions.notificationResponseCallback = callback;
      return { remove: jest.fn() };
    }),
    getPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
    requestPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
    getExpoPushTokenAsync: jest.fn(() => Promise.resolve({ data: 'mock-token' })),
    scheduleNotificationAsync: jest.fn(() => Promise.resolve()),
    // Store the notification response callback
    notificationResponseCallback: null,
  };
  
  return mockFunctions;
});

// Import the App component
import App from '../src/App';

// Create a real store with the actual reducers
const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      tasks: tasksReducer,
      ui: uiReducer,
    },
    preloadedState: initialState,
  });
};

describe('Notification Handling Tests', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('sets up notification handlers when the app starts', async () => {
    // Import the mocked notifications module
    const Notifications = jest.requireMock('expo-notifications') as MockedNotifications;
    
    // Render the App component
    render(<App />);

    // Verify that notification handlers were set up
    expect(Notifications.setNotificationHandler).toHaveBeenCalled();
    expect(Notifications.addNotificationReceivedListener).toHaveBeenCalled();
    expect(Notifications.addNotificationResponseReceivedListener).toHaveBeenCalled();
  });

  it('opens the task strategies modal when a "Habit" notification is tapped', async () => {
    // Create a store and spy on its dispatch method
    const store = createTestStore();
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    // Import the mocked notifications module
    const Notifications = jest.requireMock('expo-notifications') as MockedNotifications;

    // Render the App component with our store
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Wait for notification listeners to be set up
    await waitFor(() => {
      expect(Notifications.addNotificationResponseReceivedListener).toHaveBeenCalled();
    });

    // Make sure the callback was stored
    expect(Notifications.notificationResponseCallback).toBeDefined();

    // Simulate a notification response for a "Habit" notification
    if (Notifications.notificationResponseCallback) {
      Notifications.notificationResponseCallback({
        notification: {
          request: {
            content: {
              title: 'Habit',
              body: 'Are your habits completed?',
            },
          },
        },
      });
    }

    // Verify that the appropriate actions were dispatched
    await waitFor(() => {
      // Should dispatch fetchTasks action
      expect(dispatchSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: expect.stringContaining('tasks/fetchTasks')
        })
      );
      
      // Should dispatch openTaskStrategiesModal action
      expect(dispatchSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: expect.stringContaining('ui/openTaskStrategiesModal')
        })
      );
    });
  });

  it('does not open the modal for non-Habit notifications', async () => {
    // Create a store and spy on its dispatch method
    const store = createTestStore();
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    // Import the mocked notifications module
    const Notifications = jest.requireMock('expo-notifications') as MockedNotifications;

    // Render the App component with our store
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Wait for notification listeners to be set up
    await waitFor(() => {
      expect(Notifications.addNotificationResponseReceivedListener).toHaveBeenCalled();
    });

    // Simulate a notification response for a different notification
    if (Notifications.notificationResponseCallback) {
      Notifications.notificationResponseCallback({
        notification: {
          request: {
            content: {
              title: 'Other Notification',
              body: 'This is not a habit notification',
            },
          },
        },
      });
    }

    // Verify that the openTaskStrategiesModal action was not dispatched
    await waitFor(() => {
      const openModalCalls = dispatchSpy.mock.calls.filter(
        call => call[0]?.type?.includes('ui/openTaskStrategiesModal')
      );
      expect(openModalCalls.length).toBe(0);
    });
  });
}); 