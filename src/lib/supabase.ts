// scripts/lib/supabaseAdmin.ts or lib/supabaseAdmin.ts
import { createClient } from '@supabase/supabase-js';

// Environment variables — make sure these are defined in your .env
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Service role client (should only be used server-side)
const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

export default supabaseAdmin;

