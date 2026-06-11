import { siteConfig } from "@/lib/site-config";
import type { BookingFormData } from "@/lib/validation";

export function buildWhatsAppMessage(data: BookingFormData): string {
  return [
    "Hi Aaru Cab, I just submitted a booking inquiry.",
    "",
    `Name: ${data.fullName}`,
    `Mobile: ${data.mobile}`,
    `Pickup: ${data.pickupLocation}`,
    `Drop: ${data.dropLocation}`,
    `Date: ${data.travelDate}`,
    `Time: ${data.travelTime}`,
    `Trip: ${data.tripType}`,
    `Vehicle: ${data.vehiclePreference || "Any Available"}`,
  ].join("\n");
}

export function buildWhatsAppUrl(data: BookingFormData): string {
  const base = siteConfig.social.whatsapp;
  const text = encodeURIComponent(buildWhatsAppMessage(data));
  return `${base}?text=${text}`;
}

export function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
}
