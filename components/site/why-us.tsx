import {
  Code2,
  Lock,
  Cloud,
  Gauge,
  Headphones,
  Cpu,
  Maximize,
  Sparkles,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { SectionHeading } from "@/components/site/section-heading";
import { ensureGsap } from "@/lib/gsap";

const features = [
  {
    icon: Code2,
    title: "Custom-built software",
    desc: "No rigid templates — every system is engineered around your workflow.",
  },
  {
    icon: Lock,
    title: "Secure architecture",
    desc: "Encryption, role-based access, and audit trails baked in from day one.",
  },
  {
    icon: Cloud,
    title: "Cloud-ready solutions",
    desc: "Deploy anywhere with resilient, cost-efficient cloud infrastructure.",
  },
  {
    icon: Gauge,
    title: "Fast delivery",
    desc: "Agile sprints and rapid prototypes get you to value in weeks, not years.",
  },
  {
    icon: Headphones,
    title: "Dedicated support",
    desc: "A named team that knows your product and responds when it matters.",
  },
  {
    icon: Cpu,
    title: "Modern technologies",
    desc: "A future-proof stack chosen for performance and longevity.",
  },
  {
    icon: Maximize,
    title: "Scalable systems",
    desc: "Architected to grow from your first user to your millionth.",
  },
  {
    icon: Sparkles,
    title: "Experienced developers",
    desc: "Senior engineers who've shipped enterprise software at scale.",
  },
];

const stats = [
  { value: 250, suffix: "+", label: "Projects Completed" },
  { value: 180, suffix: "+", label: "Happy Clients" },
  { value: 10, suffix: "+", label: "Years of Experience" },
  { value: 320, suffix: "+", label: "Businesses Automated" },
];

export function WhyUs() {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const { gsap } = ensureGsap();
    
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((counter) => {
        gsap.from(counter, {
          textContent: "0",
          duration: 2.5,
          ease: "power3.out",
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="why" className="relative py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Choose Us"
          title={<>Built by engineers who <span className="text-gradient-brand">obsess over outcomes</span></>}
          description="We don't just write code — we deliver measurable business impact through reliable, secure, and scalable software."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative overflow-hidden rounded-2xl glass p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-[var(--shadow-glow)]"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-cyan-400">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-foreground">{f.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        <div 
          ref={statsRef}
          className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8 rounded-3xl glass p-10 lg:px-16"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-4xl lg:text-5xl font-bold text-cyan-400">
                <span data-counter>{s.value}</span>{s.suffix}
              </p>
              <p className="mt-3 text-sm lg:text-base font-medium text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
