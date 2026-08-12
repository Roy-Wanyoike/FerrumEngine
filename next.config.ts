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
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self' blob:;" },
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
