"use client"
import * as React from "react"

/* Native <select> wrapper — compound pattern: <Select><SelectItem>...</SelectItem></Select> */
interface SelectProps {
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
  defaultValue?: string
  "aria-label"?: string
}

function Select({ value, onValueChange, children, defaultValue, "aria-label": ariaLabel }: SelectProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue || "")
  const currentValue = value ?? internalValue

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value
    setInternalValue(v)
    onValueChange?.(v)
  }

  // Extract option values from direct SelectItem children
  const options: { value: string; label: string }[] = []
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === SelectItem) {
      const props = child.props as { value: string; children: React.ReactNode }
      const label = typeof props.children === "string" ? props.children : String(props.children)
      options.push({ value: props.value, label })
    }
  })

  return (
    <select value={currentValue} onChange={handleChange} aria-label={ariaLabel} className="h-8 text-[11px] bg-foreground/[0.04] border-border rounded-lg px-2 w-full appearance-none cursor-pointer">
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  )
}

function SelectItem({ value: _value, children }: { value: string; children: React.ReactNode }) {
  return children;
}

export { Select, SelectItem }