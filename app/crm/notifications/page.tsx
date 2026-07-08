"use client";

import { PageHeader, PageShell } from "@/components/crm/page";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const notifications = [
  { group: "TODAY", items: [
    { id: 1, color: "bg-red-500", title: "Sakura Digital contract signed", desc: "$612k ACV — automatic renewal enabled.", time: "12 min ago" },
    { id: 2, color: "bg-amber-500", title: "Q4 board deck ready for review", desc: "Finance team completed the Q4 executive summary.", time: "1h ago" },
    { id: 3, color: "bg-red-500", title: "3 opportunities require your approval", desc: "Discounts above 15% pending executive sign-off.", time: "2h ago" },
  ]},
  { group: "YESTERDAY", items: [
    { id: 4, color: "bg-amber-500", title: "Team achieved 108% of monthly quota", desc: "Highest performance quarter to date.", time: "Yesterday, 18:20" },
    { id: 5, color: "bg-amber-500", title: "New enterprise lead: Orbital Fintech", desc: "Inbound from investor referral network.", time: "Yesterday, 14:05" },
  ]},
  { group: "EARLIER", items: [
    { id: 6, color: "bg-slate-300", title: "Weekly executive digest available", desc: "View your personalized performance insights.", time: "Oct 12, 09:00" },
  ]}
];

export default function NotificationsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="INBOX"
        title="Notifications"
        description="Everything that needs your attention, organized by recency and priority."
        actions={
          <Button variant="outline" size="sm" className="h-9 rounded-full px-4 border-slate-200 text-slate-700 shadow-sm font-semibold text-[13px]">
            Mark all read
          </Button>
        }
      />

      <div className="mt-8 max-w-4xl space-y-8">
        {notifications.map((group) => (
          <div key={group.group}>
            <div className="mb-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              {group.group}
            </div>
            <div className="rounded-3xl border border-border/60 bg-white shadow-sm overflow-hidden">
              <div className="divide-y divide-border/40">
                {group.items.map((notif) => (
                  <div key={notif.id} className="flex items-start gap-4 p-5 hover:bg-slate-50/50 transition-colors">
                    <div className="mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center">
                      <div className={cn("h-2.5 w-2.5 rounded-full", notif.color)} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="text-[14.5px] font-bold text-slate-900">{notif.title}</div>
                      <div className="mt-0.5 text-[13px] font-medium text-slate-500">{notif.desc}</div>
                      <div className="mt-2 text-[11.5px] font-medium text-slate-400">{notif.time}</div>
                    </div>
                    
                    <button className="flex items-center gap-1.5 text-[12.5px] font-semibold text-slate-400 hover:text-slate-700 transition-colors mt-1">
                      <Check className="h-4 w-4" /> Mark read
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
