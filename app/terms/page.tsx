import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/lib/site-config";

export default function TermsPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="bg-white min-h-[60vh]">
        <article className="mx-auto max-w-3xl px-4 py-14 lg:px-6 lg:py-20">
          <h1 className="text-3xl font-bold text-black">
            Terms &amp; Conditions
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Last updated: June 11, 2026
          </p>

          <div className="mt-8 space-y-6 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold text-black mb-2">
                Booking &amp; Confirmation
              </h2>
              <p>
                Submitting an inquiry through our website does not constitute a
                confirmed booking. A trip is confirmed only after we communicate
                the fare, vehicle details, and receive your acceptance via
                phone or WhatsApp.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-black mb-2">
                Fares &amp; Payment
              </h2>
              <p>
                Fares are shared upfront before confirmation. Payment terms
                (advance or full payment) will be communicated at the time of
                booking. Toll charges, parking fees, and state permits for
                outstation trips may apply separately unless included in your
                quoted fare.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-black mb-2">
                Cancellation &amp; Refunds
              </h2>
              <p>
                Cancellation policies vary by trip type and timing. Please
                contact us as early as possible to cancel or modify a booking.
                Refunds, if applicable, will be processed as per the
                cancellation terms shared at confirmation.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-black mb-2">
                Passenger Responsibilities
              </h2>
              <p>
                Passengers must provide accurate pickup details, be ready at the
                scheduled time, and comply with applicable laws. {siteConfig.name}{" "}
                reserves the right to refuse service in cases of unsafe or
                unlawful behavior.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-black mb-2">
                Limitation of Liability
              </h2>
              <p>
                While we strive for safe and timely service, {siteConfig.name}{" "}
                is not liable for delays caused by traffic, weather, road
                conditions, or other circumstances beyond our reasonable control.
                Our liability is limited to the extent permitted by applicable
                law.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-black mb-2">
                Governing Law
              </h2>
              <p>
                These terms are governed by the laws of India. Any disputes
                shall be subject to the jurisdiction of courts in the city
                where {siteConfig.name} operates its primary service area.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-black mb-2">Contact</h2>
              <p>
                Questions about these terms? Reach us at{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-gold hover:underline"
                >
                  {siteConfig.email}
                </a>{" "}
                or{" "}
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
