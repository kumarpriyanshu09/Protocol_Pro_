// Mock the native modules that are causing issues
jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native').View;
  return {
    PanGestureHandler: View,
    State: {
      ACTIVE: 'ACTIVE',
      END: 5,
    },
    PanGestureHandlerGestureEvent: jest.fn(),
  };
});

// Mock Expo StatusBar
jest.mock('expo-status-bar', () => ({
  StatusBar: () => 'StatusBar',
  setStatusBarBackgroundColor: jest.fn(),
  setStatusBarHidden: jest.fn(),
  setStatusBarStyle: jest.fn(),
  setStatusBarTranslucent: jest.fn(),
}));

// Mock Animated
jest.mock('react-native', () => {
  const rn = jest.requireActual('react-native');
  rn.Animated.event = jest.fn().mockImplementation(() => jest.fn());
  return rn;
});

// Mock the GestureHandlerRootView
jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native').View;
  return {
    ...jest.requireActual('react-native-gesture-handler'),
    GestureHandlerRootView: View,
  };
}); 