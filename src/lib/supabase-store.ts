/**
 * Supabase-backed store that mirrors the cloud-store API.
 *
 * Every function checks isSupabaseConfigured() first:
 *  - true  → query Supabase via the service-role client
 *  - false → delegate to the in-memory cloud store (zero behaviour change)
 *
 * Return shapes match the existing cloud-store types so that API routes
 * can swap the import with no response-level changes.
 */

import { isSupabaseConfigured, getServerSupabaseClient } from "./supabase";
import {
  getCloudStore,
  type Team,
  type Project,
  type Component,
  type DesignToken,
  type AuditLog,
} from "./cloud-store";
import type { Environment, TokenType } from "./types";

// ── DB row types (snake_case, from Postgres) ─────────────────

interface TeamRow {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

interface ProjectRow {
  id: string;
  team_id: string;
  name: string;
  environment: string;
  created_at: string;
  updated_at: string;
}

interface ComponentRow {
  id: string;
  project_id: string;
  name: string;
  css_classes: string[] | null;
  status: string;
  created_at: string;
  updated_at: string;
}

interface TokenRow {
  id: string;
  team_id: string;
  name: string;
  value: string;
  namespace: string | null;
  last_used_at: string | null;
  created_at: string;
  updated_at: string;
}

interface AuditRow {
  id: number;
  team_id: string | null;
  action: string;
  resource_type: string | null;
  resource_id: string | null;
  details: Record<string, unknown> | null;
  ip_address: string | null;
  created_at: string;
}

// ── Mapping helpers ──────────────────────────────────────────

/** Map DB 'development' → in-memory 'dev'. */
function mapEnv(env: string): Environment {
  return env === "development" ? "dev" : (env as Environment);
}

/** Map in-memory 'dev' → DB 'development'. */
function unmapEnv(env: string): "development" | "staging" | "production" {
  return env === "dev" ? "development" : (env as "development" | "staging" | "production");
}

function teamRowToTeam(r: TeamRow): Team {
  return {
    id: r.id,
    name: r.name,
    slug: r.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

function projectRowToProject(r: ProjectRow): Project {
  return {
    id: r.id,
    name: r.name,
    slug: r.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
    teamId: r.team_id,
    environment: mapEnv(r.environment),
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

function componentRowToComponent(r: ComponentRow): Component {
  const statusMap: Record<string, Component["status"]> = {
    active: "published",
    archived: "deprecated",
    draft: "draft",
  };
  return {
    id: r.id,
    name: r.name,
    description: null,
    projectId: r.project_id,
    status: statusMap[r.status] ?? "draft",
    version: 1,
    accessibilityScore: null,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

function tokenRowToDesignToken(r: TokenRow, projectId?: string): DesignToken {
  return {
    id: r.id,
    name: r.name,
    value: r.value,
    type: "color" as TokenType,
    namespace: r.namespace ?? "default",
    projectId: projectId ?? "",
    version: 1,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

function auditRowToAuditLog(r: AuditRow): AuditLog {
  return {
    id: String(r.id),
    teamId: r.team_id ?? "",
    userId: "",
    action: r.action,
    entityType: r.resource_type ?? "",
    entityId: r.resource_id,
    metadata: r.details ? JSON.stringify(r.details) : null,
    createdAt: r.created_at,
  };
}

// ── Public API (mirrors cloud-store methods) ─────────────────

export async function supabaseGetTeams(): Promise<Team[]> {
  if (!isSupabaseConfigured()) return getCloudStore().getTeams();
  const sb = getServerSupabaseClient();
  const { data, error } = await sb.from("teams").select("*").order("created_at");
  if (error) throw error;
  return ((data ?? []) as TeamRow[]).map(teamRowToTeam);
}

export async function supabaseGetTeam(id: string): Promise<Team | undefined> {
  if (!isSupabaseConfigured()) return getCloudStore().getTeam(id);
  const sb = getServerSupabaseClient();
  const { data, error } = await sb.from("teams").select("*").eq("id", id).single();
  if (error || !data) return undefined;
  return teamRowToTeam(data as TeamRow);
}

export async function supabaseCreateTeam(name: string): Promise<Team> {
  if (!isSupabaseConfigured()) return getCloudStore().createTeam(name);
  const sb = getServerSupabaseClient();
  const { data, error } = await sb.from("teams").insert({ name } as Record<string, unknown>).select("*").single();
  if (error) throw error;
  return teamRowToTeam(data as TeamRow);
}

export async function supabaseUpdateTeam(id: string, data: { name?: string }): Promise<Team | null> {
  if (!isSupabaseConfigured()) return getCloudStore().updateTeam(id, data);
  const sb = getServerSupabaseClient();
  const { data: row, error } = await sb.from("teams").update({ ...data, updated_at: new Date().toISOString() } as Record<string, unknown>).eq("id", id).select("*").single();
  if (error || !row) return null;
  return teamRowToTeam(row as TeamRow);
}

export async function supabaseDeleteTeam(id: string): Promise<boolean> {
  if (!isSupabaseConfigured()) return getCloudStore().deleteTeam(id);
  const sb = getServerSupabaseClient();
  const { error } = await sb.from("teams").delete().eq("id", id);
  if (error) return false;
  return true;
}

export async function supabaseGetTeamMemberCount(_teamId: string): Promise<number> {
  if (!isSupabaseConfigured()) return getCloudStore().getTeamMemberCount(_teamId);
  // The DB schema does not have a members table. Return 1 (the owner).
  return 1;
}

export async function supabaseGetTeamProjectCount(teamId: string): Promise<number> {
  if (!isSupabaseConfigured()) return getCloudStore().getTeamProjectCount(teamId);
  const sb = getServerSupabaseClient();
  const { count, error } = await sb.from("projects").select("*", { count: "exact", head: true }).eq("team_id", teamId);
  if (error) return 0;
  return count ?? 0;
}

// ── Projects ─────────────────────────────────────────────────

export async function supabaseGetProjects(teamId: string): Promise<Project[]> {
  if (!isSupabaseConfigured()) return getCloudStore().getProjects(teamId);
  const sb = getServerSupabaseClient();
  const { data, error } = await sb.from("projects").select("*").eq("team_id", teamId).order("created_at");
  if (error) throw error;
  return ((data ?? []) as ProjectRow[]).map(projectRowToProject);
}

export async function supabaseGetProject(id: string): Promise<Project | undefined> {
  if (!isSupabaseConfigured()) return getCloudStore().getProject(id);
  const sb = getServerSupabaseClient();
  const { data, error } = await sb.from("projects").select("*").eq("id", id).single();
  if (error || !data) return undefined;
  return projectRowToProject(data as ProjectRow);
}

export async function supabaseCreateProject(teamId: string, name: string, env: Environment = "dev"): Promise<Project> {
  if (!isSupabaseConfigured()) return getCloudStore().createProject(teamId, name, env);
  const sb = getServerSupabaseClient();
  const { data, error } = await sb.from("projects").insert({ team_id: teamId, name, environment: unmapEnv(env) } as Record<string, unknown>).select("*").single();
  if (error) throw error;
  return projectRowToProject(data as ProjectRow);
}

export async function supabaseGetProjectTokenCount(projectId: string): Promise<number> {
  if (!isSupabaseConfigured()) return getCloudStore().getProjectTokenCount(projectId);
  // DB tokens are team-scoped. Look up the project's team_id first.
  const sb = getServerSupabaseClient();
  const { data: proj } = await sb.from("projects").select("team_id").eq("id", projectId).single();
  if (!proj) return 0;
  const { count, error } = await sb.from("tokens").select("*", { count: "exact", head: true }).eq("team_id", (proj as { team_id: string }).team_id);
  if (error) return 0;
  return count ?? 0;
}

export async function supabaseGetProjectComponentCount(projectId: string): Promise<number> {
  if (!isSupabaseConfigured()) return getCloudStore().getProjectComponentCount(projectId);
  const sb = getServerSupabaseClient();
  const { count, error } = await sb.from("components").select("*", { count: "exact", head: true }).eq("project_id", projectId);
  if (error) return 0;
  return count ?? 0;
}

// ── Design Tokens ────────────────────────────────────────────

export async function supabaseGetTokens(projectId: string): Promise<DesignToken[]> {
  if (!isSupabaseConfigured()) return getCloudStore().getTokens(projectId);
  const sb = getServerSupabaseClient();
  const { data: proj } = await sb.from("projects").select("team_id").eq("id", projectId).single();
  if (!proj) return [];
  const teamId = (proj as { team_id: string }).team_id;
  const { data, error } = await sb.from("tokens").select("*").eq("team_id", teamId).order("created_at");
  if (error) return [];
  return ((data ?? []) as TokenRow[]).map(r => tokenRowToDesignToken(r, projectId));
}

export async function supabaseCreateToken(projectId: string, data: { name: string; value: string; type: TokenType; namespace: string }): Promise<DesignToken> {
  if (!isSupabaseConfigured()) return getCloudStore().createToken(projectId, data);
  const sb = getServerSupabaseClient();
  const { data: proj } = await sb.from("projects").select("team_id").eq("id", projectId).single();
  if (!proj) throw new Error("Project not found");
  const teamId = (proj as { team_id: string }).team_id;
  const { data: token, error } = await sb.from("tokens").insert({ team_id: teamId, name: data.name, value: data.value, namespace: data.namespace } as Record<string, unknown>).select("*").single();
  if (error) throw error;
  return tokenRowToDesignToken(token as TokenRow, projectId);
}

export async function supabaseUpdateToken(tokenId: string, data: Partial<Pick<DesignToken, "name" | "value" | "namespace">>): Promise<DesignToken | null> {
  if (!isSupabaseConfigured()) return getCloudStore().updateToken(tokenId, data);
  const sb = getServerSupabaseClient();
  const { data: row, error } = await sb.from("tokens").update({ ...data, updated_at: new Date().toISOString() } as Record<string, unknown>).eq("id", tokenId).select("*").single();
  if (error || !row) return null;
  return tokenRowToDesignToken(row as TokenRow);
}

// ── Components ───────────────────────────────────────────────

export async function supabaseGetComponents(projectId: string): Promise<Component[]> {
  if (!isSupabaseConfigured()) return getCloudStore().getComponents(projectId);
  const sb = getServerSupabaseClient();
  const { data, error } = await sb.from("components").select("*").eq("project_id", projectId).order("created_at");
  if (error) throw error;
  return ((data ?? []) as ComponentRow[]).map(componentRowToComponent);
}

export async function supabaseCreateComponent(projectId: string, data: { name: string; css_classes?: string[]; status?: string }): Promise<Component> {
  if (!isSupabaseConfigured()) {
    const store = getCloudStore();
    const component: Component = {
      id: `comp_${crypto.randomUUID().slice(0, 8)}`,
      name: data.name,
      description: null,
      projectId,
      status: (data.status as Component["status"]) ?? "draft",
      version: 1,
      accessibilityScore: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    store.componentList.push(component);
    return component;
  }
  const sb = getServerSupabaseClient();
  const { data: row, error } = await sb.from("components").insert({ project_id: projectId, name: data.name, css_classes: data.css_classes ?? [], status: data.status ?? "active" } as Record<string, unknown>).select("*").single();
  if (error) throw error;
  return componentRowToComponent(row as ComponentRow);
}

export async function supabaseDeleteComponent(componentId: string): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    const store = getCloudStore();
    const idx = store.componentList.findIndex(c => c.id === componentId);
    if (idx === -1) return false;
    store.componentList.splice(idx, 1);
    return true;
  }
  const sb = getServerSupabaseClient();
  const { error } = await sb.from("components").delete().eq("id", componentId);
  return !error;
}

// ── Audit Log ────────────────────────────────────────────────

export async function supabaseGetAuditLogs(teamId?: string, limit = 20): Promise<AuditLog[]> {
  if (!isSupabaseConfigured()) return getCloudStore().getAuditLogs(teamId, limit);
  const sb = getServerSupabaseClient();
  let query = sb.from("audit_log").select("*").order("created_at", { ascending: false }).limit(limit);
  if (teamId) query = query.eq("team_id", teamId);
  const { data, error } = await query;
  if (error) return [];
  return ((data ?? []) as AuditRow[]).map(auditRowToAuditLog);
}

export async function supabaseLogAudit(teamId: string, action: string, resource: { type?: string; id?: string; details?: Record<string, unknown> }): Promise<void> {
  if (!isSupabaseConfigured()) return;
  const sb = getServerSupabaseClient();
  await sb.from("audit_log").insert({
    team_id: teamId,
    action,
    resource_type: resource.type ?? null,
    resource_id: resource.id ?? null,
    details: resource.details ?? {},
  } as Record<string, unknown>);
}
