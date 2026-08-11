import { SeoContent } from "@/components/ferrum/seo-content";
import { HomeLoader } from "./home-loader";

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
