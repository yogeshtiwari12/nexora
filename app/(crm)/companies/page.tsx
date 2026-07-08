"use client";

import { PageHeader, PageShell } from "@/components/crm/page";
import { companies } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, DollarSign, Briefcase, MoreHorizontal, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const statusStyle: Record<string, string> = {
  Enterprise: "bg-primary text-primary-foreground",
  "Mid-Market": "bg-info/10 text-info",
  Prospect: "bg-warning/15 text-warning-foreground",
  Inactive: "bg-secondary text-muted-foreground",
};

export default function CompaniesPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Relationships"
        title="Companies"
        description="Enterprise accounts organized by segment, industry, and account owner."
        actions={
          <Button size="sm" className="h-9 rounded-lg gap-1.5 gradient-primary text-white shadow-elevated">
            <Plus className="h-3.5 w-3.5" />New company
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {companies.map((c) => (
          <div key={c.id} data-reveal className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated">
            <div className="absolute inset-x-0 top-0 h-1 gradient-primary opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-[13px] font-bold text-primary">
                  {c.initials}
                </div>
                <div>
                  <div className="text-[15px] font-semibold tracking-tight">{c.name}</div>
                  <div className="text-[11.5px] text-muted-foreground">{c.industry}</div>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button>
            </div>

            <Badge className={cn("mt-3 rounded-full border-0 px-2 py-0.5 text-[10.5px] font-semibold", statusStyle[c.status])}>{c.status}</Badge>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-secondary/50 p-3">
                <div className="flex items-center gap-1.5 text-[10.5px] font-medium uppercase tracking-wider text-muted-foreground">
                  <DollarSign className="h-3 w-3" />Revenue
                </div>
                <div className="mt-1 text-[15px] font-semibold tabular-nums">{c.revenue}</div>
              </div>
              <div className="rounded-xl bg-secondary/50 p-3">
                <div className="flex items-center gap-1.5 text-[10.5px] font-medium uppercase tracking-wider text-muted-foreground">
                  <Users className="h-3 w-3" />Employees
                </div>
                <div className="mt-1 text-[15px] font-semibold tabular-nums">{c.employees.toLocaleString('en-US')}</div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
              <div>
                <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground">Account Manager</div>
                <div className="mt-0.5 text-[12.5px] font-medium">{c.manager}</div>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-semibold text-primary">
                <Briefcase className="h-3 w-3" />{c.deals} deals
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
