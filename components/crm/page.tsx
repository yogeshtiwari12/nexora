import React from "react";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out p-6">
      {children}
    </div>
  );
}

interface PageHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  actions?: React.ReactNode;
}

export function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between mb-0">
      <div>
        {eyebrow && <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-emerald-600 mb-1">{eyebrow}</div>}
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-foreground">{title}</h1>
        {description && <p className="mt-1.5 text-[14px] text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
