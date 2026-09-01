/**
 * T-C04 — Mega Menu Keyboard Navigation A11y Tests
 *
 * Tests that the DesktopMegaTrigger renders correct ARIA attributes,
 * toggles the panel on click, and processes keyboard events.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

// ─── Mocks ──────────────────────────────────────────────────────

// Mock the focus trap hook — the real hook attaches a document-level
// listener that can interfere with jsdom in tests.
vi.mock('@/hooks/use-focus-trap', () => ({
  useFocusTrap: vi.fn(),
}));

// Mock icon-resolver so we don't pull in all of lucide-react
vi.mock('@/lib/icon-resolver', () => ({
  resolveIcon: () =>
    function MockIcon() {
      return React.createElement('svg', { 'data-testid': 'mock-icon' });
    },
}));

import { DesktopMegaTrigger } from '@/components/ferrum/nav-mega-menu';
import type { MegaMenuGroup, ViewId } from '@/lib/types';

// ─── Test fixtures ──────────────────────────────────────────────

const mockGroups: MegaMenuGroup[] = [
  {
    heading: 'Core',
    items: [
      {
        icon: 'Cpu',
        label: 'Architecture',
        description: 'System design',
        view: 'architecture' as ViewId,
      },
      {
        icon: 'Sparkles',
        label: 'Effects',
        description: 'Visual effects',
        href: '/effects',
      },
    ],
  },
];

const defaultProps = {
  label: 'Platform',
  menuId: 'platform',
  groups: mockGroups,
  activeMenu: null as string | null,
  onNavigate: vi.fn(),
  onMenuEnter: vi.fn(),
  onMenuLeave: vi.fn(),
  onToggle: vi.fn(),
  allMenuIds: ['platform', 'effects'] as string[],
};

// ─── Tests ──────────────────────────────────────────────────────

describe('DesktopMegaTrigger — keyboard navigation a11y (T-C04)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the trigger button with correct ARIA attributes when closed', () => {
    render(React.createElement(DesktopMegaTrigger, defaultProps));

    const trigger = screen.getByRole('button', { name: /platform/i });
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-haspopup', 'true');
    expect(trigger).toHaveAttribute('aria-controls', 'mega-menu-panel-platform');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('sets aria-expanded to true when the menu is active', () => {
    const props = { ...defaultProps, activeMenu: 'platform' };
    render(React.createElement(DesktopMegaTrigger, props));

    const trigger = screen.getByRole('button', { name: /platform/i });
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('calls onToggle when the trigger button is clicked (closed → open)', () => {
    render(React.createElement(DesktopMegaTrigger, defaultProps));

    const trigger = screen.getByRole('button', { name: /platform/i });
    fireEvent.click(trigger);

    expect(defaultProps.onToggle).toHaveBeenCalledWith('platform');
    expect(defaultProps.onToggle).toHaveBeenCalledTimes(1);
  });

  it('calls onToggle when the trigger button is clicked (open → closed)', () => {
    const props = { ...defaultProps, activeMenu: 'platform' };
    render(React.createElement(DesktopMegaTrigger, props));

    const trigger = screen.getByRole('button', { name: /platform/i });
    fireEvent.click(trigger);

    expect(defaultProps.onToggle).toHaveBeenCalledWith('platform');
  });

  it('renders the panel with role="menu" and aria-label when open', () => {
    const props = { ...defaultProps, activeMenu: 'platform' };
    render(React.createElement(DesktopMegaTrigger, props));

    const menu = screen.getByRole('menu');
    expect(menu).toBeInTheDocument();
    expect(menu).toHaveAttribute('aria-label', 'platform menu');
  });

  it('renders menu items with role="menuitem" when open', () => {
    const props = { ...defaultProps, activeMenu: 'platform' };
    render(React.createElement(DesktopMegaTrigger, props));

    const items = screen.getAllByRole('menuitem');
    // Architecture (button) and Effects (anchor)
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent('Architecture');
    expect(items[1]).toHaveTextContent('Effects');
  });

  it('calls onToggle when ArrowDown is pressed on the closed trigger', () => {
    render(React.createElement(DesktopMegaTrigger, defaultProps));

    const trigger = screen.getByRole('button', { name: /platform/i });
    fireEvent.keyDown(trigger, { key: 'ArrowDown' });

    expect(defaultProps.onToggle).toHaveBeenCalledWith('platform');
  });

  it('calls onNavigate and onClose when a view menuitem button is clicked', () => {
    const props = {
      ...defaultProps,
      activeMenu: 'platform',
      onNavigate: vi.fn(),
    };
    render(React.createElement(DesktopMegaTrigger, props));

    // The Architecture item is a <button role="menuitem"> with view
    const archButton = screen.getByRole('menuitem', { name: /architecture/i });
    fireEvent.click(archButton);

    expect(props.onNavigate).toHaveBeenCalledWith('architecture');
    // onClose is passed as () => onToggle(menuId), so onToggle should be called
    expect(props.onToggle).toHaveBeenCalledWith('platform');
  });
});
