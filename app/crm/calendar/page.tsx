"use client";

import { useState } from "react";
import { PageHeader, PageShell } from "@/components/crm/page";
import { calendarEvents } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Save } from "lucide-react";
import { cn } from "@/lib/utils";

// Give existing mock events a unique ID so we can edit them
const initialEvents = calendarEvents.map(e => ({
  ...e,
  items: e.items.map(item => ({ ...item, id: Math.random().toString(36).substr(2, 9) }))
}));

export default function CalendarPage() {
  const days = Array.from({ length: 35 }, (_, i) => i - 3); // Nov starts on day -3 offset for visual
  
  const [events, setEvents] = useState(initialEvents);
  
  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  
  // Form State
  const [editEventId, setEditEventId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    time: "",
    tone: "primary",
  });

  const eventsByDay: Record<number, typeof events[number]["items"]> = {};
  events.forEach((e) => (eventsByDay[e.day] = e.items));

  const toneStyle: Record<string, string> = {
    primary: "bg-indigo-50 text-indigo-700 border-indigo-200",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
  };

  const handleDayClick = (day: number) => {
    if (day >= 1 && day <= 30) {
      setSelectedDay(day);
      setEditEventId(null);
      setFormData({ title: "", time: "09:00", tone: "primary" });
      setModalOpen(true);
    }
  };

  const handleEditClick = (item: any) => {
    setEditEventId(item.id);
    setFormData({ title: item.title, time: item.time, tone: item.tone });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.time || selectedDay === null) return;

    setEvents(prev => {
      const newEvents = [...prev];
      const dayIndex = newEvents.findIndex(ev => ev.day === selectedDay);

      if (editEventId) {
        // Editing existing event
        if (dayIndex !== -1) {
          const itemIndex = newEvents[dayIndex].items.findIndex(i => i.id === editEventId);
          if (itemIndex !== -1) {
            newEvents[dayIndex].items[itemIndex] = {
              ...newEvents[dayIndex].items[itemIndex],
              title: formData.title,
              time: formData.time,
              tone: formData.tone,
            };
          }
        }
      } else {
        // Adding new event
        const newItem = {
          id: Math.random().toString(36).substr(2, 9),
          title: formData.title,
          time: formData.time,
          tone: formData.tone,
        };

        if (dayIndex !== -1) {
          newEvents[dayIndex].items.push(newItem);
        } else {
          newEvents.push({ day: selectedDay, items: [newItem] });
        }
      }
      return newEvents;
    });

    // Reset form to Add mode after save
    setEditEventId(null);
    setFormData({ title: "", time: "09:00", tone: "primary" });
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
              <div 
                key={i} 
                className={cn(
                  "min-h-[120px] border-b border-r border-border/60 p-2 transition-colors",
                  isCurrentMonth ? "hover:bg-secondary/30 cursor-pointer" : "",
                  (i + 1) % 7 === 0 && "border-r-0",
                  i >= 28 && "border-b-0",
                )}
                onClick={() => handleDayClick(day)}
              >
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
                    {items.map((it) => (
                      <div key={it.id} className={cn("truncate rounded-md border px-1.5 py-1 text-[10.5px] font-medium", toneStyle[it.tone])}>
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

      {/* Day Details & Add/Edit Event Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-border/70 bg-white rounded-2xl shadow-elevated">
          <div className="p-6 border-b border-border/70 bg-slate-50/80">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-slate-900">
                <div className="h-8 w-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-sm">
                  <CalendarIcon className="h-4 w-4" />
                </div>
                <div className="text-[17px] font-bold tracking-tight">Nov {selectedDay}, 2026</div>
              </DialogTitle>
            </DialogHeader>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Left side: Existing Events */}
            <div className="flex-1 border-b md:border-b-0 md:border-r border-border/60 bg-slate-50/30 p-5">
              <h4 className="text-[12.5px] font-bold text-slate-900 uppercase tracking-wider mb-4">Scheduled Events</h4>
              
              <div className="space-y-2">
                {selectedDay !== null && eventsByDay[selectedDay] && eventsByDay[selectedDay].length > 0 ? (
                  eventsByDay[selectedDay].map((item) => (
                    <div 
                      key={item.id} 
                      className={cn(
                        "group relative cursor-pointer rounded-lg border px-2.5 py-2 transition-all truncate text-[12px] font-medium",
                        toneStyle[item.tone],
                        editEventId === item.id ? "ring-2 ring-indigo-500 shadow-sm" : "hover:shadow-sm"
                      )}
                      onClick={() => handleEditClick(item)}
                    >
                      <span className="font-semibold">{item.time}</span> · {item.title}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-slate-400 text-[13px] font-medium">
                    No events scheduled.
                  </div>
                )}
              </div>
            </div>

            {/* Right side: Add/Edit Form */}
            <div className="flex-1 bg-white p-5">
              <h4 className="text-[12.5px] font-bold text-slate-900 uppercase tracking-wider mb-4">
                {editEventId ? "Edit Event" : "Add New Event"}
              </h4>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[12px] font-semibold text-slate-700">Event Title <span className="text-red-500">*</span></label>
                  <Input 
                    required
                    placeholder="e.g. Sync with Team" 
                    className="h-9 rounded-lg bg-slate-50/50 border-slate-200 text-sm"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[12px] font-semibold text-slate-700">Time <span className="text-red-500">*</span></label>
                  <Input 
                    required
                    type="time"
                    className="h-9 rounded-lg bg-slate-50/50 border-slate-200 text-sm"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[12px] font-semibold text-slate-700">Priority / Tone</label>
                  <select 
                    className="w-full h-9 rounded-lg bg-slate-50/50 border border-slate-200 px-3 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    value={formData.tone}
                    onChange={(e) => setFormData({...formData, tone: e.target.value})}
                  >
                    <option value="primary">Normal (Blue)</option>
                    <option value="success">Success (Green)</option>
                    <option value="warning">Important (Amber)</option>
                  </select>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  {editEventId && (
                    <Button 
                      type="button"
                      variant="ghost" 
                      size="sm"
                      className="h-8 text-[12px] rounded-lg"
                      onClick={() => {
                        setEditEventId(null);
                        setFormData({ title: "", time: "09:00", tone: "primary" });
                      }}
                    >
                      Cancel Edit
                    </Button>
                  )}
                  <Button 
                    type="submit"
                    size="sm"
                    className="h-8 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm font-semibold text-[12px] px-4"
                  >
                    <Save className="h-3 w-3 mr-1.5" />
                    {editEventId ? "Save Event" : "Add Event"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </PageShell>
  );
}
