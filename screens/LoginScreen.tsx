import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

type LoginScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
};

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState<'instructor' | 'follower'>('follower');

  const handleSubmit = () => {
    // Use the selected role for navigation during testing
    navigation.replace(
      selectedRole === 'instructor' ? 'InstructorDashboard' : 'FollowerDashboard'
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Protocol Pro</Text>
          <Text style={styles.subtitle}>Welcome back!</Text>
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
            />
          </View>

          {/* Role Selection for Testing */}
          <View style={styles.roleContainer}>
            <Text style={styles.roleLabel}>Select Role (Testing Only):</Text>
            <View style={styles.roleButtons}>
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  selectedRole === 'follower' && styles.roleButtonActive,
                ]}
                onPress={() => setSelectedRole('follower')}
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
              >
                <Text style={[
                  styles.roleButtonText,
                  selectedRole === 'instructor' && styles.roleButtonTextActive,
                ]}>Instructor</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
            <Text style={styles.loginButtonText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
            <Text style={styles.switchText}>
              Don't have an account? <Text style={styles.switchTextHighlight}>Create one</Text>
            </Text>
          </TouchableOpacity>
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
});