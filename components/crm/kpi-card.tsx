"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  change: number;
  trend: "up" | "down";
  sparkline: number[];
  icon?: React.ReactNode;
  delay?: number;
}

export function KpiCard({ label, value, prefix = "", suffix = "", change, trend, sparkline, icon, delay = 0 }: Props) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let start: number | null = null;
    const duration = 900;
    const from = 0;
    const to = value;
    const tick = (t: number) => {
      if (start === null) start = t + delay;
      const elapsed = Math.max(0, t - start);
      const p = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(from + (to - from) * eased);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value, delay]);

  const formatted = (() => {
    if (suffix === "%") return display.toFixed(1);
    if (suffix === "M") return display.toFixed(2);
    if (value >= 1_000_000) return (display / 1_000_000).toFixed(2) + "M";
    if (value >= 10_000) return Math.round(display).toLocaleString('en-US');
    if (!Number.isInteger(value)) return display.toFixed(1);
    return Math.round(display).toLocaleString('en-US');
  })();

  const positive = trend === "up";
  const data = sparkline.map((v, i) => ({ i, v }));

  const safeId = label.replace(/\s+/g, '-').toLowerCase();

  return (
    <div
      data-reveal
      className="bg-card group relative overflow-hidden rounded-[24px] border border-border/40 p-5 shadow-elevated transition-all hover:-translate-y-0.5 hover:shadow-premium"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="flex items-start justify-between">
        <div>
          <div className="text-[11.5px] font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-[13px] font-medium text-muted-foreground">{prefix}</span>
            <span className="text-[26px] font-semibold tracking-tight tabular-nums">{formatted}</span>
            <span className="text-[13px] font-medium text-muted-foreground">{suffix}</span>
          </div>
        </div>
        {icon && (
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary-soft text-primary">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <div
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11.5px] font-semibold",
            positive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive",
          )}
        >
          {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {positive ? "+" : ""}
          {change}%
        </div>
        <div className="h-10 w-24">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
            <AreaChart data={data} margin={{ top: 2, bottom: 2, left: 0, right: 0 }}>
              <defs>
                <linearGradient id={`spark-${safeId}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={positive ? "oklch(0.68 0.16 155)" : "oklch(0.6 0.22 25)"} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={positive ? "oklch(0.68 0.16 155)" : "oklch(0.6 0.22 25)"} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke={positive ? "oklch(0.68 0.16 155)" : "oklch(0.6 0.22 25)"}
                strokeWidth={1.75}
                fill={`url(#spark-${safeId})`}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
