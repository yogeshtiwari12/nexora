import { ArrowUpRight, TrendingUp } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
const projects = [
  {
    name: "AtlasCRM",
    industry: "Manufacturing",
    challenge: "Sales tracked in spreadsheets; leads slipping through the cracks.",
    solution: "Unified CRM with automated pipelines, quotes, and reporting.",
    tech: ["React", "Node.js", "PostgreSQL"],
    impact: "3.2× faster deal cycles",
    before: "Manual, error-prone",
    after: "Fully automated",
    accent: "from-blue-500/20 to-cyan-500/10",
  },
  {
    name: "OpsFlow ERP",
    industry: "Printing & Packaging",
    challenge: "Disconnected inventory, production, and finance systems.",
    solution: "End-to-end ERP unifying operations into one live dashboard.",
    tech: ["Next.js", "Python", "AWS"],
    impact: "40% lower overhead",
    before: "6 siloed tools",
    after: "1 platform",
    accent: "from-violet-500/20 to-blue-500/10",
  },
  {
    name: "MediCare Suite",
    industry: "Healthcare",
    challenge: "Paper records and long patient wait times.",
    solution: "Digital EMR with online booking and patient portal.",
    tech: ["Flutter", "Node.js", "Redis"],
    impact: "70% less paperwork",
    before: "Paper-based",
    after: "Fully digital",
    accent: "from-cyan-500/20 to-violet-500/10",
  },
  {
    name: "SmartCampus",
    industry: "Education",
    challenge: "Fragmented admissions, attendance, and fee collection.",
    solution: "All-in-one school platform with parent & staff apps.",
    tech: ["React", "GraphQL", "Docker"],
    impact: "2× admin efficiency",
    before: "Manual registers",
    after: "Automated LMS",
    accent: "from-blue-500/20 to-violet-500/10",
  },
];

function MiniDashboard({ accent }: { accent: string }) {
  return (
    <div className={`relative h-44 overflow-hidden rounded-xl bg-gradient-to-br ${accent}`}>
      <div className="absolute inset-0 opacity-40 bg-[url('/grid.svg')] bg-center" />
      <div className="absolute inset-4 rounded-lg glass p-3">
        <div className="flex items-center justify-between">
          <div className="h-2 w-16 rounded-full bg-white/20" />
          <div className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="h-2 w-2 rounded-full bg-amber-400" />
          </div>
        </div>
        <div className="mt-3 flex h-16 items-end gap-1.5">
          {[40, 65, 50, 80, 60, 90, 72, 84].map((h, i) => (
            <div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-blue-500 to-indigo-400" style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-4 rounded bg-white/10" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Portfolio() {
  return (
    <section id="work" className="relative py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Portfolio & Success Stories"
          title={<>Real systems, <span className="text-gradient-brand">real business impact</span></>}
          description="A look at platforms we've built and the measurable results they delivered. Hover to explore the details."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <div
              key={p.name}
              className="group relative overflow-hidden rounded-3xl glass p-5 shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-500/50 hover:shadow-[var(--shadow-glow)]"
            >
              <MiniDashboard accent={p.accent} />

              <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-medium uppercase tracking-wider text-cyan-400">
                    {p.industry}
                  </span>
                  <h3 className="mt-1 text-xl font-semibold text-foreground">{p.name}</h3>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400">
                  <TrendingUp className="h-3.5 w-3.5" /> {p.impact}
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">Challenge:</span> {p.challenge}
              </p>

              {/* Reveal details */}
              <div className="grid grid-rows-[0fr] transition-all duration-500 group-hover:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <div className="pt-3">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      <span className="font-medium text-foreground">Solution:</span> {p.solution}
                    </p>
                    <div className="mt-4 flex items-center gap-3 rounded-xl bg-white/5 p-3 text-sm">
                      <div className="flex-1 text-center">
                        <p className="text-xs text-muted-foreground">Before</p>
                        <p className="mt-0.5 font-medium text-rose-400">{p.before}</p>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-blue-400" />
                      <div className="flex-1 text-center">
                        <p className="text-xs text-muted-foreground">After</p>
                        <p className="mt-0.5 font-medium text-emerald-400">{p.after}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
