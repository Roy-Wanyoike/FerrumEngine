'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

const sideClasses: Record<string, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

interface FerrumTooltipProps {
  content: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  effect?: string;
  delay?: number;
  children: React.ReactNode;
}

export function FerrumTooltip({
  content,
  side = 'top',
  effect,
  delay = 150,
  children,
}: FerrumTooltipProps) {
  const [visible, setVisible] = React.useState(false);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  function show() {
    timerRef.current = setTimeout(() => setVisible(true), delay);
  }

  function hide() {
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    setVisible(false);
  }

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      data-ferrum-tooltip
    >
      {children}
      <div
        role="tooltip"
        className={cn(
          'absolute z-50 pointer-events-none px-3 py-1.5 text-xs rounded-md',
          'bg-popover text-popover-foreground border border-border shadow-md',
          'transition-all duration-150',
          visible ? 'opacity-100 visible' : 'opacity-0 invisible',
          sideClasses[side],
          effect,
        )}
      >
        {content}
      </div>
    </div>
  );
}
