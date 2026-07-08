"use client";

import { PageHeader, PageShell } from "@/components/crm/page";
import { revenueTrend, forecast, customerGrowth, acquisition, monthlySales } from "@/lib/mock-data";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";

const cardCls = "rounded-2xl border border-border/70 bg-card p-6 shadow-soft transition-all hover:shadow-elevated";
const axisTick = { fill: "oklch(0.52 0.02 260)", fontSize: 11 };
const tooltipStyle = { background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12, boxShadow: "0 8px 24px -8px rgba(0,0,0,0.15)" } as const;

export default function AnalyticsPage() {
  return (
    <PageShell>
      <PageHeader eyebrow="Intelligence" title="Executive Analytics" description="Deep-dive charts and forecasts across the business." />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div data-reveal className={cardCls}>
          <div className="text-[11.5px] font-semibold uppercase tracking-wider text-muted-foreground">Monthly Sales</div>
          <div className="mt-1 text-[22px] font-semibold tracking-tight">3,192 units</div>
          <div className="mt-4 h-[260px]">
            <ResponsiveContainer>
              <BarChart data={monthlySales}>
                <CartesianGrid strokeDasharray="2 4" stroke="oklch(0.93 0.006 260)" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={axisTick} />
                <YAxis tickLine={false} axisLine={false} tick={axisTick} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="sales" radius={[6, 6, 0, 0]} fill="oklch(0.6 0.19 258)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div data-reveal className={cardCls}>
          <div className="text-[11.5px] font-semibold uppercase tracking-wider text-muted-foreground">Customer Acquisition</div>
          <div className="mt-1 text-[22px] font-semibold tracking-tight">By channel</div>
          <div className="mt-4 h-[260px]">
            <ResponsiveContainer>
              <LineChart data={acquisition}>
                <CartesianGrid strokeDasharray="2 4" stroke="oklch(0.93 0.006 260)" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={axisTick} />
                <YAxis tickLine={false} axisLine={false} tick={axisTick} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="organic" stroke="oklch(0.6 0.19 258)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="paid" stroke="oklch(0.7 0.14 195)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="referral" stroke="oklch(0.72 0.15 155)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div data-reveal className={cardCls}>
          <div className="text-[11.5px] font-semibold uppercase tracking-wider text-muted-foreground">Revenue Forecast</div>
          <div className="mt-1 text-[22px] font-semibold tracking-tight">Next 3 months</div>
          <div className="mt-4 h-[260px]">
            <ResponsiveContainer>
              <AreaChart data={forecast}>
                <defs>
                  <linearGradient id="fc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.6 0.19 258)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="oklch(0.6 0.19 258)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="2 4" stroke="oklch(0.93 0.006 260)" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={axisTick} />
                <YAxis tickLine={false} axisLine={false} tick={axisTick} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v: any) => `$${v.toLocaleString('en-US')}`} />
                <Area type="monotone" dataKey="revenue" stroke="oklch(0.55 0.19 258)" strokeWidth={2.5} fill="url(#fc)" />
                <Line type="monotone" dataKey="target" stroke="oklch(0.72 0.02 260)" strokeDasharray="4 4" strokeWidth={1.5} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div data-reveal className={cardCls}>
          <div className="text-[11.5px] font-semibold uppercase tracking-wider text-muted-foreground">Customer Retention</div>
          <div className="mt-1 text-[22px] font-semibold tracking-tight">94.2% <span className="text-[13px] font-medium text-success">+0.8%</span></div>
          <div className="mt-4 h-[260px]">
            <ResponsiveContainer>
              <AreaChart data={customerGrowth.map((c, i) => ({ month: c.month, retention: 90 + Math.min(i * 0.4, 5) + Math.sin(i) * 0.6 }))}>
                <defs>
                  <linearGradient id="ret" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.68 0.16 155)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="oklch(0.68 0.16 155)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="2 4" stroke="oklch(0.93 0.006 260)" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={axisTick} />
                <YAxis domain={[85, 100]} tickLine={false} axisLine={false} tick={axisTick} tickFormatter={(v) => `${v}%`} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v: any) => `${v.toFixed(1)}%`} />
                <Area type="monotone" dataKey="retention" stroke="oklch(0.68 0.16 155)" strokeWidth={2.5} fill="url(#ret)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
