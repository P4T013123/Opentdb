// src/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wnfonbslzoivfzdlrypo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InduZm9uYnNsem9pdmZ6ZGxyeXBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1NzM0MjAsImV4cCI6MjA2NDE0OTQyMH0.yS_0Htw7kFAq15MtAnVhIpp0hm521chlyqD1I9A6h7I';
export const supabase = createClient(supabaseUrl, supabaseKey);