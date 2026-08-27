// ─── Attention Motion ────────────────────────────────
// Semantic attention-grabbing animations by intent.

import type { MotionConfig } from '../types';

export function generateAttentionCSS(config: MotionConfig = {}): string {
  const p = config.prefix ?? 'fr';

  return `/* ═══════════════════════════════════════════════════
   FerrumCSS Attention Motion
   Meaning-driven animations for UI state feedback.
   ═══════════════════════════════════════════════════ */

@layer ferrum.motion-engine {
  /* ─── Error ─── */
  @keyframes ${p}-attention-error {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
    20%, 40%, 60%, 80% { transform: translateX(4px); }
  }
  .${p}-attention-error {
    animation: ${p}-attention-error 500ms ease-in-out;
  }
  .${p}-attention-error::after {
    content: '';
    position: absolute;
    inset: -2px;
    border: 2px solid var(--ferrum-error-color, #ef4444);
    border-radius: inherit;
    opacity: 0;
    animation: ${p}-attention-error-border 500ms ease-in-out;
  }
  @keyframes ${p}-attention-error-border {
    0%, 100% { opacity: 0; }
    50% { opacity: 0.6; }
  }

  /* ─── Warning ─── */
  @keyframes ${p}-attention-warning {
    0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(234, 179, 8, 0); }
    50% { transform: scale(1.05); box-shadow: 0 0 20px 0 rgba(234, 179, 8, 0.3); }
  }
  .${p}-attention-warning {
    animation: ${p}-attention-warning 800ms ease-in-out infinite;
  }

  /* ─── Success ─── */
  @keyframes ${p}-attention-success {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.08); }
  }
  .${p}-attention-success {
    animation: ${p}-attention-success 500ms ease-out;
  }

  /* ─── Loading ─── */
  @keyframes ${p}-attention-loading {
    from { transform: rotate(0deg); opacity: 1; }
    to   { transform: rotate(360deg); opacity: 1; }
  }
  @keyframes ${p}-attention-loading-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
  .${p}-attention-loading {
    animation: ${p}-attention-loading 1s linear infinite, ${p}-attention-loading-pulse 1.5s ease-in-out infinite;
  }

  /* ─── Notification ─── */
  @keyframes ${p}-attention-notification {
    0% { transform: translateX(100%); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
  }
  .${p}-attention-notification {
    animation: ${p}-attention-notification 400ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
  }

  /* ─── Recording ─── */
  @keyframes ${p}-attention-recording {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
  .${p}-attention-recording::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--ferrum-recording-color, #ef4444);
    margin-right: 6px;
    vertical-align: middle;
    animation: ${p}-attention-recording 1.5s ease-in-out infinite;
  }

  /* ─── Download ─── */
  @keyframes ${p}-attention-download {
    0%   { transform: translateY(0); }
    30%  { transform: translateY(-2px); }
    60%  { transform: translateY(0); }
  }
  .${p}-attention-download {
    animation: ${p}-attention-download 1.5s ease-in-out infinite;
  }

  /* ─── Thinking ─── */
  @keyframes ${p}-attention-thinking {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
  }
  .${p}-attention-thinking::after {
    content: '...';
    animation: ${p}-attention-thinking 1.5s step-end infinite;
  }

  /* ─── Inactive ─── */
  .${p}-attention-inactive {
    opacity: 0.5;
    filter: grayscale(0.5);
    transition: all 300ms ease;
  }

  /* ─── New ─── */
  @keyframes ${p}-attention-new {
    0% { transform: scale(0.8); opacity: 0; }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); opacity: 1; }
  }
  .${p}-attention-new {
    animation: ${p}-attention-new 600ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
  }

  /* ─── Streaming ─── */
  @keyframes ${p}-attention-streaming {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }
  .${p}-attention-streaming::after {
    content: '';
    display: inline-flex;
    gap: 2px;
  }
  .${p}-attention-streaming::after::before,
  .${p}-attention-streaming::after::after {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--ferrum-streaming-color, #6366f1);
    animation: ${p}-attention-streaming 1.4s ease-in-out infinite;
  }
  .${p}-attention-streaming::after::before { animation-delay: 0ms; }
  .${p}-attention-streaming::after::after { animation-delay: 200ms; }

  /* ─── Update ─── */
  @keyframes ${p}-attention-update {
    0%   { background-color: transparent; }
    30%  { background-color: var(--ferrum-update-color, rgba(99, 102, 241, 0.15)); }
    100% { background-color: transparent; }
  }
  .${p}-attention-update {
    animation: ${p}-attention-update 2s ease both;
  }

  @media (prefers-reduced-motion: reduce) {
    .${p}-attention-error,
    .${p}-attention-warning,
    .${p}-attention-success,
    .${p}-attention-loading,
    .${p}-attention-new {
      animation: none !important;
    }
  }
}`;
}