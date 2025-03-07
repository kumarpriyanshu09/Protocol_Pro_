const { createClient } = require('@supabase/supabase-js')

// Replace these with your actual Supabase URL and anon key
const supabaseUrl = 'https://bgmhkjkctfjvllziahbk.supabase.co'
const supabaseKey = 'your-anon-key'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  try {
    // Try a simple query to test the connection
    const { data, error } = await supabase.from('profiles').select('*').limit(1)
    
    if (error) {
      console.error('Error connecting to Supabase:', error.message)
    } else {
      console.log('Successfully connected to Supabase!')
      console.log('Data:', data)
    }
  } catch (err) {
    console.error('Exception when connecting to Supabase:', err.message)
  }
}

testConnection() 