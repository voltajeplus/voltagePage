'use client';

import React from 'react';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BusinessSections } from "@/components/sections/BusinessSections";

export default function ComoFuncionaPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#00E676] selection:text-black">
            <Navbar />
            <div className="pt-12">
                <BusinessSections />
            </div>
            <Footer />
        </main>
    );
}
