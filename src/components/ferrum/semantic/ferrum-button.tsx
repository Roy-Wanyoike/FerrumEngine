'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

const variantClasses: Record<string, string> = {
  primary: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
  secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  destructive:
    'bg-destructive text-white shadow-xs hover:bg-destructive/90',
  outline:
    'border border-input bg-background shadow-xs hover:bg-accent',
};

const sizeClasses: Record<string, string> = {
  sm: 'h-8 rounded-md gap-1.5 px-3 text-xs',
  md: 'h-9 rounded-md gap-2 px-4 py-2 text-sm',
  lg: 'h-10 rounded-md gap-2 px-6 text-base',
};

interface FerrumButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  effect?: string;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  asChild?: boolean;
}

export function FerrumButton({
  variant = 'primary',
  size = 'md',
  effect,
  loading = false,
  icon,
  iconPosition = 'left',
  asChild = false,
  className,
  children,
  disabled,
  ...props
}: FerrumButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      className={cn(
        'inline-flex items-center justify-center font-medium transition-all',
        'disabled:pointer-events-none disabled:opacity-50 outline-none',
        'focus-visible:ring-2 focus-visible:ring-ring/50',
        variantClasses[variant],
        sizeClasses[size],
        effect,
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin size-4"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
      )}
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </Comp>
  );
}
