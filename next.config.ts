import withBundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const SPA_ROUTES = [
  "principles",
  "architecture",
  "platform-architecture",
  "hall-of-fame",
  "showcase",
  "learning",
  "story",
  "enterprise",
  "enterprise-components",
  "vision",
  "effects",
  "docs",
  "playground",
  "community",
  "blog",
  "changelog",
  "interactive-docs",
];

const nextConfig: NextConfig = {
  /* ── Disable source maps in production (saves ~8MB) ── */
  productionBrowserSourceMaps: false,

  /* ── Remove X-Powered-By header for security ── */
  poweredByHeader: false,

  /* ── SPA Routes: rewrite all known client-side routes to / ── */
  async rewrites() {
    return SPA_ROUTES.map((route) => ({
      source: `/${route}`,
      destination: "/",
    }));
  },

  /* ── Security & Performance Headers ── */
  async headers() {
    const isDev = process.env.NODE_ENV === "development";

    /*
     * Content-Security-Policy
     * ────────────────────────────
     * WHY certain directives remain permissive:
     *
     * 1. script-src 'unsafe-inline' (DEV ONLY):
     *    Turbopack / Next.js HMR injects inline <script> tags for hot reloading.
     *    In development mode, 'unsafe-inline' is required. In production, scripts
     *    are bundled and can use strict 'self' — but Tailwind's JIT compiler
     *    in dev may still inject. Production CSP omits 'unsafe-inline'.
     *
     * 2. style-src 'unsafe-inline':
     *    Tailwind CSS generates styles at build time and injects them via
     *    <style> tags at runtime (especially in development). This is a
     *    well-known trade-off. For stricter CSP, you would need to hash
     *    all Tailwind style blocks and add 'sha256-...' tokens. This is
     *    documented here as accepted risk; replace with hashes in production
     *    if your threat model requires it.
     *
     * 3. connect-src 'self' blob:
     *    blob: is needed for client-side blob URL workers (e.g., pdf.js,
     *    chart rendering). Remove if your app doesn't use blob workers.
     *
     * 4. base-uri 'self' + form-action 'self':
     *    Prevents injection of <base> tags and restricts form submissions
     *    to same-origin only, mitigating phishing and form hijacking.
     */
    const scriptSrc = isDev
      ? "'self' 'unsafe-inline'"
      : "'self'";

    const csp = [
      "default-src 'self'",
      `script-src ${scriptSrc}`,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob:",
      "connect-src 'self' blob:",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; ");

    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=(), ambient-light-sensor=(), autoplay=(), encrypted-media=(), picture-in-picture=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Content-Security-Policy", value: csp },
          /* Cross-Origin headers — prevent Spectre-class attacks */
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
          /* Prevent Adobe crossdomain policy abuse */
          { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
        ],
      },
      {
        source: "/(.*)\\.(js|css|woff2|woff|ttf|otf|svg|png|jpg|jpeg|gif|webp|ico|avif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      /* ── Unified effect CSS — large file, SWR caching ── */
      {
        source: "/ferrum-effects.css",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
    ];
  },

  /* ── Image optimization ── */
  images: {
    formats: ["image/avif", "image/webp"],
  },

  /* ── Compiler optimizations ── */
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? {
      exclude: ["error", "warn"],
    } : false,
  },

  /* ── Experimental: optimize package imports ── */
  experimental: {
    optimizePackageImports: ["lucide-react", "sonner"],
  },

  reactStrictMode: true,
};

export default withAnalyzer(nextConfig);
