// ─── FerrumCSS Compiler — CSS/Ferrum Parser ─────────────────────────────────
// A proper recursive-descent CSS parser with Ferrum-specific extensions.
// Handles standard CSS, nested selectors, at-rules, token() references,
// @ferrum-component, @ferrum-semantic, and source location tracking.
// Zero external dependencies.

import type {
  AtRuleKind,
  AtRuleNode,
  CommentNode,
  ComponentNode,
  ComponentSlot,
  ComponentVariant,
  DeclarationNode,
  FunctionCallNode,
  IdentifierNode,
  MixinNode,
  NumericLiteral,
  RuleNode,
  SemanticNode,
  SourceLocation,
  StringLiteral,
  StylesheetNode,
  TokenRefNode,
  ThemeRefNode,
  ValueNode,
} from "./types";

// ─── Tokenizer constants ─────────────────────────────────────────────────────

const WHITESPACE = /\s/;

const FERRUM_AT_RULES = new Set<string>([
  "ferrum-component",
  "ferrum-semantic",
]);

// ─── Parser class ────────────────────────────────────────────────────────────

export class Parser {
  private source: string;
  private filename: string;
  private pos: number = 0;
  private line: number = 1;
  private column: number = 1;

  constructor(source: string, filename: string = "<input>") {
    this.source = source;
    this.filename = filename;
  }

  // ── Public entry point ───────────────────────────────────────────────────

  parse(): StylesheetNode {
    const startLoc = this.createLoc();

    const stylesheet: StylesheetNode = {
      type: "Stylesheet",
      loc: startLoc,
      source: { filename: this.filename, content: this.source },
      imports: [],
      layers: [],
      rules: [],
      atRules: [],
      mixins: [],
      components: [],
      semantics: [],
      comments: [],
    };

    while (!this.eof()) {
      this.skipWhitespaceAndComments(stylesheet.comments);
      if (this.eof()) break;

      if (this.peek() === "@") {
        const node = this.parseAtRuleOrFerrum();
        if (node) {
          if (node.type === "AtRule") {
            if (node.name === "import") {
              stylesheet.imports.push(node);
            } else if (node.name === "layer") {
              stylesheet.layers.push(node);
            } else {
              stylesheet.atRules.push(node);
            }
          } else if (node.type === "Component") {
            stylesheet.components.push(node);
          } else if (node.type === "Semantic") {
            stylesheet.semantics.push(node);
          }
        }
      } else if (this.isMixinStart()) {
        const mixin = this.parseMixin();
        stylesheet.mixins.push(mixin);
      } else if (this.isRuleStart()) {
        const rule = this.parseRule();
        stylesheet.rules.push(rule);
      } else {
        this.advance();
      }
    }

    stylesheet.loc = this.createLocFrom(startLoc);
    return stylesheet;
  }

  // ── Whitespace and comments ──────────────────────────────────────────────

  private skipWhitespace(): void {
    while (!this.eof() && WHITESPACE.test(this.peek())) {
      if (this.peek() === "\n") {
        this.line++;
        this.column = 1;
      } else {
        this.column++;
      }
      this.pos++;
    }
  }

  private skipWhitespaceAndComments(collect: CommentNode[]): void {
    while (!this.eof()) {
      this.skipWhitespace();
      if (this.peek() === "/" && this.peekAt(1) === "*") {
        collect.push(this.parseComment());
      } else if (this.peek() === "/" && this.peekAt(1) === "/") {
        collect.push(this.parseLineComment());
      } else {
        break;
      }
    }
  }

  private parseComment(): CommentNode {
    const startLine = this.line;
    const startCol = this.column;
    this.consume("/*");
    let value = "";
    while (!this.eof()) {
      const ch = this.peek();
      const next = this.peekAt(1);
      if (ch === "*" && next === "/") {
        this.advanceBy(2);
        break;
      }
      value += ch;
      this.advance();
    }
    return {
      type: "Comment",
      value,
      loc: { startLine, startCol, endLine: this.line, endCol: this.column, filename: this.filename },
    };
  }

  private parseLineComment(): CommentNode {
    const startLine = this.line;
    const startCol = this.column;
    this.consume("//");
    let value = "";
    while (!this.eof() && this.peek() !== "\n") {
      value += this.peek();
      this.advance();
    }
    return {
      type: "Comment",
      value,
      loc: { startLine, startCol, endLine: this.line, endCol: this.column, filename: this.filename },
    };
  }

  // ── At-rules ────────────────────────────────────────────────────────────

  private parseAtRuleOrFerrum(): AtRuleNode | ComponentNode | SemanticNode | null {
    const startLine = this.line;
    const startCol = this.column;
    this.consume("@");
    const name = this.readIdent();

    if (FERRUM_AT_RULES.has(name)) {
      if (name === "ferrum-component") {
        return this.parseFerrumComponent(startLine, startCol);
      }
      if (name === "ferrum-semantic") {
        return this.parseFerrumSemantic(startLine, startCol);
      }
    }

    // Standard at-rule: read prelude up to { or ;
    const prelude = this.readUntil("{;");
    const preludeTrimmed = prelude.trim();

    const params: Record<string, string> = {};
    if (preludeTrimmed) {
      if (name === "property") {
        params["name"] = preludeTrimmed.replace(/--/g, "");
      }
      if (name === "layer") {
        params["name"] = preludeTrimmed;
      }
      if (name === "media") {
        params["query"] = preludeTrimmed;
      }
      if (name === "keyframes") {
        params["name"] = preludeTrimmed;
      }
      if (name === "container") {
        params["name"] = preludeTrimmed;
      }
      if (name === "supports") {
        params["condition"] = preludeTrimmed;
      }
      if (name === "import") {
        params["url"] = preludeTrimmed;
      }
      if (name === "charset") {
        params["encoding"] = preludeTrimmed;
      }
    }

    // Handle blockless at-rules (e.g., @import url(...); @layer name; @charset "utf-8";)
    const block = this.peek() === "{" ? this.parseBlockBody() : [];

    return {
      type: "AtRule",
      name: name as AtRuleKind,
      prelude: preludeTrimmed,
      params,
      block,
      loc: { startLine, startCol, endLine: this.line, endCol: this.column, filename: this.filename },
    };
  }

  private parseBlockBody(): (RuleNode | DeclarationNode | AtRuleNode)[] {
    this.consume("{");
    const nodes: (RuleNode | DeclarationNode | AtRuleNode)[] = [];

    while (!this.eof() && this.peek() !== "}") {
      this.skipWhitespace();
      if (this.eof() || this.peek() === "}") break;

      if (this.peek() === "@") {
        const atNode = this.parseAtRuleOrFerrum();
        if (atNode && atNode.type === "AtRule") {
          nodes.push(atNode);
        }
      } else if (this.isDeclarationStart()) {
        const decl = this.parseDeclaration();
        nodes.push(decl);
      } else if (this.isRuleStart()) {
        const rule = this.parseRule();
        nodes.push(rule);
      } else {
        this.advance();
      }
    }

    this.consume("}");
    return nodes;
  }

  // ── Ferrum-specific @ferrum-component ────────────────────────────────────

  private parseFerrumComponent(startLine: number, startCol: number): ComponentNode {
    this.skipWhitespace();
    const name = this.readIdent();
    this.skipWhitespace();

    const extendsList: string[] = [];
    if (this.peek() === "(") {
      this.consume("(");
      while (!this.eof() && this.peek() !== ")") {
        this.skipWhitespace();
        if (this.peek() === ")") break;
        if (this.peek() === ",") { this.advance(); continue; }
        extendsList.push(this.readIdent());
        this.skipWhitespace();
      }
      this.consume(")");
      this.skipWhitespace();
    }

    // Optional [[description]] block
    if (this.peek() === "[" && this.peekAt(1) === "[") {
      this.consume("[[");
      this.readUntil("]]");
      this.consume("]]");
      this.skipWhitespace();
    }

    this.consume("{");
    this.skipWhitespace();

    const slots: ComponentSlot[] = [];
    const variants: ComponentVariant[] = [];
    const declarations: DeclarationNode[] = [];
    const rules: RuleNode[] = [];

    while (!this.eof() && this.peek() !== "}") {
      this.skipWhitespace();
      if (this.peek() === "}") break;

      if (this.peek() === "@") {
        const vStartLine = this.line;
        const vStartCol = this.column;
        this.advance(); // skip @
        const keyword = this.readIdent();
        this.skipWhitespace();

        if (keyword === "variant") {
          const variantName = this.readIdent();
          this.skipWhitespace();
          this.consume("{");
          this.skipWhitespace();
          const vDecls: DeclarationNode[] = [];
          const vRules: RuleNode[] = [];
          while (!this.eof() && this.peek() !== "}") {
            this.skipWhitespace();
            if (this.peek() === "}") break;
            if (this.isDeclarationStart()) {
              vDecls.push(this.parseDeclaration());
            } else if (this.isRuleStart()) {
              vRules.push(this.parseRule());
            } else {
              this.advance();
            }
          }
          this.consume("}");
          variants.push({
            name: variantName,
            selectors: [],
            declarations: vDecls,
            rules: vRules,
            loc: { startLine: vStartLine, startCol: vStartCol, endLine: this.line, endCol: this.column, filename: this.filename },
          });
        } else if (keyword === "slot") {
          const slotName = this.readIdent();
          this.skipWhitespace();
          this.consume("{");
          this.skipWhitespace();
          const sDecls: DeclarationNode[] = [];
          const sSelectors: string[] = [];
          while (!this.eof() && this.peek() !== "}") {
            this.skipWhitespace();
            if (this.peek() === "}") break;
            if (this.isDeclarationStart()) {
              sDecls.push(this.parseDeclaration());
            } else {
              const sel = this.readUntilAny(["{", ";", "}"]).trim();
              if (sel && this.peek() === "{") {
                sSelectors.push(sel);
                this.consume("{");
                this.skipWhitespace();
                while (!this.eof() && this.peek() !== "}") {
                  this.skipWhitespace();
                  if (this.peek() === "}") break;
                  if (this.isDeclarationStart()) {
                    sDecls.push(this.parseDeclaration());
                  } else {
                    this.advance();
                  }
                }
                this.consume("}");
              }
            }
          }
          this.consume("}");
          slots.push({
            name: slotName,
            selectors: sSelectors,
            declarations: sDecls,
            loc: { startLine: vStartLine, startCol: vStartCol, endLine: this.line, endCol: this.column, filename: this.filename },
          });
        } else {
          this.skipToClosingBrace();
        }
      } else if (this.isDeclarationStart()) {
        declarations.push(this.parseDeclaration());
      } else if (this.isRuleStart()) {
        rules.push(this.parseRule());
      } else {
        this.advance();
      }
    }

    this.consume("}");

    return {
      type: "Component",
      name,
      extends: extendsList,
      slots,
      variants,
      declarations,
      rules,
      loc: { startLine, startCol, endLine: this.line, endCol: this.column, filename: this.filename },
    };
  }

  // ── Ferrum-specific @ferrum-semantic ─────────────────────────────────────

  private parseFerrumSemantic(startLine: number, startCol: number): SemanticNode {
    this.skipWhitespace();
    const name = this.readIdent();
    this.skipWhitespace();

    let description: string | undefined;
    if (this.peek() === '"' || this.peek() === "'") {
      description = this.readString();
      this.skipWhitespace();
    }

    const ruleBlock = this.parseRule();
    const tokens = this.extractTokenRefs(ruleBlock);

    return {
      type: "Semantic",
      name,
      description,
      rules: [ruleBlock],
      tokens,
      loc: { startLine, startCol, endLine: this.line, endCol: this.column, filename: this.filename },
    };
  }

  // ── Mixin ───────────────────────────────────────────────────────────────

  private isMixinStart(): boolean {
    if (this.source.substring(this.pos, this.pos + 7) !== "@mixin ") return false;
    const after = this.source[this.pos + 6];
    return after === " " || after === "\t" || after === "(" || after === "\n";
  }

  private parseMixin(): MixinNode {
    const startLine = this.line;
    const startCol = this.column;
    this.consume("@mixin");
    this.skipWhitespace();
    const name = this.readIdent();
    this.skipWhitespace();

    const parameters: string[] = [];
    if (this.peek() === "(") {
      this.consume("(");
      while (!this.eof() && this.peek() !== ")") {
        this.skipWhitespace();
        if (this.peek() === ")") break;
        if (this.peek() === ",") { this.advance(); continue; }
        if (this.peek() === "$") this.advance();
        parameters.push(this.readIdent());
        this.skipWhitespace();
      }
      this.consume(")");
      this.skipWhitespace();
    }

    this.consume("{");
    this.skipWhitespace();
    const declarations: DeclarationNode[] = [];
    const nestedRules: RuleNode[] = [];

    while (!this.eof() && this.peek() !== "}") {
      this.skipWhitespace();
      if (this.peek() === "}") break;
      if (this.isDeclarationStart()) {
        declarations.push(this.parseDeclaration());
      } else if (this.isRuleStart()) {
        nestedRules.push(this.parseRule());
      } else {
        this.advance();
      }
    }

    this.consume("}");
    return {
      type: "Mixin",
      name,
      parameters,
      declarations,
      nestedRules,
      loc: { startLine, startCol, endLine: this.line, endCol: this.column, filename: this.filename },
    };
  }

  // ── Rule ────────────────────────────────────────────────────────────────

  private isRuleStart(): boolean {
    if (this.eof()) return false;
    const ch = this.peek();
    if (ch === "}" || ch === "{" || ch === ";") return false;
    return /^[a-zA-Z0-9*#.:\[\]>+~&]/.test(ch);
  }

  private parseRule(): RuleNode {
    const startLine = this.line;
    const startCol = this.column;
    const prelude = this.readUntil("{").trim();
    const selectors = this.splitSelectors(prelude);

    this.consume("{");
    this.skipWhitespace();

    const declarations: DeclarationNode[] = [];
    const nestedRules: RuleNode[] = [];

    while (!this.eof() && this.peek() !== "}") {
      this.skipWhitespace();
      if (this.peek() === "}") break;

      if (this.isNestedRuleStart()) {
        nestedRules.push(this.parseRule());
      } else if (this.isDeclarationStart()) {
        declarations.push(this.parseDeclaration());
      } else {
        this.advance();
      }
    }

    this.consume("}");

    return {
      type: "Rule",
      selectors,
      prelude,
      declarations,
      nestedRules,
      loc: { startLine, startCol, endLine: this.line, endCol: this.column, filename: this.filename },
    };
  }

  private isNestedRuleStart(): boolean {
    if (this.peek() === "@") return false;
    const ch = this.peek();
    if (!/^[a-zA-Z0-9*#.:\[\]>+~&]/.test(ch)) return false;

    // Look ahead: if we find { before ; at the same depth, it's a nested rule
    let depth = 0;
    let i = this.pos;
    let hasColon = false;
    let hasBrace = false;

    while (i < this.source.length) {
      const c = this.source[i];
      if (c === "(" || c === "[") { depth++; i++; continue; }
      if (c === ")" || c === "]") { depth--; i++; continue; }
      if (c === "{" && depth === 0) { hasBrace = true; break; }
      if (c === ";" && depth === 0) { break; }
      if (c === ":" && depth === 0 && !hasColon) {
        const afterColon = this.source.substring(i + 1).trimStart();
        if (afterColon.length > 0 && !/^[a-zA-Z-]/.test(afterColon)) {
          hasColon = true;
        } else if (afterColon.length > 0) {
          const word = this.source.substring(this.pos, i).trim();
          if (/^[a-zA-Z-]+$/.test(word) && !word.startsWith(":") && !word.startsWith(".")) {
            hasColon = true;
          }
        }
      }
      i++;
    }
    return hasBrace && !hasColon;
  }

  // ── Declaration ─────────────────────────────────────────────────────────

  private isDeclarationStart(): boolean {
    if (this.eof()) return false;
    const ch = this.peek();
    if (ch !== "-" && ch !== "_" && !/[a-zA-Z]/.test(ch)) return false;

    let depth = 0;
    let i = this.pos;
    while (i < this.source.length) {
      const c = this.source[i];
      if (c === "(" || c === "[") { depth++; i++; continue; }
      if (c === ")" || c === "]") { depth--; i++; continue; }
      if (c === ":" && depth === 0) return true;
      if ((c === ";" || c === "}" || c === "{") && depth === 0) return false;
      i++;
    }
    return false;
  }

  private parseDeclaration(): DeclarationNode {
    const startLine = this.line;
    const startCol = this.column;

    // Read property name (up to colon)
    let property = "";
    while (!this.eof() && this.peek() !== ":" && this.peek() !== ";" && this.peek() !== "}") {
      property += this.peek();
      this.advance();
    }
    property = property.trim();

    if (this.peek() === ":") {
      this.advance();
    }
    this.skipWhitespace();

    // Read value (up to ; or })
    let value = "";
    let important = false;
    let parenDepth = 0;
    let bracketDepth = 0;

    while (!this.eof()) {
      const ch = this.peek();
      if (ch === "(") { parenDepth++; }
      else if (ch === ")") { parenDepth--; }
      else if (ch === "[") { bracketDepth++; }
      else if (ch === "]") { bracketDepth--; }
      else if (ch === ";" && parenDepth === 0 && bracketDepth === 0) {
        this.advance();
        break;
      }
      else if (ch === "}" && parenDepth === 0 && bracketDepth === 0) {
        break;
      }

      // Check for !important
      if (ch === "!" && value.trimEnd().endsWith(" ")) {
        const rest = this.source.substring(this.pos + 1, this.pos + 10).trimStart();
        if (rest.toLowerCase().startsWith("important")) {
          important = true;
          this.advance(); // !
          this.skipWhitespace();
          while (!this.eof() && /[a-zA-Z]/.test(this.peek())) {
            this.advance();
          }
          if (this.peek() === ";") this.advance();
          break;
        }
      }

      value += ch;
      this.advance();
    }

    value = value.trim();

    // Parse structured value nodes for token() / theme() references
    const parsedValue = this.tryParseValue(value, startLine, startCol);

    return {
      type: "Declaration",
      property,
      value,
      parsedValue: parsedValue.length > 0 ? parsedValue : undefined,
      important,
      loc: { startLine, startCol, endLine: this.line, endCol: this.column, filename: this.filename },
    };
  }

  // ── Value parsing (token(), theme(), identifiers, numbers, strings) ─────

  private tryParseValue(raw: string, baseLine: number, baseCol: number): ValueNode[] {
    const nodes: ValueNode[] = [];
    let i = 0;

    while (i < raw.length) {
      while (i < raw.length && /\s/.test(raw[i])) i++;
      if (i >= raw.length) break;

      if (/[a-zA-Z_-]/.test(raw[i])) {
        let name = "";
        let j = i;
        while (j < raw.length && /[a-zA-Z0-9_-]/.test(raw[j])) {
          name += raw[j];
          j++;
        }

        if (j < raw.length && raw[j] === "(") {
          // Function call
          const fnStart = i;
          j++; // skip (
          let depth = 1;
          let content = "";
          while (j < raw.length && depth > 0) {
            if (raw[j] === "(") depth++;
            else if (raw[j] === ")") { depth--; if (depth === 0) { j++; break; } }
            content += raw[j];
            j++;
          }

          if (name === "token") {
            const { path, fallback } = this.parseTokenPath(content);
            nodes.push({
              type: "TokenRef",
              path,
              namespace: path.split(".")[0] ?? "",
              fallback,
              loc: { startLine: baseLine, startCol: baseCol + fnStart, endLine: baseLine, endCol: baseCol + j, filename: this.filename },
            } satisfies TokenRefNode);
          } else if (name === "theme") {
            const colonIdx = content.indexOf(",");
            const path = colonIdx >= 0 ? content.substring(0, colonIdx).trim() : content.trim();
            const fallback = colonIdx >= 0 ? content.substring(colonIdx + 1).trim() : undefined;
            nodes.push({
              type: "ThemeRef",
              path,
              fallback,
              loc: { startLine: baseLine, startCol: baseCol + fnStart, endLine: baseLine, endCol: baseCol + j, filename: this.filename },
            } satisfies ThemeRefNode);
          } else {
            nodes.push({
              type: "FunctionCall",
              name,
              arguments: [],
              loc: { startLine: baseLine, startCol: baseCol + fnStart, endLine: baseLine, endCol: baseCol + j, filename: this.filename },
            } satisfies FunctionCallNode);
          }
          i = j;
        } else {
          nodes.push({
            type: "Identifier",
            name,
            loc: { startLine: baseLine, startCol: baseCol + i, endLine: baseLine, endCol: baseCol + j, filename: this.filename },
          } satisfies IdentifierNode);
          i = j;
        }
      }
      else if (/[0-9.]/.test(raw[i])) {
        let numStr = "";
        let j = i;
        while (j < raw.length && /[0-9.]/.test(raw[j])) {
          numStr += raw[j];
          j++;
        }
        let unit = "";
        while (j < raw.length && /[a-zA-Z%]/.test(raw[j])) {
          unit += raw[j];
          j++;
        }
        nodes.push({
          type: "NumericLiteral",
          value: numStr + unit,
          number: parseFloat(numStr),
          unit,
          loc: { startLine: baseLine, startCol: baseCol + i, endLine: baseLine, endCol: baseCol + j, filename: this.filename },
        } satisfies NumericLiteral);
        i = j;
      }
      else if (raw[i] === '"' || raw[i] === "'") {
        const quote = raw[i] as '"' | "'";
        let j = i + 1;
        let str = "";
        while (j < raw.length && raw[j] !== quote) {
          if (raw[j] === "\\") { j++; if (j < raw.length) str += raw[j]; }
          else str += raw[j];
          j++;
        }
        j++;
        nodes.push({
          type: "StringLiteral",
          value: str,
          quote,
          loc: { startLine: baseLine, startCol: baseCol + i, endLine: baseLine, endCol: baseCol + j, filename: this.filename },
        } satisfies StringLiteral);
        i = j;
      }
      else {
        i++;
      }
    }

    return nodes;
  }

  private parseTokenPath(content: string): { path: string; fallback?: string } {
    const trimmed = content.trim();
    const commaIdx = trimmed.indexOf(",");
    const path = commaIdx >= 0 ? trimmed.substring(0, commaIdx).trim() : trimmed.trim();
    const fallback = commaIdx >= 0 ? trimmed.substring(commaIdx + 1).trim() : undefined;
    const cleanFallback = fallback ? fallback.replace(/^['"]|['"]$/g, "") : undefined;
    return { path, fallback: cleanFallback };
  }

  // ── Helper: extract token refs from a rule ──────────────────────────────

  private extractTokenRefs(rule: RuleNode): TokenRefNode[] {
    const refs: TokenRefNode[] = [];
    for (const decl of rule.declarations) {
      if (decl.parsedValue) {
        for (const node of decl.parsedValue) {
          if (node.type === "TokenRef") {
            refs.push(node);
          }
        }
      }
    }
    return refs;
  }

  // ── Selector splitting (comma-separated, respecting parens/brackets) ────

  private splitSelectors(prelude: string): string[] {
    const selectors: string[] = [];
    let current = "";
    let depth = 0;

    for (let i = 0; i < prelude.length; i++) {
      const ch = prelude[i];
      if (ch === "(" || ch === "[") { depth++; current += ch; }
      else if (ch === ")" || ch === "]") { depth--; current += ch; }
      else if (ch === "," && depth === 0) {
        const trimmed = current.trim();
        if (trimmed) selectors.push(trimmed);
        current = "";
      }
      else {
        current += ch;
      }
    }
    const trimmed = current.trim();
    if (trimmed) selectors.push(trimmed);
    return selectors;
  }

  // ── Low-level character helpers ─────────────────────────────────────────

  private peek(): string {
    return this.source[this.pos] ?? "";
  }

  private peekAt(offset: number): string {
    return this.source[this.pos + offset] ?? "";
  }

  private advance(): void {
    if (this.pos < this.source.length) {
      if (this.source[this.pos] === "\n") {
        this.line++;
        this.column = 1;
      } else {
        this.column++;
      }
      this.pos++;
    }
  }

  private advanceBy(n: number): void {
    for (let i = 0; i < n; i++) this.advance();
  }

  private eof(): boolean {
    return this.pos >= this.source.length;
  }

  private consume(expected: string): void {
    for (let i = 0; i < expected.length; i++) {
      if (this.peek() !== expected[i]) {
        throw new SyntaxError(
          `Expected "${expected}" at ${this.filename}:${this.line}:${this.column} ` +
          `but got "${this.peek()}" (offset ${this.pos})`
        );
      }
      this.advance();
    }
  }

  private readIdent(): string {
    let id = "";
    while (!this.eof() && /[a-zA-Z0-9_-]/.test(this.peek())) {
      id += this.peek();
      this.advance();
    }
    return id;
  }

  private readString(): string {
    const quote = this.peek();
    this.advance();
    let str = "";
    while (!this.eof() && this.peek() !== quote) {
      if (this.peek() === "\\") {
        this.advance();
        if (!this.eof()) { str += this.peek(); this.advance(); }
      } else {
        str += this.peek();
        this.advance();
      }
    }
    if (!this.eof()) this.advance();
    return str;
  }

  private readUntil(terminators: string): string {
    let result = "";
    let earliestIdx = -1;
    for (const t of terminators) {
      const idx = this.source.indexOf(t, this.pos);
      if (idx !== -1 && (earliestIdx === -1 || idx < earliestIdx)) {
        earliestIdx = idx;
      }
    }
    if (earliestIdx === -1) {
      result = this.source.substring(this.pos);
      this.pos = this.source.length;
    } else {
      const substring = this.source.substring(this.pos, earliestIdx);
      const newlines = (substring.match(/\n/g) ?? []).length;
      this.line += newlines;
      const lastNewline = substring.lastIndexOf("\n");
      this.column = lastNewline >= 0 ? substring.length - lastNewline : this.column + substring.length;
      result = substring;
      this.pos = earliestIdx;
    }
    return result;
  }

  private readUntilAny(terminators: string[]): string {
    let result = "";
    let earliestIdx = -1;
    for (const t of terminators) {
      const idx = this.source.indexOf(t, this.pos);
      if (idx !== -1 && (earliestIdx === -1 || idx < earliestIdx)) {
        earliestIdx = idx;
      }
    }
    if (earliestIdx === -1) {
      result = this.source.substring(this.pos);
      this.pos = this.source.length;
    } else {
      const substring = this.source.substring(this.pos, earliestIdx);
      const newlines = (substring.match(/\n/g) ?? []).length;
      this.line += newlines;
      const lastNewline = substring.lastIndexOf("\n");
      this.column = lastNewline >= 0 ? substring.length - lastNewline : this.column + substring.length;
      result = substring;
      this.pos = earliestIdx;
    }
    return result;
  }

  private skipToClosingBrace(): void {
    let depth = 1;
    while (!this.eof() && depth > 0) {
      if (this.peek() === "{") depth++;
      else if (this.peek() === "}") depth--;
      if (depth > 0) this.advance();
    }
    if (!this.eof()) this.advance();
  }

  // ── Source location helpers ─────────────────────────────────────────────

  private createLoc(): SourceLocation {
    return { startLine: this.line, startCol: this.column, endLine: this.line, endCol: this.column, filename: this.filename };
  }

  private createLocFrom(start: SourceLocation): SourceLocation {
    return { startLine: start.startLine, startCol: start.startCol, endLine: this.line, endCol: this.column, filename: this.filename };
  }
}

// ── Public parse function ─────────────────────────────────────────────────

export function parse(source: string, filename?: string): StylesheetNode {
  const parser = new Parser(source, filename ?? "<input>");
  return parser.parse();
}