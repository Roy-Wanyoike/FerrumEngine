/**
 * FerrumEngine v2 — Codebase Intelligence Engine
 *
 * Answers "why does this exist?" about any code entity.
 * Provides contextual intelligence: purpose, domain, change frequency,
 * complexity, health, and relationship mapping for every node in the graph.
 */

import type {
  ApplicationGraph,
  FerrumId,
  GraphNode,
  NodeKind,
} from '../core/types';
import { getDependents, getDependencies } from '../core/graph';

// ──────────────────────────────────────────────────────────────────────
// INTELLIGENCE TYPES
// ──────────────────────────────────────────────────────────────────────

/** Intelligence report for a single code entity. */
export interface CodeIntel {
  /** The node this intelligence describes. */
  nodeId: string;
  /** AI-generated or rule-based purpose description. */
  purpose: string;
  /** Domain this node belongs to. */
  domain: string;
  /** Which journeys/features depend on this (inferred from naming/paths). */
  stakeholders: string[];
  /** How often this node tends to change. */
  changeFrequency: 'stable' | 'moderate' | 'volatile' | 'untested';
  /** Complexity metrics. */
  complexity: {
    cyclomatic: number;
    cognitive: number;
    lines: number;
    importCount: number;
  };
  /** Health assessment. */
  health: {
    score: number;
    issues: string[];
    strengths: string[];
  };
  /** Relationship map. */
  relationships: {
    upstream: string[];
    downstream: string[];
    coChanged: string[];
  };
}

/** Query parameters for filtering intelligence results. */
export interface IntelQuery {
  /** Filter by file path substring. */
  path?: string;
  /** Filter by node kind. */
  kind?: NodeKind;
  /** Filter by domain. */
  domain?: string;
  /** Include nodes with no dependents (potentially unused). */
  includeUnused?: boolean;
}

// ──────────────────────────────────────────────────────────────────────
// MAIN API
// ──────────────────────────────────────────────────────────────────────

/**
 * Generate intelligence for all nodes in the graph.
 */
export function analyzeCodebase(graph: ApplicationGraph): Map<string, CodeIntel> {
  const result = new Map<string, CodeIntel>();

  for (const [nodeId, node] of graph.nodes) {
    const intel = buildIntel(node, graph);
    result.set(nodeId, intel);
  }

  return result;
}

/**
 * Search/filter intelligence results based on a query.
 */
export function queryIntel(
  graph: ApplicationGraph,
  query: IntelQuery,
): CodeIntel[] {
  const all = analyzeCodebase(graph);
  const results: CodeIntel[] = [];

  for (const intel of all.values()) {
    const node = graph.nodes.get(intel.nodeId);
    if (!node) continue;

    // Filter by path
    if (query.path && !node.path.includes(query.path)) continue;

    // Filter by kind
    if (query.kind && node.kind !== query.kind) continue;

    // Filter by domain
    if (query.domain && intel.domain !== query.domain) continue;

    // Filter unused: skip nodes with no downstream dependents unless explicitly included
    if (!query.includeUnused && intel.relationships.downstream.length === 0) continue;

    results.push(intel);
  }

  return results;
}
// ──────────────────────────────────────────────────────────────────────
// PURPOSE INFERENCE
// ──────────────────────────────────────────────────────────────────────

/**
 * Infer the purpose of a node based on imports, exports, naming conventions,
 * and directory structure.
 *
 * This is a rule-based heuristic — not an AI call.
 */
export function inferPurpose(node: GraphNode, graph: ApplicationGraph): string {
  const parts: string[] = [];
  const meta = node.meta as Record<string, unknown>;

  // 1. Check explicit purpose in metadata
  if (meta.purpose && typeof meta.purpose === 'string') {
    return meta.purpose;
  }

  // 2. Check node kind for base purpose
  switch (node.kind) {
    case 'component':
      parts.push('UI component');
      break;
    case 'hook':
      parts.push('React hook providing reusable stateful logic');
      break;
    case 'api':
      parts.push('API endpoint handler');
      break;
    case 'route':
    case 'page':
      parts.push('Route/page handler');
      break;
    case 'middleware':
      parts.push('Middleware for request/response processing');
      break;
    case 'store':
      parts.push('State management store');
      break;
    case 'test':
      parts.push('Test specification');
      break;
    case 'utility':
    case 'function':
      parts.push('Utility function');
      break;
    case 'class':
      parts.push('Class definition');
      break;
    case 'type':
    case 'interface':
    case 'enum':
      parts.push('Type definition');
      break;
    case 'config':
      parts.push('Configuration module');
      break;
    case 'layout':
      parts.push('Layout component');
      break;
    case 'style':
      parts.push('Stylesheet');
      break;
    default:
      parts.push(`${node.kind} module`);
      break;
  }

  // 3. Check naming conventions for additional context
  const nameLower = node.name.toLowerCase();
  if (nameLower.includes('provider')) {
    parts.push('providing context/state to child components');
  } else if (nameLower.includes('guard') || nameLower.includes('auth') || nameLower.includes('protect')) {
    parts.push('handling authentication/authorization');
  } else if (nameLower.includes('service') || nameLower.includes('client')) {
    parts.push('encapsulating external service interactions');
  } else if (nameLower.includes('adapter') || nameLower.includes('mapper')) {
    parts.push('translating between data formats');
  } else if (nameLower.includes('validator') || nameLower.includes('schema')) {
    parts.push('validating data shapes and constraints');
  } else if (nameLower.includes('formatter') || nameLower.includes('format')) {
    parts.push('formatting data for display');
  } else if (nameLower.includes('repository') || nameLower.includes('repo')) {
    parts.push('abstracting data access patterns');
  }

  // 4. Check imports for additional context
  const deps = getDependencies(graph, node.id);
  const importedPaths = deps.map((d) => d.path.toLowerCase());
  if (importedPaths.some((p) => p.includes('prisma') || p.includes('drizzle') || p.includes('knex') || p.includes('typeorm'))) {
    parts.push('interacting with the database layer');
  }
  if (importedPaths.some((p) => p.includes('stripe') || p.includes('payment') || p.includes('billing'))) {
    parts.push('handling payment processing');
  }
  if (importedPaths.some((p) => p.includes('bcrypt') || p.includes('crypto') || p.includes('jose') || p.includes('jwt'))) {
    parts.push('performing cryptographic/security operations');
  }
  if (importedPaths.some((p) => p.includes('zod') || p.includes('yup') || p.includes('joi') || p.includes('valibot'))) {
    parts.push('with runtime validation');
  }

  // 5. Check directory context
  const dirSegments = node.path.split('/').filter(Boolean);
  const dir = dirSegments.length > 1 ? dirSegments[dirSegments.length - 2]! : '';
  if (dir && !parts.some((p) => p.toLowerCase().includes(dir))) {
    parts.push(`located in the ${dir} directory`);
  }

  // 6. Check export type
  if (meta.exported) {
    parts.push('exported for use across the application');
  } else if (meta.default) {
    parts.push('default export');
  }

  // Build final purpose string
  if (parts.length <= 1) {
    return parts[0] ?? `${node.name} (${node.kind})`;
  }
  return parts[0]! + ' ' + parts.slice(1).join(', ') + '.';
}

// ──────────────────────────────────────────────────────────────────────
// DOMAIN INFERENCE
// ──────────────────────────────────────────────────────────────────────

/** Known domain patterns mapped from directory/file naming. */
const DOMAIN_PATTERNS: Array<{ pattern: RegExp; domain: string }> = [
  { pattern: /auth(?:entication|orization)?/i, domain: 'auth' },
  { pattern: /login|signup|register|sign-?in|sign-?up/i, domain: 'auth' },
  { pattern: /session|token|jwt|cookie/i, domain: 'auth' },
  { pattern: /payment|stripe|billing|invoice|subscription/i, domain: 'payments' },
  { pattern: /checkout|cart|order/i, domain: 'payments' },
  { pattern: /nav|header|footer|sidebar|breadcrumb|menu/i, domain: 'navigation' },
  { pattern: /router|route|link|redirect/i, domain: 'navigation' },
  { pattern: /button|input|select|modal|dialog|form|field/i, domain: 'ui-kit' },
  { pattern: /card|badge|alert|toast|spinner|skeleton/i, domain: 'ui-kit' },
  { pattern: /table|list|grid|pagination|filter|sort/i, domain: 'ui-kit' },
  { pattern: /dashboard|chart|graph|metric|analytics/i, domain: 'data' },
  { pattern: /report|export|csv|pdf|download/i, domain: 'data' },
  { pattern: /util|helper|format|parse|convert|transform/i, domain: 'utils' },
  { pattern: /config|setting|env|constant/i, domain: 'config' },
  { pattern: /test|spec|mock|fixture|stub/i, domain: 'testing' },
  { pattern: /api|endpoint|handler|controller/i, domain: 'api' },
  { pattern: /store|state|reducer|slice|action/i, domain: 'state' },
  { pattern: /style|css|scss|tailwind|theme/i, domain: 'styling' },
  { pattern: /hook|use[A-Z]/i, domain: 'hooks' },
  { pattern: /layout|template|shell/i, domain: 'layout' },
  { pattern: /middleware|guard|interceptor/i, domain: 'middleware' },
  { pattern: /error|boundary|fallback|sentry/i, domain: 'error-handling' },
  { pattern: /i18n|locale|translation|intl/i, domain: 'i18n' },
  { pattern: /a11y|accessibility|aria|sr-only/i, domain: 'a11y' },
];

/**
 * Infer the business domain of a node from its path and name.
 *
 * Returns a domain string like 'auth', 'payments', 'navigation', etc.
 */
export function inferDomain(node: GraphNode): string {
  const fullPath = `${node.path}/${node.name}`.toLowerCase();

  for (const { pattern, domain } of DOMAIN_PATTERNS) {
    if (pattern.test(fullPath)) return domain;
  }

  return 'other';
}

// ──────────────────────────────────────────────────────────────────────
// CHANGE FREQUENCY ASSESSMENT
// ──────────────────────────────────────────────────────────────────────

/**
 * Assess how frequently a node is likely to change.
 *
 * Heuristics (in absence of git history):
 *   - 'untested': no test node linked to this node
 *   - 'volatile':  high downstream count + utility/config kind + many imports
 *   - 'moderate':  moderate downstream count
 *   - 'stable':    low downstream count, type/config kind
 */
export function assessChangeFrequency(
  node: GraphNode,
  graph: ApplicationGraph,
): 'stable' | 'moderate' | 'volatile' | 'untested' {
  const dependents = getDependents(graph, node.id);
  const downstreamCount = dependents.length;

  // Check if there's an associated test
  const hasTest = [...graph.nodes.values()].some(
    (n) =>
      n.kind === 'test' &&
      (n.path.toLowerCase().includes(node.name.toLowerCase()) ||
        n.path.toLowerCase().replace(/\.(?:test|spec)\./, '.').replace(/\.[^.]+$/, '') ===
          node.path.toLowerCase().replace(/\.[^.]+$/, '')),
  );

  if (!hasTest) return 'untested';

  // Volatile: heavily depended-upon utilities, configs, or frequently-imported modules
  const importCount = graph.outgoing.get(node.id)?.size ?? 0;
  if (
    downstreamCount >= 10 ||
    (downstreamCount >= 5 && importCount >= 5) ||
    (node.kind === 'config' && downstreamCount >= 3)
  ) {
    return 'volatile';
  }

  // Moderate: moderate dependency footprint
  if (downstreamCount >= 3 || (downstreamCount >= 1 && importCount >= 3)) {
    return 'moderate';
  }

  // Stable: types, interfaces, or leaf nodes
  return 'stable';
}

// ──────────────────────────────────────────────────────────────────────
// COMPLEXITY ESTIMATION
// ──────────────────────────────────────────────────────────────────────

/**
 * Estimate complexity metrics for a node.
 *
 * Since we don't have full AST analysis here, this uses heuristics
 * based on what's available in the graph node metadata and edges.
 */
export function estimateComplexity(
  node: GraphNode,
): CodeIntel['complexity'] {
  const lines = Math.max(0, node.loc[1] - node.loc[0]);
  const meta = node.meta as Record<string, unknown>;

  // Cyclomatic complexity: use metadata if available, otherwise estimate from lines
  const cyclomatic =
    typeof meta.cyclomatic === 'number'
      ? meta.cyclomatic
      : Math.max(1, Math.round(lines / 10));

  // Cognitive complexity: typically 1.5-3x cyclomatic for most code
  const cognitive =
    typeof meta.cognitive === 'number'
      ? meta.cognitive
      : Math.max(1, Math.round(cyclomatic * 1.5));

  // Import count from outgoing edges
  const importCount = 0; // Will be filled by the caller (buildIntel)

  return { cyclomatic, cognitive, lines, importCount };
}

// ──────────────────────────────────────────────────────────────────────
// HEALTH ASSESSMENT
// ──────────────────────────────────────────────────────────────────────

/**
 * Assess the health of a node based on its intelligence and graph context.
 *
 * Produces a 0-100 score with lists of issues and strengths.
 */
export function assessHealth(
  intel: CodeIntel,
  graph: ApplicationGraph,
): CodeIntel['health'] {
  const issues: string[] = [];
  const strengths: string[] = [];
  let score = 100;

  const node = graph.nodes.get(intel.nodeId);
  if (!node) return { score: 0, issues: ['Node not found in graph'], strengths: [] };

  const meta = node.meta as Record<string, unknown>;

  // --- Issues ---

  // Untested code
  if (intel.changeFrequency === 'untested') {
    issues.push('No associated test file detected');
    score -= 20;
  }

  // High complexity
  if (intel.complexity.cyclomatic > 15) {
    issues.push(`High cyclomatic complexity (${intel.complexity.cyclomatic})`);
    score -= 15;
  } else if (intel.complexity.cyclomatic > 10) {
    issues.push(`Moderate cyclomatic complexity (${intel.complexity.cyclomatic})`);
    score -= 8;
  }

  // Oversized file
  if (intel.complexity.lines > 500) {
    issues.push(`Oversized file (${intel.complexity.lines} lines)`);
    score -= 12;
  } else if (intel.complexity.lines > 300) {
    issues.push(`Large file (${intel.complexity.lines} lines)`);
    score -= 5;
  }

  // Too many imports (high coupling)
  if (intel.complexity.importCount > 20) {
    issues.push(`High import count (${intel.complexity.importCount}) — may be tightly coupled`);
    score -= 10;
  }

  // No downstream = potentially unused
  if (intel.relationships.downstream.length === 0 && node.kind !== 'config' && node.kind !== 'test') {
    if (meta.exported) {
      issues.push('Exported but has no dependents — may be unused');
      score -= 5;
    }
  }

  // Excessive downstream (too many dependents = high risk to change)
  if (intel.relationships.downstream.length > 15) {
    issues.push(`High fan-out (${intel.relationships.downstream.length} dependents) — changes have wide blast radius`);
    score -= 10;
  }

  // Cognitive complexity
  if (intel.complexity.cognitive > 25) {
    issues.push(`High cognitive complexity (${intel.complexity.cognitive}) — difficult to understand`);
    score -= 8;
  }

  // --- Strengths ---

  // Has tests
  if (intel.changeFrequency !== 'untested') {
    strengths.push('Has associated test coverage');
  }

  // Low complexity
  if (intel.complexity.cyclomatic <= 5) {
    strengths.push('Low cyclomatic complexity — easy to test and maintain');
  }

  // Reasonable size
  if (intel.complexity.lines > 0 && intel.complexity.lines <= 200) {
    strengths.push('Reasonable file size');
  }

  // Good encapsulation (limited imports)
  if (intel.complexity.importCount > 0 && intel.complexity.importCount <= 5) {
    strengths.push('Low import count — well-encapsulated module');
  }

  // Used by others (proven value)
  if (intel.relationships.downstream.length >= 3) {
    strengths.push(`Used by ${intel.relationships.downstream.length} modules — proven value`);
  }

  // Type definitions are inherently low-risk
  if (node.kind === 'type' || node.kind === 'interface' || node.kind === 'enum') {
    strengths.push('Type-only module — inherently safe');
  }

  // Config files are stable by nature
  if (node.kind === 'config') {
    strengths.push('Configuration module — typically stable');
  }

  return {
    score: Math.max(0, Math.min(100, score)),
    issues,
    strengths,
  };
}

// ──────────────────────────────────────────────────────────────────────
// CO-CHANGED FILES
// ──────────────────────────────────────────────────────────────────────

/**
 * Find files that are likely co-changed with the given node.
 *
 * Heuristics:
 *   1. Files in the same feature directory
 *   2. Files that import similar sets of dependencies
 *   3. Test files associated with the node
 */
export function findCoChangedFiles(
  node: GraphNode,
  graph: ApplicationGraph,
): string[] {
  const coChanged = new Set<string>();

  // 1. Files in the same feature directory (sibling files)
  const dirSegments = node.path.split('/');
  if (dirSegments.length > 1) {
    const dir = dirSegments.slice(0, -1).join('/');
    for (const [id, other] of graph.nodes) {
      if (id === node.id) continue;
      if (other.path.startsWith(dir + '/') && other.path !== node.path) {
        coChanged.add(other.id);
      }
    }
  }

  // 2. Files that share the same upstream dependencies (Jaccard similarity > 0.5)
  const nodeDeps = new Set(getDependencies(graph, node.id).map((d) => d.id));
  if (nodeDeps.size > 0) {
    for (const [id, other] of graph.nodes) {
      if (id === node.id) continue;
      const otherDeps = new Set(getDependencies(graph, id).map((d) => d.id));

      // Jaccard similarity
      let intersection = 0;
      for (const dep of nodeDeps) {
        if (otherDeps.has(dep)) intersection++;
      }
      const union = nodeDeps.size + otherDeps.size - intersection;
      if (union > 0 && intersection / union > 0.5) {
        coChanged.add(other.id);
      }
    }
  }

  // 3. Associated test files
  const nodeNameLower = node.name.toLowerCase().replace(/\.[^.]+$/, '');
  for (const [, other] of graph.nodes) {
    if (other.id === node.id || other.kind !== 'test') continue;
    const otherNameLower = other.name.toLowerCase();
    if (
      otherNameLower.includes(nodeNameLower) ||
      other.path.toLowerCase().includes(nodeNameLower)
    ) {
      coChanged.add(other.id);
    }
  }

  return [...coChanged];
}

// ──────────────────────────────────────────────────────────────────────
// INTERNAL: BUILD INTELLIGENCE
// ──────────────────────────────────────────────────────────────────────

/** Build a complete CodeIntel object for a single node. */
function buildIntel(node: GraphNode, graph: ApplicationGraph): CodeIntel {
  const purpose = inferPurpose(node, graph);
  const domain = inferDomain(node);
  const changeFrequency = assessChangeFrequency(node, graph);
  const complexity = estimateComplexity(node);

  // Fill in actual import count
  complexity.importCount = getDependencies(graph, node.id).length;

  const relationships = {
    upstream: getDependencies(graph, node.id).map((d) => d.id),
    downstream: getDependents(graph, node.id).map((d) => d.id),
    coChanged: findCoChangedFiles(node, graph),
  };

  // Infer stakeholders from downstream paths and domain
  const stakeholders = inferStakeholders(node, graph);

  const partialIntel: CodeIntel = {
    nodeId: node.id,
    purpose,
    domain,
    stakeholders,
    changeFrequency,
    complexity,
    health: { score: 100, issues: [], strengths: [] }, // placeholder
    relationships,
  };

  partialIntel.health = assessHealth(partialIntel, graph);
  return partialIntel;
}

/** Infer stakeholder features/journeys from the node's downstream dependents. */
function inferStakeholders(node: GraphNode, graph: ApplicationGraph): string[] {
  const stakeholders = new Set<string>();
  const dependents = getDependents(graph, node.id);

  // Collect domains of all dependents as stakeholder features
  for (const dep of dependents) {
    const depDomain = inferDomain(dep);
    if (depDomain !== 'other') {
      stakeholders.add(depDomain);
    }
  }

  // Also check the node's own domain
  const ownDomain = inferDomain(node);
  if (ownDomain !== 'other') {
    stakeholders.add(ownDomain);
  }

  // Check directory for feature context
  const pathSegments = node.path.split('/');
  for (const seg of pathSegments) {
    if (
      seg !== 'src' &&
      seg !== 'app' &&
      seg !== 'lib' &&
      seg !== 'utils' &&
      seg !== 'components' &&
      seg !== 'hooks' &&
      seg !== 'types' &&
      seg.length > 2
    ) {
      stakeholders.add(seg);
    }
  }

  return [...stakeholders];
}
