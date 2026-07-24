// ─── FerrumCSS Compiler — Static Analysis Engine ─────────────────────────────
// Compile-time analysis passes: dead CSS detection, duplicate properties,
// specificity conflicts, token validation, and bundle size estimation.
// Zero external dependencies.

import type {
  AnalysisReport,
  AnalysisWarning,
  DeclarationNode,
  DuplicateProperty,
  RuleNode,
  SizeEstimate,
  SourceLocation,
  SpecificityConflict,
  StylesheetNode,
  TokenMap,
  TokenRefNode,
  TokenValidationResult,
} from "./types";

// ─── Main analysis entry point ───────────────────────────────────────────────

export function analyze(
  ast: StylesheetNode,
  options?: { usedClasses?: string[]; validTokens?: TokenMap },
): AnalysisReport {
  const warnings: AnalysisWarning[] = [];

  const usedClasses = options?.usedClasses;
  const validTokens = options?.validTokens;

  const deadCSS = usedClasses ? findDeadCSS(ast, new Set(usedClasses)) : [];
  const duplicateProperties = findDuplicateProperties(ast);
  const specificityConflicts = findSpecificityConflicts(ast);
  const tokenValidation = validTokens
    ? validateTokenRefs(ast, new Set(Object.keys(validTokens)), validTokens)
    : { valid: [], invalid: [], resolved: [] };

  for (const inv of tokenValidation.invalid) {
    warnings.push({
      message: `Invalid token reference: token(${inv.path}) — ${inv.reason}`,
      loc: inv.loc,
      severity: "error",
    });
  }

  for (const dead of deadCSS) {
    warnings.push({
      message: `Unused rule: ${dead}`,
      severity: "info",
    });
  }

  for (const dup of duplicateProperties) {
    warnings.push({
      message: `Duplicate property "${dup.property}" in "${dup.selector}"`,
      severity: "warn",
    });
  }

  for (const conflict of specificityConflicts) {
    warnings.push({
      message: `Specificity conflict: ${conflict.selectorA} vs ${conflict.selectorB}`,
      loc: conflict.loc,
      severity: "warn",
    });
  }

  return {
    deadCSS,
    duplicateProperties,
    specificityConflicts,
    tokenValidation,
    sizeEstimate: estimateBundleSize(ast),
    warnings,
  };
}

// ─── Dead CSS detection ──────────────────────────────────────────────────────

export function findDeadCSS(ast: StylesheetNode, usedClasses: Set<string>): string[] {
  const usedLower = new Set([...usedClasses].map(c => c.toLowerCase()));
  const allSelectors = collectSelectors(ast);
  const deadRules: string[] = [];

  for (const { selector } of allSelectors) {
    const classes = extractClassNames(selector);
    const isUsed = classes.length === 0 || classes.some(cls => usedLower.has(cls.toLowerCase()));
    if (!isUsed) {
      deadRules.push(selector);
    }
  }

  return deadRules;
}

// ─── Duplicate property detection ────────────────────────────────────────────

export function findDuplicateProperties(ast: StylesheetNode): DuplicateProperty[] {
  const results: DuplicateProperty[] = [];
  const allRules = collectAllRules(ast);

  for (const rule of allRules) {
    const propMap = new Map<string, DeclarationNode[]>();

    for (const decl of rule.declarations) {
      const existing = propMap.get(decl.property) ?? [];
      existing.push(decl);
      propMap.set(decl.property, existing);
    }

    for (const [property, declarations] of propMap) {
      if (declarations.length > 1) {
        const uniqueValues = new Set(declarations.map(d => d.value));
        if (uniqueValues.size > 1) {
          results.push({
            property,
            declarations,
            selector: rule.selectors.join(", "),
          });
        }
      }
    }
  }

  return results;
}

// ─── Specificity conflict detection ──────────────────────────────────────────

export function findSpecificityConflicts(ast: StylesheetNode): SpecificityConflict[] {
  const allRules = collectAllRules(ast);
  const conflicts: SpecificityConflict[] = [];

  for (let i = 0; i < allRules.length; i++) {
    for (let j = i + 1; j < allRules.length; j++) {
      const ruleA = allRules[i];
      const ruleB = allRules[j];

      const propsA = new Set(ruleA.declarations.map(d => d.property));
      const propsB = new Set(ruleB.declarations.map(d => d.property));
      const overlapping: string[] = [];
      for (const p of propsA) {
        if (propsB.has(p)) overlapping.push(p);
      }
      if (overlapping.length === 0) continue;

      const selA = ruleA.selectors[0] ?? "";
      const selB = ruleB.selectors[0] ?? "";

      if (!selectorsMayOverlap(selA, selB)) continue;

      const specA = calculateSpecificity(selA);
      const specB = calculateSpecificity(selB);

      if (
        specA === specB ||
        (Math.abs(specA - specB) <= 10 && overlapping.length > 0)
      ) {
        conflicts.push({
          selectorA: selA,
          selectorB: selB,
          specificityA: formatSpecificity(selA),
          specificityB: formatSpecificity(selB),
          overlappingProperties: overlapping,
          loc: ruleA.loc,
        });
      }
    }
  }

  return conflicts;
}

// ─── Token reference validation ──────────────────────────────────────────────

export function validateTokenRefs(
  ast: StylesheetNode,
  validTokenPaths: Set<string>,
  validTokens: TokenMap,
): TokenValidationResult {
  const valid: TokenRefNode[] = [];
  const invalid: Array<TokenRefNode & { reason: string }> = [];
  const resolved: Array<{ node: TokenRefNode; value: string }> = [];

  const allTokenRefs = collectTokenRefs(ast);

  for (const ref of allTokenRefs) {
    if (validTokenPaths.has(ref.path) && ref.path in validTokens) {
      valid.push(ref);
      resolved.push({ node: ref, value: validTokens[ref.path] });
    } else if (ref.fallback) {
      invalid.push({ ...ref, reason: `Token "${ref.path}" not found, using fallback` });
    } else {
      invalid.push({ ...ref, reason: `Token "${ref.path}" does not exist in the provided token map` });
    }
  }

  return { valid, invalid, resolved };
}

// ─── Bundle size estimation ──────────────────────────────────────────────────

export function estimateBundleSize(ast: StylesheetNode): { minified: number; uncompressed: number } & SizeEstimate {
  const rawCSS = generateRawCSS(ast);
  const uncompressed = new TextEncoder().encode(rawCSS).length;
  const minified = Math.round(uncompressed * 0.7);
  const gzippedEstimate = Math.round(minified * 0.3);

  const allRules = collectAllRules(ast);
  const ruleCount = allRules.length;
  const declarationCount = allRules.reduce(
    (sum, r) => sum + r.declarations.length, 0,
  );

  return { rawBytes: uncompressed, minifiedBytes: minified, gzippedEstimate, ruleCount, declarationCount, minified, uncompressed };
}

// ─── Internal helpers ────────────────────────────────────────────────────────

interface SelectorInfo {
  selector: string;
  loc: SourceLocation;
}

function collectSelectors(ast: StylesheetNode): SelectorInfo[] {
  const results: SelectorInfo[] = [];

  function walkRules(rules: RuleNode[]): void {
    for (const rule of rules) {
      for (const sel of rule.selectors) {
        results.push({ selector: sel, loc: rule.loc });
      }
      walkRules(rule.nestedRules);
    }
  }

  walkRules(ast.rules);
  for (const ar of ast.atRules) {
    for (const node of ar.block) {
      if (node.type === "Rule") {
        walkRules([node]);
      }
    }
  }
  for (const comp of ast.components) {
    walkRules(comp.rules);
    for (const v of comp.variants) walkRules(v.rules);
    for (const s of comp.slots) {
      for (const sel of s.selectors) {
        results.push({ selector: sel, loc: s.loc });
      }
    }
  }
  for (const sem of ast.semantics) {
    walkRules(sem.rules);
  }

  return results;
}

function extractClassNames(selector: string): string[] {
  return selector.match(/\.[a-zA-Z_][\w-]*/g) ?? [];
}

function collectAllRules(ast: StylesheetNode): RuleNode[] {
  const results: RuleNode[] = [];

  function walkRules(rules: RuleNode[]): void {
    for (const rule of rules) {
      results.push(rule);
      walkRules(rule.nestedRules);
    }
  }

  walkRules(ast.rules);
  for (const ar of ast.atRules) {
    for (const node of ar.block) {
      if (node.type === "Rule") walkRules([node]);
    }
  }

  return results;
}

function collectTokenRefs(ast: StylesheetNode): TokenRefNode[] {
  const refs: TokenRefNode[] = [];

  function walkDecls(declarations: DeclarationNode[]): void {
    for (const decl of declarations) {
      if (decl.parsedValue) {
        for (const node of decl.parsedValue) {
          if (node.type === "TokenRef") {
            refs.push(node);
          }
        }
      }
    }
  }

  function walkRules(rules: RuleNode[]): void {
    for (const rule of rules) {
      walkDecls(rule.declarations);
      walkRules(rule.nestedRules);
    }
  }

  walkRules(ast.rules);
  for (const comp of ast.components) {
    walkDecls(comp.declarations);
    walkRules(comp.rules);
    for (const v of comp.variants) { walkDecls(v.declarations); walkRules(v.rules); }
    for (const s of comp.slots) walkDecls(s.declarations);
  }
  for (const sem of ast.semantics) {
    walkRules(sem.rules);
    refs.push(...sem.tokens);
  }

  return refs;
}

// ─── Specificity calculation ─────────────────────────────────────────────────
// Standard CSS specificity: (a, b, c) → a*1000 + b*100 + c

function calculateSpecificity(selector: string): number {
  let a = 0; // ID selectors
  let b = 0; // class, attribute, pseudo-class
  let c = 0; // type, pseudo-element

  const s = selector.replace(/\s*[>+~]\s*/g, " ").trim();

  const idMatches = s.match(/#[a-zA-Z_][\w-]*/g);
  a += idMatches?.length ?? 0;

  const classMatches = s.match(/\.[a-zA-Z_][\w-]*/g);
  b += classMatches?.length ?? 0;

  const attrMatches = s.match(/\[[^\]]*\]/g);
  b += attrMatches?.length ?? 0;

  const pseudoClassRegex = /:(?!:)([\w-]+)(?:\(([^)]+)\))?/g;
  let match: RegExpExecArray | null;
  while ((match = pseudoClassRegex.exec(s)) !== null) {
    const name = match[1];
    const args = match[2];
    if (name === "where") continue;
    if (args && (name === "not" || name === "is" || name === "has")) {
      const argSelectors = args.split(",").map(a => a.trim());
      let maxArgSpec = 0;
      for (const argSel of argSelectors) {
        maxArgSpec = Math.max(maxArgSpec, calculateSpecificity(argSel));
      }
      b += maxArgSpec;
    } else {
      b++;
    }
  }

  const pseudoElementMatches = s.match(/::[\w-]+/g);
  c += pseudoElementMatches?.length ?? 0;

  let cleaned = s
    .replace(/#[a-zA-Z_][\w-]*/g, "")
    .replace(/\.[a-zA-Z_][\w-]*/g, "")
    .replace(/\[[^\]]*\]/g, "")
    .replace(/::?[\w-]+(\([^)]*\))?/g, "")
    .replace(/[*+>~]/g, "")
    .trim();

  const typeSelectors = cleaned.split(/\s+/).filter(t => t.length > 0 && t !== "*");
  c += typeSelectors.length;

  return a * 1000 + b * 100 + c;
}

function formatSpecificity(selector: string): string {
  const spec = calculateSpecificity(selector);
  const a = Math.floor(spec / 1000);
  const b = Math.floor((spec % 1000) / 100);
  const c = spec % 100;
  return `(${a}, ${b}, ${c})`;
}

function selectorsMayOverlap(selA: string, selB: string): boolean {
  const classesA = new Set(extractClassNames(selA));
  const classesB = new Set(extractClassNames(selB));

  for (const cls of classesA) {
    if (classesB.has(cls)) return true;
  }

  const idA = selA.match(/#[a-zA-Z_][\w-]*/)?.[0];
  const idB = selB.match(/#[a-zA-Z_][\w-]*/)?.[0];
  if (idA && idB && idA === idB) return true;

  const typesA = selA
    .replace(/[#.:][\w-]+/g, "").replace(/[\[\]]/g, "")
    .split(/\s*[>+~]\s*/)
    .map(t => t.trim()).filter(Boolean);
  const typesB = selB
    .replace(/[#.:][\w-]+/g, "").replace(/[\[\]]/g, "")
    .split(/\s*[>+~]\s*/)
    .map(t => t.trim()).filter(Boolean);

  for (const t of typesA) {
    if (typesB.includes(t)) return true;
  }

  return false;
}

// ─── Raw CSS generation (for size estimation) ────────────────────────────────

function generateRawCSS(ast: StylesheetNode): string {
  const parts: string[] = [];

  function genRule(rule: RuleNode, indent: string): void {
    parts.push(`${indent}${rule.prelude} {\n`);
    for (const decl of rule.declarations) {
      const imp = decl.important ? " !important" : "";
      parts.push(`${indent}  ${decl.property}: ${decl.value}${imp};\n`);
    }
    for (const nested of rule.nestedRules) {
      genRule(nested, indent + "  ");
    }
    parts.push(`${indent}}\n`);
  }

  for (const imp of ast.imports) {
    parts.push(`@import ${imp.prelude};\n`);
  }

  for (const layer of ast.layers) {
    parts.push(`@layer ${layer.prelude};\n`);
  }

  for (const rule of ast.rules) {
    genRule(rule, "");
  }

  for (const ar of ast.atRules) {
    parts.push(`@${ar.name} ${ar.prelude} {\n`);
    for (const node of ar.block) {
      if (node.type === "Rule") genRule(node, "  ");
      else if (node.type === "Declaration") {
        parts.push(`  ${node.property}: ${node.value}${node.important ? " !important" : ""};\n`);
      }
    }
    parts.push("}\n");
  }

  return parts.join("");
}