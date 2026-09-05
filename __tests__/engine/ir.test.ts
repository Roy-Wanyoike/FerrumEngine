/**
 * Tests for the FerrumEngine Application IR.
 *
 * Validates the language-independent intermediate representation:
 *   - IR type creation and validation
 *   - TypeScript adapter: parse React component, utility module, API route
 *   - IR builder: build from symbols, merge multiple IRs
 *   - IR serializer: round-trip, hash computation
 *   - Cross-language symbol resolution
 *   - Control flow extraction
 *   - Data flow extraction
 */

import { describe, it, expect } from 'vitest';
import type {
  IRSymbol,
  IRReference,
  IRControlFlow,
  IRDataFlow,
  ApplicationIR,
  IRBuilderConfig,
  IRTypeRef,
} from '@/engine/ir/ir-types';
import {
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
  IR_VERSION,
} from '@/engine/ir/ir-builder';
import {
  serializeIR,
  deserializeIR,
  computeIRHash,
  isIRCacheValid,
} from '@/engine/ir/ir-serializer';
import {
  buildTypeScriptIR,
  isTypeScriptAdapterAvailable,
  typescriptAdapter,
} from '@/engine/ir/typescript-adapter';

// ──────────────────────────────────────────────────────────────────────
// HELPERS
// ──────────────────────────────────────────────────────────────────────

function makeSymbol(
  name: string,
  kind: IRSymbol['kind'] = 'function',
  filePath = 'src/test.ts',
  language = 'typescript',
): IRSymbol {
  return {
    id: generateSymbolId(filePath, kind, name),
    name,
    kind,
    language,
    filePath,
    location: { line: 1, column: 1, endLine: 10, endColumn: 1 },
    modifiers: [],
  };
}

function makeRef(from: string, to: string, kind: IRReference['kind'] = 'call'): IRReference {
  return { from, to, kind };
}

const defaultConfig: IRBuilderConfig = { language: 'typescript' };

// ──────────────────────────────────────────────────────────────────────
// 1. IR TYPE CREATION
// ──────────────────────────────────────────────────────────────────────

describe('IR Types — Symbol Creation', () => {
  it('should create a symbol with all fields', () => {
    const sym: IRSymbol = {
      id: 'src/app.tsx:function:Page',
      name: 'Page',
      kind: 'function',
      language: 'typescript',
      filePath: 'src/app.tsx',
      location: { line: 1, column: 1, endLine: 20, endColumn: 1 },
      modifiers: ['export', 'async'],
      typeRef: { name: 'JSX.Element' },
      documentation: 'The main page component',
      metadata: { framework: 'next' },
    };

    expect(sym.id).toBe('src/app.tsx:function:Page');
    expect(sym.name).toBe('Page');
    expect(sym.kind).toBe('function');
    expect(sym.language).toBe('typescript');
    expect(sym.modifiers).toContain('export');
    expect(sym.modifiers).toContain('async');
    expect(sym.typeRef?.name).toBe('JSX.Element');
    expect(sym.documentation).toBe('The main page component');
  });

  it('should create a type reference with generics', () => {
    const typeRef: IRTypeRef = {
      name: 'Array',
      typeArguments: [{ name: 'number' }],
    };
    expect(typeRef.name).toBe('Array');
    expect(typeRef.typeArguments).toHaveLength(1);
    expect(typeRef.typeArguments![0]!.name).toBe('number');
  });

  it('should create a nullable type reference', () => {
    const typeRef: IRTypeRef = { name: 'string', isNullable: true };
    expect(typeRef.isNullable).toBe(true);
  });

  it('should support all symbol kinds', () => {
    const kinds: IRSymbol['kind'][] = [
      'function', 'class', 'method', 'variable', 'type', 'interface',
      'enum', 'constant', 'module', 'namespace', 'property', 'parameter',
      'constructor', 'decorator', 'operator', 'macro', 'trait', 'impl',
    ];
    for (const kind of kinds) {
      const sym = makeSymbol('test', kind);
      expect(sym.kind).toBe(kind);
    }
  });

  it('should support all modifier types', () => {
    const modifiers: IRSymbol['modifiers'] = [
      'export', 'private', 'protected', 'public', 'static', 'async',
      'abstract', 'readonly', 'const', 'mut', 'final', 'override', 'deprecated', 'internal',
    ];
    const sym: IRSymbol = {
      ...makeSymbol('test'),
      modifiers: modifiers as any,
    };
    expect(sym.modifiers).toHaveLength(14);
  });
});

// ──────────────────────────────────────────────────────────────────────
// 2. ID GENERATION
// ──────────────────────────────────────────────────────────────────────

describe('IR Builder — ID Generation', () => {
  it('should generate stable symbol IDs', () => {
    const id1 = generateSymbolId('src/app.ts', 'function', 'Page');
    const id2 = generateSymbolId('src/app.ts', 'function', 'Page');
    expect(id1).toBe(id2);
    expect(id1).toBe('src/app.ts:function:Page');
  });

  it('should generate unique IDs for different symbols', () => {
    const id1 = generateSymbolId('src/app.ts', 'function', 'Page');
    const id2 = generateSymbolId('src/app.ts', 'class', 'Page');
    const id3 = generateSymbolId('src/other.ts', 'function', 'Page');
    expect(id1).not.toBe(id2);
    expect(id1).not.toBe(id3);
    expect(id2).not.toBe(id3);
  });

  it('should generate CF IDs', () => {
    const id = generateCFId('sym1', 0);
    expect(id).toBe('cf:sym1:0');
  });

  it('should generate IR IDs with timestamp', () => {
    const id = generateIRId('typescript');
    expect(id).toMatch(/^ir:typescript:\d+$/);
  });
});

// ──────────────────────────────────────────────────────────────────────
// 3. HASH UTILITY
// ──────────────────────────────────────────────────────────────────────

describe('IR Builder — FNV-1a Hash', () => {
  it('should produce deterministic hashes', () => {
    expect(fnv1aHash('hello')).toBe(fnv1aHash('hello'));
  });

  it('should produce different hashes for different inputs', () => {
    expect(fnv1aHash('hello')).not.toBe(fnv1aHash('world'));
  });

  it('should produce 8-character hex strings', () => {
    const hash = fnv1aHash('test');
    expect(hash).toHaveLength(8);
    expect(hash).toMatch(/^[0-9a-f]{8}$/);
  });

  it('should handle empty strings', () => {
    const hash = fnv1aHash('');
    expect(hash).toHaveLength(8);
  });
});

// ──────────────────────────────────────────────────────────────────────
// 4. IR BUILDER
// ──────────────────────────────────────────────────────────────────────

describe('IR Builder — buildIR', () => {
  it('should build an IR from symbols and references', () => {
    const sym1 = makeSymbol('Page', 'function');
    const sym2 = makeSymbol('render', 'function');
    const ref = makeRef(sym1.id, sym2.id, 'call');

    const ir = buildIR([sym1, sym2], [ref], defaultConfig);

    expect(ir.symbols.size).toBe(2);
    expect(ir.references).toHaveLength(1);
    expect(ir.version).toBe(IR_VERSION);
    expect(ir.language).toBe('typescript');
  });

  it('should filter out invalid references', () => {
    const sym1 = makeSymbol('Page', 'function');
    const validRef = makeRef(sym1.id, sym1.id, 'call');
    const invalidRef = makeRef(sym1.id, 'nonexistent:id', 'call');

    const ir = buildIR([sym1], [validRef, invalidRef], defaultConfig);
    expect(ir.references).toHaveLength(1);
  });

  it('should respect maxSymbolCount', () => {
    const symbols = Array.from({ length: 10 }, (_, i) =>
      makeSymbol(`sym${i}`, 'function'),
    );
    const ir = buildIR(symbols, [], { ...defaultConfig, maxSymbolCount: 3 });
    expect(ir.symbols.size).toBe(3);
  });

  it('should extract control flow when enabled', () => {
    const sym = makeSymbol('myFunc', 'function');
    const ir = buildIR([sym], [], { ...defaultConfig, includeControlFlow: true });
    expect(ir.controlFlow.size).toBeGreaterThan(0);
  });

  it('should skip control flow when disabled', () => {
    const sym = makeSymbol('myFunc', 'function');
    const ir = buildIR([sym], [], { ...defaultConfig, includeControlFlow: false });
    expect(ir.controlFlow.size).toBe(0);
  });

  it('should extract data flow when enabled', () => {
    const sym1 = makeSymbol('caller', 'function');
    const sym2 = makeSymbol('callee', 'function');
    const ref = makeRef(sym1.id, sym2.id, 'call');

    const ir = buildIR([sym1, sym2], [ref], { ...defaultConfig, includeDataFlow: true });
    expect(ir.dataFlow.length).toBeGreaterThan(0);
  });

  it('should compute a source hash', () => {
    const sym = makeSymbol('test', 'function');
    const ir = buildIR([sym], [], defaultConfig);
    expect(ir.metadata.sourceHash).toBeTruthy();
    expect(ir.metadata.sourceHash).toHaveLength(8);
  });

  it('should record language adapters in metadata', () => {
    const ir = buildIR([], [], defaultConfig);
    expect(ir.metadata.languageAdapters).toContain('typescript');
  });
});

// ──────────────────────────────────────────────────────────────────────
// 5. MERGE IR
// ──────────────────────────────────────────────────────────────────────

describe('IR Builder — mergeIR', () => {
  it('should merge two IRs', () => {
    const sym1 = makeSymbol('tsFunc', 'function', 'src/a.ts', 'typescript');
    const sym2 = makeSymbol('goFunc', 'function', 'main.go', 'go');

    const ir1 = buildIR([sym1], [], { language: 'typescript' });
    const ir2 = buildIR([sym2], [], { language: 'go' });

    const merged = mergeIR([ir1, ir2]);
    expect(merged.symbols.size).toBe(2);
    expect(merged.language).toBe('multi');
    expect(merged.metadata.languageAdapters).toContain('typescript');
    expect(merged.metadata.languageAdapters).toContain('go');
  });

  it('should deduplicate references on merge', () => {
    const sym1 = makeSymbol('A', 'function');
    const sym2 = makeSymbol('B', 'function');
    const ref = makeRef(sym1.id, sym2.id, 'call');

    const ir1 = buildIR([sym1, sym2], [ref], defaultConfig);
    const ir2 = buildIR([sym1, sym2], [ref], defaultConfig);

    const merged = mergeIR([ir1, ir2]);
    // Should only have one reference (deduplicated)
    expect(merged.references.filter(r => r.from === ref.from && r.to === ref.to && r.kind === ref.kind)).toHaveLength(1);
  });

  it('should return empty IR for empty array', () => {
    const merged = mergeIR([]);
    expect(merged.symbols.size).toBe(0);
    expect(merged.language).toBe('unknown');
  });

  it('should return the same IR for single-element array', () => {
    const ir = buildIR([], [], defaultConfig);
    const merged = mergeIR([ir]);
    expect(merged).toBe(ir);
  });

  it('should use highest version among inputs', () => {
    const ir1 = buildIR([], [], defaultConfig);
    const ir2 = buildIR([], [], { language: 'go' });
    ir2.version = 5;

    const merged = mergeIR([ir1, ir2]);
    expect(merged.version).toBe(5);
  });
});

// ──────────────────────────────────────────────────────────────────────
// 6. CONTROL FLOW
// ──────────────────────────────────────────────────────────────────────

describe('IR Builder — Control Flow', () => {
  it('should build control flow with explicit nodes', () => {
    const nodes = buildControlFlow('sym1', [
      { kind: 'block' },
      { kind: 'branch', condition: 'x > 0' },
      { kind: 'return' },
    ]);

    expect(nodes).toHaveLength(3);
    expect(nodes[0]!.kind).toBe('block');
    expect(nodes[1]!.kind).toBe('branch');
    expect(nodes[1]!.condition).toBe('x > 0');
    expect(nodes[2]!.kind).toBe('return');
  });

  it('should link predecessor/successor correctly', () => {
    const nodes = buildControlFlow('sym1', [
      { kind: 'block' },
      { kind: 'loop', condition: 'i < n' },
      { kind: 'return' },
    ]);

    // First node has no predecessors, last has no successors
    expect(nodes[0]!.predecessors).toHaveLength(0);
    expect(nodes[0]!.successors).toHaveLength(1);
    expect(nodes[2]!.predecessors).toHaveLength(1);
    expect(nodes[2]!.successors).toHaveLength(0);
  });

  it('should create entry/body/exit blocks for functions', () => {
    const sym = makeSymbol('myFunc', 'function');
    const ir = buildIR([sym], [], { ...defaultConfig, includeControlFlow: true });

    const cfNodes = Array.from(ir.controlFlow.values());
    expect(cfNodes.length).toBeGreaterThanOrEqual(3);

    const kinds = cfNodes.map(n => n.kind);
    expect(kinds).toContain('block');
    expect(kinds).toContain('return');
  });
});

// ──────────────────────────────────────────────────────────────────────
// 7. DATA FLOW
// ──────────────────────────────────────────────────────────────────────

describe('IR Builder — Data Flow', () => {
  it('should create data flow edges for call references', () => {
    const sym1 = makeSymbol('caller', 'function');
    const sym2 = makeSymbol('callee', 'function');
    const ref = makeRef(sym1.id, sym2.id, 'call');

    const ir = buildIR([sym1, sym2], [ref], { ...defaultConfig, includeDataFlow: true });
    expect(ir.dataFlow).toHaveLength(1);
    expect(ir.dataFlow[0]!.kind).toBe('parameter');
    expect(ir.dataFlow[0]!.from).toBe(sym1.id);
    expect(ir.dataFlow[0]!.to).toBe(sym2.id);
  });
});

// ──────────────────────────────────────────────────────────────────────
// 8. IR SERIALIZER
// ──────────────────────────────────────────────────────────────────────

describe('IR Serializer — Round-trip', () => {
  it('should serialize and deserialize an IR', () => {
    const sym1 = makeSymbol('Page', 'function');
    const sym2 = makeSymbol('Navbar', 'class');
    const ref = makeRef(sym1.id, sym2.id, 'call');

    const ir = buildIR([sym1, sym2], [ref], defaultConfig);

    const json = serializeIR(ir);
    expect(typeof json).toBe('string');

    const restored = deserializeIR(json);
    expect(restored.symbols.size).toBe(2);
    expect(restored.references).toHaveLength(1);
    expect(restored.language).toBe('typescript');
    expect(restored.version).toBe(IR_VERSION);
  });

  it('should preserve symbol data through round-trip', () => {
    const sym: IRSymbol = {
      id: generateSymbolId('src/app.ts', 'function', 'Page'),
      name: 'Page',
      kind: 'function',
      language: 'typescript',
      filePath: 'src/app.ts',
      location: { line: 1, column: 1, endLine: 20, endColumn: 5 },
      modifiers: ['export', 'async'],
      typeRef: { name: 'Promise', typeArguments: [{ name: 'void' }] },
      documentation: 'The page component',
      metadata: { framework: 'next' },
    };

    const ir = buildIR([sym], [], defaultConfig);
    const restored = deserializeIR(serializeIR(ir));

    const restoredSym = restored.symbols.get(sym.id);
    expect(restoredSym).toBeDefined();
    expect(restoredSym!.name).toBe('Page');
    expect(restoredSym!.modifiers).toEqual(['export', 'async']);
    expect(restoredSym!.documentation).toBe('The page component');
  });

  it('should throw on invalid JSON', () => {
    expect(() => deserializeIR('not json')).toThrow();
  });

  it('should throw on invalid IR structure', () => {
    expect(() => deserializeIR('{}')).toThrow();
  });
});

describe('IR Serializer — Hash Computation', () => {
  it('should produce deterministic hashes', () => {
    const sym = makeSymbol('test', 'function');
    const ir = buildIR([sym], [], defaultConfig);

    expect(computeIRHash(ir)).toBe(computeIRHash(ir));
  });

  it('should produce different hashes for different IRs', () => {
    const sym1 = makeSymbol('test1', 'function');
    const sym2 = makeSymbol('test2', 'function');

    const ir1 = buildIR([sym1], [], defaultConfig);
    const ir2 = buildIR([sym2], [], defaultConfig);

    expect(computeIRHash(ir1)).not.toBe(computeIRHash(ir2));
  });

  it('should validate cache correctly', () => {
    const sym = makeSymbol('test', 'function');
    const ir = buildIR([sym], [], defaultConfig);

    expect(isIRCacheValid(ir, ir)).toBe(true);
  });

  it('should detect cache invalidation', () => {
    const sym1 = makeSymbol('test1', 'function');
    const sym2 = makeSymbol('test2', 'function');

    const ir1 = buildIR([sym1], [], defaultConfig);
    const ir2 = buildIR([sym2], [], defaultConfig);

    expect(isIRCacheValid(ir1, ir2)).toBe(false);
  });
});

// ──────────────────────────────────────────────────────────────────────
// 9. TYPESCRIPT ADAPTER
// ──────────────────────────────────────────────────────────────────────

describe('TypeScript Adapter — Availability', () => {
  it('should report as available when @babel/parser is installed', () => {
    expect(isTypeScriptAdapterAvailable()).toBe(true);
  });

  it('should implement the IRLanguageAdapter interface', () => {
    expect(typescriptAdapter.language).toBe('typescript');
    expect(typescriptAdapter.extensions).toContain('.ts');
    expect(typescriptAdapter.extensions).toContain('.tsx');
    expect(typeof typescriptAdapter.buildIR).toBe('function');
  });
});

describe('TypeScript Adapter — Parse React Component', () => {
  it('should extract a React component function', () => {
    const { symbols } = buildTypeScriptIR('src/Button.tsx', `
      import React from 'react';
      export function Button({ label }: { label: string }) {
        return <button>{label}</button>;
      }
    `);

    const buttonSym = symbols.find(s => s.name === 'Button');
    expect(buttonSym).toBeDefined();
    expect(buttonSym!.kind).toBe('function');
    expect(buttonSym!.modifiers).toContain('export');
  });

  it('should extract parameters from a function', () => {
    const { symbols } = buildTypeScriptIR('src/utils.ts', `
      export function greet(name: string, age: number): string {
        return 'Hello ' + name;
      }
    `);

    const greetSym = symbols.find(s => s.name === 'greet');
    expect(greetSym).toBeDefined();
    const params = symbols.filter(s => s.kind === 'parameter');
    expect(params.length).toBeGreaterThan(0);
    expect(params.some(p => p.name === 'name')).toBe(true);
    expect(params.some(p => p.name === 'age')).toBe(true);
  });

  it('should extract type annotations', () => {
    const { symbols } = buildTypeScriptIR('src/utils.ts', `
      export function formatName(name: string): string {
        return name.toUpperCase();
      }
    `);

    const fn = symbols.find(s => s.name === 'formatName');
    expect(fn).toBeDefined();
    expect(fn!.typeRef).toBeDefined();
    expect(fn!.typeRef?.$name ?? fn!.typeRef?.name).toBeTruthy();
  });
});

describe('TypeScript Adapter — Parse Utility Module', () => {
  it('should extract exported constants', () => {
    const { symbols } = buildTypeScriptIR('src/constants.ts', `
      export const MAX_RETRIES = 3;
      export const API_BASE_URL = 'https://api.example.com';
    `);

    const constants = symbols.filter(s => s.kind === 'constant');
    expect(constants.length).toBeGreaterThanOrEqual(2);
  });

  it('should extract interfaces', () => {
    const { symbols } = buildTypeScriptIR('src/types.ts', `
      export interface User {
        id: number;
        name: string;
        email: string;
      }
    `);

    const userIface = symbols.find(s => s.name === 'User' && s.kind === 'interface');
    expect(userIface).toBeDefined();
    expect(userIface!.modifiers).toContain('export');
  });

  it('should extract type aliases', () => {
    const { symbols } = buildTypeScriptIR('src/types.ts', `
      export type Status = 'active' | 'inactive' | 'suspended';
    `);

    const statusType = symbols.find(s => s.name === 'Status' && s.kind === 'type');
    expect(statusType).toBeDefined();
  });

  it('should extract enums', () => {
    const { symbols } = buildTypeScriptIR('src/enums.ts', `
      export enum Color {
        Red = 'red',
        Green = 'green',
        Blue = 'blue',
      }
    `);

    const colorEnum = symbols.find(s => s.name === 'Color' && s.kind === 'enum');
    expect(colorEnum).toBeDefined();
  });
});

describe('TypeScript Adapter — Parse API Route', () => {
  it('should extract functions from an API route', () => {
    const { symbols } = buildTypeScriptIR('src/app/api/users/route.ts', `
      export async function GET(request: Request) {
        const users = await db.user.findMany();
        return Response.json(users);
      }

      export async function POST(request: Request) {
        const body = await request.json();
        const user = await db.user.create({ data: body });
        return Response.json(user);
      }
    `);

    const getHandler = symbols.find(s => s.name === 'GET');
    const postHandler = symbols.find(s => s.name === 'POST');
    expect(getHandler).toBeDefined();
    expect(postHandler).toBeDefined();
    expect(getHandler!.modifiers).toContain('async');
    expect(postHandler!.modifiers).toContain('async');
  });
});

describe('TypeScript Adapter — Parse Class with Inheritance', () => {
  it('should extract class with extends and implements', () => {
    const { symbols, references } = buildTypeScriptIR('src/models.ts', `
      interface Serializable {
        serialize(): string;
      }

      class BaseModel {
        id: string;
        constructor(id: string) { this.id = id; }
      }

      class UserModel extends BaseModel implements Serializable {
        name: string;
        serialize(): string { return JSON.stringify(this); }
      }
    `);

    const userModel = symbols.find(s => s.name === 'UserModel' && s.kind === 'class');
    expect(userModel).toBeDefined();

    // Check inheritance reference
    const inheritRefs = references.filter(r => r.kind === 'inherit');
    expect(inheritRefs.length).toBeGreaterThan(0);

    // Check implementation reference
    const implRefs = references.filter(r => r.kind === 'implement');
    expect(implRefs.length).toBeGreaterThan(0);
  });

  it('should extract class methods and properties', () => {
    const { symbols } = buildTypeScriptIR('src/service.ts', `
      class UserService {
        private apiKey: string;
        constructor(apiKey: string) { this.apiKey = apiKey; }
        async getUser(id: string): Promise<User> { return fetch('/api/users/' + id); }
      }
    `);

    const method = symbols.find(s => s.name === 'getUser' && s.kind === 'method');
    expect(method).toBeDefined();

    const ctor = symbols.find(s => s.kind === 'constructor');
    expect(ctor).toBeDefined();

    const prop = symbols.find(s => s.name === 'apiKey' && s.kind === 'property');
    expect(prop).toBeDefined();
  });
});

// ──────────────────────────────────────────────────────────────────────
// 10. CROSS-LANGUAGE SYMBOL RESOLUTION
// ──────────────────────────────────────────────────────────────────────

describe('Cross-Language Symbol Resolution', () => {
  it('should merge TypeScript and Go IRs', () => {
    const tsSym: IRSymbol = {
      id: generateSymbolId('src/api.ts', 'function', 'fetchUsers'),
      name: 'fetchUsers',
      kind: 'function',
      language: 'typescript',
      filePath: 'src/api.ts',
      location: { line: 1, column: 1, endLine: 10, endColumn: 1 },
      modifiers: ['export', 'async'],
    };

    const goSym: IRSymbol = {
      id: generateSymbolId('main.go', 'function', 'GetUsers'),
      name: 'GetUsers',
      kind: 'function',
      language: 'go',
      filePath: 'main.go',
      location: { line: 15, column: 1, endLine: 25, endColumn: 1 },
      modifiers: ['export'],
    };

    const tsIR = buildIR([tsSym], [], { language: 'typescript' });
    const goIR = buildIR([goSym], [], { language: 'go' });

    const merged = mergeIR([tsIR, goIR]);
    expect(merged.symbols.size).toBe(2);
    expect(merged.language).toBe('multi');
    expect(merged.metadata.languageAdapters).toContain('typescript');
    expect(merged.metadata.languageAdapters).toContain('go');
  });

  it('should support cross-language type references', () => {
    const typeRef: IRTypeRef = {
      name: 'User',
      namespace: 'api',
      language: 'go',
    };
    expect(typeRef.language).toBe('go');
    expect(typeRef.namespace).toBe('api');
  });
});

// ──────────────────────────────────────────────────────────────────────
// 11. QUERY AND STATS
// ──────────────────────────────────────────────────────────────────────

describe('IR Query and Stats', () => {
  it('should query symbols by kind', () => {
    const sym1 = makeSymbol('Page', 'function');
    const sym2 = makeSymbol('User', 'interface');
    const sym3 = makeSymbol('MAX', 'constant');

    const ir = buildIR([sym1, sym2, sym3], [], defaultConfig);
    const result = queryIR(ir, s => s.kind === 'function');

    expect(result.count).toBe(1);
    expect(result.symbols[0]!.name).toBe('Page');
  });

  it('should compute IR stats', () => {
    const sym1 = makeSymbol('Page', 'function');
    const sym2 = makeSymbol('User', 'interface');
    const ref = makeRef(sym1.id, sym2.id, 'use-type');

    const ir = buildIR([sym1, sym2], [ref], defaultConfig);
    const stats = computeIRStats(ir);

    expect(stats.symbolCount).toBe(2);
    expect(stats.referenceCount).toBe(1);
    expect(stats.languages).toContain('typescript');
  });

  it('should get symbol by ID', () => {
    const sym = makeSymbol('test', 'function');
    const ir = buildIR([sym], [], defaultConfig);

    expect(getSymbolById(ir, sym.id)).toBeDefined();
    expect(getSymbolById(ir, sym.id)!.name).toBe('test');
    expect(getSymbolById(ir, 'nonexistent')).toBeUndefined();
  });

  it('should get outgoing and incoming references', () => {
    const sym1 = makeSymbol('A', 'function');
    const sym2 = makeSymbol('B', 'function');
    const ref = makeRef(sym1.id, sym2.id, 'call');

    const ir = buildIR([sym1, sym2], [ref], defaultConfig);

    const outgoing = getOutgoingReferences(ir, sym1.id);
    const incoming = getIncomingReferences(ir, sym2.id);

    expect(outgoing).toHaveLength(1);
    expect(incoming).toHaveLength(1);
  });
});
