// src/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nhnobckmycwmwaokscsf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5obm9iY2tteWN3bXdhb2tzY3NmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1NjYxMzEsImV4cCI6MjA2NDE0MjEzMX0.0pPFow7rBeOh3hOVs7Ie44E7OidpZt-StbtxU4y3GK8';
export const supabase = createClient(supabaseUrl, supabaseKey);