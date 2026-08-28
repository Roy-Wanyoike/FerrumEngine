import { SeoContent } from "@/components/ferrum/seo-content";
import { HomeLoader } from "./home-loader";

/**
 * Override Next.js 16 auto-CSP to allow inline RSC scripts.
 * Next.js 16 generates script-src 'self' which blocks the inline
 * <script> tags that deliver RSC flight data, preventing hydration.
 */
export function headers() {
  return {
    "Content-Security-Policy":
      "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self' blob:; base-uri 'self'; form-action 'self'",
  };
}

/**
 * Server Component — Root page.
 *
 * Renders SEO content (visible to crawlers, hidden from interactive users)
 * BEFORE the client SPA hydrates. This ensures search engines and social
 * scrapers see meaningful content with the actual effect library, while
 * interactive users get the same dynamic SPA experience.
 *
 * HomeLoader is a tiny client boundary (~1KB) that lazy-loads the full
 * HomeClient SPA shell with ssr:false, removing it from the initial
 * page load JS.
 */
export default function Page() {
  return (
    <>
      <SeoContent />
      <HomeLoader />
    </>
  );
}
