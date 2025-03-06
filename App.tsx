import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import LoginScreen from './screens/LoginScreen';
import InstructorDashboardScreen from './screens/InstructorDashboardScreen';
import ProtocolCreationScreen from './screens/ProtocolCreationScreen';
import FollowerDashboardScreen from './screens/FollowerDashboardScreen';
import { RootStackParamList } from './types/navigation';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0070f3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
