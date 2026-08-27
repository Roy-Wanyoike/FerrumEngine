export function generateLightingCSS(prefix = "fr-"): string {
  const v = "--ferrum-";

  return `@layer ferrum.vfx {
/* ── fx-light-ambient ── */
.${prefix}fx-light-ambient {
  box-shadow:
    0 0 40px 8px rgba(255, 255, 255, 0.06),
    0 0 80px 16px rgba(255, 255, 255, 0.03);
  filter: brightness(1.02);
}

/* ── fx-light-spot ── */
.${prefix}fx-light-spot {
  background: conic-gradient(
    from 180deg at 50% 0%,
    rgba(255, 255, 255, 0.25) 0deg,
    rgba(255, 255, 255, 0.08) 40deg,
    transparent 80deg,
    transparent 280deg,
    rgba(255, 255, 255, 0.08) 320deg,
    rgba(255, 255, 255, 0.25) 360deg
  );
}

/* ── fx-light-directional ── */
.${prefix}fx-light-directional {
  background: linear-gradient(
    105deg,
    transparent 40%,
    rgba(255, 255, 255, 0.12) 45%,
    rgba(255, 255, 255, 0.18) 50%,
    rgba(255, 255, 255, 0.12) 55%,
    transparent 60%
  );
}

/* ── fx-light-neon ── */
.${prefix}fx-light-neon {
  ${v}neon-color: #00ffaa;
  ${v}neon-spread: 4px;
  text-shadow:
    0 0 ${v}neon-spread ${v}neon-color,
    0 0 8px ${v}neon-color,
    0 0 20px ${v}neon-color,
    0 0 40px ${v}neon-color;
  box-shadow:
    0 0 ${v}neon-spread ${v}neon-color,
    0 0 8px ${v}neon-color,
    0 0 20px ${v}neon-color,
    0 0 40px ${v}neon-color,
    inset 0 0 ${v}neon-spread ${v}neon-color;
  color: #fff;
}

/* ── fx-light-bloom ── */
.${prefix}fx-light-bloom {
  ${v}bloom-color: rgba(255, 255, 255, 0.35);
  ${v}bloom-size: 60px;
  box-shadow:
    0 0 ${v}bloom-size ${v}bloom-color,
    0 0 calc(${v}bloom-size * 2) ${v}bloom-color,
    0 0 calc(${v}bloom-size * 3) rgba(255, 255, 255, 0.1);
  filter: brightness(1.08) contrast(1.02);
}

/* ── fx-light-glow ── */
.${prefix}fx-light-glow {
  ${v}glow-color: rgba(255, 200, 50, 0.4);
  box-shadow:
    0 0 15px 5px ${v}glow-color,
    0 0 30px 10px rgba(255, 200, 50, 0.15);
  filter: brightness(1.05);
}

/* ── fx-light-cursor ── */
.${prefix}fx-light-cursor {
  background: radial-gradient(
    300px circle at var(${v}cursor-x, 50%) var(${v}cursor-y, 50%),
    rgba(255, 255, 255, 0.12) 0%,
    transparent 100%
  );
}

/* ── fx-light-hover ── */
.${prefix}fx-light-hover {
  ${v}hover-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  box-shadow: ${v}hover-shadow;
  transition: box-shadow 0.3s ease;
}
.${prefix}fx-light-hover:hover {
  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.08),
    0 0 30px 10px rgba(255, 255, 255, 0.1),
    0 0 60px 20px rgba(255, 255, 255, 0.05);
  filter: brightness(1.05);
}

/* ── fx-light-edge ── */
.${prefix}fx-light-edge {
  box-shadow:
    inset 0 0 30px rgba(255, 255, 255, 0.08),
    inset 0 0 60px rgba(255, 255, 255, 0.04);
}

/* ── fx-light-rim ── */
.${prefix}fx-light-rim {
  ${v}rim-color: rgba(255, 255, 255, 0.3);
  border: 1px solid ${v}rim-color;
  box-shadow:
    0 0 12px 2px ${v}rim-color,
    0 0 24px 4px rgba(255, 255, 255, 0.1),
    inset 0 0 8px rgba(255, 255, 255, 0.05);
}

/* ── fx-light-sunrise ── */
@keyframes ${prefix}light-sunrise {
  0%   { background-position: 50% 100%; }
  50%  { background-position: 50% 0%; }
  100% { background-position: 50% 100%; }
}
.${prefix}fx-light-sunrise {
  background: linear-gradient(
    to top,
    #1a0a2e 0%,
    #3d1d6b 20%,
    #e8451a 50%,
    #ff9a3c 75%,
    #ffe066 100%
  );
  background-size: 100% 300%;
  animation: ${prefix}light-sunrise 8s ease-in-out infinite;
}

/* ── fx-light-lens-flare ── */
@keyframes ${prefix}light-lens-flare {
  0%, 100% { opacity: 0.6; }
  50%      { opacity: 1; }
}
.${prefix}fx-light-lens-flare {
  background:
    radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.6) 0%, transparent 40%),
    radial-gradient(circle at 60% 40%, rgba(200, 220, 255, 0.3) 0%, transparent 30%),
    radial-gradient(circle at 45% 60%, rgba(255, 200, 150, 0.2) 0%, transparent 25%);
  animation: ${prefix}light-lens-flare 3s ease-in-out infinite;
}

/* ── fx-light-dark-mode ── */
.${prefix}fx-light-dark-mode {
  --ferrum-light-ambient-opacity: 0.15;
  --ferrum-light-shadow-color: rgba(0, 0, 0, 0.6);
  filter: brightness(0.85) contrast(1.15);
}
.${prefix}fx-light-dark-mode .${prefix}fx-light-ambient {
  box-shadow:
    0 0 30px 6px rgba(100, 140, 255, 0.1),
    0 0 60px 12px rgba(100, 140, 255, 0.05);
}
.${prefix}fx-light-dark-mode .${prefix}fx-light-glow {
  box-shadow:
    0 0 15px 5px rgba(100, 160, 255, 0.3),
    0 0 30px 10px rgba(100, 160, 255, 0.1);
}
.${prefix}fx-light-dark-mode .${prefix}fx-light-rim {
  --ferrum-rim-color: rgba(100, 160, 255, 0.25);
  border-color: var(--ferrum-rim-color);
  box-shadow:
    0 0 12px 2px var(--ferrum-rim-color),
    0 0 24px 4px rgba(100, 160, 255, 0.08);
}

/* ── fx-light-reflection ── */
@keyframes ${prefix}light-reflection {
  0%   { background-position: -100% 0; }
  100% { background-position: 200% 0; }
}
.${prefix}fx-light-reflection {
  ${v}reflection-color: rgba(255, 255, 255, 0.25);
  ${v}reflection-angle: 110deg;
  background: linear-gradient(
    ${v}reflection-angle,
    transparent 30%,
    ${v}reflection-color 45%,
    rgba(255, 255, 255, 0.4) 50%,
    ${v}reflection-color 55%,
    transparent 70%
  );
  background-size: 200% 100%;
  animation: ${prefix}light-reflection 3s ease-in-out infinite;
}

/* ── fx-light-dynamic-highlight ── */
.${prefix}fx-light-dynamic-highlight {
  ${v}highlight-x: 50%;
  ${v}highlight-y: 50%;
  ${v}highlight-size: 200px;
  ${v}highlight-color: rgba(255, 255, 255, 0.12);
  background: radial-gradient(
    ${v}highlight-size circle at var(${v}highlight-x) var(${v}highlight-y),
    ${v}highlight-color 0%,
    transparent 100%
  );
  transition: background 0.3s ease;
}

/* ── fx-light-moving ── */
@keyframes ${prefix}light-moving {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.${prefix}fx-light-moving {
  ${v}moving-color: rgba(255, 255, 255, 0.1);
  background: linear-gradient(
    90deg,
    transparent 0%,
    ${v}moving-color 40%,
    rgba(255, 255, 255, 0.2) 50%,
    ${v}moving-color 60%,
    transparent 100%
  );
  background-size: 400% 100%;
  animation: ${prefix}light-moving 6s linear infinite;
}

/* ── fx-light-volume ── */
.${prefix}fx-light-volume {
  ${v}volume-color: rgba(255, 220, 150, 0.08);
  ${v}volume-origin: 50% 0%;
  background: conic-gradient(
    from 180deg at ${v}volume-origin,
    ${v}volume-color 0deg,
    transparent 15deg,
    transparent 45deg,
    ${v}volume-color 60deg,
    transparent 75deg,
    transparent 105deg,
    ${v}volume-color 120deg,
    transparent 135deg,
    transparent 165deg,
    ${v}volume-color 180deg,
    transparent 195deg,
    transparent 225deg,
    ${v}volume-color 240deg,
    transparent 255deg,
    transparent 285deg,
    ${v}volume-color 300deg,
    transparent 315deg,
    transparent 345deg,
    ${v}volume-color 360deg
  );
  opacity: 0.9;
}

/* ── fx-light-sun-rays ── */
.${prefix}fx-light-sun-rays {
  ${v}sun-ray-color: rgba(255, 230, 100, 0.06);
  background: conic-gradient(
    from 0deg at 50% 50%,
    ${v}sun-ray-color 0deg,
    transparent 15deg,
    transparent 30deg,
    ${v}sun-ray-color 30deg,
    transparent 45deg,
    transparent 60deg,
    ${v}sun-ray-color 60deg,
    transparent 75deg,
    transparent 90deg,
    ${v}sun-ray-color 90deg,
    transparent 105deg,
    transparent 120deg,
    ${v}sun-ray-color 120deg,
    transparent 135deg,
    transparent 150deg,
    ${v}sun-ray-color 150deg,
    transparent 165deg,
    transparent 180deg,
    ${v}sun-ray-color 180deg,
    transparent 195deg,
    transparent 210deg,
    ${v}sun-ray-color 210deg,
    transparent 225deg,
    transparent 240deg,
    ${v}sun-ray-color 240deg,
    transparent 255deg,
    transparent 270deg,
    ${v}sun-ray-color 270deg,
    transparent 285deg,
    transparent 300deg,
    ${v}sun-ray-color 300deg,
    transparent 315deg,
    transparent 330deg,
    ${v}sun-ray-color 330deg,
    transparent 345deg,
    transparent 360deg
  );
}

/* ── fx-light-top ── */
.${prefix}fx-light-top {
  ${v}top-light-color: rgba(255, 255, 255, 0.12);
  ${v}top-light-height: 60%;
  background: linear-gradient(
    to bottom,
    ${v}top-light-color 0%,
    rgba(255, 255, 255, 0.04) ${v}top-light-height,
    transparent 100%
  );
}

/* ── fx-light-bottom ── */
.${prefix}fx-light-bottom {
  ${v}bottom-light-color: rgba(100, 180, 255, 0.1);
  ${v}bottom-light-height: 60%;
  background: linear-gradient(
    to top,
    ${v}bottom-light-color 0%,
    rgba(100, 180, 255, 0.03) ${v}bottom-light-height,
    transparent 100%
  );
  box-shadow:
    0 8px 32px rgba(100, 180, 255, 0.08),
    0 16px 48px rgba(100, 180, 255, 0.04);
}

/* ── fx-light-soft ── */
.${prefix}fx-light-soft {
  ${v}soft-color: rgba(255, 255, 255, 0.04);
  ${v}soft-spread: 80px;
  box-shadow:
    0 0 ${v}soft-spread 30px ${v}soft-color,
    0 0 calc(${v}soft-spread * 2) 60px ${v}soft-color;
  filter: brightness(1.03);
}
}`;
}