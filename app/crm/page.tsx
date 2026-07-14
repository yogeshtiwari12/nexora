"use client";

import { useState } from "react";

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
  regionalSales, teamPerformance, insights, upcomingMeetings,
  monthlySales, forecast
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

const PIE_COLORS = [
  "oklch(0.6 0.19 258)",   // Deep Purple / Primary
  "oklch(0.7 0.18 320)",   // Magenta / Pink
  "oklch(0.75 0.16 150)",  // Green
  "oklch(0.72 0.2 45)",    // Orange
  "oklch(0.8 0.15 190)",   // Cyan / Light Blue
];

const insightIcons: Record<string, React.ReactNode> = {
  TrendingUp: <TrendingUp className="h-4.5 w-4.5" />,
  AlertTriangle: <AlertTriangle className="h-4.5 w-4.5" />,
  Award: <Award className="h-4.5 w-4.5" />,
  Clock: <Clock className="h-4.5 w-4.5" />,
  Users: <Users className="h-4.5 w-4.5" />,
};

export default function Dashboard() {
  const [selectedRange, setSelectedRange] = useState<"3M" | "6M" | "12M" | "YTD" | "Custom">("12M");
  const [customStart, setCustomStart] = useState("Jan");
  const [customEnd, setCustomEnd] = useState("Dec");

  const monthIndex: Record<string, number> = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
  };

  const filteredData = (() => {
    if (selectedRange === "3M") {
      return revenueTrend.slice(-3);
    }
    if (selectedRange === "6M") {
      return revenueTrend.slice(-6);
    }
    if (selectedRange === "12M") {
      return revenueTrend;
    }
    if (selectedRange === "YTD") {
      return revenueTrend.slice(0, 11);
    }
    if (selectedRange === "Custom") {
      const startIdx = monthIndex[customStart] ?? 0;
      const endIdx = monthIndex[customEnd] ?? 11;
      if (startIdx <= endIdx) {
        return revenueTrend.slice(startIdx, endIdx + 1);
      }
      return revenueTrend.slice(endIdx, startIdx + 1);
    }
    return revenueTrend;
  })();

  return (
    <PageShell>
      <PageHeader
        eyebrow="Executive Dashboard"
        title={<>Good Evening, <span className="text-primary">{`Madan`}</span></>}
        description="Here's what's happening across Meridian today."
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
        <div data-reveal className="bg-card rounded-[24px] border border-border/40 p-6 shadow-elevated lg:col-span-2">
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
            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
              <div className="flex gap-1 rounded-lg bg-secondary/60 p-0.5">
                {["3M", "6M", "12M", "YTD", "Custom"].map((r) => (
                  <button
                    key={r}
                    onClick={() => setSelectedRange(r as any)}
                    className={cn(
                      "rounded-md px-2.5 py-1 text-[11.5px] font-medium transition cursor-pointer",
                      selectedRange === r ? "bg-background text-foreground shadow-soft" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>
              {selectedRange === "Custom" && (
                <div className="flex items-center gap-1 text-[11.5px] bg-secondary/40 border border-border/70 rounded-lg p-1 animate-in fade-in slide-in-from-top-2 duration-300">
                  <select
                    value={customStart}
                    onChange={(e) => setCustomStart(e.target.value)}
                    className="bg-transparent border-0 outline-none text-foreground font-medium px-1.5 py-0.5 cursor-pointer rounded hover:bg-secondary/60 transition"
                  >
                    {Object.keys(monthIndex).map((m) => (
                      <option key={m} value={m} className="bg-popover text-foreground">{m}</option>
                    ))}
                  </select>
                  <span className="text-muted-foreground">to</span>
                  <select
                    value={customEnd}
                    onChange={(e) => setCustomEnd(e.target.value)}
                    className="bg-transparent border-0 outline-none text-foreground font-medium px-1.5 py-0.5 cursor-pointer rounded hover:bg-secondary/60 transition"
                  >
                    {Object.keys(monthIndex).map((m) => (
                      <option key={m} value={m} className="bg-popover text-foreground">{m}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
          <div className="mt-6 h-[280px]">
            <ResponsiveContainer>
              <AreaChart data={filteredData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
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

        <div data-reveal className="bg-card rounded-[24px] border border-border/40 p-6 shadow-elevated">
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
        <div data-reveal className="bg-card rounded-[24px] border border-border/40 p-6 shadow-elevated lg:col-span-3">
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

        <div data-reveal className="bg-card rounded-[24px] border border-border/40 p-6 shadow-elevated lg:col-span-2">
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

      {/* Analytics & Revenue Charts */}
      <div className="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div data-reveal className="bg-card rounded-[24px] border border-border/40 p-6 shadow-elevated">
          <div className="mb-4">
            <div className="text-[11.5px] font-semibold uppercase tracking-wider text-muted-foreground">Monthly Sales Analytics</div>
            <div className="mt-1 text-[20px] font-semibold tracking-tight">3,192 units</div>
          </div>
          <div className="mt-4 h-[260px]">
            <ResponsiveContainer>
              <BarChart data={monthlySales}>
                <CartesianGrid strokeDasharray="2 4" stroke="oklch(0.9 0.008 260)" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "oklch(0.52 0.02 260)", fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "oklch(0.52 0.02 260)", fontSize: 11 }} />
                <Tooltip contentStyle={{ background: "white", border: "1px solid oklch(0.93 0.006 260)", borderRadius: 12, fontSize: 12, boxShadow: "0 8px 24px -8px oklch(0.2 0.03 260 / 0.15)" }} />
                <Bar dataKey="sales" radius={[6, 6, 0, 0]} fill="oklch(0.6 0.19 258)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div data-reveal className="bg-card rounded-[24px] border border-border/40 p-6 shadow-elevated">
          <div className="mb-4">
            <div className="text-[11.5px] font-semibold uppercase tracking-wider text-muted-foreground">Revenue Forecast</div>
            <div className="mt-1 text-[20px] font-semibold tracking-tight">Next 3 months</div>
          </div>
          <div className="mt-4 h-[260px]">
            <ResponsiveContainer>
              <AreaChart data={forecast}>
                <defs>
                  <linearGradient id="fc2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.6 0.19 258)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="oklch(0.6 0.19 258)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="2 4" stroke="oklch(0.9 0.008 260)" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "oklch(0.52 0.02 260)", fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "oklch(0.52 0.02 260)", fontSize: 11 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ background: "white", border: "1px solid oklch(0.93 0.006 260)", borderRadius: 12, fontSize: 12, boxShadow: "0 8px 24px -8px oklch(0.2 0.03 260 / 0.15)" }} formatter={(v: any) => `$${v.toLocaleString('en-US')}`} />
                <Area type="monotone" dataKey="revenue" stroke="oklch(0.55 0.19 258)" strokeWidth={2.5} fill="url(#fc2)" />
                <Line type="monotone" dataKey="target" stroke="oklch(0.72 0.02 260)" strokeDasharray="4 4" strokeWidth={1.5} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Regional + Team + Meetings */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 mt-4">
        <div data-reveal className="bg-card rounded-[24px] border border-border/40 p-6 shadow-elevated">
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

        <div data-reveal className="bg-card rounded-[24px] border border-border/40 p-6 shadow-elevated">
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
                <YAxis type="category" dataKey="avatar" tickLine={false} axisLine={false} tick={{ fill: "oklch(0.52 0.02 260)", fontSize: 11, fontStyle: "normal", fontWeight: 600 }} width={30} />
                <Tooltip contentStyle={{ background: "white", border: "1px solid oklch(0.93 0.006 260)", borderRadius: 12, fontSize: 12 }} formatter={(v: any) => `$${v.toLocaleString('en-US')}`} />
                <Bar dataKey="revenue" radius={[0, 6, 6, 0]} fill="oklch(0.6 0.19 258)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div data-reveal className="bg-card rounded-[24px] border border-border/40 p-6 shadow-elevated">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-[11.5px] font-semibold uppercase tracking-wider text-muted-foreground">Upcoming Meetings</div>
              <div className="mt-1 text-[20px] font-semibold tracking-tight">6 this week</div>
            </div>
            <Button variant="ghost" size="sm" className="h-7 rounded-md text-[13px] font-medium text-primary hover:text-primary/80 hover:bg-transparent p-0">View all</Button>
          </div>
          <div className="space-y-3 max-h-[305px] overflow-y-auto pr-1 pb-4">
            {upcomingMeetings.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between rounded-[20px] border border-border/50 p-4 transition-all shadow-soft bg-card hover:border-primary/45 hover:shadow-[0_4px_12px_-2px_oklch(0.55_0.19_258_/_0.08)] hover:bg-primary/[0.01]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/10 bg-primary/[0.02] text-primary text-[12.5px] font-semibold tracking-tight">
                    {m.time}
                  </div>
                  <div>
                    <div className="text-[13.5px] font-semibold text-foreground leading-snug">{m.title}</div>
                    <div className="text-[11.5px] text-muted-foreground mt-0.5">{m.subtitle}</div>
                  </div>
                </div>
                <span className={cn(
                  "rounded-full px-2.5 py-0.5 text-[10.5px] font-semibold",
                  m.priority === "High" && "bg-destructive/10 text-destructive",
                  m.priority === "Medium" && "bg-warning/15 text-warning-foreground",
                )}>
                  {m.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
