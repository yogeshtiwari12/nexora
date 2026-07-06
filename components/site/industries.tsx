import {
  Building,
  Factory,
  GraduationCap,
  Hotel,
  HeartPulse,
  Landmark,
  Printer,
  Rocket,
  ShoppingBag,
  Truck,
  Building2,
  HardHat,
} from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";

const industries = [
  { icon: Factory, name: "Manufacturing", impact: "Automate production planning & shop-floor tracking." },
  { icon: Printer, name: "Printing & Packaging", impact: "Digitize job orders, estimates & inventory." },
  { icon: HeartPulse, name: "Healthcare", impact: "Streamline patient records & appointments." },
  { icon: GraduationCap, name: "Education", impact: "Unify admissions, LMS & fee management." },
  { icon: Truck, name: "Logistics", impact: "Real-time fleet, route & shipment visibility." },
  { icon: ShoppingBag, name: "Retail", impact: "Sync POS, inventory & customer loyalty." },
  { icon: Hotel, name: "Hospitality", impact: "Automate bookings, billing & guest experience." },
  { icon: HardHat, name: "Construction", impact: "Track projects, resources & site progress." },
  { icon: Landmark, name: "Finance", impact: "Secure workflows, reporting & compliance." },
  { icon: Building, name: "Real Estate", impact: "Manage listings, leads & CRM in one place." },
  { icon: Rocket, name: "Startups", impact: "Ship MVPs fast and scale with confidence." },
  { icon: Building2, name: "Enterprises", impact: "Modernize legacy systems at scale." },
];

export function Industries() {
  return (
    <section id="industries" className="relative py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Industries We Serve"
          title={<>Digital transformation for <span className="text-gradient-brand">every industry</span></>}
          description="Deep domain expertise across sectors — hover to see how automation moves the needle."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((ind) => (
            <div
              key={ind.name}
              className="group relative min-h-36 overflow-hidden rounded-2xl glass p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-[var(--shadow-glow)]"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 bg-gradient-to-br from-blue-500/5 to-violet-500/5 [mask-image:linear-gradient(to_bottom,transparent,black)] group-hover:opacity-100" />
              <div className="relative flex h-full flex-col">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-500/10 text-blue-400 transition-all duration-300 group-hover:gradient-brand group-hover:text-white shadow-sm">
                  <ind.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-foreground">{ind.name}</h3>
                <p className="mt-2 max-h-0 overflow-hidden text-sm leading-snug text-muted-foreground opacity-0 transition-all duration-300 group-hover:max-h-24 group-hover:opacity-100">
                  {ind.impact}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
