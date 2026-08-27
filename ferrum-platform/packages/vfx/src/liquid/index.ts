export function generateLiquidCSS(prefix = "fr-"): string {
  return `@layer ferrum.vfx {
/* ── fx-liquid-ripple ── */
@keyframes ${prefix}liquid-ripple {
  0% {
    transform: scale(0.5);
    opacity: 0.8;
  }
  100% {
    transform: scale(2.5);
    opacity: 0;
  }
}
.${prefix}fx-liquid-ripple {
  border: 2px solid rgba(100, 180, 255, 0.6);
  border-radius: 50%;
  animation: ${prefix}liquid-ripple 2s ease-out infinite;
}

/* ── fx-liquid-bubble ── */
@keyframes ${prefix}liquid-bubble {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-20px) scale(1.05);
  }
}
.${prefix}fx-liquid-bubble {
  border-radius: 50%;
  background: radial-gradient(
    circle at 30% 30%,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(100, 180, 255, 0.15) 40%,
    rgba(60, 140, 220, 0.1) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: ${prefix}liquid-bubble 3s ease-in-out infinite;
}

/* ── fx-liquid-droplet ── */
@keyframes ${prefix}liquid-droplet {
  0%, 100% {
    transform: translateY(0) scaleY(1);
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  }
  30% {
    transform: translateY(-8px) scaleY(1.15);
    border-radius: 45% 55% 50% 50% / 65% 55% 45% 35%;
  }
  60% {
    transform: translateY(4px) scaleY(0.9);
    border-radius: 55% 45% 50% 50% / 50% 60% 40% 50%;
  }
}
.${prefix}fx-liquid-droplet {
  background: radial-gradient(
    circle at 35% 35%,
    rgba(255, 255, 255, 0.5) 0%,
    rgba(80, 160, 255, 0.3) 30%,
    rgba(40, 120, 200, 0.2) 100%
  );
  border: 1px solid rgba(100, 180, 255, 0.25);
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  animation: ${prefix}liquid-droplet 2.5s ease-in-out infinite;
}

/* ── fx-liquid-gel ── */
@keyframes ${prefix}liquid-gel {
  0%, 100% {
    border-radius: 40% 60% 55% 45% / 55% 45% 60% 40%;
  }
  25% {
    border-radius: 55% 45% 40% 60% / 45% 55% 45% 55%;
  }
  50% {
    border-radius: 45% 55% 60% 40% / 60% 40% 55% 45%;
  }
  75% {
    border-radius: 60% 40% 45% 55% / 40% 60% 40% 60%;
  }
}
.${prefix}fx-liquid-gel {
  background: radial-gradient(
    circle at 40% 40%,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(180, 220, 255, 0.15) 50%,
    rgba(100, 180, 255, 0.08) 100%
  );
  animation: ${prefix}liquid-gel 6s ease-in-out infinite;
}

/* ── fx-liquid-jelly ── */
@keyframes ${prefix}liquid-jelly {
  0%, 100% {
    transform: scale(1, 1) skewX(0deg);
  }
  25% {
    transform: scale(1.08, 0.92) skewX(-2deg);
  }
  50% {
    transform: scale(0.95, 1.05) skewX(1deg);
  }
  75% {
    transform: scale(1.04, 0.96) skewX(-1deg);
  }
}
.${prefix}fx-liquid-jelly {
  background: radial-gradient(
    circle at 45% 45%,
    rgba(255, 200, 220, 0.35) 0%,
    rgba(220, 150, 200, 0.2) 50%,
    rgba(180, 100, 180, 0.1) 100%
  );
  border: 1px solid rgba(255, 200, 220, 0.2);
  border-radius: 30%;
  animation: ${prefix}liquid-jelly 2s ease-in-out infinite;
}

/* ── fx-liquid-ink ── */
@keyframes ${prefix}liquid-ink {
  0% {
    transform: scale(0.3);
    opacity: 0.8;
    border-radius: 40% 60% 55% 45% / 55% 45% 60% 40%;
  }
  50% {
    transform: scale(1);
    opacity: 0.6;
    border-radius: 55% 45% 40% 60% / 45% 55% 45% 55%;
  }
  100% {
    transform: scale(1.2);
    opacity: 0.4;
    border-radius: 50% 50% 45% 55% / 50% 50% 55% 45%;
  }
}
.${prefix}fx-liquid-ink {
  background: radial-gradient(
    circle at 50% 50%,
    rgba(20, 20, 40, 0.8) 0%,
    rgba(40, 40, 80, 0.4) 40%,
    rgba(60, 60, 100, 0.1) 70%,
    transparent 100%
  );
  border-radius: 40% 60% 55% 45% / 55% 45% 60% 40%;
  animation: ${prefix}liquid-ink 4s ease-out infinite;
}

/* ── fx-liquid-splash ── */
@keyframes ${prefix}liquid-splash-1 {
  0%   { transform: scale(0); opacity: 0.7; }
  100% { transform: scale(3); opacity: 0; }
}
@keyframes ${prefix}liquid-splash-2 {
  0%   { transform: scale(0); opacity: 0.5; }
  100% { transform: scale(2.5); opacity: 0; }
}
@keyframes ${prefix}liquid-splash-3 {
  0%   { transform: scale(0); opacity: 0.6; }
  100% { transform: scale(3.5); opacity: 0; }
}
.${prefix}fx-liquid-splash {
  position: relative;
}
.${prefix}fx-liquid-splash::before,
.${prefix}fx-liquid-splash::after {
  content: "";
  position: absolute;
  inset: 0;
  border: 2px solid rgba(100, 180, 255, 0.5);
  border-radius: 50%;
}
.${prefix}fx-liquid-splash::before {
  animation: ${prefix}liquid-splash-1 2s ease-out infinite;
}
.${prefix}fx-liquid-splash::after {
  animation: ${prefix}liquid-splash-2 2s ease-out 0.4s infinite;
}

/* ── fx-liquid-lava ── */
@keyframes ${prefix}liquid-lava {
  0%, 100% {
    border-radius: 40% 60% 55% 45% / 55% 45% 60% 40%;
    background-position: 0% 50%;
  }
  25% {
    border-radius: 55% 45% 40% 60% / 45% 55% 45% 55%;
    background-position: 50% 0%;
  }
  50% {
    border-radius: 45% 55% 60% 40% / 60% 40% 55% 45%;
    background-position: 100% 50%;
  }
  75% {
    border-radius: 60% 40% 45% 55% / 40% 60% 40% 60%;
    background-position: 50% 100%;
  }
}
.${prefix}fx-liquid-lava {
  background:
    radial-gradient(circle at 30% 40%, rgba(255, 100, 0, 0.6) 0%, transparent 50%),
    radial-gradient(circle at 70% 60%, rgba(255, 50, 0, 0.5) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(255, 180, 0, 0.4) 0%, transparent 50%),
    linear-gradient(180deg, #cc3300, #ff6600, #ffaa00);
  background-size: 200% 200%;
  border-radius: 40% 60% 55% 45% / 55% 45% 60% 40%;
  animation: ${prefix}liquid-lava 8s ease-in-out infinite;
}

/* ── fx-liquid-wave ── */
@keyframes ${prefix}liquid-wave {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}
.${prefix}fx-liquid-wave {
  animation: ${prefix}liquid-wave 2s ease-in-out infinite;
}
.${prefix}fx-liquid-wave:nth-child(2) { animation-delay: -0.3s; }
.${prefix}fx-liquid-wave:nth-child(3) { animation-delay: -0.6s; }
.${prefix}fx-liquid-wave:nth-child(4) { animation-delay: -0.9s; }

/* ── fx-liquid-morph ── */
@keyframes ${prefix}liquid-morph {
  0%, 100% {
    border-radius: 40% 60% 55% 45% / 55% 45% 60% 40%;
  }
  20% {
    border-radius: 55% 45% 40% 60% / 60% 40% 55% 45%;
  }
  40% {
    border-radius: 45% 55% 60% 40% / 40% 60% 45% 55%;
  }
  60% {
    border-radius: 60% 40% 45% 55% / 55% 45% 60% 40%;
  }
  80% {
    border-radius: 50% 50% 50% 50% / 45% 55% 50% 50%;
  }
}
.${prefix}fx-liquid-morph {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  animation: ${prefix}liquid-morph 10s ease-in-out infinite;
}

/* ── fx-liquid-oil ── */
@keyframes ${prefix}liquid-oil {
  0%   { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}
.${prefix}fx-liquid-oil {
  --ferrum-oil-saturation: 85%;
  background: conic-gradient(
    from 0deg at 50% 50%,
    rgba(255, 0, 80, 0.3),
    rgba(255, 160, 0, 0.3),
    rgba(200, 255, 0, 0.3),
    rgba(0, 200, 100, 0.3),
    rgba(0, 150, 255, 0.3),
    rgba(120, 0, 255, 0.3),
    rgba(255, 0, 80, 0.3)
  );
  animation: ${prefix}liquid-oil 8s linear infinite;
}

/* ── fx-liquid-mercury ── */
.${prefix}fx-liquid-mercury {
  --ferrum-mercury-shine: rgba(255, 255, 255, 0.5);
  background: linear-gradient(
    135deg,
    #a0a0a8 0%,
    #d0d0d5 20%,
    #e8e8ec 35%,
    var(--ferrum-mercury-shine, rgba(255, 255, 255, 0.5)) 45%,
    #c0c0c8 55%,
    #e0e0e5 70%,
    #b0b0b8 100%
  );
  border: 1px solid rgba(200, 200, 210, 0.4);
  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.15),
    inset 0 2px 8px rgba(255, 255, 255, 0.2);
}

/* ── fx-liquid-viscosity ── */
@keyframes ${prefix}liquid-viscosity {
  0%, 100% {
    border-radius: 42% 58% 55% 45% / 56% 44% 62% 38%;
  }
  33% {
    border-radius: 55% 45% 42% 58% / 48% 52% 45% 55%;
  }
  66% {
    border-radius: 48% 52% 58% 42% / 54% 46% 52% 48%;
  }
}
.${prefix}fx-liquid-viscosity {
  --ferrum-viscosity-speed: 10s;
  --ferrum-viscosity-color: rgba(139, 90, 43, 0.4);
  background: radial-gradient(
    circle at 40% 40%,
    rgba(255, 255, 255, 0.2) 0%,
    var(--ferrum-viscosity-color, rgba(139, 90, 43, 0.4)) 50%,
    rgba(80, 50, 20, 0.3) 100%
  );
  border-radius: 42% 58% 55% 45% / 56% 44% 62% 38%;
  animation: ${prefix}liquid-viscosity var(--ferrum-viscosity-speed, 10s) ease-in-out infinite;
}

/* ── fx-liquid-surface-tension ── */
.${prefix}fx-liquid-surface-tension {
  --ferrum-tension-highlight: rgba(255, 255, 255, 0.35);
  --ferrum-tension-color: rgba(80, 160, 255, 0.2);
  background:
    radial-gradient(
      ellipse at 50% 30%,
      var(--ferrum-tension-highlight, rgba(255, 255, 255, 0.35)) 0%,
      transparent 40%
    ),
    radial-gradient(
      circle at 50% 50%,
      var(--ferrum-tension-color, rgba(80, 160, 255, 0.2)) 0%,
      rgba(60, 140, 220, 0.1) 100%
    );
  border: 1px solid rgba(100, 180, 255, 0.15);
  box-shadow:
    inset 0 -4px 12px rgba(0, 0, 0, 0.08),
    0 2px 8px rgba(100, 180, 255, 0.1);
}

/* ── fx-liquid-fluid-card ── */
@keyframes ${prefix}liquid-fluid-card {
  0%, 100% {
    border-radius: 16px;
    background-position: 0% 100%;
  }
  50% {
    border-radius: 20px;
    background-position: 100% 100%;
  }
}
.${prefix}fx-liquid-fluid-card {
  --ferrum-fluid-color: rgba(100, 140, 255, 0.15);
  --ferrum-fluid-speed: 5s;
  background:
    linear-gradient(
      90deg,
      var(--ferrum-fluid-color, rgba(100, 140, 255, 0.15)),
      rgba(120, 180, 255, 0.25),
      var(--ferrum-fluid-color, rgba(100, 140, 255, 0.15))
    );
  background-size: 200% 100%;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  animation: ${prefix}liquid-fluid-card var(--ferrum-fluid-speed, 5s) ease-in-out infinite;
}

/* ── fx-liquid-paint ── */
@keyframes ${prefix}liquid-paint {
  0%   { clip-path: inset(0 0 100% 0); }
  30%  { clip-path: inset(0 0 60% 0); }
  60%  { clip-path: inset(0 0 20% 0); }
  80%  { clip-path: inset(0 0 0% 0); }
  100% { clip-path: inset(0 0 0% 0); }
}
.${prefix}fx-liquid-paint {
  --ferrum-paint-color: rgba(220, 50, 50, 0.7);
  --ferrum-paint-speed: 3s;
  background: var(--ferrum-paint-color, rgba(220, 50, 50, 0.7));
  animation: ${prefix}liquid-paint var(--ferrum-paint-speed, 3s) ease-out forwards;
}

/* ── fx-liquid-button ── */
@keyframes ${prefix}liquid-button-fill {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.${prefix}fx-liquid-button {
  --ferrum-btn-liquid-color: rgba(100, 180, 255, 0.3);
  --ferrum-btn-liquid-size: 200%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--ferrum-btn-liquid-color, rgba(100, 180, 255, 0.3)) 45%,
    rgba(255, 255, 255, 0.5) 50%,
    var(--ferrum-btn-liquid-color, rgba(100, 180, 255, 0.3)) 55%,
    transparent 100%
  );
  background-size: var(--ferrum-btn-liquid-size, 200%) 100%;
  transition: background-position 0.5s ease;
}
.${prefix}fx-liquid-button:hover {
  animation: ${prefix}liquid-button-fill 1.5s ease-in-out infinite;
}

/* ── fx-liquid-metallic ── */
@keyframes ${prefix}liquid-metallic {
  0%, 100% {
    border-radius: 40% 60% 55% 45% / 55% 45% 60% 40%;
    background-position: 0% 50%;
  }
  25% {
    border-radius: 55% 45% 42% 58% / 48% 52% 45% 55%;
    background-position: 50% 0%;
  }
  50% {
    border-radius: 48% 52% 58% 42% / 54% 46% 52% 48%;
    background-position: 100% 50%;
  }
  75% {
    border-radius: 58% 42% 48% 52% / 46% 54% 48% 52%;
    background-position: 50% 100%;
  }
}
.${prefix}fx-liquid-metallic {
  --ferrum-metallic-highlight: rgba(255, 255, 255, 0.6);
  --ferrum-metallic-speed: 8s;
  background:
    linear-gradient(
      135deg,
      #808088 0%,
      #c0c0c8 15%,
      var(--ferrum-metallic-highlight, rgba(255, 255, 255, 0.6)) 30%,
      #a0a0a8 45%,
      #d8d8dd 60%,
      var(--ferrum-metallic-highlight, rgba(255, 255, 255, 0.6)) 75%,
      #909098 100%
    );
  background-size: 200% 200%;
  border: 1px solid rgba(200, 200, 210, 0.3);
  border-radius: 40% 60% 55% 45% / 55% 45% 60% 40%;
  animation: ${prefix}liquid-metallic var(--ferrum-metallic-speed, 8s) ease-in-out infinite;
}
}`;
}