/**
 * ═══════════════════════════════════════════════════════════════════
 * Ferrum Icon Registry — Single import point for tree-shaking
 * ═══════════════════════════════════════════════════════════════════
 *
 * Auto-generated from source scan of 39 files.
 * Only includes icons that are actively imported across the codebase.
 *
 * USAGE:
 *   import { ArrowRight, Zap } from "@/components/ferrum/icons";
 *
 * To add a new icon:
 *   1. Add it to the appropriate section below.
 *   2. Update ICON_COUNT.
 *
 * To remove an icon:
 *   1. Remove it from this file.
 *   2. Fix any broken imports that referenced it.
 *
 * ═══════════════════════════════════════════════════════════════════
 */

// ─── Types ───────────────────────────────────────────────────────
export type { LucideIcon } from "lucide-react";

// ═══════════════════════════════════════════════════════════════════
// CRITICAL PATH — Loaded with Nav / first meaningful paint
// ─────────────────────────────────────────────────────────────────
// These icons are imported by files that ship in the initial bundle:
//   nav.tsx, nav-data.ts, theme-toggle.tsx, scroll-progress.tsx,
//   color-customizer.tsx, sheet.tsx, dialog.tsx, select.tsx, error.tsx,
//   nav-types.ts (type only)
// ═══════════════════════════════════════════════════════════════════

// Navigation & Layout (nav.tsx, scroll-progress.tsx)
export {
  Menu,
  X,
  ArrowRight,
  ArrowUp,
  ChevronDown,
  Github,
  Search,
  Check,
  Blocks,
  Play,
  Trophy,
  BookOpen,
  Users,
  DollarSign,
  Globe,
  Layout,
} from "lucide-react";

// Theme & Appearance (nav.tsx, theme-toggle.tsx, color-customizer.tsx)
export { Sun, Moon, Monitor, Palette } from "lucide-react";

// Platform & Nav Data (nav-data.ts — mega-menu icons)
export {
  Cpu,
  Zap,
  Sparkles,
  Eye,
  Terminal,
  Layers,
  Bot,
  Cloud,
  Store,
  Heart,
  GraduationCap,
  Gamepad2,
  Landmark,
  ShoppingBag,
  BarChart3,
  Briefcase,
  Smartphone,
  Building2,
  Code,
} from "lucide-react";

// UI Primitives — Radix-specific icon variants
// (sheet.tsx, dialog.tsx, select.tsx require these exact export names)
export { XIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";

// Status & Recovery (error.tsx, color-customizer.tsx)
export { AlertTriangle, RotateCcw } from "lucide-react";

// ═══════════════════════════════════════════════════════════════════
// LAZY-LOADED — Only in dynamic chunks
// ─────────────────────────────────────────────────────────────────
// These icons are imported by files that are code-split or rendered
// below the fold: section components, playground, docs-view,
// effects-view, architecture-deep-dive, showcase-gallery, etc.
// ═══════════════════════════════════════════════════════════════════

// Navigation & Direction (lazy sections)
export {
  ArrowLeft,
  ArrowUpRight,
  ChevronRight,
  ExternalLink,
  Maximize,
  Navigation,
  SplitSquareHorizontal,
} from "lucide-react";

// UI & Layout (sections, playground, docs)
export {
  LayoutDashboard,
  LayoutTemplate,
  Square,
  Circle,
  CircleDot,
  Component,
  Box,
  Boxes,
  Table,
  Tablet,
} from "lucide-react";

// Actions & Operations (playground, docs, sections)
export {
  Copy,
  Download,
  Filter,
  Pencil,
  Plus,
  Trash2,
  Settings,
  Wrench,
  LogIn,
  LogOut,
} from "lucide-react";

// Code & Development (sections, playground, docs)
export {
  Braces,
  GitBranch,
  Package,
  FileCode,
  FileText,
  FileCheck,
  Workflow,
  Puzzle,
  Rocket,
  Timer,
} from "lucide-react";

// Security & Performance (enterprise, architecture sections)
export { Shield, Lock, Gauge } from "lucide-react";

// Enterprise & AI (enterprise sections, deep-dive)
export {
  CreditCard,
  ClipboardList,
  Crown,
  Database,
  FolderKanban,
  Kanban,
} from "lucide-react";

// Social & Communication (community, footer sections)
export {
  MessageSquare,
  Star,
} from "lucide-react";

// Media & Content (effects-view, docs)
export { ImageIcon, Type } from "lucide-react";

// Interaction & Animation (playground, effects, sections)
export {
  MousePointer,
  MousePointerClick,
  Move3D,
} from "lucide-react";

// Status & Feedback (lazy sections, docs)
export {
  Accessibility,
  Activity,
  Bell,
  Brain,
  Calendar,
  Clock,
  Info,
  Keyboard,
  Lightbulb,
  Loader2,
  Target,
} from "lucide-react";

// Science & Effects (effects-view, architecture)
export { Atom, Orbit, Waves, Wind } from "lucide-react";

/**
 * ICON_COUNT: Total number of unique icons in this registry (excluding LucideIcon type).
 * BUDGET:   Maximum allowed icons. Each icon adds ~0.5–1 KB to the bundle.
 *           If you need to exceed this budget, justify the UX impact first.
 */
export const ICON_COUNT = 113;
export const ICON_BUDGET = 120;
