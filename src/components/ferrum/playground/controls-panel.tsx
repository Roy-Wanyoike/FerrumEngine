// Type-strict compliance: fixed noUncheckedIndexedAccess + noUnusedLocals
"use client"

import {
  ChevronRight, RotateCcw, type Zap,
  Bot, Waves, Orbit, Palette, Accessibility, Gauge,
  Activity, Box, FileCode, Clock,
} from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select, SelectItem,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { type MotionConfig, type PhysicsConfig, type ThemeConfig,
  DEFAULT_THEME,
  EASING_PRESETS,
} from "../playground-v2-data";
import { type Metrics, computeContrast } from "./types";

/* --- Controls Panel (Right) --- */
export function ControlsPanel({
  motion, onMotionChange,
  physics, onPhysicsChange,
  theme, onThemeChange,
  selectedComponent, selectedEffect,
  metrics, reducedMotion,
  onToggleReducedMotion,
}: {
  motion: MotionConfig;
  onMotionChange: (m: Partial<MotionConfig>) => void;
  physics: PhysicsConfig;
  onPhysicsChange: (p: Partial<PhysicsConfig>) => void;
  theme: ThemeConfig;
  onThemeChange: (t: Partial<ThemeConfig>) => void;
  selectedComponent: string;
  selectedEffect: string;
  metrics: Metrics;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
}) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    motion: true,
    physics: false,
    theme: false,
    a11y: false,
    metrics: false,
    ai: false,
  });

  const toggleSection = (s: string) =>
    setExpandedSections((prev) => ({ ...prev, [s]: !prev[s] }));

  const section = (id: string, icon: typeof Zap, label: string, content: React.ReactNode) => {
    const Icon = icon;
    const open = expandedSections[id];
    return (
      <div className="border-b border-border last:border-b-0">
        <button
          onClick={() => toggleSection(id)}
          aria-expanded={open}
          className="w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-foreground/[0.02] transition-colors"
        >
          <Icon size={14} className="text-muted-foreground/65" />
          <span className="text-xs font-medium text-foreground/80 flex-1">{label}</span>
          <ChevronRight
            size={14}
            className={`text-muted-foreground/60 transition-transform duration-150 ${open ? "rotate-90" : ""}`}
          />
        </button>
        {open && <div className="px-4 pb-4">{content}</div>}
      </div>
    );
  };

  return (
    <div className="w-72 bg-foreground/[0.01] border-l border-border flex flex-col shrink-0 overflow-hidden">
      <div className="px-4 py-3 border-b border-border">
        <span className="text-xs font-semibold text-foreground/70">Properties</span>
      </div>
      <ScrollArea className="flex-1">
        {/* Info bar */}
        <div className="px-4 py-2 border-b border-border">
          <div className="text-[10px] text-muted-foreground/60 space-y-0.5">
            <div>Component: <span className="text-foreground/60">{selectedComponent}</span></div>
            {selectedEffect && <div>Effect: <span className="text-foreground/60 font-mono">{selectedEffect}</span></div>}
          </div>
        </div>

        {/* Motion */}
        {section("motion", Waves, "Motion", (
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-[10px] mb-1.5">
                <span className="text-muted-foreground/65">Duration</span>
                <span className="text-foreground/60 font-mono">{motion.duration.toFixed(1)}s</span>
              </div>
              <Slider
                aria-label="Duration"
                value={[motion.duration]}
                onValueChange={(vals: number[]) => onMotionChange({ duration: vals[0] })}
                min={0.05}
                max={5}
                step={0.05}
                className="py-1"
              />
            </div>
            <div>
              <div className="flex justify-between text-[10px] mb-1.5">
                <span className="text-muted-foreground/65">Delay</span>
                <span className="text-foreground/60 font-mono">{motion.delay.toFixed(1)}s</span>
              </div>
              <Slider
                aria-label="Delay"
                value={[motion.delay]}
                onValueChange={(vals: number[]) => onMotionChange({ delay: vals[0] })}
                min={0}
                max={3}
                step={0.05}
                className="py-1"
              />
            </div>
            <div>
              <div className="text-[10px] text-muted-foreground/65 mb-1.5">Easing</div>
              <Select
                value={motion.easing}
                onValueChange={(v: string) => {
                  const preset = EASING_PRESETS.find((e) => e.value === v);
                  onMotionChange({ easing: v, easingName: preset?.name || v });
                }}
              aria-label="Easing"
              >
                {EASING_PRESETS.map((e) => (
                  <SelectItem key={e.value} value={e.value}>{e.name}</SelectItem>
                ))}
              </Select>
            </div>
            {/* Easing curve visualizer */}
            <div className="h-16 rounded-lg bg-foreground/[0.04] border border-border p-2 relative overflow-hidden">
              <svg width="100%" height="100%" viewBox="0 0 200 48" preserveAspectRatio="none">
                <line x1="0" y1="48" x2="200" y2="48" stroke="rgba(148,163,184,0.15)" strokeWidth="1" />
                <line x1="0" y1="0" x2="0" y2="48" stroke="rgba(148,163,184,0.15)" strokeWidth="1" />
                <line x1="200" y1="0" x2="200" y2="48" stroke="rgba(148,163,184,0.15)" strokeWidth="1" />
                <path
                  d={(() => {
                    const preset = EASING_PRESETS.find((e) => e.value === motion.easing);
                    if (!preset?.curve) return "M0,48 L200,0";
                    const [x1, y1, x2, y2] = preset.curve;
                    return `M0,48 C${x1 * 200},${48 - y1 * 48} ${x2 * 200},${48 - y2 * 48} 200,0`;
                  })()}
                  fill="none"
                  stroke={theme.primary}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-[10px] text-muted-foreground/65 mb-1.5">Iterations</div>
                <Select
                  value={motion.iterations}
                  onValueChange={(v: string) => onMotionChange({ iterations: v })}
                  aria-label="Iterations"
                >
                  {["1", "2", "3", "5", "10", "infinite"].map((v) => (
                    <SelectItem key={v} value={v}>
                      {v === "infinite" ? "Infinite" : `${v}x`}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div>
                <div className="text-[10px] text-muted-foreground/65 mb-1.5">Direction</div>
                <Select
                  value={motion.direction}
                  onValueChange={(v: string) => onMotionChange({ direction: v })}
                  aria-label="Direction"
                >
                  {["normal", "reverse", "alternate", "alternate-reverse"].map((v) => (
                    <SelectItem key={v} value={v}>{v}</SelectItem>
                  ))}
                </Select>
              </div>
            </div>
            <div>
              <div className="text-[10px] text-muted-foreground/65 mb-1.5">Fill Mode</div>
              <Select
                value={motion.fillMode}
                onValueChange={(v: string) => onMotionChange({ fillMode: v })}
                aria-label="Fill Mode"
              >
                {["none", "forwards", "backwards", "both"].map((v) => (
                  <SelectItem key={v} value={v}>{v}</SelectItem>
                ))}
              </Select>
            </div>
          </div>
        ))}

        {/* Physics */}
        {section("physics", Orbit, "Physics", (
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-[10px] mb-1.5">
                <span className="text-muted-foreground/65">Tension</span>
                <span className="text-foreground/60 font-mono">{physics.tension}</span>
              </div>
              <Slider
                aria-label="Tension"
                value={[physics.tension]}
                onValueChange={(vals: number[]) => onPhysicsChange({ tension: vals[0] })}
                min={10}
                max={300}
                step={1}
                className="py-1"
              />
            </div>
            <div>
              <div className="flex justify-between text-[10px] mb-1.5">
                <span className="text-muted-foreground/65">Friction</span>
                <span className="text-foreground/60 font-mono">{physics.friction}</span>
              </div>
              <Slider
                aria-label="Friction"
                value={[physics.friction]}
                onValueChange={(vals: number[]) => onPhysicsChange({ friction: vals[0] })}
                min={1}
                max={50}
                step={1}
                className="py-1"
              />
            </div>
            <div>
              <div className="flex justify-between text-[10px] mb-1.5">
                <span className="text-muted-foreground/65">Mass</span>
                <span className="text-foreground/60 font-mono">{physics.mass.toFixed(1)}</span>
              </div>
              <Slider
                aria-label="Mass"
                value={[physics.mass]}
                onValueChange={(vals: number[]) => onPhysicsChange({ mass: vals[0] })}
                min={0.1}
                max={5}
                step={0.1}
                className="py-1"
              />
            </div>
            <div>
              <div className="flex justify-between text-[10px] mb-1.5">
                <span className="text-muted-foreground/65">Bounce</span>
                <span className="text-foreground/60 font-mono">{physics.bounce.toFixed(2)}</span>
              </div>
              <Slider
                aria-label="Bounce"
                value={[physics.bounce]}
                onValueChange={(vals: number[]) => onPhysicsChange({ bounce: vals[0] })}
                min={0}
                max={1}
                step={0.01}
                className="py-1"
              />
            </div>
            <div className="p-2.5 rounded-lg bg-foreground/[0.03] border border-border">
              <div className="text-[10px] text-muted-foreground/60 mb-2">Spring Preview</div>
              <div className="h-8 relative overflow-hidden rounded bg-foreground/[0.04]">
                <div
                  className="absolute top-1 left-1 w-5 h-5 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                    animation: `pg-float ${((300 - physics.tension + physics.friction * 5) / 50).toFixed(2)}s cubic-bezier(0.34, 1.56, 0.64, 1) infinite alternate`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}

        {/* Theme */}
        {section("theme", Palette, "Theme", (
          <div className="space-y-3">
            <div>
              <div className="text-[10px] text-muted-foreground/65 mb-1.5">Primary Color</div>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={theme.primary}
                  onChange={(e) => onThemeChange({ primary: e.target.value })}
                  aria-label="Primary color picker"
                  className="w-8 h-8 rounded-md border border-border cursor-pointer bg-transparent"
                />
                <input
                  type="text"
                  value={theme.primary}
                  onChange={(e) => onThemeChange({ primary: e.target.value })}
                  aria-label="Primary color hex value"
                  className="flex-1 h-8 text-[11px] font-mono bg-foreground/[0.04] border border-border rounded-md px-2 text-foreground"
                />
              </div>
            </div>
            <div>
              <div className="text-[10px] text-muted-foreground/65 mb-1.5">Secondary Color</div>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={theme.secondary}
                  onChange={(e) => onThemeChange({ secondary: e.target.value })}
                  aria-label="Secondary color picker"
                  className="w-8 h-8 rounded-md border border-border cursor-pointer bg-transparent"
                />
                <input
                  type="text"
                  value={theme.secondary}
                  onChange={(e) => onThemeChange({ secondary: e.target.value })}
                  aria-label="Secondary color hex value"
                  className="flex-1 h-8 text-[11px] font-mono bg-foreground/[0.04] border border-border rounded-md px-2 text-foreground"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] mb-1.5">
                <span className="text-muted-foreground/65">Border Radius</span>
                <span className="text-foreground/60 font-mono">{theme.radius}px</span>
              </div>
              <Slider
                aria-label="Border Radius"
                value={[theme.radius]}
                onValueChange={(vals: number[]) => onThemeChange({ radius: vals[0] })}
                min={0}
                max={32}
                step={1}
                className="py-1"
              />
            </div>
            <div>
              <div className="flex justify-between text-[10px] mb-1.5">
                <span className="text-muted-foreground/65">Shadow Intensity</span>
                <span className="text-foreground/60 font-mono">{theme.shadow.toFixed(2)}</span>
              </div>
              <Slider
                aria-label="Shadow Intensity"
                value={[theme.shadow * 100]}
                onValueChange={(vals: number[]) => onThemeChange({ shadow: (vals[0] ?? 0) / 100 })}
                min={0}
                max={100}
                step={1}
                className="py-1"
              />
            </div>
            <button
              onClick={() => {
                onThemeChange(DEFAULT_THEME);
              }}
              className="w-full text-[11px] text-muted-foreground/65 hover:text-foreground/70 py-2 border border-border rounded-lg hover:bg-foreground/[0.04] transition-colors flex items-center justify-center gap-1.5"
            >
              <RotateCcw size={11} /> Reset to Default
            </button>
          </div>
        ))}

        {/* A11y */}
        {section("a11y", Accessibility, "Accessibility", (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground/60">Reduced Motion</span>
              <button
                onClick={onToggleReducedMotion}
                role="switch"
                aria-checked={reducedMotion}
                aria-label="Toggle reduced motion"
                className={`w-9 h-5 rounded-full transition-colors relative ${reducedMotion ? "bg-foreground/20" : "bg-foreground/[0.08]"}`}
              >
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-foreground transition-transform ${reducedMotion ? "translate-x-4" : "translate-x-0.5"}`} />
              </button>
            </div>
            <div className="space-y-2">
              <div className="text-[10px] text-muted-foreground/65 mb-1">Contrast Ratios</div>
              {[
                { label: "Primary on BG", ratio: computeContrast(theme.primary, theme.bg), grade: "" },
                { label: "Secondary on BG", ratio: computeContrast(theme.secondary, theme.bg), grade: "" },
              ].map((item) => {
                const r = parseFloat(item.ratio);
                const grade = item.grade || (r >= 7 ? "AAA" : r >= 4.5 ? "AA" : r >= 3 ? "AA Large" : "Fail");
                const gradeColor = grade === "AAA" ? "#22c55e" : grade === "AA" || grade === "AA Large" ? "#eab308" : "#ef4444";
                return (
                  <div key={item.label} className="flex items-center justify-between text-[11px]">
                    <span className="text-muted-foreground/65">{item.label}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-foreground/60">{item.ratio}</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded font-medium" style={{ background: `${gradeColor}18`, color: gradeColor }}>
                        {grade}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="p-2.5 rounded-lg bg-foreground/[0.03] border border-border">
              <div className="text-[10px] text-muted-foreground/60 mb-2">Focus Order Preview</div>
              <div className="space-y-1.5">
                {["Primary Button", "Secondary Button", "Close Action"].map((item, i) => (
                  <div key={item} className="flex items-center gap-2 text-[11px]">
                    <span className="w-4 h-4 rounded text-[9px] flex items-center justify-center bg-foreground/[0.08] text-muted-foreground/65 font-mono">{i + 1}</span>
                    <span className="text-muted-foreground/60">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Metrics */}
        {section("metrics", Gauge, "Performance", (
          <div className="space-y-2.5">
            {[
              { label: "DOM Nodes", value: metrics.domNodes, icon: Box },
              { label: "CSS Rules", value: metrics.cssRules, icon: FileCode },
              { label: "Animations", value: metrics.animations, icon: Activity },
              { label: "Render Time", value: `${metrics.renderTime}ms`, icon: Clock },
            ].map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.label} className="flex items-center justify-between p-2 rounded-lg bg-foreground/[0.02]">
                  <div className="flex items-center gap-2">
                    <Icon size={13} className="text-muted-foreground/60" />
                    <span className="text-[11px] text-muted-foreground/60">{m.label}</span>
                  </div>
                  <span className="text-[11px] font-mono text-foreground/70">{m.value}</span>
                </div>
              );
            })}
            <div className="p-2.5 rounded-lg bg-foreground/[0.03] border border-border">
              <div className="text-[10px] text-muted-foreground/60 mb-2">Bundle Estimate</div>
              <div className="flex items-end gap-1">
                <span className="text-lg font-bold text-foreground/80">{(metrics.cssRules * 0.12 + metrics.domNodes * 0.05).toFixed(1)}</span>
                <span className="text-[10px] text-muted-foreground/60 mb-0.5">KB gzipped</span>
              </div>
            </div>
          </div>
        ))}

        {/* AI Assistant (future-ready) */}
        {section("ai", Bot, "AI Assistant", (
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-gradient-to-b from-foreground/[0.04] to-foreground/[0.01] border border-border text-center">
              <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/10 flex items-center justify-center">
                <Bot size={20} className="text-purple-400/60" />
              </div>
              <div className="text-xs font-medium text-foreground/70 mb-1">Ferrum AI</div>
              <div className="text-[10px] text-muted-foreground/60 leading-relaxed">
                Describe what you want to build, and AI will generate the component, effects, and motion configuration for you.
              </div>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Describe a component..."
                disabled
                aria-label="AI component description (coming in v2.1)"
                className="w-full h-9 text-[11px] bg-foreground/[0.04] border border-border rounded-lg pl-3 pr-3 text-foreground placeholder:text-muted-foreground/30 disabled:opacity-40 cursor-not-allowed"
              />
            </div>
            <div className="text-[10px] text-center text-muted-foreground/30">
              Coming in v2.1
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
