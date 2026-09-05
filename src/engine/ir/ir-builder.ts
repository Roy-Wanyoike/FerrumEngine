/**
 * FerrumEngine v2 — IR Builder
 *
 * Builds an ApplicationIR from extracted symbols and references,
 * and provides utilities for merging multiple language-specific IRs
 * into a single unified IR.
 *
 * Usage:
 *   import { buildIR, mergeIR } from '@/engine/ir/ir-builder';
 *
 *   // Build from a single language
 *   const ir = buildIR(symbols, references, { language: 'typescript' });
 *
 *   // Merge multiple languages
 *   const merged = mergeIR([tsIR, goIR, pythonIR]);
 */

import type {
  ApplicationIR,
  IRBuilderConfig,
  IRControlFlow,
  IRDataFlow,
  IRReference,
  IRSymbol,
  IRStats,
  IRQueryResult,
  IRSymbolKind,
  IRReferenceKind,
} from './ir-types';

// ──────────────────────────────────────────────────────────────────────
// CONSTANTS
// ──────────────────────────────────────────────────────────────────────

/** Current IR schema version. */
export const IR_VERSION = 1;

// ──────────────────────────────────────────────────────────────────────
// ID GENERATION
// ──────────────────────────────────────────────────────────────────────

/**
 * Generate a globally unique symbol ID.
 *
 * Format: `filePath:kind:name`
 * This format is stable, human-readable, and sortable.
 */
export function generateSymbolId(
  filePath: string,
  kind: IRSymbolKind,
  name: string,
): string {
  return `${filePath}:${kind}:${name}`;
}

/**
 * Generate a unique control flow node ID.
 *
 * Format: `cf:symbolId:index`
 */
export function generateCFId(symbolId: string, index: number): string {
  return `cf:${symbolId}:${index}`;
}

/**
 * Generate a unique IR ID for the project.
 *
 * Format: `ir:language:timestamp`
 */
export function generateIRId(language: string): string {
  return `ir:${language}:${Date.now()}`;
}

// ──────────────────────────────────────────────────────────────────────
// HASH UTILITY
// ──────────────────────────────────────────────────────────────────────

/**
 * Compute a simple hash of a string using FNV-1a.
 *
 * This is used for source content hashing (change detection),
 * NOT for cryptographic purposes.
 */
export function fnv1aHash(input: string): string {
  let hash = 0x811c9dc5; // FNV offset basis (32-bit)
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193); // FNV prime (32-bit)
    hash = hash >>> 0; // Ensure unsigned 32-bit
  }
  return hash.toString(16).padStart(8, '0');
}

// ──────────────────────────────────────────────────────────────────────
// BUILD IR
// ──────────────────────────────────────────────────────────────────────

/**
 * Build an ApplicationIR from extracted symbols and references.
 *
 * This is the primary entry point for constructing an IR from a
 * single language's source files. The builder:
 *
 *   1. Indexes all symbols by ID into a Map for O(1) lookup
 *   2. Validates references (both endpoints must exist as symbols)
 *   3. Optionally extracts control flow (if includeControlFlow is true)
 *   4. Optionally extracts data flow (if includeDataFlow is true)
 *   5. Computes a source hash from the symbol data
 *
 * @param symbols  - Extracted symbols from language adapter(s).
 * @param references - Extracted references between symbols.
 * @param config  - Builder configuration.
 * @returns A complete ApplicationIR.
 */
export function buildIR(
  symbols: IRSymbol[],
  references: IRReference[],
  config: IRBuilderConfig,
): ApplicationIR {
  const symbolMap = new Map<string, IRSymbol>();

  // Apply maxSymbolCount limit if configured
  const maxCount = config.maxSymbolCount ?? 0;
  const symbolsToIndex = maxCount > 0 ? symbols.slice(0, maxCount) : symbols;

  for (const symbol of symbolsToIndex) {
    symbolMap.set(symbol.id, symbol);
  }

  // Validate references — only keep those where both endpoints exist
  const validReferences = references.filter((ref) => {
    const fromExists = symbolMap.has(ref.from);
    const toExists = symbolMap.has(ref.to);
    return fromExists && toExists;
  });

  // Build control flow (if enabled)
  const controlFlow = new Map<string, IRControlFlow>();
  if (config.includeControlFlow) {
    for (const symbol of symbolsToIndex) {
      if (
        symbol.kind === 'function' ||
        symbol.kind === 'method' ||
        symbol.kind === 'constructor'
      ) {
        const cfNodes = extractControlFlow(symbol);
        for (const node of cfNodes) {
          controlFlow.set(node.id, node);
        }
      }
    }
  }

  // Build data flow (if enabled)
  const dataFlow: IRDataFlow[] = [];
  if (config.includeDataFlow) {
    for (const ref of validReferences) {
      if (ref.kind === 'call') {
        dataFlow.push({
          from: ref.from,
          to: ref.to,
          kind: 'parameter',
          location: ref.location ? { line: ref.location.line } : undefined,
        });
      }
    }
  }

  // Compute source hash
  const sourceData = symbolsToIndex
    .map((s) => `${s.id}:${s.kind}:${s.name}`)
    .sort()
    .join('|');
  const sourceHash = fnv1aHash(sourceData);

  return {
    id: generateIRId(config.language),
    version: IR_VERSION,
    language: config.language,
    symbols: symbolMap,
    references: validReferences,
    controlFlow,
    dataFlow,
    metadata: {
      createdAt: Date.now(),
      sourceHash,
      languageAdapters: [config.language],
    },
  };
}

// ──────────────────────────────────────────────────────────────────────
// CONTROL FLOW EXTRACTION (heuristic)
// ──────────────────────────────────────────────────────────────────────

/**
 * Extract basic control flow nodes for a function/method symbol.
 *
 * This is a heuristic extraction that creates a simple linear CFG:
 *   - Entry block → Body block → Exit block
 *
 * Language adapters can provide more accurate CFGs by overriding
 * this with AST-based analysis.
 */
function extractControlFlow(symbol: IRSymbol): IRControlFlow[] {
  const nodes: IRControlFlow[] = [];
  const baseId = symbol.id;

  // Entry block
  const entryId = generateCFId(baseId, 0);
  const bodyId = generateCFId(baseId, 1);
  const exitId = generateCFId(baseId, 2);

  nodes.push({
    id: entryId,
    symbolId: symbol.id,
    kind: 'block',
    predecessors: [],
    successors: [bodyId],
  });

  // Body block
  nodes.push({
    id: bodyId,
    symbolId: symbol.id,
    kind: 'block',
    predecessors: [entryId],
    successors: [exitId],
  });

  // Exit block (return)
  nodes.push({
    id: exitId,
    symbolId: symbol.id,
    kind: 'return',
    predecessors: [bodyId],
    successors: [],
  });

  return nodes;
}

/**
 * Build control flow from explicit branch/loop information.
 *
 * This allows language adapters to provide richer CFGs by
 * specifying branch conditions and loop structures.
 */
export function buildControlFlow(
  symbolId: string,
  nodes: Array<{
    kind: IRControlFlow['kind'];
    condition?: string;
  }>,
): IRControlFlow[] {
  const result: IRControlFlow[] = [];

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]!;
    const id = generateCFId(symbolId, i);
    const predecessors = i > 0 ? [generateCFId(symbolId, i - 1)] : [];
    const successors = i < nodes.length - 1 ? [generateCFId(symbolId, i + 1)] : [];

    result.push({
      id,
      symbolId,
      kind: node.kind,
      predecessors,
      successors,
      condition: node.condition,
    });
  }

  return result;
}

// ──────────────────────────────────────────────────────────────────────
// MERGE IR
// ──────────────────────────────────────────────────────────────────────

/**
 * Merge multiple ApplicationIRs into a single unified IR.
 *
 * This is used when a project contains code in multiple languages
 * (e.g., TypeScript frontend + Go backend). The merge:
 *
 *   1. Combines all symbol maps (deduplicating by ID)
 *   2. Combines all reference arrays (deduplicating by from+to+kind)
 *   3. Combines all control flow maps
 *   4. Combines all data flow arrays
 *   5. Uses the highest IR version among inputs
 *   6. Merges metadata (language adapters, source hashes)
 *
 * @param irs - Array of ApplicationIRs to merge.
 * @returns A unified ApplicationIR.
 */
export function mergeIR(irs: ApplicationIR[]): ApplicationIR {
  if (irs.length === 0) {
    return {
      id: generateIRId('unknown'),
      version: IR_VERSION,
      language: 'unknown',
      symbols: new Map(),
      references: [],
      controlFlow: new Map(),
      dataFlow: [],
      metadata: {
        createdAt: Date.now(),
        sourceHash: '',
        languageAdapters: [],
      },
    };
  }

  if (irs.length === 1) {
    return irs[0]!;
  }

  // Merge symbols (last-write-wins for duplicate IDs)
  const mergedSymbols = new Map<string, IRSymbol>();
  for (const ir of irs) {
    for (const [id, symbol] of ir.symbols) {
      mergedSymbols.set(id, symbol);
    }
  }

  // Merge references (deduplicate by from+to+kind)
  const refKeys = new Set<string>();
  const mergedReferences: IRReference[] = [];
  for (const ir of irs) {
    for (const ref of ir.references) {
      const key = `${ref.from}|${ref.to}|${ref.kind}`;
      if (!refKeys.has(key)) {
        refKeys.add(key);
        mergedReferences.push(ref);
      }
    }
  }

  // Merge control flow
  const mergedCF = new Map<string, IRControlFlow>();
  for (const ir of irs) {
    for (const [id, node] of ir.controlFlow) {
      mergedCF.set(id, node);
    }
  }

  // Merge data flow
  const mergedDF: IRDataFlow[] = [];
  const dfKeys = new Set<string>();
  for (const ir of irs) {
    for (const df of ir.dataFlow) {
      const key = `${df.from}|${df.to}|${df.kind}`;
      if (!dfKeys.has(key)) {
        dfKeys.add(key);
        mergedDF.push(df);
      }
    }
  }

  // Determine merged language (most common, or 'multi')
  const langCounts = new Map<string, number>();
  for (const ir of irs) {
    langCounts.set(ir.language, (langCounts.get(ir.language) ?? 0) + 1);
  }
  const mergedLanguage =
    langCounts.size === 1 ? irs[0]!.language : 'multi';

  // Merge metadata
  const allAdapters = [...new Set(irs.flatMap((ir) => ir.metadata.languageAdapters))];
  const combinedHash = fnv1aHash(
    irs.map((ir) => ir.metadata.sourceHash).sort().join('+'),
  );

  return {
    id: generateIRId(mergedLanguage),
    version: Math.max(...irs.map((ir) => ir.version)),
    language: mergedLanguage,
    symbols: mergedSymbols,
    references: mergedReferences,
    controlFlow: mergedCF,
    dataFlow: mergedDF,
    metadata: {
      createdAt: Math.min(...irs.map((ir) => ir.metadata.createdAt)),
      sourceHash: combinedHash,
      languageAdapters: allAdapters,
    },
  };
}

// ──────────────────────────────────────────────────────────────────────
// QUERY
// ──────────────────────────────────────────────────────────────────────

/**
 * Query the IR for symbols matching a predicate.
 *
 * Returns matching symbols and all references involving them.
 */
export function queryIR(
  ir: ApplicationIR,
  predicate: (symbol: IRSymbol) => boolean,
): IRQueryResult {
  const matchingSymbols: IRSymbol[] = [];
  const matchingIds = new Set<string>();

  for (const symbol of ir.symbols.values()) {
    if (predicate(symbol)) {
      matchingSymbols.push(symbol);
      matchingIds.add(symbol.id);
    }
  }

  const matchingReferences = ir.references.filter(
    (ref) => matchingIds.has(ref.from) || matchingIds.has(ref.to),
  );

  return {
    symbols: matchingSymbols,
    references: matchingReferences,
    count: matchingSymbols.length,
  };
}

/**
 * Compute statistics for an ApplicationIR.
 */
export function computeIRStats(ir: ApplicationIR): IRStats {
  const symbolsByKind = {} as Record<IRSymbolKind, number>;
  const referencesByKind = {} as Record<IRReferenceKind, number>;
  const languages = new Set<string>();

  for (const symbol of ir.symbols.values()) {
    symbolsByKind[symbol.kind] = (symbolsByKind[symbol.kind] ?? 0) + 1;
    languages.add(symbol.language);
  }

  for (const ref of ir.references) {
    referencesByKind[ref.kind] = (referencesByKind[ref.kind] ?? 0) + 1;
  }

  return {
    symbolCount: ir.symbols.size,
    symbolsByKind,
    referenceCount: ir.references.length,
    referencesByKind,
    controlFlowCount: ir.controlFlow.size,
    dataFlowCount: ir.dataFlow.length,
    languages: [...languages],
  };
}

/**
 * Look up a symbol by ID.
 */
export function getSymbolById(ir: ApplicationIR, id: string): IRSymbol | undefined {
  return ir.symbols.get(id);
}

/**
 * Get all references from a given symbol.
 */
export function getOutgoingReferences(ir: ApplicationIR, symbolId: string): IRReference[] {
  return ir.references.filter((ref) => ref.from === symbolId);
}

/**
 * Get all references to a given symbol.
 */
export function getIncomingReferences(ir: ApplicationIR, symbolId: string): IRReference[] {
  return ir.references.filter((ref) => ref.to === symbolId);
}
