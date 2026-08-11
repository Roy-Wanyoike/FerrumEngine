// Type-strict compliance: fixed noUncheckedIndexedAccess + noUnusedLocals
/* ═══════════════════════════════════════════════════════════════
   FERRUM PLAYGROUND 2.0 — Data, Types & Code Generation
   ═══════════════════════════════════════════════════════════════ */

import type { LucideIconName } from "@/lib/icon-resolver";

/* ═══════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════ */

export type SidebarActivity = "components" | "effects" | "templates";
export type ViewMode = "split" | "code" | "preview";
export type ExportFormat = "html" | "css" | "react" | "vue" | "svelte" | "angular" | "webcomponents";

export interface MotionConfig {
  duration: number;
  delay: number;
  easing: string;
  easingName: string;
  iterations: string;
  direction: string;
  fillMode: string;
}

export interface PhysicsConfig {
  tension: number;
  friction: number;
  mass: number;
  bounce: number;
}

export interface ThemeConfig {
  primary: string;
  secondary: string;
  bg: string;
  surface: string;
  text: string;
  radius: number;
  shadow: number;
}

export interface DevicePreset {
  id: string;
  label: string;
  width: number;
  height: number;
  icon: LucideIconName;
}

export interface PlaygroundComponent {
  id: string;
  label: string;
  category: string;
  icon: LucideIconName;
  description: string;
}

/* ═══════════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════════ */

export const DEFAULT_MOTION: MotionConfig = {
  duration: 0.6,
  delay: 0,
  easing: "cubic-bezier(0.33, 1, 0.68, 1)",
  easingName: "easeOutExpo",
  iterations: "infinite",
  direction: "normal",
  fillMode: "both",
};

export const DEFAULT_PHYSICS: PhysicsConfig = {
  tension: 120,
  friction: 14,
  mass: 1,
  bounce: 0.5,
};

export const DEFAULT_THEME: ThemeConfig = {
  primary: "#a855f7",
  secondary: "#ec4899",
  bg: "#09090b",
  surface: "#18181b",
  text: "#fafafa",
  radius: 12,
  shadow: 0.3,
};

export const DEVICES: DevicePreset[] = [
  { id: "desktop", label: "Desktop", width: 1440, height: 900, icon: "LayoutDashboard" },
  { id: "laptop", label: "Laptop", width: 1024, height: 768, icon: "Square" },
  { id: "tablet", label: "Tablet", width: 768, height: 1024, icon: "Tablet" },
  { id: "mobile", label: "Mobile", width: 375, height: 812, icon: "Smartphone" },
];

export const EASING_PRESETS: { name: string; value: string; curve?: [number, number, number, number] }[] = [
  { name: "Linear", value: "linear" },
  { name: "Ease", value: "ease" },
  { name: "Ease In", value: "ease-in" },
  { name: "Ease Out", value: "ease-out" },
  { name: "Ease In Out", value: "ease-in-out" },
  { name: "easeOutExpo", value: "cubic-bezier(0.33, 1, 0.68, 1)", curve: [0.33, 1, 0.68, 1] },
  { name: "easeInCubic", value: "cubic-bezier(0.32, 0, 0.67, 0)", curve: [0.32, 0, 0.67, 0] },
  { name: "easeOutBack", value: "cubic-bezier(0.34, 1.56, 0.64, 1)", curve: [0.34, 1.56, 0.64, 1] },
  { name: "easeOutBounce", value: "cubic-bezier(0.22, 1.2, 0.36, 1)", curve: [0.22, 1.2, 0.36, 1] },
  { name: "Spring (Apple)", value: "cubic-bezier(0.175, 0.885, 0.32, 1.275)", curve: [0.175, 0.885, 0.32, 1.275] },
  { name: "Snappy", value: "cubic-bezier(0.5, 0, 0, 1)", curve: [0.5, 0, 0, 1] },
  { name: "Rubber", value: "cubic-bezier(0, 1.5, 0.5, 1)", curve: [0, 1.5, 0.5, 1] },
];

export const PLAYGROUND_COMPONENTS: PlaygroundComponent[] = [
  { id: "card", label: "Card", category: "Layout", icon: "Square", description: "Content container with hover effects" },
  { id: "button", label: "Button", category: "Interactive", icon: "MousePointerClick", description: "Clickable action element" },
  { id: "modal", label: "Modal", category: "Overlay", icon: "Maximize", description: "Dialog overlay component" },
  { id: "dashboard", label: "Dashboard", category: "Layout", icon: "LayoutDashboard", description: "Data grid layout" },
  { id: "navigation", label: "Navigation", category: "Layout", icon: "Navigation", description: "Top navigation bar" },
  { id: "hero", label: "Hero Section", category: "Sections", icon: "Star", description: "Full-width hero banner" },
  { id: "animated-card", label: "3D Card", category: "Motion", icon: "Layers", description: "Card with 3D tilt + spotlight" },
  { id: "magnetic", label: "Magnetic", category: "Motion", icon: "Zap", description: "Cursor-following pull effect" },
  { id: "shine-button", label: "Shine Button", category: "Interactive", icon: "Sparkles", description: "Sweep shine on hover" },
  { id: "ripple-button", label: "Ripple Button", category: "Interactive", icon: "Target", description: "Material ripple on click" },
  { id: "gradient-text", label: "Gradient Text", category: "Typography", icon: "Type", description: "Animated gradient text" },
  { id: "floating-element", label: "Floating", category: "Motion", icon: "Wind", description: "Gentle floating animation" },
  { id: "border-glow-card", label: "Border Glow", category: "Motion", icon: "Crown", description: "Animated gradient border" },
  { id: "particles", label: "Particles", category: "Effects", icon: "Sparkles", description: "Floating particle field" },
  { id: "border-beam", label: "Border Beam", category: "Effects", icon: "Gauge", description: "Rotating gradient border" },
  { id: "gradient-orb", label: "Gradient Orb", category: "Effects", icon: "Eye", description: "Floating gradient sphere" },
  { id: "text-reveal", label: "Text Reveal", category: "Typography", icon: "Type", description: "Character-by-character reveal" },
  { id: "number-ticker", label: "Number Ticker", category: "Typography", icon: "BarChart3", description: "Animated counting number" },
  { id: "shimmer", label: "Shimmer", category: "Effects", icon: "Loader2", description: "Loading shimmer effect" },
  { id: "pulsing-dot", label: "Pulsing Dot", category: "Effects", icon: "Zap", description: "Animated indicator dot" },
];

export const TEMPLATES: { id: string; label: string; description: string; components: string[]; effects: string[] }[] = [
  { id: "landing-hero", label: "Landing Hero", description: "Hero with gradient text, floating elements, and particles", components: ["hero", "gradient-text", "floating-element", "particles"], effects: [] },
  { id: "pricing-card", label: "Pricing Card", description: "Animated card with border glow and shine button", components: ["card", "border-glow-card", "shine-button"], effects: [] },
  { id: "dashboard-widget", label: "Dashboard Widget", description: "Dashboard card with number tickers and shimmer", components: ["dashboard", "number-ticker", "shimmer", "pulsing-dot"], effects: [] },
  { id: "nav-with-effects", label: "Navigation Bar", description: "Navigation with magnetic links and ripple button", components: ["navigation", "magnetic", "ripple-button"], effects: [] },
  { id: "modal-dialog", label: "Modal Dialog", description: "Modal with backdrop blur and border beam", components: ["modal", "border-beam"], effects: [] },
];

export const EFFECT_CATEGORIES = [
  { id: "core-animations", name: "Core Animations" },
  { id: "hover", name: "Hover" },
  { id: "text", name: "Text" },
  { id: "backgrounds", name: "Backgrounds" },
  { id: "loaders", name: "Loaders" },
  { id: "3d-transforms", name: "3D & Transforms" },
  { id: "button-card", name: "Buttons & Cards" },
  { id: "forms", name: "Forms & Inputs" },
  { id: "navigation", name: "Navigation & UI" },
  { id: "scroll-micro", name: "Scroll & Micro" },
  { id: "advanced", name: "Advanced" },
];

export const EXPORT_FORMATS: { id: ExportFormat; label: string; icon: string }[] = [
  { id: "html", label: "HTML", icon: "code" },
  { id: "css", label: "CSS", icon: "paintbrush" },
  { id: "react", label: "React", icon: "atom" },
  { id: "vue", label: "Vue", icon: "layers" },
  { id: "svelte", label: "Svelte", icon: "flame" },
  { id: "angular", label: "Angular", icon: "triangle" },
  { id: "webcomponents", label: "Web Components", icon: "box" },
];

/* ═══════════════════════════════════════════════════════════════
   COMPONENT HTML TEMPLATES (for iframe preview)
   ═══════════════════════════════════════════════════════════════ */

export function getComponentHTML(id: string, theme: ThemeConfig, motion: MotionConfig, _effectClass?: string): string {
  const p = theme.primary;
  const s = theme.secondary;
  const sf = theme.surface;
  const tx = theme.text;
  const r = theme.radius;
  const dur = motion.duration;
  const del = motion.delay;
  const eas = motion.easing;
  const iter = motion.iterations;
  const dir = motion.direction;
  const fill = motion.fillMode;

  const base = `background:${sf};color:${tx};border-radius:${r}px;font-family:system-ui,-apple-system,sans-serif;`;

  const templates: Record<string, string> = {
    card: `
      <div style="${base} padding:24px; max-width:320px; box-shadow:0 4px 24px rgba(0,0,0,${theme.shadow}); border:1px solid rgba(255,255,255,0.08); transition: transform ${dur}s ${eas}, box-shadow ${dur}s ${eas}; cursor:pointer;" onmouseenter="this.style.transform='translateY(-4px) scale(1.02)';this.style.boxShadow='0 8px 32px ${p}33'" onmouseleave="this.style.transform='';this.style.boxShadow='0 4px 24px rgba(0,0,0,${theme.shadow})'">
        <div style="width:40px;height:40px;border-radius:8px;background:linear-gradient(135deg,${p},${s});margin-bottom:16px;"></div>
        <h3 style="font-size:18px;font-weight:600;margin:0 0 8px;color:${tx}">Component Card</h3>
        <p style="font-size:14px;color:${tx}99;margin:0;line-height:1.6;">A versatile card component with hover lift effect and gradient accent.</p>
        <div style="display:flex;gap:8px;margin-top:16px;">
          <span style="font-size:12px;padding:4px 10px;border-radius:20px;background:${p}22;color:${p};">Design</span>
          <span style="font-size:12px;padding:4px 10px;border-radius:20px;background:${s}22;color:${s};">Motion</span>
        </div>
      </div>`,

    button: `
      <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center;">
        <button style="padding:12px 28px;border:none;border-radius:${r}px;background:linear-gradient(135deg,${p},${s});color:white;font-size:15px;font-weight:600;cursor:pointer;transition:transform ${dur}s ${eas},box-shadow ${dur}s ${eas};animation:pg-pulse ${dur * 3}s ${eas} ${iter} ${dir};animation-fill-mode:${fill};" onmouseenter="this.style.transform='scale(1.05)';this.style.boxShadow='0 4px 20px ${p}55'" onmouseleave="this.style.transform='';this.style.boxShadow=''">Get Started</button>
        <button style="padding:12px 28px;border:1px solid ${p}44;border-radius:${r}px;background:transparent;color:${p};font-size:15px;font-weight:600;cursor:pointer;transition:all ${dur}s ${eas};" onmouseenter="this.style.background='${p}15';this.style.borderColor='${p}'" onmouseleave="this.style.background='transparent';this.style.borderColor='${p}44'">Learn More</button>
        <button style="padding:12px 28px;border:none;border-radius:${r}px;background:${p}15;color:${p};font-size:15px;font-weight:500;cursor:pointer;transition:all ${dur}s ${eas};" onmouseenter="this.style.background='${p}25'" onmouseleave="this.style.background='${p}15'">Tertiary</button>
      </div>`,

    modal: `
      <div style="position:relative;max-width:400px;width:100%;">
        <div style="position:fixed;inset:0;background:rgba(0,0,0,0.5);backdrop-filter:blur(8px);border-radius:${r}px;"></div>
        <div style="position:relative;${base} padding:32px; box-shadow:0 24px 48px rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.1); animation:pg-scale-in ${dur}s ${eas} both ${del}s;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
            <h3 style="font-size:18px;font-weight:600;color:${tx};margin:0;">Confirm Action</h3>
            <span style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:8px;cursor:pointer;color:${tx}66;transition:background 0.2s;" onmouseenter="this.style.background='rgba(255,255,255,0.08)'" onmouseleave="this.style.background='transparent'">&times;</span>
          </div>
          <p style="font-size:14px;color:${tx}88;margin:0 0 24px;line-height:1.6;">Are you sure you want to proceed? This action will apply the selected effects and update the component.</p>
          <div style="display:flex;gap:12px;justify-content:flex-end;">
            <button style="padding:10px 20px;border:1px solid rgba(255,255,255,0.1);border-radius:8px;background:transparent;color:${tx}99;font-size:14px;cursor:pointer;">Cancel</button>
            <button style="padding:10px 20px;border:none;border-radius:8px;background:${p};color:white;font-size:14px;font-weight:600;cursor:pointer;">Confirm</button>
          </div>
        </div>
      </div>`,

    dashboard: `
      <div style="${base} padding:24px; max-width:400px; box-shadow:0 4px 24px rgba(0,0,0,${theme.shadow}); border:1px solid rgba(255,255,255,0.08);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
          <h3 style="font-size:16px;font-weight:600;color:${tx};margin:0;">Dashboard</h3>
          <span style="font-size:12px;padding:4px 10px;border-radius:20px;background:#22c55e22;color:#22c55e;">Live</span>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px;">
          ${[{label:"Users",val:"12.4K",change:"+12%"},{label:"Revenue",val:"$48.2K",change:"+8%"},{label:"Sessions",val:"89.1K",change:"+23%"},{label:"Bounce",val:"24.3%",change:"-5%"}].map(s=>`
            <div style="padding:14px;border-radius:${Math.max(8,r-4)}px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.05);">
              <div style="font-size:12px;color:${tx}66;margin-bottom:6px;">${s.label}</div>
              <div style="font-size:20px;font-weight:700;color:${tx};">${s.val}</div>
              <div style="font-size:11px;color:${s.change.startsWith('+')?'#22c55e':'#ef4444'};margin-top:4px;">${s.change}</div>
            </div>`).join('')}
        </div>
        <div style="height:80px;border-radius:8px;background:linear-gradient(180deg,${p}22 0%,transparent 100%);position:relative;overflow:hidden;">
          <svg width="100%" height="100%" viewBox="0 0 352 80" preserveAspectRatio="none">
            <polyline points="0,60 44,45 88,55 132,30 176,40 220,20 264,35 308,15 352,25" fill="none" stroke="${p}" stroke-width="2" stroke-linecap="round"/>
            <polyline points="0,60 44,45 88,55 132,30 176,40 220,20 264,35 308,15 352,25" fill="url(#pg-grad)" stroke="none"/>
            <defs><linearGradient id="pg-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${p}" stop-opacity="0.3"/><stop offset="100%" stop-color="${p}" stop-opacity="0"/></linearGradient></defs>
          </svg>
        </div>
      </div>`,

    navigation: `
      <div style="${base} padding:0 24px; height:56px; display:flex; align-items:center; justify-content:space-between; box-shadow:0 1px 3px rgba(0,0,0,${theme.shadow}); border:1px solid rgba(255,255,255,0.08); max-width:600px; width:100%;">
        <div style="display:flex;align-items:center;gap:8px;">
          <div style="width:28px;height:28px;border-radius:6px;background:linear-gradient(135deg,${p},${s});"></div>
          <span style="font-weight:700;font-size:15px;color:${tx};">Ferrum</span>
        </div>
        <div style="display:flex;gap:24px;align-items:center;">
          ${["Products","Solutions","Docs","Pricing"].map(t=>`<span style="font-size:14px;color:${tx}88;cursor:pointer;transition:color 0.2s;" onmouseenter="this.style.color='${tx}'" onmouseleave="this.style.color='${tx}88'">${t}</span>`).join('')}
        </div>
        <button style="padding:8px 18px;border:none;border-radius:8px;background:${p};color:white;font-size:13px;font-weight:600;cursor:pointer;">Get Started</button>
      </div>`,

    hero: `
      <div style="${base} padding:48px 32px; max-width:480px; text-align:center; border:1px solid rgba(255,255,255,0.08);">
        <span style="display:inline-block;padding:6px 16px;border-radius:20px;background:${p}18;color:${p};font-size:13px;font-weight:500;margin-bottom:20px;">v2.0 Now Available</span>
        <h1 style="font-size:36px;font-weight:800;line-height:1.1;margin:0 0 16px;background:linear-gradient(135deg,${tx},${p});-webkit-background-clip:text;-webkit-text-fill-color:transparent;">Build Stunning Interfaces</h1>
        <p style="font-size:15px;color:${tx}77;margin:0 0 28px;line-height:1.7;max-width:380px;margin-left:auto;margin-right:auto;">The universal UI platform for creating beautiful, performant, and accessible web experiences.</p>
        <div style="display:flex;gap:12px;justify-content:center;">
          <button style="padding:12px 28px;border:none;border-radius:${r}px;background:linear-gradient(135deg,${p},${s});color:white;font-size:15px;font-weight:600;cursor:pointer;">Start Building</button>
          <button style="padding:12px 28px;border:1px solid ${tx}22;border-radius:${r}px;background:transparent;color:${tx}99;font-size:15px;cursor:pointer;">View Docs</button>
        </div>
      </div>`,

    "animated-card": `
      <div id="pg-tilt-card" style="${base} padding:28px; max-width:320px; box-shadow:0 4px 24px rgba(0,0,0,${theme.shadow}); border:1px solid rgba(255,255,255,0.08); transform-style:preserve-3d; transition:transform 0.15s ease-out,box-shadow 0.3s;" onmousemove="pg_handleTilt(event,this)" onmouseleave="pg_resetTilt(this)">
        <div style="width:48px;height:48px;border-radius:12px;background:linear-gradient(135deg,${p},${s});margin-bottom:18px;transition:transform 0.3s;"></div>
        <h3 style="font-size:18px;font-weight:600;margin:0 0 8px;color:${tx}">3D Tilt Card</h3>
        <p style="font-size:14px;color:${tx}88;margin:0;line-height:1.6;">Hover to see the 3D tilt effect with dynamic spotlight following your cursor.</p>
      </div>`,

    magnetic: `
      <div style="display:flex;gap:16px;align-items:center;justify-content:center;min-height:200px;">
        ${["Explore","Create","Ship"].map(t=>`
          <div class="pg-magnetic" style="padding:14px 28px;border-radius:${r}px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:${tx};font-size:15px;font-weight:500;cursor:pointer;transition:transform 0.3s ${eas},background 0.2s;" onmousemove="pg_magneticMove(event,this)" onmouseleave="pg_magneticReset(this)" onmouseenter="this.style.background='rgba(255,255,255,0.08)'">${t}</div>
        `).join('')}
      </div>`,

    "shine-button": `
      <div style="display:flex;gap:16px;align-items:center;justify-content:center;min-height:200px;">
        <button style="position:relative;overflow:hidden;padding:14px 32px;border:none;border-radius:${r}px;background:linear-gradient(135deg,${p},${s});color:white;font-size:16px;font-weight:600;cursor:pointer;">
          <span style="position:relative;z-index:1;">Shine Button</span>
          <span style="position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent);transition:left 0.7s ${eas};" onmouseenter="this.style.left='100%'" onmouseleave="this.style.left='-100%'"></span>
        </button>
      </div>`,

    "ripple-button": `
      <div style="display:flex;gap:16px;align-items:center;justify-content:center;min-height:200px;">
        <button onclick="pg_createRipple(event,this)" style="position:relative;overflow:hidden;padding:14px 32px;border:none;border-radius:${r}px;background:${p};color:white;font-size:16px;font-weight:600;cursor:pointer;">Click for Ripple</button>
      </div>`,

    "gradient-text": `
      <div style="text-align:center;padding:40px 20px;">
        <h1 style="font-size:48px;font-weight:800;margin:0;background:linear-gradient(135deg,${p},${s},${p});background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:pg-gradient-shift ${dur * 4}s ${eas} ${iter};">Ferrum Engine</h1>
        <p style="font-size:18px;color:${tx}77;margin:12px 0 0;">Beautiful gradient text with smooth animation</p>
      </div>`,

    "floating-element": `
      <div style="display:flex;gap:24px;align-items:end;justify-content:center;min-height:200px;">
        <div style="width:60px;height:60px;border-radius:${r}px;background:linear-gradient(135deg,${p}88,${s}88);animation:pg-float ${dur * 6}s ${eas} ${del}s ${iter};"></div>
        <div style="width:80px;height:80px;border-radius:${r}px;background:linear-gradient(135deg,${p},${s});animation:pg-float ${dur * 8}s ${eas} ${del + 0.5}s ${iter};"></div>
        <div style="width:60px;height:60px;border-radius:${r}px;background:linear-gradient(135deg,${s}88,${p}88);animation:pg-float ${dur * 5}s ${eas} ${del + 1}s ${iter};"></div>
      </div>`,

    "border-glow-card": `
      <div style="position:relative;max-width:320px;border-radius:${r + 2}px;padding:2px;background:linear-gradient(135deg,${p}66,${s}66,${p}66);background-size:200% 200%;animation:pg-border-rotate 4s linear ${iter};">
        <div style="${base} padding:24px; border-radius:${r}px;">
          <h3 style="font-size:18px;font-weight:600;margin:0 0 8px;color:${tx}">Border Glow Card</h3>
          <p style="font-size:14px;color:${tx}88;margin:0;line-height:1.6;">Animated gradient border that rotates around the card continuously.</p>
        </div>
      </div>`,

    particles: `
      <div id="pg-particles" style="position:relative;width:100%;height:300px;overflow:hidden;border-radius:${r}px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);"></div>`,

    "border-beam": `
      <div style="position:relative;max-width:320px;padding:2px;border-radius:${r + 2}px;overflow:hidden;">
        <div style="position:absolute;inset:0;border-radius:inherit;background:conic-gradient(from 0deg,transparent,${p},transparent,${s},transparent);animation:pg-spin 3s linear ${iter};"></div>
        <div style="position:relative;${base} padding:24px; border-radius:${r}px;">
          <h3 style="font-size:18px;font-weight:600;margin:0 0 8px;color:${tx}">Border Beam</h3>
          <p style="font-size:14px;color:${tx}88;margin:0;line-height:1.6;">A rotating conic gradient creates this stunning border beam effect.</p>
        </div>
      </div>`,

    "gradient-orb": `
      <div style="display:flex;align-items:center;justify-content:center;min-height:250px;">
        <div style="width:120px;height:120px;border-radius:50%;background:radial-gradient(circle at 30% 30%,${p}cc,${s}88 50%,transparent 70%);filter:blur(0px);animation:pg-float ${dur * 6}s ${eas} ${iter};box-shadow:0 0 60px ${p}44,0 0 120px ${s}22;"></div>
      </div>`,

    "text-reveal": `
      <div style="text-align:center;padding:40px 20px;">
        <p style="font-size:28px;font-weight:600;color:${tx};font-family:monospace;overflow:hidden;border-right:2px solid ${p};white-space:nowrap;animation:pg-typing 3s steps(20) ${del}s ${iter},pg-blink 0.75s step-end infinite;">Building the future of UI</p>
      </div>`,

    "number-ticker": `
      <div style="display:flex;gap:24px;justify-content:center;padding:40px 20px;">
        ${[{label:"Downloads",val:"2.4M",color:p},{label:"Stars",val:"12.8K",color:s},{label:"Components",val:"542+",color:p}].map(s=>`
          <div style="text-align:center;">
            <div style="font-size:36px;font-weight:800;color:${s.color};">${s.val}</div>
            <div style="font-size:13px;color:${tx}66;margin-top:4px;">${s.label}</div>
          </div>
        `).join('')}
      </div>`,

    shimmer: `
      <div style="max-width:320px;">
        <div style="height:16px;border-radius:4px;background:linear-gradient(90deg,rgba(255,255,255,0.04) 25%,rgba(255,255,255,0.1) 50%,rgba(255,255,255,0.04) 75%);background-size:200% 100%;animation:pg-shimmer 1.5s ease ${iter};margin-bottom:12px;width:75%;"></div>
        <div style="height:16px;border-radius:4px;background:linear-gradient(90deg,rgba(255,255,255,0.04) 25%,rgba(255,255,255,0.1) 50%,rgba(255,255,255,0.04) 75%);background-size:200% 100%;animation:pg-shimmer 1.5s ease ${iter};animation-delay:0.15s;margin-bottom:12px;width:100%;"></div>
        <div style="height:16px;border-radius:4px;background:linear-gradient(90deg,rgba(255,255,255,0.04) 25%,rgba(255,255,255,0.1) 50%,rgba(255,255,255,0.04) 75%);background-size:200% 100%;animation:pg-shimmer 1.5s ease ${iter};animation-delay:0.3s;width:50%;"></div>
      </div>`,

    "pulsing-dot": `
      <div style="display:flex;gap:24px;align-items:center;justify-content:center;min-height:200px;">
        ${[{c:"#22c55e",l:"Online"},{c:"#eab308",l:"Away"},{c:"#ef4444",l:"Busy"}].map(s=>`
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="position:relative;width:10px;height:10px;display:block;">
              <span style="position:absolute;inset:0;border-radius:50%;background:${s.c};animation:pg-ping 1.5s ${eas} ${iter};opacity:0.75;"></span>
              <span style="position:relative;display:block;width:10px;height:10px;border-radius:50%;background:${s.c};"></span>
            </span>
            <span style="font-size:14px;color:${tx}88;">${s.l}</span>
          </div>
        `).join('')}
      </div>`,
  };

  return templates[id] ?? templates.card!;
}

/* ═══════════════════════════════════════════════════════════════
   IFRAME WRAPPER — Full HTML document for preview
   ═══════════════════════════════════════════════════════════════ */

export function buildPreviewDoc(
  componentHTML: string,
  theme: ThemeConfig,
  motion: MotionConfig,
  effectCSS?: string,
  effectClass?: string
): string {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box;}
body{background:${theme.bg};display:flex;align-items:center;justify-content:center;min-height:100vh;padding:24px;font-family:system-ui,-apple-system,sans-serif;}

/* Playground keyframes */
@keyframes pg-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes pg-gradient-shift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
@keyframes pg-border-rotate{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes pg-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes pg-shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
@keyframes pg-ping{75%,100%{transform:scale(2.5);opacity:0}}
@keyframes pg-pulse{0%,100%{opacity:1}50%{opacity:0.7}}
@keyframes pg-scale-in{from{opacity:0;transform:scale(0.95) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}
@keyframes pg-blink{from,to{border-color:transparent}50%{border-color:${theme.primary}}}
@keyframes pg-typing{from{width:0}to{width:100%}}

${effectCSS || ""}

${effectClass ? `.${effectClass} { animation-duration: ${motion.duration}s !important; animation-delay: ${motion.delay}s !important; animation-timing-function: ${motion.easing} !important; animation-iteration-count: ${motion.iterations === "infinite" ? "infinite" : motion.iterations} !important; animation-direction: ${motion.direction} !important; animation-fill-mode: ${motion.fillMode} !important; }` : ""}
</style></head><body>
${effectClass ? `<div class="${effectClass}">` : ""}${componentHTML}${effectClass ? `</div>` : ""}
<script>
function pg_handleTilt(e,el){var r=el.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top,cx=r.width/2,cy=r.height/2,rx=((y-cy)/cy)*-8,ry=((x-cx)/cx)*8;el.style.transform='perspective(800px) rotateX('+rx+'deg) rotateY('+ry+'deg)';el.style.boxShadow='0 20px 40px rgba(0,0,0,0.3)';var s=document.createElement('div');s.style.cssText='position:absolute;inset:0;pointer-events:none;border-radius:inherit;opacity:0.4;background:radial-gradient(400px circle at '+(x/r.width*100)+'% '+(y/r.height*100)+'%,${theme.primary}33,transparent 40%)';el.querySelectorAll('.pg-spot').forEach(function(p){p.remove()});s.className='pg-spot';el.appendChild(s);}
function pg_resetTilt(el){el.style.transform='';el.style.boxShadow='0 4px 24px rgba(0,0,0,${theme.shadow})';el.querySelectorAll('.pg-spot').forEach(function(p){p.remove()});}
function pg_magneticMove(e,el){var r=el.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;el.style.transform='translate('+x*0.3+'px,'+y*0.3+'px)';}
function pg_magneticReset(el){el.style.transform='translate(0,0)';}
function pg_createRipple(e,btn){var r=btn.getBoundingClientRect(),s=document.createElement('span'),sz=Math.max(r.width,r.height);s.style.cssText='position:absolute;border-radius:50%;background:rgba(255,255,255,0.3);width:'+sz+'px;height:'+sz+'px;left:'+(e.clientX-r.left-sz/2)+'px;top:'+(e.clientY-r.top-sz/2)+'px;transform:scale(0);animation:pg-ripple 0.6s ease-out forwards;pointer-events:none;';btn.appendChild(s);setTimeout(function(){s.remove()},600);}
@keyframes pg-ripple{to{transform:scale(4);opacity:0}}
</script>
${componentHTML.includes('pg-particles') ? `
<script>
(function(){var c=document.getElementById('pg-particles');if(!c)return;for(var i=0;i<30;i++){var p=document.createElement('div');var s=1+Math.random()*3;p.style.cssText='position:absolute;width:'+s+'px;height:'+s+'px;border-radius:50%;background:${theme.primary};opacity:'+(0.15+Math.random()*0.3)+';left:'+Math.random()*100+'%;top:'+Math.random()*100+'%;animation:pg-float '+(6+Math.random()*10)+'s ease-in-out '+Math.random()*5+'s infinite;';c.appendChild(p);}})();
</script>` : ''}
</body></html>`;
}

/* ═══════════════════════════════════════════════════════════════
   CODE GENERATORS — Multi-framework export
   ═══════════════════════════════════════════════════════════════ */

export function generateExportCode(
  format: ExportFormat,
  _componentId: string,
  theme: ThemeConfig,
  motion: MotionConfig,
  effectClass?: string
): string {
  const p = theme.primary;
  const r = theme.radius;
  const e = motion.easing;
  const d = motion.duration;

  const t = `  transition: all ${d}s ${e};`;

  switch (format) {
    case "html":
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ferrum Component</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: ${theme.bg};
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 24px;
    }
    .ferrum-component {
      background: ${theme.surface};
      color: ${theme.text};
      border-radius: ${r}px;
      padding: 24px;
      box-shadow: 0 4px 24px rgba(0, 0, 0, ${theme.shadow});
      border: 1px solid rgba(255, 255, 255, 0.08);
      ${t}
    }
    .ferrum-component:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 32px ${p}33;
    }
    ${effectClass ? `.${effectClass} { animation-duration: ${d}s; animation-timing-function: ${e}; animation-iteration-count: ${motion.iterations}; }` : ""}
  </style>
  <link rel="stylesheet" href="https://unpkg.com/ferrumcss@latest/dist/ferrum.css">
</head>
<body>
  <div class="ferrum-component${effectClass ? ` ${effectClass}` : ""}">
    <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 8px;">
      Ferrum Component
    </h3>
    <p style="font-size: 14px; opacity: 0.7; line-height: 1.6;">
      Built with FerrumEngine — zero dependencies, pure CSS.
    </p>
  </div>
</body>
</html>`;

    case "css":
      return `/* ═══════════════════════════════════════
   Ferrum Component — Generated by Playground 2.0
   ═══════════════════════════════════════ */

.ferrum-component {
  background: ${theme.surface};
  color: ${theme.text};
  border-radius: ${r}px;
  padding: 24px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, ${theme.shadow});
  border: 1px solid rgba(255, 255, 255, 0.08);
  ${t}
}

.ferrum-component:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px ${p}33;
}

${effectClass ? `.${effectClass} {\n  animation-duration: ${d}s;\n  animation-timing-function: ${e};\n  animation-iteration-count: ${motion.iterations};\n}` : ""}

/* Usage: <div class="ferrum-component${effectClass ? ` ${effectClass}` : ""}">...</div> */`;

    case "react":
      return `import React, { useState } from "react";

interface FerrumComponentProps {
  children?: React.ReactNode;
  className?: string;
  effect?: string;
}

export function FerrumComponent({
  children,
  className = "",
  effect,
}: FerrumComponentProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={\`ferrum-component \${effect || ""} \${className}\`}
      style={{
        background: "${theme.surface}",
        color: "${theme.text}",
        borderRadius: "${r}px",
        padding: "24px",
        boxShadow: hovered
          ? "0 8px 32px ${p}33"
          : "0 4px 24px rgba(0, 0, 0, ${theme.shadow})",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        transform: hovered ? "translateY(-4px)" : "none",
        transition: \`all \${${d}}s ${e}\`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children || (
        <>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
            Ferrum Component
          </h3>
          <p style={{ fontSize: 14, opacity: 0.7, lineHeight: 1.6 }}>
            Built with FerrumEngine.
          </p>
        </>
      )}
    </div>
  );
}

// Usage: <FerrumComponent${effectClass ? ` effect="${effectClass}"` : ""} />`;

    case "vue":
      return `<template>
  <div
    class="ferrum-component"
    :class="effect"
    :style="componentStyle"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <slot>
      <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 8px;">
        Ferrum Component
      </h3>
      <p style="font-size: 14px; opacity: 0.7; line-height: 1.6;">
        Built with FerrumEngine.
      </p>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const props = withDefaults(defineProps<{
  effect?: string;
}>(), {
  effect: "${effectClass || ""}",
});

const hovered = ref(false);

const componentStyle = computed(() => ({
  background: "${theme.surface}",
  color: "${theme.text}",
  borderRadius: "${r}px",
  padding: "24px",
  boxShadow: hovered.value
    ? "0 8px 32px ${p}33"
    : "0 4px 24px rgba(0, 0, 0, ${theme.shadow})",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  transform: hovered.value ? "translateY(-4px)" : "none",
  transition: \`all ${d}s ${e}\`,
}));
</script>`;

    case "svelte":
      return `<script lang="ts">
  let hovered = $state(false);
  export let effect: string = "${effectClass || ""}";
</script>

<div
  class="ferrum-component {effect}"
  style="
    background: {theme.surface};
    color: {theme.text};
    border-radius: {r}px;
    padding: 24px;
    box-shadow: {hovered ? '0 8px 32px ${p}33' : '0 4px 24px rgba(0, 0, 0, ${theme.shadow})'};
    border: 1px solid rgba(255, 255, 255, 0.08);
    transform: {hovered ? 'translateY(-4px)' : 'none'};
    transition: all ${d}s ${e};
  "
  onmouseenter={() => (hovered = true)}
  onmouseleave={() => (hovered = false)}
>
  <slot>
    <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 8px;">
      Ferrum Component
    </h3>
    <p style="font-size: 14px; opacity: 0.7; line-height: 1.6;">
      Built with FerrumEngine.
    </p>
  </slot>
</div>`;

    case "angular":
      return `import { Component, Input } from "@angular/core";

@Component({
  selector: "ferrum-component",
  template: \`
    <div
      class="ferrum-component"
      [ngClass]="effect"
      [ngStyle]="componentStyle"
      (mouseenter)="hovered = true"
      (mouseleave)="hovered = false"
    >
      <ng-content>
        <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 8px;">
          Ferrum Component
        </h3>
        <p style="font-size: 14px; opacity: 0.7; line-height: 1.6;">
          Built with FerrumEngine.
        </p>
      </ng-content>
    </div>
  \`,
  styles: [\`
    .ferrum-component {
      display: block;
    }
  \`],
})
export class FerrumComponent {
  @Input() effect = "${effectClass || ""}";
  hovered = false;

  get componentStyle() {
    return {
      background: "${theme.surface}",
      color: "${theme.text}",
      borderRadius: "${r}px",
      padding: "24px",
      boxShadow: this.hovered
        ? "0 8px 32px ${p}33"
        : "0 4px 24px rgba(0, 0, 0, ${theme.shadow})",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      transform: this.hovered ? "translateY(-4px)" : "none",
      transition: \`all ${d}s ${e}\`,
    };
  }
}

// Usage: <ferrum-component${effectClass ? ` effect="${effectClass}"` : ""}></ferrum-component>`;

    case "webcomponents":
      return `class FerrumComponent extends HTMLElement {
  static get observedAttributes() {
    return ["effect"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._hovered = false;
    this._onMouseEnter = this._handleMouseEnter.bind(this);
    this._onMouseLeave = this._handleMouseLeave.bind(this);
  }

  connectedCallback() {
    this.render();
    const host = this.shadowRoot.querySelector(".host");
    if (host) {
      host.addEventListener("mouseenter", this._onMouseEnter);
      host.addEventListener("mouseleave", this._onMouseLeave);
    }
  }

  disconnectedCallback() {
    if (this.shadowRoot) {
      const host = this.shadowRoot.querySelector(".host");
      if (host) {
        host.removeEventListener("mouseenter", this._onMouseEnter);
        host.removeEventListener("mouseleave", this._onMouseLeave);
      }
    }
  }

  _handleMouseEnter() {
    this._hovered = true;
    this._updateStyles();
  }

  _handleMouseLeave() {
    this._hovered = false;
    this._updateStyles();
  }

  _updateStyles() {
    const host = this.shadowRoot.querySelector(".host");
    if (!host) return;
    host.style.boxShadow = this._hovered
      ? "0 8px 32px ${p}33"
      : "0 4px 24px rgba(0, 0, 0, ${theme.shadow})";
    host.style.transform = this._hovered ? "translateY(-4px)" : "none";
  }

  get effect() {
    return this.getAttribute("effect") || "${effectClass || ""}";
  }

  render() {
    this.shadowRoot.innerHTML = \`
      <style>
        .host {
          background: ${theme.surface};
          color: ${theme.text};
          border-radius: ${r}px;
          padding: 24px;
          box-shadow: \${this._hovered
            ? "0 8px 32px ${p}33"
            : "0 4px 24px rgba(0, 0, 0, ${theme.shadow})"};
          border: 1px solid rgba(255, 255, 255, 0.08);
          transform: \${this._hovered ? "translateY(-4px)" : "none"};
          transition: all ${d}s ${e};
          display: block;
          cursor: pointer;
        }
        h3 { font-size: 18px; font-weight: 600; margin-bottom: 8px; }
        p { font-size: 14px; opacity: 0.7; line-height: 1.6; }
      </style>
      <div class="host">
        <slot>
          <h3>Ferrum Component</h3>
          <p>Built with FerrumEngine.</p>
        </slot>
      </div>
    \`;
  }
}

customElements.define("ferrum-component", FerrumComponent);

// Usage: <ferrum-component${effectClass ? ` effect="${effectClass}"` : ""}></ferrum-component>`;

    default:
      return "";
  }
}

/* ═══════════════════════════════════════════════════════════════
   SYNTAX HIGHLIGHTING — Lightweight regex-based
   ═══════════════════════════════════════════════════════════════ */

export function syntaxHighlight(code: string, lang: ExportFormat): string {
  let html = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const isHtml = lang === "html" || lang === "vue" || lang === "svelte" || lang === "angular" || lang === "webcomponents";
  const isJs = lang === "react" || lang === "vue" || lang === "svelte" || lang === "angular" || lang === "webcomponents";

  // Comments
  html = html.replace(/(\/\/[^\n]*)/g, '<span style="color:#6b7280;font-style:italic">$1</span>');
  html = html.replace(/(\/\*[\s\S]*?\*\/)/g, '<span style="color:#6b7280;font-style:italic">$1</span>');
  html = html.replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span style="color:#6b7280;font-style:italic">$1</span>');

  if (isHtml) {
    html = html.replace(/(&lt;\/?)([\w-]+)/g, '$1<span style="color:#f472b6">$2</span>');
    html = html.replace(/([\w-]+)(=)(&quot;|")/g, '<span style="color:#a78bfa">$1</span>$2$3');
    html = html.replace(/("(?:[^"\\]|\\.)*")/g, '<span style="color:#fbbf24">$1</span>');
  }

  if (lang === "css") {
    html = html.replace(/([\w-]+)(\s*:)/g, '<span style="color:#67e8f9">$1</span>$2');
    html = html.replace(/:\s*([^;{}\n]+)/g, (_m, val) => ': <span style="color:#fbbf24">' + val + '</span>');
    html = html.replace(/^([.#][\w-]+)/gm, '<span style="color:#f472b6">$1</span>');
  }

  if (isJs) {
    html = html.replace(/\b(import|from|export|default|const|let|var|function|return|if|else|class|extends|new|this|static|get|set|typeof|interface|type)\b/g, '<span style="color:#c084fc">$1</span>');
    html = html.replace(/(["'`])(?:(?!\1|\\).|\\.)*\1/g, '<span style="color:#fbbf24">$&</span>');
    html = html.replace(/\b(\d+\.?\d*)\b/g, '<span style="color:#67e8f9">$1</span>');
    html = html.replace(/(&lt;\/?)([\w.]+)/g, '$1<span style="color:#f472b6">$2</span>');
    html = html.replace(/\b(true|false|null|undefined)\b/g, '<span style="color:#f472b6">$1</span>');
  }

  return html;
}