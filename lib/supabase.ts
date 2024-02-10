import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ahkpchxrfhhveeomiohl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoa3BjaHhyZmhodmVlb21pb2hsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc1OTgwMTcsImV4cCI6MjAyMzE3NDAxN30.kZgdnnflhWAZ3rSZg-uegSCseaJzz8htCKUhKMW7xoM';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;