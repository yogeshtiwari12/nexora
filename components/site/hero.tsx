import { useEffect, useRef, useState } from "react";
import { ArrowRight, PlayCircle, ShieldCheck, Sparkles, Star } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Magnetic } from "@/components/site/magnetic";
import { cn } from "@/lib/utils";
import { ensureGsap } from "@/lib/gsap";
import { HeroVisual } from "@/components/site/hero-visual";

const techA = [
  { name: "React", slug: "react" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "Python", slug: "python" },
  { name: "AWS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", invert: true },
  { name: "Next.js", slug: "nextdotjs", invert: true },
  { name: "TypeScript", slug: "typescript" },
  { name: "Docker", slug: "docker" },
];

const techB = [
  { name: "OpenAI", url: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg", invert: true, scale: 1.4 },
  { name: "Kubernetes", slug: "kubernetes" },
  { name: "Flutter", slug: "flutter" },
  { name: "GraphQL", slug: "graphql" },
  { name: "Redis", slug: "redis" },
  { name: "Stripe", slug: "stripe" },
  { name: "TensorFlow", slug: "tensorflow" },
  { name: "Azure", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg" },
];

function Row({ items, reverse }: { items: { name: string; slug?: string; url?: string; invert?: boolean; scale?: number }[]; reverse?: boolean }) {
  // Multiply 6 times. CSS marquee translates -50%, which equals 3 sets.
  // 3 sets is guaranteed to be wider than any ultrawide monitor, preventing gaps.
  const multiplied = [...items, ...items, ...items, ...items, ...items, ...items];
  return (
    <div className="flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <div
        className="flex shrink-0 w-max items-center gap-4 pr-4"
        style={{ animation: `marquee ${reverse ? "90s" : "75s"} linear infinite`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {multiplied.map((t, i) => (
          <span
            key={`${t.name}-${i}`}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-medium text-slate-300 shadow-sm transition-colors hover:bg-white/10"
          >
            <img 
              src={t.url || `https://cdn.simpleicons.org/${t.slug}${t.invert ? '/white' : ''}`} 
              alt={t.name} 
              className={cn("h-4 w-4 object-contain", t.url && t.invert && "invert brightness-0")} 
              style={t.scale ? { transform: `scale(${t.scale})` } : undefined}
            />
            {t.name}
          </span>
        ))}
      </div>
    </div>
  );
}

const keywords = [
  "CRM Development",
  "ERP Solutions",
  "Business Automation",
  "AI Integration",
  "Custom Software",
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [kw, setKw] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setKw((v) => (v + 1) % keywords.length), 2400);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { gsap } = ensureGsap();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero-badge]", { opacity: 0, y: 20, duration: 0.6 })
        .from("[data-hero-line]", { opacity: 0, y: 40, duration: 0.9, stagger: 0.12 }, "-=0.2")
        .from("[data-hero-sub]", { opacity: 0, y: 24, duration: 0.7 }, "-=0.4")
        .from("[data-hero-cta]", { opacity: 0, y: 20, duration: 0.6, stagger: 0.1 }, "-=0.3")
        .from("[data-hero-trust]", { opacity: 0, y: 20, duration: 0.6 }, "-=0.3");
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="top" ref={ref} className="relative overflow-hidden pt-28 pb-8 md:pt-32 md:pb-12">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative flex flex-col lg:grid items-center gap-14 lg:grid-cols-12 pt-4 md:pt-10 lg:pt-0">
        {/* Left Content */}
        <div className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left w-full max-w-3xl mx-auto lg:mx-0">
          <span
            data-hero-badge
            className="inline-flex items-center gap-2 rounded-full glass border-border px-3 py-1.5 text-xs font-medium text-muted-foreground"
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-500" />
            Enterprise-grade software, built for growth
          </span>

          <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl text-foreground">
            <span data-hero-line className="block">
              Transform your business
            </span>
            <span data-hero-line className="block">
              with <span className="text-gradient-brand">custom software</span> that runs itself.
            </span>
          </h1>

          <p data-hero-sub className="mt-6 max-w-2xl mx-auto lg:mx-0 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            We replace manual paperwork and spreadsheets with modern digital
            platforms — CRM, ERP, HRMS, inventory, and AI-powered automation
            tailored to how your business actually works.
          </p>

          {/* Rotating keywords */}
          <div data-hero-sub className="mt-5 flex items-center justify-center lg:justify-start gap-2 text-sm text-muted-foreground">
            <span>We build</span>
            <span className="relative inline-flex h-6 min-w-[170px] overflow-hidden">
              {keywords.map((k, i) => (
                <span
                  key={k}
                  className="absolute left-0 font-semibold text-gradient-brand transition-all duration-500"
                  style={{
                    opacity: i === kw ? 1 : 0,
                    transform: `translateY(${(i - kw) * 100}%)`,
                  }}
                >
                  {k}
                </span>
              ))}
            </span>
          </div>

          <div className="mt-8 flex items-center justify-center lg:justify-start gap-2 sm:gap-4 w-full px-2 sm:px-0">
            <div data-hero-cta className="flex-1 sm:flex-none flex justify-end lg:justify-start">
              <Magnetic strength={0.35} className="w-full sm:w-auto">
                <a href="#contact" className={cn(buttonVariants(), "w-full sm:w-auto h-12 px-2 sm:px-8 text-[11px] sm:text-base bg-blue-500 hover:bg-blue-400 text-white rounded-full shadow-lg border-0 transition-colors")}>
                  Book a Free Consultation <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2" />
                </a>
              </Magnetic>
            </div>
            <div data-hero-cta className="flex-1 sm:flex-none flex justify-start">
              <a href="#work" className={cn(buttonVariants({ variant: "outline" }), "w-full sm:w-auto h-12 px-2 sm:px-8 text-[11px] sm:text-base rounded-full glass border-border hover:bg-white/5")}>
                <PlayCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" /> View Our Work
              </a>
            </div>
          </div>

          {/* Trust */}
          <div data-hero-trust className="mt-10 flex flex-wrap justify-center lg:justify-start items-center gap-x-7 gap-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              SOC-2 ready & secure by design
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">4.9/5 from 120+ clients</span>
            </div>
          </div>

          <div data-hero-trust className="mt-10 grid max-w-2xl grid-cols-2 sm:grid-cols-3 gap-8 border-t border-border pt-8 mx-auto lg:mx-0 w-full">
            {[
              { v: "250+", l: "Projects shipped" },
              { v: "60%", l: "Avg. time saved" },
              { v: "10+", l: "Years experience" },
            ].map((s) => (
              <div key={s.l} className="flex flex-col items-center lg:items-start">
                <p className="text-2xl font-semibold text-gradient-brand">{s.v}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Visual */}
        <div data-hero-sub className="relative lg:col-span-5 w-full mx-auto mt-4 lg:mt-0">
          <HeroVisual />
        </div>
      </div>

      {/* Tech Stack Marquee below Hero */}
      <div className="mt-12 pt-6 pb-4">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-8">
          Powering modern businesses with a battle-tested stack
        </p>
        <div className="space-y-4">
          <Row items={techA} />
          <Row items={techB} reverse />
        </div>
      </div>
    </section>
  );
}
