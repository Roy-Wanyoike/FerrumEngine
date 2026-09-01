// Comprehensive tests for Ferrum Layout Engine

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  // Breakpoints
  BREAKPOINTS,
  getBreakpoint,
  resolveResponsiveValue,
  mediaQuery,
  // Grid
  GAP_PRESETS,
  gridClass,
  autoGridClass,
  gridTemplateColumns,
  // Stack
  HStack,
  VStack,
  stackClass,
  stackStyle,
  // Container
  CONTAINER_MAX_WIDTHS,
  containerClass,
  containerStyle,
  // Sidebar
  SIDEBAR_WIDTHS,
  sidebarLayoutClass,
  sidebarStyle,
  // Spacing
  SPACING_SCALE,
  gap as spacingGap,
  margin,
  padding as spacingPadding,
  resolveSpacing,
} from '@/lib/ferrum-layout';

// ============================================================
// Breakpoint utilities
// ============================================================
describe('breakpoints', () => {
  describe('BREAKPOINTS constant', () => {
    it('has correct values', () => {
      expect(BREAKPOINTS.sm).toBe(640);
      expect(BREAKPOINTS.md).toBe(768);
      expect(BREAKPOINTS.lg).toBe(1024);
      expect(BREAKPOINTS.xl).toBe(1280);
      expect(BREAKPOINTS['2xl']).toBe(1536);
    });
  });

  describe('getBreakpoint', () => {
    it('returns "base" for widths below sm', () => {
      expect(getBreakpoint(0)).toBe('base');
      expect(getBreakpoint(100)).toBe('base');
      expect(getBreakpoint(639)).toBe('base');
    });

    it('returns "sm" at 640px', () => {
      expect(getBreakpoint(640)).toBe('sm');
      expect(getBreakpoint(767)).toBe('sm');
    });

    it('returns "md" at 768px', () => {
      expect(getBreakpoint(768)).toBe('md');
      expect(getBreakpoint(1023)).toBe('md');
    });

    it('returns "lg" at 1024px', () => {
      expect(getBreakpoint(1024)).toBe('lg');
      expect(getBreakpoint(1279)).toBe('lg');
    });

    it('returns "xl" at 1280px', () => {
      expect(getBreakpoint(1280)).toBe('xl');
      expect(getBreakpoint(1535)).toBe('xl');
    });

    it('returns "2xl" at 1536px', () => {
      expect(getBreakpoint(1536)).toBe('2xl');
      expect(getBreakpoint(9999)).toBe('2xl');
    });
  });

  describe('resolveResponsiveValue', () => {
    it('returns static value directly', () => {
      expect(resolveResponsiveValue(3, 'lg')).toBe(3);
      expect(resolveResponsiveValue('hello', 'md')).toBe('hello');
    });

    it('resolves responsive value at matching breakpoint', () => {
      const val = { sm: 2, md: 3, lg: 4 };
      expect(resolveResponsiveValue(val, 'md')).toBe(3);
      expect(resolveResponsiveValue(val, 'lg')).toBe(4);
    });

    it('falls back to nearest lower breakpoint', () => {
      const val = { sm: 2, lg: 4 };
      // At 'md', no 'md' key exists, so it falls back to 'sm'
      expect(resolveResponsiveValue(val, 'md')).toBe(2);
      // At 'lg', 'lg' key exists
      expect(resolveResponsiveValue(val, 'lg')).toBe(4);
    });

    it('returns undefined when no match found', () => {
      const val = { lg: 4 };
      expect(resolveResponsiveValue(val, 'sm')).toBeUndefined();
    });

    it('handles null input', () => {
      expect(resolveResponsiveValue(null, 'md')).toBe(null);
    });

    it('handles unknown breakpoint gracefully', () => {
      const val = { sm: 2 };
      expect(resolveResponsiveValue(val, 'unknown')).toBeUndefined();
    });
  });

  describe('mediaQuery', () => {
    it('generates correct media query for sm', () => {
      expect(mediaQuery('sm')).toBe('(min-width: 640px)');
    });

    it('generates correct media query for md', () => {
      expect(mediaQuery('md')).toBe('(min-width: 768px)');
    });

    it('generates correct media query for lg', () => {
      expect(mediaQuery('lg')).toBe('(min-width: 1024px)');
    });

    it('generates correct media query for xl', () => {
      expect(mediaQuery('xl')).toBe('(min-width: 1280px)');
    });

    it('generates correct media query for 2xl', () => {
      expect(mediaQuery('2xl')).toBe('(min-width: 1536px)');
    });

    it('returns empty string for unknown breakpoint', () => {
      expect(mediaQuery('unknown')).toBe('');
    });
  });
});

// ============================================================
// Grid utilities
// ============================================================
describe('grid', () => {
  describe('GAP_PRESETS', () => {
    it('has correct values', () => {
      expect(GAP_PRESETS.none).toBe(0);
      expect(GAP_PRESETS.xs).toBe(4);
      expect(GAP_PRESETS.sm).toBe(8);
      expect(GAP_PRESETS.md).toBe(16);
      expect(GAP_PRESETS.lg).toBe(24);
      expect(GAP_PRESETS.xl).toBe(32);
      expect(GAP_PRESETS['2xl']).toBe(48);
    });
  });

  describe('gridClass', () => {
    it('generates basic grid class', () => {
      const result = gridClass({ cols: 3 });
      expect(result).toContain('grid');
      expect(result).toContain('grid-cols-3');
    });

    it('includes gap preset', () => {
      const result = gridClass({ cols: 2, gap: 'md' });
      expect(result).toContain('gap-4');
    });

    it('includes numeric gap as arbitrary value', () => {
      const result = gridClass({ cols: 2, gap: 20 });
      expect(result).toContain('gap-[20px]');
    });

    it('includes gap: none', () => {
      const result = gridClass({ cols: 1, gap: 'none' });
      expect(result).toContain('gap-0');
    });

    it('handles auto-fit with minChildWidth', () => {
      const result = gridClass({ cols: 1, minChildWidth: 250 });
      expect(result).toContain('auto-grid-[250px]');
    });

    it('handles responsive cols with base value', () => {
      const result = gridClass({ cols: { base: 1, md: 3, lg: 4 } });
      expect(result).toContain('grid');
      expect(result).toContain('grid-cols-1');
      expect(result).toContain('md:grid-cols-3');
      expect(result).toContain('lg:grid-cols-4');
    });

    it('defaults to 1 col when responsive map has no base', () => {
      const result = gridClass({ cols: { md: 3, lg: 4 } });
      expect(result).toContain('grid-cols-1');
    });

    it('handles single column', () => {
      const result = gridClass({ cols: 1 });
      expect(result).toContain('grid-cols-1');
    });

    it('handles 12 columns', () => {
      const result = gridClass({ cols: 12 });
      expect(result).toContain('grid-cols-12');
    });
  });

  describe('autoGridClass', () => {
    it('generates auto-fit grid class', () => {
      const result = autoGridClass(250);
      expect(result).toContain('grid');
      expect(result).toContain('auto-grid-[250px]');
    });

    it('includes gap preset', () => {
      const result = autoGridClass(300, 'lg');
      expect(result).toContain('gap-6');
    });

    it('includes numeric gap', () => {
      const result = autoGridClass(200, 12);
      expect(result).toContain('gap-[12px]');
    });
  });

  describe('gridTemplateColumns', () => {
    it('generates CSS for static column count', () => {
      const result = gridTemplateColumns(3);
      expect(result.gridTemplateColumns).toBe('repeat(3, minmax(0, 1fr))');
    });

    it('generates CSS with breakpoint resolution', () => {
      const result = gridTemplateColumns({ sm: 2, md: 3, lg: 4 }, 'md');
      expect(result.gridTemplateColumns).toBe('repeat(3, minmax(0, 1fr))');
    });

    it('falls back through breakpoints', () => {
      const result = gridTemplateColumns({ sm: 2, lg: 4 }, 'md');
      // At 'md', no md key, falls back to 'sm' => 2
      expect(result.gridTemplateColumns).toBe('repeat(2, minmax(0, 1fr))');
    });

    it('defaults to 1 col when nothing matches', () => {
      const result = gridTemplateColumns({ lg: 4 }, 'sm');
      expect(result.gridTemplateColumns).toBe('repeat(1, minmax(0, 1fr))');
    });

    it('uses base value when no breakpoint given', () => {
      const result = gridTemplateColumns({ base: 2, lg: 4 });
      expect(result.gridTemplateColumns).toBe('repeat(2, minmax(0, 1fr))');
    });
  });
});

// ============================================================
// Stack utilities
// ============================================================
describe('stack', () => {
  describe('HStack preset', () => {
    it('has row direction', () => {
      expect(HStack.direction).toBe('row');
    });
    it('has center alignment', () => {
      expect(HStack.align).toBe('center');
    });
    it('has md gap', () => {
      expect(HStack.gap).toBe('md');
    });
  });

  describe('VStack preset', () => {
    it('has column direction', () => {
      expect(VStack.direction).toBe('column');
    });
    it('has md gap', () => {
      expect(VStack.gap).toBe('md');
    });
  });

  describe('stackClass', () => {
    it('generates horizontal stack', () => {
      const result = stackClass({ direction: 'row' });
      expect(result).toContain('flex');
      expect(result).toContain('flex-row');
    });

    it('generates vertical stack', () => {
      const result = stackClass({ direction: 'column' });
      expect(result).toContain('flex');
      expect(result).toContain('flex-col');
    });

    it('includes gap preset', () => {
      const result = stackClass({ direction: 'row', gap: 'lg' });
      expect(result).toContain('gap-6');
    });

    it('includes numeric gap as arbitrary value', () => {
      const result = stackClass({ direction: 'row', gap: 20 });
      expect(result).toContain('gap-[20px]');
    });

    it('includes alignment', () => {
      const result = stackClass({ direction: 'row', align: 'center' });
      expect(result).toContain('items-center');
    });

    it('includes justification', () => {
      const result = stackClass({ direction: 'row', justify: 'space-between' });
      expect(result).toContain('justify-between');
    });

    it('includes wrap', () => {
      const result = stackClass({ direction: 'row', wrap: true });
      expect(result).toContain('flex-wrap');
    });

    it('handles reverse row', () => {
      const result = stackClass({ direction: 'row', reverse: true });
      expect(result).toContain('flex-row-reverse');
    });

    it('handles reverse column', () => {
      const result = stackClass({ direction: 'column', reverse: true });
      expect(result).toContain('flex-column-reverse');
    });

    it('defaults to row direction', () => {
      const result = stackClass({});
      expect(result).toContain('flex-row');
    });

    it('handles full config', () => {
      const result = stackClass({
        direction: 'row',
        gap: 'sm',
        align: 'center',
        justify: 'space-between',
        wrap: true,
      });
      expect(result).toContain('flex');
      expect(result).toContain('flex-row');
      expect(result).toContain('gap-2');
      expect(result).toContain('items-center');
      expect(result).toContain('justify-between');
      expect(result).toContain('flex-wrap');
    });
  });

  describe('stackStyle', () => {
    it('generates display flex', () => {
      const result = stackStyle({});
      expect(result.display).toBe('flex');
    });

    it('sets flexDirection', () => {
      const result = stackStyle({ direction: 'column' });
      expect(result.flexDirection).toBe('column');
    });

    it('sets gap from preset', () => {
      const result = stackStyle({ gap: 'lg' });
      expect(result.gap).toBe('24px');
    });

    it('sets gap from number', () => {
      const result = stackStyle({ gap: 20 });
      expect(result.gap).toBe('20px');
    });

    it('sets alignItems', () => {
      const result = stackStyle({ align: 'flex-end' });
      expect(result.alignItems).toBe('flex-end');
    });

    it('sets justifyContent', () => {
      const result = stackStyle({ justify: 'center' });
      expect(result.justifyContent).toBe('center');
    });

    it('sets flexWrap', () => {
      const result = stackStyle({ wrap: true });
      expect(result.flexWrap).toBe('wrap');
    });

    it('handles reverse direction', () => {
      const result = stackStyle({ direction: 'row', reverse: true });
      expect(result.flexDirection).toBe('row-reverse');
    });
  });
});

// ============================================================
// Container utilities
// ============================================================
describe('container', () => {
  describe('CONTAINER_MAX_WIDTHS', () => {
    it('has correct values', () => {
      expect(CONTAINER_MAX_WIDTHS.sm).toBe(640);
      expect(CONTAINER_MAX_WIDTHS.md).toBe(768);
      expect(CONTAINER_MAX_WIDTHS.lg).toBe(1024);
      expect(CONTAINER_MAX_WIDTHS.xl).toBe(1280);
      expect(CONTAINER_MAX_WIDTHS['2xl']).toBe(1400);
      expect(CONTAINER_MAX_WIDTHS.full).toBe('100%');
    });
  });

  describe('containerClass', () => {
    it('generates default container', () => {
      const result = containerClass();
      expect(result).toContain('mx-auto');
      expect(result).toContain('px-4');
    });

    it('includes max-width preset', () => {
      const result = containerClass({ maxWidth: 'lg' });
      expect(result).toContain('max-w-screen-lg');
    });

    it('includes custom max-width as arbitrary value', () => {
      const result = containerClass({ maxWidth: 1200 });
      expect(result).toContain('max-w-[1200px]');
    });

    it('includes custom padding', () => {
      const result = containerClass({ padding: 24 });
      expect(result).toContain('px-6');
    });

    it('handles non-centered container', () => {
      const result = containerClass({ centered: false });
      expect(result).not.toContain('mx-auto');
    });

    it('handles 2xl preset', () => {
      const result = containerClass({ maxWidth: '2xl' });
      expect(result).toContain('max-w-[1400px]');
    });

    it('handles full width', () => {
      const result = containerClass({ maxWidth: 'full' });
      expect(result).toContain('max-w-full');
    });

    it('handles zero padding', () => {
      const result = containerClass({ padding: 0 });
      expect(result).toContain('px-0');
    });

    it('handles non-standard padding as arbitrary value', () => {
      const result = containerClass({ padding: 18 });
      expect(result).toContain('px-[18px]');
    });
  });

  describe('containerStyle', () => {
    it('generates default centered style', () => {
      const result = containerStyle();
      expect(result.marginLeft).toBe('auto');
      expect(result.marginRight).toBe('auto');
    });

    it('sets maxWidth from preset', () => {
      const result = containerStyle({ maxWidth: 'lg' });
      expect(result.maxWidth).toBe('1024px');
    });

    it('sets maxWidth from number', () => {
      const result = containerStyle({ maxWidth: 1200 });
      expect(result.maxWidth).toBe('1200px');
    });

    it('sets maxWidth from string', () => {
      const result = containerStyle({ maxWidth: '90%' });
      expect(result.maxWidth).toBe('90%');
    });

    it('sets padding', () => {
      const result = containerStyle({ padding: 24 });
      expect(result.paddingLeft).toBe('24px');
      expect(result.paddingRight).toBe('24px');
    });

    it('handles non-centered', () => {
      const result = containerStyle({ centered: false });
      expect(result.marginLeft).toBeUndefined();
      expect(result.marginRight).toBeUndefined();
    });
  });
});

// ============================================================
// Sidebar utilities
// ============================================================
describe('sidebar', () => {
  describe('SIDEBAR_WIDTHS', () => {
    it('has correct values', () => {
      expect(SIDEBAR_WIDTHS.sm).toBe(220);
      expect(SIDEBAR_WIDTHS.md).toBe(260);
      expect(SIDEBAR_WIDTHS.lg).toBe(300);
      expect(SIDEBAR_WIDTHS.xl).toBe(340);
    });
  });

  describe('sidebarLayoutClass', () => {
    it('returns flex row class', () => {
      const result = sidebarLayoutClass();
      expect(result).toBe('flex flex-row');
    });

    it('returns same class with config', () => {
      const result = sidebarLayoutClass({ sidebarWidth: 260 });
      expect(result).toBe('flex flex-row');
    });
  });

  describe('sidebarStyle', () => {
    it('generates default sidebar styles', () => {
      const result = sidebarStyle({});
      expect(result.sidebar.width).toBe('260px');
      expect(result.sidebar.flexShrink).toBe(0);
      expect(result.sidebar.minWidth).toBe('260px');
      expect(result.content.flex).toBe(1);
      expect(result.content.minWidth).toBe('0');
    });

    it('uses custom sidebar width', () => {
      const result = sidebarStyle({ sidebarWidth: 300 });
      expect(result.sidebar.width).toBe('300px');
      expect(result.sidebar.minWidth).toBe('300px');
    });

    it('uses preset sidebar width', () => {
      const result = sidebarStyle({ sidebarWidth: 'sm' as unknown as number });
      expect(result.sidebar.width).toBe('220px');
    });

    it('sets content max width', () => {
      const result = sidebarStyle({ contentMaxWidth: 800 });
      expect(result.content.maxWidth).toBe('800px');
    });

    it('sets content max width from string', () => {
      const result = sidebarStyle({ contentMaxWidth: '60%' });
      expect(result.content.maxWidth).toBe('60%');
    });

    it('does not set content max width by default', () => {
      const result = sidebarStyle({});
      expect(result.content.maxWidth).toBeUndefined();
    });
  });
});

// ============================================================
// Spacing utilities
// ============================================================
describe('spacing', () => {
  describe('SPACING_SCALE', () => {
    it('has correct standard values', () => {
      expect(SPACING_SCALE['0']).toBe(0);
      expect(SPACING_SCALE['1']).toBe(4);
      expect(SPACING_SCALE['2']).toBe(8);
      expect(SPACING_SCALE['4']).toBe(16);
      expect(SPACING_SCALE['6']).toBe(24);
      expect(SPACING_SCALE['8']).toBe(32);
      expect(SPACING_SCALE['12']).toBe(48);
      expect(SPACING_SCALE['16']).toBe(64);
      expect(SPACING_SCALE['24']).toBe(96);
    });

    it('has half-step values', () => {
      expect(SPACING_SCALE['0.5']).toBe(2);
      expect(SPACING_SCALE['1.5']).toBe(6);
      expect(SPACING_SCALE['2.5']).toBe(10);
      expect(SPACING_SCALE['3.5']).toBe(14);
    });
  });

  describe('gap', () => {
    it('converts to px string', () => {
      expect(spacingGap(16)).toBe('16px');
    });

    it('handles zero', () => {
      expect(spacingGap(0)).toBe('0px');
    });
  });

  describe('margin', () => {
    it('returns all-direction margin', () => {
      expect(margin(16)).toBe('16px');
    });

    it('returns top-only margin', () => {
      expect(margin(16, 'top')).toBe('16px 0 0 0');
    });

    it('returns right-only margin', () => {
      expect(margin(16, 'right')).toBe('0 16px 0 0');
    });

    it('returns bottom-only margin', () => {
      expect(margin(16, 'bottom')).toBe('0 0 16px 0');
    });

    it('returns left-only margin', () => {
      expect(margin(16, 'left')).toBe('0 0 0 16px');
    });

    it('returns x-axis margin', () => {
      expect(margin(8, 'x')).toBe('0 8px 0 8px');
    });

    it('returns y-axis margin', () => {
      expect(margin(8, 'y')).toBe('8px 0 8px 0');
    });

    it('defaults to "all" direction', () => {
      expect(margin(24, 'all')).toBe('24px');
    });
  });

  describe('padding', () => {
    it('returns all-direction padding', () => {
      expect(spacingPadding(16)).toBe('16px');
    });

    it('returns top-only padding', () => {
      expect(spacingPadding(16, 'top')).toBe('16px 0 0 0');
    });

    it('returns right-only padding', () => {
      expect(spacingPadding(16, 'right')).toBe('0 16px 0 0');
    });

    it('returns bottom-only padding', () => {
      expect(spacingPadding(16, 'bottom')).toBe('0 0 16px 0');
    });

    it('returns left-only padding', () => {
      expect(spacingPadding(16, 'left')).toBe('0 0 0 16px');
    });

    it('returns x-axis padding', () => {
      expect(spacingPadding(8, 'x')).toBe('0 8px 0 8px');
    });

    it('returns y-axis padding', () => {
      expect(spacingPadding(8, 'y')).toBe('8px 0 8px 0');
    });

    it('defaults to "all" direction', () => {
      expect(spacingPadding(24, 'all')).toBe('24px');
    });
  });

  describe('resolveSpacing', () => {
    it('resolves standard token', () => {
      expect(resolveSpacing('4')).toBe(16);
    });

    it('resolves half-step token', () => {
      expect(resolveSpacing('1.5')).toBe(6);
    });

    it('resolves zero token', () => {
      expect(resolveSpacing('0')).toBe(0);
    });

    it('resolves large token', () => {
      expect(resolveSpacing('24')).toBe(96);
    });

    it('returns null for unknown token', () => {
      expect(resolveSpacing('md')).toBeNull();
    });

    it('returns null for empty string', () => {
      expect(resolveSpacing('')).toBeNull();
    });
  });
});

// ============================================================
// useBreakpoint hook (needs special handling in test env)
// ============================================================
describe('useBreakpoint', () => {
  // Dynamic import to test the hook
  it('can be imported and is a function', async () => {
    const { useBreakpoint } = await import('@/lib/ferrum-layout');
    expect(typeof useBreakpoint).toBe('function');
  });
});

// ============================================================
// Edge cases
// ============================================================
describe('edge cases', () => {
  it('gridClass handles undefined gap', () => {
    const result = gridClass({ cols: 2 });
    expect(result).not.toContain('gap');
  });

  it('stackClass handles empty config', () => {
    const result = stackClass({});
    expect(result).toContain('flex');
    expect(result).toContain('flex-row');
  });

  it('containerClass handles no config', () => {
    const result = containerClass();
    expect(result).toContain('mx-auto');
  });

  it('sidebarStyle handles unknown width preset gracefully', () => {
    // Should fall back to default 260
    const result = sidebarStyle({ sidebarWidth: 'unknown' as unknown as number });
    expect(result.sidebar.width).toBe('260px');
  });

  it('resolveResponsiveValue handles empty object', () => {
    expect(resolveResponsiveValue({}, 'md')).toBeUndefined();
  });

  it('gridTemplateColumns with single number works', () => {
    const result = gridTemplateColumns(1);
    expect(result.gridTemplateColumns).toBe('repeat(1, minmax(0, 1fr))');
  });

  it('containerStyle with full preset', () => {
    const result = containerStyle({ maxWidth: 'full' });
    expect(result.maxWidth).toBe('100%');
  });

  it('spacing gap with negative value (edge case)', () => {
    // Negative gaps are valid CSS but unusual
    expect(spacingGap(-4)).toBe('-4px');
  });
});
