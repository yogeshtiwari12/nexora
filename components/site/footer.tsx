import { Hexagon, Globe, Briefcase, Mail } from "lucide-react";

const columns = [
  {
    title: "Services",
    links: ["CRM Development", "ERP Solutions", "Automation", "AI Integration", "Mobile Apps"],
  },
  {
    title: "Company",
    links: ["Why Us", "Process", "Industries", "Portfolio", "Contact"],
  },
  {
    title: "Resources",
    links: ["Case Studies", "Documentation", "Blog", "Careers", "Support"],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <a href="#top" className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl gradient-brand text-white shadow-md">
                <Hexagon className="h-5 w-5" strokeWidth={2.4} />
              </span>
              <span className="text-lg font-semibold font-display text-foreground">Nexora</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              We build enterprise-grade custom software that digitizes operations,
              automates workflows, and drives real business growth.
            </p>
            <div className="mt-5 flex gap-3">
              {[Globe, Briefcase, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-muted-foreground transition-all hover:-translate-y-0.5 hover:text-foreground hover:bg-white/10 hover:shadow-sm"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-foreground">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Nexora. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-foreground">Privacy</a>
            <a href="#" className="transition-colors hover:text-foreground">Terms</a>
            <a href="#" className="transition-colors hover:text-foreground">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
