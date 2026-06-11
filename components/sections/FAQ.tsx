"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How do I confirm my booking?",
    answer:
      "After you submit the inquiry form, our team will call or WhatsApp you within 15 minutes to confirm your trip details, vehicle, and fare.",
  },
  {
    question: "Are your prices fixed?",
    answer:
      "Yes. We share transparent pricing upfront before confirming your booking. There are no hidden charges — the fare we quote is the fare you pay.",
  },
  {
    question: "What vehicle options are available?",
    answer:
      "We offer Sedan, SUV, Innova/MPV, and Tempo Traveller based on your passengers, luggage, and route. Tell us your preference in the form and we'll recommend the best fit.",
  },
  {
    question: "How quickly will you respond to my inquiry?",
    answer:
      "We aim to respond within 15 minutes during business hours and as soon as possible outside those hours. For urgent airport pickups, please call us directly.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="tariff" className="bg-light-bg py-16 lg:py-24 scroll-mt-20">
      <div className="mx-auto max-w-3xl px-4 lg:px-6">
        <ScrollReveal className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-black section-heading-accent inline-block">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-gray-600">
            Quick answers to common booking questions
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="rounded-xl border border-gray-200 bg-white overflow-hidden"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-black hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  {faq.question}
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-gold transition-transform duration-200",
                      isOpen && "rotate-180"
                    )}
                    aria-hidden
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-200",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
