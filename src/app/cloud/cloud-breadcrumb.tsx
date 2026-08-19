"use client";

import { ArrowLeft } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

export function CloudBreadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span className="text-muted-foreground/60">/</span>}
          {item.onClick ? (
            <button
              onClick={item.onClick}
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-3 h-3" />{item.label}
            </button>
          ) : (
            <span className={i === items.length - 1 ? "text-muted-foreground" : "font-medium text-foreground"}>
              {item.label}
            </span>
          )}
        </span>
      ))}
    </div>
  );
}
