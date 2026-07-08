"use client";

import { AppSidebar, useSidebarState } from "@/components/crm/app-sidebar";
import { TopNav } from "@/components/crm/top-nav";

export default function CrmLayout({ children }: { children: React.ReactNode }) {
  const sidebar = useSidebarState();

  return (
    <div className="relative flex h-screen text-foreground z-50 overflow-hidden font-sans">
      <AppSidebar collapsed={sidebar.collapsed} onToggle={sidebar.toggle} />
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
