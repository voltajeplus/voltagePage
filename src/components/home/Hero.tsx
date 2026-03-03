'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import Link from 'next/link';
import { Zap, Battery, Shield } from 'lucide-react';

export const Hero = () => {
    const [isAppModalOpen, setIsAppModalOpen] = useState(false);

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 center w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] left-[50%] -translate-x-[50%] w-[600px] h-[600px] rounded-full bg-[#00E676] opacity-10 blur-[120px]" />
                <div className="absolute top-[40%] right-[-10%] w-[400px] h-[400px] rounded-full bg-blue-500 opacity-5 blur-[100px]" />
            </div>

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#00E676] text-sm font-medium mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E676] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E676]"></span>
                        </span>
                        La Revolución de la Energía Móvil
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                        Alquila una Power Bank y <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E676] to-[#00C853] text-glow">Mantente Conectado.</span>
                    </h1>

                    <p className="text-lg text-gray-400 mb-8 max-w-xl leading-relaxed">
                        Paga solo por el tiempo que necesites. Carga tu móvil al instante y devuelve la batería en cualquier estación Voltaje de Caracas.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Button
                            size="lg"
                            className="group"
                            onClick={() => setIsAppModalOpen(true)}
                        >
                            <Zap className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                            Descargar App
                        </Button>
                        <Link href="/contacto">
                            <Button variant="outline" size="lg">
                                Ver Mapa de Estaciones
                            </Button>
                        </Link>
                    </div>

                    <div className="mt-12 flex items-center gap-8 text-gray-500 text-sm font-medium">
                        <div className="flex items-center gap-2">
                            <Battery className="w-5 h-5 text-[#00E676]" />
                            <span>Carga Rápida</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-[#00E676]" />
                            <span>Carga Segura</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Zap className="w-5 h-5 text-[#00E676]" />
                            <span>Gestión App</span>
                        </div>
                    </div>
                </motion.div>

                {/* Hero Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                >
                    <div className="relative z-10 glass rounded-3xl p-4 md:p-8 aspect-square flex items-center justify-center border-t border-white/10 shadow-2xl shadow-[#00E676]/10 overflow-hidden">
                        {/* Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent z-0" />

                        {/* Actual Product Image */}
                        <img
                            src="/images/ai_generated/hero_render.png"
                            alt="Estación de Carga Voltaje"
                            className="relative z-10 w-full h-full object-cover rounded-2xl shadow-2xl transition-transform hover:scale-105 duration-700"
                        />

                        {/* Floating Elements */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="absolute top-10 right-10 glass px-4 py-2 rounded-xl flex items-center gap-3 z-20"
                        >
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <span className="text-sm font-medium">Estación Activa</span>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                            className="absolute bottom-10 left-10 glass px-4 py-2 rounded-xl flex items-center gap-3 z-20"
                        >
                            <Battery className="w-4 h-4 text-[#00E676]" />
                            <span className="text-sm font-medium">Carga Rápida</span>
                        </motion.div>
                    </div>
                </motion.div>

            </div>

            {/* App Download Modal */}
            <AnimatePresence>
                {isAppModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={(e) => {
                            if (e.target === e.currentTarget) setIsAppModalOpen(false);
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-[#0a0a0a] border border-white/10 p-8 rounded-3xl max-w-sm w-full relative shadow-2xl"
                        >
                            <button
                                onClick={() => setIsAppModalOpen(false)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors p-2"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>

                            <h3 className="text-2xl font-bold mb-2 text-white text-center">Descarga la App</h3>
                            <p className="text-gray-400 mb-8 text-center text-sm">
                                Elige tu plataforma y comienza a disfrutar de energía sin límites.
                            </p>

                            <div className="flex flex-col gap-4">
                                <Link href="#" className="w-full">
                                    <Button className="w-full justify-center group bg-white hover:bg-gray-200 text-black border border-transparent h-14 text-lg rounded-xl" size="lg">
                                        {/* Apple Logo */}
                                        <svg className="w-6 h-6 mr-3" viewBox="0 0 384 512" fill="currentColor">
                                            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                                        </svg>
                                        App Store
                                    </Button>
                                </Link>
                                <Link href="#" className="w-full">
                                    <Button className="w-full justify-center group bg-[#00E676] hover:bg-[#00C853] text-black h-14 text-lg rounded-xl" size="lg">
                                        {/* Google Play Logo */}
                                        <svg className="w-6 h-6 mr-3" viewBox="0 0 512 512" fill="currentColor">
                                            <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                                        </svg>
                                        Google Play
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
