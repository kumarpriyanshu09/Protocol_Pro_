import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Import screens
import ProtocolsScreen from '../../screens/ProtocolsScreen';
import ProtocolScreen from '../../screens/ProtocolScreen';
import TasksScreen from '../../screens/TasksScreen';
import JournalScreen from '../../screens/JournalScreen';
import SettingsScreen from '../../screens/SettingsScreen';

// Import types
import { FollowerTabParamList } from '../../types/navigation';

const Tab = createBottomTabNavigator<FollowerTabParamList>();

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
 * FollowerTabNavigator - Tab navigation for follower users
 * Provides navigation between Protocols, Tasks, Journal, and Settings screens
 */
const FollowerTabNavigator = () => {
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
      initialRouteName="Protocol"
    >
      <Tab.Screen 
        name="Protocol" 
        component={ProtocolScreen} 
        options={{
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <TabIcon name="Protocol" color={color} focused={focused} />
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
        name="Tasks" 
        component={TasksScreen} 
        options={{
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <TabIcon name="Tasks" color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen 
        name="Journal" 
        component={JournalScreen} 
        options={{
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <TabIcon name="Journal" color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen 
        name="More" 
        component={SettingsScreen} 
        initialParams={{ isInstructor: false }}
        options={{
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <TabIcon name="More" color={color} focused={focused} />
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

export default FollowerTabNavigator; 