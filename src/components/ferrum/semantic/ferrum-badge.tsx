'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

const variantClasses: Record<string, string> = {
  default: 'bg-primary text-primary-foreground',
  success: 'bg-green-500/15 text-green-700 dark:text-green-400 border-green-500/20',
  warning: 'bg-yellow-500/15 text-yellow-700 dark:text-yellow-400 border-yellow-500/20',
  error: 'bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/20',
  info: 'bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/20',
};

interface FerrumBadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  pulse?: boolean;
  effect?: string;
  children: React.ReactNode;
}

export function FerrumBadge({
  variant = 'default',
  pulse = false,
  effect,
  children,
}: FerrumBadgeProps) {
  return (
    <span
      data-ferrum-badge
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium',
        variantClasses[variant],
        pulse && 'animate-pulse',
        effect,
      )}
    >
      {children}
    </span>
  );
}
