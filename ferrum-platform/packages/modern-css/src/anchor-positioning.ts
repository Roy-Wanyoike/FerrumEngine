// ─── Anchor Positioning ────────────────────────────────────
// CSS Anchor Positioning (Chrome 125+) for tooltips, popovers,
// dropdowns, and floating UIs — zero JavaScript.

import type { ModernCSSConfig } from "./types";

/**
 * Generate anchor positioning utilities.
 *
 * Uses `anchor-name`, `position-anchor`, and `position-area`
 * to position elements relative to anchor elements without JS.
 */
export function generateAnchorPositioningCSS(config: ModernCSSConfig = {}): string {
  const p = config.prefix ?? "fr";

  return `/* ═══════════════════════════════════════════════════
   FerrumCSS Anchor Positioning
   Zero-JS tooltips, popovers, and floating UIs.
   Requires Chrome 125+ / Edge 125+.
   ═══════════════════════════════════════════════════ */

@layer ferrum.utilities {
  /* ─── Anchor declaration ─── */
  .${p}-anchor {
    anchor-name: --${p}-anchor;
  }

  /* Named anchors for multi-anchor scenarios */
  .${p}-anchor-trigger { anchor-name: --${p}-trigger; }
  .${p}-anchor-target { anchor-name: --${p}-target; }

  /* ─── Positioned elements (use with @supports for fallback) ─── */

  /* Tooltip: centered above anchor */
  .${p}-tooltip {
    @supports (anchor-name: --x) {
      position: absolute;
      position-anchor: --${p}-anchor;
      position-area: top center;
      translate: 0 -8px;
      white-space: nowrap;
    }
  }

  /* Popover: below anchor, left-aligned */
  .${p}-popover {
    @supports (anchor-name: --x) {
      position: absolute;
      position-anchor: --${p}-anchor;
      position-area: bottom left;
      translate: 0 8px;
    }
  }

  /* Dropdown: below, full-width */
  .${p}-dropdown {
    @supports (anchor-name: --x) {
      position: absolute;
      position-anchor: --${p}-anchor;
      position-area: bottom stretch;
      translate: 0 4px;
      min-width: anchor-width(--${p}-anchor);
    }
  }

  /* Context menu: right of trigger */
  .${p}-context-menu {
    @supports (anchor-name: --x) {
      position: absolute;
      position-anchor: --${p}-anchor;
      position-area: right start;
      translate: 4px 0;
    }
  }

  /* Badge: top-right corner of anchor */
  .${p}-badge-anchor {
    @supports (anchor-name: --x) {
      position: absolute;
      position-anchor: --${p}-anchor;
      position-area: top right;
      translate: 50% -50%;
    }
  }

  /* ─── Arrow/pointer on positioned elements ─── */
  .${p}-popover-arrow::before {
    @supports (anchor-name: --x) {
      content: '';
      position: absolute;
      bottom: -6px;
      left: 16px;
      width: 12px;
      height: 12px;
      background: inherit;
      border: inherit;
      border-top: none;
      border-left: none;
      transform: rotate(45deg);
      clip-path: polygon(0 0, 100% 0, 100% 100%);
    }
  }

  /* ─── Multi-anchor and floating element ─── */
  /* Generic floating element with configurable anchor */
  .${p}-anchor-floating {
    @supports (anchor-name: --x) {
      position: fixed;
      position-anchor: var(--ferrum-anchor-ref, --${p}-anchor);
      position-area: bottom center;
      translate: 0 var(--ferrum-anchor-offset, 8px);
      z-index: var(--ferrum-z-floating, 50);
    }
  }

  /* Inset area utilities — add margin/spacing around anchor position */
  .${p}-anchor-inset-sm { @supports (anchor-name: --x) { position-area: inset-block-start 4px inset-inline-start 4px; } }
  .${p}-anchor-inset-md { @supports (anchor-name: --x) { position-area: inset-block-start 8px inset-inline-start 8px; } }
  .${p}-anchor-inset-lg { @supports (anchor-name: --x) { position-area: inset-block-start 16px inset-inline-start 16px; } }

  /* ─── Try-fallbacks (auto-alignment) ─── */
  /* Chrome 131+: position-try-fallbacks for automatic flip/stretch */
  @supports (position-try-fallbacks: flip) {
    /* Popover with flip fallback: tries bottom, then top if no room */
    .${p}-anchor-popover {
      position: fixed;
      position-anchor: var(--ferrum-anchor-ref, --${p}-anchor);
      position-area: bottom center;
      position-try-fallbacks: flip;
      translate: 0 var(--ferrum-anchor-offset, 8px);
      z-index: var(--ferrum-z-popover, 50);
      min-width: max-content;
    }

    /* Tooltip with flip fallback */
    .${p}-anchor-tooltip-auto {
      position: fixed;
      position-anchor: var(--ferrum-anchor-ref, --${p}-anchor);
      position-area: top center;
      position-try-fallbacks: flip;
      translate: 0 calc(var(--ferrum-anchor-offset, 8px) * -1);
      z-index: var(--ferrum-z-tooltip, 60);
      white-space: nowrap;
    }

    /* Dropdown with flip + stretch fallback chain */
    .${p}-anchor-dropdown-auto {
      position: fixed;
      position-anchor: var(--ferrum-anchor-ref, --${p}-anchor);
      position-area: bottom stretch;
      position-try-fallbacks: flip-block, flip-inline, flip-block flip-inline;
      translate: 0 var(--ferrum-anchor-offset, 4px);
      min-width: anchor-width(var(--ferrum-anchor-ref, --${p}-anchor));
      z-index: var(--ferrum-z-dropdown, 40);
    }
  }
}`.trim();
}