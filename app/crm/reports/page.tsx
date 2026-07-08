"use client";

import { PageHeader, PageShell } from "@/components/crm/page";
import { Button } from "@/components/ui/button";
import { FileText, Plus, ArrowUpRight, Download } from "lucide-react";
import { cn } from "@/lib/utils";

const reports = [
  { tag: "Revenue", title: "Q4 Revenue Report", metric: "$4.29M", trend: "+12.4%", updated: "Updated Today", active: false },
  { tag: "Sales", title: "Sales Performance", metric: "267 deals", trend: "+15.7%", updated: "Updated 2 days ago", active: false },
  { tag: "Customers", title: "Customer Health Index", metric: "94.2%", trend: "+0.8%", updated: "Updated Today", active: false },
  { tag: "Team", title: "Team Productivity", metric: "108%", trend: "+6.2%", updated: "Updated Yesterday", active: true },
  { tag: "Revenue", title: "Enterprise Segment Deep Dive", metric: "$2.14M", trend: "+22.1%", updated: "Updated 1 week ago", active: false },
  { tag: "Performance", title: "Regional Performance", metric: "4 regions", trend: "+14.2%", updated: "Updated 3 days ago", active: false },
];

export default function ReportsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="INTELLIGENCE"
        title="Reports"
        description="Curated executive reports across revenue, customers, and team performance."
        actions={
          <Button size="sm" className="h-9 rounded-full px-4 gap-1.5 bg-blue-500 hover:bg-blue-600 text-white border-0 shadow-sm">
            <Plus className="h-4 w-4" />New report
          </Button>
        }
      />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div 
            key={report.title} 
            className={cn(
              "relative rounded-3xl border bg-white p-6 shadow-sm hover:shadow-md transition-all flex flex-col",
              report.active ? "border-blue-500 shadow-md" : "border-border/60"
            )}
          >
            {report.active && (
              <div className="absolute top-0 left-4 right-4 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-b-md" />
            )}
            
            <div className="flex items-center justify-between">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-blue-50 text-blue-500">
                <FileText className="h-5 w-5" />
              </div>
              <div className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-500">
                {report.tag}
              </div>
            </div>

            <div className="mt-6 flex-1">
              <div className="text-[15px] font-bold text-slate-900">{report.title}</div>
              <div className="mt-3 flex items-end gap-3">
                <span className="text-[26px] font-bold tracking-tight text-slate-900 leading-none">{report.metric}</span>
                <span className="flex items-center gap-0.5 rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-bold text-green-600 mb-1">
                  <ArrowUpRight className="h-3 w-3 stroke-[3px]" /> {report.trend}
                </span>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-border/40 pt-4">
              <div className="text-[12px] font-medium text-slate-400">{report.updated}</div>
              <button className="flex items-center gap-1.5 text-[13px] font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                <Download className="h-3.5 w-3.5 stroke-[2.5px]" /> Export
              </button>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
