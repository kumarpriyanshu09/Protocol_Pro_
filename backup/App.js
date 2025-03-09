import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, SafeAreaView, ScrollView } from 'react-native';
import { supabase, checkSupabaseConnection } from './lib/supabase'; // Updated import

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('Checking...');

  useEffect(() => {
    // Test Supabase connection
    checkSupabaseConnection()
      .then(isConnected => {
        setConnectionStatus(isConnected ? 'Connected' : 'Connection failed');
      })
      .catch(err => {
        console.error('Connection test error:', err);
        setConnectionStatus('Connection error');
      });

    // Check for existing session on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Current session:', session);
      setSession(session);
    });

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state changed:', _event, session);
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signUpWithEmail() {
    console.log('Attempting to sign up with:', email, password);
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      
      console.log('Sign up response:', data, error);
      
      if (error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Success', 'Check your email for confirmation or check console logs!');
      }
    } catch (e) {
      console.error('Exception during sign up:', e);
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }

  async function signInWithEmail() {
    console.log('Attempting to sign in with:', email, password);
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      
      console.log('Sign in response:', data, error);
      
      if (error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Success', 'Signed in successfully!');
      }
    } catch (e) {
      console.error('Exception during sign in:', e);
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    console.log('Attempting to sign out');
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
      Alert.alert('Error', error.message);
    } else {
      console.log('Signed out successfully');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Supabase Auth Test</Text>
        <Text style={[styles.connectionStatus, 
          connectionStatus === 'Connected' ? styles.connected : 
          connectionStatus === 'Checking...' ? styles.checking : 
          styles.disconnected]}>
          Supabase: {connectionStatus}
        </Text>
        
        {session ? (
          <View style={styles.authContainer}>
            <Text style={styles.text}>You are logged in as:</Text>
            <Text style={styles.email}>{session.user.email}</Text>
            <TouchableOpacity 
              style={styles.button} 
              onPress={signOut}
              disabled={loading}
            >
              <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.authContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
            <TouchableOpacity 
              style={styles.button} 
              onPress={signUpWithEmail}
              disabled={loading}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.button} 
              onPress={signInWithEmail}
              disabled={loading}
            >
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            {loading && <Text style={styles.loading}>Loading...</Text>}
          </View>
        )}
        
        <Text style={styles.debugText}>Check console for detailed logs</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  connectionStatus: {
    fontSize: 16,
    marginBottom: 20,
    fontWeight: '500',
  },
  connected: {
    color: '#3ECF8E',
  },
  checking: {
    color: '#F5A623',
  },
  disconnected: {
    color: '#FF4B4B',
  },
  authContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#3ECF8E',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  email: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loading: {
    textAlign: 'center',
    marginTop: 10,
    color: '#666',
  },
  debugText: {
    marginTop: 20,
    color: '#666',
    fontSize: 14,
  },
}); 