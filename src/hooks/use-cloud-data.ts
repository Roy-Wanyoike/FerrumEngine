"use client";

import { useEffect, useState, useCallback } from "react";
import type { Team, Project, DesignToken, Component, AuditLog } from "@/lib/cloud-store";

export interface TeamWithCounts extends Team {
  memberCount: number;
  projectCount: number;
}
export interface ProjectWithCounts extends Project {
  tokenCount: number;
  componentCount: number;
}

export interface UseCloudDataReturn {
  teams: TeamWithCounts[];
  projects: ProjectWithCounts[];
  tokens: DesignToken[];
  components: Component[];
  auditLogs: AuditLog[];
  loading: boolean;
  selectedTeamId: string | null;
  selectedProjectId: string | null;
  setSelectedTeamId: (id: string | null) => void;
  setSelectedProjectId: (id: string | null) => void;
  refetchTeams: () => Promise<TeamWithCounts[]>;
  refetchProjects: () => Promise<ProjectWithCounts[]>;
  refetchTokens: () => Promise<DesignToken[]>;
  refetchComponents: () => Promise<Component[]>;
  resetAll: () => void;
}

type AuthFetch = (url: string, opts?: RequestInit) => Promise<Response>;
type OnLogout = () => void;

export function useCloudData(
  authToken: string | null,
  authFetch: AuthFetch,
  onLogout: OnLogout,
): UseCloudDataReturn {
  const [teams, setTeams] = useState<TeamWithCounts[]>([]);
  const [projects, setProjects] = useState<ProjectWithCounts[]>([]);
  const [tokens, setTokens] = useState<DesignToken[]>([]);
  const [components, setComponents] = useState<Component[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // ─── Data fetchers ────────────────────────────────────────────────
  const fetchTeams = useCallback(async (): Promise<TeamWithCounts[]> => {
    const res = await authFetch("/api/cloud/teams");
    if (res.status === 401) { onLogout(); return []; }
    return res.json() as Promise<TeamWithCounts[]>;
  }, [authFetch, onLogout]);

  const fetchProjects = useCallback(async (teamId: string): Promise<ProjectWithCounts[]> => {
    const res = await authFetch(`/api/cloud/teams/${teamId}/projects`);
    if (res.status === 401) { onLogout(); return []; }
    return res.json() as Promise<ProjectWithCounts[]>;
  }, [authFetch, onLogout]);

  const fetchTokens = useCallback(async (projectId: string): Promise<DesignToken[]> => {
    const res = await authFetch(`/api/cloud/projects/${projectId}/tokens`);
    if (res.status === 401) { onLogout(); return []; }
    return res.json() as Promise<DesignToken[]>;
  }, [authFetch, onLogout]);

  const fetchComponents = useCallback(async (projectId: string): Promise<Component[]> => {
    const res = await authFetch(`/api/cloud/projects/${projectId}/components`);
    if (res.status === 401) { onLogout(); return []; }
    return res.json() as Promise<Component[]>;
  }, [authFetch, onLogout]);

  const fetchAudit = useCallback(async (): Promise<AuditLog[]> => {
    const res = await authFetch("/api/cloud/audit?limit=15");
    if (res.status === 401) { onLogout(); return []; }
    return res.json() as Promise<AuditLog[]>;
  }, [authFetch, onLogout]);

  // ─── Data effects ─────────────────────────────────────────────────
  useEffect(() => {
    if (!authToken) { setLoading(true); return; }
    setLoading(true);
    (async () => {
      try {
        const [t, logs] = await Promise.all([fetchTeams(), fetchAudit()]);
        setTeams(t);
        setAuditLogs(logs);
      } finally {
        setLoading(false);
      }
    })();
  }, [fetchTeams, fetchAudit, authToken]);

  useEffect(() => {
    if (!authToken || !selectedTeamId) { setProjects([]); return; }
    fetchProjects(selectedTeamId).then(setProjects);
  }, [selectedTeamId, fetchProjects, authToken]);

  useEffect(() => {
    if (!authToken || !selectedProjectId) { setTokens([]); setComponents([]); return; }
    Promise.all([fetchTokens(selectedProjectId), fetchComponents(selectedProjectId)])
      .then(([t, c]) => { setTokens(t); setComponents(c); });
  }, [selectedProjectId, fetchTokens, fetchComponents, authToken]);

  // Refetch helpers that use current selections
  const refetchTeams = useCallback(async () => {
    const t = await fetchTeams();
    setTeams(t);
    return t;
  }, [fetchTeams]);

  const refetchProjects = useCallback(async () => {
    if (!selectedTeamId) return [];
    const p = await fetchProjects(selectedTeamId);
    setProjects(p);
    return p;
  }, [fetchProjects, selectedTeamId]);

  const refetchTokens = useCallback(async () => {
    if (!selectedProjectId) return [];
    const t = await fetchTokens(selectedProjectId);
    setTokens(t);
    return t;
  }, [fetchTokens, selectedProjectId]);

  const refetchComponents = useCallback(async () => {
    if (!selectedProjectId) return [];
    const c = await fetchComponents(selectedProjectId);
    setComponents(c);
    return c;
  }, [fetchComponents, selectedProjectId]);

  const resetAll = useCallback(() => {
    setTeams([]);
    setProjects([]);
    setTokens([]);
    setComponents([]);
    setAuditLogs([]);
    setSelectedTeamId(null);
    setSelectedProjectId(null);
  }, []);

  return {
    teams, projects, tokens, components, auditLogs,
    loading,
    selectedTeamId, selectedProjectId,
    setSelectedTeamId, setSelectedProjectId,
    refetchTeams, refetchProjects, refetchTokens, refetchComponents,
    resetAll,
  };
}
