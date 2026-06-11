import Image from "next/image";
import { Car } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const fleetHighlights = [
  "Sedan — comfortable city & airport rides",
  "SUV — spacious rides for families",
  "Innova / MPV — premium outstation travel",
  "Tempo Traveller — group & corporate trips",
];

export function Fleet() {
  return (
    <section id="fleet" className="bg-white py-16 lg:py-24 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-black section-heading-accent inline-block">
              Our Fleet
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Clean, well-maintained vehicles driven by verified professionals.
              Choose the right car for your trip — from daily commutes to
              long-distance outstation journeys.
            </p>
            <ul className="mt-8 space-y-3">
              {fleetHighlights.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm text-gray-700"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/15">
                    <Car className="h-4 w-4 text-gold" aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.15} direction="left">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-charcoal border border-gray-200 shadow-md">
              <Image
                src="/hero-scene.png"
                alt="Premium white Innova cab in Aaru Cab fleet"
                fill
                className="object-cover object-[70%_center]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-gold font-bold text-lg">Premium Fleet</p>
                <p className="text-white/80 text-sm mt-1">
                  All vehicles sanitized and inspected regularly
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
