'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { MapSection } from "@/components/home/MapSection";
import { Footer } from "@/components/layout/Footer";
import { ConsumerHowItWorks } from "@/components/sections/ConsumerHowItWorks";
import { ConsumerPricing } from "@/components/sections/ConsumerPricing";
import { FAQ } from "@/components/home/FAQ";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#00E676] selection:text-black">
      <Navbar />

      {/* Original Sections */}
      <Hero />
      <Features />

      {/* Consumer Sections (Proposal 2 Content) */}
      <ConsumerHowItWorks />
      <ConsumerPricing />

      {/* Map */}
      <MapSection />

      {/* Competitor Integration */}
      <FAQ />

      <Footer />
    </main>
  );
}
