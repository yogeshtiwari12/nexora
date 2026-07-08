"use client";

import { useState, useMemo, type ComponentProps } from "react";
import { PageHeader, PageShell } from "@/components/crm/page";
import { customers } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarPicker } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Search, Filter, Download, Plus, Mail, Phone, CalendarPlus,
  MoreHorizontal, CheckSquare, Trash2, CheckCircle2, Clock, Activity, ChevronDown, Link, CalendarClock, ArrowLeft, Save
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const statusStyle: Record<string, string> = {
  Active: "bg-success/10 text-success",
  VIP: "bg-primary text-primary-foreground",
  Prospect: "bg-warning/15 text-warning-foreground",
  Lead: "bg-info/10 text-info",
  Inactive: "bg-secondary text-muted-foreground",
};

const statusColors: Record<string, string> = {
  Active: "bg-emerald-500",
  VIP: "bg-indigo-500",
  Prospect: "bg-amber-500",
  Lead: "bg-blue-500",
  Inactive: "bg-slate-400",
};

const industryColors: Record<string, string> = {
  Technology: "bg-blue-500",
  Finance: "bg-emerald-500",
  Healthcare: "bg-rose-500",
  Retail: "bg-amber-500",
  Manufacturing: "bg-indigo-500",
  Education: "bg-purple-500",
};

const priorityStyle: Record<string, string> = {
  High: "bg-destructive/10 text-destructive",
  Medium: "bg-warning/15 text-warning-foreground",
  Low: "bg-secondary text-muted-foreground",
};

const todoStatusColors: Record<string, string> = {
  "To Do": "bg-slate-200 text-slate-700",
  "In Progress": "bg-indigo-100 text-indigo-700",
  "Completed": "bg-emerald-100 text-emerald-700",
};

const uniqueStatuses = Array.from(new Set(customers.map(c => c.status)));
const uniqueIndustries = Array.from(new Set(customers.map(c => c.industry)));
const priorities = ["High", "Medium", "Low"];
const todoStatuses = ["To Do", "In Progress", "Completed"];

const availableTimes = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM",
];

export default function CustomersPage() {
  const [customerList, setCustomerList] = useState(customers);
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [industryFilter, setIndustryFilter] = useState("All industries");

  // Email Modal State
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [selectedCustomerForEmail, setSelectedCustomerForEmail] = useState<typeof customers[0] | null>(null);
  const [selectedEmailTemplate, setSelectedEmailTemplate] = useState("Q3 Product Update");
  
  // Scheduled Emails View State
  const [viewingScheduled, setViewingScheduled] = useState(false);
  const [scheduledEmails, setScheduledEmails] = useState<Record<string, { id: number, template: string, date: string, time: string }[]>>({});
  
  // Calendar scheduling state
  const [scheduleDate, setScheduleDate] = useState<Date | undefined>(new Date());
  const [scheduleTime, setScheduleTime] = useState<string | undefined>();
  const [schedulePopoverOpen, setSchedulePopoverOpen] = useState(false);

  // Todo Modal State
  const [todoModalOpen, setTodoModalOpen] = useState(false);
  const [selectedCustomerForTodo, setSelectedCustomerForTodo] = useState<typeof customers[0] | null>(null);
  
  const [todos, setTodos] = useState<Record<string, { id: number, text: string, status: string, time?: string }[]>>({});
  const [newTodoText, setNewTodoText] = useState("");

  // Status/Priority Modal State
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedCustomerForStatus, setSelectedCustomerForStatus] = useState<typeof customers[0] | null>(null);

  // New Customer Modal State
  const [addCustomerModalOpen, setAddCustomerModalOpen] = useState(false);
  const [newCustomerData, setNewCustomerData] = useState({
    name: "",
    email: "",
    company: "",
    industry: "Technology",
    phone: "",
  });

  const filteredCustomers = useMemo(() => {
    return customerList.filter(c => {
      const matchStatus = statusFilter === "All statuses" || c.status === statusFilter;
      const matchIndustry = industryFilter === "All industries" || c.industry === industryFilter;
      return matchStatus && matchIndustry;
    });
  }, [customerList, statusFilter, industryFilter]);

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    customerList.forEach(c => {
      counts[c.status] = (counts[c.status] || 0) + 1;
    });
    return counts;
  }, [customerList]);

  const industryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    customerList.forEach(c => {
      counts[c.industry] = (counts[c.industry] || 0) + 1;
    });
    return counts;
  }, [customerList]);

  const updateCustomerStatus = (id: string, newStatus: string) => {
    setCustomerList(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  const updateCustomerPriority = (id: string, newPriority: string) => {
    setCustomerList(prev => prev.map(c => c.id === id ? { ...c, priority: newPriority } : c));
  };

  const openEmailModal = (customer: typeof customers[0]) => {
    setSelectedCustomerForEmail(customer);
    setViewingScheduled(false);
    setEmailModalOpen(true);
  };

  const openTodoModal = (customer: typeof customers[0]) => {
    setSelectedCustomerForTodo(customer);
    setTodoModalOpen(true);
  };

  const openStatusModal = (customer: typeof customers[0]) => {
    setSelectedCustomerForStatus(customer);
    setStatusModalOpen(true);
  };

  const handleScheduleEmail = () => {
    if (!selectedCustomerForEmail || !scheduleDate || !scheduleTime) return;
    
    const formattedDate = format(scheduleDate, "MMM dd, yyyy");
    
    setScheduledEmails(prev => {
      const existing = prev[selectedCustomerForEmail.id] || [];
      return {
        ...prev,
        [selectedCustomerForEmail.id]: [
          ...existing,
          { id: Date.now(), template: selectedEmailTemplate, date: formattedDate, time: scheduleTime }
        ]
      };
    });
    setSchedulePopoverOpen(false);
  };

  const cancelScheduledEmail = (customerId: string, emailId: number) => {
    setScheduledEmails(prev => ({
      ...prev,
      [customerId]: (prev[customerId] || []).filter(e => e.id !== emailId)
    }));
  };

  const handleAddTodo = () => {
    if (!newTodoText.trim() || !selectedCustomerForTodo) return;
    
    setTodos(prev => {
      const customerTodos = prev[selectedCustomerForTodo.id] || [];
      return {
        ...prev,
        [selectedCustomerForTodo.id]: [
          ...customerTodos,
          { 
            id: Date.now(), 
            text: newTodoText, 
            status: "To Do",
            time: format(new Date(), "h:mm a")
          }
        ]
      };
    });
    setNewTodoText("");
  };

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomerData.email) return;

    const newCustomer = {
      id: `CUST-${Math.floor(Math.random() * 10000)}`,
      name: newCustomerData.name || "Unknown",
      company: newCustomerData.company || "Unknown Company",
      email: newCustomerData.email,
      phone: newCustomerData.phone || "--",
      industry: newCustomerData.industry,
      status: "Lead",
      priority: "Medium",
      manager: "Unassigned",
      ltv: 0,
      lastContact: "Just now",
      nextFollowup: "Tomorrow",
    };

    setCustomerList(prev => [newCustomer, ...prev]);
    setAddCustomerModalOpen(false);
    setNewCustomerData({ name: "", email: "", company: "", industry: "Technology", phone: "" });
  };

  const handleUpdateTodoStatus = (customerId: string, todoId: number, newStatus: string) => {
    setTodos(prev => {
      const customerTodos = prev[customerId] || [];
      return {
        ...prev,
        [customerId]: customerTodos.map(t => t.id === todoId ? { ...t, status: newStatus } : t)
      };
    });
  };

  const handleDeleteTodo = (customerId: string, todoId: number) => {
    setTodos(prev => {
      const customerTodos = prev[customerId] || [];
      return {
        ...prev,
        [customerId]: customerTodos.filter(t => t.id !== todoId)
      };
    });
  };

  return (
    <PageShell>
      <PageHeader
        eyebrow="Relationships"
        title="Customers"
        description="12,847 active accounts across 42 industries."
        actions={
          <>
            <Button variant="outline" size="sm" className="h-9 rounded-lg gap-1.5 bg-white"><Download className="h-3.5 w-3.5" />Export</Button>
            <Button size="sm" className="h-9 rounded-lg gap-1.5 gradient-primary text-white shadow-elevated" onClick={() => setAddCustomerModalOpen(true)}>
              <Plus className="h-3.5 w-3.5" />New customer
            </Button>
          </>
        }
      />

      <div data-reveal className="rounded-2xl border border-border/70 bg-card shadow-soft overflow-hidden">
        <div className="flex flex-wrap items-center gap-2 border-b border-border/70 p-4">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search customers by name, company, email…" className="h-9 rounded-lg pl-9 bg-secondary/40 border-border" />
          </div>
          
          {/* Status Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" size="sm" className="h-9 rounded-lg gap-1.5 bg-white" />}>
              <Filter className="h-3.5 w-3.5" />
              {statusFilter}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white">
              <DropdownMenuItem onClick={() => setStatusFilter("All statuses")} className="text-slate-900 cursor-pointer">
                <div className="flex items-center gap-2 w-full">
                  <div className="w-2 h-2 rounded-full bg-slate-300" />
                  <span>All statuses</span>
                  <span className="ml-auto text-xs text-muted-foreground">{customerList.length}</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {uniqueStatuses.map(status => (
                <DropdownMenuItem key={status} onClick={() => setStatusFilter(status)} className="text-slate-900 cursor-pointer">
                  <div className="flex items-center gap-2 w-full">
                    <div className={cn("w-2 h-2 rounded-full", statusColors[status] || "bg-slate-300")} />
                    <span>{status}</span>
                    <span className="ml-auto text-xs text-muted-foreground">{statusCounts[status] || 0}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Industry Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" size="sm" className="h-9 rounded-lg gap-1.5 bg-white" />}>
              <Filter className="h-3.5 w-3.5" />
              {industryFilter}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white">
              <DropdownMenuItem onClick={() => setIndustryFilter("All industries")} className="text-slate-900 cursor-pointer">
                <div className="flex items-center gap-2 w-full">
                  <div className="w-2 h-2 rounded-full bg-slate-300" />
                  <span>All industries</span>
                  <span className="ml-auto text-xs text-muted-foreground">{customerList.length}</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {uniqueIndustries.map(industry => (
                <DropdownMenuItem key={industry} onClick={() => setIndustryFilter(industry)} className="text-slate-900 cursor-pointer">
                  <div className="flex items-center gap-2 w-full">
                    <div className={cn("w-2 h-2 rounded-full", industryColors[industry] || "bg-indigo-400")} />
                    <span className="truncate">{industry}</span>
                    <span className="ml-auto text-xs text-muted-foreground">{industryCounts[industry] || 0}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/70 hover:bg-transparent">
                <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Customer</TableHead>
                <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Company</TableHead>
                <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Industry</TableHead>
                <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Contact</TableHead>
                <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Manager</TableHead>
                <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Status</TableHead>
                <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground text-right">LTV</TableHead>
                <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Last Contact</TableHead>
                <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Follow-up</TableHead>
                <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Priority</TableHead>
                <TableHead className="w-[120px] text-[11px] font-semibold uppercase tracking-wider text-muted-foreground text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((c) => (
                <TableRow key={c.id} className="border-border/60 group hover:bg-secondary/40 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <Avatar className="h-8 w-8 border border-border">
                        <AvatarFallback className="bg-primary-soft text-primary text-[10.5px] font-semibold">
                          {c.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-[13px] font-medium leading-tight">{c.name}</div>
                        <div className="text-[11px] text-muted-foreground leading-tight">{c.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-[13px] font-medium">{c.company}</TableCell>
                  <TableCell className="text-[12.5px] text-muted-foreground">{c.industry}</TableCell>
                  <TableCell>
                    <div className="text-[12px] text-foreground">{c.email}</div>
                    <div className="text-[11px] text-muted-foreground">{c.phone}</div>
                  </TableCell>
                  <TableCell className="text-[12.5px]">{c.manager}</TableCell>
                  <TableCell>
                    <Badge className={cn("rounded-full border-0 px-2 py-0.5 text-[10.5px] font-semibold", statusStyle[c.status])}>{c.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right text-[13px] font-semibold tabular-nums">${c.ltv.toLocaleString('en-US')}</TableCell>
                  <TableCell className="text-[12px] text-muted-foreground">{c.lastContact}</TableCell>
                  <TableCell className="text-[12px] text-foreground">{c.nextFollowup}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("rounded-full border-0 px-2 py-0.5 text-[10.5px] font-semibold", priorityStyle[c.priority])}>{c.priority}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-0.5">
                      
                      {/* Email Action */}
                      <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md" title="Email" onClick={() => openEmailModal(c)}>
                        <Mail className="h-3.5 w-3.5" />
                      </Button>
                      
                      {/* Phone Action */}
                      <DropdownMenu>
                        <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="h-7 w-7 rounded-md" title="Call" />}>
                          <Phone className="h-3.5 w-3.5" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white">
                          <DropdownMenuItem className="text-slate-900 cursor-pointer">Call {c.phone}</DropdownMenuItem>
                          <DropdownMenuItem className="text-slate-900 cursor-pointer">Copy Phone Number</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      
                      {/* More Actions Dropdown */}
                      <DropdownMenu>
                        <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="h-7 w-7 rounded-md" title="More Actions" />}>
                          <MoreHorizontal className="h-3.5 w-3.5" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-52 bg-white">
                          
                          {/* Todo Modal Trigger */}
                          <DropdownMenuItem 
                            className="text-slate-900 cursor-pointer focus:bg-slate-100 font-medium"
                            onClick={() => setTimeout(() => openTodoModal(c), 0)}
                          >
                            <CheckSquare className="mr-2 h-4 w-4 text-emerald-600" />
                            To-Do List
                          </DropdownMenuItem>
                          
                          {/* Status and Priority Modal Trigger */}
                          <DropdownMenuItem 
                            className="text-slate-900 cursor-pointer focus:bg-slate-100 font-medium"
                            onClick={() => setTimeout(() => openStatusModal(c), 0)}
                          >
                            <Activity className="mr-2 h-4 w-4 text-indigo-500" />
                            Change Status / Priority
                          </DropdownMenuItem>

                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredCustomers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={11} className="h-24 text-center">
                    No customers found matching the current filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between border-t border-border/70 px-4 py-3 text-[12px] text-muted-foreground">
          <span>Showing {Math.min(filteredCustomers.length, 1)}–{Math.min(filteredCustomers.length, 10)} of {filteredCustomers.length}</span>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" className="h-7 rounded-md bg-white">Previous</Button>
            <Button variant="outline" size="sm" className="h-7 rounded-md bg-white">Next</Button>
          </div>
        </div>
      </div>

      {/* Email Modal */}
      <Dialog open={emailModalOpen} onOpenChange={setEmailModalOpen}>
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-border/70 bg-white rounded-2xl shadow-elevated">
          {selectedCustomerForEmail && (
            <>
              <div className="p-6 border-b border-border/70 bg-slate-50">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-border shadow-sm">
                      <AvatarFallback className="bg-primary-soft text-primary font-semibold">
                        {selectedCustomerForEmail.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-lg font-semibold tracking-tight text-slate-900">{selectedCustomerForEmail.name}</div>
                      <div className="text-sm text-slate-500 font-normal">{selectedCustomerForEmail.email}</div>
                    </div>
                  </DialogTitle>
                </DialogHeader>
              </div>
              
              {!viewingScheduled ? (
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Email History</h4>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setViewingScheduled(true)}
                      className="h-7 text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-2"
                    >
                      <CalendarClock className="h-3 w-3 mr-1.5" />
                      View Scheduled Emails
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start justify-between rounded-lg border border-slate-200 p-3 bg-slate-50/50">
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-slate-900">Q3 Product Update & Feature Review</div>
                        <div className="text-xs text-slate-500 flex items-center gap-1.5">
                          <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                          Opened • Sent by you
                        </div>
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Oct 12
                      </div>
                    </div>
                    <div className="flex items-start justify-between rounded-lg border border-slate-200 p-3 bg-slate-50/50">
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-slate-900">Following up on our last conversation</div>
                        <div className="text-xs text-slate-500 flex items-center gap-1.5">
                          <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                          Opened • Sent by Sarah
                        </div>
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Sep 28
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    
                    <div className="flex gap-2">
                      <div className="flex-1 border border-slate-300 hover:border-slate-400 transition-colors rounded-xl px-3 flex items-center bg-white">
                        <select 
                          className="w-full text-sm bg-transparent outline-none appearance-none text-slate-900 cursor-pointer h-10" 
                          value={selectedEmailTemplate}
                          onChange={(e) => setSelectedEmailTemplate(e.target.value)}
                        >
                          <option value="Q3 Product Update">Q3 Product Update</option>
                          <option value="Follow Up">Follow Up</option>
                          <option value="Check-in">Check-in</option>
                          <option value="Custom">Custom / Blank</option>
                        </select>
                        <ChevronDown className="h-4 w-4 text-slate-400 pointer-events-none" />
                      </div>
                      <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm h-10 rounded-xl px-6 font-medium">
                        Send Instant Email
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      
                      {/* Schedule Email Popover */}
                      <Popover open={schedulePopoverOpen} onOpenChange={setSchedulePopoverOpen}>
                        <PopoverTrigger render={<Button variant="outline" className="w-full h-10 rounded-xl border-slate-300 text-slate-700 hover:bg-slate-50 shadow-sm font-medium bg-white" />}>
                          Schedule Email
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 border border-slate-200 bg-white shadow-xl rounded-xl" align="start">
                          <div className="flex flex-col">
                            <div className="flex divide-x divide-slate-100 overflow-hidden rounded-t-md text-slate-900">
                              <CalendarPicker
                                className="rounded-tl-md border-0 p-3"
                                classNames={{
                                  day_button: "rounded-full text-slate-900 hover:bg-slate-100 hover:text-slate-900",
                                  day: "rounded-full",
                                  today: "rounded-full bg-slate-100 text-slate-900",
                                  month_caption: "text-slate-900 font-bold",
                                  button_previous: "text-slate-900 hover:bg-slate-100",
                                  button_next: "text-slate-900 hover:bg-slate-100",
                                }}
                                mode="single"
                                onSelect={setScheduleDate}
                                selected={scheduleDate}
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
                                          onClick={() => setScheduleTime(time)}
                                          size="sm"
                                          variant={scheduleTime === time ? "default" : "outline"}
                                          className={scheduleTime === time ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm" : "border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50"}
                                        >
                                          {time}
                                        </Button>
                                      ))}
                                    </div>
                                  </ScrollArea>
                                </div>
                              </div>
                            </div>
                            <div className="p-3 border-t border-slate-100 bg-slate-50 rounded-b-md">
                              <Button 
                                className="w-full bg-slate-900 hover:bg-slate-800 text-white shadow-sm font-medium"
                                onClick={handleScheduleEmail}
                                disabled={!scheduleDate || !scheduleTime}
                              >
                                Confirm Schedule
                              </Button>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>

                      {/* Send Meeting Invite Dropdown */}
                      <DropdownMenu>
                        <DropdownMenuTrigger render={<Button variant="outline" className="w-full h-10 rounded-xl border-slate-300 text-slate-700 hover:bg-slate-50 shadow-sm gap-2 font-medium bg-white" />}>
                          <CalendarPlus className="h-4 w-4" />
                          Send Meeting Invite
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-52 bg-white">
                          <DropdownMenuItem className="text-slate-900 cursor-pointer">
                            <Link className="mr-2 h-4 w-4" />
                            Send meeting link
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-slate-900 cursor-pointer">
                            <CalendarPlus className="mr-2 h-4 w-4" />
                            Create meeting option
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7 rounded-full hover:bg-slate-100 text-slate-500 shrink-0"
                      onClick={() => setViewingScheduled(false)}
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h4 className="text-sm font-semibold text-slate-900">Scheduled Emails</h4>
                  </div>
                  
                  <div className="space-y-3">
                    {scheduledEmails[selectedCustomerForEmail.id]?.length > 0 ? (
                      scheduledEmails[selectedCustomerForEmail.id].map(email => (
                        <div key={email.id} className="flex items-center justify-between rounded-xl border border-slate-200 p-4 bg-white shadow-sm">
                          <div className="space-y-1">
                            <div className="text-sm font-bold text-slate-900">{email.template}</div>
                            <div className="text-xs text-indigo-600 font-medium flex items-center gap-1.5 bg-indigo-50 inline-flex px-2 py-0.5 rounded-full">
                              <CalendarClock className="h-3 w-3" />
                              {email.date} at {email.time}
                            </div>
                          </div>
                          <Button 
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8"
                            onClick={() => cancelScheduledEmail(selectedCustomerForEmail.id, email.id)}
                          >
                            Cancel
                          </Button>
                        </div>
                      ))
                    ) : (
                      <div className="py-12 text-center text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                        <CalendarClock className="h-8 w-8 mx-auto text-slate-300 mb-2" />
                        <p className="text-sm">No scheduled emails for this customer.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Todo Modal */}
      <Dialog open={todoModalOpen} onOpenChange={setTodoModalOpen}>
        <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden border-border/70 bg-white rounded-2xl shadow-elevated">
          {selectedCustomerForTodo && (
            <>
              <div className="p-6 border-b border-border/70 bg-slate-50/80">
                <DialogHeader>
                  <DialogTitle className="flex items-center justify-between text-slate-900">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-sm">
                        <CheckSquare className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-[17px] font-bold tracking-tight">Action Items</div>
                        <div className="text-[13px] font-medium text-slate-500 mt-0.5">for {selectedCustomerForTodo.name}</div>
                      </div>
                    </div>
                  </DialogTitle>
                </DialogHeader>
              </div>
              
              <div className="p-6 bg-white">
                <div className="space-y-6">
                  {/* Premium Input Area */}
                  <div className="relative flex items-center shadow-sm rounded-xl border border-slate-200 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all bg-slate-50/50">
                    <Input 
                      placeholder="Add a new action item..." 
                      className="border-0 bg-transparent h-12 shadow-none focus-visible:ring-0 px-4 text-[15px] text-slate-900 placeholder:text-slate-400 font-medium"
                      value={newTodoText}
                      onChange={(e) => setNewTodoText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
                    />
                    <div className="pr-2 shrink-0">
                      <Button size="sm" className="h-8 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm font-semibold text-[12px]" onClick={handleAddTodo}>
                        Add Task
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                    {todos[selectedCustomerForTodo.id]?.length > 0 ? (
                      todos[selectedCustomerForTodo.id].map(todo => (
                        <div key={todo.id} className="flex flex-col rounded-xl border border-slate-100 bg-white p-4 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)] transition-all group">
                          
                          <div className="flex items-start justify-between gap-4">
                            <span className={cn(
                              "text-[15px] font-semibold leading-snug flex-1 transition-colors",
                              todo.status === "Completed" ? "text-slate-500" : "text-slate-900"
                            )}>
                              {todo.text}
                            </span>
                            
                            <div className="flex items-center gap-3 shrink-0 mt-0.5">
                              <span className="text-[11px] font-semibold text-slate-400">{todo.time || "Just now"}</span>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-600 hover:bg-red-50 shrink-0"
                                onClick={() => handleDeleteTodo(selectedCustomerForTodo.id, todo.id)}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-slate-50">
                            {todoStatuses.map(status => (
                              <button
                                key={status}
                                onClick={() => handleUpdateTodoStatus(selectedCustomerForTodo.id, todo.id, status)}
                                className={cn(
                                  "px-3 py-1 text-[11px] font-bold tracking-wide uppercase rounded-full border transition-all",
                                  todo.status === status 
                                    ? cn(todoStatusColors[status], "border-transparent shadow-sm")
                                    : "border-slate-200 text-slate-400 hover:bg-slate-100 hover:text-slate-600 bg-white"
                                )}
                              >
                                {status}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-12 flex flex-col items-center justify-center text-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                        <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                          <CheckSquare className="h-5 w-5 text-slate-400" />
                        </div>
                        <h4 className="text-[14px] font-bold text-slate-900">No Action Items</h4>
                        <p className="text-[13px] font-medium text-slate-500 mt-1 max-w-[200px]">Add tasks to track progress for this customer.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Status & Priority Modal */}
      <Dialog open={statusModalOpen} onOpenChange={setStatusModalOpen}>
        <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden border-border/70 bg-white rounded-2xl shadow-elevated">
          {selectedCustomerForStatus && (
            <>
              <div className="p-6 border-b border-border/70 bg-slate-50">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-slate-900">
                    <Activity className="h-5 w-5 text-indigo-500" />
                    Update {selectedCustomerForStatus.name}
                  </DialogTitle>
                </DialogHeader>
              </div>
              
              <div className="p-6 space-y-6">
                
                {/* Status Selection */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-3">Status</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {uniqueStatuses.map(status => (
                      <button
                        key={status}
                        onClick={() => updateCustomerStatus(selectedCustomerForStatus.id, status)}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-all outline-none",
                          selectedCustomerForStatus.status === status 
                            ? "border-emerald-500 bg-emerald-50 text-emerald-700 font-medium shadow-sm ring-1 ring-emerald-500" 
                            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                        )}
                      >
                        <div className={cn("w-2 h-2 rounded-full shrink-0", statusColors[status] || "bg-slate-300")} />
                        {status}
                        {selectedCustomerForStatus.status === status && (
                          <CheckCircle2 className="ml-auto h-3.5 w-3.5 text-emerald-500" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Priority Selection */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-3">Priority</h4>
                  <div className="flex gap-2">
                    {priorities.map(priority => (
                      <button
                        key={priority}
                        onClick={() => updateCustomerPriority(selectedCustomerForStatus.id, priority)}
                        className={cn(
                          "flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border text-sm transition-all outline-none",
                          selectedCustomerForStatus.priority === priority 
                            ? "border-indigo-500 bg-indigo-50 text-indigo-700 font-medium shadow-sm ring-1 ring-indigo-500" 
                            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                        )}
                      >
                        {priority}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-end">
                <Button 
                  className="bg-slate-900 hover:bg-slate-800 text-white shadow-sm font-medium px-6 rounded-xl h-10"
                  onClick={() => setStatusModalOpen(false)}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Customer Modal */}
      <Dialog open={addCustomerModalOpen} onOpenChange={setAddCustomerModalOpen}>
        <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden border-border/70 bg-white rounded-2xl shadow-elevated">
          <div className="p-6 border-b border-border/70 bg-slate-50/80">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-slate-900">
                <div className="h-8 w-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-sm">
                  <Plus className="h-4 w-4" />
                </div>
                <div className="text-[17px] font-bold tracking-tight">Add New Customer</div>
              </DialogTitle>
            </DialogHeader>
          </div>
          
          <form onSubmit={handleCreateCustomer}>
            <div className="p-6 space-y-4 bg-white">
              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-slate-700">Email Address <span className="text-red-500">*</span></label>
                <Input 
                  required
                  type="email"
                  placeholder="name@company.com" 
                  className="h-10 rounded-xl bg-slate-50/50 border-slate-200"
                  value={newCustomerData.email}
                  onChange={(e) => setNewCustomerData({...newCustomerData, email: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-slate-700">Full Name</label>
                  <Input 
                    placeholder="John Doe" 
                    className="h-10 rounded-xl bg-slate-50/50 border-slate-200"
                    value={newCustomerData.name}
                    onChange={(e) => setNewCustomerData({...newCustomerData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-slate-700">Phone</label>
                  <Input 
                    placeholder="+1 (555) 000-0000" 
                    className="h-10 rounded-xl bg-slate-50/50 border-slate-200"
                    value={newCustomerData.phone}
                    onChange={(e) => setNewCustomerData({...newCustomerData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-slate-700">Company</label>
                  <Input 
                    placeholder="Acme Corp" 
                    className="h-10 rounded-xl bg-slate-50/50 border-slate-200"
                    value={newCustomerData.company}
                    onChange={(e) => setNewCustomerData({...newCustomerData, company: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-slate-700">Industry</label>
                  <select 
                    className="w-full h-10 rounded-xl bg-slate-50/50 border border-slate-200 px-3 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    value={newCustomerData.industry}
                    onChange={(e) => setNewCustomerData({...newCustomerData, industry: e.target.value})}
                  >
                    {uniqueIndustries.map(ind => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-2">
              <Button 
                type="button"
                variant="ghost"
                className="font-medium px-4 rounded-xl h-10"
                onClick={() => setAddCustomerModalOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm font-medium px-6 rounded-xl h-10"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Customer
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </PageShell>
  );
}
