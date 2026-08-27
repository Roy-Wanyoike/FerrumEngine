/* ===== Ferrum VFX — Background Engine ===== */
/* Rich animated backgrounds using gradients, animations, and pseudo-elements */

export function generateBackgroundCSS(prefix: string = 'fr-'): string {
  const p = prefix;

  return `@layer ferrum.vfx {

  /* --- fx-bg-mesh-gradient: multiple radial-gradients at different positions, animated positions --- */
  @keyframes ${p}fx-bg-mesh-1 {
    0%, 100% { transform: translate(0, 0); }
    25%      { transform: translate(30px, -40px); }
    50%      { transform: translate(-20px, 20px); }
    75%      { transform: translate(15px, 30px); }
  }
  @keyframes ${p}fx-bg-mesh-2 {
    0%, 100% { transform: translate(0, 0); }
    25%      { transform: translate(-30px, 20px); }
    50%      { transform: translate(40px, -15px); }
    75%      { transform: translate(-10px, -35px); }
  }
  @keyframes ${p}fx-bg-mesh-3 {
    0%, 100% { transform: translate(0, 0); }
    25%      { transform: translate(20px, 30px); }
    50%      { transform: translate(-30px, -20px); }
    75%      { transform: translate(35px, -10px); }
  }
  .${p}fx-bg-mesh-gradient {
    --ferrum-mesh-c1: #6366f1;
    --ferrum-mesh-c2: #ec4899;
    --ferrum-mesh-c3: #06b6d4;
    --ferrum-mesh-c4: #f59e0b;
    position: relative;
    overflow: hidden;
    background: #0f0f1a;
  }
  .${p}fx-bg-mesh-gradient::before {
    content: '';
    position: absolute;
    inset: -50%;
    background:
      radial-gradient(ellipse 600px 400px at 30% 40%, var(--ferrum-mesh-c1), transparent),
      radial-gradient(ellipse 500px 500px at 70% 30%, var(--ferrum-mesh-c2), transparent),
      radial-gradient(ellipse 400px 600px at 50% 70%, var(--ferrum-mesh-c3), transparent),
      radial-gradient(ellipse 500px 300px at 80% 80%, var(--ferrum-mesh-c4), transparent);
    filter: blur(80px);
    opacity: 0.6;
    animation: ${p}fx-bg-mesh-1 15s ease-in-out infinite;
  }
  .${p}fx-bg-mesh-gradient::after {
    content: '';
    position: absolute;
    inset: -50%;
    background:
      radial-gradient(ellipse 400px 500px at 60% 20%, var(--ferrum-mesh-c3), transparent),
      radial-gradient(ellipse 500px 400px at 20% 70%, var(--ferrum-mesh-c4), transparent);
    filter: blur(80px);
    opacity: 0.4;
    animation: ${p}fx-bg-mesh-2 18s ease-in-out infinite;
  }

  /* --- fx-bg-aurora: animated conic-gradient + linear-gradient layers --- */
  @keyframes ${p}fx-bg-aurora-shift {
    0%   { transform: translateX(0) rotate(0deg); }
    50%  { transform: translateX(-20%) rotate(180deg); }
    100% { transform: translateX(0) rotate(360deg); }
  }
  .${p}fx-bg-aurora {
    --ferrum-aurora-c1: rgba(99, 102, 241, 0.3);
    --ferrum-aurora-c2: rgba(236, 72, 153, 0.2);
    --ferrum-aurora-c3: rgba(6, 182, 212, 0.25);
    position: relative;
    overflow: hidden;
    background: linear-gradient(180deg, #0a0a1a 0%, #111128 100%);
  }
  .${p}fx-bg-aurora::before {
    content: '';
    position: absolute;
    inset: -50%;
    background:
      conic-gradient(from 0deg at 50% 50%, var(--ferrum-aurora-c1), var(--ferrum-aurora-c2), var(--ferrum-aurora-c3), var(--ferrum-aurora-c1));
    filter: blur(100px);
    animation: ${p}fx-bg-aurora-shift 12s linear infinite;
  }
  .${p}fx-bg-aurora::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 0%, rgba(10, 10, 26, 0.5) 50%, transparent 100%);
  }

  /* --- fx-bg-waves: layered sine-wave-like gradients --- */
  @keyframes ${p}fx-bg-wave-1 {
    0%, 100% { transform: translateX(0); }
    50%      { transform: translateX(-25%); }
  }
  @keyframes ${p}fx-bg-wave-2 {
    0%, 100% { transform: translateX(0); }
    50%      { transform: translateX(25%); }
  }
  @keyframes ${p}fx-bg-wave-3 {
    0%, 100% { transform: translateX(0); }
    50%      { transform: translateX(-15%); }
  }
  .${p}fx-bg-waves {
    --ferrum-wave-c1: rgba(99, 102, 241, 0.15);
    --ferrum-wave-c2: rgba(6, 182, 212, 0.12);
    --ferrum-wave-c3: rgba(236, 72, 153, 0.1);
    position: relative;
    overflow: hidden;
    background: #0a0a1a;
  }
  .${p}fx-bg-waves::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: -50%;
    width: 200%;
    height: 60%;
    background:
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 80px,
        var(--ferrum-wave-c1) 80px,
        var(--ferrum-wave-c1) 82px
      );
    border-radius: 100% 100% 0 0;
    animation: ${p}fx-bg-wave-1 8s ease-in-out infinite;
  }
  .${p}fx-bg-waves::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: -50%;
    width: 200%;
    height: 45%;
    background:
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 60px,
        var(--ferrum-wave-c2) 60px,
        var(--ferrum-wave-c2) 62px
      );
    border-radius: 100% 100% 0 0;
    animation: ${p}fx-bg-wave-2 6s ease-in-out infinite;
    opacity: 0.7;
  }

  /* --- fx-bg-organic-shapes: blob shapes via border-radius + animation --- */
  @keyframes ${p}fx-bg-organic-1 {
    0%, 100% { border-radius: 40% 60% 60% 40% / 60% 30% 70% 40%; transform: translate(0, 0) rotate(0deg); }
    33%      { border-radius: 70% 30% 50% 50% / 30% 60% 40% 70%; transform: translate(30px, -20px) rotate(120deg); }
    66%      { border-radius: 50% 50% 30% 70% / 50% 40% 60% 50%; transform: translate(-20px, 20px) rotate(240deg); }
  }
  @keyframes ${p}fx-bg-organic-2 {
    0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: translate(0, 0) rotate(0deg); }
    33%      { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; transform: translate(-25px, 15px) rotate(-120deg); }
    66%      { border-radius: 50% 50% 50% 50% / 40% 60% 40% 60%; transform: translate(20px, -30px) rotate(-240deg); }
  }
  .${p}fx-bg-organic-shapes {
    --ferrum-organic-c1: rgba(99, 102, 241, 0.2);
    --ferrum-organic-c2: rgba(236, 72, 153, 0.15);
    --ferrum-organic-c3: rgba(6, 182, 212, 0.18);
    position: relative;
    overflow: hidden;
    background: #0f0f1a;
  }
  .${p}fx-bg-organic-shapes::before {
    content: '';
    position: absolute;
    width: 60%;
    height: 60%;
    top: 10%;
    left: 10%;
    background: var(--ferrum-organic-c1);
    filter: blur(60px);
    animation: ${p}fx-bg-organic-1 20s ease-in-out infinite;
  }
  .${p}fx-bg-organic-shapes::after {
    content: '';
    position: absolute;
    width: 50%;
    height: 50%;
    bottom: 10%;
    right: 10%;
    background: var(--ferrum-organic-c2);
    filter: blur(60px);
    animation: ${p}fx-bg-organic-2 25s ease-in-out infinite;
  }

  /* --- fx-bg-galaxy: radial + conic gradient with slow rotation --- */
  @keyframes ${p}fx-bg-galaxy-rotate {
    to { transform: rotate(360deg); }
  }
  .${p}fx-bg-galaxy {
    position: relative;
    overflow: hidden;
    background: radial-gradient(ellipse at center, #1a1a3e 0%, #0a0a1a 100%);
  }
  .${p}fx-bg-galaxy::before {
    content: '';
    position: absolute;
    inset: -20%;
    background:
      conic-gradient(
        from 0deg at 50% 50%,
        rgba(99, 102, 241, 0.15),
        rgba(236, 72, 153, 0.08),
        rgba(6, 182, 212, 0.12),
        rgba(99, 102, 241, 0.15)
      );
    filter: blur(40px);
    animation: ${p}fx-bg-galaxy-rotate 60s linear infinite;
  }
  .${p}fx-bg-galaxy::after {
    content: '';
    position: absolute;
    inset: 10%;
    background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
    border-radius: 50%;
  }

  /* --- fx-bg-hex-grid: hexagonal pattern via linear-gradient (CSS-only approximation) --- */
  .${p}fx-bg-hex-grid {
    --ferrum-hex-size: 30px;
    --ferrum-hex-color: rgba(99, 102, 241, 0.12);
    --ferrum-hex-bg: #0a0a1a;
    background-color: var(--ferrum-hex-bg);
    background-image:
      linear-gradient(30deg, var(--ferrum-hex-color) 12%, transparent 12.5%, transparent 87%, var(--ferrum-hex-color) 87.5%, var(--ferrum-hex-color)),
      linear-gradient(150deg, var(--ferrum-hex-color) 12%, transparent 12.5%, transparent 87%, var(--ferrum-hex-color) 87.5%, var(--ferrum-hex-color)),
      linear-gradient(30deg, var(--ferrum-hex-color) 12%, transparent 12.5%, transparent 87%, var(--ferrum-hex-color) 87.5%, var(--ferrum-hex-color)),
      linear-gradient(150deg, var(--ferrum-hex-color) 12%, transparent 12.5%, transparent 87%, var(--ferrum-hex-color) 87.5%, var(--ferrum-hex-color)),
      linear-gradient(60deg, rgba(99, 102, 241, 0.06) 25%, transparent 25.5%, transparent 75%, rgba(99, 102, 241, 0.06) 75%, rgba(99, 102, 241, 0.06)),
      linear-gradient(60deg, rgba(99, 102, 241, 0.06) 25%, transparent 25.5%, transparent 75%, rgba(99, 102, 241, 0.06) 75%, rgba(99, 102, 241, 0.06));
    background-size: var(--ferrum-hex-size) calc(var(--ferrum-hex-size) * 1.732);
    background-position: 0 0, 0 0, calc(var(--ferrum-hex-size) * 0.5) calc(var(--ferrum-hex-size) * 0.866), calc(var(--ferrum-hex-size) * 0.5) calc(var(--ferrum-hex-size) * 0.866), 0 0, calc(var(--ferrum-hex-size) * 0.5) calc(var(--ferrum-hex-size) * 0.866);
  }

  /* --- fx-bg-dot-matrix: repeating radial-gradient dot grid --- */
  .${p}fx-bg-dot-matrix {
    --ferrum-bg-dot-size: 2px;
    --ferrum-bg-dot-gap: 20px;
    --ferrum-bg-dot-color: rgba(99, 102, 241, 0.2);
    --ferrum-bg-dot-base: #0a0a1a;
    background-color: var(--ferrum-bg-dot-base);
    background-image:
      radial-gradient(circle, var(--ferrum-bg-dot-color) var(--ferrum-bg-dot-size), transparent var(--ferrum-bg-dot-size));
    background-size: var(--ferrum-bg-dot-gap) var(--ferrum-bg-dot-gap);
  }

  /* --- fx-bg-digital-rain: falling gradient lines --- */
  @keyframes ${p}fx-bg-rain-fall {
    0%   { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }
  @keyframes ${p}fx-bg-rain-fall-2 {
    0%   { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }
  .${p}fx-bg-digital-rain {
    --ferrum-rain-color: rgba(0, 255, 65, 0.15);
    --ferrum-rain-speed: 4s;
    --ferrum-rain-width: 2px;
    position: relative;
    overflow: hidden;
    background: #0a0a0a;
  }
  .${p}fx-bg-digital-rain::before {
    content: '';
    position: absolute;
    top: -100%;
    left: 15%;
    width: var(--ferrum-rain-width);
    height: 200%;
    background: repeating-linear-gradient(
      180deg,
      var(--ferrum-rain-color) 0px,
      transparent 8px,
      transparent 20px
    );
    animation: ${p}fx-bg-rain-fall var(--ferrum-rain-speed) linear infinite;
    box-shadow:
      calc(var(--ferrum-rain-width) * 15) 0 0 var(--ferrum-rain-color),
      calc(var(--ferrum-rain-width) * 30) 3px 0 var(--ferrum-rain-color),
      calc(var(--ferrum-rain-width) * 45) -2px 0 var(--ferrum-rain-color),
      calc(var(--ferrum-rain-width) * 60) 1px 0 var(--ferrum-rain-color),
      calc(var(--ferrum-rain-width) * 75) -1px 0 var(--ferrum-rain-color);
  }
  .${p}fx-bg-digital-rain::after {
    content: '';
    position: absolute;
    top: -100%;
    right: 20%;
    width: var(--ferrum-rain-width);
    height: 200%;
    background: repeating-linear-gradient(
      180deg,
      var(--ferrum-rain-color) 0px,
      transparent 12px,
      transparent 25px
    );
    animation: ${p}fx-bg-rain-fall-2 calc(var(--ferrum-rain-speed) * 1.3) linear infinite;
    animation-delay: -2s;
    box-shadow:
      calc(var(--ferrum-rain-width) * 12) 2px 0 var(--ferrum-rain-color),
      calc(var(--ferrum-rain-width) * 24) -3px 0 var(--ferrum-rain-color),
      calc(var(--ferrum-rain-width) * 36) 0px 0 var(--ferrum-rain-color),
      calc(var(--ferrum-rain-width) * 48) 1px 0 var(--ferrum-rain-color);
  }

  /* --- fx-bg-noise: animated grain texture --- */
  @keyframes ${p}fx-bg-noise-shift {
    0%   { transform: translate(0, 0); }
    10%  { transform: translate(-5%, -10%); }
    20%  { transform: translate(-15%, 5%); }
    30%  { transform: translate(7%, -25%); }
    40%  { transform: translate(-5%, 25%); }
    50%  { transform: translate(-15%, 10%); }
    60%  { transform: translate(15%, 0%); }
    70%  { transform: translate(0%, 15%); }
    80%  { transform: translate(3%, 35%); }
    90%  { transform: translate(-10%, 10%); }
    100% { transform: translate(0, 0); }
  }
  .${p}fx-bg-noise {
    --ferrum-noise-bg: #1a1a1a;
    --ferrum-noise-grain-opacity: 0.05;
    position: relative;
    overflow: hidden;
    background: var(--ferrum-noise-bg);
  }
  .${p}fx-bg-noise::before {
    content: '';
    position: absolute;
    inset: -200%;
    background-image:
      radial-gradient(ellipse at 20% 50%, rgba(128,128,128,var(--ferrum-noise-grain-opacity)) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 20%, rgba(128,128,128,var(--ferrum-noise-grain-opacity)) 0%, transparent 40%),
      radial-gradient(ellipse at 40% 80%, rgba(128,128,128,var(--ferrum-noise-grain-opacity)) 0%, transparent 45%),
      radial-gradient(ellipse at 60% 10%, rgba(128,128,128,var(--ferrum-noise-grain-opacity)) 0%, transparent 55%),
      radial-gradient(ellipse at 10% 90%, rgba(128,128,128,var(--ferrum-noise-grain-opacity)) 0%, transparent 35%),
      radial-gradient(ellipse at 90% 60%, rgba(128,128,128,var(--ferrum-noise-grain-opacity)) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 50%, rgba(128,128,128,var(--ferrum-noise-grain-opacity)) 0%, transparent 60%),
      radial-gradient(ellipse at 30% 30%, rgba(128,128,128,var(--ferrum-noise-grain-opacity)) 0%, transparent 42%);
    animation: ${p}fx-bg-noise-shift 0.8s steps(8) infinite;
    pointer-events: none;
  }

  /* --- fx-bg-morphing: border-radius keyframe animation on pseudo-elements --- */
  @keyframes ${p}fx-bg-morph-a {
    0%, 100% { border-radius: 40% 60% 60% 40% / 60% 30% 70% 40%; }
    25%      { border-radius: 50% 50% 30% 70% / 40% 60% 30% 60%; }
    50%      { border-radius: 30% 60% 70% 40% / 50% 40% 60% 50%; }
    75%      { border-radius: 60% 40% 30% 70% / 30% 70% 40% 60%; }
  }
  @keyframes ${p}fx-bg-morph-b {
    0%, 100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
    25%      { border-radius: 60% 40% 30% 70% / 60% 40% 60% 40%; }
    50%      { border-radius: 40% 60% 60% 40% / 70% 30% 70% 30%; }
    75%      { border-radius: 50% 50% 40% 60% / 40% 60% 40% 60%; }
  }
  .${p}fx-bg-morphing {
    --ferrum-morph-c1: rgba(99, 102, 241, 0.2);
    --ferrum-morph-c2: rgba(236, 72, 153, 0.18);
    position: relative;
    overflow: hidden;
    background: #0f0f1a;
  }
  .${p}fx-bg-morphing::before {
    content: '';
    position: absolute;
    width: 70%;
    height: 70%;
    top: 5%;
    left: 5%;
    background: var(--ferrum-morph-c1);
    filter: blur(50px);
    animation: ${p}fx-bg-morph-a 18s ease-in-out infinite;
  }
  .${p}fx-bg-morphing::after {
    content: '';
    position: absolute;
    width: 60%;
    height: 60%;
    bottom: 5%;
    right: 5%;
    background: var(--ferrum-morph-c2);
    filter: blur(50px);
    animation: ${p}fx-bg-morph-b 22s ease-in-out infinite;
  }

  /* --- fx-bg-nebula: multiple blurred radial-gradients with color --- */
  @keyframes ${p}fx-bg-nebula-drift {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
    33%      { transform: translate(20px, -15px) scale(1.05); opacity: 0.6; }
    66%      { transform: translate(-15px, 10px) scale(0.95); opacity: 0.4; }
  }
  .${p}fx-bg-nebula {
    --ferrum-nebula-c1: rgba(139, 92, 246, 0.25);
    --ferrum-nebula-c2: rgba(236, 72, 153, 0.2);
    --ferrum-nebula-c3: rgba(59, 130, 246, 0.18);
    --ferrum-nebula-c4: rgba(16, 185, 129, 0.15);
    position: relative;
    overflow: hidden;
    background: #070714;
  }
  .${p}fx-bg-nebula::before {
    content: '';
    position: absolute;
    inset: -20%;
    background:
      radial-gradient(ellipse 800px 600px at 20% 30%, var(--ferrum-nebula-c1), transparent),
      radial-gradient(ellipse 600px 800px at 80% 60%, var(--ferrum-nebula-c2), transparent),
      radial-gradient(ellipse 700px 500px at 50% 80%, var(--ferrum-nebula-c3), transparent),
      radial-gradient(ellipse 500px 700px at 70% 20%, var(--ferrum-nebula-c4), transparent);
    filter: blur(100px);
    animation: ${p}fx-bg-nebula-drift 30s ease-in-out infinite;
  }
  .${p}fx-bg-nebula::after {
    content: '';
    position: absolute;
    inset: -10%;
    background:
      radial-gradient(ellipse 400px 400px at 40% 50%, rgba(255, 255, 255, 0.03), transparent),
      radial-gradient(ellipse 300px 500px at 60% 40%, var(--ferrum-nebula-c1), transparent);
    filter: blur(60px);
    animation: ${p}fx-bg-nebula-drift 25s ease-in-out infinite reverse;
  }

  /* --- fx-bg-grid: subtle grid lines via linear-gradient repeat --- */
  .${p}fx-bg-grid {
    --ferrum-grid-color: rgba(99, 102, 241, 0.08);
    --ferrum-grid-size: 40px;
    --ferrum-grid-bg: #0a0a1a;
    background-color: var(--ferrum-grid-bg);
    background-image:
      linear-gradient(var(--ferrum-grid-color) 1px, transparent 1px),
      linear-gradient(90deg, var(--ferrum-grid-color) 1px, transparent 1px);
    background-size: var(--ferrum-grid-size) var(--ferrum-grid-size);
  }

  /* --- fx-bg-isometric-grid: isometric grid using 60deg linear-gradients --- */
  .${p}fx-bg-isometric-grid {
    --ferrum-iso-color: rgba(99, 102, 241, 0.1);
    --ferrum-iso-size: 40px;
    --ferrum-iso-bg: #0a0a1a;
    background-color: var(--ferrum-iso-bg);
    background-image:
      linear-gradient(120deg, var(--ferrum-iso-color) 25%, transparent 25.5%, transparent 75%, var(--ferrum-iso-color) 75%, var(--ferrum-iso-color)),
      linear-gradient(240deg, var(--ferrum-iso-color) 25%, transparent 25.5%, transparent 75%, var(--ferrum-iso-color) 75%, var(--ferrum-iso-color)),
      linear-gradient(0deg, var(--ferrum-iso-color) 1px, transparent 1px);
    background-size: calc(var(--ferrum-iso-size) * 1.732) var(--ferrum-iso-size), calc(var(--ferrum-iso-size) * 1.732) var(--ferrum-iso-size), calc(var(--ferrum-iso-size) * 1.732) var(--ferrum-iso-size);
    background-position: 0 0, calc(var(--ferrum-iso-size) * 0.866) calc(var(--ferrum-iso-size) * 0.5), 0 0;
  }

  /* --- fx-bg-neural-network: connected nodes pattern --- */
  .${p}fx-bg-neural-network {
    --ferrum-nn-node-color: rgba(99, 102, 241, 0.3);
    --ferrum-nn-line-color: rgba(99, 102, 241, 0.06);
    --ferrum-nn-bg: #0a0a1a;
    background-color: var(--ferrum-nn-bg);
    background-image:
      radial-gradient(circle, var(--ferrum-nn-node-color) 1.5px, transparent 1.5px),
      radial-gradient(circle, var(--ferrum-nn-node-color) 1px, transparent 1px),
      radial-gradient(circle, transparent 2px, var(--ferrum-nn-line-color) 2px, var(--ferrum-nn-line-color) 2.5px, transparent 2.5px);
    background-size:
      80px 80px,
      120px 60px,
      60px 100px;
    background-position: 0 0, 40px 30px, 20px 50px;
  }

  /* --- fx-bg-dynamic-grid: grid with animated line brightness --- */
  @keyframes ${p}fx-bg-grid-pulse {
    0%, 100% { opacity: 0.5; }
    50%      { opacity: 1; }
  }
  .${p}fx-bg-dynamic-grid {
    --ferrum-dynamic-grid-color: rgba(99, 102, 241, 0.12);
    --ferrum-dynamic-grid-size: 50px;
    --ferrum-dynamic-grid-bg: #0a0a1a;
    position: relative;
    background-color: var(--ferrum-dynamic-grid-bg);
    background-image:
      linear-gradient(var(--ferrum-dynamic-grid-color) 1px, transparent 1px),
      linear-gradient(90deg, var(--ferrum-dynamic-grid-color) 1px, transparent 1px);
    background-size: var(--ferrum-dynamic-grid-size) var(--ferrum-dynamic-grid-size);
    animation: ${p}fx-bg-grid-pulse 4s ease-in-out infinite;
  }
  .${p}fx-bg-dynamic-grid::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(90deg, transparent 49.5%, var(--ferrum-dynamic-grid-color) 49.5%, var(--ferrum-dynamic-grid-color) 50.5%, transparent 50.5%),
      linear-gradient(0deg, transparent 49.5%, var(--ferrum-dynamic-grid-color) 49.5%, var(--ferrum-dynamic-grid-color) 50.5%, transparent 50.5%);
    background-size: var(--ferrum-dynamic-grid-size) var(--ferrum-dynamic-grid-size);
    opacity: 0.5;
    animation: ${p}fx-bg-grid-pulse 6s ease-in-out infinite reverse;
  }

  /* --- fx-bg-topographic: topographic contour lines --- */
  .${p}fx-bg-topographic {
    --ferrum-topo-color: rgba(99, 102, 241, 0.08);
    --ferrum-topo-bg: #0a0a1a;
    position: relative;
    overflow: hidden;
    background: var(--ferrum-topo-bg);
  }
  .${p}fx-bg-topographic::before {
    content: '';
    position: absolute;
    inset: -20%;
    background:
      radial-gradient(ellipse 120px 80px at 25% 35%, transparent 40%, var(--ferrum-topo-color) 41%, transparent 42%),
      radial-gradient(ellipse 180px 120px at 25% 35%, transparent 50%, var(--ferrum-topo-color) 51%, transparent 52%),
      radial-gradient(ellipse 250px 170px at 25% 35%, transparent 60%, var(--ferrum-topo-color) 61%, transparent 62%),
      radial-gradient(ellipse 100px 70px at 70% 60%, transparent 38%, var(--ferrum-topo-color) 39%, transparent 40%),
      radial-gradient(ellipse 160px 110px at 70% 60%, transparent 48%, var(--ferrum-topo-color) 49%, transparent 50%),
      radial-gradient(ellipse 220px 150px at 70% 60%, transparent 58%, var(--ferrum-topo-color) 59%, transparent 60%),
      radial-gradient(ellipse 80px 60px at 50% 20%, transparent 35%, var(--ferrum-topo-color) 36%, transparent 37%),
      radial-gradient(ellipse 140px 100px at 50% 20%, transparent 45%, var(--ferrum-topo-color) 46%, transparent 47%);
  }

  /* --- fx-bg-circuit: circuit board pattern --- */
  .${p}fx-bg-circuit {
    --ferrum-circuit-line: rgba(0, 200, 255, 0.1);
    --ferrum-circuit-node: rgba(0, 200, 255, 0.25);
    --ferrum-circuit-bg: #0a0a1a;
    background-color: var(--ferrum-circuit-bg);
    background-image:
      linear-gradient(var(--ferrum-circuit-line) 1px, transparent 1px),
      linear-gradient(90deg, var(--ferrum-circuit-line) 1px, transparent 1px),
      radial-gradient(circle, var(--ferrum-circuit-node) 2px, transparent 2px);
    background-size:
      30px 30px,
      30px 30px,
      60px 60px;
    background-position: 0 0, 0 0, 15px 15px;
  }

  /* --- fx-bg-particles: floating particle background --- */
  @keyframes ${p}fx-bg-particle-float {
    0%, 100% { transform: translateY(0) translateX(0); opacity: 0.4; }
    25%      { transform: translateY(-15px) translateX(10px); opacity: 0.8; }
    50%      { transform: translateY(-5px) translateX(-8px); opacity: 0.5; }
    75%      { transform: translateY(-20px) translateX(5px); opacity: 0.9; }
  }
  .${p}fx-bg-particles {
    --ferrum-particle-color: rgba(99, 102, 241, 0.3);
    --ferrum-particle-bg: #0a0a1a;
    position: relative;
    overflow: hidden;
    background: var(--ferrum-particle-bg);
  }
  .${p}fx-bg-particles::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle 2px at 10% 20%, var(--ferrum-particle-color) 0%, transparent 100%),
      radial-gradient(circle 1.5px at 30% 50%, var(--ferrum-particle-color) 0%, transparent 100%),
      radial-gradient(circle 3px at 50% 30%, var(--ferrum-particle-color) 0%, transparent 100%),
      radial-gradient(circle 1px at 70% 70%, var(--ferrum-particle-color) 0%, transparent 100%),
      radial-gradient(circle 2px at 85% 40%, var(--ferrum-particle-color) 0%, transparent 100%),
      radial-gradient(circle 1.5px at 20% 80%, var(--ferrum-particle-color) 0%, transparent 100%),
      radial-gradient(circle 2px at 60% 15%, var(--ferrum-particle-color) 0%, transparent 100%),
      radial-gradient(circle 1px at 90% 85%, var(--ferrum-particle-color) 0%, transparent 100%);
    background-size: 200px 200px;
    animation: ${p}fx-bg-particle-float 12s ease-in-out infinite;
  }
  .${p}fx-bg-particles::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle 1.5px at 15% 40%, var(--ferrum-particle-color) 0%, transparent 100%),
      radial-gradient(circle 2px at 45% 65%, var(--ferrum-particle-color) 0%, transparent 100%),
      radial-gradient(circle 1px at 75% 25%, var(--ferrum-particle-color) 0%, transparent 100%),
      radial-gradient(circle 2.5px at 55% 85%, var(--ferrum-particle-color) 0%, transparent 100%),
      radial-gradient(circle 1px at 35% 10%, var(--ferrum-particle-color) 0%, transparent 100%);
    background-size: 180px 180px;
    animation: ${p}fx-bg-particle-float 15s ease-in-out infinite reverse;
  }

  /* --- fx-bg-gradient-shift: slowly shifting gradient background --- */
  @keyframes ${p}fx-bg-gradient-shift {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .${p}fx-bg-gradient-shift {
    --ferrum-shift-c1: #6366f1;
    --ferrum-shift-c2: #ec4899;
    --ferrum-shift-c3: #06b6d4;
    --ferrum-shift-duration: 10s;
    background: linear-gradient(
      -45deg,
      var(--ferrum-shift-c1),
      var(--ferrum-shift-c2),
      var(--ferrum-shift-c3),
      var(--ferrum-shift-c1)
    );
    background-size: 400% 400%;
    animation: ${p}fx-bg-gradient-shift var(--ferrum-shift-duration) ease infinite;
  }

  /* --- fx-bg-voronoi: Voronoi-like cell pattern approximation --- */
  .${p}fx-bg-voronoi {
    --ferrum-voronoi-color: rgba(99, 102, 241, 0.08);
    --ferrum-voronoi-border: rgba(99, 102, 241, 0.15);
    --ferrum-voronoi-bg: #0a0a1a;
    background-color: var(--ferrum-voronoi-bg);
    background-image:
      radial-gradient(circle 30px at 25% 25%, var(--ferrum-voronoi-color) 0%, var(--ferrum-voronoi-border) 95%, transparent 100%),
      radial-gradient(circle 25px at 75% 25%, var(--ferrum-voronoi-color) 0%, var(--ferrum-voronoi-border) 95%, transparent 100%),
      radial-gradient(circle 35px at 50% 60%, var(--ferrum-voronoi-color) 0%, var(--ferrum-voronoi-border) 95%, transparent 100%),
      radial-gradient(circle 20px at 15% 75%, var(--ferrum-voronoi-color) 0%, var(--ferrum-voronoi-border) 95%, transparent 100%),
      radial-gradient(circle 28px at 85% 70%, var(--ferrum-voronoi-color) 0%, var(--ferrum-voronoi-border) 95%, transparent 100%);
    background-size: 100px 100px;
  }

}`;
}