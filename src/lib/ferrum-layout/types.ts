/**
 * Ferrum Layout Engine — TypeScript types for layout configurations.
 * 
 * Provides typed interfaces for grid, stack, sidebar, and container
 * layout patterns used throughout the Ferrum Layout utility module.
 */

/** Supported layout system types */
export type LayoutSystem = 'grid' | 'flex' | 'stack' | 'masonry' | 'sidebar';

/** Named breakpoint keys matching Tailwind's default scale */
export type BreakpointKey = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/** Breakpoint configuration map with pixel values */
export interface BreakpointConfig {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
}

/** A single static value or a map of breakpoint-specific values */
export type ResponsiveValue<T> = T | Partial<Record<BreakpointKey, T>>;

/** Gap preset name */
export type GapPreset = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/** Grid layout configuration */
export interface GridConfig {
  /** Number of columns (static or responsive) */
  cols: ResponsiveValue<number>;
  /** Gap between items (preset name or pixel value) */
  gap?: GapPreset | number;
  /** Minimum child width for auto-fit grid (in px) */
  minChildWidth?: number;
}

/** Flex direction */
export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';

/** Flex alignment values */
export type AlignItems = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
export type JustifyContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';

/** Stack (flexbox) layout configuration */
export interface StackConfig {
  /** Flex direction */
  direction?: FlexDirection;
  /** Gap between items (preset name or pixel value) */
  gap?: GapPreset | number;
  /** Cross-axis alignment */
  align?: AlignItems;
  /** Main-axis justification */
  justify?: JustifyContent;
  /** Whether items can wrap */
  wrap?: boolean;
  /** Reverse the item order */
  reverse?: boolean;
}

/** Sidebar layout configuration */
export interface SidebarConfig {
  /** Sidebar width in pixels or preset name */
  sidebarWidth?: number;
  /** Content area max-width */
  contentMaxWidth?: number | string;
  /** Whether sidebar can collapse */
  collapsible?: boolean;
}

/** Container configuration */
export interface ContainerConfig {
  /** Maximum width of the container (preset name or pixel/string value) */
  maxWidth?: number | string;
  /** Horizontal padding */
  padding?: number;
  /** Center the container horizontally */
  centered?: boolean;
}

/** Spacing direction shorthand */
export type SpacingDirection = 'all' | 'x' | 'y' | 'top' | 'right' | 'bottom' | 'left';
