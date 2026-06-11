"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { BookingForm } from "@/components/booking/BookingForm";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  const fadeUp = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: "easeOut" as const },
        };

  return (
    <section
      id="home"
      className="relative hero-gradient min-h-[720px] lg:min-h-[680px] overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 pt-10 pb-28 lg:px-6 lg:pt-14 lg:pb-32">
        <div className="grid gap-8 lg:grid-cols-[1fr_minmax(320px,400px)] lg:gap-8 xl:gap-12 items-start">
          <div className="order-1 z-10 max-w-xl lg:py-4">
            <motion.h1
              {...fadeUp(0)}
              className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight drop-shadow-sm"
            >
              Safe Rides. On Time. Every Time.
            </motion.h1>
            <motion.p
              {...fadeUp(0.1)}
              className="mt-4 text-4xl sm:text-5xl font-extrabold text-gold drop-shadow-sm"
            >
              Aaru Cab
            </motion.p>
            <motion.p
              {...fadeUp(0.15)}
              className="mt-4 text-base sm:text-lg text-white/90 font-medium"
            >
              Outstation | Local | Airport Transfer
            </motion.p>
            <motion.p
              {...fadeUp(0.2)}
              className="mt-2 text-sm sm:text-base text-white/75"
            >
              Comfortable rides, trusted service and best fares.
            </motion.p>
            <motion.button
              {...fadeUp(0.25)}
              type="button"
              onClick={scrollToBooking}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-base font-bold text-black transition hover:bg-gold-hover hero-cta-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Book Now
              <ArrowRight className="h-5 w-5" aria-hidden />
            </motion.button>
          </div>

          <div
            id="booking"
            className="order-2 z-20 scroll-mt-24 lg:py-2"
          >
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
}
