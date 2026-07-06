import {
  Boxes,
  BrainCircuit,
  Building2,
  Database,
  GraduationCap,
  HeartPulse,
  LayoutDashboard,
  Smartphone,
  Users,
  Warehouse,
  Workflow,
  Globe,
} from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";

const services = [
  { icon: Database, title: "CRM Development", desc: "Custom pipelines, lead scoring, and 360° customer views that your team actually uses." },
  { icon: LayoutDashboard, title: "ERP Solutions", desc: "Unify finance, operations, and supply chain into one real-time source of truth." },
  { icon: Workflow, title: "Workflow Automation", desc: "Eliminate repetitive tasks and paperwork with intelligent, event-driven flows." },
  { icon: BrainCircuit, title: "AI Integration", desc: "Embed LLMs, copilots, and predictive analytics directly into your operations." },
  { icon: Users, title: "HRMS", desc: "Payroll, attendance, onboarding, and performance in one connected platform." },
  { icon: Boxes, title: "Inventory Management", desc: "Live stock tracking, purchase orders, and warehouse control across locations." },
  { icon: Warehouse, title: "Manufacturing Software", desc: "Production planning, BOM, and shop-floor visibility built for factories." },
  { icon: HeartPulse, title: "Healthcare Software", desc: "HIPAA-conscious EMR, appointments, and patient portals for clinics." },
  { icon: GraduationCap, title: "School Management", desc: "Admissions, LMS, fees, and parent communication in a single system." },
  { icon: Smartphone, title: "Mobile Applications", desc: "Native-quality iOS & Android apps that extend your platform anywhere." },
  { icon: Globe, title: "Web Applications", desc: "Fast, scalable web platforms and portals with world-class UX." },
  { icon: Building2, title: "Custom Business Software", desc: "Bespoke systems designed around your exact processes and goals." },
];



export function Services() {
  return (
    <section id="services" className="relative py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Services"
          title={<>Software that runs your <span className="text-gradient-brand">entire business</span></>}
          description="From first line of code to full digital transformation — we design, build, and scale the systems that power your operations."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="group relative overflow-hidden rounded-2xl glass p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-[var(--shadow-glow)]"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-500/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-blue-500/10 text-blue-400 transition-all duration-300 group-hover:gradient-brand group-hover:text-white shadow-sm">
                  <s.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}
