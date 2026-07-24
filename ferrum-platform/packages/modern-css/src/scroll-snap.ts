// ─── Scroll Snap Utilities ──────────────────────────────
// CSS scroll-snap for carousel, gallery, and section-based layouts.
// Well-supported across all modern browsers.

import type { ModernCSSConfig } from "./types";

/**
 * Generate scroll-snap utilities.
 *
 * Includes:
 * - Container definitions (mandatory / proximity)
 * - Axis-locked containers (x / y)
 * - Alignment controls (start / center / end / none)
 * - Stop controls (always / normal)
 */
export function generateScrollSnapCSS(config: ModernCSSConfig = {}): string {
  const p = config.prefix ?? "fr";

  return `/* ═══════════════════════════════════════════════════
   FerrumCSS Scroll Snap
   Carousel, gallery, and section-based layouts.
   All modern browsers.
   ═══════════════════════════════════════════════════ */

@layer ferrum.modern {
  /* ─── Container definitions ─── */
  .${p}-snap-container {
    scroll-snap-type: y mandatory;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .${p}-snap-container-x {
    scroll-snap-type: x mandatory;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scroll-padding: 0;
  }

  .${p}-snap-container-y {
    scroll-snap-type: y mandatory;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  /* Proximity: snaps only when close to a snap point */
  .${p}-snap-proximity {
    scroll-snap-type: y proximity;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .${p}-snap-proximity-x {
    scroll-snap-type: x proximity;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
  }

  /* Both-axis snap (rare, but useful for 2D grids) */
  .${p}-snap-both {
    scroll-snap-type: both mandatory;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  /* ─── Alignment controls ─── */
  .${p}-snap-start {
    scroll-snap-align: start;
  }

  .${p}-snap-center {
    scroll-snap-align: center;
  }

  .${p}-snap-end {
    scroll-snap-align: end;
  }

  .${p}-snap-align-none {
    scroll-snap-align: none;
  }

  /* ─── Stop controls ─── */
  .${p}-snap-stop-always {
    scroll-snap-stop: always;
  }

  .${p}-snap-stop-normal {
    scroll-snap-stop: normal;
  }

  /* ─── Padding for partially visible items ─── */
  .${p}-snap-pad-x {
    scroll-padding-inline: var(--ferrum-snap-pad, 1rem);
  }

  .${p}-snap-pad-y {
    scroll-padding-block: var(--ferrum-snap-pad, 1rem);
  }

  .${p}-snap-pad-all {
    scroll-padding: var(--ferrum-snap-pad, 1rem);
  }

  /* ─── Scroll margin on snap children ─── */
  .${p}-snap-margin-x {
    scroll-margin-inline: var(--ferrum-snap-margin, 0.5rem);
  }

  .${p}-snap-margin-y {
    scroll-margin-block: var(--ferrum-snap-margin, 0.5rem);
  }

  /* ─── Full-page section snapping ─── */
  .${p}-snap-page {
    scroll-snap-type: y mandatory;
    overflow-y: auto;
    height: 100vh;
    height: 100dvh;
  }

  .${p}-snap-page > * {
    scroll-snap-align: start;
    min-height: 100vh;
    min-height: 100dvh;
  }

  /* ─── Carousel helpers ─── */
  .${p}-snap-carousel {
    scroll-snap-type: x mandatory;
    overflow-x: auto;
    scroll-snap-padding-inline: calc(50% - var(--ferrum-carousel-item-width, 300px) / 2);
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }

  .${p}-snap-carousel::-webkit-scrollbar {
    display: none;
  }

  .${p}-snap-carousel > * {
    scroll-snap-align: center;
    flex-shrink: 0;
    width: var(--ferrum-carousel-item-width, 300px);
  }

  /* ─── Hide scrollbar for clean snap UIs ─── */
  .${p}-snap-no-scrollbar {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .${p}-snap-no-scrollbar::-webkit-scrollbar {
    display: none;
  }

  /* ─── Indicators (dot-style) — works with scroll-driven progress ─── */
  @supports (animation-timeline: scroll()) {
    .${p}-snap-indicator {
      width: 8px;
      height: 8px;
      border-radius: 9999px;
      background: var(--ferrum-snap-indicator-inactive, rgba(0,0,0,0.2));
      transition: background 0.2s ease;
    }

    .${p}-snap-indicator-active {
      background: var(--ferrum-snap-indicator-active, #6366f1);
    }
  }
}`;
}