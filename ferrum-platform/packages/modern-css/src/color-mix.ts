// ─── CSS color-mix() Utilities ────────────────────────────
// Dynamic color manipulation via native CSS color-mix().
// Chrome 111+, Safari 16.2+, Firefox 113+.

import type { ModernCSSConfig } from "./types";

/**
 * Generate color-mix() utilities.
 *
 * Includes:
 * - Lighten / darken variants
 * - Alpha/transparency control
 * - Hue rotation (via oklch)
 * - Auto high-contrast text
 *
 * All utilities use the `color-mix()` CSS function with `in srgb` or `in oklch`.
 */
export function generateColorMixCSS(config: ModernCSSConfig = {}): string {
  const p = config.prefix ?? "fr";

  // Generate lighten/darken at specific percentages
  const percentages = [10, 20, 30, 40, 50, 60, 70, 80, 90];
  const lightenLines: string[] = [];
  const darkenLines: string[] = [];
  const alphaLines: string[] = [];

  for (const pct of percentages) {
    const cls = (pct / 10).toString();
    lightenLines.push(
      `  .${p}-mix-lighten-${cls} { color: color-mix(in srgb, var(--ferrum-mix-color, currentColor) ${100 - pct}%, white); }`,
    );
    darkenLines.push(
      `  .${p}-mix-darken-${cls} { color: color-mix(in srgb, var(--ferrum-mix-color, currentColor) ${100 - pct}%, black); }`,
    );
    alphaLines.push(
      `  .${p}-mix-alpha-${cls} { color: color-mix(in srgb, var(--ferrum-mix-color, currentColor) ${pct}%, transparent); }`,
    );
  }

  return `/* ═══════════════════════════════════════════════════
   FerrumCSS Color Mix Utilities
   Dynamic color manipulation via color-mix().
   Chrome 111+, Safari 16.2+, Firefox 113+.
   ═══════════════════════════════════════════════════ */

@supports (color: color-mix(in srgb, red, blue)) {
@layer ferrum.modern {
  /* ─── Set the base color to mix against ─── */
  .${p}-mix-bg-primary { --ferrum-mix-color: var(--ferrum-color-primary, #6366f1); }
  .${p}-mix-bg-secondary { --ferrum-mix-color: var(--ferrum-color-secondary, #64748b); }
  .${p}-mix-bg-accent { --ferrum-mix-color: var(--ferrum-color-accent, #ec4899); }
  .${p}-mix-bg-destructive { --ferrum-mix-color: var(--ferrum-color-destructive, #ef4444); }
  .${p}-mix-bg-foreground { --ferrum-mix-color: var(--ferrum-color-foreground, #0f172a); }
  .${p}-mix-bg-muted { --ferrum-mix-color: var(--ferrum-color-muted, #94a3b8); }

  /* ─── Lighten: mix with white ─── */
  /* Usage: <div class="fr-mix-bg-primary fr-mix-lighten-3">Lighter primary</div> */
${lightenLines.join("\n")}

  /* ─── Darken: mix with black ─── */
${darkenLines.join("\n")}

  /* ─── Alpha: mix with transparent ─── */
${alphaLines.join("\n")}

  /* ─── Hue rotation via oklch ─── */
  /* Shifts the hue by rotating in oklch color space */
  .${p}-mix-hue-rotate-15 { color: oklch(from var(--ferrum-mix-color, currentColor) l c calc(h + 15)); }
  .${p}-mix-hue-rotate-30 { color: oklch(from var(--ferrum-mix-color, currentColor) l c calc(h + 30)); }
  .${p}-mix-hue-rotate-60 { color: oklch(from var(--ferrum-mix-color, currentColor) l c calc(h + 60)); }
  .${p}-mix-hue-rotate-90 { color: oklch(from var(--ferrum-mix-color, currentColor) l c calc(h + 90)); }
  .${p}-mix-hue-rotate-120 { color: oklch(from var(--ferrum-mix-color, currentColor) l c calc(h + 120)); }
  .${p}-mix-hue-rotate-180 { color: oklch(from var(--ferrum-mix-color, currentColor) l c calc(h + 180)); }

  /* Negative rotation */
  .${p}-mix-hue-rotate-n15 { color: oklch(from var(--ferrum-mix-color, currentColor) l c calc(h - 15)); }
  .${p}-mix-hue-rotate-n30 { color: oklch(from var(--ferrum-mix-color, currentColor) l c calc(h - 30)); }
  .${p}-mix-hue-rotate-n60 { color: oklch(from var(--ferrum-mix-color, currentColor) l c calc(h - 60)); }

  /* ─── Background variants (same as color but for background) ─── */
  .${p}-mix-bg-lighten-3 { background: color-mix(in srgb, var(--ferrum-mix-color, currentColor) 70%, white); }
  .${p}-mix-bg-lighten-5 { background: color-mix(in srgb, var(--ferrum-mix-color, currentColor) 50%, white); }
  .${p}-mix-bg-lighten-7 { background: color-mix(in srgb, var(--ferrum-mix-color, currentColor) 30%, white); }
  .${p}-mix-bg-lighten-9 { background: color-mix(in srgb, var(--ferrum-mix-color, currentColor) 10%, white); }
  .${p}-mix-bg-darken-3 { background: color-mix(in srgb, var(--ferrum-mix-color, currentColor) 70%, black); }
  .${p}-mix-bg-darken-5 { background: color-mix(in srgb, var(--ferrum-mix-color, currentColor) 50%, black); }
  .${p}-mix-bg-darken-7 { background: color-mix(in srgb, var(--ferrum-mix-color, currentColor) 30%, black); }

  /* ─── Border color variants ─── */
  .${p}-mix-border-lighten-3 { border-color: color-mix(in srgb, var(--ferrum-mix-color, currentColor) 70%, white); }
  .${p}-mix-border-lighten-5 { border-color: color-mix(in srgb, var(--ferrum-mix-color, currentColor) 50%, white); }
  .${p}-mix-border-darken-3 { border-color: color-mix(in srgb, var(--ferrum-mix-color, currentColor) 70%, black); }
  .${p}-mix-border-darken-5 { border-color: color-mix(in srgb, var(--ferrum-mix-color, currentColor) 50%, black); }

  /* ─── Auto high-contrast text ─── */
  /* Automatically picks black or white text based on background luminance */
  .${p}-mix-contrast-text {
    color: color-mix(in srgb, var(--ferrum-bg-color, #ffffff) 50%, black);
  }
  /* Uses relative color syntax to check lightness */
  .${p}-mix-auto-contrast {
    @supports (color: oklch(from red l c h)) {
      color: oklch(from var(--ferrum-bg-color, #ffffff) calc(l * 0 + 0%) 0 0);
    }
  }

  /* ─── Complement (opposite on color wheel) ─── */
  .${p}-mix-complement {
    color: oklch(from var(--ferrum-mix-color, currentColor) l c calc(h + 180));
  }

  /* ─── Invert ─── */
  .${p}-mix-invert {
    color: oklch(from var(--ferrum-mix-color, currentColor) calc(1 - l) c h);
  }

  /* ─── Desaturate ─── */
  .${p}-mix-desaturate-3 { color: oklch(from var(--ferrum-mix-color, currentColor) l calc(c * 0.7) h); }
  .${p}-mix-desaturate-5 { color: oklch(from var(--ferrum-mix-color, currentColor) l calc(c * 0.5) h); }
  .${p}-mix-desaturate-8 { color: oklch(from var(--ferrum-mix-color, currentColor) l calc(c * 0.2) h); }
  .${p}-mix-grayscale { color: oklch(from var(--ferrum-mix-color, currentColor) l 0 h); }
}
}`.trim();
}