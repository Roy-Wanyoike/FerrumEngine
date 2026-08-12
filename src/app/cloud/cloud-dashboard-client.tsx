"use client";

import {
  Users, FolderKanban, Palette, Layers, ArrowLeft, Activity,
  Eye, Shield,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useCallback, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useCloudAuth } from "@/hooks/use-cloud-auth";
import { useCloudData, type ProjectWithCounts } from "@/hooks/use-cloud-data";
import { CreateTeamModal, CreateProjectModal, CreateTokenModal, EditTokenModal, type TokenFormState } from "./cloud-modals";
import { OverviewPanel, TeamsPanel, ProjectsPanel, TokensPanel, ComponentsPanel } from "./tab-panels";
import type { DesignToken } from "@/lib/cloud-store";

const TAB_NAMES = ["overview", "teams", "projects", "tokens", "components"] as string[];

export default function CloudDashboard() {
  const router = useRouter();
  const tabListRef = useRef<HTMLElement>(null);

  // ─── Active tab (must be before conditional returns) ───────────
  const [activeTab, setActiveTab] = useState("overview");

  // ─── Dialog state ──────────────────────────────────────────────
  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showCreateToken, setShowCreateToken] = useState(false);
  const [showEditToken, setShowEditToken] = useState(false);
  const [editTokenData, setEditTokenData] = useState<DesignToken | null>(null);

  // ─── Form state ────────────────────────────────────────────────
  const [newTeamName, setNewTeamName] = useState("");
  const [newProjName, setNewProjName] = useState("");
  const [newProjEnv, setNewProjEnv] = useState("dev");
  const [tokenForm, setTokenForm] = useState<TokenFormState>({ name: "", value: "", type: "color", namespace: "global" });

  // ─── Mutation error feedback ────────────────────────────────────
  const [mutationError, setMutationError] = useState("");
  const clearMutationError = useCallback(() => setMutationError(""), []);

  // ─── Auth ──────────────────────────────────────────────────────
  const { authToken, authLoading, authError, loginPassword, setLoginPassword, handleLogin, handleLogout, authFetch } =
    useCloudAuth();

  // ─── Data ──────────────────────────────────────────────────────
  const { teams, projects, tokens, components, auditLogs, loading, selectedTeamId, selectedProjectId, setSelectedTeamId, setSelectedProjectId, refetchTeams, refetchProjects, refetchTokens, resetAll } =
    useCloudData(authToken, authFetch, handleLogout);

  // ─── Handlers ──────────────────────────────────────────────────
  const fullLogout = useCallback(() => { resetAll(); setActiveTab("overview"); }, [resetAll]);
  const onLogout = useCallback(() => { handleLogout(); fullLogout(); }, [handleLogout, fullLogout]);

  const handleCreateTeam = async () => {
    if (!newTeamName.trim()) return;
    try {
      setMutationError("");
      const res = await authFetch("/api/cloud/teams", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: newTeamName }) });
      if (res.ok) { await refetchTeams(); setShowCreateTeam(false); setNewTeamName(""); }
      else { const d = await res.json().catch(() => ({})); setMutationError(d.error ?? "Failed to create team"); }
    } catch { setMutationError("Network error. Please try again."); }
  };

  const handleCreateProject = async () => {
    if (!selectedTeamId || !newProjName.trim()) return;
    try {
      setMutationError("");
      const res = await authFetch(`/api/cloud/teams/${selectedTeamId}/projects`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: newProjName, environment: newProjEnv }) });
      if (res.ok) { await refetchProjects(); setShowCreateProject(false); setNewProjName(""); setNewProjEnv("dev"); }
      else { const d = await res.json().catch(() => ({})); setMutationError(d.error ?? "Failed to create project"); }
    } catch { setMutationError("Network error. Please try again."); }
  };

  const handleCreateToken = async () => {
    if (!selectedProjectId || !tokenForm.name.trim() || !tokenForm.value.trim()) return;
    try {
      setMutationError("");
      const res = await authFetch(`/api/cloud/projects/${selectedProjectId}/tokens`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(tokenForm) });
      if (res.ok) { await refetchTokens(); setShowCreateToken(false); setTokenForm({ name: "", value: "", type: "color", namespace: "global" }); }
      else { const d = await res.json().catch(() => ({})); setMutationError(d.error ?? "Failed to create token"); }
    } catch { setMutationError("Network error. Please try again."); }
  };

  const handleEditToken = async () => {
    if (!editTokenData) return;
    try {
      setMutationError("");
      const res = await authFetch(`/api/cloud/tokens/${editTokenData.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: tokenForm.name, value: tokenForm.value, namespace: tokenForm.namespace }) });
      if (res.ok && selectedProjectId) { await refetchTokens(); setShowEditToken(false); setEditTokenData(null); }
      else { const d = await res.json().catch(() => ({})); setMutationError(d.error ?? "Failed to update token"); }
    } catch { setMutationError("Network error. Please try again."); }
  };

  const openEditToken = (token: DesignToken) => {
    setEditTokenData(token);
    setTokenForm({ name: token.name, value: token.value, type: token.type, namespace: token.namespace });
    setShowEditToken(true);
  };

  const selectProject = (proj: ProjectWithCounts) => { setSelectedProjectId(proj.id); setActiveTab("tokens"); };

  // ─── Tab helpers ───────────────────────────────────────────────
  const tabBtnClass = (value: string, disabled?: boolean) =>
    `flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium rounded-md transition-colors ${activeTab === value ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"} ${disabled ? "opacity-40 pointer-events-none" : "cursor-pointer"}`;

  const handleTabKeyDown = useCallback((e: React.KeyboardEvent<HTMLElement>) => {
    const enabledTabs = TAB_NAMES.filter(t => t !== "tokens" && t !== "components" ? true : !!selectedProjectId);
    const currentIdx = enabledTabs.indexOf(activeTab);
    let nextIdx = currentIdx;
    if (e.key === "ArrowRight") { nextIdx = (currentIdx + 1) % enabledTabs.length; e.preventDefault(); }
    else if (e.key === "ArrowLeft") { nextIdx = (currentIdx - 1 + enabledTabs.length) % enabledTabs.length; e.preventDefault(); }
    else if (e.key === "Home") { nextIdx = 0; e.preventDefault(); }
    else if (e.key === "End") { nextIdx = enabledTabs.length - 1; e.preventDefault(); }
    else return;
    setActiveTab(enabledTabs[nextIdx]!);
    tabListRef.current?.querySelectorAll<HTMLElement>('[role="tab"]')?.[nextIdx]?.focus();
  }, [activeTab, selectedProjectId]);

  // ═══════════════════════════════════════════════════════════════════
  // ALL HOOKS DECLARED ABOVE — CONDITIONAL RETURNS BELOW
  // ═══════════════════════════════════════════════════════════════════

  if (!authToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-full max-w-sm px-6">
          <div className="text-center mb-8">
            <div className="mx-auto w-12 h-12 rounded-xl bg-foreground/5 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-foreground" />
            </div>
            <h1 className="text-2xl font-semibold text-foreground">Ferrum Cloud</h1>
            <p className="mt-2 text-sm text-muted-foreground">Enter your password to access the dashboard</p>
          </div>
          <div className="space-y-3">
            <Input type="password" placeholder="Password" aria-label="Dashboard password" value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()} autoFocus />
            {authError && <p className="text-sm text-destructive">{authError}</p>}
            <Button className="w-full" onClick={handleLogin} disabled={authLoading || !loginPassword}>
              {authLoading ? "Signing in..." : "Sign in"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border px-6 py-4"><Skeleton className="h-6 w-48" /></header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}
          </div>
          <Skeleton className="h-[400px] rounded-xl" />
        </main>
      </div>
    );
  }

  // ─── Dashboard ────────────────────────────────────────────────
  const selectedProjectName = projects.find(p => p.id === selectedProjectId)?.name ?? "";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center h-14 gap-4">
          <button onClick={() => router.push("/")} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors min-h-[44px] px-1">
            <ArrowLeft className="w-4 h-4" /><span className="hidden sm:inline">FerrumEngine</span>
          </button>
          <div className="w-px h-5 bg-border" />
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-foreground/[0.08] flex items-center justify-center">
              <Activity className="w-3.5 h-3.5 text-foreground/70" />
            </div>
            <h1 className="text-sm font-semibold text-foreground">Ferrum Cloud</h1>
            <Badge variant="outline" className="text-[10px] px-1.5 py-0 font-medium">MVP</Badge>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button onClick={onLogout} className="text-xs text-muted-foreground hover:text-foreground transition-colors">Sign out</button>
            <div className="w-7 h-7 rounded-full bg-foreground/10 flex items-center justify-center text-[11px] font-bold text-foreground/70">D</div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {mutationError && (
          <div className="mb-4 flex items-center gap-2 px-4 py-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            <span className="flex-1">{mutationError}</span>
            <button onClick={clearMutationError} className="text-destructive/70 hover:text-destructive transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Dismiss error">\u2715</button>
          </div>
        )}
        <div>
          <nav ref={tabListRef} role="tablist" aria-label="Dashboard sections" onKeyDown={handleTabKeyDown} className="flex gap-1 mb-6 p-1 bg-muted/50 rounded-lg w-fit">
            <button role="tab" aria-selected={activeTab === "overview"} id="tab-overview" aria-controls="panel-overview" tabIndex={activeTab === "overview" ? 0 : -1} onClick={() => setActiveTab("overview")} className={tabBtnClass("overview")}><Eye className="w-3.5 h-3.5" /><span className="hidden sm:inline">Overview</span></button>
            <button role="tab" aria-selected={activeTab === "teams"} id="tab-teams" aria-controls="panel-teams" tabIndex={activeTab === "teams" ? 0 : -1} onClick={() => setActiveTab("teams")} className={tabBtnClass("teams")}><Users className="w-3.5 h-3.5" /><span className="hidden sm:inline">Teams</span></button>
            <button role="tab" aria-selected={activeTab === "projects"} id="tab-projects" aria-controls="panel-projects" tabIndex={activeTab === "projects" ? 0 : -1} onClick={() => setActiveTab("projects")} className={tabBtnClass("projects")}><FolderKanban className="w-3.5 h-3.5" /><span className="hidden sm:inline">Projects</span></button>
            <button role="tab" aria-selected={activeTab === "tokens"} id="tab-tokens" aria-controls="panel-tokens" tabIndex={activeTab === "tokens" ? 0 : -1} disabled={!selectedProjectId} onClick={() => setActiveTab("tokens")} className={tabBtnClass("tokens", !selectedProjectId)}><Palette className="w-3.5 h-3.5" /><span className="hidden sm:inline">Tokens</span></button>
            <button role="tab" aria-selected={activeTab === "components"} id="tab-components" aria-controls="panel-components" tabIndex={activeTab === "components" ? 0 : -1} disabled={!selectedProjectId} onClick={() => setActiveTab("components")} className={tabBtnClass("components", !selectedProjectId)}><Layers className="w-3.5 h-3.5" /><span className="hidden sm:inline">Components</span></button>
          </nav>

          {activeTab === "overview" && <OverviewPanel teams={teams} projects={projects} tokens={tokens} components={components} auditLogs={auditLogs} />}
          {activeTab === "teams" && <TeamsPanel teams={teams} onShowCreateTeam={() => setShowCreateTeam(true)} onSelectTeam={(id) => { setSelectedTeamId(id); setSelectedProjectId(null); setActiveTab("projects"); }} />}
          {activeTab === "projects" && <ProjectsPanel selectedTeamId={selectedTeamId} selectedProjectId={selectedProjectId} teams={teams} projects={projects} onShowCreateProject={() => setShowCreateProject(true)} onSelectProject={selectProject} onDeselectTeam={() => { setSelectedTeamId(null); setSelectedProjectId(null); }} onGoToTeams={() => setActiveTab("teams")} />}
          {activeTab === "tokens" && <TokensPanel selectedProjectId={selectedProjectId} selectedProjectName={selectedProjectName} tokens={tokens} onShowCreateToken={() => { setTokenForm({ name: "", value: "", type: "color", namespace: "global" }); setShowCreateToken(true); }} onGoToProjects={() => { setSelectedProjectId(null); setActiveTab("projects"); }} onEditToken={openEditToken} />}
          {activeTab === "components" && <ComponentsPanel selectedProjectId={selectedProjectId} selectedProjectName={selectedProjectName} components={components} onGoToProjects={() => { setSelectedProjectId(null); setActiveTab("projects"); }} />}
        </div>
      </main>

      <CreateTeamModal open={showCreateTeam} onClose={() => setShowCreateTeam(false)} teamName={newTeamName} setTeamName={setNewTeamName} onSubmit={handleCreateTeam} />
      <CreateProjectModal open={showCreateProject} onClose={() => setShowCreateProject(false)} projName={newProjName} setProjName={setNewProjName} projEnv={newProjEnv} setProjEnv={setNewProjEnv} onSubmit={handleCreateProject} />
      <CreateTokenModal open={showCreateToken} onClose={() => setShowCreateToken(false)} form={tokenForm} setForm={setTokenForm} onSubmit={handleCreateToken} />
      <EditTokenModal open={showEditToken} onClose={() => setShowEditToken(false)} form={tokenForm} setForm={setTokenForm} onSubmit={handleEditToken} />
    </div>
  );
}
