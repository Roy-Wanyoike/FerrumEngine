// Type-strict compliance: fixed noUncheckedIndexedAccess + noUnusedLocals
"use client";

import {
  Search, Sparkles, Component, LayoutTemplate,
} from "lucide-react";
import { useMemo } from "react";
import { type FerrumEffectIndex } from "@/lib/ferrum-effects-index";
import { resolveIcon } from "@/lib/icon-resolver";
import {
  type SidebarActivity,
  PLAYGROUND_COMPONENTS, TEMPLATES, EFFECT_CATEGORIES,
} from "../playground-v2-data";

/* ─── Activity Bar (far left icon strip) ─── */
export function ActivityBar({
  active,
  onChange,
}: {
  active: SidebarActivity;
  onChange: (a: SidebarActivity) => void;
}) {
  const items: { id: SidebarActivity; icon: typeof Component; label: string }[] = [
    { id: "components", icon: Component, label: "Components" },
    { id: "effects", icon: Sparkles, label: "Effects" },
    { id: "templates", icon: LayoutTemplate, label: "Templates" },
  ];
  return (
    <div className="w-12 bg-foreground/[0.02] border-r border-border flex flex-col items-center pt-3 gap-1 shrink-0">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            title={item.label}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-150 mb-0.5 relative ${
              isActive
                ? "bg-foreground/[0.08] text-foreground"
                : "text-muted-foreground/60 hover:text-foreground/80 hover:bg-foreground/[0.04]"
            }`}
          >
            <Icon size={18} />
            {isActive && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-foreground rounded-r-full" />
            )}
          </button>
        );
      })}

    </div>
  );
}

/* ─── Component Sidebar ─── */
export function ComponentSidebar({
  activity,
  selectedComponent,
  onSelectComponent,
  selectedEffect,
  onSelectEffect,
  onSelectTemplate,
  effectsList,
  search,
  setSearch,
  effectCategory,
  setEffectCategory,
}: {
  activity: SidebarActivity;
  selectedComponent: string;
  onSelectComponent: (id: string) => void;
  selectedEffect: string;
  onSelectEffect: (cls: string) => void;
  onSelectTemplate: (t: typeof TEMPLATES[number]) => void;
  effectsList: FerrumEffectIndex[];
  search: string;
  setSearch: (s: string) => void;
  effectCategory: string;
  setEffectCategory: (c: string) => void;
}) {
  const componentCategories = useMemo(() => {
    const cats: Record<string, typeof PLAYGROUND_COMPONENTS> = {};
    PLAYGROUND_COMPONENTS.forEach((c) => {
      if (!cats[c.category]) cats[c.category] = [];
      cats[c.category]!.push(c);
    });
    return cats;
  }, []);

  const filteredEffects = useMemo(() => {
    let list = effectsList;
    if (effectCategory !== "all") list = list.filter((e) => e.category === effectCategory);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((e) => e.name.toLowerCase().includes(q) || e.className.includes(q));
    }
    return list.slice(0, 80);
  }, [effectsList, effectCategory, search]);

  return (
    <div className="w-64 bg-foreground/[0.01] border-r border-border flex flex-col shrink-0">
      {/* Search */}
      <div className="p-3 border-b border-border">
        <div className="relative">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/60" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={activity === "effects" ? "Search effects..." : "Search components..."}
            aria-label={activity === "effects" ? "Search effects" : "Search components"}
            className="w-full h-8 pl-8 pr-3 text-xs bg-foreground/[0.04] border border-border rounded-lg focus:outline-none focus:border-foreground/20 text-foreground placeholder:text-muted-foreground/60 transition-colors"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {activity === "components" && (
          <div className="p-2">
            {Object.entries(componentCategories).map(([cat, items]) => (
              <div key={cat} className="mb-3">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50 px-2 mb-1.5">
                  {cat}
                </div>
                {items.map((comp) => {
                  const Icon = resolveIcon(comp.icon);
                  const isSelected = selectedComponent === comp.id;
                  return (
                    <button
                      key={comp.id}
                      onClick={() => onSelectComponent(comp.id)}
                      className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all duration-100 mb-0.5 group ${
                        isSelected
                          ? "bg-foreground/[0.08] text-foreground"
                          : "text-muted-foreground/70 hover:bg-foreground/[0.04] hover:text-foreground/90"
                      }`}
                    >
                      <Icon size={15} className={isSelected ? "text-foreground" : "text-muted-foreground/60 group-hover:text-foreground/60"} />
                      <div className="min-w-0">
                        <div className="text-xs font-medium truncate">{comp.label}</div>
                        <div className="text-[10px] text-muted-foreground/60 truncate">{comp.description}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        )}

        {activity === "effects" && (
          <div>
            {/* Category pills */}
            <div className="flex flex-wrap gap-1 px-3 pt-2 pb-1">
              <button
                onClick={() => setEffectCategory("all")}
                className={`text-[10px] px-2 py-1 rounded-md transition-colors ${
                  effectCategory === "all"
                    ? "bg-foreground/[0.1] text-foreground"
                    : "text-muted-foreground/50 hover:bg-foreground/[0.04]"
                }`}
              >
                All
              </button>
              {EFFECT_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setEffectCategory(cat.id)}
                  className={`text-[10px] px-2 py-1 rounded-md transition-colors ${
                    effectCategory === cat.id
                      ? "bg-foreground/[0.1] text-foreground"
                      : "text-muted-foreground/50 hover:bg-foreground/[0.04]"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            <div className="p-2">
              {filteredEffects.map((effect) => {
                const isSelected = selectedEffect === effect.className;
                return (
                  <button
                    key={effect.className}
                    onClick={() => onSelectEffect(effect.className)}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all duration-100 mb-0.5 ${
                      isSelected
                        ? "bg-foreground/[0.08] text-foreground"
                        : "text-muted-foreground/70 hover:bg-foreground/[0.04] hover:text-foreground/90"
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-md bg-foreground/[0.06] border border-border flex items-center justify-center shrink-0 ${isSelected ? "border-foreground/20" : ""}`}>
                      <div className="w-3 h-3 rounded-sm bg-gradient-to-br from-purple-500/40 to-pink-500/40" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-medium truncate">{effect.name}</div>
                      <div className="text-[10px] text-muted-foreground/60 truncate font-mono">{effect.className}</div>
                    </div>
                  </button>
                );
              })}
              {filteredEffects.length === 0 && (
                <div className="text-xs text-muted-foreground/60 text-center py-8">
                  No effects found
                </div>
              )}
            </div>
          </div>
        )}

        {activity === "templates" && (
          <div className="p-2">
            {TEMPLATES.map((tpl) => (
              <button
                key={tpl.id}
                onClick={() => onSelectTemplate(tpl)}
                className="w-full text-left p-3 rounded-lg border border-border bg-foreground/[0.01] hover:bg-foreground/[0.04] transition-colors mb-2 group"
              >
                <div className="text-xs font-semibold text-foreground/90 mb-1 group-hover:text-foreground">{tpl.label}</div>
                <div className="text-[10px] text-muted-foreground/50 leading-relaxed mb-2">{tpl.description}</div>
                <div className="flex flex-wrap gap-1">
                  {tpl.components.map((c) => (
                    <span key={c} className="text-[9px] px-1.5 py-0.5 rounded bg-foreground/[0.06] text-muted-foreground/50">{c}</span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
