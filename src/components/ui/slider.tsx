"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

interface SliderProps {
  value: number[]
  onValueChange: (value: number[]) => void
  min?: number
  max?: number
  step?: number
  className?: string
  disabled?: boolean
  orientation?: "horizontal" | "vertical"
  "aria-label"?: string
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ value, onValueChange, min = 0, max = 100, step = 1, className, disabled, orientation = "horizontal", "aria-label": ariaLabel }, ref) => (
    <input
      ref={ref}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value[0]}
      onChange={(e) => onValueChange([Number(e.target.value)])}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value[0]}
      className={cn(
        "w-full cursor-pointer accent-purple-500",
        orientation === "vertical" && "h-full w-2",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    />
  )
)
Slider.displayName = "Slider"

export { Slider }
