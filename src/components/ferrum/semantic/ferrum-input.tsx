'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

const variantClasses: Record<string, string> = {
  default:
    'border border-input bg-background rounded-md',
  glass:
    'border border-white/20 backdrop-blur-lg bg-white/10 dark:bg-white/5 rounded-md',
  underline:
    'border-0 border-b-2 border-input bg-transparent rounded-none',
};

interface FerrumInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'glass' | 'underline';
  focusEffect?: string;
  label?: string;
  error?: string;
}

export function FerrumInput({
  variant = 'default',
  focusEffect,
  label,
  error,
  className,
  id,
  ...props
}: FerrumInputProps) {
  const inputId = id ?? React.useId();
  const [focused, setFocused] = React.useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'flex h-9 w-full min-w-0 px-3 py-1 text-sm transition-all outline-none',
          'placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
          'focus-visible:ring-2 focus-visible:ring-ring/50',
          variantClasses[variant],
          focused && focusEffect,
          error && 'border-destructive focus-visible:ring-destructive/50',
          className,
        )}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur?.(e);
        }}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
