// ============================================================
// Search Index — Unified search across all FerrumEngine content
// ============================================================

import { VIEW_META } from "./view-meta";
import { effects } from "./ferrum-effects-index";
import { docSections, type DocBlock } from "./docs-data";
import { blogPosts } from "./blog-data";
import { changelog } from "./changelog-data";
import type { ViewId } from "./types";

/* ─── Search Result Types ────────────────────────────────────── */

export type SearchResultType = "view" | "effect" | "doc" | "blog" | "changelog";

export interface SearchResult {
  type: SearchResultType;
  title: string;
  description: string;
  viewId: ViewId;
  /** Extra context shown in the result (e.g. category name, version) */
  badge?: string;
}

/* ─── Category labels for result badges ──────────────────────── */

const TYPE_LABELS: Record<SearchResultType, string> = {
  view: "Page",
  effect: "Effect",
  doc: "Docs",
  blog: "Blog",
  changelog: "Changelog",
};

/* ─── Index builders ─────────────────────────────────────────── */

function indexViews(): SearchResult[] {
  return Object.entries(VIEW_META).map(([id, meta]) => ({
    type: "view" as const,
    title: meta.title.replace(/ — FerrumEngine$/, "").replace(/^FerrumEngine /, ""),
    description: meta.description,
    viewId: id as ViewId,
    badge: TYPE_LABELS.view,
  }));
}

function indexEffects(limit = 542): SearchResult[] {
  return effects.slice(0, limit).map((e) => ({
    type: "effect" as const,
    title: e.name,
    description: `CSS class: ${e.className} · Category: ${e.category}`,
    viewId: "effects" as ViewId,
    badge: e.category,
  }));
}

function indexDocs(): SearchResult[] {
  const results: SearchResult[] = [];
  for (const section of docSections) {
    // Section-level result
    const keywords = extractTextContent(section.content).slice(0, 200);
    results.push({
      type: "doc" as const,
      title: section.title,
      description: keywords || `Documentation section: ${section.id}`,
      viewId: "docs" as ViewId,
      badge: section.label ?? TYPE_LABELS.doc,
    });
  }
  return results;
}

function indexBlog(): SearchResult[] {
  return blogPosts.map((post) => ({
    type: "blog" as const,
    title: post.title,
    description: post.excerpt,
    viewId: "blog" as ViewId,
    badge: post.category,
  }));
}

function indexChangelog(): SearchResult[] {
  return changelog.map((entry) => ({
    type: "changelog" as const,
    title: entry.title,
    description: entry.description,
    viewId: "changelog" as ViewId,
    badge: `v${entry.version}`,
  }));
}

/* ─── Helpers ────────────────────────────────────────────────── */

/** Extract plain text from doc content blocks for search indexing */
function extractTextContent(blocks: DocBlock[]): string {
  const parts: string[] = [];
  for (const block of blocks) {
    if ("text" in block && block.text) parts.push(block.text);
    if ("items" in block && block.items) parts.push(...block.items);
    if ("code" in block && block.code) parts.push(block.code);
    if ("desc" in block && block.desc) parts.push(block.desc);
    if ("headers" in block && block.headers) parts.push(...block.headers);
  }
  return parts.join(" ");
}

/** Simple fuzzy-ish substring match: all query terms must appear */
function matches(query: string, text: string): boolean {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  // Support multi-word queries: all words must be present
  const terms = q.split(/\s+/).filter(Boolean);
  return terms.every((term) => t.includes(term));
}

/** Score a result: higher = better match */
function score(query: string, result: SearchResult): number {
  const q = query.toLowerCase();
  const tLow = result.title.toLowerCase();
  const dLow = result.description.toLowerCase();

  let s = 0;
  // Title starts with query
  if (tLow.startsWith(q)) s += 100;
  // Title contains query
  else if (tLow.includes(q)) s += 50;
  // Description contains query
  if (dLow.includes(q)) s += 10;
  // Badge/category matches
  if (result.badge && result.badge.toLowerCase().includes(q)) s += 30;

  return s;
}

/* ─── Build & Search ─────────────────────────────────────────── */

/**
 * Build the full search index once.
 * Call this at module load time — it returns a frozen array.
 */
export function buildSearchIndex(): readonly SearchResult[] {
  return Object.freeze([
    ...indexViews(),
    ...indexEffects(),
    ...indexDocs(),
    ...indexBlog(),
    ...indexChangelog(),
  ]);
}

/** Pre-built index (lazily initialized) */
let _index: readonly SearchResult[] | null = null;

function getIndex(): readonly SearchResult[] {
  if (!_index) _index = buildSearchIndex();
  return _index;
}

export interface SearchResults {
  query: string;
  results: SearchResult[];
  /** Results grouped by type for display */
  grouped: Partial<Record<SearchResultType, SearchResult[]>>;
}

/**
 * Search across all indexed content.
 * Returns results sorted by relevance score, grouped by type.
 */
export function searchIndex(query: string): SearchResults {
  const index = getIndex();
  const q = query.trim();

  if (!q) {
    // No query → return nothing (or could return recent/popular)
    return { query: "", results: [], grouped: {} };
  }

  // Filter + score
  const matched = index
    .filter((r) => matches(q, `${r.title} ${r.description} ${r.badge ?? ""}`))
    .map((r) => ({ result: r, score: score(q, r) }))
    .sort((a, b) => b.score - a.score)
    .map((m) => m.result);

  // Group by type (preserving sort order within groups)
  const grouped: Partial<Record<SearchResultType, SearchResult[]>> = {};
  for (const r of matched) {
    if (!grouped[r.type]) grouped[r.type] = [];
    grouped[r.type]!.push(r);
  }

  // Cap per group for display (effects can be huge)
  const MAX_PER_GROUP: Record<SearchResultType, number> = {
    view: 20,
    effect: 8,
    doc: 5,
    blog: 5,
    changelog: 5,
  };

  for (const key of Object.keys(grouped) as SearchResultType[]) {
    grouped[key] = grouped[key]!.slice(0, MAX_PER_GROUP[key]);
  }

  return { query: q, results: matched, grouped };
}

/** Reset the cached index (useful for testing) */
export function resetSearchIndex(): void {
  _index = null;
}
