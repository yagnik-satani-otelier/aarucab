import { Building2, Car, Plane, Users } from "lucide-react";
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: Car,
    title: "Outstation Rides",
    description: "Comfortable outstation trips at best fares",
  },
  {
    icon: Plane,
    title: "Airport Transfer",
    description: "On time airport pick-up & drop",
  },
  {
    icon: Building2,
    title: "Local Rides",
    description: "Hassle-free local rides",
  },
  {
    icon: Users,
    title: "Corporate Travel",
    description: "Reliable travel for business needs",
  },
];

export function Services() {
  return (
    <section id="services" className="bg-light-bg py-16 lg:py-24 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-black section-heading-accent inline-block">
            Our Popular Services
          </h2>
          <p className="mt-4 text-gray-600">
            We provide wide range of cab services for all your travel needs
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <article
                className={cn(
                  "flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm h-full",
                  "transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-gold/40"
                )}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                  <service.icon className="h-6 w-6 text-black" aria-hidden />
                </div>
                <div>
                  <h3 className="font-bold text-black">{service.title}</h3>
                  <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
