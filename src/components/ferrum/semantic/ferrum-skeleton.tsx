'use client';

import { cn } from '@/lib/utils';

const variantClasses: Record<string, string> = {
  text: 'h-4 w-full rounded',
  circular: 'rounded-full',
  rectangular: 'rounded-md',
};

interface FerrumSkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  effect?: string;
  className?: string;
}

export function FerrumSkeleton({
  variant = 'text',
  width,
  height,
  effect,
  className,
}: FerrumSkeletonProps) {
  return (
    <div
      data-ferrum-skeleton
      aria-hidden="true"
      className={cn(
        'bg-accent animate-pulse',
        variantClasses[variant],
        effect,
        className,
      )}
      style={{
        width: width != null ? (typeof width === 'number' ? `${width}px` : width) : undefined,
        height: height != null ? (typeof height === 'number' ? `${height}px` : height) : undefined,
      }}
    />
  );
}
