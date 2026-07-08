"use client";

import { PageHeader, PageShell } from "@/components/crm/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Bell, Lock, Users, CreditCard, Paintbrush } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <PageShell>
      <PageHeader
        eyebrow="Configuration"
        title="Workspace Settings"
        description="Manage your account, team members, and billing preferences."
        actions={
          <Button size="sm" className="h-9 rounded-lg gap-1.5 gradient-primary text-white shadow-elevated border-0">
            Save Changes
          </Button>
        }
      />

      <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-3 space-y-1">
          <button onClick={() => setActiveTab("profile")} className={cn("w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all", activeTab === "profile" ? "bg-white shadow-sm border border-border/40 text-primary" : "text-slate-600 hover:bg-secondary/40 hover:text-slate-900")}>
            <User className="h-4 w-4" /> Personal Profile
          </button>
          <button onClick={() => setActiveTab("notifications")} className={cn("w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all", activeTab === "notifications" ? "bg-white shadow-sm border border-border/40 text-primary" : "text-slate-600 hover:bg-secondary/40 hover:text-slate-900")}>
            <Bell className="h-4 w-4" /> Notifications
          </button>
          <button onClick={() => setActiveTab("security")} className={cn("w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all", activeTab === "security" ? "bg-white shadow-sm border border-border/40 text-primary" : "text-slate-600 hover:bg-secondary/40 hover:text-slate-900")}>
            <Lock className="h-4 w-4" /> Security
          </button>
          <div className="my-2 h-px bg-border/40 mx-2" />
          <button onClick={() => setActiveTab("team")} className={cn("w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all", activeTab === "team" ? "bg-white shadow-sm border border-border/40 text-primary" : "text-slate-600 hover:bg-secondary/40 hover:text-slate-900")}>
            <Users className="h-4 w-4" /> Team Members
          </button>
          <button onClick={() => setActiveTab("billing")} className={cn("w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all", activeTab === "billing" ? "bg-white shadow-sm border border-border/40 text-primary" : "text-slate-600 hover:bg-secondary/40 hover:text-slate-900")}>
            <CreditCard className="h-4 w-4" /> Billing & Plans
          </button>
          <button onClick={() => setActiveTab("appearance")} className={cn("w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all", activeTab === "appearance" ? "bg-white shadow-sm border border-border/40 text-primary" : "text-slate-600 hover:bg-secondary/40 hover:text-slate-900")}>
            <Paintbrush className="h-4 w-4" /> Appearance
          </button>
        </div>

        <div className="md:col-span-9">
          <div data-reveal className="rounded-[24px] border border-border/40 bg-card p-6 md:p-8 shadow-elevated">
            <h2 className="text-[18px] font-semibold text-slate-900 tracking-tight">Personal Profile</h2>
            <p className="mt-1.5 text-[13px] text-muted-foreground">Update your photo and personal details here.</p>
            
            <div className="mt-8 border-t border-border/40 pt-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[12px] font-semibold uppercase tracking-wider text-slate-500">First Name</label>
                  <Input defaultValue="Alex" className="h-10 rounded-xl bg-secondary/20 border-border/60 focus:bg-white transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] font-semibold uppercase tracking-wider text-slate-500">Last Name</label>
                  <Input defaultValue="Kaminski" className="h-10 rounded-xl bg-secondary/20 border-border/60 focus:bg-white transition-colors" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[12px] font-semibold uppercase tracking-wider text-slate-500">Email Address</label>
                <Input defaultValue="alex@meridian.crm" className="h-10 rounded-xl bg-secondary/20 border-border/60 focus:bg-white transition-colors" />
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-semibold uppercase tracking-wider text-slate-500">Job Title</label>
                <Input defaultValue="VP of Sales" className="h-10 rounded-xl bg-secondary/20 border-border/60 focus:bg-white transition-colors" />
              </div>
            </div>
            
            <div className="mt-8 flex justify-end gap-3">
               <Button variant="outline" className="h-10 rounded-xl border-border/70 text-slate-700 hover:bg-secondary/40">Cancel</Button>
               <Button className="h-10 rounded-xl gradient-primary text-white border-0 shadow-sm px-6">Save Profile</Button>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
