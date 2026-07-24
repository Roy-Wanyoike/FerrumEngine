/* ===== Ferrum VFX — Distortion Engine ===== */
/* Visual distortion effects using transforms, clip-path, and filter */

export function generateDistortionCSS(prefix: string = 'fr-'): string {
  const p = prefix;

  return `@layer ferrum.vfx {

  /* --- fx-distort-wave: skewY animation --- */
  @keyframes ${p}fx-distort-wave {
    0%, 100% { transform: skewY(0deg); }
    25%      { transform: skewY(2deg); }
    75%      { transform: skewY(-2deg); }
  }
  .${p}fx-distort-wave {
    --ferrum-wave-duration: 3s;
    animation: ${p}fx-distort-wave var(--ferrum-wave-duration) ease-in-out infinite;
    transform-origin: center center;
  }

  /* --- fx-distort-ripple: scale pulse from center --- */
  @keyframes ${p}fx-distort-ripple {
    0%   { transform: scale(1); }
    50%  { transform: scale(1.04); }
    100% { transform: scale(1); }
  }
  .${p}fx-distort-ripple {
    --ferrum-ripple-duration: 2s;
    animation: ${p}fx-distort-ripple var(--ferrum-ripple-duration) ease-in-out infinite;
    transform-origin: center center;
  }

  /* --- fx-distort-warp: perspective + rotateX/Y --- */
  @keyframes ${p}fx-distort-warp {
    0%, 100% { transform: perspective(800px) rotateX(0deg) rotateY(0deg); }
    25%      { transform: perspective(800px) rotateX(3deg) rotateY(5deg); }
    50%      { transform: perspective(800px) rotateX(-2deg) rotateY(-3deg); }
    75%      { transform: perspective(800px) rotateX(4deg) rotateY(-2deg); }
  }
  .${p}fx-distort-warp {
    --ferrum-warp-duration: 8s;
    animation: ${p}fx-distort-warp var(--ferrum-warp-duration) ease-in-out infinite;
    transform-style: preserve-3d;
  }

  /* --- fx-distort-stretch: scaleX animation --- */
  @keyframes ${p}fx-distort-stretch {
    0%, 100% { transform: scaleX(1); }
    50%      { transform: scaleX(1.06); }
  }
  .${p}fx-distort-stretch {
    --ferrum-stretch-duration: 2.5s;
    animation: ${p}fx-distort-stretch var(--ferrum-stretch-duration) ease-in-out infinite;
  }

  /* --- fx-distort-twist: rotate + skew --- */
  @keyframes ${p}fx-distort-twist {
    0%, 100% { transform: rotate(0deg) skew(0deg, 0deg); }
    25%      { transform: rotate(1.5deg) skew(1deg, -1deg); }
    50%      { transform: rotate(-1deg) skew(-0.5deg, 1.5deg); }
    75%      { transform: rotate(0.5deg) skew(1.5deg, 0.5deg); }
  }
  .${p}fx-distort-twist {
    --ferrum-twist-duration: 4s;
    animation: ${p}fx-distort-twist var(--ferrum-twist-duration) ease-in-out infinite;
  }

  /* --- fx-distort-spiral: rotate(360deg) + scale --- */
  @keyframes ${p}fx-distort-spiral {
    0%   { transform: rotate(0deg) scale(1); }
    50%  { transform: rotate(180deg) scale(1.1); }
    100% { transform: rotate(360deg) scale(1); }
  }
  .${p}fx-distort-spiral {
    --ferrum-spiral-duration: 10s;
    animation: ${p}fx-distort-spiral var(--ferrum-spiral-duration) linear infinite;
  }

  /* --- fx-distort-pinch: perspective + translateZ --- */
  @keyframes ${p}fx-distort-pinch {
    0%, 100% { transform: perspective(600px) translateZ(0); }
    50%      { transform: perspective(600px) translateZ(40px); }
  }
  .${p}fx-distort-pinch {
    --ferrum-pinch-duration: 3s;
    animation: ${p}fx-distort-pinch var(--ferrum-pinch-duration) ease-in-out infinite;
    transform-style: preserve-3d;
  }

  /* --- fx-distort-fisheye: border-radius morph to simulate lens --- */
  @keyframes ${p}fx-distort-fisheye {
    0%, 100% {
      border-radius: 0%;
      transform: scale(1);
    }
    25% {
      border-radius: 20% 80% 20% 80%;
      transform: scale(1.02);
    }
    50% {
      border-radius: 50%;
      transform: scale(1.05);
    }
    75% {
      border-radius: 80% 20% 80% 20%;
      transform: scale(1.02);
    }
  }
  .${p}fx-distort-fisheye {
    --ferrum-fisheye-duration: 6s;
    animation: ${p}fx-distort-fisheye var(--ferrum-fisheye-duration) ease-in-out infinite;
    overflow: hidden;
  }

  /* --- fx-distort-glitch: clip-path + translateX rapid shifts --- */
  @keyframes ${p}fx-distort-glitch-1 {
    0%, 100% { clip-path: inset(0 0 0 0); transform: translateX(0); }
    10%      { clip-path: inset(20% 0 60% 0); transform: translateX(-4px); }
    20%      { clip-path: inset(0 0 0 0); transform: translateX(0); }
    30%      { clip-path: inset(60% 0 10% 0); transform: translateX(4px); }
    40%      { clip-path: inset(0 0 0 0); transform: translateX(0); }
    50%      { clip-path: inset(40% 0 30% 0); transform: translateX(-3px); }
    60%      { clip-path: inset(0 0 0 0); transform: translateX(0); }
  }
  @keyframes ${p}fx-distort-glitch-2 {
    0%, 100% { clip-path: inset(0 0 0 0); transform: translateX(0); opacity: 1; }
    15%      { clip-path: inset(70% 0 5% 0); transform: translateX(6px); opacity: 0.8; }
    25%      { clip-path: inset(0 0 0 0); transform: translateX(0); opacity: 1; }
    35%      { clip-path: inset(10% 0 70% 0); transform: translateX(-5px); opacity: 0.8; }
    45%      { clip-path: inset(0 0 0 0); transform: translateX(0); opacity: 1; }
  }
  .${p}fx-distort-glitch {
    --ferrum-glitch-duration: 4s;
    position: relative;
  }
  .${p}fx-distort-glitch::before {
    content: '';
    position: absolute;
    inset: 0;
    background: inherit;
    animation: ${p}fx-distort-glitch-1 var(--ferrum-glitch-duration) steps(1) infinite;
    mix-blend-mode: screen;
    opacity: 0.7;
  }
  .${p}fx-distort-glitch::after {
    content: '';
    position: absolute;
    inset: 0;
    background: inherit;
    animation: ${p}fx-distort-glitch-2 var(--ferrum-glitch-duration) steps(1) infinite;
    animation-delay: calc(var(--ferrum-glitch-duration) * -0.3);
    mix-blend-mode: multiply;
    opacity: 0.7;
  }

  /* --- fx-distort-heat: filter: blur + hue-rotate animation --- */
  @keyframes ${p}fx-distort-heat {
    0%   { filter: blur(0px) hue-rotate(0deg); transform: scaleX(1) translateY(0); }
    25%  { filter: blur(0.5px) hue-rotate(5deg); transform: scaleX(1.005) translateY(-1px); }
    50%  { filter: blur(0.3px) hue-rotate(-3deg); transform: scaleX(0.998) translateY(1px); }
    75%  { filter: blur(0.6px) hue-rotate(4deg); transform: scaleX(1.003) translateY(-0.5px); }
    100% { filter: blur(0px) hue-rotate(0deg); transform: scaleX(1) translateY(0); }
  }
  .${p}fx-distort-heat {
    --ferrum-heat-duration: 2s;
    animation: ${p}fx-distort-heat var(--ferrum-heat-duration) ease-in-out infinite;
  }

  /* --- fx-distort-refraction: refraction effect using skew + scale + opacity --- */
  @keyframes ${p}fx-distort-refraction {
    0%, 100% { transform: skewX(0deg) skewY(0deg) scale(1); opacity: 1; }
    20%      { transform: skewX(2deg) skewY(-1deg) scale(1.02); opacity: 0.95; }
    40%      { transform: skewX(-1deg) skewY(2deg) scale(0.99); opacity: 0.98; }
    60%      { transform: skewX(1.5deg) skewY(1deg) scale(1.01); opacity: 0.96; }
    80%      { transform: skewX(-0.5deg) skewY(-1.5deg) scale(1.03); opacity: 0.97; }
  }
  .${p}fx-distort-refraction {
    --ferrum-refraction-duration: 4s;
    animation: ${p}fx-distort-refraction var(--ferrum-refraction-duration) ease-in-out infinite;
    transform-origin: center center;
  }

  /* --- fx-distort-lens: lens distortion using border-radius morph + scale --- */
  @keyframes ${p}fx-distort-lens {
    0%, 100% {
      border-radius: 4px;
      transform: scale(1);
    }
    25% {
      border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
      transform: scale(1.03);
    }
    50% {
      border-radius: 50% 50% 50% 50%;
      transform: scale(1.05);
    }
    75% {
      border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
      transform: scale(1.02);
    }
  }
  .${p}fx-distort-lens {
    --ferrum-lens-distort-duration: 5s;
    animation: ${p}fx-distort-lens var(--ferrum-lens-distort-duration) ease-in-out infinite;
    overflow: hidden;
  }

  /* --- fx-distort-water: water surface distortion using multiple skewY keyframes --- */
  @keyframes ${p}fx-distort-water {
    0%   { transform: skewY(0deg) scaleX(1); }
    10%  { transform: skewY(1.2deg) scaleX(1.005); }
    20%  { transform: skewY(-0.8deg) scaleX(0.998); }
    30%  { transform: skewY(1.5deg) scaleX(1.003); }
    40%  { transform: skewY(-1deg) scaleX(0.997); }
    50%  { transform: skewY(0.6deg) scaleX(1.002); }
    60%  { transform: skewY(-1.3deg) scaleX(1.004); }
    70%  { transform: skewY(0.9deg) scaleX(0.999); }
    80%  { transform: skewY(-0.5deg) scaleX(1.001); }
    90%  { transform: skewY(1.1deg) scaleX(0.998); }
    100% { transform: skewY(0deg) scaleX(1); }
  }
  .${p}fx-distort-water {
    --ferrum-water-duration: 3s;
    animation: ${p}fx-distort-water var(--ferrum-water-duration) ease-in-out infinite;
    transform-origin: center center;
  }

  /* --- fx-distort-pixelate: pixelation effect via image-rendering + scale --- */
  @keyframes ${p}fx-distort-pixelate {
    0%, 100% { transform: scale(1); image-rendering: auto; }
    50%      { transform: scale(0.95); image-rendering: pixelated; }
  }
  .${p}fx-distort-pixelate {
    --ferrum-pixelate-duration: 4s;
    --ferrum-pixelate-scale: 0.95;
    animation: ${p}fx-distort-pixelate var(--ferrum-pixelate-duration) ease-in-out infinite;
    image-rendering: auto;
    transition: image-rendering 0.1s;
  }

  /* --- fx-distort-zoom: zoom distortion with scale animation + overflow hidden --- */
  @keyframes ${p}fx-distort-zoom {
    0%, 100% { transform: scale(1); }
    30%      { transform: scale(1.15); }
    60%      { transform: scale(0.95); }
  }
  .${p}fx-distort-zoom {
    --ferrum-zoom-distort-duration: 5s;
    animation: ${p}fx-distort-zoom var(--ferrum-zoom-distort-duration) ease-in-out infinite;
    overflow: hidden;
    transform-origin: center center;
  }

  /* --- fx-distort-melt: melting effect using scaleY + skewX combination --- */
  @keyframes ${p}fx-distort-melt {
    0%, 100% { transform: scaleY(1) skewX(0deg); border-radius: inherit; }
    25%      { transform: scaleY(1.08) skewX(2deg); border-radius: 0 0 40% 40%; }
    50%      { transform: scaleY(1.15) skewX(-1deg); border-radius: 0 0 30% 30%; }
    75%      { transform: scaleY(1.05) skewX(1deg); border-radius: 0 0 20% 20%; }
  }
  .${p}fx-distort-melt {
    --ferrum-melt-duration: 4s;
    animation: ${p}fx-distort-melt var(--ferrum-melt-duration) ease-in-out infinite;
    transform-origin: top center;
    overflow: hidden;
  }

}`;
}