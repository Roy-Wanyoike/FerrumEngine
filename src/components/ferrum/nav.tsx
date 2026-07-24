"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "next-themes";
import {
  Menu, X, ArrowRight, Github, Search,
  ChevronDown, Layers, Play, Trophy, BookOpen, Users,
  DollarSign, Blocks, Cpu, Code, Sparkles, Palette,
  Terminal, Cloud, Store, Globe, Briefcase,
  Layout, BarChart3, Smartphone, Building2,
  GraduationCap, Gamepad2, Landmark, ShoppingBag,
  Heart, Sun, Moon, Monitor, Check, type LucideIcon,
  Zap, Eye, Bot,
} from "lucide-react";
import { Magnetic, PulsingDot } from "@/components/ferrum/animated-components";
import { ColorCustomizer } from "@/components/ferrum/color-customizer";

/* ═══════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════ */

export type ViewId =
  | "home"
  | "principles"
  | "architecture"
  | "platform-architecture"
  | "hall-of-fame"
  | "showcase"
  | "learning"
  | "story"
  | "enterprise"
  | "enterprise-components"
  | "vision"
  | "effects"
  | "docs"
  | "playground";

interface NavProps {
  currentView: ViewId;
  onNavigate: (view: ViewId) => void;
}

/* ═══════════════════════════════════════════════════════════════
   MEGA MENU DATA
   ═══════════════════════════════════════════════════════════════ */

interface MegaMenuItem {
  icon: LucideIcon;
  label: string;
  description?: string;
  view?: ViewId;
  href?: string;
  badge?: string;
}

interface MegaMenuGroup {
  heading: string;
  items: MegaMenuItem[];
}

const GITHUB_REPO = "https://github.com/roy-wanyoike/FerrumEngine";

const platformMenu: MegaMenuGroup[] = [
  {
    heading: "Core Engines",
    items: [
      { icon: Cpu, label: "Ferrum Runtime", description: "Zero-dependency execution layer" },
      { icon: Zap, label: "Ferrum Motion", description: "Spring physics & gestures" },
      { icon: Sparkles, label: "Ferrum Physics", description: "Realistic forces & collisions" },
      { icon: Eye, label: "Ferrum VFX", description: "Visual effects & particles" },
    ],
  },
  {
    heading: "Build System",
    items: [
      { icon: Blocks, label: "Ferrum Components", description: "Production-ready UI primitives", view: "effects" },
      { icon: Palette, label: "Ferrum Tokens", description: "Unified design token system" },
      { icon: Terminal, label: "Ferrum Compiler", description: "9-pass optimization pipeline" },
      { icon: Layers, label: "Framework Adapters", description: "React, Vue, Svelte & 8 more" },
    ],
  },
  {
    heading: "Intelligence",
    items: [
      { icon: Bot, label: "Ferrum AI", description: "Intent-to-render intelligence", badge: "Soon" },
      { icon: Monitor, label: "Ferrum Studio", description: "Visual interface builder", badge: "Soon" },
      { icon: Cloud, label: "Ferrum Cloud", description: "Deploy & host Ferrum apps", badge: "Soon" },
      { icon: Store, label: "Marketplace", description: "Community extensions", badge: "Soon" },
    ],
  },
];

const solutionsMenu: MegaMenuGroup[] = [
  {
    heading: "By Industry",
    items: [
      { icon: Heart, label: "Healthcare" },
      { icon: DollarSign, label: "Finance" },
      { icon: GraduationCap, label: "Education" },
      { icon: Sparkles, label: "AI" },
      { icon: Gamepad2, label: "Gaming" },
      { icon: Landmark, label: "Government" },
      { icon: ShoppingBag, label: "Retail" },
    ],
  },
  {
    heading: "By Product",
    items: [
      { icon: Layout, label: "Landing Pages" },
      { icon: BarChart3, label: "Dashboards" },
      { icon: Blocks, label: "Admin Panels" },
      { icon: Layers, label: "Design Systems" },
      { icon: Globe, label: "Marketing Sites" },
      { icon: Briefcase, label: "SaaS" },
      { icon: Smartphone, label: "Mobile Apps" },
      { icon: Building2, label: "Enterprise Apps" },
    ],
  },
];

const docsMenu: MegaMenuGroup[] = [
  {
    heading: "Learn",
    items: [
      { icon: BookOpen, label: "Getting Started", description: "Quick setup guide", view: "docs" },
      { icon: GraduationCap, label: "Learning Center", description: "Interface engineering principles", view: "learning" },
      { icon: Play, label: "Tutorials", description: "Step-by-step guides" },
      { icon: Users, label: "Guides", description: "Best practices & patterns" },
    ],
  },
  {
    heading: "Reference",
    items: [
      { icon: Code, label: "API Reference", description: "Complete API docs" },
      { icon: Terminal, label: "Architecture", description: "System design deep-dive", view: "architecture" },
      { icon: Layers, label: "Platform Architecture", description: "Ecosystem diagrams & subsystems", view: "platform-architecture" },
      { icon: Sparkles, label: "Best Practices", description: "Performance & accessibility" },
      { icon: Layers, label: "Migration", description: "Upgrade & migrate guides" },
      { icon: Play, label: "Examples", description: "Ready-to-use code samples" },
    ],
  },
];

const communityMenu: MegaMenuGroup[] = [
  {
    heading: "Community",
    items: [
      { icon: Users, label: "Discord", href: "#" },
      { icon: Github, label: "GitHub", href: GITHUB_REPO },
      { icon: Layers, label: "Roadmap", description: "Public product roadmap" },
      { icon: Code, label: "Contribute", description: "Open source guidelines" },
      { icon: BookOpen, label: "Blog", href: "#" },
      { icon: Trophy, label: "Events", href: "#" },
      { icon: Store, label: "Marketplace", description: "Community extensions", badge: "Soon" },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════
   MEGA MENU PANEL
   ═══════════════════════════════════════════════════════════════ */

function MegaMenuPanel({
  groups,
  menuId,
  onNavigate,
  onClose,
  onPanelEnter,
  onPanelLeave,
}: {
  groups: MegaMenuGroup[];
  menuId: string;
  onNavigate: (view: ViewId) => void;
  onClose: () => void;
  onPanelEnter: (menu: string) => void;
  onPanelLeave: () => void;
}) {
  return (
    <div
      className="absolute top-full left-0 right-0 pt-2"
      data-nav-menu
      onMouseEnter={() => onPanelEnter(menuId)}
      onMouseLeave={onPanelLeave}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-background/95 backdrop-blur-2xl border border-border rounded-2xl shadow-2xl shadow-background/30 overflow-hidden">
          <div className="grid gap-0 divide-y divide-border/50">
            {groups.map((group) => (
              <div key={group.heading} className="px-6 py-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/50 mb-3">
                  {group.heading}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isExternalHref = item.href && item.href !== "#" && !item.view;
                    const isNavigableView = !!item.view;
                    const hasAnyAction = isExternalHref || isNavigableView;

                    const innerContent = (
                      <div className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-foreground/[0.04] transition-colors group/item">
                        <div className="w-8 h-8 rounded-lg bg-foreground/[0.04] border border-border/50 flex items-center justify-center shrink-0 group-hover/item:border-foreground/10 transition-colors">
                          <Icon className="w-4 h-4 text-muted-foreground/50 group-hover/item:text-foreground/70 transition-colors" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-foreground/80 group-hover/item:text-foreground transition-colors">
                              {item.label}
                            </span>
                            {item.badge && (
                              <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400/70">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          {item.description && (
                            <p className="text-[11px] text-muted-foreground/55 mt-0.5 leading-relaxed">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    );

                    // External href link — use <a> tag so click-outside doesn't conflict
                    if (isExternalHref) {
                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full text-left"
                          onClick={onClose}
                        >
                          {innerContent}
                        </a>
                      );
                    }

                    // View navigation — use <button>
                    if (isNavigableView) {
                      return (
                        <button
                          key={item.label}
                          onClick={() => {
                            onNavigate(item.view!);
                            onClose();
                          }}
                          className="w-full text-left"
                        >
                          {innerContent}
                        </button>
                      );
                    }

                    // No action — static placeholder
                    return (
                      <div key={item.label} className="cursor-default opacity-60">
                        {innerContent}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   THEME TOGGLE — Light / Dark / System dropdown
   Pattern: shadcn/ui + Magic UI style
   ═══════════════════════════════════════════════════════════════ */

const themeOptions = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [open]);

  const currentIcon = theme === "light" ? Sun : theme === "dark" ? Moon : Monitor;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); setOpen(true); }}
        onMouseLeave={() => { timeoutRef.current = setTimeout(() => setOpen(false), 200); }}
        className="flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground/50 hover:text-foreground hover:bg-foreground/[0.04] transition-colors"
        title="Toggle theme"
      >
        {currentIcon === Sun && <Sun className="w-4 h-4" />}
        {currentIcon === Moon && <Moon className="w-4 h-4" />}
        {currentIcon === Monitor && <Monitor className="w-4 h-4" />}
        <span className="sr-only">Toggle theme</span>
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-36 rounded-xl border border-border bg-background/95 backdrop-blur-2xl shadow-xl shadow-background/30 overflow-hidden z-[60] py-1"
          onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
          onMouseLeave={() => { timeoutRef.current = setTimeout(() => setOpen(false), 200); }}
        >
          {themeOptions.map((opt) => {
            const Icon = opt.icon;
            const isActive = theme === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => { setTheme(opt.value); setOpen(false); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium transition-colors ${
                  isActive
                    ? "text-foreground bg-foreground/[0.06]"
                    : "text-muted-foreground/60 hover:text-foreground hover:bg-foreground/[0.03]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {opt.label}
                {isActive && <Check className="w-3.5 h-3.5 ml-auto text-purple-400" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN NAVIGATION
   ═══════════════════════════════════════════════════════════════ */

export function Nav({ currentView, onNavigate }: NavProps) {
  const [solid, setSolid] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mega menu on click outside
  useEffect(() => {
    if (!activeMenu) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-nav-menu]")) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [activeMenu]);

  const handleNav = (view: ViewId) => {
    onNavigate(view);
    setMobileOpen(false);
    setActiveMenu(null);
  };

  const handleMenuEnter = useCallback((menu: string) => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    setActiveMenu(menu);
  }, []);

  const handleMenuLeave = useCallback(() => {
    menuTimeoutRef.current = setTimeout(() => setActiveMenu(null), 400);
  }, []);

  // Close mega menu when Escape is pressed
  useEffect(() => {
    if (!activeMenu) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveMenu(null);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeMenu]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        solid || activeMenu
          ? "bg-background/80 backdrop-blur-2xl border-b border-border/50 shadow-sm shadow-background/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => handleNav("home")} className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/30 transition-shadow">
              <span className="text-white font-bold text-xs">Fe</span>
            </div>
            <span className="text-sm font-semibold text-foreground tracking-tight">
              Ferrum<span className="text-muted-foreground/50 font-normal">Engine</span>
            </span>
          </button>

          {/* Desktop Nav — Platform-first */}
          <div className="hidden lg:flex items-center gap-0.5" data-nav-menu>
            {/* Platform */}
            <div
              className="relative"
              onMouseEnter={() => handleMenuEnter("platform")}
              onMouseLeave={handleMenuLeave}
            >
              {/* Invisible bridge to prevent gap between button and panel */}
              {activeMenu === "platform" && (
                <div className="absolute top-full left-0 right-0 h-2" aria-hidden="true" />
              )}
              <button
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                  activeMenu === "platform"
                    ? "text-foreground bg-foreground/[0.06]"
                    : "text-muted-foreground/60 hover:text-foreground hover:bg-foreground/[0.03]"
                }`}
                onClick={() => setActiveMenu(activeMenu === "platform" ? null : "platform")}
              >
                Platform
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeMenu === "platform" ? "rotate-180" : ""}`} />
              </button>
              {activeMenu === "platform" && (
                <MegaMenuPanel
                  menuId="platform"
                  groups={platformMenu}
                  onNavigate={onNavigate}
                  onClose={() => setActiveMenu(null)}
                  onPanelEnter={handleMenuEnter}
                  onPanelLeave={handleMenuLeave}
                />
              )}
            </div>

            {/* Solutions */}
            <div
              className="relative"
              onMouseEnter={() => handleMenuEnter("solutions")}
              onMouseLeave={handleMenuLeave}
            >
              {activeMenu === "solutions" && (
                <div className="absolute top-full left-0 right-0 h-2" aria-hidden="true" />
              )}
              <button
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                  activeMenu === "solutions"
                    ? "text-foreground bg-foreground/[0.06]"
                    : "text-muted-foreground/60 hover:text-foreground hover:bg-foreground/[0.03]"
                }`}
                onClick={() => setActiveMenu(activeMenu === "solutions" ? null : "solutions")}
              >
                Solutions
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeMenu === "solutions" ? "rotate-180" : ""}`} />
              </button>
              {activeMenu === "solutions" && (
                <MegaMenuPanel
                  menuId="solutions"
                  groups={solutionsMenu}
                  onNavigate={onNavigate}
                  onClose={() => setActiveMenu(null)}
                  onPanelEnter={handleMenuEnter}
                  onPanelLeave={handleMenuLeave}
                />
              )}
            </div>

            {/* Playground — first-class */}
            <button
              onClick={() => handleNav("playground")}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                currentView === "playground"
                  ? "text-foreground bg-foreground/[0.06]"
                  : "text-muted-foreground/60 hover:text-foreground hover:bg-foreground/[0.03]"
              }`}
            >
              Playground
            </button>

            {/* Showcase */}
            <button
              onClick={() => handleNav("showcase")}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                currentView === "showcase"
                  ? "text-foreground bg-foreground/[0.06]"
                  : "text-muted-foreground/60 hover:text-foreground hover:bg-foreground/[0.03]"
              }`}
            >
              Showcase
            </button>

            {/* Docs */}
            <div
              className="relative"
              onMouseEnter={() => handleMenuEnter("docs")}
              onMouseLeave={handleMenuLeave}
            >
              {activeMenu === "docs" && (
                <div className="absolute top-full left-0 right-0 h-2" aria-hidden="true" />
              )}
              <button
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                  activeMenu === "docs"
                    ? "text-foreground bg-foreground/[0.06]"
                    : "text-muted-foreground/60 hover:text-foreground hover:bg-foreground/[0.03]"
                }`}
                onClick={() => setActiveMenu(activeMenu === "docs" ? null : "docs")}
              >
                Docs
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeMenu === "docs" ? "rotate-180" : ""}`} />
              </button>
              {activeMenu === "docs" && (
                <MegaMenuPanel
                  menuId="docs"
                  groups={docsMenu}
                  onNavigate={onNavigate}
                  onClose={() => setActiveMenu(null)}
                  onPanelEnter={handleMenuEnter}
                  onPanelLeave={handleMenuLeave}
                />
              )}
            </div>

            {/* Community */}
            <div
              className="relative"
              onMouseEnter={() => handleMenuEnter("community")}
              onMouseLeave={handleMenuLeave}
            >
              {activeMenu === "community" && (
                <div className="absolute top-full left-0 right-0 h-2" aria-hidden="true" />
              )}
              <button
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                  activeMenu === "community"
                    ? "text-foreground bg-foreground/[0.06]"
                    : "text-muted-foreground/60 hover:text-foreground hover:bg-foreground/[0.03]"
                }`}
                onClick={() => setActiveMenu(activeMenu === "community" ? null : "community")}
              >
                Community
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeMenu === "community" ? "rotate-180" : ""}`} />
              </button>
              {activeMenu === "community" && (
                <MegaMenuPanel
                  menuId="community"
                  groups={communityMenu}
                  onNavigate={onNavigate}
                  onClose={() => setActiveMenu(null)}
                  onPanelEnter={handleMenuEnter}
                  onPanelLeave={handleMenuLeave}
                />
              )}
            </div>

            {/* Pricing */}
            <button
              onClick={() => handleNav("enterprise")}
              className="px-3 py-2 rounded-lg text-xs font-medium text-muted-foreground/60 hover:text-foreground hover:bg-foreground/[0.03] transition-all duration-200"
            >
              Pricing
            </button>
          </div>

          {/* Right side — minimal like Stripe/Vercel */}
          <div className="flex items-center gap-3">
            {/* Search indicator */}
            <button
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-foreground/[0.04] border border-border text-muted-foreground/40 text-xs hover:border-border transition-colors"
              title="Search (coming soon)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Search</span>
              <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-foreground/[0.06] text-[10px] font-mono text-muted-foreground/50 border border-border/50">
                <span className="text-[9px]">⌘</span>K
              </kbd>
            </button>

            <a
              href={GITHUB_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center text-muted-foreground/50 hover:text-foreground transition-colors"
            >
              <Github className="w-4.5 h-4.5" />
            </a>

            {/* Color customizer */}
            <ColorCustomizer />

            {/* Theme toggle — Light / Dark / System */}
            <ThemeToggle />

            <Magnetic strength={0.1}>
              <button
                onClick={() => handleNav("effects")}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background text-xs font-semibold hover:bg-foreground/90 transition-all active:scale-[0.98]"
              >
                Get Started
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Magnetic>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/[0.04] transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border/50 bg-background/95 backdrop-blur-2xl max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-4 space-y-1">
            {/* Mobile: Platform-first items */}
            {[
              { id: "platform" as const, label: "Platform", icon: Blocks },
              { id: "solutions" as const, label: "Solutions", icon: Globe },
              { id: "playground" as ViewId, label: "Playground", icon: Play },
              { id: "showcase" as ViewId, label: "Showcase", icon: Trophy },
              { id: "docs" as ViewId, label: "Docs", icon: BookOpen },
              { id: "community" as const, label: "Community", icon: Users },
              { id: "enterprise" as ViewId, label: "Pricing", icon: DollarSign },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              const isMega = ["platform", "solutions", "community"].includes(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (isMega) {
                      // For mega menu items on mobile, toggle expansion
                      setActiveMenu(activeMenu === item.id ? null : item.id);
                    } else if (item.id === "playground") {
                      handleNav("playground");
                    } else {
                      handleNav(item.id as ViewId);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "text-foreground bg-foreground/[0.06]"
                      : "text-muted-foreground/60 hover:text-foreground hover:bg-foreground/[0.03]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                  {isMega && (
                    <ChevronDown className={`w-3.5 h-3.5 ml-auto transition-transform ${activeMenu === item.id ? "rotate-180" : ""}`} />
                  )}
                  {item.id === "docs" && (
                    <PulsingDot color="bg-purple-500 dark:bg-purple-400" className="ml-auto" />
                  )}
                </button>
              );
            })}

            {/* Mobile expanded mega menus */}
            {activeMenu === "platform" && (
              <div className="pl-4 pb-2 space-y-3 border-l border-border/30 ml-4 mt-1">
                {platformMenu.map((group) => (
                  <div key={group.heading}>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/50 mb-1.5 px-2">{group.heading}</p>
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const hasAction = item.view || (item.href && item.href !== "#");
                      return (
                        <button
                          key={item.label}
                          onClick={() => {
                            if (item.view) {
                              handleNav(item.view);
                            } else if (item.href && item.href !== "#") {
                              window.open(item.href, "_blank", "noopener,noreferrer");
                              setMobileOpen(false);
                            }
                            // else: no action, just show the "Coming soon" indicator
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-muted-foreground/50 hover:text-foreground hover:bg-foreground/[0.03] transition-all"
                        >
                          <Icon className="w-3.5 h-3.5" />
                          {item.label}
                          {item.badge && (
                            <span className="ml-auto text-[9px] font-medium px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400/70">{item.badge}</span>
                          )}
                          {!hasAction && !item.badge && (
                            <span className="ml-auto text-[9px] font-medium text-muted-foreground/40 italic">Coming soon</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}

            {activeMenu === "solutions" && (
              <div className="pl-4 pb-2 space-y-3 border-l border-border/30 ml-4 mt-1">
                {solutionsMenu.map((group) => (
                  <div key={group.heading}>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/50 mb-1.5 px-2">{group.heading}</p>
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.label} className="flex items-center gap-2.5 px-3 py-2 text-xs text-muted-foreground/40">
                          <Icon className="w-3.5 h-3.5" />
                          {item.label}
                          <span className="ml-auto text-[9px] font-medium text-muted-foreground/40 italic">Coming soon</span>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}

            {activeMenu === "community" && (
              <div className="pl-4 pb-2 space-y-3 border-l border-border/30 ml-4 mt-1">
                {communityMenu.map((group) => (
                  <div key={group.heading}>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/50 mb-1.5 px-2">{group.heading}</p>
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const hasAction = item.view || (item.href && item.href !== "#");
                      return (
                        <button
                          key={item.label}
                          onClick={() => {
                            if (item.view) {
                              handleNav(item.view);
                            } else if (item.href && item.href !== "#") {
                              window.open(item.href, "_blank", "noopener,noreferrer");
                              setMobileOpen(false);
                            }
                            // else: no action, just show the "Coming soon" indicator
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-muted-foreground/50 hover:text-foreground hover:bg-foreground/[0.03] transition-all"
                        >
                          <Icon className="w-3.5 h-3.5" />
                          {item.label}
                          {item.badge && (
                            <span className="ml-auto text-[9px] font-medium px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400/70">{item.badge}</span>
                          )}
                          {!hasAction && !item.badge && (
                            <span className="ml-auto text-[9px] font-medium text-muted-foreground/40 italic">Coming soon</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}

            {/* Mobile bottom actions */}
            <div className="pt-3 mt-2 border-t border-border/30 flex items-center gap-3 px-2">
              <ThemeToggle />
              <a href={GITHUB_REPO} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-muted-foreground/50 hover:text-foreground transition-colors">
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <button
                onClick={() => handleNav("effects")}
                className="ml-auto flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background text-xs font-semibold"
              >
                Get Started
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}