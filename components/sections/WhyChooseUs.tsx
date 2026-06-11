import {
  BadgeCheck,
  Car,
  Clock,
  Headphones,
  Receipt,
  Shield,
} from "lucide-react";
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";

const reasons = [
  {
    icon: BadgeCheck,
    title: "Verified Drivers",
    description: "Background-checked, experienced professionals",
  },
  {
    icon: Car,
    title: "Clean & Comfortable Cars",
    description: "Well-maintained fleet for every journey",
  },
  {
    icon: Receipt,
    title: "Transparent Pricing",
    description: "Clear fares shared before you confirm",
  },
  {
    icon: Clock,
    title: "On-Time Pickup",
    description: "Punctual service you can rely on",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "We're here whenever you need us",
  },
  {
    icon: Shield,
    title: "No Hidden Charges",
    description: "What we quote is what you pay",
  },
];

export function WhyChooseUs() {
  return (
    <section id="about" className="bg-white py-16 lg:py-24 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-black section-heading-accent inline-block">
            Why Choose Aaru Cab
          </h2>
          <p className="mt-4 text-gray-600">
            Trusted by travelers for safe, premium, and hassle-free cab
            experiences
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((item) => (
            <StaggerItem key={item.title}>
              <article
                className={cn(
                  "rounded-xl border border-gray-200 bg-light-bg p-6 h-full",
                  "transition-all duration-300 hover:border-gold/30 hover:shadow-md hover:-translate-y-0.5"
                )}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/15">
                  <item.icon className="h-5 w-5 text-gold" aria-hidden />
                </div>
                <h3 className="mt-4 font-bold text-black">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
