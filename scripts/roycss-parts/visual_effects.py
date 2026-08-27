visual_effects = [
    (
        "Border Beam",
        "rc-vfx-border-beam",
        "visual-effects",
        "box",
        """:root {
  --rc-vfx-border-beam-color1: #7c3aed;
  --rc-vfx-border-beam-color2: #0ff;
  --rc-vfx-border-beam-speed: 3s;
}
.rc-vfx-border-beam {
  position: relative;
  background: #0a0a0f;
  border-radius: 12px;
  overflow: hidden;
}
.rc-vfx-border-beam::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 12px;
  padding: 2px;
  background: conic-gradient(from var(--rc-vfx-border-beam-angle, 0deg), transparent 0%, var(--rc-vfx-border-beam-color1) 10%, var(--rc-vfx-border-beam-color2) 20%, transparent 30%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: rcVfxBorderBeam var(--rc-vfx-border-beam-speed) linear infinite;
}
@property --rc-vfx-border-beam-angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}
@keyframes rcVfxBorderBeam {
  0% { --rc-vfx-border-beam-angle: 0deg; }
  100% { --rc-vfx-border-beam-angle: 360deg; }
}""",
    ),
    (
        "Aurora Border",
        "rc-vfx-aurora-border",
        "visual-effects",
        "box",
        """.rc-vfx-aurora-border {
  position: relative;
  background: #0a0a1a;
  border-radius: 16px;
  overflow: hidden;
}
.rc-vfx-aurora-border::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 18px;
  background:
    linear-gradient(135deg, rgba(124,58,237,0.8), rgba(0,255,136,0.6), rgba(0,255,255,0.7), rgba(236,72,153,0.8), rgba(124,58,237,0.8));
  background-size: 400% 400%;
  animation: rcVfxAuroraBorder 6s ease-in-out infinite;
  filter: blur(4px);
  z-index: 0;
}
.rc-vfx-aurora-border::after {
  content: '';
  position: absolute;
  inset: 3px;
  border-radius: 14px;
  background: #0a0a1a;
  z-index: 1;
}
@keyframes rcVfxAuroraBorder {
  0%, 100% { background-position: 0% 50%; }
  25% { background-position: 100% 0%; }
  50% { background-position: 100% 100%; }
  75% { background-position: 0% 100%; }
}""",
    ),
    (
        "Inner Glow",
        "rc-vfx-inner-glow",
        "visual-effects",
        "box",
        """.rc-vfx-inner-glow {
  background: #0a0a0f;
  border-radius: 12px;
  animation: rcVfxInnerGlow 3s ease-in-out infinite;
  border: 1px solid rgba(124,58,237,0.2);
}
@keyframes rcVfxInnerGlow {
  0%, 100% {
    box-shadow:
      inset 0 0 20px rgba(124,58,237,0.1),
      inset 0 0 60px rgba(124,58,237,0.05);
  }
  50% {
    box-shadow:
      inset 0 0 30px rgba(124,58,237,0.4),
      inset 0 0 80px rgba(99,102,241,0.15),
      inset 0 0 120px rgba(167,139,250,0.08);
  }
}""",
    ),
    (
        "Shadow Pulse",
        "rc-vfx-shadow-pulse",
        "visual-effects",
        "box",
        """.rc-vfx-shadow-pulse {
  background: #111;
  border-radius: 12px;
  animation: rcVfxShadowPulse 2.5s ease-in-out infinite;
  border: 1px solid rgba(239,68,68,0.15);
}
@keyframes rcVfxShadowPulse {
  0%, 100% {
    box-shadow:
      0 0 5px rgba(124,58,237,0.1),
      0 0 15px rgba(124,58,237,0.05);
  }
  50% {
    box-shadow:
      0 0 20px rgba(124,58,237,0.6),
      0 0 40px rgba(99,102,241,0.3),
      0 0 80px rgba(167,139,250,0.15),
      0 5px 25px rgba(124,58,237,0.2);
  }
}""",
    ),
    (
        "Holographic Surface",
        "rc-vfx-holographic",
        "visual-effects",
        "box",
        """.rc-vfx-holographic {
  position: relative;
  background: linear-gradient(
    135deg,
    rgba(124,58,237,0.1) 0%,
    rgba(99,102,241,0.1) 25%,
    rgba(0,255,255,0.1) 50%,
    rgba(236,72,153,0.1) 75%,
    rgba(245,158,11,0.1) 100%
  );
  background-size: 400% 400%;
  border-radius: 12px;
  animation: rcVfxHolographic 4s ease-in-out infinite;
  overflow: hidden;
}
.rc-vfx-holographic::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 12px;
  background:
    linear-gradient(125deg, transparent 20%, rgba(124,58,237,0.3) 30%, rgba(0,255,255,0.3) 36%, transparent 46%),
    linear-gradient(225deg, transparent 50%, rgba(236,72,153,0.25) 58%, rgba(245,158,11,0.25) 64%, transparent 72%);
  background-size: 250% 250%, 250% 250%;
  animation: rcVfxHolographicShine 4s ease-in-out infinite;
  mix-blend-mode: overlay;
}
@keyframes rcVfxHolographic {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
@keyframes rcVfxHolographicShine {
  0%, 100% { background-position: 0% 0%, 100% 100%; }
  50% { background-position: 100% 100%, 0% 0%; }
}""",
    ),
    (
        "Brushed Metallic",
        "rc-vfx-metallic",
        "visual-effects",
        "box",
        """.rc-vfx-metallic {
  background-color: #1a1a2e;
  background-image:
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 2px,
      rgba(255,255,255,0.015) 2px,
      rgba(255,255,255,0.015) 4px
    ),
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 1px,
      rgba(255,255,255,0.008) 1px,
      rgba(255,255,255,0.008) 2px
    ),
    linear-gradient(135deg, rgba(167,139,250,0.08) 0%, rgba(99,102,241,0.12) 50%, rgba(124,58,237,0.08) 100%);
  background-size: 4px 4px, 2px 2px, 100% 100%;
  border-radius: 12px;
  border: 1px solid rgba(167,139,250,0.15);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.05),
    inset 0 -1px 0 rgba(0,0,0,0.3);
  position: relative;
  overflow: hidden;
}
.rc-vfx-metallic::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 12px;
  background: linear-gradient(
    105deg,
    transparent 30%,
    rgba(255,255,255,0.06) 38%,
    rgba(255,255,255,0.1) 42%,
    rgba(255,255,255,0.06) 46%,
    transparent 54%
  );
  animation: rcVfxMetallic 5s ease-in-out infinite;
}
@keyframes rcVfxMetallic {
  0%, 100% { opacity: 0; transform: translateX(-100%); }
  50% { opacity: 1; transform: translateX(100%); }
}""",
    ),
    (
        "Chrome Surface",
        "rc-vfx-chrome",
        "visual-effects",
        "box",
        """.rc-vfx-chrome {
  position: relative;
  background: #0e0e1a;
  border-radius: 14px;
  overflow: hidden;
}
.rc-vfx-chrome::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 14px;
  background:
    linear-gradient(160deg, rgba(255,255,255,0.12) 0%, transparent 30%, transparent 60%, rgba(255,255,255,0.06) 100%),
    linear-gradient(200deg, transparent 40%, rgba(124,58,237,0.15) 50%, transparent 60%),
    linear-gradient(340deg, transparent 30%, rgba(0,255,255,0.1) 45%, transparent 55%);
  animation: rcVfxChrome 5s ease-in-out infinite;
}
.rc-vfx-chrome::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 40%;
  border-radius: 14px 14px 0 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 100%);
}
@keyframes rcVfxChrome {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}""",
    ),
    (
        "Liquid Fill",
        "rc-vfx-liquid-fill",
        "visual-effects",
        "box",
        """.rc-vfx-liquid-fill {
  position: relative;
  background: #0a0a1a;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(99,102,241,0.2);
}
.rc-vfx-liquid-fill::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: -10%;
  right: -10%;
  height: 200%;
  background: linear-gradient(180deg, transparent 0%, rgba(99,102,241,0.05) 35%, rgba(99,102,241,0.15) 45%, rgba(124,58,237,0.3) 50%, rgba(99,102,241,0.15) 55%, rgba(0,255,255,0.1) 60%, transparent 65%);
  border-radius: 40% 45% 42% 44% / 60% 55% 50% 48%;
  animation: rcVfxLiquidFill 4s ease-in-out infinite;
}
@keyframes rcVfxLiquidFill {
  0%, 100% {
    bottom: -60%;
    border-radius: 40% 45% 42% 44% / 60% 55% 50% 48%;
  }
  50% {
    bottom: -20%;
    border-radius: 44% 42% 48% 40% / 55% 48% 60% 50%;
  }
}""",
    ),
    (
        "Animated Gradient Text",
        "rc-vfx-gradient-text",
        "visual-effects",
        "box",
        """.rc-vfx-gradient-text {
  background: linear-gradient(
    90deg,
    #7c3aed,
    #6366f1,
    #0ff,
    #00ff88,
    #f59e0b,
    #ec4899,
    #7c3aed
  );
  background-size: 300% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  border-radius: 12px;
  animation: rcVfxGradientText 4s linear infinite;
  border: 2px solid rgba(124,58,237,0.3);
  background-color: #0a0a1a;
}
@keyframes rcVfxGradientText {
  0% { background-position: 0% 50%; }
  100% { background-position: 300% 50%; }
}""",
    ),
    (
        "Animated Mesh Gradient",
        "rc-vfx-mesh-gradient",
        "visual-effects",
        "box",
        """.rc-vfx-mesh-gradient {
  position: relative;
  background: #0a0a0f;
  border-radius: 14px;
  overflow: hidden;
}
.rc-vfx-mesh-gradient::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 14px;
  background:
    radial-gradient(at 20% 30%, rgba(124,58,237,0.5) 0%, transparent 50%),
    radial-gradient(at 80% 20%, rgba(0,255,255,0.4) 0%, transparent 50%),
    radial-gradient(at 60% 80%, rgba(236,72,153,0.5) 0%, transparent 50%),
    radial-gradient(at 10% 80%, rgba(0,255,136,0.4) 0%, transparent 50%),
    radial-gradient(at 90% 70%, rgba(245,158,11,0.4) 0%, transparent 50%);
  background-size: 200% 200%;
  animation: rcVfxMeshGradient 8s ease-in-out infinite;
  filter: blur(30px) saturate(1.5);
  opacity: 0.7;
}
.rc-vfx-mesh-gradient::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 14px;
  background:
    radial-gradient(at 70% 40%, rgba(99,102,241,0.4) 0%, transparent 45%),
    radial-gradient(at 30% 70%, rgba(167,139,250,0.4) 0%, transparent 45%),
    radial-gradient(at 50% 20%, rgba(239,68,68,0.3) 0%, transparent 45%);
  background-size: 200% 200%;
  animation: rcVfxMeshGradientLayer2 10s ease-in-out infinite reverse;
  filter: blur(25px) saturate(1.3);
  opacity: 0.6;
  mix-blend-mode: screen;
}
@keyframes rcVfxMeshGradient {
  0%, 100% { background-position: 0% 0%; }
  25% { background-position: 100% 0%; }
  50% { background-position: 100% 100%; }
  75% { background-position: 0% 100%; }
}
@keyframes rcVfxMeshGradientLayer2 {
  0%, 100% { background-position: 100% 0%; }
  33% { background-position: 0% 100%; }
  66% { background-position: 100% 100%; }
}""",
    ),
    (
        "Distortion Wobble",
        "rc-vfx-distortion",
        "visual-effects",
        "box",
        """.rc-vfx-distortion {
  background: linear-gradient(135deg, #1a0a2e, #0a1a2e);
  border-radius: 12px;
  border: 1px solid rgba(124,58,237,0.25);
  animation: rcVfxDistortion 4s ease-in-out infinite;
}
@keyframes rcVfxDistortion {
  0%, 100% {
    transform: perspective(800px) rotateX(0deg) rotateY(0deg) scale(1);
    border-radius: 12px;
  }
  15% {
    transform: perspective(800px) rotateX(2deg) rotateY(-1deg) scale(1.005);
    border-radius: 14px 10px 14px 10px;
  }
  30% {
    transform: perspective(800px) rotateX(-1.5deg) rotateY(2deg) scale(0.998);
    border-radius: 10px 14px 10px 14px;
  }
  45% {
    transform: perspective(800px) rotateX(1deg) rotateY(1.5deg) scale(1.003);
    border-radius: 13px 11px 13px 11px;
  }
  60% {
    transform: perspective(800px) rotateX(-2deg) rotateY(-0.5deg) scale(0.997);
    border-radius: 11px 13px 11px 13px;
  }
  75% {
    transform: perspective(800px) rotateX(0.5deg) rotateY(-2deg) scale(1.002);
    border-radius: 12px 12px 14px 10px;
  }
}""",
    ),
    (
        "Pixelate Grid",
        "rc-vfx-pixelate",
        "visual-effects",
        "box",
        """.rc-vfx-pixelate {
  position: relative;
  background-color: #0a0a1a;
  border-radius: 4px;
  overflow: hidden;
  border: 2px solid rgba(0,255,255,0.2);
  image-rendering: pixelated;
}
.rc-vfx-pixelate::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    repeating-linear-gradient(
      0deg,
      rgba(124,58,237,0.06) 0px,
      rgba(124,58,237,0.06) 1px,
      transparent 1px,
      transparent 8px
    ),
    repeating-linear-gradient(
      90deg,
      rgba(0,255,255,0.06) 0px,
      rgba(0,255,255,0.06) 1px,
      transparent 1px,
      transparent 8px
    );
  background-size: 8px 8px;
  animation: rcVfxPixelate 3s steps(1) infinite;
}
.rc-vfx-pixelate::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(
      0deg,
      transparent 0px,
      transparent 7px,
      rgba(0,0,0,0.3) 7px,
      rgba(0,0,0,0.3) 8px
    ),
    repeating-linear-gradient(
      90deg,
      transparent 0px,
      transparent 7px,
      rgba(0,0,0,0.3) 7px,
      rgba(0,0,0,0.3) 8px
    );
  background-size: 8px 8px;
}
@keyframes rcVfxPixelate {
  0% { opacity: 1; }
  50% { opacity: 0.6; }
  100% { opacity: 1; }
}""",
    ),
    (
        "Frost Blur",
        "rc-vfx-frost-blur",
        "visual-effects",
        "box",
        """.rc-vfx-frost-blur {
  position: relative;
  background: rgba(255,255,255,0.03);
  backdrop-filter: blur(16px) saturate(1.8);
  -webkit-backdrop-filter: blur(16px) saturate(1.8);
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow:
    inset 0 1px 1px rgba(255,255,255,0.1),
    inset 0 0 30px rgba(124,58,237,0.05),
    0 8px 32px rgba(0,0,0,0.3);
  overflow: hidden;
}
.rc-vfx-frost-blur::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background:
    radial-gradient(ellipse at 30% 20%, rgba(0,255,255,0.06) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 60%, rgba(124,58,237,0.06) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 80%, rgba(167,139,250,0.04) 0%, transparent 50%);
  animation: rcVfxFrostBlur 8s ease-in-out infinite;
  pointer-events: none;
}
@keyframes rcVfxFrostBlur {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(3%, -2%) rotate(1deg); }
  66% { transform: translate(-2%, 3%) rotate(-1deg); }
}""",
    ),
    (
        "Spotlight Follow",
        "rc-vfx-spotlight",
        "visual-effects",
        "box",
        """.rc-vfx-spotlight {
  position: relative;
  background: #0a0a12;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(245,158,11,0.12);
}
.rc-vfx-spotlight::before {
  content: '';
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(245,158,11,0.35) 0%, rgba(245,158,11,0.1) 40%, transparent 70%);
  animation: rcVfxSpotlight 5s ease-in-out infinite;
  filter: blur(10px);
  pointer-events: none;
}
@keyframes rcVfxSpotlight {
  0% { top: -30%; left: -10%; }
  15% { top: 10%; left: 60%; }
  30% { top: 60%; left: 90%; }
  45% { top: 80%; left: 40%; }
  60% { top: 50%; left: -5%; }
  75% { top: 20%; left: 30%; }
  90% { top: -20%; left: 70%; }
  100% { top: -30%; left: -10%; }
}""",
    ),
    (
        "Mask Fade Reveal",
        "rc-vfx-mask-fade",
        "visual-effects",
        "box",
        """.rc-vfx-mask-fade {
  position: relative;
  background: linear-gradient(135deg, #7c3aed, #6366f1, #0ff);
  border-radius: 12px;
  animation: rcVfxMaskFade 4s ease-in-out infinite;
}
@keyframes rcVfxMaskFade {
  0% {
    -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 0%, black 0%);
    mask-image: linear-gradient(90deg, transparent 0%, black 0%, black 0%);
  }
  40% {
    -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 30%, black 100%);
    mask-image: linear-gradient(90deg, transparent 0%, black 30%, black 100%);
  }
  60% {
    -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 30%, black 100%);
    mask-image: linear-gradient(90deg, transparent 0%, black 30%, black 100%);
  }
  100% {
    -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 0%, black 0%);
    mask-image: linear-gradient(90deg, transparent 0%, black 0%, black 0%);
  }
}""",
    ),
    (
        "Blend Mode Overlay",
        "rc-vfx-blend",
        "visual-effects",
        "box",
        """.rc-vfx-blend {
  position: relative;
  background: #0a0a1a;
  border-radius: 14px;
  overflow: hidden;
}
.rc-vfx-blend::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 14px;
  background:
    linear-gradient(45deg, rgba(239,68,68,0.4), rgba(245,158,11,0.4)),
    linear-gradient(135deg, rgba(124,58,237,0.4), rgba(236,72,153,0.4)),
    linear-gradient(225deg, rgba(0,255,136,0.4), rgba(0,255,255,0.4));
  background-size: 200% 200%, 200% 200%, 200% 200%;
  mix-blend-mode: screen;
  animation: rcVfxBlend 6s ease-in-out infinite;
  filter: blur(20px);
}
.rc-vfx-blend::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 14px;
  background:
    conic-gradient(from 45deg at 50% 50%, rgba(124,58,237,0.3), rgba(0,255,255,0.3), rgba(236,72,153,0.3), rgba(0,255,136,0.3), rgba(124,58,237,0.3));
  mix-blend-mode: overlay;
  animation: rcVfxBlendRotate 8s linear infinite;
  filter: blur(15px);
}
@keyframes rcVfxBlend {
  0%, 100% { background-position: 0% 50%, 100% 0%, 50% 100%; }
  50% { background-position: 100% 50%, 0% 100%, 50% 0%; }
}
@keyframes rcVfxBlendRotate {
  0% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.1); }
  100% { opacity: 0.5; transform: scale(1); }
}""",
    ),
    (
        "Heavy Backdrop Blur",
        "rc-vfx-backdrop-blur",
        "visual-effects",
        "box",
        """.rc-vfx-backdrop-blur {
  position: relative;
  background: rgba(124,58,237,0.08);
  backdrop-filter: blur(30px) saturate(2) brightness(1.1);
  -webkit-backdrop-filter: blur(30px) saturate(2) brightness(1.1);
  border-radius: 16px;
  border: 1px solid rgba(124,58,237,0.2);
  box-shadow:
    0 0 0 1px rgba(99,102,241,0.1),
    0 8px 40px -8px rgba(124,58,237,0.25),
    inset 0 1px 0 rgba(255,255,255,0.1);
  overflow: hidden;
}
.rc-vfx-backdrop-blur::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 16px;
  background:
    linear-gradient(135deg, rgba(124,58,237,0.15) 0%, transparent 40%, transparent 60%, rgba(0,255,255,0.1) 100%);
  animation: rcVfxBackdropBlur 4s ease-in-out infinite alternate;
}
@keyframes rcVfxBackdropBlur {
  0% { opacity: 0.5; }
  100% { opacity: 1; }
}""",
    ),
    (
        "Color Shift",
        "rc-vfx-color-shift",
        "visual-effects",
        "box",
        """.rc-vfx-color-shift {
  background: linear-gradient(
    135deg,
    rgba(124,58,237,0.3),
    rgba(99,102,241,0.3),
    rgba(0,255,255,0.3),
    rgba(0,255,136,0.3),
    rgba(245,158,11,0.3),
    rgba(236,72,153,0.3),
    rgba(124,58,237,0.3)
  );
  background-size: 600% 600%;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.06);
  animation: rcVfxColorShift 8s ease-in-out infinite;
}
@keyframes rcVfxColorShift {
  0% { background-position: 0% 50%; }
  25% { background-position: 50% 0%; }
  50% { background-position: 100% 50%; }
  75% { background-position: 50% 100%; }
  100% { background-position: 0% 50%; }
}""",
    ),
    (
        "Hue Rotate Loop",
        "rc-vfx-hue-rotate",
        "visual-effects",
        "box",
        """.rc-vfx-hue-rotate {
  background: linear-gradient(135deg, #7c3aed, #ec4899, #ef4444);
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.1);
  animation: rcVfxHueRotate 6s linear infinite;
}
@keyframes rcVfxHueRotate {
  0% { filter: hue-rotate(0deg) brightness(1.1); }
  100% { filter: hue-rotate(360deg) brightness(1.1); }
}""",
    ),
    (
        "Saturation Pulse",
        "rc-vfx-saturation-pulse",
        "visual-effects",
        "box",
        """.rc-vfx-saturation-pulse {
  background: linear-gradient(135deg, #2d1b69, #1a1a2e);
  border-radius: 12px;
  border: 1px solid rgba(124,58,237,0.2);
  animation: rcVfxSaturationPulse 3s ease-in-out infinite;
}
@keyframes rcVfxSaturationPulse {
  0%, 100% {
    filter: saturate(0.3) brightness(0.8);
    box-shadow: 0 0 10px rgba(124,58,237,0.1);
  }
  50% {
    filter: saturate(2.5) brightness(1.3);
    box-shadow:
      0 0 30px rgba(124,58,237,0.4),
      0 0 60px rgba(99,102,241,0.2);
  }
}""",
    ),
    (
        "Glass Reflection",
        "rc-vfx-glass-reflection",
        "visual-effects",
        "box",
        """.rc-vfx-glass-reflection {
  position: relative;
  background: rgba(255,255,255,0.04);
  backdrop-filter: blur(12px) saturate(1.5);
  -webkit-backdrop-filter: blur(12px) saturate(1.5);
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.1);
  overflow: hidden;
}
.rc-vfx-glass-reflection::before {
  content: '';
  position: absolute;
  top: -100%;
  left: -50%;
  width: 200%;
  height: 300%;
  background: linear-gradient(
    135deg,
    transparent 30%,
    rgba(255,255,255,0.08) 38%,
    rgba(255,255,255,0.15) 42%,
    rgba(255,255,255,0.08) 46%,
    transparent 54%
  );
  animation: rcVfxGlassReflection 6s ease-in-out infinite;
  pointer-events: none;
}
@keyframes rcVfxGlassReflection {
  0% { transform: translateX(-40%) translateY(-20%) rotate(25deg); }
  50% { transform: translateX(40%) translateY(20%) rotate(25deg); }
  100% { transform: translateX(-40%) translateY(-20%) rotate(25deg); }
}""",
    ),
    (
        "Animated Noise Overlay",
        "rc-vfx-noise",
        "visual-effects",
        "box",
        """.rc-vfx-noise {
  position: relative;
  background: #0e0e1a;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(124,58,237,0.15);
}
.rc-vfx-noise::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 12px;
  background-image:
    repeating-linear-gradient(
      0deg,
      rgba(124,58,237,0.04) 0px,
      transparent 1px,
      transparent 3px
    ),
    repeating-linear-gradient(
      90deg,
      rgba(0,255,255,0.03) 0px,
      transparent 1px,
      transparent 5px
    ),
    repeating-linear-gradient(
      45deg,
      rgba(236,72,153,0.02) 0px,
      transparent 1px,
      transparent 7px
    ),
    repeating-linear-gradient(
      -45deg,
      rgba(245,158,11,0.02) 0px,
      transparent 1px,
      transparent 4px
    );
  background-size: 3px 3px, 5px 5px, 7px 7px, 4px 4px;
  animation: rcVfxNoise 0.8s steps(3) infinite;
  opacity: 0.8;
}
.rc-vfx-noise::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 12px;
  background:
    radial-gradient(ellipse at 30% 40%, rgba(124,58,237,0.08) 0%, transparent 60%),
    radial-gradient(ellipse at 70% 60%, rgba(0,255,255,0.06) 0%, transparent 60%);
  mix-blend-mode: screen;
}
@keyframes rcVfxNoise {
  0% { transform: translate(0, 0); }
  33% { transform: translate(-1px, 1px); }
  66% { transform: translate(1px, -1px); }
  100% { transform: translate(0, 0); }
}""",
    ),
    (
        "Shimmer Sweep",
        "rc-vfx-shimmer",
        "visual-effects",
        "box",
        """.rc-vfx-shimmer {
  position: relative;
  background: linear-gradient(135deg, #141428, #1a1a30);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(167,139,250,0.12);
}
.rc-vfx-shimmer::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 60%;
  height: 100%;
  background: linear-gradient(
    105deg,
    transparent 20%,
    rgba(255,255,255,0.03) 30%,
    rgba(255,255,255,0.08) 40%,
    rgba(255,255,255,0.12) 50%,
    rgba(255,255,255,0.08) 60%,
    rgba(255,255,255,0.03) 70%,
    transparent 80%
  );
  animation: rcVfxShimmer 3s ease-in-out infinite;
}
@keyframes rcVfxShimmer {
  0% { left: -100%; }
  100% { left: 200%; }
}""",
    ),
    (
        "Iridescent Shimmer",
        "rc-vfx-iridescent",
        "visual-effects",
        "box",
        """.rc-vfx-iridescent {
  position: relative;
  background: #0c0c18;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.06);
}
.rc-vfx-iridescent::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 14px;
  background:
    linear-gradient(
      120deg,
      rgba(124,58,237,0.2) 0%,
      rgba(0,255,255,0.15) 15%,
      rgba(0,255,136,0.2) 30%,
      rgba(245,158,11,0.15) 45%,
      rgba(239,68,68,0.2) 60%,
      rgba(236,72,153,0.15) 75%,
      rgba(99,102,241,0.2) 90%,
      rgba(124,58,237,0.2) 100%
    );
  background-size: 300% 300%;
  animation: rcVfxIridescent 5s ease-in-out infinite;
  mix-blend-mode: overlay;
}
.rc-vfx-iridescent::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 14px;
  background:
    linear-gradient(
      60deg,
      rgba(167,139,250,0.15) 0%,
      rgba(0,255,255,0.1) 20%,
      rgba(236,72,153,0.15) 40%,
      rgba(0,255,136,0.1) 60%,
      rgba(245,158,11,0.15) 80%,
      rgba(167,139,250,0.15) 100%
    );
  background-size: 250% 250%;
  animation: rcVfxIridescentLayer2 7s ease-in-out infinite reverse;
  mix-blend-mode: color-dodge;
}
@keyframes rcVfxIridescent {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
@keyframes rcVfxIridescentLayer2 {
  0%, 100% { background-position: 100% 0%; }
  50% { background-position: 0% 100%; }
}""",
    ),
    (
        "Neon Pulse",
        "rc-vfx-neon-pulse",
        "visual-effects",
        "box",
        """.rc-vfx-neon-pulse {
  background: #050510;
  border-radius: 10px;
  border: 2px solid #7c3aed;
  animation: rcVfxNeonPulse 2s ease-in-out infinite;
  box-shadow:
    0 0 5px rgba(124,58,237,0.3),
    0 0 10px rgba(124,58,237,0.2),
    inset 0 0 10px rgba(124,58,237,0.05);
}
@keyframes rcVfxNeonPulse {
  0%, 100% {
    border-color: #7c3aed;
    box-shadow:
      0 0 5px rgba(124,58,237,0.3),
      0 0 10px rgba(124,58,237,0.2),
      0 0 20px rgba(124,58,237,0.1),
      inset 0 0 10px rgba(124,58,237,0.05);
  }
  50% {
    border-color: #0ff;
    box-shadow:
      0 0 10px rgba(0,255,255,0.5),
      0 0 20px rgba(0,255,255,0.3),
      0 0 40px rgba(0,255,255,0.15),
      0 0 80px rgba(0,255,255,0.08),
      inset 0 0 20px rgba(0,255,255,0.1);
  }
}""",
    ),
    (
        "Glitch Distort",
        "rc-vfx-glitch",
        "visual-effects",
        "box",
        """.rc-vfx-glitch {
  position: relative;
  background: #0a0a1a;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid rgba(239,68,68,0.2);
}
.rc-vfx-glitch::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(239,68,68,0.15), rgba(0,255,255,0.15));
  animation: rcVfxGlitch 3s steps(1) infinite;
}
.rc-vfx-glitch::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(
      0deg,
      transparent 0px,
      transparent 4px,
      rgba(0,255,255,0.03) 4px,
      rgba(0,255,255,0.03) 5px
    );
  animation: rcVfxGlitchScanlines 0.1s steps(1) infinite;
  pointer-events: none;
}
@keyframes rcVfxGlitch {
  0%, 100% {
    clip-path: inset(0 0 0 0);
    transform: translate(0);
  }
  5% {
    clip-path: inset(20% 0 60% 0);
    transform: translate(-3px, 1px);
  }
  5.5% {
    clip-path: inset(50% 0 20% 0);
    transform: translate(3px, -1px);
  }
  6% {
    clip-path: inset(0 0 0 0);
    transform: translate(0);
  }
  40% {
    clip-path: inset(0 0 0 0);
    transform: translate(0);
  }
  42% {
    clip-path: inset(70% 0 5% 0);
    transform: translate(2px, 0);
  }
  42.5% {
    clip-path: inset(10% 0 70% 0);
    transform: translate(-2px, 0);
  }
  43% {
    clip-path: inset(0 0 0 0);
    transform: translate(0);
  }
  80% {
    clip-path: inset(0 0 0 0);
    transform: translate(0);
  }
  82% {
    clip-path: inset(40% 0 30% 0);
    transform: translate(4px, 0);
  }
  82.5% {
    clip-path: inset(0 0 0 0);
    transform: translate(-4px, 0);
  }
  83% {
    clip-path: inset(0 0 0 0);
    transform: translate(0);
  }
}
@keyframes rcVfxGlitchScanlines {
  0% { background-position: 0 0; }
  100% { background-position: 0 5px; }
}""",
    ),
    (
        "Prism Split",
        "rc-vfx-prism",
        "visual-effects",
        "box",
        """.rc-vfx-prism {
  position: relative;
  background: #0a0a12;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.06);
}
.rc-vfx-prism::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 12px;
  background:
    linear-gradient(
      115deg,
      transparent 30%,
      rgba(239,68,68,0.25) 32%,
      rgba(245,158,11,0.25) 36%,
      rgba(0,255,136,0.25) 40%,
      rgba(0,255,255,0.25) 44%,
      rgba(99,102,241,0.25) 48%,
      rgba(124,58,237,0.25) 52%,
      rgba(236,72,153,0.25) 56%,
      transparent 58%
    );
  animation: rcVfxPrism 4s ease-in-out infinite;
  mix-blend-mode: screen;
}
.rc-vfx-prism::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 12px;
  background:
    linear-gradient(
      245deg,
      transparent 30%,
      rgba(236,72,153,0.2) 32%,
      rgba(124,58,237,0.2) 36%,
      rgba(99,102,241,0.2) 40%,
      rgba(0,255,255,0.2) 44%,
      rgba(0,255,136,0.2) 48%,
      rgba(245,158,11,0.2) 52%,
      rgba(239,68,68,0.2) 56%,
      transparent 58%
    );
  animation: rcVfxPrismReverse 5s ease-in-out infinite reverse;
  mix-blend-mode: screen;
  opacity: 0.8;
}
@keyframes rcVfxPrism {
  0%, 100% { opacity: 0.4; transform: translateX(-10%); }
  50% { opacity: 1; transform: translateX(10%); }
}
@keyframes rcVfxPrismReverse {
  0%, 100% { opacity: 0.3; transform: translateX(10%); }
  50% { opacity: 0.7; transform: translateX(-10%); }
}""",
    ),
    (
        "Foil Mylar",
        "rc-vfx-foil",
        "visual-effects",
        "box",
        """.rc-vfx-foil {
  position: relative;
  background: #111;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(167,139,250,0.15);
}
.rc-vfx-foil::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 12px;
  background:
    linear-gradient(
      135deg,
      rgba(124,58,237,0.4) 0%,
      rgba(99,102,241,0.3) 10%,
      rgba(167,139,250,0.5) 20%,
      rgba(0,255,255,0.3) 30%,
      rgba(0,255,136,0.4) 40%,
      rgba(245,158,11,0.3) 50%,
      rgba(239,68,68,0.4) 60%,
      rgba(236,72,153,0.3) 70%,
      rgba(167,139,250,0.5) 80%,
      rgba(124,58,237,0.4) 90%,
      rgba(99,102,241,0.3) 100%
    );
  background-size: 200% 200%;
  animation: rcVfxFoil 3s linear infinite;
  mix-blend-mode: overlay;
}
.rc-vfx-foil::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 12px;
  background:
    conic-gradient(
      from 0deg at 50% 50%,
      rgba(255,255,255,0.08),
      rgba(255,255,255,0.02),
      rgba(255,255,255,0.12),
      rgba(255,255,255,0.02),
      rgba(255,255,255,0.08),
      rgba(255,255,255,0.02),
      rgba(255,255,255,0.1),
      rgba(255,255,255,0.02)
    );
  animation: rcVfxFoilShine 2s linear infinite;
  mix-blend-mode: soft-light;
}
@keyframes rcVfxFoil {
  0% { background-position: 0% 0%; }
  100% { background-position: 200% 200%; }
}
@keyframes rcVfxFoilShine {
  0% { transform: rotate(0deg) scale(1.5); }
  100% { transform: rotate(360deg) scale(1.5); }
}""",
    ),
]