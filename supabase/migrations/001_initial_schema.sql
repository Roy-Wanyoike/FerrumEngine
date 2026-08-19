-- ═══════════════════════════════════════════════════════════════
-- FerrumEngine — Initial Supabase Schema
-- ═══════════════════════════════════════════════════════════════
-- Run this migration in the Supabase SQL editor or via CLI.
-- All timestamps use TIMESTAMPTZ (UTC).
-- RLS is enabled; only the service_role has full access.
-- ═══════════════════════════════════════════════════════════════

-- Teams
CREATE TABLE teams (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL CHECK (char_length(name) >= 2 AND char_length(name) <= 50),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Projects
CREATE TABLE projects (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  environment TEXT NOT NULL DEFAULT 'development' CHECK (environment IN ('development', 'staging', 'production')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Components
CREATE TABLE components (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  css_classes TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived', 'draft')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- API Tokens
CREATE TABLE tokens (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  name TEXT NOT NULL CHECK (char_length(name) <= 100),
  value TEXT NOT NULL CHECK (char_length(value) <= 1024),
  namespace TEXT DEFAULT 'default' CHECK (char_length(COALESCE(namespace, '')) <= 100),
  last_used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Audit Log
CREATE TABLE audit_log (
  id BIGSERIAL PRIMARY KEY,
  team_id TEXT REFERENCES teams(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id TEXT,
  details JSONB DEFAULT '{}',
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ── Row Level Security ───────────────────────────────────────

ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE components ENABLE ROW LEVEL SECURITY;
ALTER TABLE tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Service role bypasses RLS; anon gets nothing by default
CREATE POLICY "Service role full access on teams" ON teams FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access on projects" ON projects FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access on components" ON components FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access on tokens" ON tokens FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access on audit_log" ON audit_log FOR ALL USING (auth.role() = 'service_role');

-- ── Indexes ──────────────────────────────────────────────────

CREATE INDEX idx_projects_team ON projects(team_id);
CREATE INDEX idx_components_project ON components(project_id);
CREATE INDEX idx_tokens_team ON tokens(team_id);
CREATE INDEX idx_audit_team ON audit_log(team_id);
CREATE INDEX idx_audit_created ON audit_log(created_at DESC);
