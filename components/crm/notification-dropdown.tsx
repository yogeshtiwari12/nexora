"use client";

import { useState } from "react";
import { Bell, Check, User, AlertTriangle, FileText, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const notifications = [
  {
    id: 1,
    type: "success",
    icon: Check,
    text: (
      <>
        Your payment of <b>$2,480.00</b> was approved
      </>
    ),
    time: "8 minutes ago",
    read: false,
    group: "Today",
  },
  {
    id: 2,
    type: "purple",
    icon: User,
    text: (
      <>
        <b>Priya Nair</b> invited you to join the Finance workspace
      </>
    ),
    time: "1 hour ago",
    read: false,
    group: "Today",
  },
  {
    id: 3,
    type: "warning",
    icon: AlertTriangle,
    text: (
      <>
        Storage is at <b>92%</b> capacity
      </>
    ),
    time: "3 hours ago",
    read: false,
    group: "Today",
  },
  {
    id: 4,
    type: "info",
    icon: FileText,
    text: (
      <>
        Invoice <b>#INV-3021</b> was sent to Acme Corp
      </>
    ),
    time: "Yesterday",
    read: true,
    group: "Earlier",
  },
  {
    id: 5,
    type: "neutral",
    icon: Settings,
    text: <>Two-factor authentication was enabled on your account</>,
    time: "2 days ago",
    read: true,
    group: "Earlier",
  },
];

export function NotificationDropdown() {
  const [tab, setTab] = useState<"all" | "unread">("all");
  const [items, setItems] = useState(notifications);

  const unreadCount = items.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setItems(items.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id: number) => {
    setItems(items.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const filteredItems = items.filter((n) => (tab === "unread" ? !n.read : true));

  // Group items
  const grouped = filteredItems.reduce((acc, curr) => {
    if (!acc[curr.group]) acc[curr.group] = [];
    acc[curr.group].push(curr);
    return acc;
  }, {} as Record<string, typeof items>);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-transparent text-slate-500 cursor-pointer outline-none transition-all">
        <Bell className="h-[19px] w-[19px]" />
        {unreadCount > 0 && (
          <span className="absolute right-0 top-0 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
            {unreadCount}
          </span>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[420px] rounded-[14px] border border-slate-100 !bg-white p-0 text-slate-900 shadow-premium font-sans"
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-[18px] pb-[14px] pt-[16px]">
          <span className="text-[15px] font-semibold tracking-tight text-slate-900">Notifications</span>
          <button
            onClick={(e) => { e.preventDefault(); markAllAsRead(); }}
            className="rounded-md px-1.5 py-1 text-[12.5px] font-semibold text-primary hover:bg-primary/10 transition-colors"
          >
            Mark all as read
          </button>
        </div>

        <div className="flex gap-1.5 px-[18px] pt-[12px]">
          <button
            onClick={(e) => { e.preventDefault(); setTab("all"); }}
            className={cn(
              "flex h-[30px] flex-1 items-center justify-center rounded-lg border text-[12.5px] font-semibold transition-all",
              tab === "all"
                ? "border-primary/20 bg-primary/10 text-primary"
                : "border-slate-100 bg-transparent text-slate-500 hover:text-slate-900"
            )}
          >
            All
          </button>
          <button
            onClick={(e) => { e.preventDefault(); setTab("unread"); }}
            className={cn(
              "flex h-[30px] flex-1 items-center justify-center rounded-lg border text-[12.5px] font-semibold transition-all",
              tab === "unread"
                ? "border-primary/20 bg-primary/10 text-primary"
                : "border-slate-100 bg-transparent text-slate-500 hover:text-slate-900"
            )}
          >
            Unread
          </button>
        </div>

        <div className="custom-scrollbar max-h-[420px] overflow-y-auto px-[8px] pb-[6px] pt-[10px]">
          {Object.entries(grouped).map(([group, items]) => (
            <div key={group}>
              <div className="px-[10px] pb-[6px] pt-[8px] text-[11px] font-bold uppercase tracking-wider text-slate-500">
                {group}
              </div>
              {items.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => markAsRead(notif.id)}
                  className="group flex cursor-pointer gap-3 rounded-[10px] p-[11px_10px] transition-colors hover:bg-slate-50"
                >
                  <div
                    className={cn(
                      "flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full",
                      notif.type === "success" && "bg-[#3fb27f]/15 text-[#3fb27f]",
                      notif.type === "purple" && "bg-[#9b7bea]/15 text-[#9b7bea]",
                      notif.type === "warning" && "bg-[#e0a638]/15 text-[#e0a638]",
                      notif.type === "info" && "bg-[#4f8ff0]/15 text-[#4f8ff0]",
                      notif.type === "neutral" && "bg-slate-100 text-slate-500"
                    )}
                  >
                    <notif.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="m-0 text-[13.5px] leading-[1.45] text-slate-900 [&>b]:font-semibold truncate block">
                      {notif.text}
                    </p>
                    <p className="mt-[3px] text-[11.5px] text-slate-500">{notif.time}</p>
                  </div>
                  {!notif.read && (
                    <div className="mt-1.5 h-[7px] w-[7px] shrink-0 rounded-full bg-primary" />
                  )}
                </div>
              ))}
            </div>
          ))}
          {filteredItems.length === 0 && (
            <div className="py-8 text-center text-[13px] text-slate-500">
              No notifications found.
            </div>
          )}
        </div>

        <div className="border-t border-slate-100 p-[10px_12px]">
          <button className="h-[34px] w-full rounded-lg text-[12.5px] font-semibold text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900">
            View all notifications
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
