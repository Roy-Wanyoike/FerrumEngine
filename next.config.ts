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
  "component-catalog",
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
    /*
     * Content-Security-Policy is managed in src/middleware.ts.
     * Next.js 16 strips 'unsafe-inline' from script-src in config-level
     * headers, so CSP must be set from middleware to preserve it.
     *
     * style-src 'unsafe-inline' is required for Tailwind CSS runtime injection.
     * connect-src blob: is needed for client-side blob URL workers.
     */
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=(), ambient-light-sensor=(), autoplay=(), encrypted-media=(), picture-in-picture=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          /* Content-Security-Policy is set via middleware (src/middleware.ts)
           * to prevent Next.js 16 from stripping 'unsafe-inline' from script-src. */
          /* Cross-Origin headers — relaxed for preview proxy compatibility.
           * Re-enable same-origin for dedicated production deployments behind
           * your own reverse proxy where the origin is guaranteed. */
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
          { key: "Cross-Origin-Resource-Policy", value: "cross-origin" },
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
