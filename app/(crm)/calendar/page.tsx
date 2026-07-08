"use client";

import { PageHeader, PageShell } from "@/components/crm/page";
import { calendarEvents } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CalendarPage() {
  const days = Array.from({ length: 35 }, (_, i) => i - 3); // Nov starts on day -3 offset for visual
  const eventsByDay: Record<number, typeof calendarEvents[number]["items"]> = {};
  calendarEvents.forEach((e) => (eventsByDay[e.day] = e.items));

  const toneStyle: Record<string, string> = {
    primary: "bg-primary-soft text-primary border-primary/20",
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/15 text-warning-foreground border-warning/20",
  };

  return (
    <PageShell>
      <PageHeader
        eyebrow="Operations"
        title="November 2026"
        description="Meetings, calls, follow-ups, and deadlines in one view."
        actions={
          <>
            <div className="flex items-center rounded-lg border border-border">
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-none rounded-l-lg"><ChevronLeft className="h-4 w-4" /></Button>
              <span className="border-x border-border px-3 text-[12.5px] font-medium">Today</span>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-none rounded-r-lg"><ChevronRight className="h-4 w-4" /></Button>
            </div>
            <div className="flex rounded-lg bg-secondary/60 p-0.5">
              {["Month", "Week", "Day"].map((v, i) => (
                <button key={v} className={cn("rounded-md px-2.5 py-1.5 text-[12px] font-medium transition", i === 0 ? "bg-background shadow-soft" : "text-muted-foreground")}>
                  {v}
                </button>
              ))}
            </div>
            <Button size="sm" className="h-9 rounded-lg gap-1.5 gradient-primary text-white shadow-elevated"><Plus className="h-3.5 w-3.5" />Event</Button>
          </>
        }
      />

      <div data-reveal className="rounded-2xl border border-border/70 bg-card shadow-soft overflow-hidden">
        <div className="grid grid-cols-7 border-b border-border/70 bg-secondary/40">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <div key={d} className="px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {days.map((day, i) => {
            const isCurrentMonth = day >= 1 && day <= 30;
            const isToday = day === 12;
            const items = isCurrentMonth ? eventsByDay[day] : undefined;
            return (
              <div key={i} className={cn(
                "min-h-[120px] border-b border-r border-border/60 p-2 transition-colors hover:bg-secondary/30",
                (i + 1) % 7 === 0 && "border-r-0",
                i >= 28 && "border-b-0",
              )}>
                <div className={cn(
                  "mb-1.5 inline-flex h-6 w-6 items-center justify-center rounded-md text-[11.5px] font-semibold",
                  isToday && "gradient-primary text-white shadow-elevated",
                  !isCurrentMonth && "text-muted-foreground/40",
                  isCurrentMonth && !isToday && "text-foreground",
                )}>
                  {isCurrentMonth ? day : ""}
                </div>
                {items && (
                  <div className="space-y-1">
                    {items.map((it, j) => (
                      <div key={j} className={cn("truncate rounded-md border px-1.5 py-1 text-[10.5px] font-medium", toneStyle[it.tone])}>
                        <span className="font-semibold">{it.time}</span> · {it.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </PageShell>
  );
}
