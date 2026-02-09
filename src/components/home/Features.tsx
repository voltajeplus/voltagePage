'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, CreditCard, Shield, PenTool } from 'lucide-react';

const features = [
    {
        icon: Zap,
        title: "Cables Incorporados",
        description: "Todo en uno. Cada Power Bank incluye cables Lightning, USB-C y Micro-USB. Carga cualquier dispositivo."
    },
    {
        icon: CreditCard,
        title: "Pago Contactless",
        description: "Sin apps obligatorias. Paga directamente en la estación con tu tarjeta de débito o crédito en segundos."
    },
    {
        icon: Shield,
        title: "Red Interconectada",
        description: "Alquila en un punto y devuelve en otro. Nuestra red cubre los puntos clave de Caracas."
    },
    {
        icon: PenTool,
        title: "Carga Rápida y Segura",
        description: "Baterías con tecnología de carga rápida y protección contra sobretensión para cuidar tu móvil."
    }
];

export const Features = () => {
    return (
        <section id="features" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">

                <div className="mb-16 text-center max-w-3xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold mb-4"
                    >
                        ¿Por Qué Elegir Nuestras Estaciones?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400"
                    >
                        Ofrecemos una experiencia perfecta para tus clientes, combinando energía esencial con acceso a internet confiable.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass p-6 rounded-2xl glass-hover group"
                        >
                            <div className="w-12 h-12 rounded-lg bg-[#00E676]/10 flex items-center justify-center mb-4 group-hover:bg-[#00E676] group-hover:shadow-[0_0_20px_rgba(0,230,118,0.4)] transition-all duration-300">
                                <feature.icon className="w-6 h-6 text-[#00E676] group-hover:text-black transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};
