import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LoginScreen from './screens/LoginScreen';
import InstructorDashboardScreen from './screens/InstructorDashboardScreen';
import ProtocolCreationScreen from './screens/ProtocolCreationScreen';
import FollowerDashboardScreen from './screens/FollowerDashboardScreen';
import AchievementsScreen from './screens/AchievementsScreen';
import { RootStackParamList } from './types/navigation';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: '#000000' }}>
        <StatusBar style="light" />
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
      </View>
    </GestureHandlerRootView>
  );
}