import { useState } from "react";
import { ArrowRight, Building2, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SectionHeading } from "@/components/site/section-heading";
import { Magnetic } from "@/components/site/magnetic";
import { GlowBlobs, Particles } from "@/components/site/backgrounds";

const contactInfo = [
  { icon: Mail, label: "Email us", value: "hello@nexora.dev" },
  { icon: Phone, label: "Call us", value: "+1 (555) 018-2049" },
  { icon: MapPin, label: "Visit us", value: "500 Innovation Ave, San Francisco, CA" },
];

export function Contact() {
  const [businessType, setBusinessType] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Thanks! We'll reach out within 24 hours.", {
      description: "Your consultation request has been received.",
    });
    e.currentTarget.reset();
    setBusinessType("");
  };

  return (
    <section id="contact" className="relative overflow-hidden py-10 md:py-16">
      <GlowBlobs />
      <Particles count={14} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          eyebrow="Contact Us"
          title={<>Start your <span className="text-gradient-brand">digital transformation</span> today</>}
          description="Tell us about your business and we'll craft a tailored plan to automate, digitize, and scale your operations."
        />

        <div className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-5">
          {/* Info */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            {contactInfo.map((c) => (
              <div
                key={c.label}
                className="flex items-start gap-4 rounded-2xl glass p-5 transition-colors hover:border-cyan-500/50 hover:shadow-[var(--shadow-glow)]"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl gradient-brand text-white shadow-md">
                  <c.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</p>
                  <p className="mt-1 font-medium text-foreground">{c.value}</p>
                </div>
              </div>
            ))}
            <div className="rounded-2xl glass border border-blue-500/20 bg-white/3 p-6 shadow-lg hover:border-blue-500/40 hover:shadow-[var(--shadow-glow)] transition-all">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15">
                <Building2 className="h-6 w-6 text-blue-400" />
              </div>
              <p className="mt-3 text-lg font-semibold text-foreground">Free 30-min strategy session</p>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                No obligations. Walk away with a clear roadmap for your project.
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={onSubmit}
            className="rounded-3xl glass p-6 shadow-xl sm:p-8 lg:col-span-3"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" required placeholder="Jane Cooper" suppressHydrationWarning />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input id="company" placeholder="Acme Inc." suppressHydrationWarning />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required placeholder="jane@acme.com" suppressHydrationWarning />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" suppressHydrationWarning />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Business Type</Label>
                <Select value={businessType} onValueChange={(val) => setBusinessType(val || "")}>
                  <SelectTrigger suppressHydrationWarning>
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Manufacturing",
                      "Healthcare",
                      "Education",
                      "Retail",
                      "Logistics",
                      "Finance",
                      "Startup",
                      "Enterprise",
                      "Other",
                    ].map((o) => (
                      <SelectItem key={o} value={o}>
                        {o}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="requirements">Project Requirements</Label>
                <Textarea
                  id="requirements"
                  rows={4}
                  placeholder="Tell us what you'd like to build or automate..."
                  suppressHydrationWarning
                />
              </div>
            </div>

            <Magnetic strength={0.25} className="mt-6 w-full">
              <Button suppressHydrationWarning className="mt-2 h-12 w-full gradient-brand hover:opacity-90 transition-opacity text-white text-base rounded-xl group border-none" onClick={(e) => {
                e.preventDefault();
                toast.success("Message sent! We'll be in touch soon.");
              }}>
                Send Message <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Magnetic>
          </form>
        </div>
      </div>
    </section>
  );
}
