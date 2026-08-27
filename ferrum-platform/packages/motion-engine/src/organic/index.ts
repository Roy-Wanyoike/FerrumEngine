// ─── Organic Motion ────────────────────────────────
// Nature-inspired animations with multi-step keyframes.

import type { MotionConfig } from '../types';

export function generateOrganicCSS(config: MotionConfig = {}): string {
  const p = config.prefix ?? 'fr';

  return `/* ═════════════════════════════════════════════════════════
   FerrumCSS Organic Motion
   Nature-inspired animations for organic, natural feel.
   Multi-step keyframes for realistic movement.
   ═══════════════════════════════════════════════════════════ */

@layer ferrum.motion-engine {
  /* ─── Water Wave ─── */
  @keyframes ${p}-organic-water {
    0%, 100% { transform: translateY(0); }
    25% { transform: translateY(-8px); }
    50% { transform: translateY(0); }
    75% { transform: translateY(6px); }
  }
  .${p}-organic-water {
    animation: ${p}-organic-water 4s ease-in-out infinite;
  }

  /* ─── Smoke ─── */
  @keyframes ${p}-organic-smoke {
    0%   { opacity: 0; transform: translateY(0) scale(0.8); }
    30%  { opacity: 0.15; transform: translateY(-20px) scale(1); }
    60%  { opacity: 0.25; transform: translateY(-40px) scale(1.1); }
    100% { opacity: 0; transform: translateY(-60px) scale(1.2); }
  }
  .${p}-organic-smoke {
    animation: ${p}-organic-smoke 6s ease-out infinite;
    will-change: opacity, transform;
  }

  /* ─── Fog ─── */
  @keyframes ${p}-organic-fog {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.02); }
  }
  .${p}-organic-fog {
    animation: ${p}-organic-fog 8s ease-in-out infinite;
  }

  /* ─── Bubble Rise ─── */
  @keyframes ${p}-organic-bubble {
    0%   { opacity: 0.6; transform: translateY(100%) scale(0); }
    50%  { opacity: 0.8; transform: translateY(40%) scale(0.6); }
    100% { opacity: 0; transform: translateY(0) scale(1); }
  }
  .${p}-organic-bubble {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,255,255,0.4), transparent 70%);
    animation: ${p}-organic-bubble 3s ease-out infinite;
  }

  /* ─── Flame ─── */
  @keyframes ${p}-organic-flame {
    0%   { transform: scaleY(1) scaleX(1); filter: brightness(1); opacity: 0.8; }
    25%  { transform: scaleY(1.05) scaleX(1.1); filter: brightness(1.3); opacity: 1; }
    50%  { transform: scaleY(0.98) scaleX(1.05); filter: brightness(1.1); opacity: 0.9; }
    75%  { transform: scaleY(1.03) scaleX(0.98); filter: brightness(1.2); opacity: 1; }
    100% { transform: scaleY(1) scaleX(1); filter: brightness(1); opacity: 0.7; }
  }
  .${p}-organic-flame {
    color: #ff6b35;
    text-shadow: 0 0 10px rgba(255, 107, 53, 0.6);
    animation: ${p}-organic-flame 2s ease-in-out infinite;
  }

  /* ─── Lava ─── */
  @keyframes ${p}-organic-lava {
    0%   { transform: scale(1) skewX(0deg); background: #ff4500; }
    33%  { transform: scale(1.05) skewX(2deg); background: #ff6a00; }
    66%  { transform: scale(0.97) skewX(-1deg); background: #ff4500; }
    100% { transform: scale(1) skewX(0deg); background: #ff6a00; }
  }
  .${p}-organic-lava {
    background: #ff4500;
    animation: ${p}-organic-lava 4s ease-in-out infinite;
  }

  /* ─── Ink Spread ─── */
  @keyframes ${p}-organic-ink {
    0%   { transform: scale(0); opacity: 0.8; border-radius: 50%; }
    50%  { transform: scale(3); opacity: 0.4; border-radius: 45% 55% 48% 52%; }
    100% { transform: scale(4); opacity: 0; border-radius: 50%; }
  }
  .${p}-organic-ink {
    background: var(--ferrum-ink-color, #1a1a2e);
    animation: ${p}-organic-ink 2s ease-out both;
  }

  /* ─── Flower Bloom ─── */
  @keyframes ${p}-organic-bloom {
    0%   { transform: scale(0) rotate(-90deg); opacity: 0; }
    60%  { transform: scale(0.5) rotate(-30deg); opacity: 0.8; }
    100% { transform: scale(1) rotate(0deg); opacity: 1; }
  }
  .${p}-organic-bloom {
    width: 30px;
    height: 30px;
    background: var(--ferrum-bloom-color, #ec4899);
    clip-path: polygon(50% 0%, 80% 0%, 100% 50%, 100% 50%, 50% 100%);
    animation: ${p}-organic-bloom 1.5s ease-out both;
  }

  /* ─── Vine Grow ─── */
  @keyframes ${p}-organic-vine {
    0%   { transform: scaleY(0); transform-origin: bottom; }
    100% { transform: scaleY(1); }
  }
  .${p}-organic-vine {
    width: 4px;
    height: var(--ferrum-vine-height, 80px);
    background: var(--ferrum-vine-color, #22c55e);
    transform-origin: bottom;
    animation: ${p}-organic-vine var(--ferrum-vine-duration, 2s) ease-out both;
  }

  /* ─── Jelly Squish ─── */
  @keyframes ${p}-organic-jelly {
    0%, 100% { transform: scale(1, 1); }
    25%  { transform: scale(1.12, 0.88); }
    50%  { transform: scale(0.88, 1.12); }
    75%  { transform: scale(1.1, 0.9); }
  }
  .${p}-organic-jelly {
    animation: ${p}-organic-jelly 1.5s ease-in-out infinite;
  }

  /* ─── Aurora ─── */
  @keyframes ${p}-organic-aurora {
    0%   { filter: hue-rotate(0deg) brightness(1); }
    33%  { filter: hue-rotate(120deg) brightness(1.1); }
    66%  { filter: hue-rotate(240deg) brightness(1); }
    100% { filter: hue-rotate(360deg) brightness(1); }
  }
  .${p}-organic-aurora {
    background: linear-gradient(90deg, #00f5d4, #a855f7, #ec4899, #f97316);
    background-size: 300% 100%;
    animation: ${p}-organic-aurora 6s linear infinite;
    filter: hue-rotate(0deg);
    mix-blend-mode: overlay;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    opacity: 0.8;
  }

  /* ─── Breathing ─── */
  @keyframes ${p}-organic-breathing {
    0%, 100% { transform: scale(1); }
    50%      { transform: scale(1.03); }
  }
  .${p}-organic-breathing {
    animation: ${p}-organic-breathing 4s ease-in-out infinite;
  }

  /* ─── Heartbeat ─── */
  @keyframes ${p}-organic-heartbeat {
    0% { transform: scale(1); }
    14% { transform: scale(1.15); }
    28% { transform: scale(1); }
    42% { transform: scale(1.15); }
    56% { transform: scale(1); }
    70% { transform: scale(1.15); }
    84% { transform: scale(1); }
    100% { transform: scale(1); }
  }
  .${p}-organic-heartbeat {
    animation: ${p}-organic-heartbeat 1.4s ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    [class*="${p}-organic-"] {
      animation: none !important;
    }
  }
}`;
}