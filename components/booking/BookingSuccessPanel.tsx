"use client";

import { useEffect, useRef } from "react";
import { CheckCircle2, MessageCircle, Phone } from "lucide-react";
import type { BookingFormData } from "@/lib/validation";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type BookingSuccessPanelProps = {
  data: BookingFormData;
  onClose: () => void;
};

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 text-sm">
      <span className="text-gray-500 shrink-0">{label}</span>
      <span className="text-gray-900 text-right font-medium">{value}</span>
    </div>
  );
}

export function BookingSuccessPanel({ data, onClose }: BookingSuccessPanelProps) {
  const whatsappRef = useRef<HTMLAnchorElement>(null);
  const firstName = data.fullName.split(" ")[0];

  useEffect(() => {
    whatsappRef.current?.focus();
  }, []);

  return (
    <div
      className="bg-white p-4 sm:p-5 animate-fade-in"
      role="status"
      aria-live="polite"
      aria-labelledby="success-panel-title"
    >
      <div className="text-center pb-4">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 border border-gold/30">
          <CheckCircle2 className="h-8 w-8 text-gold" aria-hidden />
        </div>
        <h3
          id="success-panel-title"
          className="mt-3 text-lg font-bold text-gray-900"
        >
          Thank you, {firstName}!
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          We have received your inquiry. Our booking team will contact you
          within 15 minutes.
        </p>
      </div>

      <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 space-y-2.5 mb-4">
        <p className="text-xs font-semibold text-gold uppercase tracking-wider mb-2">
          Trip Summary
        </p>
        <SummaryRow label="Pickup" value={data.pickupLocation} />
        <SummaryRow label="Drop-off" value={data.dropLocation} />
        <SummaryRow label="Date" value={data.travelDate} />
        <SummaryRow label="Time" value={data.travelTime} />
        <SummaryRow label="Trip Type" value={data.tripType} />
        <SummaryRow
          label="Vehicle"
          value={data.vehiclePreference || "Any Available"}
        />
      </div>

      <div className="space-y-2.5">
        <a
          ref={whatsappRef}
          href={buildWhatsAppUrl(data)}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-lg bg-gold py-3",
            "text-sm font-bold text-black transition hover:bg-gold-hover",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
          )}
        >
          <MessageCircle className="h-5 w-5" aria-hidden />
          Chat on WhatsApp
        </a>
        <a
          href={siteConfig.phoneHref}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-3",
            "text-sm font-semibold text-gray-900 transition hover:border-gold hover:bg-gold/5",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          )}
        >
          <Phone className="h-4 w-4 text-gold" aria-hidden />
          Call Now
        </a>
        <button
          type="button"
          onClick={onClose}
          className="w-full py-2 text-sm text-gray-500 hover:text-gold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
        >
          Submit another inquiry
        </button>
      </div>
    </div>
  );
}
