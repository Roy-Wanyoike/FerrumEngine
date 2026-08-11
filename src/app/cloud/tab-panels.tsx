"use client";

import {
  Users, FolderKanban, Palette, Layers, Plus,
  ChevronRight, Shield, Pencil, Trash2, Circle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
} from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { CloudBreadcrumb } from "./cloud-breadcrumb";
import type { TeamWithCounts, ProjectWithCounts } from "@/hooks/use-cloud-data";
import type { DesignToken, Component, AuditLog } from "@/lib/cloud-store";

// ─── Color helpers (module-level, shared across panels) ───────────
const typeColors: Record<string, string> = {
  color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  spacing: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  typography: "bg-violet-500/15 text-violet-400 border-violet-500/20",
  shadow: "bg-slate-500/15 text-slate-300 border-slate-500/20",
  motion: "bg-rose-500/15 text-rose-400 border-rose-500/20",
  border: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
  radius: "bg-orange-500/15 text-orange-400 border-orange-500/20",
};

const statusColors: Record<string, string> = {
  draft: "bg-muted text-muted-foreground",
  review: "bg-amber-500/15 text-amber-400",
  published: "bg-emerald-500/15 text-emerald-400",
  deprecated: "bg-red-500/15 text-red-400",
};

const envColors: Record<string, string> = {
  dev: "bg-slate-500/15 text-slate-300",
  staging: "bg-amber-500/15 text-amber-400",
  production: "bg-emerald-500/15 text-emerald-400",
};

// ─── Helpers ──────────────────────────────────────────────────────
function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

function a11yColor(score: number | null): string {
  if (score === null) return "text-muted-foreground";
  if (score >= 95) return "text-emerald-400";
  if (score >= 90) return "text-amber-400";
  return "text-red-400";
}

// ─── Overview Panel ───────────────────────────────────────────────
export function OverviewPanel({
  teams, projects, tokens, components, auditLogs,
}: {
  teams: TeamWithCounts[];
  projects: ProjectWithCounts[];
  tokens: DesignToken[];
  components: Component[];
  auditLogs: AuditLog[];
}) {
  return (
    <section role="tabpanel" id="panel-overview" aria-labelledby="tab-overview" className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Teams", value: teams.length, icon: Users, color: "text-violet-400" },
          { label: "Projects", value: projects.length || teams.reduce((s, t) => s + t.projectCount, 0), icon: FolderKanban, color: "text-amber-400" },
          { label: "Design Tokens", value: tokens.length ? String(tokens.length) : "—", icon: Palette, color: "text-emerald-400" },
          { label: "Components", value: components.length ? String(components.length) : "—", icon: Layers, color: "text-rose-400" },
        ].map(stat => (
          <Card key={stat.label} className="py-4">
            <CardContent className="px-4 flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg bg-foreground/[0.04] flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-2xl font-bold tabular-nums text-foreground">{stat.value}</p>
                <p className="text-[11px] text-muted-foreground font-medium">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Activity */}
      <Card className="py-0">
        <CardHeader className="pb-0">
          <CardTitle className="text-sm font-semibold">Recent Activity</CardTitle>
          <CardDescription>Latest changes across all teams</CardDescription>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="space-y-0 divide-y divide-border/50 max-h-80 overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
            {auditLogs.map(log => {
              let meta: Record<string, string> = {};
              try { meta = log.metadata ? JSON.parse(log.metadata) : {}; } catch (e) { console.warn("[Cloud] Failed to parse log metadata", e); }
              return (
                <div key={log.id} className="flex items-start gap-3 py-3 first:pt-1 last:pb-0">
                  <div className="mt-1 w-6 h-6 rounded-md bg-foreground/[0.04] flex items-center justify-center shrink-0">
                    {log.action === "create" ? <Plus className="w-3 h-3 text-emerald-400" /> :
                     log.action === "delete" ? <Trash2 className="w-3 h-3 text-red-400" /> :
                     <Pencil className="w-3 h-3 text-amber-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-foreground/90 leading-snug">
                      <span className="font-medium">{log.entityType}</span>
                      {" "}{log.action === "create" ? "created" : log.action === "delete" ? "deleted" : "updated"}
                      {meta.name ? ` — "${meta.name}"` : ""}
                      {meta.from ? ` (${meta.from} → ${meta.to})` : ""}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{timeAgo(log.createdAt)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

// ─── Teams Panel ──────────────────────────────────────────────────
export function TeamsPanel({
  teams, onShowCreateTeam, onSelectTeam,
}: {
  teams: TeamWithCounts[];
  onShowCreateTeam: () => void;
  onSelectTeam: (teamId: string) => void;
}) {
  return (
    <section role="tabpanel" id="panel-teams" aria-labelledby="tab-teams" className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{teams.length} team{teams.length !== 1 ? "s" : ""}</p>
        <Button size="sm" onClick={onShowCreateTeam}>
          <Plus className="w-3.5 h-3.5 mr-1.5" />New Team
        </Button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {teams.map(team => (
          <Card key={team.id} className="py-4 cursor-pointer hover:border-foreground/20 transition-colors"
            onClick={() => onSelectTeam(team.id)}>
            <CardContent className="px-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{team.name}</h3>
                  <p className="text-[11px] text-muted-foreground font-mono mt-0.5">/{team.slug}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground/50 mt-0.5" />
              </div>
              <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1"><Users className="w-3 h-3" />{team.memberCount}</span>
                <span className="flex items-center gap-1"><FolderKanban className="w-3 h-3" />{team.projectCount}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

// ─── Projects Panel ───────────────────────────────────────────────
export function ProjectsPanel({
  selectedTeamId, selectedProjectId, teams, projects, onShowCreateProject, onSelectProject, onDeselectTeam, onGoToTeams,
}: {
  selectedTeamId: string | null;
  selectedProjectId: string | null;
  teams: TeamWithCounts[];
  projects: ProjectWithCounts[];
  onShowCreateProject: () => void;
  onSelectProject: (proj: ProjectWithCounts) => void;
  onDeselectTeam: () => void;
  onGoToTeams: () => void;
}) {
  if (!selectedTeamId) {
    return (
      <section role="tabpanel" id="panel-projects" aria-labelledby="tab-projects" className="space-y-4">
        <div className="py-12 text-center space-y-2">
          <Shield className="w-8 h-8 text-muted-foreground/30 mx-auto" />
          <p className="text-sm text-muted-foreground">Select a team to view its projects</p>
          <Button variant="outline" size="sm" onClick={onGoToTeams}>
            <Users className="w-3.5 h-3.5 mr-1.5" />View Teams
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section role="tabpanel" id="panel-projects" aria-labelledby="tab-projects" className="space-y-4">
      <div className="flex items-center justify-between">
        <CloudBreadcrumb items={[
          { label: "Teams", onClick: onDeselectTeam },
          { label: teams.find(t => t.id === selectedTeamId)?.name ?? "" },
        ]} />
        <Button size="sm" onClick={onShowCreateProject}>
          <Plus className="w-3.5 h-3.5 mr-1.5" />New Project
        </Button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map(proj => (
          <Card key={proj.id} className={`py-4 cursor-pointer transition-colors ${selectedProjectId === proj.id ? "border-foreground/30 bg-foreground/[0.03]" : "hover:border-foreground/20"}`}
            onClick={() => onSelectProject(proj)}>
            <CardContent className="px-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{proj.name}</h3>
                  <p className="text-[11px] text-muted-foreground font-mono mt-0.5">/{proj.slug}</p>
                </div>
                <Badge variant="outline" className={`text-[10px] px-1.5 py-0 font-medium border-0 ${envColors[proj.environment]}`}>
                  {proj.environment}
                </Badge>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-muted-foreground mt-3">
                <span className="flex items-center gap-1"><Palette className="w-3 h-3" />{proj.tokenCount} tokens</span>
                <span className="flex items-center gap-1"><Layers className="w-3 h-3" />{proj.componentCount} components</span>
              </div>
              <p className="text-[10px] text-muted-foreground/60 mt-2">Updated {timeAgo(proj.updatedAt)}</p>
            </CardContent>
          </Card>
        ))}
        {projects.length === 0 && (
          <div className="col-span-full py-12 text-center text-sm text-muted-foreground">
            No projects yet. Create one to get started.
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Tokens Panel ─────────────────────────────────────────────────
export function TokensPanel({
  selectedProjectId, selectedProjectName, tokens,
  onShowCreateToken, onGoToProjects, onEditToken,
}: {
  selectedProjectId: string | null;
  selectedProjectName: string;
  tokens: DesignToken[];
  onShowCreateToken: () => void;
  onGoToProjects: () => void;
  onEditToken: (token: DesignToken) => void;
}) {
  if (!selectedProjectId) {
    return (
      <section role="tabpanel" id="panel-tokens" aria-labelledby="tab-tokens" className="space-y-4">
        <div className="py-12 text-center space-y-2">
          <Palette className="w-8 h-8 text-muted-foreground/30 mx-auto" />
          <p className="text-sm text-muted-foreground">Select a project to view its tokens</p>
          <Button variant="outline" size="sm" onClick={onGoToProjects}>
            <FolderKanban className="w-3.5 h-3.5 mr-1.5" />View Projects
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section role="tabpanel" id="panel-tokens" aria-labelledby="tab-tokens" className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <CloudBreadcrumb items={[
          { label: "Projects", onClick: onGoToProjects },
          { label: selectedProjectName },
          { label: "Tokens" },
        ]} />
        <Button size="sm" onClick={onShowCreateToken}>
          <Plus className="w-3.5 h-3.5 mr-1.5" />New Token
        </Button>
      </div>
      <Card className="py-0 overflow-hidden">
        <div className="max-h-[500px] overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[11px]">Name</TableHead>
                <TableHead className="text-[11px]">Value</TableHead>
                <TableHead className="text-[11px]">Type</TableHead>
                <TableHead className="text-[11px] hidden sm:table-cell">Namespace</TableHead>
                <TableHead className="text-[11px] text-right">Ver</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {tokens.map(token => (
                <TableRow key={token.id}>
                  <TableCell className="font-mono text-xs font-medium">{token.name}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground max-w-[200px] truncate">
                    {token.type === "color" && (
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-sm border border-border shrink-0" style={{ background: token.value }} />
                        <span className="truncate">{token.value}</span>
                      </span>
                    )}
                    {token.type !== "color" && <span className="truncate">{token.value}</span>}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-[10px] px-1.5 py-0 font-medium border-0 ${typeColors[token.type] || ""}`}>
                      {token.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground hidden sm:table-cell">{token.namespace}</TableCell>
                  <TableCell className="text-xs text-muted-foreground text-right tabular-nums">v{token.version}</TableCell>
                  <TableCell>
                    <button onClick={() => onEditToken(token)} className="p-2.5 rounded hover:bg-foreground/[0.06] text-muted-foreground hover:text-foreground transition-colors min-w-[44px] min-h-[44px]">
                      <Pencil className="w-3 h-3" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
      {tokens.length === 0 && (
        <div className="py-12 text-center text-sm text-muted-foreground">No tokens in this project.</div>
      )}
    </section>
  );
}

// ─── Components Panel ─────────────────────────────────────────────
export function ComponentsPanel({
  selectedProjectId, selectedProjectName, components,
  onGoToProjects,
}: {
  selectedProjectId: string | null;
  selectedProjectName: string;
  components: Component[];
  onGoToProjects: () => void;
}) {
  if (!selectedProjectId) {
    return (
      <section role="tabpanel" id="panel-components" aria-labelledby="tab-components" className="space-y-4">
        <div className="py-12 text-center space-y-2">
          <Layers className="w-8 h-8 text-muted-foreground/30 mx-auto" />
          <p className="text-sm text-muted-foreground">Select a project to view its components</p>
          <Button variant="outline" size="sm" onClick={onGoToProjects}>
            <FolderKanban className="w-3.5 h-3.5 mr-1.5" />View Projects
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section role="tabpanel" id="panel-components" aria-labelledby="tab-components" className="space-y-4">
      <CloudBreadcrumb items={[
        { label: "Projects", onClick: onGoToProjects },
        { label: selectedProjectName },
        { label: "Components" },
      ]} />
      <div className="grid gap-3 sm:grid-cols-2">
        {components.map(comp => (
          <Card key={comp.id} className="py-4">
            <CardContent className="px-4">
              <div className="flex items-start justify-between mb-1.5">
                <h3 className="text-sm font-semibold text-foreground">{comp.name}</h3>
                <Badge variant="outline" className={`text-[10px] px-1.5 py-0 font-medium border-0 ${statusColors[comp.status]}`}>
                  {comp.status}
                </Badge>
              </div>
              {comp.description && <p className="text-[12px] text-muted-foreground mb-2 line-clamp-2">{comp.description}</p>}
              <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                <span className="tabular-nums">v{comp.version}</span>
                {comp.accessibilityScore !== null && (
                  <span className={`flex items-center gap-1 tabular-nums font-medium ${a11yColor(comp.accessibilityScore)}`}>
                    <Circle className={`w-2 h-2 ${comp.accessibilityScore >= 95 ? "fill-emerald-400 text-emerald-400" : comp.accessibilityScore >= 90 ? "fill-amber-400 text-amber-400" : "fill-red-400 text-red-400"}`} />
                    A11y: {comp.accessibilityScore}%
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {components.length === 0 && (
        <div className="py-12 text-center text-sm text-muted-foreground">No components in this project.</div>
      )}
    </section>
  );
}
