"use client";

import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { Industries } from "@/components/site/industries";
import { Process } from "@/components/site/process";
import { Services } from "@/components/site/services";
import { WhyUs } from "@/components/site/why-us";
import { Portfolio } from "@/components/site/portfolio";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Services />
        <WhyUs />
        <Industries />
        <Process />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
