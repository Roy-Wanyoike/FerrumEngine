# Frontend Reliability Scoring Engine — Deep Dive

> FerrumEngine's Reliability Scoring Engine produces evidence-based,
> traceable quality scores. Every point deduction is backed by a specific
> finding with file path and line number. No vanity metrics.

---

## Table of Contents

1. [Philosophy](#philosophy)
2. [The 7 Scoring Dimensions](#the-7-scoring-dimensions)
3. [Evidence-Based Scoring](#evidence-based-scoring)
4. [Letter Grade System](#letter-grade-system)
5. [Scoring Algorithm](#scoring-algorithm)
6. [Dimension Weights](#dimension-weights)
7. [Comparison with Lighthouse](#comparison-with-lighthouse)
8. [CLI Output](#cli-output)
9. [API Reference](#api-reference)
10. [Configuration](#configuration)
11. [Integration Examples](#integration-examples)

---

## Philosophy

### The Problem with Current Scoring

Existing quality scores suffer from fundamental issues:

| Problem | Example |
|---------|--------|
| **Vanity metrics** | "99% test coverage" — but only testing getters and setters |
| **No traceability** | "Performance: 85/100" — but *why* did you lose 15 points? |
| **Runtime-only** | Lighthouse scores a deployed page, not the code that produced it |
| **Framework-locked** | React DevTools only work with React |
| **No aggregate view** | ESLint has 1000+ rules but no unified score |

### Ferrum's Approach

1. **Evidence-based** — Every score deduction traces to a `Finding` with
   file path, line number, and explanation
2. **Code-level** — Scores are computed from static analysis of source code,
   not from runtime browser metrics
3. **Framework-agnostic** — Works with React, Vue, Svelte, Angular, or any
   JS/TS project
4. **Multi-dimensional** — 7 independent dimensions, each with its own
   grade, plus a weighted overall score
5. **Deterministic** — Same code always produces the same score

### The Evidence Chain

```
Score 72/100 (C)
  │
  ├─ ↓ 15 pts  [MEDIUM] Circular dependency: utils ↔ helpers
  │              Evidence: Cycle: utils.ts → helpers.ts → formatters.ts → utils.ts
  │              File: src/lib/utils.ts:1
  │              Rule: arch/no-circular-deps
  │              Suggestion: Break the cycle by extracting shared deps
  │
  ├─ ↓ 8 pts   [MEDIUM] Architectural violation: components/ → pages/
  │              Evidence: Button.tsx imports DashboardPage
  │              File: src/components/Button.tsx:12
  │              Rule: arch/layer-violation
  │
  └─ ↓ 5 pts   [LOW] Oversized file: UserProfile.tsx (620 lines)
                 Evidence: 620 lines (threshold: 500)
                 File: src/components/UserProfile.tsx:500
                 Rule: arch/file-size
```

Every deduction in the chain is a real finding from the analysis engine.
There is no "opinion" in the score — only data.

---

## The 7 Scoring Dimensions

FerrumEngine scores applications across 7 dimensions. Each dimension
produces an independent score (0–100) and letter grade (A–F).

### 1. Architecture (weight: 15%)

Measures the structural health of the codebase.

| Aspect | What It Detects | Penalty |
|--------|----------------|----------|
| Circular dependencies | A imports B imports A | Medium (8 pts) per cycle |
| Excessive coupling | Module with 15+ dependents | Medium (8 pts) per hotspot |
| Layer violations | Components importing from pages | Medium (8 pts) per violation |
| Oversized modules | Files exceeding 500 lines | Low (3 pts) – High (15 pts) by size |
| Dead code | Exported symbols with no importers | Low (3 pts) per symbol |
| Duplicated abstractions | Same name in multiple directories | Low (3 pts) per duplicate |

**Architecture rules:**
- `arch/no-circular-deps`
- `arch/excessive-coupling`
- `arch/layer-violation`
- `arch/file-size`
- `arch/dead-code`
- `arch/duplicated-abstraction`

### 2. Performance (weight: 15%)

Measures code-level performance characteristics.

| Aspect | What It Detects | Penalty |
|--------|----------------|----------|
| Bundle size risks | Large imports, missing lazy loading | Medium (8 pts) |
| Render cycle potential | Components that read+write same state | High (15 pts) |
| Re-render patterns | Components with many props, no memo | Medium (8 pts) |
| Heavy dependencies | Dependencies >100KB uncompressed | Low (3 pts) per dep |
| Synchronous imports | No code splitting for route-level imports | Medium (8 pts) |

**Performance rules:** (planned)
- `perf/no-sync-route-imports`
- `perf/lazy-load-heavy-deps`
- `perf/no-render-cycles`
- `perf/reduce-re-renders`
- `perf/bundle-size-threshold`

### 3. Security (weight: 20%)

Measures code-level security characteristics.

| Aspect | What It Detects | Penalty |
|--------|----------------|----------|
| Auth flow issues | Missing auth checks on routes | Critical (30 pts) |
| CSRF risks | Mutating endpoints without CSRF tokens | Critical (30 pts) |
| XSS patterns | Dangerous innerHTML usage | High (15 pts) |
| Secret leakage | Hardcoded tokens, API keys | Critical (30 pts) |
| Dependency vulnerabilities | Known CVEs in dependencies | High (15 pts) per CVE |
| Insecure fetches | HTTP (not HTTPS) API calls | High (15 pts) |

**Security rules:** (planned)
- `security/auth-required`
- `security/csrf-protection`
- `security/no-dangerous-html`
- `security/no-hardcoded-secrets`
- `security/https-only`
- `security/dependency-vulnerabilities`

### 4. Reliability (weight: 15%)

Measures code resilience and error handling.

| Aspect | What It Detects | Penalty |
|--------|----------------|----------|
| Missing error boundaries | Pages without error handling | High (15 pts) per page |
| Missing loading states | Async components without loading UI | Medium (8 pts) |
| No offline support | No service worker or fallback | Low (3 pts) |
| Unhandled promise rejections | Missing catch blocks | Medium (8 pts) |
| Missing retry logic | Critical API calls without retry | Low (3 pts) |
| No graceful degradation | App crashes on feature failure | High (15 pts) |

**Reliability rules:** (planned)
- `reliability/error-boundary-required`
- `reliability/loading-state-required`
- `reliability/handle-promise-rejections`
- `reliability/retry-critical-calls`
- `reliability/graceful-degradation`

### 5. Testing (weight: 15%)

Measures test coverage and quality.

| Aspect | What It Detects | Penalty |
|--------|----------------|----------|
| Untested components | Components with no test files | Medium (8 pts) per component |
| Untested critical paths | Auth, payment flows without tests | High (15 pts) per path |
| Untested hooks | Custom hooks with no tests | Medium (8 pts) per hook |
| Weak test assertions | Tests with only `.toBeInTheDocument()` | Low (3 pts) per test |
| Missing edge case tests | No error state tests | Low (3 pts) |
| No journey tests | Multi-step flows without integration tests | Medium (8 pts) per journey |

**Testing rules:** (planned)
- `testing/component-test-required`
- `testing/critical-path-coverage`
- `testing/hook-test-required`
- `testing/meaningful-assertions`
- `testing/journey-test-required`

### 6. Accessibility (weight: 10%)

Measures accessibility patterns in code.

| Aspect | What It Detects | Penalty |
|--------|----------------|----------|
| Missing ARIA labels | Interactive elements without labels | Medium (8 pts) |
| Missing keyboard handlers | Click handlers without keyboard support | Medium (8 pts) |
| Missing alt text | Images without alt attributes | Low (3 pts) |
| Missing form labels | Inputs without associated labels | Medium (8 pts) |
| Heading hierarchy | Skipped heading levels | Low (3 pts) |
| Focus management | Modals without focus trap | Medium (8 pts) |

**Accessibility rules:** (planned)
- `a11y/aria-label-required`
- `a11y/keyboard-support`
- `a11y/alt-text-required`
- `a11y/form-label-required`
- `a11y/heading-hierarchy`
- `a11y/focus-management`

### 7. Dependencies (weight: 10%)

Measures dependency health.

| Aspect | What It Detects | Penalty |
|--------|----------------|----------|
| Outdated dependencies | Major version behind | Low (3 pts) per dep |
| Duplicate dependencies | Same package at different versions | Medium (8 pts) per dup |
| Unnecessary dependencies | Imported but never used | Low (3 pts) per dep |
| Heavy dependencies | Dependencies >500KB | Medium (8 pts) per dep |
| Abandoned packages | No updates in 2+ years | Low (3 pts) per dep |
| License conflicts | Non-permissive licenses | High (15 pts) per conflict |

**Dependency rules:** (planned)
- `deps/no-outdated`
- `deps/no-duplicates`
- `deps/no-unused`
- `deps/size-threshold`
- `deps/no-abandoned`
- `deps/license-check`

---

## Evidence-Based Scoring

### The Evidence Chain

Every score deduction is backed by an `Evidence` object:

```typescript
interface Evidence {
  description: string;      // Human-readable explanation
  filePath?: string;        // Where the issue is
  line?: number;            // Line number
  nodeIds?: FerrumId[];     // Affected graph nodes
  data?: unknown;           // Raw data (metric value, etc.)
}
```

### The Finding

Findings are produced by analyzers and consumed by the scorer:

```typescript
interface Finding {
  id: FerrumId;             // Unique, deterministic
  category: AnalysisCategory; // Which dimension
  severity: Severity;       // info | low | medium | high | critical
  title: string;            // Short title
  description: string;      // Detailed explanation
  evidence: Evidence[];     // Traceable evidence
  affectedNodes: FerrumId[]; // Graph nodes involved
  suggestion?: string;      // How to fix it
  ruleId?: string;          // Which rule produced this
}
```

### Severity Penalties

| Severity | Points Deducted | Example |
|----------|----------------|----------|
| `info` | 0 | Documentation note |
| `low` | 3 | Minor style issue, small dead code |
| `medium` | 8 | Layer violation, missing test |
| `high` | 15 | Missing error boundary, XSS pattern |
| `critical` | 30 | Auth bypass, secret leakage, circular deps in auth |

These penalties are configurable per-project.

### Score Calculation Per Dimension

```
Dimension Score = 100 − Σ(penalty(severity) for each finding in dimension)
Score = clamp(score, 0, 100)
```

Example: Architecture dimension with findings:

| Finding | Severity | Penalty |
|---------|----------|----------|
| Circular dependency | MEDIUM | -8 |
| Layer violation | MEDIUM | -8 |
| Oversized file | LOW | -3 |
| Dead code (x3) | LOW | -9 |
| **Total deductions** | | **-28** |
| **Architecture Score** | | **72/100** |
| **Grade** | | **C** |

---

## Letter Grade System

| Grade | Score Range | Meaning |
|-------|------------|----------|
| **A** | 90–100 | Excellent. Well-architected, well-tested, production-ready. |
| **B** | 80–89 | Good. Minor improvements possible. Solid codebase. |
| **C** | 65–79 | Acceptable. Has issues that should be addressed. Not a crisis. |
| **D** | 50–64 | Needs improvement. Significant issues that increase risk. |
| **F** | 0–49 | Failing. Critical issues that pose immediate risk. |

### Grade Boundaries Rationale

- **90+ for A** — Requires near-perfect scores. Even 2 medium findings (16 pts) drops below 90.
- **80+ for B** — Allows for several small issues. A realistic target for most projects.
- **65+ for C** — The "minimum viable" threshold. Below this, you have systemic issues.
- **50+ for D** — Warning territory. Significant architectural or security problems.
- **Below 50** — Action required. The codebase is actively risky.

---

## Scoring Algorithm

### Per-Dimension Scoring

```typescript
function scoreDimension(category, findings, base = 100): ScoreDimension {
  let score = base;

  for (const finding of findings) {
    score -= SEVERITY_PENALTY[finding.severity];
  }

  score = Math.max(0, Math.min(100, score));

  return {
    category,
    score,
    grade: scoreToGrade(score),
    evidence: findings.map(f => ({
      description: `[${f.severity.toUpperCase()}] ${f.title}: ${f.description}`,
      filePath: f.evidence[0]?.filePath,
      line: f.evidence[0]?.line,
      nodeIds: f.affectedNodes,
    })),
    findings,
  };
}
```

### Overall Weighted Score

```typescript
function calculateOverall(dimensions, weights): number {
  let weightedSum = 0;
  let totalWeight = 0;

  for (const dim of dimensions) {
    const w = weights[dim.category] ?? 0;
    weightedSum += dim.score * w;
    totalWeight += w;
  }

  return totalWeight > 0
    ? Math.round(weightedSum / totalWeight)
    : 0;
}
```

### Example Calculation

| Dimension | Score | Weight | Weighted |
|-----------|-------|--------|----------|
| Architecture | 72 | 0.15 | 10.8 |
| Performance | 88 | 0.15 | 13.2 |
| Security | 91 | 0.20 | 18.2 |
| Reliability | 67 | 0.15 | 10.05 |
| Testing | 45 | 0.15 | 6.75 |
| Accessibility | 97 | 0.10 | 9.7 |
| Dependencies | 89 | 0.10 | 8.9 |
| **Total** | | **1.00** | **77.6 → 78** |

**Overall: 78/100 (B)**

---

## Dimension Weights

### Default Weights

| Dimension | Default Weight | Rationale |
|-----------|---------------|-----------|
| Security | 20% | Highest weight — security issues have the most severe consequences |
| Architecture | 15% | Structural health affects all other dimensions |
| Performance | 15% | User-facing impact, but can be optimized incrementally |
| Reliability | 15% | Error handling and resilience are critical for production |
| Testing | 15% | Tests are the safety net that prevents regressions |
| Accessibility | 10% | Important but often compliance-driven, not architecture-driven |
| Dependencies | 10% | Dependency issues are usually easy to fix |

### Custom Weights

Weights are configurable in `ferrum.config.ts`:

```typescript
// ferrum.config.ts
export default {
  scoringWeights: {
    security: 0.25,    // Increase security weight
    testing: 0.20,     // Increase testing weight
    accessibility: 0.05, // Reduce accessibility weight
  },
};
```

### Policy Thresholds

You can set minimum score thresholds that block CI/CD:

```typescript
// ferrum.config.ts
export default {
  policies: [
    { category: "security", minScore: 80, action: "block" },
    { category: "architecture", minScore: 60, action: "warn" },
    { category: "testing", minScore: 50, action: "warn" },
  ],
};
```

---

## Comparison with Lighthouse

FerrumEngine and Lighthouse measure fundamentally different things.

| Aspect | Lighthouse | FerrumEngine |
|--------|-----------|--------------|
| **When** | Runtime (browser) | Build time (static) |
| **What** | Rendered page metrics | Source code structure |
| **Scope** | Single page at a time | Entire application |
| **Metrics** | FCP, LCP, CLS, TTI, TBT | Architecture, coupling, coverage, security |
| **AI agents** | Cannot consume | Structured API for agents |
| **Change impact** | Cannot predict | Full blast radius analysis |
| **Framework** | Framework-aware | Framework-agnostic |
| **Deterministic** | Varies per run | Same code = same score |
| **Speed** | 10–60 seconds per page | <5 seconds for entire project |

### Complementary, Not Competing

FerrumEngine and Lighthouse are complementary:

- **Lighthouse** tells you: "Your page loads in 3.2s and has poor CLS"
- **FerrumEngine** tells you: "Your Button component is imported by 47 modules, 
  has no tests, and its parent page lacks an error boundary"

Lighthouse measures the *symptom*. FerrumEngine identifies the *cause*.

---

## CLI Output

### Human-Readable Report

```
  FERRUM RELIABILITY REPORT
  ─────────────────────────────────

  Overall: 78/100 (B)

  architecture      ████████████████░░░░  72/100 (C)
    ↓ 15 pts  Circular dependency: utils ↔ helpers
    ↓ 8 pts   Architectural violation: components/ → pages/
    ↓ 3 pts   Oversized file: UserProfile.tsx (620 lines)
    ... and 3 more

  performance       █████████████████░░░  88/100 (B)

  security          ██████████████████░░  91/100 (A)

  reliability       ███████████████░░░░░  67/100 (C)
    ↓ 15 pts  Missing error boundary on DashboardPage
    ↓ 8 pts   Missing loading state on SettingsPage
    ↓ 8 pts   Unhandled promise rejection in api-client.ts
    ... and 2 more

  testing           ██████████░░░░░░░░░░░  45/100 (D)
    ↓ 15 pts  Untested critical path: auth flow
    ↓ 8 pts   Untested component: DashboardPage
    ↓ 8 pts   Untested hook: useAuth
    ... and 7 more

  accessibility     ████████████████████  97/100 (A)

  dependencies      ██████████████████░░  89/100 (B)

  ─────────────────────────────────
```

### Score Bar Visualization

Each dimension displays a 20-character progress bar:

```
Score: 72/100 → 14 filled, 6 empty
██████████████░░░░
```

### JSON Output

```bash
ferrum analyze --format json
```

```json
{
  "rootPath": "/home/user/project",
  "totalDurationMs": 3247,
  "scores": {
    "overall": 78,
    "grade": "B",
    "calculatedAt": 1700000000000,
    "dimensions": [
      {
        "category": "architecture",
        "score": 72,
        "grade": "C",
        "findings": [
          {
            "id": "n_abc:cycle:...",
            "severity": "medium",
            "title": "Circular dependency: utils ↔ helpers",
            "description": "A circular dependency exists between 3 modules...",
            "evidence": [{
              "description": "Cycle: utils.ts → helpers.ts → formatters.ts → utils.ts",
              "filePath": "src/lib/utils.ts",
              "line": 1
            }],
            "ruleId": "arch/no-circular-deps",
            "suggestion": "Break the cycle by extracting the shared dependency..."
          }
        ]
      }
    ]
  }
}
```

---

## API Reference

### `calculateScores(graph, results, options?)`

Calculates reliability scores from analysis results.

```typescript
import { buildGraph, analyzeArchitecture, calculateScores } from '@/engine';

const { graph } = buildGraph('/path/to/project');
const archResult = analyzeArchitecture(graph);

const scores = calculateScores(graph, [archResult]);
console.log(scores.overall);  // 72
console.log(scores.grade);    // "C"
console.log(scores.dimensions); // ScoreDimension[]
```

### `formatScoreReport(scores)`

Formats scores as a human-readable string for CLI output.

```typescript
const report = formatScoreReport(scores);
console.log(report);
// Outputs the formatted report shown above
```

### `scoreToGrade(score)`

Converts a numeric score to a letter grade.

```typescript
scoreToGrade(95);  // "A"
scoreToGrade(82);  // "B"
scoreToGrade(71);  // "C"
scoreToGrade(55);  // "D"
scoreToGrade(30);  // "F"
```

### `ScoringOptions`

```typescript
interface ScoringOptions {
  weights?: Partial<Record<AnalysisCategory, number>>;
  baseScore?: number;  // Default: 100 (for testing)
}
```

---

## Configuration

### ferrum.config.ts

```typescript
import { defineConfig } from 'ferrum-engine';

export default defineConfig({
  // Project metadata
  name: 'my-app',

  // Source directories to analyze
  srcDirs: ['src', 'app', 'lib', 'components'],

  // Files to exclude
  exclude: ['generated/**', 'stories/**'],

  // Framework override
  framework: 'nextjs',

  // Scoring weights
  scoringWeights: {
    security: 0.25,
    testing: 0.20,
  },

  // Policy thresholds for CI/CD
  policies: [
    { category: 'security', minScore: 80, action: 'block' },
    { category: 'architecture', minScore: 60, action: 'warn' },
  ],

  // Plugin configuration
  plugins: [
    { name: 'ferrum-plugin-react', enabled: true },
    { name: 'ferrum-plugin-nextjs', enabled: true, options: { appDir: true } },
  ],
});
```

---

## Integration Examples

### CI/CD Quality Gate

```yaml
# .github/workflows/ferrum.yml
name: Ferrum Quality Gate

on: [push, pull_request]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm install -g @ferrum/cli

      - name: Run analysis
        run: ferrum analyze --format json --output report.json

      - name: Check thresholds
        run: |
          OVERALL=$(jq -r '.scores.overall' report.json)
          SECURITY=$(jq -r '.scores.dimensions[] | select(.category=="security") | .score' report.json)

          if [ "$SECURITY" -lt 80 ]; then
            echo "::error::Security score $SECURITY below threshold 80"
            exit 1
          fi

          if [ "$OVERALL" -lt 60 ]; then
            echo "::warning::Overall score $OVERALL below 60"
          fi

          # Post summary
          echo "## Ferrum Reliability Report" >> $GITHUB_STEP_SUMMARY
          echo "**Overall:** $OVERALL/100" >> $GITHUB_STEP_SUMMARY
          jq -r '.scores.dimensions[] | "- \(.category): \(.score)/100 (\(.grade))"' report.json >> $GITHUB_STEP_SUMMARY

      - name: Upload SARIF
        if: always()
        uses: github/codeql-action/upload-sarif@v3
        with:
          sarif_file: ferrum.sarif
```

### Git Hook (Quality Before Commit)

```bash
# .husky/pre-commit
ferrum doctor --severity high
if [ $? -ne 0 ]; then
  echo ""
  echo "  ⚠️  Ferrum detected issues. Commit anyway? (y/N)"
  read -r answer
  if [ "$answer" != "y" ]; then
    exit 1
  fi
fi
```

### Dashboard Integration

```typescript
// Weekly score tracking for a dashboard
import { analyze } from '@/engine';

const report = analyze(process.cwd());

await db.insert('quality_snapshots', {
  timestamp: new Date(),
  overall: report.scores.overall,
  grade: report.scores.grade,
  dimensions: report.scores.dimensions.map(d => ({
    category: d.category,
    score: d.score,
    grade: d.grade,
    findingCount: d.findings.length,
  })),
});
```

---

*This document describes the Reliability Scoring Engine as implemented in
`src/engine/scoring/scoring.ts`.*
