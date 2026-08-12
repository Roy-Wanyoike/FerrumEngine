"use client";

import React, { useSyncExternalStore } from "react";

export interface FerrumLogoProps extends React.SVGAttributes<SVGElement> {
  /** Width/height in pixels; defaults to 32 */
  size?: number;
}

/**
 * Inline SVG logo — eliminates the network request for /logo.svg.
 *
 * Gradient IDs are prefixed with "fl-" (ferrum-logo) to avoid
 * collisions when multiple instances are rendered on the same page.
 *
 * SMIL animations are conditionally rendered based on prefers-reduced-motion.
 */

const hasMatchMedia = typeof window !== "undefined" && typeof window.matchMedia === "function";
const subscribe = (callback: () => void) => {
  if (!hasMatchMedia) return () => {};
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
};
const getSnapshot = () => hasMatchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false;
const getServerSnapshot = () => false;

export function FerrumLogo({ size = 32, className, ...rest }: FerrumLogoProps) {
  const prefersReducedMotion = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      fill="none"
      width={size}
      height={size}
      className={className}
      aria-label="FerrumEngine logo"
      {...rest}
    >
      <defs>
        <linearGradient
          id="fl-mark"
          x1="20"
          y1="20"
          x2="108"
          y2="108"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="40%" stopColor="#a855f7" />
          <stop offset="70%" stopColor="#d946ef" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
        <linearGradient
          id="fl-glow"
          x1="64"
          y1="10"
          x2="64"
          y2="118"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#a855f7" stopOpacity={0.15} />
          <stop offset="100%" stopColor="#f97316" stopOpacity={0.03} />
        </linearGradient>
        <linearGradient
          id="fl-inner-glow"
          x1="40"
          y1="30"
          x2="90"
          y2="100"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#a855f7" stopOpacity={0.12} />
          <stop offset="50%" stopColor="#d946ef" stopOpacity={0.06} />
          <stop offset="100%" stopColor="#f97316" stopOpacity={0.02} />
        </linearGradient>
        <clipPath id="fl-frame">
          <path d="M28 16 L100 16 L112 40 L112 88 L100 112 L28 112 L16 88 L16 40 Z" />
        </clipPath>
      </defs>

      {/* Octagonal frame */}
      <path
        d="M28 16 L100 16 L112 40 L112 88 L100 112 L28 112 L16 88 L16 40 Z"
        fill="url(#fl-glow)"
        stroke="url(#fl-mark)"
        strokeWidth={1.2}
        strokeLinejoin="round"
      />

      {/* Inner octagon echo */}
      <path
        d="M34 26 L98 26 L106 44 L106 84 L98 102 L34 102 L22 84 L22 44 Z"
        fill="none"
        stroke="url(#fl-mark)"
        strokeWidth={0.4}
        opacity={0.15}
        strokeLinejoin="round"
      />

      <g clipPath="url(#fl-frame)">
        {/* Core glow */}
        <circle cx="64" cy="64" r="36" fill="url(#fl-inner-glow)" />

        {/* Turbine blades */}
        <path
          d="M64 24 L70 56 L58 56 Z"
          fill="url(#fl-mark)"
          opacity={0.9}
        />
        <path
          d="M92 52 L62 58 L66 46 Z"
          fill="url(#fl-mark)"
          opacity={0.7}
        />
        <path
          d="M36 80 L62 66 L58 78 Z"
          fill="url(#fl-mark)"
          opacity={0.5}
        />

        {/* Central F */}
        <path
          d="M44 38h40v9H55v12h22v9H55v22h-11V38z"
          fill="url(#fl-mark)"
        />

        {/* Speed lines — SMIL only when user allows motion */}
        <line
          x1="86"
          y1="38"
          x2="96"
          y2="32"
          stroke="#f97316"
          strokeWidth={1.8}
          strokeLinecap="round"
          opacity={0.7}
        >
          {!prefersReducedMotion && (
            <animate
              attributeName="opacity"
              values="0.7;0.2;0.7"
              dur="2.5s"
              repeatCount="indefinite"
            />
          )}
        </line>
        <line
          x1="92"
          y1="50"
          x2="104"
          y2="48"
          stroke="#d946ef"
          strokeWidth={1.3}
          strokeLinecap="round"
          opacity={0.5}
        >
          {!prefersReducedMotion && (
            <animate
              attributeName="opacity"
              values="0.5;0.1;0.5"
              dur="3s"
              begin="0.4s"
              repeatCount="indefinite"
            />
          )}
        </line>
        <line
          x1="90"
          y1="62"
          x2="100"
          y2="64"
          stroke="#a855f7"
          strokeWidth={1}
          strokeLinecap="round"
          opacity={0.35}
        >
          {!prefersReducedMotion && (
            <animate
              attributeName="opacity"
              values="0.35;0.08;0.35"
              dur="2.8s"
              begin="0.8s"
              repeatCount="indefinite"
            />
          )}
        </line>

        {/* Orbital rings — SMIL only when user allows motion */}
        <circle
          cx="64"
          cy="64"
          r="48"
          fill="none"
          stroke="url(#fl-mark)"
          strokeWidth={0.5}
          strokeDasharray="3 12"
          opacity={0.2}
        >
          {!prefersReducedMotion && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 64 64"
              to="360 64 64"
              dur="40s"
              repeatCount="indefinite"
            />
          )}
        </circle>
        <circle
          cx="64"
          cy="64"
          r="38"
          fill="none"
          stroke="url(#fl-mark)"
          strokeWidth={0.35}
          strokeDasharray="2 18"
          opacity={0.12}
        >
          {!prefersReducedMotion && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="360 64 64"
              to="0 64 64"
              dur="30s"
              repeatCount="indefinite"
            />
          )}
        </circle>
      </g>

      {/* Corner accents */}
      <circle cx="28" cy="16" r="1.5" fill="#a855f7" opacity={0.6} />
      <circle cx="100" cy="16" r="1.5" fill="#d946ef" opacity={0.5} />
      <circle cx="112" cy="40" r="1" fill="#d946ef" opacity={0.4} />
      <circle cx="112" cy="88" r="1" fill="#f97316" opacity={0.4} />
      <circle cx="100" cy="112" r="1.5" fill="#f97316" opacity={0.5} />
      <circle cx="28" cy="112" r="1.5" fill="#f97316" opacity={0.4} />
      <circle cx="16" cy="88" r="1" fill="#a855f7" opacity={0.4} />
      <circle cx="16" cy="40" r="1" fill="#a855f7" opacity={0.5} />
    </svg>
  );
}
