"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function TooltipProvider({ children }: { children: React.ReactNode }) {
  return children;
}

function Tooltip({ children, delayDuration: _delayDuration }: { children: React.ReactNode; delayDuration?: number }) {
  return <div className="relative inline-flex group">{children}</div>;
}

function TooltipTrigger({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("cursor-pointer", className)}>{children}</span>;
}

function TooltipContent({ children, className, side = "top" }: {
  children: React.ReactNode;
  className?: string;
  side?: "top" | "bottom" | "left" | "right";
}) {
  const sideClasses: Record<string, string> = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };
  return (
    <div
      role="tooltip"
      className={cn(
        "absolute z-50 pointer-events-none",
        "invisible opacity-0 group-hover:visible group-hover:opacity-100",
        "group-focus-within:visible group-focus-within:opacity-100",
        "transition-all duration-150",
        "px-3 py-1.5 text-xs rounded-md",
        "bg-popover text-popover-foreground border border-border shadow-md",
        sideClasses[side] || sideClasses.top,
        className
      )}
    >
      {children}
    </div>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
