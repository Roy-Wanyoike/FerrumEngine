# FerrumEngine — Architecture Overview

> **FerrumEngine is Software Engineering Intelligence Infrastructure.**
> It sits ABOVE your framework (React, Vue, Svelte, Angular, etc.) and provides
> application graph analysis, change impact prediction, AI agent safety, reliability
> scoring, and architecture governance.

---

## Table of Contents

1. [What FerrumEngine Is (and Isn't)](#what-ferrumengine-is-and-isnt)
2. [Core Architecture](#core-architecture)
3. [Module Breakdown](#module-breakdown)
4. [Data Flow](#data-flow)
5. [CLI Design](#cli-design)
6. [Performance Targets](#performance-targets)
7. [Design Principles](#design-principles)
8. [Relationship to Other Projects](#relationship-to-other-projects)

---

## What FerrumEngine Is (and Isn't)

### What FerrumEngine IS

FerrumEngine is a **Frontend Intelligence & Reliability Engine** — a build-time
analysis tool that constructs a complete application graph from your source code
and uses it to:

- **Understand** your application's architecture through a unified, framework-agnostic graph model
- **Analyze** code quality across 7 dimensions: architecture, performance, security, reliability, testing, accessibility, and dependencies
- **Predict** the blast radius of any code change via transitive dependency tracing
- **Score** your application's reliability with evidence-based, traceable letter grades (A–F)
- **Protect** production code from unsafe AI agent modifications through a scope-based safety gate
- **Observe** runtime behavior through a flight recorder system
- **Detect** architectural drift as your codebase evolves over time

### What FerrumEngine is NOT

- **NOT a CSS/visual/effects product.** That domain belongs exclusively to [RoyCSS](https://github.com/roycss/roycss). FerrumEngine does not generate, transform, or analyze CSS effects, animations, or visual styles.
- **NOT a framework.** FerrumEngine does not render UI, manage state, or handle routing. It is a meta-tool that *analyzes* frameworks.
- **NOT an AI model.** FerrumEngine has zero AI coupling. AI models (Claude, GPT, Copilot, etc.) are *consumers* of Ferrum's structured API, not dependencies. The engine works entirely through static analysis and graph algorithms.
- **NOT a linter.** While FerrumEngine detects architectural issues, it operates at a higher level of abstraction than ESLint or TypeScript's compiler. It reasons about *system structure*, not syntax.
- **NOT a runtime monitoring tool.** FerrumEngine operates at build/CI time. The Flight Recorder module captures runtime data, but the primary analysis is static.

### The Problem FerrumEngine Solves

Modern frontend applications are complex enough that no single developer can hold
the entire dependency graph in their head. AI agents can generate code faster than
humans can review it. The industry needs:

1. **Machine-readable understanding** of application structure
2. **Predictive change analysis** that tells you *what breaks* before you deploy
3. **Guardrails for AI agents** that prevent unsafe autonomous modifications
4. **Evidence-based quality metrics** that trace every score deduction to actual code

---

## Core Architecture

FerrumEngine is built on a **plugin/adapter architecture** that makes it
framework-agnostic. The core engine has no framework-specific code — all
framework knowledge lives in adapter plugins.

```
                         Human Developer / AI Agent
                                    │
                                    ▼
                              ┌─────────────┐
                              │   CLI / SDK  │
                              └──────┬──────┘
                                     │
                              ┌──────▼──────┐
                              │ FERRUM ENGINE│
                              └──────┬──────┘
                                     │
          ┌──────────┬─────────┬───────┴───────┬──────────┐
          ▼          ▼         ▼               ▼          ▼
     ┌─────────┐ ┌───────┐ ┌───────┐  ┌───────────┐ ┌────────┐
     │  Graph  │ │Analyzer│ │Impact │  │  Scoring  │ │ Agent  │
     │ Builder │ │Engine  │ │Engine │  │  Engine   │ │Gateway │
     └────┬────┘ └───┬───┘ └───┬───┘  └─────┬─────┘ └───┬────┘
          │          │         │            │           │
          ▼          ▼         ▼            ▼           ▼
     ┌─────────────────────────────────────────────────────────┐
     │                  Application Graph                       │
     │        (Nodes + Edges + Adjacency Indexes)              │
     └─────────────────────────────────────────────────────────┘
          │          │         │            │           │
          ▼          ▼         ▼            ▼           ▼
     ┌─────────────────────────────────────────────────────────┐
     │              Framework Adapters                         │
     │   React  │  Vue  │  Svelte  │  Angular  │  Next.js    │
     └─────────────────────────────────────────────────────────┘
          │          │         │            │           │
          ▼          ▼         ▼            ▼           ▼
     ┌─────────────────────────────────────────────────────────┐
     │                  Source Code                             │
     │          (Your Application)                              │
     └─────────────────────────────────────────────────────────┘
```

### Key Architectural Decisions

| Decision | Rationale |
|----------|-----------|
| Zero external dependencies for core | Maximum portability; can run in any JS environment |
| Regex-based parsing (no AST) | Fast, lightweight, avoids parser version lock-in |
| Content hashing for incrementality | Only re-parse changed files; <1s for single-file changes |
| Map-based graph storage | O(1) lookups by ID, path, and kind |
| Plugin/adapter pattern | Framework-agnostic; new frameworks added without core changes |
| Evidence-based scoring | Every deduction traceable to a specific finding with file+line |

---

## Module Breakdown

FerrumEngine is organized into 9 engine modules, each with a single
responsibility:

### `engine/core` — Graph Types & Data Structure

The foundational type system and graph data structure. Everything else
is built on top of this.

```
engine/core/
  types.ts    — All TypeScript types (FerrumId, NodeKind, EdgeKind, GraphNode,
                  GraphEdge, ApplicationGraph, Finding, Evidence, AnalysisResult,
                  ReliabilityScores, ImpactAnalysis, AgentRequest/Response, etc.)
  graph.ts    — Graph construction (createGraph, addNode, addEdge, connect) and
                  query operations (getDependents, getTransitiveDependents,
                  findPaths, detectCycles, getGraphStats)
```

**Lines of code:** ~350 (types) + ~200 (graph) = **~550 lines**

### `engine/graph` — Parser & Builder

Source code parsing and project-wide graph construction with incremental
build support.

```
engine/graph/
  parser.ts   — Zero-dependency regex-based parser. Extracts nodes (files,
                  functions, classes, components, exports) and edges (imports,
                  fetches) from TS/JS/TSX/JSX source. Includes framework
                  detection and content hashing.
  builder.ts  — Orchestrates directory scanning, file parsing, edge resolution,
                  and route/test detection. Supports incremental builds via
                  content hash comparison.
```

**Lines of code:** ~380 (parser) + ~350 (builder) = **~730 lines**

### `engine/analyzer` — Multi-Dimensional Analysis

Analyzes the application graph across 7 dimensions (architecture, performance,
security, reliability, testing, accessibility, dependencies). Each dimension
is an independent analyzer that produces `Finding[]` with evidence.

```
engine/analyzer/
  architecture.ts — 6 architectural detectors: circular dependencies,
                     excessive coupling, layer violations, oversized modules,
                     dead code, duplicated abstractions
  performance.ts   — (Planned) Bundle size analysis, lazy loading detection,
                     render cycle detection, re-render patterns
  security.ts      — (Planned) Auth flow analysis, CSRF/XSS detection,
                     dependency vulnerability mapping, secret leakage
  reliability.ts    — (Planned) Error boundary coverage, loading states,
                     offline support, graceful degradation
  testing.ts       — (Planned) Test coverage mapping, untested critical paths,
                     test quality assessment
  accessibility.ts  — (Planned) ARIA usage, keyboard navigation, color contrast
                     hints from code structure
  dependencies.ts  — (Planned) Outdated deps, duplicate deps, bundle impact,
                     dependency health scoring
```

**Current lines of code:** ~325 (architecture) = **~325 lines** (6 more planned)

### `engine/impact` — Change Impact Analysis

Given a set of changed files, traces through the dependency graph to
determine what breaks, at what risk level, and what verification is needed.

```
engine/impact/
  impact.ts   — analyzeImpact(): walks the graph to find direct and transitive
                  dependents, classifies by kind (routes, tests, APIs, journeys),
                  calculates risk level (LOW/MEDIUM/HIGH/CRITICAL), and generates
                  verification recommendations. Also includes diffGraphs() for
                  comparing two graph snapshots.
```

**Lines of code:** **~300 lines**

### `engine/scoring` — Reliability Scoring

Evidence-based scoring that converts analysis findings into letter grades.
Every point deduction is traceable to a specific finding.

```
engine/scoring/
  scoring.ts  — calculateScores(): takes analysis results and produces
                  per-dimension scores (0–100) with letter grades (A–F).
                  Uses configurable severity penalties and dimension weights.
                  formatScoreReport(): human-readable CLI output with visual bars.
```

**Lines of code:** **~210 lines**

### `engine/agent` — AI Agent Gateway & Safety Gate

The safety layer between autonomous AI agents and production code. Agents
request operations through a structured API; Ferrum validates permissions,
assesses risk, and returns structured approval/denial with evidence.

```
engine/agent/
  gateway.ts  — AgentGateway class: processes AgentRequests, validates
                  scope-based permissions, runs impact analysis on proposed
                  changes, enforces approval policies, and maintains an
                  audit log. Supports 6 scopes: read, analyze, test, suggest,
                  modify, deploy.
```

**Lines of code:** **~310 lines**

### `engine/flight-recorder` — Runtime Observability (Planned)

Captures and indexes runtime events for post-incident analysis.

```
engine/flight-recorder/
  recorder.ts   — Runtime event capture: component lifecycle, API calls,
                    errors, state mutations, navigation events
  replay.ts     — Event replay and analysis: filter by time range, component,
                    event type; correlate with source graph
  index.ts      — Public API for embedding the recorder in applications
```

**Planned:** ~500 lines

### `engine/journey` — User Journey Engine (Planned)

Maps user journeys to the application graph and analyzes test coverage,
failure recovery, and security sensitivity per journey step.

```
engine/journey/
  mapper.ts     — Auto-detect journeys from route graphs and navigation patterns
  analyzer.ts   — Analyze journey completeness: tested steps, recovery paths,
                    security-sensitive steps, risk per journey
  index.ts      — Public API
```

**Planned:** ~400 lines

### `engine/drift` — Architecture Drift Detection (Planned)

Tracks how the application graph changes over time and detects
architectural drift from established baselines.

```
engine/drift/
  baseline.ts   — Capture and store graph baselines (snapshots + metadata)
  detector.ts   — Compare current graph against baseline, quantify drift,
                    detect new cycles, layer violations, coupling changes
  timeline.ts   — Drift history visualization data, trend analysis
  index.ts      — Public API
```

**Planned:** ~400 lines

---

## Data Flow

The canonical data flow through FerrumEngine:

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Source Code  │────▶│    Parser    │────▶│    Graph     │
│  (TS/JS/JSX)  │     │  (regex+heur)│     │ (Nodes+Edges)│
└──────────────┘     └──────────────┘     └──────┬───────┘
                                                   │
                         ┌─────────────────────────┼─────────────────────┐
                         │                         │                     │
                    ┌────▼─────┐            ┌──────▼──────┐      ┌──────▼──────┐
                    │ Analyzer  │            │   Impact    │      │   Agent     │
                    │(7 dims)  │            │   Engine    │      │  Gateway    │
                    └────┬─────┘            └──────┬──────┘      └──────┬──────┘
                         │                         │                     │
                    ┌────▼─────┐            ┌──────▼──────┐             │
                    │ Findings │            │ Affected    │             │
                    │ +Evidence│            │ Areas+Risk  │             │
                    └────┬─────┘            └─────────────┘             │
                         │                                                 │
                    ┌────▼─────┐                              ┌───────────▼──────┐
                    │ Scoring  │                              │  Verification     │
                    │ Engine   │                              │  (approve/deny)  │
                    └────┬─────┘                              └──────────┬───────┘
                         │                                                │
                    ┌────▼─────┐                              ┌───────────▼──────┐
                    │ Reports  │                              │   Audit Log       │
                    │(A-F, CLI)│                              │  + Structured     │
                    └──────────┘                              │  Response         │
                                                              └──────────────────┘
```

### Detailed Flow

1. **Source Code** — The raw TypeScript/JavaScript files in your project.

2. **Parser** (`engine/graph/parser.ts`) — Scans each file using regex-based
   heuristics to extract:
   - File nodes (one per source file)
   - Symbol nodes (functions, classes, components, interfaces, types, enums)
   - Import/export edges with specifiers
   - Fetch/API call edges
   - Framework-specific patterns (React hooks, Vue composables, etc.)

3. **Graph** (`engine/core/graph.ts`) — The `ApplicationGraph` data structure
   with 4 indexes:
   - `nodes: Map<FerrumId, GraphNode>` — O(1) lookup by ID
   - `byPath: Map<string, Set<FerrumId>>` — O(1) lookup by file path
   - `byKind: Map<NodeKind, Set<FerrumId>>` — O(1) lookup by node type
   - `outgoing/incoming: Map<FerrumId, Set<FerrumId>>` — adjacency lists

4. **Analyzers** — Each analyzer queries the graph independently and produces
   `Finding[]` with `Evidence[]`. Analyzers do not depend on each other.

5. **Findings** — Structured results with: category, severity, title, description,
   evidence (file path + line), affected node IDs, rule ID, and remediation suggestion.

6. **Scoring** — Converts findings to numeric scores (0–100) per dimension,
   then computes a weighted overall score with letter grade.

7. **Reports** — Output in human-readable (CLI) or machine-readable (JSON, SARIF)
   format.

---

## CLI Design

FerrumEngine provides a CLI (`ferrum`) with 6 primary commands.
All commands support both human-readable output (default) and structured
JSON output (`--format json`).

### `ferrum analyze`

Run a full analysis of the project.

```bash
# Human-readable report
ferrum analyze

# JSON output for CI/CD
ferrum analyze --format json --output ferrum-report.json

# Only specific dimensions
ferrum analyze --analyzers architecture,security

# Minimum severity threshold
ferrum analyze --severity high

# Custom config file
ferrum analyze --config ferrum.config.ts
```

### `ferrum doctor`

Quick health check with actionable recommendations.

```bash
# Interactive health check
ferrum doctor

# JSON for dashboards
ferrum doctor --format json
```

Sample output:

```
  FERRUM RELIABILITY REPORT
  ─────────────────────────────────

  Overall: 72/100 (C)

  architecture      ████████████████░░░░  72/100 (C)
    ↓ 15 pts  Circular dependency: utils ↔ helpers
    ↓ 8 pts   Architectural violation: components/ → pages/
    ... and 3 more

  performance       █████████████████░░░  88/100 (B)

  security          ██████████████████░░  91/100 (A)

  reliability       ███████████████░░░░░  67/100 (C)

  testing           ██████████░░░░░░░░░░░  45/100 (D)

  accessibility     ████████████████████  97/100 (A)

  dependencies      ██████████████████░░  89/100 (B)

  ─────────────────────────────────
```

### `ferrum impact`

Analyze the blast radius of changed files.

```bash
# Analyze staged changes
ferrum impact --git-staged

# Analyze specific files
ferrum impact src/lib/auth.ts src/hooks/use-user.ts

# Compare against main branch
ferrum impact --base main

# JSON for CI pipelines
ferrum impact --git-staged --format json
```

### `ferrum verify`

Verify proposed changes from an AI agent.

```bash
# Verify a patch file
ferrum verify --patch changes.patch

# Verify against current graph
ferrum verify --diff
```

### `ferrum history`

Track reliability scores over time and detect architectural drift.

```bash
# Show score trend
ferrum history

# Compare against baseline
ferrum history --baseline

# Detect drift since last release
ferrum history --since v2.0.0

# JSON for trend charts
ferrum history --format json
```

### `ferrum graph`

Inspect and query the application graph.

```bash
# Show graph statistics
ferrum graph stats

# Show dependents of a file
ferrum graph dependents src/lib/utils.ts

# Show dependency path between two files
ferrum graph path src/lib/auth.ts src/app/dashboard/page.tsx

# Detect cycles
ferrum graph cycles

# Export graph as JSON (for visualization tools)
ferrum graph export --format json --output graph.json
```

### Output Formats

| Format | Use Case |
|--------|----------|
| `text` (default) | Human-readable terminal output with colors and formatting |
| `json` | Machine-readable for CI/CD pipelines, dashboards, and agent consumption |
| `sarif` | GitHub Code Scanning integration, VS Code Problems panel |

---

## Performance Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| Full analysis (10K files) | < 5 seconds | Incremental parsing, parallel file I/O, content hashing |
| Incremental analysis (1 file changed) | < 1 second | Content hash comparison skips unchanged files |
| Graph query (transitive deps) | < 50ms | Adjacency index traversal with visited set |
| Impact analysis (5 changed files) | < 200ms | Pre-indexed adjacency + BFS with early termination |
| Scoring calculation | < 10ms | Simple arithmetic over pre-computed findings |
| Agent gateway response | < 500ms | Permission check + cached graph query + impact analysis |
| Memory usage (10K files) | < 500MB | Streaming graph construction, node ID reuse |

### Incremental Build Strategy

FerrumEngine uses **content hashing** (djb2) to detect which files have changed.
On subsequent runs, only modified files are re-parsed. The graph builder
maintains a `FileCache` mapping `filePath → { contentHash, nodeIds }` that
enables:

- **Skip** files whose content hash hasn't changed
- **Remove** nodes from deleted files
- **Re-resolve** edges that may have changed
- **Preserve** all unchanged subgraphs

```typescript
// Incremental build flow
const cache = previousCache; // from .ferrum/cache.json
const result = buildGraph(rootPath, config, cache);
// result.stats.filesSkipped === files with unchanged content hashes
```

---

## Design Principles

### 1. Framework Agnostic

FerrumEngine has zero framework-specific code in its core. All framework
knowledge lives in adapter plugins that map framework-specific patterns
to the universal graph model.

### 2. Zero AI Coupling

AI models are consumers of Ferrum's structured API, not dependencies. The
engine works entirely through static analysis and graph algorithms. This
means:

- No API key required
- No network calls
- No model version lock-in
- Deterministic, reproducible results

### 3. Evidence-Based

Every finding has a file path, line number, and explanation. Every score
deduction is traceable to a specific finding. No vanity metrics.

### 4. Incremental

Content hashing enables fast re-analysis. The graph builder only re-parses
files whose content has changed, making it suitable for watch mode and
pre-commit hooks.

### 5. Extensible

The plugin architecture allows:

- Custom analyzers for project-specific rules
- Framework adapters for new frameworks
- Custom scoring dimensions
- Lifecycle hooks for integration with other tools

---

## Relationship to Other Projects

### RoyCSS

**RoyCSS is the CSS effects library.** FerrumEngine is the intelligence engine.
They are completely separate products with zero overlap.

| Aspect | RoyCSS | FerrumEngine |
|--------|--------|--------------|
| Domain | CSS effects & animations | Software intelligence |
| Output | CSS classes & utilities | Analysis reports & scores |
| Runtime | Browser | Build time / CI |
| Consumers | Frontend developers | Developers + AI agents |
| Data model | CSS property maps | Application graph |

### Existing Tooling

FerrumEngine complements (not replaces) existing tools:

| Tool | What it does | FerrumEngine adds |
|------|-------------|-------------------|
| ESLint | Syntax & style rules | Architecture-level analysis |
| TypeScript | Type checking | Runtime dependency analysis, impact prediction |
| Lighthouse | Runtime browser metrics | Static code-level reliability scoring |
| Jest/Vitest | Test execution | Test coverage mapping to the dependency graph |
| Bundle analyzers | Bundle size | Dependency graph with change impact |

---

## File Structure

```
src/engine/
  index.ts                    — Public API entry point
  core/
    types.ts                  — All type definitions (~350 lines)
    graph.ts                  — Graph construction + queries (~200 lines)
  graph/
    parser.ts                 — Source file parser (~380 lines)
    builder.ts                — Project scanner + graph builder (~350 lines)
  analyzer/
    architecture.ts           — Architecture analyzer (~325 lines)
  impact/
    impact.ts                 — Change impact analysis (~300 lines)
  scoring/
    scoring.ts                — Reliability scoring (~210 lines)
  agent/
    gateway.ts                — AI agent safety gate (~310 lines)
  flight-recorder/            — (Planned) Runtime observability
  journey/                    — (Planned) User journey engine
  drift/                      — (Planned) Architecture drift detection
```

---

*This document describes FerrumEngine v2 as defined in RFC-001.*
