export function generateGlassCSS(prefix = "fr-"): string {
  const v = "--ferrum-";

  return `@layer ferrum.vfx {
/* ── fx-glass-frost ── */
.${prefix}fx-glass-frost {
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

/* ── fx-glass-crystal ── */
.${prefix}fx-glass-crystal {
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    linear-gradient(225deg, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
    linear-gradient(315deg, rgba(255, 255, 255, 0.08) 0%, transparent 50%),
    linear-gradient(45deg, rgba(255, 255, 255, 0.03) 0%, transparent 50%),
    rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(16px) saturate(150%);
  -webkit-backdrop-filter: blur(16px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* ── fx-glass-refraction ── */
.${prefix}fx-glass-refraction {
  background:
    linear-gradient(
      125deg,
      transparent 20%,
      rgba(255, 255, 255, 0.12) 35%,
      rgba(200, 220, 255, 0.08) 42%,
      transparent 55%,
      rgba(255, 255, 255, 0.06) 70%,
      transparent 85%
    );
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

/* ── fx-glass-reflection ── */
@keyframes ${prefix}glass-reflection {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.${prefix}fx-glass-reflection {
  background:
    linear-gradient(
      105deg,
      transparent 40%,
      rgba(255, 255, 255, 0.25) 45%,
      rgba(255, 255, 255, 0.4) 50%,
      rgba(255, 255, 255, 0.25) 55%,
      transparent 60%
    );
  background-size: 200% 100%;
  backdrop-filter: blur(18px) saturate(160%);
  -webkit-backdrop-filter: blur(18px) saturate(160%);
  border: 1px solid rgba(255, 255, 255, 0.18);
  transition: background-position 0.8s ease;
}
.${prefix}fx-glass-reflection:hover {
  animation: ${prefix}glass-reflection 1.5s ease-in-out;
}

/* ── fx-glass-liquid ── */
@keyframes ${prefix}glass-liquid {
  0%, 100% { border-radius: 24px; backdrop-filter: blur(16px); }
  50%      { border-radius: 32px; backdrop-filter: blur(22px); }
}
.${prefix}fx-glass-liquid {
  backdrop-filter: blur(16px) saturate(170%);
  -webkit-backdrop-filter: blur(16px) saturate(170%);
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  animation: ${prefix}glass-liquid 4s ease-in-out infinite;
}

/* ── fx-glass-prism ── */
.${prefix}fx-glass-prism {
  background: conic-gradient(
    from 0deg at 50% 50%,
    rgba(255, 0, 0, 0.15),
    rgba(255, 165, 0, 0.15),
    rgba(255, 255, 0, 0.15),
    rgba(0, 255, 0, 0.15),
    rgba(0, 255, 255, 0.15),
    rgba(0, 0, 255, 0.15),
    rgba(128, 0, 255, 0.15),
    rgba(255, 0, 0, 0.15)
  );
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* ── fx-glass-spectrum ── */
@keyframes ${prefix}glass-spectrum {
  0%   { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}
.${prefix}fx-glass-spectrum {
  background: rgba(255, 100, 200, 0.1);
  backdrop-filter: blur(18px) saturate(200%) hue-rotate(0deg);
  -webkit-backdrop-filter: blur(18px) saturate(200%) hue-rotate(0deg);
  border: 1px solid rgba(255, 255, 255, 0.15);
  animation: ${prefix}glass-spectrum 6s linear infinite;
}

/* ── fx-glass-ice ── */
.${prefix}fx-glass-ice {
  background:
    linear-gradient(135deg, rgba(180, 220, 255, 0.15) 0%, transparent 50%),
    linear-gradient(225deg, rgba(200, 230, 255, 0.08) 0%, transparent 50%),
    rgba(200, 230, 255, 0.08);
  backdrop-filter: blur(28px) saturate(160%);
  -webkit-backdrop-filter: blur(28px) saturate(160%);
  border: 1px solid rgba(200, 230, 255, 0.25);
  box-shadow:
    0 0 20px rgba(180, 220, 255, 0.08),
    inset 0 0 20px rgba(200, 230, 255, 0.05);
}

/* ── fx-glass-acrylic ── */
.${prefix}fx-glass-acrylic {
  background:
    repeating-conic-gradient(
      rgba(255, 255, 255, 0.03) 0% 25%,
      transparent 0% 50%
    ) 0 0 / 4px 4px,
    linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%);
  backdrop-filter: blur(22px) saturate(180%);
  -webkit-backdrop-filter: blur(22px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-top-color: rgba(255, 255, 255, 0.25);
}

/* ── fx-glass-dynamic ── */
.${prefix}fx-glass-dynamic {
  backdrop-filter: blur(var(${v}glass-blur, 16px)) saturate(170%);
  -webkit-backdrop-filter: blur(var(${v}glass-blur, 16px)) saturate(170%);
  background: rgba(255, 255, 255, calc(0.03 + var(${v}glass-blur, 16px) / 1000));
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: backdrop-filter 0.3s ease, background 0.3s ease;
}

/* ── fx-glass-frost-noise ── */
.${prefix}fx-glass-frost-noise {
  ${v}frost-noise-opacity: 0.05;
  ${v}frost-blur: 20px;
  backdrop-filter: blur(var(${v}frost-blur, 20px)) saturate(180%);
  -webkit-backdrop-filter: blur(var(${v}frost-blur, 20px)) saturate(180%);
  background:
    repeating-conic-gradient(
      rgba(255, 255, 255, var(${v}frost-noise-opacity, 0.05)) 0% 25%,
      transparent 0% 50%
    ) 0 0 / 3px 3px,
    rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

/* ── fx-glass-water-lens ── */
.${prefix}fx-glass-water-lens {
  ${v}water-blur: 3px;
  ${v}water-brightness: 1.08;
  backdrop-filter: blur(var(${v}water-blur, 3px)) brightness(var(${v}water-brightness, 1.08));
  -webkit-backdrop-filter: blur(var(${v}water-blur, 3px)) brightness(var(${v}water-brightness, 1.08));
  background: rgba(180, 220, 255, 0.06);
  border: 1px solid rgba(180, 220, 255, 0.15);
  box-shadow:
    inset 0 0 30px rgba(180, 220, 255, 0.06),
    0 0 20px rgba(180, 220, 255, 0.04);
}

/* ── fx-glass-magnify ── */
.${prefix}fx-glass-magnify {
  ${v}magnify-strength: 0.12;
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
  background: radial-gradient(
    circle at 50% 50%,
    rgba(255, 255, 255, var(${v}magnify-strength, 0.12)) 0%,
    rgba(255, 255, 255, 0.2) 30%,
    rgba(255, 255, 255, 0.04) 50%,
    transparent 70%
  );
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow:
    0 0 15px rgba(255, 255, 255, 0.05),
    inset 0 0 15px rgba(255, 255, 255, 0.03);
}

/* ── fx-glass-visionos ── */
.${prefix}fx-glass-visionos {
  ${v}visionos-blur: 40px;
  ${v}visionos-opacity: 0.35;
  ${v}visionos-noise: 0.03;
  backdrop-filter: blur(var(${v}visionos-blur, 40px)) saturate(160%) brightness(1.05);
  -webkit-backdrop-filter: blur(var(${v}visionos-blur, 40px)) saturate(160%) brightness(1.05);
  background:
    repeating-conic-gradient(
      rgba(255, 255, 255, var(${v}visionos-noise, 0.03)) 0% 25%,
      transparent 0% 50%
    ) 0 0 / 2px 2px,
    rgba(255, 255, 255, var(${v}visionos-opacity, 0.35));
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow:
    0 0 0 0.5px rgba(255, 255, 255, 0.1),
    0 8px 40px rgba(0, 0, 0, 0.12);
}

/* ── fx-glass-rainbow ── */
@keyframes ${prefix}glass-rainbow {
  0%   { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}
.${prefix}fx-glass-rainbow {
  ${v}rainbow-saturation: 200%;
  backdrop-filter: blur(16px) saturate(var(${v}rainbow-saturation, 200%));
  -webkit-backdrop-filter: blur(16px) saturate(var(${v}rainbow-saturation, 200%));
  background: linear-gradient(
    135deg,
    rgba(255, 0, 0, 0.1) 0%,
    rgba(255, 165, 0, 0.1) 16%,
    rgba(255, 255, 0, 0.1) 33%,
    rgba(0, 255, 0, 0.1) 50%,
    rgba(0, 255, 255, 0.1) 66%,
    rgba(0, 0, 255, 0.1) 83%,
    rgba(128, 0, 255, 0.1) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.15);
  animation: ${prefix}glass-rainbow 4s linear infinite;
}

/* ── fx-glass-smoke ── */
.${prefix}fx-glass-smoke {
  ${v}smoke-color: rgba(150, 150, 170, 0.15);
  ${v}smoke-blur: 12px;
  backdrop-filter: blur(var(${v}smoke-blur, 12px)) saturate(120%);
  -webkit-backdrop-filter: blur(var(${v}smoke-blur, 12px)) saturate(120%);
  background:
    linear-gradient(180deg, ${v}smoke-color 0%, rgba(150, 150, 170, 0.05) 60%, transparent 100%),
    rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* ── fx-glass-mat ── */
.${prefix}fx-glass-mat {
  ${v}mat-blur: 8px;
  ${v}mat-opacity: 0.6;
  backdrop-filter: blur(var(${v}mat-blur, 8px));
  -webkit-backdrop-filter: blur(var(${v}mat-blur, 8px));
  background: rgba(255, 255, 255, var(${v}mat-opacity, 0.6));
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* ── fx-glass-clear ── */
.${prefix}fx-glass-clear {
  ${v}clear-edge-color: rgba(255, 255, 255, 0.2);
  ${v}clear-bg-opacity: 0.03;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  background: rgba(255, 255, 255, var(${v}clear-bg-opacity, 0.03));
  border: 1px solid ${v}clear-edge-color;
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.06),
    0 0 0 0.5px rgba(0, 0, 0, 0.05);
}
}`;
}