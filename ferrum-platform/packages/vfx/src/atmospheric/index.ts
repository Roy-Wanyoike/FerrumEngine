export function generateAtmosphericCSS(prefix = "fr-"): string {
  return `@layer ferrum.vfx {
/* ── fx-atmos-fog ── */
.${prefix}fx-atmos-fog {
  background:
    linear-gradient(180deg,
      rgba(200, 210, 220, 0.0) 0%,
      rgba(200, 210, 220, 0.15) 30%,
      rgba(200, 210, 220, 0.25) 50%,
      rgba(200, 210, 220, 0.15) 70%,
      rgba(200, 210, 220, 0.0) 100%
    ),
    linear-gradient(90deg,
      rgba(200, 210, 220, 0.0) 0%,
      rgba(200, 210, 220, 0.1) 30%,
      rgba(200, 210, 220, 0.18) 60%,
      rgba(200, 210, 220, 0.0) 100%
    );
}

/* ── fx-atmos-mist ── */
@keyframes ${prefix}atmos-mist {
  0%, 100% { opacity: 0.3; }
  50%      { opacity: 0.7; }
}
.${prefix}fx-atmos-mist {
  background: radial-gradient(
    ellipse 120% 60% at 50% 50%,
    rgba(200, 215, 230, 0.4) 0%,
    rgba(200, 215, 230, 0.15) 40%,
    transparent 70%
  );
  animation: ${prefix}atmos-mist 5s ease-in-out infinite;
}

/* ── fx-atmos-smoke ── */
@keyframes ${prefix}atmos-smoke-drift {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 0.15;
  }
  25% {
    transform: translate(30px, -20px) scale(1.1);
    opacity: 0.25;
  }
  50% {
    transform: translate(-10px, -40px) scale(1.2);
    opacity: 0.15;
  }
  75% {
    transform: translate(-30px, -20px) scale(1.15);
    opacity: 0.2;
  }
  100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.15;
  }
}
.${prefix}fx-atmos-smoke {
  position: relative;
  overflow: hidden;
}
.${prefix}fx-atmos-smoke::before,
.${prefix}fx-atmos-smoke::after {
  content: "";
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(180, 180, 190, 0.3) 0%, transparent 70%);
}
.${prefix}fx-atmos-smoke::before {
  width: 200px;
  height: 200px;
  top: 20%;
  left: 10%;
  animation: ${prefix}atmos-smoke-drift 8s ease-in-out infinite;
}
.${prefix}fx-atmos-smoke::after {
  width: 160px;
  height: 160px;
  top: 40%;
  right: 15%;
  animation: ${prefix}atmos-smoke-drift 10s ease-in-out 2s infinite;
}

/* ── fx-atmos-dust ── */
.${prefix}fx-atmos-dust {
  background:
    radial-gradient(circle 1px at 10% 20%, rgba(200, 200, 200, 0.5) 0%, transparent 100%),
    radial-gradient(circle 1px at 30% 65%, rgba(200, 200, 200, 0.4) 0%, transparent 100%),
    radial-gradient(circle 1px at 55% 15%, rgba(200, 200, 200, 0.45) 0%, transparent 100%),
    radial-gradient(circle 1px at 70% 45%, rgba(200, 200, 200, 0.35) 0%, transparent 100%),
    radial-gradient(circle 1px at 85% 75%, rgba(200, 200, 200, 0.5) 0%, transparent 100%),
    radial-gradient(circle 1px at 25% 85%, rgba(200, 200, 200, 0.4) 0%, transparent 100%),
    radial-gradient(circle 1px at 60% 55%, rgba(200, 200, 200, 0.3) 0%, transparent 100%),
    radial-gradient(circle 1px at 45% 35%, rgba(200, 200, 200, 0.45) 0%, transparent 100%),
    radial-gradient(circle 1px at 90% 10%, rgba(200, 200, 200, 0.4) 0%, transparent 100%),
    radial-gradient(circle 1px at 15% 50%, rgba(200, 200, 200, 0.35) 0%, transparent 100%);
  background-size: 100px 100px;
}

/* ── fx-atmos-snow ── */
@keyframes ${prefix}atmos-snow {
  0% {
    transform: translateY(-10px);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(100px);
    opacity: 0;
  }
}
.${prefix}fx-atmos-snow {
  position: relative;
  overflow: hidden;
}
.${prefix}fx-atmos-snow::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle 2px at 15% 0%, rgba(255, 255, 255, 0.9) 0%, transparent 100%),
    radial-gradient(circle 1.5px at 35% 0%, rgba(255, 255, 255, 0.8) 0%, transparent 100%),
    radial-gradient(circle 2px at 55% 0%, rgba(255, 255, 255, 0.85) 0%, transparent 100%),
    radial-gradient(circle 1px at 75% 0%, rgba(255, 255, 255, 0.7) 0%, transparent 100%),
    radial-gradient(circle 1.5px at 90% 0%, rgba(255, 255, 255, 0.9) 0%, transparent 100%);
  background-size: 80px 100px;
  background-repeat: repeat-x;
  animation: ${prefix}atmos-snow 4s linear infinite;
}
.${prefix}fx-atmos-snow::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle 1px at 25% 0%, rgba(255, 255, 255, 0.7) 0%, transparent 100%),
    radial-gradient(circle 2px at 50% 0%, rgba(255, 255, 255, 0.8) 0%, transparent 100%),
    radial-gradient(circle 1.5px at 80% 0%, rgba(255, 255, 255, 0.75) 0%, transparent 100%);
  background-size: 120px 100px;
  background-repeat: repeat-x;
  animation: ${prefix}atmos-snow 5s linear 1.5s infinite;
}

/* ── fx-atmos-rain ── */
@keyframes ${prefix}atmos-rain {
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(200px);
    opacity: 0;
  }
}
.${prefix}fx-atmos-rain {
  position: relative;
  overflow: hidden;
}
.${prefix}fx-atmos-rain::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, transparent 0%, rgba(150, 180, 220, 0.4) 100%),
    linear-gradient(180deg, transparent 0%, rgba(150, 180, 220, 0.3) 100%),
    linear-gradient(180deg, transparent 0%, rgba(150, 180, 220, 0.35) 100%),
    linear-gradient(180deg, transparent 0%, rgba(150, 180, 220, 0.25) 100%);
  background-size:
    1px 30px,
    1px 40px,
    1px 35px,
    1px 25px;
  background-position:
    15% 0%,
    35% 0%,
    60% 0%,
    85% 0%;
  background-repeat: repeat-y;
  animation: ${prefix}atmos-rain 1s linear infinite;
}

/* ── fx-atmos-stars ── */
@keyframes ${prefix}atmos-twinkle {
  0%, 100% { opacity: 0.3; }
  50%      { opacity: 1; }
}
.${prefix}fx-atmos-stars {
  position: relative;
  background:
    radial-gradient(circle 1px at 10% 15%, rgba(255, 255, 255, 0.8) 0%, transparent 100%),
    radial-gradient(circle 1.5px at 25% 60%, rgba(255, 255, 255, 0.6) 0%, transparent 100%),
    radial-gradient(circle 1px at 40% 30%, rgba(255, 255, 255, 0.9) 0%, transparent 100%),
    radial-gradient(circle 1px at 55% 80%, rgba(255, 255, 255, 0.5) 0%, transparent 100%),
    radial-gradient(circle 1.5px at 70% 20%, rgba(255, 255, 255, 0.7) 0%, transparent 100%),
    radial-gradient(circle 1px at 85% 50%, rgba(255, 255, 255, 0.8) 0%, transparent 100%),
    radial-gradient(circle 1px at 20% 90%, rgba(255, 255, 255, 0.6) 0%, transparent 100%),
    radial-gradient(circle 1.5px at 60% 45%, rgba(255, 255, 255, 0.9) 0%, transparent 100%),
    radial-gradient(circle 1px at 95% 85%, rgba(255, 255, 255, 0.5) 0%, transparent 100%),
    radial-gradient(circle 1px at 48% 12%, rgba(255, 255, 255, 0.7) 0%, transparent 100%);
  background-size: 150px 150px;
}
.${prefix}fx-atmos-stars::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle 1.5px at 12% 40%, rgba(255, 255, 255, 0.8) 0%, transparent 100%),
    radial-gradient(circle 1px at 38% 75%, rgba(255, 255, 255, 0.7) 0%, transparent 100%),
    radial-gradient(circle 1.5px at 62% 10%, rgba(255, 255, 255, 0.9) 0%, transparent 100%),
    radial-gradient(circle 1px at 78% 65%, rgba(255, 255, 255, 0.6) 0%, transparent 100%),
    radial-gradient(circle 1px at 92% 30%, rgba(255, 255, 255, 0.8) 0%, transparent 100%);
  background-size: 180px 180px;
  animation: ${prefix}atmos-twinkle 3s ease-in-out infinite;
}

/* ── fx-atmos-aurora ── */
@keyframes ${prefix}atmos-aurora {
  0% {
    background-position: 0% 50%;
    filter: hue-rotate(0deg);
  }
  50% {
    background-position: 100% 50%;
    filter: hue-rotate(60deg);
  }
  100% {
    background-position: 0% 50%;
    filter: hue-rotate(0deg);
  }
}
.${prefix}fx-atmos-aurora {
  background:
    linear-gradient(
      135deg,
      rgba(0, 255, 128, 0.15) 0%,
      rgba(0, 200, 255, 0.1) 25%,
      rgba(128, 0, 255, 0.12) 50%,
      rgba(255, 0, 128, 0.08) 75%,
      rgba(0, 255, 128, 0.15) 100%
    ),
    linear-gradient(
      45deg,
      rgba(0, 128, 255, 0.1) 0%,
      rgba(0, 255, 200, 0.08) 50%,
      rgba(128, 0, 255, 0.1) 100%
    );
  background-size: 200% 200%;
  animation: ${prefix}atmos-aurora 8s ease-in-out infinite;
}

/* ── fx-atmos-galaxy ── */
.${prefix}fx-atmos-galaxy {
  background:
    radial-gradient(
      ellipse 80% 50% at 50% 50%,
      rgba(80, 40, 120, 0.3) 0%,
      rgba(40, 20, 80, 0.15) 40%,
      transparent 70%
    ),
    conic-gradient(
      from 0deg at 50% 50%,
      rgba(100, 60, 180, 0.12) 0deg,
      rgba(60, 100, 200, 0.08) 90deg,
      rgba(140, 60, 160, 0.1) 180deg,
      rgba(60, 140, 200, 0.06) 270deg,
      rgba(100, 60, 180, 0.12) 360deg
    ),
    radial-gradient(
      circle 2px at 20% 30%,
      rgba(255, 255, 255, 0.7) 0%,
      transparent 100%
    ),
    radial-gradient(
      circle 1.5px at 70% 60%,
      rgba(255, 255, 255, 0.6) 0%,
      transparent 100%
    ),
    radial-gradient(
      circle 1px at 40% 80%,
      rgba(255, 200, 100, 0.8) 0%,
      transparent 100%
    ),
    radial-gradient(
      circle 1.5px at 80% 20%,
      rgba(100, 200, 255, 0.7) 0%,
      transparent 100%
    );
}

/* ── fx-atmos-fireflies ── */
@keyframes ${prefix}atmos-firefly-1 {
  0%, 100% { opacity: 0.1; transform: translate(0, 0); }
  25%      { opacity: 0.9; transform: translate(10px, -15px); }
  50%      { opacity: 0.2; transform: translate(20px, -5px); }
  75%      { opacity: 0.8; transform: translate(5px, -20px); }
}
@keyframes ${prefix}atmos-firefly-2 {
  0%, 100% { opacity: 0.2; transform: translate(0, 0); }
  30%      { opacity: 1; transform: translate(-15px, -10px); }
  60%      { opacity: 0.15; transform: translate(-25px, -25px); }
  80%      { opacity: 0.7; transform: translate(-10px, -15px); }
}
@keyframes ${prefix}atmos-firefly-3 {
  0%, 100% { opacity: 0.15; transform: translate(0, 0); }
  40%      { opacity: 0.85; transform: translate(12px, -18px); }
  70%      { opacity: 0.1; transform: translate(18px, -8px); }
}
.${prefix}fx-atmos-fireflies {
  position: relative;
  overflow: hidden;
}
.${prefix}fx-atmos-fireflies::before,
.${prefix}fx-atmos-fireflies::after {
  content: "";
  position: absolute;
  border-radius: 50%;
}
.${prefix}fx-atmos-fireflies::before {
  width: 4px;
  height: 4px;
  top: 20%;
  left: 15%;
  background: radial-gradient(circle, rgba(255, 255, 100, 1) 0%, rgba(255, 255, 100, 0) 70%);
  box-shadow:
    0 0 6px 2px rgba(255, 255, 100, 0.4),
    0 0 12px 4px rgba(255, 255, 100, 0.1);
  animation: ${prefix}atmos-firefly-1 4s ease-in-out infinite;
}
.${prefix}fx-atmos-fireflies::after {
  width: 3px;
  height: 3px;
  top: 60%;
  right: 25%;
  background: radial-gradient(circle, rgba(255, 255, 100, 1) 0%, rgba(255, 255, 100, 0) 70%);
  box-shadow:
    0 0 6px 2px rgba(255, 255, 100, 0.4),
    0 0 12px 4px rgba(255, 255, 100, 0.1);
  animation: ${prefix}atmos-firefly-2 5s ease-in-out 1s infinite;
}

/* ── fx-atmos-wind ── */
@keyframes ${prefix}atmos-wind {
  0%   { transform: translateX(-100%); opacity: 0; }
  20%  { opacity: 0.3; }
  80%  { opacity: 0.3; }
  100% { transform: translateX(100%); opacity: 0; }
}
.${prefix}fx-atmos-wind {
  position: relative;
  overflow: hidden;
}
.${prefix}fx-atmos-wind::before {
  content: "";
  position: absolute;
  top: 45%;
  left: 0;
  width: 300%;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(200, 220, 240, 0.15) 10%,
    rgba(200, 220, 240, 0.3) 30%,
    rgba(200, 220, 240, 0.15) 50%,
    rgba(200, 220, 240, 0.05) 70%,
    transparent 100%
  );
  animation: ${prefix}atmos-wind 6s linear infinite;
}
.${prefix}fx-atmos-wind::after {
  content: "";
  position: absolute;
  top: 55%;
  left: 0;
  width: 250%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(200, 220, 240, 0.1) 20%,
    rgba(200, 220, 240, 0.2) 40%,
    rgba(200, 220, 240, 0.1) 60%,
    transparent 100%
  );
  animation: ${prefix}atmos-wind 8s linear 2s infinite;
}

/* ── fx-atmos-storm ── */
@keyframes ${prefix}atmos-lightning {
  0%, 100% { opacity: 0; }
  8%       { opacity: 0.9; }
  10%      { opacity: 0; }
  28%      { opacity: 0; }
  30%      { opacity: 0.7; }
  32%      { opacity: 0; }
  60%      { opacity: 0; }
  62%      { opacity: 1; }
  64%      { opacity: 0; }
}
.${prefix}fx-atmos-storm {
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #1a1a2e 100%);
}
.${prefix}fx-atmos-storm::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.9);
  animation: ${prefix}atmos-lightning 4s linear infinite;
}
.${prefix}fx-atmos-storm::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, transparent 0%, rgba(150, 180, 220, 0.3) 100%),
    linear-gradient(180deg, transparent 0%, rgba(150, 180, 220, 0.25) 100%),
    linear-gradient(180deg, transparent 0%, rgba(150, 180, 220, 0.2) 100%),
    linear-gradient(180deg, transparent 0%, rgba(150, 180, 220, 0.35) 100%),
    linear-gradient(180deg, transparent 0%, rgba(150, 180, 220, 0.15) 100%),
    linear-gradient(180deg, transparent 0%, rgba(150, 180, 220, 0.3) 100%);
  background-size:
    1px 25px, 1px 35px, 1px 20px, 1px 30px, 1px 22px, 1px 28px;
  background-position:
    10% 0%, 25% 0%, 40% 0%, 55% 0%, 70% 0%, 88% 0%;
  background-repeat: repeat-y;
  animation: ${prefix}atmos-rain 0.6s linear infinite;
}

/* ── fx-atmos-clouds ── */
@keyframes ${prefix}atmos-cloud-drift {
  0%   { transform: translateX(-120%); }
  100% { transform: translateX(120%); }
}
@keyframes ${prefix}atmos-cloud-drift-reverse {
  0%   { transform: translateX(120%); }
  100% { transform: translateX(-120%); }
}
.${prefix}fx-atmos-clouds {
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, #87ceeb 0%, #b0d4f1 60%, #d4e8f7 100%);
}
.${prefix}fx-atmos-clouds::before {
  content: "";
  position: absolute;
  top: 15%;
  left: 0;
  width: 180px;
  height: 60px;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 60px;
  box-shadow:
    50px -15px 0 10px rgba(255, 255, 255, 0.85),
    100px -5px 0 5px rgba(255, 255, 255, 0.8),
    -30px -10px 0 15px rgba(255, 255, 255, 0.8);
  animation: ${prefix}atmos-cloud-drift 20s linear infinite;
}
.${prefix}fx-atmos-clouds::after {
  content: "";
  position: absolute;
  top: 35%;
  left: 0;
  width: 140px;
  height: 45px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 45px;
  box-shadow:
    40px -10px 0 8px rgba(255, 255, 255, 0.7),
    80px -3px 0 4px rgba(255, 255, 255, 0.65);
  animation: ${prefix}atmos-cloud-drift-reverse 28s linear 5s infinite;
}

/* ── fx-atmos-sand ── */
.${prefix}fx-atmos-sand {
  background:
    radial-gradient(circle 1px at 5% 10%, rgba(210, 180, 130, 0.6) 0%, transparent 100%),
    radial-gradient(circle 1.5px at 15% 35%, rgba(200, 170, 120, 0.5) 0%, transparent 100%),
    radial-gradient(circle 1px at 25% 15%, rgba(220, 190, 140, 0.55) 0%, transparent 100%),
    radial-gradient(circle 0.8px at 35% 55%, rgba(210, 175, 125, 0.45) 0%, transparent 100%),
    radial-gradient(circle 1.2px at 45% 25%, rgba(215, 185, 135, 0.6) 0%, transparent 100%),
    radial-gradient(circle 1px at 55% 65%, rgba(200, 165, 115, 0.5) 0%, transparent 100%),
    radial-gradient(circle 1.5px at 65% 40%, rgba(220, 190, 140, 0.55) 0%, transparent 100%),
    radial-gradient(circle 0.8px at 75% 80%, rgba(210, 180, 130, 0.45) 0%, transparent 100%),
    radial-gradient(circle 1.2px at 85% 20%, rgba(215, 180, 130, 0.6) 0%, transparent 100%),
    radial-gradient(circle 1px at 95% 50%, rgba(205, 170, 120, 0.5) 0%, transparent 100%),
    radial-gradient(circle 1px at 10% 75%, rgba(210, 180, 130, 0.55) 0%, transparent 100%),
    radial-gradient(circle 0.8px at 30% 90%, rgba(220, 190, 140, 0.5) 0%, transparent 100%),
    radial-gradient(circle 1.5px at 50% 5%, rgba(200, 165, 115, 0.6) 0%, transparent 100%),
    radial-gradient(circle 1px at 70% 70%, rgba(215, 185, 135, 0.45) 0%, transparent 100%),
    radial-gradient(circle 1.2px at 90% 35%, rgba(210, 175, 125, 0.55) 0%, transparent 100%),
    radial-gradient(circle 1px at 20% 50%, rgba(220, 190, 140, 0.5) 0%, transparent 100%);
  background-size: 80px 80px;
}

/* ── fx-atmos-nebula ── */
@keyframes ${prefix}atmos-nebula-drift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.${prefix}fx-atmos-nebula {
  background:
    radial-gradient(ellipse 60% 40% at 30% 40%, rgba(120, 40, 180, 0.35) 0%, transparent 70%),
    radial-gradient(ellipse 50% 35% at 70% 55%, rgba(180, 40, 100, 0.3) 0%, transparent 70%),
    radial-gradient(ellipse 40% 30% at 50% 70%, rgba(40, 80, 200, 0.25) 0%, transparent 70%),
    radial-gradient(ellipse 55% 25% at 20% 80%, rgba(200, 60, 120, 0.2) 0%, transparent 70%),
    radial-gradient(ellipse 45% 35% at 80% 25%, rgba(80, 40, 160, 0.3) 0%, transparent 70%),
    radial-gradient(circle 1px at 15% 20%, rgba(255, 255, 255, 0.7) 0%, transparent 100%),
    radial-gradient(circle 1.5px at 65% 15%, rgba(255, 255, 255, 0.6) 0%, transparent 100%),
    radial-gradient(circle 1px at 85% 75%, rgba(255, 255, 255, 0.8) 0%, transparent 100%);
  background-color: #0a0a1a;
  background-size: 200% 200%, 200% 200%, 200% 200%, 200% 200%, 200% 200%, 150px 150px, 180px 180px, 120px 120px;
  animation: ${prefix}atmos-nebula-drift 30s ease-in-out infinite;
}

/* ── fx-atmos-space ── */
.${prefix}fx-atmos-space {
  background:
    radial-gradient(circle 1px at 8% 12%, rgba(255, 255, 255, 0.8) 0%, transparent 100%),
    radial-gradient(circle 1.5px at 22% 38%, rgba(255, 255, 255, 0.6) 0%, transparent 100%),
    radial-gradient(circle 0.8px at 35% 72%, rgba(255, 255, 255, 0.9) 0%, transparent 100%),
    radial-gradient(circle 1px at 48% 18%, rgba(255, 255, 255, 0.5) 0%, transparent 100%),
    radial-gradient(circle 1.2px at 58% 85%, rgba(255, 255, 255, 0.7) 0%, transparent 100%),
    radial-gradient(circle 0.8px at 72% 28%, rgba(255, 255, 255, 0.8) 0%, transparent 100%),
    radial-gradient(circle 1.5px at 85% 62%, rgba(255, 255, 255, 0.6) 0%, transparent 100%),
    radial-gradient(circle 1px at 92% 45%, rgba(255, 255, 255, 0.9) 0%, transparent 100%),
    radial-gradient(circle 1px at 15% 90%, rgba(255, 255, 255, 0.5) 0%, transparent 100%),
    radial-gradient(circle 0.8px at 65% 48%, rgba(255, 255, 255, 0.7) 0%, transparent 100%),
    radial-gradient(circle 1.2px at 42% 55%, rgba(200, 220, 255, 0.8) 0%, transparent 100%),
    radial-gradient(circle 1px at 78% 8%, rgba(255, 220, 200, 0.7) 0%, transparent 100%),
    linear-gradient(180deg, #000005 0%, #050510 30%, #0a0a1a 60%, #000008 100%);
  background-size:
    200px 200px, 160px 160px, 180px 180px, 140px 140px, 190px 190px,
    170px 170px, 210px 210px, 150px 150px, 130px 130px, 185px 185px,
    220px 220px, 175px 175px, 100% 100%;
}

/* ── fx-atmos-floating-particles ── */
@keyframes ${prefix}atmos-float-1 {
  0%, 100% { transform: translateY(0) translateX(0); opacity: 0.4; }
  25%      { transform: translateY(-20px) translateX(8px); opacity: 0.8; }
  50%      { transform: translateY(-35px) translateX(-5px); opacity: 0.3; }
  75%      { transform: translateY(-15px) translateX(10px); opacity: 0.7; }
}
@keyframes ${prefix}atmos-float-2 {
  0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
  30%      { transform: translateY(-25px) translateX(-10px); opacity: 0.9; }
  60%      { transform: translateY(-10px) translateX(12px); opacity: 0.4; }
  80%      { transform: translateY(-30px) translateX(-3px); opacity: 0.7; }
}
@keyframes ${prefix}atmos-float-3 {
  0%, 100% { transform: translateY(0) translateX(0); opacity: 0.5; }
  20%      { transform: translateY(-15px) translateX(6px); opacity: 0.3; }
  50%      { transform: translateY(-40px) translateX(-8px); opacity: 0.8; }
  70%      { transform: translateY(-20px) translateX(5px); opacity: 0.4; }
}
.${prefix}fx-atmos-floating-particles {
  position: relative;
  overflow: hidden;
}
.${prefix}fx-atmos-floating-particles::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle 3px at 20% 60%, rgba(200, 220, 255, 0.8) 0%, transparent 100%),
    radial-gradient(circle 2px at 50% 30%, rgba(200, 220, 255, 0.7) 0%, transparent 100%),
    radial-gradient(circle 4px at 80% 70%, rgba(200, 220, 255, 0.6) 0%, transparent 100%),
    radial-gradient(circle 2.5px at 35% 80%, rgba(200, 220, 255, 0.75) 0%, transparent 100%),
    radial-gradient(circle 3.5px at 65% 45%, rgba(200, 220, 255, 0.65) 0%, transparent 100%);
  animation: ${prefix}atmos-float-1 6s ease-in-out infinite;
}
.${prefix}fx-atmos-floating-particles::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle 2px at 15% 25%, rgba(200, 220, 255, 0.7) 0%, transparent 100%),
    radial-gradient(circle 3px at 45% 75%, rgba(200, 220, 255, 0.6) 0%, transparent 100%),
    radial-gradient(circle 1.5px at 75% 35%, rgba(200, 220, 255, 0.8) 0%, transparent 100%),
    radial-gradient(circle 2.5px at 90% 55%, rgba(200, 220, 255, 0.65) 0%, transparent 100%);
  animation: ${prefix}atmos-float-2 8s ease-in-out 2s infinite;
}

/* ── fx-atmos-rain-heavy ── */
@keyframes ${prefix}atmos-rain-heavy {
  0% {
    transform: translateY(-30px);
    opacity: 0;
  }
  5% {
    opacity: 0.8;
  }
  95% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(250px);
    opacity: 0;
  }
}
.${prefix}fx-atmos-rain-heavy {
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, #2c3e50 0%, #34495e 50%, #2c3e50 100%);
}
.${prefix}fx-atmos-rain-heavy::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, transparent 0%, rgba(150, 180, 220, 0.6) 100%),
    linear-gradient(180deg, transparent 0%, rgba(150, 180, 220, 0.5) 100%),
    linear-gradient(180deg, transparent 0%, rgba(150, 180, 220, 0.55) 100%),
    linear-gradient(180deg, transparent 0%, rgba(150, 180, 220, 0.45) 100%),
    linear-gradient(180deg, transparent 0%, rgba(150, 180, 220, 0.6) 100%),
    linear-gradient(180deg, transparent 0%, rgba(150, 180, 220, 0.5) 100%),
    linear-gradient(180deg, transparent 0%, rgba(150, 180, 220, 0.55) 100%),
    linear-gradient(180deg, transparent 0%, rgba(150, 180, 220, 0.4) 100%);
  background-size:
    1px 20px, 1px 28px, 1px 24px, 1px 22px,
    1px 18px, 1px 30px, 1px 26px, 1px 22px;
  background-position:
    5% 0%, 12% 0%, 19% 0%, 26% 0%,
    33% 0%, 40% 0%, 47% 0%, 54% 0%;
  background-repeat: repeat-y;
  animation: ${prefix}atmos-rain-heavy 0.5s linear infinite;
}
.${prefix}fx-atmos-rain-heavy::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, transparent 0%, rgba(150, 180, 220, 0.5) 100%),
    linear-gradient(180deg, transparent 0%, rgba(150, 180, 220, 0.6) 100%),
    linear-gradient(180deg, transparent 0%, rgba(150, 180, 220, 0.45) 100%),
    linear-gradient(180deg, transparent 0%, rgba(150, 180, 220, 0.55) 100%),
    linear-gradient(180deg, transparent 0%, rgba(150, 180, 220, 0.5) 100%),
    linear-gradient(180deg, transparent 0%, rgba(150, 180, 220, 0.6) 100%),
    linear-gradient(180deg, transparent 0%, rgba(150, 180, 220, 0.4) 100%),
    linear-gradient(180deg, transparent 0%, rgba(150, 180, 220, 0.55) 100%);
  background-size:
    1px 22px, 1px 26px, 1px 20px, 1px 28px,
    1px 24px, 1px 18px, 1px 30px, 1px 22px;
  background-position:
    8% 0%, 15% 0%, 22% 0%, 29% 0%,
    36% 0%, 43% 0%, 50% 0%, 57% 0%;
  background-repeat: repeat-y;
  animation: ${prefix}atmos-rain-heavy 0.45s linear 0.1s infinite;
}

/* ── fx-atmos-snow-heavy ── */
@keyframes ${prefix}atmos-snow-heavy {
  0% {
    transform: translateY(-10px) translateX(0);
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  25% {
    transform: translateY(25px) translateX(15px);
  }
  50% {
    transform: translateY(50px) translateX(-10px);
  }
  75% {
    transform: translateY(75px) translateX(12px);
  }
  95% {
    opacity: 1;
  }
  100% {
    transform: translateY(100px) translateX(0);
    opacity: 0;
  }
}
.${prefix}fx-atmos-snow-heavy {
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, #c8d6e5 0%, #dfe6ed 50%, #ecf0f1 100%);
}
.${prefix}fx-atmos-snow-heavy::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle 2px at 10% 0%, rgba(255, 255, 255, 0.95) 0%, transparent 100%),
    radial-gradient(circle 1.5px at 20% 0%, rgba(255, 255, 255, 0.9) 0%, transparent 100%),
    radial-gradient(circle 2.5px at 35% 0%, rgba(255, 255, 255, 0.85) 0%, transparent 100%),
    radial-gradient(circle 1px at 50% 0%, rgba(255, 255, 255, 0.95) 0%, transparent 100%),
    radial-gradient(circle 2px at 65% 0%, rgba(255, 255, 255, 0.9) 0%, transparent 100%),
    radial-gradient(circle 1.5px at 80% 0%, rgba(255, 255, 255, 0.85) 0%, transparent 100%),
    radial-gradient(circle 2px at 95% 0%, rgba(255, 255, 255, 0.9) 0%, transparent 100%);
  background-size: 60px 80px;
  background-repeat: repeat-x;
  animation: ${prefix}atmos-snow-heavy 2s linear infinite;
}
.${prefix}fx-atmos-snow-heavy::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle 1.5px at 8% 0%, rgba(255, 255, 255, 0.9) 0%, transparent 100%),
    radial-gradient(circle 2px at 25% 0%, rgba(255, 255, 255, 0.85) 0%, transparent 100%),
    radial-gradient(circle 1px at 42% 0%, rgba(255, 255, 255, 0.95) 0%, transparent 100%),
    radial-gradient(circle 2.5px at 58% 0%, rgba(255, 255, 255, 0.8) 0%, transparent 100%),
    radial-gradient(circle 1.5px at 75% 0%, rgba(255, 255, 255, 0.9) 0%, transparent 100%),
    radial-gradient(circle 2px at 92% 0%, rgba(255, 255, 255, 0.85) 0%, transparent 100%);
  background-size: 70px 80px;
  background-repeat: repeat-x;
  animation: ${prefix}atmos-snow-heavy 2.5s linear 0.5s infinite;
}
}`;
}