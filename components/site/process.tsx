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
          <div className="absolute left-1/2 top-2 h-full w-px -translate-x-1/2 bg-white/10" />
          <div
            data-line
            className="absolute left-1/2 top-2 h-full w-px -translate-x-1/2 scale-y-0 gradient-brand"
          />

          <div className="space-y-8 md:space-y-10">
            {steps.map((s, i) => (
              <div
                key={s.title}
                data-step
                className={`relative flex items-center justify-between ${
                  i % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Node */}
                <div className="absolute left-1/2 z-10 grid h-10 w-10 md:h-12 md:w-12 -translate-x-1/2 place-items-center rounded-xl gradient-brand text-white shadow-lg">
                  <s.icon className="h-4 w-4 md:h-5 md:w-5" />
                </div>

                {/* Card */}
                <div className={`w-[calc(50%-2rem)] md:w-[calc(50%-3rem)] ${i % 2 === 0 ? "md:pr-12 text-right" : "md:pl-12 text-left"}`}>
                  <div className="rounded-2xl glass p-3 md:p-5 shadow-lg hover:shadow-[var(--shadow-glow)] transition-shadow">
                    <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-cyan-400">
                      Step {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-1 text-[13px] md:text-lg font-semibold text-foreground leading-snug md:leading-normal">{s.title}</h3>
                    <p className="mt-1 md:mt-2 text-[11px] md:text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
                <div className="w-[calc(50%-2rem)] md:w-[calc(50%-3rem)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
