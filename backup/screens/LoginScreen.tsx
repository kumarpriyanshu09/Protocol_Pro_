import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { supabase } from '../lib/supabase'; // Import supabase client
import Constants from 'expo-constants';

// Check if we're in development mode
const isDev = process.env.NODE_ENV === 'development' || __DEV__;

type LoginScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
};

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState<'instructor' | 'follower'>('follower');
  const [loading, setLoading] = useState(false);
  const [showDevModal, setShowDevModal] = useState(false);
  
  // Auto-login for development mode if enabled
  useEffect(() => {
    // Check if we should auto-login in development mode
    const autoLoginInDev = async () => {
      if (isDev && Constants.expoConfig?.extra?.autoLoginInDev) {
        console.log('🔧 Development mode: Auto-login enabled');
        // Show role selection modal instead of auto-navigating
        setShowDevModal(true);
      }
    };
    
    autoLoginInDev();
  }, []);

  // Navigate to the appropriate dashboard based on selected role
  const navigateToApp = () => {
    const route = selectedRole === 'instructor' ? 'InstructorDashboard' : 'FollowerDashboard';
    console.log(`🔧 Navigating to ${route}`);
    navigation.replace(route);
  };

  // Handle sign in with Supabase
  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      console.log('Attempting to sign in with:', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Sign in error:', error.message);
        Alert.alert('Error', error.message);
      } else {
        console.log('Sign in successful:', data);
        navigateToApp();
      }
    } catch (error) {
      console.error('Exception during sign in:', error);
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Handle sign up with Supabase
  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      console.log('Attempting to sign up with:', email);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error('Sign up error:', error.message);
        Alert.alert('Error', error.message);
      } else {
        console.log('Sign up response:', data);
        Alert.alert(
          'Success', 
          'Please check your email for confirmation instructions.',
          [{ text: 'OK', onPress: () => setIsLogin(true) }]
        );
      }
    } catch (error) {
      console.error('Exception during sign up:', error);
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission based on isLogin state
  const handleSubmit = () => {
    if (isLogin) {
      handleSignIn();
    } else {
      handleSignUp();
    }
  };

  // Development mode bypass
  const handleDevBypass = () => {
    setShowDevModal(true);
  };

  // Handle role selection and continue with bypass
  const handleDevRoleSelect = (role: 'instructor' | 'follower') => {
    console.log(`🔧 Development mode: Selecting role: ${role}`);
    // Set the role first
    setSelectedRole(role);
    // Close the modal
    setShowDevModal(false);
    // Navigate after a short delay to ensure state is updated
    setTimeout(() => {
      const route = role === 'instructor' ? 'InstructorDashboard' : 'FollowerDashboard';
      console.log(`🔧 Development mode: Navigating to ${route}`);
      navigation.replace(route);
    }, 100);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Development Mode Role Selection Modal */}
      <Modal
        visible={showDevModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDevModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Development Mode</Text>
            <Text style={styles.modalSubtitle}>Select your role to continue:</Text>
            
            <TouchableOpacity
              style={[styles.modalRoleButton, styles.followerButton]}
              onPress={() => handleDevRoleSelect('follower')}
            >
              <Text style={styles.modalRoleButtonText}>Follower Dashboard</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.modalRoleButton, styles.instructorButton]}
              onPress={() => handleDevRoleSelect('instructor')}
            >
              <Text style={styles.modalRoleButtonText}>Instructor Dashboard</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={() => setShowDevModal(false)}
            >
              <Text style={styles.modalCancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Protocol Pro</Text>
          <Text style={styles.subtitle}>
            {isLogin ? 'Welcome back!' : 'Create an account'}
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#8E8E93"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              accessible={true}
              accessibilityLabel="Email input field"
              accessibilityHint="Enter your email address"
              returnKeyType="next"
              textContentType="emailAddress"
              autoComplete="email"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#8E8E93"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              accessible={true}
              accessibilityLabel="Password input field"
              accessibilityHint="Enter your password"
              returnKeyType="done"
              textContentType="password"
              autoComplete="password"
            />
          </View>

          {/* Role Selection for Testing */}
          <View style={styles.roleContainer}>
            <Text style={styles.roleLabel} accessibilityRole="header">Select Role (Testing Only):</Text>
            <View style={styles.roleButtons} accessibilityRole="radiogroup">
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  selectedRole === 'follower' && styles.roleButtonActive,
                ]}
                onPress={() => setSelectedRole('follower')}
                accessible={true}
                accessibilityLabel="Follower role"
                accessibilityRole="radio"
                accessibilityState={{ checked: selectedRole === 'follower' }}
                accessibilityHint="Select follower role"
              >
                <Text style={[
                  styles.roleButtonText,
                  selectedRole === 'follower' && styles.roleButtonTextActive,
                ]}>Follower</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  selectedRole === 'instructor' && styles.roleButtonActive,
                ]}
                onPress={() => setSelectedRole('instructor')}
                accessible={true}
                accessibilityLabel="Instructor role"
                accessibilityRole="radio"
                accessibilityState={{ checked: selectedRole === 'instructor' }}
                accessibilityHint="Select instructor role"
              >
                <Text style={[
                  styles.roleButtonText,
                  selectedRole === 'instructor' && styles.roleButtonTextActive,
                ]}>Instructor</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.loginButton, loading && styles.loginButtonDisabled]} 
            onPress={handleSubmit}
            disabled={loading}
            accessible={true}
            accessibilityLabel={isLogin ? "Sign In button" : "Sign Up button"}
            accessibilityRole="button"
            accessibilityHint={isLogin ? "Sign in to your account" : "Create a new account"}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.loginButtonText}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => setIsLogin(!isLogin)}
            disabled={loading}
            accessible={true}
            accessibilityLabel={isLogin ? "Create account" : "Sign in to existing account"}
            accessibilityRole="link"
          >
            <Text style={styles.switchText}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <Text style={styles.switchTextHighlight}>
                {isLogin ? "Create one" : "Sign in"}
              </Text>
            </Text>
          </TouchableOpacity>
          
          {/* Development Mode Bypass */}
          {isDev && (
            <View style={styles.devContainer}>
              <Text style={styles.devLabel}>Development Mode</Text>
              <TouchableOpacity 
                style={styles.devButton} 
                onPress={handleDevBypass}
                accessible={true}
                accessibilityLabel="Skip authentication (development only)"
                accessibilityRole="button"
              >
                <Text style={styles.devButtonText}>Skip Authentication</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#8E8E93',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#1C1C1E',
    overflow: 'hidden',
  },
  input: {
    height: 56,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#FFFFFF',
  },
  roleContainer: {
    marginBottom: 20,
  },
  roleLabel: {
    color: '#8E8E93',
    fontSize: 14,
    marginBottom: 8,
  },
  roleButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#1C1C1E',
    alignItems: 'center',
  },
  roleButtonActive: {
    backgroundColor: '#0A84FF',
  },
  roleButtonText: {
    color: '#8E8E93',
    fontSize: 16,
    fontWeight: '500',
  },
  roleButtonTextActive: {
    color: '#FFFFFF',
  },
  loginButton: {
    height: 56,
    backgroundColor: '#0A84FF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonDisabled: {
    backgroundColor: '#0A84FF80',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  switchText: {
    color: '#8E8E93',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 16,
  },
  switchTextHighlight: {
    color: '#0A84FF',
  },
  // Development mode styles
  devContainer: {
    marginTop: 30,
    padding: 12,
    borderWidth: 1,
    borderColor: '#FF9500',
    borderRadius: 12,
    backgroundColor: 'rgba(255, 149, 0, 0.1)',
  },
  devLabel: {
    color: '#FF9500',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  devButton: {
    backgroundColor: '#1C1C1E',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  devButtonText: {
    color: '#FF9500',
    fontWeight: '600',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2C2C2E',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 24,
    textAlign: 'center',
  },
  modalRoleButton: {
    width: '100%',
    backgroundColor: '#0A84FF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  modalRoleButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalCancelButton: {
    width: '100%',
    backgroundColor: '#2C2C2E',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  modalCancelButtonText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
  },
  followerButton: {
    backgroundColor: '#0A84FF',  // Blue for follower
  },
  instructorButton: {
    backgroundColor: '#FF9500',  // Orange for instructor
  },
});