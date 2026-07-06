import { cn } from "@/lib/utils";

/** Ambient animated particles rendered with pure CSS floats. */
export function Particles({ count = 18, className }: { count?: number; className?: string }) {
  const dots = Array.from({ length: count });
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      {dots.map((_, i) => {
        const size = 2 + ((i * 7) % 5);
        const left = (i * 53) % 100;
        const top = (i * 37) % 100;
        const delay = (i % 7) * 0.8;
        const dur = 6 + (i % 6);
        return (
          <span
            key={i}
            className="absolute rounded-full bg-cyan-500/60"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: `${top}%`,
              animation: `float ${dur}s ease-in-out ${delay}s infinite`,
              opacity: 0.35,
            }}
          />
        );
      })}
    </div>
  );
}

/** Vertical light beams sweeping subtly in the background. */
export function Beams({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <div className="absolute -top-1/3 left-1/4 h-[140%] w-px bg-gradient-to-b from-transparent via-blue-500/50 to-transparent animate-beam" />
      <div className="absolute -top-1/3 left-1/2 h-[140%] w-px bg-gradient-to-b from-transparent via-cyan-500/40 to-transparent animate-beam [animation-delay:1.5s]" />
      <div className="absolute -top-1/3 left-3/4 h-[140%] w-px bg-gradient-to-b from-transparent via-violet-500/40 to-transparent animate-beam [animation-delay:3s]" />
    </div>
  );
}

/** Soft radial spotlight glow blobs. */
export function GlowBlobs({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <div className="absolute -top-24 left-[10%] h-96 w-96 rounded-full bg-blue-500/25 blur-[120px] animate-pulse-glow" />
      <div className="absolute top-1/3 right-[5%] h-80 w-80 rounded-full bg-cyan-500/20 blur-[120px] animate-pulse-glow [animation-delay:2s]" />
      <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-violet-500/20 blur-[120px] animate-pulse-glow [animation-delay:1s]" />
    </div>
  );
}
