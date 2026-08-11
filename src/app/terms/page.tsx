import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SITE_URL } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — FerrumEngine",
  description:
    "FerrumEngine terms of service: MIT-licensed open-source CSS motion effects platform. Understand your rights and obligations.",
  alternates: {
    canonical: "/terms",
    languages: { "en-US": "/terms" },
  },
  openGraph: {
    title: "Terms of Service — FerrumEngine",
    description:
      "FerrumEngine terms of service: MIT-licensed open-source CSS motion effects platform.",
    url: `${SITE_URL}/terms`,
  },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
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
            Terms of Service
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
              Welcome to FerrumEngine. These Terms of Service (“Terms") govern your access to and
              use of our website, documentation, tools, and services (collectively, the “Service”
              or “Services”). By accessing or using FerrumEngine, you agree to be bound by these
              Terms. If you do not agree, please do not use our Services.
            </p>
          </section>

          {/* 1 */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing the FerrumEngine website, downloading or using the FerrumEngine software,
              or interacting with any of our services, you acknowledge that you have read,
              understood, and agree to be bound by these Terms of Service and our{" "}
              <Link
                href="/privacy"
                className="text-muted-foreground/80 hover:text-foreground underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-muted-foreground/60 transition-colors"
              >
                Privacy Policy
              </Link>
              . These Terms apply to all visitors, users, and others who access or use the Service.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              2. Open-Source License (MIT)
            </h2>
            <p className="mb-3">
              The FerrumEngine software, including all source code, CSS effects, design tokens,
              compiler tooling, and framework adapters, is distributed under the MIT License.
              This means:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                <strong className="text-foreground/90">Permission is granted</strong> to
                any person obtaining a copy of the software to deal in the Software without
                restriction, including without limitation the rights to use, copy, modify, merge,
                publish, distribute, sublicense, and/or sell copies of the Software.
              </li>
              <li>
                <strong className="text-foreground/90">Condition:</strong> The above
                copyright notice and this permission notice shall be included in all copies or
                substantial portions of the Software.
              </li>
              <li>
                <strong className="text-foreground/90">No warranty:</strong> THE SOFTWARE
                IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
                BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
                PURPOSE AND NONINFRINGEMENT.
              </li>
            </ul>
            <p className="mt-3">
              The full MIT License text is available in the LICENSE file in our{" "}
              <a
                href="https://github.com/roy-wanyoike/FerrumEngine"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground/80 hover:text-foreground underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-muted-foreground/60 transition-colors"
              >
                GitHub repository
              </a>
              .
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              3. Use of the Website and Services
            </h2>
            <p className="mb-3">
              When using the FerrumEngine website and its interactive services (documentation,
              playground, effects gallery), you agree to:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                Use the website only for lawful purposes and in accordance with these Terms.
              </li>
              <li>
                Not attempt to gain unauthorized access to any portion of the website, our
                servers, or any systems or networks connected to our services.
              </li>
              <li>
                Not use the website in any way that could damage, disable, overburden, or impair
                the website or interfere with any other party’s use and enjoyment of the website.
              </li>
              <li>
                Not use any automated means (bots, scrapers, crawlers) to access the website for
                purposes that exceed reasonable use, unless explicitly permitted.
              </li>
              <li>
                Not introduce malicious code, viruses, or any other harmful material into the
                website or any connected systems.
              </li>
            </ul>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              4. User Content
            </h2>
            <p className="mb-3">
              If you submit content to FerrumEngine (such as bug reports, feature requests, pull
              requests, code contributions, or community forum posts):
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                You retain ownership of your original content.
              </li>
              <li>
                By submitting a pull request or contributing code, you agree that your
                contribution will be licensed under the MIT License, consistent with the
                project’s existing license.
              </li>
              <li>
                You represent that you have the right to submit such content and that it does
                not infringe on the intellectual property rights of any third party.
              </li>
              <li>
                We reserve the right to remove or refuse to display any content that violates
                these Terms or is otherwise objectionable.
              </li>
            </ul>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              5. Intellectual Property
            </h2>
            <p className="mb-3">
              The FerrumEngine project includes the following intellectual property:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                <strong className="text-foreground/90">The FerrumEngine name and logo</strong>{" "}
                are trademarks of the project. You may use them to refer to the project in a
                non-commercial, factual context (e.g., “built with FerrumEngine”), but may not
                use them in a way that suggests endorsement without permission.
              </li>
              <li>
                <strong className="text-foreground/90">Website design and content</strong>{" "}
                (including documentation, graphics, and original written content) are protected
                by copyright. You may not reproduce, distribute, or create derivative works from
                the website content without our permission, beyond what is permitted by fair use.
              </li>
              <li>
                <strong className="text-foreground/90">The software itself</strong> is MIT-licensed
                and may be freely used, modified, and distributed as described in Section 2.
              </li>
            </ul>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              6. Limitation of Liability
            </h2>
            <p className="mb-3">
              TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                THE SOFTWARE AND WEBSITE ARE PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS.
                WE MAKE NO WARRANTIES, EXPRESSED OR IMPLIED, REGARDING THE SOFTWARE OR SERVICES.
              </li>
              <li>
                IN NO EVENT SHALL THE PROJECT, ITS MAINTAINERS, OR CONTRIBUTORS BE LIABLE FOR
                ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES
                (INCLUDING BUT NOT LIMITED TO LOSS OF DATA, BUSINESS INTERRUPTION, OR LOSS OF
                PROFITS) ARISING OUT OF OR IN CONNECTION WITH THE USE OR INABILITY TO USE THE
                SOFTWARE OR SERVICES.
              </li>
              <li>
                WE DO NOT WARRANT THAT THE WEBSITE WILL BE UNINTERRUPTED, TIMELY, SECURE, OR
                ERROR-FREE.
              </li>
              <li>
                WE ARE NOT RESPONSIBLE FOR ANY CONTENT, CODE, OR EFFECTS GENERATED BY USERS
                USING THE FERRUMENGINE SOFTWARE IN THEIR OWN PROJECTS.
              </li>
            </ul>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              7. Disclaimer
            </h2>
            <p>
              FerrumEngine is an open-source project maintained by volunteers and contributors. It
              is provided without any guarantee of support, stability, or fitness for any particular
              purpose. While we strive for high quality and reliability, users assume all risk
              associated with using the software in production environments. We recommend thoroughly
              testing the software in your specific use case before deployment. The maintainers
              reserve the right to change the direction, scope, or features of the project at any
              time.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              8. Modifications to These Terms
            </h2>
            <p>
              We reserve the right to modify or replace these Terms at any time. Changes will be
              effective immediately upon posting the revised Terms on this page with an updated
              “Last updated” date. Your continued use of the Service after any such changes
              constitutes your acceptance of the new Terms. We encourage you to review these Terms
              periodically.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              9. Governing Law
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with applicable laws,
              without regard to conflict of law principles. Any disputes arising out of or related
              to these Terms or the use of the Service shall be resolved through good-faith
              negotiation. If negotiation fails, disputes may be submitted to binding arbitration
              or resolved in the courts of the applicable jurisdiction.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              10. Severability
            </h2>
            <p>
              If any provision of these Terms is held to be invalid, illegal, or unenforceable by
              a court of competent jurisdiction, such provision shall be modified to the minimum
              extent necessary to make it valid and enforceable, and the remaining provisions shall
              continue in full force and effect.
            </p>
          </section>

          {/* 11 */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              11. Contact Us
            </h2>
            <p className="mb-3">
              If you have any questions about these Terms of Service, please contact us through
              the following channels:
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
                <strong className="text-foreground/90">Contributing:</strong> See our
                contributing guidelines in the GitHub repository for questions about code
                contributions.
              </li>
            </ul>
          </section>
        </article>

        {/* Footer spacer */}
        <div className="flex-1 min-h-16" />
      </div>
    </main>
  );
}
