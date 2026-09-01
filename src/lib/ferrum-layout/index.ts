/**
 * Ferrum Layout Engine — Public API.
 * 
 * Re-exports all layout utilities from the module's sub-files.
 */

// Types
export type {
  LayoutSystem,
  BreakpointConfig,
  BreakpointKey,
  ResponsiveValue,
  GridConfig,
  StackConfig,
  SidebarConfig,
  ContainerConfig,
  SpacingDirection,
  FlexDirection,
  AlignItems,
  JustifyContent,
  GapPreset,
} from './types';

// Breakpoints
export {
  BREAKPOINTS,
  getBreakpoint,
  resolveResponsiveValue,
  mediaQuery,
  useBreakpoint,
} from './breakpoints';

// Grid
export {
  GAP_PRESETS,
  gridClass,
  autoGridClass,
  gridTemplateColumns,
} from './grid';

// Stack
export {
  HStack,
  VStack,
  stackClass,
  stackStyle,
} from './stack';

// Container
export {
  CONTAINER_MAX_WIDTHS,
  containerClass,
  containerStyle,
} from './container';

// Sidebar
export {
  SIDEBAR_WIDTHS,
  sidebarLayoutClass,
  sidebarStyle,
} from './sidebar';

// Spacing
export {
  SPACING_SCALE,
  gap,
  margin,
  padding,
  resolveSpacing,
} from './spacing';
