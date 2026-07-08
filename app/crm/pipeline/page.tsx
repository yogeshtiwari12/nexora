"use client";

import { useState } from "react";
import { PageHeader, PageShell } from "@/components/crm/page";
import { pipelineDeals } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Filter, Plus, MoreHorizontal, Briefcase } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const columns = ["Lead", "Qualified", "Proposal", "Won", "Lost"];

const stageStyles: Record<string, string> = {
  "Lead": "border-l-blue-500 hover:border-blue-300 bg-blue-50/30",
  "Qualified": "border-l-indigo-500 hover:border-indigo-300 bg-indigo-50/30",
  "Proposal": "border-l-amber-500 hover:border-amber-300 bg-amber-50/30",
  "Won": "border-l-emerald-500 hover:border-emerald-300 bg-emerald-50/30",
  "Lost": "border-l-rose-500 hover:border-rose-300 bg-rose-50/30"
};

export default function PipelinePage() {
  const [dealList, setDealList] = useState(pipelineDeals);
  const [addModalOpen, setAddModalOpen] = useState(false);
  
  const [newDealData, setNewDealData] = useState({
    title: "",
    company: "",
    value: 0,
    stage: "Lead",
    assignee: "",
  });

  const handleCreateDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDealData.title || !newDealData.company) return;

    const newDeal = {
      id: `DEAL-${Math.floor(Math.random() * 10000)}`,
      title: newDealData.title,
      company: newDealData.company,
      value: Number(newDealData.value) || 0,
      stage: newDealData.stage,
      assignee: newDealData.assignee || "Unassigned",
      probability: 50, // Added to match pipelineDeals type
    };

    setDealList(prev => [newDeal, ...prev]);
    setAddModalOpen(false);
    setNewDealData({ title: "", company: "", value: 0, stage: "Lead", assignee: "" });
  };

  return (
    <PageShell>
      <PageHeader
        eyebrow="Relationships"
        title="Sales Pipeline"
        description="Track and manage active deals across the entire sales cycle."
        actions={
          <Button size="sm" className="h-9 rounded-lg gap-1.5 gradient-primary text-white shadow-elevated border-0" onClick={() => setAddModalOpen(true)}>
            <Plus className="h-3.5 w-3.5" />New Deal
          </Button>
        }
      />

      <div data-reveal className="flex flex-wrap items-center gap-2 rounded-[24px] border border-border/40 bg-card p-3 shadow-elevated mt-5">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search deals, companies, assignees…" className="h-9 rounded-lg pl-9 bg-secondary/40 border-border/70" />
        </div>
        <Button variant="outline" size="sm" className="h-9 rounded-lg gap-1.5 border-border/70"><Filter className="h-3.5 w-3.5" />All Stages</Button>
        <Button variant="outline" size="sm" className="h-9 rounded-lg gap-1.5 border-border/70"><Filter className="h-3.5 w-3.5" />All Assignees</Button>
      </div>

      <div data-reveal className="mt-5 flex gap-5 overflow-x-auto pb-4">
        {columns.map((col) => {
          const colDeals = dealList.filter(d => d.stage === col);
          const colValue = colDeals.reduce((sum, d) => sum + d.value, 0);

          return (
            <div key={col} className="w-[320px] shrink-0 rounded-[24px] bg-secondary/30 border border-border/40 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-[13px] font-semibold tracking-wide text-slate-900 uppercase">{col}</h3>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary/60 text-[11px] font-semibold text-muted-foreground">
                    {colDeals.length}
                  </span>
                </div>
                <div className="text-[12px] font-semibold text-slate-700 tabular-nums">
                  ${(colValue / 1000).toFixed(0)}k
                </div>
              </div>
              
              <div className="space-y-3">
                {colDeals.map(deal => (
                  <div key={deal.id} className={cn("group rounded-[16px] border border-slate-200 p-4 shadow-sm transition-all hover:shadow-elevated cursor-pointer border-l-[4px]", stageStyles[col] || "bg-white")}>
                    <div className="flex items-start justify-between">
                      <div className="text-[11.5px] font-semibold text-muted-foreground uppercase tracking-wider">{deal.company}</div>
                      <Button variant="ghost" size="icon" className="h-6 w-6 -mr-2 text-slate-400 hover:text-slate-900 hover:bg-transparent"><MoreHorizontal className="h-3.5 w-3.5" /></Button>
                    </div>
                    <div className="mt-1 text-[14px] font-semibold text-slate-900 leading-tight">{deal.title}</div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-[13px] font-semibold text-slate-700 tabular-nums">${deal.value.toLocaleString()}</div>
                      <Avatar className="h-6 w-6 border border-border/40 shadow-sm" title={deal.assignee}>
                        <AvatarFallback className="bg-primary/10 text-primary text-[9px] font-bold">
                          {deal.assignee.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Deal Modal */}
      <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
        <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden border-border/70 bg-white rounded-2xl shadow-elevated">
          <div className="p-6 border-b border-border/70 bg-slate-50/80">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-slate-900">
                <div className="h-8 w-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shadow-sm">
                  <Briefcase className="h-4 w-4" />
                </div>
                <div className="text-[17px] font-bold tracking-tight">Add New Deal</div>
              </DialogTitle>
            </DialogHeader>
          </div>
          
          <form onSubmit={handleCreateDeal}>
            <div className="p-6 space-y-4 bg-white">
              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-slate-700">Deal Title <span className="text-red-500">*</span></label>
                <Input 
                  required
                  placeholder="e.g. Website Redesign" 
                  className="h-10 rounded-xl bg-slate-50/50 border-slate-200"
                  value={newDealData.title}
                  onChange={(e) => setNewDealData({...newDealData, title: e.target.value})}
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-slate-700">Company <span className="text-red-500">*</span></label>
                <Input 
                  required
                  placeholder="Acme Corp" 
                  className="h-10 rounded-xl bg-slate-50/50 border-slate-200"
                  value={newDealData.company}
                  onChange={(e) => setNewDealData({...newDealData, company: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-slate-700">Value ($)</label>
                  <Input 
                    type="number"
                    placeholder="10000" 
                    className="h-10 rounded-xl bg-slate-50/50 border-slate-200"
                    value={newDealData.value || ""}
                    onChange={(e) => setNewDealData({...newDealData, value: Number(e.target.value)})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-slate-700">Stage</label>
                  <select 
                    className="w-full h-10 rounded-xl bg-slate-50/50 border border-slate-200 px-3 text-sm text-slate-900 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    value={newDealData.stage}
                    onChange={(e) => setNewDealData({...newDealData, stage: e.target.value})}
                  >
                    {columns.map(stage => (
                      <option key={stage} value={stage}>{stage}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-slate-700">Assignee</label>
                <Input 
                  placeholder="Jane Smith" 
                  className="h-10 rounded-xl bg-slate-50/50 border-slate-200"
                  value={newDealData.assignee}
                  onChange={(e) => setNewDealData({...newDealData, assignee: e.target.value})}
                />
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
                className="bg-amber-600 hover:bg-amber-700 text-white shadow-sm font-medium px-6 rounded-xl h-10"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Deal
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </PageShell>
  );
}
