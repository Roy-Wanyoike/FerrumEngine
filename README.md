<div align="center">

# FerrumEngine

**Engineering intelligence for AI-native software**

<br />

[![Version](https://img.shields.io/badge/version-0.2.0-6e7681?style=flat-square)](./package.json)
[![License](https://img.shields.io/badge/license-MIT-yellow?style=flat-square)](./LICENSE)
[![Tests](https://img.shields.io/badge/tests-494%2B%20passing-22c55e?style=flat-square)](https://github.com/Roy-Wanyoike/FerrumEngine)
[![Node](https://img.shields.io/badge/node-%E2%89%A518-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Analyzers](https://img.shields.io/badge/analyzers-17-e67e22?style=flat-square)](./src/engine/analyzer)
[![CLI](https://img.shields.io/badge/CLI-17%20commands-8b5cf6?style=flat-square)](./src/engine/cli)
[![Adapters](https://img.shields.io/badge/adapters-6-16a085?style=flat-square)](./src/adapters)

<br />

> **AI can write software. Ferrum makes sure it works.**

FerrumEngine is an Engineering Intelligence platform that analyzes, verifies,
secures, optimizes, and evolves your applications — purpose-built for a world
where AI agents write code and humans need confidence it ships safely.

</div>

---

## Quick Start

```bash
# One-command health check — zero config
npx ferrum-engine doctor

# Or install locally
npm install --save-dev ferrum-engine
npx ferrum doctor ./my-app
```

```bash
$ npx ferrum-engine doctor

  ══════════════════════════════════════════════════
  FERRUM DOCTOR — Health Check
  ══════════════════════════════════════════════════

  Overall Score: 78/100  (B+)

  ✓ architecture    82/100  A-   · 3 findings
  ⚠ security        68/100  C+   · 7 findings
  ✓ performance     85/100  A    · 2 findings
  ✓ reliability     79/100  B+   · 4 findings
  ⚠ testing         62/100  C    · 9 findings
  ✓ accessibility   88/100  A    · 1 finding
  ✓ dependencies    75/100  B    · 3 findings

  Completed in 342ms
```

---

## Why Ferrum?

| | FerrumEngine | SonarQube | ESLint | CodeClimate |
|---|---|---|---|---|
| **AI agent safety** | Agent Gateway with scoped permissions | ❌ | ❌ | ❌ |
| **Autonomous verification** | PASS / WARN / BLOCK loop | ❌ | ❌ | ❌ |
| **Application Graph** | 28 node types, 19 edge types | Partial | ❌ | ❌ |
| **Temporal queries** | Software Time Machine | ❌ | ❌ | ❌ |
| **Language-independent IR** | Application IR | ❌ | ❌ | ❌ |
| **Multi-dimensional scoring** | 17 engines → unified score | 1 metric | ❌ | 1 metric |
| **Framework adapters** | React, Vue, Svelte, Angular, Lit, Vanilla | ❌ | Plugin | ❌ |
| **Change impact analysis** | Built-in, graph-based | ❌ | ❌ | ❌ |
| **Deterministic core** | 100% deterministic analysis | Heuristic | Rule | Heuristic |

**Ferrum is not a linter.** It's an engineering intelligence system that builds a living model of your software — then uses that model to verify AI-generated code, predict change impact, track architectural drift, and answer questions about your codebase that no other tool can.

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                        Ferrum CLI                            │
│  analyze │ doctor │ impact │ verify │ history │ inspect │ …  │
├──────────────────────────────────────────────────────────────┤
│                    High-Level API                             │
│       analyze() │ doctor() │ impact() │ verify()             │
├──────────────────────────────────────────────────────────────┤
│                 Intelligence Engines (17)                     │
│  Architecture │ Security │ Performance │ Reliability          │
│  Testing │ Accessibility │ Dependencies │ Maintainability     │
│  Complexity │ Configuration │ API Contracts │ Data Flow       │
│  Infrastructure │ Deployment │ Ownership │ Compliance         │
│  Observability                                               │
├──────────────────────────────────────────────────────────────┤
│                   Core Infrastructure                         │
│  Application Graph │ Application IR │ Scoring                 │
│  Time Machine │ Flight Recorder │ Journey Engine              │
│  Drift Detector │ Agent Gateway │ Plugin System               │
├──────────────────────────────────────────────────────────────┤
│                    Deterministic Core                         │
│        Pure functions │ No I/O │ No network │ No AI          │
└──────────────────────────────────────────────────────────────┘
```

Every analysis starts at the **Deterministic Core** — pure functions with zero side effects. Intelligence engines layer on top, producing findings and scores. The High-Level API composes engines into workflows. The CLI exposes everything to humans; the Agent Gateway exposes it to AI.

---

## Intelligence Engines

Ferrum ships **17 specialized analyzers**, each producing structured findings with evidence, severity, and suggested fixes:

| # | Engine | Analyzes | Key Checks |
|---|--------|----------|------------|
| 1 | **Architecture** | Structural patterns, layer violations | Dependency direction, module coupling, bounded contexts |
| 2 | **Security** | Vulnerabilities, auth patterns | Secret exposure, injection vectors, permission models |
| 3 | **Performance** | Rendering, bundle, runtime | Bundle size, lazy loading, render bottlenecks |
| 4 | **Reliability** | Error handling, resilience | Error boundaries, retry logic, graceful degradation |
| 5 | **Testing** | Coverage, test quality | Test-to-source ratio, assertion quality, test isolation |
| 6 | **Accessibility** | A11y compliance | ARIA semantics, keyboard nav, screen reader support |
| 7 | **Dependencies** | Supply chain, freshness | Outdated packages, license compliance, transitive risk |
| 8 | **Maintainability** | Code health | Naming, documentation, module cohesion |
| 9 | **Complexity** | Cognitive load | Cyclomatic, cognitive complexity, nesting depth |
| 10 | **Configuration** | Config correctness | Type safety, environment handling, defaults |
| 11 | **API Contracts** | Interface stability | Breaking changes, type compatibility, versioning |
| 12 | **Data Flow** | Data patterns | State mutations, data leakage, transform chains |
| 13 | **Infrastructure** | Infra-as-code | IaC patterns, deployment config, resource limits |
| 14 | **Deployment** | Release risk | Rollback safety, feature flags, canary readiness |
| 15 | **Ownership** | Code ownership | Bus factor, CODEOWNERS coverage, orphaned modules |
| 16 | **Compliance** | Regulatory adherence | GDPR, SOC2, HIPAA indicators |
| 17 | **Observability** | Monitoring gaps | Logging, tracing, alerting coverage |

Each engine returns `AnalysisResult` with structured `Finding[]` — every finding has `severity`, `evidence`, `affectedNodes`, `ruleId`, and `suggestion`.

---

## CLI

```bash
ferrum <command> [path] [options]
```

| Command | Description |
|---------|-------------|
| `analyze` | Full multi-engine analysis (all 17 dimensions) |
| `doctor` | Quick health check with scored report |
| `impact` | Change impact analysis (`--file` for changed files) |
| `verify` | Agent operation verification (`--agent` + `--operation`) |
| `graph` | Application graph statistics |
| `history` | Analysis history and timeline |
| `init` | Generate `ferrum.config.ts` based on framework detection |
| `inspect` | Deep inspect a file or module |
| `architecture` | Architecture analyzer only |
| `security` | Security analyzer only |
| `performance` | Performance analyzer only |
| `accessibility` | Accessibility analyzer only |
| `reliability` | Reliability analyzer only |
| `dependencies` | Dependencies analyzer only |
| `test` | Testing analyzer only |
| `config` | View or edit Ferrum configuration |
| `agent` | Interactive agent REPL |

**Options:** `--json`, `--dimension <dim>`, `--file <path>`, `--agent <name>`, `--operation <op>`, `--limit <N>`, `--root <path>`

**Exit codes:** `0` = clean, `1` = findings, `2` = error

---

## Autonomous Verification

The verification loop that makes AI-generated code safe to ship:

```
  ┌──────────────┐
  │  AI writes   │
  │    code      │
  └──────┬───────┘
         │
         ▼
  ┌──────────────┐     ┌─────────────────────────────────────┐
  │   Ferrum     │────▶│  VerificationResult                 │
  │  analyzes    │     │                                     │
  └──────┬───────┘     │  verdict:  PASS │ WARN │ BLOCK      │
         │             │  diagnostics[]                       │
         ▼             │  suggestedFixes[]                    │
  ┌──────────────┐     │  iteration:  N of max              │
  │  Verdict?    │     │  reAnalysisRequired: bool           │
  └──────┬───────┘     └─────────────────────────────────────┘
         │
    ┌────┼────┐
    │    │    │
    ▼    ▼    ▼
  PASS  WARN  BLOCK
    │    │    │
    │    │    ▼
    │    │  ┌──────────────┐
    │    │  │  AI receives  │
    │    │  │  diagnostics  │
    │    │  └──────┬───────┘
    │    │         │
    │    │         ▼
    │    │  ┌──────────────┐
    │    │  │  AI modifies  │
    │    │  │    code       │
    │    │  └──────┬───────┘
    │    │         │
    │    │         └──────▶ re-analyze (up to maxIterations)
    │    │
    ▼    ▼
  Ship  Ship with
        review
```

The `AutonomousVerifier` implements this as an iterative loop:

```typescript
import { AutonomousVerifier, analyze } from 'ferrum-engine';

const verifier = new AutonomousVerifier({
  requirements: [
    { dimension: 'security',    minScore: 70, blocking: true  },
    { dimension: 'reliability',  minScore: 65, blocking: false },
    { dimension: 'architecture', minScore: 60, blocking: false },
  ],
  maxIterations: 5,
  autoBlockOnCritical: true,
});

// One-shot verification
const analysis = analyze('./my-app');
const result = verifier.verify(analysis);
// result.verdict → 'PASS' | 'WARN' | 'BLOCK'

// Iterative loop (AI agent workflow)
const finalResult = await verifier.iterativeVerify(
  analysis,
  async () => {
    // AI agent applies suggested fixes, then re-analyze
    await applyFixes(result.diagnostics);
    return analyze('./my-app');
  },
  changedFiles,
);
```

---

## Application IR

A **language-independent intermediate representation** that decouples analysis from source language:

```
  TypeScript ──┐
  JavaScript ──┤                    ┌──────────────┐
  Vue SFC   ───┤──▶  IR Builder  ──▶│ Application  │
  JSX/TSX   ───┤    (per-language  │     IR       │
  Svelte    ───┘     adapter)      └──────┬───────┘
                                          │
                           ┌──────────────┼──────────────┐
                           ▼              ▼              ▼
                      queryIR()    computeIRStats()  mergeIR()
```

Every symbol, reference, control-flow edge, and data-flow edge is captured in a portable, serializable, hashable IR. Add a new language by implementing `IRLanguageAdapter` — all 17 engines work immediately.

```typescript
import { buildIR, queryIR, computeIRStats } from 'ferrum-engine';

const ir = buildIR('./my-app', { language: 'typescript' });

// Query for all exported functions
const exportedFns = queryIR(ir, {
  kind: 'function',
  modifiers: ['export'],
});

// Portable stats across languages
const stats = computeIRStats(ir);
// stats.symbols, stats.references, stats.controlFlowEdges, stats.dataFlowEdges
```

---

## Software Time Machine

Temporal querying over your codebase's history:

```typescript
import {
  captureSnapshot,
  findTimeRegressions,
  findFindingIntroductions,
  answerTemporalQuestion,
} from 'ferrum-engine';

// Capture the state of the codebase at a commit
const snapshot = captureSnapshot('./my-app', 'a1b2c3d');

// Find regressions between two points in time
const regressions = findTimeRegressions('./my-app', {
  from: 'v1.0.0',
  to: 'v2.0.0',
});

// When was this finding introduced?
const intro = findFindingIntroductions('./my-app', findingId);

// Natural-language temporal queries
const answer = answerTemporalQuestion(
  './my-app',
  'When did the security score drop below 70?',
);
```

The Time Machine integrates with Git to provide point-in-time analysis snapshots, regression detection, and temporal queries — turning your version control history into a queryable knowledge base.

---

## API Example

```typescript
import {
  analyze,
  doctor,
  impact,
  buildGraph,
  AgentGateway,
  AutonomousVerifier,
  getDependencies,
  getDependents,
  analyzeCodebase,
  queryIntel,
} from 'ferrum-engine';

// ── Full Analysis ─────────────────────────────────────────────
const report = analyze('./my-project');
// report.results     → AnalysisResult[] (one per engine)
// report.scores      → ReliabilityScores (per-dimension + overall)
// report.graph       → ApplicationGraph

// ── Health Check ──────────────────────────────────────────────
const health = doctor('./my-project');
// → "Overall Score: 78/100 (B+) ..."

// ── Change Impact ─────────────────────────────────────────────
const impactResult = impact('./my-project', [
  'src/lib/auth.ts',
  'src/middleware.ts',
]);
// impactResult.affected        → AffectedArea[]
// impactResult.risk            → 'low' | 'medium' | 'high' | 'critical'
// impactResult.securityImplications → string[]

// ── Application Graph ─────────────────────────────────────────
const { graph } = buildGraph('./my-project');
const deps      = getDependencies(graph, 'src/lib/auth.ts');
const dependents = getDependents(graph, 'src/lib/auth.ts');

// ── Codebase Intelligence ─────────────────────────────────────
const intel = analyzeCodebase(graph);
// → Map<nodeId, CodeIntel> with purpose, domain, complexity, health

const authIntel = queryIntel(graph, { domain: 'auth' });
// → CodeIntel[] for all auth-related nodes

// ── Agent Gateway ─────────────────────────────────────────────
const gateway = new AgentGateway({
  requireHumanApproval: true,
  autoBlockThreshold: 'critical',
  maxFilesPerRequest: 20,
});

const response = await gateway.handleRequest({
  requestId: 'req-001',
  agent: { id: 'copilot', type: 'ai-assistant', scopes: ['read', 'analyze'] },
  operation: 'analyze_security',
  params: {},
  timestamp: Date.now(),
}, graph);
// response.allowed → boolean
// response.risk    → RiskLevel
// response.findings → Finding[]
```

---

## Plugin System

Extend Ferrum with custom analyzers, framework adapters, and hooks:

```typescript
import type { FerrumPlugin, FrameworkAdapter, CustomAnalyzer } from 'ferrum-engine';

// Custom analyzer
const myAnalyzer: CustomAnalyzer = {
  id: 'my-domain-rules',
  analyze: (graph) => ({
    category: 'architecture',
    findings: [/* ... */],
  }),
};

// Framework adapter
const solidAdapter: FrameworkAdapter = {
  name: 'solid',
  detect: (pkg) => 'solid-js' in pkg.dependencies,
  resolvers: [/* import/component resolvers */],
};

// Plugin definition
const myPlugin: FerrumPlugin = {
  name: 'ferrum-domain-plugin',
  version: '1.0.0',
  analyzers: [myAnalyzer],
  adapters: [solidAdapter],
  hooks: {
    'before:analyze': (ctx) => { /* ... */ },
    'after:analyze':  (ctx) => { /* ... */ },
  },
};
```

**Built-in adapters:** React, Vue, Svelte, Angular, Lit, Vanilla

---

## Integrations

| Integration | Status | Description |
|-------------|--------|-------------|
| **GitHub Actions** | ✅ | CI/CD gate with `ferrum verify` on PRs |
| **GitLab CI** | ✅ | Pipeline step with quality gates |
| **VS Code** | 🔄 | Extension with inline diagnostics |
| **JetBrains** | 🔄 | Plugin for IntelliJ / WebStorm |
| **Copilot** | ✅ | Agent Gateway integration for AI safety |
| **Cursor** | ✅ | Agent Gateway integration for AI safety |

**GitHub Actions example:**

```yaml
name: Ferrum Gate
on: [pull_request]
jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npx ferrum-engine verify --agent copilot --operation apply_safe_change
      - run: npx ferrum-engine doctor
```

---

## Architecture Principles

### 1. Deterministic Core

All analysis functions are **pure** — no I/O, no network, no randomness. Same input always produces same output. The intelligence engines layer on top of this core; they never bypass it.

```typescript
// Pure function — no side effects
function analyzeArchitecture(graph: ApplicationGraph): AnalysisResult { ... }

// Impure wrapper — composes pure functions with I/O
function analyze(rootPath: string): FullAnalysis {
  const { graph } = buildGraph(rootPath);  // I/O here
  return {
    results: [analyzeArchitecture(graph), ...],  // pure from here
    scores: calculateScores(graph, results),      // pure
  };
}
```

### 2. AI as Intelligence Layer

AI agents interact with Ferrum through the **Agent Gateway** — a capability-based security layer. Agents authenticate with identity + scopes, request operations, and Ferrum validates before allowing changes. The gateway produces a full audit trail.

```
Agent ──▶ Gateway ──▶ Permission Check ──▶ Impact Analysis ──▶ Verdict
                 │                                            │
                 └── Audit Log ◀──────────────────────────────┘
```

### 3. Incremental Everything

Ferrum is designed for continuous operation, not batch runs:
- **Incremental graph updates** — only re-parse changed files
- **Cache-valid re-analysis** — content-hash-based cache invalidation
- **Flight Recorder** — real-time session tracking with anomaly detection
- **Journey Engine** — live user journey analysis

### 4. Privacy First

- All analysis runs **locally** — no data leaves your machine
- No telemetry, no phone-home, no analytics
- Agent audit logs stay in your repository
- Config files are local (`ferrum.config.ts`)

---

## Stats

| Metric | Value |
|--------|-------|
| Engine source files | 49 |
| Lines of TypeScript | ~17,528 |
| Intelligence engines | 17 |
| CLI commands | 17 |
| Engine test files | 31 |
| Total test files | 69 |
| Graph node types | 28 |
| Graph edge types | 19 |
| Framework adapters | 6 (React, Vue, Svelte, Angular, Lit, Vanilla) |
| IR symbol kinds | 12 |
| IR reference kinds | 8 |
| TypeScript | Strict mode (`strict: true`) |

---

## Contributing

We welcome contributions. See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

```bash
# Setup
git clone https://github.com/Roy-Wanyoike/FerrumEngine.git
cd FerrumEngine
npm install

# Development
npm run test          # Run test suite (Vitest)
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
npm run lint          # ESLint
npm run typecheck     # TypeScript strict check
npm run e2e           # Playwright end-to-end
npm run ci            # Full CI pipeline
```

---

## License

[MIT](./LICENSE) — use freely, build confidently.
