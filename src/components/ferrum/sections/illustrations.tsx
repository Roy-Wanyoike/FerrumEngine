/* ═══════════════════════════════════════════════════════════════
   SHARED ILLUSTRATIONS
   Demo illustrations used by hall-of-fame and showcase-gallery.
   Each illustration is a pure visual component — no state or effects.
   ═══════════════════════════════════════════════════════════════ */

// ─── Hall-of-Fame illustration types (large panels) ───────────

export type DemoIllustrationType =
  | "glass-os"
  | "ai-dashboard"
  | "healthcare-workflow"
  | "gaming-ui"
  | "developer-ide";

/** Large illustration used in HallOfFame (min-h-[280px] context) */
export function DemoIllustration({ type }: { type: DemoIllustrationType }) {
  switch (type) {
    case "glass-os":
      return (
        <div className="relative w-full h-full min-h-[280px] flex items-center justify-center bg-gradient-to-br from-purple-950/30 via-transparent to-blue-950/20 overflow-hidden">
          {/* Floating glass panel 1 */}
          <div
            className="absolute w-48 h-32 rounded-xl border border-white/[0.12] bg-white/[0.04] backdrop-blur-sm"
            style={{ top: "20%", left: "12%", boxShadow: "0 8px 32px rgba(168,85,247,0.1)" }}
          >
            <div className="p-3">
              <div className="flex gap-1.5 mb-3">
                <div className="w-2 h-2 rounded-full bg-red-400/50" />
                <div className="w-2 h-2 rounded-full bg-yellow-400/50" />
                <div className="w-2 h-2 rounded-full bg-green-400/50" />
              </div>
              <div className="space-y-1.5">
                <div className="h-1.5 w-3/4 rounded bg-white/[0.08]" />
                <div className="h-1.5 w-1/2 rounded bg-white/[0.06]" />
                <div className="h-1.5 w-2/3 rounded bg-white/[0.07]" />
              </div>
            </div>
          </div>
          {/* Floating glass panel 2 */}
          <div
            className="absolute w-44 h-36 rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm"
            style={{ top: "25%", right: "14%", boxShadow: "0 8px 32px rgba(59,130,246,0.08)" }}
          >
            <div className="p-3">
              <div className="flex gap-1.5 mb-3">
                <div className="w-2 h-2 rounded-full bg-red-400/40" />
                <div className="w-2 h-2 rounded-full bg-yellow-400/40" />
                <div className="w-2 h-2 rounded-full bg-green-400/40" />
              </div>
              <div className="space-y-1.5">
                <div className="h-6 w-full rounded bg-purple-500/[0.08] border border-purple-500/[0.1]" />
                <div className="h-6 w-full rounded bg-sky-500/[0.06] border border-sky-500/[0.08]" />
              </div>
            </div>
          </div>
          {/* Dock bar */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 px-4 py-2 rounded-2xl border border-white/[0.1] bg-white/[0.05] backdrop-blur-md">
            <div className="w-6 h-6 rounded-lg bg-purple-500/20 border border-purple-500/30" />
            <div className="w-6 h-6 rounded-lg bg-sky-500/20 border border-sky-500/30" />
            <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-500/30" />
            <div className="w-6 h-6 rounded-lg bg-rose-500/20 border border-rose-500/30" />
          </div>
        </div>
      );
    case "ai-dashboard":
      return (
        <div className="w-full h-full min-h-[280px] flex items-center justify-center bg-gradient-to-br from-sky-950/20 via-transparent to-transparent overflow-hidden p-8">
          <div className="flex items-end gap-3 h-40">
            {/* Bar 1 */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 rounded-t-md bg-gradient-to-t from-sky-600/60 to-sky-400/40 animate-pulse" style={{ height: "70%" }} />
              <span className="text-[9px] text-muted-foreground/60">Q1</span>
            </div>
            {/* Bar 2 */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 rounded-t-md bg-gradient-to-t from-purple-600/60 to-purple-400/40 animate-pulse" style={{ height: "90%", animationDelay: "0.2s" }} />
              <span className="text-[9px] text-muted-foreground/60">Q2</span>
            </div>
            {/* Bar 3 */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 rounded-t-md bg-gradient-to-t from-emerald-600/60 to-emerald-400/40 animate-pulse" style={{ height: "55%", animationDelay: "0.4s" }} />
              <span className="text-[9px] text-muted-foreground/60">Q3</span>
            </div>
          </div>
        </div>
      );
    case "healthcare-workflow":
      return (
        <div className="w-full h-full min-h-[280px] flex items-center justify-center bg-gradient-to-br from-emerald-950/20 via-transparent to-transparent overflow-hidden p-8">
          <div className="flex gap-3">
            {/* Card 1 - red border (urgent) */}
            <div className="w-28 rounded-lg border border-border/30 bg-foreground/[0.02] overflow-hidden">
              <div className="h-1 bg-red-500/60" />
              <div className="p-3 space-y-2">
                <div className="h-2 w-3/4 rounded bg-foreground/[0.06]" />
                <div className="h-1.5 w-1/2 rounded bg-foreground/[0.04]" />
                <div className="h-1.5 w-2/3 rounded bg-foreground/[0.04]" />
              </div>
            </div>
            {/* Card 2 - yellow border (medium) */}
            <div className="w-28 rounded-lg border border-border/30 bg-foreground/[0.02] overflow-hidden">
              <div className="h-1 bg-yellow-500/60" />
              <div className="p-3 space-y-2">
                <div className="h-2 w-2/3 rounded bg-foreground/[0.06]" />
                <div className="h-1.5 w-3/4 rounded bg-foreground/[0.04]" />
                <div className="h-1.5 w-1/2 rounded bg-foreground/[0.04]" />
              </div>
            </div>
            {/* Card 3 - green border (normal) */}
            <div className="w-28 rounded-lg border border-border/30 bg-foreground/[0.02] overflow-hidden">
              <div className="h-1 bg-green-500/60" />
              <div className="p-3 space-y-2">
                <div className="h-2 w-1/2 rounded bg-foreground/[0.06]" />
                <div className="h-1.5 w-2/3 rounded bg-foreground/[0.04]" />
                <div className="h-1.5 w-3/4 rounded bg-foreground/[0.04]" />
              </div>
            </div>
          </div>
        </div>
      );
    case "gaming-ui":
      return (
        <div className="w-full h-full min-h-[280px] flex items-center justify-center bg-gradient-to-br from-rose-950/20 via-transparent to-transparent overflow-hidden">
          <div className="w-56 space-y-4 p-4">
            {/* HP Bar */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[10px] text-red-400/70 font-medium">HP</span>
                <span className="text-[10px] text-muted-foreground/60">847 / 1000</span>
              </div>
              <div className="h-3 rounded-full bg-foreground/[0.06] border border-border/30 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-red-600 to-green-500" style={{ width: "85%" }} />
              </div>
            </div>
            {/* Mana Bar */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[10px] text-blue-400/70 font-medium">MP</span>
                <span className="text-[10px] text-muted-foreground/60">320 / 500</span>
              </div>
              <div className="h-3 rounded-full bg-foreground/[0.06] border border-border/30 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-blue-700 to-blue-400" style={{ width: "64%" }} />
              </div>
            </div>
            {/* XP Bar */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[10px] text-amber-400/70 font-medium">XP</span>
                <span className="text-[10px] text-muted-foreground/60">Level 42</span>
              </div>
              <div className="h-2 rounded-full bg-foreground/[0.06] border border-border/30 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-amber-600 to-amber-400" style={{ width: "72%" }} />
              </div>
            </div>
          </div>
        </div>
      );
    case "developer-ide":
      return (
        <div className="w-full h-full min-h-[280px] flex items-center justify-center bg-gradient-to-br from-amber-950/20 via-transparent to-transparent overflow-hidden p-8">
          <div className="w-full max-w-xs rounded-xl border border-border/30 bg-foreground/[0.03] overflow-hidden">
            {/* Tab bar */}
            <div className="flex border-b border-border/30 bg-foreground/[0.02]">
              <div className="px-3 py-2 text-[9px] text-foreground/60 border-b border-purple-500/40 bg-foreground/[0.03]">app.tsx</div>
              <div className="px-3 py-2 text-[9px] text-muted-foreground/60">utils.ts</div>
              <div className="px-3 py-2 text-[9px] text-muted-foreground/60">style.css</div>
            </div>
            {/* Code lines with syntax highlighting dots */}
            <div className="p-3 space-y-2.5 font-mono">
              {/* Line 1 - keyword + variable */}
              <div className="flex items-center gap-2">
                <span className="text-[9px] text-muted-foreground/25 w-4 text-right">1</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400/70" />
                  <div className="h-1.5 w-20 rounded bg-foreground/[0.08]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-400/70" />
                  <div className="h-1.5 w-12 rounded bg-foreground/[0.07]" />
                </div>
              </div>
              {/* Line 2 - function call */}
              <div className="flex items-center gap-2">
                <span className="text-[9px] text-muted-foreground/25 w-4 text-right">2</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/70" />
                  <div className="h-1.5 w-28 rounded bg-foreground/[0.08]" />
                </div>
              </div>
              {/* Line 3 - string literal */}
              <div className="flex items-center gap-2">
                <span className="text-[9px] text-muted-foreground/25 w-4 text-right">3</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400/70" />
                  <div className="h-1.5 w-16 rounded bg-foreground/[0.07]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400/70" />
                  <div className="h-1.5 w-8 rounded bg-foreground/[0.06]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
}

// ─── Showcase illustration types (compact card thumbnails) ────

export type ShowcaseIllustrationType =
  | "glass-os"
  | "analytics"
  | "healthcare"
  | "rpg"
  | "ide"
  | "ecommerce"
  | "banking"
  | "education";

/** Compact illustration used in ShowcaseGallery (h-28 context) */
export function ShowcaseIllustration({ type }: { type: ShowcaseIllustrationType }) {
  switch (type) {
    case "glass-os":
      return (
        <div className="relative w-full h-28 flex items-center justify-center">
          <div className="absolute w-24 h-16 rounded-lg border border-white/[0.1] bg-white/[0.04] backdrop-blur-sm top-2 left-4" style={{ boxShadow: "0 4px 16px rgba(168,85,247,0.08)" }}>
            <div className="p-2 space-y-1.5">
              <div className="flex gap-1"><div className="w-1.5 h-1.5 rounded-full bg-red-400/40" /><div className="w-1.5 h-1.5 rounded-full bg-yellow-400/40" /><div className="w-1.5 h-1.5 rounded-full bg-green-400/40" /></div>
              <div className="h-1 w-3/4 rounded bg-white/[0.07]" /><div className="h-1 w-1/2 rounded bg-white/[0.05]" />
            </div>
          </div>
          <div className="absolute w-24 h-16 rounded-lg border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm top-3 right-4" style={{ boxShadow: "0 4px 16px rgba(59,130,246,0.06)" }}>
            <div className="p-2 space-y-1.5">
              <div className="flex gap-1"><div className="w-1.5 h-1.5 rounded-full bg-red-400/30" /><div className="w-1.5 h-1.5 rounded-full bg-yellow-400/30" /><div className="w-1.5 h-1.5 rounded-full bg-green-400/30" /></div>
              <div className="h-4 w-full rounded bg-purple-500/[0.06]" />
            </div>
          </div>
        </div>
      );
    case "analytics":
      return (
        <div className="w-full h-28 flex items-end justify-center gap-2 pb-2">
          {["40%", "70%", "55%", "85%"].map((h, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="w-6 rounded-t-sm bg-gradient-to-t from-sky-600/50 to-sky-400/30 animate-pulse" style={{ height: h, animationDelay: `${i * 0.15}s` }} />
            </div>
          ))}
        </div>
      );
    case "healthcare":
      return (
        <div className="w-full h-28 flex items-center justify-center gap-2 px-2">
          {["border-l-red-500/60", "border-l-yellow-500/60", "border-l-green-500/60"].map((borderCls, ci) => (
            <div key={ci} className="flex-1 flex flex-col gap-1.5">
              {[0, 1].map((r) => (
                <div key={r} className={`h-8 rounded border border-border/30 bg-foreground/[0.02] border-l-2 ${borderCls}`} />
              ))}
            </div>
          ))}
        </div>
      );
    case "rpg":
      return (
        <div className="w-full h-28 flex items-center justify-center">
          <div className="w-40 space-y-3 px-2">
            <div>
              <div className="flex justify-between mb-0.5"><span className="text-[8px] text-red-400/60">HP</span><span className="text-[8px] text-muted-foreground/30">847/1000</span></div>
              <div className="h-2 rounded-full bg-foreground/[0.06] overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-red-600 to-green-500" style={{ width: "85%" }} /></div>
            </div>
            <div>
              <div className="flex justify-between mb-0.5"><span className="text-[8px] text-blue-400/60">MP</span><span className="text-[8px] text-muted-foreground/30">320/500</span></div>
              <div className="h-2 rounded-full bg-foreground/[0.06] overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-blue-700 to-blue-400" style={{ width: "64%" }} /></div>
            </div>
            <div className="flex justify-center mt-1">
              <div className="w-6 h-6 rounded border border-border/30 bg-foreground/[0.04] flex items-center justify-center"><div className="w-3 h-3 rounded-full border border-sky-400/30" /></div>
            </div>
          </div>
        </div>
      );
    case "ide":
      return (
        <div className="w-full h-28 flex items-center justify-center px-2">
          <div className="w-full max-w-[180px] rounded-lg border border-border/30 bg-foreground/[0.03] overflow-hidden">
            <div className="h-5 bg-foreground/[0.02] border-b border-border/30 flex items-center px-2 gap-1.5">
              <div className="w-1 h-1 rounded-full bg-green-400/50" /><span className="text-[7px] text-muted-foreground/30">~/project</span>
            </div>
            <div className="p-2 space-y-1.5 font-mono">
              <div className="flex items-center gap-1"><div className="w-1 h-1 rounded-full bg-purple-400/60" /><div className="h-1 w-16 rounded bg-foreground/[0.07]" /></div>
              <div className="flex items-center gap-1"><div className="w-1 h-1 rounded-full bg-emerald-400/60" /><div className="h-1 w-20 rounded bg-foreground/[0.06]" /></div>
              <div className="flex items-center gap-1"><div className="w-1 h-1 rounded-full bg-amber-400/60" /><div className="h-1 w-12 rounded bg-foreground/[0.07]" /></div>
            </div>
          </div>
        </div>
      );
    case "ecommerce":
      return (
        <div className="w-full h-28 flex items-center justify-center px-2">
          <div className="w-28 rounded-lg border border-border/30 bg-foreground/[0.02] overflow-hidden">
            <div className="h-16 bg-gradient-to-br from-pink-950/30 to-purple-950/20" />
            <div className="p-2 space-y-1.5">
              <div className="h-1.5 w-3/4 rounded bg-foreground/[0.06]" />
              <div className="flex items-center justify-between">
                <div className="h-1.5 w-1/3 rounded bg-foreground/[0.05]" />
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < 4 ? "bg-amber-400/60" : "bg-foreground/[0.06]"}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    case "banking":
      return (
        <div className="w-full h-28 flex items-center justify-center">
          <div className="text-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">$42,847</span>
            <div className="mt-1.5 text-[8px] text-emerald-400/50">+12.4% this month</div>
            <div className="mt-2 flex gap-1 justify-center">
              {["30%", "50%", "45%", "70%", "60%"].map((h, i) => (
                <div key={i} className="w-3 rounded-t-sm bg-gradient-to-t from-blue-600/40 to-blue-400/20" style={{ height: h }} />
              ))}
            </div>
          </div>
        </div>
      );
    case "education":
      return (
        <div className="w-full h-28 flex items-center justify-center px-4">
          <div className="flex items-center gap-0">
            {["Completed", "In Progress", "Upcoming"].map((label, i) => (
              <div key={label} className="flex items-center">
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${i < 2 ? "border-purple-500/60 bg-purple-500/20" : "border-border/40 bg-foreground/[0.03]"}`}>
                    {i < 2 && <div className="w-1.5 h-1.5 rounded-full bg-purple-400/70" />}
                  </div>
                  <span className="text-[7px] text-muted-foreground/60">{label}</span>
                </div>
                {i < 2 && <div className={`w-8 h-0.5 ${i === 0 ? "bg-purple-500/40" : "bg-purple-500/20"}`} />}
              </div>
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
}
