# FerrumEngine

> **Frontend Intelligence & Reliability Engine** — Software engineering intelligence infrastructure for understanding, analyzing, and protecting any frontend application.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?style=flat-square)](https://www.typescriptlang.org)
[![Node](https://img.shields.io/badge/Node-%E2%89%A520-green?style=flat-square)](./package.json)
[![Tests: 210 passing](https://img.shields.io/badge/Tests-210%20passing-22c55e?style=flat-square)](src/engine)
[![Engine Modules: 13](https://img.shields.io/badge/Engine-13%20modules-8b5cf6?style=flat-square)](src/engine)

FerrumEngine sits **above your framework** (React, Vue, Svelte, Angular) and provides application graph analysis, change impact assessment, AI agent safety gates, reliability scoring, and runtime observability — zero collision with visual/CSS tools like RoyCSS.

---

## Core Capabilities

### 1. Application Graph

Builds a persistent, machine-readable representation of your entire frontend system — components, pages, routes, APIs, hooks, stores, middleware, tests, and their relationships.

- **22 node types** and **18 edge types** covering the full frontend surface
- Adjacency indexes for O(1) lookups by path, kind, and relationships
- Cycle detection, topological sort, and transitive dependency tracing
- Framework adapters for React, Next.js, Vue, Svelte, Angular
- Graph serialization and caching for incremental analysis

### 2. Change Impact Analysis

Before merging code, trace exactly what changes affect — routes, tests, APIs, user journeys, and security surfaces.

- Risk classification: **LOW / MEDIUM / HIGH / CRITICAL** with evidence
- Direct + transitive dependent tracing through the dependency graph
- Security-sensitive file detection (auth, middleware, API routes)
- Verification recommendations generated automatically
- CI/CD ready: JSON output for GitHub Actions, GitLab CI, SARIF

### 3. AI Agent Safety Gateway

Structured API for AI coding agents with scope-based permissions, sandboxing, and audit logging.

- 7 operations: `inspect_project`, `analyze_change`, `verify_change`, `propose_change`, `apply_safe_change`, `suggest_refactor`, `run_tests`
- Scope levels: `read`, `analyze`, `test`, `suggest`, `modify`, `deploy`
- Configurable auto-block thresholds (block critical/high severity changes)
- Human approval workflows for `modify` operations
- Full audit log with agent identity, operation, files, and findings

### 4. Reliability Scoring

Evidence-based scoring across 7 dimensions — every deduction traceable to actual findings.

| Dimension | What It Measures |
|-----------|-----------------|
| Architecture | Circular deps, layer violations, coupling, dead code |
| Performance | Large bundles, missing dynamic imports, oversized components |
| Security | Dangerous patterns, hardcoded secrets, missing CSRF, non-HTTPS calls |
| Reliability | Missing error boundaries, unhandled promises, bare fetches |
| Testing | Untested modules, coverage gaps, test anti-patterns |
| Accessibility | Missing alt text, form labels, ARIA, keyboard navigation |
| Dependencies | Outdated, unused, duplicate, heavy, non-semver packages |

Letter grades A–F. Compared to Lighthouse: Ferrum analyzes **code structure**, not just runtime performance.

### 5. Flight Recorder

Runtime observability that reconstructs frontend execution paths for failure root cause analysis.

- Session lifecycle: start → record events → end → analyze
- 6 root cause types: network-failure, state-corruption, render-loop, missing-data, race-condition, error-boundary
- Error chain tracing through event streams
- Navigation path reconstruction and render timeline building

## Additional Modules

| Module | Purpose |
|--------|---------|
| **User Journey Engine** | Map journeys through the graph, detect dead ends and unreachable pages |
| **Architecture Drift Detector** | Capture baselines, compare structural and rule-based drift over time |
| **Codebase Intelligence** | Purpose inference, domain classification, complexity estimation, health scoring |
| **Plugin Runtime** | 15 lifecycle hooks, custom analyzers, framework adapters, config loading |
| **CLI** | `ferrum analyze`, `ferrum doctor`, `ferrum impact`, `ferrum verify`, `ferrum graph`, `ferrum history` |

## CLI Usage

```bash
# Full analysis with all 7 dimensions
ferrum analyze ./my-app

# Human-readable health check
ferrum doctor ./my-app

# Change impact analysis
ferrum impact ./my-app --file src/lib/auth.ts --file src/middleware.ts

# JSON output for CI/CD
ferrum analyze ./my-app --json

# AI agent verification
ferrum verify ./my-app --agent copilot --operation apply_safe_change --json

# Graph statistics
ferrum graph ./my-app --stats
```

Exit codes: `0` (clean), `1` (findings present), `2` (error).

## Programmatic API

```typescript
import { analyze, doctor, impact, AgentGateway } from 'ferrum-engine';

// Full analysis
const report = analyze('./my-app');
console.log(report.scores); // { architecture: 92, performance: 85, ... }

// Health check
console.log(doctor('./my-app'));

// Impact analysis
const impactResult = impact('./my-app', ['src/lib/utils.ts']);
console.log(impactResult.riskLevel); // 'HIGH'

// AI Agent gateway
const gateway = new AgentGateway({
  autoBlockThreshold: 'critical',
  maxFilesPerRequest: 10,
});
const response = await gateway.handleRequest(agentRequest, graph);
```

## Architecture

```
src/engine/
├── core/           # Types, graph data structure, graph algorithms
├── graph/          # Parser, builder, serialization
├── analyzer/       # 7 analyzers (architecture, performance, security, reliability, testing, a11y, deps)
├── impact/         # Change impact analysis engine
├── scoring/        # Evidence-based reliability scoring
├── agent/          # AI Agent safety gateway
├── flight-recorder/ # Runtime observability
├── journey/        # User journey engine
├── drift/          # Architecture drift detector
├── intelligence/   # Codebase intelligence engine
├── plugin/         # Plugin runtime, built-in adapters, config loader
├── cli/            # CLI entry point and output formatting
└── index.ts        # Public API barrel
```

## Testing

```bash
npm test                                # 210 engine tests
npx vitest run __tests__/engine/       # Engine tests only
npx vitest run __tests__/engine/integration.test.ts  # Integration tests
```

## Framework Support

| Framework | Adapter | Route Detection | Layer Rules |
|-----------|---------|----------------|-------------|
| React | Built-in | Component/Hook inference | Yes |
| Next.js (App + Pages) | Built-in | page/layout/route/middleware | Yes |
| Vue | Built-in | .vue files, composables | Yes |
| Svelte/SvelteKit | Built-in | +page/+layout/+server | Yes |
| Angular | Built-in | .component/.service/.module | Yes |
| Generic JS/TS | Built-in | Basic patterns | Yes |

## What FerrumEngine Is NOT

FerrumEngine is **not** a CSS effects library, visual design tool, or component framework. That's [RoyCSS](https://github.com/Roy-Wanyoike/RoyCSS)'s domain. FerrumEngine operates at the **engineering intelligence** layer — analyzing, protecting, and understanding your application's structure and behavior.

## Documentation

- [Architecture Overview](docs/architecture/overview.md)
- [Application Graph Deep Dive](docs/architecture/application-graph.md)
- [Change Impact Analysis](docs/architecture/change-impact.md)
- [AI Agent Gateway](docs/architecture/agent-gateway.md)
- [Reliability Scoring](docs/architecture/reliability-scoring.md)
- [Plugin Architecture RFC](docs/rfc/002-plugin-architecture.md)

## License

[MIT](./LICENSE) © FerrumEngine Contributors
