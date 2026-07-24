"use client";

import { Reveal, StaggerContainer, StaggerItem } from "@/components/ferrum/scroll-reveal";
import {
  Shield, Database, GitBranch, BarChart3, FileCheck,
  Bot, Lock, ClipboardList, Eye,
} from "lucide-react";

interface EnterpriseFeature {
  icon: React.ElementType;
  title: string;
  description: string;
  category: string;
}

const features: EnterpriseFeature[] = [
  {
    icon: ClipboardList,
    title: "Design Governance",
    description: "Enforce design system adoption across teams. Track which components and tokens are used where. Receive automated compliance reports when projects drift from the approved system. Governance isn't about control — it's about consistency at scale.",
    category: "Governance",
  },
  {
    icon: Database,
    title: "Component Registry",
    description: "A centralized registry for every component, effect, and token in your organization. Teams publish to the registry; consumers discover and import. Version control, deprecation notices, and breaking change tracking built in.",
    category: "Registry",
  },
  {
    icon: GitBranch,
    title: "Version Control",
    description: "Semantic versioning for design tokens, components, and effects. Changelogs generated automatically. Diff visualization shows exactly what changed between versions — not in code, but in the actual visual output.",
    category: "Infrastructure",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Understand how your design system is actually used. Which effects are most popular? Which tokens are overridden most often? Where do teams create one-off solutions instead of using the system? Data-driven design decisions.",
    category: "Intelligence",
  },
  {
    icon: Shield,
    title: "Policy Enforcement",
    description: "Define rules that your design system must follow: maximum bundle size, required accessibility levels, approved color palettes. CI/CD integration ensures no PR ships that violates policy. Automated, not manual.",
    category: "Governance",
  },
  {
    icon: Eye,
    title: "Accessibility Reports",
    description: "Continuous WCAG compliance monitoring. Every component ships with an accessibility score. Track your organization's a11y posture over time. Generate VPAT documents for enterprise sales cycles.",
    category: "Compliance",
  },
  {
    icon: FileCheck,
    title: "Compliance",
    description: "SOC 2 Type II, GDPR, and HIPAA compliance for design system tooling. Enterprise procurement requires vendor assessments — Ferrum Enterprise provides the documentation and infrastructure to pass them.",
    category: "Compliance",
  },
  {
    icon: Bot,
    title: "AI Governance",
    description: "When AI generates UI, who is responsible for the output? Ferrum Enterprise provides audit trails for AI-generated code, approval workflows, and quality gates that ensure AI-assisted development meets the same standards as hand-written code.",
    category: "Intelligence",
  },
  {
    icon: Lock,
    title: "Private Registry",
    description: "Hosted component and token registries behind your organization's firewall. No public npm packages. No open-source license concerns. Your design system, your IP, your infrastructure.",
    category: "Infrastructure",
  },
];

const categories = ["Governance", "Registry", "Infrastructure", "Intelligence", "Compliance"];

export function Enterprise() {
  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <Reveal>
          <p className="ferrum-section-label text-xs font-semibold uppercase tracking-[0.15em] text-purple-400/70 mb-4">Enterprise</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight max-w-3xl">
            Built for Scale
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg text-muted-foreground/60 max-w-2xl leading-relaxed mt-5">
            Eventually, Fortune 500 companies won't ask about animations. They'll ask about governance.
            Ferrum Enterprise is designed for organizations that need control, compliance, and
            intelligence at scale — without sacrificing the developer experience.
          </p>
        </Reveal>

        {/* Status badge */}
        <Reveal delay={0.15}>
          <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/15 bg-amber-500/[0.04]">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-xs font-medium text-amber-400/70">Designed but not yet built — architecture is ready</span>
          </div>
        </Reveal>

        {/* Category Legend */}
        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <span key={cat} className="px-3 py-1.5 rounded-lg border border-border/30 bg-foreground/[0.02] text-xs text-muted-foreground/60">
                {cat}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Features Grid */}
        <StaggerContainer className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4" delay={0.15}>
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <StaggerItem key={feature.title}>
                <div className="group p-6 rounded-2xl border border-border/40 bg-foreground/[0.015] hover:bg-foreground/[0.025] transition-all duration-300 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-foreground/[0.04] border border-border/40 flex items-center justify-center group-hover:border-purple-500/20 transition-colors">
                      <Icon className="w-5 h-5 text-muted-foreground/40 group-hover:text-purple-400 transition-colors" />
                    </div>
                    <span className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-wider">{feature.category}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground/70 leading-relaxed">{feature.description}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Enterprise CTA */}
        <Reveal delay={0.2}>
          <div className="mt-16 p-8 sm:p-12 rounded-2xl border border-border/40 bg-foreground/[0.01] text-center">
            <h3 className="text-2xl font-bold text-foreground mb-3">Enterprise-ready architecture, open-source core</h3>
            <p className="text-sm text-muted-foreground/70 max-w-lg mx-auto leading-relaxed">
              The architecture for every enterprise feature is designed and documented. When the time
              comes, these capabilities will be built on the same open foundation — with private
              hosting, SLAs, and compliance certifications.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}