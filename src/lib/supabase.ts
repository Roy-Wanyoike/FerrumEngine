/**
 * Supabase Client Configuration
 *
 * Provides Supabase clients for both client-side and server-side use.
 * When NEXT_PUBLIC_SUPABASE_URL is not set, all operations gracefully
 * fall back to the in-memory cloud store.
 *
 * We intentionally use untyped clients and cast results in supabase-store.ts
 * to avoid complex generic gymnastics with the strict TypeScript config.
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

/**
 * Check whether Supabase is properly configured.
 * Returns false when the URL env var is missing/empty, so callers can
 * fall back to the in-memory store.
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_URL.startsWith("http"));
}

/**
 * Client-side Supabase client (anon key). Safe to use in browser code.
 */
let _browserClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (!_browserClient) {
    _browserClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return _browserClient;
}

/**
 * Server-side Supabase client (service role key). Bypasses RLS.
 * Only use in API routes and server components.
 */
let _serverClient: SupabaseClient | null = null;

export function getServerSupabaseClient(): SupabaseClient {
  if (!_serverClient) {
    if (!SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error(
        "SUPABASE_SERVICE_ROLE_KEY is not set. Server-side Supabase operations require it."
      );
    }
    _serverClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  }
  return _serverClient;
}
