/**
 * Supabase Database Types
 * Generated to match the schema in supabase/migrations/001_initial_schema.sql
 * These types are used with @supabase/supabase-js for full type safety.
 */

export interface TeamRow {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface TeamInsert {
  id?: string;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface TeamUpdate {
  id?: string;
  name?: string;
  updated_at?: string;
}

export interface ProjectRow {
  id: string;
  team_id: string;
  name: string;
  environment: "development" | "staging" | "production";
  created_at: string;
  updated_at: string;
}

export interface ProjectInsert {
  id?: string;
  team_id: string;
  name: string;
  environment?: "development" | "staging" | "production";
  created_at?: string;
  updated_at?: string;
}

export interface ProjectUpdate {
  name?: string;
  environment?: "development" | "staging" | "production";
  updated_at?: string;
}

export interface ComponentRow {
  id: string;
  project_id: string;
  name: string;
  css_classes: string[];
  status: "active" | "archived" | "draft";
  created_at: string;
  updated_at: string;
}

export interface ComponentInsert {
  id?: string;
  project_id: string;
  name: string;
  css_classes?: string[];
  status?: "active" | "archived" | "draft";
  created_at?: string;
  updated_at?: string;
}

export interface ComponentUpdate {
  name?: string;
  css_classes?: string[];
  status?: "active" | "archived" | "draft";
  updated_at?: string;
}

export interface TokenRow {
  id: string;
  team_id: string;
  name: string;
  value: string;
  namespace: string;
  last_used_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface TokenInsert {
  id?: string;
  team_id: string;
  name: string;
  value: string;
  namespace?: string;
  last_used_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface TokenUpdate {
  name?: string;
  value?: string;
  namespace?: string;
  last_used_at?: string | null;
  updated_at?: string;
}

export interface AuditLogRow {
  id: number;
  team_id: string | null;
  action: string;
  resource_type: string | null;
  resource_id: string | null;
  details: Record<string, unknown>;
  ip_address: string | null;
  created_at: string;
}

export interface AuditLogInsert {
  id?: number;
  team_id?: string | null;
  action: string;
  resource_type?: string | null;
  resource_id?: string | null;
  details?: Record<string, unknown>;
  ip_address?: string | null;
  created_at?: string;
}

export interface AuditLogUpdate {
  action?: string;
  resource_type?: string | null;
  resource_id?: string | null;
  details?: Record<string, unknown>;
  ip_address?: string | null;
}

/**
 * Database type structure compatible with Supabase generated types.
 * This can be used with createClient<Database>() for full type inference.
 */
export interface Database {
  public: {
    Tables: {
      teams: {
        Row: TeamRow;
        Insert: TeamInsert;
        Update: TeamUpdate;
      };
      projects: {
        Row: ProjectRow;
        Insert: ProjectInsert;
        Update: ProjectUpdate;
      };
      components: {
        Row: ComponentRow;
        Insert: ComponentInsert;
        Update: ComponentUpdate;
      };
      tokens: {
        Row: TokenRow;
        Insert: TokenInsert;
        Update: TokenUpdate;
      };
      audit_log: {
        Row: AuditLogRow;
        Insert: AuditLogInsert;
        Update: AuditLogUpdate;
      };
    };
  };
}
