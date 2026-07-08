"use client";

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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Download, Plus, Mail, Phone, CalendarPlus, MessageSquare, MoreHorizontal, UserCog, Archive } from "lucide-react";
import { cn } from "@/lib/utils";

const statusStyle: Record<string, string> = {
  Active: "bg-success/10 text-success",
  VIP: "bg-primary text-primary-foreground",
  Prospect: "bg-warning/15 text-warning-foreground",
  Lead: "bg-info/10 text-info",
  Inactive: "bg-secondary text-muted-foreground",
};

const priorityStyle: Record<string, string> = {
  High: "bg-destructive/10 text-destructive",
  Medium: "bg-warning/15 text-warning-foreground",
  Low: "bg-secondary text-muted-foreground",
};

export default function CustomersPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Relationships"
        title="Customers"
        description="12,847 active accounts across 42 industries."
        actions={
          <>
            <Button variant="outline" size="sm" className="h-9 rounded-lg gap-1.5"><Download className="h-3.5 w-3.5" />Export</Button>
            <Button size="sm" className="h-9 rounded-lg gap-1.5 gradient-primary text-white shadow-elevated"><Plus className="h-3.5 w-3.5" />New customer</Button>
          </>
        }
      />

      <div data-reveal className="rounded-2xl border border-border/70 bg-card shadow-soft overflow-hidden">
        <div className="flex flex-wrap items-center gap-2 border-b border-border/70 p-4">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search customers by name, company, email…" className="h-9 rounded-lg pl-9 bg-secondary/40 border-border" />
          </div>
          <Button variant="outline" size="sm" className="h-9 rounded-lg gap-1.5"><Filter className="h-3.5 w-3.5" />All statuses</Button>
          <Button variant="outline" size="sm" className="h-9 rounded-lg gap-1.5"><Filter className="h-3.5 w-3.5" />All industries</Button>
          <Button variant="outline" size="sm" className="h-9 rounded-lg gap-1.5"><Filter className="h-3.5 w-3.5" />All managers</Button>
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
              {customers.map((c) => (
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
                    <div className="flex items-center justify-end gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                      <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md" title="Email"><Mail className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md" title="Call"><Phone className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md" title="Schedule"><CalendarPlus className="h-3.5 w-3.5" /></Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-7 w-7 rounded-md">
                          <MoreHorizontal className="h-3.5 w-3.5" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem><MessageSquare className="mr-2 h-3.5 w-3.5" />Add note</DropdownMenuItem>
                          <DropdownMenuItem><UserCog className="mr-2 h-3.5 w-3.5" />Assign team member</DropdownMenuItem>
                          <DropdownMenuItem>Change status</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive"><Archive className="mr-2 h-3.5 w-3.5" />Archive</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between border-t border-border/70 px-4 py-3 text-[12px] text-muted-foreground">
          <span>Showing 1–10 of 12,847</span>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" className="h-7 rounded-md">Previous</Button>
            <Button variant="outline" size="sm" className="h-7 rounded-md">Next</Button>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
