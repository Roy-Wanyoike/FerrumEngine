// ─── Depth Motion ────────────────────────────────────
// 3D depth effects using transform-style: preserve-3d.

import type { MotionConfig } from '../types';

export function generateDepthCSS(config: MotionConfig = {}): string {
  const p = config.prefix ?? 'fr';

  return `/* ═══════════════════════════════════════════════════
   FerrumCSS Depth Motion
   3D depth effects via transform-style: preserve-3d.
   ═══════════════════════════════════════════════════ */

@layer ferrum.motion-engine {
  /* ─── Depth Levels ─── */
  .${p}-depth-1 {
    transform: translateZ(10px);
    transform-style: preserve-3d;
    perspective: 800px;
  }
  .${p}-depth-2 {
    transform: translateZ(20px);
    transform-style: preserve-3d;
    perspective: 800px;
  }
  .${p}-depth-3 {
    transform: translateZ(30px);
    transform-style: preserve-3d;
    perspective: 800px;
  }
  .${p}-depth-4 {
    transform: translateZ(40px);
    transform-style: preserve-3d;
    perspective: 800px;
  }
  .${p}-depth-5 {
    transform: translateZ(50px);
    transform-style: preserve-3d;
    perspective: 800px;
  }

  /* ─── Float ─── */
  @keyframes ${p}-depth-float {
    0%, 100% { transform: translateZ(0px); }
    50%      { transform: translateZ(15px); }
  }
  .${p}-depth-float {
    transform-style: preserve-3d;
    perspective: 1000px;
    animation: ${p}-depth-float 3s ease-in-out infinite;
  }

  /* ─── Pop ─── */
  @keyframes ${p}-depth-pop {
    0%   { transform: translateZ(50px) scale(0.9); opacity: 0; }
    60%  { transform: translateZ(-5px) scale(1.02); opacity: 1; }
    100% { transform: translateZ(0) scale(1); opacity: 1; }
  }
  .${p}-depth-pop {
    transform-style: preserve-3d;
    perspective: 800px;
    animation: ${p}-depth-pop 500ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
  }

  /* ─── Tilt (hover) ─── */
  .${p}-depth-tilt {
    transform-style: preserve-3d;
    perspective: 1000px;
    transition: transform 300ms ease-out, box-shadow 300ms ease;
  }
  .${p}-depth-tilt:hover {
    transform: rotateX(var(--ferrum-tilt-x, 8deg)) rotateY(var(--ferrum-tilt-y, 8deg)) translateZ(20px);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  }

  /* ─── Parallax (via CSS variable) ─── */
  .${p}-depth-parallax {
    transform: translateZ(calc(var(--ferrum-parallax-z, 0) * 1px));
    transform-style: preserve-3d;
    transition: transform 100ms linear;
    will-change: transform;
  }

  /* ─── Card ─── */
  .${p}-depth-card {
    transform-style: preserve-3d;
    perspective: 1200px;
    transition: transform 300ms ease, box-shadow 300ms ease;
  }
  .${p}-depth-card:hover {
    transform: translateZ(30px) rotateX(2deg);
    box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.12);
  }

  /* ─── Layer Stack ─── */
  .${p}-depth-layer {
    transform-style: preserve-3d;
    perspective: 1000px;
  }
  .${p}-depth-layer-back    { transform: translateZ(-40px) scale(0.95); opacity: 0.7; }
  .${p}-depth-layer-mid     { transform: translateZ(0); z-index: 1; }
  .${p}-depth-layer-front   { transform: translateZ(40px) scale(1.05); z-index: 2; }

  @media (prefers-reduced-motion: reduce) {
    .${p}-depth-float,
    .${p}-depth-pop {
      animation: none !important;
      transform: none !important;
    }
  }
}`;
}