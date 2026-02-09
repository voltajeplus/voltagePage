'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/Button";
import { motion } from 'framer-motion';
import { Users, Clock, Zap, TrendingUp, Building, Smartphone, Coffee, ShoppingBag } from 'lucide-react';

export const BusinessSections = () => {
    return (
        <>
            {/* Hero */}
            <section className="py-20 relative overflow-hidden">
                <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-[#00E676] opacity-5 blur-[120px] rounded-full pointer-events-none" />

                <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-block px-3 py-1 mb-6 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 text-[#00E676] text-sm font-bold">
                            Soluciones para Negocios
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Instalación Gratuita. <br />
                            <span className="text-[#00E676] text-glow">Mantenimiento Incluido.</span>
                        </h2>
                        <p className="text-xl text-gray-400 mb-8 max-w-lg">
                            Ofrece a tus clientes la comodidad de cargar sus dispositivos y mejora su experiencia en tu negocio.
                        </p>
                        <Link href="/registro">
                            <Button size="lg" className="shadow-[0_0_30px_rgba(0,230,118,0.3)]">
                                Solicitar Información
                            </Button>
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="relative"
                    >
                        <div className="aspect-[4/3] rounded-3xl overflow-hidden glass border border-white/10 relative">
                            <img
                                src="/images/ai_generated/technicians_installing_v2.png"
                                alt="Instalación de Estación Voltaje"
                                className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />

                            {/* Overlay Gradient for text readability if needed */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Why Choose Us Grid */}
            <section className="py-20 bg-black/50">
                <div className="container mx-auto px-6">
                    <div className="mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Por Qué Elegir Nuestras Estaciones</h2>
                        <p className="text-gray-400 max-w-2xl">Descubre los beneficios directos que nuestras soluciones de carga aportan a tu establecimiento.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Users, title: "Atrae Tráfico Peatonal", desc: "Los usuarios buscan activamente nuestras estaciones en la App para cargar." },
                            { icon: Clock, title: "Aumenta la Retención", desc: "Un cliente con batería es un cliente que se queda más tiempo consumiendo." },
                            { icon: TrendingUp, title: "Servicio Premium", desc: "Moderniza tu local ofreciendo una necesidad básica del siglo XXI." },
                            { icon: Zap, title: "Sin Esfuerzo", desc: "Instalación 100% gratuita y mantenimiento gestionado por nosotros." }
                        ].map((item, i) => (
                            <div key={i} className="glass p-6 rounded-2xl border border-white/5 hover:border-[#00E676]/30 transition-colors group">
                                <div className="w-10 h-10 rounded-lg bg-[#00E676]/10 flex items-center justify-center text-[#00E676] mb-4 group-hover:bg-[#00E676] group-hover:text-black transition-all">
                                    <item.icon className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Ideal For */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-12">Ideal Para Tu Negocio</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { icon: Coffee, title: "Cafeterías", img: "/images/ai_generated/cafe_voltifi.png", isImage: true },
                            { icon: ShoppingBag, title: "Retail", img: "/images/ai_generated/retail_voltifi.png", isImage: true },
                            { icon: Building, title: "Hoteles", img: "/images/ai_generated/hotel_voltifi.png", isImage: true },
                            { icon: Smartphone, title: "Eventos", img: "/images/ai_generated/event_voltifi.png", isImage: true }
                        ].map((sector, i) => (
                            <div key={i} className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-[#00E676]/50 transition-colors">
                                {sector.isImage ? (
                                    <img src={sector.img} alt={sector.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                ) : (
                                    <div className={`absolute inset-0 ${sector.img} opacity-40 group-hover:opacity-60 transition-opacity`} />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                                <div className="absolute bottom-0 left-0 p-6">
                                    <sector.icon className="w-8 h-8 text-[#00E676] mb-3" />
                                    <h3 className="text-xl font-bold">{sector.title}</h3>
                                    <p className="text-xs text-gray-300 mt-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0">
                                        Mejora la experiencia de tus visitantes con carga segura.
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form CTA */}
            <section className="py-20">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="glass p-8 md:p-12 rounded-3xl border border-white/10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <h2 className="text-3xl font-bold mb-4">Ponte en Contacto</h2>
                                <p className="text-gray-400 mb-8">
                                    ¿Listo para llevar tu negocio al siguiente nivel? Completa el formulario y nuestro equipo te contactará.
                                </p>
                                <div className="space-y-4 text-sm text-gray-400">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">✉️</div>
                                        info@voltajevzla.com
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">📞</div>
                                        +58 412 685 1090
                                    </div>
                                </div>
                            </div>

                            <form className="space-y-4">
                                <input type="text" placeholder="Nombre" className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 focus:border-[#00E676] focus:outline-none" />
                                <input type="text" placeholder="Nombre del Negocio" className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 focus:border-[#00E676] focus:outline-none" />
                                <input type="email" placeholder="Email" className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 focus:border-[#00E676] focus:outline-none" />
                                <textarea rows={3} placeholder="Mensaje" className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 focus:border-[#00E676] focus:outline-none" />
                                <Button className="w-full">Enviar Solicitud</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
