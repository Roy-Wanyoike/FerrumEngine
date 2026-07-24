/* ===== Ferrum VFX — Composition System ===== */
/* Enable combining multiple VFX effects via class names and data attributes */

export function generateCompositionCSS(prefix: string = 'fr-'): string {
  const p = prefix;

  return `@layer ferrum.vfx {

  /* --- fx-compose-glass-light: combines glass + lighting --- */
  .${p}fx-compose-glass-light {
    --ferrum-glass-bg: rgba(255, 255, 255, 0.08);
    --ferrum-glass-border: rgba(255, 255, 255, 0.12);
    --ferrum-glass-blur: 16px;
    background:
      radial-gradient(ellipse at 30% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 60%),
      var(--ferrum-glass-bg);
    border: 1px solid var(--ferrum-glass-border);
    backdrop-filter: blur(var(--ferrum-glass-blur)) saturate(120%);
    -webkit-backdrop-filter: blur(var(--ferrum-glass-blur)) saturate(120%);
    box-shadow:
      0 4px 16px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }

  /* --- fx-compose-glass-glow: combines glass + neon glow --- */
  .${p}fx-compose-glass-glow {
    --ferrum-glow-compose-color: rgba(99, 102, 241, 0.5);
    --ferrum-glass-bg: rgba(255, 255, 255, 0.06);
    --ferrum-glass-border: rgba(99, 102, 241, 0.3);
    background: var(--ferrum-glass-bg);
    border: 1px solid var(--ferrum-glass-border);
    backdrop-filter: blur(16px) saturate(140%);
    -webkit-backdrop-filter: blur(16px) saturate(140%);
    box-shadow:
      0 0 15px 5px var(--ferrum-glow-compose-color),
      inset 0 0 15px rgba(99, 102, 241, 0.05);
  }

  /* --- fx-compose-glass-cursor: combines glass + cursor spotlight --- */
  .${p}fx-compose-glass-cursor {
    --ferrum-cursor-x: 50%;
    --ferrum-cursor-y: 50%;
    --ferrum-glass-bg: rgba(255, 255, 255, 0.06);
    --ferrum-glass-border: rgba(255, 255, 255, 0.1);
    background: var(--ferrum-glass-bg);
    border: 1px solid var(--ferrum-glass-border);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    position: relative;
    overflow: hidden;
  }
  .${p}fx-compose-glass-cursor::before {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    left: var(--ferrum-cursor-x);
    top: var(--ferrum-cursor-y);
    transform: translate(-50%, -50%);
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    pointer-events: none;
    z-index: 1;
    transition: left 0.15s ease-out, top 0.15s ease-out;
  }

  /* --- fx-compose-liquid-glass: combines liquid + glass --- */
  @keyframes ${p}fx-compose-liquid-glass-1 {
    0%, 100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
    33%      { border-radius: 58% 42% 32% 68% / 63% 28% 72% 37%; }
    66%      { border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%; }
  }
  .${p}fx-compose-liquid-glass {
    --ferrum-glass-bg: rgba(255, 255, 255, 0.07);
    --ferrum-glass-border: rgba(255, 255, 255, 0.15);
    background: var(--ferrum-glass-bg);
    border: 1px solid var(--ferrum-glass-border);
    backdrop-filter: blur(14px) saturate(130%);
    -webkit-backdrop-filter: blur(14px) saturate(130%);
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.12),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    animation: ${p}fx-compose-liquid-glass-1 8s ease-in-out infinite;
  }

  /* --- fx-compose-shadow-neon: combines shadow + neon --- */
  .${p}fx-compose-shadow-neon {
    --ferrum-neon-compose-color: #0ff;
    --ferrum-neon-compose-intensity: 1;
    box-shadow:
      0 4px 14px rgba(0, 0, 0, 0.15),
      0 0 calc(5px * var(--ferrum-neon-compose-intensity)) var(--ferrum-neon-compose-color),
      0 0 calc(15px * var(--ferrum-neon-compose-intensity)) var(--ferrum-neon-compose-color),
      0 0 calc(30px * var(--ferrum-neon-compose-intensity)) rgba(0, 255, 255, 0.3);
    border: 1px solid var(--ferrum-neon-compose-color);
    transition: box-shadow 0.3s ease;
  }
  .${p}fx-compose-shadow-neon:hover {
    --ferrum-neon-compose-intensity: 1.4;
  }

  /* --- fx-compose-surface-metal: combines surface + material --- */
  .${p}fx-compose-surface-metal {
    --ferrum-metal-bg: linear-gradient(
      160deg,
      rgba(255, 255, 255, 0.12) 0%,
      rgba(255, 255, 255, 0.04) 20%,
      transparent 50%,
      rgba(0, 0, 0, 0.08) 100%
    );
    --ferrum-metal-brush: repeating-linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.04) 0px,
      transparent 1px,
      transparent 3px
    );
    background:
      var(--ferrum-metal-bg),
      var(--ferrum-metal-brush);
    box-shadow:
      0 1px 2px rgba(0, 0, 0, 0.1),
      0 4px 8px rgba(0, 0, 0, 0.08),
      0 12px 24px rgba(0, 0, 0, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  /* --- fx-compose-bg-aurora: combines background + aurora --- */
  @keyframes ${p}fx-compose-aurora-shift {
    0%   { transform: translateX(0) rotate(0deg); }
    50%  { transform: translateX(-20%) rotate(180deg); }
    100% { transform: translateX(0) rotate(360deg); }
  }
  .${p}fx-compose-bg-aurora {
    --ferrum-compose-aurora-c1: rgba(99, 102, 241, 0.3);
    --ferrum-compose-aurora-c2: rgba(236, 72, 153, 0.2);
    --ferrum-compose-aurora-c3: rgba(6, 182, 212, 0.25);
    position: relative;
    overflow: hidden;
    background: linear-gradient(180deg, #0a0a1a 0%, #111128 100%);
    border: 1px solid rgba(99, 102, 241, 0.2);
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.15);
  }
  .${p}fx-compose-bg-aurora::before {
    content: '';
    position: absolute;
    inset: -50%;
    background:
      conic-gradient(from 0deg at 50% 50%, var(--ferrum-compose-aurora-c1), var(--ferrum-compose-aurora-c2), var(--ferrum-compose-aurora-c3), var(--ferrum-compose-aurora-c1));
    filter: blur(100px);
    animation: ${p}fx-compose-aurora-shift 12s linear infinite;
  }
  .${p}fx-compose-bg-aurora::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 0%, rgba(10, 10, 26, 0.5) 50%, transparent 100%);
  }

  /* ===== Data-attribute compositions ===== */

  /* --- [data-fr-fx~="glass+glow"] --- */
  [data-${p}fx~="glass+glow"] {
    --ferrum-glass-bg: rgba(255, 255, 255, 0.06);
    --ferrum-glass-border: rgba(99, 102, 241, 0.3);
    --ferrum-glow-compose-color: rgba(99, 102, 241, 0.5);
    background: var(--ferrum-glass-bg);
    border: 1px solid var(--ferrum-glass-border);
    backdrop-filter: blur(16px) saturate(140%);
    -webkit-backdrop-filter: blur(16px) saturate(140%);
    box-shadow:
      0 0 15px 5px var(--ferrum-glow-compose-color),
      inset 0 0 15px rgba(99, 102, 241, 0.05);
  }

  /* --- [data-fr-fx~="glass+cursor"] --- */
  [data-${p}fx~="glass+cursor"] {
    --ferrum-cursor-x: 50%;
    --ferrum-cursor-y: 50%;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    position: relative;
    overflow: hidden;
  }
  [data-${p}fx~="glass+cursor"]::before {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    left: var(--ferrum-cursor-x);
    top: var(--ferrum-cursor-y);
    transform: translate(-50%, -50%);
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    pointer-events: none;
    z-index: 1;
    transition: left 0.15s ease-out, top 0.15s ease-out;
  }

  /* --- [data-fr-fx~="liquid+glass"] --- */
  [data-${p}fx~="liquid+glass"] {
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(14px) saturate(130%);
    -webkit-backdrop-filter: blur(14px) saturate(130%);
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.12),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }

  /* --- [data-fr-fx~="shadow+neon"] --- */
  [data-${p}fx~="shadow+neon"] {
    --ferrum-neon-compose-color: #0ff;
    box-shadow:
      0 4px 14px rgba(0, 0, 0, 0.15),
      0 0 5px var(--ferrum-neon-compose-color),
      0 0 15px var(--ferrum-neon-compose-color),
      0 0 30px rgba(0, 255, 255, 0.3);
    border: 1px solid var(--ferrum-neon-compose-color);
  }

  /* --- [data-fr-fx~="surface+metal"] --- */
  [data-${p}fx~="surface+metal"] {
    background:
      linear-gradient(160deg, rgba(255,255,255,0.12) 0%, transparent 50%, rgba(0,0,0,0.08) 100%),
      repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0px, transparent 1px, transparent 3px);
    box-shadow:
      0 1px 2px rgba(0, 0, 0, 0.1),
      0 4px 8px rgba(0, 0, 0, 0.08),
      0 12px 24px rgba(0, 0, 0, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  /* ===== Extended Compositions (12 new) ===== */

  /* --- fx-compose-aurora-glass: aurora background + glass morphism overlay --- */
  @keyframes ${p}fx-aurora-glass-drift {
    0%   { transform: translateX(0) rotate(0deg) scale(1); }
    33%  { transform: translateX(15%) rotate(120deg) scale(1.1); }
    66%  { transform: translateX(-10%) rotate(240deg) scale(0.95); }
    100% { transform: translateX(0) rotate(360deg) scale(1); }
  }
  .${p}fx-compose-aurora-glass {
    --ferrum-aurora-glass-c1: rgba(99, 102, 241, 0.25);
    --ferrum-aurora-glass-c2: rgba(236, 72, 153, 0.18);
    --ferrum-aurora-glass-c3: rgba(6, 182, 212, 0.22);
    --ferrum-aurora-glass-c4: rgba(16, 185, 129, 0.15);
    --ferrum-aurora-glass-blur: 20px;
    --ferrum-aurora-glass-opacity: 0.08;
    position: relative;
    overflow: hidden;
    background: rgba(255, 255, 255, var(--ferrum-aurora-glass-opacity));
    border: 1px solid rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(var(--ferrum-aurora-glass-blur)) saturate(150%);
    -webkit-backdrop-filter: blur(var(--ferrum-aurora-glass-blur)) saturate(150%);
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.12),
      inset 0 1px 0 rgba(255, 255, 255, 0.12);
  }
  .${p}fx-compose-aurora-glass::before {
    content: '';
    position: absolute;
    inset: -60%;
    background:
      conic-gradient(from 45deg at 50% 50%, var(--ferrum-aurora-glass-c1), var(--ferrum-aurora-glass-c2), var(--ferrum-aurora-glass-c3), var(--ferrum-aurora-glass-c4), var(--ferrum-aurora-glass-c1));
    filter: blur(80px);
    animation: ${p}fx-aurora-glass-drift 15s ease-in-out infinite;
    opacity: 0.6;
  }
  .${p}fx-compose-aurora-glass::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 30% 20%, rgba(255, 255, 255, 0.08) 0%, transparent 50%);
    pointer-events: none;
  }

  /* --- fx-compose-neon-shadow: neon border glow + premium shadow --- */
  @keyframes ${p}fx-neon-shadow-pulse {
    0%, 100% { opacity: 1; }
    50%      { opacity: 0.7; }
  }
  .${p}fx-compose-neon-shadow {
    --ferrum-neon-shadow-color: #a855f7;
    --ferrum-neon-shadow-spread: 1;
    --ferrum-neon-shadow-intensity: 0.6;
    border: 1.5px solid var(--ferrum-neon-shadow-color);
    box-shadow:
      0 4px 6px rgba(0, 0, 0, 0.1),
      0 10px 20px rgba(0, 0, 0, 0.08),
      0 20px 40px rgba(0, 0, 0, 0.05),
      0 0 calc(6px * var(--ferrum-neon-shadow-spread)) var(--ferrum-neon-shadow-color),
      0 0 calc(18px * var(--ferrum-neon-shadow-spread)) var(--ferrum-neon-shadow-color),
      0 0 calc(40px * var(--ferrum-neon-shadow-spread)) rgba(168, 85, 247, var(--ferrum-neon-shadow-intensity)),
      0 0 calc(80px * var(--ferrum-neon-shadow-spread)) rgba(168, 85, 247, calc(var(--ferrum-neon-shadow-intensity) * 0.4)),
      inset 0 0 20px rgba(168, 85, 247, 0.05);
    animation: ${p}fx-neon-shadow-pulse 3s ease-in-out infinite;
    transition: box-shadow 0.3s ease, border-color 0.3s ease;
  }
  .${p}fx-compose-neon-shadow:hover {
    --ferrum-neon-shadow-spread: 1.5;
    --ferrum-neon-shadow-intensity: 0.8;
  }

  /* --- fx-compose-liquid-energy: liquid morph border + energy pulse --- */
  @keyframes ${p}fx-liquid-energy-morph {
    0%, 100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
    25%      { border-radius: 58% 42% 32% 68% / 63% 28% 72% 37%; }
    50%      { border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%; }
    75%      { border-radius: 42% 58% 68% 32% / 37% 72% 28% 63%; }
  }
  @keyframes ${p}fx-liquid-energy-pulse {
    0%, 100% { box-shadow: 0 0 10px rgba(6, 182, 212, 0.3), 0 0 30px rgba(6, 182, 212, 0.1); }
    50%      { box-shadow: 0 0 20px rgba(6, 182, 212, 0.5), 0 0 50px rgba(6, 182, 212, 0.2), 0 0 80px rgba(6, 182, 212, 0.08); }
  }
  .${p}fx-compose-liquid-energy {
    --ferrum-liquid-energy-color: rgba(6, 182, 212, 0.5);
    --ferrum-liquid-energy-speed: 8s;
    --ferrum-liquid-energy-pulse-speed: 2.5s;
    background: rgba(6, 182, 212, 0.05);
    border: 2px solid var(--ferrum-liquid-energy-color);
    animation:
      ${p}fx-liquid-energy-morph var(--ferrum-liquid-energy-speed) ease-in-out infinite,
      ${p}fx-liquid-energy-pulse var(--ferrum-liquid-energy-pulse-speed) ease-in-out infinite;
    position: relative;
    overflow: hidden;
  }
  .${p}fx-compose-liquid-energy::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: inherit;
    background: conic-gradient(from 0deg, transparent, var(--ferrum-liquid-energy-color), transparent, var(--ferrum-liquid-energy-color), transparent);
    z-index: -1;
    filter: blur(8px);
    animation: ${p}fx-liquid-energy-morph var(--ferrum-liquid-energy-speed) ease-in-out infinite reverse;
  }

  /* --- fx-compose-frost-cursor: frosted glass + cursor spotlight --- */
  .${p}fx-compose-frost-cursor {
    --ferrum-frost-cursor-x: 50%;
    --ferrum-frost-cursor-y: 50%;
    --ferrum-frost-blur: 18px;
    --ferrum-frost-spread: 200px;
    --ferrum-frost-bg: rgba(255, 255, 255, 0.05);
    position: relative;
    overflow: hidden;
    background: var(--ferrum-frost-bg);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(var(--ferrum-frost-blur)) saturate(130%);
    -webkit-backdrop-filter: blur(var(--ferrum-frost-blur)) saturate(130%);
    box-shadow:
      0 4px 24px rgba(0, 0, 0, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.06);
  }
  .${p}fx-compose-frost-cursor::before {
    content: '';
    position: absolute;
    width: var(--ferrum-frost-spread);
    height: var(--ferrum-frost-spread);
    left: var(--ferrum-frost-cursor-x);
    top: var(--ferrum-frost-cursor-y);
    transform: translate(-50%, -50%);
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(255, 255, 255, 0.06) 30%,
      transparent 70%
    );
    pointer-events: none;
    z-index: 1;
    transition: left 0.1s ease-out, top 0.1s ease-out;
  }
  .${p}fx-compose-frost-cursor::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 20% 0%, rgba(255,255,255,0.1) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 100%, rgba(255,255,255,0.05) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }

  /* --- fx-compose-carbon-glow: carbon fiber surface + edge glow --- */
  .${p}fx-compose-carbon-glow {
    --ferrum-carbon-glow-color: rgba(249, 115, 22, 0.5);
    --ferrum-carbon-glow-intensity: 1;
    --ferrum-carbon-cell: 4px;
    position: relative;
    background:
      repeating-conic-gradient(rgba(255,255,255,0.03) 0% 25%, transparent 0% 50%) 0 0 / calc(var(--ferrum-carbon-cell) * 2) calc(var(--ferrum-carbon-cell) * 2),
      linear-gradient(135deg, rgba(40,40,40,0.9) 0%, rgba(20,20,20,0.95) 50%, rgba(35,35,35,0.9) 100%);
    border: 1px solid rgba(255, 255, 255, 0.06);
    box-shadow:
      0 2px 8px rgba(0, 0, 0, 0.3),
      0 8px 24px rgba(0, 0, 0, 0.2),
      inset 0 0 0 1px rgba(255, 255, 255, 0.03),
      0 0 calc(4px * var(--ferrum-carbon-glow-intensity)) var(--ferrum-carbon-glow-color),
      0 0 calc(12px * var(--ferrum-carbon-glow-intensity)) var(--ferrum-carbon-glow-color);
  }
  .${p}fx-compose-carbon-glow::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      160deg,
      rgba(255, 255, 255, 0.08) 0%,
      transparent 40%,
      transparent 60%,
      rgba(0, 0, 0, 0.1) 100%
    );
    pointer-events: none;
  }

  /* --- fx-compose-chrome-shadow: chrome material + multi-layer shadow --- */
  .${p}fx-compose-chrome-shadow {
    --ferrum-chrome-angle: 160deg;
    --ferrum-chrome-shadow-color: rgba(0, 0, 0, 0.2);
    background:
      linear-gradient(
        var(--ferrum-chrome-angle),
        rgba(200, 200, 210, 0.25) 0%,
        rgba(255, 255, 255, 0.15) 15%,
        rgba(255, 255, 255, 0.03) 25%,
        transparent 45%,
        rgba(0, 0, 0, 0.02) 55%,
        rgba(0, 0, 0, 0.06) 80%,
        rgba(0, 0, 0, 0.12) 100%
      ),
      linear-gradient(
        calc(var(--ferrum-chrome-angle) + 90deg),
        rgba(255, 255, 255, 0.04) 0%,
        transparent 50%,
        rgba(255, 255, 255, 0.02) 100%
      );
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow:
      0 1px 2px var(--ferrum-chrome-shadow-color),
      0 2px 4px var(--ferrum-chrome-shadow-color),
      0 4px 8px var(--ferrum-chrome-shadow-color),
      0 8px 16px var(--ferrum-chrome-shadow-color),
      0 16px 32px var(--ferrum-chrome-shadow-color),
      0 32px 64px rgba(0, 0, 0, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.15),
      inset 0 -1px 0 rgba(0, 0, 0, 0.05);
    transition: box-shadow 0.4s ease, background 0.4s ease;
  }
  .${p}fx-compose-chrome-shadow:hover {
    --ferrum-chrome-angle: 170deg;
  }

  /* --- fx-compose-mesh-glass: mesh gradient background + glass overlay --- */
  @keyframes ${p}fx-mesh-glass-flow {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .${p}fx-compose-mesh-glass {
    --ferrum-mesh-glass-c1: rgba(236, 72, 153, 0.2);
    --ferrum-mesh-glass-c2: rgba(99, 102, 241, 0.2);
    --ferrum-mesh-glass-c3: rgba(6, 182, 212, 0.2);
    --ferrum-mesh-glass-c4: rgba(234, 179, 8, 0.15);
    --ferrum-mesh-glass-blur: 14px;
    --ferrum-mesh-glass-speed: 12s;
    position: relative;
    overflow: hidden;
    background:
      radial-gradient(ellipse at 20% 30%, var(--ferrum-mesh-glass-c1) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 20%, var(--ferrum-mesh-glass-c2) 0%, transparent 50%),
      radial-gradient(ellipse at 60% 80%, var(--ferrum-mesh-glass-c3) 0%, transparent 50%),
      radial-gradient(ellipse at 10% 70%, var(--ferrum-mesh-glass-c4) 0%, transparent 50%),
      rgba(255, 255, 255, 0.05);
    background-size: 200% 200%;
    animation: ${p}fx-mesh-glass-flow var(--ferrum-mesh-glass-speed) ease-in-out infinite;
    border: 1px solid rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(var(--ferrum-mesh-glass-blur)) saturate(140%);
    -webkit-backdrop-filter: blur(var(--ferrum-mesh-glass-blur)) saturate(140%);
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
  .${p}fx-compose-mesh-glass::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 35% 15%, rgba(255,255,255,0.1) 0%, transparent 50%);
    pointer-events: none;
  }

  /* --- fx-compose-energy-border: energy scan line + animated gradient border --- */
  @keyframes ${p}fx-energy-scan {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(200%); }
  }
  @keyframes ${p}fx-energy-border-rotate {
    0%   { --ferrum-energy-border-angle: 0deg; }
    100% { --ferrum-energy-border-angle: 360deg; }
  }
  .${p}fx-compose-energy-border {
    --ferrum-energy-border-c1: #3b82f6;
    --ferrum-energy-border-c2: #8b5cf6;
    --ferrum-energy-border-c3: #06b6d4;
    --ferrum-energy-border-angle: 0deg;
    --ferrum-energy-border-speed: 3s;
    position: relative;
    background: rgba(0, 0, 0, 0.3);
    border: 2px solid transparent;
    background-clip: padding-box;
    box-shadow:
      0 4px 16px rgba(0, 0, 0, 0.15),
      0 0 15px rgba(59, 130, 246, 0.15);
  }
  .${p}fx-compose-energy-border::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: inherit;
    background: conic-gradient(
      from var(--ferrum-energy-border-angle),
      var(--ferrum-energy-border-c1),
      var(--ferrum-energy-border-c2),
      var(--ferrum-energy-border-c3),
      var(--ferrum-energy-border-c1)
    );
    z-index: -2;
    animation: ${p}fx-energy-border-rotate var(--ferrum-energy-border-speed) linear infinite;
  }
  .${p}fx-compose-energy-border::after {
    content: '';
    position: absolute;
    top: -1px;
    left: -100%;
    width: 50%;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--ferrum-energy-border-c2), transparent);
    z-index: 2;
    animation: ${p}fx-energy-scan 2s ease-in-out infinite;
    filter: brightness(1.5);
  }

  /* --- fx-compose-velvet-shadow: velvet surface + soft colored shadow --- */
  .${p}fx-compose-velvet-shadow {
    --ferrum-velvet-color: rgba(168, 85, 247, 0.4);
    --ferrum-velvet-depth: rgba(88, 28, 135, 0.15);
    --ferrum-velvet-sheen-angle: 135deg;
    background:
      radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.06) 0%, transparent 50%),
      linear-gradient(var(--ferrum-velvet-sheen-angle), rgba(0,0,0,0.02) 0%, transparent 50%, rgba(0,0,0,0.04) 100%),
      linear-gradient(180deg, #1a1025 0%, #0f0a18 100%);
    border: 1px solid rgba(168, 85, 247, 0.1);
    box-shadow:
      0 4px 12px var(--ferrum-velvet-depth),
      0 12px 32px var(--ferrum-velvet-depth),
      0 24px 64px var(--ferrum-velvet-color),
      inset 0 1px 0 rgba(255, 255, 255, 0.04);
    transition: box-shadow 0.4s ease, border-color 0.4s ease;
  }
  .${p}fx-compose-velvet-shadow:hover {
    --ferrum-velvet-color: rgba(168, 85, 247, 0.5);
    box-shadow:
      0 4px 12px var(--ferrum-velvet-depth),
      0 12px 32px var(--ferrum-velvet-depth),
      0 24px 64px var(--ferrum-velvet-color),
      0 48px 96px rgba(168, 85, 247, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.06);
    border-color: rgba(168, 85, 247, 0.2);
  }

  /* --- fx-compose-storm-atmos: storm atmosphere + dynamic blur --- */
  @keyframes ${p}fx-storm-flash {
    0%, 92%, 100% { opacity: 0; }
    93%           { opacity: 0.4; }
    94%           { opacity: 0.1; }
    95%           { opacity: 0.6; }
    96%           { opacity: 0; }
  }
  @keyframes ${p}fx-storm-shake {
    0%, 100% { transform: translate(0, 0); }
    10%      { transform: translate(-1px, 1px); }
    30%      { transform: translate(1px, -1px); }
    50%      { transform: translate(-1px, 0px); }
    70%      { transform: translate(1px, 1px); }
    90%      { transform: translate(0px, -1px); }
  }
  .${p}fx-compose-storm-atmos {
    --ferrum-storm-blur: 12px;
    --ferrum-storm-cycle: 8s;
    --ferrum-storm-cloud-color: rgba(100, 116, 139, 0.3);
    position: relative;
    overflow: hidden;
    background:
      radial-gradient(ellipse at 70% 20%, var(--ferrum-storm-cloud-color) 0%, transparent 40%),
      radial-gradient(ellipse at 20% 60%, var(--ferrum-storm-cloud-color) 0%, transparent 35%),
      linear-gradient(180deg, #0c1220 0%, #1a1a2e 40%, #16213e 100%);
    border: 1px solid rgba(100, 116, 139, 0.15);
    backdrop-filter: blur(var(--ferrum-storm-blur));
    -webkit-backdrop-filter: blur(var(--ferrum-storm-blur));
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.2),
      inset 0 0 40px rgba(0, 0, 0, 0.1);
    animation: ${p}fx-storm-shake var(--ferrum-storm-cycle) ease-in-out infinite;
  }
  .${p}fx-compose-storm-atmos::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.03);
    animation: ${p}fx-storm-flash var(--ferrum-storm-cycle) ease-in-out infinite;
    pointer-events: none;
    z-index: 2;
  }
  .${p}fx-compose-storm-atmos::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.15), transparent);
    pointer-events: none;
  }

  /* --- fx-compose-holographic-border: holographic surface + aurora border --- */
  @keyframes ${p}fx-holo-border-shift {
    0%   { filter: hue-rotate(0deg) brightness(1); }
    33%  { filter: hue-rotate(60deg) brightness(1.1); }
    66%  { filter: hue-rotate(-30deg) brightness(0.95); }
    100% { filter: hue-rotate(0deg) brightness(1); }
  }
  .${p}fx-compose-holographic-border {
    --ferrum-holo-c1: rgba(255, 0, 128, 0.4);
    --ferrum-holo-c2: rgba(0, 255, 200, 0.4);
    --ferrum-holo-c3: rgba(128, 0, 255, 0.4);
    --ferrum-holo-c4: rgba(255, 200, 0, 0.3);
    --ferrum-holo-speed: 6s;
    position: relative;
    background:
      repeating-linear-gradient(
        45deg,
        rgba(255,255,255,0.02) 0px,
        transparent 1px,
        transparent 4px
      ),
      linear-gradient(
        135deg,
        rgba(255, 0, 128, 0.05) 0%,
        rgba(0, 255, 200, 0.05) 33%,
        rgba(128, 0, 255, 0.05) 66%,
        rgba(255, 200, 0, 0.03) 100%
      );
    border: 2px solid transparent;
    background-clip: padding-box;
    box-shadow:
      0 4px 20px rgba(0, 0, 0, 0.15),
      0 0 20px rgba(255, 0, 128, 0.08);
  }
  .${p}fx-compose-holographic-border::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: inherit;
    background: conic-gradient(
      from 0deg,
      var(--ferrum-holo-c1),
      var(--ferrum-holo-c2),
      var(--ferrum-holo-c3),
      var(--ferrum-holo-c4),
      var(--ferrum-holo-c1)
    );
    z-index: -2;
    animation: ${p}fx-holo-border-shift var(--ferrum-holo-speed) ease-in-out infinite;
  }
  .${p}fx-compose-holographic-border::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%);
    z-index: -1;
  }

  /* --- fx-compose-cursor-magnetic: cursor glow + magnetic pull effect --- */
  @keyframes ${p}fx-magnetic-breathe {
    0%, 100% { box-shadow: 0 0 0px transparent, 0 4px 16px rgba(0,0,0,0.1); }
    50%      { box-shadow: 0 0 25px rgba(99, 102, 241, 0.15), 0 4px 16px rgba(0,0,0,0.1); }
  }
  .${p}fx-compose-cursor-magnetic {
    --ferrum-magnetic-cursor-x: 50%;
    --ferrum-magnetic-cursor-y: 50%;
    --ferrum-magnetic-pull: 8px;
    --ferrum-magnetic-glow-color: rgba(99, 102, 241, 0.35);
    --ferrum-magnetic-glow-size: 250px;
    position: relative;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    transform: translate(
      calc((var(--ferrum-magnetic-cursor-x) - 50%) * 0.02 * var(--ferrum-magnetic-pull)),
      calc((var(--ferrum-magnetic-cursor-y) - 50%) * 0.02 * var(--ferrum-magnetic-pull))
    );
    transition: transform 0.25s cubic-bezier(0.23, 1, 0.32, 1);
    animation: ${p}fx-magnetic-breathe 4s ease-in-out infinite;
  }
  .${p}fx-compose-cursor-magnetic::before {
    content: '';
    position: absolute;
    width: var(--ferrum-magnetic-glow-size);
    height: var(--ferrum-magnetic-glow-size);
    left: var(--ferrum-magnetic-cursor-x);
    top: var(--ferrum-magnetic-cursor-y);
    transform: translate(-50%, -50%);
    background: radial-gradient(
      circle,
      var(--ferrum-magnetic-glow-color) 0%,
      rgba(99, 102, 241, 0.08) 40%,
      transparent 70%
    );
    pointer-events: none;
    z-index: 1;
    transition: left 0.2s ease-out, top 0.2s ease-out;
  }
  .${p}fx-compose-cursor-magnetic::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.06) 0%, transparent 60%);
    pointer-events: none;
    z-index: 0;
  }

  /* ===== Extended Data-Attribute Compositions (7 new) ===== */

  /* --- [data-fr-fx~="neon+shadow"] --- */
  [data-${p}fx~="neon+shadow"] {
    --ferrum-neon-compose-color: #a855f7;
    box-shadow:
      0 4px 14px rgba(0, 0, 0, 0.15),
      0 10px 20px rgba(0, 0, 0, 0.08),
      0 20px 40px rgba(0, 0, 0, 0.05),
      0 0 6px var(--ferrum-neon-compose-color),
      0 0 18px var(--ferrum-neon-compose-color),
      0 0 40px rgba(168, 85, 247, 0.3);
    border: 1.5px solid var(--ferrum-neon-compose-color);
    transition: box-shadow 0.3s ease;
  }

  /* --- [data-fr-fx~="liquid+energy"] --- */
  @keyframes ${p}fx-da-liquid-energy-morph {
    0%, 100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
    33%      { border-radius: 58% 42% 32% 68% / 63% 28% 72% 37%; }
    66%      { border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%; }
  }
  [data-${p}fx~="liquid+energy"] {
    background: rgba(6, 182, 212, 0.05);
    border: 2px solid rgba(6, 182, 212, 0.5);
    box-shadow: 0 0 20px rgba(6, 182, 212, 0.3), 0 0 50px rgba(6, 182, 212, 0.1);
    animation: ${p}fx-da-liquid-energy-morph 8s ease-in-out infinite;
  }

  /* --- [data-fr-fx~="frost+cursor"] --- */
  [data-${p}fx~="frost+cursor"] {
    --ferrum-frost-cursor-x: 50%;
    --ferrum-frost-cursor-y: 50%;
    position: relative;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(18px) saturate(130%);
    -webkit-backdrop-filter: blur(18px) saturate(130%);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  }
  [data-${p}fx~="frost+cursor"]::before {
    content: '';
    position: absolute;
    width: 200px;
    height: 200px;
    left: var(--ferrum-frost-cursor-x);
    top: var(--ferrum-frost-cursor-y);
    transform: translate(-50%, -50%);
    background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%);
    pointer-events: none;
    z-index: 1;
    transition: left 0.1s ease-out, top 0.1s ease-out;
  }

  /* --- [data-fr-fx~="carbon+glow"] --- */
  [data-${p}fx~="carbon+glow"] {
    background:
      repeating-conic-gradient(rgba(255,255,255,0.03) 0% 25%, transparent 0% 50%) 0 0 / 8px 8px,
      linear-gradient(135deg, rgba(40,40,40,0.9) 0%, rgba(20,20,20,0.95) 100%);
    border: 1px solid rgba(255, 255, 255, 0.06);
    box-shadow:
      0 2px 8px rgba(0, 0, 0, 0.3),
      0 0 4px rgba(249, 115, 22, 0.5),
      0 0 12px rgba(249, 115, 22, 0.5);
  }

  /* --- [data-fr-fx~="mesh+glass"] --- */
  @keyframes ${p}fx-da-mesh-glass-flow {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  [data-${p}fx~="mesh+glass"] {
    position: relative;
    overflow: hidden;
    background:
      radial-gradient(ellipse at 20% 30%, rgba(236, 72, 153, 0.2) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 20%, rgba(99, 102, 241, 0.2) 0%, transparent 50%),
      radial-gradient(ellipse at 60% 80%, rgba(6, 182, 212, 0.2) 0%, transparent 50%),
      rgba(255, 255, 255, 0.05);
    background-size: 200% 200%;
    animation: ${p}fx-da-mesh-glass-flow 12s ease-in-out infinite;
    border: 1px solid rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(14px) saturate(140%);
    -webkit-backdrop-filter: blur(14px) saturate(140%);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }

  /* --- [data-fr-fx~="chrome+shadow"] --- */
  [data-${p}fx~="chrome+shadow"] {
    background:
      linear-gradient(160deg, rgba(200,200,210,0.25) 0%, rgba(255,255,255,0.15) 15%, transparent 45%, rgba(0,0,0,0.12) 100%);
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow:
      0 1px 2px rgba(0,0,0,0.2),
      0 2px 4px rgba(0,0,0,0.2),
      0 4px 8px rgba(0,0,0,0.2),
      0 8px 16px rgba(0,0,0,0.2),
      0 16px 32px rgba(0,0,0,0.2),
      0 32px 64px rgba(0,0,0,0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
  }

  /* --- [data-fr-fx~="holographic+border"] --- */
  @keyframes ${p}fx-da-holo-shift {
    0%   { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }
  [data-${p}fx~="holographic+border"] {
    position: relative;
    border: 2px solid transparent;
    background-clip: padding-box;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  }
  [data-${p}fx~="holographic+border"]::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: inherit;
    background: conic-gradient(from 0deg, rgba(255,0,128,0.4), rgba(0,255,200,0.4), rgba(128,0,255,0.4), rgba(255,200,0,0.3), rgba(255,0,128,0.4));
    z-index: -2;
    animation: ${p}fx-da-holo-shift 6s linear infinite;
  }

}`;
}