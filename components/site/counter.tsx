import { useEffect, useRef, useState } from "react";
import { ensureGsap } from "@/lib/gsap";

interface CounterProps {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
}

/** Counts up from 0 to `to` when scrolled into view. */
export function Counter({ to, suffix = "", prefix = "", duration = 2, decimals = 0 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { gsap, ScrollTrigger } = ensureGsap();
    const obj = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: to,
        duration,
        ease: "power2.out",
        onUpdate: () => setValue(obj.val),
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    }, el);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [to, duration]);

  const formatted =
    decimals > 0
      ? value.toFixed(decimals)
      : Math.round(value).toLocaleString("en-US");

  return (
    <span ref={ref}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
