import { useEffect, useRef } from "react";
import {
  ClipboardList,
  Code2,
  LifeBuoy,
  PhoneCall,
  Rocket,
  SearchCheck,
  TestTube2,
} from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { ensureGsap } from "@/lib/gsap";

const steps = [
  { icon: PhoneCall, title: "Discovery Call", desc: "We learn your goals, pain points, and vision in a free strategy session." },
  { icon: SearchCheck, title: "Requirement Analysis", desc: "We map processes and define a precise, prioritized project scope." },
  { icon: ClipboardList, title: "UI/UX Design", desc: "Interactive prototypes and design systems crafted for real users." },
  { icon: Code2, title: "Development", desc: "Agile sprints with clean, secure, and well-tested code you can trust." },
  { icon: TestTube2, title: "Testing", desc: "Rigorous QA, automated tests, and security checks before launch." },
  { icon: Rocket, title: "Deployment", desc: "Smooth, zero-downtime rollout to production and your teams." },
  { icon: LifeBuoy, title: "Maintenance & Support", desc: "Ongoing monitoring, updates, and a dedicated support team." },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { gsap } = ensureGsap();
    const ctx = gsap.context(() => {
      gsap.to("[data-line]", {
        scaleY: 1,
        transformOrigin: "top",
        ease: "none",
        scrollTrigger: { trigger: el, start: "top 60%", end: "bottom 80%", scrub: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" className="relative py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Process"
          title={<>A proven path from <span className="text-gradient-brand">idea to impact</span></>}
          description="Transparent, collaborative, and predictable — you always know exactly where your project stands."
        />

        <div ref={ref} className="relative mx-auto mt-12 max-w-3xl">
          {/* Track */}
          <div className="absolute left-6 top-2 h-full w-px bg-white/10 md:left-1/2 md:-translate-x-1/2" />
          <div
            data-line
            className="absolute left-6 top-2 h-full w-px scale-y-0 gradient-brand md:left-1/2 md:-translate-x-1/2"
          />

          <div className="space-y-10">
            {steps.map((s, i) => (
              <div
                key={s.title}
                data-step
                className={`relative flex items-center gap-6 md:gap-0 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Node */}
                <div className="absolute left-6 z-10 grid h-12 w-12 -translate-x-1/2 place-items-center rounded-xl gradient-brand text-white shadow-lg md:left-1/2">
                  <s.icon className="h-5 w-5" />
                </div>

                {/* Card */}
                <div className={`ml-16 w-full md:ml-0 md:w-[calc(50%-3rem)] ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <div className="rounded-2xl glass p-5 shadow-lg hover:shadow-[var(--shadow-glow)] transition-shadow">
                    <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                      Step {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-1 text-lg font-semibold text-foreground">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
                <div className="hidden md:block md:w-[calc(50%-3rem)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
