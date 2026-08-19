/* ═══════════════════════════════════════════════════════════════
   MARQUEE STRIP — Server Component (CSS-only animation, no JS)
   ═══════════════════════════════════════════════════════════════ */

const marqueeItems = [
  "CSS Animations", "Houdini Paint API", "Scroll-Driven Animations", "Container Queries",
  "Cascade Layers", "View Transitions", "GPU Accelerated", "Zero Dependencies",
  "Tree Shaking", "TypeScript Native", "Framework Agnostic", "Plugin SDK",
  "Design Tokens", "VFX Engine", "Motion Engine", "9 Framework Adapters",
];

export function PlatformMarquee() {
  return (
    <div className="relative overflow-hidden py-5 border-y border-border/50 bg-foreground/[0.01]" aria-hidden="true">
      <div className="flex ferrum-marquee" style={{ width: "max-content" }}>
        {[0, 1, 2, 3].map((set) => (
          <div key={set} className="flex items-center gap-8 px-4">
            {marqueeItems.map((item) => (
              <div key={`${set}-${item}`} className="flex items-center gap-2.5 whitespace-nowrap">
                <span className="w-1 h-1 rounded-full bg-purple-400/40" />
                <span className="text-xs font-medium text-muted-foreground/60 tracking-wide uppercase">{item}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
