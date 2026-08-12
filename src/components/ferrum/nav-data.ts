/* ═══════════════════════════════════════════════════════════════
   NAV DATA — Menu structure for the mega-menu navigation.
   
   OPTIMIZATION: Icons are referenced by string name (LucideIconName)
   instead of runtime imports. This decouples the data module from
   the lucide-react bundle, allowing better code-splitting. Icons
   are resolved at render time in the consuming component via
   the `resolveIcon` helper from @/lib/icon-resolver.
   ═══════════════════════════════════════════════════════════════ */

/* Icon names are strings resolved at render time — see @/lib/icon-resolver */
import type { MegaMenuGroup } from "@/lib/types";

export const GITHUB_REPO = "https://github.com/roy-wanyoike/FerrumEngine";

export const platformMenu: MegaMenuGroup[] = [
  {
    heading: "Core Engines",
    items: [
      { icon: "Cpu", label: "Ferrum Runtime", description: "Zero-dependency execution layer" },
      { icon: "Zap", label: "Ferrum Motion", description: "Spring physics & gestures" },
      { icon: "Sparkles", label: "Ferrum Physics", description: "Realistic forces & collisions" },
      { icon: "Eye", label: "Ferrum VFX", description: "Visual effects & particles" },
    ],
  },
  {
    heading: "Build System",
    items: [
      { icon: "Blocks", label: "Effects Gallery", description: "Production-ready UI primitives", view: "effects" },
      { icon: "Palette", label: "Ferrum Tokens", description: "Unified design token system" },
      { icon: "Terminal", label: "Ferrum Compiler", description: "9-pass optimization pipeline" },
      { icon: "Layers", label: "Framework Adapters", description: "React, Vue, Svelte & 6 more" },
    ],
  },
];

export const docsMenu: MegaMenuGroup[] = [
  {
    heading: "Learn",
    items: [
      { icon: "BookOpen", label: "Getting Started", description: "Quick setup guide", view: "docs" },
      { icon: "GraduationCap", label: "Learning Center", description: "Interface engineering principles", view: "learning" },
      { icon: "Play", label: "Interactive Docs", description: "Learn by doing", view: "interactive-docs" },
    ],
  },
  {
    heading: "Reference",
    items: [
      { icon: "Terminal", label: "Architecture", description: "System design deep-dive", view: "architecture" },
      { icon: "Layers", label: "Platform Architecture", description: "Ecosystem diagrams & subsystems", view: "platform-architecture" },
    ],
  },
  {
    heading: "News",
    items: [
      { icon: "FileText", label: "Blog", description: "News & engineering posts", view: "blog" },
    ],
  },
];

export const communityMenu: MegaMenuGroup[] = [
  {
    heading: "Community",
    items: [
      { icon: "Github", label: "GitHub", href: GITHUB_REPO },
    ],
  },
];

export const moreMenu: MegaMenuGroup[] = [
  {
    heading: "Company",
    items: [
      { icon: "BookOpen", label: "Story", description: "The Ferrum journey", view: "story" },
      { icon: "Lightbulb", label: "Vision", description: "Where we're headed", view: "vision" },
    ],
  },
  {
    heading: "Showcase",
    items: [
      { icon: "Trophy", label: "Hall of Fame", description: "Flagship demo concepts", view: "hall-of-fame" },
      { icon: "Blocks", label: "Enterprise Components", description: "Business component roadmap", view: "enterprise-components" },
    ],
  },
  {
    heading: "History",
    items: [
      { icon: "ScrollText", label: "Changelog", description: "Release history & updates", view: "changelog" },
    ],
  },
];
