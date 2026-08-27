// ─── Shape Motion ───────────────────────────────────
// Animated geometric shapes.

import type { MotionConfig } from '../types';

export function generateShapeCSS(config: MotionConfig = {}): string {
  const p = config.prefix ?? 'fr';

  return `/* ═══════════════════════════════════════════════════
   FerrumCSS Shape Motion
   Animated geometric shapes and patterns.
   ═══════════════════════════════════════════════════ */

@layer ferrum.motion-engine {
  /* ─── Blob (alias for morph-blob) ─── */
  @keyframes ${p}-shape-blob {
    0%   { border-radius: 60% 40% 30% 70% / 30% 60% 70% 40%; }
    25%  { border-radius: 30% 60% 70% 40% / 70% 30% 40% 60%; }
    50%  { border-radius: 50% 30% 60% 40% / 40% 50% 40% 30%; }
    75%  { border-radius: 40% 70% 30% 60% / 60% 40% 60% 50%; }
    100% { border-radius: 60% 40% 30% 70% / 30% 60% 70% 40%; }
  }
  .${p}-shape-blob {
    animation: ${p}-shape-blob 8s ease-in-out infinite;
  }

  /* ─── Ring Pulse ─── */
  @keyframes ${p}-shape-ring-pulse {
    0%   { transform: scale(1); opacity: 1; }
    100% { transform: scale(1.5); opacity: 0; }
  }
  .${p}-shape-ring-pulse {
    border: 3px solid var(--ferrum-ring-color, #6366f1);
    border-radius: 50%;
    animation: ${p}-shape-ring-pulse 1.5s ease-out infinite;
  }

  /* ─── Spiral ─── */
  @keyframes ${p}-shape-spiral {
    from { transform: rotate(0deg) scale(0.8); }
    to   { transform: rotate(360deg) scale(1.2); }
  }
  .${p}-shape-spiral {
    border: 2px solid transparent;
    border-top-color: var(--ferrum-spiral-color, #6366f1);
    border-radius: 50%;
    width: 24px;
    height: 24px;
    animation: ${p}-shape-spiral 2s linear infinite;
  }

  /* ─── Starburst ─── */
  @keyframes ${p}-shape-starburst {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  .${p}-shape-starburst {
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 79% 91%, 50% 100%, 21% 100%, 0% 79% 9%, 2% 39%, 2% 61%, 9% 98% 35%, 39% 0%);
    animation: ${p}-shape-starburst 10s linear infinite;
  }

  /* ─── Ripple Circle ─── */
  @keyframes ${p}-shape-ripple {
    0%   { transform: scale(0); opacity: 0.6; }
    100% { transform: scale(2.5); opacity: 0; }
  }
  .${p}-shape-ripple-circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid var(--ferrum-ripple-color, #6366f1);
    animation: ${p}-shape-ripple 1s ease-out infinite;
  }

  /* ─── Hex Wave ─── */
  @keyframes ${p}-shape-hex-wave {
    0%   { clip-path: polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%); }
    33%  { clip-path: polygon(25% 0%, 100% 0%, 100% 25%, 75% 75%, 50% 100%, 0% 100%, 0% 75%, 0% 25%); }
    66%  { clip-path: polygon(0% 0%, 100% 0%, 75% 75%, 25% 100%, 0% 100%, 0% 25%, 0% 0%, 25% 0%); }
    100% { clip-path: polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 100%, 0% 75%, 0% 25%); }
  }
  .${p}-shape-hex-wave {
    clip-path: polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 100%, 0% 75%, 0% 25%);
    animation: ${p}-shape-hex-wave 6s ease-in-out infinite;
  }

  /* ─── Triangle Spin ─── */
  @keyframes ${p}-shape-triangle-spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  .${p}-shape-triangle-spin {
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 35px solid var(--ferrum-tri-color, #6366f1);
    animation: ${p}-shape-triangle-spin 3s linear infinite;
  }

  /* ─── Ribbon ─── */
  @keyframes ${p}-shape-ribbon {
    0%, 100% { transform: translateX(0) skewX(0deg); }
    50%      { transform: translateX(10px) skewX(-5deg); }
  }
  .${p}-shape-ribbon {
    display: inline-block;
    animation: ${p}-shape-ribbon 3s ease-in-out infinite;
    transform-origin: center;
  }

  /* ─── Snake ─── */
  @keyframes ${p}-shape-snake {
    0%   { clip-path: polygon(0% 50%, 5% 50%, 15% 50%, 25% 50%, 35% 50%, 45% 50%, 55% 50%, 65% 50%, 75% 50%, 85% 50%, 95% 50%, 100% 50%, 100% 0%); }
    100% { clip-path: polygon(0% 50%, 5% 50%, 15% 50%, 25% 50%, 35% 50%, 45% 50%, 55% 50%, 65% 50%, 75% 50%, 85% 50%, 95% 50%, 100% 50%, 100% 100%); }
  }
  .${p}-shape-snake {
    width: 40px;
    height: 40px;
    background: var(--ferrum-snake-color, #6366f1);
    animation: ${p}-shape-snake 4s linear infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .${p}-shape-blob,
    .${p}-shape-ring-pulse,
    .${p}-shape-ripple-circle,
    .${p}-shape-spiral,
    .${p}-shape-starburst,
    .${p}-shape-hex-wave,
    .${p}-shape-triangle-spin,
    .${p}-shape-ribbon,
    .${p}-shape-snake {
      animation: none !important;
    }
  }
}`;
}