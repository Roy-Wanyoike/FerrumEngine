// CSS Parser - parses CSS strings into structured data for testing

export interface CSSDeclaration {
  property: string;
  value: string;
}

export interface CSSRule {
  selector: string;
  declarations: CSSDeclaration[];
}

export interface ParsedCSS {
  rules: CSSRule[];
  raw: string;
}

/**
 * Parse a CSS string into a structured representation.
 *
 * Handles single-line and multi-line rules, nested at-rules,
 * and strips comments before parsing.
 */
export function parseCSS(css: string): ParsedCSS {
  // Remove CSS comments
  const stripped = css.replace(/\/\*[\s\S]*?\*\//g, '').trim();

  const rules: CSSRule[] = [];
  // Match rule blocks: selector { ... }
  const rulePattern = /([^{}]+)\{([^{}]*)\}/g;
  let match: RegExpExecArray | null;

  while ((match = rulePattern.exec(stripped)) !== null) {
    const selector = match[1].trim();
    const declarationsRaw = match[2].trim();

    if (!selector || !declarationsRaw) continue;

    const declarations: CSSDeclaration[] = declarationsRaw
      .split(';')
      .map((d) => d.trim())
      .filter(Boolean)
      .map((d) => {
        const colonIdx = d.indexOf(':');
        if (colonIdx === -1) return null;
        const property = d.slice(0, colonIdx).trim();
        const value = d.slice(colonIdx + 1).trim();
        return { property, value };
      })
      .filter((d): d is CSSDeclaration => d !== null);

    rules.push({ selector, declarations });
  }

  return { rules, raw: stripped };
}

/**
 * Check if a CSS class name exists as a selector in the parsed CSS.
 * Matches class selectors like `.foo`, `.foo.bar`, or `.foo .bar`.
 */
export function hasClass(css: string, className: string): boolean {
  const escaped = className.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // Match .className at word boundaries (start, space, comma, {, >, +, ~)
  const pattern = new RegExp(`(?:^|[\\s,{>+~])\\.${escaped}(?:$|[\\s>+~,:.\\[\\]])`);
  return pattern.test(css);
}

/**
 * Check if a CSS custom property (variable) exists in the CSS string.
 */
export function hasVariable(css: string, varName: string): boolean {
  const normalizedName = varName.startsWith('--') ? varName : `--${varName}`;
  const escaped = normalizedName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(escaped.replace(/--/, '--')).test(css);
}

/**
 * Get the value of a CSS custom property.
 * Returns the first matching variable value, or null if not found.
 */
export function getVariableValue(css: string, varName: string): string | null {
  const normalizedName = varName.startsWith('--') ? varName : `--${varName}`;
  const escaped = normalizedName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`${escaped}\\s*:\\s*([^;]+);?`);
  const match = pattern.exec(css);
  return match ? match[1].trim() : null;
}