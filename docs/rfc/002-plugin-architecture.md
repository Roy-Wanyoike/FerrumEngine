# RFC-002: Plugin & Adapter Architecture

## Status
Proposed

## Summary

Define the plugin and adapter system that makes FerrumEngine extensible.
This RFC covers four extension points: **Framework Adapters**, **Analyzer Plugins**,
**Custom Rule Plugins**, and **Lifecycle Hooks**.

## Motivation

FerrumEngine's core has zero framework-specific code. All framework knowledge
must live in adapters. Similarly, while the engine ships with a built-in
architecture analyzer, users and organizations need to:

1. **Add support for new frameworks** (SolidJS, Qwik, Remix, etc.)
2. **Create custom analyzers** for project-specific rules
3. **Add custom scoring rules** for organizational standards
4. **Hook into the analysis lifecycle** for integrations (Slack, Datadog, etc.)

Without a plugin system, every new framework, rule, or integration requires
a change to the FerrumEngine core — violating the Open/Closed Principle.

---

## Design

### Extension Point 1: Framework Adapters

Framework adapters translate framework-specific code patterns into the
universal Ferrum graph model. Each adapter is responsible for:

- Detecting whether a project uses the framework
- Classifying files into Ferrum node types (component, page, hook, store, etc.)
- Creating framework-specific edges (renders, reads-state, wraps, etc.)
- Providing framework metadata for nodes

#### Adapter Interface

```typescript
/**
 * A framework adapter translates framework-specific patterns
 * into the universal Ferrum graph model.
 */
export interface FrameworkAdapter {
  /** Unique adapter identifier. */
  id: string;

  /** Human-readable name. */
  name: string;

  /** Frameworks this adapter handles (for auto-detection). */
  packageMarkers: string[];

  /**
   * Detect whether this adapter should be used for the given project.
   * Called after package.json is read. Return true if this adapter applies.
   */
  detect(projectContext: ProjectContext): boolean;

  /**
   * Enhance a parsed file's nodes and edges with framework-specific data.
   * Called AFTER the base parser has extracted generic nodes/edges.
   *
   * The adapter can:
   * - Add new nodes (e.g., server-action, layout)
   * - Change node kinds (e.g., file → component)
   * - Add new edges (e.g., renders, reads-state)
   * - Enrich node metadata
   */
  enrich(
    filePath: string,
    content: string,
    baseNodes: GraphNode[],
    baseEdges: ParsedEdge[],
    context: ProjectContext,
  ): AdapterResult;

  /**
   * Post-processing hook called after the full graph is built.
   * Useful for adding cross-file edges (e.g., route → layout nesting).
   */
  postProcess?(graph: ApplicationGraph, context: ProjectContext): void;
}

export interface ProjectContext {
  rootPath: string;
  packageJson: Record<string, unknown>;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  config: FerrumConfig;
  framework: string;
}

export interface AdapterResult {
  /** Additional nodes to add to the graph. */
  addedNodes: GraphNode[];
  /** Additional edges to add to the graph. */
  addedEdges: ParsedEdge[];
  /** Node kind overrides (nodeId → new kind). */
  kindOverrides: Map<string, NodeKind>;
  /** Node metadata to merge. */
  metaOverrides: Map<string, Record<string, unknown>>;
}

export interface ParsedEdge {
  sourceNodeId: string;
  target: string;           // File path or node ID (resolved later)
  kind: EdgeKind;
  meta: Record<string, unknown>;
  dynamic: boolean;
}
```

#### Example: React Adapter

```typescript
import type { FrameworkAdapter, ProjectContext, AdapterResult } from '@ferrum/engine';

export const ReactAdapter: FrameworkAdapter = {
  id: 'react',
  name: 'React',
  packageMarkers: ['react'],

  detect(ctx: ProjectContext): boolean {
    return 'react' in ctx.dependencies || 'react' in ctx.devDependencies;
  },

  enrich(filePath, content, baseNodes, baseEdges, ctx): AdapterResult {
    const addedNodes: GraphNode[] = [];
    const kindOverrides = new Map<string, NodeKind>();
    const metaOverrides = new Map<string, Record<string, unknown>>();

    // Detect React hooks (use* functions)
    const hookRegex = /(?:export\s+)?(?:const|function)\s+(use\w+)\s*[=(]/g;
    let match;
    while ((match = hookRegex.exec(content)) !== null) {
      const name = match[1];
      // Skip React builtins
      if (['useState','useEffect','useRef','useCallback','useMemo',
           'useContext','useReducer','useLayoutEffect'].includes(name)) continue;

      addedNodes.push({
        id: generateId(filePath, `hook:${name}`),
        name,
        kind: 'hook',
        path: filePath,
        language: filePath.endsWith('.tsx') ? 'tsx' : 'ts',
        loc: getLineRange(content, match.index),
        meta: { framework: 'react' },
        contentHash: contentHash(content),
      });
    }

    // Mark PascalCase functions as components
    for (const node of baseNodes) {
      if (node.kind === 'function' && /^[A-Z]/.test(node.name)) {
        kindOverrides.set(node.id, 'component');
        metaOverrides.set(node.id, { ...node.meta, framework: 'react' });
      }
    }

    // Detect JSX element references as renders edges
    // (simplified — full implementation would use heuristic pattern matching)
    const jsxRefRegex = /<(\w+)/g;
    while ((match = jsxRefRegex.exec(content)) !== null) {
      const elementName = match[1];
      if (/^[a-z]/.test(elementName)) continue; // HTML elements, skip
      // Would resolve to actual component node ID in full implementation
    }

    return { addedNodes: [], addedEdges: [], kindOverrides, metaOverrides };
  },
};
```

#### Example: Next.js Adapter (extends React)

```typescript
export const NextjsAdapter: FrameworkAdapter = {
  id: 'nextjs',
  name: 'Next.js',
  packageMarkers: ['next'],

  detect(ctx): boolean {
    return 'next' in ctx.dependencies;
  },

  enrich(filePath, content, baseNodes, baseEdges, ctx): AdapterResult {
    const addedNodes: GraphNode[] = [];
    const kindOverrides = new Map<string, NodeKind>();
    const metaOverrides = new Map<string, Record<string, unknown>>();

    // Detect App Router special files
    const fileName = filePath.split('/').pop()!;

    if (fileName === 'page.tsx' || fileName === 'page.ts') {
      const routePath = deriveRouteFromFilePath(filePath, 'app');
      addedNodes.push({
        id: generateId(filePath, `route:${routePath}`),
        name: routePath,
        kind: 'page',
        path: filePath,
        language: 'tsx',
        loc: [1, 1],
        meta: { route: routePath, router: 'app' },
        contentHash: '',
      });
    }

    if (fileName === 'layout.tsx' || fileName === 'layout.ts') {
      const routePath = deriveRouteFromFilePath(filePath, 'app');
      addedNodes.push({
        id: generateId(filePath, `layout:${routePath}`),
        name: routePath,
        kind: 'layout',
        path: filePath,
        language: 'tsx',
        loc: [1, 1],
        meta: { route: routePath, router: 'app' },
        contentHash: '',
      });
    }

    if (fileName === 'route.ts' || fileName === 'route.js') {
      const routePath = deriveRouteFromFilePath(filePath, 'app');
      addedNodes.push({
        id: generateId(filePath, `api:${routePath}`),
        name: routePath,
        kind: 'api',
        path: filePath,
        language: 'ts',
        loc: [1, 1],
        meta: { route: routePath },
        contentHash: '',
      });
    }

    // Detect 'use server' directives
    if (content.includes("'use server'") || content.includes('"use server"')) {
      const serverActionRegex = /export\s+(?:async\s+)?function\s+(\w+)/g;
      let match;
      while ((match = serverActionRegex.exec(content)) !== null) {
        addedNodes.push({
          id: generateId(filePath, `server-action:${match[1]}`),
          name: match[1],
          kind: 'server-action',
          path: filePath,
          language: 'ts',
          loc: getLineRange(content, match.index),
          meta: { directive: 'use server' },
          contentHash: contentHash(content),
        });
      }
    }

    return { addedNodes, addedEdges: [], kindOverrides, metaOverrides };
  },

  postProcess(graph, ctx): void {
    // Connect layouts to their child pages via 'contains' edges
    const layouts = getNodesByKind(graph, 'layout');
    const pages = getNodesByKind(graph, 'page');

    for (const layout of layouts) {
      const layoutRoute = layout.meta.route as string;
      for (const page of pages) {
        const pageRoute = page.meta.route as string;
        if (pageRoute.startsWith(layoutRoute) && pageRoute !== layoutRoute) {
          connect(graph, layout.id, page.id, 'contains', {
            relationship: 'layout-wraps-page',
          });
        }
      }
    }

    // Connect middleware to all routes it guards
    const middleware = graph.nodes.values().find(n => n.path.includes('middleware'));
    if (middleware) {
      for (const route of [...pages, ...getNodesByKind(graph, 'api')]) {
        connect(graph, middleware.id, route.id, 'guards', {
          matcher: 'all', // In reality, parse the matcher config
        });
      }
    }
  },
};
```

---

### Extension Point 2: Analyzer Plugins

Analyzer plugins add new analysis dimensions or extend existing ones.
Each analyzer receives the `ApplicationGraph` and produces `Finding[]`.

#### Analyzer Plugin Interface

```typescript
/**
 * An analyzer plugin that produces findings for a specific category.
 */
export interface AnalyzerPlugin {
  /** Unique plugin identifier. */
  id: string;

  /** Human-readable name. */
  name: string;

  /** Which analysis category this plugin contributes to. */
  category: AnalysisCategory;

  /** Brief description of what this analyzer detects. */
  description: string;

  /**
   * Run the analysis on the graph.
   * Must be pure — same graph always produces same findings.
   */
  analyze(graph: ApplicationGraph, config: Record<string, unknown>): AnalysisResult;

  /**
   * Optional: configuration schema for this analyzer.
   * Used for validation and CLI help text.
   */
  configSchema?: Record<string, {
    type: string;
    default?: unknown;
    description: string;
  }>;
}
```

#### Example: Custom Analyzer

```typescript
import type { AnalyzerPlugin, ApplicationGraph, Finding, AnalysisResult } from '@ferrum/engine';

export const NoConsoleLogAnalyzer: AnalyzerPlugin = {
  id: 'no-console-log',
  name: 'No Console Logs',
  category: 'reliability',
  description: 'Detects console.log statements that should be removed before production.',

  configSchema: {
    allowInTest: {
      type: 'boolean',
      default: true,
      description: 'Allow console.log in test files.',
    },
    allowedPatterns: {
      type: 'string[]',
      default: ['console.warn', 'console.error'],
      description: 'Console methods that are allowed.',
    },
  },

  analyze(graph, config): AnalysisResult {
    const startTime = performance.now();
    const findings: Finding[] = [];
    const allowInTest = config.allowInTest ?? true;
    const allowed = new Set(config.allowedPatterns ?? ['console.warn', 'console.error']);

    for (const [nodeId, node] of graph.nodes) {
      if (node.kind !== 'file') continue;
      if (allowInTest && node.path.includes('__tests__')) continue;

      // Read file content and search for console.log
      const content = fs.readFileSync(path.join(graph.rootPath, node.path), 'utf-8');
      const lines = content.split('\n');

      for (let i = 0; i < lines.length; i++) {
        const match = lines[i]!.match(/console\.(\w+)/);
        if (!match) continue;

        const method = `console.${match[1]}`;
        if (allowed.has(method)) continue;

        findings.push({
          id: generateId(node.path, `console:${i}`),
          category: 'reliability',
          severity: 'low',
          title: `Console statement: ${method}`,
          description: `Production code should not contain ${method}. Use a proper logging library.`,
          evidence: [{
            description: `${method} at line ${i + 1}`,
            filePath: node.path,
            line: i + 1,
          }],
          affectedNodes: [nodeId],
          ruleId: 'custom/no-console-log',
          suggestion: `Replace ${method} with a structured logger or remove it.`,
        });
      }
    }

    return {
      analyzer: this.id,
      category: this.category,
      durationMs: performance.now() - startTime,
      findings,
      summary: {
        critical: 0,
        high: 0,
        medium: 0,
        low: findings.length,
        info: 0,
      },
    };
  },
};
```

#### Registering Analyzers

```typescript
// ferrum.config.ts
import { NoConsoleLogAnalyzer } from './ferrum-analyzers/no-console-log';

export default {
  plugins: [
    { name: 'no-console-log', enabled: true, plugin: NoConsoleLogAnalyzer },
  ],
};
```

---

### Extension Point 3: Custom Rule Plugins

Rule plugins are a lightweight alternative to full analyzer plugins.
They define individual rules that produce findings, which are then
automatically grouped into the appropriate category.

#### Rule Plugin Interface

```typescript
/**
 * A single rule that produces findings.
 * Rules are simpler than analyzers — they don't manage their own
 * category or timing. They just produce findings.
 */
export interface RulePlugin {
  /** Unique rule identifier (e.g., 'org/no-direct-api-imports'). */
  id: string;

  /** Human-readable title. */
  title: string;

  /** Which category this rule belongs to. */
  category: AnalysisCategory;

  /** Default severity if not overridden. */
  severity: Severity;

  /** Brief description. */
  description: string;

  /**
   * Check a single node against this rule.
   * Return null if the rule doesn't apply or the node passes.
   * Return a Finding if the node violates the rule.
   */
  check(node: GraphNode, graph: ApplicationGraph, context: RuleContext): Finding | null;

  /**
   * Optional: Should this rule be applied to the given node?
   * Allows rules to filter which node types they apply to.
   */
  appliesTo?: (node: GraphNode) => boolean;

  /** Optional: Remediation suggestion template. */
  suggestion?: string;
}

export interface RuleContext {
  rootPath: string;
  config: Record<string, unknown>;
  framework: string;
}
```

#### Example: Custom Rule

```typescript
import type { RulePlugin, Finding, GraphNode, ApplicationGraph } from '@ferrum/engine';

export const NoDirectApiImports: RulePlugin = {
  id: 'org/no-direct-api-imports',
  title: 'No direct API imports in components',
  category: 'architecture',
  severity: 'medium',
  description: 'Components should not directly import API route handlers. Use a service layer instead.',
  suggestion: 'Extract the API call into a service function in lib/ or services/.',

  appliesTo: (node) => node.kind === 'component' || node.kind === 'page',

  check(node, graph, ctx): Finding | null {
    // Get all outgoing edges from this node's file
    const fileNodes = graph.byPath.get(node.path);
    if (!fileNodes) return null;

    for (const fileNodeId of fileNodes) {
      const outEdges = graph.outgoing.get(fileNodeId);
      if (!outEdges) continue;

      for (const edgeId of outEdges) {
        const edge = graph.edges.get(edgeId)!;
        if (edge.kind !== 'imports') continue;

        const target = graph.nodes.get(edge.target);
        if (!target) continue;

        // Check if the import is from an API route
        if (target.kind === 'api' || target.path.includes('api/route')) {
          return {
            id: `org:no-direct-api:${node.id}`,
            category: 'architecture',
            severity: 'medium',
            title: `Component imports API route: ${target.path}`,
            description: `${node.name} directly imports from ${target.path}. Components should use a service layer.`,
            evidence: [{
              description: `${node.path} imports ${target.path}`,
              filePath: node.path,
            }],
            affectedNodes: [node.id, target.id],
            ruleId: this.id,
            suggestion: this.suggestion,
          };
        }
      }
    }

    return null;
  },
};
```

#### Rule Registration

```typescript
// ferrum.config.ts
export default {
  rules: [
    { rule: NoDirectApiImports, enabled: true },
    { rule: NoConsoleLogRule, enabled: true, options: { allowInTest: true } },
    { rule: MaxComponentSizeRule, enabled: true, options: { maxLines: 300 } },
  ],
};
```

---

### Extension Point 4: Lifecycle Hooks

Lifecycle hooks allow plugins to execute code at specific points in
the analysis pipeline. They're designed for integrations (notifications,
metrics, logging) rather than analysis.

#### Hook Interface

```typescript
/**
 * Lifecycle hooks for the analysis pipeline.
 */
export interface LifecycleHooks {
  /** Called before graph building starts. */
  beforeBuild?(context: BuildContext): void;

  /** Called after graph building completes. */
  afterBuild?(context: BuildContext, graph: ApplicationGraph): void;

  /** Called before each analyzer runs. */
  beforeAnalyzer?(analyzer: string, graph: ApplicationGraph): void;

  /** Called after each analyzer runs. */
  afterAnalyzer?(result: AnalysisResult, graph: ApplicationGraph): void;

  /** Called after all analyzers have run, before scoring. */
  beforeScoring?(results: AnalysisResult[], graph: ApplicationGraph): void;

  /** Called after scoring is complete. */
  afterScoring?(scores: ReliabilityScores, results: AnalysisResult[]): void;

  /** Called after the full analysis pipeline completes. */
  afterAnalysis?(report: FullAnalysis): void;

  /** Called when the analysis fails with an error. */
  onError?(error: Error, context: BuildContext): void;
}

export interface BuildContext {
  rootPath: string;
  config: FerrumConfig;
  timestamp: number;
  isIncremental: boolean;
  cachedFiles: number;
  totalFiles: number;
}
```

#### Hook Registration

```typescript
// ferrum.config.ts
export default {
  hooks: {
    afterAnalysis(report) {
      // Post to Slack
      if (report.scores.overall < 60) {
        postToSlack(`
          :warning: Ferrum score dropped to ${report.scores.overall}/100 (${report.scores.grade})
          Top issues: ${report.results.flatMap(r => r.findings).slice(0, 3).map(f => f.title).join(', ')}
        `);
      }
    },

    afterScoring(scores) {
      // Send to Datadog
      for (const dim of scores.dimensions) {
        datadog.gauge(`ferrum.score.${dim.category}`, dim.score);
      }
      datadog.gauge('ferrum.score.overall', scores.overall);
    },

    onError(error, ctx) {
      Sentry.captureException(error, { extra: ctx });
    },
  },
};
```

#### Example: CI Quality Gate Hook

```typescript
export const CIQualityGateHook: LifecycleHooks = {
  afterAnalysis(report) {
    // Check policy thresholds
    const config = loadConfig();
    const policies = config.policies ?? [];

    for (const policy of policies) {
      const dim = report.scores.dimensions.find(d => d.category === policy.category);
      if (dim && dim.score < policy.minScore) {
        if (policy.action === 'block') {
          console.error(`
            FERRUM QUALITY GATE FAILED
            ${policy.category}: ${dim.score}/${policy.minScore} (min)
            Grade: ${dim.grade}
            Top findings:
            ${dim.findings.slice(0, 3).map(f => `  - [${f.severity}] ${f.title}`).join('\n')}
          `);
          process.exit(1);
        } else {
          console.warn(`
            FERRUM WARNING
            ${policy.category}: ${dim.score}/${policy.minScore} (min)
          `);
        }
      }
    }
  },
};
```

---

## Plugin Discovery & Loading

### Built-in Plugins

FerrumEngine ships with built-in plugins for common frameworks:

```
@ferrum/plugin-react       — React adapter
@ferrum/plugin-vue         — Vue 3 adapter
@ferrum/plugin-svelte      — Svelte adapter
@ferrum/plugin-angular     — Angular adapter
@ferrum/plugin-nextjs      — Next.js adapter (extends React)
@ferrum/plugin-nuxt        — Nuxt adapter (extends Vue)
@ferrum/plugin-sveltekit   — SvelteKit adapter (extends Svelte)
```

### Third-Party Plugins

Third-party plugins follow the naming convention `ferrum-plugin-*` or
`@scope/ferrum-plugin-*`:

```
ferrum-plugin-solid         — SolidJS adapter
ferrum-plugin-astro         — Astro adapter
ferrum-plugin-remix         — Remix adapter
@company/ferrum-rules      — Company-specific rules
```

### Plugin Loading Order

1. Built-in plugins are loaded first
2. Third-party plugins are loaded in `ferrum.config.ts` order
3. Adapter plugins: first matching adapter wins (no stacking)
4. Analyzer plugins: all matching analyzers run (stacking allowed)
5. Rule plugins: all matching rules run (stacking allowed)
6. Lifecycle hooks: all registered hooks run in order

---

## Plugin Configuration

### Configuration File

```typescript
// ferrum.config.ts
import { defineConfig } from '@ferrum/engine';
import { MyCustomAnalyzer } from './ferrum-plugins/my-analyzer';
import { NoDirectApiImports } from './ferrum-rules/api-imports';

export default defineConfig({
  // Framework adapter (auto-detected if omitted)
  framework: 'nextjs',

  // Source directories
  srcDirs: ['src', 'app', 'lib', 'components'],

  // Exclusions
  exclude: ['generated/**', 'stories/**', 'e2e/**'],

  // Analyzer plugins
  plugins: [
    { name: '@ferrum/plugin-react', enabled: true },
    { name: '@ferrum/plugin-nextjs', enabled: true },
    { name: 'my-custom-analyzer', enabled: true, plugin: MyCustomAnalyzer },
  ],

  // Custom rules
  rules: [
    { rule: NoDirectApiImports, enabled: true },
  ],

  // Scoring configuration
  scoringWeights: {
    security: 0.25,
    testing: 0.20,
  },

  // Policy thresholds
  policies: [
    { category: 'security', minScore: 80, action: 'block' },
    { category: 'testing', minScore: 50, action: 'warn' },
  ],

  // Lifecycle hooks
  hooks: {
    afterAnalysis(report) {
      console.log(`Score: ${report.scores.overall}`);
    },
  },
});
```

---

## Backward Compatibility

- All existing `FerrumConfig` fields remain unchanged
- Plugins are opt-in — no plugins are loaded unless configured
- Built-in adapters maintain backward-compatible behavior
- The `analyze()` function signature is unchanged

---

## Testing Strategy

1. **Adapter tests**: Each adapter has a fixtures directory with sample
   projects for each supported framework. Tests verify correct node/edge
   extraction.

2. **Analyzer plugin tests**: Each analyzer is tested against fixture
   graphs with known findings.

3. **Rule tests**: Each rule is tested with positive (no finding) and
   negative (finding expected) cases.

4. **Hook tests**: Hooks are tested by running the full pipeline and
   verifying hook invocation order and arguments.

5. **Integration tests**: End-to-end tests that load a config with
   multiple plugins and verify the combined output.

---

## Open Questions

1. **Plugin sandboxing**: Should third-party plugins run in a worker
   thread for safety? (Decision: defer to v3)

2. **Plugin marketplace**: Should FerrumEngine have a plugin registry/
   marketplace? (Decision: defer until plugin ecosystem matures)

3. **Hot-reloading**: Should watch mode support hot-reloading plugins?
   (Decision: defer to v3)

---

## Implementation Plan

### Phase 1 (This RFC)
- Define all four interfaces
- Implement plugin loading from `ferrum.config.ts`
- Refactor existing adapters to use the new `FrameworkAdapter` interface
- Refactor existing architecture analyzer to use the `AnalyzerPlugin` interface

### Phase 2
- Implement built-in adapters for React, Vue, Svelte, Angular, Next.js
- Implement lifecycle hooks system
- Add hook registration to CLI

### Phase 3
- Plugin sandboxing via worker threads
- Plugin marketplace / registry
- Hot-reloading for development

---

*This RFC extends the architecture defined in RFC-001 (Engine Reinvention).*
