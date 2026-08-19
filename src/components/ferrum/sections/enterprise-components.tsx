// Type-strict compliance: fixed noUncheckedIndexedAccess
import {
  Table, Kanban, Calendar, FileText, BarChart3,
  Users, Settings, Shield, CreditCard,
  Bell, Search, Filter, Briefcase, Building2,
  Check,
} from "lucide-react";
import { SectionHeader } from "./section-helpers";

/* ═══════════════════════════════════════════════════════════════
   ENTERPRISE COMPONENT LIBRARY
   Roadmap for components real businesses need
   ═══════════════════════════════════════════════════════════════ */

interface EnterpriseComponent {
  name: string;
  description: string;
  icon: React.ElementType;
  category: string;
  features: string[];
  status: "available" | "beta" | "planned";
  wireframe?: "datagrid" | "kanban" | "chart" | "command-palette";
}

const components: EnterpriseComponent[] = [
  {
    name: "DataGrid Pro",
    description: "High-performance data table with virtualized scrolling, sortable columns, inline editing, row selection, and export. Handles 100K+ rows without jank.",
    icon: Table,
    category: "Data Display",
    features: ["Virtual scrolling", "Column sorting", "Inline editing", "Row selection", "CSV/JSON export"],
    status: "planned",
    wireframe: "datagrid",
  },
  {
    name: "Kanban Board",
    description: "Drag-and-drop Kanban with swim lanes, WIP limits, card priorities, and smooth physics-based animations. Feels like moving real cards on a real board.",
    icon: Kanban,
    category: "Productivity",
    features: ["Drag & drop", "Swim lanes", "WIP limits", "Priority indicators", "Physics animations"],
    status: "planned",
    wireframe: "kanban",
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
    wireframe: "chart",
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
    wireframe: "command-palette",
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

function Wireframe({ type }: { type: EnterpriseComponent["wireframe"] }) {
  if (!type) return null;
  switch (type) {
    case "command-palette":
      return (
        <div className="mt-3 rounded-lg border border-border/30 bg-foreground/[0.03] overflow-hidden">
          {/* Search bar */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-border/30 bg-foreground/[0.02]">
            <Search className="w-3 h-3 text-muted-foreground/30" />
            <div className="h-1.5 w-32 rounded bg-foreground/[0.06]" />
            <span className="ml-auto text-[8px] text-muted-foreground/25 border border-border/30 rounded px-1.5 py-0.5">⌘K</span>
          </div>
          {/* Command items */}
          <div className="p-1.5 space-y-0.5">
            {[
              { label: "Toggle theme", shortcut: "⌘T", active: true },
              { label: "Open settings", shortcut: "⌘,", active: false },
              { label: "New file", shortcut: "⌘N", active: false },
            ].map((cmd) => (
              <div
                key={cmd.label}
                className={`flex items-center justify-between px-2.5 py-1.5 rounded-md ${cmd.active ? "bg-purple-500/10 border border-purple-500/15" : ""}`}
              >
                <span className={`text-[10px] ${cmd.active ? "text-foreground/70" : "text-muted-foreground/60"}`}>{cmd.label}</span>
                <span className={`text-[8px] ${cmd.active ? "text-muted-foreground/60" : "text-muted-foreground/50"}`}>{cmd.shortcut}</span>
              </div>
            ))}
          </div>
        </div>
      );
    case "datagrid":
      return (
        <div className="mt-3 rounded-lg border border-border/30 bg-foreground/[0.02] overflow-hidden">
          {/* Header row */}
          <div className="grid grid-cols-3 gap-px bg-border/20">
            {['Name', 'Status', 'Date'].map((h) => (
              <div key={h} className="px-2 py-1.5 bg-foreground/[0.04] text-[8px] font-medium text-muted-foreground/50 uppercase tracking-wider">{h}</div>
            ))}
          </div>
          {/* Data rows */}
          {[0, 1, 2].map((r) => (
            <div key={r} className="grid grid-cols-3 gap-px bg-border/10">
              <div className="px-2 py-1.5 bg-foreground/[0.02]"><div className="h-1 w-12 rounded bg-foreground/[0.07]" /></div>
              <div className="px-2 py-1.5 bg-foreground/[0.02] flex items-center gap-1"><div className={`w-1.5 h-1.5 rounded-full ${r === 0 ? "bg-emerald-400/50" : r === 1 ? "bg-amber-400/50" : "bg-sky-400/50"}`} /><div className="h-1 w-8 rounded bg-foreground/[0.05]" /></div>
              <div className="px-2 py-1.5 bg-foreground/[0.02]"><div className="h-1 w-10 rounded bg-foreground/[0.05]" /></div>
            </div>
          ))}
        </div>
      );
    case "kanban":
      return (
        <div className="mt-3 flex gap-1.5">
          {["To Do", "In Progress", "Done"].map((col, ci) => (
            <div key={col} className="flex-1 rounded-md border border-border/30 bg-foreground/[0.02] overflow-hidden">
              <div className="px-2 py-1 bg-foreground/[0.03] border-b border-border/20 text-[7px] font-medium text-muted-foreground/60 uppercase tracking-wider">{col}</div>
              <div className="p-1.5 space-y-1">
                {[0, 1].map((card) => (
                  <div key={card} className={`h-6 rounded border border-border/20 bg-foreground/[0.03] border-l-2 ${ci === 0 ? 'border-l-sky-500/50' : ci === 1 ? 'border-l-amber-500/50' : 'border-l-emerald-500/50'}`} />
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    case "chart":
      return (
        <div className="mt-3 rounded-lg border border-border/30 bg-foreground/[0.02] p-3 flex items-end justify-center gap-2 h-16">
          {[
            { h: "40%", color: "from-purple-600/50 to-purple-400/30" },
            { h: "75%", color: "from-sky-600/50 to-sky-400/30" },
            { h: "55%", color: "from-emerald-600/50 to-emerald-400/30" },
          ].map((bar, i) => (
            <div
              key={i}
              className={`w-6 rounded-t-sm bg-gradient-to-t ${bar.color} animate-pulse`}
              style={{ height: bar.h, animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      );
    default:
      return null;
  }
}

export function EnterpriseComponentLibrary() {
  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <SectionHeader
          label="Enterprise Components"
          title="Enterprise Component Roadmap"
          subtitle="The components businesses actually need — data grids, kanban boards, billing interfaces, audit logs — planned for upcoming releases. Each will be built with Ferrum's motion, accessibility, and theming from the ground up."
          icon={Briefcase}
        />

        {/* Status badge */}
        <div className="animate-in fade-in-0 slide-in-from-bottom-3" style={{ animationDelay: "0.15s", animationFillMode: "both" }}>
          <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/15 bg-purple-500/[0.04]">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            <span className="text-xs font-medium text-purple-400">Roadmap — components planned for upcoming releases</span>
          </div>
        </div>

        {/* Category filters */}
        <div className="animate-in fade-in-0 slide-in-from-bottom-3" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
          <div className="mt-10 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <span key={cat} className="px-3 py-1.5 rounded-lg border border-border/30 bg-foreground/[0.02] text-xs text-muted-foreground/60 hover:text-foreground hover:border-border/60 transition-colors cursor-default">
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Component grid */}
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {components.map((comp) => {
            const Icon = comp.icon;
            return (
              <div key={comp.name} className="animate-in fade-in-0 slide-in-from-bottom-2">
                <div className="group p-5 rounded-2xl border border-border/40 bg-foreground/[0.015] hover:bg-foreground/[0.03] transition-all duration-300 h-full">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg bg-foreground/[0.04] border border-border/40 flex items-center justify-center group-hover:border-purple-500/20 transition-colors">
                      <Icon className="w-4 h-4 text-muted-foreground/50 group-hover:text-purple-400 transition-colors" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-muted-foreground/60 uppercase tracking-wider">{comp.category}</span>
                      <span className={`text-[9px] font-medium px-2 py-0.5 rounded-full border ${statusCls[comp.status]}`}>{
                        comp.status === "available" ? "Available" : comp.status === "beta" ? "Beta" : "Planned"
                      }</span>
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
                  {/* Wireframe preview */}
                  <Wireframe type={comp.wireframe} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="animate-in fade-in-0 slide-in-from-bottom-3" style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
          <div className="mt-16 p-8 sm:p-10 rounded-2xl border border-border/40 bg-foreground/[0.01] text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Building2 className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-bold text-foreground">Enterprise-ready, open-source core</h2>
            </div>
            <p className="text-sm text-muted-foreground/70 max-w-lg mx-auto leading-relaxed">
              Every enterprise component will share the same foundation as Ferrum's open-source
              core — spring physics, accessible defaults, theme-aware styling, and GPU-accelerated rendering.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
