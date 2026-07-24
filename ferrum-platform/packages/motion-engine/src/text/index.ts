// ─── Text Motion Engine ───────────────────────────────────
// Advanced typography animations.

import type { MotionConfig } from '../types';

export function generateTextCSS(config: MotionConfig = {}): string {
  const p = config.prefix ?? 'fr';

  return `/* ═══════════════════════════════════════════════════
   FerrumCSS Text Motion Engine
   Advanced typography animations for headings, labels, and text.
   ═══════════════════════════════════════════════════ */

@layer ferrum.motion-engine {
  /* ─── Shimmer ─── */
  @keyframes ${p}-text-shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  .${p}-text-shimmer {
    background: linear-gradient(
      90deg,
      transparent 0%, transparent 40%,
      rgba(255,255,255,0.4) 50%,
      transparent 60%, transparent 100%
    );
    background-size: 200% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${p}-text-shimmer 2s linear infinite;
  }

  /* ─── Gradient Shift ─── */
  @keyframes ${p}-text-gradient-shift {
    0% { background-position: 0% center; }
    100% { background-position: 200% center; }
  }
  .${p}-text-gradient-shift {
    background: linear-gradient(90deg, var(--ferrum-text-grad-1, #6366f1), var(--ferrum-text-grad-2, #ec4899), var(--ferrum-text-grad-1, #6366f1));
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${p}-text-gradient-shift 3s linear infinite;
  }

  /* ─── Highlight ─── */
  .${p}-text-highlight {
    background-image: linear-gradient(var(--ferrum-highlight-color, #fbbf24) 50%, transparent 50%);
    background-size: 200% 100%;
    background-position: 100% 0;
    -webkit-background-clip: text;
    background-clip: text;
    transition: background-position 600ms ease;
  }
  .${p}-text-highlight:hover {
    background-position: 0 0;
  }

  /* ─── Neon ─── */
  @keyframes ${p}-text-neon {
    0%, 100% { text-shadow: 0 0 4px var(--ferrum-neon-color, #6366f1), 0 0 12px var(--ferrum-neon-color, #6366f1); }
    50% { text-shadow: 0 0 8px var(--ferrum-neon-color, #6366f1), 0 0 24px var(--ferrum-neon-color, #6366f1), 0 0 48px var(--ferrum-neon-color, #6366f1); }
  }
  .${p}-text-neon {
    color: var(--ferrum-neon-color, #6366f1);
    animation: ${p}-text-neon 2s ease-in-out infinite;
  }

  /* ─── Flicker ─── */
  @keyframes ${p}-text-flicker {
    0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% { opacity: 1; }
    20%, 21.999%, 63%, 63.999%, 65%, 69.999% { opacity: 0.4; }
  }
  .${p}-text-flicker {
    animation: ${p}-text-flicker 3s step-end infinite;
  }

  /* ─── Breathe ─── */
  @keyframes ${p}-text-breathe {
    0%, 100% { opacity: 0.7; text-shadow: 0 0 0px transparent; }
    50% { opacity: 1; text-shadow: 0 0 20px var(--ferrum-breathe-color, rgba(99,102,241,0.3)); }
  }
  .${p}-text-breathe {
    animation: ${p}-text-breathe 4s ease-in-out infinite;
  }

  /* ─── Wave (per-letter stagger) ─── */
  @keyframes ${p}-text-wave-letter {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
  .${p}-text-wave > * {
    display: inline-block;
    animation: ${p}-text-wave-letter 2s ease-in-out infinite;
  }
  .${p}-text-wave > *:nth-child(1) { animation-delay: 0ms; }
  .${p}-text-wave > *:nth-child(2) { animation-delay: 80ms; }
  .${p}-text-wave > *:nth-child(3) { animation-delay: 160ms; }
  . .${p}-text-wave > *:nth-child(10) { animation-delay: 720ms; }

  /* ─── Slide Word ─── */
  .${p}-text-slide-word > * {
    display: inline-block;
    overflow: hidden;
  }
  .${p}-text-slide-word > * > * {
    display: inline-block;
    animation: ${p}-text-slide-word-reveal 600ms cubic-bezier(0.4, 0, 0.2, 1) both;
  }
  @keyframes ${p}-text-slide-word-reveal {
    from { transform: translateY(100%); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  .${p}-text-slide-word > *:nth-child(1) > * { animation-delay: 0ms; }
  .${p}-text-slide-word > *:nth-child(2) > * { animation-delay: 60ms; }
  .${p}-text-slide-word > *:nth-child(3) > * { animation-delay: 120ms; }
  . .${p}-text-slide-word > *:nth-child(8) > * { animation-delay: 420ms; }

  /* ─── Glitch ─── */
  @keyframes ${p}-text-glitch-1 {
    0% { clip-path: inset(40% 0 61% 0); transform: translate(-2px, 2px); }
    20% { clip-path: inset(92% 0 1% 0); transform: translate(2px, -2px); }
    40% { clip-path: inset(43% 0 1% 0); transform: translate(-2px, 2px); }
    60% { clip-path: inset(25% 0 58% 0); transform: translate(2px, -2px); }
    80% { clip-path: inset(54% 0 7% 0); transform: translate(-2px, 2px); }
    100% { clip-path: inset(58% 0 43% 0); transform: translate(0); }
  }
  @keyframes ${p}-text-glitch-2 {
    0% { clip-path: inset(65% 0 13% 0); transform: translate(2px, 2px); }
    20% { clip-path: inset(79% 0 14% 0); transform: translate(-2px, -2px); }
    40% { clip-path: inset(48% 0 38% 0); transform: translate(2px, -2px); }
    60% { clip-path: inset(10% 0 85% 0); transform: translate(-2px, 2px); }
    80% { clip-path: inset(94% 0 2% 0); transform: translate(2px, 2px); }
    100% { clip-path: inset(62% 0 28% 0); transform: translate(0); }
  }
  .${p}-text-glitch {
    position: relative;
  }
  .${p}-text-glitch::before,
  .${p}-text-glitch::after {
    content: attr(data-text);
    position: absolute;
    inset: 0;
  }
  .${p}-text-glitch::before {
    color: var(--ferrum-glitch-color-1, #ff0040);
    animation: ${p}-text-glitch-1 2s infinite linear alternate-reverse;
    clip-path: inset(40% 0 61% 0);
  }
  .${p}-text-glitch::after {
    color: var(--ferrum-glitch-color-2, #00ff9d);
    animation: ${p}-text-glitch-2 2s infinite linear alternate-reverse;
    clip-path: inset(65% 0 13% 0);
  }

  /* ─── Typewriter ─── */
  @keyframes ${p}-text-typewriter {
    from { width: 0; border-right-color: currentColor; }
    to { width: 100%; border-right-color: transparent; }
  }
  .${p}-text-typewriter {
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    border-right: 2px solid;
    width: 0;
    animation: ${p}-text-typewriter var(--ferrum-typewriter-duration, 3s) steps(var(--ferrum-typewriter-steps, 30)) both;
  }

  @media (prefers-reduced-motion: reduce) {
    .${p}-text-shimmer,
    .${p}-text-gradient-shift,
    .${p}-text-neon,
    .${p}-text-flicker,
    .${p}-text-breathe,
    .${p}-text-wave > *,
    .${p}-text-slide-word > * > *,
    .${p}-text-glitch::before,
    .${p}-text-glitch::after {
      animation: none !important;
      clip-path: none !important;
    }
  }
}`;
}