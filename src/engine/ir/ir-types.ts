/**
 * FerrumEngine v2 — Application IR Types
 *
 * Language-independent intermediate representation (IR) for the Ferrum
 * Intelligence Engine. The Application IR provides a universal model
 * for representing code structure, references, control flow, and data
 * flow across any programming language.
 *
 * Design goals:
 *   - Language-agnostic: works for TypeScript, Go, Python, Rust, etc.
 *   - Composable: multiple language IRs can be merged into one
 *   - Serializable: can be cached to disk for incremental analysis
 *   - Queryable: supports symbol lookup, reference traversal, and flow analysis
 *
 * Architecture:
 *   IRSymbol        — a named entity (function, class, variable, type, etc.)
 *   IRReference     — a directed relationship between two symbols
 *   IRTypeRef       — a cross-language type reference
 *   IRControlFlow   — a control flow graph node (basic block)
 *   IRDataFlow      — a data flow edge (assignment, parameter passing, etc.)
 *   ApplicationIR   — the complete IR for a project (symbols + references + flow)
 */

// ──────────────────────────────────────────────────────────────────────
// SYMBOL KINDS
// ──────────────────────────────────────────────────────────────────────

/**
 * The kind of a symbol in the IR.
 *
 * Covers the universal set of named entities across common languages:
 *   - OOP: class, method, constructor, property, interface, enum
 *   - FP:  function, variable, constant, parameter
 *   - TS:  type (alias), decorator, namespace, module
 *   - Rust: trait, impl, macro, operator
 */
export type IRSymbolKind =
  | 'function'
  | 'class'
  | 'method'
  | 'variable'
  | 'type'
  | 'interface'
  | 'enum'
  | 'constant'
  | 'module'
  | 'namespace'
  | 'property'
  | 'parameter'
  | 'constructor'
  | 'decorator'
  | 'operator'
  | 'macro'
  | 'trait'
  | 'impl';

// ──────────────────────────────────────────────────────────────────────
// MODIFIERS
// ──────────────────────────────────────────────────────────────────────

/**
 * Modifiers (access levels, mutability, async, etc.).
 *
 * These are unified across languages:
 *   - export / internal     → visibility across module boundaries
 *   - public / private / protected → OOP access levels
 *   - static / abstract     → class member modifiers
 *   - async                 → asynchronous execution
 *   - readonly / const / mut / final → mutability
 *   - override / deprecated → semantic markers
 */
export type IRModifier =
  | 'export'
  | 'private'
  | 'protected'
  | 'public'
  | 'static'
  | 'async'
  | 'abstract'
  | 'readonly'
  | 'const'
  | 'mut'
  | 'final'
  | 'override'
  | 'deprecated'
  | 'internal';

// ──────────────────────────────────────────────────────────────────────
// REFERENCE KINDS
// ──────────────────────────────────────────────────────────────────────

/**
 * The kind of relationship between two symbols.
 *
 * Covers:
 *   - import       → module import (static or dynamic)
 *   - call         → function/method invocation
 *   - inherit      → class inheritance (extends)
 *   - implement    → interface implementation (implements)
 *   - compose      → composition / mixin
 *   - use-type     → type annotation reference
 *   - use-value    → value-level reference (variable access)
 *   - re-export    → re-exporting a symbol from another module
 *   - override     → method override
 *   - decorates    → decorator application
 *   - yields       → generator / async yield
 */
export type IRReferenceKind =
  | 'import'
  | 'call'
  | 'inherit'
  | 'implement'
  | 'compose'
  | 'use-type'
  | 'use-value'
  | 're-export'
  | 'override'
  | 'decorates'
  | 'yields';

// ──────────────────────────────────────────────────────────────────────
// TYPE REFERENCES
// ──────────────────────────────────────────────────────────────────────

/**
 * A reference to a type — can be cross-language.
 *
 * Examples:
 *   - `string`                    → { name: 'string' }
 *   - `Array<number>`             → { name: 'Array', typeArguments: [{ name: 'number' }] }
 *   - `React.FC<Props>`           → { name: 'FC', namespace: 'React', typeArguments: [...] }
 *   - `Option<T>` (Rust)          → { name: 'Option', typeArguments: [{ name: 'T', isGeneric: true }], language: 'rust' }
 *   - `string | null`             → { name: 'string', isNullable: true }
 */
export interface IRTypeRef {
  /** The type name (e.g., 'string', 'number', 'Array', 'Option'). */
  name: string;
  /** Namespace or module prefix (e.g., 'React' for React.FC). */
  namespace?: string;
  /** Generic type arguments (e.g., [number] for Array<number>). */
  typeArguments?: IRTypeRef[];
  /** Whether the type is nullable (e.g., string | null). */
  isNullable?: boolean;
  /** Whether this is a generic type parameter (e.g., T in Option<T>). */
  isGeneric?: boolean;
  /** The language this type originates from (for cross-language refs). */
  language?: string;
}

// ──────────────────────────────────────────────────────────────────────
// SOURCE LOCATION
// ──────────────────────────────────────────────────────────────────────

/** A precise source location within a file. */
export interface IRLocation {
  /** Start line (1-based). */
  line: number;
  /** Start column (1-based). */
  column: number;
  /** End line (1-based, inclusive). */
  endLine: number;
  /** End column (1-based, exclusive). */
  endColumn: number;
}

/** A lightweight source location (line + column only, no end). */
export interface IRPointLocation {
  /** Line number (1-based). */
  line: number;
  /** Column number (1-based). */
  column: number;
}

/** A line-only location (for references where column isn't meaningful). */
export interface IRLineLocation {
  /** Line number (1-based). */
  line: number;
}

// ──────────────────────────────────────────────────────────────────────
// SYMBOL
// ──────────────────────────────────────────────────────────────────────

/**
 * A symbol in the IR — a named entity in the source code.
 *
 * Symbols are the primary nodes of the Application IR. Each symbol
 * represents a function, class, method, variable, type, interface,
 * enum, constant, module, namespace, property, or parameter.
 *
 * Every symbol has a globally unique ID (typically `filePath:kind:name`)
 * and a precise source location.
 */
export interface IRSymbol {
  /** Globally unique identifier (e.g., 'src/app/page.tsx:function:Page'). */
  id: string;
  /** Human-readable name (e.g., 'Page', 'useAuth', 'User'). */
  name: string;
  /** Symbol kind. */
  kind: IRSymbolKind;
  /** Source language (e.g., 'typescript', 'go', 'python'). */
  language: string;
  /** File path (relative to project root). */
  filePath: string;
  /** Precise source location. */
  location: IRLocation;
  /** Modifiers (access, mutability, async, etc.). */
  modifiers: IRModifier[];
  /** Type reference (return type for functions, type annotation for variables). */
  typeRef?: IRTypeRef;
  /** Documentation comment (JSDoc, docstrings, etc.). */
  documentation?: string;
  /** Arbitrary metadata (framework-specific, etc.). */
  metadata?: Record<string, unknown>;
}

// ──────────────────────────────────────────────────────────────────────
// REFERENCE
// ──────────────────────────────────────────────────────────────────────

/**
 * A directed reference from one symbol to another.
 *
 * References form the edges of the Application IR graph. They capture
 * all inter-symbol relationships: imports, calls, inheritance, type
 * usage, re-exports, overrides, decorator applications, etc.
 */
export interface IRReference {
  /** Source symbol ID. */
  from: string;
  /** Target symbol ID. */
  to: string;
  /** Reference kind. */
  kind: IRReferenceKind;
  /** Source location of the reference (where it appears in the source). */
  location?: IRPointLocation;
}

// ──────────────────────────────────────────────────────────────────────
// CONTROL FLOW
// ──────────────────────────────────────────────────────────────────────

/**
 * Control flow node — a basic block in the CFG.
 *
 * Each node represents a contiguous sequence of statements with a
 * single entry point and (potentially multiple) exit points.
 * Predecessors and successors form the edges of the CFG.
 */
export interface IRControlFlow {
  /** Unique node ID. */
  id: string;
  /** Owning symbol ID. */
  symbolId: string;
  /** Control flow node kind. */
  kind: 'block' | 'branch' | 'loop' | 'try' | 'catch' | 'finally' | 'return' | 'throw' | 'yield';
  /** Predecessor node IDs. */
  predecessors: string[];
  /** Successor node IDs. */
  successors: string[];
  /** Condition expression for branches (e.g., 'x > 0'). */
  condition?: string;
}

// ──────────────────────────────────────────────────────────────────────
// DATA FLOW
// ──────────────────────────────────────────────────────────────────────

/**
 * Data flow edge — describes how data moves between symbols or CF nodes.
 *
 * Kinds:
 *   - assign       → value assignment (let x = expr)
 *   - parameter    → argument passing to a function
 *   - return       → return value from a function
 *   - field-access → reading a field/property
 *   - mutation     → write to a field/property
 *   - read         → read access to a variable
 */
export interface IRDataFlow {
  /** Source symbol or CF node ID. */
  from: string;
  /** Target symbol or CF node ID. */
  to: string;
  /** Data flow kind. */
  kind: 'assign' | 'parameter' | 'return' | 'field-access' | 'mutation' | 'read';
  /** Source location. */
  location?: IRLineLocation;
}

// ──────────────────────────────────────────────────────────────────────
// APPLICATION IR
// ──────────────────────────────────────────────────────────────────────

/**
 * The complete Application IR for a project.
 *
 * This is the top-level container that holds all symbols, references,
 * control flow, and data flow for a project. It can represent a
 * single-language or multi-language codebase.
 *
 * Symbols are stored in a Map keyed by ID for O(1) lookup.
 * Control flow nodes are stored in a Map keyed by ID.
 * References and data flow are stored as arrays (typically iterated).
 */
export interface ApplicationIR {
  /** Unique IR identifier (e.g., project name + hash). */
  id: string;
  /** IR schema version for backward compatibility. */
  version: number;
  /** Primary language of the project. */
  language: string;
  /** All symbols, indexed by ID. */
  symbols: Map<string, IRSymbol>;
  /** All references between symbols. */
  references: IRReference[];
  /** Control flow nodes, indexed by ID. */
  controlFlow: Map<string, IRControlFlow>;
  /** Data flow edges. */
  dataFlow: IRDataFlow[];
  /** IR-level metadata. */
  metadata: {
    /** Creation timestamp (epoch ms). */
    createdAt: number;
    /** Hash of the source content used to build this IR. */
    sourceHash: string;
    /** List of language adapters used to build this IR. */
    languageAdapters: string[];
  };
}

// ──────────────────────────────────────────────────────────────────────
// BUILDER CONFIG
// ──────────────────────────────────────────────────────────────────────

/**
 * Configuration for building the Application IR.
 */
export interface IRBuilderConfig {
  /** The language being processed. */
  language: string;
  /** Whether to extract control flow information. */
  includeControlFlow?: boolean;
  /** Whether to extract data flow information. */
  includeDataFlow?: boolean;
  /** Maximum number of symbols to extract (0 = unlimited). */
  maxSymbolCount?: number;
}

// ──────────────────────────────────────────────────────────────────────
// LANGUAGE ADAPTER INTERFACE
// ──────────────────────────────────────────────────────────────────────

/**
 * Interface for a language-specific adapter that produces IR from source.
 *
 * Each supported language (TypeScript, Go, Python, etc.) implements
 * this interface to parse its source code and extract symbols and
 * references into the language-agnostic IR format.
 */
export interface IRLanguageAdapter {
  /** The language this adapter handles. */
  language: string;
  /** File extensions this adapter handles. */
  extensions: string[];
  /**
   * Parse a single file and extract symbols and references.
   *
   * @param filePath - Relative file path within the project.
   * @param content - Source file content.
   * @param config - Builder configuration.
   * @returns Extracted symbols and references.
   */
  buildIR(
    filePath: string,
    content: string,
    config?: IRBuilderConfig,
  ): { symbols: IRSymbol[]; references: IRReference[] };
}

// ──────────────────────────────────────────────────────────────────────
// QUERY HELPERS (type-level)
// ──────────────────────────────────────────────────────────────────────

/**
 * Result of querying the IR for symbols matching a predicate.
 */
export interface IRQueryResult {
  /** Matching symbols. */
  symbols: IRSymbol[];
  /** References involving matching symbols. */
  references: IRReference[];
  /** Total match count. */
  count: number;
}

/**
 * Summary statistics for an ApplicationIR.
 */
export interface IRStats {
  /** Total symbol count. */
  symbolCount: number;
  /** Symbol count by kind. */
  symbolsByKind: Record<IRSymbolKind, number>;
  /** Total reference count. */
  referenceCount: number;
  /** Reference count by kind. */
  referencesByKind: Record<IRReferenceKind, number>;
  /** Control flow node count. */
  controlFlowCount: number;
  /** Data flow edge count. */
  dataFlowCount: number;
  /** Languages present. */
  languages: string[];
}
