/**
 * FerrumEngine v2 — Graph Builder
 *
 * Orchestrates scanning a project directory, parsing files, and
 * constructing the Application Graph. Supports incremental builds
 * by tracking content hashes.
 */

import * as fs from "fs";
import * as path from "path";
import type { ApplicationGraph, FerrumConfig, GraphNode } from "../core/types";
import { createGraph, addNode, connect } from "../core/graph";
import type { GraphNode as GNode } from "../core/types";
import { parseFile, resolveImportPath, shouldExclude, isSourceFile, detectFramework, contentHash } from "./parser";
import { parseFileWithAst, isAstParserAvailable } from "./ast-parser";

// ──────────────────────────────────────────────────────────────────────
// INCREMENTAL CACHE
// ──────────────────────────────────────────────────────────────────────

interface FileCacheEntry {
  contentHash: string;
  nodeIds: string[];
}

type FileCache = Map<string, FileCacheEntry>;

// ──────────────────────────────────────────────────────────────────────
// DIRECTORY SCANNING
// ──────────────────────────────────────────────────────────────────────

/** Recursively find all source files in a directory. */
function findSourceFiles(dir: string, exclude: string[]): string[] {
  const files: string[] = [];

  function walk(currentDir: string): void {
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(currentDir, { withFileTypes: true });
    } catch {
      return; // Permission denied or not a directory
    }

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      const relPath = fullPath;

      if (entry.name.startsWith(".")) continue;
      if (shouldExclude(relPath, exclude)) continue;

      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && isSourceFile(fullPath)) {
        files.push(fullPath);
      }
    }
  }

  walk(dir);
  return files;
}

// ──────────────────────────────────────────────────────────────────────
// GRAPH BUILDER
// ──────────────────────────────────────────────────────────────────────

export interface BuildResult {
  graph: ApplicationGraph;
  stats: {
    filesScanned: number;
    filesParsed: number;
    filesSkipped: number;
    nodesCreated: number;
    edgesCreated: number;
    durationMs: number;
  };
}

/**
 * Build the Application Graph for a project.
 *
 * @param rootPath - Absolute path to the project root.
 * @param config  - Optional Ferrum configuration.
 * @param cache   - Optional previous cache for incremental builds.
 */
export function buildGraph(
  rootPath: string,
  config: FerrumConfig = {},
  cache?: FileCache,
): BuildResult {
  const startTime = performance.now();
  const graph = createGraph(rootPath);
  const newCache: FileCache = cache ? new Map(cache) : new Map();

  const srcDirs = config.srcDirs ?? ["src", "app", "lib", "pages", "components", "server"];
  const exclude = config.exclude ?? [];
  const framework = config.framework ?? detectFramework(rootPath);

  // Resolve absolute source directories
  const absSrcDirs = srcDirs
    .map((d) => path.resolve(rootPath, d))
    .filter((d) => {
      try { return fs.statSync(d).isDirectory(); } catch { return false; }
    });

  // Find all source files
  const allFiles = absSrcDirs.flatMap((dir) => findSourceFiles(dir, exclude));

  // Track path → node ID mapping for edge resolution
  const pathToNodeId = new Map<string, string>();
  const nodeIdToPath = new Map<string, string>();

  let filesParsed = 0;
  let filesSkipped = 0;
  let nodesCreated = 0;
  let edgesCreated = 0;

  // ── Phase 1: Parse all files, collect nodes and edge specs ──
  const fileEdgeSpecs = new Map<string, {
    target: string;
    kind: import("../core/types").EdgeKind;
    meta: Record<string, unknown>;
    dynamic: boolean;
    sourceNodeId: string;
  }[]>();

  for (const filePath of allFiles) {
    const content = fs.readFileSync(filePath, "utf-8");
    const hash = contentHash(content);
    const relPath = path.relative(rootPath, filePath);

    // Incremental: skip unchanged files
    const cached = newCache.get(relPath);
    if (cached && cached.contentHash === hash) {
      filesSkipped++;
      continue;
    }

    filesParsed++;
    // Try AST parser first (more accurate), fall back to regex parser
    let result = isAstParserAvailable()
      ? parseFileWithAst(filePath, content, { rootPath, framework, exclude })
      : null;
    if (!result) {
      result = parseFile(filePath, content, { rootPath, framework, exclude });
    }

    const fileNodeIds: string[] = [];

    for (const node of result.nodes) {
      addNode(graph, node as GNode);
      fileNodeIds.push(node.id);
      nodesCreated++;

      // Map path → file node ID for edge resolution
      if (node.kind === "file") {
        pathToNodeId.set(relPath, node.id);
        nodeIdToPath.set(node.id, relPath);
      }
    }

    // Store edge specs for Phase 2 resolution
    const fileId = pathToNodeId.get(relPath);
    if (fileId) {
      const specs = result.edges.map((e) => ({
        ...e,
        sourceNodeId: fileId,
      }));
      fileEdgeSpecs.set(relPath, specs);
    }

    // Update cache
    newCache.set(relPath, { contentHash: hash, nodeIds: fileNodeIds });
  }

  // ── Phase 2: Resolve and add edges ─────────────────────────────
  for (const [relPath, specs] of fileEdgeSpecs) {
    for (const spec of specs) {
      const resolved = resolveImportPath(spec.target, relPath, rootPath);
      let targetNodeId: string | null = null;

      if (resolved) {
        // Normalize the resolved path
        const normalized = resolved.replace(/\\/g, "/");
        targetNodeId = pathToNodeId.get(normalized) ?? null;
      }

      // If we couldn't resolve to a file node, create a stub
      if (!targetNodeId && resolved) {
        // This is likely an external or unscanned file — skip
        continue;
      }

      if (targetNodeId) {
        connect(graph, spec.sourceNodeId, targetNodeId, spec.kind, spec.meta, spec.dynamic);
        edgesCreated++;
      }
    }
  }

  // ── Phase 3: Detect routes (framework-specific) ────────────────
  detectRoutes(graph, rootPath, framework);

  // ── Phase 4: Detect tests ──────────────────────────────────────
  detectTests(graph, rootPath);

  // ── Phase 5: Detect infrastructure & runtime nodes ────────────
  detectInfrastructureNodes(graph, rootPath);

  const durationMs = performance.now() - startTime;
  graph.analysisDurationMs = durationMs;
  graph.analyzedAt = Date.now();

  return {
    graph,
    stats: {
      filesScanned: allFiles.length,
      filesParsed,
      filesSkipped,
      nodesCreated,
      edgesCreated,
      durationMs,
    },
  };
}

// ──────────────────────────────────────────────────────────────────────
// FRAMEWORK-SPECIFIC DETECTION
// ──────────────────────────────────────────────────────────────────────

/**
 * Detect routes based on framework conventions.
 * Next.js App Router: src/app glob matching page.tsx files
 * Next.js Pages Router: src/pages glob matching .tsx files
 * Generic: files named [route].tsx or index.tsx in route-like dirs
 */
function detectRoutes(graph: ApplicationGraph, rootPath: string, framework: string): void {
  const { addNode: aN, connect: cn } = require("../core/graph");

  if (framework === "nextjs") {
    // App Router: src/app/**/page.tsx or src/app/**/layout.tsx
    const appDir = path.join(rootPath, "src", "app");
    if (fs.existsSync(appDir)) {
      findRouteFiles(appDir, rootPath, graph, "page", ".tsx");
      findRouteFiles(appDir, rootPath, graph, "layout", ".tsx");
      findRouteFiles(appDir, rootPath, graph, "route", ".ts");
    }

    // Pages Router: src/pages/**/*.tsx or pages/**/*.tsx
    for (const pagesDir of [path.join(rootPath, "src", "pages"), path.join(rootPath, "pages")]) {
      if (fs.existsSync(pagesDir)) {
        findRouteFiles(pagesDir, rootPath, graph, "page", ".tsx");
        findRouteFiles(pagesDir, rootPath, graph, "page", ".ts");
      }
    }
  }
}

function findRouteFiles(
  dir: string,
  rootPath: string,
  graph: ApplicationGraph,
  specialName: string,
  ext: string,
): void {
  const { addNode, connect, generateId: gId } = require("../core/graph");

  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch { return; }

  for (const entry of entries) {
    if (entry.name.startsWith(".") || entry.name.startsWith("_")) continue;
    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(rootPath, fullPath);

    if (entry.isDirectory()) {
      findRouteFiles(fullPath, rootPath, graph, specialName, ext);
    } else if (entry.isFile() && (entry.name === `${specialName}${ext}` || entry.name === `layout${ext}`)) {
      // Convert path to route: src/app/dashboard/settings/page.tsx → /dashboard/settings
      const routePath = relPath
        .replace(/\/src\/app/, "")
        .replace(/\/pages/, "")
        .replace(/\/page\.tsx?$/, "")
        .replace(/\/layout\.tsx?$/, "")
        .replace(/\/route\.ts$/, "")
        .replace(/\[([^\]]+)\]/g, ":$1") || "/";

      const routeNode: GraphNode = {
        id: generateId(relPath, `route:${routePath}`),
        name: routePath,
        kind: entry.name.startsWith("layout") ? "layout" : "route",
        path: relPath,
        language: ext.slice(1),
        loc: [1, 1], // Will be filled by the file node
        meta: { route: routePath, specialFile: entry.name },
        contentHash: "",
      };
      addNode(graph, routeNode);

      // Connect the file node to the route node
      const fileId = graph.byPath.get(relPath);
 if (fileId) {
 for (const fId of fileId) {
   const fNode = graph.nodes.get(fId);
   if (fNode?.kind === "file") {
     connect(graph, routeNode.id, fNode.id, "contains");
   }
 }
}
    }
  }
}

/** Detect test files and connect them to the code they test. */
function detectTests(graph: ApplicationGraph, rootPath: string): void {
  const testDirs = ["__tests__", "tests", "test", "e2e", "spec"];

  for (const testDir of testDirs) {
    const absDir = path.join(rootPath, testDir);
    if (!fs.existsSync(absDir)) continue;

    const files = findSourceFiles(absDir, []);
    for (const filePath of files) {
      const content = fs.readFileSync(filePath, "utf-8");
      const relPath = path.relative(rootPath, filePath);

      // Create test node
      const testNode: GraphNode = {
        id: generateId(relPath, "__test__"),
        name: path.basename(filePath),
        kind: "test",
        path: relPath,
        language: filePath.endsWith(".tsx") ? "tsx" : "ts",
        loc: [1, content.split("\n").length],
        meta: {},
        contentHash: contentHash(content),
      };
      addNode(graph, testNode);

      // Try to guess what file this tests by looking at import patterns
      const importRegex = /from\s*["']([^."'][^"']*)["']/g;
      let match;
      while ((match = importRegex.exec(content)) !== null) {
        const importPath = match[1];
        // Look for a file node matching this import
        for (const [nodePath, nodeIds] of graph.byPath) {
          if (nodePath.includes(importPath.split("/").pop()!)) {
            for (const nId of nodeIds) {
              const node = graph.nodes.get(nId);
              if (node && node.kind === "file") {
                connect(graph, testNode.id, node.id, "test-of");
              }
            }
          }
        }
      }
    }
  }
}

// ──────────────────────────────────────────────────────────────────────
// INFRASTRUCTURE & RUNTIME NODE DETECTION
// ──────────────────────────────────────────────────────────────────────

/**
 * Detect infrastructure, deployment, database, queue, worker, journey,
 * and security-boundary nodes based on file patterns and content heuristics.
 */
function detectInfrastructureNodes(graph: ApplicationGraph, rootPath: string): void {
  // ── Directory-based detection ──────────────────────────────────
  const detectionRules: { dir: string; kind: import("../core/types").NodeKind; patterns: string[] }[] = [
    // Database
    { dir: "db", kind: "database", patterns: ["schema.prisma", "migrations", ".sql", "drizzle", "knexfile"] },
    { dir: "prisma", kind: "database", patterns: ["schema.prisma"] },
    { dir: "drizzle", kind: "database", patterns: [] },
    // Queue
    { dir: "queues", kind: "queue", patterns: ["bull", "bullmq", "rabbitmq", "kafka", "sqs"] },
    { dir: "jobs", kind: "queue", patterns: [] },
    // Infrastructure
    { dir: "infra", kind: "infrastructure", patterns: ["terraform", "cloudformation", "docker-compose", ".tf"] },
    { dir: "terraform", kind: "infrastructure", patterns: [] },
    { dir: "docker", kind: "infrastructure", patterns: ["Dockerfile", "docker-compose"] },
    // Deployment
    { dir: "deploy", kind: "deployment", patterns: [] },
    { dir: ".github/workflows", kind: "deployment", patterns: [] },
    // Worker
    { dir: "workers", kind: "worker", patterns: [] },
    { dir: "cron", kind: "worker", patterns: [] },
    // Journey
    { dir: "journeys", kind: "journey", patterns: [] },
    // Security boundary
    { dir: "auth", kind: "security-boundary", patterns: [] },
    { dir: "middleware", kind: "security-boundary", patterns: ["auth", "guard", "permission", "rbac"] },
  ];

  for (const rule of detectionRules) {
    const absDir = path.join(rootPath, rule.dir);
    if (!fs.existsSync(absDir)) continue;

    const relDir = rule.dir;
    const nodeId = generateId(relDir, `__${rule.kind}__`);
    const node: GraphNode = {
      id: nodeId,
      name: relDir,
      kind: rule.kind,
      path: relDir,
      language: "ts",
      loc: [1, 1],
      meta: { directory: relDir },
      contentHash: "",
    };

    // Avoid duplicate nodes for the same directory
    if (!graph.nodes.has(nodeId)) {
      addNode(graph, node);
    }
  }

  // ── Content-based detection for existing file nodes ────────────
  const CONTENT_KIND_HINTS: { pattern: RegExp; kind: import("../core/types").NodeKind }[] = [
    // Database patterns
    { pattern: /(?:prisma|drizzle|sequelize|typeorm|mongoose|knex|mikro-orm)/i, kind: "database" },
    // Queue patterns
    { pattern: /(?:Queue|Bull|BullMQ|Worker|Consumer|Subscribe|amqp|kafka)/i, kind: "queue" },
    // Infrastructure patterns
    { pattern: /(?:Dockerfile|terraform|cloudformation|serverless|kubernetes|helm)/i, kind: "infrastructure" },
    // Deployment patterns
    { pattern: /(?:deploy|pipeline|workflow|ci|cd|release)/i, kind: "deployment" },
    // Worker patterns
    { pattern: /(?:cron|scheduler|background.*worker|job.*runner|task.*queue)/i, kind: "worker" },
    // Journey patterns
    { pattern: /(?:journey|user.*flow|e2e.*test|playwright|cypress)/i, kind: "journey" },
    // Security boundary patterns
    { pattern: /(?:middleware.*auth|guard|rbac|acl|permission|authorize|authenticate)/i, kind: "security-boundary" },
  ];

  for (const node of graph.nodes.values()) {
    if (node.kind !== "file") continue;

    // Check path-based hints
    for (const hint of CONTENT_KIND_HINTS) {
      if (hint.pattern.test(node.path) || hint.pattern.test(node.name)) {
        // Tag the file node's meta with the inferred kind hint
        const meta = node.meta as Record<string, unknown>;
        if (!meta.kindHints) meta.kindHints = [];
        (meta.kindHints as string[]).push(hint.kind);
        break;
      }
    }
  }

  // ── Detect special config files ────────────────────────────────
  const SPECIAL_FILES: { name: string; kind: import("../core/types").NodeKind }[] = [
    { name: "Dockerfile", kind: "infrastructure" },
    { name: "docker-compose.yml", kind: "infrastructure" },
    { name: "docker-compose.yaml", kind: "infrastructure" },
    { name: ".github", kind: "deployment" },
    { name: "serverless.yml", kind: "infrastructure" },
    { name: "serverless.yaml", kind: "infrastructure" },
    { name: "schema.prisma", kind: "database" },
  ];

  for (const special of SPECIAL_FILES) {
    const specialPath = path.join(rootPath, special.name);
    if (fs.existsSync(specialPath)) {
      const relPath = special.name;
      const nodeId = generateId(relPath, `__${special.kind}__`);
      if (!graph.nodes.has(nodeId)) {
        const stat = fs.statSync(specialPath);
        const node: GraphNode = {
          id: nodeId,
          name: special.name,
          kind: special.kind,
          path: relPath,
          language: "yaml",
          loc: [1, 1],
          meta: { specialFile: true, size: stat.size },
          contentHash: "",
        };
        addNode(graph, node);
      }
    }
  }
}
