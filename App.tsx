import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import screens
import LoginScreen from './screens/LoginScreen';
import InstructorDashboardScreen from './screens/InstructorDashboardScreen';
import ProtocolCreationScreen from './screens/ProtocolCreationScreen';
import FollowerDashboardScreen from './screens/FollowerDashboardScreen';
import AchievementsScreen from './screens/AchievementsScreen';
import ProtocolsScreen from './screens/ProtocolsScreen';
import TasksScreen from './screens/TasksScreen';
import JournalScreen from './screens/JournalScreen';
import MessagesScreen from './screens/MessagesScreen';
import SettingsScreen from './screens/SettingsScreen';

// Import types and context
import { RootStackParamList } from './types/navigation';
import { TaskProvider } from './context/TaskContext';
import ErrorBoundary from './components/ErrorBoundary';
import './i18n/config';

// Import tab navigators directly
// import { FollowerTabNavigator, InstructorTabNavigator } from './navigation';
// We're not using these anymore, so we can remove these imports

const Stack = createStackNavigator<RootStackParamList>();

/**
 * Custom error handler function that could be connected to an error logging service
 * like Sentry, Firebase Crashlytics, or a custom backend endpoint.
 */
const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
  // In a production app, you would send this to an error reporting service
  console.error('Application Error:', error);
  console.error('Error Info:', errorInfo);
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

/**
 * Main App component
 */
export default function App() {
  return (
    <ErrorBoundary 
      onError={handleError}
    >
      <SafeAreaProvider>
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
                  <Stack.Screen
                    name="ProtocolsScreen"
                    component={ProtocolsScreen}
                    options={{ title: 'Protocols' }}
                  />
                  <Stack.Screen
                    name="TasksScreen"
                    component={TasksScreen}
                    options={{ title: 'Tasks' }}
                  />
                  <Stack.Screen
                    name="JournalScreen"
                    component={JournalScreen}
                    options={{ title: 'Journal' }}
                  />
                  <Stack.Screen
                    name="MessagesScreen"
                    component={MessagesScreen}
                    options={{ title: 'Messages' }}
                  />
                  <Stack.Screen
                    name="SettingsScreen"
                    component={SettingsScreen}
                    options={{ title: 'Settings' }}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </TaskProvider>
          </View>
        </GestureHandlerRootView>
      </SafeAreaProvider>
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