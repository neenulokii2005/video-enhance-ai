import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://daboekuuyiempeqiogit.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhYm9la3V1eWllbXBlcWlvZ2l0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1ODI4ODAsImV4cCI6MjA4OTE1ODg4MH0.yrOn4xm3wJuyxysHCUU0c0jbVBv-2JKz7TMHtiWOTnU"
export const supabase = createClient(supabaseUrl, supabaseKey)