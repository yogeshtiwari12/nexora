"use client";

import { PageHeader, PageShell } from "@/components/crm/page";
import { Star, Clock, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

const teamData = [
  { initials: "SC", name: "Sarah Chen", role: "VP Sales", rating: 4.9, revenue: "$842k", pct: 26.9, deals: 34, tasks: 128, arpu: "$25k", growth: 18.4 },
  { initials: "MR", name: "Marcus Rivera", role: "Enterprise AE", rating: 4.8, revenue: "$685k", pct: 21.9, deals: 22, tasks: 96, arpu: "$31k", growth: 12.1 },
  { initials: "AO", name: "Amara Okafor", role: "Senior AE", rating: 4.7, revenue: "$542k", pct: 17.3, deals: 28, tasks: 112, arpu: "$19k", growth: 9.6 },
  { initials: "JP", name: "James Park", role: "Account Executive", rating: 4.6, revenue: "$428k", pct: 13.7, deals: 19, tasks: 84, arpu: "$23k", growth: -3.2 },
  { initials: "EV", name: "Elena Volkov", role: "Account Executive", rating: 4.8, revenue: "$385k", pct: 12.3, deals: 24, tasks: 102, arpu: "$16k", growth: 21.3 },
  { initials: "DN", name: "David Nakamura", role: "SDR Lead", rating: 4.5, revenue: "$245k", pct: 7.8, deals: 42, tasks: 156, arpu: "$6k", growth: 6.2 },
];

export default function TeamPerformancePage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="OPERATIONS"
        title="Team Performance"
        description="Executive overview of individual and team-wide contribution."
      />

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {teamData.map((rep) => {
          const isPositive = rep.growth >= 0;
          return (
            <div key={rep.initials} className="rounded-3xl border border-border/60 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-[13.5px] font-bold text-blue-600">
                    {rep.initials}
                  </div>
                  <div>
                    <div className="text-[14.5px] font-bold text-slate-900 leading-snug">{rep.name}</div>
                    <div className="text-[12.5px] text-slate-500">{rep.role}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[12.5px] font-bold text-slate-900 mt-1">
                  <Star className="h-3.5 w-3.5 fill-slate-900 text-slate-900" />
                  {rep.rating}
                </div>
              </div>

              <div className="mt-8">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <span>REVENUE</span>
                  <span className="text-blue-500 lowercase font-semibold text-[11.5px] tracking-normal">{rep.pct}% of team</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="text-[24px] font-extrabold tracking-tight text-slate-900 leading-none">
                    {rep.revenue}
                  </div>
                  <div
                    className={cn(
                      "flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-bold",
                      isPositive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                    )}
                  >
                    {isPositive ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {isPositive ? "+" : ""}
                    {rep.growth}% QoQ
                  </div>
                </div>
                <div className="mt-4 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-400"
                    style={{ width: `${rep.pct}%` }}
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-border/40 pt-5">
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <TrendingUp className="h-3 w-3" /> DEALS
                  </div>
                  <div className="mt-1 text-[15px] font-bold text-slate-900">{rep.deals}</div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <Clock className="h-3 w-3" /> TASKS
                  </div>
                  <div className="mt-1 text-[15px] font-bold text-slate-900">{rep.tasks}</div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <DollarSign className="h-3 w-3" /> ARPU
                  </div>
                  <div className="mt-1 text-[15px] font-bold text-slate-900">{rep.arpu}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </PageShell>
  );
}