import { useEffect, useState } from "react";
import { Menu, X, Hexagon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Magnetic } from "@/components/site/magnetic";
import { cn } from "@/lib/utils";

const links = [
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why" },
  { label: "Industries", href: "#industries" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#work" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={cn(
          "flex w-full items-center justify-between px-4 transition-all duration-500 sm:px-6",
          scrolled 
            ? "max-w-4xl rounded-full py-2.5 glass shadow-lg border-white/10" 
            : "max-w-6xl rounded-2xl py-4 border-transparent",
        )}
      >
        <a href="#top" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full gradient-brand text-white shadow-sm">
            <Hexagon className="h-5 w-5" strokeWidth={2.4} />
          </span>
          <span className="text-lg font-semibold tracking-tight font-display text-foreground">Nexora</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-white/5"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Magnetic strength={0.3}>
            <a href="#contact" className={cn(buttonVariants(), "h-10 px-5 gradient-brand hover:opacity-90 transition-opacity border-none text-white rounded-full")}>
              Book a Call
            </a>
          </Magnetic>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-lg text-foreground md:hidden hover:bg-white/5"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="absolute top-20 left-4 right-4 z-50 flex flex-col gap-1 rounded-2xl glass p-3 shadow-xl md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" className={cn(buttonVariants(), "mt-1 w-full gradient-brand border-none text-white")} onClick={() => setOpen(false)}>
            Book a Free Consultation
          </a>
        </div>
      )}
    </header>
  );
}
