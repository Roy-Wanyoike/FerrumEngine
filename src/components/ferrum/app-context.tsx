"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import type { FerrumEffectIndex } from "@/lib/ferrum-effects-index";

/* ════════════════════════════════════════════════════════════════
   Types
   ════════════════════════════════════════════════════════════════ */

interface AppState {
  search: string;
  setSearch: (v: string) => void;
  activeCategory: string;
  setActiveCategory: (v: string) => void;
  selectedEffect: FerrumEffectIndex | null;
  openDetail: (e: FerrumEffectIndex) => void;
  closeDetail: () => void;
  detailOpen: boolean;
  collection: string[];
  addToCollection: (cn: string) => void;
  removeFromCollection: (cn: string) => void;
  clearCollection: () => void;
  isInCollection: (cn: string) => boolean;
  collectionOpen: boolean;
  setCollectionOpen: (open: boolean) => void;
  hydrated: boolean;
}

const AppContext = createContext<AppState | null>(null);

/* ════════════════════════════════════════════════════════════════
   Provider — owns all shared client state
   ════════════════════════════════════════════════════════════════ */

export function AppProvider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedEffect, setSelectedEffect] = useState<FerrumEffectIndex | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [collection, setCollection] = useState<string[]>([]);
  const [collectionOpen, setCollectionOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate collection from localStorage on mount
  useEffect(() => {
    let cancelled = false;
    requestAnimationFrame(() => {
      try {
        const s = localStorage.getItem("ferrum-collection");
        if (s && !cancelled) {
          const p = JSON.parse(s);
          if (Array.isArray(p)) setCollection(p);
        }
      } catch {
        // Silently fail — collection is non-critical
      }
      if (!cancelled) setHydrated(true);
    });
    return () => { cancelled = true; };
  }, []);

  const openDetail = useCallback((e: FerrumEffectIndex) => {
    setSelectedEffect(e);
    setDetailOpen(true);
  }, []);

  const closeDetail = useCallback(() => setDetailOpen(false), []);

  const addToCollection = useCallback((cn: string) => {
    setCollection((prev) => {
      if (prev.includes(cn)) return prev;
      const next = [...prev, cn];
      try { localStorage.setItem("ferrum-collection", JSON.stringify(next)); } catch { /* quota */ }
      return next;
    });
  }, []);

  const removeFromCollection = useCallback((cn: string) => {
    setCollection((prev) => {
      const next = prev.filter((c) => c !== cn);
      try { localStorage.setItem("ferrum-collection", JSON.stringify(next)); } catch { /* quota */ }
      return next;
    });
  }, []);

  const clearCollection = useCallback(() => {
    setCollection([]);
    try { localStorage.removeItem("ferrum-collection"); } catch { /* noop */ }
  }, []);

  const collectionSet = useMemo(() => new Set(collection), [collection]);

  const isInCollection = useCallback(
    (cn: string) => collectionSet.has(cn),
    [collectionSet]
  );

  const value = useMemo(() => ({
    search, setSearch,
    activeCategory, setActiveCategory,
    selectedEffect, detailOpen,
    openDetail, closeDetail,
    collection,
    addToCollection, removeFromCollection, clearCollection, isInCollection,
    collectionOpen, setCollectionOpen,
    hydrated,
  }), [
    search, activeCategory, selectedEffect, detailOpen,
    openDetail, closeDetail,
    collection,
    addToCollection, removeFromCollection, clearCollection, isInCollection,
    collectionOpen, setCollectionOpen,
    hydrated,
  ]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

/* ════════════════════════════════════════════════════════════════
   Hook — typed access to shared app state
   ════════════════════════════════════════════════════════════════ */

export function useAppState(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppState must be used within <AppProvider>");
  }
  return ctx;
}
