/**
 * FerrumEngine v2 — IR Serializer
 *
 * Serializes and deserializes ApplicationIR for caching and transport.
 * Since ApplicationIR uses Map objects (which don't survive JSON.parse),
 * we convert Maps to plain objects for serialization and back for
 * deserialization.
 *
 * Usage:
 *   import { serializeIR, deserializeIR, computeIRHash } from '@/engine/ir/ir-serializer';
 *
 *   // Serialize to JSON string
 *   const json = serializeIR(ir);
 *
 *   // Deserialize back to ApplicationIR
 *   const restored = deserializeIR(json);
 *
 *   // Compute a content hash for cache invalidation
 *   const hash = computeIRHash(ir);
 */

import type {
  ApplicationIR,
  IRControlFlow,
  IRDataFlow,
  IRReference,
  IRSymbol,
} from './ir-types';
import { fnv1aHash } from './ir-builder';

// ──────────────────────────────────────────────────────────────────────
// SERIALIZABLE REPRESENTATION
// ──────────────────────────────────────────────────────────────────────

/**
 * A JSON-serializable representation of ApplicationIR.
 *
 * Maps are converted to arrays of [key, value] pairs.
 * All other fields are preserved as-is.
 */
interface SerializedIR {
  id: string;
  version: number;
  language: string;
  symbols: [string, IRSymbol][];
  references: IRReference[];
  controlFlow: [string, IRControlFlow][];
  dataFlow: IRDataFlow[];
  metadata: {
    createdAt: number;
    sourceHash: string;
    languageAdapters: string[];
  };
}

// ──────────────────────────────────────────────────────────────────────
// SERIALIZE
// ──────────────────────────────────────────────────────────────────────

/**
 * Serialize an ApplicationIR to a JSON string.
 *
 * Converts Map objects to arrays of [key, value] pairs so the
 * result is JSON-compatible. This is suitable for:
 *   - Writing to a cache file on disk
 *   - Sending over a network (HTTP, WebSocket)
 *   - Storing in a database (as JSON)
 *
 * @param ir - The ApplicationIR to serialize.
 * @returns A JSON string representation.
 */
export function serializeIR(ir: ApplicationIR): string {
  const serializable: SerializedIR = {
    id: ir.id,
    version: ir.version,
    language: ir.language,
    symbols: Array.from(ir.symbols.entries()),
    references: ir.references,
    controlFlow: Array.from(ir.controlFlow.entries()),
    dataFlow: ir.dataFlow,
    metadata: ir.metadata,
  };

  return JSON.stringify(serializable);
}

// ──────────────────────────────────────────────────────────────────────
// DESERIALIZE
// ──────────────────────────────────────────────────────────────────────

/**
 * Deserialize a JSON string back into an ApplicationIR.
 *
 * Reconstructs Map objects from [key, value] pair arrays.
 * Validates the basic structure of the deserialized data.
 *
 * @param data - A JSON string produced by serializeIR.
 * @returns A fully reconstructed ApplicationIR.
 * @throws Error if the data is not valid serialized IR.
 */
export function deserializeIR(data: string): ApplicationIR {
  let parsed: unknown;

  try {
    parsed = JSON.parse(data);
  } catch (e) {
    throw new Error(`Failed to parse IR JSON: ${(e as Error).message}`);
  }

  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Invalid IR: expected an object');
  }

  const obj = parsed as SerializedIR;

  // Validate required fields
  if (typeof obj.id !== 'string') throw new Error('Invalid IR: missing or invalid id');
  if (typeof obj.version !== 'number') throw new Error('Invalid IR: missing or invalid version');
  if (typeof obj.language !== 'string') throw new Error('Invalid IR: missing or invalid language');
  if (!Array.isArray(obj.symbols)) throw new Error('Invalid IR: missing or invalid symbols');
  if (!Array.isArray(obj.references)) throw new Error('Invalid IR: missing or invalid references');
  if (!Array.isArray(obj.controlFlow)) throw new Error('Invalid IR: missing or invalid controlFlow');
  if (!Array.isArray(obj.dataFlow)) throw new Error('Invalid IR: missing or invalid dataFlow');
  if (!obj.metadata || typeof obj.metadata !== 'object') {
    throw new Error('Invalid IR: missing or invalid metadata');
  }

  // Reconstruct Maps
  const symbols = new Map<string, IRSymbol>();
  for (const [key, value] of obj.symbols) {
    symbols.set(key, value as IRSymbol);
  }

  const controlFlow = new Map<string, IRControlFlow>();
  for (const [key, value] of obj.controlFlow) {
    controlFlow.set(key, value as IRControlFlow);
  }

  return {
    id: obj.id,
    version: obj.version,
    language: obj.language,
    symbols,
    references: obj.references as IRReference[],
    controlFlow,
    dataFlow: obj.dataFlow as IRDataFlow[],
    metadata: obj.metadata,
  };
}

// ──────────────────────────────────────────────────────────────────────
// HASH COMPUTATION
// ──────────────────────────────────────────────────────────────────────

/**
 * Compute a content hash for an ApplicationIR.
 *
 * This hash considers:
 *   - All symbol IDs, kinds, and names
 *   - All reference from/to/kind triples
 *   - All control flow node IDs and kinds
 *   - All data flow from/to/kind triples
 *   - IR version and language
 *
 * The hash is deterministic: two IRs with identical content will
 * produce identical hashes. This is useful for:
 *   - Cache invalidation (compare hashes instead of full IRs)
 *   - Change detection (hash differs → content changed)
 *   - Deduplication (same hash → same content)
 *
 * @param ir - The ApplicationIR to hash.
 * @returns An 8-character hex hash string.
 */
export function computeIRHash(ir: ApplicationIR): string {
  const parts: string[] = [];

  // Version and language
  parts.push(`v${ir.version}`);
  parts.push(`lang:${ir.language}`);

  // Symbols (sorted by ID for determinism)
  const symbolEntries = Array.from(ir.symbols.entries()).sort(([a], [b]) => a.localeCompare(b));
  for (const [id, sym] of symbolEntries) {
    parts.push(`sym:${id}:${sym.kind}:${sym.name}`);
  }

  // References (sorted by from+to+kind for determinism)
  const sortedRefs = [...ir.references].sort((a, b) => {
    const keyA = `${a.from}|${a.to}|${a.kind}`;
    const keyB = `${b.from}|${b.to}|${b.kind}`;
    return keyA.localeCompare(keyB);
  });
  for (const ref of sortedRefs) {
    parts.push(`ref:${ref.from}|${ref.to}|${ref.kind}`);
  }

  // Control flow (sorted by ID)
  const cfEntries = Array.from(ir.controlFlow.entries()).sort(([a], [b]) => a.localeCompare(b));
  for (const [id, node] of cfEntries) {
    parts.push(`cf:${id}:${node.kind}`);
  }

  // Data flow (sorted by from+to+kind)
  const sortedDF = [...ir.dataFlow].sort((a, b) => {
    const keyA = `${a.from}|${a.to}|${a.kind}`;
    const keyB = `${b.from}|${b.to}|${b.kind}`;
    return keyA.localeCompare(keyB);
  });
  for (const df of sortedDF) {
    parts.push(`df:${df.from}|${df.to}|${df.kind}`);
  }

  return fnv1aHash(parts.join('\n'));
}

// ──────────────────────────────────────────────────────────────────────
// CACHE VALIDATION
// ──────────────────────────────────────────────────────────────────────

/**
 * Check if a cached IR is still valid by comparing its hash
 * with a freshly computed one.
 *
 * @param cachedIR  - The previously cached IR.
 * @param currentIR - The freshly built IR.
 * @returns True if the cached IR matches the current IR.
 */
export function isIRCacheValid(
  cachedIR: ApplicationIR,
  currentIR: ApplicationIR,
): boolean {
  return computeIRHash(cachedIR) === computeIRHash(currentIR);
}

/**
 * Serialize an ApplicationIR to a compact binary-like format.
 *
 * Uses a minimal JSON representation with key shortening
 * for reduced storage size. Suitable for network transport
 * where bandwidth matters.
 *
 * @param ir - The ApplicationIR to compact.
 * @returns A compact JSON string.
 */
export function serializeIRCompact(ir: ApplicationIR): string {
  // Compact symbol representation
  const compactSymbols = Array.from(ir.symbols.values()).map((s) => ({
    i: s.id,
    n: s.name,
    k: s.kind,
    l: s.language,
    f: s.filePath,
    loc: [s.location.line, s.location.column, s.location.endLine, s.location.endColumn],
    m: s.modifiers,
    t: s.typeRef?.name,
    d: s.documentation,
  }));

  // Compact reference representation
  const compactRefs = ir.references.map((r) => ({
    f: r.from,
    t: r.to,
    k: r.kind,
    loc: r.location ? [r.location.line, r.location.column] : undefined,
  }));

  return JSON.stringify({
    v: ir.version,
    lang: ir.language,
    syms: compactSymbols,
    refs: compactRefs,
    meta: ir.metadata,
  });
}
