// Type-strict compliance: fixed noUncheckedIndexedAccess
"use client";

import { Sun, Moon, Monitor, Check } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState, useCallback, useRef, memo } from "react";

type ThemeMode = "dark" | "light" | "system";

const modes: ThemeMode[] = ["dark", "light", "system"];

const icons: Record<ThemeMode, React.ReactNode> = {
  light: <Sun className="w-[18px] h-[18px]" />,
  dark: <Moon className="w-[18px] h-[18px]" />,
  system: <Monitor className="w-[18px] h-[18px]" />,
};

const labels: Record<ThemeMode, string> = {
  light: "Light mode",
  dark: "Dark mode",
  system: "System theme",
};

const dropdownOptions = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

export interface ThemeToggleProps {
  className?: string;
  /** When "dropdown", renders a 3-option dropdown menu (Light/Dark/System).
   *  When "cycle" (default), renders a single cycle button. */
  variant?: "cycle" | "dropdown";
}

export const ThemeToggle = memo(function ThemeToggle({ className, variant = "cycle" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  /* ─── Shared callbacks (before any conditional returns) ─── */
  const cycle = useCallback(() => {
    const current: ThemeMode =
      theme === "light" || theme === "dark" || theme === "system"
        ? theme
        : "dark";
    const next = modes[(modes.indexOf(current) + 1) % modes.length]!;
    setTheme(next);
  }, [theme, setTheme]);

  /* ─── Dropdown variant state ─── */
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (variant !== "dropdown" || !open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const opts = ["light", "dark", "system"];
        const idx = opts.indexOf(theme ?? "dark");
        const next = e.key === "ArrowDown"
          ? opts[(idx + 1) % 3]!
          : opts[(idx - 1 + 3) % 3]!;
        setTheme(next);
        setOpen(false);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [variant, open, theme, setTheme]);

  // Cleanup pending hover timeout on unmount
  useEffect(() => { return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }; }, []);

  if (variant === "dropdown") {
    const currentIcon = theme === "light" ? Sun : theme === "dark" ? Moon : Monitor;

    return (
      <div ref={ref} className="relative">
        <button
          onClick={() => setOpen(!open)}
          onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); setOpen(true); }}
          onMouseLeave={() => { timeoutRef.current = setTimeout(() => setOpen(false), 200); }}
          className={`flex items-center justify-center w-[44px] h-[44px] rounded-lg text-muted-foreground/50 hover:text-foreground hover:bg-foreground/[0.04] transition-colors ${className ?? ""}`}
          title="Toggle theme"
          aria-expanded={open}
          aria-haspopup="menu"
        >
          {currentIcon === Sun && <Sun className="w-4 h-4" />}
          {currentIcon === Moon && <Moon className="w-4 h-4" />}
          {currentIcon === Monitor && <Monitor className="w-4 h-4" />}
          <span className="sr-only">Toggle theme</span>
        </button>

        {open && (
          <div
            role="menu"
            aria-label="Theme options"
            className="absolute right-0 top-full mt-2 w-36 rounded-xl border border-border bg-background/95 backdrop-blur-2xl shadow-xl shadow-background/30 overflow-hidden z-[60] py-1"
            onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
            onMouseLeave={() => { timeoutRef.current = setTimeout(() => setOpen(false), 200); }}
          >
            {dropdownOptions.map((opt) => {
              const Icon = opt.icon;
              const isActive = theme === opt.value;
              return (
                <button
                  key={opt.value}
                  role="menuitem"
                  onClick={() => { setTheme(opt.value); setOpen(false); }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-medium transition-colors ${
                    isActive
                      ? "text-foreground bg-foreground/[0.06]"
                      : "text-muted-foreground/60 hover:text-foreground hover:bg-foreground/[0.03]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {opt.label}
                  {isActive && <Check className="w-3.5 h-3.5 ml-auto text-purple-400" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  /* ─── Cycle variant (default) ─── */

  if (!mounted) {
    // Return a placeholder to prevent layout shift
    return (
      <button
        className={`flex items-center gap-1.5 px-3 py-[13px] rounded-lg text-sm text-muted-foreground transition-all border border-border opacity-0 min-h-[44px] ${className ?? ""}`}
        aria-hidden
      >
        <Moon className="w-[18px] h-[18px]" />
      </button>
    );
  }

  const currentMode: ThemeMode =
    theme === "light" || theme === "dark" || theme === "system"
      ? theme
      : "dark";

  return (
    <button
      onClick={cycle}
      className={`flex items-center gap-1.5 px-3 py-[13px] rounded-lg text-sm text-muted-foreground hover:text-foreground/80 hover:bg-foreground/[0.06] transition-all border border-border min-h-[44px] ${className ?? ""}`}
      title={`Current: ${labels[currentMode]} — click to switch`}
      aria-label={labels[currentMode]}
    >
      <span className="relative flex items-center justify-center w-[18px] h-[18px]">
        {modes.map((mode) => (
          <span
            key={mode}
            className="absolute inset-0 flex items-center justify-center transition-all duration-200"
            style={{
              opacity: currentMode === mode ? 1 : 0,
              transform: currentMode === mode ? "scale(1) rotate(0deg)" : "scale(0.5) rotate(-90deg)",
              pointerEvents: currentMode === mode ? "auto" : "none",
            }}
          >
            {icons[mode]}
          </span>
        ))}
      </span>
      <span className="hidden sm:inline">{labels[currentMode]}</span>
    </button>
  );
});
