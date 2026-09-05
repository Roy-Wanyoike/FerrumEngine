/**
 * @fileoverview RoyCSS Effects — Shared type definitions
 *
 * These types were extracted from FerrumEngine's src/lib/types.ts
 * as part of the RoyCSS extraction (ADR-011).
 */

/* ─── Effects ────────────────────────────────────────────────── */

export interface FerrumEffectIndex {
  name: string;
  className: string;
  category: string;
  displayType: string;
}

export interface FerrumCSSEffect extends FerrumEffectIndex {
  css: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
