// eslint-disable-next-line import/order
import { version } from "../../package.json";
// eslint-disable-next-line import/order
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./critical.css";
import "./globals.css";
import { DeferCSS } from "@/components/defer-css";
import { DeferredToaster } from "@/components/deferred-toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { SITE_URL } from "@/lib/constants";
import { WebVitalsReporter } from "@/lib/web-vitals";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_NAME = "FerrumEngine";
const SITE_TAGLINE = "The Universal UI Platform";
const SITE_DESCRIPTION =
  "FerrumEngine: 542+ CSS motion effects, 9 framework adapters, zero dependencies. The universal UI platform for motion, VFX, tokens & compiler optimization.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "FerrumEngine",
    "UI platform",
    "CSS engine",
    "motion platform",
    "CSS animations",
    "visual effects",
    "design system",
    "web animations",
    "micro-interactions",
    "Houdini Paint API",
    "framework agnostic",
    "design tokens",
    "React",
    "Vue",
    "Svelte",
    "Astro",
  ],
  authors: [{ name: "FerrumEngine", url: SITE_URL }],
  creator: "FerrumEngine",
  publisher: "FerrumEngine",
  category: "technology",
  icons: {
    icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImZnIiB4MT0iNCIgeTE9IjQiIHgyPSIyOCIgeTI9IjI4IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNhODU1ZjciLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZWM0ODk5Ii8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHJ4PSI4IiBmaWxsPSJ1cmwoI2ZnKSIvPgogIDxwYXRoIGQ9Ik0xMCAxMGgxMnYzSDEzdjNoN3YzaC03djNoOXYzSDEwVjEweiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC45NSIvPgo8L3N2Zz4=",
    shortcut: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImZnIiB4MT0iNCIgeTE9IjQiIHgyPSIyOCIgeTI9IjI4IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNhODU1ZjciLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZWM0ODk5Ii8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHJ4PSI4IiBmaWxsPSJ1cmwoI2ZnKSIvPgogIDxwYXRoIGQ9Ik0xMCAxMGgxMnYzSDEzdjNoN3YzaC03djNoOXYzSDEwVjEweiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC45NSIvPgo8L3N2Zz4=",
    apple: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImZnIiB4MT0iNCIgeTE9IjQiIHgyPSIyOCIgeTI9IjI4IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNhODU1ZjciLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZWM0ODk5Ii8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHJ4PSI4IiBmaWxsPSJ1cmwoI2ZnKSIvPgogIDxwYXRoIGQ9Ik0xMCAxMGgxMnYzSDEzdjNoN3YzaC03djNoOXYzSDEwVjEweiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC45NSIvPgo8L3N2Zz4=",
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — ${SITE_TAGLINE}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: ["/logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

// ─── JSON-LD Structured Data ─────────────────────────────────────────────
// Helps Google understand the site is a software product with structured
// metadata, improving search appearance and rich results.

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  description: SITE_DESCRIPTION,
  sameAs: ["https://github.com/roy-wanyoike/FerrumEngine"],
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
};

const softwareLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  url: SITE_URL,
  description: "The universal UI platform — 542+ CSS motion effects, 9 framework adapters, zero dependencies.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  version: version,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  license: "https://opensource.org/licenses/MIT",
  programmingLanguage: "TypeScript",
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Effects Gallery", item: `${SITE_URL}/effects` },
    { "@type": "ListItem", position: 3, name: "Playground", item: `${SITE_URL}/playground` },
    { "@type": "ListItem", position: 4, name: "Documentation", item: `${SITE_URL}/docs` },
    { "@type": "ListItem", position: 5, name: "Architecture", item: `${SITE_URL}/architecture` },
  { "@type": "ListItem", position: 6, name: "Enterprise", item: `${SITE_URL}/enterprise` },
  { "@type": "ListItem", position: 7, name: "Learning Center", item: `${SITE_URL}/learning` },
  ],
};

const itemListLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "FerrumEngine CSS Effects Library",
  description: "542+ production-ready CSS motion effects across 35 categories",
  numberOfItems: 542,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Entrance Animations", url: `${SITE_URL}/effects` },
    { "@type": "ListItem", position: 2, name: "Hover Effects", url: `${SITE_URL}/effects` },
    { "@type": "ListItem", position: 3, name: "Glass & Morphism", url: `${SITE_URL}/effects` },
    { "@type": "ListItem", position: 4, name: "Loading States", url: `${SITE_URL}/effects` },
    { "@type": "ListItem", position: 5, name: "Text Effects", url: `${SITE_URL}/effects` },
    { "@type": "ListItem", position: 6, name: "Background Effects", url: `${SITE_URL}/effects` },
    { "@type": "ListItem", position: 7, name: "Micro-interactions", url: `${SITE_URL}/effects` },
    { "@type": "ListItem", position: 8, name: "Scroll Animations", url: `${SITE_URL}/effects` },
    { "@type": "ListItem", position: 9, name: "3D Transforms", url: `${SITE_URL}/effects` },
    { "@type": "ListItem", position: 10, name: "Neon & Glow", url: `${SITE_URL}/effects` },
    { "@type": "ListItem", position: 11, name: "Layout Transitions", url: `${SITE_URL}/effects` },
    { "@type": "ListItem", position: 12, name: "Attention & Status", url: `${SITE_URL}/effects` },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/ferrum-effects.css" media="print" />
        <DeferCSS />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WebVitalsReporter />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <DeferredToaster />
        </ThemeProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.addEventListener("load",function(){if('serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js').catch(function(e){console.warn("[Ferrum] SW registration failed:",e)})}});`,
          }}
        />
      </body>
    </html>
  );
}
