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
const SITE_TAGLINE = "Frontend Intelligence & Reliability Engine";
const SITE_DESCRIPTION =
  "FerrumEngine: Application Graph, 7 Analyzers, Reliability Scoring, Change Impact Analysis, AI Agent Gateway — everything you need to engineer reliable frontends.";

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
    "frontend intelligence",
    "reliability engine",
    "application graph",
    "change impact analysis",
    "reliability scoring",
    "AI agent gateway",
    "architecture drift",
    "codebase intelligence",
    "flight recorder",
    "frontend observability",
    "frontend analyzers",
    "TypeScript",
    "frontend reliability",
  ],
  authors: [{ name: "FerrumEngine", url: SITE_URL }],
  creator: "FerrumEngine",
  publisher: "FerrumEngine",
  category: "technology",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
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
        url: "/og-image.png",
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
    images: ["/og-image.png"],
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
  description: "Frontend Intelligence & Reliability Engine — Application Graph, 7 Analyzers, Reliability Scoring, Change Impact, AI Agent Gateway.",
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
  name: "FerrumEngine Intelligence Engine",
  description: "7 Analyzers, Application Graph, Reliability Scoring, Change Impact Analysis, and more",
  numberOfItems: 7,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Application Graph", url: `${SITE_URL}/effects` },
    { "@type": "ListItem", position: 2, name: "7 Analyzers", url: `${SITE_URL}/effects` },
    { "@type": "ListItem", position: 3, name: "Reliability Scoring", url: `${SITE_URL}/effects` },
    { "@type": "ListItem", position: 4, name: "Change Impact", url: `${SITE_URL}/effects` },
    { "@type": "ListItem", position: 5, name: "AI Agent Gateway", url: `${SITE_URL}/effects` },
    { "@type": "ListItem", position: 6, name: "Flight Recorder", url: `${SITE_URL}/effects` },
    { "@type": "ListItem", position: 7, name: "Architecture Drift", url: `${SITE_URL}/effects` },
    { "@type": "ListItem", position: 8, name: "Codebase Intelligence", url: `${SITE_URL}/effects` },
    { "@type": "ListItem", position: 9, name: "Dependency Analysis", url: `${SITE_URL}/effects` },
    { "@type": "ListItem", position: 10, name: "Security Scanner", url: `${SITE_URL}/effects` },
    { "@type": "ListItem", position: 11, name: "Accessibility Audit", url: `${SITE_URL}/effects` },
    { "@type": "ListItem", position: 12, name: "Performance Profiler", url: `${SITE_URL}/effects` },
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
        <link rel="manifest" href="/manifest.json" />
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
