'use client';

import React from 'react';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EventsHero } from "@/components/sections/EventsHero";
import { EventsSection } from "@/components/sections/EventsSection";

export default function EventosPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#00E676] selection:text-black">
            <Navbar />
            <EventsHero />
            <div id="eventos-galeria" className="pt-12">
                <EventsSection />
            </div>
            <Footer />
        </main>
    );
}
