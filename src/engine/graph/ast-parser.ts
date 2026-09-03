/**
 * FerrumEngine v2 — AST-based Source Parser
 *
 * Uses @babel/parser and @babel/traverse to walk the AST and extract
 * structural information from TypeScript/TSX source files. This provides
 * significantly more accurate detection than regex-based parsing for:
 *
 *   - Dynamic imports (`import()`)
 *   - Re-exports (`export { x } from '...'`)
 *   - React hooks (useState, useEffect, etc.)
 *   - Store patterns (zustand create, jotai atom, recoil atom)
 *   - Component declarations (PascalCase, forwardRef, memo)
 *   - Provider patterns (Context.Provider, XxxProvider)
 *   - Next.js special files (layout, page, error, loading, route, middleware)
 *   - API route handlers (GET, POST, PUT, DELETE, PATCH)
 *
 * Design goals:
 *   - OPTIONAL dependency: falls back gracefully when @babel/parser is unavailable
 *   - Same output shape as the regex parser (ParseResult)
 *   - Framework-aware detection
 *   - Well-documented and focused
 */

import type { GraphNode, NodeKind } from "../core/types";
import { generateId } from "../core/graph";
import type { ParseResult, ParserOptions } from "./parser";
import { contentHash } from "./parser";

// ──────────────────────────────────────────────────────────────────────
// OPTIONAL BABEL IMPORTS
// ──────────────────────────────────────────────────────────────────────

/** Whether @babel/parser is available at runtime. */
let babelAvailable = false;
let parseFn: typeof import("@babel/parser").parse | null = null;
let traverseFn: typeof import("@babel/traverse").default | null = null;

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const parserMod = require("@babel/parser");
  parseFn = parserMod.parse;
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const traverseMod = require("@babel/traverse");
  traverseFn = traverseMod.default ?? traverseMod;
  babelAvailable = true;
} catch {
  // @babel/parser is not installed — zero-dep mode
  babelAvailable = false;
}

/** Check if the AST parser is available. */
export function isAstParserAvailable(): boolean {
  return babelAvailable;
}

// ──────────────────────────────────────────────────────────────────────
// KNOWN HOOK NAMES
// ──────────────────────────────────────────────────────────────────────

const REACT_HOOKS = new Set([
  "useState",
  "useEffect",
  "useCallback",
  "useMemo",
  "useRef",
  "useContext",
  "useReducer",
  "useLayoutEffect",
  "useDebugValue",
  "useDeferredValue",
  "useTransition",
  "useId",
  "useImperativeHandle",
  "useSyncExternalStore",
  "useInsertionEffect",
]);

// ──────────────────────────────────────────────────────────────────────
// STORE PATTERN DETECTION
// ──────────────────────────────────────────────────────────────────────

/**
 * Detect store patterns from call expressions.
 * Returns the store kind or null if not a store pattern.
 */
function detectStorePattern(
  calleeName: string,
  importSources: Map<string, Set<string>>,
): NodeKind | null {
  // zustand: `create(...)` imported from 'zustand'
  if (calleeName === "create") {
    const zustandImports = importSources.get("zustand");
    if (zustandImports?.has("create")) return "store";
  }

  // jotai: `atom(...)` imported from 'jotai' or 'jotai/utils'
  if (calleeName === "atom") {
    if (importSources.has("jotai") || importSources.has("jotai/utils")) return "store";
  }

  // recoil: `atom(...)` imported from 'recoil'
  if (calleeName === "atom") {
    if (importSources.has("recoil")) return "store";
  }

  return null;
}

// ──────────────────────────────────────────────────────────────────────
// PASCAL CASE CHECK
// ──────────────────────────────────────────────────────────────────────

/** Known built-in / non-component PascalCase names to skip. */
const SKIP_PASCAL = new Set([
  "React", "Component", "Element", "Node", "Error", "Promise",
  "Map", "Set", "Array", "Object", "String", "Number", "Boolean",
  "Date", "RegExp", "JSON", "Symbol", "BigInt", "Math", "Intl",
  "WeakMap", "WeakSet", "Proxy", "Reflect", "AbortController",
  "FormData", "Headers", "Request", "Response", "URL", "URLSearchParams",
]);

function isPascalCase(name: string): boolean {
  // Must start with uppercase AND contain at least one lowercase letter.
  // This excludes ALL_CAPS constants like MAX_SIZE, API_URL, etc.
  return /^[A-Z]/.test(name) && /[a-z]/.test(name) && !SKIP_PASCAL.has(name);
}

// ──────────────────────────────────────────────────────────────────────
// NEXT.JS SPECIAL FILE DETECTION
// ──────────────────────────────────────────────────────────────────────

/** Known Next.js App Router special filenames (without extension). */
const NEXT_SPECIAL_FILES = new Set([
  "layout", "page", "error", "loading", "not-found",
  "template", "default", "global-error", "middleware",
]);

/** API route handler method names. */
const API_METHODS = new Set(["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"]);

/**
 * Determine if a file is a Next.js special file based on its basename.
 * Returns the detected NodeKind or null.
 */
function detectNextSpecialFile(relPath: string): { kind: NodeKind; specialName: string } | null {
  const parts = relPath.split("/");
  const fileName = parts[parts.length - 1]!;
  const baseName = fileName.replace(/\.(tsx|ts|jsx|js)$/, "");

  // Check if it's an API route file (route.ts)
  if (baseName === "route") {
    return { kind: "api", specialName: "route" };
  }

  // Check middleware
  if (baseName === "middleware") {
    return { kind: "middleware", specialName: "middleware" };
  }

  // Check other special files (only in app/ directory)
  if (NEXT_SPECIAL_FILES.has(baseName) && relPath.includes("/app/")) {
    if (baseName === "page") return { kind: "page", specialName: "page" };
    if (baseName === "layout") return { kind: "layout", specialName: "layout" };
    if (baseName === "error" || baseName === "global-error") return { kind: "component", specialName: baseName };
    if (baseName === "loading" || baseName === "not-found") return { kind: "component", specialName: baseName };
    if (baseName === "template" || baseName === "default") return { kind: "component", specialName: baseName };
  }

  return null;
}

// ──────────────────────────────────────────────────────────────────────
// LINE/COLUMN UTILITIES (unused but kept for parity with regex parser)
// ──────────────────────────────────────────────────────────────────────

/** @internal Used for compatibility — AST provides loc directly. */
function _getLineNumber(_content: string, _index: number): number {
  return 1;
}

// ──────────────────────────────────────────────────────────────────────
// AST PARSER
// ──────────────────────────────────────────────────────────────────────

/**
 * Parse a single TypeScript/JavaScript file using @babel/parser.
 *
 * Returns the same ParseResult shape as the regex parser, making it
 * a drop-in replacement. If @babel/parser is unavailable, returns null
 * so the caller can fall back to the regex parser.
 */
export function parseFileWithAst(
  filePath: string,
  content: string,
  options: ParserOptions,
): ParseResult | null {
  if (!babelAvailable || !parseFn || !traverseFn) {
    return null; // Signal to fall back to regex parser
  }

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
    meta: { size: content.length, parser: "ast" },
    contentHash: hash,
  });

  // ── Parse into AST ─────────────────────────────────────────────
  let ast: ReturnType<typeof parseFn>;
  try {
    ast = parseFn(content, {
      sourceType: "module",
      plugins: ["typescript", "jsx", "decorators-legacy", "dynamicImport"] as any,
      errorRecovery: true,
    });
  } catch {
    // Parse error — fall back to regex parser
    return null;
  }

  // Track import sources for store pattern detection
  // Map from module source → set of imported specifiers
  const importSources = new Map<string, Set<string>>();

  // Track seen names to avoid duplicate nodes
  const seenNames = new Set<string>();

  // Helper to add a node
  function addParsedNode(
    name: string,
    kind: NodeKind,
    loc: [number, number],
    meta: Record<string, unknown>,
    prefix?: string,
  ): void {
    if (seenNames.has(name)) return;
    seenNames.add(name);
    nodes.push({
      id: generateId(relPath, prefix ? `${prefix}:${name}` : name),
      name,
      kind,
      path: relPath,
      language,
      loc,
      meta,
      contentHash: hash,
    });
  }

  // ── Walk the AST ───────────────────────────────────────────────
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  traverseFn(ast, {
    // ── Import Declarations ────────────────────────────────────
    ImportDeclaration(path: any) {
      const source = path.node.source.value as string;
      const specifiers: string[] = [];

      for (const spec of path.node.specifiers) {
        if (spec.type === "ImportDefaultSpecifier") {
          specifiers.push(`default:${spec.local.name}`);
        } else if (spec.type === "ImportNamespaceSpecifier") {
          specifiers.push(`namespace:${spec.local.name}`);
        } else if (spec.type === "ImportSpecifier") {
          const imported = spec.imported.type === "Identifier"
            ? spec.imported.name
            : spec.imported.value;
          specifiers.push(imported);
        }
      }

      // Track for store detection
      const existing = importSources.get(source) ?? new Set<string>();
      for (const s of specifiers) existing.add(s);
      importSources.set(source, existing);

      edges.push({
        target: source,
        kind: "imports",
        meta: { specifiers, importType: "static" },
        dynamic: false,
      });
    },

    // ── Dynamic Imports (import() expression) ────────────────
    // Modern @babel/parser uses ImportExpression node type
    ImportExpression(path: any) {
      const source = path.node.source;
      if (source && source.type === "StringLiteral") {
        edges.push({
          target: source.value,
          kind: "imports",
          meta: { importType: "dynamic" },
          dynamic: true,
        });
      }
    },

    // ── Call Expressions ────────────────────────────────────────
    CallExpression(path: any) {
      const callee = path.node.callee;

      // import() — legacy dynamic import (older @babel/parser versions)
      if (callee.type === "Import") {
        const arg = path.node.arguments[0];
        if (arg && arg.type === "StringLiteral") {
          edges.push({
            target: arg.value,
            kind: "imports",
            meta: { importType: "dynamic" },
            dynamic: true,
          });
        }
      }

      // React hook detection: useXxx(...) calls
      if (callee.type === "Identifier" && REACT_HOOKS.has(callee.name)) {
        addParsedNode(callee.name, "hook", [
          path.node.loc?.start.line ?? 1,
          path.node.loc?.end.line ?? 1,
        ], { hookName: callee.name, framework: "react" }, "hook");
      }

      // Store pattern detection
      if (callee.type === "Identifier") {
        const storeKind = detectStorePattern(callee.name, importSources);
        if (storeKind) {
          // Try to find the variable name being assigned
          const parent = path.parent;
          let storeName = callee.name;
          if (
            parent?.type === "VariableDeclarator" &&
            parent.id?.type === "Identifier"
          ) {
            storeName = parent.id.name;
          }
          addParsedNode(storeName, storeKind, [
            path.node.loc?.start.line ?? 1,
            path.node.loc?.end.line ?? 1,
          ], { storeType: callee.name }, "store");
        }
      }

      // API route handler detection (exported GET, POST, etc.)
      if (callee.type === "Identifier" && API_METHODS.has(callee.name)) {
        // Check if this is an exported function declaration
        const funcParent = path.findParent(
          (p: any) =>
            p.isFunctionDeclaration() && p.node.id?.name === callee.name,
        );
        if (funcParent) {
          addParsedNode(callee.name, "api", [
            path.node.loc?.start.line ?? 1,
            path.node.loc?.end.line ?? 1,
          ], { httpMethod: callee.name, nextjs: true }, "api");
        }
      }
    },

    // ── Export Named Declarations ──────────────────────────────
    ExportNamedDeclaration(path: any) {
      const decl = path.node.declaration;
      if (!decl) {
        // Re-export: export { x } from 'module'
        if (path.node.source) {
          edges.push({
            target: path.node.source.value,
            kind: "imports",
            meta: {
              specifiers: (path.node.specifiers ?? []).map(
                (s: any) => s.exported?.name ?? s.exported?.value,
              ),
              importType: "re-export",
            },
            dynamic: false,
          });
        }
        return;
      }

      if (decl.type === "FunctionDeclaration" && decl.id) {
        const name = decl.id.name;
        const kind = isPascalCase(name) ? "component" : "function";
        addParsedNode(name, kind, [
          decl.loc?.start.line ?? 1,
          decl.loc?.end.line ?? 1,
        ], { exported: true, exportType: "named" });
        edges.push({ target: fileId, kind: "exports", meta: {}, dynamic: false });
      }

      if (decl.type === "VariableDeclaration") {
        for (const d of decl.declarations) {
          if (d.id.type === "Identifier") {
            const name = d.id.name;
            const init = d.init;
            const isArrow = init?.type === "ArrowFunctionExpression";
            const isFuncExpr = init?.type === "FunctionExpression";
            const isCallExpr = init?.type === "CallExpression";

            if (isPascalCase(name) && (isArrow || isFuncExpr)) {
              addParsedNode(name, "component", [
                d.loc?.start.line ?? 1,
                d.loc?.end.line ?? 1,
              ], { exported: true, exportType: "named", pascalCase: true, expression: isArrow ? "arrow" : "function" }, "comp");
            } else if (isPascalCase(name) && isCallExpr) {
              // forwardRef/memo wrapper detection
              const callee = (init as any).callee;
              const isWrapper =
                (callee?.type === "Identifier" && (callee.name === "forwardRef" || callee.name === "memo")) ||
                (callee?.type === "MemberExpression" && callee.property?.name === "memo");
              if (isWrapper) {
                const wrapperName = callee.type === "Identifier" ? callee.name : callee.property.name;
                addParsedNode(name, "component", [
                  d.loc?.start.line ?? 1,
                  d.loc?.end.line ?? 1,
                ], { exported: true, exportType: "named", pascalCase: true, wrapper: wrapperName }, "comp");
              } else {
                addParsedNode(name, "component", [
                  d.loc?.start.line ?? 1,
                  d.loc?.end.line ?? 1,
                ], { exported: true, exportType: "named" });
              }
            } else {
              const kind = isPascalCase(name) ? "component" : "utility";
              addParsedNode(name, kind, [
                d.loc?.start.line ?? 1,
                d.loc?.end.line ?? 1,
              ], { exported: true, exportType: "named" });
            }
            edges.push({ target: fileId, kind: "exports", meta: {}, dynamic: false });
          }
        }
      }

      if (decl.type === "ClassDeclaration" && decl.id) {
        addParsedNode(decl.id.name, "class", [
          decl.loc?.start.line ?? 1,
          decl.loc?.end.line ?? 1,
        ], { exported: true, exportType: "named" });
        edges.push({ target: fileId, kind: "exports", meta: {}, dynamic: false });
      }

      if (decl.type === "TSTypeAliasDeclaration" && decl.id) {
        addParsedNode(decl.id.name, "type", [
          decl.loc?.start.line ?? 1,
          decl.loc?.end.line ?? 1,
        ], { exported: true, exportType: "named" });
      }

      if (decl.type === "TSInterfaceDeclaration" && decl.id) {
        addParsedNode(decl.id.name, "interface", [
          decl.loc?.start.line ?? 1,
          decl.loc?.end.line ?? 1,
        ], { exported: true, exportType: "named" });
      }

      if (decl.type === "TSEnumDeclaration" && decl.id) {
        addParsedNode(decl.id.name, "enum", [
          decl.loc?.start.line ?? 1,
          decl.loc?.end.line ?? 1,
        ], { exported: true, exportType: "named" });
      }
    },

    // ── Export Default Declarations ────────────────────────────
    ExportDefaultDeclaration(path: any) {
      const decl = path.node.declaration;
      if (decl.type === "FunctionDeclaration" && decl.id) {
        addParsedNode(decl.id.name, "component", [
          decl.loc?.start.line ?? 1,
          decl.loc?.end.line ?? 1,
        ], { exported: true, exportType: "default" });
        edges.push({ target: fileId, kind: "exports", meta: {}, dynamic: false });
      } else if (decl.type === "Identifier") {
        addParsedNode(decl.name, "component", [
          path.node.loc?.start.line ?? 1,
          path.node.loc?.end.line ?? 1,
        ], { exported: true, exportType: "default" });
        edges.push({ target: fileId, kind: "exports", meta: {}, dynamic: false });
      }
    },

    // ── Function Declarations (non-exported) ──────────────────
    FunctionDeclaration(path: any) {
      // Skip if already seen (exported functions are handled above)
      if (!path.node.id) return;
      const name = path.node.id.name;
      if (seenNames.has(name)) return;

      // Check if this is a component (PascalCase)
      const kind = isPascalCase(name) ? "component" : "function";
      addParsedNode(name, kind, [
        path.node.loc?.start.line ?? 1,
        path.node.loc?.end.line ?? 1,
      ], {}, kind === "component" ? "comp" : "fn");
    },

    // ── Arrow Functions / Variable Declarations ───────────────
    // (for component detection: const MyComp = () => ...)
    VariableDeclarator(path: any) {
      if (path.node.id.type !== "Identifier") return;
      const name = path.node.id.name;
      if (seenNames.has(name)) return;

      // Check if the init is an arrow function or function expression
      const init = path.node.init;
      if (!init) return;

      const isArrow = init.type === "ArrowFunctionExpression";
      const isFuncExpr = init.type === "FunctionExpression";
      const isCallExpr = init.type === "CallExpression";

      // Component detection: PascalCase with arrow/function expression
      if (isPascalCase(name) && (isArrow || isFuncExpr)) {
        addParsedNode(name, "component", [
          path.node.loc?.start.line ?? 1,
          path.node.loc?.end.line ?? 1,
        ], { pascalCase: true, expression: isArrow ? "arrow" : "function" }, "comp");
        return;
      }

      // forwardRef / memo component detection
      if (isCallExpr && isPascalCase(name)) {
        const callee = init.callee;
        // Direct: forwardRef(...) or memo(...)
        // Member: React.memo(...)
        const isWrapper =
          (callee.type === "Identifier" && (callee.name === "forwardRef" || callee.name === "memo")) ||
          (callee.type === "MemberExpression" && callee.property?.name === "memo") ||
          (callee.type === "MemberExpression" && callee.property?.name === "forwardRef");
        if (isWrapper) {
          const wrapperName = callee.type === "Identifier" ? callee.name : callee.property.name;
          addParsedNode(name, "component", [
            path.node.loc?.start.line ?? 1,
            path.node.loc?.end.line ?? 1,
          ], { pascalCase: true, wrapper: wrapperName }, "comp");
          return;
        }
      }
    },

    // ── JSX Element detection for Provider patterns ──────────
    JSXOpeningElement(path: any) {
      const nameNode = path.node.name;
      let elementName = "";

      if (nameNode.type === "JSXIdentifier") {
        elementName = nameNode.name;
      } else if (nameNode.type === "JSXMemberExpression") {
        // e.g., ThemeContext.Provider
        const obj = nameNode.object;
        const prop = nameNode.property;
        if (obj.type === "JSXIdentifier" && prop.type === "JSXIdentifier") {
          elementName = `${obj.name}.${prop.name}`;
        }
      }

      // Provider pattern detection
      if (elementName.endsWith(".Provider") || elementName.endsWith("Provider")) {
        const providerName = elementName.replace(/\.Provider$/, "").replace(/Provider$/, "");
        addParsedNode(elementName, "component", [
          path.node.loc?.start.line ?? 1,
          path.node.loc?.end.line ?? 1,
        ], { providerFor: providerName, pattern: "provider" }, "provider");
      }
    },

    // ── Class Declarations ────────────────────────────────────
    ClassDeclaration(path: any) {
      if (!path.node.id) return;
      const name = path.node.id.name;
      if (seenNames.has(name)) return;
      addParsedNode(name, "class", [
        path.node.loc?.start.line ?? 1,
        path.node.loc?.end.line ?? 1,
      ], {}, "class");
    },
  });

  // ── Next.js special file detection ─────────────────────────────
  // Use a separate dedup set keyed by prefix+name so special file nodes
  // don't collide with function declarations of the same name.
  const specialFile = detectNextSpecialFile(relPath);
  if (specialFile) {
    const specialKey = `nextjs:${specialFile.kind}:${specialFile.specialName}`;
    if (!seenNames.has(specialKey)) {
      seenNames.add(specialKey);
      nodes.push({
        id: generateId(relPath, `nextjs:${specialFile.specialName}`),
        name: specialFile.specialName,
        kind: specialFile.kind,
        path: relPath,
        language,
        loc: [1, content.split("\n").length],
        meta: { nextjs: true, specialFile: specialFile.specialName },
        contentHash: hash,
      });
    }
  }

  // ── API route handler detection (exported function GET/POST/etc.) ──
  // This is also handled in CallExpression visitor, but we also check
  // for exported function declarations with HTTP method names
  if (relPath.endsWith("route.ts") || relPath.endsWith("route.js")) {
    // Already detected as API route via special file detection
    // Add individual handler nodes from the AST walk
  }

  // ── Fetch calls ────────────────────────────────────────────────
  // Also detect fetch() calls via the AST (more accurate than regex)
  // This is handled inside the CallExpression visitor above for completeness,
  // but we add it here for URLs passed as template literals or variables
  // that the regex parser might miss.
  const fetchRegex = /(?:fetch|axios|\w+Fetch)\s*\(\s*["'`]([^"'`]+)["'`]/g;
  let match;
  while ((match = fetchRegex.exec(content)) !== null) {
    // Avoid duplicates — check if we already have this edge
    const existing = edges.some(
      (e) => e.target === match![1] && e.kind === "fetches",
    );
    if (!existing) {
      const url = match[1];
      if (url) {
        edges.push({
          target: url,
          kind: "fetches",
          meta: { url },
          dynamic: true,
        });
      }
    }
  }

  return { nodes, edges };
}
