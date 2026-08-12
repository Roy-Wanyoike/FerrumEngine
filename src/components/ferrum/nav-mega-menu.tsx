"use client";

import { ChevronDown } from "lucide-react";
import { resolveIcon } from "@/lib/icon-resolver";
import type { ViewId, MegaMenuGroup } from "@/lib/types";
import { useRef, useEffect, useCallback } from "react";
import { useFocusTrap } from "@/hooks/use-focus-trap";

export interface MegaMenuPanelProps {
  groups: MegaMenuGroup[];
  menuId: string;
  onNavigate: (view: ViewId) => void;
  onClose: () => void;
  onPanelEnter: (menu: string) => void;
  onPanelLeave: () => void;
  panelRef?: React.RefObject<HTMLDivElement | null>;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

export function MegaMenuPanel({
  groups,
  menuId,
  onNavigate,
  onClose,
  onPanelEnter,
  onPanelLeave,
  panelRef,
  onKeyDown,
}: MegaMenuPanelProps) {
  return (
    <div
      ref={panelRef}
      id={`mega-menu-panel-${menuId}`}
      className="absolute top-full left-0 right-0 pt-2"
      data-nav-menu
      onMouseEnter={() => onPanelEnter(menuId)}
      onMouseLeave={onPanelLeave}
      onKeyDown={onKeyDown}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-background/95 backdrop-blur-2xl border border-border rounded-2xl shadow-2xl shadow-background/30 overflow-hidden">
          <div className="grid gap-0 divide-y divide-border/50" role="menu" aria-label={`${menuId} menu`}>
            {groups.map((group) => (
              <div key={group.heading} className="px-6 py-5" role="presentation">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/50 mb-3">
                  {group.heading}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1">
                  {group.items.map((item) => {
                    const Icon = resolveIcon(item.icon);
                    const isExternalHref = item.href && item.href !== "#" && !item.view;
                    const isNavigableView = !!item.view;

                    const innerContent = (
                      <div className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-foreground/[0.04] focus-visible:bg-foreground/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-inset transition-colors group/item">
                        <div className="w-8 h-8 rounded-lg bg-foreground/[0.04] border border-border/50 flex items-center justify-center shrink-0 group-hover/item:border-foreground/10 transition-colors">
                          <Icon className="w-4 h-4 text-muted-foreground/50 group-hover/item:text-foreground/70 transition-colors" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-foreground/80 group-hover/item:text-foreground transition-colors">
                              {item.label}
                            </span>
                            {item.badge && (
                              <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400">
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
                          className="block w-full text-left focus-visible:outline-none rounded-xl"
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
                          className="w-full text-left focus-visible:outline-none rounded-xl"
                        >
                          {innerContent}
                        </button>
                      );
                    }

                    // No action — static placeholder
                    return (
                      <div key={item.label} className="cursor-default opacity-60" aria-disabled="true">
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
   DESKTOP MEGA MENU TRIGGER
   ═══════════════════════════════════════════════════════════════ */

export interface DesktopMegaTriggerProps {
  label: string;
  menuId: string;
  groups: MegaMenuGroup[];
  activeMenu: string | null;
  onNavigate: (view: ViewId) => void;
  onMenuEnter: (menu: string) => void;
  onMenuLeave: () => void;
  onToggle: (menu: string) => void;
}

export function DesktopMegaTrigger({
  label, menuId, groups, activeMenu, onNavigate, onMenuEnter, onMenuLeave, onToggle,
}: DesktopMegaTriggerProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const isOpen = activeMenu === menuId;

  // Focus trap within the open panel
  useFocusTrap(panelRef, isOpen, {
    onEscape: () => {
      onToggle(menuId);
      triggerRef.current?.focus();
    },
  });

  // Auto-focus first interactive item when panel opens
  useEffect(() => {
    if (!isOpen || !panelRef.current) return;
    const first = panelRef.current.querySelector<HTMLElement>(
      'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
    );
    const raf = requestAnimationFrame(() => first?.focus());
    return () => cancelAnimationFrame(raf);
  }, [isOpen]);

  // Arrow key navigation within the panel (Up/Down, Home/End)
  const handlePanelKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!panelRef.current) return;
    const selector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(selector));
    if (items.length === 0) return;
    const idx = items.indexOf(document.activeElement as HTMLElement);

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        const next = idx < items.length - 1 ? idx + 1 : 0;
        items[next]?.focus();
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        const prev = idx > 0 ? idx - 1 : items.length - 1;
        items[prev]?.focus();
        break;
      }
      case 'Home': {
        e.preventDefault();
        items[0]?.focus();
        break;
      }
      case 'End': {
        e.preventDefault();
        items[items.length - 1]?.focus();
        break;
      }
    }
  }, []);

  return (
    <div className="relative" onMouseEnter={() => onMenuEnter(menuId)} onMouseLeave={onMenuLeave}>
      {isOpen && <div className="absolute top-full left-0 right-0 h-2" aria-hidden="true" />}
      <button
        ref={triggerRef}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
          isOpen
            ? "text-foreground bg-foreground/[0.06]"
            : "text-muted-foreground/60 hover:text-foreground hover:bg-foreground/[0.03]"
        }`}
        onClick={() => onToggle(menuId)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls={`mega-menu-panel-${menuId}`}
      >
        {label}
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <MegaMenuPanel
          menuId={menuId} groups={groups} onNavigate={onNavigate}
          onClose={() => onToggle(menuId)} onPanelEnter={onMenuEnter} onPanelLeave={onMenuLeave}
          panelRef={panelRef} onKeyDown={handlePanelKeyDown}
        />
      )}
    </div>
  );
}
