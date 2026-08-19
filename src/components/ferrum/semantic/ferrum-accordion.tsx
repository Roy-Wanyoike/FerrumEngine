'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface FerrumAccordionProps {
  items: AccordionItem[];
  effect?: string;
  allowMultiple?: boolean;
  defaultOpen?: string[];
}

export function FerrumAccordion({
  items,
  effect,
  allowMultiple = false,
  defaultOpen = [],
}: FerrumAccordionProps) {
  const [openIds, setOpenIds] = React.useState<Set<string>>(
    () => new Set(defaultOpen),
  );

  function toggle(id: string) {
    setOpenIds((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="divide-y divide-border" data-ferrum-accordion>
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        return (
          <div key={item.id} className={cn('transition-all', effect)}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => toggle(item.id)}
              className="flex w-full items-center justify-between py-4 text-left font-medium"
            >
              <span>{item.title}</span>
              <svg
                className={cn(
                  'shrink-0 size-4 transition-transform duration-200',
                  isOpen && 'rotate-180',
                )}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div
              className={cn(
                'grid transition-all duration-200',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <div className="overflow-hidden">
                <div className="pb-4 text-sm text-muted-foreground">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
