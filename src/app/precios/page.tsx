'use client';

import React from 'react';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PymesSections } from "@/components/sections/PymesSections";

export default function PreciosPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#00E676] selection:text-black">
            <Navbar />
            <div className="pt-12">
                <PymesSections />
            </div>
            <Footer />
        </main>
    );
}
