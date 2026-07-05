import { createClient } from '@supabase/supabase-js';
import config from './env.config.js';

const supabaseUrl = config.SUPABASE_URL;
const supabaseServiceKey = config.SUPABASE_SERVICE_ROLE_KEY;

// Fail early if environment variables are missing
if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables in supabaseAdmin.js');
}

// Ensure this file is never bundled or run in a browser environment
if (typeof window !== 'undefined') {
  throw new Error('SECURITY ALERT: supabaseAdmin.js must NEVER be executed on the client side!');
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false, // Prevents saving admin sessions to storage
    autoRefreshToken: false // Admin keys do not need token refreshing
  }
});
