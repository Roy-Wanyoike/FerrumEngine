'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

const sizeMap = {
  sm: { track: 'h-5 w-9', thumb: 'size-3.5', translate: 'translate-x-4' },
  md: { track: 'h-6 w-11', thumb: 'size-4', translate: 'translate-x-5' },
  lg: { track: 'h-7 w-14', thumb: 'size-5', translate: 'translate-x-7' },
};

interface FerrumToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
  effect?: string;
  label?: string;
  disabled?: boolean;
}

export function FerrumToggle({
  checked,
  onChange,
  size = 'md',
  effect,
  label,
  disabled = false,
}: FerrumToggleProps) {
  const s = sizeMap[size];
  const toggleId = React.useId();

  return (
    <div className="flex items-center gap-2">
      {label && (
        <label htmlFor={toggleId} className="text-sm font-medium cursor-pointer">
          {label}
        </label>
      )}
      <button
        id={toggleId}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        className={cn(
          'relative inline-flex shrink-0 items-center rounded-full transition-colors duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
          'disabled:cursor-not-allowed disabled:opacity-50',
          checked ? 'bg-primary' : 'bg-input',
          s.track,
          effect,
        )}
        onClick={() => onChange(!checked)}
      >
        <span
          className={cn(
            'inline-block rounded-full bg-white shadow-sm transition-transform duration-200',
            s.thumb,
            checked ? s.translate : 'translate-x-0.5',
          )}
        />
      </button>
    </div>
  );
}
