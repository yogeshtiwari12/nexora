"use client";

import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis, Line
} from "recharts";
import {
  ArrowUpRight, DollarSign, TrendingUp, Users, UserPlus, Percent,
  ShieldCheck, Target, Briefcase, Sparkles, AlertTriangle, Award, Calendar, Clock,
  MoreHorizontal,
} from "lucide-react";
import { PageHeader, PageShell } from "@/components/crm/page";
import { KpiCard } from "@/components/crm/kpi-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  kpis, revenueTrend, customerGrowth, funnel, revenueSources,
  regionalSales, teamPerformance, insights
} from "@/lib/mock-data";

const kpiIcons: Record<string, React.ReactNode> = {
  revenue: <DollarSign className="h-4.5 w-4.5" />,
  growth: <TrendingUp className="h-4.5 w-4.5" />,
  customers: <Users className="h-4.5 w-4.5" />,
  new: <UserPlus className="h-4.5 w-4.5" />,
  conversion: <Percent className="h-4.5 w-4.5" />,
  retention: <ShieldCheck className="h-4.5 w-4.5" />,
  sales: <Target className="h-4.5 w-4.5" />,
  opps: <Briefcase className="h-4.5 w-4.5" />,
};

const insightIcons: Record<string, React.ReactNode> = {
  TrendingUp: <TrendingUp className="h-4 w-4" />,
  Users: <Users className="h-4 w-4" />,
  AlertTriangle: <AlertTriangle className="h-4 w-4" />,
  Calendar: <Calendar className="h-4 w-4" />,
  Award: <Award className="h-4 w-4" />,
  Clock: <Clock className="h-4 w-4" />,
};

const PIE_COLORS = ["oklch(0.6 0.19 258)", "oklch(0.7 0.14 195)", "oklch(0.72 0.15 155)", "oklch(0.78 0.15 75)"];

export default function Dashboard() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Executive Dashboard"
        title="Good afternoon, Alex"
        description="Here's what's happening across Meridian today — revenue is tracking 12.4% ahead of plan."
        actions={
          <>
            <Button variant="outline" size="sm" className="h-9 rounded-lg">Export</Button>
            <Button size="sm" className="h-9 gap-1.5 rounded-lg gradient-primary text-white shadow-elevated">
              <Sparkles className="h-3.5 w-3.5" /> Generate briefing
            </Button>
          </>
        }
      />

      {/* KPI Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k, i) => (
          <KpiCard
            key={k.id}
            label={k.label}
            value={k.value}
            prefix={k.prefix}
            suffix={k.suffix}
            change={k.change}
            trend={k.trend as "up" | "down"}
            sparkline={k.sparkline}
            icon={kpiIcons[k.id]}
            delay={i * 50}
          />
        ))}
      </div>

      {/* Revenue trend + Revenue sources */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div data-reveal className="rounded-2xl border border-border/70 bg-card p-6 shadow-soft lg:col-span-2">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[11.5px] font-semibold uppercase tracking-wider text-muted-foreground">Revenue Trend</div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-[24px] font-semibold tracking-tight">$4.29M</span>
                <span className="inline-flex items-center gap-0.5 rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-semibold text-success">
                  <ArrowUpRight className="h-3 w-3" /> +12.4%
                </span>
              </div>
              <div className="mt-0.5 text-[12px] text-muted-foreground">vs. $3.82M last year</div>
            </div>
            <div className="flex gap-1 rounded-lg bg-secondary/60 p-0.5">
              {["3M", "6M", "12M", "YTD"].map((r, i) => (
                <button
                  key={r}
                  className={cn(
                    "rounded-md px-2.5 py-1 text-[11.5px] font-medium transition",
                    i === 2 ? "bg-background text-foreground shadow-soft" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6 h-[280px]">
            <ResponsiveContainer>
              <AreaChart data={revenueTrend} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.6 0.19 258)" stopOpacity={0.28} />
                    <stop offset="100%" stopColor="oklch(0.6 0.19 258)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="2 4" stroke="oklch(0.9 0.008 260)" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "oklch(0.52 0.02 260)", fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "oklch(0.52 0.02 260)", fontSize: 11 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                  contentStyle={{ background: "white", border: "1px solid oklch(0.93 0.006 260)", borderRadius: 12, fontSize: 12, boxShadow: "0 8px 24px -8px oklch(0.2 0.03 260 / 0.15)" }}
                  formatter={(v: any) => [`$${v.toLocaleString('en-US')}`, ""]}
                />
                <Area type="monotone" dataKey="target" stroke="oklch(0.75 0.02 260)" strokeDasharray="4 4" strokeWidth={1.5} fill="none" />
                <Area type="monotone" dataKey="revenue" stroke="oklch(0.55 0.19 258)" strokeWidth={2.5} fill="url(#rev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div data-reveal className="rounded-2xl border border-border/70 bg-card p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11.5px] font-semibold uppercase tracking-wider text-muted-foreground">Revenue Sources</div>
              <div className="mt-1 text-[20px] font-semibold tracking-tight">$4.29M</div>
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button>
          </div>
          <div className="mt-3 h-[180px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={revenueSources} dataKey="value" nameKey="name" innerRadius={55} outerRadius={78} paddingAngle={2} stroke="none" isAnimationActive={false}>
                  {revenueSources.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "white", border: "1px solid oklch(0.93 0.006 260)", borderRadius: 12, fontSize: 12 }} formatter={(v: any) => `$${(v / 1000).toFixed(0)}k`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 space-y-2">
            {revenueSources.map((s, i) => (
              <div key={s.name} className="flex items-center justify-between text-[12.5px]">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: PIE_COLORS[i] }} />
                  <span className="text-foreground">{s.name}</span>
                </div>
                <span className="font-medium tabular-nums">${(s.value / 1000).toFixed(0)}k</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer growth + Funnel */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
        <div data-reveal className="rounded-2xl border border-border/70 bg-card p-6 shadow-soft lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-[11.5px] font-semibold uppercase tracking-wider text-muted-foreground">Customer Growth</div>
              <div className="mt-1 text-[20px] font-semibold tracking-tight">12,847 <span className="text-[13px] font-medium text-success">+8.1%</span></div>
            </div>
            <div className="flex items-center gap-3 text-[11.5px] text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" /> Customers</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-destructive/70" /> Churn</span>
            </div>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer>
              <AreaChart data={customerGrowth} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="cust" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.6 0.19 258)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="oklch(0.6 0.19 258)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="2 4" stroke="oklch(0.9 0.008 260)" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "oklch(0.52 0.02 260)", fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "oklch(0.52 0.02 260)", fontSize: 11 }} />
                <Tooltip contentStyle={{ background: "white", border: "1px solid oklch(0.93 0.006 260)", borderRadius: 12, fontSize: 12 }} />
                <Area type="monotone" dataKey="customers" stroke="oklch(0.55 0.19 258)" strokeWidth={2} fill="url(#cust)" />
                <Line type="monotone" dataKey="churn" stroke="oklch(0.6 0.22 25)" strokeWidth={1.5} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div data-reveal className="rounded-2xl border border-border/70 bg-card p-6 shadow-soft lg:col-span-2">
          <div className="mb-4">
            <div className="text-[11.5px] font-semibold uppercase tracking-wider text-muted-foreground">Lead Conversion Funnel</div>
            <div className="mt-1 text-[20px] font-semibold tracking-tight">0.80% overall</div>
          </div>
          <div className="space-y-2.5">
            {funnel.map((f, i) => {
              const max = funnel[0].value;
              const width = (f.value / max) * 100;
              const pct = i === 0 ? 100 : (f.value / funnel[i - 1].value) * 100;
              return (
                <div key={f.stage}>
                  <div className="flex items-baseline justify-between text-[12px]">
                    <span className="font-medium text-foreground">{f.stage}</span>
                    <span className="tabular-nums text-muted-foreground">{f.value.toLocaleString('en-US')} · {pct.toFixed(1)}%</span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-secondary/70">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${width}%`, background: `linear-gradient(90deg, oklch(0.6 0.19 258), oklch(0.7 0.14 195))` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="mt-4">
        <div className="mb-3 flex items-center gap-2">
          <div className="grid h-6 w-6 place-items-center rounded-md gradient-primary text-white">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <h2 className="text-[15px] font-semibold tracking-tight">Executive Insights</h2>
          <span className="text-[11.5px] text-muted-foreground">Updated 2 min ago</span>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {insights.map((it) => (
            <div
              key={it.id}
              data-reveal
              className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated"
            >
              <div className={cn(
                "grid h-9 w-9 place-items-center rounded-xl",
                it.tone === "success" && "bg-success/10 text-success",
                it.tone === "warning" && "bg-warning/15 text-warning-foreground",
                it.tone === "info" && "bg-primary-soft text-primary",
              )}>
                {insightIcons[it.icon as string]}
              </div>
              <div className="mt-3 text-[14px] font-semibold tracking-tight">{it.title}</div>
              <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">{it.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Regional + Team + Meetings */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 mt-4">
        <div data-reveal className="rounded-2xl border border-border/70 bg-card p-6 shadow-soft">
          <div className="mb-4">
            <div className="text-[11.5px] font-semibold uppercase tracking-wider text-muted-foreground">Regional Sales</div>
            <div className="mt-1 text-[20px] font-semibold tracking-tight">4 regions</div>
          </div>
          <div className="space-y-3">
            {regionalSales.map((r) => (
              <div key={r.region} className="rounded-xl border border-border/60 bg-secondary/30 p-3">
                <div className="flex items-center justify-between">
                  <div className="text-[13px] font-semibold">{r.region}</div>
                  <div className="inline-flex items-center gap-0.5 rounded-full bg-success/10 px-1.5 py-0.5 text-[10.5px] font-semibold text-success">
                    <ArrowUpRight className="h-2.5 w-2.5" />+{r.growth}%
                  </div>
                </div>
                <div className="mt-1.5 flex items-end justify-between">
                  <span className="text-[15px] font-semibold tabular-nums">${(r.value / 1000).toFixed(0)}k</span>
                  <span className="text-[11px] text-muted-foreground">{r.share}% of total</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-background">
                  <div className="h-full gradient-primary rounded-full" style={{ width: `${r.share * 2}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div data-reveal className="rounded-2xl border border-border/70 bg-card p-6 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-[11.5px] font-semibold uppercase tracking-wider text-muted-foreground">Sales Team Performance</div>
              <div className="mt-1 text-[20px] font-semibold tracking-tight">$3.13M closed</div>
            </div>
          </div>
          <div className="h-[260px]">
            <ResponsiveContainer>
              <BarChart data={teamPerformance} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="2 4" stroke="oklch(0.93 0.006 260)" horizontal={false} />
                <XAxis type="number" tickLine={false} axisLine={false} tick={{ fill: "oklch(0.52 0.02 260)", fontSize: 11 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <YAxis type="category" dataKey="avatar" tickLine={false} axisLine={false} tick={{ fill: "oklch(0.52 0.02 260)", fontSize: 11, fontWeight: 600 }} width={30} />
                <Tooltip contentStyle={{ background: "white", border: "1px solid oklch(0.93 0.006 260)", borderRadius: 12, fontSize: 12 }} formatter={(v: any) => `$${v.toLocaleString('en-US')}`} />
                <Bar dataKey="revenue" radius={[0, 6, 6, 0]} fill="oklch(0.6 0.19 258)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div data-reveal className="rounded-2xl border border-border/70 bg-card p-6 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-[11.5px] font-semibold uppercase tracking-wider text-muted-foreground">Upcoming Meetings</div>
              <div className="mt-1 text-[20px] font-semibold tracking-tight">6 this week</div>
            </div>
            <Button variant="ghost" size="sm" className="h-7 rounded-md text-[11px] font-semibold">View All</Button>
          </div>
          {/* Mocking the meetings since they were truncated */}
          <div className="space-y-3">
             <div className="text-[13px] text-muted-foreground mt-10 text-center py-4">Meetings loaded from backend...</div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
