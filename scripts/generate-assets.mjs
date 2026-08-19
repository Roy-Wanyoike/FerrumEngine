#!/usr/bin/env node
/**
 * generate-assets.mjs — Generates favicon PNGs, ICO, apple-touch-icon, and OG image
 * for FerrumEngine. Uses sharp (with rsvg + pango) to convert SVG → PNG and
 * compose the OG image programmatically.
 *
 * Usage: node /home/z/my-project/scripts/generate-assets.mjs
 */

import sharp from "sharp";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, "..");
const PUBLIC_DIR = join(PROJECT_ROOT, "public");

// ─── SVG Favicon source (same as public/favicon.svg) ───────────────────────
const FAVICON_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <defs>
    <linearGradient id="fg" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
      <stop stop-color="#a855f7"/>
      <stop offset="1" stop-color="#ec4899"/>
    </linearGradient>
  </defs>
  <rect width="32" height="32" rx="8" fill="url(#fg)"/>
  <path d="M10 10h12v3H13v3h7v3h-7v3h9v3H10V10z" fill="white" fill-opacity="0.95"/>
</svg>`;

/**
 * Create a PNG buffer from the favicon SVG at a given size.
 */
async function faviconToPng(size) {
  return sharp(Buffer.from(FAVICON_SVG))
    .resize(size, size)
    .png()
    .toBuffer();
}

/**
 * Build a valid ICO file containing 16x16 and 32x32 PNG images.
 * ICO format: header (6 bytes) + directory entries (16 bytes each) + image data.
 */
function buildIco(png16, png32) {
  const count = 2;
  const headerSize = 6;
  const dirSize = 16;
  const dirEnd = headerSize + dirSize * count;
  const dataOffset16 = dirEnd;
  const dataOffset32 = dirEnd + png16.length;

  const buf = Buffer.alloc(dirEnd + png16.length + png32.length);
  let off = 0;

  // ── ICONDIR header ──
  buf.writeUInt16LE(0, off); off += 2;       // Reserved
  buf.writeUInt16LE(1, off); off += 2;       // Type: 1 = ICO
  buf.writeUInt16LE(count, off); off += 2;   // Number of images

  // ── ICONDIRENTRY #1: 32x32 ──
  buf.writeUInt8(32, off); off += 1;         // Width
  buf.writeUInt8(32, off); off += 1;         // Height
  buf.writeUInt8(0, off); off += 1;          // Color palette
  buf.writeUInt8(0, off); off += 1;          // Reserved
  buf.writeUInt16LE(1, off); off += 2;       // Color planes
  buf.writeUInt16LE(32, off); off += 2;      // Bits per pixel
  buf.writeUInt32LE(png32.length, off); off += 4; // Size of image data
  buf.writeUInt32LE(dataOffset32, off); off += 4;  // Offset to image data

  // ── ICONDIRENTRY #2: 16x16 ──
  buf.writeUInt8(16, off); off += 1;
  buf.writeUInt8(16, off); off += 1;
  buf.writeUInt8(0, off); off += 1;
  buf.writeUInt8(0, off); off += 1;
  buf.writeUInt16LE(1, off); off += 2;
  buf.writeUInt16LE(32, off); off += 2;
  buf.writeUInt32LE(png16.length, off); off += 4;
  buf.writeUInt32LE(dataOffset16, off); off += 4;

  // ── Image data ──
  png32.copy(buf, dataOffset32);
  png16.copy(buf, dataOffset16);

  return buf;
}

/**
 * Generate the OG image (1200×630) with dark background, title, subtitle,
 * and the F logo icon.
 */
async function generateOgImage() {
  const W = 1200;
  const H = 630;

  // Build a full SVG as the OG image
  const ogSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <defs>
      <linearGradient id="og-fg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#a855f7"/>
        <stop offset="100%" stop-color="#ec4899"/>
      </linearGradient>
      <linearGradient id="og-bg-glow" x1="0%" y1="50%" x2="50%" y2="50%" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#a855f7" stop-opacity="0.15"/>
        <stop offset="100%" stop-color="#a855f7" stop-opacity="0"/>
      </linearGradient>
    </defs>

    <!-- Background -->
    <rect width="${W}" height="${H}" fill="#0a0a0a"/>

    <!-- Subtle radial glow -->
    <ellipse cx="200" cy="${H / 2}" rx="500" ry="350" fill="url(#og-bg-glow)"/>

    <!-- Decorative grid dots (subtle) -->
    <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
      <circle cx="20" cy="20" r="0.8" fill="rgba(255,255,255,0.07)"/>
    </pattern>
    <rect width="${W}" height="${H}" fill="url(#dots)"/>

    <!-- Logo icon (scaled up) -->
    <g transform="translate(80, 185) scale(5)">
      <rect width="32" height="32" rx="8" fill="url(#og-fg)"/>
      <path d="M10 10h12v3H13v3h7v3h-7v3h9v3H10V10z" fill="white" fill-opacity="0.95"/>
    </g>

    <!-- Title -->
    <text x="300" y="280" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="72" font-weight="700" fill="white" letter-spacing="-1.5">FerrumEngine</text>

    <!-- Subtitle -->
    <text x="300" y="345" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="32" font-weight="400" fill="#a855f7" letter-spacing="0.5">The Universal UI Platform</text>

    <!-- Bottom accent line -->
    <rect x="300" y="380" width="120" height="3" rx="1.5" fill="url(#og-fg)"/>

    <!-- Tagline -->
    <text x="300" y="430" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="20" font-weight="400" fill="rgba(255,255,255,0.45)" letter-spacing="0.3">542+ CSS motion effects · 9 framework adapters · Zero dependencies</text>

    <!-- Bottom right branding -->
    <text x="${W - 30}" y="${H - 30}" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="14" font-weight="400" fill="rgba(255,255,255,0.2)" text-anchor="end">ferrumengine.com</text>
  </svg>`;

  return sharp(Buffer.from(ogSvg))
    .resize(W, H)
    .png({ quality: 90 })
    .toBuffer();
}

// ─── Main ──────────────────────────────────────────────────────────────────
async function main() {
  console.log("📦 Generating FerrumEngine assets...");

  // 1. Generate PNG favicons
  const sizes = [
    { name: "icon-192.png", size: 192 },
    { name: "icon-512.png", size: 512 },
    { name: "apple-touch-icon.png", size: 180 },
  ];

  for (const { name, size } of sizes) {
    const buf = await faviconToPng(size);
    const outPath = join(PUBLIC_DIR, name);
    writeFileSync(outPath, buf);
    console.log(`  ✅ ${name} (${buf.length} bytes, ${size}×${size})`);
  }

  // 2. Generate ICO (16x16 + 32x32)
  const png16 = await faviconToPng(16);
  const png32 = await faviconToPng(32);
  const icoBuf = buildIco(png16, png32);
  writeFileSync(join(PUBLIC_DIR, "favicon.ico"), icoBuf);
  console.log(`  ✅ favicon.ico (${icoBuf.length} bytes, 16×16 + 32×32)`);

  // 3. Generate OG image
  const ogBuf = await generateOgImage();
  writeFileSync(join(PUBLIC_DIR, "og-image.png"), ogBuf);
  console.log(`  ✅ og-image.png (${ogBuf.length} bytes, 1200×630)`);

  console.log("\n🎉 All assets generated successfully!");
}

main().catch((err) => {
  console.error("❌ Asset generation failed:", err);
  process.exit(1);
});
