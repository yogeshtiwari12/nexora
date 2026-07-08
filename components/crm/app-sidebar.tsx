"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  LayoutDashboard,
  Users,
  Building2,
  GitBranch,
  DollarSign,
  Video,
  Calendar,
  CheckSquare,
  TrendingUp,
  BarChart3,
  ScrollText,
  FileText,
  Bell,
  Settings,
  ChevronLeft,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  {
    label: "Workspace", items: [
      { to: "/crm", label: "Executive Dashboard", icon: LayoutDashboard },
    ]
  },
  {
    label: "Relationships", items: [
      { to: "/crm/customers", label: "Customers", icon: Users },
      { to: "/crm/companies", label: "Companies", icon: Building2 },
      { to: "/crm/pipeline", label: "Sales Pipeline", icon: GitBranch },
    ]
  },
  {
    label: "Operations", items: [
      { to: "/crm/meetings", label: "Meetings", icon: Video },
      { to: "/crm/calendar", label: "Calendar", icon: Calendar },
      { to: "/crm/tasks", label: "Tasks", icon: CheckSquare },
      { to: "/crm/team", label: "Team Performance", icon: TrendingUp },
    ]
  },
  {
    label: "Intelligence", items: [
      { to: "/crm/reports", label: "Reports", icon: FileText },
      { to: "/crm/activity", label: "Activity Logs", icon: ScrollText },
      { to: "/crm/notifications", label: "Notifications", icon: Bell },
      { to: "/crm/settings", label: "Settings", icon: Settings },
    ]
  },
] as const;

export function AppSidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const pathname = usePathname() || "";
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!listRef.current) return;
    const items = listRef.current.querySelectorAll("[data-nav-item]");
    gsap.fromTo(
      items,
      { opacity: 0, x: -8 },
      { opacity: 1, x: 0, duration: 0.4, ease: "power2.out", stagger: 0.03 },
    );
  }, []);

  return (
    <aside
      className={cn(
        "sticky top-0 h-screen shrink-0 border-r border-border/70 bg-sidebar transition-[width] duration-300 ease-out",
        collapsed ? "w-[76px]" : "w-[260px]",
      )}
    >
      <div className="flex h-16 items-center gap-2.5 border-b border-border/60 px-5">
        <div className="grid h-9 w-9 place-items-center rounded-xl gradient-primary shadow-elevated">
          <Sparkles className="h-4.5 w-4.5 text-white" strokeWidth={2.5} />
        </div>
        {!collapsed && (
          <div className="flex-1 overflow-hidden">
            <div className="text-[15px] font-semibold tracking-tight truncate">Meridian</div>
            <div className="text-[11px] text-muted-foreground -mt-0.5 truncate">Executive CRM</div>
          </div>
        )}
        <button
          onClick={onToggle}
          className={cn(
            "grid h-7 w-7 shrink-0 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition",
            collapsed && "rotate-180",
          )}
          aria-label="Toggle sidebar"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>

      <div ref={listRef} className="flex flex-col gap-6 overflow-y-auto p-3 h-[calc(100vh-64px)]">
        {nav.map((group) => (
          <div key={group.label}>
            {!collapsed && (
              <div className="px-2.5 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/70">
                {group.label}
              </div>
            )}
            <div className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const active = item.to === "/crm" ? pathname === "/crm" : pathname.startsWith(item.to);
                return (
                  <Link
                    key={item.to}
                    href={item.to}
                    data-nav-item
                    className={cn(
                      "group relative flex items-center gap-3 rounded-lg px-2.5 py-2 text-[13.5px] font-medium transition-all",
                      active
                        ? "bg-primary-soft text-primary"
                        : "text-sidebar-foreground/80 hover:bg-accent hover:text-foreground",
                    )}
                  >
                    {active && (
                      <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-primary" />
                    )}
                    <item.icon className={cn("h-4 w-4 shrink-0", active ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} strokeWidth={2} />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {!collapsed && (
          <div className="mt-auto rounded-xl border border-border bg-gradient-to-br from-primary-soft/60 to-transparent p-4">
            <div className="flex items-center gap-2 text-primary">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-semibold">Executive AI</span>
            </div>
            <p className="mt-1.5 text-[11.5px] leading-relaxed text-muted-foreground">
              Ask for briefings, forecasts, or account intel — anywhere in the workspace.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}

export function useSidebarState() {
  const [collapsed, setCollapsed] = useState(false);
  return { collapsed, toggle: () => setCollapsed((c) => !c) };
}
