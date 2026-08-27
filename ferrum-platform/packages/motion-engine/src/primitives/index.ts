// ─── Motion Primitives ────────────────────────────────
// Core entrance/exit/loop animation primitives.

import type { MotionConfig } from '../types';

export function generateMotionPrimitivesCSS(config: MotionConfig = {}): string {
  const p = config.prefix ?? 'fr';
  const dur = 'var(--ferrum-duration, 300ms)';
  const ease = 'var(--ferrum-easing, ease-out)';

  return `/* ═══════════════════════════════════════════════════
   FerrumCSS Motion Primitives
   Core entrance, exit, and loop animation building blocks.
   ═══════════════════════════════════════════════════ */

@layer ferrum.motion-engine {
  /* ─── Fade ─── */
  @keyframes ${p}-fade-in { from { opacity: 0; } to { opacity: 1; } }
  @keyframes ${p}-fade-out { from { opacity: 1; } to { opacity: 0; } }
  .${p}-fade-in { animation: ${p}-fade-in ${dur} ${ease} both; }
  .${p}-fade-out { animation: ${p}-fade-out ${dur} ${ease} both; }

  /* ─── Slide Up ─── */
  @keyframes ${p}-slide-up { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes ${p}-slide-down { from { opacity: 0; transform: translateY(-24px); } to { opacity: 1; transform: translateY(0); } }
  .${p}-slide-up { animation: ${p}-slide-up ${dur} ${ease} both; }
  .${p}-slide-down { animation: ${p}-slide-down ${dur} ${ease} both; }

  /* ─── Slide Left/Right ─── */
  @keyframes ${p}-slide-left { from { opacity: 0; transform: translateX(24px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes ${p}-slide-right { from { opacity: 0; transform: translateX(-24px); } to { opacity: 1; transform: translateX(0); } }
  .${p}-slide-left { animation: ${p}-slide-left ${dur} ${ease} both; }
  .${p}-slide-right { animation: ${p}-slide-right ${dur} ${ease} both; }

  /* ─── Scale ─── */
  @keyframes ${p}-scale-up { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
  @keyframes ${p}-scale-down { from { opacity: 1; transform: scale(1); } to { opacity: 0; transform: scale(0.92); } }
  .${p}-scale-up { animation: ${p}-scale-up ${dur} ${ease} both; }
  .${p}-scale-down { animation: ${p}-scale-down ${dur} ${ease} both; }

  /* ─── Rotate ─── */
  @keyframes ${p}-rotate-in { from { opacity: 0; transform: rotate(-90deg); } to { opacity: 1; transform: rotate(0); } }
  @keyframes ${p}-rotate-out { from { opacity: 1; transform: rotate(0); } to { opacity: 0; transform: rotate(90deg); } }
  .${p}-rotate-in { animation: ${p}-rotate-in ${dur} ${ease} both; }
  .${p}-rotate-out { animation: ${p}-rotate-out ${dur} ${ease} both; }

  /* ─── Flip ─── */
  @keyframes ${p}-flip-x { from { opacity: 0; transform: perspective(600px) rotateX(90deg); } to { opacity: 1; transform: perspective(600px) rotateX(0); } }
  @keyframes ${p}-flip-y { from { opacity: 0; transform: perspective(600px) rotateY(90deg); } to { opacity: 1; transform: perspective(600px) rotateY(0); } }
  .${p}-flip-x { animation: ${p}-flip-x ${dur} ease both; backface-visibility: hidden; transform-style: preserve-3d; }
  .${p}-flip-y { animation: ${p}-flip-y ${dur} ease both; backface-visibility: hidden; transform-style: preserve-3d; }

  /* ─── Blur In/Out ─── */
  @keyframes ${p}-blur-in { from { opacity: 0; filter: blur(8px); } to { opacity: 1; filter: blur(0px); } }
  @keyframes ${p}-blur-out { from { opacity: 1; filter: blur(0px); } to { opacity: 0; filter: blur(8px); } }
  .${p}-blur-in { animation: ${p}-blur-in ${dur} ${ease} both; }
  .${p}-blur-out { animation: ${p}-blur-out ${dur} ${ease} both; }

  /* ─── Bounce ─── */
  @keyframes ${p}-bounce-in {
    0%   { opacity: 0; transform: scale(0.3); }
    50%  { opacity: 1; transform: scale(1.1); }
    70%  { transform: scale(0.9); }
    100% { opacity: 1; transform: scale(1); }
  }
  @keyframes ${p}-bounce-out {
    0%   { opacity: 1; transform: scale(1); }
    30%  { transform: scale(1.1); }
    50%  { opacity: 0; transform: scale(0.9); }
    80%  { transform: scale(1.05); }
    100% { opacity: 0; transform: scale(0.3); }
  }
  .${p}-bounce-in { animation: ${p}-bounce-in 600ms cubic-bezier(0.34, 1.56, 0.64, 1) both; }
  .${p}-bounce-out { animation: ${p}-bounce-out 500ms ease-in both; }

  /* ─── Spin ─── */
  @keyframes ${p}-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  .${p}-spin { animation: ${p}-spin 1s linear infinite; }

  /* ─── Pulse ─── */
  @keyframes ${p}-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
  .${p}-pulse { animation: ${p}-pulse 2s ease-in-out infinite; }

  /* ─── Shake ─── */
  @keyframes ${p}-shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
    20%, 40%, 60%, 80% { transform: translateX(4px); }
  }
  .${p}-shake { animation: ${p}-shake 500ms ease-in-out; }

  /* ─── Swing ─── */
  @keyframes ${p}-swing { 0%, 100% { transform: rotate(0deg); transform-origin: top center; } 25% { transform: rotate(15deg); } 75% { transform: rotate(-10deg); } 100% { transform: rotate(0deg); } }
  .${p}-swing { animation: ${p}-swing 800ms ease-in-out; transform-origin: top center; }

  /* ─── Tada ─── */
  @keyframes ${p}-tada { 0% { transform: scale(1) rotate(0deg); } 10% { transform: scale(0.9) rotate(-3deg); } 20% { transform: scale(0.9) rotate(3deg); } 30% { transform: scale(1.1) rotate(-3deg); } 40% { transform: scale(1.1) rotate(3deg); } 50% { transform: scale(0.95) rotate(0deg); } 60% { transform: scale(0.95) rotate(0deg); } 70% { transform: scale(1.1) rotate(-3deg); } 80% { transform: scale(1.1) rotate(3deg); } 90% { transform: scale(0.95) rotate(0deg); } 100% { transform: scale(1) rotate(0deg); } }
  .${p}-tada { animation: ${p}-tada 1s ease both; }

  /* ─── Jelly (squish) ─── */
  @keyframes ${p}-jello { 0%, 100% { transform: scale(1, 1); } 25% { transform: scale(0.9, 1.1); } 50% { transform: scale(1.1, 0.9); } 75% { transform: scale(0.95, 1.05); } 100% { transform: scale(1, 1); } }
  .${p}-jelly { animation: ${p}-jello 800ms ease-in-out both; }

  /* ─── Heartbeat ─── */
  @keyframes ${p}-heartbeat { 0% { transform: scale(1); } 14% { transform: scale(1.15); } 28% { transform: scale(1); } 42% { transform: scale(1.15); } 56% { transform: scale(1); } 70% { transform: scale(1.15); } 84% { transform: scale(1); } 100% { transform: scale(1); } }
  .${p}-heartbeat { animation: ${p}-heartbeat 1.4s ease-in-out infinite; }

  @media (prefers-reduced-motion: reduce) {
    .${p}-fade-in, .${p}-fade-out,
    .${p}-slide-up, .${p}-slide-down, .${p}-slide-left, .${p}-slide-right,
    .${p}-scale-up, .${p}-scale-down, .${p}-rotate-in, .${p}-rotate-out,
    .${p}-flip-x, .${p}-flip-y, .${p}-blur-in, .${p}-blur-out,
    .${p}-bounce-in, .${p}-bounce-out, .${p}-spin, .${p}-pulse,
    .${p}-shake, .${p}-swing, .${p}-tada, .${p}-jelly, .${p}-heartbeat {
      animation: none !important;
    }
  }
}`;
}