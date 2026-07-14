"use client";

import { useState } from "react";
import { PageHeader, PageShell } from "@/components/crm/page";
import { companies } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Building2, Users, DollarSign, Briefcase, MoreHorizontal, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const statusStyle: Record<string, string> = {
  Enterprise: "bg-blue-400 text-white",
  "Mid-Market": "bg-info/10 text-info",
  Prospect: "bg-warning/15 text-warning-foreground",
  Inactive: "bg-secondary text-muted-foreground",
};

const uniqueIndustries = Array.from(new Set(companies.map(c => c.industry)));

export default function CompaniesPage() {
  const [companyList, setCompanyList] = useState(companies);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newCompanyData, setNewCompanyData] = useState({
    name: "",
    industry: "Technology",
    revenue: "$0M",
    employees: 0,
    manager: "",
  });

  const handleCreateCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompanyData.name) return;

    const initials = newCompanyData.name
      .split(" ")
      .map(n => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();

    const newCompany = {
      id: `COMP-${Math.floor(Math.random() * 10000)}`,
      name: newCompanyData.name,
      initials: initials || "C",
      industry: newCompanyData.industry,
      status: "Prospect",
      revenue: newCompanyData.revenue || "$0M",
      employees: Number(newCompanyData.employees) || 1,
      manager: newCompanyData.manager || "Unassigned",
      deals: 0,
    };

    setCompanyList(prev => [newCompany, ...prev]);
    setAddModalOpen(false);
    setNewCompanyData({ name: "", industry: "Technology", revenue: "$0M", employees: 0, manager: "" });
  };

  return (
    <PageShell>
      <PageHeader
        eyebrow="Relationships"
        title="Companies"
        description="Enterprise accounts organized by segment, industry, and account owner."
        actions={
          <Button size="sm" className="h-9 rounded-lg gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white shadow-elevated" onClick={() => setAddModalOpen(true)}>
            <Plus className="h-3.5 w-3.5" />New company
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {companyList.map((c) => (
          <div key={c.id} data-reveal className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-50 text-[13px] font-bold text-emerald-600">
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
              <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-600">
                <Briefcase className="h-3 w-3" />{c.deals} deals
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Company Modal */}
      <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
        <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden border-border/70 bg-white rounded-2xl shadow-elevated">
          <div className="p-6 border-b border-border/70 bg-slate-50/80">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-slate-900">
                <div className="h-8 w-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-sm">
                  <Building2 className="h-4 w-4" />
                </div>
                <div className="text-[17px] font-bold tracking-tight">Add New Company</div>
              </DialogTitle>
            </DialogHeader>
          </div>

          <form onSubmit={handleCreateCompany}>
            <div className="p-6 space-y-4 bg-white">
              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-slate-700">Company Name <span className="text-red-500">*</span></label>
                <Input
                  required
                  placeholder="Acme Corp"
                  className="h-10 rounded-xl bg-slate-50/50 border-slate-200"
                  value={newCompanyData.name}
                  onChange={(e) => setNewCompanyData({ ...newCompanyData, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-slate-700">Industry</label>
                  <select
                    className="w-full h-10 rounded-xl bg-slate-50/50 border border-slate-200 px-3 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    value={newCompanyData.industry}
                    onChange={(e) => setNewCompanyData({ ...newCompanyData, industry: e.target.value })}
                  >
                    {uniqueIndustries.map(ind => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-slate-700">Account Manager</label>
                  <Input
                    placeholder="John Doe"
                    className="h-10 rounded-xl bg-slate-50/50 border-slate-200"
                    value={newCompanyData.manager}
                    onChange={(e) => setNewCompanyData({ ...newCompanyData, manager: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-slate-700">Annual Revenue</label>
                  <Input
                    placeholder="$10M"
                    className="h-10 rounded-xl bg-slate-50/50 border-slate-200"
                    value={newCompanyData.revenue}
                    onChange={(e) => setNewCompanyData({ ...newCompanyData, revenue: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-slate-700">Employees</label>
                  <Input
                    type="number"
                    placeholder="1000"
                    className="h-10 rounded-xl bg-slate-50/50 border-slate-200"
                    value={newCompanyData.employees || ""}
                    onChange={(e) => setNewCompanyData({ ...newCompanyData, employees: Number(e.target.value) })}
                  />
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                className="font-medium px-4 rounded-xl h-10"
                onClick={() => setAddModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm font-medium px-6 rounded-xl h-10"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Company
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </PageShell>
  );
}
