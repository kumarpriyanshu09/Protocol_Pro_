import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CommonActions, useNavigation } from '@react-navigation/native';

interface TabItem {
  name: string;
  screen: string;
}

interface CustomTabBarProps {
  items: TabItem[];
  activeTab: string;
}

/**
 * CustomTabBar - A simple custom tab bar component
 * @param items - Array of tab items to display
 * @param activeTab - The currently active tab
 */
const CustomTabBar: React.FC<CustomTabBarProps> = ({ items, activeTab }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const tabWidth = Dimensions.get('window').width / items.length;
  
  const handleTabPress = (screenName: string) => {
    // Use CommonActions.navigate for more reliable navigation
    navigation.dispatch(
      CommonActions.navigate({
        name: screenName,
      })
    );
  };
  
  return (
    <View 
      style={[
        styles.container, 
        { paddingBottom: insets.bottom, height: 70 + insets.bottom }
      ]}
    >
      {items.map(item => {
        const isActive = activeTab === item.screen;
        return (
          <TouchableOpacity
            key={item.screen}
            style={[styles.tab, { width: tabWidth }]}
            onPress={() => handleTabPress(item.screen)}
          >
            <View style={styles.tabContent}>
              <Text 
                style={[
                  styles.tabIcon, 
                  { color: isActive ? '#3E7BFA' : '#8E8E93' }
                ]}
              >
                {item.name[0]}
              </Text>
              
              <Text 
                style={[
                  styles.tabLabel,
                  { color: isActive ? '#3E7BFA' : '#8E8E93' }
                ]}
              >
                {item.name}
              </Text>
              
              {isActive && <View style={styles.activeIndicator} />}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#1C1C1E',
    borderTopWidth: 1,
    borderTopColor: '#2C2C2E',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
  tabIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -10,
    width: 24,
    height: 3,
    backgroundColor: '#3E7BFA',
    borderRadius: 1.5,
  },
});

export default CustomTabBar; 