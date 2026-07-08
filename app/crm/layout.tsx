"use client";

import { AppSidebar, useSidebarState } from "@/components/crm/app-sidebar";
import { TopNav } from "@/components/crm/top-nav";
import "./crm.css"; // Isolated Light Theme Variables

export default function CrmLayout({ children }: { children: React.ReactNode }) {
  const sidebar = useSidebarState();

  return (
    <div className="crm-theme relative flex h-screen text-foreground z-50 overflow-hidden font-sans bg-background">
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
