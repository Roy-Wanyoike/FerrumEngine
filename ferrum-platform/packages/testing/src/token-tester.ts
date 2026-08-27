// Token Tester - validates design token CSS output

import { getVariableValue, hasVariable } from './css-parser';

export interface TokenDef {
  name: string;
  value: string;
}

export interface TokenGroup {
  name: string;
  tokens: TokenDef[];
}

export interface AllTokens {
  groups: TokenGroup[];
}

/**
 * Create a token tester instance bound to a set of design tokens.
 *
 * @param allTokens - The full token definition tree
 * @returns An object with assertion-style methods for testing CSS output
 */
export function createTokenTester(allTokens: AllTokens) {
  const flatTokens: TokenDef[] = allTokens.groups.flatMap((g) => g.tokens);

  return {
    /**
     * Verify that every token defined in the token set has a corresponding
     * CSS custom property in the output CSS string.
     */
    allTokensPresent(css: string): boolean {
      for (const token of flatTokens) {
        const varName = token.name.startsWith('--') ? token.name : `--${token.name}`;
        if (!hasVariable(css, varName)) {
          return false;
        }
      }
      return true;
    },

    /**
     * Check that a specific token's CSS variable has the expected value.
     *
     * @param css - The generated CSS string
     * @param tokenPath - The token name (with or without -- prefix)
     * @param expected - The expected CSS value
     */
    tokenValueMatches(css: string, tokenPath: string, expected: string): boolean {
      const actual = getVariableValue(css, tokenPath);
      if (actual === null) return false;
      // Normalize whitespace for comparison
      return actual.replace(/\s+/g, ' ').trim() === expected.replace(/\s+/g, ' ').trim();
    },

    /**
     * Scan CSS for hardcoded color values (hex codes, rgb(), hsl() literals).
     * Returns true only if ALL color references use var() — no raw colors.
     *
     * Allows values inside @keyframes for animation purposes.
     */
    noHardcodedColors(css: string): boolean {
      // Remove keyframes blocks (they may legitimately use raw colors)
      const withoutKeyframes = css.replace(/@keyframes[^{]*\{[\s\S]*?\}\s*\}/g, '');

      // Match hex colors: #fff, #ffffff, #ffffffff
      const hexPattern = /#(?:[0-9a-fA-F]{3,4}){1,2}\b/g;
      // Match rgb() and rgba()
      const rgbPattern = /\brgb(a?)\s*\([^)]+\)/g;
      // Match hsl() and hsla() - but not inside var()
      const hslPattern = /\bhsl(a?)\s*\([^)]+\)/g;

      // Filter out matches that are inside var() references
      const isInsideVar = (fullText: string, matchIndex: number): boolean => {
        // Look backwards for var(
        const before = fullText.substring(0, matchIndex);
        const lastVar = before.lastIndexOf('var(');
        if (lastVar === -1) return false;
        // Check if there's a closing ) between var( and the match
        const between = fullText.substring(lastVar, matchIndex);
        return !between.includes(')');
      };

      for (const match of withoutKeyframes.matchAll(hexPattern)) {
        if (!isInsideVar(withoutKeyframes, match.index!)) {
          return false;
        }
      }

      for (const match of withoutKeyframes.matchAll(rgbPattern)) {
        if (!isInsideVar(withoutKeyframes, match.index!)) {
          return false;
        }
      }

      for (const match of withoutKeyframes.matchAll(hslPattern)) {
        if (!isInsideVar(withoutKeyframes, match.index!)) {
          return false;
        }
      }

      return true;
    },

    /**
     * Validate that all HSL color values in the token set are within
     * the valid CSS ranges:
     *   - H: 0-360
     *   - S: 0-100%
     *   - L: 0-100%
     *   - A (if present): 0-1
     */
    allHSLColorsValid(): { valid: boolean; errors: string[] } {
      const errors: string[] = [];

      for (const token of flatTokens) {
        const value = token.value.trim();

        // Match hsl() or hsla() patterns
        const hslMatch = value.match(
          /^hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*(?:,\s*([\d.]+)\s*)?\)$/
        );

        if (!hslMatch) continue; // Not an HSL value, skip

        const [, hStr, sStr, lStr, aStr] = hslMatch;
        const h = parseFloat(hStr);
        const s = parseFloat(sStr);
        const l = parseFloat(lStr);
        const a = aStr !== undefined ? parseFloat(aStr) : null;

        if (h < 0 || h > 360) {
          errors.push(`${token.name}: hue ${h} is out of range [0, 360]`);
        }
        if (s < 0 || s > 100) {
          errors.push(`${token.name}: saturation ${s}% is out of range [0, 100]`);
        }
        if (l < 0 || l > 100) {
          errors.push(`${token.name}: lightness ${l}% is out of range [0, 100]`);
        }
        if (a !== null && (a < 0 || a > 1)) {
          errors.push(`${token.name}: alpha ${a} is out of range [0, 1]`);
        }
      }

      return { valid: errors.length === 0, errors };
    },
  };
}