import { Lock, Gauge, Building2, GraduationCap, Bot, Shield } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   SECTION 8 — ENTERPRISE
   Vercel-style trust & scale
   ═══════════════════════════════════════════════════════════════ */

const enterpriseFeatures = [
  { icon: Lock, title: "Enterprise Security", desc: "Designed for SOC 2 Type II compliance. Audit logging, SSO integration, and role-based access control built into every deployment." },
  { icon: Gauge, title: "Performance SLAs", desc: "Targeting 99.9% uptime with edge CDN distribution. Optimized for sub-100ms responses globally. Real-time performance monitoring dashboards." },
  { icon: Building2, title: "Team Workflows", desc: "Branch-based previews, design token versioning, and automated visual regression testing. Ship with confidence across large teams." },
  { icon: GraduationCap, title: "Design System Governance", desc: "Centralized token management with propagation to all consumer projects. Enforce brand consistency across every team and product." },
  { icon: Bot, title: "AI Integration Layer", desc: "Intent-to-render pipeline for AI-generated UI. Automatic effect recommendation, code generation, and design system inference." },
  { icon: Shield, title: "Full Control", desc: "Self-hosted or cloud. Private registries. Custom compiler passes. Ferrum adapts to your infrastructure, not the other way around." },
];

export function EnterpriseSection() {
  return (
    <section id="enterprise" className="py-28 sm:py-36 relative overflow-hidden">
      <div className="ferrum-divider-glow absolute top-0 left-0 right-0" />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 right-0 w-[500px] h-[400px] bg-amber-500/[0.015] rounded-full blur-[140px]" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        <div className="animate-in fade-in-0 slide-in-from-bottom-3"><p className="text-xs font-semibold uppercase tracking-[0.15em] text-purple-400 mb-4">Enterprise</p></div>
        <div className="animate-in fade-in-0 slide-in-from-bottom-3" style={{ animationDelay: "0.05s", animationFillMode: "both" }}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight max-w-3xl">
            Built for teams that<br /><span className="text-muted-foreground/50">ship at scale.</span>
          </h2>
        </div>
        <div className="animate-in fade-in-0 slide-in-from-bottom-3" style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
          <p className="text-lg text-muted-foreground/60 max-w-2xl leading-relaxed mt-5">
            Ferrum isn&apos;t just for side projects. Enterprise teams need governance, security,
            and performance guarantees. Ferrum provides the infrastructure to maintain design
            consistency across hundreds of developers and dozens of products.
          </p>
        </div>
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {enterpriseFeatures.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="animate-in fade-in-0 slide-in-from-bottom-2">
                <div className="group p-6 rounded-2xl border border-border/50 bg-foreground/[0.015] hover:bg-foreground/[0.03] transition-all duration-300 h-full">
                  <div className="w-10 h-10 rounded-xl bg-foreground/[0.05] border border-border/50 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-muted-foreground/50 group-hover:text-purple-400 transition-colors" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground/70 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
