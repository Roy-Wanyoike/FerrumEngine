/**
 * FerrumEngine v2 — Application IR (Barrel Exports)
 *
 * Language-independent intermediate representation for the
 * Ferrum Intelligence Engine. The Application IR provides a
 * universal model for representing code structure, references,
 * control flow, and data flow across any programming language.
 *
 * Usage:
 *   import { buildIR, mergeIR, serializeIR, deserializeIR, buildTypeScriptIR } from '@/engine/ir';
 *
 *   // Build IR from TypeScript source
 *   const { symbols, references } = buildTypeScriptIR(filePath, content);
 *   const ir = buildIR(symbols, references, { language: 'typescript' });
 *
 *   // Serialize for caching
 *   const json = serializeIR(ir);
 *   const restored = deserializeIR(json);
 *
 *   // Merge multiple language IRs
 *   const merged = mergeIR([tsIR, goIR]);
 */

// ── Core Types ───────────────────────────────────────────────────────
export type {
  IRSymbolKind,
  IRModifier,
  IRReferenceKind,
  IRTypeRef,
  IRLocation,
  IRPointLocation,
  IRLineLocation,
  IRSymbol,
  IRReference,
  IRControlFlow,
  IRDataFlow,
  ApplicationIR,
  IRBuilderConfig,
  IRLanguageAdapter,
  IRQueryResult,
  IRStats,
} from './ir-types';

// ── Builder ──────────────────────────────────────────────────────────
export {
  IR_VERSION,
  generateSymbolId,
  generateCFId,
  generateIRId,
  fnv1aHash,
  buildIR,
  buildControlFlow,
  mergeIR,
  queryIR,
  computeIRStats,
  getSymbolById,
  getOutgoingReferences,
  getIncomingReferences,
} from './ir-builder';

// ── Serializer ───────────────────────────────────────────────────────
export {
  serializeIR,
  deserializeIR,
  computeIRHash,
  isIRCacheValid,
  serializeIRCompact,
} from './ir-serializer';

// ── TypeScript Adapter ───────────────────────────────────────────────
export {
  isTypeScriptAdapterAvailable,
  buildTypeScriptIR,
  typescriptAdapter,
} from './typescript-adapter';
