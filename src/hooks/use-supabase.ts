/**
 * React hooks for client-side Supabase operations.
 *
 * These hooks use the anon client and are safe to use in
 * client components. They integrate with React's state
 * for loading/error handling.
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { isSupabaseConfigured, getSupabaseClient } from "@/lib/supabase";

interface QueryConfig {
  table: string;
  select?: string;
  filter?: { column: string; value: unknown };
  orderBy?: { column: string; ascending?: boolean };
  limit?: number;
  single?: boolean;
}

interface UseSupabaseQueryResult<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Fetch data from a Supabase table with loading/error state.
 * If Supabase is not configured, returns empty data with no error.
 */
export function useSupabaseQuery<T>(
  config: QueryConfig
): UseSupabaseQueryResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState(0);
  const configRef = useRef(config);
  configRef.current = config;

  const refetch = useCallback(() => setTrigger((n) => n + 1), []);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    let cancelled = false;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const sb = getSupabaseClient();
        const { table, select, filter, orderBy, limit, single } = configRef.current;
        let query = sb.from(table).select(select ?? "*");

        if (filter) {
          query = query.eq(filter.column, filter.value);
        }
        if (orderBy) {
          query = query.order(orderBy.column, { ascending: orderBy.ascending ?? true });
        }
        if (limit) {
          query = query.limit(limit);
        }

        const result = single
          ? await query.single()
          : await query;

        if (cancelled) return;
        if (result.error) {
          setError(result.error.message);
          setData([]);
        } else {
          const rows = result.data;
          setData(Array.isArray(rows) ? (rows as T[]) : rows ? [rows as T] : []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error");
          setData([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void fetchData();
    return () => { cancelled = true; };
  }, [trigger]);

  return { data, loading, error, refetch };
}

interface MutationState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface MutationActions<T> {
  insert: (row: Record<string, unknown>) => Promise<T | null>;
  update: (id: string, row: Record<string, unknown>) => Promise<T | null>;
  remove: (id: string) => Promise<boolean>;
}

/**
 * Mutation hook for Supabase insert/update/delete.
 * If Supabase is not configured, all mutations are no-ops.
 */
export function useSupabaseMutation<T>(
  table: string
): MutationState<T> & MutationActions<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const insert = useCallback(
    async (row: Record<string, unknown>): Promise<T | null> => {
      if (!isSupabaseConfigured()) return null;
      setLoading(true);
      setError(null);
      try {
        const sb = getSupabaseClient();
        const { data: result, error: sbError } = await sb
          .from(table)
          .insert(row)
          .select("*")
          .single();
        if (sbError) throw sbError;
        setData(result as T);
        return result as T;
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        setError(msg);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [table]
  );

  const update = useCallback(
    async (id: string, row: Record<string, unknown>): Promise<T | null> => {
      if (!isSupabaseConfigured()) return null;
      setLoading(true);
      setError(null);
      try {
        const sb = getSupabaseClient();
        const { data: result, error: sbError } = await sb
          .from(table)
          .update({ ...row, updated_at: new Date().toISOString() })
          .eq("id", id)
          .select("*")
          .single();
        if (sbError) throw sbError;
        setData(result as T);
        return result as T;
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        setError(msg);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [table]
  );

  const remove = useCallback(
    async (id: string): Promise<boolean> => {
      if (!isSupabaseConfigured()) return false;
      setLoading(true);
      setError(null);
      try {
        const sb = getSupabaseClient();
        const { error: sbError } = await sb.from(table).delete().eq("id", id);
        if (sbError) throw sbError;
        setData(null);
        return true;
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        setError(msg);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [table]
  );

  return { data, loading, error, insert, update, remove };
}
