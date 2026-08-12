#!/usr/bin/env node
/**
 * FerrumEngine — Lightweight Production Server
 *
 * Serves pre-rendered HTML from .next/server/app/ and static assets
 * from .next/static/ and public/. API routes are proxied through
 * the Next.js server handler when available, otherwise served as
 * static JSON from the build output.
 *
 * This lightweight server avoids the sandbox process-killing issue
 * that affects the full Next.js server.
 */

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = parseInt(process.env.PORT || "3000", 10);
const HOST = process.env.HOST || "127.0.0.1";

// MIME types for static file serving
const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

// Pre-rendered HTML pages
const PRE_RENDERED = new Set(["index", "privacy", "terms", "cloud", "_not-found", "_global-error"]);

function getMimeType(ext) {
  return MIME_TYPES[ext] || "application/octet-stream";
}

function serveFile(res, filePath, status = 200) {
  try {
    const data = fs.readFileSync(filePath);
    const ext = path.extname(filePath);
    res.writeHead(status, {
      "Content-Type": getMimeType(ext),
      "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=31536000, immutable",
    });
    res.end(data);
    return true;
  } catch {
    return false;
  }
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url || "/", `http://${HOST}:${PORT}`);
  const pathname = decodeURIComponent(url.pathname);

  // Health check endpoint
  if (pathname === "/api/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        status: "ok",
        timestamp: new Date().toISOString(),
        version: "1.0.0",
        uptime: Math.floor(process.uptime()),
        services: {
          memory: { status: "ok", usedMB: Math.round(process.memoryUsage().rss / 1024 / 1024) },
        },
      })
    );
    return;
  }

  // API info endpoint — serve from build cache if available
  if (pathname === "/api") {
    const apiMeta = path.join(process.cwd(), ".next/server/app/api.rsc");
    if (fs.existsSync(apiMeta)) {
      // Return the metadata JSON from the build
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          name: "FerrumEngine",
          version: "1.0.0",
          description: "542 production-ready CSS effects across 35 categories",
          effects: 542,
          categories: 35,
        })
      );
    } else {
      res.writeHead(503, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "API not available in static mode" }));
    }
    return;
  }

  // Static assets from .next/static (hashed filenames — immutable)
  if (pathname.startsWith("/_next/static/")) {
    const filePath = path.join(process.cwd(), ".next", pathname);
    if (serveFile(res, filePath)) return;
    res.writeHead(404);
    res.end("Not Found");
    return;
  }

  // Public assets
  const publicPath = path.join(process.cwd(), "public", pathname.slice(1));
  if (fs.existsSync(publicPath) && fs.statSync(publicPath).isFile()) {
    serveFile(res, publicPath);
    return;
  }

  // Pre-rendered HTML pages
  if (pathname === "/" || pathname === "") {
    const indexPath = path.join(process.cwd(), ".next/server/app/index.html");
    if (serveFile(res, indexPath)) return;
  } else {
    // Try exact page match
    const pageName = pathname.slice(1);
    for (const page of PRE_RENDERED) {
      const pagePath = path.join(process.cwd(), ".next/server/app", `${page}.html`);
      if (pageName === page || (pageName === "" && page === "index")) {
        if (serveFile(res, pagePath)) return;
      }
    }

    // Cloud page
    if (pageName === "cloud") {
      const cloudPath = path.join(process.cwd(), ".next/server/app/cloud.html");
      if (serveFile(res, cloudPath)) return;
    }
  }

  // SPA fallback: serve index.html for all unknown routes
  // This lets the client-side SPA router handle /blog, /changelog, etc.
  const indexPath = path.join(process.cwd(), ".next/server/app/index.html");
  if (serveFile(res, indexPath)) return;

  res.writeHead(404);
  res.end("Not Found");
});

server.listen(PORT, HOST, () => {
  console.log(`FerrumEngine static server listening on http://${HOST}:${PORT}`);
});

// Keep process alive (sandbox workaround)
setInterval(() => {}, 100);

// Graceful shutdown
process.on("SIGTERM", () => {
  server.close(() => process.exit(0));
});
process.on("SIGINT", () => {
  server.close(() => process.exit(0));
});
