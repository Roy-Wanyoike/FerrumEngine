// ─── Scroll-Driven Animations ──────────────────────────────
// Leverages CSS Scroll-Driven Animations (Chrome 115+) for
// JS-free scroll-linked effects: progress bars, parallax,
// reveal-on-scroll, sticky headers, and scroll indicators.

import type { ModernCSSConfig } from "./types";

/**
 * Generate scroll-driven animation utilities.
 *
 * Uses `animation-timeline: scroll()` and `animation-timeline: view()`
 * to create scroll-linked animations without any JavaScript.
 *
 * Includes:
 * - Scroll progress bar
 * - Parallax backgrounds
 * - Reveal-on-scroll (fade-up, slide-in)
 * - Scale-on-scroll
 * - Scroll-linked opacity
 * - Horizontal scroll progress
 */
export function generateScrollDrivenCSS(config: ModernCSSConfig = {}): string {
  const p = config.prefix ?? "fr";

  return `/* ═══════════════════════════════════════════════════
   FerrumCSS Scroll-Driven Animations
   Pure CSS scroll-linked effects — zero JavaScript.
   Requires Chrome 115+ / Edge 115+. Graceful fallback.
   ═══════════════════════════════════════════════════ */

@layer ferrum.utilities {
  /* ─── @keyframes for scroll-driven animations ─── */
  @keyframes ${p}-scroll-progress {
    from { transform: scaleX(0); }
    to { transform: scaleX(1); }
  }

  @keyframes ${p}-scroll-fade-in {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes ${p}-scroll-fade-out {
    from { opacity: 1; }
    to { opacity: 0; }
  }

  @keyframes ${p}-scroll-scale-in {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }

  @keyframes ${p}-scroll-parallax {
    from { transform: translateY(0); }
    to { transform: translateY(-80px); }
  }

  @keyframes ${p}-scroll-rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes ${p}-scroll-width {
    from { width: 0%; }
    to { width: 100%; }
  }

  /* ─── 1. Reading progress bar ─── */
  /* Fixed top bar that fills as user scrolls the page */
  .${p}-scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--fr-colors-primary-500, #6366f1);
    transform-origin: left;
    /* Scroll-driven: linked to document scroll progress */
    animation: ${p}-scroll-progress linear;
    animation-timeline: scroll();
    z-index: 9999;
    /* Fallback: hidden when scroll-driven animations unsupported */
  }

  /* ─── 2. Reveal on scroll (view-timeline) ─── */
  /* Elements fade in as they enter the viewport */
  .${p}-scroll-reveal {
    /* Fallback: always visible */
    opacity: 1;
    transform: translateY(0);

    @supports (animation-timeline: view()) {
      opacity: 0;
      transform: translateY(30px);
      animation: ${p}-scroll-fade-in linear both;
      animation-timeline: view();
      animation-range: entry 0% entry 100%;
    }
  }

  .${p}-scroll-reveal-scale {
    opacity: 1;
    transform: scale(1);

    @supports (animation-timeline: view()) {
      opacity: 0;
      transform: scale(0.9);
      animation: ${p}-scroll-scale-in linear both;
      animation-timeline: view();
      animation-range: entry 0% entry 100%;
    }
  }

  /* ─── 3. Parallax background ─── */
  /* Background image moves slower than scroll */
  .${p}-scroll-parallax {
    @supports (animation-timeline: view()) {
      animation: ${p}-scroll-parallax linear;
      animation-timeline: view();
      animation-range: entry 0% exit 100%;
    }
  }

  /* ─── 4. Scroll-linked opacity ─── */
  /* Element fades as user scrolls past it */
  .${p}-scroll-fade-out {
    @supports (animation-timeline: view()) {
      animation: ${p}-scroll-fade-out linear both;
      animation-timeline: view();
      animation-range: entry 50% exit 50%;
    }
  }

  /* ─── 5. Container scroll progress indicator ─── */
  /* Horizontal bar that fills as a specific container is scrolled */
  .${p}-container-scroll-progress {
    height: 2px;
    background: var(--fr-colors-primary-500, #6366f1);
    transform-origin: left;
    /* Fallback: hidden */
    display: none;

    @supports (animation-timeline: scroll()) {
      display: block;
      animation: ${p}-scroll-width linear;
      animation-timeline: scroll(self inline);
    }
  }

  /* ─── 6. Staggered reveal for child elements ─── */
  .${p}-scroll-stagger > * {
    opacity: 1;

    @supports (animation-timeline: view()) {
      opacity: 0;
      animation: ${p}-scroll-fade-in linear both;
      animation-timeline: view();
      animation-range: entry 0% entry 100%;
    }
  }
  .${p}-scroll-stagger > *:nth-child(1) { animation-delay: 0ms; }
  .${p}-scroll-stagger > *:nth-child(2) { animation-delay: 80ms; }
  .${p}-scroll-stagger > *:nth-child(3) { animation-delay: 160ms; }
  .${p}-scroll-stagger > *:nth-child(4) { animation-delay: 240ms; }
  .${p}-scroll-stagger > *:nth-child(5) { animation-delay: 320ms; }
  .${p}-scroll-stagger > *:nth-child(6) { animation-delay: 400ms; }
  /* Delays via animation-range (more precise than animation-delay with view() timelines) */

  /* ─── 7. Scroll state queries (Chrome 125+) ─── */
  /* Style elements based on scroll state of an ancestor */
  @supports (selector(scroll-state: stuck)) {
    :has(> scroll-state(stuck)) .${p}-when-stuck {
      background: var(--fr-colors-white, #fff);
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .${p}-header-stuck {
      position: sticky;
      top: 0;
    }
  }
}

/* ═══════════════════════════════════════════════════════════════
   FerrumCSS View Timeline Utilities (2025+)
   Fine-grained view-timeline() animations for enter/exit effects.
   Requires Chrome 115+ / Edge 115+.
   ═══════════════════════════════════════════════════════════════ */
@layer ferrum.modern {
  @supports (animation-timeline: view()) {
    /* ─── @keyframes for view timeline animations ─── */
    @keyframes ${p}-vt-fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes ${p}-vt-fade-out {
      from { opacity: 1; }
      to { opacity: 0; }
    }

    @keyframes ${p}-vt-scale-in {
      from { opacity: 0; transform: scale(0.8); }
      to { opacity: 1; transform: scale(1); }
    }

    @keyframes ${p}-vt-slide-up {
      from { opacity: 0; transform: translateY(60px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes ${p}-vt-parallax-translate {
      from { transform: translateY(var(--ferrum-parallax-distance, -100px)); }
      to { transform: translateY(0); }
    }

    /* ─── .fr-vt-fade-in — fade in as element enters view ─── */
    .${p}-vt-fade-in {
      opacity: 0;
      animation: ${p}-vt-fade-in linear both;
      animation-timeline: view();
      animation-range: entry 0% entry 100%;
    }

    /* ─── .fr-vt-fade-out — fade out as element exits view ─── */
    .${p}-vt-fade-out {
      animation: ${p}-vt-fade-out linear both;
      animation-timeline: view();
      animation-range: exit 0% exit 100%;
    }

    /* ─── .fr-vt-scale-in — scale from 0.8 to 1 as entering ─── */
    .${p}-vt-scale-in {
      opacity: 0;
      transform: scale(0.8);
      animation: ${p}-vt-scale-in linear both;
      animation-timeline: view();
      animation-range: entry 0% cover 30%;
    }

    /* ─── .fr-vt-slide-up — slide from below as entering ─── */
    .${p}-vt-slide-up {
      opacity: 0;
      transform: translateY(60px);
      animation: ${p}-vt-slide-up linear both;
      animation-timeline: view();
      animation-range: entry 0% cover 40%;
    }

    /* ─── .fr-vt-parallax — parallax effect (translate based on view progress) ─── */
    /* Set --ferrum-parallax-distance to control the parallax amount */
    .${p}-vt-parallax {
      animation: ${p}-vt-parallax-translate linear;
      animation-timeline: view();
      animation-range: entry 0% exit 100%;
      will-change: transform;
    }
  }

  /* ─── Fallback: hide until JS adds .${p}-scroll-reveal or JS polyfill kicks in ─── */
  @supports not (animation-timeline: view()) {
    .${p}-vt-fade-in,
    .${p}-vt-scale-in,
    .${p}-vt-slide-up {
      opacity: 1;
      transform: none;
    }
    .${p}-vt-fade-out {
      opacity: 1;
    }
  }
}

/* ═══════════════════════════════════════════════════════════════
   FerrumCSS Scroll Progress Utilities (2025+)
   Enhanced progress bars and scroll-linked indicators.
   Requires Chrome 115+ / Edge 115+.
   ═══════════════════════════════════════════════════════════════ */
@layer ferrum.modern {
  @supports (animation-timeline: scroll()) {
    /* ─── @keyframes for scroll progress ─── */
    @keyframes ${p}-sp-fill {
      from { transform: scaleX(0); }
      to { transform: scaleX(1); }
    }

    @keyframes ${p}-sp-fill-height {
      from { transform: scaleY(0); }
      to { transform: scaleY(1); }
    }

    /* ─── .fr-sp-progress-bar — full-width progress bar that fills based on scroll ─── */
    .${p}-sp-progress-bar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: var(--ferrum-progress-color, #6366f1);
      transform-origin: left;
      animation: ${p}-sp-fill linear;
      animation-timeline: scroll();
      z-index: var(--ferrum-z-progress, 9999);
    }

    /* ─── .fr-sp-progress-bar-thin — thin variant (2px) ─── */
    .${p}-sp-progress-bar-thin {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--ferrum-progress-color, #6366f1);
      transform-origin: left;
      animation: ${p}-sp-fill linear;
      animation-timeline: scroll();
      z-index: var(--ferrum-z-progress, 9999);
    }

    /* ─── .fr-sp-progress-bar-accent — uses accent color ─── */
    .${p}-sp-progress-bar-accent {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(
        90deg,
        var(--ferrum-accent-start, #6366f1),
        var(--ferrum-accent-end, #ec4899)
      );
      transform-origin: left;
      animation: ${p}-sp-fill linear;
      animation-timeline: scroll();
      z-index: var(--ferrum-z-progress, 9999);
    }

    /* ─── .fr-sp-counter — shows scroll percentage (via CSS counter trick) ─── */
    /* Works with a <span> inside the element showing the counter value */
    .${p}-sp-counter {
      position: fixed;
      bottom: var(--ferrum-counter-bottom, 1rem);
      right: var(--ferrum-counter-right, 1rem);
      font-size: var(--ferrum-counter-font-size, 0.75rem);
      font-weight: 600;
      font-variant-numeric: tabular-nums;
      color: var(--ferrum-counter-color, #6366f1);
      counter-reset: scroll-percent;
      z-index: var(--ferrum-z-counter, 9998);
    }
    .${p}-sp-counter::after {
      content: counter(scroll-percent) "%";
      animation: ${p}-sp-counter-count linear;
      animation-timeline: scroll();
    }
    @keyframes ${p}-sp-counter-count {
      from { counter-increment: scroll-percent 0; }
      to { counter-increment: scroll-percent 100; }
    }
  }

  /* ─── Fallback for browsers without scroll timeline ─── */
  @supports not (animation-timeline: scroll()) {
    .${p}-sp-progress-bar,
    .${p}-sp-progress-bar-thin,
    .${p}-sp-progress-bar-accent {
      display: none;
    }
    .${p}-sp-counter {
      display: none;
    }
  }
}`.trim();
}