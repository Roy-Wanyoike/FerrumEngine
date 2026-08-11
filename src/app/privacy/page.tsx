import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SITE_URL } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — FerrumEngine",
  description:
    "FerrumEngine privacy policy: how we collect, use, and protect your information when you use our open-source CSS motion effects platform.",
  alternates: {
    canonical: "/privacy",
    languages: { "en-US": "/privacy" },
  },
  openGraph: {
    title: "Privacy Policy — FerrumEngine",
    description:
      "FerrumEngine privacy policy: how we collect, use, and protect your information.",
    url: `${SITE_URL}/privacy`,
  },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="max-w-4xl mx-auto w-full px-6 sm:px-8 py-12 sm:py-20">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground/60 hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to FerrumEngine
        </Link>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-muted-foreground/60">
            Last updated: July 2025
          </p>
        </header>

        {/* Content */}
        <article className="space-y-10 text-sm text-muted-foreground/80 leading-relaxed">
          {/* Introduction */}
          <section>
            <p>
              FerrumEngine (“we,” “our,” or “the project”) respects your privacy.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your
              information when you visit our website, use our open-source software, or interact
              with any of our services. Please read this policy carefully. By using FerrumEngine,
              you agree to the practices described herein.
            </p>
          </section>

          {/* 1 */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              1. Information We Collect
            </h2>
            <p className="mb-3">
              FerrumEngine is primarily an open-source software project distributed under the MIT
              License. Our website and services are designed to minimize data collection. We may
              collect the following categories of information:
            </p>
            <h3 className="text-sm font-semibold text-foreground mt-5 mb-2">
              1.1 Information You Provide Voluntarily
            </h3>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                <strong className="text-foreground/90">Feedback and bug reports</strong> submitted
                through GitHub Issues, email, or any feedback form on our website.
              </li>
              <li>
                <strong className="text-foreground/90">Contact information</strong> when you reach
                out via email or contact forms.
              </li>
              <li>
                <strong className="text-foreground/90">User-generated content</strong> such as
                code snippets, configurations, or usage examples shared in community forums or
                issue trackers.
              </li>
            </ul>
            <h3 className="text-sm font-semibold text-foreground mt-5 mb-2">
              1.2 Automatically Collected Information
            </h3>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                <strong className="text-foreground/90">Log data</strong> including IP address,
                browser type, operating system, referring URL, pages visited, and timestamps.
              </li>
              <li>
                <strong className="text-foreground/90">Device information</strong> such as screen
                resolution, device type, and browser capabilities.
              </li>
              <li>
                <strong className="text-foreground/90">Usage analytics</strong> aggregated to
                understand how visitors interact with our documentation and tools (e.g., which
                effects are most viewed, playground usage patterns).
              </li>
            </ul>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              2. How We Use Your Information
            </h2>
            <p className="mb-3">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                <strong className="text-foreground/90">Improving the project</strong> —
                Understanding usage patterns helps us prioritize features, fix bugs, and optimize
                performance.
              </li>
              <li>
                <strong className="text-foreground/90">Providing support</strong> — Responding
                to inquiries, bug reports, and feedback submitted through our channels.
              </li>
              <li>
                <strong className="text-foreground/90">Security</strong> — Detecting and
                preventing abuse, unauthorized access, and security threats to our infrastructure.
              </li>
              <li>
                <strong className="text-foreground/90">Communication</strong> — Sending
                relevant project updates, security advisories, or response to your inquiries. We
                do not send marketing emails.
              </li>
              <li>
                <strong className="text-foreground/90">Analytics</strong> — Generating
                aggregate, anonymized reports about website traffic and usage trends.
              </li>
            </ul>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              3. Cookies and Tracking Technologies
            </h2>
            <p className="mb-3">
              Our website may use the following technologies:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                <strong className="text-foreground/90">Essential cookies</strong> — Required
                for basic site functionality, such as theme preference (dark/light mode) persistence.
                These cannot be disabled.
              </li>
              <li>
                <strong className="text-foreground/90">Analytics cookies</strong> — Used to
                collect anonymized usage data. We respect “Do Not Track” browser signals and do
                not use third-party advertising trackers.
              </li>
              <li>
                <strong className="text-foreground/90">Local storage</strong> — The playground
                and documentation may store preferences and session data in your browser’s local
                storage. This data never leaves your device.
              </li>
            </ul>
            <p className="mt-3">
              We do not use tracking pixels, browser fingerprinting, or sell data to advertising
              networks.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              4. Data Storage and Security
            </h2>
            <p className="mb-3">
              Data collected through our website is stored on secure infrastructure. We implement
              reasonable technical and organizational measures to protect your information,
              including:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>HTTPS/TLS encryption for all data in transit.</li>
              <li>Access controls limiting data access to authorized personnel only.</li>
              <li>Regular security reviews of our infrastructure and dependencies.</li>
              <li>Minimal data retention — we only keep data for as long as necessary.</li>
            </ul>
            <p className="mt-3">
              The FerrumEngine open-source codebase itself runs entirely in your browser or your
              build pipeline. We do not collect, transmit, or store any data generated by your
              local use of the FerrumEngine library, compiler, or playground.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              5. Third-Party Services
            </h2>
            <p className="mb-3">
              Our website may integrate with the following third-party services, each with their
              own privacy practices:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                <strong className="text-foreground/90">GitHub</strong> — Source code hosting,
                issue tracking, and community discussions. Subject to GitHub’s Privacy Policy.
              </li>
              <li>
                <strong className="text-foreground/90">CDN providers</strong> — Delivering
                static assets. These providers may log access requests in accordance with their own
                privacy policies.
              </li>
              <li>
                <strong className="text-foreground/90">Analytics providers</strong> — If
                analytics are enabled, data is processed in anonymized form. We select providers
                that comply with applicable data protection regulations.
              </li>
            </ul>
            <p className="mt-3">
              We do not sell, rent, or trade your personal information to any third party for
              marketing purposes.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              6. Your Rights
            </h2>
            <p className="mb-3">
              Depending on your jurisdiction, you may have the following rights regarding your
              personal data:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                <strong className="text-foreground/90">Access</strong> — Request a copy of
                the personal data we hold about you.
              </li>
              <li>
                <strong className="text-foreground/90">Correction</strong> — Request
                correction of inaccurate or incomplete data.
              </li>
              <li>
                <strong className="text-foreground/90">Deletion</strong> — Request deletion
                of your personal data, subject to legal retention requirements.
              </li>
              <li>
                <strong className="text-foreground/90">Objection</strong> — Object to the
                processing of your data for specific purposes.
              </li>
              <li>
                <strong className="text-foreground/90">Data portability</strong> — Request
                your data in a structured, machine-readable format.
              </li>
              <li>
                <strong className="text-foreground/90">Withdrawal of consent</strong> —
                Withdraw consent where processing is based on your consent.
              </li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, please contact us using the information provided at
              the end of this policy. We will respond to all legitimate requests within 30 days.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              7. Children’s Privacy
            </h2>
            <p>
              FerrumEngine is a developer tool and is not directed at children under the age of 13.
              We do not knowingly collect personal information from children. If we become aware
              that we have collected personal data from a child, we will take steps to delete it
              promptly.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              8. International Data Transfers
            </h2>
            <p>
              Our infrastructure may be located in jurisdictions different from your own. By using
              our website, you acknowledge that your data may be transferred to and processed in
              other jurisdictions. We take appropriate safeguards to ensure your data receives an
              adequate level of protection.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              9. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. When we do, we will revise the
              “Last updated” date at the top of this page. We encourage you to review this
              policy periodically. Continued use of our website after changes are posted constitutes
              your acceptance of the revised policy.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              10. Contact Us
            </h2>
            <p className="mb-3">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our
              data practices, please contact us:
            </p>
            <ul className="list-none space-y-1.5 pl-0">
              <li>
                <strong className="text-foreground/90">GitHub:</strong>{" "}
                <a
                  href="https://github.com/roy-wanyoike/FerrumEngine/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground/80 hover:text-foreground underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-muted-foreground/60 transition-colors"
                >
                  Open an issue on our repository
                </a>
              </li>
              <li>
                <strong className="text-foreground/90">Email:</strong>{" "}
                Reach out via the GitHub repository contact methods.
              </li>
            </ul>
          </section>
        </article>

        {/* Footer spacer for sticky footer */}
        <div className="flex-1 min-h-16" />
      </div>
    </main>
  );
}
