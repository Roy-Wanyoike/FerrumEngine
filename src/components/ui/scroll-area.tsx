"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  "aria-label"?: string
}

const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, children, "aria-label": ariaLabel, ...props }, ref) => (
    <div
      ref={ref}
      role="region"
      tabIndex={0}
      aria-label={ariaLabel}
      className={cn("overflow-y-auto", className)}
      {...props}
    >
      {children}
    </div>
  )
)
ScrollArea.displayName = "ScrollArea"

export { ScrollArea }
