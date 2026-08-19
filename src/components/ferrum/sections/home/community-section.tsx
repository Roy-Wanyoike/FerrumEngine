import { GitBranch, MessageSquare, Users, Star, ExternalLink } from "lucide-react";
import { Counter } from "@/components/ferrum/sections/home/counter";

/* ═══════════════════════════════════════════════════════════════
   SECTION 10 — COMMUNITY
   Open source community section
   ═══════════════════════════════════════════════════════════════ */

const communityLinks = [
  { icon: GitBranch, label: "GitHub", desc: "Star, fork, and contribute to the engine.", href: "https://github.com/roy-wanyoike/FerrumEngine", stat: "Open Source" },
  { icon: MessageSquare, label: "Discussions", desc: "Ask questions, share ideas, and connect.", href: "https://github.com/roy-wanyoike/FerrumEngine/discussions", stat: "Community" },
  { icon: Users, label: "Contributors", desc: "Join the team building the future of UI.", href: "https://github.com/roy-wanyoike/FerrumEngine/graphs/contributors", stat: "Growing" },
  { icon: Star, label: "Sponsor", desc: "Support open-source UI infrastructure.", href: "https://github.com/roy-wanyoike/FerrumEngine/sponsor", stat: "Support" },
];

export function CommunitySection() {
  return (
    <section id="community" className="py-28 sm:py-36 relative overflow-hidden">
      <div className="ferrum-divider-glow absolute top-0 left-0 right-0" />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-1/2 w-[600px] h-[400px] bg-violet-500/[0.02] rounded-full blur-[140px]" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        <div className="animate-in fade-in-0 slide-in-from-bottom-3"><p className="text-xs font-semibold uppercase tracking-[0.15em] text-purple-400 mb-4">Community</p></div>
        <div className="animate-in fade-in-0 slide-in-from-bottom-3" style={{ animationDelay: "0.05s", animationFillMode: "both" }}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight max-w-3xl">
            Built in the open.<br /><span className="text-muted-foreground/50">Shipped with community.</span>
          </h2>
        </div>
        <div className="animate-in fade-in-0 slide-in-from-bottom-3" style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
          <p className="text-lg text-muted-foreground/60 max-w-2xl leading-relaxed mt-5">
            Ferrum is MIT-licensed and open source. Every design decision, every API, every effect
            is developed transparently. We believe the best UI platform is one that the entire
            web community helps build.
          </p>
        </div>

        {/* Stats bar */}
        <div className="animate-in fade-in-0 slide-in-from-bottom-3" style={{ animationDelay: "0.12s", animationFillMode: "both" }}>
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 py-10 px-6 rounded-2xl border border-border/50 bg-foreground/[0.015]">
            {[
              { value: 542, suffix: "+", label: "Motion Effects" },
              { value: 20, suffix: "+", label: "Packages" },
              { value: 9, suffix: "", label: "Framework Adapters" },
              { value: 7, suffix: "", label: "Paint Worklets" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-foreground tabular-nums tracking-tight">
                  <Counter target={s.value} suffix={s.suffix} />
                </div>
                <div className="text-xs text-muted-foreground/60 mt-2 font-medium uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {communityLinks.map((link) => {
            const Icon = link.icon;
            return (
              <div key={link.label} className="animate-in fade-in-0 slide-in-from-bottom-2">
                <a href={link.href} target="_blank" rel="noopener noreferrer"
                  className="group flex flex-col p-5 rounded-2xl border border-border/50 bg-foreground/[0.015] hover:bg-foreground/[0.03] transition-all duration-300 h-full">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-foreground/[0.05] border border-border/50 flex items-center justify-center group-hover:bg-purple-500/10 group-hover:border-purple-500/20 transition-all">
                      <Icon className="w-5 h-5 text-muted-foreground/50 group-hover:text-purple-400 transition-colors" />
                    </div>
                    <span className="text-[10px] font-medium text-muted-foreground/60 uppercase tracking-wider">{link.stat}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">{link.label}</h3>
                  <p className="text-xs text-muted-foreground/60 leading-relaxed">{link.desc}</p>
                  <div className="mt-auto pt-3 flex items-center gap-1.5 text-[11px] text-purple-400/60 group-hover:text-purple-400 transition-colors">
                    Visit <ExternalLink className="w-3 h-3" />
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
