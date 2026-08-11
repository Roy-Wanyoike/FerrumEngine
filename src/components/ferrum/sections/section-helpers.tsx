import React, { memo } from "react";

/** Shared Tailwind color class map for demo/showcase icon badges. */
export const showcaseColorMap: Record<string, string> = {
  purple: "border-purple-500/20 bg-purple-500/10 text-purple-400",
  sky: "border-sky-500/20 bg-sky-500/10 text-sky-400",
  emerald: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  rose: "border-rose-500/20 bg-rose-500/10 text-rose-400",
  amber: "border-amber-500/20 bg-amber-500/10 text-amber-400",
  pink: "border-pink-500/20 bg-pink-500/10 text-pink-400",
  blue: "border-blue-500/20 bg-blue-500/10 text-blue-400",
  violet: "border-violet-500/20 bg-violet-500/10 text-violet-400",
};

/* ═══════════════════════════════════════════════════════════════
   SECTION HELPERS
   Shared components to eliminate DRY violations across section files.
   Extracted patterns used by 3+ section files.
   ═══════════════════════════════════════════════════════════════ */

interface SectionHeaderProps {
  /** Uppercase tracking label shown above the title */
  label: string;
  /** Main heading — supports JSX for multi-line titles */
  title: React.ReactNode;
  /** Descriptive paragraph below the title */
  subtitle: string;
  /** Optional Lucide icon rendered in a purple badge beside the label */
  icon?: React.ElementType;
  /** Title font size variant — "sm" for inline sections, "default" for full pages */
  size?: "default" | "sm";
  /** Maximum width of the h1 element — use "none" to inherit from parent */
  maxWidth?: "3xl" | "4xl" | "none";
  /** Subtitle text opacity — most pages use 80, story/philosophy pages use 60 */
  subtitleOpacity?: "60" | "80";
}

/**
 * Standardized section header with staggered entrance animations.
 * Used by 9 section files: hall-of-fame, showcase-gallery, enterprise-components,
 * enterprise, learning-center, ferrum-principles, ferrum-story,
 * vision-manifesto, platform-architecture.
 *
 * Wrapped in React.memo — pure display component with no hooks;
 * prevents re-render when parent re-renders with unchanged props.
 */
export const SectionHeader = memo(function SectionHeader({
  label,
  title,
  subtitle,
  icon: Icon,
  size = "default",
  maxWidth = "3xl",
  subtitleOpacity = "80",
}: SectionHeaderProps) {
  const maxWidthCls = maxWidth === "4xl" ? "max-w-4xl" : maxWidth === "none" ? "" : "max-w-3xl";
  const h1Cls =
    size === "sm"
      ? `text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight ${maxWidthCls}`
      : `text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight ${maxWidthCls}`;

  const subtitleOpacityCls = subtitleOpacity === "60" ? "text-muted-foreground/60" : "text-muted-foreground/80";
  const subtitleCls = `text-lg ${subtitleOpacityCls} max-w-2xl leading-relaxed mt-5`;

  return (
    <>
      {/* Label */}
      <div className="animate-in fade-in-0 slide-in-from-bottom-3">
        {Icon ? (
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <Icon className="w-5 h-5 text-purple-400" />
            </div>
            <p className="ferrum-section-label text-xs font-semibold uppercase tracking-[0.15em] text-purple-400">
              {label}
            </p>
          </div>
        ) : (
          <p className="ferrum-section-label text-xs font-semibold uppercase tracking-[0.15em] text-purple-400 mb-4">
            {label}
          </p>
        )}
      </div>
      {/* Title */}
      <div
        className="animate-in fade-in-0 slide-in-from-bottom-3"
        style={{ animationDelay: "0.05s", animationFillMode: "both" }}
      >
        <h1 className={h1Cls}>{title}</h1>
      </div>
      {/* Subtitle */}
      <div
        className="animate-in fade-in-0 slide-in-from-bottom-3"
        style={{ animationDelay: "0.1s", animationFillMode: "both" }}
      >
        <p className={subtitleCls}>{subtitle}</p>
      </div>
    </>
  );
});
