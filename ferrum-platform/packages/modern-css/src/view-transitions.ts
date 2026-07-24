// ─── View Transitions API ──────────────────────────────
// Helpers for same-document and cross-document view transitions.
// Chrome 111+ for same-document, 126+ for cross-document.

import type { ModernCSSConfig } from "./types";

/**
 * Generate View Transitions CSS utilities.
 *
 * Includes:
 * - Named transition groups for page/component transitions
 * - Fade, slide, scale, morph transition presets
 * - Dark mode transition (smooth color shift)
 * - List reordering transitions
 */
export function generateViewTransitionsCSS(config: ModernCSSConfig = {}): string {
  const p = config.prefix ?? "fr";

  return `/* ═══════════════════════════════════════════════════
   FerrumCSS View Transitions
   Smooth page and component transitions.
   Same-document: Chrome 111+
   Cross-document: Chrome 126+
   ═══════════════════════════════════════════════════ */

@layer ferrum.utilities {
  /* ─── 1. Dark mode smooth transition ─── */
  /* Apply to <html> to animate theme changes */
  .${p}-view-transition-theme,
  html {
    @supports (view-transition-name: none) {
      view-transition-name: root;
    }
  }

  /* ─── 2. Named transition groups ─── */
  .${p}-vt-hero {
    view-transition-name: hero;
  }

  .${p}-vt-header {
    view-transition-name: header;
  }

  .${p}-vt-nav {
    view-transition-name: nav;
  }

  .${p}-vt-sidebar {
    view-transition-name: sidebar;
  }

  .${p}-vt-title {
    view-transition-name: page-title;
  }

  /* ─── 3. Transition animation presets ─── */

  /* Fade through black (good for page transitions) */
  @keyframes ${p}-vt-fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes ${p}-vt-fade-out {
    from { opacity: 1; }
    to { opacity: 0; }
  }

  /* Slide from right (forward navigation) */
  @keyframes ${p}-vt-slide-in-right {
    from { transform: translateX(30px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes ${p}-vt-slide-out-left {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(-30px); opacity: 0; }
  }

  /* Slide from left (back navigation) */
  @keyframes ${p}-vt-slide-in-left {
    from { transform: translateX(-30px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes ${p}-vt-slide-out-right {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(30px); opacity: 0; }
  }

  /* Scale up (modal/dialog entrance) */
  @keyframes ${p}-vt-scale-in {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  @keyframes ${p}-vt-scale-out {
    from { transform: scale(1); opacity: 1; }
    to { transform: scale(0.95); opacity: 0; }
  }

  /* ─── 4. Built-in transition configurations ─── */

  /* Fade: simple cross-fade for all elements */
  ::view-transition-old(root) {
    @supports (view-transition-name: none) {
      animation: 150ms ease-out both ${p}-vt-fade-out;
    }
  }
  ::view-transition-new(root) {
    @supports (view-transition-name: none) {
      animation: 150ms ease-in both ${p}-vt-fade-in;
    }
  }

  /* Slide transition class — add to <html> during forward navigation */
  .${p}-vt-slide-forward::view-transition-old(root) {
    @supports (view-transition-name: none) {
      animation: 250ms ease-in both ${p}-vt-slide-out-left;
    }
  }
  .${p}-vt-slide-forward::view-transition-new(root) {
    @supports (view-transition-name: none) {
      animation: 250ms ease-out both ${p}-vt-slide-in-right;
    }
  }

  /* Slide transition class — add to <html> during back navigation */
  .${p}-vt-slide-back::view-transition-old(root) {
    @supports (view-transition-name: none) {
      animation: 250ms ease-in both ${p}-vt-slide-out-right;
    }
  }
  .${p}-vt-slide-back::view-transition-new(root) {
    @supports (view-transition-name: none) {
      animation: 250ms ease-out both ${p}-vt-slide-in-left;
    }
  }

  /* Scale: for modals, dialogs, overlays */
  .${p}-vt-scale::view-transition-old(.${p}-modal-vt) {
    @supports (view-transition-name: none) {
      animation: 200ms ease-out both ${p}-vt-scale-out;
    }
  }
  .${p}-vt-scale::view-transition-new(.${p}-modal-vt) {
    @supports (view-transition-name: none) {
      animation: 200ms ease-out both ${p}-vt-scale-in;
    }
  }

  /* ─── 5. Component-level transitions ─── */
  @supports (view-transition-name: none) {
    /* Enter/exit animations for dynamic components */
    @keyframes ${p}-vt-component-enter {
      from { opacity: 0; transform: translateY(8px) scale(0.98); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes ${p}-vt-component-exit {
      from { opacity: 1; transform: translateY(0) scale(1); }
      to { opacity: 0; transform: translateY(-8px) scale(0.98); }
    }
    @keyframes ${p}-vt-component-shared {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }

    .${p}-vt-component-enter {
      animation: 200ms cubic-bezier(0.23, 1, 0.32, 1) both ${p}-vt-component-enter;
    }
    .${p}-vt-component-exit {
      animation: 150ms cubic-bezier(0.23, 1, 0.32, 1) both ${p}-vt-component-exit;
    }
    .${p}-vt-component-shared {
      view-transition-name: shared-element;
    }

    /* FLIP animation for list reordering */
    @keyframes ${p}-vt-list-reorder {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .${p}-vt-list-reorder > * {
      view-transition-name: var(--ferrum-list-id, list-item);
    }
    ::view-transition-old(var(--ferrum-list-id, list-item)) {
      animation: 250ms ease-out both ${p}-vt-list-reorder;
    }
  }

  /* ─── 6. Transition speed groups ─── */
  /* Apply to the transition root to control all transition speeds */
  @supports (view-transition-name: none) {
    .${p}-vt-group-fast::view-transition-old(*),
    .${p}-vt-group-fast::view-transition-new(*) {
      animation-duration: 150ms;
    }
    .${p}-vt-group-smooth::view-transition-old(*),
    .${p}-vt-group-smooth::view-transition-new(*) {
      animation-duration: 300ms;
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    .${p}-vt-group-dramatic::view-transition-old(*),
    .${p}-vt-group-dramatic::view-transition-new(*) {
      animation-duration: 500ms;
      animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .${p}-vt-group-none::view-transition-old(*),
    .${p}-vt-group-none::view-transition-new(*) {
      animation: none !important;
    }
  }

  /* ─── 7. Slide direction variants ─── */
  @keyframes ${p}-vt-slide-left { from { transform: translateX(100%); } to { transform: translateX(0); } }
  @keyframes ${p}-vt-slide-right { from { transform: translateX(-100%); } to { transform: translateX(0); } }
  @keyframes ${p}-vt-slide-up-in { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  @keyframes ${p}-vt-slide-down-in { from { transform: translateY(-100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

  @supports (view-transition-name: none) {
    .${p}-vt-slide-left::view-transition-new(root) { animation: 300ms ease-out both ${p}-vt-slide-left; }
    .${p}-vt-slide-right::view-transition-new(root) { animation: 300ms ease-out both ${p}-vt-slide-right; }
    .${p}-vt-slide-up::view-transition-new(root) { animation: 300ms ease-out both ${p}-vt-slide-up-in; }
    .${p}-vt-slide-down::view-transition-new(root) { animation: 300ms ease-out both ${p}-vt-slide-down-in; }
  }

  /* ─── 8. Fade + scale morph transition ─── */
  @keyframes ${p}-vt-morph-in { from { opacity: 0; border-radius: 50%; transform: scale(0.8); } to { opacity: 1; border-radius: 0; transform: scale(1); } }
  @keyframes ${p}-vt-morph-out { from { opacity: 1; border-radius: 0; transform: scale(1); } to { opacity: 0; border-radius: 50%; transform: scale(0.8); } }

  @supports (view-transition-name: none) {
    .${p}-vt-morph::view-transition-old(root) { animation: 300ms ease-in both ${p}-vt-morph-out; }
    .${p}-vt-morph::view-transition-new(root) { animation: 300ms ease-out both ${p}-vt-morph-in; }
  }

  /* ─── 9. Disable transitions for reduced-motion users ─── */
  @media (prefers-reduced-motion: reduce) {
    ::view-transition-old(*),
    ::view-transition-new(*) {
      animation: none !important;
      mix-blend-mode: normal !important;
    }
  }

  /* ─── 6. List item reordering transitions ─── */
  .${p}-vt-list > * {
    @supports (view-transition-name: none) {
      view-transition-name: list-item;
    }
  }
}`.trim();
}