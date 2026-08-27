"use client";

import { Reveal } from "@/components/ferrum/scroll-reveal";

const items = [
  "CSS Animations", "Houdini Paint API", "Scroll-Driven Animations", "Container Queries",
  "Cascade Layers", "View Transitions", "Anchor Positioning", "GPU Accelerated",
  "Zero Dependencies", "Tree Shaking", "TypeScript Native", "Framework Agnostic",
  "Plugin SDK", "Design Tokens", "VFX Engine", "Motion Engine",
];

export function MarqueeStrip() {
  return (
    <div className="relative overflow-hidden py-5 border-y border-border/50 bg-foreground/[0.01]">
      <Reveal>
        <div className="flex ferrum-marquee" style={{ width: "max-content" }}>
          {/* Duplicate for seamless loop */}
          {[0, 1, 2, 3].map((set) => (
            <div key={set} className="flex items-center gap-8 px-4">
              {items.map((item) => (
                <div key={`${set}-${item}`} className="flex items-center gap-2.5 whitespace-nowrap">
                  <span className="w-1 h-1 rounded-full bg-purple-400/40" />
                  <span className="text-xs font-medium text-muted-foreground/40 tracking-wide uppercase">{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}