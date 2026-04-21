'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { MapSection } from "@/components/home/MapSection";
import { Footer } from "@/components/layout/Footer";
import { ConsumerHowItWorks } from "@/components/sections/ConsumerHowItWorks";
import { ConsumerPricing } from "@/components/sections/ConsumerPricing";
import { FAQ } from "@/components/home/FAQ";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#00E676] selection:text-black">
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Station Image Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Nuestra red de estaciones siempre operativa. <br />
              <span className="text-[#00E676]">Encuentra la más cercana a ti.</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Con más de 6 estaciones en Caracas, siempre hay una estación Voltaje cerca de ti. 
              Carga tu móvil en segundos y devuelve la batería en cualquier punto de nuestra red.
            </p>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#00E676]/10">
              <img
                src="/images/ai_generated/hero_render.png"
                alt="Estación de Carga Voltaje"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
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