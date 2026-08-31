/**
 * @module ferrum-studio/types
 * Core type definitions for the Ferrum Studio visual editor.
 * Defines the data model for projects, canvas elements, animation timelines,
 * design tokens, export targets, and responsive breakpoints.
 */

/** Supported element types on the studio canvas. */
export type ElementType =
  | 'box'
  | 'text'
  | 'image'
  | 'button'
  | 'card'
  | 'container'
  | 'custom';

/** A single element placed on the canvas. */
export interface CanvasElement {
  /** Unique element identifier. */
  id: string;
  /** The kind of element (box, text, image, etc.). */
  type: ElementType;
  /** Horizontal position in canvas pixels. */
  x: number;
  /** Vertical position in canvas pixels. */
  y: number;
  /** Width in pixels. */
  width: number;
  /** Height in pixels. */
  height: number;
  /** Rotation in degrees (0-360). */
  rotation: number;
  /** Stacking order — higher values render on top. */
  zIndex: number;
  /** Element-specific properties (e.g. text content, src URL). */
  props: Record<string, string | number>;
  /** Inline style overrides keyed by CSS property name. */
  styles: Record<string, string>;
  /** Optional nested children (used by container-type elements). */
  children?: CanvasElement[];
}

/** A single keyframe on the animation timeline. */
export interface TimelineKeyframe {
  /** Unique keyframe identifier. */
  id: string;
  /** The element this keyframe belongs to. */
  elementId: string;
  /** Time position in milliseconds. */
  time: number;
  /** CSS property values at this point in time. */
  properties: Record<string, string | number>;
  /** Easing function name (e.g. 'ease-in-out', 'cubic-bezier(...)'). */
  easing?: string;
}

/** Animation timeline attached to a project. */
export interface AnimationTimeline {
  /** Total duration in milliseconds. */
  duration: number;
  /** Ordered list of keyframes across all elements. */
  keyframes: TimelineKeyframe[];
  /** Whether the animation loops. */
  loop: boolean;
  /** Playback direction: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'. */
  direction: string;
}

/** Design token value types. */
export type TokenType =
  | 'color'
  | 'spacing'
  | 'typography'
  | 'border'
  | 'shadow'
  | 'opacity';

/** A single design token. */
export interface DesignToken {
  /** Unique token identifier. */
  id: string;
  /** Human-readable token name (e.g. 'primary-500'). */
  name: string;
  /** The token value (e.g. '#3b82f6', '16px'). */
  value: string;
  /** The kind of design token. */
  type: TokenType;
  /** Grouping category (e.g. 'colors', 'spacing', 'typography'). */
  category: string;
  /** Optional description for documentation. */
  description?: string;
}

/** Supported export output formats. */
export type ExportFormat = 'react' | 'vue' | 'svelte' | 'html' | 'css';

/** Export result containing generated code and asset references. */
export interface StudioExport {
  /** The target format. */
  format: ExportFormat;
  /** The generated source code. */
  code: string;
  /** Referenced asset identifiers. */
  assets: string[];
}

/** A responsive breakpoint definition. */
export interface Breakpoint {
  /** Human-readable name (e.g. 'mobile', 'tablet'). */
  name: string;
  /** Minimum viewport width in pixels (inclusive). */
  minWidth: number;
  /** Maximum viewport width in pixels (inclusive). Use Infinity for unbounded. */
  maxWidth: number;
  /** Whether this breakpoint is currently active for a given canvas width. */
  isActive: boolean;
}

/** Canvas configuration attached to a project. */
export interface CanvasConfig {
  /** Canvas width in pixels. */
  width: number;
  /** Canvas height in pixels. */
  height: number;
  /** Background color or CSS value. */
  background: string;
}

/** Top-level Studio project. */
export interface StudioProject {
  /** Unique project identifier. */
  id: string;
  /** Project name. */
  name: string;
  /** Optional project description. */
  description: string;
  /** Canvas configuration. */
  canvas: CanvasConfig;
  /** Elements on the canvas. */
  elements: CanvasElement[];
  /** Animation timeline. */
  timeline: AnimationTimeline;
  /** Design tokens. */
  tokens: DesignToken[];
  /** ISO 8601 creation timestamp. */
  createdAt: string;
  /** ISO 8601 last-modified timestamp. */
  updatedAt: string;
}
