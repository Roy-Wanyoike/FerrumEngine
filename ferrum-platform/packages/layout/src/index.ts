import type { LayoutConfig, LayoutDefinition } from "./types";
import { generateDashboardCSS } from "./dashboard";
import { generateSidebarCSS } from "./sidebar";
import { generateSplitCSS } from "./split";
import { generateEditorCSS } from "./editor";
import { generateKanbanCSS } from "./kanban";
import { generateMasonryCSS } from "./masonry";
import { generateGridLayoutCSS } from "./grid-layout";
import { generateStackCSS } from "./stack";
import { generateOverlayCSS } from "./overlay";
import { generateResponsiveCSS } from "./responsive";

export type { LayoutConfig, LayoutDefinition };

export { generateDashboardCSS } from "./dashboard";
export { generateSidebarCSS } from "./sidebar";
export { generateSplitCSS } from "./split";
export { generateEditorCSS } from "./editor";
export { generateKanbanCSS } from "./kanban";
export { generateMasonryCSS } from "./masonry";
export { generateGridLayoutCSS } from "./grid-layout";
export { generateStackCSS } from "./stack";
export { generateOverlayCSS } from "./overlay";
export { generateResponsiveCSS } from "./responsive";

/**
 * Generate the complete CSS for all layout systems combined.
 */
export function generateLayoutCSS(config: LayoutConfig = {}): string {
  const prefix = config.prefix ?? "fr-";

  const layoutGenerators = [
    generateDashboardCSS,
    generateSidebarCSS,
    generateSplitCSS,
    generateEditorCSS,
    generateKanbanCSS,
    generateMasonryCSS,
    generateGridLayoutCSS,
    generateStackCSS,
    generateOverlayCSS,
    generateResponsiveCSS,
  ];

  const css = layoutGenerators.map((gen) => gen(prefix)).join("\n");

  if (config.minify) {
    return css
      .replace(/\s+/g, " ")
      .replace(/\s*([{}:;,])\s*/g, "$1")
      .replace(/;}/g, "}")
      .trim();
  }

  return css;
}

/**
 * Array of all built-in layout definitions.
 */
export const builtInLayouts: LayoutDefinition[] = [
  {
    name: "dashboard",
    description: "CSS grid dashboard layout with sidebar, header, and main content areas",
    generateCSS: generateDashboardCSS,
  },
  {
    name: "sidebar",
    description: "Fixed/absolute sidebar navigation with collapsible state and hover interactions",
    generateCSS: generateSidebarCSS,
  },
  {
    name: "split",
    description: "Split pane layout with horizontal/vertical orientation and resizable gutter",
    generateCSS: generateSplitCSS,
  },
  {
    name: "editor",
    description: "Code editor layout with line numbers, content area, and optional minimap",
    generateCSS: generateEditorCSS,
  },
  {
    name: "kanban",
    description: "Kanban board with horizontal scrolling columns and draggable cards",
    generateCSS: generateKanbanCSS,
  },
  {
    name: "masonry",
    description: "Masonry/waterfall layout using CSS columns with responsive breakpoints",
    generateCSS: generateMasonryCSS,
  },
  {
    name: "grid",
    description: "Advanced CSS grid system with column, span, gap, and alignment utilities",
    generateCSS: generateGridLayoutCSS,
  },
  {
    name: "stack",
    description: "Stack layout for vertical and horizontal flex arrangement with consistent gaps",
    generateCSS: generateStackCSS,
  },
  {
    name: "overlay",
    description: "Full-screen overlay, modal, and drawer layout with backdrop blur and transitions",
    generateCSS: generateOverlayCSS,
  },
  {
    name: "responsive",
    description: "Responsive container utilities, aspect ratios, viewport heights, and breakpoint visibility",
    generateCSS: generateResponsiveCSS,
  },
];