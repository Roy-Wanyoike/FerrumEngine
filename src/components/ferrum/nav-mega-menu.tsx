"use client";

import { ChevronDown } from "lucide-react";
import { resolveIcon } from "@/lib/icon-resolver";
import type { ViewId, MegaMenuGroup } from "@/lib/types";

export interface MegaMenuPanelProps {
  groups: MegaMenuGroup[];
  menuId: string;
  onNavigate: (view: ViewId) => void;
  onClose: () => void;
  onPanelEnter: (menu: string) => void;
  onPanelLeave: () => void;
}

export function MegaMenuPanel({
  groups,
  menuId,
  onNavigate,
  onClose,
  onPanelEnter,
  onPanelLeave,
}: MegaMenuPanelProps) {
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
                    const Icon = resolveIcon(item.icon);
                    const isExternalHref = item.href && item.href !== "#" && !item.view;
                    const isNavigableView = !!item.view;

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
  return (
    <div className="relative" onMouseEnter={() => onMenuEnter(menuId)} onMouseLeave={onMenuLeave}>
      {activeMenu === menuId && <div className="absolute top-full left-0 right-0 h-2" aria-hidden="true" />}
      <button
        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
          activeMenu === menuId
            ? "text-foreground bg-foreground/[0.06]"
            : "text-muted-foreground/60 hover:text-foreground hover:bg-foreground/[0.03]"
        }`}
        onClick={() => onToggle(menuId)}
        aria-expanded={activeMenu === menuId}
        aria-haspopup="true"
      >
        {label}
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeMenu === menuId ? "rotate-180" : ""}`} />
      </button>
      {activeMenu === menuId && (
        <MegaMenuPanel
          menuId={menuId} groups={groups} onNavigate={onNavigate}
          onClose={() => onToggle(menuId)} onPanelEnter={onMenuEnter} onPanelLeave={onMenuLeave}
        />
      )}
    </div>
  );
}
