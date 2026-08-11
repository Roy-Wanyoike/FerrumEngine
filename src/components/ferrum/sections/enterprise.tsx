import {
  Shield, Database, GitBranch, BarChart3, FileCheck,
  Bot, Lock, ClipboardList, Eye,
} from "lucide-react";
import Link from "next/link";
import { SectionHeader } from "./section-helpers";

interface EnterpriseFeature {
  icon: React.ElementType;
  title: string;
  description: string;
  category: string;
  phase: "core" | "infrastructure";
}

const features: EnterpriseFeature[] = [
  {
    icon: ClipboardList,
    title: "Design Governance",
    description: "Enforce design system adoption across teams. Track which components and tokens are used where. Receive automated compliance reports when projects drift from the approved system. Governance isn't about control — it's about consistency at scale.",
    category: "Governance",
    phase: "infrastructure",
  },
  {
    icon: Database,
    title: "Component Registry",
    description: "A centralized registry for every component, effect, and token in your organization. Teams publish to the registry; consumers discover and import. Version control, deprecation notices, and breaking change tracking built in.",
    category: "Registry",
    phase: "infrastructure",
  },
  {
    icon: GitBranch,
    title: "Version Control",
    description: "Semantic versioning for design tokens, components, and effects. Changelogs generated automatically. Diff visualization shows exactly what changed between versions — not in code, but in the actual visual output.",
    category: "Infrastructure",
    phase: "core",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Understand how your design system is actually used. Which effects are most popular? Which tokens are overridden most often? Where do teams create one-off solutions instead of using the system? Data-driven design decisions.",
    category: "Intelligence",
    phase: "infrastructure",
  },
  {
    icon: Shield,
    title: "Policy Enforcement",
    description: "Define rules that your design system must follow: maximum bundle size, required accessibility levels, approved color palettes. CI/CD integration ensures no PR ships that violates policy. Automated, not manual.",
    category: "Governance",
    phase: "core",
  },
  {
    icon: Eye,
    title: "Accessibility Reports",
    description: "Continuous WCAG compliance monitoring. Every component ships with an accessibility score. Track your organization's a11y posture over time. Generate VPAT documents for enterprise sales cycles.",
    category: "Compliance",
    phase: "core",
  },
  {
    icon: FileCheck,
    title: "Compliance",
    description: "SOC 2 Type II, GDPR, and HIPAA compliance for design system tooling. Enterprise procurement requires vendor assessments — Ferrum Enterprise provides the documentation and infrastructure to pass them.",
    category: "Compliance",
    phase: "infrastructure",
  },
  {
    icon: Bot,
    title: "AI Governance",
    description: "When AI generates UI, who is responsible for the output? Ferrum Enterprise provides audit trails for AI-generated code, approval workflows, and quality gates that ensure AI-assisted development meets the same standards as hand-written code.",
    category: "Intelligence",
    phase: "infrastructure",
  },
  {
    icon: Lock,
    title: "Private Registry",
    description: "Hosted component and token registries behind your organization's firewall. No public npm packages. No open-source license concerns. Your design system, your IP, your infrastructure.",
    category: "Infrastructure",
    phase: "infrastructure",
  },
];

const categories = ["Governance", "Registry", "Infrastructure", "Intelligence", "Compliance"];

export function Enterprise() {
  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <SectionHeader
          label="Enterprise"
          title="Enterprise Roadmap"
          subtitle="Planned enterprise capabilities for organizations that need governance, compliance, and intelligence at scale. These features are designed to layer on top of Ferrum's open-source core — the foundation is available today."
          subtitleOpacity="60"
        />

        {/* Status badge */}
        <div className="animate-in fade-in-0 slide-in-from-bottom-3" style={{ animationDelay: "0.15s", animationFillMode: "both" }}>
          <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/15 bg-purple-500/[0.04]">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            <span className="text-xs font-medium text-purple-400">Enterprise features in planning — open-source core available today</span>
          </div>
        </div>

        {/* Phase Legend */}
        <div className="animate-in fade-in-0 slide-in-from-bottom-3" style={{ animationDelay: "0.18s", animationFillMode: "both" }}>
          <div className="mt-6 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[11px] text-muted-foreground/50">Core Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-[11px] text-muted-foreground/50">Infrastructure</span>
            </div>
          </div>
        </div>

        {/* Category Legend */}
        <div className="animate-in fade-in-0 slide-in-from-bottom-3" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <span key={cat} className="px-3 py-1.5 rounded-lg border border-border/30 bg-foreground/[0.02] text-xs text-muted-foreground/60">
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="animate-in fade-in-0 slide-in-from-bottom-2">
                <div className="group p-6 rounded-2xl border border-border/40 bg-foreground/[0.015] hover:bg-foreground/[0.025] transition-all duration-300 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-foreground/[0.04] border border-border/40 flex items-center justify-center group-hover:border-purple-500/20 transition-colors">
                      <Icon className="w-5 h-5 text-muted-foreground/40 group-hover:text-purple-400 transition-colors" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${feature.phase === "core" ? "bg-emerald-500" : "bg-amber-500"}`} />
                      <span className="text-[10px] font-medium text-muted-foreground/50">
                        {feature.phase === "core" ? "Core Ready" : "Infrastructure"}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground/70 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enterprise CTA */}
        <div className="animate-in fade-in-0 slide-in-from-bottom-3" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
          <div className="mt-16 p-8 sm:p-12 rounded-2xl border border-border/40 bg-foreground/[0.01] text-center">
            <h2 className="text-2xl font-bold text-foreground mb-3">Enterprise-ready architecture, open-source core</h2>
            <p className="text-sm text-muted-foreground/70 max-w-lg mx-auto leading-relaxed">
              The open-source foundation is available today. Enterprise capabilities will be
              built on top of it — with private hosting, SLAs, and compliance certifications
              when organizations need them.
            </p>
            <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground/50">
              <Link href="/privacy" className="hover:text-foreground transition-colors underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-muted-foreground/60">
                Privacy Policy
              </Link>
              <span className="text-muted-foreground/30">·</span>
              <Link href="/terms" className="hover:text-foreground transition-colors underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-muted-foreground/60">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
