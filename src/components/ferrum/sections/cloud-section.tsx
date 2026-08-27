"use client";

import { useState } from "react";
import {
  Cloud, Users, FolderKanban, Palette, GitBranch, BarChart3, Shield, Brain,
  Building2, Landmark, HeartPulse, Banknote, ArrowRight, Check, Lock,
  Fingerprint, KeyRound, FileCheck, Scale, ShieldCheck, MonitorDot, ChevronRight,
  Boxes, AlertTriangle
} from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ferrum/scroll-reveal";

/* ─── Data ─── */

const coreFeatures = [
  {
    icon: Users,
    title: "Teams",
    desc: "Multi-team workspaces with role-based hierarchies. Invite members, assign roles, and collaborate across design system boundaries with real-time presence indicators and team activity feeds.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: FolderKanban,
    title: "Projects",
    desc: "Organize design systems into projects with environments (dev, staging, production). Each project gets its own version history, CI/CD pipeline, and deployment configuration.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    icon: Palette,
    title: "Design Tokens",
    desc: "Centralized token management with multi-namespace support. Define colors, spacing, typography, shadows, and motion tokens. Auto-sync to Figma, CSS variables, Tailwind config, and platform-native formats.",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
  },
  {
    icon: Boxes,
    title: "Components",
    desc: "Version-controlled component registry with visual documentation, accessibility scores, and cross-framework export. Every component ships with automated tests, storybook stories, and usage guidelines.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    icon: GitBranch,
    title: "Versioning",
    desc: "Semantic versioning with visual diffs. See exactly what changed between versions — token values, component APIs, breaking changes — all with rich diff previews and migration guides.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    desc: "Track design system adoption, component usage, bundle size impact, and performance metrics across all consuming projects. Identify unused tokens, deprecated components, and optimization opportunities.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    icon: Shield,
    title: "Permissions",
    desc: "Granular RBAC with custom roles. Control who can create, review, approve, and publish tokens and components. Support for required reviews, branch protection, and deployment gates.",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  {
    icon: Brain,
    title: "AI Governance",
    desc: "Guardrails for AI-generated UI code. Validate AI outputs against your design system's tokens, components, and accessibility standards. Auto-flag deviations and suggest corrections.",
    color: "text-fuchsia-400",
    bg: "bg-fuchsia-500/10",
  },
];

const enterpriseVerticals = [
  {
    icon: HeartPulse,
    title: "Healthcare",
    desc: "HIPAA-compliant design tokens with built-in WCAG AAA contrast validation, section 508 accessibility audits, and FDA design control documentation for medical device UIs.",
    challenges: ["HIPAA data handling", "WCAG AAA compliance", "Audit trail requirements"],
    color: "text-red-400",
  },
  {
    icon: Banknote,
    title: "Finance",
    desc: "SOX and PCI-DSS aligned design systems. Immutable audit logs for every token and component change. Role segregation of duties with multi-signature approvals for production releases.",
    challenges: ["SOX compliance", "Immutable audit logs", "Multi-sig approvals"],
    color: "text-emerald-400",
  },
  {
    icon: Landmark,
    title: "Government",
    desc: "FedRAMP-authorized with FISMA controls. Support for USWDS and GOV.UK Design System integration. Section 508 conformance reports generated automatically per release.",
    challenges: ["FedRAMP authorization", "USWDS integration", "Section 508 reports"],
    color: "text-blue-400",
  },
  {
    icon: Building2,
    title: "Large Organizations",
    desc: "Multi-tenant architecture supporting hundreds of teams. SSO/SAML integration, SCIM provisioning, custom SLAs, dedicated support, and on-premise deployment options.",
    challenges: ["Multi-tenant isolation", "SSO/SAML/SCIM", "On-premise option"],
    color: "text-violet-400",
  },
];

const architectureLayers = [
  {
    name: "Client Layer",
    items: [
      { name: "Web Dashboard", desc: "React-based management console" },
      { name: "VS Code Extension", desc: "Inline token & component browser" },
      { name: "Figma Plugin", desc: "Bidirectional token sync" },
      { name: "CLI", desc: "ferrum-cli for CI/CD pipelines" },
    ],
  },
  {
    name: "API Gateway",
    items: [
      { name: "REST + GraphQL", desc: "Dual API surface for flexibility" },
      { name: "WebSocket", desc: "Real-time collaboration events" },
      { name: "Webhook System", desc: "Custom automation triggers" },
      { name: "Rate Limiting", desc: "Per-org, per-tier limits" },
    ],
  },
  {
    name: "Core Services",
    items: [
      { name: "Token Engine", desc: "Multi-format token resolution" },
      { name: "Component Registry", desc: "Versioned component storage" },
      { name: "Permission Engine", desc: "RBAC + ABAC hybrid model" },
      { name: "Analytics Pipeline", desc: "Event processing & aggregation" },
    ],
  },
  {
    name: "Infrastructure",
    items: [
      { name: "Kubernetes", desc: "Auto-scaling workloads" },
      { name: "PostgreSQL", desc: "Primary data store" },
      { name: "Redis", desc: "Caching & real-time pub/sub" },
      { name: "S3-compatible", desc: "Asset & build artifact storage" },
    ],
  },
];

const securityFeatures = [
  { icon: Lock, title: "End-to-End Encryption", desc: "AES-256 at rest, TLS 1.3 in transit. All design tokens and component source encrypted with customer-managed keys." },
  { icon: Fingerprint, title: "Biometric Auth", desc: "WebAuthn/FIDO2 support for passwordless authentication. Hardware security key support for admin actions." },
  { icon: KeyRound, title: "Customer-Managed Keys", desc: "Bring your own encryption keys (BYOK). Rotate keys without downtime. HSM-backed key storage for Enterprise tier." },
  { icon: FileCheck, title: "SOC 2 Type II", desc: "Independently audited. Annual penetration testing. Bug bounty program. Compliance reports available in Trust Center." },
  { icon: Scale, title: "GDPR Compliance", desc: "Data residency options (US, EU, APAC). Right to erasure support. Data processing agreements for all customers." },
  { icon: ShieldCheck, title: "SAML SSO", desc: "SAML 2.0 and OIDC single sign-on. SCIM 2.0 automatic user provisioning. Support for all major IdP providers." },
];

const roadmapPhases = [
  {
    phase: "Phase 1 — Foundation",
    status: "In Progress",
    statusColor: "text-emerald-400 bg-emerald-500/10",
    items: ["Team workspaces & RBAC", "Design token management", "Component registry", "Version control & diffing", "Basic analytics dashboard"],
  },
  {
    phase: "Phase 2 — Intelligence",
    status: "Planned Q3",
    statusColor: "text-blue-400 bg-blue-500/10",
    items: ["AI governance engine", "Figma bidirectional sync", "VS Code extension", "Custom workflows & automations", "Advanced usage analytics"],
  },
  {
    phase: "Phase 3 — Enterprise",
    status: "Planned Q4",
    statusColor: "text-violet-400 bg-violet-500/10",
    items: ["SSO/SAML/SCIM", "Audit log & compliance", "Multi-region deployment", "Custom SLAs", "On-premise option"],
  },
  {
    phase: "Phase 4 — Ecosystem",
    status: "2026",
    statusColor: "text-amber-400 bg-amber-500/10",
    items: ["Public marketplace", "API marketplace", "Partner integrations", "White-label option", "Developer community"],
  },
];

const businessModel = [
  {
    tier: "Team",
    price: "$29",
    period: "/user/month",
    desc: "For growing teams building design systems.",
    features: ["Up to 25 team members", "5 projects", "10K token version history", "Component registry", "Basic analytics", "Email support"],
    cta: "Start Free Trial",
    highlight: false,
  },
  {
    tier: "Business",
    price: "$79",
    period: "/user/month",
    desc: "For organizations scaling their design infrastructure.",
    features: ["Unlimited team members", "Unlimited projects", "Unlimited version history", "Figma plugin + VS Code extension", "AI governance engine", "Advanced analytics & reports", "SSO/SAML", "Priority support"],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    tier: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For organizations with compliance and scale requirements.",
    features: ["Everything in Business", "On-premise deployment", "Custom SLAs (99.99% uptime)", "Dedicated support engineer", "SOC 2 + HIPAA + FedRAMP", "Custom integrations", "Audit log exports", "Training & onboarding"],
    cta: "Contact Sales",
    highlight: false,
  },
];

/* ─── Sub-components ─── */

function FeatureCard({ icon: Icon, title, desc, color, bg }: { icon: React.ElementType; title: string; desc: string; color: string; bg: string }) {
  return (
    <div className="group relative p-6 rounded-2xl border border-border bg-foreground/[0.02] hover:bg-foreground/[0.04] transition-all duration-300 hover:border-border ferrum-scroll-fade">
      <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <h3 className="text-[15px] font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}

function VerticalCard({ icon: Icon, title, desc, challenges, color }: { icon: React.ElementType; title: string; desc: string; challenges: string[]; color: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="relative p-6 rounded-2xl border border-border bg-foreground/[0.02] hover:bg-foreground/[0.04] transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-xl bg-foreground/[0.05] flex items-center justify-center shrink-0`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] font-semibold text-foreground mb-1.5">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {expanded ? "Show less" : "Key challenges"}
            <ChevronRight className={`w-3 h-3 transition-transform duration-200 ${expanded ? "rotate-90" : ""}`} />
          </button>
          {expanded && (
            <ul className="mt-3 space-y-1.5">
              {challenges.map((c) => (
                <li key={c} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <AlertTriangle className="w-3 h-3 text-amber-400/70 shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Section ─── */

export function CloudSection() {
  return (
    <section id="cloud" className="relative overflow-hidden border-t border-border ferrum-section-divider">
      <div className="ferrum-cloud-grid-bg absolute inset-0 pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">

        {/* ─── HERO ─── */}
        <div className="pt-28 sm:pt-36 pb-16 sm:pb-20 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs font-medium mb-6 ferrum-enterprise-badge">
              <Cloud className="w-3.5 h-3.5" />
              Enterprise Platform
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
              Ferrum Cloud
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mt-4">
              The GitHub + Figma + Vercel of UI systems. Manage your entire design system
              infrastructure — tokens, components, versions, governance — from one platform.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-foreground/[0.03] text-sm text-muted-foreground">
                <Users className="w-4 h-4 text-blue-400/70" />
                Team Collaboration
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-foreground/[0.03] text-sm text-muted-foreground">
                <GitBranch className="w-4 h-4 text-emerald-400/70" />
                Version Control
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-foreground/[0.03] text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-orange-400/70" />
                Enterprise Security
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-foreground/[0.03] text-sm text-muted-foreground">
                <Brain className="w-4 h-4 text-fuchsia-400/70" />
                AI Governance
              </div>
            </div>
          </Reveal>
        </div>

        {/* ─── CORE FEATURES ─── */}
        <div className="pb-24 sm:pb-32">
          <Reveal>
            <p className="ferrum-section-label text-xs font-semibold uppercase tracking-[0.15em] text-purple-400/70 mb-3">Core Features</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-4">
              Everything your design system needs
            </h3>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base text-muted-foreground max-w-2xl leading-relaxed mb-10">
              From token creation to production deployment, Ferrum Cloud provides the complete
              toolchain for managing intelligent design systems at scale.
            </p>
          </Reveal>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {coreFeatures.map((f) => (
              <StaggerItem key={f.title}>
                <FeatureCard {...f} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* ─── ARCHITECTURE ─── */}
        <div className="pb-24 sm:pb-32">
          <Reveal>
            <p className="ferrum-section-label text-xs font-semibold uppercase tracking-[0.15em] text-purple-400/70 mb-3">Architecture</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-4">
              Built for scale, designed for reliability
            </h3>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base text-muted-foreground max-w-2xl leading-relaxed mb-10">
              A four-layer architecture that separates concerns, enables independent scaling,
              and ensures 99.99% uptime for enterprise customers.
            </p>
          </Reveal>
          <div className="space-y-3">
            {architectureLayers.map((layer, li) => (
              <Reveal key={layer.name} delay={li * 0.08}>
                <div className="p-5 rounded-2xl border border-border bg-foreground/[0.02]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                      li === 0 ? "bg-blue-500/10 text-blue-400" :
                      li === 1 ? "bg-violet-500/10 text-violet-400" :
                      li === 2 ? "bg-emerald-500/10 text-emerald-400" :
                      "bg-amber-500/10 text-amber-400"
                    }`}>
                      {li + 1}
                    </div>
                    <h4 className="text-sm font-semibold text-foreground">{layer.name}</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {layer.items.map((item) => (
                      <div key={item.name} className="p-3 rounded-xl bg-foreground/[0.02] border border-border/50">
                        <div className="text-xs font-medium text-foreground">{item.name}</div>
                        <div className="text-[11px] text-muted-foreground/60 mt-0.5">{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ─── ENTERPRISE VERTICALS ─── */}
        <div className="pb-24 sm:pb-32">
          <Reveal>
            <p className="ferrum-section-label text-xs font-semibold uppercase tracking-[0.15em] text-purple-400/70 mb-3">Enterprise</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-4">
              Designed for regulated industries
            </h3>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base text-muted-foreground max-w-2xl leading-relaxed mb-10">
              Purpose-built compliance controls and audit capabilities for healthcare, finance,
              government, and large-scale enterprise deployments.
            </p>
          </Reveal>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {enterpriseVerticals.map((v) => (
              <StaggerItem key={v.title}>
                <VerticalCard {...v} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* ─── SECURITY MODEL ─── */}
        <div className="pb-24 sm:pb-32">
          <Reveal>
            <p className="ferrum-section-label text-xs font-semibold uppercase tracking-[0.15em] text-purple-400/70 mb-3">Security</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-4">
              Security-first architecture
            </h3>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base text-muted-foreground max-w-2xl leading-relaxed mb-10">
              Your design system is intellectual property. Ferrum Cloud protects it with the
              same security standards used by financial institutions and healthcare systems.
            </p>
          </Reveal>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {securityFeatures.map((s) => (
              <StaggerItem key={s.title}>
                <div className="p-5 rounded-2xl border border-border bg-foreground/[0.02] hover:bg-foreground/[0.04] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-foreground/[0.05] flex items-center justify-center">
                      <s.icon className="w-4 h-4 text-emerald-400" />
                    </div>
                    <h4 className="text-sm font-semibold text-foreground">{s.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* ─── BUSINESS MODEL ─── */}
        <div className="pb-24 sm:pb-32">
          <Reveal>
            <p className="ferrum-section-label text-xs font-semibold uppercase tracking-[0.15em] text-purple-400/70 mb-3">Pricing</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-4">
              Simple, transparent pricing
            </h3>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base text-muted-foreground max-w-2xl leading-relaxed mb-10">
              Start free, scale as you grow. Enterprise plans include dedicated support,
              custom SLAs, and compliance features.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {businessModel.map((tier) => (
              <Reveal key={tier.tier} delay={tier.highlight ? 0.12 : 0.08}>
                <div className={`relative p-6 rounded-2xl border transition-all duration-300 h-full flex flex-col ${
                  tier.highlight
                    ? "border-purple-500/30 bg-foreground/[0.04] shadow-lg shadow-purple-500/[0.05]"
                    : "border-border bg-foreground/[0.02] hover:bg-foreground/[0.04]"
                }`}>
                  {tier.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-purple-500 text-foreground text-[10px] font-bold uppercase tracking-wider">
                      Most Popular
                    </div>
                  )}
                  <div className="mb-4">
                    <h4 className="text-base font-bold text-foreground">{tier.tier}</h4>
                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="text-3xl font-bold text-foreground">{tier.price}</span>
                      <span className="text-sm text-muted-foreground">{tier.period}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{tier.desc}</p>
                  </div>
                  <ul className="space-y-2 flex-1 mb-6">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-2.5 rounded-xl text-sm font-medium transition-all ${
                    tier.highlight
                      ? "bg-purple-600 hover:bg-purple-500 text-foreground"
                      : "bg-foreground/[0.06] hover:bg-foreground/[0.10] text-foreground border border-border"
                  }`}>
                    {tier.cta}
                    <ArrowRight className="w-3.5 h-3.5 inline ml-1.5" />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ─── ROADMAP ─── */}
        <div className="pb-24 sm:pb-32">
          <Reveal>
            <p className="ferrum-section-label text-xs font-semibold uppercase tracking-[0.15em] text-purple-400/70 mb-3">Roadmap</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-4">
              Building the future of design system management
            </h3>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base text-muted-foreground max-w-2xl leading-relaxed mb-10">
              A phased approach to delivering enterprise-grade design system infrastructure,
              starting with core collaboration and scaling to full ecosystem maturity.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {roadmapPhases.map((phase, i) => (
              <Reveal key={phase.phase} delay={i * 0.08}>
                <div className="p-5 rounded-2xl border border-border bg-foreground/[0.02] h-full">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">{phase.phase}</h4>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${phase.statusColor}`}>
                      {phase.status}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <div className="w-1 h-1 rounded-full bg-foreground/20 mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ─── BOTTOM CTA ─── */}
        <div className="pb-28 sm:pb-36">
          <Reveal>
            <div className="relative p-8 sm:p-12 rounded-3xl border border-border bg-foreground/[0.02] overflow-hidden text-center">
              <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500/[0.04] rounded-full blur-[80px]" />
                <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-blue-500/[0.04] rounded-full blur-[60px]" />
              </div>
              <div className="relative">
                <Cloud className="w-10 h-10 text-blue-400/70 mx-auto mb-4" />
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-3">
                  Ready to manage your design system at scale?
                </h3>
                <p className="text-base text-muted-foreground max-w-lg mx-auto leading-relaxed mb-6">
                  Join the waitlist for Ferrum Cloud. Early adopters get 6 months free on the
                  Business tier with priority onboarding.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium text-background bg-foreground hover:bg-foreground/90 transition-all shadow-sm hover:shadow-md">
                    Join Waitlist
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium text-foreground border border-border hover:bg-foreground/[0.05] transition-all">
                    <MonitorDot className="w-4 h-4" />
                    Request Demo
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}