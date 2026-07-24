"use client";

import { Reveal, StaggerContainer, StaggerItem } from "@/components/ferrum/scroll-reveal";
import { AnimatedCard } from "@/components/ferrum/animated-components";
import {
  Layout, Table, Kanban, Calendar, FileText, BarChart3,
  Users, Settings, Shield, CreditCard, MessageSquare,
  Bell, Search, Filter, ArrowRight, Briefcase, Building2,
  Check,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   ENTERPRISE COMPONENT LIBRARY
   Components real businesses need, not just common UI primitives
   ═══════════════════════════════════════════════════════════════ */

interface EnterpriseComponent {
  name: string;
  description: string;
  icon: React.ElementType;
  category: string;
  features: string[];
  status: "available" | "beta" | "planned";
}

const components: EnterpriseComponent[] = [
  {
    name: "DataGrid Pro",
    description: "High-performance data table with virtualized scrolling, sortable columns, inline editing, row selection, and export. Handles 100K+ rows without jank.",
    icon: Table,
    category: "Data Display",
    features: ["Virtual scrolling", "Column sorting", "Inline editing", "Row selection", "CSV/JSON export"],
    status: "planned",
  },
  {
    name: "Kanban Board",
    description: "Drag-and-drop Kanban with swim lanes, WIP limits, card priorities, and smooth physics-based animations. Feels like moving real cards on a real board.",
    icon: Kanban,
    category: "Productivity",
    features: ["Drag & drop", "Swim lanes", "WIP limits", "Priority indicators", "Physics animations"],
    status: "planned",
  },
  {
    name: "DatePicker Pro",
    description: "Accessible date picker with range selection, time zones, keyboard navigation, and locale support. Built on native date input with progressive enhancement.",
    icon: Calendar,
    category: "Form Controls",
    features: ["Range selection", "Time zones", "Keyboard navigation", "Locale aware", "Accessible"],
    status: "planned",
  },
  {
    name: "RichText Editor",
    description: "WYSIWYG editor with Markdown support, slash commands, collaborative cursors, and Ferrum-powered smooth transitions between editing modes.",
    icon: FileText,
    category: "Content",
    features: ["Markdown", "Slash commands", "Collaborative cursors", "Mode transitions", "Plugin system"],
    status: "planned",
  },
  {
    name: "Chart Components",
    description: "Line, bar, pie, area, and scatter charts that animate on mount, support real-time data updates, and are accessible with screen reader descriptions.",
    icon: BarChart3,
    category: "Data Display",
    features: ["6 chart types", "Animated entry", "Real-time updates", "A11y descriptions", "Responsive"],
    status: "planned",
  },
  {
    name: "OrgChart",
    description: "Hierarchical organization chart with expand/collapse, search, and zoom. Smooth transitions when reorganizing hierarchy. Export to PNG/SVG.",
    icon: Users,
    category: "Data Display",
    features: ["Expand/collapse", "Search", "Zoom controls", "Hierarchy transitions", "Export"],
    status: "planned",
  },
  {
    name: "Settings Panel",
    description: "Structured settings UI with sections, search, save/cancel, and dirty state detection. Used for user preferences, app configuration, and admin panels.",
    icon: Settings,
    category: "App Shell",
    features: ["Sectioned layout", "Search", "Dirty detection", "Save/cancel", "Keyboard shortcuts"],
    status: "planned",
  },
  {
    name: "Audit Log",
    description: "Timestamped activity log with filtering, search, and user attribution. Essential for enterprise compliance and security monitoring.",
    icon: Shield,
    category: "Enterprise",
    features: ["Timestamp filter", "User attribution", "Activity types", "Export", "Compliance ready"],
    status: "planned",
  },
  {
    name: "Billing & Invoicing",
    description: "Subscription management, invoice generation, payment history, and usage metrics. Built for SaaS billing with Stripe integration patterns.",
    icon: CreditCard,
    category: "Enterprise",
    features: ["Subscription UI", "Invoice display", "Payment history", "Usage metrics", "Proration"],
    status: "planned",
  },
  {
    name: "Notification Center",
    description: "Unified notification system with toast, badge, and panel modes. Smart grouping, read/unread states, and action buttons on notifications.",
    icon: Bell,
    category: "App Shell",
    features: ["Toast/panel modes", "Smart grouping", "Read/unread", "Action buttons", "Priority levels"],
    status: "planned",
  },
  {
    name: "Command Palette",
    description: "Spotlight-style command palette with fuzzy search, recent commands, keyboard navigation, and extensible action registry.",
    icon: Search,
    category: "App Shell",
    features: ["Fuzzy search", "Recent commands", "Keyboard nav", "Action registry", "Extensible"],
    status: "beta",
  },
  {
    name: "Advanced Filters",
    description: "Composable filter builder with AND/OR logic, multiple data types (text, number, date, enum), saved filter presets, and URL state sync.",
    icon: Filter,
    category: "Data Display",
    features: ["AND/OR logic", "Multiple types", "Saved presets", "URL state sync", "Clear all"],
    status: "planned",
  },
];

const categories = ["Data Display", "Productivity", "Form Controls", "Content", "App Shell", "Enterprise"];

const statusCls: Record<string, string> = {
  available: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  beta: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  planned: "bg-foreground/[0.06] text-muted-foreground/60 border-border",
};

export function EnterpriseComponentLibrary() {
  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-purple-400" />
            </div>
            <p className="ferrum-section-label text-xs font-semibold uppercase tracking-[0.15em] text-purple-400/70">Enterprise Components</p>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight max-w-3xl">
            Components for Real Businesses
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg text-muted-foreground/80 max-w-2xl leading-relaxed mt-5">
            Not just buttons and inputs. The components that businesses actually need
            — data grids, kanban boards, billing interfaces, audit logs — built with
            Ferrum's motion, accessibility, and theming from the ground up.
          </p>
        </Reveal>

        {/* Status badge */}
        <Reveal delay={0.15}>
          <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/15 bg-amber-500/[0.04]">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-xs font-medium text-amber-400/70">Architecture designed — components under active development</span>
          </div>
        </Reveal>

        {/* Category filters */}
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <span key={cat} className="px-3 py-1.5 rounded-lg border border-border/30 bg-foreground/[0.02] text-xs text-muted-foreground/60 hover:text-foreground hover:border-border/60 transition-colors cursor-default">
                {cat}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Component grid */}
        <StaggerContainer className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4" delay={0.1}>
          {components.map((comp) => {
            const Icon = comp.icon;
            return (
              <StaggerItem key={comp.name}>
                <div className="group p-5 rounded-2xl border border-border/40 bg-foreground/[0.015] hover:bg-foreground/[0.03] transition-all duration-300 h-full">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg bg-foreground/[0.04] border border-border/40 flex items-center justify-center group-hover:border-purple-500/20 transition-colors">
                      <Icon className="w-4 h-4 text-muted-foreground/50 group-hover:text-purple-400 transition-colors" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-muted-foreground/40 uppercase tracking-wider">{comp.category}</span>
                      <span className={`text-[9px] font-medium px-2 py-0.5 rounded-full border ${statusCls[comp.status]}`}>
                        {comp.status === "available" ? "Available" : comp.status === "beta" ? "Beta" : "Planned"}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-1.5">{comp.name}</h3>
                  <p className="text-xs text-muted-foreground/60 leading-relaxed mb-4">{comp.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {comp.features.map((f) => (
                      <span key={f} className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-foreground/[0.03] text-[10px] text-muted-foreground/50">
                        <Check className="w-2.5 h-2.5 text-purple-400/40" />
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Bottom CTA */}
        <Reveal delay={0.1}>
          <div className="mt-16 p-8 sm:p-10 rounded-2xl border border-border/40 bg-foreground/[0.01] text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Building2 className="w-6 h-6 text-purple-400" />
              <h3 className="text-xl font-bold text-foreground">Enterprise-ready, open-source core</h3>
            </div>
            <p className="text-sm text-muted-foreground/70 max-w-lg mx-auto leading-relaxed">
              Every enterprise component shares the same foundation as Ferrum's open-source
              core — spring physics, accessible defaults, theme-aware styling, and GPU-accelerated rendering.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}