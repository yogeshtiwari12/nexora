"use client";

import { PageHeader, PageShell } from "@/components/crm/page";
import { activityLogs } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function ActivityPage() {
  return (
    <PageShell>
      <PageHeader eyebrow="Intelligence" title="Activity Logs" description="Full audit trail of every action across the workspace." />

      <div data-reveal className="flex flex-wrap items-center gap-2 rounded-2xl border border-border/70 bg-card p-3 shadow-soft">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search actions, users, modules…" className="h-9 rounded-lg pl-9 bg-secondary/40 border-border" />
        </div>
        <Button variant="outline" size="sm" className="h-9 rounded-lg gap-1.5"><Filter className="h-3.5 w-3.5" />All modules</Button>
        <Button variant="outline" size="sm" className="h-9 rounded-lg gap-1.5"><Filter className="h-3.5 w-3.5" />All users</Button>
        <Button variant="outline" size="sm" className="h-9 rounded-lg gap-1.5"><Filter className="h-3.5 w-3.5" />Last 7 days</Button>
      </div>

      <div data-reveal className="rounded-2xl border border-border/70 bg-card shadow-soft overflow-hidden">
        <div className="grid grid-cols-12 gap-4 border-b border-border/70 bg-secondary/40 px-5 py-3 text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground">
          <div className="col-span-3">User</div>
          <div className="col-span-3">Action</div>
          <div className="col-span-2">Module</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-2">IP</div>
          <div className="col-span-1 text-right">Time</div>
        </div>
        <div className="divide-y divide-border/60">
          {activityLogs.map((l) => (
            <div key={l.id} className="grid grid-cols-12 items-center gap-4 px-5 py-3 text-[12.5px] transition-colors hover:bg-secondary/40">
              <div className="col-span-3 flex items-center gap-2.5">
                <Avatar className="h-7 w-7"><AvatarFallback className="bg-primary-soft text-primary text-[10px] font-semibold">{l.user.split(" ").map(n => n[0]).join("")}</AvatarFallback></Avatar>
                <span className="font-medium">{l.user}</span>
              </div>
              <div className="col-span-3 font-medium">{l.action}</div>
              <div className="col-span-2">
                <Badge variant="outline" className="rounded-full border-border bg-secondary/60 px-2 py-0 text-[10.5px] font-medium text-muted-foreground">{l.module}</Badge>
              </div>
              <div className="col-span-1">
                <span className={cn(
                  "inline-flex h-1.5 w-1.5 rounded-full",
                  l.status === "success" && "bg-success animate-pulse",
                  l.status === "warning" && "bg-warning",
                )} />
                <span className="ml-2 text-[11px] text-muted-foreground capitalize">{l.status}</span>
              </div>
              <div className="col-span-2 font-mono text-[11.5px] text-muted-foreground">{l.ip}</div>
              <div className="col-span-1 text-right text-[11.5px] text-muted-foreground">{l.timestamp}</div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
