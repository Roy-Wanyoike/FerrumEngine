// ─── Apple Motion ────────────────────────────────
// Apple HIG-inspired motion language.

import type { MotionConfig } from '../types';

export function generateAppleCSS(config: MotionConfig = {}): string {
  const p = config.prefix ?? 'fr';

  return `/* ═════════════════════════════════════════════════════════
   FerrumCSS Apple Motion
   Apple Human Interface Guidelines inspired motion patterns.
   ═════════════════════════════════════════════════════════ */

@layer ferrum.motion-engine {
  /* ─── Glass Expand ─── */
  @keyframes ${p}-glass-expand {
    from { backdrop-filter: blur(0px) saturate(100%); transform: scale(0.95); opacity: 0; }
    to   { backdrop-filter: blur(20px) saturate(180%); transform: scale(1); opacity: 1; }
  .${p}-glass-expand {
    backdrop-filter: blur(0px) saturate(100%);
    transition: all 400ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  .${p}-glass-expand-active {
    backdrop-filter: blur(20px) saturate(180%);
    transform: scale(1);
    opacity: 1;
  }

  /* ─── Glass Collapse ─── */
  @keyframes ${p}-glass-collapse {
    from { backdrop-filter: blur(20px) saturate(180%); transform: scale(1); opacity: 1; }
    to   { backdrop-filter: blur(0px) saturate(100%); transform: scale(0.95); opacity: 0; }
  }
  .${p}-glass-collapse {
    backdrop-filter: blur(20px) saturate(180%);
    transition: all 400ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* ─── iOS Bounce ─── */
  @keyframes ${p}-ios-bounce {
    0%   { transform: translateY(var(--ios-bounce-distance, 100%) scale(0.97); }
    60%  { transform: translateY(calc(var(--ios-bounce-distance, 100%) * -0.1)) scale(1.01); }
    100% { transform: translateY(0) scale(1); }
  .${p}-ios-bounce {
    --ferrum-easing: var(--ios-bounce-easing, cubic-bezier(0.28, 0.84, 0.42, 1));
    transition: transform var(--ferrum-duration, 500ms) var(--ferrum-easing);
  }

  /* ─── iOS Sheet ─── */
  @keyframes ${p}-ios-sheet {
    from { transform: translateY(100%); }
    to   { transform: translateY(0); }
  }
  .${p}-ios-sheet {
    transition: transform 400ms cubic-bezier(0.4, 0, 0.2, 1),
               border-radius: 0 0 var(--ios-sheet-radius, 12px) var(--ios-sheet-radius, 12px);
  }

  /* ─── iOS Card ─── */
  @keyframes ${p}-ios-card {
    0%   { transform: scale(0.96); }
    100% { transform: scale(1); }
  }
  .${p}-ios-card {
    transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  .${p}-ios-card:hover {
    transform: scale(1);
  }

  /* ─── Dynamic Island ─── */
  @keyframes ${p}-dynamic-island {
    0%, 100% { width: var(--ferrum-di-width, 100px); }
    50%  { width: var(--ferrum-di-width-expanded, 200px); }
    100% { width: var(--ferrum-di-width, 100px); }
  }
  .${p}-dynamic-island {
    width: var(--ferrum-di-width, 100px);
    height: var(--ferrum-di-height, 32px);
    border-radius: 9999px;
    background: var(--ferrum-di-bg, #1d1d2f);
    overflow: hidden;
    transition: width 400ms cubic-bezier(0.32, 1, 0.32, 1),
                 height 400ms cubic-bezier(0.32, 1, 0.32, 1);
  }

  /* ─── Spotlight ─── */
  .${p}-spotlight {
    --ferrum-spotlight-x: 50%;
    --ferrum-spotlight-y: 50%;
    transition: background 300ms ease;
    background: radial-gradient(
      circle at var(--ferrum-spotlight-x) var(--ferrum-spotlight-y),
      rgba(255, 255, 255, 0.15) 0%,
      transparent 50%
    );
  }

  /* ─── VisionOS Depth ─── */
  .${p}-visionos-depth {
    perspective: 1200px;
    transform-style: preserve-3d;
    transition: transform 300ms ease, box-shadow 300ms ease;
  }

  @media (prefers-reduced-motion: reduce) {
    .${p}-glass-expand-active, .${p}-glass-collapse-active,
    .${p}-ios-bounce, .${p}-ios-sheet, .${p}-ios-card:hover {
      animation: none !important;
      transform: none !important;
    }
  }
}`;
}