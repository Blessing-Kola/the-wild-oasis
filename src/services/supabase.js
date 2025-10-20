import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ajujgwnjiasgnhxbvrbd.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqdWpnd25qaWFzZ25oeGJ2cmJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0OTA3NDYsImV4cCI6MjA3NTA2Njc0Nn0.xJDHXfutzNyNM0DRd5k4jOPRBHRyeLRR0zdw-pi8CHU"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
