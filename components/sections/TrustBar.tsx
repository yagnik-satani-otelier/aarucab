import {
  BadgeIndianRupee,
  Car,
  Clock,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    subtitle: "Your safety is our priority",
  },
  {
    icon: UserCheck,
    title: "Professional Drivers",
    subtitle: "Verified & experienced drivers",
  },
  {
    icon: Car,
    title: "Well Maintained Cars",
    subtitle: "Clean, comfortable & well maintained cars",
  },
  {
    icon: BadgeIndianRupee,
    title: "Best Prices",
    subtitle: "Affordable fares with no hidden charges",
  },
  {
    icon: Clock,
    title: "On Time Service",
    subtitle: "Punctual service every time",
  },
];

export function TrustBar() {
  return (
    <div className="relative z-30 -mt-16 lg:-mt-20 px-4 lg:px-6">
      <ScrollReveal className="mx-auto max-w-7xl">
        <div className="rounded-xl bg-black/75 backdrop-blur-md border border-white/10 px-4 py-6 sm:px-6 lg:px-8 shadow-xl">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4" stagger={0.06}>
            {trustItems.map((item) => (
              <StaggerItem key={item.title}>
                <div className="flex items-start gap-3 min-w-[200px] lg:min-w-0 group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/15 border border-gold/30 transition-transform duration-300 group-hover:scale-105">
                    <item.icon className="h-5 w-5 text-gold" aria-hidden />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {item.title}
                    </p>
                    <p className="text-xs text-white/65 mt-0.5 leading-snug">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </ScrollReveal>
    </div>
  );
}
