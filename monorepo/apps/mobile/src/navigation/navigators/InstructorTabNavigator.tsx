import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Import screens
import InstructorDashboardScreen from '../../screens/InstructorDashboardScreen';
import ProtocolCreationScreen from '../../screens/ProtocolCreationScreen';
import ProtocolsScreen from '../../screens/ProtocolsScreen';
import MessagesScreen from '../../screens/MessagesScreen';
import SettingsScreen from '../../screens/SettingsScreen';

// Define the tab navigator param list
type InstructorTabParamList = {
  Dashboard: undefined;
  Protocols: undefined;
  CreateProtocol: undefined;
  Messages: undefined;
  Settings: { isInstructor?: boolean };
};

const Tab = createBottomTabNavigator<InstructorTabParamList>();

/**
 * Custom tab icon component for the tab navigator
 */
const TabIcon = ({ focused, color, name }: { focused: boolean; color: string; name: string }) => {
  return (
    <View style={styles.iconContainer}>
      <Text style={[styles.iconText, { color }]}>{name[0]}</Text>
      {focused && <View style={[styles.indicator, { backgroundColor: color }]} />}
    </View>
  );
};

/**
 * InstructorTabNavigator - Tab navigation for instructor users
 * Provides navigation between Dashboard, Protocols, Create Protocol, Messages, and Settings screens
 */
const InstructorTabNavigator = () => {
  const insets = useSafeAreaInsets();
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          ...styles.tabBar,
          height: 70 + insets.bottom,
          paddingBottom: insets.bottom,
        },
        tabBarActiveTintColor: '#3E7BFA',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarLabelStyle: styles.tabLabel,
        headerShown: false,
      }}
      initialRouteName="Dashboard"
    >
      <Tab.Screen 
        name="Dashboard" 
        component={InstructorDashboardScreen} 
        options={{
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <TabIcon name="Dashboard" color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen 
        name="Protocols" 
        component={ProtocolsScreen} 
        options={{
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <TabIcon name="Protocols" color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen 
        name="CreateProtocol" 
        component={ProtocolCreationScreen} 
        options={{
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <TabIcon name="Create" color={color} focused={focused} />
          ),
          tabBarLabel: 'Create',
        }}
      />
      <Tab.Screen 
        name="Messages" 
        component={MessagesScreen} 
        options={{
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <TabIcon name="Messages" color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        initialParams={{ isInstructor: true }}
        options={{
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <TabIcon name="Settings" color={color} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#1C1C1E',
    borderTopWidth: 1,
    borderTopColor: '#2C2C2E',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8,
    paddingTop: 5,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 5,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
  },
  iconText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  indicator: {
    position: 'absolute',
    bottom: -12,
    width: '80%',
    height: 3,
    borderRadius: 1.5,
  },
});

export default InstructorTabNavigator; 