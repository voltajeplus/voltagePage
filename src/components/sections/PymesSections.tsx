'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/Button";
import { motion } from 'framer-motion';
import { Clock, Star, Zap, CheckCircle } from 'lucide-react';

export const PymesSections = () => {
    return (
        <>
            {/* Hero */}
            <section className="py-20 relative text-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00E676] opacity-10 blur-[150px] rounded-full pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold mb-6"
                    >
                        Impulsa tu Negocio con Nuestras <br />
                        <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">Estaciones de Carga Inteligentes</span>
                    </motion.h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                        Beneficios exclusivos para PYMES que se registren anticipadamente. Moderniza tu espacio y atrae más clientes con tecnología de vanguardia.
                    </p>
                    <Link href="/registro">
                        <Button size="lg" className="shadow-[0_0_20px_rgba(0,230,118,0.4)]">
                            Registra tu Negocio
                        </Button>
                    </Link>

                    {/* Hero Product Render Placeholder */}
                    <div className="mt-16 relative max-w-4xl mx-auto h-[400px] flex items-center justify-center">
                        <div className="w-full h-full glass rounded-3xl border border-white/5 bg-gradient-to-b from-white/5 to-transparent overflow-hidden shadow-2xl relative">
                            <img
                                src="/images/ai_generated/business_lifestyle.png"
                                alt="Voltaje en Negocios"
                                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                            <div className="absolute bottom-8 left-0 right-0 text-center">
                                <p className="text-[#00E676] font-mono text-sm tracking-widest font-bold">VOLTAJE STATION PRO</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3 Card Features */}
            <section className="py-20 bg-black/50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Atrae y Retiene Clientes con un Servicio Superior</h2>
                        <p className="text-gray-400">Ofrece un servicio que tus clientes valorarán, aumentando el tiempo que pasan en tu establecimiento.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Clock, title: "Aumenta el Tiempo de Permanencia", desc: "Clientes se quedan más tiempo mientras sus dispositivos cargan." },
                            { icon: Star, title: "Mejora la Experiencia", desc: "Ofrece una comodidad esencial que diferencia tu negocio." },
                            { icon: Zap, title: "Moderniza tu Espacio", desc: "Muestra una imagen innovadora y tecnológica." }
                        ].map((feature, i) => (
                            <div key={i} className="glass p-8 rounded-2xl border border-[#00E676]/10 hover:border-[#00E676] transition-colors group">
                                <div className="w-12 h-12 rounded-lg bg-[#00E676]/20 flex items-center justify-center text-[#00E676] mb-6">
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed text-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Exclusive Offer Box */}
            <section className="py-20">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="glass rounded-3xl border border-[#00E676]/20 overflow-hidden flex flex-col md:flex-row shadow-[0_0_50px_rgba(0,230,118,0.05)]">
                        <div className="w-full md:w-1/2 p-0 bg-black/50 flex items-center justify-center relative group overflow-hidden">
                            {/* Product Image */}
                            <img
                                src="/images/ai_generated/pyme_offer.png"
                                alt="Crecimiento con Voltaje"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/80 md:hidden" />
                        </div>

                        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
                            <div className="text-[#00E676] text-xs font-bold font-mono mb-2 uppercase tracking-widest">Oferta Exclusiva</div>
                            <h2 className="text-3xl font-bold mb-6">Desbloquea Beneficios Únicos para tu PYME</h2>
                            <p className="text-gray-400 mb-8 text-sm">
                                Regístrate hoy y obtén acceso a beneficios únicos diseñados para impulsar tu negocio desde el primer día.
                            </p>

                            <ul className="space-y-4 mb-8">
                                {['20% de Descuento en tu Primera Unidad', 'Paquete de Instalación Gratuito', 'Soporte Prioritario 24/7'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                                        <CheckCircle className="w-5 h-5 text-[#00E676] shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <Link href="/registro" className="w-full">
                                <Button className="w-full" size="lg">Reclamar Oferta Ahora</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery */}
            <section className="py-20 pb-32">
                <div className="container mx-auto px-6">
                    <h2 className="text-center text-2xl font-bold mb-12">Así se ven en acción</h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            "/images/ai_generated/gallery_scan.png",
                            "/images/ai_generated/cafe_voltifi.png",
                            "/images/ai_generated/retail_voltifi.png",
                            "/images/ai_generated/event_voltifi.png"
                        ].map((src, i) => (
                            <div key={i} className="aspect-square bg-white/5 rounded-2xl border border-white/5 hover:border-[#00E676] transition-colors cursor-pointer overflow-hidden group relative">
                                <img
                                    src={src}
                                    alt={`Galería Voltaje ${i + 1}`}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 opacity-60 group-hover:opacity-40 transition-opacity" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};
