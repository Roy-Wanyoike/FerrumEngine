"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { GitBranch, Play, ArrowRight, Menu, X, Cloud, ChevronDown, Sparkles, LayoutDashboard } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { categories, categoryCounts } from "@/lib/ferrum-effects-index";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Motion", href: "#motion", hasDropdown: true },
  { label: "Cloud", href: "#cloud" },
  { label: "Platform", href: "#platform" },
  { label: "Studio AI", href: "#studio" },
  { label: "Marketplace", href: "#marketplace" },
];

/* Icon lookup for category dropdown */
const catIconMap: Record<string, React.ElementType> = {
  LogIn: require("lucide-react").LogIn,
  LogOut: require("lucide-react").LogOut,
  Eye: require("lucide-react").Eye,
  MousePointer: require("lucide-react").MousePointer,
  Type: require("lucide-react").Type,
  ImageIcon: require("lucide-react").ImageIcon,
  Loader2: require("lucide-react").Loader2,
  Box: require("lucide-react").Box,
  Move3D: require("lucide-react").Move3D,
  Crown: require("lucide-react").Crown,
  Zap: require("lucide-react").Zap,
  Layers: require("lucide-react").Layers,
  Sparkles: require("lucide-react").Sparkles,
  Menu: require("lucide-react").Menu,
};

interface NavbarProps {
  onGetStarted: () => void;
  onOpenPlayground: () => void;
  activeCategory?: string;
  onCategorySelect?: (catId: string) => void;
}

export function Navbar({ onGetStarted, onOpenPlayground, activeCategory, onCategorySelect }: NavbarProps) {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sectionActive, setSectionActive] = useState("");
  const [catDropdownOpen, setCatDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  /* Track scroll for navbar background */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Track active section via IntersectionObserver */
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry?.isIntersecting) setSectionActive(id); },
        { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* Close category dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCatDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* Lock body scroll when mobile menu open */
  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* Close mobile on Escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { if (mobileOpen) setMobileOpen(false); if (catDropdownOpen) setCatDropdownOpen(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen, catDropdownOpen]);

  const scrollTo = useCallback((href: string) => {
    if (!href.startsWith("#")) return;
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleNavClick = useCallback((href: string) => {
    scrollTo(href);
    setMobileOpen(false);
    setCatDropdownOpen(false);
  }, [scrollTo]);

  const handleCategoryClick = useCallback((catId: string) => {
    handleNavClick("#motion");
    onCategorySelect?.(catId);
    setCatDropdownOpen(false);
  }, [handleNavClick, onCategorySelect]);

  /* Group categories into rows of 6 for the dropdown grid */
  const topCats = categories.filter(c => (categoryCounts[c.id] || 0) > 0).sort((a, b) => (categoryCounts[b.id] || 0) - (categoryCounts[a.id] || 0));

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
          scrolled ? "bg-background/80 backdrop-blur-2xl shadow-[0_1px_0_0_oklch(1_0_0/6%)] dark:shadow-[0_1px_0_0_oklch(1_0_0/8%)]" : "bg-transparent"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="flex items-center gap-2.5 group">
              <img src="/logo.svg" alt="" aria-hidden="true" className="w-7 h-7 transition-transform duration-300 group-hover:scale-105" />
              <span className="text-[15px] font-bold text-foreground tracking-tight">Ferrum<span className="text-muted-foreground/70 font-medium">Engine</span></span>
            </a>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-0.5">
              {NAV_LINKS.map((link) => {
                const id = link.href.replace("#", "");
                const isActive = sectionActive === id;
                const isCloud = id === "cloud";
                const isMotion = id === "motion";
                return (
                  <div key={link.href} className="relative" ref={isMotion ? dropdownRef : undefined}>
                    <button
                      onClick={() => isMotion ? setCatDropdownOpen(!catDropdownOpen) : handleNavClick(link.href)}
                      onMouseEnter={() => { if (isMotion) setCatDropdownOpen(true); }}
                      onMouseLeave={() => { if (isMotion) setCatDropdownOpen(false); }}
                      className={`relative px-3 py-1.5 text-[13px] font-medium rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
                        isActive || (isMotion && catDropdownOpen) ? "text-foreground" : "text-muted-foreground hover:text-foreground/80"
                      }`}
                    >
                      {isCloud && <Cloud className="w-3 h-3 text-blue-400/70" />}
                      {link.label}
                      {isMotion && (
                        <>
                          <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${catDropdownOpen ? "rotate-180" : ""}`} />
                          {activeCategory && activeCategory !== "all" && (
                            <span className="ml-0.5 w-1.5 h-1.5 rounded-full bg-purple-400" />
                          )}
                        </>
                      )}
                      {isActive && !isMotion && (
                        <span className="absolute inset-x-1 -bottom-[5px] h-0.5 rounded-full bg-primary/60" />
                      )}
                    </button>

                    {/* Category Dropdown */}
                    {isMotion && catDropdownOpen && (
                      <div
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[520px] p-4 rounded-2xl border border-border bg-card/98 backdrop-blur-2xl shadow-xl z-50"
                        onMouseEnter={() => setCatDropdownOpen(true)}
                        onMouseLeave={() => setCatDropdownOpen(false)}
                      >
                        <div className="flex items-center justify-between mb-3 px-1">
                          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Effect Categories</span>
                          {activeCategory && activeCategory !== "all" && (
                            <button onClick={() => { handleCategoryClick("all"); }} className="text-[11px] text-purple-400 hover:text-purple-300 transition-colors">Clear filter</button>
                          )}
                        </div>
                        <button
                          onClick={() => handleCategoryClick("all")}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-medium transition-all mb-1 ${
                            !activeCategory || activeCategory === "all" ? "text-foreground bg-foreground/[0.06]" : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.03]"
                          }`}
                        >
                          <Sparkles className="w-3.5 h-3.5 text-purple-400/70" />
                          All Effects
                          <span className="ml-auto text-[11px] text-muted-foreground/50">489</span>
                        </button>
                        <div className="grid grid-cols-2 gap-0.5 max-h-[320px] overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
                          {topCats.map((cat) => {
                            const Icon = catIconMap[cat.icon] || Sparkles;
                            const isActive = activeCategory === cat.id;
                            const count = categoryCounts[cat.id] || 0;
                            return (
                              <button
                                key={cat.id}
                                onClick={() => handleCategoryClick(cat.id)}
                                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-[12px] font-medium transition-all text-left ${
                                  isActive ? "text-foreground bg-foreground/[0.06]" : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.03]"
                                }`}
                              >
                                <Icon className="w-3 h-3 shrink-0 opacity-60" />
                                <span className="truncate flex-1">{cat.name}</span>
                                <span className="text-[10px] text-muted-foreground/60 tabular-nums">{count}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-2">
              <ThemeToggle />
              <a href="https://github.com/roy-wanyoike/FerrumEngine" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] text-muted-foreground hover:text-foreground/80 hover:bg-foreground/[0.05] transition-all duration-200">
                <GitBranch className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <button onClick={() => router.push("/cloud")} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] text-muted-foreground hover:text-foreground/80 hover:bg-foreground/[0.05] border border-border/60 transition-all duration-200">
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </button>
              <button onClick={onOpenPlayground} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] text-muted-foreground hover:text-foreground/80 hover:bg-foreground/[0.05] border border-border/60 transition-all duration-200">
                <Play className="w-3.5 h-3.5" />
                <span>Playground</span>
              </button>
              <button onClick={onGetStarted} className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[13px] font-medium text-background bg-foreground hover:bg-foreground/90 transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98]">
                Get Started <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Hamburger */}
            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle />
              <button onClick={() => setMobileOpen(!mobileOpen)} className="relative p-2 -mr-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/[0.05] transition-all duration-200" aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen}>
                <span className="relative w-5 h-5 flex items-center justify-center">
                  <Menu className="w-5 h-5 absolute transition-all duration-200" style={{ opacity: mobileOpen ? 0 : 1, transform: mobileOpen ? "scale(0.5) rotate(90deg)" : "scale(1) rotate(0)" }} />
                  <X className="w-5 h-5 absolute transition-all duration-200" style={{ opacity: mobileOpen ? 1 : 0, transform: mobileOpen ? "scale(1) rotate(0)" : "scale(0.5) rotate(-90deg)" }} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && <div className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} aria-hidden="true" />}

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
      <div ref={mobileMenuRef} className="fixed top-16 right-0 left-0 z-40 lg:hidden animate-[ferrum-fade-up_0.2s_ease-out_both]">
        <div className="mx-4 mt-2 rounded-2xl border border-border bg-card/95 backdrop-blur-2xl shadow-xl overflow-hidden max-h-[calc(100vh-100px)] flex flex-col">
          <div className="py-3 px-2 overflow-y-auto flex-1" style={{ scrollbarWidth: "thin" }}>
            {NAV_LINKS.map((link, i) => {
              const id = link.href.replace("#", "");
              const isActive = sectionActive === id;
              const isCloud = id === "cloud";
              const isMotion = id === "motion";
              return (
                <div key={link.href}>
                  <button
                    onClick={() => isMotion ? handleCategoryClick("all") : handleNavClick(link.href)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium transition-all duration-200 ${
                      isActive ? "text-foreground bg-foreground/[0.06]" : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.03]"
                    }`}
                    style={{ animationDelay: `${i * 30}ms` }}
                  >
                    {isCloud && <Cloud className="w-4 h-4 text-blue-400/70" />}
                    <span>{link.label}</span>
                    {isMotion && activeCategory && activeCategory !== "all" && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400" />}
                    {isActive && !isMotion && <span className="w-1.5 h-1.5 rounded-full bg-primary/60 ml-auto" />}
                  </button>
                  {/* Inline category list for Motion on mobile */}
                  {isMotion && (
                    <div className="px-3 pb-2 grid grid-cols-2 gap-1">
                      <button onClick={() => handleCategoryClick("all")} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] font-medium transition-all ${!activeCategory || activeCategory === "all" ? "text-foreground bg-foreground/[0.06]" : "text-muted-foreground"}`}>
                        <Sparkles className="w-3 h-3" />All
                      </button>
                      {topCats.slice(0, 10).map((cat) => {
                        const Icon = catIconMap[cat.icon] || Sparkles;
                        return (
                          <button key={cat.id} onClick={() => handleCategoryClick(cat.id)} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] font-medium transition-all truncate ${activeCategory === cat.id ? "text-foreground bg-foreground/[0.06]" : "text-muted-foreground"}`}>
                            <Icon className="w-3 h-3 shrink-0 opacity-60" />{cat.name}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="border-t border-border/50 px-4 py-3 flex items-center gap-2 shrink-0">
            <a href="https://github.com/roy-wanyoike/FerrumEngine" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[13px] text-muted-foreground hover:text-foreground border border-border/60 hover:bg-foreground/[0.03] transition-all">
              <GitBranch className="w-4 h-4" />GitHub
            </a>
            <button onClick={() => { router.push("/cloud"); setMobileOpen(false); }} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[13px] text-muted-foreground hover:text-foreground border border-border/60 hover:bg-foreground/[0.03] transition-all">
              <LayoutDashboard className="w-4 h-4" />Dashboard
            </button>
            <button onClick={() => { onOpenPlayground(); setMobileOpen(false); }} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[13px] text-muted-foreground hover:text-foreground border border-border/60 hover:bg-foreground/[0.03] transition-all">
              <Play className="w-4 h-4" />Playground
            </button>
          </div>
          <div className="px-4 pb-4 shrink-0">
            <button onClick={() => { onGetStarted(); setMobileOpen(false); }} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-medium text-background bg-foreground hover:bg-foreground/90 transition-all shadow-sm active:scale-[0.98]">
              Get Started <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
      )}
    </>
  );
}