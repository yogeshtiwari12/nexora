"use client";

import { useState } from "react";
import { type ComponentProps } from "react";
import { PageHeader, PageShell } from "@/components/crm/page";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarPicker } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Plus,
  Video,
  Calendar,
  Trash2,
  Building2,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock dates to avoid faker dependency while keeping the UI functionality
const now = new Date();
const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

const bookedDays = [
  new Date(now.getFullYear(), now.getMonth(), 5),
  new Date(now.getFullYear(), now.getMonth(), 8),
  new Date(now.getFullYear(), now.getMonth(), 12),
  new Date(now.getFullYear(), now.getMonth(), 15),
  new Date(now.getFullYear(), now.getMonth(), 22),
  new Date(now.getFullYear(), now.getMonth(), 25),
];

function ReschedulePopover({ children }: { children: React.ReactNode }) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | undefined>();

  const availableTimes = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
    "04:00 PM", "04:30 PM",
  ];

  const modifiers = {
    booked: bookedDays,
  };

  const modifiersStyles: ComponentProps<typeof CalendarPicker>["modifiersStyles"] = {
    booked: {
      backgroundColor: "var(--color-amber-200, #fde68a)",
      color: "var(--color-amber-900, #78350f)",
      fontWeight: "bold",
    },
  };

  return (
    <Popover>
      {children}
      <PopoverContent className="w-auto p-0 border bg-background shadow-xl rounded-xl" align="end">
        <div className="flex divide-x overflow-hidden rounded-md bg-white text-slate-900">
          <CalendarPicker
            className="rounded-l-md border-0 p-3 text-slate-900"
            classNames={{
              day_button: "rounded-full text-slate-900 hover:bg-slate-100 hover:text-slate-900",
              day: "rounded-full",
              today: "rounded-full bg-slate-100 text-slate-900",
              month_caption: "text-slate-900 font-bold",
              button_previous: "text-slate-900 hover:bg-slate-100",
              button_next: "text-slate-900 hover:bg-slate-100",
            }}
            mode="single"
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            onSelect={setDate}
            selected={date}
          />
          <div className="relative w-[180px] overflow-hidden bg-slate-50/50">
            <div className="absolute inset-0 grid gap-4">
              <div className="space-y-2 px-4 pt-4">
                <p className="text-center text-[13px] font-bold text-slate-700">Available Times</p>
              </div>
              <ScrollArea className="h-[280px]">
                <div className="grid grid-cols-1 gap-2 px-4 pb-4">
                  {availableTimes.map((time) => (
                    <Button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      size="sm"
                      variant={selectedTime === time ? "default" : "outline"}
                      className={selectedTime === time ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm" : "border-border/60 text-slate-600 hover:text-slate-900"}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

const initialMeetings = [
  { id: "1", timeBadgeTop: "TODAY", timeBadgeBot: "14:30", name: "Priya Ramanathan", company: "Northwind Capital", type: "Board Sync", initial: "SC", rep: "Sarah Chen", priority: "High" },
  { id: "2", timeBadgeTop: "TODAY", timeBadgeBot: "17:00", name: "Kenji Tanaka", company: "Sakura Digital", type: "Contract Review", initial: "SC", rep: "Sarah Chen", priority: "High" },
  { id: "3", timeBadgeTop: "TOMORROW", timeBadgeBot: "10:00", name: "Julian Weiss", company: "Helix Biotech", type: "Discovery", initial: "MR", rep: "Marcus Rivera", priority: "Medium" },
  { id: "4", timeBadgeTop: "TOMORROW", timeBadgeBot: "15:30", name: "Ana Costa", company: "Meridian Retail", type: "Proposal Walkthrough", initial: "AO", rep: "Amara Okafor", priority: "High" },
  { id: "5", timeBadgeTop: "NOV 13", timeBadgeBot: "09:00", name: "Rohan Malhotra", company: "Vertex Manufacturing", type: "Executive Briefing", initial: "JP", rep: "James Park", priority: "Medium" },
  { id: "6", timeBadgeTop: "NOV 14", timeBadgeBot: "11:30", name: "Ingrid Nilsson", company: "Aurora Energy", type: "Intro Call", initial: "EV", rep: "Elena Volkov", priority: "Low" },
];

const priorityColor: Record<string, string> = {
  High: "text-red-600 bg-red-50 border-red-200",
  Medium: "text-amber-600 bg-amber-50 border-amber-200",
  Low: "text-emerald-600 bg-emerald-50 border-emerald-200",
};

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState(initialMeetings);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newMeetingData, setNewMeetingData] = useState({
    title: "",
    date: "",
    time: "",
    attendees: "",
    type: "Video",
  });

  const handleCreateMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMeetingData.title) return;

    const newMeeting = {
      id: `MEET-${Math.floor(Math.random() * 10000)}`,
      timeBadgeTop: "UPCOMING",
      timeBadgeBot: newMeetingData.time || "TBD",
      name: newMeetingData.title,
      company: newMeetingData.attendees || "Multiple Attendees",
      type: newMeetingData.type,
      initial: "ME",
      rep: "Current User",
      priority: "Medium",
    };

    setMeetings(prev => [newMeeting, ...prev]);
    setAddModalOpen(false);
    setNewMeetingData({ title: "", date: "", time: "", attendees: "", type: "Video" });
  };

  function dismissMeeting(id: string) {
    setMeetings((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <PageShell>
      <PageHeader
        eyebrow="OPERATIONS"
        title="Meetings"
        description="Executive meetings scheduled across the team this week."
        actions={
          <Button size="sm" className="h-9 rounded-full px-4 gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white border-0 shadow-sm" onClick={() => setAddModalOpen(true)}>
            <Plus className="h-4 w-4" />Schedule
          </Button>
        }
      />

      <div className="mt-6 rounded-2xl border border-border/60 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-border/60 bg-slate-50/80">
                <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" /> When
                  </div>
                </th>
                <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">Contact</th>
                <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">Meeting</th>
                <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">Rep</th>
                <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">Priority</th>
                <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {meetings.map((meeting) => {
                return (
                  <tr
                    key={meeting.id}
                    className="border-b border-border/40 last:border-0 hover:bg-emerald-50/30 transition-colors"
                  >
                    <td className="px-5 py-4 align-top whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                          {meeting.timeBadgeTop}
                        </span>
                        <span className="text-[14px] font-bold text-slate-900 mt-0.5">
                          {meeting.timeBadgeBot}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4 align-top">
                      <div className="text-[14px] font-semibold text-slate-900 leading-tight">
                        {meeting.name}
                      </div>
                      <div className="flex items-center gap-1.5 mt-1 text-[12.5px] text-slate-500">
                        <Building2 className="h-3.5 w-3.5 text-slate-400" />
                        {meeting.company}
                      </div>
                    </td>

                    <td className="px-5 py-4 align-top">
                      <div className="flex items-center gap-1.5 text-[13px] font-medium text-slate-700">
                        <Video className="h-3.5 w-3.5 text-emerald-500" />
                        {meeting.type}
                      </div>
                    </td>

                    <td className="px-5 py-4 align-top">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-[9.5px] font-bold text-emerald-700">
                          {meeting.initial}
                        </div>
                        <span className="text-[12.5px] font-medium text-slate-600 whitespace-nowrap">
                          {meeting.rep}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4 align-top">
                      <div
                        className={cn(
                          "inline-flex h-6 items-center rounded-full border px-2.5 text-[11px] font-bold",
                          priorityColor[meeting.priority]
                        )}
                      >
                        {meeting.priority}
                      </div>
                    </td>

                    <td className="px-5 py-4 align-top">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          className="h-8 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5 px-3.5 shadow-sm font-semibold"
                          onClick={() => console.log(`Join meeting with ${meeting.name}`)}
                        >
                          <Video className="h-3.5 w-3.5" /> Join
                        </Button>

                        <ReschedulePopover>
                          <PopoverTrigger
                            aria-label="Reschedule meeting"
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors shrink-0"
                          >
                            <Calendar className="h-3.5 w-3.5" />
                          </PopoverTrigger>
                        </ReschedulePopover>

                        <AlertDialog>
                          <AlertDialogTrigger render={
                            <Button
                              variant="ghost"
                              size="icon"
                              aria-label="Delete meeting"
                              className="h-8 w-8 rounded-full text-red-400 hover:text-red-600 hover:bg-red-50 shrink-0"
                            />
                          }>
                            <Trash2 className="h-3.5 w-3.5" />
                          </AlertDialogTrigger>

                          <AlertDialogContent className="max-w-[416px] rounded-2xl border border-border/60 bg-white p-0 overflow-hidden shadow-xl">
                            <AlertDialogHeader className="px-6 pt-6 pb-2 space-y-3">
                              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50">
                                <AlertTriangle className="h-5 w-5 text-red-500" />
                              </div>
                              <AlertDialogTitle className="text-[16px] font-bold text-slate-900">
                                Delete this meeting?
                              </AlertDialogTitle>
                              <AlertDialogDescription className="text-[13px] leading-relaxed text-slate-500">
                                You&apos;re about to remove the{" "}
                                <span className="font-semibold text-slate-700">{meeting.type}</span> with{" "}
                                <span className="font-semibold text-slate-700">{meeting.name}</span> from{" "}
                                <span className="font-semibold text-slate-700">{meeting.company}</span>, scheduled{" "}
                                <span className="font-semibold text-slate-700">
                                  {meeting.timeBadgeTop.charAt(0) + meeting.timeBadgeTop.slice(1).toLowerCase()} at {meeting.timeBadgeBot}
                                </span>
                                . This can&apos;t be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter className="flex-row justify-end gap-2 border-t border-border/40 bg-slate-50/60 px-6 py-4">
                              <AlertDialogCancel className="h-9 rounded-full border border-slate-200 bg-white px-4 text-[13px] font-semibold text-slate-600 hover:bg-slate-50">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => dismissMeeting(meeting.id)}
                                className="h-9 rounded-full bg-red-600 b- px-4 text-[13px] font-semibold text-white shadow-sm hover:bg-red-700"
                              >
                                Delete meeting
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {meetings.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-[14px] font-semibold text-slate-700">No meetings left this week</p>
            <p className="mt-1 text-[12.5px] text-slate-500">Schedule a new meeting to fill your calendar.</p>
          </div>
        )}
      </div>

      {/* Schedule Meeting Modal */}
      <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
        <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden border-border/70 bg-white rounded-2xl shadow-elevated">
          <div className="p-6 border-b border-border/70 bg-slate-50/80">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-slate-900">
                <div className="h-8 w-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-sm">
                  <Calendar className="h-4 w-4" />
                </div>
                <div className="text-[17px] font-bold tracking-tight">Schedule Meeting</div>
              </DialogTitle>
            </DialogHeader>
          </div>
          
          <form onSubmit={handleCreateMeeting}>
            <div className="p-6 space-y-4 bg-white">
              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-slate-700">Meeting Title <span className="text-red-500">*</span></label>
                <Input 
                  required
                  placeholder="e.g. Sync with Northwind" 
                  className="h-10 rounded-xl bg-slate-50/50 border-slate-200"
                  value={newMeetingData.title}
                  onChange={(e) => setNewMeetingData({...newMeetingData, title: e.target.value})}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-slate-700">Attendees / Company</label>
                <Input 
                  placeholder="e.g. Acme Corp or client@email.com" 
                  className="h-10 rounded-xl bg-slate-50/50 border-slate-200"
                  value={newMeetingData.attendees}
                  onChange={(e) => setNewMeetingData({...newMeetingData, attendees: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-slate-700">Date</label>
                  <Input 
                    type="date"
                    className="h-10 rounded-xl bg-slate-50/50 border-slate-200"
                    value={newMeetingData.date}
                    onChange={(e) => setNewMeetingData({...newMeetingData, date: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-slate-700">Time</label>
                  <Input 
                    type="time"
                    className="h-10 rounded-xl bg-slate-50/50 border-slate-200"
                    value={newMeetingData.time}
                    onChange={(e) => setNewMeetingData({...newMeetingData, time: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-slate-700">Meeting Type</label>
                <select 
                  className="w-full h-10 rounded-xl bg-slate-50/50 border border-slate-200 px-3 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  value={newMeetingData.type}
                  onChange={(e) => setNewMeetingData({...newMeetingData, type: e.target.value})}
                >
                  <option value="Video">Video Call</option>
                  <option value="In-person">In-person</option>
                  <option value="Phone">Phone Call</option>
                  <option value="Contract Review">Contract Review</option>
                  <option value="Discovery">Discovery</option>
                </select>
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
                className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm font-medium px-6 rounded-xl h-10"
              >
                <Plus className="h-4 w-4 mr-2" />
                Schedule
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </PageShell>
  );
}