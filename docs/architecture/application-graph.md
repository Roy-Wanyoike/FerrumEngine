# Ferrum Application Graph — Deep Dive

> The Application Graph is the foundational data structure of FerrumEngine.
> Every analysis, score, impact assessment, and agent verification query
> operates against this graph. Understanding it is essential for building
> analyzers, adapters, and integrations.

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Node Types (22 Kinds)](#node-types-22-kinds)
3. [Edge Types (18 Kinds)](#edge-types-18-kinds)
4. [Graph Data Structure](#graph-data-structure)
5. [Adjacency Indexes](#adjacency-indexes)
6. [Graph Operations](#graph-operations)
7. [Serialization & Caching](#serialization--caching)
8. [Framework Adapters](#framework-adapters)
9. [ID Generation](#id-generation)
10. [Content Hashing](#content-hashing)

---

## Design Philosophy

The Application Graph is a **directed, labeled, attributed multigraph**.

- **Directed** — edges have a source and target; A→B is not the same as B→A
- **Labeled** — every edge has a `kind` (imports, calls, renders, etc.)
- **Attributed** — both nodes and edges carry metadata (`meta: Record<string, unknown>`)
- **Multi** — multiple edges can exist between the same two nodes (e.g., A imports B and also calls B)

The graph models **static, build-time relationships** between code artifacts.
Runtime relationships (actual render trees, live state flows) are captured by
the Flight Recorder module.

### Why Not Use an AST?

FerrumEngine uses regex-based parsing rather than full AST parsing. This is
a deliberate trade-off:

| Aspect | AST (e.g., ts-morph) | Regex (Ferrum) |
|--------|----------------------|----------------|
| Accuracy | 100% syntactically correct | ~95% for common patterns |
| Speed | 50–200ms per file | 1–5ms per file |
| Dependencies | 50MB+ (TypeScript compiler) | 0 bytes |
| Portability | Node.js only | Any JS runtime |
| Framework lock-in | TypeScript version | None |

For the kinds of analysis FerrumEngine performs (dependency tracing, coupling
measurement, cycle detection), ~95% accuracy on import/export extraction is
sufficient. The speed and dependency-free benefits far outweigh the marginal
gain from full AST parsing.

---

## Node Types (22 Kinds)

Every node in the Ferrum Application Graph has a `kind` from the `NodeKind`
union type. These 22 types cover the full spectrum of frontend application
artifacts.

### Structural Nodes

| NodeKind | Description | Example | Key Metadata |
|----------|-------------|---------|---------------|
| `repository` | The root repository | N/A (virtual) | `url`, `branch` |
| `application` | A deployable application | Next.js app, Vue app | `framework`, `version` |
| `service` | A backend service | API server, microservice | `port`, `protocol` |
| `module` | A logical module/package | `@ferrum/analyzer` | `version`, `entryPoint` |
| `package` | An npm package dependency | `react@18.2.0` | `version`, `dev` |

### Source Nodes

| NodeKind | Description | Example | Key Metadata |
|----------|-------------|---------|---------------|
| `file` | A source file | `src/components/Button.tsx` | `size` (bytes), `language` |
| `function` | A named function | `formatCurrency` | `async`, `exported` |
| `class` | A class definition | `UserService` | `abstract`, `exported` |
| `type` | A TypeScript type alias | `ThemeConfig` | `exported` |
| `enum` | A TypeScript enum | `UserRole` | `exported` |
| `interface` | A TypeScript interface | `ButtonProps` | `exported` |
| `utility` | A utility/constant | `formatDate`, `MAX_RETRIES` | `exported`, `exportType` |

### UI Nodes

| NodeKind | Description | Example | Key Metadata |
|----------|-------------|---------|---------------|
| `component` | A UI component | `Button`, `UserCard` | `pascalCase`, `framework` |
| `page` | A page/route component | `DashboardPage` | `route`, `layout` |
| `layout` | A layout wrapper | `DashboardLayout` | `route`, `nested` |

### Server/Logic Nodes

| NodeKind | Description | Example | Key Metadata |
|----------|-------------|---------|---------------|
| `route` | An HTTP route handler | `/api/users` | `method`, `route` |
| `api` | An API endpoint definition | `GET /users/:id` | `method`, `path` |
| `hook` | A React hook / composable | `useUser`, `useAuth` | `framework` |
| `store` | A state store | `userStore`, `cartSlice` | `framework`, `slice` |
| `server-action` | A server action (Next.js) | `submitForm` | `inputType`, `outputType` |
| `middleware` | Middleware function | `auth.ts` | `matcher`, `order` |

### Configuration & Quality Nodes

| NodeKind | Description | Example | Key Metadata |
|----------|-------------|---------|---------------|
| `config` | Configuration file | `next.config.ts` | `type` (next, vite, etc.) |
| `test` | A test file/suite | `Button.test.tsx` | `framework` (jest, vitest) |
| `asset` | A static asset | `logo.svg`, `hero.png` | `type`, `size` |
| `style` | A stylesheet | `globals.css` | `type` (css, scss, etc.) |
| `script` | A standalone script | `analytics.js` | `type`, `async` |
| `event` | An event definition | `onUserLogin` | `type`, `payload` |

### GraphNode Interface

```typescript
interface GraphNode {
  id: FerrumId;           // Stable, deterministic ID
  name: string;           // Human-readable name
  kind: NodeKind;         // One of 22 types
  path: string;           // Relative file path
  language: string;       // "ts", "tsx", "js", "jsx"
  loc: [number, number];  // Line range [start, end]
  meta: Record<string, unknown>;  // Extensible metadata
  contentHash: string;    // Hash for change detection
}
```

---

## Edge Types (18 Kinds)

Edges describe the relationships between nodes. Each edge has a `kind`
from the `EdgeKind` union type and a `dynamic` flag indicating whether
the relationship is resolved at build time (static) or runtime (dynamic).

### Dependency Edges

| EdgeKind | Source → Target | Dynamic? | Description |
|----------|----------------|----------|-------------|
| `imports` | Any → File/Module | Static | Static import/require |
| `exports` | Symbol → File | Static | Named or default export |
| `depends-on` | Any → Any | Static | Generic dependency (plugin-provided) |

### Rendering Edges

| EdgeKind | Source → Target | Dynamic? | Description |
|----------|----------------|----------|-------------|
| `renders` | Page/Layout → Component | Static | A renders B in its template |
| `contains` | Layout → Page/File | Static | Layout contains a page or file |
| `wraps` | HOC/Wrapper → Component | Static | A wraps B (HOC, error boundary, etc.) |

### Call Edges

| EdgeKind | Source → Target | Dynamic? | Description |
|----------|----------------|----------|-------------|
| `calls` | Function/Component → Function | Static | Direct function call |
| `fetches` | Component/Hook → API/Route | Dynamic | HTTP fetch or API call |

### State Edges

| EdgeKind | Source → Target | Dynamic? | Description |
|----------|----------------|----------|-------------|
| `reads-state` | Component/Hook → Store | Dynamic | Reads from a state store |
| `writes-state` | Component/Action → Store | Dynamic | Writes to a state store |
| `listens` | Component/Hook → Event | Dynamic | Subscribes to an event |
| `emits` | Component/Action → Event | Dynamic | Emits/dispatches an event |

### Architecture Edges

| EdgeKind | Source → Target | Dynamic? | Description |
|----------|----------------|----------|-------------|
| `test-of` | Test → File/Component | Static | Test tests this target |
| `extends` | Class → Class | Static | Class inheritance |
| `implements` | Class → Interface | Static | Interface implementation |
| `routes-to` | Page/Link → Route | Static | Navigation/routing relationship |
| `guards` | Middleware → Route | Static | Middleware guards a route |
| `provides` | Provider/Context → Consumer | Dynamic | Context/provider relationship |
| `consumes` | Consumer → Provider/Context | Dynamic | Consumes from a context/provider |
| `configures` | Config → Application | Static | Configuration applies to an app |

### GraphEdge Interface

```typescript
interface GraphEdge {
  id: FerrumId;               // Deterministic: source->target:kind
  source: FerrumId;            // Source node ID
  target: FerrumId;            // Target node ID
  kind: EdgeKind;              // One of 18 types
  dynamic: boolean;            // Static (build-time) or dynamic (runtime)
  meta: Record<string, unknown>;  // Import specifiers, call args, etc.
}
```

### Static vs. Dynamic Edges

The `dynamic` flag is crucial for impact analysis:

- **Static edges** (`dynamic: false`) — Resolved at build time through
  import statements, export declarations, and class hierarchies. These are
  always present in the graph.

- **Dynamic edges** (`dynamic: true`) — Resolved at runtime through
  conditional imports, `fetch()` calls, event subscriptions, and state
  reads/writes. These are best-effort and may not cover all runtime paths.

Impact analysis treats dynamic edges as *potential* blast radius. A file
that is only reached via dynamic edges will be flagged with lower confidence
than one reached via static edges.

---

## Graph Data Structure

The `ApplicationGraph` interface defines the complete graph:

```typescript
interface ApplicationGraph {
  rootPath: string;                              // Project root
  nodes: Map<FerrumId, GraphNode>;                // All nodes by ID
  edges: Map<FerrumId, GraphEdge>;                // All edges by ID
  outgoing: Map<FerrumId, Set<FerrumId>>;         // Source → outgoing edge IDs
  incoming: Map<FerrumId, Set<FerrumId>>;         // Target → incoming edge IDs
  byPath: Map<string, Set<FerrumId>>;             // File path → node IDs
  byKind: Map<NodeKind, Set<FerrumId>>;           // Node type → node IDs
  analyzedAt: number;                             // Analysis timestamp
  analysisDurationMs: number;                     // Build time in ms
}
```

### Why Maps Instead of Arrays?

All primary indexes use `Map` for O(1) lookups:

- `nodes.get(id)` — Instantly retrieve any node by ID
- `byPath.get(path)` — Instantly find all nodes in a file
- `byKind.get(kind)` — Instantly find all nodes of a type (e.g., all components)
- `outgoing.get(id)` — Instantly find all outgoing edges from a node
- `incoming.get(id)` — Instantly find all incoming edges to a node

For a project with 10,000 files generating ~50,000 nodes and ~150,000 edges,
Map-based indexes ensure that even complex traversals complete in milliseconds.

---

## Adjacency Indexes

The graph maintains four adjacency indexes for fast traversal:

### 1. `outgoing: Map<FerrumId, Set<FerrumId>>`

Maps each node ID to the set of **outgoing edge IDs**. Used to answer
"what does this node depend on?"

```typescript
// Get all edges going OUT from node A
const edgeIds = graph.outgoing.get(nodeA.id);
for (const edgeId of edgeIds!) {
  const edge = graph.edges.get(edgeId)!;
  const target = graph.nodes.get(edge.target)!;
  console.log(`${nodeA.name} → ${target.name} (${edge.kind})`);
}
```

### 2. `incoming: Map<FerrumId, Set<FerrumId>>`

Maps each node ID to the set of **incoming edge IDs**. Used to answer
"what depends on this node?" — the most common query for impact analysis.

```typescript
// Get all edges coming IN to node A (who depends on A?)
const edgeIds = graph.incoming.get(nodeA.id);
for (const edgeId of edgeIds!) {
  const edge = graph.edges.get(edgeId)!;
  const source = graph.nodes.get(edge.source)!;
  console.log(`${source.name} → ${nodeA.name} (${edge.kind})`);
}
```

### 3. `byPath: Map<string, Set<FerrumId>>`

Maps a file path to all node IDs extracted from that file. A single file
may produce multiple nodes (file node, function nodes, component nodes, etc.).

```typescript
// Find all nodes from a specific file
const nodeIds = graph.byPath.get("src/lib/utils.ts");
// Returns: Set { "n_1a2b3c", "n_4d5e6f", "n_7g8h9i" }
// (file node, formatDate function, MAX_RETRIES constant)
```

### 4. `byKind: Map<NodeKind, Set<FerrumId>>`

Maps a node kind to all node IDs of that type. Essential for category-based
analysis.

```typescript
// Get all components in the project
const componentIds = graph.byKind.get("component");
console.log(`Found ${componentIds?.size} components`);

// Get all test files
const testIds = graph.byKind.get("test");
console.log(`Found ${testIds?.size} test files`);
```

---

## Graph Operations

FerrumEngine provides a suite of graph query operations in `engine/core/graph.ts`.

### Traversal

#### `getDependencies(graph, nodeId): GraphNode[]`

Returns all **direct dependencies** of a node — the nodes it points to
via outgoing edges.

```typescript
// What does Button.tsx import?
const deps = getDependencies(graph, buttonFileNode.id);
// [Icon, theme, cn]
```

#### `getDependents(graph, nodeId): GraphNode[]`

Returns all **direct dependents** of a node — the nodes that point to it
via incoming edges. This is the primary query for impact analysis.

```typescript
// What imports utils.ts?
const dependents = getDependents(graph, utilsFileNode.id);
// [Button, Card, Modal, Navbar, Sidebar, ...]
```

### Transitive Operations

#### `getTransitiveDependencies(graph, nodeId): GraphNode[]`

Returns the **complete forward dependency tree** — everything this node
depends on, transitively.

```typescript
// Everything DashboardPage depends on (directly + transitively)
const allDeps = getTransitiveDependencies(graph, dashboardPage.id);
// [Layout, Sidebar, Header, Button, Icon, theme, utils, ...]
```

#### `getTransitiveDependents(graph, nodeId): GraphNode[]`

Returns the **complete reverse dependency tree** — everything that depends
on this node, transitively. This is the blast radius.

```typescript
// If auth.ts changes, what's affected?
const blastRadius = getTransitiveDependents(graph, authNode.id);
// [useAuth, useUser, ProtectedRoute, DashboardPage, SettingsPage, ...]
```

Algorithm: DFS with visited set to prevent infinite loops on cycles.

```typescript
function getTransitiveDependents(graph, nodeId): GraphNode[] {
  const visited = new Set<FerrumId>();
  const result: GraphNode[] = [];

  function walk(currentId: FerrumId): void {
    if (visited.has(currentId)) return;
    visited.add(currentId);
    for (const dep of getDependents(graph, currentId)) {
      result.push(dep);
      walk(dep.id);
    }
  }

  walk(nodeId);
  return result;
}
```

### Cycle Detection

#### `detectCycles(graph, startId): FerrumId[][]`

Detects all cycles reachable from a given starting node using DFS with a
recursion stack. Returns arrays of node IDs, where each array represents
one cycle.

```typescript
// Find cycles in the utils module
const cycles = detectCycles(graph, utilsNode.id);
for (const cycle of cycles) {
  const names = cycle.map(id => graph.nodes.get(id)?.name).join(" → ");
  console.log(`Cycle: ${names}`);
  // "Cycle: utils → helpers → formatters → utils"
}
```

The cycle detection algorithm:

1. Start DFS from the given node
2. Maintain a recursion stack (`recStack`)
3. When we encounter a node already in the recursion stack, we've found a cycle
4. Extract the cycle path from the DFS path
5. Deduplicate cycles by sorting and hashing the cycle node IDs

### Path Finding

#### `findPaths(graph, fromId, toId, maxDepth?): GraphNode[][]`

Finds all paths between two nodes using BFS, up to a maximum depth (default 10).
Returns arrays of nodes, where each array is one path.

```typescript
// How does DashboardPage depend on auth.ts?
const paths = findPaths(graph, dashboardPage.id, authNode.id);
for (const path of paths) {
  const names = path.map(n => n.name).join(" → ");
  console.log(`Path: ${names}`);
  // "Path: DashboardPage → useAuth → auth"
  // "Path: DashboardPage → ProtectedRoute → useAuth → auth"
}
```

### Statistics

#### `getGraphStats(graph): GraphStats`

Returns summary statistics about the graph.

```typescript
const stats = getGraphStats(graph);
// {
//   totalNodes: 4823,
//   totalEdges: 15742,
//   nodesByKind: { file: 1024, component: 342, function: 891, ... },
//   edgesByKind: { imports: 9842, calls: 2341, renders: 1203, ... },
//   totalFiles: 1024,
//   analysisDurationMs: 3247
// }
```

---

## Serialization & Caching

### Serialization Format

The Application Graph serializes to JSON for caching and inter-process
communication:

```json
{
  "rootPath": "/home/user/project",
  "nodes": {
    "n_1a2b3c": {
      "id": "n_1a2b3c",
      "name": "Button.tsx",
      "kind": "file",
      "path": "src/components/Button.tsx",
      "language": "tsx",
      "loc": [1, 85],
      "meta": { "size": 2341 },
      "contentHash": "a4f2c1"
    }
  },
  "edges": { ... },
  "byPath": { ... },
  "byKind": { ... },
  "analyzedAt": 1700000000000,
  "analysisDurationMs": 3247
}
```

### Cache File Location

FerrumEngine stores its cache in `.ferrum/cache.json` at the project root:

```
.ferrum/
  cache.json       — Serialized graph + file content hashes
  baseline.json    — Architecture drift baseline
  config.json      — Resolved configuration
```

### Incremental Build Flow

```
1. Load .ferrum/cache.json (if exists)
2. For each source file:
   a. Compute content hash (djb2)
   b. Compare with cached hash
   c. If unchanged → skip (use cached nodes/edges)
   d. If changed → re-parse and update graph
3. Remove nodes for deleted files
4. Re-resolve edges for changed files
5. Write updated cache
```

The `FileCache` structure:

```typescript
interface FileCacheEntry {
  contentHash: string;   // Hash of file content
  nodeIds: string[];     // Node IDs extracted from this file
}

type FileCache = Map<string, FileCacheEntry>;
```

---

## Framework Adapters

Framework adapters are plugins that translate framework-specific patterns
into the universal Ferrum graph model. Each adapter implements the
`FrameworkAdapter` interface (see RFC-002).

### React

```typescript
// React adapter maps:
//   PascalCase functions → component nodes
//   use* functions → hook nodes
//   JSX element references → renders edges
//   createContext → provides/consumes edges
//   React.memo, forwardRef → wraps edges
//   error boundary class → wraps edges

// Example: Button.tsx
import { useState } from 'react';         // → imports edge to react
import { cn } from '@/lib/utils';         // → imports edge to utils
import { Icon } from './Icon';            // → imports + renders edges to Icon

export function Button({ children }) {   // → component node
  const [open, setOpen] = useState(false); // → hook edge (reads-state)
  return <Icon name="check" />;          // → renders edge
}
```

### Vue

```typescript
// Vue adapter maps:
//   defineComponent → component nodes
//   <script setup> → component + composition API nodes
//   use* composables → hook nodes
//   Pinia stores → store nodes
//   provide/inject → provides/consumes edges
//   <router-view> → routes-to edges
//   <Suspense> → wraps edges

// Example: UserCard.vue
import { ref, computed } from 'vue';      // → imports edges to vue
import { useUser } from '@/composables/user'; // → hook edge
import { useI18n } from 'vue-i18n';       // → hook edge (consumes i18n)
import Card from './Card.vue';             // → imports + renders edges

// Pinia store
export const useUserStore = defineStore('user', { ... });
// → store node + provides edge
```

### Svelte

```typescript
// Svelte adapter maps:
//   <script> exported variables → component nodes
//   $store bindings → reads-state/writes-state edges
//   #slot → wraps edges
//   on:click, on:submit → emits edges
//   {#each}, {#if} → contains edges
//   SvelteKit +page.svelte → page nodes
//   SvelteKit +layout.svelte → layout nodes

// Example: Counter.svelte
import { count } from '$lib/stores';      // → imports + reads-state edges
import Button from './Button.svelte';      // → imports + renders edges

export let max = 10;                       // → component prop (meta)
```

### Angular

```typescript
// Angular adapter maps:
//   @Component decorators → component nodes
//   @Injectable services → service nodes
//   @NgModule → module nodes
//   @Directive → component nodes (variant)
//   @Pipe → utility nodes
//   Router → routes-to edges
//   @Input/@Output → event edges
//   providedIn: 'root' → provides edges
//   HttpClient calls → fetches edges
//   NgRx stores → store + reads-state/writes-state edges

// Example: user.service.ts
@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {} // → service + fetches edges

  getUser(id: string) {
    return this.http.get(`/api/users/${id}`); // → fetches edge
  }
}
```

### Next.js

```typescript
// Next.js adapter maps (extends React adapter):
//   app/**/page.tsx → page + route nodes
//   app/**/layout.tsx → layout nodes
//   app/**/route.ts → api-route nodes
//   app/**/loading.tsx → component nodes (loading state)
//   app/**/error.tsx → component nodes (error boundary)
//   app/**/not-found.tsx → page nodes
//   middleware.ts → middleware nodes
//   next.config.ts/js/mjs → config nodes
//   'use server' functions → server-action nodes
//   generateStaticParams → function nodes (meta: static)
//   getServerSideProps → function nodes (meta: ssr)

// Example: app/dashboard/page.tsx
import { auth } from '@/lib/auth';          // → imports edge
import Dashboard from '@/components/Dashboard'; // → imports + renders edges

export default function DashboardPage() { // → page + route node
  return <Dashboard />;
}
```

### Adapter Selection

Adapters are auto-selected based on `package.json` dependencies:

```typescript
// engine/graph/parser.ts — detectFramework()
const deps = { ...pkg.dependencies, ...pkg.devDependencies };
if (deps["next"]) return "nextjs";
if (deps["nuxt"]) return "nuxt";
if (deps["@sveltejs/kit"]) return "sveltekit";
if (deps["svelte"]) return "svelte";
if (deps["vue"]) return "vue";
if (deps["react"]) return "react";
if (deps["@angular/core"]) return "angular";
if (deps["astro"]) return "astro";
if (deps["solid-js"]) return "solid";
if (deps["lit"]) return "lit";
return "unknown";
```

Users can override auto-detection in `ferrum.config.ts`:

```typescript
// ferrum.config.ts
export default {
  framework: "nextjs",  // Override auto-detection
  srcDirs: ["src", "app", "components"],
  exclude: ["generated/**"],
};
```

---

## ID Generation

Node IDs are **deterministic** — the same file and symbol always produces
the same ID, enabling stable caching and cross-run comparisons.

```typescript
// Deterministic ID from file path + symbol name
function generateId(filePath: string, symbol: string): FerrumId {
  const raw = `${filePath}:${symbol}`;
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    const chr = raw.charCodeAt(i);
    hash = ((hash << 5) - hash + chr) | 0;
  }
  return `n_${Math.abs(hash).toString(36)}`;
}

// Edge IDs are deterministic too
function generateEdgeId(source: FerrumId, target: FerrumId, kind: EdgeKind): FerrumId {
  return `e_${source}->${target}:${kind}`;
}
```

Examples:

```
// File node:  src/components/Button.tsx → n_1a2b3c
// Component:  src/components/Button.tsx:comp:Button → n_4d5e6f
// Function:   src/lib/utils.ts:fn:formatDate → n_7g8h9i
// Edge:       n_1a2b3c -> n_4d5e6f:renders → e_n_1a2b3c->n_4d5e6f:renders
```

### Why Deterministic IDs?

1. **Stable caching** — The same file always maps to the same node IDs,
   so the cache can be reused across runs.

2. **Diff comparison** — Comparing graphs before and after a change is
   trivial: just compare node IDs and content hashes.

3. **Reproducibility** — Running analysis twice on the same codebase
   produces identical results.

---

## Content Hashing

FerrumEngine uses the **djb2** hash algorithm for content hashing:

```typescript
function contentHash(content: string): string {
  let hash = 5381;
  for (let i = 0; i < content.length; i++) {
    hash = ((hash << 5) + hash + content.charCodeAt(i)) | 0;
  }
  return Math.abs(hash).toString(16);
}
```

### Why djb2?

- **Fast** — Single pass, no allocations, ~50ns per KB
- **Good distribution** — Minimal collisions for source code
- **Simple** — No external dependency, works in any JS runtime
- **Deterministic** — Same content always produces the same hash

For production use at scale, the implementation can be swapped to xxhash
or CityHash via the plugin system without changing any consumer code.

### Hash Usage

1. **Incremental parsing** — Skip files with unchanged hashes
2. **Change detection** — Compare before/after hashes to identify modified nodes
3. **Node identity** — Each node stores the hash of its source content
4. **Graph diffing** — `diffGraphs()` compares hashes to classify nodes as
   added, modified, or removed

---

*This document describes the Application Graph as implemented in
`src/engine/core/types.ts` and `src/engine/core/graph.ts`.*
