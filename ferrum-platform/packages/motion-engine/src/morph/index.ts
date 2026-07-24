// ─── Morph Pack ──────────────────────────────────────────
// Shape morphing via border-radius, clip-path, and transform.

import type { MotionConfig } from '../types';

export function generateMorphCSS(config: MotionConfig = {}): string {
  const p = config.prefix ?? 'fr';

  return `/* ═══════════════════════════════════════════════════
   FerrumCSS Morph Pack
   Shape morphing via border-radius, clip-path, and transform.
   ═══════════════════════════════════════════════════ */

@layer ferrum.motion-engine {
  /* ─── Circle ─── */
  .${p}-morph-circle {
    border-radius: 50%;
    transition: border-radius 500ms cubic-bezier(0.34, 1.56, 0.64, 1), transform 500ms ease;
  }

  /* ─── Square ─── */
  .${p}-morph-square {
    border-radius: 0;
    transition: border-radius 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* ─── Pill ─── */
  .${p}-morph-pill {
    border-radius: 9999px;
    transition: border-radius 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* ─── Blob (continuous) ─── */
  @keyframes ${p}-morph-blob {
    0%   { border-radius: 60% 40% 30% 70% / 30% 60% 70% 40%; }
    25%  { border-radius: 30% 60% 70% 40% / 70% 30% 40% 60%; }
    50%  { border-radius: 50% 30% 60% 40% / 40% 50% 40% 30%; }
    75%  { border-radius: 40% 70% 30% 60% / 60% 40% 60% 50%; }
    100% { border-radius: 60% 40% 30% 70% / 30% 60% 70% 40%; }
  }
  .${p}-morph-blob {
    animation: ${p}-morph-blob 8s ease-in-out infinite;
  }

  /* ─── Diamond ─── */
  .${p}-morph-diamond {
    border-radius: 4px;
    transition: border-radius 400ms ease, transform 400ms ease;
  }
  .${p}-morph-diamond-active {
    border-radius: 50%;
    transform: rotate(45deg);
  }

  /* ─── Star ─── */
  @keyframes ${p}-morph-star {
    0%   { clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 79% 91%, 50% 100%, 21% 100%, 0% 79% 9%, 2% 39%, 2% 61%, 9% 98% 35%, 39% 0%); }
    100% { clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 79% 91%, 50% 100%, 21% 100%, 0% 79% 9%, 2% 39%, 2% 61%, 9% 98% 35%, 39% 0%) rotate(90deg); }
  }
  .${p}-morph-star {
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 79% 91%, 50% 100%, 21% 100%, 0% 79% 9%, 2% 39%, 2% 61%, 9% 98% 35%, 39% 0%);
    transition: clip-path 500ms ease;
  }
  .${p}-morph-star-active {
    animation: ${p}-morph-star 1s ease-in-out forwards;
  }

  /* ─── Ring Pulse ─── */
  @keyframes ${p}-shape-ring-pulse {
    0%   { transform: scale(1); opacity: 1; border-width: 3px; }
    100% { transform: scale(1.5); opacity: 0; border-width: 1px; }
  }
  .${p}-shape-ring-pulse {
    border: 3px solid var(--ferrum-ring-color, currentColor);
    border-radius: 50%;
    animation: ${p}-shape-ring-pulse 1.5s ease-out infinite;
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
    border: 2px solid var(--ferrum-ripple-color, currentColor);
    animation: ${p}-shape-ripple 1s ease-out infinite;
  }

  /* ─── Spiral ─── */
  @keyframes ${p}-shape-spiral {
    from { transform: rotate(0deg) scale(0.8); opacity: 0; }
    to   { transform: rotate(360deg) scale(1.2); opacity: 0; }
  }
  .${p}-shape-spiral {
    border: 2px solid var(--ferrum-spiral-color, currentColor);
    border-top-color: transparent;
    border-radius: 50%;
    width: 30px;
    height: 30px;
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

  @media (prefers-reduced-motion: reduce) {
    .${p}-morph-blob,
    .${p}-morph-star-active,
    .${p}-shape-ring-pulse,
    .${p}-shape-ripple-circle,
    .${p}-shape-spiral,
    .${p}-shape-starburst {
      animation: none !important;
    }
  }
}`;
}