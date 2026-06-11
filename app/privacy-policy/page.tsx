import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/lib/site-config";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="bg-white min-h-[60vh]">
        <article className="mx-auto max-w-3xl px-4 py-14 lg:px-6 lg:py-20">
          <h1 className="text-3xl font-bold text-black">Privacy Policy</h1>
          <p className="mt-2 text-sm text-gray-500">
            Last updated: June 11, 2026
          </p>

          <div className="mt-8 space-y-6 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold text-black mb-2">
                Introduction
              </h2>
              <p>
                {siteConfig.name} (&quot;we&quot;, &quot;our&quot;, or
                &quot;us&quot;) respects your privacy. This policy explains how
                we collect, use, and protect information when you use our
                website or submit a booking inquiry.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-black mb-2">
                Information We Collect
              </h2>
              <p>When you submit a booking inquiry, we may collect:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Full name and mobile number</li>
                <li>Pickup and drop locations</li>
                <li>Travel date, time, and trip details</li>
                <li>Vehicle preference (if selected)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-black mb-2">
                How We Use Your Information
              </h2>
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Process and respond to your booking inquiries</li>
                <li>Confirm trip details, pricing, and vehicle allocation</li>
                <li>Communicate with you via phone, SMS, or WhatsApp</li>
                <li>Improve our services and customer support</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-black mb-2">
                Data Storage &amp; Retention
              </h2>
              <p>
                Booking inquiries are stored securely in our internal systems
                (including Google Sheets for inquiry management). We retain data
                only as long as needed to fulfill your booking and comply with
                legal obligations.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-black mb-2">
                Sharing of Information
              </h2>
              <p>
                We do not sell your personal information. We may share details
                with our verified drivers and partners solely to fulfill your
                booked trip.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-black mb-2">
                Contact Us
              </h2>
              <p>
                For privacy-related questions, contact us at{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-gold hover:underline"
                >
                  {siteConfig.email}
                </a>{" "}
                or call{" "}
                <a
                  href={siteConfig.phoneHref}
                  className="text-gold hover:underline"
                >
                  {siteConfig.phone}
                </a>
                .
              </p>
            </section>
          </div>

          <Link
            href="/"
            className="inline-block mt-10 text-sm font-medium text-gold hover:underline"
          >
            ← Back to home
          </Link>
        </article>
      </main>
      <Footer />
    </>
  );
}
