/**
 * ═══════════════════════════════════════════════════════════════
 *   ICON RESOLVER — Decouples icon data from lucide-react imports
 * ═══════════════════════════════════════════════════════════════
 *
 * This module centralizes all lucide-react icon imports used by
 * data-driven components (nav menus, playground sidebar, etc.).
 *
 * Benefits:
 * - Data files (nav-data, playground-v2-data) contain zero runtime
 *   icon imports, keeping them pure data modules.
 * - Icon code is consolidated into fewer chunks instead of being
 *   spread across every data file that references icons.
 * - With optimizePackageImports, only the icons listed here are
 *   bundled — each icon is tree-shaken individually.
 */

import {
  type LucideIcon,
  Cpu, Zap, Sparkles, Eye, Blocks, Palette, Terminal, Layers,
  GraduationCap, BookOpen, Github, Trophy, Lightbulb, Play,
  // Playground icons
  Square, MousePointerClick, Maximize, LayoutDashboard, Navigation,
  Star, Type, Crown, Loader2, Wind, Gauge, Target,
  BarChart3, Tablet, Smartphone, Code, Activity,
  // Nav icons
  FileText, ScrollText,
} from "lucide-react";
import { forwardRef } from "react";

/** String union of all icon names used across data modules */
export type LucideIconName =
  | "Activity" | "BarChart3" | "Blocks" | "BookOpen" | "Cpu" | "Crown"
  | "Eye" | "FileText" | "Gauge" | "Github" | "GraduationCap" | "Layers" | "LayoutDashboard"
  | "Lightbulb" | "Loader2" | "Maximize" | "MousePointerClick" | "Navigation"
  | "Palette" | "Play" | "ScrollText" | "Smartphone" | "Sparkles" | "Square" | "Star"
  | "Tablet" | "Target" | "Terminal" | "Trophy" | "Type" | "Wind" | "Zap"
  | "Code";

/** Static icon map — O(1) lookup, no dynamic imports */
const ICON_MAP: Record<string, LucideIcon> = {
  Activity,
  BarChart3,
  Blocks,
  BookOpen,
  Cpu,
  Crown,
  Eye,
  FileText,
  Gauge,
  Github,
  GraduationCap,
  Layers,
  LayoutDashboard,
  Lightbulb,
  Loader2,
  Maximize,
  MousePointerClick,
  Navigation,
  Palette,
  Play,
  Smartphone,
  Sparkles,
  Square,
  Star,
  Tablet,
  Target,
  Terminal,
  Trophy,
  Type,
  Wind,
  Zap,
  Code,
  ScrollText,
};

/** Lightweight fallback for unknown icon names */
const FallbackIcon = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  function FallbackIcon(props, _ref) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </svg>
    );
  },
) as LucideIcon;

/**
 * Resolve an icon name string to its Lucide component.
 * Returns a fallback placeholder if the name is unknown.
 */
export function resolveIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? FallbackIcon;
}
