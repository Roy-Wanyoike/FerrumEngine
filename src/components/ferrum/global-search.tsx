"use client";

import {
  Search, Command, FileText, Sparkles, BookOpen,
  Newspaper, Clock, ArrowRight,
  Layout,
} from "lucide-react";
import {
  useState, useEffect, useRef, useCallback, useMemo,
} from "react";
import { searchIndex, type SearchResult, type SearchResultType } from "@/lib/search-index";
import type { ViewId } from "@/lib/types";

/* ═══════════════════════════════════════════════════════════════
   GLOBAL SEARCH — Command Palette (Cmd+K / Ctrl+K)
   ═══════════════════════════════════════════════════════════════ */

interface GlobalSearchProps {
  onNavigate: (view: ViewId) => void;
  open: boolean;
  onClose: () => void;
}

/* ── Type → icon/badge color mapping ── */

const TYPE_CONFIG: Record<SearchResultType, { icon: typeof Search; color: string }> = {
  view: { icon: Layout, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  effect: { icon: Sparkles, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
  doc: { icon: BookOpen, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
  blog: { icon: Newspaper, color: "text-pink-400 bg-pink-500/10 border-pink-500/20" },
  changelog: { icon: Clock, color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
};

const GROUP_ORDER: SearchResultType[] = ["view", "effect", "doc", "blog", "changelog"];

const GROUP_LABELS: Record<SearchResultType, string> = {
  view: "Pages",
  effect: "Effects",
  doc: "Documentation",
  blog: "Blog Posts",
  changelog: "Changelog",
};

/* ── Flatten grouped results into a single flat list for keyboard nav ── */

function flattenResults(grouped: Partial<Record<SearchResultType, SearchResult[]>>): SearchResult[] {
  const flat: SearchResult[] = [];
  for (const type of GROUP_ORDER) {
    const items = grouped[type];
    if (items) flat.push(...items);
  }
  return flat;
}

/* ═══════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export function GlobalSearch({ onNavigate, open, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => searchIndex(query), [query]);
  const flatResults = useMemo(() => flattenResults(results.grouped), [results.grouped]);

  // Reset state on open/close
  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      // Focus input after animation starts
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Keyboard: arrow keys, Enter, Escape
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, flatResults.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && flatResults[activeIndex]) {
        e.preventDefault();
        onSelect(flatResults[activeIndex]!);
      } else if (e.key === "Escape") {
        onClose();
      }
    },
    [flatResults, activeIndex, onClose],
  );

  const onSelect = useCallback(
    (result: SearchResult) => {
      onNavigate(result.viewId);
      onClose();
    },
    [onNavigate, onClose],
  );

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.querySelector(`[data-index="${activeIndex}"]`);
    activeEl?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  if (!open) return null;

  const hasResults = flatResults.length > 0;
  const isMac = typeof navigator !== "undefined" && /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
  const modKey = isMac ? "⌘" : "Ctrl";

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in-0 duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search FerrumEngine"
        className="relative w-full max-w-2xl mx-4 rounded-2xl border border-border/60 bg-background/95 backdrop-blur-2xl shadow-2xl shadow-black/30 animate-in fade-in-0 zoom-in-95 slide-in-from-top-4 duration-200 overflow-hidden"
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border/50">
          <Search className="w-5 h-5 text-muted-foreground/50 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search pages, effects, docs, blog…"
            className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md border border-border/60 bg-foreground/[0.04] text-[11px] font-mono text-muted-foreground/50">
            ESC
          </kbd>
        </div>

        {/* Results area */}
        <div
          ref={listRef}
          className="max-h-[50vh] overflow-y-auto overscroll-contain"
          role="listbox"
          aria-label="Search results"
        >
          {query && !hasResults && (
            <div className="px-5 py-12 text-center">
              <FileText className="w-8 h-8 text-muted-foreground/20 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground/60">No results for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Try different keywords</p>
            </div>
          )}

          {!query && (
            <div className="px-5 py-10 text-center">
              <Search className="w-8 h-8 text-muted-foreground/15 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground/50">Type to search across the platform</p>
              <div className="flex items-center justify-center gap-3 mt-4 text-xs text-muted-foreground/35">
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded border border-border/50 bg-foreground/[0.03] font-mono">↑↓</kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded border border-border/50 bg-foreground/[0.03] font-mono">↵</kbd>
                  Select
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded border border-border/50 bg-foreground/[0.03] font-mono">ESC</kbd>
                  Close
                </span>
              </div>
            </div>
          )}

          {hasResults &&
            GROUP_ORDER.map((type) => {
              const items = results.grouped[type];
              if (!items || items.length === 0) return null;

              const config = TYPE_CONFIG[type];
              const Icon = config.icon;

              // Find the flat index of the first item in this group
              const groupStartIndex = flatResults.indexOf(items[0]!);

              return (
                <div key={type}>
                  {/* Group header */}
                  <div className="flex items-center gap-2 px-5 pt-4 pb-2">
                    <Icon className={`w-3.5 h-3.5 ${config.color.split(" ")[0]}`} />
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/50">
                      {GROUP_LABELS[type]}
                    </span>
                    <span className="text-[11px] text-muted-foreground/30">({items.length})</span>
                  </div>

                  {/* Group items */}
                  {items.map((item, i) => {
                    const flatIdx = groupStartIndex + i;
                    const isActive = flatIdx === activeIndex;
                    return (
                      <button
                        key={`${type}-${item.title}-${flatIdx}`}
                        data-index={flatIdx}
                        role="option"
                        aria-selected={isActive}
                        onClick={() => onSelect(item)}
                        onMouseEnter={() => setActiveIndex(flatIdx)}
                        className={`w-full flex items-start gap-3 px-5 py-3 text-left transition-colors ${
                          isActive
                            ? "bg-purple-500/8"
                            : "hover:bg-foreground/[0.03]"
                        }`}
                      >
                        {/* Icon + badge */}
                        <div className="flex flex-col items-center gap-1 pt-0.5 shrink-0">
                          <Icon className={`w-4 h-4 ${config.color.split(" ")[0]}`} />
                          {item.badge && (
                            <span className={`text-[9px] px-1.5 py-px rounded border ${config.color} leading-tight`}>{
                              item.badge.length > 12 ? item.badge.slice(0, 12) : item.badge
                            }</span>
                          )}
                        </div>

                        {/* Text */}
                        <div className="flex-1 min-w-0">
                          <div className={`text-sm font-medium truncate ${isActive ? "text-foreground" : "text-foreground/85"}`}>
                            {item.title}
                          </div>
                          <div className="text-xs text-muted-foreground/50 truncate mt-0.5">
                            {item.description}
                          </div>
                        </div>

                        {/* Arrow on active */}
                        {isActive && (
                          <ArrowRight className="w-4 h-4 text-purple-400/70 shrink-0 mt-1" />
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-border/40 text-[11px] text-muted-foreground/35">
          <span className="flex items-center gap-1.5">
            <Command className="w-3 h-3" />
            {modKey}+K to toggle
          </span>
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-px rounded border border-border/40 bg-foreground/[0.02] font-mono text-[10px]">↑↓</kbd>
              navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-px rounded border border-border/40 bg-foreground/[0.02] font-mono text-[10px]">↵</kbd>
              open
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-px rounded border border-border/40 bg-foreground/[0.02] font-mono text-[10px]">esc</kbd>
              close
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SEARCH TRIGGER HOOK — Cmd+K / Ctrl+K listener
   ═══════════════════════════════════════════════════════════════ */

export function useGlobalSearchTrigger() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K (Mac) or Ctrl+K (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((prev) => !prev), []);

  return { open, toggle, close };
}

/* ═══════════════════════════════════════════════════════════════
   SEARCH BUTTON — For use in nav bar
   ═══════════════════════════════════════════════════════════════ */

export function SearchButton({ onClick }: { onClick: () => void }) {
  const isMac = typeof navigator !== "undefined" && /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
  const modKey = isMac ? "⌘" : "Ctrl";

  return (
    <button
      onClick={onClick}
      aria-label="Search (Cmd+K)"
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-muted-foreground/50 hover:text-foreground hover:bg-foreground/[0.04] transition-all border border-border/40 hover:border-border/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50"
    >
      <Search className="w-3.5 h-3.5" />
      <span className="hidden sm:inline">Search…</span>
      <kbd className="hidden md:inline-flex items-center px-1.5 py-px rounded border border-border/50 bg-foreground/[0.03] text-[10px] font-mono text-muted-foreground/60">
        {modKey}K
      </kbd>
    </button>
  );
}
