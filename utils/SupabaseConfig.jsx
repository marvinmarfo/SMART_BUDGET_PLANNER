
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://xbgcbbvtcdlregxrclmo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhiZ2NiYnZ0Y2RscmVneHJjbG1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA0NTE0NjQsImV4cCI6MjAzNjAyNzQ2NH0.66P44_vGHxcxy5WwYzMLijSYQV8W8qhqA9XaA7hrYoE')