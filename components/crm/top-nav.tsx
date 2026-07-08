"use client";

import { Search, Bell, MessageSquare, Sparkles, ChevronDown, Plus, Calendar as CalIcon, Check, GitBranch, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NotificationDropdown } from "./notification-dropdown";

export function TopNav() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border/70 bg-background/80 px-6 backdrop-blur-xl">
      <DropdownMenu>
        <DropdownMenuTrigger className="group flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-accent outline-none">
          <div className="grid h-7 w-7 place-items-center rounded-md gradient-primary text-[11px] font-bold text-white">MC</div>
          <div className="text-left">
            <div className="text-[13px] font-semibold leading-tight">Meridian Corp</div>
            <div className="text-[10.5px] text-muted-foreground leading-tight">Executive Workspace</div>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56 border-border/70 bg-popover">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="text-[10.5px] uppercase tracking-wider text-muted-foreground">Workspaces</DropdownMenuLabel>
            <DropdownMenuItem>Meridian Corp</DropdownMenuItem>
            <DropdownMenuItem>Meridian EMEA</DropdownMenuItem>
            <DropdownMenuItem>Meridian Ventures</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="bg-border/60" />
          <DropdownMenuItem>+ New workspace</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="relative ml-2 hidden max-w-md flex-1 md:block">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          placeholder="Search customers, deals, meetings…"
          className="h-9 w-full rounded-lg border border-border/70 bg-secondary/40 pl-9 pr-16 text-[13px] placeholder:text-muted-foreground/70 focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/15 transition"
        />
        <kbd className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-border/60 bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">⌘K</kbd>
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        <Button variant="outline" size="sm" className="h-9 gap-1.5 rounded-lg border-border/80 text-[12.5px] font-medium shadow-[0_2px_8px_oklch(0.2_0.03_260/0.05)]">
          <CalIcon className="h-3.5 w-3.5" />
          Nov 1 – Nov 30
        </Button>

        <Button size="sm" className="h-9 gap-1.5 rounded-lg gradient-primary text-white shadow-elevated text-[12.5px] font-medium hover:opacity-95 border-0">
          <Sparkles className="h-3.5 w-3.5" />
          Ask AI
        </Button>

        <div className="mx-1 h-6 w-px bg-border/60" />

        <DropdownMenu>
          <DropdownMenuTrigger className="relative flex h-9 w-9 items-center justify-center rounded-lg outline-none hover:bg-accent text-foreground cursor-pointer">
            <Plus className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 border-border/70 !bg-white shadow-elevated text-slate-900">
            <DropdownMenuItem className="text-slate-900 focus:bg-slate-50 hover:bg-slate-50 focus:text-slate-900">New Meeting</DropdownMenuItem>
            <DropdownMenuItem className="text-slate-900 focus:bg-slate-50 hover:bg-slate-50 focus:text-slate-900">New Task</DropdownMenuItem>
            <DropdownMenuItem className="text-slate-900 focus:bg-slate-50 hover:bg-slate-50 focus:text-slate-900">New Deal</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className="relative flex h-9 w-9 items-center justify-center rounded-lg outline-none hover:bg-accent text-foreground cursor-pointer">
            <MessageSquare className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 border-border/70 !bg-white shadow-elevated text-slate-900">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-slate-600">Messages</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-100" />
              <DropdownMenuItem className="text-slate-900 focus:bg-slate-50 hover:bg-slate-50 focus:text-slate-900">Sarah Jenkins</DropdownMenuItem>
              <DropdownMenuItem className="text-slate-900 focus:bg-slate-50 hover:bg-slate-50 focus:text-slate-900">Marcus Lowe</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <NotificationDropdown />

        <div className="mx-1 h-6 w-px bg-border/60" />

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg p-1 hover:bg-accent outline-none cursor-pointer">
            <Avatar className="h-8 w-8 border border-border/60">
              <AvatarFallback className="bg-primary text-primary-foreground text-[11px] font-semibold">AK</AvatarFallback>
            </Avatar>
            <div className="hidden text-left lg:block">
              <div className="text-[12.5px] font-semibold leading-tight">Alex Kaminski</div>
              <div className="text-[10.5px] text-muted-foreground leading-tight">CEO · Founder</div>
            </div>
            <ChevronDown className="hidden h-3.5 w-3.5 text-muted-foreground lg:block" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52 border-border/70 !bg-white shadow-elevated text-slate-900">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-slate-600">Alex Kaminski</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-100" />
              <DropdownMenuItem className="cursor-pointer text-slate-900 focus:bg-slate-50 hover:bg-slate-50 focus:text-slate-900">Profile</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-slate-900 focus:bg-slate-50 hover:bg-slate-50 focus:text-slate-900">Preferences</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-slate-900 focus:bg-slate-50 hover:bg-slate-50 focus:text-slate-900">Command palette</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-slate-100" />
            <DropdownMenuItem className="cursor-pointer text-slate-900 focus:bg-slate-50 hover:bg-slate-50 focus:text-slate-900">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
