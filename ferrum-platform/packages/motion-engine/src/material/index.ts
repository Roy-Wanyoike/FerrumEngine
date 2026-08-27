// ─── Material Motion ───────────────────────────────
// Google Material Design motion patterns.

import type { MotionConfig } from '../types';

export function generateMaterialCSS(config: MotionConfig = {}): string {
  const p = config.prefix ?? 'fr';

  return `/* ═════════════════════════════════════════════════════
   FerrumCSS Material Motion
   Google Material Design motion patterns — container transform,
   fade-through, shared axis, elevation, reveal, and scale.
   ═══════════════════════════════════════════════════════ */

@layer ferrum.motion-engine {
  /* ─── Fade Through (shared axis) ─── */
  @keyframes ${p}-material-fade-through-enter {
    0%   { opacity: 0; transform: translateX(var(--ferrum-mt-direction, 20px)) scale(0.92); }
    100% { opacity: 1; transform: translateX(0) scale(1); }
  @keyframes ${p}-material-fade-through-exit {
    0%   { opacity: 1; transform: translateX(0) scale(1); }
    100% { opacity: 0; transform: translateX(var(--ferrum-mt-direction, -20px)) scale(0.92); }
  .${p}-material-fade-through-enter {
    animation: ${p}-material-fade-through-enter 300ms cubic-bezier(0.4, 0, 0.2, 1) both;
  }
  .${p}-material-fade-through-exit {
    animation: ${p}-material-fade-through-exit 300ms cubic-bezier(0.4, 0, 0.2, 1) both;
  }

  /* ─── Shared Axis ─── */
  @keyframes ${p}-material-shared-axis-x-enter {
    0%   { opacity: 0; transform: translateX(var(--ferrum-mt-direction, 40px)); }
    100% { opacity: 1; transform: translateX(0); }
  }
  @keyframes ${p}-material-shared-axis-x-exit {
    0%   { opacity: 1; transform: translateX(0); }
    100% { opacity: 0; transform: translateX(var(--ferrum-mt-direction, -40px)); }
  }
  .${p}-material-shared-x-enter {
    animation: ${p}-material-shared-axis-x-enter 300ms cubic-bezier(0.4, 0, 0.2, 1) both;
  }
  .${p}-material-shared-x-exit {
    animation: ${p}-material-shared-axis-x-exit 300ms cubic-bezier(0.4, 0, 0.2, 1) both;
  }
  @keyframes ${p}-material-shared-axis-y-enter {
    0%   { opacity: 0; transform: translateY(var(--ferrum-mt-direction, 40px)); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes ${p}-material-shared-axis-y-exit {
    0%   { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(var(--ferrum-mt-direction, -40px)); }
  }
  .${p}-material-shared-y-enter {
    animation: ${p}-material-shared-axis-y-enter 300ms cubic-bezier(0.4, 0, 0.2, 1) both;
  }
  .${p}-material-shared-y-exit {
    animation: ${p}-material-shared-axis-y-exit 300ms cubic-bezier(0.4, 0, 0.2, 1) both;
  }

  /* ─── Container Transform ─── */
  @keyframes ${p}-material-container-enter {
    0%   { border-radius: var(--ferrum-mt-radius-start, 8px); transform: scale(0.95); }
    100% { border-radius: var(--ferrum-mt-radius-end, 16px); transform: scale(1); }
  @keyframes ${p}-material-container-exit {
    0%   { border-radius: var(--ferrum-mt-radius-end, 16px); transform: scale(1); }
    100% { border-radius: var(--ferrum-mt-radius-start, 8px); transform: scale(0.95); }
  .${p}-material-container-enter {
    animation: ${p}-material-container-enter 300ms cubic-bezier(0.4, 0, 0.2, 1) both;
  }
  .${p}-material-container-exit {
    animation: ${p}-material-container-exit 300ms cubic-bezier(0.4, 0, 0.2, 1) both;
  }

  /* ─── Elevation ─── */
  .${p}-material-elevation {
    transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1),
               box-shadow 300ms ease;
  }
  .${p}-material-elevation:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 32px -8px rgba(0, 0, 0, 0.12);
  }

  /* ─── Reveal ─── */
  @keyframes ${p}-material-reveal {
    0%   { clip-path: circle(0% at 50% 50%); }
    100% { clip-path: circle(150% at 50% 50%); }
  .${p}-material-reveal {
    clip-path: circle(0% at 50% 50%);
    transition: clip-path 500ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* ─── Scale ─── */
  @keyframes ${p}-material-scale-enter {
    0%   { transform: scale(0.92); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  @keyframes ${p}-material-scale-exit {
    0%   { transform: scale(1); opacity: 1; }
    100% { transform: scale(0.92); opacity: 0; }
  }
  .${p}-material-scale-enter {
    animation: ${p}-material-scale-enter 300ms cubic-bezier(0.4, 0, 0.2, 1) both;
  }
  .${p}-material-scale-exit {
    animation: ${p}-material-scale-exit 300ms cubic-bezier(0.4, 0, 0.2, 1) both;
  }

  @media (prefers-reduced-motion: reduce) {
    .${p}-material-fade-through-enter,
    .${p}-material-fade-through-exit,
    .${p}-material-shared-x-enter, .${p}-material-shared-x-exit,
    .${p}-material-shared-y-enter, .${p}-material-shared-y-exit,
    .${p}-material-container-enter, .${p}-material-container-exit,
    .${p}-material-reveal,
    .${p}-material-scale-enter, .${p}-material-scale-exit {
      animation: none !important;
      clip-path: none !important;
    }
  }
}`;
}