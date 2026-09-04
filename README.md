<h1 align="center">FerrumEngine</h1>

<p align="center"><strong>Engineering Intelligence Platform</strong></p>

<p align="center">
  A living understanding of software systems -- analyzing changes, detecting risks,<br>
  verifying AI-generated code, and continuously improving software quality.
</p>

<p align="center">
  <a href="https://github.com/Roy-Wanyoike/FerrumEngine/actions/workflows/ci.yml">
    <img alt="CI" src="https://img.shields.io/badge/CI-passing-22c55e?style=flat-square&label=build" />
  </a>
  <a href="https://github.com/Roy-Wanyoike/FerrumEngine">
    <img alt="Tests" src="https://img.shields.io/badge/tests-494%2B%20passing-22c55e?style=flat-square" />
  </a>
  <a href="./LICENSE">
    <img alt="License" src="https://img.shields.io/badge/license-MIT-yellow?style=flat-square" />
  </a>
  <a href="./package.json">
    <img alt="Version" src="https://img.shields.io/badge/version-0.2.0-6e7681?style=flat-square" />
  </a>
  <a href="https://www.typescriptlang.org">
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-strict-blue?style=flat-square" />
  </a>
  <a href="./src/engine/analyzer">
    <img alt="Analyzers" src="https://img.shields.io/badge/analyzers-17-e67e22?style=flat-square" />
  </a>
  <a href="./src/engine/cli">
    <img alt="CLI Commands" src="https://img.shields.io/badge/CLI-17%20commands-8b5cf6?style=flat-square" />
  </a>
  <a href="./src/adapters">
    <img alt="Framework Adapters" src="https://img.shields.io/badge/adapters-8-16a085?style=flat-square" />
  </a>
</p>

---

> **AI can write software. Ferrum makes sure it works.**

---

## What FerrumEngine Is

FerrumEngine is an **engineering intelligence platform** that builds a living understanding of software systems and uses that understanding to analyze changes, detect architectural and reliability risks, verify AI-generated code, understand application behavior, and continuously improve software quality.

FerrumEngine is the **engineering layer between software creation and software confidence**.

It operates above your framework -- not beside it, not beneath it. It constructs a persistent, machine-readable model of your entire application and turns that model into deterministic, evidence-backed intelligence: reliability scores, change impact reports, architecture drift detection, and safe AI agent boundaries.

## What FerrumEngine Is NOT

- **NOT a CSS framework** -- FerrumEngine does not generate, compile, or analyze CSS stylesheets.
- **NOT a UI library** -- FerrumEngine does not render components or manage UI state.
- **NOT a design system** -- FerrumEngine does not enforce visual design tokens or component APIs.
- **NOT an animation library** -- FerrumEngine does not produce motion, transitions, or visual effects.
- **NOT an AI website builder** -- FerrumEngine verifies AI output; it does not generate it.
- **NOT an AI model** -- FerrumEngine's core analysis is deterministic. AI agents are consumers of Ferrum's API, not dependencies. Deterministic evidence is always the source of truth.

---

## Core Architecture

```
                    HUMAN / AI AGENTS
                           |
                           v
                  +-------------------+
                  |   Ferrum Gateway  |
                  | Permissions       |
                  | Policies          |
                  | Sandboxing        |
                  | Audit             |
                  +---------+---------+
                            |
                            v
                  +-------------------+
                  |   Ferrum Core     |
                  | Application IR    |
                  | Application Graph |
                  | Knowledge Model   |
                  +---------+---------+
                            |
          +-----------------+-----------------+
          v                 v                 v
   Architecture       Reliability       Security
   Intelligence       Intelligence      Intelligence
          |                 |                 |
          +-----------------+-----------------+
          v                 v                 v
     Performance       Testing          Dependency
     Intelligence      Intelligence     Intelligence
          |                 |                 |
          +-----------------+-----------------+
                            v
                   Change Impact Engine
                            |
                            v
                  Autonomous Verification
                            |
                            v
                  CI/CD + Developer Tools
```

---

## Primary Components

### 1. Application Graph

The persistent, machine-readable model of the full software system.

| Property | Value |
|---|---|
| Node kinds | 30 (files, components, pages, routes, hooks, stores, APIs, tests, providers, middleware, etc.) |
| Edge types | 18+ (imports, renders, calls, fetches, test-of, guards, provides, subscribes, etc.) |
| Adjacency indexes | 4 indexes for O(1) lookups by ID, path, kind, and adjacency |
| Incremental builds | Content hashing skips unchanged files; single-file change resolves in <1s |
| Cycle detection | DFS-based cycle detection across the full dependency graph |
| Topological sort | Deterministic ordering for analysis pipeline execution |
| Transitive closure | Full reachability computation for impact tracing |
| Serialization | JSON export/import for caching, diffing, and cross-process communication |

```bash
ferrum graph stats
ferrum graph dependents src/lib/auth.ts
ferrum graph path src/lib/auth.ts src/app/dashboard/page.tsx
ferrum graph cycles
ferrum graph export --format json
```

### 2. Application IR

A language-independent intermediate representation of the application. The IR decouples analysis from source language syntax, enabling FerrumEngine to analyze TypeScript, JavaScript, and future language frontends through a uniform representation. The IR preserves structural semantics (declarations, references, control flow hints, ownership) while discarding cosmetic detail.

### 3. Change Impact Engine

Traces changed files through the full dependency graph to compute blast radius.

| Capability | Detail |
|---|---|
| Transitive tracing | Follows the graph forward and backward from change points |
| Risk classification | LOW / MEDIUM / HIGH / CRITICAL with evidence chains |
| Route impact | Identifies which user-facing URLs are affected |
| Test impact | Identifies which test files may need updates |
| Security flags | Detects changes to auth, CSRF, session, and permission code |
| Verification recommendations | Concrete steps to verify the change is safe |

```bash
ferrum impact --git-staged
ferrum impact src/lib/auth.ts src/hooks/use-user.ts --format json
```

### 4. 17 Intelligence Engines (Analyzers)

Every analyzer returns `Finding[]` where each finding carries `severity`, `evidence` (file path + line), `suggestion`, and `classification` (Measured / Detected / Estimated / Predicted / AI-suggested).

| Analyzer | What It Detects |
|---|---|
| Architecture | Circular dependencies, layer violations, coupling, dead code |
| Performance | Large bundles, missing dynamic imports, oversized components |
| Security | Dangerous patterns, hardcoded secrets, missing CSRF, non-HTTPS calls |
| Reliability | Missing error boundaries, unhandled promises, bare fetches |
| Testing | Untested modules, coverage gaps, test anti-patterns |
| Accessibility | Missing alt text, form labels, ARIA roles, keyboard navigation |
| Dependencies | Outdated, unused, duplicate, heavy, non-semver packages |
| Complexity | Cyclomatic complexity, cognitive complexity, nesting depth |
| Maintainability | God modules, long files, tight coupling, shallow exports |
| Data Flow | State mutation paths, prop drilling, context dependency chains |
| API Contracts | Endpoint consistency, type safety, error schema coverage |
| Configuration | Environment variable usage, config drift, secret exposure |
| Infrastructure | Docker, CI/CD, deployment risk, build configuration |
| Observability | Logging coverage, tracing gaps, metric instrumentation |
| Compliance | License compliance, data handling, regulatory flags |
| Ownership | Code ownership, review coverage, orphan modules |
| Deployment Risk | Rollback safety, canary coverage, migration risk |

### 5. Autonomous Verification

Verification outcomes are tri-state: **PASS**, **WARN**, or **BLOCK**.

- **PASS** -- All analyzers report below threshold. Change is safe to proceed.
- **WARN** -- One or more findings exceed the warning threshold but not the block threshold. Change proceeds with advisory.
- **BLOCK** -- One or more findings exceed the block threshold. Change must not proceed without explicit override.

Verification integrates with CI/CD pipelines, pre-commit hooks, and the AI Agent Gateway to enforce quality gates automatically.

```bash
ferrum verify --patch ai-changes.patch --threshold warn
ferrum verify --agent copilot --operation apply_safe_change
```

### 6. Agent Gateway

The safety layer between autonomous AI agents and production code.

| Feature | Detail |
|---|---|
| Permission scopes | read, analyze, test, suggest, modify, deploy |
| Scope validation | Agents can only perform operations within their authorized scopes |
| Risk assessment | Every proposed change is impact-analyzed before approval |
| Content hash validation | Prevents stale and race-condition changes |
| Auto-blocking | Configurable risk threshold for automatic denial |
| Audit logging | Immutable record of every agent request and outcome |
| Sandboxing | Isolated execution context for untrusted agent operations |
| Verification loop | Agent writes -> Ferrum analyzes -> feedback -> Agent fixes -> PASS |

```typescript
const gateway = new AgentGateway({
  autoBlockThreshold: 'critical',
  maxFilesPerRequest: 20,
  requireApprovalFor: ['modify', 'deploy'],
});

const response = await gateway.handleRequest({
  agent: { id: 'copilot', type: 'ai-assistant', scopes: ['read', 'analyze', 'modify'] },
  operation: 'apply_safe_change',
  params: { changes: [...] },
}, graph);

// response.allowed: boolean
// response.verification: 'PASS' | 'WARN' | 'BLOCK'
// response.findings: Finding[]
```

### 7. User Journey Intelligence

Maps user journeys through the application graph from entry point to destination.

| Capability | Detail |
|---|---|
| Journey mapping | Trace paths from route A to route B through the graph |
| Dead-end detection | Identify pages with no outgoing navigation |
| Unreachable detection | Identify pages not reachable from any entry point |
| Critical path scoring | Weight journeys by business importance and reliability |

```typescript
const journey = mapJourney(graph, '/checkout', '/confirmation');
const deadEnds = detectDeadEnds(graph);
```

### 8. Flight Recorder

Runtime observability and root cause analysis for production incidents.

| Feature | Detail |
|---|---|
| Session lifecycle | Start, record events, end sessions with full timeline |
| Event recording | Navigation, error, render, network, and custom events |
| Root cause analysis | 6 root cause types: network-failure, render-error, state-corruption, timeout, auth-failure, resource-exhaustion |
| Render timeline | Ordered sequence of component renders with timing |
| Session replay | Reconstruct the event sequence for post-incident analysis |

```typescript
const session = startSession({ userId: 'abc', route: '/dashboard' });
recordEvent(session.id, { type: 'error', error: new Error('fetch failed') });
const analysis = analyzeSession(endSession(session.id));
// analysis.rootCause: 'network-failure'
```

### 9. Architecture Drift

Baseline capture and structural drift detection over time.

| Feature | Detail |
|---|---|
| Baseline capture | Snapshot the current graph structure as a reference |
| Structural drift | Compare current graph against baseline for added/removed nodes and edges |
| Rule-based drift | Detect layer violations, new circular dependencies, coupling increases |
| Drift scoring | 0--100 score where 0 = identical to baseline, 100 = fully drifted |
| History tracking | Time-series of drift measurements for trend analysis |

```bash
ferrum history --baseline ./baseline.json
ferrum drift capture --output baseline.json
```

### 10. Time Machine (Software Time Machine)

Navigate the application's structural history across commits and time ranges.

| Capability | Detail |
|---|---|
| Commit navigation | Reconstruct the graph at any historical commit |
| Time-range analysis | Compare structural metrics across a date range |
| Diff computation | Compute added, removed, and modified structural elements between any two points |
| Trend visualization | Plot architecture, reliability, and complexity metrics over time |

```bash
ferrum history --from 2024-01-01 --to 2024-06-01
ferrum history --commit abc123
```

### 11. Reliability Score

Evidence-based A--F grades across multiple dimensions. Every deduction is traceable to specific code.

| Dimension | Weight | What It Measures |
|---|---|---|
| Architecture | 1.0x | Circular deps, coupling, layer violations, dead code |
| Performance | 1.0x | Bundle risks, render cycles, lazy loading |
| Security | 1.5x | Auth flows, XSS, secrets, dependency CVEs |
| Reliability | 1.2x | Error boundaries, loading states, retry logic |
| Testing | 0.8x | Test coverage, critical path coverage, test quality |
| Accessibility | 1.0x | ARIA labels, keyboard support, form labels |
| Dependencies | 0.7x | Outdated deps, duplicates, abandoned packages |

Grade scale: A (90--100), B (80--89), C (70--79), D (60--69), F (0--59).

### 12. Ferrum Doctor

Human-readable health check for the entire codebase. Produces a structured report with overall grade, per-dimension scores with visual bars, top findings ranked by severity, and actionable remediation steps.

```bash
ferrum doctor ./my-app
```

```
  FERRUM RELIABILITY REPORT
  -------------------------

  Overall: 78/100 (B)

  architecture      [################....]  72/100 (C)
  performance       [##################..]  88/100 (B)
  security          [###################.]  91/100 (A)
  reliability       [##############......]  67/100 (C)
  testing           [##########..........]  45/100 (D)
  accessibility     [####################]  97/100 (A)
  dependencies      [##################..]  89/100 (B)
```

---

## Quick Start

```bash
# Install
npm install ferrum-engine

# Run a full analysis across all 17 intelligence engines
npx ferrum analyze ./my-app

# Human-readable health check
npx ferrum doctor ./my-app

# Assess change impact before merging
npx ferrum impact ./my-app --file src/lib/auth.ts --file src/middleware.ts

# Verify AI agent operations against safety policy
npx ferrum verify ./my-app --agent copilot --operation apply_safe_change

# Output graph statistics
npx ferrum graph ./my-app --stats

# View architecture drift history
npx ferrum history ./my-app

# Check reliability score
npx ferrum score ./my-app
```

**Exit codes:** `0` clean, `1` findings present, `2` error.

**CI/CD integration:**

```bash
# JSON output for GitHub Actions, GitLab CI, or SARIF consumers
npx ferrum analyze ./my-app --json

# Fail the pipeline on HIGH or CRITICAL findings
npx ferrum analyze ./my-app --threshold high
```

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
      - run: npm install -g ferrum-engine

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

## CLI Commands

| Command | Purpose | Key Flags |
|---|---|---|
| `ferrum analyze <path>` | Full multi-engine analysis | `--json`, `--threshold <level>`, `--config <file>` |
| `ferrum doctor <path>` | Human-readable health check | `--config <file>` |
| `ferrum impact <path>` | Change impact assessment | `--file <path>` (repeatable), `--git-staged`, `--json` |
| `ferrum verify <path>` | AI agent safety verification | `--agent <id>`, `--operation <op>`, `--threshold <level>`, `--json` |
| `ferrum graph <path>` | Graph statistics and export | `--stats`, `--export <format>`, `--json` |
| `ferrum score <path>` | Reliability score report | `--dimensions`, `--json` |
| `ferrum history <path>` | Architecture drift history | `--baseline <file>`, `--from <date>`, `--to <date>`, `--json` |
| `ferrum drift <path>` | Drift detection and capture | `--capture`, `--baseline <file>`, `--json` |
| `ferrum journey <path>` | User journey analysis | `--from <route>`, `--to <route>`, `--dead-ends`, `--json` |
| `ferrum flight <path>` | Flight recorder session analysis | `--session <id>`, `--root-cause`, `--json` |
| `ferrum gateway <path>` | Agent gateway operations | `--scopes <list>`, `--audit`, `--json` |
| `ferrum baseline <path>` | Baseline capture for drift | `--output <file>`, `--json` |
| `ferrum config <path>` | Configuration validation | `--show`, `--validate` |
| `ferrum plugins <path>` | Plugin system management | `--list`, `--install <name>`, `--enable <name>` |
| `ferrum adapt <path>` | Framework adapter operations | `--detect`, `--list` |
| `ferrum export <path>` | Export analysis results | `--format sarif`, `--format json`, `--output <file>` |
| `ferrum init` | Initialize FerrumEngine configuration | `--framework <name>`, `--interactive` |

All commands support `--format text` (default), `--format json`, and `--format sarif`.

---

## Evidence Classification

Every finding produced by FerrumEngine carries an evidence classification indicating how the finding was determined:

| Classification | Meaning | Example |
|---|---|---|
| **Measured** | Directly observed from the codebase. No inference required. | File size in bytes, number of exports, cyclomatic complexity |
| **Detected** | Pattern-matched from structural analysis. Deterministic. | Circular import, missing error boundary, hardcoded secret |
| **Estimated** | Computed from measured data using a defined formula. | Bundle size impact, test coverage gap percentage, drift score |
| **Predicted** | Extrapolated from historical trend data. | Likelihood of future layer violation, projected debt growth |
| **AI-suggested** | Generated by an AI intelligence layer. Always marked as non-deterministic. | Remediation suggestion, natural-language explanation, risk narrative |

Deterministic evidence (Measured, Detected, Estimated) is always preferred. Predicted and AI-suggested findings are explicitly labeled and never trigger automatic BLOCK decisions without human or policy override.

---

## Architecture Principles

### Deterministic Core

FerrumEngine's core analysis is fully deterministic. Given the same source code and configuration, it produces identical results on every run. No randomness, no model inference, no non-deterministic ordering. This is a hard constraint: deterministic evidence is the foundation of trust.

### AI as Intelligence Layer

AI is an intelligence layer on top of the deterministic core, not a replacement for it. AI agents consume Ferrum's API for context and submit proposed changes through the Agent Gateway for verification. AI-suggested findings are always classified separately and never override deterministic findings.

### Incremental Everything

Every computation in FerrumEngine is incremental. The Application Graph uses content hashing to skip unchanged files. Analysis only re-runs on affected subgraphs. Scoring only recomputes dimensions with changed findings. Impact tracing only traverses from change points. Single-file changes resolve in under 1 second.

### Privacy First

FerrumEngine runs locally. No source code is transmitted to any external service. AI-suggested classifications require explicit opt-in. Audit logs are stored locally. The Agent Gateway enforces scope boundaries that prevent unauthorized data access.

---

## Product Separation

FerrumEngine is part of a three-product system with clear, non-overlapping boundaries:

| Product | Domain | Responsibility |
|---|---|---|
| **FerrumEngine** | Engineer | Analyze, score, protect -- engineering intelligence infrastructure |
| **RoyCSS** | Create | Visual effects, animations, CSS tooling -- creation layer |
| **Ferrum Cloud** | Operate | Host, deploy, monitor -- runtime operations platform |

**FerrumEngine** is the engineering layer. **RoyCSS** is the creation layer. **Ferrum Cloud** is the operations layer. These products are separate, complementary, and have zero functional overlap.

---

## Framework Adapters

FerrumEngine works with any JavaScript/TypeScript project. Framework adapters translate framework-specific patterns into the universal Application Graph model.

| Framework | Route Detection | Component Inference | Layer Rules |
|---|---|---|---|
| React | JSX/TSX component scanning | Hook + context inference | Yes |
| Next.js (App + Pages) | `page.tsx`, `layout.tsx`, `route.ts`, middleware | Server/client boundary | Yes |
| Vue | `.vue` SFC parsing | Composable + provide/inject | Yes |
| Svelte / SvelteKit | `+page`, `+layout`, `+server` | Store + action inference | Yes |
| Angular | `.component`, `.service`, `.module` | DI + decorator inference | Yes |
| Lit | Web component scanning | Reactive property inference | Yes |
| Vanilla JS | Script scanning | Module + IIFE detection | Yes |
| Astro | `.astro` page scanning | Island architecture inference | Yes |

---

## Programmatic API

```typescript
import {
  analyze,
  doctor,
  impact,
  scoreToGrade,
  buildGraph,
  calculateScores,
  AgentGateway,
  mapJourney,
  detectDeadEnds,
  captureBaseline,
  compareWithBaseline,
  startSession,
  recordEvent,
  endSession,
  analyzeSession,
} from 'ferrum-engine';

// Full analysis across all 17 engines
const report = analyze('./my-app');
console.log(report.scores.architecture);  // 92
console.log(scoreToGrade(92));            // 'A'

// Change impact
const result = impact('./my-app', ['src/lib/auth.ts', 'src/middleware.ts']);
console.log(result.riskLevel);           // 'CRITICAL'
console.log(result.affectedAreas);       // [{ area: 'authentication', ... }]

// AI Agent Gateway
const gateway = new AgentGateway({ autoBlockThreshold: 'critical' });
const response = await gateway.handleRequest(agentRequest, graph);
console.log(response.allowed);           // true
console.log(response.verification);      // 'PASS'

// Architecture drift
const baseline = captureBaseline(graph);
const drift = compareWithBaseline(baseline, graph);
console.log(drift.driftScore);           // 23

// Flight recorder
const session = startSession({ userId: 'abc', route: '/dashboard' });
recordEvent(session.id, { type: 'error', error: new Error('fetch failed') });
const analysis = analyzeSession(endSession(session.id));
console.log(analysis.rootCause);         // 'network-failure'
```

---

## Long-Term Vision

FerrumEngine evolves through six stages of increasing scope:

1. **CLI** -- Local engineering intelligence. Analyze, score, protect on the command line.
2. **Developer Platform** -- IDE integrations, real-time feedback, interactive exploration.
3. **Engineering Intelligence Platform** -- Team-level insights, cross-repository analysis, organizational patterns.
4. **AI Agent Verification Layer** -- The standard safety layer for all autonomous coding agents.
5. **Software Knowledge Graph** -- A living, cross-organization graph of software structure, behavior, and quality.
6. **Infrastructure Control Plane** -- Autonomous infrastructure management driven by engineering intelligence.

The current release (v0.2.0) implements stages 1 through 3 with partial support for stage 4.

---

## Testing

| Metric | Count |
|---|---|
| Passing engine tests | 494+ |
| Test files | 31 |
| E2E test suites | 4 (Playwright) |
| Intelligence engines | 17 |
| CLI commands | 17 |
| Framework adapters | 8 |
| Node kinds in Application Graph | 30 |

```bash
# Run all tests
npm test

# Engine tests only
npx vitest run __tests__/engine/

# Integration test (all analyzers + scoring)
npx vitest run __tests__/engine/integration.test.ts

# End-to-end
npx playwright test
```

---

## Configuration

Create a `ferrum.config.ts` in your project root:

```typescript
import { defineConfig } from 'ferrum-engine';

export default defineConfig({
  name: 'my-app',
  srcDirs: ['src', 'app', 'lib', 'components'],
  exclude: ['generated/**', 'node_modules/**'],
  framework: 'nextjs',

  scoringWeights: {
    security: 1.5,
    testing: 0.8,
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

## Documentation

- [Architecture Overview](docs/architecture/overview.md)
- [Application Graph Deep Dive](docs/architecture/application-graph.md)
- [Change Impact Analysis](docs/architecture/change-impact.md)
- [AI Agent Gateway](docs/architecture/agent-gateway.md)
- [Reliability Scoring](docs/architecture/reliability-scoring.md)
- [Plugin Architecture RFC](docs/rfc/002-plugin-architecture.md)

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development setup, conventions, and the PR process.

---

## License

[MIT](./LICENSE) -- FerrumEngine Contributors

---

**Create with anything. Verify with Ferrum.**
