'use client';

import React from 'react';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from 'framer-motion';
import { Zap, Map, Shield, PenTool, Smartphone, Globe, Clock, BarChart } from 'lucide-react';

const benefitsList = [
    {
        icon: Zap,
        title: "Carga Ultrarrápida",
        description: "Tecnología PowerDelivery 3.0 que carga dispositivos hasta un 80% en 30 minutos. Compatible con iOS y Android."
    },
    {
        icon: Map,
        title: "Cobertura en toda la ciudad",
        description: "Encuentra estaciones en los mejores locales, restaurantes y centros comerciales de Caracas."
    },
    {
        icon: Shield,
        title: "Seguridad de Grado Militar",
        description: "Protección contra sobretensiones, control de temperatura y cifrado de datos para tu navegación."
    },
    {
        icon: Smartphone,
        title: "App Intuitiva",
        description: "Gestiona tu carga, localiza estaciones y paga sin contacto desde nuestra aplicación móvil."
    },
    {
        icon: Clock,
        title: "Disponibilidad 24/7",
        description: "Red de estaciones siempre operativas gracias a nuestro sistema de monitoreo en tiempo real."
    },
    {
        icon: BarChart,
        title: "Analíticas para Negocios",
        description: "Si eres dueño de un establecimiento, obtén datos valiosos sobre el flujo de clientes."
    }
];

export default function BeneficiosPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#00E676] selection:text-black">
            <Navbar />

            <section className="pt-32 pb-20 relative overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#00E676] opacity-5 blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-6xl font-bold mb-6"
                        >
                            Más que solo <span className="text-[#00E676] text-glow">Energía</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-gray-400"
                        >
                            Descubre cómo Voltaje transforma la experiencia de mantenerte conectado en la ciudad.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {benefitsList.map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="glass p-8 rounded-3xl glass-hover group"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-[#00E676]/10 flex items-center justify-center mb-6 group-hover:bg-[#00E676] group-hover:shadow-[0_0_20px_rgba(0,230,118,0.4)] transition-all duration-300">
                                    <benefit.icon className="w-7 h-7 text-[#00E676] group-hover:text-black transition-colors" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3 group-hover:text-white transition-colors">
                                    {benefit.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                                    {benefit.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
