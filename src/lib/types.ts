/**
 * ═══════════════════════════════════════════════════════════════
 * FerrumEngine — Shared TypeScript Types
 * ═══════════════════════════════════════════════════════════════
 *
 * Single source of truth for types shared across components, views,
 * and lib modules. Import from here instead of reaching into
 * component internals.
 */

import type { LucideIconName } from "./icon-resolver";

/* ─── Navigation ─────────────────────────────────────────────── */

export type ViewId =
  | "home"
  | "principles"
  | "architecture"
  | "platform-architecture"
  | "hall-of-fame"
  | "showcase"
  | "learning"
  | "community"
  | "story"
  | "enterprise"
  | "enterprise-components"
  | "vision"
  | "effects"
  | "docs"
  | "playground";

export interface NavProps {
  currentView: ViewId;
  onNavigate: (view: ViewId) => void;
}

export interface MegaMenuItem {
  icon: LucideIconName;
  label: string;
  description?: string;
  view?: ViewId;
  href?: string;
  badge?: string;
}

export interface MegaMenuGroup {
  heading: string;
  items: MegaMenuItem[];
}

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

/* ─── Cloud / Enterprise ─────────────────────────────────────── */

export type TeamRole = "OWNER" | "ADMIN" | "MEMBER" | "VIEWER";
export type Environment = "dev" | "staging" | "production";
export type TokenType = "color" | "spacing" | "typography" | "shadow" | "motion" | "border" | "radius";
export type ComponentStatus = "draft" | "review" | "published" | "deprecated";

/* ─── View Metadata (SPA router) ─────────────────────────────── */

export interface ViewMeta {
  title: string;
  description: string;
}
