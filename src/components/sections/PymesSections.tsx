'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/Button";
import { motion } from 'framer-motion';
import { Clock, Star, Zap, TrendingUp, Coins, Shield } from 'lucide-react';

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

                    {/* Video Showcase */}
                    <div className="mt-16 relative max-w-4xl mx-auto rounded-3xl overflow-hidden glass border border-white/10 shadow-2xl shadow-[#00E676]/10">
                        <div className="relative aspect-[16/9]">
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            >
                                <source src="/videos/hero-video.mp4" type="video/mp4" />
                            </video>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="glass inline-block px-4 py-2 rounded-full text-sm font-bold text-[#00E676]">
                                    Estaciones Voltaje en Acción
                                </div>
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

                            <div className="space-y-6 mb-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-[#00E676]/10 flex items-center justify-center shrink-0 group-hover:bg-[#00E676] transition-colors">
                                        <TrendingUp className="w-5 h-5 text-[#00E676]" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-sm">Inversión Cero</h4>
                                        <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                                            Instalación 100% Gratuita: Llevamos y configuramos la estación inteligente en tu local sin ningún costo de afiliación ni cargos ocultos.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-[#00E676]/10 flex items-center justify-center shrink-0">
                                        <Coins className="w-5 h-5 text-[#00E676]" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-sm">Ganancias por Comisión</h4>
                                        <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                                            Modelo de Comisión: Gana un porcentaje por cada usuario que recargue o retire una batería en tu establecimiento. ¡Tu espacio genera dinero de forma autónoma!
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-[#00E676]/10 flex items-center justify-center shrink-0">
                                        <Shield className="w-5 h-5 text-[#00E676]" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-sm">Mantenimiento Incluido</h4>
                                        <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                                            Monitoreamos las estaciones en tiempo real. Si una batería requiere cambio o soporte, nuestro equipo técnico lo resuelve de inmediato sin costo para ti.
                                        </p>
                                    </div>
                                </div>
                            </div>

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
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Únete a Nuestra Red de <span className="text-[#00E676]">Voltaje</span></h2>
                        <p className="text-gray-400 max-w-xl mx-auto">La tecnología que tu negocio necesita. ¡Pídela antes de que se agoten en tu zona!</p>
                    </motion.div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { src: "/images/ai_generated/gallery_scan.png", alt: "Galería Voltaje 1" },
                            { src: "/images/ai_generated/cafe_voltifi.png", alt: "Galería Voltaje 2" },
                            { src: "/images/ai_generated/technicians_installing_v2.png", alt: "Instalación de Estación Voltaje" },
                            { src: "/images/ai_generated/event_voltifi.png", alt: "Galería Voltaje 4" }
                        ].map((item, i) => (
                            <div key={i} className="aspect-square bg-white/5 rounded-2xl border border-white/5 hover:border-[#00E676] transition-colors cursor-pointer overflow-hidden group relative">
                                <img
                                    src={item.src}
                                    alt={item.alt}
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
