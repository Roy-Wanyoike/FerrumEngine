"""RoyCSS Part 3: Background & Loading effects."""

background_effects = [
    # ── Original 8 ──────────────────────────────────────────

    ("Gradient Shift", "rc-bg-gradient-shift", "background", "bg", """\
.rc-bg-gradient-shift {
  background: linear-gradient(-45deg, #a855f7, #ec4899, #f97316, #06b6d4);
  background-size: 400% 400%;
  animation: rc-bg-gradient-shift 8s ease infinite;
}
@keyframes rc-bg-gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}"""),

    ("Mesh Gradient", "rc-bg-mesh", "background", "bg", """\
.rc-bg-mesh {
  background:
    radial-gradient(at 40% 20%, #a855f7 0px, transparent 50%),
    radial-gradient(at 80% 0%, #ec4899 0px, transparent 50%),
    radial-gradient(at 0% 50%, #06b6d4 0px, transparent 50%),
    radial-gradient(at 80% 50%, #f97316 0px, transparent 50%),
    radial-gradient(at 0% 100%, #10b981 0px, transparent 50%),
    radial-gradient(at 80% 100%, #ef4444 0px, transparent 50%);
  background-color: #1a1a2e;
  background-size: 200% 200%;
  animation: rc-mesh-bg 10s ease infinite;
}
@keyframes rc-mesh-bg {
  0% { background-position: 0% 0%, 100% 0%, 0% 50%, 100% 50%, 0% 100%, 100% 100%; }
  50% { background-position: 100% 0%, 0% 50%, 100% 50%, 0% 100%, 100% 100%, 0% 0%; }
  100% { background-position: 0% 0%, 100% 0%, 0% 50%, 100% 50%, 0% 100%, 100% 100%; }
}"""),

    ("Animated Dots", "rc-bg-dots", "background", "bg", """\
.rc-bg-dots {
  background-color: #1a1a2e;
  background-image: radial-gradient(#a855f7 1.5px, transparent 1.5px);
  background-size: 20px 20px;
}"""),

    ("Striped", "rc-bg-striped", "background", "bg", """\
.rc-bg-striped {
  background: repeating-linear-gradient(
    -45deg,
    #1a1a2e,
    #1a1a2e 10px,
    #2a1a4e 10px,
    #2a1a4e 20px
  );
  background-size: 28.28px 28.28px;
  animation: rc-bg-stripes-move 1s linear infinite;
}
@keyframes rc-bg-stripes-move {
  0% { background-position: 0 0; }
  100% { background-position: 28.28px 0; }
}"""),

    ("Checkerboard", "rc-bg-checkerboard", "background", "bg", """\
.rc-bg-checkerboard {
  background-color: #1a1a2e;
  background-image:
    linear-gradient(45deg, #2a1a4e 25%, transparent 25%, transparent 75%, #2a1a4e 75%),
    linear-gradient(45deg, #2a1a4e 25%, transparent 25%, transparent 75%, #2a1a4e 75%);
  background-size: 40px 40px;
  background-position: 0 0, 20px 20px;
}"""),

    ("Radial Pulse", "rc-bg-radial-pulse", "background", "bg", """\
.rc-bg-radial-pulse {
  background: radial-gradient(circle at center, #a855f7 0%, #302b63 50%, #0f0c29 100%);
  background-size: 100% 100%;
  animation: rc-bg-radial-pulse 3s ease-in-out infinite;
}
@keyframes rc-bg-radial-pulse {
  0%, 100% { background-size: 100% 100%; }
  50% { background-size: 150% 150%; }
}"""),

    ("Noise Texture", "rc-bg-noise-texture", "background", "bg", """\
.rc-bg-noise-texture {
  background-color: #1a1a2e;
  position: relative;
}
.rc-bg-noise-texture::before {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.08;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
  pointer-events: none;
}"""),

    ("Aurora", "rc-bg-aurora", "background", "bg", """\
.rc-bg-aurora {
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  position: relative;
  overflow: hidden;
}
.rc-bg-aurora::before {
  content: '';
  position: absolute;
  top: -50%; left: -50%;
  width: 200%; height: 200%;
  background:
    radial-gradient(ellipse at center, rgba(168, 85, 247, 0.3) 0%, transparent 50%),
    radial-gradient(ellipse at 30% 50%, rgba(6, 182, 212, 0.2) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 50%, rgba(236, 72, 153, 0.2) 0%, transparent 50%);
  animation: rc-aurora-bg 8s ease infinite;
}
@keyframes rc-aurora-bg {
  0% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(30px, -30px) rotate(5deg); }
  66% { transform: translate(-20px, 20px) rotate(-3deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
}"""),

    # ── New 8 ───────────────────────────────────────────────

    ("Background Liquid", "rc-bg-liquid", "background", "bg", """\
.rc-bg-liquid {
  background: linear-gradient(135deg, #a855f7, #06b6d4, #ec4899, #a855f7);
  background-size: 200% 200%;
  animation: rc-bg-liquid 6s ease infinite;
}
@keyframes rc-bg-liquid {
  0% { background-position: 0% 0%; }
  25% { background-position: 100% 0%; }
  50% { background-position: 100% 100%; }
  75% { background-position: 0% 100%; }
  100% { background-position: 0% 0%; }
}"""),

    ("Background Waves", "rc-bg-waves", "background", "bg", """\
.rc-bg-waves {
  background:
    radial-gradient(ellipse at 50% 80%, rgba(168, 85, 247, 0.15) 0%, transparent 60%),
    radial-gradient(ellipse at 30% 60%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 70%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 90%, rgba(168, 85, 247, 0.2) 0%, transparent 55%),
    linear-gradient(180deg, #0f0c29 0%, #1a1a4e 100%);
  background-size: 100% 200%, 80% 150%, 80% 150%, 100% 200%, 100% 100%;
  animation: rc-bg-waves 5s ease-in-out infinite;
}
@keyframes rc-bg-waves {
  0%, 100% { background-position: 50% 0%, 20% 50%, 80% 50%, 50% 0%, center; }
  50% { background-position: 50% 10%, 30% 40%, 70% 60%, 50% 15%, center; }
}"""),

    ("Background Plasma", "rc-bg-plasma", "background", "bg", """\
.rc-bg-plasma {
  background:
    radial-gradient(circle at 20% 50%, #a855f7 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, #ec4899 0%, transparent 50%),
    radial-gradient(circle at 50% 80%, #06b6d4 0%, transparent 50%),
    linear-gradient(135deg, #1a1a2e, #0f0c29);
  background-size: 100% 100%;
  animation: rc-bg-plasma 4s linear infinite;
  filter: hue-rotate(0deg);
}
@keyframes rc-bg-plasma {
  0% { filter: hue-rotate(0deg); background-position: 0% 0%, 100% 0%, 50% 100%, center; }
  33% { filter: hue-rotate(120deg); background-position: 100% 100%, 0% 100%, 0% 0%, center; }
  66% { filter: hue-rotate(240deg); background-position: 100% 0%, 0% 0%, 100% 100%, center; }
  100% { filter: hue-rotate(360deg); background-position: 0% 0%, 100% 0%, 50% 100%, center; }
}"""),

    ("Background Matrix Rain", "rc-bg-matrix", "background", "bg", """\
.rc-bg-matrix {
  background-color: #0a0a0a;
  position: relative;
  overflow: hidden;
}
.rc-bg-matrix::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(16, 185, 129, 0.03) 2px,
      rgba(16, 185, 129, 0.03) 4px
    );
  animation: rc-matrix-scroll 20s linear infinite;
}
.rc-bg-matrix::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 24px,
      rgba(16, 185, 129, 0.06) 24px,
      rgba(16, 185, 129, 0.06) 25px
    ),
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 24px,
      rgba(16, 185, 129, 0.06) 24px,
      rgba(16, 185, 129, 0.06) 25px
    );
}
@keyframes rc-matrix-scroll {
  0% { transform: translateY(0); }
  100% { transform: translateY(4px); }
}"""),

    ("Background Starfield", "rc-bg-starfield", "background", "bg", """\
.rc-bg-starfield {
  background: #0a0a1a;
  position: relative;
  overflow: hidden;
}
.rc-bg-starfield::before {
  content: '';
  position: absolute;
  width: 2px; height: 2px;
  background: transparent;
  box-shadow:
    25px 15px 0 0 rgba(255,255,255,0.8),
    80px 40px 0 0 rgba(255,255,255,0.5),
    150px 10px 0 0 rgba(168,85,247,0.7),
    200px 60px 0 0 rgba(255,255,255,0.6),
    50px 90px 0 0 rgba(6,182,212,0.7),
    120px 70px 0 0 rgba(255,255,255,0.4),
    180px 30px 0 0 rgba(236,72,153,0.6),
    30px 50px 0 0 rgba(255,255,255,0.9),
    90px 85px 0 0 rgba(255,255,255,0.5),
    160px 95px 0 0 rgba(168,85,247,0.8),
    70px 25px 0 0 rgba(255,255,255,0.6),
    220px 50px 0 0 rgba(6,182,212,0.5),
    10px 70px 0 0 rgba(255,255,255,0.7),
    140px 45px 0 0 rgba(236,72,153,0.6),
    190px 80px 0 0 rgba(255,255,255,0.4),
    60px 100px 0 0 rgba(255,255,255,0.8);
  animation: rc-starfield-move 8s linear infinite;
}
@keyframes rc-starfield-move {
  0% { transform: translateY(0); }
  100% { transform: translateY(-100px); }
}"""),

    ("Background Smoke", "rc-bg-smoke", "background", "bg", """\
.rc-bg-smoke {
  background: linear-gradient(135deg, #1a1a2e, #0f0c29);
  position: relative;
  overflow: hidden;
}
.rc-bg-smoke::before,
.rc-bg-smoke::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.4;
}
.rc-bg-smoke::before {
  width: 200px; height: 200px;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.5) 0%, transparent 70%);
  top: -50px; left: -50px;
  animation: rc-smoke-drift1 10s ease-in-out infinite;
}
.rc-bg-smoke::after {
  width: 250px; height: 250px;
  background: radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, transparent 70%);
  bottom: -70px; right: -70px;
  animation: rc-smoke-drift2 12s ease-in-out infinite;
}
@keyframes rc-smoke-drift1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(60px, 30px) scale(1.2); }
  50% { transform: translate(20px, 60px) scale(1); }
  75% { transform: translate(80px, 20px) scale(1.1); }
}
@keyframes rc-smoke-drift2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(-50px, -40px) scale(1.15); }
  66% { transform: translate(-30px, -60px) scale(0.95); }
}"""),

    ("Background Circuit", "rc-bg-circuit", "background", "bg", """\
.rc-bg-circuit {
  background-color: #0a0f1a;
  position: relative;
  overflow: hidden;
}
.rc-bg-circuit::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 19px,
      rgba(6, 182, 212, 0.12) 19px,
      rgba(6, 182, 212, 0.12) 20px
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 39px,
      rgba(6, 182, 212, 0.12) 39px,
      rgba(6, 182, 212, 0.12) 40px
    );
  animation: rc-circuit-scan 3s linear infinite;
}
.rc-bg-circuit::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 40px 20px, rgba(6, 182, 212, 0.25) 3px, transparent 3px),
    radial-gradient(circle at 120px 60px, rgba(168, 85, 247, 0.25) 3px, transparent 3px),
    radial-gradient(circle at 200px 40px, rgba(6, 182, 212, 0.25) 3px, transparent 3px),
    radial-gradient(circle at 80px 80px, rgba(168, 85, 247, 0.25) 3px, transparent 3px),
    radial-gradient(circle at 160px 100px, rgba(6, 182, 212, 0.25) 3px, transparent 3px);
  animation: rc-circuit-nodes 4s ease-in-out infinite alternate;
}
@keyframes rc-circuit-scan {
  0% { transform: translateY(0); }
  100% { transform: translateY(20px); }
}
@keyframes rc-circuit-nodes {
  0% { opacity: 0.5; }
  100% { opacity: 1; }
}"""),

    ("Background Lava Lamp", "rc-bg-lava", "background", "bg", """\
.rc-bg-lava {
  background: linear-gradient(180deg, #1a0a2e, #0f0c29);
  position: relative;
  overflow: hidden;
}
.rc-bg-lava::before,
.rc-bg-lava::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
}
.rc-bg-lava::before {
  width: 80px; height: 120px;
  background: radial-gradient(ellipse, rgba(236, 72, 153, 0.6) 0%, rgba(168, 85, 247, 0.2) 60%, transparent 100%);
  left: 30%; bottom: -20%;
  animation: rc-lava-rise1 5s ease-in-out infinite;
}
.rc-bg-lava::after {
  width: 60px; height: 100px;
  background: radial-gradient(ellipse, rgba(249, 115, 22, 0.5) 0%, rgba(236, 72, 153, 0.2) 60%, transparent 100%);
  left: 60%; bottom: -20%;
  animation: rc-lava-rise2 6s ease-in-out infinite;
  animation-delay: -2s;
}
@keyframes rc-lava-rise1 {
  0% { transform: translateY(0) scaleX(1) scaleY(1); opacity: 0.8; }
  25% { transform: translateY(-80px) scaleX(1.3) scaleY(0.8); opacity: 1; }
  50% { transform: translateY(-160px) scaleX(0.7) scaleY(1.2); opacity: 0.6; }
  75% { transform: translateY(-120px) scaleX(1.2) scaleY(0.9); opacity: 0.4; }
  100% { transform: translateY(0) scaleX(1) scaleY(1); opacity: 0.8; }
}
@keyframes rc-lava-rise2 {
  0% { transform: translateY(0) scaleX(1) scaleY(1); opacity: 0.7; }
  30% { transform: translateY(-100px) scaleX(1.4) scaleY(0.7); opacity: 1; }
  60% { transform: translateY(-180px) scaleX(0.6) scaleY(1.3); opacity: 0.5; }
  80% { transform: translateY(-80px) scaleX(1.1) scaleY(1); opacity: 0.3; }
  100% { transform: translateY(0) scaleX(1) scaleY(1); opacity: 0.7; }
}"""),
]


loading_effects = [
    # ── Original 10 ─────────────────────────────────────────

    ("Spinner", "rc-loader-spinner", "loading", "loader", """\
.rc-loader-spinner {
  width: 40px; height: 40px;
  border: 4px solid rgba(168, 85, 247, 0.2);
  border-top-color: #a855f7;
  border-radius: 50%;
  animation: rc-spinner 0.8s linear infinite;
}
@keyframes rc-spinner {
  to { transform: rotate(360deg); }
}"""),

    ("Dots", "rc-loader-dots", "loading", "loader", """\
.rc-loader-dots {
  display: flex; gap: 6px;
}
.rc-loader-dots span {
  width: 12px; height: 12px;
  border-radius: 50%;
  background: #a855f7;
  animation: rc-dots-bounce 1.2s ease-in-out infinite;
}
.rc-loader-dots span:nth-child(2) { animation-delay: 0.15s; }
.rc-loader-dots span:nth-child(3) { animation-delay: 0.3s; }
@keyframes rc-dots-bounce {
  0%, 80%, 100% { transform: scale(0.4); opacity: 0.3; }
  40% { transform: scale(1); opacity: 1; }
}"""),

    ("Bars", "rc-loader-bars", "loading", "loader", """\
.rc-loader-bars {
  display: flex; gap: 4px; align-items: end; height: 40px;
}
.rc-loader-bars span {
  width: 6px;
  background: linear-gradient(to top, #a855f7, #ec4899);
  border-radius: 3px;
  animation: rc-bars 1s ease-in-out infinite;
}
.rc-loader-bars span:nth-child(1) { animation-delay: 0s; }
.rc-loader-bars span:nth-child(2) { animation-delay: 0.1s; }
.rc-loader-bars span:nth-child(3) { animation-delay: 0.2s; }
.rc-loader-bars span:nth-child(4) { animation-delay: 0.3s; }
.rc-loader-bars span:nth-child(5) { animation-delay: 0.4s; }
@keyframes rc-bars {
  0%, 100% { height: 10px; }
  50% { height: 35px; }
}"""),

    ("Pulse", "rc-loader-pulse", "loading", "loader", """\
.rc-loader-pulse {
  width: 40px; height: 40px;
  border-radius: 50%;
  background: #a855f7;
  animation: rc-loader-pulse 1.2s ease-in-out infinite;
}
@keyframes rc-loader-pulse {
  0%, 100% { transform: scale(0.8); opacity: 0.5; box-shadow: 0 0 0 0 rgba(168, 85, 247, 0.6); }
  50% { transform: scale(1); opacity: 1; box-shadow: 0 0 20px 10px rgba(168, 85, 247, 0); }
}"""),

    ("Orbit", "rc-loader-orbit", "loading", "loader", """\
.rc-loader-orbit {
  width: 40px; height: 40px;
  position: relative;
  animation: rc-orbit-spin 2s linear infinite;
}
.rc-loader-orbit::before {
  content: '';
  position: absolute;
  top: 0; left: 50%;
  width: 10px; height: 10px;
  margin-left: -5px;
  border-radius: 50%;
  background: #a855f7;
  box-shadow: 0 0 10px #a855f7, 0 0 20px rgba(168, 85, 247, 0.5);
}
.rc-loader-orbit::after {
  content: '';
  position: absolute;
  inset: 3px;
  border: 2px dashed rgba(168, 85, 247, 0.3);
  border-radius: 50%;
}
@keyframes rc-orbit-spin {
  to { transform: rotate(360deg); }
}"""),

    ("Wave", "rc-loader-wave", "loading", "loader", """\
.rc-loader-wave {
  display: flex; gap: 4px; align-items: center; height: 40px;
}
.rc-loader-wave span {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #06b6d4;
  animation: rc-wave 1.4s ease-in-out infinite;
}
.rc-loader-wave span:nth-child(1) { animation-delay: 0s; }
.rc-loader-wave span:nth-child(2) { animation-delay: 0.1s; }
.rc-loader-wave span:nth-child(3) { animation-delay: 0.2s; }
.rc-loader-wave span:nth-child(4) { animation-delay: 0.3s; }
.rc-loader-wave span:nth-child(5) { animation-delay: 0.4s; }
@keyframes rc-wave {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-15px); }
}"""),

    ("DNA", "rc-loader-dna", "loading", "loader", """\
.rc-loader-dna {
  display: flex; gap: 2px; align-items: center; height: 50px;
}
.rc-loader-dna span {
  width: 8px; height: 8px;
  border-radius: 50%;
  animation: rc-dna 1.5s ease-in-out infinite;
}
.rc-loader-dna span:nth-child(odd) { background: #a855f7; }
.rc-loader-dna span:nth-child(even) { background: #ec4899; }
.rc-loader-dna span:nth-child(1) { animation-delay: 0s; }
.rc-loader-dna span:nth-child(2) { animation-delay: 0.1s; }
.rc-loader-dna span:nth-child(3) { animation-delay: 0.2s; }
.rc-loader-dna span:nth-child(4) { animation-delay: 0.3s; }
.rc-loader-dna span:nth-child(5) { animation-delay: 0.4s; }
.rc-loader-dna span:nth-child(6) { animation-delay: 0.5s; }
.rc-loader-dna span:nth-child(7) { animation-delay: 0.6s; }
@keyframes rc-dna {
  0%, 100% { transform: translateY(0) scale(0.6); opacity: 0.4; }
  50% { transform: translateY(-15px) scale(1); opacity: 1; }
}"""),

    ("Circle Fade", "rc-loader-circle-fade", "loading", "loader", """\
.rc-loader-circle-fade {
  width: 40px; height: 40px;
  position: relative;
}
.rc-loader-circle-fade span {
  position: absolute;
  width: 100%; height: 100%;
  border: 3px solid transparent;
  border-top-color: #a855f7;
  border-radius: 50%;
  animation: rc-circle-fade 1.2s linear infinite;
}
.rc-loader-circle-fade span:nth-child(2) {
  width: 70%; height: 70%;
  top: 15%; left: 15%;
  border-top-color: #ec4899;
  animation-delay: 0.15s;
  animation-direction: reverse;
}
@keyframes rc-circle-fade {
  0% { transform: rotate(0deg); opacity: 1; }
  50% { opacity: 0.5; }
  100% { transform: rotate(360deg); opacity: 1; }
}"""),

    ("Square Spin", "rc-loader-square-spin", "loading", "loader", """\
.rc-loader-square-spin {
  width: 30px; height: 30px;
  border: 3px solid #a855f7;
  animation: rc-square-spin 1.5s ease-in-out infinite;
}
@keyframes rc-square-spin {
  0% { transform: rotate(0deg); border-radius: 0; }
  25% { transform: rotate(90deg); border-radius: 50% 0 0 0; }
  50% { transform: rotate(180deg); border-radius: 50%; }
  75% { transform: rotate(270deg); border-radius: 0 0 50% 0; }
  100% { transform: rotate(360deg); border-radius: 0; }
}"""),

    ("Ring", "rc-loader-ring", "loading", "loader", """\
.rc-loader-ring {
  width: 40px; height: 40px;
  position: relative;
}
.rc-loader-ring span {
  position: absolute;
  inset: 0;
  border: 3px solid transparent;
  border-radius: 50%;
  animation: rc-ring-spin 1.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
}
.rc-loader-ring span:nth-child(1) {
  border-top-color: #a855f7;
  border-bottom-color: #a855f7;
}
.rc-loader-ring span:nth-child(2) {
  border-left-color: #ec4899;
  border-right-color: #ec4899;
  animation-direction: reverse;
}
@keyframes rc-ring-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}"""),

    # ── New 12 ──────────────────────────────────────────────

    ("Loader Cube", "rc-loader-cube", "loading", "loader", """\
.rc-loader-cube {
  width: 40px; height: 40px;
  position: relative;
  transform-style: preserve-3d;
  animation: rc-cube-rotate 2s linear infinite;
}
.rc-loader-cube span {
  position: absolute;
  width: 100%; height: 100%;
  border: 2px solid rgba(168, 85, 247, 0.6);
  background: rgba(168, 85, 247, 0.1);
  border-radius: 4px;
}
.rc-loader-cube span:nth-child(1) { transform: rotateY(0deg) translateZ(20px); }
.rc-loader-cube span:nth-child(2) { transform: rotateY(90deg) translateZ(20px); }
.rc-loader-cube span:nth-child(3) { transform: rotateY(180deg) translateZ(20px); }
.rc-loader-cube span:nth-child(4) { transform: rotateY(270deg) translateZ(20px); }
.rc-loader-cube span:nth-child(5) { transform: rotateX(90deg) translateZ(20px); }
.rc-loader-cube span:nth-child(6) { transform: rotateX(-90deg) translateZ(20px); }
@keyframes rc-cube-rotate {
  0% { transform: rotateX(0deg) rotateY(0deg); }
  100% { transform: rotateX(360deg) rotateY(360deg); }
}"""),

    ("Loader Hourglass", "rc-loader-hourglass", "loading", "loader", """\
.rc-loader-hourglass {
  width: 40px; height: 40px;
  position: relative;
  animation: rc-hourglass-flip 2s ease-in-out infinite;
}
.rc-loader-hourglass span {
  position: absolute;
  left: 50%; top: 50%;
  width: 0; height: 0;
  transform: translate(-50%, -50%);
}
.rc-loader-hourglass span:nth-child(1) {
  border-left: 16px solid transparent;
  border-right: 16px solid transparent;
  border-top: 20px solid #a855f7;
  transform: translate(-50%, -50%) translateY(4px);
}
.rc-loader-hourglass span:nth-child(2) {
  border-left: 16px solid transparent;
  border-right: 16px solid transparent;
  border-bottom: 20px solid #ec4899;
  transform: translate(-50%, -50%) translateY(-4px);
}
@keyframes rc-hourglass-flip {
  0%, 40% { transform: rotate(0deg) scale(1); }
  50%, 90% { transform: rotate(180deg) scale(1); }
  100% { transform: rotate(360deg) scale(1); }
}"""),

    ("Loader Grid", "rc-loader-grid", "loading", "loader", """\
.rc-loader-grid {
  display: grid;
  grid-template-columns: repeat(3, 12px);
  grid-template-rows: repeat(3, 12px);
  gap: 4px;
}
.rc-loader-grid span {
  width: 12px; height: 12px;
  border-radius: 50%;
  background: #a855f7;
  animation: rc-grid-pop 1.4s ease-in-out infinite;
}
.rc-loader-grid span:nth-child(1) { animation-delay: 0s; }
.rc-loader-grid span:nth-child(2) { animation-delay: 0.1s; }
.rc-loader-grid span:nth-child(3) { animation-delay: 0.2s; }
.rc-loader-grid span:nth-child(4) { animation-delay: 0.3s; }
.rc-loader-grid span:nth-child(5) { animation-delay: 0.4s; }
.rc-loader-grid span:nth-child(6) { animation-delay: 0.5s; }
.rc-loader-grid span:nth-child(7) { animation-delay: 0.6s; }
.rc-loader-grid span:nth-child(8) { animation-delay: 0.7s; }
.rc-loader-grid span:nth-child(9) { animation-delay: 0.8s; }
@keyframes rc-grid-pop {
  0%, 70%, 100% { transform: scale(0.3); opacity: 0.2; }
  35% { transform: scale(1); opacity: 1; }
}"""),

    ("Loader Ripple", "rc-loader-ripple", "loading", "loader", """\
.rc-loader-ripple {
  width: 40px; height: 40px;
  position: relative;
}
.rc-loader-ripple span {
  position: absolute;
  inset: 0;
  border: 2px solid #a855f7;
  border-radius: 50%;
  animation: rc-ripple-expand 1.5s ease-out infinite;
}
.rc-loader-ripple span:nth-child(2) { animation-delay: 0.5s; }
.rc-loader-ripple span:nth-child(3) { animation-delay: 1s; }
@keyframes rc-ripple-expand {
  0% { transform: scale(0.2); opacity: 1; }
  100% { transform: scale(1.5); opacity: 0; }
}"""),

    ("Loader Typing", "rc-loader-typing", "loading", "loader", """\
.rc-loader-typing {
  display: flex; gap: 4px; align-items: center; height: 30px;
}
.rc-loader-typing span {
  width: 6px;
  border-radius: 3px;
  background: #a855f7;
  animation: rc-typing-bounce 1.2s ease-in-out infinite;
}
.rc-loader-typing span:nth-child(1) { height: 10px; animation-delay: 0s; }
.rc-loader-typing span:nth-child(2) { height: 20px; animation-delay: 0.15s; }
.rc-loader-typing span:nth-child(3) { height: 14px; animation-delay: 0.3s; }
@keyframes rc-typing-bounce {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-8px); }
}"""),

    ("Loader Pencil", "rc-loader-pencil", "loading", "loader", """\
.rc-loader-pencil {
  width: 8px; height: 40px;
  position: relative;
  animation: rc-pencil-rotate 1.2s ease-in-out infinite;
  transform-origin: bottom center;
}
.rc-loader-pencil span {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
.rc-loader-pencil span:nth-child(1) {
  width: 8px; height: 28px;
  background: linear-gradient(to top, #f59e0b, #fbbf24);
  border-radius: 2px 2px 0 0;
}
.rc-loader-pencil span:nth-child(2) {
  width: 0; height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 10px solid #a855f7;
  bottom: -2px;
}
@keyframes rc-pencil-rotate {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(30deg); }
  50% { transform: rotate(0deg); }
  75% { transform: rotate(-30deg); }
}"""),

    ("Loader Atom", "rc-loader-atom", "loading", "loader", """\
.rc-loader-atom {
  width: 60px; height: 60px;
  position: relative;
}
.rc-loader-atom span {
  position: absolute;
  width: 100%; height: 100%;
  border: 1.5px solid rgba(168, 85, 247, 0.4);
  border-radius: 50%;
}
.rc-loader-atom span::after {
  content: '';
  position: absolute;
  top: -4px; left: 50%;
  margin-left: -4px;
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #a855f7;
}
.rc-loader-atom span:nth-child(1) {
  animation: rc-atom-orbit-1 1.5s linear infinite;
}
.rc-loader-atom span:nth-child(2) {
  animation: rc-atom-orbit-2 1.5s linear infinite;
}
.rc-loader-atom span:nth-child(3) {
  animation: rc-atom-orbit-3 1.5s linear infinite;
}
.rc-loader-atom::after {
  content: '';
  position: absolute;
  top: 50%; left: 50%;
  width: 10px; height: 10px;
  margin: -5px 0 0 -5px;
  border-radius: 50%;
  background: #ec4899;
}
@keyframes rc-atom-orbit-1 {
  0% { transform: rotateX(60deg) rotateY(0deg); }
  100% { transform: rotateX(60deg) rotateY(360deg); }
}
@keyframes rc-atom-orbit-2 {
  0% { transform: rotateX(60deg) rotateY(120deg); }
  100% { transform: rotateX(60deg) rotateY(480deg); }
}
@keyframes rc-atom-orbit-3 {
  0% { transform: rotateX(60deg) rotateY(240deg); }
  100% { transform: rotateX(60deg) rotateY(600deg); }
}"""),

    ("Loader Bar Progress", "rc-loader-bar-progress", "loading", "loader", """\
.rc-loader-bar-progress {
  width: 80px; height: 6px;
  background: rgba(168, 85, 247, 0.15);
  border-radius: 3px;
  overflow: hidden;
  position: relative;
}
.rc-loader-bar-progress span {
  position: absolute;
  top: 0; left: 0;
  height: 100%;
  width: 100%;
  background: linear-gradient(90deg, #a855f7, #ec4899, #a855f7);
  background-size: 200% 100%;
  border-radius: 3px;
  animation: rc-bar-progress 1.5s ease-in-out infinite;
}
@keyframes rc-bar-progress {
  0% { transform: translateX(-100%); background-position: 0% 0; }
  50% { background-position: 100% 0; }
  100% { transform: translateX(100%); background-position: 0% 0; }
}"""),

    ("Loader Clock", "rc-loader-clock", "loading", "loader", """\
.rc-loader-clock {
  width: 40px; height: 40px;
  border: 3px solid rgba(168, 85, 247, 0.3);
  border-radius: 50%;
  position: relative;
}
.rc-loader-clock span {
  position: absolute;
  bottom: 50%; left: 50%;
  width: 2px; height: 14px;
  margin-left: -1px;
  background: #a855f7;
  border-radius: 1px;
  transform-origin: bottom center;
  animation: rc-clock-tick 1.5s steps(12, end) infinite;
}
.rc-loader-clock::after {
  content: '';
  position: absolute;
  top: 50%; left: 50%;
  width: 6px; height: 6px;
  margin: -3px 0 0 -3px;
  border-radius: 50%;
  background: #ec4899;
}
@keyframes rc-clock-tick {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}"""),

    ("Loader Bouncing Ball", "rc-loader-bounce", "loading", "loader", """\
.rc-loader-bounce {
  width: 24px; height: 40px;
  position: relative;
}
.rc-loader-bounce span {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 24px; height: 24px;
  margin-left: -12px;
  border-radius: 50%;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  animation: rc-bounce-squash 0.6s ease-in-out infinite alternate;
  box-shadow: 0 4px 15px rgba(168, 85, 247, 0.4);
}
@keyframes rc-bounce-squash {
  0% { transform: translateY(0) scaleX(1) scaleY(1); }
  30% { transform: translateY(-30px) scaleX(0.95) scaleY(1.05); }
  50% { transform: translateY(-32px) scaleX(1) scaleY(1); }
  80% { transform: translateY(0) scaleX(1.15) scaleY(0.85); }
  100% { transform: translateY(0) scaleX(1.1) scaleY(0.9); }
}"""),

    ("Loader Moon", "rc-loader-moon", "loading", "loader", """\
.rc-loader-moon {
  width: 30px; height: 30px;
  position: relative;
  animation: rc-moon-rotate 2s ease-in-out infinite;
}
.rc-loader-moon span {
  position: absolute;
  width: 100%; height: 100%;
  border-radius: 50%;
  background: #a855f7;
}
.rc-loader-moon span:nth-child(2) {
  background: #0f0c29;
  animation: rc-moon-shadow 2s ease-in-out infinite;
}
@keyframes rc-moon-rotate {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(180deg); }
}
@keyframes rc-moon-shadow {
  0%, 100% { transform: translateX(-40%); }
  50% { transform: translateX(40%); }
}"""),

    ("Loader Heartbeat", "rc-loader-heartbeat", "loading", "loader", """\
.rc-loader-heartbeat {
  width: 30px; height: 30px;
  position: relative;
  animation: rc-heartbeat-pulse 1.2s ease-in-out infinite;
}
.rc-loader-heartbeat span {
  position: absolute;
  width: 30px; height: 30px;
  transform: rotate(45deg);
}
.rc-loader-heartbeat span::before,
.rc-loader-heartbeat span::after {
  content: '';
  position: absolute;
  width: 30px; height: 30px;
  border-radius: 50%;
  background: #ec4899;
}
.rc-loader-heartbeat span::before {
  top: -15px; left: 0;
}
.rc-loader-heartbeat span::after {
  left: -15px; top: 0;
}
@keyframes rc-heartbeat-pulse {
  0%, 100% { transform: scale(1); }
  14% { transform: scale(1.2); }
  28% { transform: scale(1); }
  42% { transform: scale(1.2); }
  56% { transform: scale(1); }
}"""),
]