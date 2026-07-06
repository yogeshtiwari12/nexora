import { useEffect, useRef } from "react";
import { ensureGsap } from "@/lib/gsap";

export function useReveal<T extends HTMLElement>(options: { selector?: string; stagger?: number; y?: number; delay?: number }) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { gsap } = ensureGsap();
    
    const targets = options.selector ? el.querySelectorAll(options.selector) : el;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(targets, 
        {
          opacity: 0,
          y: options.y || 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: options.stagger || 0,
          delay: options.delay || 0,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          }
        }
      );
    }, el);
    
    return () => ctx.revert();
  }, [options.selector, options.stagger, options.y, options.delay]);

  return ref;
}
