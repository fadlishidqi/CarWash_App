// src/config/supabase.js
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-url-polyfill/auto';

const supabaseUrl = 'https://ijnsdcpgolkqjfwacwjj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqbnNkY3Bnb2xrcWpmd2Fjd2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxODY0MDcsImV4cCI6MjA0ODc2MjQwN30.Q1JhiEBK-DcMc2kb6WlFXym58g3Ken7iYe3d8XD6MLc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});