import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

// Mock the navigation container to avoid navigation errors in tests
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    NavigationContainer: ({ children }: { children: React.ReactNode }) => children,
  };
});

// Mock the stack navigator
jest.mock('@react-navigation/stack', () => {
  return {
    createStackNavigator: () => ({
      Navigator: ({ children }: { children: React.ReactNode }) => children,
      Screen: ({ children }: { children: React.ReactNode }) => children,
    }),
  };
});

// Mock the screens
jest.mock('../screens/LoginScreen', () => 'LoginScreen');
jest.mock('../screens/InstructorDashboardScreen', () => 'InstructorDashboardScreen');
jest.mock('../screens/ProtocolCreationScreen', () => 'ProtocolCreationScreen');
jest.mock('../screens/FollowerDashboardScreen', () => 'FollowerDashboardScreen');
jest.mock('../screens/AchievementsScreen', () => 'AchievementsScreen');

// Mock the task provider
jest.mock('../context/TaskContext', () => ({
  TaskProvider: ({ children }: { children: React.ReactNode }) => children,
}));

describe('App', () => {
  it('renders without crashing', () => {
    // This test simply verifies that the App component renders without throwing
    render(<App />);
  });
}); 