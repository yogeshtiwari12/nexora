"use client";

import { AppSidebar, useSidebarState } from "@/components/crm/app-sidebar";
import { TopNav } from "@/components/crm/top-nav";
import { AlertTriangle } from "lucide-react";
import "./crm.css"; // Isolated Light Theme Variables

export default function CrmLayout({ children }: { children: React.ReactNode }) {
  const sidebar = useSidebarState();

  return (
    <div className="crm-theme relative flex h-screen text-foreground z-50 overflow-hidden font-sans bg-background">
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center justify-center gap-2 rounded-full bg-warning/90 backdrop-blur-md px-5 py-2 text-[13px] font-medium text-warning-foreground shadow-elevated animate-in fade-in slide-in-from-top-4 pointer-events-none">
        <AlertTriangle className="h-4 w-4" />
        Portal is currently under maintenance
      </div>
      <AppSidebar collapsed={sidebar.collapsed} onToggle={sidebar.toggle} />
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto overflow-x-hidden gradient-mesh">
          {children}
        </main>
      </div>
    </div>
  );
}
