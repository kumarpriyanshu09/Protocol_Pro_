// Import Jest Native matchers
import '@testing-library/jest-native/extend-expect';

// Mock the expo-notifications module
jest.mock('expo-notifications', () => ({
  setNotificationHandler: jest.fn(),
  addNotificationReceivedListener: jest.fn(() => ({ remove: jest.fn() })),
  addNotificationResponseReceivedListener: jest.fn((callback) => {
    // Store the callback so we can call it in our tests
    global.notificationResponseCallback = callback;
    return { remove: jest.fn() };
  }),
  getPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
  requestPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
  getExpoPushTokenAsync: jest.fn(() => Promise.resolve({ data: 'mock-token' })),
  scheduleNotificationAsync: jest.fn(() => Promise.resolve()),
}));

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  return {
    default: {
      call: jest.fn(),
      createAnimatedComponent: jest.fn(),
      Value: jest.fn(),
      View: 'View',
      Text: 'Text',
      Image: 'Image',
      ScrollView: 'ScrollView',
      FlatList: 'FlatList',
    },
  };
});

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
}));

// Add global.fetch mock
global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({}),
  ok: true,
}));

// Add a global variable to store notification callbacks
global.notificationResponseCallback = undefined;

// Mock the react-native components
jest.mock('react-native', () => {
  const rn = jest.requireActual('react-native');
  rn.NativeModules.StatusBarManager = { getHeight: jest.fn() };
  return rn;
}); 