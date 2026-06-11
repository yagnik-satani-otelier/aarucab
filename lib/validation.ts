import { z } from "zod";

export const tripTypes = [
  "One Way",
  "Round Trip",
  "Rental",
  "Pickup & Drop",
] as const;

export const vehicleOptions = [
  "Sedan",
  "SUV",
  "Innova / MPV",
  "Tempo Traveller",
  "Any Available",
] as const;

const today = () => new Date().toISOString().split("T")[0];

export const bookingSchema = z
  .object({
    fullName: z.string().min(2, "Full name is required"),
    mobile: z
      .string()
      .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
    email: z
      .string()
      .email("Enter a valid email address")
      .optional()
      .or(z.literal("")),
    tripType: z.enum(tripTypes, { message: "Please select a trip type" }),
    pickupLocation: z.string().min(3, "Pickup location is required"),
    dropLocation: z.string().min(3, "Drop location is required"),
    travelDate: z
      .string()
      .min(1, "Travel date is required")
      .refine((val) => val >= today(), "Travel date cannot be in the past"),
    travelTime: z.string().min(1, "Travel time is required"),
    returnDate: z.string().optional(),
    returnTime: z.string().optional(),
    rentalDuration: z.string().optional(),
    flightNumber: z.string().optional(),
    vehiclePreference: z.string().optional(),
    passengers: z.string().optional(),
    luggage: z.string().optional(),
    notes: z.string().optional(),
    website: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.tripType === "Round Trip") {
      if (!data.returnDate) {
        ctx.addIssue({
          code: "custom",
          message: "Return date is required for round trips",
          path: ["returnDate"],
        });
      } else if (data.returnDate < data.travelDate) {
        ctx.addIssue({
          code: "custom",
          message: "Return date must be on or after travel date",
          path: ["returnDate"],
        });
      }
      if (!data.returnTime) {
        ctx.addIssue({
          code: "custom",
          message: "Return time is required for round trips",
          path: ["returnTime"],
        });
      }
    }

    if (data.tripType === "Rental" && !data.rentalDuration?.trim()) {
      ctx.addIssue({
        code: "custom",
        message: "Rental duration is required (hours or kilometers)",
        path: ["rentalDuration"],
      });
    }
  });

export type BookingFormData = z.infer<typeof bookingSchema>;
