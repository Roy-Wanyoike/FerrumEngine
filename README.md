<h1 align="center">FerrumEngine</h1>

<p align="center"><strong>Frontend Intelligence &amp; Reliability Engine</strong></p>

<p align="center">
  Software engineering intelligence infrastructure for understanding,<br>
  analyzing, and protecting any frontend application.
</p>

<p align="center">
  <a href="https://github.com/Roy-Wanyoike/FerrumEngine/actions/workflows/ci.yml">
    <img alt="CI" src="https://img.shields.io/badge/CI-passing-22c55e?style=flat-square&label=build" />
  </a>
  <a href="https://github.com/Roy-Wanyoike/FerrumEngine">
    <img alt="Tests" src="https://img.shields.io/badge/tests-245%2B%20passing-22c55e?style=flat-square" />
  </a>
  <a href="./LICENSE">
    <img alt="License" src="https://img.shields.io/badge/license-MIT-yellow?style=flat-square" />
  </a>
  <a href="./package.json">
    <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-6e7681?style=flat-square" />
  </a>
  <a href="https://www.typescriptlang.org">
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-strict-blue?style=flat-square" />
  </a>
  <a href="./src/engine">
    <img alt="Engine Modules" src="https://img.shields.io/badge/engine-26%20modules-8b5cf6?style=flat-square" />
  </a>
  <a href="./src/engine/analyzer">
    <img alt="Analyzers" src="https://img.shields.io/badge/analyzers-7-e67e22?style=flat-square" />
  </a>
  <a href="./src/adapters">
    <img alt="Framework Adapters" src="https://img.shields.io/badge/adapters-6-16a085?style=flat-square" />
  </a>
</p>

---

> FerrumEngine sits **above your framework** -- not beside it, not beneath it.
> It builds a machine-readable model of your entire frontend system and turns
> that model into actionable intelligence: reliability scores, change impact
> reports, architecture drift detection, and safe AI agent boundaries.

---

## Why FerrumEngine?

Frontend teams operate with dangerously incomplete visibility into their own systems.

- **Refactoring is blind.** You change a utility function and have no idea which routes, API calls, or user journeys silently break until production reports it.
- **Architecture rots invisibly.** Layer violations, circular dependencies, and dead code accumulate because nothing measures structural drift against a baseline.
- **AI agents are unbounded.** Copilot and Cursor modify code without understanding impact boundaries. A single "safe" edit can cascade through auth middleware and API routes.
- **Reliability is anecdotal.** Teams debate whether the codebase is "healthy" with no shared, evidence-based scoring system. Lighthouse measures runtime; nothing measures structural integrity.

FerrumEngine solves all four by constructing a persistent **Application Graph** and running deterministic analysis over it -- every finding traceable to specific code, every score backed by evidence.

---

## Features at a Glance

| Capability | What It Does | Key Metric |
|---|---|---|
| **Application Graph** | Persistent machine-readable model of the full frontend system | 22 node types, 18 edge types |
| **7 Analyzers** | Architecture, Performance, Security, Reliability, Testing, Accessibility, Dependencies | Each produces evidence-backed findings |
| **Reliability Scoring** | 7-dimension scoring with A--F grades | Every deduction traceable to code |
| **Change Impact Engine** | Trace changed files through the dependency graph | LOW / MEDIUM / HIGH / CRITICAL risk |
| **AI Agent Gateway** | Structured API with scope-based permissions and audit logging | 7 operations, 6 scope levels |
| **Flight Recorder** | Runtime observability and root cause analysis | 6 root cause types, render timeline |
| **Journey Engine** | Map user journeys through the graph | Dead-end and unreachable-page detection |
| **Architecture Drift** | Baseline capture, structural + rule-based drift detection | 0--100 drift score |
| **Codebase Intelligence** | Purpose inference, domain classification, complexity estimation | 20+ domains, co-change analysis |
| **Plugin System** | 7-phase pipeline with custom analyzers and framework adapters | 6 built-in adapters |
| **AST Parser** | @babel/parser-based structural analysis | Hooks, stores, middleware, routes, providers |

---

## Architecture

```
+-------------------------------------------------------------------+
|                        CLI  (ferrum)                               |
|   analyze | doctor | impact | verify | graph | history             |
+-------------------------------------------------------------------+
                              |
+-------------------------------------------------------------------+
|                     Plugin Runtime                                 |
|   7-phase pipeline  |  config loader  |  custom analyzers          |
+-------------------------------------------------------------------+
                              |
+-------------------------------------------------------------------+
|                   High-Level API                                   |
|   analyze()  |  doctor()  |  impact()  |  AgentGateway            |
+-------------------------------------------------------------------+
                              |
+-------+-----------+-----------+-----------+---------+-------+------+
|       |           |           |           |         |       |      |
|  v    |  v        |  v        |  v        |  v      |  v    |  v   |
+------+----------+----------+----------+--------+-------+---------+
| Arch | Perf     | Security | Reliab.  | Testing| A11y  | Deps    |
|      |          |          |          |        |       |         |
|  7 Analyzers  -- each produces Finding[] with severity + evidence |
+------+----------+----------+----------+--------+-------+---------+
                              |
+-------------------------------------------------------------------+
|            Scoring Engine  |  Impact Engine  |  Intelligence       |
|   7 dimensions  |  A--F grades  |  risk classification            |
+-------------------------------------------------------------------+
                              |
+-------------------------------------------------------------------+
|             Journey  |  Drift  |  Flight Recorder                 |
|   dead-end detection | drift scoring | session lifecycle           |
+-------------------------------------------------------------------+
                              |
+-------------------------------------------------------------------+
|                   Application Graph (Core)                         |
|   22 node types  |  18 edge types  |  cycle detection             |
|   topological sort  |  transitive deps  |  serialization          |
+-------------------------------------------------------------------+
                              |
+-------------------------------------------------------------------+
|                   AST Parser  |  Framework Adapters                |
|   @babel/parser  |  React, Next.js, Vue, Svelte, Angular, Lit     |
+-------------------------------------------------------------------+
```

---

## Quick Start

```bash
# Install
npm install ferrum-engine

# Run a full analysis across all 7 dimensions
npx ferrum analyze ./my-app

# Human-readable health check (like "doctor" for your codebase)
npx ferrum doctor ./my-app

# Assess change impact before merging
npx ferrum impact ./my-app --file src/lib/auth.ts --file src/middleware.ts

# Verify AI agent operations against safety policy
npx ferrum verify ./my-app --agent copilot --operation apply_safe_change

# Output graph statistics
npx ferrum graph ./my-app --stats

# View architecture drift history
npx ferrum history ./my-app
```

**Exit codes:** `0` clean, `1` findings present, `2` error.

**CI/CD integration:**

```bash
# JSON output for GitHub Actions, GitLab CI, or SARIF consumers
npx ferrum analyze ./my-app --json

# Fail the pipeline on HIGH or CRITICAL findings
npx ferrum analyze ./my-app --threshold high
```

---

## API

```typescript
import {
  analyze,
  doctor,
  impact,
  AgentGateway,
  buildGraph,
  calculateScores,
  scoreToGrade,
  mapJourney,
  detectDeadEnds,
  captureBaseline,
  compareWithBaseline,
  analyzeCodebase,
  startSession,
  recordEvent,
  endSession,
  analyzeSession,
} from 'ferrum-engine';
```

### Full Analysis

```typescript
// Build graph, run all 7 analyzers, compute scores
const report = analyze('./my-app');

console.log(report.scores.architecture);  // 92
console.log(report.scores.security);      // 78
console.log(scoreToGrade(92));            // 'A'
console.log(report.totalDurationMs);      // 340
```

### Health Check

```typescript
// Human-readable multi-line report
console.log(doctor('./my-app'));
```

### Change Impact

```typescript
const result = impact('./my-app', ['src/lib/auth.ts', 'src/middleware.ts']);

console.log(result.riskLevel);           // 'CRITICAL'
console.log(result.affectedAreas);       // [{ area: 'authentication', ... }]
console.log(result.evidence);            // Traced dependency paths
```

### AI Agent Gateway

```typescript
const gateway = new AgentGateway({
  autoBlockThreshold: 'critical',
  maxFilesPerRequest: 10,
  requireApprovalFor: ['modify'],
});

const response = await gateway.handleRequest(
  {
    agent: { id: 'copilot', version: '1.0' },
    operation: 'analyze_change',
    scope: 'analyze',
    files: ['src/lib/auth.ts'],
  },
  graph,
);

console.log(response.allowed);           // true
console.log(response.findings);          // [...]
```

### Flight Recorder

```typescript
const session = startSession({ userId: 'abc', route: '/dashboard' });

recordEvent(session.id, { type: 'navigation', route: '/settings' });
recordEvent(session.id, { type: 'error', error: new Error('fetch failed') });

const analysis = analyzeSession(endSession(session.id));
console.log(analysis.rootCause);         // 'network-failure'
console.log(analysis.renderTimeline);    // [...]
```

### Journey Engine

```typescript
const journey = mapJourney(graph, '/checkout', '/confirmation');
console.log(journey.steps);              // [...]
console.log(detectDeadEnds(graph));      // ['/orphan-page']
```

### Architecture Drift

```typescript
const baseline = captureBaseline(graph);
// ... after refactoring ...
const drift = compareWithBaseline(baseline, graph);
console.log(drift.driftScore);           // 23  (0 = identical, 100 = fully drifted)
console.log(drift.layerViolations);      // [...]
```

---

## Analyzers

| Analyzer | What It Detects | Example Findings |
|---|---|---|
| **Architecture** | Circular dependencies, layer violations, coupling, dead code | `component imports API route directly` |
| **Performance** | Large bundles, missing dynamic imports, oversized components | `3.2 MB bundle without code splitting` |
| **Security** | Dangerous patterns, hardcoded secrets, missing CSRF, non-HTTPS calls | `API key in source code` |
| **Reliability** | Missing error boundaries, unhandled promises, bare fetches | `fetch() without error handling` |
| **Testing** | Untested modules, coverage gaps, test anti-patterns | `0 test files for 12 source modules` |
| **Accessibility** | Missing alt text, form labels, ARIA roles, keyboard navigation | `<img> without alt attribute` |
| **Dependencies** | Outdated, unused, duplicate, heavy, non-semver packages | `lodash@3.10.1 (5 years outdated)` |

Every analyzer returns `Finding[]` where each finding carries `severity`, `evidence` (file path + line), and `suggestion`.

---

## Scoring

Scores are computed across **7 dimensions**, each starting at 100 and deducting points per finding severity:

| Dimension | Weight | Deduction Rules |
|---|---|---|
| Architecture | 1.0x | -15 per circular dep, -10 per layer violation, -5 per dead code instance |
| Performance | 1.0x | -10 per large bundle, -8 per missing dynamic import |
| Security | 1.5x | -20 per hardcoded secret, -15 per missing CSRF, -10 per non-HTTPS |
| Reliability | 1.2x | -15 per missing error boundary, -10 per unhandled promise |
| Testing | 0.8x | -12 per untested module, -8 per coverage gap |
| Accessibility | 1.0x | -10 per missing alt, -8 per missing label, -5 per missing ARIA |
| Dependencies | 0.7x | -5 per outdated, -8 per unused, -10 per duplicate |

**Grade scale:**

| Range | Grade |
|---|---|
| 90--100 | **A** |
| 80--89 | **B** |
| 70--79 | **C** |
| 60--69 | **D** |
| 0--59 | **F** |

Compared to Lighthouse: FerrumEngine analyzes **code structure and dependency topology**, not just runtime performance of a single page.

---

## CLI

| Command | Purpose | Key Flags |
|---|---|---|
| `ferrum analyze <path>` | Full 7-dimension analysis | `--json`, `--threshold <level>`, `--config <file>` |
| `ferrum doctor <path>` | Human-readable health check | `--config <file>` |
| `ferrum impact <path>` | Change impact assessment | `--file <path>` (repeatable), `--json` |
| `ferrum verify <path>` | AI agent safety verification | `--agent <id>`, `--operation <op>`, `--json` |
| `ferrum graph <path>` | Graph statistics and export | `--stats`, `--export <format>`, `--json` |
| `ferrum history <path>` | Architecture drift history | `--baseline <file>`, `--json` |

---

## Plugin System

FerrumEngine runs a **7-phase pipeline** for extensible analysis:

```
discover -> parse -> build -> analyze -> score -> report -> teardown
```

Each phase exposes lifecycle hooks. Plugins can register custom analyzers, inject framework adapters, or transform output.

### Built-in Framework Adapters

| Framework | Route Detection | Component Inference | Layer Rules |
|---|---|---|---|
| React | JSX/TSX component scanning | Hook + context inference | Yes |
| Next.js (App + Pages) | `page.tsx`, `layout.tsx`, `route.ts`, middleware | Server/client boundary | Yes |
| Vue | `.vue` SFC parsing | Composable + provide/inject | Yes |
| Svelte / SvelteKit | `+page`, `+layout`, `+server` | Store + action inference | Yes |
| Angular | `.component`, `.service`, `.module` | DI + decorator inference | Yes |
| Lit | Web component scanning | Reactive property inference | Yes |

---

## Testing

| Metric | Count |
|---|---|
| Passing unit tests | 245+ |
| Engine test files | 16 |
| E2E test suites | 4 (Playwright) |
| Engine modules | 26 |
| Zero external runtime deps | Core engine only |

```bash
# Run all tests
npm test

# Engine tests only
npx vitest run __tests__/engine/

# Specific engine module
npx vitest run __tests__/engine/scoring.test.ts

# Integration test (all analyzers + scoring)
npx vitest run __tests__/engine/integration.test.ts

# End-to-end
npx playwright test
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Language | TypeScript (strict mode) |
| Framework | Next.js 16, React 19 |
| AST Parsing | @babel/parser, @babel/traverse |
| Auth / JWT | jose |
| Database | Supabase |
| Styling | Tailwind CSS 4 |
| Unit Tests | Vitest |
| E2E Tests | Playwright |
| Core Engine | Zero external runtime dependencies |

---

## Product Separation

FerrumEngine is part of a three-product system with clear boundaries:

| Product | Domain | Responsibility |
|---|---|---|
| **FerrumEngine** | Engineer | Analyze, score, protect -- intelligence infrastructure |
| **RoyCSS** | Create | Visual effects, animations, CSS tooling |
| **Ferrum Cloud** | Operate | Host, deploy, monitor -- runtime platform |

FerrumEngine is **not** a CSS effects library, visual design tool, or component framework. It operates at the **engineering intelligence layer** -- analyzing, protecting, and understanding your application's structure and behavior.

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

[MIT](./LICENSE) &copy; FerrumEngine Contributors
