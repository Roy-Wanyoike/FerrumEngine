// Ferrum Semantic Components Tests
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  FerrumButton,
  FerrumCard,
  FerrumBadge,
  FerrumInput,
  FerrumToggle,
  FerrumAccordion,
  FerrumTooltip,
  FerrumSkeleton,
} from '@/components/ferrum/semantic';

describe('FerrumButton', () => {
  it('renders children', () => {
    render(<FerrumButton>Click</FerrumButton>);
    expect(screen.getByRole('button', { name: 'Click' })).toBeInTheDocument();
  });

  it('applies effect class', () => {
    render(<FerrumButton effect="roycss-glow">Click</FerrumButton>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('roycss-glow');
  });

  it('shows loading spinner', () => {
    render(<FerrumButton loading>Click</FerrumButton>);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    expect(btn.querySelector('svg')).toBeInTheDocument();
  });

  it('applies variant classes', () => {
    const { rerender } = render(<FerrumButton variant="ghost">G</FerrumButton>);
    expect(screen.getByRole('button').className).toContain('hover:bg-accent');
    rerender(<FerrumButton variant="destructive">D</FerrumButton>);
    expect(screen.getByRole('button').className).toContain('bg-destructive');
  });
});

describe('FerrumCard', () => {
  it('renders children', () => {
    render(<FerrumCard>Card content</FerrumCard>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies glass variant', () => {
    render(<FerrumCard variant="glass">Glass</FerrumCard>);
    const card = screen.getByText('Glass').closest('[data-ferrum-card]')!;
    expect(card.className).toContain('backdrop-blur');
  });

  it('applies padding', () => {
    render(<FerrumCard padding="lg">Padded</FerrumCard>);
    const card = screen.getByText('Padded').closest('[data-ferrum-card]')!;
    expect(card.className).toContain('p-8');
  });
});

describe('FerrumBadge', () => {
  it('renders children', () => {
    render(<FerrumBadge>Active</FerrumBadge>);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    render(<FerrumBadge variant="success">OK</FerrumBadge>);
    const badge = screen.getByText('OK').closest('[data-ferrum-badge]')!;
    expect(badge.className).toContain('green');
  });

  it('applies effect class', () => {
    render(<FerrumBadge effect="roycss-shimmer">Shimmer</FerrumBadge>);
    const badge = screen.getByText('Shimmer');
    expect(badge.className).toContain('roycss-shimmer');
  });

  it('applies pulse when true', () => {
    render(<FerrumBadge pulse>Pulse</FerrumBadge>);
    const badge = screen.getByText('Pulse');
    expect(badge.className).toContain('animate-pulse');
  });
});

describe('FerrumInput', () => {
  it('renders an input', () => {
    render(<FerrumInput />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('shows label', () => {
    render(<FerrumInput label="Email" />);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('shows error message', () => {
    render(<FerrumInput error="Required" />);
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('applies focus effect on focus', () => {
    render(<FerrumInput focusEffect="roycss-glow" />);
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    expect(input.className).toContain('roycss-glow');
    fireEvent.blur(input);
    expect(input.className).not.toContain('roycss-glow');
  });
});

describe('FerrumToggle', () => {
  it('renders a toggle button', () => {
    render(<FerrumToggle checked={false} onChange={() => {}} />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('calls onChange on click', () => {
    let val = false;
    render(<FerrumToggle checked={val} onChange={(v) => { val = v; }} />);
    fireEvent.click(screen.getByRole('switch'));
    expect(val).toBe(true);
  });

  it('shows label', () => {
    render(<FerrumToggle checked label="Dark Mode" onChange={() => {}} />);
    expect(screen.getByText('Dark Mode')).toBeInTheDocument();
  });
});

describe('FerrumAccordion', () => {
  const items = [
    { id: 'a', title: 'Item A', content: 'Content A' },
    { id: 'b', title: 'Item B', content: 'Content B' },
  ];

  it('renders all titles', () => {
    render(<FerrumAccordion items={items} />);
    expect(screen.getByText('Item A')).toBeInTheDocument();
    expect(screen.getByText('Item B')).toBeInTheDocument();
  });

  it('opens on click', () => {
    render(<FerrumAccordion items={items} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(buttons[0]);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
  });
});

describe('FerrumTooltip', () => {
  it('renders children', () => {
    render(<FerrumTooltip content="Tip">Hover me</FerrumTooltip>);
    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  it('shows tooltip on hover', async () => {
    vi.useFakeTimers();
    render(<FerrumTooltip content="Tip text" delay={0}>Trigger</FerrumTooltip>);
    const trigger = screen.getByText('Trigger');
    expect(screen.getByRole('tooltip').className).toContain('invisible');
    fireEvent.mouseEnter(trigger);
    await vi.advanceTimersByTimeAsync(10);
    expect(screen.getByRole('tooltip').className).toContain('visible');
    vi.useRealTimers();
  });
});

describe('FerrumSkeleton', () => {
  it('renders skeleton div', () => {
    render(<FerrumSkeleton />);
    const el = document.querySelector('[data-ferrum-skeleton]');
    expect(el).toBeInTheDocument();
  });

  it('applies effect class', () => {
    render(<FerrumSkeleton effect="roycss-shimmer" />);
    const el = document.querySelector('[data-ferrum-skeleton]')!;
    expect(el.className).toContain('roycss-shimmer');
  });

  it('applies variant', () => {
    render(<FerrumSkeleton variant="circular" width={40} height={40} />);
    const el = document.querySelector('[data-ferrum-skeleton]')!;
    expect(el.className).toContain('rounded-full');
    expect(el.style.width).toBe('40px');
  });
});
