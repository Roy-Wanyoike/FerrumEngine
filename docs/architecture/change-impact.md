# Change Impact Analysis — Deep Dive

> FerrumEngine's Change Impact Engine answers the question every developer
> asks before deploying: **"What will this change break?"**

---

## Table of Contents

1. [Overview](#overview)
2. [Tracing Algorithm](#tracing-algorithm)
3. [Risk Classification](#risk-classification)
4. [Impact Categories](#impact-categories)
5. [Verification Recommendations](#verification-recommendations)
6. [Graph Diffing](#graph-diffing)
7. [CI/CD Integration](#cicd-integration)
8. [API Reference](#api-reference)
9. [Examples](#examples)

---

## Overview

The Change Impact Engine takes a set of changed files and traces their
blast radius through the Application Graph. It produces a structured
`ImpactAnalysis` result that includes:

- **Affected nodes** — Every component, page, API, and function that
  depends (directly or transitively) on the changed files
- **Risk classification** — LOW / MEDIUM / HIGH / CRITICAL
- **Affected routes** — Which user-facing URLs may be impacted
- **Affected tests** — Which tests may need updates
- **Affected APIs** — Which API endpoints may have changed behavior
- **Affected user journeys** — Which multi-step flows cross the blast zone
- **Security implications** — Whether the change touches security-sensitive code
- **Verification recommendations** — Concrete steps to verify the change is safe

### The Core Insight

Traditional testing answers "did I break existing tests?" FerrumEngine's
impact analysis answers "what *could* I have broken that I don't have
tests for?" The difference is critical for safety.

---

## Tracing Algorithm

### Step 1: Identify Changed Files

Changed files come from one of three sources:

```bash
# Git staged changes
ferrum impact --git-staged

# Git diff against a branch
ferrum impact --base main

# Explicit file list
ferrum impact src/lib/auth.ts src/hooks/use-user.ts
```

### Step 2: Find Affected Nodes via Reverse Traversal

For each changed file, the engine:

1. Looks up the file's node ID in `graph.byPath`
2. Finds all **incoming edges** (who depends on this file)
3. For each dependent, recursively follows incoming edges (transitive dependents)
4. Records each affected node with its distance from the changed file

```
Changed file: src/lib/auth.ts (node: n_auth)

Distance 1 (direct dependents):
  ├─ src/hooks/use-auth.ts     → imports auth
  ├─ src/lib/api-client.ts    → imports auth
  └─ src/middleware.ts         → imports auth

Distance 2 (transitive dependents):
  ├─ src/hooks/use-user.ts     → imports use-auth
  ├─ src/components/ProtectedRoute.tsx → imports use-auth
  ├─ src/lib/api.ts            → imports api-client
  └─ src/app/api/users/route.ts → imports api-client

Distance 3+:
  ├─ src/app/dashboard/page.tsx → imports ProtectedRoute
  ├─ src/app/settings/page.tsx  → imports use-user
  └─ src/components/UserCard.tsx  → imports use-user
  └─ ... (continues until no new nodes found)
```

### Step 3: Classify Affected Nodes

Each affected node is classified by its `kind`:

- `route` / `page` → added to `affectedRoutes`
- `test` → added to `affectedTests`
- `api` → added to `affectedApis`
- `middleware` / files containing "auth" or "security" → `securityImplications`

### Step 4: Calculate Risk

See [Risk Classification](#risk-classification) below.

### Step 5: Generate Verification Recommendations

See [Verification Recommendations](#verification-recommendations) below.

---

## Risk Classification

FerrumEngine classifies change risk into four levels, each with clear
evidence and criteria.

### Risk Levels

| Level | Criteria | Example Scenario |
|-------|----------|-----------------|
| **LOW** | 1–9 affected nodes, no routes, no security | Changing a utility function used by 3 other utilities |
| **MEDIUM** | 10+ affected nodes, no routes | Refactoring an internal helper used across 15 modules |
| **HIGH** | Any affected routes OR 50+ affected nodes | Changing a shared component used on multiple pages |
| **CRITICAL** | Security-sensitive code OR 10+ affected routes | Changing auth middleware, CSRF protection, or session handling |

### Risk Calculation Algorithm

```typescript
function calculateRisk(
  affected: AffectedArea[],
  affectedRoutes: Set<string>,
  securityImplications: string[],
): RiskLevel {
  // CRITICAL: security-sensitive changes always critical
  if (securityImplications.length > 0) return "critical";

  // CRITICAL: affecting 10+ routes means massive blast radius
  if (affectedRoutes.size >= 10) return "critical";

  // HIGH: 5+ routes or 50+ nodes
  if (affectedRoutes.size >= 5 || affected.length >= 50) return "high";

  // HIGH: any route at all (user-facing impact)
  if (affectedRoutes.size >= 1) return "high";

  // MEDIUM: 10+ nodes affected
  if (affected.length >= 10) return "medium";

  // LOW: everything else
  return "low";
}
```

### Security Sensitivity Detection

Files and paths containing these patterns are automatically flagged as
security-sensitive:

```typescript
const SECURITY_PATTERNS = [
  'auth',      // Authentication/authorization
  'middleware', // Request interception
  'security',  // Security utilities
  'csrf',      // CSRF protection
  'session',   // Session management
  'token',     // Token handling
  'permission', // Permission checks
  'role',      // Role-based access
  'password',  // Password handling
  'encrypt',   // Encryption
  'jwt',       // JWT tokens
  'oauth',     // OAuth flows
  'cookie',    // Cookie management
  'cors',      // CORS configuration
  'rate-limit', // Rate limiting
];
```

Any change to files matching these patterns triggers at least a HIGH risk
classification, with CRITICAL if combined with wide blast radius.

---

## Impact Categories

### Route Impact

Identifies which user-facing URLs are affected by the change. This is
critical for QA: it tells you exactly which pages to manually test.

```json
{
  "affectedRoutes": [
    "/dashboard",
    "/dashboard/settings",
    "/settings",
    "/profile"
  ]
}
```

Route detection works by:
1. Finding all `route`/`page` nodes in the affected set
2. Reading the `meta.route` property (e.g., `"/dashboard"`)
3. Collecting unique route paths

### Test Impact

Identifies which test files may need updates. Tests are linked to source
files via `test-of` edges.

```json
{
  "affectedTests": [
    "__tests__/hooks/use-auth.test.ts",
    "__tests__/components/ProtectedRoute.test.tsx"
  ]
}
```

### API Impact

Identifies which API endpoints may have changed behavior.

```json
{
  "affectedApis": [
    "src/app/api/users/route.ts",
    "src/app/api/auth/route.ts"
  ]
}
```

### Journey Impact

When user journey mapping is available (via `engine/journey`), identifies
which multi-step user flows cross the blast zone.

```json
{
  "affectedJourneys": [
    "login-flow",
    "dashboard-navigation",
    "profile-update"
  ]
}
```

### Security Impact

Identifies security implications of the change.

```json
{
  "securityImplications": [
    "src/lib/auth.ts — security-sensitive module changed",
    "src/middleware.ts — security-sensitive module affected"
  ]
}
```

### Performance Impact

Estimates the performance implications of the change.

```json
{
  "performanceImpact": {
    "estimatedSizeChange": "+2.3KB gzip",
    "affectedBundles": [
      "app/dashboard/page.js",
      "app/settings/page.js"
    ]
  }
}
```

---

## Verification Recommendations

The engine generates concrete, actionable verification steps based on the
impact analysis. These recommendations are ordered by priority.

### Security Verification

Triggered when security implications are detected:

```
⚠️  Run security audit — authentication/authorization flows may be affected
⚠️  Verify CSRF protection is intact
⚠️  Test with different user roles/permissions
```

### Route Verification

Triggered when user-facing routes are affected:

```
🌐  Manually test 4 affected route(s): /dashboard, /dashboard/settings, /settings, /profile
```

### API Verification

Triggered when API endpoints are affected:

```
🔌  Verify 2 affected API endpoint(s): src/app/api/users/route.ts, src/app/api/auth/route.ts
```

### Test Coverage Gaps

Triggered when affected components lack dedicated tests:

```
🧪  3 affected component(s) may lack dedicated tests
```

### Blast Radius Warnings

Triggered when the change affects too many nodes:

```
💥  High blast radius — consider breaking this into smaller, focused changes
```

### Default Recommendation

When no specific risks are detected:

```
✅  Run existing test suite to verify no regressions
```

---

## Graph Diffing

For CI/CD pipelines that cache the graph between builds, FerrumEngine
provides `diffGraphs()` to compare two graph snapshots.

```typescript
interface GraphDiff {
  addedNodes: GraphNode[];     // New files/symbols
  removedNodes: GraphNode[];  // Deleted files/symbols
  modifiedNodes: GraphNode[]; // Changed files (different content hash)
  newEdges: number;           // Net new edges
  removedEdges: number;       // Net removed edges
}
```

### Usage

```typescript
import { buildGraph, diffGraphs } from '@/engine';

// Load previous graph from cache
const previousGraph = loadGraph('.ferrum/graph-cache.json');

// Build current graph
const { graph: currentGraph } = buildGraph('/project');

// Diff
const diff = diffGraphs(previousGraph, currentGraph);

console.log(`Added: ${diff.addedNodes.length} nodes`);
console.log(`Removed: ${diff.removedNodes.length} nodes`);
console.log(`Modified: ${diff.modifiedNodes.length} nodes`);

// Use modified nodes as input for impact analysis
const changedPaths = diff.modifiedNodes
  .filter(n => n.kind === 'file')
  .map(n => n.path);

const impact = analyzeImpact(currentGraph, changedPaths);
```

### Change Classification Logic

```typescript
function diffGraphs(before, after): GraphDiff {
  const addedNodes = [];
  const removedNodes = [];
  const modifiedNodes = [];

  // Check after's nodes against before
  for (const [id, node] of after.nodes) {
    const beforeNode = before.nodes.get(id);
    if (!beforeNode) {
      addedNodes.push(node);           // New node
    } else if (beforeNode.contentHash !== node.contentHash) {
      modifiedNodes.push(node);         // Changed content
    }
  }

  // Check for removed nodes
  for (const [id, node] of before.nodes) {
    if (!after.nodes.has(id)) {
      removedNodes.push(node);          // Deleted node
    }
  }

  return {
    addedNodes,
    removedNodes,
    modifiedNodes,
    newEdges: Math.max(0, after.edges.size - before.edges.size),
    removedEdges: Math.max(0, before.edges.size - after.edges.size),
  };
}
```

---

## CI/CD Integration

### GitHub Actions

```yaml
name: Ferrum Impact Check
on: [pull_request]

jobs:
  impact:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Need full history for diff

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - run: npm install -g @ferrum/cli

      - name: Analyze changed files
        run: |
          # Get changed files between base and PR
          CHANGED=$(git diff --name-only origin/main...HEAD | grep -E '\.(ts|tsx|js|jsx)$')

          if [ -n "$CHANGED" ]; then
            ferrum impact $CHANGED --format json --output impact.json

            # Fail if CRITICAL risk
            RISK=$(jq -r '.risk' impact.json)
            if [ "$RISK" = "critical" ]; then
              echo "## ⛔ CRITICAL Impact Detected" >> $GITHUB_STEP_SUMMARY
              jq '.summary' impact.json >> $GITHUB_STEP_SUMMARY
              echo "" >> $GITHUB_STEP_SUMMARY
              echo "### Affected Routes" >> $GITHUB_STEP_SUMMARY
              jq -r '.affectedRoutes[]' impact.json >> $GITHUB_STEP_SUMMARY
              exit 1
            fi

            # Always post summary
            echo "## Ferrum Impact Analysis" >> $GITHUB_STEP_SUMMARY
            jq '.' impact.json >> $GITHUB_STEP_SUMMARY
          fi
```

### GitLab CI

```yaml
ferrum-impact:
  stage: test
  image: node:20
  before_script:
    - npm install -g @ferrum/cli
  script:
    - |
      CHANGED=$(git diff --name-only $CI_MERGE_REQUEST_DIFF_BASE_SHA...HEAD |
               grep -E '\.(ts|tsx|js|jsx)$')
      if [ -n "$CHANGED" ]; then
        ferrum impact $CHANGED --format json --output impact.json
        RISK=$(jq -r '.risk' impact.json)
        if [ "$RISK" = "critical" ]; then
          echo "CRITICAL impact detected. Review required."
          exit 1
        fi
      fi
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
```

### Pre-commit Hook

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/ferrum/pre-commit
    hooks:
      - id: ferrum-impact
        args: [--git-staged, --severity, high]
```

### Integration with SARIF

FerrumEngine can output impact analysis as SARIF for integration with
GitHub Code Scanning:

```bash
ferrum impact --git-staged --format sarif --output ferrum.sarif
```

---

## API Reference

### `analyzeImpact(graph, changedFiles, options?)`

The primary function for change impact analysis.

```typescript
import { buildGraph, analyzeImpact } from '@/engine';

const { graph } = buildGraph('/path/to/project');
const result = analyzeImpact(graph, [
  'src/lib/auth.ts',
  'src/hooks/use-user.ts',
]);

console.log(result.risk);           // "high"
console.log(result.summary);        // "Modified 2 file(s). affects 12 component(s)..."
console.log(result.affectedRoutes); // ["/dashboard", "/settings"]
console.log(result.recommendedVerification);
// ["Manually test 2 affected route(s): /dashboard, /settings",
//  "2 affected component(s) may lack dedicated tests"]
```

### `ImpactOptions`

```typescript
interface ImpactOptions {
  maxDepth?: number;     // Max transitive depth (default: 10)
  transitive?: boolean;  // Include transitive dependents (default: true)
}
```

### `ImpactAnalysis`

```typescript
interface ImpactAnalysis {
  changedFiles: string[];          // Input: which files changed
  risk: RiskLevel;                  // LOW | MEDIUM | HIGH | CRITICAL
  affected: AffectedArea[];        // All affected nodes with distance
  affectedRoutes: string[];        // Affected user-facing URLs
  affectedTests: string[];         // Affected test files
  affectedApis: string[];          // Affected API endpoints
  affectedJourneys: string[];      // Affected user journeys
  securityImplications: string[];  // Security-sensitive impacts
  performanceImpact?: {
    estimatedSizeChange: string;   // e.g., "+2.3KB gzip"
    affectedBundles: string[];     // e.g., ["app/page.js"]
  };
  recommendedVerification: string[];  // Actionable verification steps
  summary: string;                 // Human-readable summary
}
```

### `AffectedArea`

```typescript
interface AffectedArea {
  nodeId: FerrumId;    // Affected node's ID
  name: string;        // Human-readable name
  kind: NodeKind;      // Node type (component, page, etc.)
  path: string;        // File path
  impact: string;      // Description of how it's affected
  distance: number;    // 1 = direct, 2 = transitive, etc.
}
```

---

## Examples

### Example 1: Single Utility Change

```typescript
const result = analyzeImpact(graph, ['src/lib/format-date.ts']);

// Result:
// {
//   risk: "low",
//   affected: [
//     { name: "OrderHistory", kind: "component", distance: 1 },
//     { name: "UserProfile", kind: "component", distance: 1 },
//     { name: "ActivityFeed", kind: "component", distance: 2 },
//   ],
//   affectedRoutes: [],
//   affectedTests: ["__tests__/format-date.test.ts"],
//   summary: "Modified 1 file(s). affects 3 component(s). Risk: LOW."
// }
```

### Example 2: Auth Library Change

```typescript
const result = analyzeImpact(graph, ['src/lib/auth.ts']);

// Result:
// {
//   risk: "critical",
//   affected: [
//     { name: "useAuth", kind: "hook", distance: 1 },
//     { name: "useUser", kind: "hook", distance: 2 },
//     { name: "ProtectedRoute", kind: "component", distance: 2 },
//     { name: "DashboardPage", kind: "page", distance: 3 },
//     { name: "SettingsPage", kind: "page", distance: 3 },
//     { name: "ProfilePage", kind: "page", distance: 3 },
//     ...42 more nodes
//   ],
//   affectedRoutes: ["/dashboard", "/settings", "/profile", "/admin"],
//   securityImplications: [
//     "src/lib/auth.ts — security-sensitive module changed"
//   ],
//   recommendedVerification: [
//     "Run security audit — authentication/authorization flows may be affected",
//     "Verify CSRF protection is intact",
//     "Test with different user roles/permissions",
//     "Manually test 4 affected route(s): /dashboard, /settings, /profile, /admin"
//   ]
// }
```

### Example 3: Shared Component Change

```typescript
const result = analyzeImpact(graph, ['src/components/ui/Button.tsx']);

// Result:
// {
//   risk: "high",
//   affected: [
//     { name: "Dialog", kind: "component", distance: 1 },
//     { name: "Form", kind: "component", distance: 1 },
//     { name: "Navbar", kind: "component", distance: 1 },
//     { name: "CheckoutPage", kind: "page", distance: 2 },
//     { name: "LoginPage", kind: "page", distance: 2 },
//     ...28 more nodes
//   ],
//   affectedRoutes: ["/checkout", "/login", "/signup"],
//   affectedTests: ["__tests__/components/Button.test.tsx"],
//   summary: "Modified 1 file(s). affects 31 component(s). affects 3 route(s). 1 test(s) may need updates. Risk: HIGH."
// }
```

---

*This document describes the Change Impact Engine as implemented in
`src/engine/impact/impact.ts`.*
