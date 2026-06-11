"use client";

import { useState } from "react";
import { useForm, useWatch, type DefaultValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Car, Loader2, MapPin, Phone, Send, User } from "lucide-react";
import { BookingSuccessPanel } from "@/components/booking/BookingSuccessPanel";
import {
  bookingSchema,
  type BookingFormData,
  tripTypes,
  vehicleOptions,
} from "@/lib/validation";
import { buildWhatsAppUrl, isMobileDevice } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const SUBMIT_COOLDOWN_KEY = "aaru-cab-last-submit";
const COOLDOWN_MS = 60_000;

type FieldIcon = typeof User;

function FormField({
  label,
  required,
  error,
  icon: Icon,
  children,
  className,
  visibleLabel,
}: {
  label: string;
  required?: boolean;
  error?: string;
  icon?: FieldIcon;
  children: React.ReactNode;
  className?: string;
  visibleLabel?: boolean;
}) {
  return (
    <div className={cn("space-y-1.5 min-w-0", className)}>
      <label
        className={cn(
          visibleLabel
            ? "block text-xs font-medium text-gray-500 mb-1"
            : "sr-only"
        )}
      >
        {label}
        {required && (visibleLabel ? " *" : " (required)")}
      </label>
      <div
        className={cn(
          "flex items-center gap-2 rounded-lg border bg-white px-3 py-2.5 transition-colors min-w-0",
          error ? "border-red-400" : "border-gray-200 focus-within:border-gold"
        )}
      >
        {Icon && (
          <Icon className="h-4 w-4 shrink-0 text-gray-400" aria-hidden />
        )}
        {children}
      </div>
      {error && (
        <p className="text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  "w-full min-w-0 bg-transparent text-base text-gray-900 placeholder:text-gray-400 outline-none min-h-[24px]";

export function BookingForm() {
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "error">(
    "idle"
  );
  const [submitMessage, setSubmitMessage] = useState("");
  const [submittedData, setSubmittedData] = useState<BookingFormData | null>(
    null
  );
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: "",
      mobile: "",
      email: "",
      tripType: "",
      pickupLocation: "",
      dropLocation: "",
      travelDate: "",
      travelTime: "",
      returnDate: "",
      returnTime: "",
      rentalDuration: "",
      flightNumber: "",
      vehiclePreference: "",
      passengers: "",
      luggage: "",
      notes: "",
      website: "",
    } as unknown as DefaultValues<BookingFormData>,
  });

  const tripType = useWatch({ control, name: "tripType" });
  const isRoundTrip = tripType === "Round Trip";
  const isRental = tripType === "Rental";

  const handleSuccessClose = () => {
    setSubmittedData(null);
    reset();
    setSubmitState("idle");
  };

  const onSubmit = async (data: BookingFormData) => {
    const lastSubmit = sessionStorage.getItem(SUBMIT_COOLDOWN_KEY);
    if (lastSubmit && Date.now() - Number(lastSubmit) < COOLDOWN_MS) {
      setSubmitState("error");
      setSubmitMessage(
        "Please wait a moment before submitting another inquiry."
      );
      return;
    }

    setSubmitState("loading");
    setSubmitMessage("");

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok || !result.ok) {
        throw new Error(result.error || "Submission failed. Please try again.");
      }

      sessionStorage.setItem(SUBMIT_COOLDOWN_KEY, String(Date.now()));

      if (isMobileDevice()) {
        window.location.href = buildWhatsAppUrl(data);
        return;
      }

      setSubmittedData(data);
      setSubmitState("idle");
    } catch (err) {
      setSubmitState("error");
      setSubmitMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please call us directly."
      );
    }
  };

  return (
    <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10">
      <div className="bg-black px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20">
            <Car className="h-5 w-5 text-gold" aria-hidden />
          </div>
          <div>
            <h2 className="font-bold text-white">
              {submittedData ? "Inquiry Received" : "Quick Booking"}
            </h2>
            <p className="text-xs text-white/60">
              {submittedData
                ? "Thank you — we'll contact you shortly"
                : "Book your ride in just a few steps"}
            </p>
          </div>
        </div>
      </div>

      {submittedData ? (
        <BookingSuccessPanel data={submittedData} onClose={handleSuccessClose} />
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-4 sm:p-5 space-y-4"
          noValidate
        >
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            className="absolute opacity-0 pointer-events-none h-0 w-0"
            aria-hidden
            {...register("website")}
          />

          <div className="grid gap-3 sm:grid-cols-2" aria-live="polite">
            <FormField
              label="Your Name"
              required
              error={errors.fullName?.message}
              icon={User}
            >
              <input
                type="text"
                placeholder="Your Name"
                className={inputClass}
                {...register("fullName")}
              />
            </FormField>

            <FormField
              label="Mobile Number"
              required
              error={errors.mobile?.message}
              icon={Phone}
            >
              <input
                type="tel"
                inputMode="numeric"
                placeholder="Mobile Number"
                maxLength={10}
                className={inputClass}
                {...register("mobile")}
              />
            </FormField>

            <FormField
              label="Pickup Location"
              required
              error={errors.pickupLocation?.message}
              icon={MapPin}
            >
              <input
                type="text"
                placeholder="Pickup Location"
                className={inputClass}
                {...register("pickupLocation")}
              />
            </FormField>

            <FormField
              label="Drop Location"
              required
              error={errors.dropLocation?.message}
              icon={MapPin}
            >
              <input
                type="text"
                placeholder="Drop Location"
                className={inputClass}
                {...register("dropLocation")}
              />
            </FormField>

            <FormField
              label="Travel Date"
              required
              visibleLabel
              error={errors.travelDate?.message}
            >
              <input
                type="date"
                className={cn(inputClass, "date-time-input")}
                min={new Date().toISOString().split("T")[0]}
                {...register("travelDate")}
              />
            </FormField>

            <FormField
              label="Travel Time"
              required
              visibleLabel
              error={errors.travelTime?.message}
            >
              <input
                type="time"
                className={cn(inputClass, "date-time-input")}
                {...register("travelTime")}
              />
            </FormField>

            <FormField
              label="Select Vehicle"
              error={errors.vehiclePreference?.message}
              icon={Car}
            >
              <select
                className={cn(inputClass, "cursor-pointer")}
                {...register("vehiclePreference")}
              >
                <option value="">Select Vehicle</option>
                {vehicleOptions.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField
              label="Trip Type"
              required
              error={errors.tripType?.message}
            >
              <select
                className={cn(inputClass, "cursor-pointer pl-1")}
                {...register("tripType")}
              >
                <option value="">Trip Type</option>
                {tripTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </FormField>
          </div>

          {(isRoundTrip || isRental) && (
            <div className="grid gap-3 sm:grid-cols-2 pt-1 animate-fade-in border-t border-gray-100">
              {isRoundTrip && (
                <>
                  <FormField
                    label="Return Date"
                    required
                    visibleLabel
                    error={errors.returnDate?.message}
                  >
                    <input
                      type="date"
                      className={cn(inputClass, "date-time-input")}
                      {...register("returnDate")}
                    />
                  </FormField>
                  <FormField
                    label="Return Time"
                    required
                    visibleLabel
                    error={errors.returnTime?.message}
                  >
                    <input
                      type="time"
                      className={cn(inputClass, "date-time-input")}
                      {...register("returnTime")}
                    />
                  </FormField>
                </>
              )}
              {isRental && (
                <FormField
                  label="Rental Duration"
                  required
                  error={errors.rentalDuration?.message}
                  className="sm:col-span-2"
                >
                  <input
                    type="text"
                    placeholder="e.g. 8 hours or 200 km"
                    className={inputClass}
                    {...register("rentalDuration")}
                  />
                </FormField>
              )}
            </div>
          )}

          <details className="group border-t border-gray-100 pt-3">
            <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gold list-none flex items-center gap-1">
              <span className="group-open:rotate-90 transition-transform inline-block">
                ›
              </span>
              Additional details (optional)
            </summary>
            <div className="grid gap-3 sm:grid-cols-2 mt-3">
              <FormField label="Email" error={errors.email?.message}>
                <input
                  type="email"
                  placeholder="Email (optional)"
                  className={inputClass}
                  {...register("email")}
                />
              </FormField>
              <FormField
                label="Flight Number"
                error={errors.flightNumber?.message}
              >
                <input
                  type="text"
                  placeholder="Flight number (airport transfers)"
                  className={inputClass}
                  {...register("flightNumber")}
                />
              </FormField>
              <FormField label="Passengers" error={errors.passengers?.message}>
                <input
                  type="text"
                  placeholder="Number of passengers"
                  className={inputClass}
                  {...register("passengers")}
                />
              </FormField>
              <FormField label="Luggage" error={errors.luggage?.message}>
                <input
                  type="text"
                  placeholder="Luggage requirement"
                  className={inputClass}
                  {...register("luggage")}
                />
              </FormField>
              <FormField
                label="Special Notes"
                error={errors.notes?.message}
                className="sm:col-span-2"
              >
                <textarea
                  placeholder="Special notes or message"
                  rows={2}
                  className={cn(inputClass, "resize-none")}
                  {...register("notes")}
                />
              </FormField>
            </div>
          </details>

          {submitState === "error" && submitMessage && (
            <p
              className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2"
              role="alert"
            >
              {submitMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={submitState === "loading"}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold py-3.5 text-base font-bold text-black transition hover:bg-gold-hover disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
          >
            {submitState === "loading" ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                Submitting...
              </>
            ) : (
              <>
                Send Inquiry
                <Send className="h-4 w-4" aria-hidden />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
