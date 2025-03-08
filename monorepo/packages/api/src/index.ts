import { createClient } from '@supabase/supabase-js';
import axios from 'axios';

// Create a Supabase client
const createSupabaseClient = (supabaseUrl: string, supabaseKey: string) => {
  return createClient(supabaseUrl, supabaseKey);
};

// Create an Axios instance
const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { createSupabaseClient, api }; 