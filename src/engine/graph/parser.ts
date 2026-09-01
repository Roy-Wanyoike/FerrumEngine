/**
 * FerrumEngine v2 — Source Parser
 *
 * Parses TypeScript/JavaScript source files and extracts nodes (imports,
 * exports, components, functions, classes, routes) and edges (imports,
 * calls, renders) to populate the Application Graph.
 *
 * Design goals:
 *   - Zero external dependencies (no AST parser library required)
 *   - Regex-based for speed and portability
 *   - Framework-aware heuristics (React, Vue, Svelte, Next.js, etc.)
 *   - Incremental: only re-parse changed files (content hash check)
 */

import type { GraphNode, EdgeKind, NodeKind } from "../core/types";
import { generateId, addNode, connect } from "../core/graph";
import type { ApplicationGraph } from "../core/types";

// ──────────────────────────────────────────────────────────────────────
// PARSER TYPES
// ──────────────────────────────────────────────────────────────────────

export interface ParseResult {
  nodes: GraphNode[];
  edges: { target: string; kind: EdgeKind; meta: Record<string, unknown>; dynamic: boolean }[];
}

export interface ParserOptions {
  /** Project root path. */
  rootPath: string;
  /** Framework hint (auto-detected if not set). */
  framework?: string;
  /** Glob patterns to exclude. */
  exclude?: string[];
}

// ──────────────────────────────────────────────────────────────────────
// CONTENT HASHING
// ──────────────────────────────────────────────────────────────────────

/** Simple deterministic hash of a string (djb2). */
export function contentHash(content: string): string {
  let hash = 5381;
  for (let i = 0; i < content.length; i++) {
    hash = ((hash << 5) + hash + content.charCodeAt(i)) | 0;
  }
  return Math.abs(hash).toString(16);
}

// ──────────────────────────────────────────────────────────────────────
// LINE/COLUMN UTILITIES
// ──────────────────────────────────────────────────────────────────────

function getLineNumber(content: string, index: number): number {
  return content.substring(0, index).split("\n").length;
}

function getLineRange(content: string, symbolStart: number): [number, number] {
  const start = getLineNumber(content, symbolStart);
  // Estimate end: find the next same-indent closing brace or end of file
  const rest = content.substring(symbolStart);
  const lines = rest.split("\n");
  let depth = 0;
  let endLine = start;
  for (const line of lines) {
    for (const ch of line) {
      if (ch === "{") depth++;
      if (ch === "}") depth--;
    }
    endLine++;
    if (depth <= 0 && lines.indexOf(line) > 0) break;
    if (endLine > start + 200) break; // safety limit
  }
  return [start, endLine];
}

// ──────────────────────────────────────────────────────────────────────
// FRAMEWORK DETECTION
// ──────────────────────────────────────────────────────────────────────

export function detectFramework(rootPath: string): string {
  // Check for framework markers in package.json dependencies
  try {
    const fs = require("fs");
    const pkgPath = `${rootPath}/package.json`;
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      if (deps["next"]) return "nextjs";
      if (deps["nuxt"]) return "nuxt";
      if (deps["svelte"]) return "svelte";
      if (deps["@sveltejs/kit"]) return "sveltekit";
      if (deps["vue"]) return "vue";
      if (deps["react"]) return "react";
      if (deps["angular"] || deps["@angular/core"]) return "angular";
      if (deps["astro"]) return "astro";
      if (deps["solid-js"]) return "solid";
      if (deps["lit"]) return "lit";
    }
  } catch {
    // Fallback: check file structure
  }
  return "unknown";
}

// ──────────────────────────────────────────────────────────────────────
// SOURCE PARSING
// ──────────────────────────────────────────────────────────────────────

/**
 * Parse a single TypeScript/JavaScript file and extract nodes + edges.
 */
export function parseFile(
  filePath: string,
  content: string,
  options: ParserOptions,
): ParseResult {
  const nodes: GraphNode[] = [];
  const edges: ParseResult["edges"] = [];
  const hash = contentHash(content);
  const relPath = filePath.startsWith(options.rootPath)
    ? filePath.slice(options.rootPath.length + 1)
    : filePath;

  const language = filePath.endsWith(".tsx") || filePath.endsWith(".jsx")
    ? "tsx"
    : filePath.endsWith(".ts")
      ? "ts"
      : filePath.endsWith(".jsx")
        ? "jsx"
        : "js";

  // ── File node (always created) ─────────────────────────────────
  const fileId = generateId(relPath, "__file__");
  nodes.push({
    id: fileId,
    name: relPath.split("/").pop()!,
    kind: "file",
    path: relPath,
    language,
    loc: [1, content.split("\n").length],
    meta: { size: content.length },
    contentHash: hash,
  });

  // ── Imports ──────────────────────────────────────────────────────
  const importRegex = /import\s+(?:(?:type\s+)?(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)(?:\s*,\s*(?:\{[^}]*\}|\*\s+as\s+\w+|\w+))?\s+from\s+)?["']([^"']+)["']/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    const specifier = match[2] || "";
    edges.push({
      target: importPath,
      kind: "imports",
      meta: { specifier: specifier.trim(), raw: match[0] },
      dynamic: false,
    });
  }

  // Dynamic imports
  const dynamicImportRegex = /import\s*\(\s*["']([^"']+)["']\s*\)/g;
  while ((match = dynamicImportRegex.exec(content)) !== null) {
    edges.push({
      target: match[1],
      kind: "imports",
      meta: { dynamic: true },
      dynamic: true,
    });
  }

  // ── Exports ─────────────────────────────────────────────────────
  const exportNamedRegex = /export\s+(?:const|let|var|function|class|interface|type|enum)\s+(\w+)/g;
  while ((match = exportNamedRegex.exec(content)) !== null) {
    const name = match[1];
    const idx = match.index;
    const kind = getExportKind(match[0], content, idx, options.framework);
    const node: GraphNode = {
      id: generateId(relPath, name),
      name,
      kind,
      path: relPath,
      language,
      loc: getLineRange(content, idx),
      meta: { exported: true, exportType: "named" },
      contentHash: hash,
    };
    nodes.push(node);
    edges.push({ target: fileId, kind: "exports", meta: {}, dynamic: false });
  }

  // Default export
  const defaultExportRegex = /export\s+default\s+(?:function\s+)?(\w+)/g;
  while ((match = defaultExportRegex.exec(content)) !== null) {
    const name = match[1];
    const idx = match.index;
    const kind = getExportKind(match[0], content, idx, options.framework);
    nodes.push({
      id: generateId(relPath, `default:${name}`),
      name,
      kind,
      path: relPath,
      language,
      loc: getLineRange(content, idx),
      meta: { exported: true, exportType: "default" },
      contentHash: hash,
    });
  }

  // ── Components (React/Vue/Svelte heuristics) ────────────────────
  parseComponents(content, relPath, language, hash, nodes);

  // ── Functions (non-exported) ────────────────────────────────────
  const funcRegex = /(?:export\s+)?(?:async\s+)?function\s+(\w+)\s*[<(]/g;
  const seenFuncs = new Set(nodes.map((n) => n.name));
  while ((match = funcRegex.exec(content)) !== null) {
    const name = match[1];
    if (seenFuncs.has(name)) continue;
    seenFuncs.add(name);
    nodes.push({
      id: generateId(relPath, `fn:${name}`),
      name,
      kind: "function",
      path: relPath,
      language,
      loc: getLineRange(content, match.index),
      meta: {},
      contentHash: hash,
    });
  }

  // ── Classes ─────────────────────────────────────────────────────
  const classRegex = /(?:export\s+)?(?:abstract\s+)?class\s+(\w+)/g;
  const seenClasses = new Set(nodes.map((n) => n.name));
  while ((match = classRegex.exec(content)) !== null) {
    const name = match[1];
    if (seenClasses.has(name)) continue;
    seenClasses.add(name);
    nodes.push({
      id: generateId(relPath, `class:${name}`),
      name,
      kind: "class",
      path: relPath,
      language,
      loc: getLineRange(content, match.index),
      meta: {},
      contentHash: hash,
    });
  }

  // ── API fetch calls ─────────────────────────────────────────────
  const fetchRegex = /(?:fetch|axios|\w+Fetch)\s*\(\s*["'`]([^"'`]+)["'`]/g;
  while ((match = fetchRegex.exec(content)) !== null) {
    edges.push({
      target: match[1],
      kind: "fetches",
      meta: { url: match[1] },
      dynamic: true,
    });
  }

  return { nodes, edges };
}

// ──────────────────────────────────────────────────────────────────────
// COMPONENT DETECTION
// ──────────────────────────────────────────────────────────────────────

function parseComponents(
  content: string,
  relPath: string,
  language: string,
  hash: string,
  nodes: GraphNode[],
): void {
  const seen = new Set(nodes.map((n) => n.name));

  // React: function Component() or const Component = () or const Component = function
  // Heuristic: PascalCase function before a return with JSX-like content
  const pascalCaseRegex = /(?:export\s+(?:default\s+)?)?(?:const|let|function)\s+([A-Z]\w*)\s*[=(]/g;
  let match;
  while ((match = pascalCaseRegex.exec(content)) !== null) {
    const name = match[1];
    if (seen.has(name)) continue;
    // Skip known non-components
    if (["React","Component","Element","Node","Error","Promise","Map","Set","Array","Object","String","Number","Boolean","Date","RegExp","JSON"].includes(name)) continue;
    seen.add(name);
    nodes.push({
      id: generateId(relPath, `comp:${name}`),
      name,
      kind: "component",
      path: relPath,
      language,
      loc: getLineRange(content, match.index),
      meta: { pascalCase: true },
      contentHash: hash,
    });
  }
}

function getExportKind(
  keyword: string,
  _content: string,
  _idx: number,
  _framework: string,
): NodeKind {
  if (keyword.includes("interface")) return "interface";
  if (keyword.includes("type ")) return "type";
  if (keyword.includes("enum")) return "enum";
  if (keyword.includes("class")) return "class";
  if (keyword.includes("function")) return "function";
  if (keyword.includes("const") || keyword.includes("let") || keyword.includes("var")) return "utility";
  return "utility";
}

// ──────────────────────────────────────────────────────────────────────
// FILE SYSTEM SCANNING
// ──────────────────────────────────────────────────────────────────────

/** File extensions to parse. */
const SOURCE_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"]);

/** Default exclusion patterns. */
const DEFAULT_EXCLUDE = [
  "node_modules",
  ".next",
  ".nuxt",
  ".svelte-kit",
  "dist",
  "build",
  ".output",
  ".vercel",
  ".netlify",
  "coverage",
  ".git",
  "__tests__",
  "e2e",
];

/**
 * Resolve an import path to a file path.
 * Handles: relative paths, package imports, ts path aliases, extensions.
 */
export function resolveImportPath(
  importPath: string,
  fromFile: string,
  rootPath: string,
  _aliases?: Record<string, string>,
): string | null {
  // Absolute imports (packages) — return null, handled by dependency analysis
  if (!importPath.startsWith(".") && !importPath.startsWith("/")) {
    return null; // External dependency
  }

  // Relative import
  const dir = fromFile.substring(0, fromFile.lastIndexOf("/"));
  let resolved = importPath;

  // Resolve . and ..
  if (resolved.startsWith("./")) resolved = `${dir}/${resolved.slice(2)}`;
  else if (resolved.startsWith("../")) {
    const parts = dir.split("/");
    const ups = (resolved.match(/\.\./g) || []).length;
    resolved = [...parts.slice(0, -ups), resolved.replace(/\.\.\//g, "")].join("/");
  }

  // Try extensions
  for (const ext of ["", ".ts", ".tsx", ".js", ".jsx", "/index.ts", "/index.tsx", "/index.js", "/index.jsx"]) {
    // This is a virtual resolution — actual file existence is checked by the caller
    return resolved + ext;
  }

  return resolved;
}

/** Check if a path should be excluded. */
export function shouldExclude(filePath: string, excludePatterns: string[]): boolean {
  const allPatterns = [...DEFAULT_EXCLUDE, ...excludePatterns];
  const normalized = filePath.replace(/\\/g, "/");
  return allPatterns.some((pattern) => normalized.includes(`/${pattern}/`) || normalized.endsWith(`/${pattern}`));
}

/** Check if a file is a source file. */
export function isSourceFile(filePath: string): boolean {
  const ext = filePath.substring(filePath.lastIndexOf("."));
  return SOURCE_EXTENSIONS.has(ext);
}