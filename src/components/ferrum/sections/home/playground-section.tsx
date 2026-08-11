"use client";

import { Square, MousePointerClick, LayoutDashboard, Navigation, Check, Copy } from "lucide-react";
import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { toast } from "sonner";
import { PulsingDot } from "@/components/ferrum/animated-components";

/* ═══════════════════════════════════════════════════════════════
   SECTION 3 — INTERACTIVE PLAYGROUND
   Live code playground with component/effect preview
   ═══════════════════════════════════════════════════════════════ */

const playgroundComponents = [
  { id: "card", label: "Card", icon: Square },
  { id: "button", label: "Button", icon: MousePointerClick },
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "navigation", label: "Nav Bar", icon: Navigation },
];
const playgroundMotions = ["None", "Spring", "Bounce", "Magnetic", "Elastic", "Smooth"];
const playgroundEffects = ["None", "Glass", "Neon", "Metal", "Blur", "Depth", "Glow"];

const motionCSS: Record<string, string> = {
  None: "transition-all duration-200",
  Spring: "transition-all duration-500 cubic-bezier(0.34,1.56,0.64,1)",
  Bounce: "transition-all duration-600 cubic-bezier(0.68,-0.55,0.27,1.55)",
  Magnetic: "transition-all duration-300 cubic-bezier(0.22,1,0.36,1)",
  Elastic: "transition-all duration-800 cubic-bezier(0.175,0.885,0.32,1.275)",
  Smooth: "transition-all duration-400 cubic-bezier(0.4,0,0.2,1)",
};

const effectStyles: Record<string, string> = {
  None: "", Glass: "backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/20 shadow-lg",
  Neon: "shadow-[0_0_15px_rgba(168,85,247,0.5),0_0_30px_rgba(168,85,247,0.2)] border border-purple-500/40",
  Metal: "bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] border border-gray-600/50",
  Blur: "backdrop-blur-3xl bg-black/5 dark:bg-white/5 border border-white/10", Depth: "shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-border",
  Glow: "shadow-[0_0_40px_rgba(168,85,247,0.3)] border border-purple-500/30",
};

export function PlaygroundSection() {
  const [activeComp, setActiveComp] = useState("card");
  const [activeMotion, setActiveMotion] = useState("Spring");
  const [activeEffect, setActiveEffect] = useState("Glass");
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const copiedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => { return () => { if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current); }; }, []);
  const STATS = [72, 48, 89, 65];



  const codeOutput = useMemo(() => `<div class="roycss-float ${activeEffect !== "None" ? "roycss-" + activeEffect.toLowerCase() : ""} ${activeMotion !== "None" ? "roycss-" + activeMotion.toLowerCase() : ""}>
  <${activeComp === "card" ? "Card" : activeComp === "button" ? "Button" : activeComp === "dashboard" ? "Dashboard" : "NavBar"} />
</div>`, [activeComp, activeMotion, activeEffect]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(codeOutput).then(() => { setCopied(true); if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current); copiedTimerRef.current = setTimeout(() => setCopied(false), 2000); }).catch(() => { toast.error("Failed to copy"); });
  }, [codeOutput]);

  return (
    <section id="playground-section" className="py-28 sm:py-36 relative overflow-hidden">
      <div className="ferrum-divider-glow absolute top-0 left-0 right-0" />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-purple-500/[0.015] rounded-full blur-[160px]" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        <div className="animate-in fade-in-0 slide-in-from-bottom-3" style={{ animationDelay: "0s", animationFillMode: "both" }}>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-purple-400 mb-4">Interactive Playground</p>
        </div>
        <div className="animate-in fade-in-0 slide-in-from-bottom-3" style={{ animationDelay: "0.05s", animationFillMode: "both" }}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            See it. Tweak it.<br /><span className="text-muted-foreground/50">Ship it.</span>
          </h2>
        </div>
        <div className="animate-in fade-in-0 slide-in-from-bottom-3" style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
          <p className="text-lg text-muted-foreground/60 max-w-2xl leading-relaxed mt-5">
            Every effect, every motion, every component — available right here. Select a component,
            apply motion and effects, and get production-ready code instantly. What you see is
            exactly what ships.
          </p>
        </div>

        <div className="animate-in fade-in-0 slide-in-from-bottom-3" style={{ animationDelay: "0.15s", animationFillMode: "both" }}>
          <div className="mt-14 grid lg:grid-cols-[1fr_380px] gap-6">
            {/* Preview area */}
            <div className="relative rounded-2xl border border-border/50 bg-foreground/[0.02] overflow-hidden min-h-[340px] flex items-center justify-center p-8 sm:p-12"
              onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
              <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
              <div className={`relative z-10 transition-all duration-300 ${hovered ? "scale-[1.03]" : "scale-100"} ${motionCSS[activeMotion] || ""}`}
                style={hovered && activeMotion === "Spring" ? { transform: "translateY(-8px) scale(1.03)" } : hovered && activeMotion === "Bounce" ? { transform: "translateY(-4px) scale(1.02)" } : {}}>
                {activeComp === "card" && (
                  <div className={`w-64 sm:w-72 rounded-2xl p-6 ${effectStyles[activeEffect] || "border border-border bg-card"}`}>
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 mb-4" />
                    <div className="h-3 w-3/4 rounded bg-foreground/10 mb-2" />
                    <div className="h-2 w-1/2 rounded bg-foreground/[0.06] mb-4" />
                    <div className="flex gap-2">
                      <div className="px-4 py-1.5 rounded-lg bg-foreground/[0.08] text-xs text-muted-foreground/60">Action</div>
                      <div className="px-4 py-1.5 rounded-lg border border-border/50 text-xs text-muted-foreground/40">Cancel</div>
                    </div>
                  </div>
                )}
                {activeComp === "button" && (
                  <button className={`px-8 py-3 rounded-xl font-medium text-sm ${effectStyles[activeEffect] || "border border-border bg-card"} ${hovered ? "bg-purple-500/20 border-purple-500/30" : ""}`}>
                    Get Started
                  </button>
                )}
                {activeComp === "dashboard" && (
                  <div className={`w-72 sm:w-80 rounded-2xl p-4 ${effectStyles[activeEffect] || "border border-border bg-card"}`}>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      {["Revenue", "Users", "Growth", "Active"].map((l, i) => (
                        <div key={l} className="p-3 rounded-lg bg-foreground/[0.04]">
                          <div className="text-[9px] text-muted-foreground/40 uppercase">{l}</div>
                          <div className="text-lg font-bold text-foreground mt-0.5">{STATS[i]!}%</div>
                        </div>
                      ))}
                    </div>
                    <div className="h-16 rounded-lg bg-foreground/[0.03]" />
                  </div>
                )}
                {activeComp === "navigation" && (
                  <div className={`w-72 sm:w-80 rounded-xl px-4 py-3 flex items-center gap-4 ${effectStyles[activeEffect] || "border border-border bg-card"}`}>
                    <div className="w-6 h-6 rounded-md bg-purple-500/20" />
                    {["Home", "Products", "Docs"].map((l) => (
                      <span key={l} className="text-xs text-muted-foreground/50 hover:text-foreground transition-colors cursor-default">{l}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-md bg-foreground/[0.04] border border-border/30 z-20">
                <PulsingDot color="bg-emerald-500 dark:bg-emerald-400" />
                <span className="text-[9px] font-medium text-muted-foreground/40 uppercase tracking-wider">Preview</span>
              </div>
            </div>

            {/* Controls panel */}
            <div className="space-y-4">
              {/* Component selector */}
              <div className="rounded-2xl border border-border/50 bg-foreground/[0.015] p-5">
                <h3 className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider mb-3">Component</h3>
                <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Component selector">
                  {playgroundComponents.map((c) => { const Icon = c.icon; return (
                    <button key={c.id} onClick={() => setActiveComp(c.id)}
                      role="radio" aria-checked={activeComp === c.id}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${activeComp === c.id ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" : "text-muted-foreground/50 hover:text-foreground hover:bg-foreground/[0.04] border border-transparent"}`}>
                      <Icon className="w-3.5 h-3.5" />{c.label}
                    </button>
                  ); })}
                </div>
              </div>
              {/* Motion selector */}
              <div className="rounded-2xl border border-border/50 bg-foreground/[0.015] p-5">
                <h3 className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider mb-3">Motion</h3>
                <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Motion type">
                  {playgroundMotions.map((m) => (
                    <button key={m} onClick={() => setActiveMotion(m)}
                      role="radio" aria-checked={activeMotion === m}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all ${activeMotion === m ? "bg-pink-500/10 text-pink-400 border border-pink-500/20" : "text-muted-foreground/40 hover:text-foreground hover:bg-foreground/[0.04] border border-transparent"}`}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              {/* Effect selector */}
              <div className="rounded-2xl border border-border/50 bg-foreground/[0.015] p-5">
                <h3 className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider mb-3">Effect</h3>
                <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Effect type">
                  {playgroundEffects.map((e) => (
                    <button key={e} onClick={() => setActiveEffect(e)}
                      role="radio" aria-checked={activeEffect === e}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all ${activeEffect === e ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : "text-muted-foreground/40 hover:text-foreground hover:bg-foreground/[0.04] border border-transparent"}`}>
                      {e}
                    </button>
                  ))}
                </div>
              </div>
              {/* Code output */}
              <div className="rounded-2xl border border-border/50 bg-foreground/[0.02] p-5 relative">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider">Output</h3>
                  <button onClick={handleCopy} aria-label="Copy code" className="text-muted-foreground/40 hover:text-foreground transition-colors p-1 min-w-[44px] min-h-[44px] flex items-center justify-center">
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <pre className="text-[11px] font-mono text-muted-foreground/50 leading-relaxed overflow-x-auto"><code>{codeOutput}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}