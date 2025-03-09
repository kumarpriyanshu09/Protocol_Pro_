import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import * as Notifications from 'expo-notifications';

// Import from packages
import { Button, Card, CardContent, CardHeader, CardTitle, Text } from 'ui';
import { store, persistor, fetchTasks } from 'store';

// Import components
import { AuthStatus } from './components/AuthStatus';
import { TaskList } from './components/TaskList';
import { TaskStrategiesModal } from './components/modals/TaskStrategiesModal';

// Import context providers
import { TaskProvider } from './context/TaskContext';

// Import navigation
import FollowerTabNavigator from './navigation/navigators/FollowerTabNavigator';
import InstructorTabNavigator from './navigation/navigators/InstructorTabNavigator';

// Import screens
import LoginScreen from './screens/LoginScreen';
import AchievementsScreen from './screens/AchievementsScreen';
import MessagesScreen from './screens/MessagesScreen';

// Comment out the notification handler setup
/*
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
*/

// Define navigation types
type RootStackParamList = {
  Login: undefined;
  InstructorDashboard: undefined;
  FollowerDashboard: undefined;
  Achievements: undefined;
  Messages: undefined;
  Home: undefined;
  Details: { id: string };
};

const Stack = createStackNavigator<RootStackParamList>();

// App wrapper to handle notifications and provide store
const AppWrapper = () => {
  const dispatch = store.dispatch;

  useEffect(() => {
    // Register for push notifications
    // registerForPushNotificationsAsync();

    // Set up notification listeners
    /*
    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification response:', response);
      const data = response.notification.request.content.data;
      
      // Handle different notification types
      if (data.type === 'TASK_REMINDER' && data.taskId) {
        // Handle task reminder notification
        console.log('Task reminder notification for task:', data.taskId);
      }
    });

    // Clean up listeners on unmount
    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
    */
    
    // Fetch tasks when the app loads
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar style="light" />
            <TaskProvider>
              <NavigationContainer>
                <Stack.Navigator
                  initialRouteName="Login"
                  screenOptions={{
                    headerStyle: {
                      backgroundColor: '#0891b2',
                    },
                    headerTintColor: '#FFFFFF',
                    headerTitleStyle: {
                      fontWeight: '600',
                    },
                    cardStyle: { backgroundColor: '#f4f4f5' },
                  }}
                >
                  <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
                  <Stack.Screen 
                    name="InstructorDashboard" 
                    component={InstructorTabNavigator} 
                    options={{ 
                      title: 'Instructor Dashboard',
                      headerShown: false 
                    }} 
                  />
                  <Stack.Screen 
                    name="FollowerDashboard" 
                    component={FollowerTabNavigator} 
                    options={{ 
                      title: 'Follower Dashboard',
                      headerShown: false 
                    }} 
                  />
                  <Stack.Screen name="Achievements" component={AchievementsScreen} options={{ title: 'Achievements' }} />
                  <Stack.Screen name="Messages" component={MessagesScreen} options={{ title: 'Messages' }} />
                  <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Protocol Pro' }} />
                  <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Details' }} />
                </Stack.Navigator>
                
                {/* Add the TaskStrategiesModal here so it's available globally */}
                <TaskStrategiesModal />
              </NavigationContainer>
            </TaskProvider>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

// Sample Home Screen
const HomeScreen = ({ navigation }: any) => {
  const dispatch = store.dispatch;

  // Function to handle the "Show Tasks" button press
  const handleShowTasks = () => {
    dispatch(fetchTasks());
    // Show tasks in some other way
    console.log('Showing tasks...');
  };

  // Function to schedule a test notification
  const scheduleTestNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Protocol Pro Reminder",
        body: 'Time to check your tasks!',
        data: { type: 'habit_reminder' },
      },
      trigger: null, // Show notification immediately
    });
    console.log('Test notification scheduled');
  };

  return (
    <ScrollView style={styles.container}>
      <AuthStatus />
      <TaskList />
      
      <Card style={styles.card}>
        <CardHeader>
          <CardTitle>Welcome to Protocol Pro</CardTitle>
        </CardHeader>
        <CardContent>
          <Text>
            This is a sample app built with React Native, Redux, and custom UI components.
          </Text>
          <Button 
            style={styles.button}
            onPress={() => navigation.navigate('Details', { id: '123' })}
          >
            Go to Details
          </Button>
          
          {/* Add button to show task strategies modal */}
          <Button 
            style={styles.button}
            onPress={handleShowTasks}
          >
            Show Tasks
          </Button>
          
          {/* Add button to test push notification */}
          <Button 
            style={styles.button}
            variant="outline"
            onPress={scheduleTestNotification}
          >
            Test Notification
          </Button>
        </CardContent>
      </Card>
    </ScrollView>
  );
};

// Sample Details Screen
const DetailsScreen = ({ route }: any) => {
  const { id } = route.params;
  
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <CardHeader>
          <CardTitle>Details Screen</CardTitle>
        </CardHeader>
        <CardContent>
          <Text>Details for item with ID: {id}</Text>
          <Text variant="muted" style={styles.subtitle}>
            This screen demonstrates navigation with parameters.
          </Text>
        </CardContent>
      </Card>
    </View>
  );
};

// Comment out the registerForPushNotificationsAsync function
const registerForPushNotificationsAsync = async () => {
  try {
    // Skip push notification registration in development
    console.log('Push notification registration skipped in development');
    return;
    
    /*
    // Check for existing permissions
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    // If no permission, ask for it
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    // If still no permission, exit
    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return;
    }
    
    // Get the token
    const token = await Notifications.getExpoPushTokenAsync({
      projectId: '00000000-0000-0000-0000-000000000000'
    });
    console.log('Expo push token:', token);
    
    // Schedule a test notification
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Protocol Pro Reminder",
        body: 'Time to check your tasks!',
        data: { type: 'habit_reminder' },
      },
      trigger: null, // Show notification immediately
    });
    console.log('Test notification scheduled');
    */
  } catch (error) {
    console.error('Error registering for push notifications:', error);
  }
};

// Main App component
export default function App() {
  return <AppWrapper />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  button: {
    marginTop: 12,
  },
  subtitle: {
    marginTop: 8,
  },
}); 