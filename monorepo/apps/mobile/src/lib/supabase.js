import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Supabase credentials from .env
const supabaseUrl = 'https://bgmhkjkctfjvllziahbk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnbWhramtjdGZqdmxsemlhaGJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyNDM3NTIsImV4cCI6MjA1NjgxOTc1Mn0.DDwuKL2jcYwOPZWx41A_hJZ5wnGeRyA73FPbVsEYYkU';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Debug function to check connection
export async function checkSupabaseConnection() {
  try {
    console.log('Testing Supabase connection...');
    const { data, error } = await supabase.from('profiles').select('*').limit(1);
    
    if (error) {
      console.error('Error connecting to Supabase:', error.message);
      return false;
    } else {
      console.log('Successfully connected to Supabase!');
      console.log('Data:', data);
      return true;
    }
  } catch (err) {
    console.error('Exception when connecting to Supabase:', err.message);
    return false;
  }
} 