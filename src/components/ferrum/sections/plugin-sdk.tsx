"use client";

import { Puzzle, ShieldCheck, GitBranch, ArrowRight, Lock, Cpu, Trash2, FileOutput, Settings, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/ferrum/scroll-reveal";
import { AnimatedCard } from "@/components/ferrum/animated-components";

const phases = [
  { name: "validate", label: "Validate", desc: "Schema & type validation for plugin manifests and hook definitions", icon: ShieldCheck, color: "green" },
  { name: "register", label: "Register", desc: "Token and component registration into the Ferrum pipeline", icon: CheckCircle2, color: "blue" },
  { name: "transform", label: "Transform", desc: "CSS transformation — the primary hook for custom processing", icon: Settings, color: "violet" },
  { name: "optimize", label: "Optimize", desc: "Post-transform optimization hooks for output size reduction", icon: Cpu, color: "amber" },
  { name: "generate", label: "Generate", desc: "Final CSS generation hooks with access to the compiled output", icon: FileOutput, color: "cyan" },
  { name: "post-process", label: "Post-Process", desc: "Minification, autoprefixing, and final output formatting", icon: ArrowRight, color: "pink" },
  { name: "cleanup", label: "Cleanup", desc: "Resource cleanup, temp file removal, and memory deallocation", icon: Trash2, color: "rose" },
];

const colorMap: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  green: { bg: "bg-green-500/10", border: "border-green-500/20", text: "text-green-400", dot: "bg-green-400" },
  blue: { bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-400", dot: "bg-blue-400" },
  violet: { bg: "bg-violet-500/10", border: "border-violet-500/20", text: "text-violet-400", dot: "bg-violet-400" },
  amber: { bg: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-400", dot: "bg-amber-400" },
  cyan: { bg: "bg-cyan-500/10", border: "border-cyan-500/20", text: "text-cyan-400", dot: "bg-cyan-400" },
  pink: { bg: "bg-pink-500/10", border: "border-pink-500/20", text: "text-pink-400", dot: "bg-pink-400" },
  rose: { bg: "bg-rose-500/10", border: "border-rose-500/20", text: "text-rose-400", dot: "bg-rose-400" },
};

export function PluginSDK() {
  return (
    <section id="plugin-sdk" className="py-28 sm:py-36 relative overflow-hidden">
      <div className="ferrum-divider-glow absolute top-0 left-0 right-0" />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 right-0 w-[500px] h-[300px] bg-cyan-500/[0.03] rounded-full blur-[140px]" />
        <div className="ferrum-aurora ferrum-aurora-3 absolute top-1/4 left-1/3 w-[400px] h-[250px] bg-cyan-500/[0.04]" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        <Reveal>
          <p className="ferrum-section-label text-xs font-semibold uppercase tracking-[0.15em] text-purple-400/70 mb-4">Plugin SDK</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            Extend. Customize. Compose.{" "}
            <span className="inline-flex items-center gap-1.5 ml-2 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-amber-400/10 text-amber-400/80 border border-amber-400/15">Coming Soon</span>
            <br />
            <span className="text-muted-foreground/70">Safely.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mt-5">
            A fully typed plugin system with Proxy-based sandboxing, 7-phase hook lifecycle,
            priority-based execution, and event emission. Zero external dependencies.
          </p>
        </Reveal>

        <div className="mt-16 grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left — Sandbox Architecture */}
          <div>
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Proxy Sandbox</h3>
                  <p className="text-xs text-muted-foreground/50">Isolated execution environment</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="space-y-3">
                {[
                  { title: "Configurable Allowlist", desc: "Restrict which global APIs plugins can access. Only explicitly allowed globals pass through the Proxy trap." },
                  { title: "30s Timeout Guard", desc: "Plugins that exceed the configurable timeout are terminated, preventing infinite loops from blocking the build." },
                  { title: "50 MB Memory Limit", desc: "Enforce a memory ceiling per plugin sandbox to catch memory leaks before they affect the host process." },
                  { title: "Event Bus", desc: "Subscribe to plugin:load, plugin:unload, hook:before, hook:after, and plugin:error events for full observability." },
                ].map((f) => (
                  <AnimatedCard key={f.title} spotlightColor="rgba(6, 182, 212, 0.04)" glowColor="rgba(6, 182, 212, 0.10)" className="border border-border/50 bg-foreground/[0.02]">
                    <div className="p-4 relative z-20">
                      <h4 className="text-sm font-medium text-foreground/60">{f.title}</h4>
                      <p className="text-xs text-muted-foreground/50 mt-1 leading-relaxed">{f.desc}</p>
                    </div>
                  </AnimatedCard>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right — 7-Phase Lifecycle */}
          <div>
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                  <GitBranch className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">7-Phase Hook Lifecycle</h3>
                  <p className="text-xs text-muted-foreground/50">Ordered pipeline execution</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-[19px] top-6 bottom-6 w-px bg-foreground/[0.07]" />
                <div className="space-y-1">
                  {phases.map((phase, i) => {
                    const c = colorMap[phase.color] ?? { bg: '', border: 'border-border', text: 'text-foreground', dot: 'bg-foreground' };
                    return (
                      <div key={phase.name} className="flex items-start gap-4 p-3 rounded-xl hover:bg-foreground/[0.04] transition-colors duration-300 group">
                        <div className="relative z-10 mt-1.5 shrink-0">
                          <div className={`w-2.5 h-2.5 rounded-full ${c.dot}`} />
                          {i < phases.length - 1 && <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-px h-[calc(100%+8px)] bg-foreground/[0.05]" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <code className={`text-xs font-mono ${c.text}`}>{phase.name}</code>
                            <span className="text-[10px] text-muted-foreground/60 font-mono">phase {i + 1}</span>
                          </div>
                          <p className="text-xs text-muted-foreground/50 mt-0.5 leading-relaxed">{phase.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 p-5 rounded-2xl border border-dashed border-border bg-foreground/[0.01]">
            <div className="flex items-center gap-3 mb-3">
              <Puzzle className="w-4 h-4 text-cyan-400/60" />
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Plugin API Surface</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "PluginLifecycle", "registerPlugin()", "unregisterPlugin()",
                "runPhase()", "getPlugin()", "getPlugins()",
                "on(event)", "destroy()",
                "validateManifest()", "validateHooks()",
                "createSandbox()", "runInSandbox()",
              ].map((api) => (
                <code key={api} className="px-2.5 py-1 rounded-md bg-cyan-500/[0.04] border border-cyan-500/10 text-[11px] text-cyan-400/50 font-mono">{api}</code>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}