"use client";

import { Menu, X, ArrowRight, Github } from "lucide-react";
import { useState, useEffect, useRef, useCallback, memo } from "react";
import { Magnetic } from "@/components/ferrum/animated-components";
import { ColorCustomizer } from "@/components/ferrum/color-customizer";
import { ThemeToggle } from "@/components/theme-toggle";
import { platformMenu, docsMenu, moreMenu, GITHUB_REPO } from "./nav-data";
import { DesktopMegaTrigger } from "./nav-mega-menu";
import { MobileNav } from "./nav-mobile";
import type { ViewId, NavProps } from "@/lib/types";

/* ═══════════════════════════════════════════════════════════════
   MAIN NAVIGATION
   ═══════════════════════════════════════════════════════════════ */

export function Nav({ currentView, onNavigate }: NavProps) {
  const [solid, setSolid] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Scroll-aware solid background
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => { setSolid(window.scrollY > 40); ticking = false; });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mega menu on click outside
  useEffect(() => {
    if (!activeMenu) return;
    const handleClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("[data-nav-menu]")) setActiveMenu(null);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [activeMenu]);

  // Escape key for desktop mega menu
  useEffect(() => {
    if (!activeMenu) return;
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") setActiveMenu(null); };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeMenu]);

  const handleNav = useCallback((view: ViewId) => { onNavigate(view); setMobileOpen(false); setActiveMenu(null); }, [onNavigate]);
  const handleMenuEnter = useCallback((menu: string) => { if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current); setActiveMenu(menu); }, []);
  const handleMenuLeave = useCallback(() => { menuTimeoutRef.current = setTimeout(() => setActiveMenu(null), 400); }, []);
  const handleMenuToggle = useCallback((menu: string) => { setActiveMenu((prev) => (prev === menu ? null : menu)); }, []);

  // Refocus hamburger when mobile menu closes
  useEffect(() => { if (!mobileOpen) hamburgerRef.current?.focus(); }, [mobileOpen]);

  // Cleanup pending mega menu timeout on unmount
  useEffect(() => { return () => { if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current); }; }, []);

  return (
    <nav role="navigation" aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solid || activeMenu
          ? "bg-background/80 backdrop-blur-2xl border-b border-border/50 shadow-sm shadow-background/20"
          : "bg-transparent"
      }`}>
      <a href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-foreground focus:text-background focus:text-sm focus:font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-background">
        Skip to content
      </a>
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => handleNav("home")} className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg" aria-label="FerrumEngine home">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/30 transition-shadow">
              <span className="text-white font-bold text-xs">Fe</span>
            </div>
            <span className="text-sm font-semibold text-foreground tracking-tight">
              Ferrum<span className="text-muted-foreground/65 font-normal">Engine</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5" data-nav-menu>
            <DesktopMegaTrigger label="Platform" menuId="platform" groups={platformMenu} activeMenu={activeMenu} onNavigate={onNavigate} onMenuEnter={handleMenuEnter} onMenuLeave={handleMenuLeave} onToggle={handleMenuToggle} />
            <NavButton view="playground" label="Playground" currentView={currentView} onClick={handleNav} />
            <NavButton view="showcase" label="Showcase" currentView={currentView} onClick={handleNav} />
            <DesktopMegaTrigger label="Docs" menuId="docs" groups={docsMenu} activeMenu={activeMenu} onNavigate={onNavigate} onMenuEnter={handleMenuEnter} onMenuLeave={handleMenuLeave} onToggle={handleMenuToggle} />
            <NavButton view="community" label="Community" currentView={currentView} onClick={handleNav} />
            <DesktopMegaTrigger label="More" menuId="more" groups={moreMenu} activeMenu={activeMenu} onNavigate={onNavigate} onMenuEnter={handleMenuEnter} onMenuLeave={handleMenuLeave} onToggle={handleMenuToggle} />
            <NavButton view="enterprise" label="Pricing" currentView={currentView} onClick={handleNav} />
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">

            <a href={GITHUB_REPO} target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center text-muted-foreground/50 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg p-2.5 min-w-[44px] min-h-[44px]" aria-label="FerrumEngine on GitHub">
              <Github className="w-4.5 h-4.5" />
            </a>
            <ColorCustomizer />
            <ThemeToggle variant="dropdown" />
            <Magnetic strength={0.1}>
              <button onClick={() => handleNav("effects")}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background text-xs font-semibold hover:bg-foreground/90 transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                Browse Effects
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Magnetic>
            <button ref={hamburgerRef} onClick={() => setMobileOpen(!mobileOpen)} aria-expanded={mobileOpen} aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="lg:hidden p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/[0.04] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} currentView={currentView} onNavigate={handleNav} />
    </nav>
  );
}

const NavButton = memo(function NavButton({ view, label, currentView, onClick }: { view: ViewId; label: string; currentView: ViewId; onClick: (view: ViewId) => void }) {
  const isActive = currentView === view;
  return (
    <button onClick={() => onClick(view)}
      aria-current={isActive ? "page" : undefined}
      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
        isActive ? "text-foreground bg-foreground/[0.06]" : "text-muted-foreground/60 hover:text-foreground hover:bg-foreground/[0.03]"
      }`}>
      {label}
    </button>
  );
});
