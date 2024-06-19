import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fwimlkxoggqhamjejeuz.supabase.co";
const supebaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3aW1sa3hvZ2dxaGFtamVqZXV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgxNTQ2NTQsImV4cCI6MjAzMzczMDY1NH0.nWOGoM3-rFH5CXoSnT2YCyPyUhxnAN-X78Y-YHCMHGE"; 

const supabase = createClient(supabaseUrl, supebaseAnonKey,);

export default supabase;
