import { useEffect, useRef } from "react";
import { Activity, ArrowUpRight, Bell, CheckCircle2, TrendingUp, Users, Workflow, Zap } from "lucide-react";
import { ensureGsap } from "@/lib/gsap";

const bars = [42, 68, 55, 82, 60, 92, 74];

export function HeroVisual() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const { gsap } = ensureGsap();

    const ctx = gsap.context(() => {
      // Entrance
      gsap.from(el.querySelectorAll("[data-float]"), {
        opacity: 0,
        y: 40,
        scale: 0.94,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.3,
      });
      // Animated chart bars
      gsap.fromTo(
        el.querySelectorAll("[data-bar]"),
        { scaleY: 0 },
        { scaleY: 1, transformOrigin: "bottom", duration: 1.1, ease: "power3.out", stagger: 0.08, delay: 0.8 },
      );

      // Mouse parallax
      const layers = el.querySelectorAll<HTMLElement>("[data-depth]");
      const setters = Array.from(layers).map((l) => ({
        x: gsap.quickTo(l, "x", { duration: 0.8, ease: "power3.out" }),
        y: gsap.quickTo(l, "y", { duration: 0.8, ease: "power3.out" }),
        depth: parseFloat(l.dataset.depth || "0"),
      }));
      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const cx = (e.clientX - rect.left) / rect.width - 0.5;
        const cy = (e.clientY - rect.top) / rect.height - 0.5;
        setters.forEach((s) => {
          s.x(cx * s.depth * 40);
          s.y(cy * s.depth * 40);
        });
      };
      el.addEventListener("mousemove", onMove);
      return () => el.removeEventListener("mousemove", onMove);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className="relative mx-auto aspect-square w-full max-w-xl">
      {/* Main dashboard card */}
      <div
        data-float
        data-depth="0.5"
        className="absolute left-1/2 top-1/2 w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-2xl glass-strong p-5 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
              <Activity className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-semibold leading-none text-foreground">Revenue Analytics</p>
              <p className="mt-1 text-[11px] text-muted-foreground">Real-time overview</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-[11px] font-medium text-emerald-400">
            <TrendingUp className="h-3 w-3" /> +38%
          </span>
        </div>

        <div className="mt-5 flex h-32 items-end justify-between gap-2">
          {bars.map((h, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex h-28 w-full items-end">
                <div
                  data-bar
                  className="w-full rounded-md bg-gradient-to-t from-blue-600 to-indigo-400"
                  style={{ height: `${h}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { label: "MRR", value: "$248K" },
            { label: "Users", value: "12.4K" },
            { label: "Churn", value: "1.2%" },
          ].map((s) => (
            <div key={s.label} className="rounded-lg bg-white/5 p-2.5">
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{s.label}</p>
              <p className="mt-0.5 text-sm font-semibold text-foreground">{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Floating notification card */}
      <div
        data-float
        data-depth="1.4"
        className="absolute -right-2 top-6 w-52 rounded-xl glass p-3 shadow-lg animate-float"
      >
        <div className="flex items-start gap-2">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-emerald-500/10 text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
          </span>
          <div>
            <p className="text-xs font-semibold text-foreground">Deal closed</p>
            <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
              Acme Corp · $42,000 ARR
            </p>
          </div>
        </div>
      </div>

      {/* Workflow automation card */}
      <div
        data-float
        data-depth="1.1"
        className="absolute -left-4 bottom-12 w-56 rounded-xl glass p-3.5 shadow-lg animate-float-slow"
      >
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-violet-500/10 text-violet-400">
            <Workflow className="h-4 w-4" />
          </span>
          <p className="text-xs font-semibold text-foreground">Automation active</p>
        </div>
        <div className="mt-3 space-y-2">
          {["Invoice generated", "Email dispatched", "CRM synced"].map((t, i) => (
            <div key={t} className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <span
                className="h-1.5 w-1.5 rounded-full bg-cyan-500"
                style={{ animation: `pulse-glow 2s ${i * 0.4}s ease-in-out infinite` }}
              />
              {t}
            </div>
          ))}
        </div>
      </div>

      {/* Small stat chip */}
      <div
        data-float
        data-depth="1.7"
        className="absolute right-6 bottom-2 flex items-center gap-2 rounded-xl glass px-3 py-2.5 shadow-lg animate-float [animation-delay:1.2s]"
      >
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-cyan-500/10 text-cyan-400">
          <Users className="h-4 w-4" />
        </span>
        <div>
          <p className="text-sm font-semibold leading-none text-foreground">8,240</p>
          <p className="mt-0.5 text-[10px] text-muted-foreground">Active leads</p>
        </div>
      </div>

      {/* AI badge */}
      <div
        data-float
        data-depth="2"
        className="absolute left-8 top-0 flex items-center gap-1.5 rounded-full glass px-3 py-1.5 shadow-md"
      >
        <Zap className="h-3.5 w-3.5 text-amber-500" />
        <span className="text-[11px] font-medium text-foreground">AI Insights</span>
        <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
      </div>

      {/* Notification bell floater */}
      <div
        data-float
        data-depth="2.2"
        className="absolute left-0 top-1/2 grid h-11 w-11 place-items-center rounded-xl glass shadow-lg animate-float-slow [animation-delay:0.6s]"
      >
        <Bell className="h-4 w-4 text-blue-400" />
      </div>
    </div>
  );
}
