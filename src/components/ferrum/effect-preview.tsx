"use client";

import { Sparkles } from "lucide-react";
import { memo, type CSSProperties } from "react";
import type { FerrumEffectIndex } from "@/lib/ferrum-effects-index";

/* ════════════════════════════════════════════════════════════════
   EFFECT PREVIEW — Renders effect demos by display type
   ════════════════════════════════════════════════════════════════ */
const EffectPreview = memo(function EffectPreview({ effect, style }: { effect: FerrumEffectIndex; style?: CSSProperties }) {
  const base = "w-full h-24 rounded-lg bg-foreground/[0.03] flex items-center justify-center overflow-hidden";
  const cls = effect.className;

  if (effect.displayType === "text") {
    return (
      <div className={base + " p-4"}>
        <span className={"text-lg font-semibold text-foreground/80 " + cls}>Ferrum</span>
      </div>
    );
  }
  if (effect.displayType === "loader") {
    return (
      <div className={base}>
        <div className={cls} style={style}>
          <div className="w-8 h-8 rounded-full border-2 border-muted-foreground/30 border-t-foreground animate-spin" />
        </div>
      </div>
    );
  }
  if (effect.displayType === "bg") {
    return <div className={base + " " + cls} style={style} />;
  }
  if (effect.displayType === "icon") {
    return (
      <div className={base}>
        <Sparkles className={"w-8 h-8 text-purple-400 " + cls} style={style} />
      </div>
    );
  }
  if (effect.displayType === "button") {
    return (
      <div className={base}>
        <button className={"px-5 py-2 rounded-lg bg-foreground text-background text-sm font-medium " + cls} style={style}>
          Hover me
        </button>
      </div>
    );
  }
  if (effect.displayType === "card") {
    return (
      <div className={base + " p-4"}>
        <div className={"p-4 rounded-xl border border-border bg-foreground/[0.02] " + cls} style={style}>
          <div className="w-8 h-1.5 rounded bg-foreground/10 mb-2" />
          <div className="w-16 h-1.5 rounded bg-foreground/6" />
        </div>
      </div>
    );
  }
  if (effect.displayType === "image") {
    return (
      <div className={base + " p-4"}>
        <div className={"w-full h-full rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 " + cls} style={style} />
      </div>
    );
  }
  // box / preset
  return (
    <div className={base}>
      <div className={"w-12 h-12 rounded-lg bg-foreground/[0.06] " + cls} style={style} />
    </div>
  );
});

export { EffectPreview };
