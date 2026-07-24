import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FerrumEngine — Build Interfaces That Feel Alive",
  description:
    "FerrumEngine is the modern frontend engine that unifies motion, VFX, components, utilities, design tokens, and 8 framework adapters into one developer-first platform — helping you build fast, accessible, and production-ready interfaces with less code.",
  keywords: [
    "FerrumEngine",
    "CSS engine",
    "frontend engine",
    "motion platform",
    "CSS animations",
    "UI components",
    "design system",
    "web animations",
    "micro-interactions",
    "CSS utilities",
  ],
  authors: [{ name: "FerrumEngine" }],
  icons: {},
  openGraph: {
    title: "FerrumEngine — Build Interfaces That Feel Alive",
    description:
      "Build Interfaces That Feel Alive. The modern frontend engine that unifies motion, VFX, components, utilities, design tokens, and 8 framework adapters into one developer-first platform.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}