// Maps tailwind color names → rgba values for AnimatedCard spotlight/glow
export const spotlightMap: Record<string, { spotlight: string; glow: string }> = {
  red:     { spotlight: "rgba(239, 68, 68, 0.06)",   glow: "rgba(239, 68, 68, 0.15)" },
  orange:  { spotlight: "rgba(249, 115, 22, 0.06)",  glow: "rgba(249, 115, 22, 0.15)" },
  amber:   { spotlight: "rgba(245, 158, 11, 0.06)",  glow: "rgba(245, 158, 11, 0.15)" },
  yellow:  { spotlight: "rgba(234, 179, 8, 0.06)",   glow: "rgba(234, 179, 8, 0.15)" },
  emerald: { spotlight: "rgba(16, 185, 129, 0.06)",  glow: "rgba(16, 185, 129, 0.15)" },
  green:   { spotlight: "rgba(34, 197, 94, 0.06)",   glow: "rgba(34, 197, 94, 0.15)" },
  teal:    { spotlight: "rgba(20, 184, 166, 0.06)",  glow: "rgba(20, 184, 166, 0.15)" },
  cyan:    { spotlight: "rgba(6, 182, 212, 0.06)",   glow: "rgba(6, 182, 212, 0.15)" },
  sky:     { spotlight: "rgba(14, 165, 233, 0.06)",  glow: "rgba(14, 165, 233, 0.15)" },
  blue:    { spotlight: "rgba(59, 130, 246, 0.06)",  glow: "rgba(59, 130, 246, 0.15)" },
  violet:  { spotlight: "rgba(139, 92, 246, 0.06)",  glow: "rgba(139, 92, 246, 0.15)" },
  purple:  { spotlight: "rgba(168, 85, 247, 0.06)",  glow: "rgba(168, 85, 247, 0.15)" },
  pink:    { spotlight: "rgba(236, 72, 153, 0.06)",  glow: "rgba(236, 72, 153, 0.15)" },
  rose:    { spotlight: "rgba(244, 63, 94, 0.06)",   glow: "rgba(244, 63, 94, 0.15)" },
  zinc:    { spotlight: "rgba(161, 161, 170, 0.04)", glow: "rgba(161, 161, 170, 0.10)" },
};