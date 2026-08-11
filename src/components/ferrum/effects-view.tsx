"use client";

/* ════════════════════════════════════════════════════════════════
   EFFECTS VIEW — Lazy-loaded chunk
   All effects data, gallery, playground, collection, and modals.
   Extracted from page.tsx to reduce initial SSR bundle.
   ════════════════════════════════════════════════════════════════ */

import {
  Search,
  RotateCcw,
  Heart,
  Loader2, Code,
} from "lucide-react";
import React, { useState, useMemo, useRef, useEffect, memo } from "react";
import { EffectPreview } from "@/components/ferrum/effect-preview";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { categories, effects as effectsIndex, categoryCounts, type FerrumEffectIndex } from "@/lib/ferrum-effects-index";


/* ════════════════════════════════════════════════════════════════
   HEART BUTTON — Animated heart with scale pop on save
   ════════════════════════════════════════════════════════════════ */
const HeartButton = memo(function HeartButton({ effectClassName, isInCollection, onToggle, compact: _compact }: {
  effectClassName: string; isInCollection: (cn: string) => boolean; onToggle: (cn: string) => void; compact?: boolean;
}) {
  const [animating, setAnimating] = useState(false);
  const wasSaved = useRef(isInCollection(effectClassName));
  const animTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { return () => { if (animTimerRef.current) clearTimeout(animTimerRef.current); }; }, []);

  const handleClick = () => {
    const willBeSaved = !isInCollection(effectClassName);
    onToggle(effectClassName);
    if (willBeSaved) {
      setAnimating(true);
      if (animTimerRef.current) clearTimeout(animTimerRef.current);
      animTimerRef.current = setTimeout(() => setAnimating(false), 350);
    }
    wasSaved.current = willBeSaved;
  };

  const saved = isInCollection(effectClassName);

  return (
    <button
      onClick={handleClick}
      className={"p-2.5 rounded-lg transition-all min-w-[44px] min-h-[44px] " +
        (saved
          ? "text-pink-500 hover:text-pink-400 hover:bg-pink-500/10"
          : "text-muted-foreground/40 hover:text-pink-500 hover:bg-foreground/[0.06]"
        ) + (animating ? " scale-125" : "")}
      style={{ transition: "color 0.2s, background 0.2s, transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
      title={saved ? "Saved" : "Save"}
      aria-label={saved ? "Remove from saved" : "Save effect"}
    >
      <Heart
        className="w-3.5 h-3.5"
        fill={saved ? "currentColor" : "none"}
      />
    </button>
  );
});

/* ════════════════════════════════════════════════════════════════
   SKELETON CARD
   ════════════════════════════════════════════════════════════════ */
function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-border bg-foreground/[0.02] p-4 animate-pulse">
      <div className="w-full h-24 rounded-lg bg-foreground/[0.04] mb-3" />
      <div className="w-3/4 h-3 rounded bg-foreground/[0.04] mb-2" />
      <div className="w-1/2 h-2.5 rounded bg-foreground/[0.03]" />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   EFFECT CARD
   ════════════════════════════════════════════════════════════════ */
const EffectCard = memo(function EffectCard({ effect, onOpenCode, onAddCollection, isInCollection }: {
  effect: FerrumEffectIndex;
  onOpenCode: (e: FerrumEffectIndex) => void;
  onAddCollection: (cn: string) => void;
  isInCollection: (cn: string) => boolean;
}) {
  const [previewStyle, setPreviewStyle] = useState<React.CSSProperties | undefined>();
  const replay = () => {
    setPreviewStyle(undefined);
    requestAnimationFrame(() => requestAnimationFrame(() => setPreviewStyle({})));
  };
  return (
    <div className="group rounded-2xl border border-border bg-foreground/[0.015] hover:bg-foreground/[0.025] transition-all duration-200 overflow-hidden">
      <div className="p-3">
        <EffectPreview effect={effect} style={previewStyle} />
      </div>
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-foreground truncate">{effect.name}</h3>
          <div className="flex items-center gap-0.5 shrink-0 ml-2">
            <button onClick={replay} className="p-2.5 rounded-lg text-muted-foreground/40 hover:text-foreground hover:bg-foreground/[0.06] transition-all min-w-[44px] min-h-[44px]" title="Replay" aria-label={`Replay ${effect.name}`}><RotateCcw className="w-3.5 h-3.5" /></button>
            <HeartButton effectClassName={effect.className} isInCollection={isInCollection} onToggle={onAddCollection} compact />
            <button onClick={() => onOpenCode(effect)} className="p-2.5 rounded-lg text-muted-foreground/40 hover:text-foreground hover:bg-foreground/[0.06] transition-all min-w-[44px] min-h-[44px]" title="View code" aria-label={`View code for ${effect.name}`}><Code className="w-3.5 h-3.5" /></button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <code className="text-[11px] font-mono text-muted-foreground/40 bg-foreground/[0.04] px-2 py-0.5 rounded">{effect.className}</code>
          <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 bg-foreground/[0.04] text-muted-foreground/40 hover:bg-foreground/[0.06]">{effect.category}</Badge>
        </div>
      </div>
    </div>
  );
});

/* ════════════════════════════════════════════════════════════════
   CATEGORY PILL
   ════════════════════════════════════════════════════════════════ */
const CategoryPill = memo(function CategoryPill({ cat, active, count, compact, onSelect }: {
  cat: { id: string; name: string }; active: boolean; count: number; compact?: boolean; onSelect: (id: string) => void;
}) {
  return (
    <button
      data-active={active}
      aria-pressed={active}
      onClick={() => onSelect(cat.id)}
      className={"shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap " +
        (active ? "bg-foreground text-background" : "bg-foreground/[0.04] text-muted-foreground/60 hover:text-foreground hover:bg-foreground/[0.06]")
      }
    >
      {cat.name} {!compact && <span className="opacity-50 ml-1">{count}</span>}
    </button>
  );
});

/* ════════════════════════════════════════════════════════════════
   VIRTUAL GRID — Paginated infinite scroll
   ════════════════════════════════════════════════════════════════ */
function VirtualGrid({ effects, onOpenCode, onAddCollection, isInCollection }: {
  effects: FerrumEffectIndex[]; onOpenCode: (e: FerrumEffectIndex) => void; onAddCollection: (cn: string) => void; isInCollection: (cn: string) => boolean;
}) {
  const [visible, setVisible] = useState(48);
  const loaderRef = useRef<HTMLDivElement>(null);
  const slice = effects.slice(0, visible);
  const hasMore = visible < effects.length;

  useEffect(() => {
    const el = loaderRef.current;
    if (!el || !hasMore) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry?.isIntersecting) setVisible((v) => v + 48); }, { rootMargin: "400px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, [hasMore]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {slice.map((e) => (
          <EffectCard key={e.className} effect={e} onOpenCode={onOpenCode} onAddCollection={onAddCollection} isInCollection={isInCollection} />
        ))}
      </div>
      <div ref={loaderRef} className="h-8" />
      {hasMore && (
        <div className="flex justify-center py-6">
          <div className="flex items-center gap-2 text-muted-foreground/40 text-xs"><Loader2 className="w-3.5 h-3.5 animate-spin" />Loading...</div>
        </div>
      )}
    </>
  );
}

/* ════════════════════════════════════════════════════════════════
   EFFECTS PAGE VIEW
   ════════════════════════════════════════════════════════════════ */
export function EffectsView({
  search, setSearch, activeCategory, setActiveCategory,
  hydrated, handleOpenCode, add, isIn,
  collection, setCollectionOpen,
}: {
  search: string; setSearch: (s: string) => void;
  activeCategory: string; setActiveCategory: (c: string) => void;
  hydrated: boolean;
  handleOpenCode: (e: FerrumEffectIndex) => void;
  add: (cn: string) => void; isIn: (cn: string) => boolean;
  collection: string[]; setCollectionOpen: (o: boolean) => void;
}) {
  const catScrollRef = useRef<HTMLDivElement>(null);

  // Compute filtered effects from local data
  const filtered = useMemo(() => {
    let f = effectsIndex;
    if (activeCategory !== "all") f = f.filter((e) => e.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      f = f.filter((e) => e.name.toLowerCase().includes(q) || e.className.toLowerCase().includes(q) || e.category.toLowerCase().includes(q));
    }
    return f;
  }, [search, activeCategory]);
  useEffect(() => {
    if (catScrollRef.current) {
      const b = catScrollRef.current.querySelector('[data-active="true"]');
      if (b) b.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [activeCategory]);

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-12 pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-purple-400 mb-4">Motion</p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
          {effectsIndex.length} Effects. {categories.length} Categories.
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mt-4">
          Carefully crafted CSS effects built to enhance user interactions while maintaining
          exceptional performance and accessibility.
        </p>
      </div>

      {/* Sticky filter bar */}
      <div className="sticky top-16 z-30 border-b border-border bg-background/90 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
              <Input placeholder="Search effects..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 bg-foreground/[0.04] border-border text-foreground placeholder:text-muted-foreground/40 focus:border-purple-500/40 focus:ring-purple-500/10 h-10 rounded-xl text-sm" />
              {search && <button onClick={() => setSearch("")} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-muted-foreground text-xs">Clear</button>}
            </div>
            <button onClick={() => setCollectionOpen(true)} className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-foreground/[0.04] border border-border text-muted-foreground hover:text-foreground hover:border-border transition-all shrink-0 relative" aria-label={`Saved effects${collection.length > 0 ? `, ${collection.length} saved` : ""}`}>
              <Heart className="w-4 h-4" />
              <span className="text-sm hidden sm:inline">Saved</span>
              {collection.length > 0 && <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-pink-500 text-foreground text-[10px] font-bold px-1" aria-live="polite">{collection.length}</span>}
            </button>
          </div>
          <div ref={catScrollRef} className="flex gap-1.5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {categories.map((cat) => (
              <CategoryPill key={cat.id} cat={cat} active={activeCategory === cat.id} count={categoryCounts[cat.id] || 0} compact onSelect={setActiveCategory} />
            ))}
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-8 w-full" aria-label="Effects grid">
        {hydrated ? (
          filtered.length > 0 ? (
            <>
              <VirtualGrid effects={filtered} onOpenCode={handleOpenCode} onAddCollection={add} isInCollection={isIn} />
              <div className="mt-8 text-center text-xs text-muted-foreground/50" aria-live="polite">Showing {filtered.length} of {effectsIndex.length} effects</div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <Search className="w-12 h-12 text-foreground/[0.06] mb-4" aria-hidden="true" />
              <h3 className="text-lg font-medium text-muted-foreground/70">No effects found</h3>
              <p className="text-sm text-muted-foreground/50 mt-1">Try a different search or category</p>
              <button onClick={() => { setSearch(""); setActiveCategory("all"); }} className="mt-4 px-4 py-2 rounded-xl bg-purple-500/10 text-sm text-purple-400 hover:text-purple-300 hover:bg-purple-500/20 transition-colors">Clear filters</button>
            </div>
          )
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}
      </section>
    </div>
  );
}
