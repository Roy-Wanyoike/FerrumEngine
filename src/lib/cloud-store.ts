// Type-strict compliance: no issues found
import { existsSync, unlinkSync } from "node:fs";
import { loadSnapshot, saveSnapshot, registerShutdownHook, DB_FILE } from "./persist";
import type { TeamRole, Environment, TokenType, ComponentStatus } from "./types";

export interface Team {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  teamId: string;
  userId: string;
  role: TeamRole;
  joinedAt: string;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  teamId: string;
  environment: Environment;
  createdAt: string;
  updatedAt: string;
}

export interface DesignToken {
  id: string;
  name: string;
  value: string;
  type: TokenType;
  namespace: string;
  projectId: string;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface TokenVersion {
  id: string;
  tokenId: string;
  value: string;
  version: number;
  changelog: string | null;
  createdBy: string;
  createdAt: string;
}

export interface Component {
  id: string;
  name: string;
  description: string | null;
  projectId: string;
  status: ComponentStatus;
  version: number;
  accessibilityScore: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuditLog {
  id: string;
  teamId: string;
  userId: string;
  action: string;
  entityType: string;
  entityId: string | null;
  metadata: string | null;
  createdAt: string;
}

const DEMO_USER_ID = "user_demo_001";

function id(prefix: string): string {
  return `${prefix}_${crypto.randomUUID().slice(0, 8)}`;
}

function iso(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString();
}

// --- Seed Data ---

const teams: Team[] = [
  { id: "team_01", name: "Ferrum Design", slug: "ferrum-design", createdAt: iso(90), updatedAt: iso(2) },
  { id: "team_02", name: "Acme Corp", slug: "acme-corp", createdAt: iso(60), updatedAt: iso(5) },
  { id: "team_03", name: "Nebula Labs", slug: "nebula-labs", createdAt: iso(30), updatedAt: iso(1) },
];

const members: TeamMember[] = [
  { id: "mem_01", teamId: "team_01", userId: DEMO_USER_ID, role: "OWNER", joinedAt: iso(90) },
  { id: "mem_02", teamId: "team_01", userId: "user_002", role: "ADMIN", joinedAt: iso(80) },
  { id: "mem_03", teamId: "team_01", userId: "user_003", role: "MEMBER", joinedAt: iso(45) },
  { id: "mem_04", teamId: "team_02", userId: DEMO_USER_ID, role: "ADMIN", joinedAt: iso(60) },
  { id: "mem_05", teamId: "team_02", userId: "user_004", role: "OWNER", joinedAt: iso(60) },
  { id: "mem_06", teamId: "team_03", userId: DEMO_USER_ID, role: "MEMBER", joinedAt: iso(30) },
  { id: "mem_07", teamId: "team_01", userId: "user_005", role: "VIEWER", joinedAt: iso(10) },
];

const projects: Project[] = [
  { id: "proj_01", name: "Core Design System", slug: "core-ds", teamId: "team_01", environment: "production", createdAt: iso(85), updatedAt: iso(2) },
  { id: "proj_02", name: "Marketing Site", slug: "marketing-site", teamId: "team_01", environment: "staging", createdAt: iso(50), updatedAt: iso(7) },
  { id: "proj_03", name: "Acme Dashboard", slug: "acme-dashboard", teamId: "team_02", environment: "dev", createdAt: iso(40), updatedAt: iso(3) },
  { id: "proj_04", name: "Nebula Mobile", slug: "nebula-mobile", teamId: "team_03", environment: "staging", createdAt: iso(25), updatedAt: iso(1) },
  { id: "proj_05", name: "Ferrum Docs", slug: "ferrum-docs", teamId: "team_01", environment: "production", createdAt: iso(20), updatedAt: iso(4) },
];

const tokens: DesignToken[] = [
  // Core Design System tokens
  { id: "tok_01", name: "primary", value: "oklch(0.7 0.15 250)", type: "color", namespace: "color", projectId: "proj_01", version: 3, createdAt: iso(80), updatedAt: iso(5) },
  { id: "tok_02", name: "secondary", value: "oklch(0.6 0.12 180)", type: "color", namespace: "color", projectId: "proj_01", version: 2, createdAt: iso(80), updatedAt: iso(10) },
  { id: "tok_03", name: "background", value: "oklch(0.13 0.01 260)", type: "color", namespace: "color", projectId: "proj_01", version: 4, createdAt: iso(80), updatedAt: iso(2) },
  { id: "tok_04", name: "surface", value: "oklch(0.17 0.01 260)", type: "color", namespace: "color", projectId: "proj_01", version: 2, createdAt: iso(75), updatedAt: iso(8) },
  { id: "tok_05", name: "text-primary", value: "oklch(0.95 0.01 260)", type: "color", namespace: "color", projectId: "proj_01", version: 3, createdAt: iso(75), updatedAt: iso(3) },
  { id: "tok_06", name: "unit-1", value: "4px", type: "spacing", namespace: "spacing", projectId: "proj_01", version: 1, createdAt: iso(78), updatedAt: iso(78) },
  { id: "tok_07", name: "unit-2", value: "8px", type: "spacing", namespace: "spacing", projectId: "proj_01", version: 1, createdAt: iso(78), updatedAt: iso(78) },
  { id: "tok_08", name: "unit-4", value: "16px", type: "spacing", namespace: "spacing", projectId: "proj_01", version: 1, createdAt: iso(78), updatedAt: iso(78) },
  { id: "tok_09", name: "unit-8", value: "32px", type: "spacing", namespace: "spacing", projectId: "proj_01", version: 2, createdAt: iso(78), updatedAt: iso(15) },
  { id: "tok_10", name: "heading-lg", value: "2.25rem / 1.2", type: "typography", namespace: "typography", projectId: "proj_01", version: 2, createdAt: iso(76), updatedAt: iso(6) },
  { id: "tok_11", name: "body-md", value: "1rem / 1.6", type: "typography", namespace: "typography", projectId: "proj_01", version: 1, createdAt: iso(76), updatedAt: iso(76) },
  { id: "tok_12", name: "mono-sm", value: "0.875rem / 1.5 JetBrains Mono", type: "typography", namespace: "typography", projectId: "proj_01", version: 1, createdAt: iso(76), updatedAt: iso(76) },
  { id: "tok_13", name: "shadow-sm", value: "0 1px 2px oklch(0 0 0/10%)", type: "shadow", namespace: "shadow", projectId: "proj_01", version: 1, createdAt: iso(70), updatedAt: iso(70) },
  { id: "tok_14", name: "shadow-md", value: "0 4px 12px oklch(0 0 0/15%)", type: "shadow", namespace: "shadow", projectId: "proj_01", version: 1, createdAt: iso(70), updatedAt: iso(70) },
  { id: "tok_15", name: "shadow-lg", value: "0 8px 32px oklch(0 0 0/20%)", type: "shadow", namespace: "shadow", projectId: "proj_01", version: 1, createdAt: iso(70), updatedAt: iso(70) },
  { id: "tok_16", name: "ease-out", value: "cubic-bezier(0.16, 1, 0.3, 1)", type: "motion", namespace: "motion", projectId: "proj_01", version: 1, createdAt: iso(65), updatedAt: iso(65) },
  { id: "tok_17", name: "spring", value: "cubic-bezier(0.34, 1.56, 0.64, 1)", type: "motion", namespace: "motion", projectId: "proj_01", version: 1, createdAt: iso(65), updatedAt: iso(65) },
  { id: "tok_18", name: "radius-sm", value: "6px", type: "radius", namespace: "radius", projectId: "proj_01", version: 1, createdAt: iso(68), updatedAt: iso(68) },
  { id: "tok_19", name: "radius-md", value: "10px", type: "radius", namespace: "radius", projectId: "proj_01", version: 1, createdAt: iso(68), updatedAt: iso(68) },
  { id: "tok_20", name: "radius-lg", value: "16px", type: "radius", namespace: "radius", projectId: "proj_01", version: 1, createdAt: iso(68), updatedAt: iso(68) },
  { id: "tok_21", name: "radius-full", value: "9999px", type: "radius", namespace: "radius", projectId: "proj_01", version: 1, createdAt: iso(68), updatedAt: iso(68) },
  { id: "tok_22", name: "border-default", value: "1px solid oklch(1 0 0/10%)", type: "border", namespace: "border", projectId: "proj_01", version: 1, createdAt: iso(72), updatedAt: iso(72) },
  { id: "tok_23", name: "border-strong", value: "1px solid oklch(1 0 0/20%)", type: "border", namespace: "border", projectId: "proj_01", version: 1, createdAt: iso(72), updatedAt: iso(72) },
  // Marketing Site tokens
  { id: "tok_24", name: "accent", value: "oklch(0.75 0.18 160)", type: "color", namespace: "color", projectId: "proj_02", version: 2, createdAt: iso(45), updatedAt: iso(7) },
  { id: "tok_25", name: "gradient-hero", value: "linear-gradient(135deg, oklch(0.3 0.1 260), oklch(0.5 0.15 200))", type: "color", namespace: "color", projectId: "proj_02", version: 1, createdAt: iso(45), updatedAt: iso(45) },
  { id: "tok_26", name: "unit-3", value: "12px", type: "spacing", namespace: "spacing", projectId: "proj_02", version: 1, createdAt: iso(44), updatedAt: iso(44) },
  // Acme Dashboard tokens
  { id: "tok_27", name: "brand", value: "oklch(0.65 0.2 30)", type: "color", namespace: "color", projectId: "proj_03", version: 1, createdAt: iso(38), updatedAt: iso(3) },
  { id: "tok_28", name: "success", value: "oklch(0.7 0.18 145)", type: "color", namespace: "semantic", projectId: "proj_03", version: 1, createdAt: iso(38), updatedAt: iso(38) },
  { id: "tok_29", name: "danger", value: "oklch(0.65 0.22 25)", type: "color", namespace: "semantic", projectId: "proj_03", version: 1, createdAt: iso(38), updatedAt: iso(38) },
  // Nebula Mobile tokens
  { id: "tok_30", name: "nav-height", value: "56px", type: "spacing", namespace: "layout", projectId: "proj_04", version: 1, createdAt: iso(24), updatedAt: iso(24) },
  { id: "tok_31", name: "heading-sm", value: "1.125rem / 1.3", type: "typography", namespace: "typography", projectId: "proj_04", version: 1, createdAt: iso(24), updatedAt: iso(24) },
  // Ferrum Docs tokens
  { id: "tok_32", name: "code-bg", value: "oklch(0.15 0.01 260)", type: "color", namespace: "syntax", projectId: "proj_05", version: 1, createdAt: iso(18), updatedAt: iso(18) },
];

const tokenVersions: TokenVersion[] = [
  { id: "tv_01", tokenId: "tok_01", value: "oklch(0.7 0.15 250)", version: 3, changelog: "Refined blue primary for better contrast", createdBy: DEMO_USER_ID, createdAt: iso(5) },
  { id: "tv_02", tokenId: "tok_01", value: "oklch(0.68 0.14 248)", version: 2, changelog: "Adjusted lightness", createdBy: "user_002", createdAt: iso(30) },
  { id: "tv_03", tokenId: "tok_01", value: "oklch(0.65 0.12 245)", version: 1, changelog: "Initial value", createdBy: DEMO_USER_ID, createdAt: iso(80) },
  { id: "tv_04", tokenId: "tok_03", value: "oklch(0.13 0.01 260)", version: 4, changelog: "Darkened background slightly", createdBy: DEMO_USER_ID, createdAt: iso(2) },
  { id: "tv_05", tokenId: "tok_09", value: "32px", version: 2, changelog: "Increased from 24px for more breathing room", createdBy: "user_002", createdAt: iso(15) },
];

const components: Component[] = [
  { id: "comp_01", name: "Button", description: "Primary action button with variants", projectId: "proj_01", status: "published", version: 5, accessibilityScore: 98, createdAt: iso(82), updatedAt: iso(3) },
  { id: "comp_02", name: "Card", description: "Content container with header and footer", projectId: "proj_01", status: "published", version: 3, accessibilityScore: 95, createdAt: iso(80), updatedAt: iso(10) },
  { id: "comp_03", name: "Dialog", description: "Modal dialog component", projectId: "proj_01", status: "published", version: 2, accessibilityScore: 97, createdAt: iso(78), updatedAt: iso(8) },
  { id: "comp_04", name: "Input", description: "Text input with label and validation", projectId: "proj_01", status: "published", version: 4, accessibilityScore: 100, createdAt: iso(76), updatedAt: iso(5) },
  { id: "comp_05", name: "Badge", description: "Status badge with color variants", projectId: "proj_01", status: "published", version: 2, accessibilityScore: 92, createdAt: iso(74), updatedAt: iso(12) },
  { id: "comp_06", name: "Tabs", description: "Tabbed navigation component", projectId: "proj_01", status: "published", version: 3, accessibilityScore: 96, createdAt: iso(72), updatedAt: iso(6) },
  { id: "comp_07", name: "Tooltip", description: "Informational tooltip on hover", projectId: "proj_01", status: "review", version: 2, accessibilityScore: 88, createdAt: iso(60), updatedAt: iso(2) },
  { id: "comp_08", name: "DataGrid", description: "Sortable and filterable data table", projectId: "proj_01", status: "review", version: 1, accessibilityScore: 82, createdAt: iso(30), updatedAt: iso(3) },
  { id: "comp_09", name: "HeroSection", description: "Landing page hero with gradient background", projectId: "proj_02", status: "published", version: 4, accessibilityScore: 91, createdAt: iso(48), updatedAt: iso(7) },
  { id: "comp_10", name: "FeatureGrid", description: "3-column feature showcase grid", projectId: "proj_02", status: "published", version: 2, accessibilityScore: 93, createdAt: iso(46), updatedAt: iso(14) },
  { id: "comp_11", name: "PricingCard", description: "Pricing tier card component", projectId: "proj_02", status: "draft", version: 1, accessibilityScore: 85, createdAt: iso(15), updatedAt: iso(15) },
  { id: "comp_12", name: "Sidebar", description: "Navigation sidebar for dashboard", projectId: "proj_03", status: "published", version: 2, accessibilityScore: 94, createdAt: iso(35), updatedAt: iso(3) },
  { id: "comp_13", name: "StatCard", description: "Metric display card with trend indicator", projectId: "proj_03", status: "review", version: 1, accessibilityScore: 90, createdAt: iso(20), updatedAt: iso(20) },
  { id: "comp_14", name: "BottomSheet", description: "Mobile bottom sheet component", projectId: "proj_04", status: "published", version: 1, accessibilityScore: 87, createdAt: iso(22), updatedAt: iso(1) },
  { id: "comp_15", name: "CodeBlock", description: "Syntax-highlighted code block", projectId: "proj_05", status: "published", version: 3, accessibilityScore: 96, createdAt: iso(18), updatedAt: iso(4) },
  { id: "comp_16", name: "NavBreadcrumb", description: "Breadcrumb navigation", projectId: "proj_01", status: "deprecated", version: 2, accessibilityScore: 90, createdAt: iso(70), updatedAt: iso(40) },
];

const auditLogs: AuditLog[] = [
  { id: "log_01", teamId: "team_01", userId: DEMO_USER_ID, action: "update", entityType: "DesignToken", entityId: "tok_01", metadata: JSON.stringify({ field: "value", from: "oklch(0.68 0.14 248)", to: "oklch(0.7 0.15 250)" }), createdAt: iso(5) },
  { id: "log_02", teamId: "team_01", userId: DEMO_USER_ID, action: "update", entityType: "DesignToken", entityId: "tok_03", metadata: JSON.stringify({ field: "value", from: "oklch(0.14 0.01 260)", to: "oklch(0.13 0.01 260)" }), createdAt: iso(2) },
  { id: "log_03", teamId: "team_01", userId: "user_002", action: "update", entityType: "Component", entityId: "comp_01", metadata: JSON.stringify({ field: "version", from: 4, to: 5 }), createdAt: iso(3) },
  { id: "log_04", teamId: "team_02", userId: DEMO_USER_ID, action: "create", entityType: "DesignToken", entityId: "tok_27", metadata: JSON.stringify({ name: "brand" }), createdAt: iso(38) },
  { id: "log_05", teamId: "team_01", userId: DEMO_USER_ID, action: "create", entityType: "Project", entityId: "proj_05", metadata: JSON.stringify({ name: "Ferrum Docs" }), createdAt: iso(20) },
  { id: "log_06", teamId: "team_01", userId: "user_002", action: "update", entityType: "DesignToken", entityId: "tok_09", metadata: JSON.stringify({ field: "value", from: "24px", to: "32px" }), createdAt: iso(15) },
  { id: "log_07", teamId: "team_03", userId: DEMO_USER_ID, action: "create", entityType: "Project", entityId: "proj_04", metadata: JSON.stringify({ name: "Nebula Mobile" }), createdAt: iso(25) },
  { id: "log_08", teamId: "team_01", userId: DEMO_USER_ID, action: "update", entityType: "Component", entityId: "comp_07", metadata: JSON.stringify({ field: "status", from: "draft", to: "review" }), createdAt: iso(2) },
  { id: "log_09", teamId: "team_01", userId: "user_003", action: "create", entityType: "Component", entityId: "comp_08", metadata: JSON.stringify({ name: "DataGrid" }), createdAt: iso(30) },
  { id: "log_10", teamId: "team_02", userId: "user_004", action: "create", entityType: "Project", entityId: "proj_03", metadata: JSON.stringify({ name: "Acme Dashboard" }), createdAt: iso(40) },
  { id: "log_11", teamId: "team_01", userId: "user_002", action: "update", entityType: "DesignToken", entityId: "tok_10", metadata: JSON.stringify({ field: "value", from: "2rem / 1.25", to: "2.25rem / 1.2" }), createdAt: iso(6) },
  { id: "log_12", teamId: "team_01", userId: DEMO_USER_ID, action: "create", entityType: "DesignToken", entityId: "tok_22", metadata: JSON.stringify({ name: "border-default" }), createdAt: iso(72) },
];

// --- Store ---

interface CloudSnapshot {
  teams: Team[];
  members: TeamMember[];
  projects: Project[];
  tokenList: DesignToken[];
  tokenVersions: TokenVersion[];
  componentList: Component[];
  auditLogList: AuditLog[];
  version: number;
  savedAt: string;
}

class CloudStore {
  teams: Team[];
  members: TeamMember[];
  projects: Project[];
  tokenList: DesignToken[];
  tokenVersions: TokenVersion[];
  componentList: Component[];
  auditLogList: AuditLog[];
  persistenceEnabled: boolean;

  constructor() {
    // Try to load from disk. If file missing or corrupt, fall back to seed data.
    const snapshot = loadSnapshot<CloudSnapshot>();
    if (snapshot && Array.isArray(snapshot.teams)) {
      this.teams = snapshot.teams;
      this.members = snapshot.members ?? [];
      this.projects = snapshot.projects ?? [];
      this.tokenList = snapshot.tokenList ?? [];
      this.tokenVersions = snapshot.tokenVersions ?? [];
      this.componentList = snapshot.componentList ?? [];
      this.auditLogList = snapshot.auditLogList ?? [];
      this.persistenceEnabled = true;
    } else {
      // Seed data — first run or corrupted snapshot.
      this.teams = [...teams];
      this.members = [...members];
      this.projects = [...projects];
      this.tokenList = [...tokens];
      this.tokenVersions = [...tokenVersions];
      this.componentList = [...components];
      this.auditLogList = [...auditLogs];
      this.persistenceEnabled = true;
      // Persist the seed so subsequent loads read from disk.
      this.persist();
    }
  }

  /** Serialize the entire store to a JSON-safe snapshot. */
  serialize(): CloudSnapshot {
    return {
      teams: this.teams,
      members: this.members,
      projects: this.projects,
      tokenList: this.tokenList,
      tokenVersions: this.tokenVersions,
      componentList: this.componentList,
      auditLogList: this.auditLogList,
      version: 1,
      savedAt: new Date().toISOString(),
    };
  }

  /** Queue a debounced write to disk. Fire-and-forget. */
  private persist() {
    if (!this.persistenceEnabled) return;
    saveSnapshot(this.serialize());
  }

  // Teams
  getTeams() { return this.teams; }
  getTeam(id: string) { return this.teams.find(t => t.id === id); }
  createTeam(name: string) {
    const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") + "-" + crypto.randomUUID().slice(0, 5);
    const team: Team = { id: id("team"), name, slug, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    this.teams.push(team);
    this.members.push({ id: id("mem"), teamId: team.id, userId: DEMO_USER_ID, role: "OWNER", joinedAt: new Date().toISOString() });
    this.addAudit(team.id, DEMO_USER_ID, "create", "Team", team.id, { name });
    this.persist();
    return team;
  }
  updateTeam(id: string, data: Partial<Pick<Team, "name">>) {
    const team = this.getTeam(id);
    if (!team) return null;
    if (data.name) team.name = data.name;
    team.updatedAt = new Date().toISOString();
    this.addAudit(team.id, DEMO_USER_ID, "update", "Team", team.id, { name: data.name });
    this.persist();
    return team;
  }
  deleteTeam(id: string) {
    const idx = this.teams.findIndex(t => t.id === id);
    if (idx === -1) return false;
    const team = this.teams[idx]!;
    this.addAudit(team.id, DEMO_USER_ID, "delete", "Team", team.id, { name: team.name });
    this.teams.splice(idx, 1);
    // Cascade delete: remove all members, projects, and their tokens/components
    this.members = this.members.filter(m => m.teamId !== id);
    const projectIds = this.projects.filter(p => p.teamId === id).map(p => p.id);
    this.projects = this.projects.filter(p => p.teamId !== id);
    const tokenIds = this.tokenList.filter(t => projectIds.includes(t.projectId)).map(t => t.id);
    this.tokenList = this.tokenList.filter(t => !projectIds.includes(t.projectId));
    this.tokenVersions = this.tokenVersions.filter(tv => !tokenIds.includes(tv.tokenId));
    this.componentList = this.componentList.filter(c => !projectIds.includes(c.projectId));
    this.persist();
    return true;
  }
  getTeamMemberCount(teamId: string) { return this.members.filter(m => m.teamId === teamId).length; }
  getTeamProjectCount(teamId: string) { return this.projects.filter(p => p.teamId === teamId).length; }

  // Projects
  getProjects(teamId: string) { return this.projects.filter(p => p.teamId === teamId); }
  getProject(id: string) { return this.projects.find(p => p.id === id); }
  createProject(teamId: string, name: string, environment: Environment = "dev") {
    const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") + "-" + crypto.randomUUID().slice(0, 5);
    const project: Project = { id: id("proj"), name, slug, teamId, environment, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    this.projects.push(project);
    this.addAudit(teamId, DEMO_USER_ID, "create", "Project", project.id, { name, environment });
    this.persist();
    return project;
  }
  getProjectTokenCount(projectId: string) { return this.tokenList.filter(t => t.projectId === projectId).length; }
  getProjectComponentCount(projectId: string) { return this.componentList.filter(c => c.projectId === projectId).length; }

  // Design Tokens
  getTokens(projectId: string) { return this.tokenList.filter(t => t.projectId === projectId); }
  createToken(projectId: string, data: { name: string; value: string; type: TokenType; namespace: string }) {
    const token: DesignToken = { id: id("tok"), projectId, version: 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), ...data };
    this.tokenList.push(token);
    const proj = this.projects.find(p => p.id === projectId);
    if (proj) this.addAudit(proj.teamId, DEMO_USER_ID, "create", "DesignToken", token.id, { name: data.name, type: data.type });
    this.persist();
    return token;
  }
  updateToken(tokenId: string, data: Partial<Pick<DesignToken, "name" | "value" | "namespace">>) {
    const token = this.tokenList.find(t => t.id === tokenId);
    if (!token) return null;
    const old: Record<string, unknown> = {};
    if (data.name && data.name !== token.name) { old.from = token.name; old.to = data.name; token.name = data.name; }
    if (data.value && data.value !== token.value) { old.from = token.value; old.to = data.value; token.value = data.value; }
    if (data.namespace && data.namespace !== token.namespace) { old.from = token.namespace; old.to = data.namespace; token.namespace = data.namespace; }
    token.version++;
    token.updatedAt = new Date().toISOString();
    this.tokenVersions.push({ id: id("tv"), tokenId, value: token.value, version: token.version, changelog: "Updated via dashboard", createdBy: DEMO_USER_ID, createdAt: new Date().toISOString() });
    const proj = this.projects.find(p => p.id === token.projectId);
    if (proj) this.addAudit(proj.teamId, DEMO_USER_ID, "update", "DesignToken", token.id, old);
    this.persist();
    return token;
  }

  // Components
  getComponents(projectId: string) { return this.componentList.filter(c => c.projectId === projectId); }

  // Audit
  getAuditLogs(teamId?: string, limit = 20) {
    const logs = teamId ? this.auditLogList.filter(l => l.teamId === teamId) : [...this.auditLogList];
    return logs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, limit);
  }

  private addAudit(teamId: string, userId: string, action: string, entityType: string, entityId: string | null, metadata?: Record<string, unknown>) {
    this.auditLogList.push({
      id: id("log"), teamId, userId, action, entityType, entityId,
      metadata: metadata ? JSON.stringify(metadata) : null,
      createdAt: new Date().toISOString(),
    });
  }
}

// Singleton
let store: CloudStore | null = null;
export function getCloudStore(): CloudStore {
  if (!store) {
    registerShutdownHook();
    store = new CloudStore();
  }
  return store;
}

/** Test-only: reset the singleton. Set clearFile=true to also delete the persisted file. */
export function __resetCloudStoreForTests(clearFile = true) {
  store = null;
  if (clearFile) {
    try {
      if (existsSync(DB_FILE)) unlinkSync(DB_FILE);
    } catch {
      // Ignore — test cleanup is best-effort
    }
  }
}