# FerrumEngine

**Frontend Intelligence & Reliability Engine**

*Software Engineering Intelligence Infrastructure. Understand, analyze, and protect any frontend application.*

---

<p align="center">
  <img src="https://img.shields.io/badge/Framework-agnostic-6366f1?style=for-the-badge" alt="Framework Agnostic" />
  <img src="https://img.shields.io/badge/AI_Native-✓-22c55e?style=for-the-badge" alt="AI Native" />
  <img src="https://img.shields.io/badge/Analysis-7_Dimensions-f59e0b?style=for-the-badge" alt="7 Dimensions" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="MIT License" />
</p>

---

## What is FerrumEngine?

FerrumEngine is a **build-time analysis tool** that sits above your framework (React, Vue, Svelte, Angular) and provides:

- **Application Graph** — Constructs a complete dependency graph of your codebase with 22 node types and 18 edge types
- **Change Impact Analysis** — Predicts the blast radius of any code change before you deploy
- **Reliability Scoring** — Evidence-based A–F grades across 7 dimensions, with every deduction traceable to actual code
- **AI Agent Gateway** — Scope-based safety gate that validates AI-generated changes before they reach your codebase
- **Architecture Governance** — Detects circular dependencies, layer violations, coupling hotspots, and drift over time

### What FerrumEngine is NOT

- **NOT a CSS effects library** — That's [RoyCSS](https://github.com/roycss/roycss)'s domain. FerrumEngine does not generate or analyze CSS effects.
- **NOT an AI model** — FerrumEngine's core analysis is deterministic. AI agents are *consumers* of Ferrum's API, not dependencies. AI can provide explanations, remediation suggestions, and natural-language queries, but deterministic evidence is always the source of truth.
- **NOT a framework** — FerrumEngine doesn't render UI or manage state. It *analyzes* the tools that do.

---

## Quick Start

### Install

```bash
npm install -g @ferrum/cli
```

### Analyze Your Project

```bash
cd your-project
ferrum analyze
```

### Check Project Health

```bash
ferrum doctor
```

### Analyze Change Impact

```bash
# Analyze staged changes
ferrum impact --git-staged

# Analyze specific files
ferrum impact src/lib/auth.ts src/hooks/use-user.ts
```

### Verify AI-Generated Changes

```bash
ferrum verify --patch ai-changes.patch
```

### Programmatic Usage

```typescript
import { analyze, impact, AgentGateway } from '@ferrum/engine';

// Full analysis
const report = analyze('./my-project');
console.log(`Overall: ${report.scores.overall}/100 (${report.scores.grade})`);

// Change impact
const impactResult = impact('./my-project', ['src/lib/auth.ts']);
console.log(`Risk: ${impactResult.risk}`);
console.log(`Affected routes: ${impactResult.affectedRoutes.join(', ')}`);

// AI Agent Gateway
const gateway = new AgentGateway({ autoBlockThreshold: 'critical' });
const response = await gateway.handleRequest(agentRequest, report.graph);
console.log(`Allowed: ${response.allowed}`);
```

---

## Core Capabilities

### 1. Application Graph

FerrumEngine scans your project and constructs a living dependency graph.

| Feature | Description |
|---------|-------------|
| 22 node types | Files, components, pages, routes, hooks, stores, APIs, tests, etc. |
| 18 edge types | Imports, renders, calls, fetches, test-of, guards, etc. |
| 4 adjacency indexes | O(1) lookups by ID, path, kind, and adjacency |
| Incremental builds | Content hashing skips unchanged files (<1s for single-file changes) |
| Framework adapters | React, Vue, Svelte, Angular, Next.js, and more |

```bash
ferrum graph stats
ferrum graph dependents src/lib/utils.ts
ferrum graph path src/lib/auth.ts src/app/dashboard/page.tsx
ferrum graph cycles
```

### 2. Change Impact Analysis

Know exactly what breaks before you deploy.

| Feature | Description |
|---------|-------------|
| Transitive tracing | Follows the full dependency graph forward and backward |
| Risk classification | LOW / MEDIUM / HIGH / CRITICAL with evidence |
| Route impact | Which user-facing URLs are affected |
| Test impact | Which tests may need updates |
| Security flags | Detects changes to auth, CSRF, session code |
| Verification recs | Concrete steps to verify the change is safe |

```bash
ferrum impact --git-staged --format json
```

### 3. Reliability Scoring

Evidence-based A–F grades across 7 dimensions. Every deduction traceable.

| Dimension | Weight | What It Measures |
|-----------|--------|------------------|
| Architecture | 15% | Circular deps, coupling, layer violations, dead code |
| Performance | 15% | Bundle risks, render cycles, lazy loading |
| Security | 20% | Auth flows, XSS, secrets, dependency CVEs |
| Reliability | 15% | Error boundaries, loading states, retry logic |
| Testing | 15% | Test coverage, critical path coverage, test quality |
| Accessibility | 10% | ARIA labels, keyboard support, form labels |
| Dependencies | 10% | Outdated deps, duplicates, abandoned packages |

```
  FERRUM RELIABILITY REPORT
  ─────────────────────────────────

  Overall: 78/100 (B)

  architecture      ████████████████░░░░  72/100 (C)
  performance       █████████████████░░░  88/100 (B)
  security          ██████████████████░░  91/100 (A)
  reliability       ███████████████░░░░░  67/100 (C)
  testing           ██████████░░░░░░░░░░░  45/100 (D)
  accessibility     ████████████████████  97/100 (A)
  dependencies      ██████████████████░░  89/100 (B)
```

### 4. AI Agent Gateway

The safety layer between autonomous AI agents and production code.

| Feature | Description |
|---------|-------------|
| 6 permission scopes | read, analyze, test, suggest, modify, deploy |
| Scope validation | Agents can only do what they're authorized for |
| Risk assessment | Every change is impact-analyzed before approval |
| Content hash validation | Prevents stale/race-condition changes |
| Auto-blocking | Configurable risk threshold for automatic denial |
| Audit logging | Immutable record of every agent request |
| Verification loop | Agent writes → Ferrum analyzes → feedback → Agent fixes → PASS |

```typescript
const gateway = new AgentGateway({
  autoBlockThreshold: 'critical',
  maxFilesPerRequest: 20,
  requireHumanApproval: true,
});

const response = await gateway.handleRequest({
  requestId: 'req_001',
  agent: { id: 'claude-code', type: 'ai-assistant', scopes: ['read', 'analyze', 'modify'] },
  operation: 'apply_safe_change',
  params: { changes: [...] },
  timestamp: Date.now(),
}, graph);

console.log(response.allowed);  // true | false
console.log(response.risk);     // 'low' | 'medium' | 'high' | 'critical'
console.log(response.findings); // Finding[] with evidence
```

### 5. Architecture Intelligence

Automated architectural analysis and governance.

| Feature | Description |
|---------|-------------|
| Circular dependency detection | DFS-based cycle detection across the full graph |
| Coupling analysis | Identify modules with excessive dependents |
| Layer violation detection | Enforce architectural boundaries (components → lib, not components → pages) |
| Dead code detection | Find exported symbols with no importers |
| Oversized module detection | Flag files exceeding configurable line limits |
| Duplicated abstraction detection | Find similarly-named modules across directories |
| Architecture drift (planned) | Track how structure changes over time |

---

## Framework Support

<p align="center">
  <img src="https://img.shields.io/badge/React-✓-61dafb?style=flat-square" alt="React" />
  <img src="https://img.shields.io/badge/Next.js-✓-000000?style=flat-square" alt="Next.js" />
  <img src="https://img.shields.io/badge/Vue-✓-4fc08d?style=flat-square" alt="Vue" />
  <img src="https://img.shields.io/badge/Nuxt-✓-00dc82?style=flat-square" alt="Nuxt" />
  <img src="https://img.shields.io/badge/Svelte-✓-ff3e00?style=flat-square" alt="Svelte" />
  <img src="https://img.shields.io/badge/SvelteKit-✓-ff3e00?style=flat-square" alt="SvelteKit" />
  <img src="https://img.shields.io/badge/Angular-✓-dd0031?style=flat-square" alt="Angular" />
  <img src="https://img.shields.io/badge/Astro-✓-ff5d01?style=flat-square" alt="Astro" />
  <img src="https://img.shields.io/badge/Solid-✓-4f88c6?style=flat-square" alt="Solid" />
  <img src="https://img.shields.io/badge/Lit-✓-324fff?style=flat-square" alt="Lit" />
  <img src="https://img.shields.io/badge/Vanilla_JS-✓-f7df1e?style=flat-square" alt="Vanilla JS" />
</p>

FerrumEngine works with **any** JavaScript/TypeScript project. Framework adapters translate framework-specific patterns into the universal graph model.

---

## CLI Commands

| Command | Description |
|---------|-------------|
| `ferrum analyze` | Full project analysis with reliability scores |
| `ferrum doctor` | Quick health check with actionable recommendations |
| `ferrum impact <files>` | Change impact analysis for specified files |
| `ferrum verify <patch>` | Verify proposed changes (AI-generated or human) |
| `ferrum history` | Track scores over time and detect drift |
| `ferrum graph <query>` | Inspect and query the application graph |

### Output Formats

All commands support `--format text` (default), `--format json`, and `--format sarif`.

---

## Configuration

Create a `ferrum.config.ts` in your project root:

```typescript
import { defineConfig } from '@ferrum/engine';

export default defineConfig({
  name: 'my-app',
  srcDirs: ['src', 'app', 'lib', 'components'],
  exclude: ['generated/**', 'node_modules/**'],
  framework: 'nextjs',  // Auto-detected if omitted

  scoringWeights: {
    security: 0.25,
    testing: 0.20,
  },

  policies: [
    { category: 'security', minScore: 80, action: 'block' },
    { category: 'architecture', minScore: 60, action: 'warn' },
  ],

  plugins: [
    { name: '@ferrum/plugin-react', enabled: true },
    { name: '@ferrum/plugin-nextjs', enabled: true },
  ],
});
```

---

## CI/CD Integration

```yaml
# .github/workflows/ferrum.yml
name: Ferrum Quality Gate
on: [pull_request]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - run: npm install -g @ferrum/cli

      - name: Full analysis
        run: ferrum analyze --format json --output report.json

      - name: Impact check
        run: |
          CHANGED=$(git diff --name-only origin/main...HEAD | grep -E '\.(ts|tsx|js|jsx)$')
          if [ -n "$CHANGED" ]; then
            ferrum impact $CHANGED --severity high
          fi

      - name: Upload SARIF
        if: always()
        uses: github/codeql-action/upload-sarif@v3
        with:
          sarif_file: ferrum.sarif
```

---

## Performance

| Metric | Target |
|--------|--------|
| Full analysis (10K files) | < 5 seconds |
| Incremental (1 file) | < 1 second |
| Graph query (transitive deps) | < 50ms |
| Impact analysis (5 files) | < 200ms |
| Memory (10K files) | < 500MB |

FerrumEngine achieves these targets through content hashing (skip unchanged files),
Map-based adjacency indexes (O(1) lookups), and zero-dependency regex parsing.

---

## Comparison with Other Tools

| Feature | FerrumEngine | Lighthouse | ESLint | SonarQube |
|---------|-------------|-----------|--------|-----------|
| Analysis type | Static (code-level) | Runtime (browser) | Static (syntax) | Static (multi-lang) |
| Scope | Entire application | Single page | Single file | Entire project |
| Framework support | Any JS/TS | Any web | Configurable | Multi-language |
| Change impact | ✅ | ❌ | ❌ | Limited |
| AI agent gateway | ✅ | ❌ | ❌ | ❌ |
| Evidence-based scores | ✅ | Partial | ❌ | ✅ |
| Dependency graph | ✅ | ❌ | Limited | ✅ |
| Speed (10K files) | < 5s | N/A | 10–30s | 30–120s |

---

## FerrumEngine vs. RoyCSS

| Aspect | FerrumEngine | RoyCSS |
|--------|-------------|--------|
| Domain | Software intelligence | CSS effects & animations |
| Output | Analysis reports & scores | CSS classes & utilities |
| Runtime | Build time / CI | Browser |
| Consumers | Developers + AI agents | Frontend developers |

FerrumEngine and RoyCSS are separate, complementary products with zero overlap.

---

## Architecture

```
     Developer / AI Agent
              │
              ▼
     ┌─────────────────────┐
     │   Ferrum CLI / SDK   │
     └──────────┬──────────┘
                │
     ┌──────────▼──────────┐
     │    FERRUM ENGINE     │
     │ ┌──────┬──────┬─────┐ │
     │ │Graph │Anal. │Score│ │
     │ │Build │Eng.  │Eng. │ │
     │ │      │      │     │ │
     │ │Impact│Agent │Journ│ │
     │ │Eng.  │Gate  │Eng. │ │
     │ └──────┴──────┴─────┘ │
     └──────────┬──────────┘
                │
     ┌──────────▼──────────┐
     │  Application Graph   │
     │  (Framework Adapters) │
     └──────────┬──────────┘
                │
     ┌──────────▼──────────┐
     │   Your Source Code   │
     └─────────────────────┘
```

---

## License

MIT

---

*FerrumEngine — Software Engineering Intelligence Infrastructure*
