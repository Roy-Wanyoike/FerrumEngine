export function generateEnergyCSS(prefix = "fr-"): string {
  return `@layer ferrum.vfx {
/* ── fx-energy-pulse ── */
@keyframes ${prefix}energy-pulse {
  0%, 100% {
    transform: scale(1);
    border-color: rgba(0, 200, 255, 0.6);
    opacity: 1;
  }
  50% {
    transform: scale(1.08);
    border-color: rgba(0, 200, 255, 0.2);
    opacity: 0.6;
  }
}
.${prefix}fx-energy-pulse {
  border: 2px solid rgba(0, 200, 255, 0.6);
  border-radius: 50%;
  animation: ${prefix}energy-pulse 2s ease-in-out infinite;
  box-shadow:
    0 0 15px rgba(0, 200, 255, 0.3),
    inset 0 0 15px rgba(0, 200, 255, 0.1);
}

/* ── fx-energy-shockwave ── */
@keyframes ${prefix}energy-shockwave {
  0% {
    transform: scale(0.8);
    opacity: 0.8;
    border-width: 3px;
  }
  100% {
    transform: scale(2);
    opacity: 0;
    border-width: 1px;
  }
}
.${prefix}fx-energy-shockwave {
  border: 3px solid rgba(0, 180, 255, 0.7);
  border-radius: 50%;
  animation: ${prefix}energy-shockwave 1.5s ease-out infinite;
}

/* ── fx-energy-electric ── */
@keyframes ${prefix}energy-electric {
  0%   { border-color: rgba(100, 200, 255, 0.8); }
  10%  { border-color: rgba(200, 220, 255, 1); }
  20%  { border-color: rgba(50, 150, 255, 0.4); }
  30%  { border-color: rgba(150, 200, 255, 0.9); }
  40%  { border-color: rgba(80, 180, 255, 0.5); }
  50%  { border-color: rgba(200, 230, 255, 0.7); }
  60%  { border-color: rgba(60, 160, 255, 0.3); }
  70%  { border-color: rgba(180, 210, 255, 1); }
  80%  { border-color: rgba(90, 170, 255, 0.6); }
  90%  { border-color: rgba(220, 240, 255, 0.8); }
  100% { border-color: rgba(100, 200, 255, 0.8); }
}
.${prefix}fx-energy-electric {
  border: 2px solid rgba(100, 200, 255, 0.8);
  animation: ${prefix}energy-electric 0.5s linear infinite;
  box-shadow:
    0 0 8px rgba(100, 200, 255, 0.4),
    0 0 16px rgba(100, 200, 255, 0.15),
    inset 0 0 8px rgba(100, 200, 255, 0.1);
}

/* ── fx-energy-plasma ── */
@keyframes ${prefix}energy-plasma {
  0% {
    background: conic-gradient(from 0deg, rgba(255, 50, 50, 0.3), rgba(50, 100, 255, 0.3), rgba(255, 50, 50, 0.3));
  }
  33% {
    background: conic-gradient(from 120deg, rgba(50, 100, 255, 0.3), rgba(50, 255, 100, 0.3), rgba(50, 100, 255, 0.3));
  }
  66% {
    background: conic-gradient(from 240deg, rgba(50, 255, 100, 0.3), rgba(255, 50, 50, 0.3), rgba(50, 255, 100, 0.3));
  }
  100% {
    background: conic-gradient(from 360deg, rgba(255, 50, 50, 0.3), rgba(50, 100, 255, 0.3), rgba(255, 50, 50, 0.3));
  }
}
.${prefix}fx-energy-plasma {
  background: conic-gradient(from 0deg, rgba(255, 50, 50, 0.3), rgba(50, 100, 255, 0.3), rgba(255, 50, 50, 0.3));
  animation: ${prefix}energy-plasma 4s linear infinite;
  border: 1px solid rgba(200, 200, 255, 0.2);
}

/* ── fx-energy-laser ── */
.${prefix}fx-energy-laser {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 50, 50, 0.6) 20%,
    rgba(255, 100, 100, 0.9) 50%,
    rgba(255, 50, 50, 0.6) 80%,
    transparent 100%
  );
  height: 2px;
  box-shadow:
    0 0 6px rgba(255, 50, 50, 0.6),
    0 0 12px rgba(255, 50, 50, 0.3),
    0 0 24px rgba(255, 50, 50, 0.15);
}

/* ── fx-energy-shield ── */
@keyframes ${prefix}energy-shield {
  0%, 100% {
    border-color: rgba(0, 200, 255, 0.5);
    box-shadow:
      0 0 10px rgba(0, 200, 255, 0.2),
      0 0 20px rgba(0, 200, 255, 0.1),
      inset 0 0 10px rgba(0, 200, 255, 0.05);
  }
  50% {
    border-color: rgba(0, 200, 255, 0.8);
    box-shadow:
      0 0 20px rgba(0, 200, 255, 0.4),
      0 0 40px rgba(0, 200, 255, 0.2),
      0 0 60px rgba(0, 200, 255, 0.1),
      inset 0 0 20px rgba(0, 200, 255, 0.1);
  }
}
.${prefix}fx-energy-shield {
  border: 2px solid rgba(0, 200, 255, 0.5);
  border-radius: 12px;
  animation: ${prefix}energy-shield 3s ease-in-out infinite;
}

/* ── fx-energy-reactor ── */
@keyframes ${prefix}energy-reactor {
  0% {
    transform: rotate(0deg) scale(1);
    background: radial-gradient(circle, rgba(0, 200, 255, 0.4) 0%, rgba(0, 100, 200, 0.15) 40%, transparent 70%);
  }
  50% {
    transform: rotate(180deg) scale(1.1);
    background: radial-gradient(circle, rgba(0, 255, 200, 0.5) 0%, rgba(0, 150, 200, 0.2) 40%, transparent 70%);
  }
  100% {
    transform: rotate(360deg) scale(1);
    background: radial-gradient(circle, rgba(0, 200, 255, 0.4) 0%, rgba(0, 100, 200, 0.15) 40%, transparent 70%);
  }
}
.${prefix}fx-energy-reactor {
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 200, 255, 0.4) 0%, rgba(0, 100, 200, 0.15) 40%, transparent 70%);
  animation: ${prefix}energy-reactor 4s linear infinite;
  box-shadow: 0 0 20px rgba(0, 200, 255, 0.2);
}

/* ── fx-energy-scan ── */
@keyframes ${prefix}energy-scan {
  0%   { background-position: -100% 0; }
  100% { background-position: 200% 0; }
}
.${prefix}fx-energy-scan {
  background:
    linear-gradient(
      90deg,
      transparent 0%,
      transparent 45%,
      rgba(0, 200, 255, 0.6) 49%,
      rgba(0, 200, 255, 0.8) 50%,
      rgba(0, 200, 255, 0.6) 51%,
      transparent 55%,
      transparent 100%
    );
  background-size: 50% 100%;
  animation: ${prefix}energy-scan 2s linear infinite;
  border: 1px solid rgba(0, 200, 255, 0.2);
}

/* ── fx-energy-digital ── */
.${prefix}fx-energy-digital {
  background:
    repeating-linear-gradient(
      0deg,
      transparent 0px,
      transparent 2px,
      rgba(0, 200, 255, 0.03) 2px,
      rgba(0, 200, 255, 0.03) 4px
    ),
    repeating-linear-gradient(
      90deg,
      transparent 0px,
      transparent 2px,
      rgba(0, 200, 255, 0.02) 2px,
      rgba(0, 200, 255, 0.02) 4px
    ),
    linear-gradient(180deg, rgba(0, 200, 255, 0.05) 0%, transparent 50%, rgba(0, 200, 255, 0.03) 100%);
  border: 1px solid rgba(0, 200, 255, 0.15);
}

/* ── fx-energy-glow ── */
@keyframes ${prefix}energy-glow {
  0%, 100% {
    box-shadow:
      0 0 10px rgba(0, 200, 255, 0.2),
      0 0 20px rgba(0, 200, 255, 0.1);
  }
  50% {
    box-shadow:
      0 0 20px rgba(0, 200, 255, 0.5),
      0 0 40px rgba(0, 200, 255, 0.25),
      0 0 60px rgba(0, 200, 255, 0.1);
  }
}
.${prefix}fx-energy-glow {
  border: 1px solid rgba(0, 200, 255, 0.3);
  animation: ${prefix}energy-glow 2.5s ease-in-out infinite;
}

/* ── fx-energy-ring ── */
@keyframes ${prefix}energy-ring-rotate {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.${prefix}fx-energy-ring {
  border-radius: 50%;
  border: 3px solid transparent;
  background:
    conic-gradient(from 0deg, rgba(0, 200, 255, 0.8), rgba(0, 100, 255, 0.2), rgba(0, 200, 255, 0.8)) border-box,
    transparent padding-box;
  animation: ${prefix}energy-ring-rotate 3s linear infinite;
  box-shadow:
    0 0 15px rgba(0, 200, 255, 0.3),
    0 0 30px rgba(0, 200, 255, 0.15),
    inset 0 0 15px rgba(0, 200, 255, 0.1);
}

/* ── fx-energy-force-field ── */
@keyframes ${prefix}energy-force-field-pulse {
  0%, 100% {
    border-color: rgba(0, 255, 150, 0.4);
    box-shadow:
      0 0 10px rgba(0, 255, 150, 0.15),
      inset 0 0 10px rgba(0, 255, 150, 0.05);
  }
  50% {
    border-color: rgba(0, 255, 150, 0.7);
    box-shadow:
      0 0 25px rgba(0, 255, 150, 0.3),
      0 0 50px rgba(0, 255, 150, 0.15),
      inset 0 0 25px rgba(0, 255, 150, 0.1);
  }
}
.${prefix}fx-energy-force-field {
  position: relative;
  border: 2px solid rgba(0, 255, 150, 0.4);
  border-radius: 8px;
  animation: ${prefix}energy-force-field-pulse 2.5s ease-in-out infinite;
}
.${prefix}fx-energy-force-field::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(
      0deg,
      transparent 0px,
      transparent 19px,
      rgba(0, 255, 150, 0.08) 19px,
      rgba(0, 255, 150, 0.08) 20px
    ),
    repeating-linear-gradient(
      90deg,
      transparent 0px,
      transparent 19px,
      rgba(0, 255, 150, 0.08) 19px,
      rgba(0, 255, 150, 0.08) 20px
    );
  border-radius: 6px;
  pointer-events: none;
}

/* ── fx-energy-particle-beam ── */
.${prefix}fx-energy-particle-beam {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(0, 200, 255, 0.3) 10%,
    rgba(100, 220, 255, 0.8) 30%,
    rgba(200, 240, 255, 1) 50%,
    rgba(100, 220, 255, 0.8) 70%,
    rgba(0, 200, 255, 0.3) 90%,
    transparent 100%
  );
  height: 4px;
  box-shadow:
    0 0 8px rgba(0, 200, 255, 0.8),
    0 0 16px rgba(0, 200, 255, 0.4),
    0 0 32px rgba(0, 200, 255, 0.2),
    0 0 4px rgba(200, 240, 255, 0.6);
}

/* ── fx-energy-sci-fi ── */
.${prefix}fx-energy-sci-fi {
  position: relative;
  border: 1px solid rgba(0, 200, 255, 0.3);
  background:
    repeating-linear-gradient(
      0deg,
      transparent 0px,
      transparent 3px,
      rgba(0, 180, 255, 0.04) 3px,
      rgba(0, 180, 255, 0.04) 4px
    ),
    linear-gradient(180deg, rgba(0, 200, 255, 0.08) 0%, rgba(0, 100, 200, 0.03) 50%, rgba(0, 200, 255, 0.06) 100%);
  box-shadow:
    0 0 15px rgba(0, 200, 255, 0.15),
    0 0 30px rgba(0, 150, 255, 0.08),
    inset 0 0 15px rgba(0, 200, 255, 0.05);
}
.${prefix}fx-energy-sci-fi::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 255, 255, 0.1) 0%,
    transparent 3%,
    transparent 97%,
    rgba(0, 255, 255, 0.1) 100%
  );
  pointer-events: none;
}

/* ── fx-energy-core ── */
@keyframes ${prefix}energy-core-pulse {
  0%, 100% {
    background: radial-gradient(circle, rgba(0, 220, 255, 0.8) 0%, rgba(0, 150, 255, 0.4) 30%, rgba(0, 80, 200, 0.15) 60%, transparent 80%);
    box-shadow: 0 0 20px rgba(0, 200, 255, 0.4);
  }
  50% {
    background: radial-gradient(circle, rgba(100, 240, 255, 1) 0%, rgba(0, 180, 255, 0.6) 25%, rgba(0, 100, 220, 0.25) 50%, transparent 75%);
    box-shadow:
      0 0 30px rgba(0, 200, 255, 0.6),
      0 0 60px rgba(0, 200, 255, 0.3),
      0 0 90px rgba(0, 200, 255, 0.1);
  }
}
.${prefix}fx-energy-core {
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 220, 255, 0.8) 0%, rgba(0, 150, 255, 0.4) 30%, rgba(0, 80, 200, 0.15) 60%, transparent 80%);
  animation: ${prefix}energy-core-pulse 2s ease-in-out infinite;
}

/* ── fx-energy-arc ── */
@keyframes ${prefix}energy-arc {
  0%   { box-shadow: 0 0 8px rgba(150, 200, 255, 0.8), 0 0 16px rgba(100, 180, 255, 0.4); }
  10%  { box-shadow: 0 0 20px rgba(200, 230, 255, 1), 0 0 40px rgba(150, 200, 255, 0.6), 0 0 60px rgba(100, 180, 255, 0.2); }
  20%  { box-shadow: 0 0 4px rgba(100, 180, 255, 0.5), 0 0 8px rgba(80, 150, 255, 0.2); }
  30%  { box-shadow: 0 0 25px rgba(220, 240, 255, 1), 0 0 50px rgba(180, 220, 255, 0.7), 0 0 80px rgba(100, 180, 255, 0.3); }
  40%  { box-shadow: 0 0 6px rgba(120, 190, 255, 0.6), 0 0 12px rgba(100, 170, 255, 0.3); }
  50%  { box-shadow: 0 0 18px rgba(180, 220, 255, 0.9), 0 0 36px rgba(140, 200, 255, 0.5), 0 0 55px rgba(100, 180, 255, 0.15); }
  60%  { box-shadow: 0 0 5px rgba(100, 180, 255, 0.4), 0 0 10px rgba(80, 160, 255, 0.2); }
  70%  { box-shadow: 0 0 22px rgba(200, 235, 255, 1), 0 0 44px rgba(160, 210, 255, 0.65), 0 0 70px rgba(100, 180, 255, 0.25); }
  80%  { box-shadow: 0 0 7px rgba(110, 185, 255, 0.5), 0 0 14px rgba(90, 165, 255, 0.25); }
  90%  { box-shadow: 0 0 15px rgba(170, 215, 255, 0.85), 0 0 30px rgba(130, 195, 255, 0.45); }
  100% { box-shadow: 0 0 8px rgba(150, 200, 255, 0.8), 0 0 16px rgba(100, 180, 255, 0.4); }
}
.${prefix}fx-energy-arc {
  border: 2px solid rgba(150, 200, 255, 0.7);
  animation: ${prefix}energy-arc 0.3s linear infinite;
}

/* ── fx-energy-absorb ── */
@keyframes ${prefix}energy-absorb {
  0% {
    transform: scale(1);
    opacity: 1;
    box-shadow:
      0 0 20px rgba(0, 200, 255, 0.4),
      0 0 40px rgba(0, 200, 255, 0.2),
      inset 0 0 10px rgba(0, 200, 255, 0.1);
  }
  100% {
    transform: scale(0.3);
    opacity: 0.3;
    box-shadow:
      0 0 5px rgba(0, 200, 255, 0.1),
      inset 0 0 20px rgba(0, 200, 255, 0.3);
  }
}
.${prefix}fx-energy-absorb {
  border: 2px solid rgba(0, 200, 255, 0.6);
  border-radius: 50%;
  animation: ${prefix}energy-absorb 1.5s ease-in infinite;
}

/* ── fx-energy-emit ── */
@keyframes ${prefix}energy-emit {
  0% {
    transform: scale(0.5);
    opacity: 0.8;
    border-color: rgba(0, 200, 255, 0.9);
    box-shadow:
      0 0 10px rgba(0, 200, 255, 0.6),
      0 0 20px rgba(0, 200, 255, 0.3),
      inset 0 0 10px rgba(0, 200, 255, 0.2);
  }
  100% {
    transform: scale(1.8);
    opacity: 0;
    border-color: rgba(0, 200, 255, 0);
    box-shadow:
      0 0 30px rgba(0, 200, 255, 0.4),
      0 0 60px rgba(0, 200, 255, 0.2),
      0 0 90px rgba(0, 200, 255, 0.1);
  }
}
.${prefix}fx-energy-emit {
  border: 2px solid rgba(0, 200, 255, 0.6);
  border-radius: 50%;
  animation: ${prefix}energy-emit 1.5s ease-out infinite;
}
}`;
}