import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

interface SettingsScreenProps {
  isInstructor?: boolean;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ isInstructor = false }) => {
  const navigation = useNavigation();
  const [remindersEnabled, setRemindersEnabled] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  
  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' as never }],
    });
  };
  
  const handleRemindersToggle = (value: boolean) => {
    setRemindersEnabled(value);
    if (value) {
      setTimeout(() => {
        Alert.alert('Reminder Set', 'You will be reminded about your tasks.');
      }, 500);
    }
  };
  
  const handleOfflineModeToggle = (value: boolean) => {
    setOfflineMode(value);
    if (value) {
      Alert.alert('Offline Mode', 'App is now in offline mode. Changes will sync when you reconnect.');
    } else {
      Alert.alert('Online Mode', 'App is now in online mode. All changes are synced.');
    }
  };
  
  const handleViewAchievements = () => {
    navigation.navigate('Achievements' as never);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Settings</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#767577', true: '#3E7BFA' }}
              thumbColor="#FFFFFF"
            />
          </View>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Notifications</Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#767577', true: '#3E7BFA' }}
              thumbColor="#FFFFFF"
            />
          </View>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Reminders</Text>
            <Switch
              value={remindersEnabled}
              onValueChange={handleRemindersToggle}
              trackColor={{ false: '#767577', true: '#3E7BFA' }}
              thumbColor="#FFFFFF"
            />
          </View>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Offline Mode</Text>
            <Switch
              value={offlineMode}
              onValueChange={handleOfflineModeToggle}
              trackColor={{ false: '#767577', true: '#3E7BFA' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>
        
        {!isInstructor && (
          <TouchableOpacity 
            style={styles.button}
            onPress={handleViewAchievements}
          >
            <Text style={styles.buttonText}>View Achievements</Text>
          </TouchableOpacity>
        )}
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <TouchableOpacity style={styles.linkItem}>
            <Text style={styles.linkText}>Edit Profile</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.linkItem}>
            <Text style={styles.linkText}>Privacy Settings</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.linkItem}>
            <Text style={styles.linkText}>Help & Support</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={[styles.button, styles.logoutButton]}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
        
        <Text style={styles.versionText}>Protocol Pro v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
  settingLabel: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#3E7BFA',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  linkItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
  linkText: {
    fontSize: 16,
    color: '#3E7BFA',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  versionText: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default SettingsScreen; 