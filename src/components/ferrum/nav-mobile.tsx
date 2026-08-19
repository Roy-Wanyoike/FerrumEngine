"use client";

import {
  ArrowRight, Github,
  ChevronDown, Blocks, Play, Trophy, BookOpen, Users,
  DollarSign, Ellipsis,
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { PulsingDot } from "@/components/ferrum/animated-components";
import { ThemeToggle } from "@/components/theme-toggle";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/body-scroll-lock";
import { resolveIcon } from "@/lib/icon-resolver";
import { platformMenu, docsMenu, moreMenu, GITHUB_REPO } from "./nav-data";
import type { ViewId, MegaMenuGroup } from "@/lib/types";

/* ═══════════════════════════════════════════════════════════════
   MOBILE NAV OVERLAY
   ═══════════════════════════════════════════════════════════════ */

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  currentView: ViewId;
  onNavigate: (view: ViewId) => void;
}

export function MobileNav({
  open,
  onClose,
  currentView,
  onNavigate,
}: MobileNavProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleNav = useCallback((view: ViewId) => {
    onNavigate(view);
    setActiveMenu(null);
  }, [onNavigate]);

  // Body scroll lock
  useEffect(() => {
    if (open) {
      lockBodyScroll();
      return () => unlockBodyScroll();
    }
  }, [open]);

  // Reset expanded submenus when mobile menu closes
  useEffect(() => {
    if (!open) setActiveMenu(null);
  }, [open]);

  // Escape key + focus trap
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && menuRef.current) {
        const focusable = menuRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0]!;
        const last = focusable[focusable.length - 1]!;
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  return open ? (
    <div id="mobile-menu" ref={menuRef} role="navigation" className="lg:hidden border-t border-border/50 bg-background/95 backdrop-blur-2xl max-h-[calc(100vh-4rem)] overflow-y-auto" aria-label="Mobile navigation">
      <div className="max-w-7xl mx-auto px-6 py-4 space-y-1">
            {/* Mobile: Platform-first items */}
            {mobileNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              const isMega = item.id === "platform" || item.id === "docs" || item.id === "more";
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (isMega) {
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
              <MobileMegaGroup groups={platformMenu} onNavigate={handleNav} />
            )}

            {activeMenu === "docs" && (
              <MobileMegaGroup groups={docsMenu} onNavigate={handleNav} />
            )}

            {activeMenu === "more" && (
              <MobileMegaGroup groups={moreMenu} onNavigate={handleNav} />
            )}

            {/* Mobile bottom actions */}
            <div className="pt-3 mt-2 border-t border-border/30 flex items-center gap-3 px-2">
              <ThemeToggle variant="dropdown" />
              <a href={GITHUB_REPO} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-muted-foreground/65 hover:text-foreground transition-colors">
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <button
                onClick={() => handleNav("effects")}
                className="ml-auto flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background text-xs font-semibold"
              >
                Browse Effects
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
    </div>
  ) : null;
}

/* ─── Mobile nav item definitions ─── */

const mobileNavItems = [
  { id: "platform" as const, label: "Platform", icon: Blocks },
  { id: "playground" as ViewId, label: "Playground", icon: Play },
  { id: "showcase" as ViewId, label: "Showcase", icon: Trophy },
  { id: "docs" as ViewId, label: "Docs", icon: BookOpen },
  { id: "community" as ViewId, label: "Community", icon: Users },
  { id: "more" as const, label: "More", icon: Ellipsis },
  { id: "enterprise" as ViewId, label: "Pricing", icon: DollarSign },
] as const;

/* ─── Reusable mobile mega-menu group renderer ─── */

function MobileMegaGroup({
  groups,
  onNavigate,
}: {
  groups: MegaMenuGroup[];
  onNavigate: (view: ViewId) => void;
}) {
  return (
    <>
      {groups.map((group) => (
        <div key={group.heading} className="pl-4 pb-2 space-y-3 border-l border-border/30 ml-4 mt-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/65 mb-1.5 px-2">{group.heading}</p>
          {group.items.map((item) => {
            const Icon = resolveIcon(item.icon);
            const hasAction = item.view || (item.href && item.href !== "#");
            return (
              <button
                key={item.label}
                disabled={!hasAction}
                onClick={() => {
                  if (item.view) {
                    onNavigate(item.view);
                  } else if (item.href && item.href !== "#") {
                    window.open(item.href, "_blank", "noopener,noreferrer");
                  }
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-muted-foreground/65 hover:text-foreground hover:bg-foreground/[0.03] transition-all disabled:opacity-50 disabled:cursor-default"
              >
                <Icon className="w-3.5 h-3.5" />
                {item.label}
                {item.badge && (
                  <span className="ml-auto text-[9px] font-medium px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400">{item.badge}</span>
                )}
                {!hasAction && !item.badge && (
                  <span className="ml-auto text-[9px] font-medium text-muted-foreground/60 italic">Coming soon</span>
                )}
              </button>
            );
          })}
        </div>
      ))}
    </>
  );
}
