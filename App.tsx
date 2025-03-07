import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LoginScreen from './screens/LoginScreen';
import InstructorDashboardScreen from './screens/InstructorDashboardScreen';
import ProtocolCreationScreen from './screens/ProtocolCreationScreen';
import FollowerDashboardScreen from './screens/FollowerDashboardScreen';
import AchievementsScreen from './screens/AchievementsScreen';
import { RootStackParamList } from './types/navigation';
import { TaskProvider } from './context/TaskContext';
import ErrorBoundary from './components/ErrorBoundary';
import './i18n/config';

const Stack = createStackNavigator<RootStackParamList>();

/**
 * Custom error handler function that could be connected to an error logging service
 * like Sentry, Firebase Crashlytics, or a custom backend endpoint.
 */
const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
  // In a production app, you would send this to an error reporting service
  console.error('Application Error:', error);
  console.error('Error Info:', errorInfo);
  
  // Example of how you might log to a service:
  // logErrorToService({
  //   error: error.toString(),
  //   componentStack: errorInfo.componentStack,
  //   timestamp: new Date().toISOString(),
  // });
};

/**
 * Custom fallback UI for critical app-level errors
 */
const AppErrorFallback = ({ resetError }: { resetError: () => void }) => (
  <View style={styles.errorContainer}>
    <Text style={styles.errorTitle}>App Error</Text>
    <Text style={styles.errorMessage}>
      We're sorry, but the app has encountered a critical error.
    </Text>
    <TouchableOpacity 
      style={styles.errorButton} 
      onPress={resetError}
      accessible={true}
      accessibilityLabel="Restart app"
      accessibilityRole="button"
    >
      <Text style={styles.errorButtonText}>Restart App</Text>
    </TouchableOpacity>
  </View>
);

export default function App() {
  return (
    <ErrorBoundary 
      onError={handleError}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: '#000000' }}>
          <StatusBar style="light" />
          <TaskProvider>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{
                  headerStyle: {
                    backgroundColor: '#000000',
                    shadowColor: 'transparent',
                  },
                  headerTintColor: '#FFFFFF',
                  headerTitleStyle: {
                    fontWeight: '600',
                  },
                  cardStyle: { backgroundColor: '#000000' },
                }}
              >
                <Stack.Screen
                  name="Login"
                  component={LoginScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="InstructorDashboard"
                  component={InstructorDashboardScreen}
                  options={{ title: 'Instructor Dashboard' }}
                />
                <Stack.Screen
                  name="ProtocolCreation"
                  component={ProtocolCreationScreen}
                  options={{ title: 'Create Protocol' }}
                />
                <Stack.Screen
                  name="FollowerDashboard"
                  component={FollowerDashboardScreen}
                  options={{ title: 'Follower Dashboard' }}
                />
                <Stack.Screen
                  name="Achievements"
                  component={AchievementsScreen}
                  options={{ title: 'Achievements' }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </TaskProvider>
        </View>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  errorMessage: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 24,
    textAlign: 'center',
  },
  errorButton: {
    backgroundColor: '#0A84FF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    maxWidth: 300,
  },
  errorButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});