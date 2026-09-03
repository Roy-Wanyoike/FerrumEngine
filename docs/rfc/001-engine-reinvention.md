# RFC-001: FerrumEngine v2 — Product Reinvention

## Status
Accepted

## Summary

FerrumEngine is being reinvented from a CSS effects library into a **Frontend Intelligence & Reliability Engine** — the engineering intelligence layer that sits above frameworks and makes software development safer, faster, and more understandable.

## Motivation

The original FerrumEngine was positioned as a CSS effects library (542+ effects, animation playground, etc.) — directly competing with RoyCSS. This creates confusion and limits the product's addressable market.

AI agents are increasingly capable of generating code. The bottleneck is shifting from "writing code" to "engineering reliable software." FerrumEngine fills this gap.

## Core Architecture

```
     Human / AI Agent
              │
              ▼
        FERRUM ENGINE
    ┌─────────────┤─────────────┐
    │             │             │
  Application   Analysis    Agent
  Graph         Engine      Gateway
    │             │             │
    └─────────────┼─────────────┘
                  │
           Scoring Engine
                  │
           CI/CD / CLI
```

### 1. Application Graph
The foundational data structure. Scans a project and constructs a living graph of nodes (files, components, functions, routes, APIs) and edges (imports, calls, renders, depends-on).

### 2. Architecture Intelligence
Analyzes the graph for circular dependencies, excessive coupling, layer violations, oversized modules, dead code, and duplicated abstractions.

### 3. Change Impact Engine
Calculates what breaks when code changes — direct/transitive dependents, affected routes, APIs, tests, security implications, and risk level.

### 4. Reliability Scoring Engine
Evidence-based scoring across 7 dimensions (architecture, performance, security, reliability, testing, accessibility, dependencies). Every deduction is traceable to a specific finding.

### 5. AI Agent Gateway
Scope-based permissions, change verification, risk assessment, audit logging, and configurable auto-blocking.

## Design Principles

1. **Framework agnostic** — works with any JS/TS project
2. **Zero AI coupling** — AI models are consumers, not dependencies
3. **Evidence-based** — every finding has a file path and explanation
4. **Incremental** — content hashing enables fast re-analysis
5. **Extensible** — plugin architecture for custom analyzers

## Test Coverage

38 tests across 4 test files covering graph, impact, scoring, and agent gateway.

## Files Added

```
src/engine/
  core/types.ts       — 350 lines, all type definitions
  core/graph.ts        — 200 lines, graph construction + queries
  graph/parser.ts      — 250 lines, zero-dependency source parser
  graph/builder.ts     — 200 lines, project scanner + graph builder
  analyzer/architecture.ts — 250 lines, 6 architectural detectors
  impact/impact.ts     — 200 lines, change impact analysis
  scoring/scoring.ts   — 150 lines, evidence-based reliability scores
  agent/gateway.ts     — 250 lines, AI agent safety gate
  index.ts             — 100 lines, public API
__tests__/engine/
  graph.test.ts        — 14 tests
  impact.test.ts       — 6 tests
  scoring.test.ts      — 11 tests
  gateway.test.ts      — 7 tests
docs/rfc/
  001-engine-reinvention.md
```