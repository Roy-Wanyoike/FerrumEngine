// ─── Interaction Motion ──────────────────────────────
// State-based animations for press, hold, tap, drag, etc.

import type { MotionConfig } from '../types';

export function generateInteractionCSS(config: MotionConfig = {}): string {
  const p = config.prefix ?? 'fr';

  return `/* ═══════════════════════════════════════════════════
   FerrumCSS Interaction Motion
   State-based animations for user interactions.
   ═══════════════════════════════════════════════════ */

@layer ferrum.motion-engine {
  /* ─── Press ─── */
  .${p}-press {
    transition: transform 100ms ease-in;
    user-select: none;
    -webkit-user-select: none;
  }
  .${p}-press:active {
    transform: scale(0.97);
  }

  /* ─── Release (spring back) ─── */
  .${p}-release:active {
    transform: scale(0.97);
  }
  .${p}-release {
    transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* ─── Hold ─── */
  .${p}-hold {
    transition: transform 500ms ease-in;
  }
  .${p}-hold:active {
    transform: scale(0.95);
  }

  /* ─── Tap ─── */
  @keyframes ${p}-tap-bounce {
    0%   { transform: scale(0.97); }
    50%  { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  .${p}-tap:active {
    animation: ${p}-tap-bounce 300ms ease both;
  }

  /* ─── Drag ─── */
  .${p}-drag {
    transition: transform 200ms ease, box-shadow 200ms ease;
    cursor: grab;
    user-select: none;
    -webkit-user-select: none;
  }
  .${p}-drag:active {
    transform: rotate(2deg) scale(1.01);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    cursor: grabbing;
  }

  /* ─── Stretch ─── */
  .${p}-stretch {
    transition: transform 200ms ease-out;
  }
  .${p}-stretch:active {
    transform: scaleX(1.02) scaleY(0.98);
  }

  /* ─── Compress ─── */
  .${p}-compress {
    transition: transform 200ms ease-in;
  }
  .${p}-compress:active {
    transform: scaleX(0.98) scaleY(1.02);
  }

  /* ─── Hover Enter / Leave ─── */
  .${p}-hover-enter {
    transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms ease;
  }
  .${p}-hover-enter:hover {
    transform: translateY(-4px) scale(1.02);
    opacity: 1;
  }

  .${p}-hover-leave {
    transition: transform 200ms ease-in, opacity 200ms ease-in;
  }
  .${p}-hover-leave:hover {
    opacity: 0.7;
    transform: translateY(4px);
  }

  /* ─── Long Press ─── */
  @keyframes ${p}-long-press-progress {
    from { width: 0; }
    to   { width: 100%; }
  }
  .${p}-long-press {
    position: relative;
    overflow: hidden;
  }
  .${p}-long-press::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    background: var(--ferrum-long-press-color, #6366f1);
    width: 0;
    border-radius: 3px 3px 0 0;
    transition: width 2s linear;
  }
  .${p}-long-press:active::after {
    width: 100%;
    transition: width 300ms ease-out;
  }

  /* ─── Double Tap ─── */
  .${p}-double-tap {
    -webkit-tap-highlight-color: transparent;
  }

  @media (prefers-reduced-motion: reduce) {
    .${p}-tap:active,
    .${p}-drag:active,
    .${p}-stretch:active,
    .${p}-compress:active {
      animation: none !important;
      transform: none !important;
    }
  }
}`;
}