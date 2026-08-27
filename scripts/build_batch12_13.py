#!/usr/bin/env python3
"""Build all 62 missing effects for FerrumEngine - Batch 12 & 13."""

EFFECTS = [
    # ═══════════════════════════════════════════════════════
    # BATCH 12: Interactive UI & Data Viz (30 effects)
    # ═══════════════════════════════════════════════════════

    # --- Microinteractions (12) ---
    {
        "name": "Radial Progress",
        "className": "rc-radial-progress",
        "category": "loaders",
        "displayType": "loader",
        "css": """@property --rc-rp-pct { syntax: '<percentage>'; inherits: false; initial-value: 0%; }
.rc-radial-progress {
  width: 80px; height: 80px; border-radius: 50%;
  background: conic-gradient(#a855f7 var(--rc-rp-pct), rgba(148,163,184,0.15) 0);
  display: grid; place-items: center;
  animation: rc-rp-fill 2s cubic-bezier(0.22,1,0.36,1) both;
}
.rc-radial-progress::after {
  content: ''; width: 62px; height: 62px; border-radius: 50%; background: #0f0f14;
}
@keyframes rc-rp-fill { to { --rc-rp-pct: 75%; } }"""
    },
    {
        "name": "Step Indicator",
        "className": "rc-step-indicator",
        "category": "navigation",
        "displayType": "box",
        "css": """.rc-step-indicator {
  display: flex; align-items: center; gap: 0;
}
.rc-step-indicator .step {
  width: 32px; height: 32px; border-radius: 50%;
  background: rgba(148,163,184,0.15); display: grid; place-items: center;
  font-size: 13px; font-weight: 600; color: rgba(148,163,184,0.5);
  position: relative; z-index: 1; transition: all 0.3s ease;
}
.rc-step-indicator .step.done {
  background: #a855f7; color: #fff;
}
.rc-step-indicator .step.active {
  background: #a855f7; color: #fff;
  box-shadow: 0 0 0 4px rgba(168,85,247,0.2);
}
.rc-step-indicator .step-line {
  flex: 1; height: 2px; background: rgba(148,163,184,0.15);
  transition: background 0.3s ease;
}
.rc-step-indicator .step-line.done { background: #a855f7; }"""
    },
    {
        "name": "Rating Stars",
        "className": "rc-rating-stars",
        "category": "forms",
        "displayType": "box",
        "css": """.rc-rating-stars {
  display: flex; gap: 4px; font-size: 24px; color: rgba(148,163,184,0.25);
  cursor: pointer;
}
.rc-rating-stars .star { transition: color 0.15s ease, transform 0.15s ease; }
.rc-rating-stars:hover .star { color: #fbbf24; }
.rc-rating-stars .star:hover ~ .star { color: rgba(148,163,184,0.25); }
.rc-rating-stars .star:hover { transform: scale(1.2); }
.rc-rating-stars .star.filled { color: #fbbf24; }"""
    },
    {
        "name": "Like Button Particle",
        "className": "rc-like-button-particle",
        "category": "button-card",
        "displayType": "box",
        "css": """.rc-like-button-particle {
  position: relative; width: 48px; height: 48px;
  display: grid; place-items: center; border-radius: 50%;
  background: rgba(148,163,184,0.08); cursor: pointer;
  transition: background 0.2s ease, transform 0.2s cubic-bezier(0.22,1,0.36,1);
}
.rc-like-button-particle:hover { background: rgba(244,63,94,0.1); }
.rc-like-button-particle:active { transform: scale(0.85); }
.rc-like-button-particle.liked {
  background: rgba(244,63,94,0.15);
  animation: rc-like-pop 0.4s cubic-bezier(0.22,1,0.36,1);
}
@keyframes rc-like-pop {
  0% { transform: scale(0.85); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}"""
    },
    {
        "name": "Copy Feedback",
        "className": "rc-copy-feedback",
        "category": "button-card",
        "displayType": "box",
        "css": """.rc-copy-feedback {
  position: relative; display: inline-flex; align-items: center; gap: 8px;
  padding: 8px 16px; border-radius: 8px;
  background: rgba(148,163,184,0.08); border: 1px solid rgba(148,163,184,0.15);
  cursor: pointer; transition: all 0.2s ease;
}
.rc-copy-feedback.copied {
  border-color: rgba(34,197,94,0.4); background: rgba(34,197,94,0.08);
}
.rc-copy-feedback .check-icon {
  opacity: 0; transform: scale(0); transition: all 0.25s cubic-bezier(0.22,1,0.36,1);
  position: absolute; inset: 0; display: grid; place-items: center;
  color: #22c55e;
}
.rc-copy-feedback.copied .check-icon {
  opacity: 1; transform: scale(1);
}"""
    },
    {
        "name": "Dark Mode Toggle",
        "className": "rc-dark-mode-toggle",
        "category": "forms",
        "displayType": "box",
        "css": """.rc-dark-mode-toggle {
  width: 56px; height: 28px; border-radius: 14px;
  background: #fbbf24; position: relative; cursor: pointer;
  transition: background 0.4s ease; border: none; padding: 0;
}
.rc-dark-mode-toggle.dark { background: #6366f1; }
.rc-dark-mode-toggle::after {
  content: ''; position: absolute; top: 3px; left: 3px;
  width: 22px; height: 22px; border-radius: 50%;
  background: #fff; transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}
.rc-dark-mode-toggle.dark::after { transform: translateX(28px); }"""
    },
    {
        "name": "Password Strength",
        "className": "rc-password-strength",
        "category": "forms",
        "displayType": "box",
        "css": """.rc-password-strength {
  display: flex; gap: 4px; height: 4px; border-radius: 2px; overflow: hidden;
}
.rc-password-strength .bar {
  flex: 1; background: rgba(148,163,184,0.15); border-radius: 2px;
  transition: background 0.3s ease;
}
.rc-password-strength.s1 .bar:nth-child(1) { background: #ef4444; }
.rc-password-strength.s2 .bar:nth-child(-n+2) { background: #f59e0b; }
.rc-password-strength.s3 .bar:nth-child(-n+3) { background: #eab308; }
.rc-password-strength.s4 .bar:nth-child(-n+4) { background: #22c55e; }"""
    },
    {
        "name": "Upload Progress",
        "className": "rc-upload-progress",
        "category": "loaders",
        "displayType": "loader",
        "css": """@property --rc-up-pct { syntax: '<percentage>'; inherits: false; initial-value: 0%; }
.rc-upload-progress {
  position: relative; height: 8px; border-radius: 4px;
  background: rgba(148,163,184,0.1); overflow: hidden;
}
.rc-upload-progress::after {
  content: ''; position: absolute; inset: 0; border-radius: 4px;
  background: linear-gradient(90deg, #a855f7, #ec4899);
  transform-origin: left; animation: rc-up-fill 3s cubic-bezier(0.22,1,0.36,1) both;
}
@keyframes rc-up-fill { to { transform: scaleX(1); } }"""
    },
    {
        "name": "Countdown Timer",
        "className": "rc-countdown-timer",
        "category": "loaders",
        "displayType": "loader",
        "css": """@property --rc-cd-pct { syntax: '<percentage>'; inherits: false; initial-value: 100%; }
.rc-countdown-timer {
  width: 80px; height: 80px; border-radius: 50%;
  background: conic-gradient(transparent var(--rc-cd-pct), #a855f7 0);
  display: grid; place-items: center; position: relative;
  animation: rc-cd-run 5s linear both;
}
.rc-countdown-timer::before {
  content: ''; position: absolute; width: 70px; height: 70px;
  border-radius: 50%; background: inherit;
}
@keyframes rc-cd-run { to { --rc-cd-pct: 0%; } }"""
    },

    # --- Data Visualization (10) ---
    {
        "name": "Bar Chart Grow",
        "className": "rc-bar-chart-grow",
        "category": "advanced",
        "displayType": "box",
        "css": """.rc-bar-chart-grow {
  display: flex; align-items: flex-end; gap: 8px; height: 120px; padding: 8px 0;
}
.rc-bar-chart-grow .bar {
  flex: 1; border-radius: 4px 4px 0 0;
  background: linear-gradient(to top, #a855f7, #c084fc);
  transform-origin: bottom; transform: scaleY(0);
  animation: rc-bcg-grow 0.8s cubic-bezier(0.22,1,0.36,1) both;
}
.rc-bar-chart-grow .bar:nth-child(1) { height: 60%; animation-delay: 0ms; }
.rc-bar-chart-grow .bar:nth-child(2) { height: 85%; animation-delay: 80ms; }
.rc-bar-chart-grow .bar:nth-child(3) { height: 45%; animation-delay: 160ms; }
.rc-bar-chart-grow .bar:nth-child(4) { height: 95%; animation-delay: 240ms; }
.rc-bar-chart-grow .bar:nth-child(5) { height: 70%; animation-delay: 320ms; }
.rc-bar-chart-grow .bar:nth-child(6) { height: 55%; animation-delay: 400ms; }
.rc-bar-chart-grow .bar:nth-child(7) { height: 80%; animation-delay: 480ms; }
@keyframes rc-bcg-grow { from { transform: scaleY(0); } to { transform: scaleY(1); } }"""
    },
    {
        "name": "Line Chart Draw",
        "className": "rc-line-chart-draw",
        "category": "advanced",
        "displayType": "box",
        "css": """.rc-line-chart-draw {
  width: 200px; height: 100px; position: relative; overflow: hidden;
}
.rc-line-chart-draw svg { width: 100%; height: 100%; }
.rc-line-chart-draw .line {
  stroke: #a855f7; stroke-width: 2; fill: none;
  stroke-dasharray: 500; stroke-dashoffset: 500;
  animation: rc-lcd-draw 2s cubic-bezier(0.22,1,0.36,1) both;
}
.rc-line-chart-draw .area {
  fill: url(#rc-lcd-grad);
  opacity: 0; animation: rc-lcd-fade 0.5s ease 1.5s both;
}
@keyframes rc-lcd-draw { to { stroke-dashoffset: 0; } }
@keyframes rc-lcd-fade { to { opacity: 0.2; } }"""
    },
    {
        "name": "Donut Chart",
        "className": "rc-donut-chart",
        "category": "advanced",
        "displayType": "box",
        "css": """.rc-donut-chart {
  width: 100px; height: 100px; border-radius: 50%;
  background: conic-gradient(
    #a855f7 0% 35%, #ec4899 35% 60%, #3b82f6 60% 80%, rgba(148,163,184,0.15) 80% 100%
  );
  display: grid; place-items: center;
  animation: rc-dc-spin 1s cubic-bezier(0.22,1,0.36,1) both;
  transform: rotate(-90deg);
}
.rc-donut-chart::after {
  content: ''; width: 60px; height: 60px; border-radius: 50%; background: #0f0f14;
}
@keyframes rc-dc-spin { from { transform: rotate(-90deg) scale(0.5); opacity: 0; } }"""
    },
    {
        "name": "Gauge Meter",
        "className": "rc-gauge-meter",
        "category": "loaders",
        "displayType": "loader",
        "css": """@property --rc-gm-val { syntax: '<angle>'; inherits: false; initial-value: 0deg; }
.rc-gauge-meter {
  width: 100px; height: 60px; border-radius: 100px 100px 0 0;
  background: conic-gradient(from 180deg at 50% 100%, #a855f7 var(--rc-gm-val), rgba(148,163,184,0.12) 0);
  position: relative; overflow: hidden;
  animation: rc-gm-fill 2s cubic-bezier(0.22,1,0.36,1) both;
}
@keyframes rc-gm-fill { to { --rc-gm-val: 140deg; } }"""
    },
    {
        "name": "Thermometer",
        "className": "rc-thermometer",
        "category": "loaders",
        "displayType": "loader",
        "css": """.rc-thermometer {
  width: 24px; height: 100px; border-radius: 12px;
  background: rgba(148,163,184,0.1); border: 2px solid rgba(148,163,184,0.2);
  position: relative; overflow: hidden;
}
.rc-thermometer::after {
  content: ''; position: absolute; bottom: 0; left: 0; right: 0;
  height: 70%; border-radius: 0 0 10px 10px;
  background: linear-gradient(to top, #ef4444, #f59e0b, #22c55e);
  animation: rc-therm-fill 2s cubic-bezier(0.22,1,0.36,1) both;
  transform-origin: bottom;
}
@keyframes rc-therm-fill { from { transform: scaleY(0); } }"""
    },
    {
        "name": "Battery Level",
        "className": "rc-battery-level",
        "category": "loaders",
        "displayType": "loader",
        "css": """.rc-battery-level {
  width: 60px; height: 28px; border: 2px solid rgba(148,163,184,0.4);
  border-radius: 6px; position: relative; padding: 3px;
}
.rc-battery-level::before {
  content: ''; position: absolute; right: -8px; top: 8px;
  width: 4px; height: 12px; border-radius: 0 2px 2px 0;
  background: rgba(148,163,184,0.4);
}
.rc-battery-level::after {
  content: ''; display: block; height: 100%; border-radius: 3px;
  background: linear-gradient(90deg, #22c55e, #4ade80);
  animation: rc-bat-fill 2s cubic-bezier(0.22,1,0.36,1) both;
  transform-origin: left; transform: scaleX(0);
}
@keyframes rc-bat-fill { to { transform: scaleX(0.75); } }"""
    },
    {
        "name": "Signal Strength",
        "className": "rc-signal-strength",
        "category": "loaders",
        "displayType": "loader",
        "css": """.rc-signal-strength {
  display: flex; align-items: flex-end; gap: 3px; height: 24px;
}
.rc-signal-strength .bar {
  width: 6px; border-radius: 2px; background: rgba(148,163,184,0.15);
  animation: rc-sig-fill 0.4s cubic-bezier(0.22,1,0.36,1) both;
  transform-origin: bottom; transform: scaleY(0);
}
.rc-signal-strength .bar:nth-child(1) { height: 25%; animation-delay: 0ms; }
.rc-signal-strength .bar:nth-child(2) { height: 50%; animation-delay: 100ms; }
.rc-signal-strength .bar:nth-child(3) { height: 75%; animation-delay: 200ms; }
.rc-signal-strength .bar:nth-child(4) { height: 100%; animation-delay: 300ms; }
.rc-signal-strength .bar.active { background: #22c55e; }
@keyframes rc-sig-fill { to { transform: scaleY(1); } }"""
    },
    {
        "name": "Table Row Highlight",
        "className": "rc-table-row-highlight",
        "category": "navigation",
        "displayType": "box",
        "css": """.rc-table-row-highlight {
  transition: background 0.15s ease;
}
.rc-table-row-highlight:hover {
  background: rgba(168,85,247,0.06);
}"""
    },
    {
        "name": "Code Block Syntax",
        "className": "rc-code-block-syntax",
        "category": "navigation",
        "displayType": "box",
        "css": """.rc-code-block-syntax {
  font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
  font-size: 13px; line-height: 1.6; padding: 16px 20px;
  border-radius: 12px; background: rgba(15,15,20,0.8);
  border: 1px solid rgba(148,163,184,0.1);
  overflow-x: auto; tab-size: 2;
}
.rc-code-block-syntax .keyword { color: #c084fc; }
.rc-code-block-syntax .string { color: #34d399; }
.rc-code-block-syntax .number { color: #fbbf24; }
.rc-code-block-syntax .comment { color: rgba(148,163,184,0.4); font-style: italic; }
.rc-code-block-syntax .function { color: #60a5fa; }
.rc-code-block-syntax .property { color: #f472b6; }"""
    },

    # --- UI State Animations (6 missing) ---
    {
        "name": "Shake Error Input",
        "className": "rc-shake-error-input",
        "category": "forms",
        "displayType": "box",
        "css": """.rc-shake-error-input {
  animation: rc-sei-shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  border-color: #ef4444 !important;
}
@keyframes rc-sei-shake {
  10%, 90% { transform: translateX(-2px); }
  20%, 80% { transform: translateX(4px); }
  30%, 50%, 70% { transform: translateX(-6px); }
  40%, 60% { transform: translateX(6px); }
}"""
    },
    {
        "name": "Slide-In Panel",
        "className": "rc-slide-in-panel",
        "category": "navigation",
        "displayType": "box",
        "css": """.rc-slide-in-panel {
  animation: rc-sip-in 0.35s cubic-bezier(0.22,1,0.36,1) both;
  transform-origin: right center;
}
@keyframes rc-sip-in {
  from { opacity: 0; transform: translateX(100%); }
  to { opacity: 1; transform: translateX(0); }
}"""
    },
    {
        "name": "Modal Backdrop Blur",
        "className": "rc-modal-backdrop-blur",
        "category": "navigation",
        "displayType": "box",
        "css": """.rc-modal-backdrop-blur {
  position: fixed; inset: 0; z-index: 50;
  background: rgba(0,0,0,0.5); backdrop-filter: blur(8px);
  animation: rc-mbb-in 0.25s ease both;
  display: grid; place-items: center;
}
@keyframes rc-mbb-in {
  from { opacity: 0; backdrop-filter: blur(0); }
  to { opacity: 1; backdrop-filter: blur(8px); }
}"""
    },
    {
        "name": "Tooltip Follow",
        "className": "rc-tooltip-follow",
        "category": "navigation",
        "displayType": "box",
        "css": """.rc-tooltip-follow {
  position: absolute; z-index: 100; padding: 6px 12px;
  border-radius: 8px; background: #1e293b; color: #f1f5f9;
  font-size: 12px; white-space: nowrap; pointer-events: none;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  animation: rc-ttf-in 0.15s ease both;
}
@keyframes rc-ttf-in {
  from { opacity: 0; transform: translateY(4px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}"""
    },
    {
        "name": "Drag Handle Grip",
        "className": "rc-drag-handle-grip",
        "category": "navigation",
        "displayType": "box",
        "css": """.rc-drag-handle-grip {
  width: 32px; height: 24px; display: flex; flex-direction: column;
  justify-content: center; align-items: center; gap: 4px; cursor: grab;
  opacity: 0.3; transition: opacity 0.2s ease;
}
.rc-drag-handle-grip:hover { opacity: 0.7; }
.rc-drag-handle-grip::before,
.rc-drag-handle-grip::after {
  content: ''; width: 16px; height: 2px; border-radius: 1px;
  background: currentColor;
  background-image: repeating-linear-gradient(
    90deg, currentColor 0px, currentColor 2px, transparent 2px, transparent 5px
  );
}"""
    },
    {
        "name": "Context Menu",
        "className": "rc-context-menu",
        "category": "navigation",
        "displayType": "box",
        "css": """.rc-context-menu {
  min-width: 180px; padding: 4px; border-radius: 10px;
  background: #1e293b; border: 1px solid rgba(148,163,184,0.12);
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
  animation: rc-cm-in 0.15s cubic-bezier(0.22,1,0.36,1) both;
  transform-origin: top left;
}
.rc-context-menu .item {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 12px; border-radius: 6px; font-size: 13px;
  color: rgba(241,245,249,0.8); cursor: pointer;
  transition: background 0.1s ease;
}
.rc-context-menu .item:hover { background: rgba(168,85,247,0.1); }
@keyframes rc-cm-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}"""
    },

    # --- State Cards (6 missing) ---
    {
        "name": "Empty State",
        "className": "rc-empty-state",
        "category": "button-card",
        "displayType": "box",
        "css": """.rc-empty-state {
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; padding: 48px 24px; text-align: center;
  animation: rc-es-in 0.5s ease both;
}
.rc-empty-state .icon {
  font-size: 48px; opacity: 0.15; margin-bottom: 16px;
  animation: rc-es-float 3s ease-in-out infinite;
}
@keyframes rc-es-in { from { opacity: 0; transform: translateY(12px); } }
@keyframes rc-es-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}"""
    },
    {
        "name": "Error State",
        "className": "rc-error-state",
        "category": "button-card",
        "displayType": "box",
        "css": """.rc-error-state {
  padding: 32px; border-radius: 16px;
  border: 1px solid rgba(239,68,68,0.2); background: rgba(239,68,68,0.04);
  animation: rc-ers-in 0.4s ease both;
}
@keyframes rc-ers-in {
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
}"""
    },
    {
        "name": "Success State",
        "className": "rc-success-state",
        "category": "button-card",
        "displayType": "box",
        "css": """.rc-success-state {
  padding: 32px; border-radius: 16px;
  border: 1px solid rgba(34,197,94,0.2); background: rgba(34,197,94,0.04);
  animation: rc-ss-in 0.4s cubic-bezier(0.22,1,0.36,1) both;
}
@keyframes rc-ss-in {
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
}"""
    },
    {
        "name": "Profile Avatar",
        "className": "rc-profile-avatar",
        "category": "button-card",
        "displayType": "box",
        "css": """.rc-profile-avatar {
  width: 64px; height: 64px; border-radius: 50%;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  display: grid; place-items: center; color: #fff;
  font-weight: 700; font-size: 24px; position: relative;
  transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
}
.rc-profile-avatar:hover { transform: scale(1.08); }
.rc-profile-avatar .status {
  position: absolute; bottom: 2px; right: 2px;
  width: 14px; height: 14px; border-radius: 50%;
  background: #22c55e; border: 2px solid #0f0f14;
}"""
    },
    {
        "name": "Notification Card",
        "className": "rc-notification-card",
        "category": "button-card",
        "displayType": "box",
        "css": """.rc-notification-card {
  padding: 16px 20px; border-radius: 12px;
  background: rgba(30,41,59,0.8); border: 1px solid rgba(148,163,184,0.1);
  backdrop-filter: blur(12px); max-width: 360px;
  animation: rc-nc-in 0.4s cubic-bezier(0.22,1,0.36,1) both;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
}
@keyframes rc-nc-in {
  from { opacity: 0; transform: translateX(100%) scale(0.95); }
  to { opacity: 1; transform: translateX(0) scale(1); }
}"""
    },
    {
        "name": "Search Result",
        "className": "rc-search-result",
        "category": "button-card",
        "displayType": "box",
        "css": """.rc-search-result {
  padding: 12px 16px; border-radius: 10px;
  transition: background 0.15s ease; cursor: pointer;
  border: 1px solid transparent;
}
.rc-search-result:hover {
  background: rgba(168,85,247,0.06);
  border-color: rgba(168,85,247,0.12);
}
.rc-search-result .title { font-weight: 600; font-size: 14px; color: #f1f5f9; }
.rc-search-result .desc { font-size: 12px; color: rgba(148,163,184,0.6); margin-top: 2px; }
.rc-search-result mark { background: rgba(168,85,247,0.2); color: #c084fc; border-radius: 2px; padding: 0 2px; }"""
    },

    # ═══════════════════════════════════════════════════════
    # BATCH 13: CSS Art & Experiments (32 effects)
    # ═══════════════════════════════════════════════════════

    # --- Pure CSS Paintings (12) ---
    {
        "name": "CSS Sunset Painting",
        "className": "rc-css-sunset-painting",
        "category": "backgrounds",
        "displayType": "box",
        "css": """.rc-css-sunset-painting {
  background:
    linear-gradient(180deg,
      #0f0c29 0%, #302b63 25%, #24243e 35%,
      #e65c00 50%, #f9d423 55%, #ff6a00 58%,
      #ff4e00 65%, #e65c00 75%, #1a0530 100%
    );
  position: relative; overflow: hidden;
}
.rc-css-sunset-painting::before {
  content: ''; position: absolute; bottom: 40%; left: 0; right: 0; height: 4px;
  background: #f9d423; box-shadow: 0 0 20px 8px rgba(249,212,35,0.4);
}
.rc-css-sunset-painting::after {
  content: ''; position: absolute; bottom: 0; left: -10%; right: -10%; height: 45%;
  background:
    linear-gradient(135deg, transparent 33%, #0a0a12 33%, #0a0a12 34%, transparent 34%),
    linear-gradient(160deg, transparent 40%, #0d0d18 40%, #0d0d18 41%, transparent 41%),
    linear-gradient(120deg, transparent 28%, #111 28%, #111 29%, transparent 29%);
  clip-path: polygon(0 30%, 15% 10%, 35% 25%, 55% 5%, 75% 20%, 100% 15%, 100% 100%, 0 100%);
}"""
    },
    {
        "name": "CSS Forest",
        "className": "rc-css-forest",
        "category": "backgrounds",
        "displayType": "box",
        "css": """.rc-css-forest {
  background: linear-gradient(180deg, #87ceeb 0%, #98d4ee 40%, #4a7c59 40.5%, #2d5a3f 100%);
  position: relative; overflow: hidden;
}
.rc-css-forest::before {
  content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 60%;
  background:
    conic-gradient(from 250deg at 20% 0%, #1a4d2e 0deg, transparent 40deg) no-repeat 10% 0 / 40px 80%,
    conic-gradient(from 250deg at 20% 0%, #2d6b45 0deg, transparent 35deg) no-repeat 25% 0 / 35px 70%,
    conic-gradient(from 250deg at 20% 0%, #1e5c3a 0deg, transparent 45deg) no-repeat 42% 0 / 45px 90%,
    conic-gradient(from 250deg at 20% 0%, #246b42 0deg, transparent 38deg) no-repeat 58% 0 / 38px 75%,
    conic-gradient(from 250deg at 20% 0%, #1a5c38 0deg, transparent 42deg) no-repeat 73% 0 / 50px 85%,
    conic-gradient(from 250deg at 20% 0%, #2a6b48 0deg, transparent 36deg) no-repeat 88% 0 / 42px 65%;
}"""
    },
    {
        "name": "Desert",
        "className": "rc-desert",
        "category": "backgrounds",
        "displayType": "box",
        "css": """.rc-desert {
  background: linear-gradient(180deg, #f97316 0%, #fbbf24 20%, #fde68a 40%, #d4a855 60%, #c4956a 80%, #a0785a 100%);
  position: relative; overflow: hidden;
}
.rc-desert::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 50%;
  background: radial-gradient(circle at 70% 20%, #fef08a 0%, transparent 50%);
}
.rc-desert::after {
  content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 30%;
  background:
    repeating-linear-gradient(90deg, transparent 0px, transparent 40px, rgba(180,120,60,0.3) 40px, rgba(180,120,60,0.3) 42px),
    repeating-linear-gradient(0deg, transparent 0px, transparent 20px, rgba(160,120,90,0.15) 20px, rgba(160,120,90,0.15) 22px);
}"""
    },
    {
        "name": "City Night",
        "className": "rc-city-night",
        "category": "backgrounds",
        "displayType": "box",
        "css": """.rc-city-night {
  background: linear-gradient(180deg, #0a0a2e 0%, #1a1a3e 60%, #2a1a3e 100%);
  position: relative; overflow: hidden;
}
.rc-city-night::before {
  content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 50%;
  background:
    linear-gradient(90deg, #111 0%, #111 5%, transparent 5%, transparent 10%,
      #111 10%, #111 12%, transparent 12%, transparent 18%,
      #111 18%, #111 22%, transparent 22%, transparent 30%,
      #111 30%, #111 33%, transparent 33%, transparent 42%,
      #111 42%, #111 48%, transparent 48%, transparent 55%,
      #111 55%, #111 60%, transparent 60%, transparent 68%,
      #111 68%, #111 72%, transparent 72%, transparent 80%,
      #111 80%, #111 85%, transparent 85%, transparent 92%,
      #111 92%, #111 100%);
  mask-image: linear-gradient(to top, #000 0%, #000 60%, transparent 100%);
}
.rc-city-night::after {
  content: ''; position: absolute; bottom: 30%; left: 0; right: 0; height: 30%;
  background: radial-gradient(ellipse 1px 40px at 15% 80%, #fbbf24 0%, transparent 100%),
    radial-gradient(ellipse 1px 60px at 35% 70%, #fbbf24 0%, transparent 100%),
    radial-gradient(ellipse 1px 30px at 55% 85%, #60a5fa 0%, transparent 100%),
    radial-gradient(ellipse 1px 50px at 75% 75%, #fbbf24 0%, transparent 100%),
    radial-gradient(ellipse 1px 45px at 90% 80%, #f472b6 0%, transparent 100%);
}"""
    },
    {
        "name": "Rainbow Arc",
        "className": "rc-rainbow-arc",
        "category": "backgrounds",
        "displayType": "box",
        "css": """.rc-rainbow-arc {
  background: linear-gradient(180deg, #87ceeb 0%, #b4d7e8 50%, #90ee90 50%, #90ee90 55%, #ffff00 55%, #ffff00 60%, #ffa500 60%, #ffa500 65%, #ff6347 65%, #ff6347 70%, #8b00ff 70%, #8b00ff 75%, transparent 75%);
  position: relative; border-radius: 50% 50% 0 0;
}"""
    },
    {
        "name": "Underwater Scene",
        "className": "rc-underwater-scene",
        "category": "backgrounds",
        "displayType": "box",
        "css": """.rc-underwater-scene {
  background: linear-gradient(180deg, #0077b6 0%, #005f8a 30%, #023e58 70%, #001524 100%);
  position: relative; overflow: hidden;
}
.rc-underwater-scene::before {
  content: ''; position: absolute; inset: 0;
  background: repeating-linear-gradient(
    0deg, transparent 0px, transparent 30px,
    rgba(255,255,255,0.03) 30px, rgba(255,255,255,0.03) 32px
  );
  animation: rc-uw-waves 4s ease-in-out infinite;
}
.rc-underwater-scene::after {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(circle at 30% 40%, rgba(144,224,239,0.15) 0%, transparent 50%),
    radial-gradient(circle at 70% 60%, rgba(0,180,216,0.1) 0%, transparent 40%);
}
@keyframes rc-uw-waves {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}"""
    },
    {
        "name": "Volcano Eruption",
        "className": "rc-volcano-eruption",
        "category": "backgrounds",
        "displayType": "box",
        "css": """.rc-volcano-eruption {
  background: linear-gradient(180deg, #1a0a00 0%, #2d1b00 30%, #4a2800 50%, #8b4513 60%, #3d2b1f 65%, #2d1f14 100%);
  position: relative; overflow: hidden;
}
.rc-volcano-eruption::before {
  content: ''; position: absolute; top: 0; left: 30%; right: 30%; height: 55%;
  background: linear-gradient(180deg, #ff4500 0%, #ff6347 30%, #ffa500 60%, transparent 100%);
  clip-path: polygon(35% 100%, 50% 0%, 65% 100%);
  animation: rc-ve-erupt 3s ease-in-out infinite alternate;
}
.rc-volcano-eruption::after {
  content: ''; position: absolute; top: -20%; left: 25%; right: 25%; height: 40%;
  background: radial-gradient(ellipse at 50% 100%, rgba(255,69,0,0.6) 0%, rgba(255,165,0,0.2) 40%, transparent 70%);
  animation: rc-ve-glow 2s ease-in-out infinite alternate;
}
@keyframes rc-ve-erupt { to { clip-path: polygon(25% 100%, 50% -10%, 75% 100%); } }
@keyframes rc-ve-glow { to { opacity: 0.5; } }"""
    },
    {
        "name": "Snowy Mountain",
        "className": "rc-snowy-mountain",
        "category": "backgrounds",
        "displayType": "box",
        "css": """.rc-snowy-mountain {
  background: linear-gradient(180deg, #e0f2fe 0%, #bae6fd 30%, #7dd3fc 50%, #38bdf8 60%, #0284c7 100%);
  position: relative; overflow: hidden;
}
.rc-snowy-mountain::before {
  content: ''; position: absolute; bottom: 10%; left: 0; right: 0; height: 60%;
  background: linear-gradient(135deg, transparent 30%, #475569 30%, #475569 35%, #94a3b8 35%, #94a3b8 38%, #64748b 38%, #64748b 50%, transparent 50%),
    linear-gradient(225deg, transparent 25%, #475569 25%, #475569 30%, #cbd5e1 30%, #cbd5e1 33%, #64748b 33%, #64748b 55%, transparent 55%);
}
.rc-snowy-mountain::after {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(2px 2px at 20% 15%, #fff 100%, transparent 100%),
    radial-gradient(2px 2px at 50% 25%, #fff 100%, transparent 100%),
    radial-gradient(2px 2px at 80% 10%, #fff 100%, transparent 100%),
    radial-gradient(1px 1px at 35% 35%, #fff 100%, transparent 100%);
  animation: rc-sm-snow 4s linear infinite;
}
@keyframes rc-sm-snow { to { transform: translateY(20px); opacity: 0; } }"""
    },
    {
        "name": "Tropical Beach",
        "className": "rc-tropical-beach",
        "category": "backgrounds",
        "displayType": "box",
        "css": """.rc-tropical-beach {
  background: linear-gradient(180deg, #38bdf8 0%, #0ea5e9 25%, #0284c7 40%, #22d3ee 42%, #67e8f9 55%, #fde68a 55%, #f59e0b 70%, #d97706 85%, #92400e 100%);
  position: relative; overflow: hidden;
}
.rc-tropical-beach::before {
  content: ''; position: absolute; top: 0; right: 0; width: 30%; height: 25%;
  background: radial-gradient(circle at 80% 20%, #fef08a 0%, transparent 60%);
}
.rc-tropical-beach::after {
  content: ''; position: absolute; top: 52%; left: 0; right: 0; height: 8%;
  background: repeating-linear-gradient(90deg, rgba(255,255,255,0.3) 0px, rgba(255,255,255,0.3) 20px, transparent 20px, transparent 40px);
  animation: rc-tb-wave 3s ease-in-out infinite;
}
@keyframes rc-tb-wave { 0%, 100% { transform: scaleX(1); } 50% { transform: scaleX(1.02); } }"""
    },

    # --- Optical Illusions & Generative Art (12) ---
    {
        "name": "Hypnosis Spiral",
        "className": "rc-hypnosis-spiral",
        "category": "backgrounds",
        "displayType": "box",
        "css": """.rc-hypnosis-spiral {
  background: repeating-conic-gradient(
    from 0deg, #a855f7 0deg 10deg, transparent 10deg 20deg
  );
  border-radius: 50%; animation: rc-hs-spin 8s linear infinite;
}
@keyframes rc-hs-spin { to { transform: rotate(360deg); } }"""
    },
    {
        "name": "Depth Illusion",
        "className": "rc-depth-illusion",
        "category": "backgrounds",
        "displayType": "box",
        "css": """.rc-depth-illusion {
  background:
    repeating-conic-gradient(#1e1b4b 0% 25%, #0f0a1a 0% 50%) 50% / 60px 60px,
    radial-gradient(circle, #a855f7 1px, transparent 1px) 0 0 / 20px 20px;
  animation: rc-di-shift 2s ease-in-out infinite alternate;
}
@keyframes rc-di-shift {
  0% { background-position: 0 0, 0 0; }
  100% { background-position: 30px 30px, 10px 10px; }
}"""
    },
    {
        "name": "Motion Illusion",
        "className": "rc-motion-illusion",
        "category": "backgrounds",
        "displayType": "box",
        "css": """.rc-motion-illusion {
  background:
    radial-gradient(circle, #a855f7 1.5px, transparent 1.5px) 0 0 / 30px 30px;
  animation: rc-mi-drift 1s linear infinite;
}
@keyframes rc-mi-drift { to { background-position: 15px 15px; } }"""
    },
    {
        "name": "Impossible Triangle",
        "className": "rc-impossible-triangle",
        "category": "backgrounds",
        "displayType": "box",
        "css": """.rc-impossible-triangle {
  position: relative; display: grid; place-items: center;
}
.rc-impossible-triangle::before {
  content: ''; width: 0; height: 0; border-left: 80px solid transparent;
  border-right: 80px solid transparent; border-bottom: 140px solid #a855f7;
  transform: rotate(-30deg); position: absolute;
}
.rc-impossible-triangle::after {
  content: ''; width: 0; height: 0; border-left: 80px solid transparent;
  border-right: 80px solid transparent; border-bottom: 140px solid #ec4899;
  transform: rotate(30deg); position: absolute; clip-path: inset(0 0 50% 0);
}"""
    },
    {
        "name": "Barber Pole",
        "className": "rc-barber-pole",
        "category": "backgrounds",
        "displayType": "box",
        "css": """.rc-barber-pole {
  background: repeating-linear-gradient(
    180deg, #ef4444 0px, #ef4444 20px, #fff 20px, #fff 30px,
    #3b82f6 30px, #3b82f6 50px, #fff 50px, #fff 60px
  );
  background-size: 100% 60px;
  animation: rc-bp-scroll 1s linear infinite;
  border-radius: 24px;
}
@keyframes rc-bp-scroll { to { background-position: 0 60px; } }"""
    },
    {
        "name": "Cafe Wall Illusion",
        "className": "rc-cafe-wall-illusion",
        "category": "backgrounds",
        "displayType": "box",
        "css": """.rc-cafe-wall-illusion {
  background:
    repeating-linear-gradient(
      0deg,
      #1e293b 0px, #1e293b 20px,
      #334155 20px, #334155 40px
    ),
    repeating-linear-gradient(
      90deg,
      transparent 0px, transparent 20px,
      rgba(168,85,247,0.3) 20px, rgba(168,85,247,0.3) 40px
    );
  background-blend-mode: overlay;
}
.rc-cafe-wall-illusion::before {
  content: ''; position: absolute; inset: 0;
  background: repeating-linear-gradient(
    45deg, transparent 0px, transparent 10px,
    rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 12px
  );
}"""
    },
    {
        "name": "Mondrian",
        "className": "rc-mondrian",
        "category": "backgrounds",
        "displayType": "box",
        "css": """.rc-mondrian {
  background:
    linear-gradient(to right, #fff 0%, #fff 60%, #ef4444 60%, #ef4444 62%, #fff 62%, #fff 100%) no-repeat 0 0 / 100% 60%,
    linear-gradient(to right, #fff 0%, #fff 35%, #3b82f6 35%, #3b82f6 65%, #fff 65%, #fff 100%) no-repeat 0 60% / 100% 25%,
    linear-gradient(to right, #fbbf24 0%, #fbbf24 40%, #fff 40%, #fff 100%) no-repeat 0 85% / 100% 15%,
    linear-gradient(to bottom, #fff 0%, #fff 70%, #000 70%, #000 72%, #fff 72%) no-repeat 60% 25% / 40% 75%;
  border: 4px solid #000;
}"""
    },
    {
        "name": "Pixel Portrait",
        "className": "rc-pixel-portrait",
        "category": "backgrounds",
        "displayType": "box",
        "css": """.rc-pixel-portrait {
  image-rendering: pixelated;
  background:
    radial-gradient(circle 4px at 50% 30%, #fde68a, transparent),
    radial-gradient(circle 12px at 50% 50%, #fbbf24, transparent),
    radial-gradient(circle 16px at 50% 65%, #92400e, transparent),
    radial-gradient(circle 20px at 50% 45%, #f59e0b, transparent),
    radial-gradient(circle 2px at 44% 35%, #292524, transparent),
    radial-gradient(circle 2px at 56% 35%, #292524, transparent),
    radial-gradient(circle 6px at 50% 52%, #fff, transparent);
  background-size: 100% 100%;
  image-rendering: pixelated;
}"""
    },
    {
        "name": "Geometric Mandala",
        "className": "rc-geometric-mandala",
        "category": "backgrounds",
        "displayType": "box",
        "css": """.rc-geometric-mandala {
  background:
    conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(168,85,247,0.15) 30deg, transparent 30deg),
    conic-gradient(from 30deg at 50% 50%, transparent 0deg, rgba(236,72,153,0.15) 30deg, transparent 30deg),
    conic-gradient(from 60deg at 50% 50%, transparent 0deg, rgba(59,130,246,0.15) 30deg, transparent 30deg),
    conic-gradient(from 90deg at 50% 50%, transparent 0deg, rgba(168,85,247,0.15) 30deg, transparent 30deg),
    conic-gradient(from 120deg at 50% 50%, transparent 0deg, rgba(236,72,153,0.15) 30deg, transparent 30deg),
    conic-gradient(from 150deg at 50% 50%, transparent 0deg, rgba(59,130,246,0.15) 30deg, transparent 30deg);
  animation: rc-gm-spin 20s linear infinite;
}
@keyframes rc-gm-spin { to { transform: rotate(360deg); } }"""
    },
    {
        "name": "Fractal Tree",
        "className": "rc-fractal-tree",
        "category": "backgrounds",
        "displayType": "box",
        "css": """.rc-fractal-tree {
  background: linear-gradient(180deg, #0f172a, #1e293b);
  position: relative; overflow: hidden;
}
.rc-fractal-tree::before {
  content: ''; position: absolute; bottom: 10%; left: 50%;
  width: 4px; height: 40%; background: #92400e;
  transform: translateX(-50%) rotate(0deg);
  transform-origin: bottom center; border-radius: 2px;
  box-shadow:
    60px -30px 0 -2px #a16207, -60px -30px 0 -2px #a16207,
    30px -60px 0 -3px #15803d, -30px -60px 0 -3px #15803d,
    90px -50px 0 -3px #15803d, -90px -50px 0 -3px #15803d,
    15px -80px 0 -4px #22c55e, -15px -80px 0 -4px #22c55e,
    45px -80px 0 -4px #22c55e, -45px -80px 0 -4px #22c55e;
}"""
    },
    {
        "name": "Tessellation",
        "className": "rc-tessellation",
        "category": "backgrounds",
        "displayType": "box",
        "css": """.rc-tessellation {
  background:
    linear-gradient(60deg, rgba(168,85,247,0.15) 25%, transparent 25%),
    linear-gradient(-60deg, rgba(168,85,247,0.15) 25%, transparent 25%),
    linear-gradient(60deg, transparent 75%, rgba(168,85,247,0.15) 75%),
    linear-gradient(-60deg, transparent 75%, rgba(168,85,247,0.15) 75%);
  background-size: 40px 70px;
  background-position: 0 0, 0 0, 20px 35px, 20px 35px;
}"""
    },
    {
        "name": "Voronoi Cells",
        "className": "rc-voronoi-cells",
        "category": "backgrounds",
        "displayType": "box",
        "css": """.rc-voronoi-cells {
  background:
    radial-gradient(circle at 20% 30%, rgba(168,85,247,0.2) 0%, rgba(168,85,247,0.05) 20%, transparent 20%),
    radial-gradient(circle at 70% 20%, rgba(236,72,153,0.2) 0%, rgba(236,72,153,0.05) 18%, transparent 18%),
    radial-gradient(circle at 50% 60%, rgba(59,130,246,0.2) 0%, rgba(59,130,246,0.05) 22%, transparent 22%),
    radial-gradient(circle at 30% 80%, rgba(16,185,129,0.2) 0%, rgba(16,185,129,0.05) 15%, transparent 15%),
    radial-gradient(circle at 80% 70%, rgba(251,191,36,0.15) 0%, rgba(251,191,36,0.05) 25%, transparent 25%),
    radial-gradient(circle at 10% 60%, rgba(244,63,94,0.15) 0%, rgba(244,63,94,0.05) 20%, transparent 20%),
    linear-gradient(135deg, #0f0a1a, #1a0f2e);
}"""
    },

    # --- Mechanical Loops (10) ---
    {
        "name": "Hypnotic Spiral",
        "className": "rc-hypnotic-spiral",
        "category": "backgrounds",
        "displayType": "box",
        "css": """.rc-hypnotic-spiral {
  background: repeating-conic-gradient(
    from 0deg, rgba(168,85,247,0.6) 0deg 5deg, transparent 5deg 15deg
  );
  border-radius: 50%;
  animation: rc-hy-sp 4s linear infinite;
}
@keyframes rc-hy-sp { to { transform: rotate(360deg); } }"""
    },
    {
        "name": "Infinite Zoom Tunnel",
        "className": "rc-infinite-zoom-tunnel",
        "category": "backgrounds",
        "displayType": "box",
        "css": """.rc-infinite-zoom-tunnel {
  background:
    repeating-radial-gradient(
      circle at center,
      transparent 0px, transparent 30px,
      rgba(168,85,247,0.1) 30px, rgba(168,85,247,0.1) 32px
    );
  animation: rc-izt-zoom 3s ease-in-out infinite;
}
@keyframes rc-izt-zoom {
  0% { background-size: 100% 100%; opacity: 0.5; }
  50% { background-size: 200% 200%; opacity: 1; }
  100% { background-size: 100% 100%; opacity: 0.5; }
}"""
    },
    {
        "name": "Matrix Rain Fall",
        "className": "rc-matrix-rain-fall",
        "category": "backgrounds",
        "displayType": "box",
        "css": """.rc-matrix-rain-fall {
  background: #0a0a0a; position: relative; overflow: hidden;
  font-family: monospace; color: #00ff41;
}
.rc-matrix-rain-fall::before {
  content: '01'; position: absolute; top: -100%;
  font-size: 14px; line-height: 1.2;
  letter-spacing: 4px; writing-mode: vertical-rl;
  animation: rc-mrf-fall 4s linear infinite;
  text-shadow: 0 0 8px rgba(0,255,65,0.6);
}
.rc-matrix-rain-fall::after {
  content: '101100'; position: absolute; top: -100%; right: 20%;
  font-size: 12px; line-height: 1.3;
  letter-spacing: 3px; writing-mode: vertical-rl;
  animation: rc-mrf-fall 5s linear 1s infinite;
  text-shadow: 0 0 6px rgba(0,255,65,0.4); opacity: 0.6;
}
@keyframes rc-mrf-fall { to { top: 100%; } }"""
    },
    {
        "name": "Star Wars Crawl",
        "className": "rc-star-wars-crawl",
        "category": "text",
        "displayType": "text",
        "css": """.rc-star-wars-crawl {
  perspective: 400px; overflow: hidden; height: 200px;
  display: flex; align-items: flex-end;
}
.rc-star-wars-crawl .text {
  transform-origin: 50% 100%; transform: rotateX(25deg);
  animation: rc-swc-crawl 20s linear both;
  color: #fbbf24; font-weight: 700;
  text-align: justify; line-height: 1.6;
}
@keyframes rc-swc-crawl {
  from { transform: rotateX(25deg) translateY(100%); }
  to { transform: rotateX(25deg) translateY(-300%); }
}"""
    },
    {
        "name": "Conveyor Belt",
        "className": "rc-conveyor-belt",
        "category": "backgrounds",
        "displayType": "box",
        "css": """.rc-conveyor-belt {
  background:
    repeating-linear-gradient(
      90deg, rgba(148,163,184,0.15) 0px, rgba(148,163,184,0.15) 3px,
      transparent 3px, transparent 20px
    ),
    linear-gradient(180deg, rgba(148,163,184,0.05), rgba(148,163,184,0.02));
  animation: rc-cb-move 2s linear infinite;
}
@keyframes rc-cb-move { to { background-position: 20px 0, 0 0; } }"""
    },
    {
        "name": "Escalator Steps",
        "className": "rc-escalator-steps",
        "category": "backgrounds",
        "displayType": "box",
        "css": """.rc-escalator-steps {
  background:
    repeating-linear-gradient(
      0deg, transparent 0px, transparent 18px,
      rgba(148,163,184,0.12) 18px, rgba(148,163,184,0.12) 20px
    ),
    repeating-linear-gradient(
      90deg, transparent 0px, transparent 18px,
      rgba(148,163,184,0.12) 18px, rgba(148,163,184,0.12) 20px
    );
  animation: rc-es-move 3s linear infinite;
}
@keyframes rc-es-move { to { background-position: 20px 20px, 20px 20px; } }"""
    },
    {
        "name": "Windmill Spin",
        "className": "rc-windmill-spin",
        "category": "loaders",
        "displayType": "loader",
        "css": """.rc-windmill-spin {
  width: 60px; height: 60px; position: relative;
  animation: rc-wms-spin 3s linear infinite;
}
.rc-windmill-spin::before {
  content: ''; position: absolute; top: 50%; left: 50%;
  width: 4px; height: 50%; background: #a855f7;
  transform-origin: top center; border-radius: 2px;
  transform: translateX(-50%) rotate(0deg);
  box-shadow: 0 24px 0 -1px #a855f7;
}
@keyframes rc-wms-spin { to { transform: rotate(360deg); } }"""
    },
    {
        "name": "Ferris Wheel",
        "className": "rc-ferris-wheel",
        "category": "loaders",
        "displayType": "loader",
        "css": """.rc-ferris-wheel {
  width: 80px; height: 80px; border-radius: 50%;
  border: 3px solid rgba(168,85,247,0.3); position: relative;
  animation: rc-fw-spin 6s linear infinite;
}
.rc-ferris-wheel::before {
  content: ''; position: absolute; top: 50%; left: 50%;
  width: 50px; height: 50px; border-radius: 50%;
  border: 2px dashed rgba(168,85,247,0.2);
  transform: translate(-50%, -50%);
}
.rc-ferris-wheel::after {
  content: ''; position: absolute;
  width: 8px; height: 8px; border-radius: 50%;
  background: #ec4899; top: -4px; left: calc(50% - 4px);
  box-shadow:
    0 80px 0 #a855f7, 56.6px 40px 0 #3b82f6,
    56.6px -40px 0 #fbbf24, 0 -80px 0 #22c55e,
    -56.6px -40px 0 #f472b6, -56.6px 40px 0 #06b6d4;
}
@keyframes rc-fw-spin { to { transform: rotate(360deg); } }"""
    },
    {
        "name": "Clock Tick",
        "className": "rc-clock-tick",
        "category": "loaders",
        "displayType": "loader",
        "css": """.rc-clock-tick {
  width: 60px; height: 60px; border-radius: 50%;
  border: 2px solid rgba(148,163,184,0.3); position: relative;
}
.rc-clock-tick::before {
  content: ''; position: absolute; bottom: 50%; left: calc(50% - 1.5px);
  width: 3px; height: 35%; background: #a855f7;
  transform-origin: bottom center; border-radius: 2px;
  animation: rc-ct-tick 1s steps(60, end) infinite;
}
.rc-clock-tick::after {
  content: ''; position: absolute; bottom: 50%; left: calc(50% - 1px);
  width: 2px; height: 25%; background: #ec4899;
  transform-origin: bottom center; border-radius: 1px;
  animation: rc-ct-tick 60s steps(60, end) infinite;
}
@keyframes rc-ct-tick { to { transform: rotate(360deg); } }"""
    },

    # --- Artistic Typography (4 missing) ---
    {
        "name": "3D Gradient Flow",
        "className": "rc-3d-gradient-flow",
        "category": "text",
        "displayType": "text",
        "css": """@property --rc-3gf-pos { syntax: '<percentage>'; inherits: false; initial-value: 0%; }
.rc-3d-gradient-flow {
  background: linear-gradient(135deg, #a855f7, #ec4899, #3b82f6, #10b981, #a855f7);
  background-size: 300% 300%; background-clip: text;
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  animation: rc-3gf-flow 4s ease infinite;
  transform: perspective(500px) rotateX(5deg);
}
@keyframes rc-3gf-flow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}"""
    },
    {
        "name": "Matrix Glitch",
        "className": "rc-matrix-glitch",
        "category": "text",
        "displayType": "text",
        "css": """.rc-matrix-glitch {
  position: relative; animation: rc-mg-glitch 3s infinite;
}
.rc-matrix-glitch::before, .rc-matrix-glitch::after {
  content: attr(data-text); position: absolute; top: 0; left: 0;
  width: 100%; height: 100%; overflow: hidden;
}
.rc-matrix-glitch::before {
  color: #0ff; z-index: -1;
  animation: rc-mg-clip1 2s infinite linear alternate-reverse;
}
.rc-matrix-glitch::after {
  color: #f0f; z-index: -2;
  animation: rc-mg-clip2 3s infinite linear alternate-reverse;
}
@keyframes rc-mg-glitch {
  0%, 95%, 100% { transform: translate(0); }
  96% { transform: translate(-2px, 1px); }
  97% { transform: translate(2px, -1px); }
  98% { transform: translate(-1px, 2px); }
}
@keyframes rc-mg-clip1 {
  0% { clip-path: inset(20% 0 60% 0); }
  100% { clip-path: inset(50% 0 30% 0); }
}
@keyframes rc-mg-clip2 {
  0% { clip-path: inset(60% 0 20% 0); }
  100% { clip-path: inset(10% 0 70% 0); }
}"""
    },
]

import json
with open('/tmp/batch12_13_effects.json', 'w') as f:
    json.dump(EFFECTS, f, indent=2)

cats = {}
for e in EFFECTS:
    cats[e['category']] = cats.get(e['category'], 0) + 1
print(f"Built {len(EFFECTS)} effects:")
for c, n in sorted(cats.items()):
    print(f"  {c}: +{n}")