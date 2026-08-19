// Ferrum Compiler — Type Definitions

export interface CompilerOptions {
  minify?: boolean;
  removeUnused?: boolean;
  autoprefixer?: boolean;
  sourceMap?: boolean;
  targets?: string[];
}

export interface CompilerResult {
  css: string;
  stats: CompilerStats;
  sourceMap?: string;
  warnings: string[];
}

export interface CompilerStats {
  originalSize: number;
  outputSize: number;
  savings: number;
  savingsPercent: number;
  rulesRemoved: number;
  selectorsRemoved: number;
  propertiesOptimized: number;
  duration: number;
}

// ── AST Node Types ──────────────────────────────────────────────

export type CSSNodeType =
  | 'stylesheet'
  | 'rule'
  | 'declaration'
  | 'comment'
  | 'atrule';

export interface CSSNode {
  type: CSSNodeType;
  children?: CSSNode[];
  selector?: string;
  property?: string;
  value?: string;
  name?: string;
  params?: string;
  valueRange?: { start: number; end: number };
  position?: { start: number; end: number };
}

export interface CompatibilityResult {
  compatible: boolean;
  property: string;
  value: string;
  unsupportedTargets: string[];
  prefixNeeded?: string[];
  fallback?: string;
}

// Property order for consistent sorting
export const PROPERTY_ORDER: readonly string[] = [
  'all', 'appearance',
  'position', 'top', 'right', 'bottom', 'left', 'z-index',
  'display', 'visibility', 'float', 'clear',
  'flex', 'flex-basis', 'flex-direction', 'flex-flow', 'flex-grow', 'flex-shrink', 'flex-wrap',
  'order', 'justify-content', 'align-items', 'align-self', 'align-content',
  'grid', 'grid-area', 'grid-auto-columns', 'grid-auto-flow', 'grid-auto-rows',
  'grid-column', 'grid-column-end', 'grid-column-start', 'grid-gap', 'grid-row',
  'grid-row-end', 'grid-row-start', 'grid-template', 'grid-template-areas',
  'grid-template-columns', 'grid-template-rows', 'gap', 'row-gap', 'column-gap',
  'width', 'min-width', 'max-width', 'height', 'min-height', 'max-height',
  'box-sizing', 'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
  'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
  'border', 'border-top', 'border-right', 'border-bottom', 'border-left',
  'border-width', 'border-style', 'border-color', 'border-radius',
  'border-top-left-radius', 'border-top-right-radius',
  'border-bottom-right-radius', 'border-bottom-left-radius',
  'outline', 'outline-width', 'outline-style', 'outline-color', 'outline-offset',
  'background', 'background-color', 'background-image', 'background-position',
  'background-size', 'background-repeat', 'background-attachment', 'background-origin',
  'background-clip', 'background-blend-mode',
  'color', 'font', 'font-family', 'font-size', 'font-weight', 'font-style',
  'font-variant', 'line-height', 'letter-spacing', 'text-align', 'text-decoration',
  'text-indent', 'text-transform', 'text-shadow', 'text-overflow', 'white-space',
  'word-break', 'word-spacing', 'word-wrap', 'overflow-wrap',
  'vertical-align', 'list-style', 'list-style-type', 'list-style-position',
  'table-layout', 'border-collapse', 'border-spacing', 'caption-side',
  'content', 'quotes', 'counter-increment', 'counter-reset',
  'opacity', 'filter', 'backdrop-filter', 'mix-blend-mode',
  'box-shadow', 'transform', 'transform-origin', 'transform-style', 'perspective', 'perspective-origin',
  'transition', 'transition-property', 'transition-duration', 'transition-timing-function', 'transition-delay',
  'animation', 'animation-name', 'animation-duration', 'animation-timing-function',
  'animation-delay', 'animation-iteration-count', 'animation-direction',
  'animation-fill-mode', 'animation-play-state',
  'cursor', 'pointer-events', 'user-select', 'resize', 'overflow', 'overflow-x', 'overflow-y',
  'clip-path', 'mask', 'mask-image', 'mask-size', 'mask-position', 'mask-repeat',
  'scroll-behavior', 'scroll-snap-type', 'scroll-snap-align',
  'will-change', 'contain', 'isolation',
];
