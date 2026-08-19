'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

const variantClasses: Record<string, string> = {
  default: 'bg-card text-card-foreground border rounded-xl shadow-sm',
  glass:
    'backdrop-blur-lg bg-white/10 dark:bg-white/5 border border-white/20 rounded-xl shadow-lg',
  elevated: 'bg-card text-card-foreground rounded-xl shadow-xl border',
  outlined: 'bg-transparent border-2 border-border rounded-xl',
};

const paddingClasses: Record<string, string> = {
  none: '',
  sm: 'p-3',
  md: 'p-6',
  lg: 'p-8',
};

interface FerrumCardProps {
  variant?: 'default' | 'glass' | 'elevated' | 'outlined';
  hover?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export function FerrumCard({
  variant = 'default',
  hover,
  padding = 'md',
  children,
  className,
}: FerrumCardProps) {
  return (
    <div
      data-ferrum-card
      className={cn(
        'flex flex-col transition-all duration-200',
        variantClasses[variant],
        paddingClasses[padding],
        className,
      )}
      onMouseEnter={(e) => {
        if (hover) e.currentTarget.classList.add(...hover.split(' '));
      }}
      onMouseLeave={(e) => {
        if (hover) e.currentTarget.classList.remove(...hover.split(' '));
      }}
    >
      {children}
    </div>
  );
}
