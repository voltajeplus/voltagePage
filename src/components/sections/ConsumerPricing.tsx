
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/Button";
import { motion } from 'framer-motion';
import { Check, Info, Star, Users } from 'lucide-react';

export const ConsumerPricing = () => {
    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00E676] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Tu Energía, <span className="text-[#00E676] text-glow">Tu Elección</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Sin contratos forzosos. Elige pagar solo por lo que usas o disfruta de libertad ilimitada.
                    </p>
                </div>

                {/* Main Split Card (Firevolt Style Adaptation) */}
                <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8 mb-12">

                    {/* Pay As You Go Section */}
                    <div className="glass rounded-3xl p-8 md:p-12 border border-[#00E676]/30 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00E676] opacity-5 blur-[80px] rounded-full pointer-events-none" />

                        <h3 className="text-3xl font-bold mb-6">Paga solo por el tiempo que necesites</h3>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#00E676]/10 flex items-center justify-center text-[#00E676] shrink-0 font-bold">1</div>
                                <div>
                                    <h4 className="font-bold text-lg text-white">Recarga tu Wallet</h4>
                                    <p className="text-gray-400">Recarga tu wallet con <span className="text-[#00E676] font-bold">$20</span> y recibe un bono de $5 en time para consumo.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#00E676]/10 flex items-center justify-center text-[#00E676] shrink-0 font-bold">2</div>
                                <div>
                                    <h4 className="font-bold text-lg text-white">5min Gratis</h4>
                                    <p className="text-gray-400">Disfruta de 5min gratis tu primera vez.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 pt-8 border-t border-white/10">
                            <h4 className="text-sm uppercase tracking-widest text-[#00E676] font-bold mb-4">Tarifa de Uso</h4>
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-5xl font-bold text-white">$1.00</span>
                            </div>
                            <p className="text-gray-300">Por cada <span className="font-bold text-white">30min</span> de uso.</p>
                            <p className="text-xs text-gray-500 mt-2">* Tarifa calculada en Bolívares a la tasa del día.</p>
                        </div>

                        <div className="mt-8">
                            <Link href="/registro">
                                <Button className="w-full">Recargar Saldo</Button>
                            </Link>
                        </div>
                    </div>

                    {/* VIP & Referral Column */}
                    <div className="flex flex-col gap-6 h-full">

                        {/* VIP Membership Card */}
                        <div className="glass p-8 rounded-3xl border border-[#00E676] relative overflow-hidden flex-1 shadow-[0_0_40px_rgba(0,230,118,0.15)]">
                            <div className="absolute top-4 right-4 bg-gradient-to-r from-[#00E676] to-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                Recomendado
                            </div>

                            <div className="mb-6">
                                <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                                    <Star className="fill-[#00E676] text-[#00E676]" />
                                    Membresía VIP
                                </h3>
                                <p className="text-gray-400">Olvídate de contar los minutos.</p>
                            </div>

                            <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-4xl font-bold text-white">Próximamente</span>
                            </div>

                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-3 text-sm text-gray-200">
                                    <Check className="w-4 h-4 text-[#00E676]" /> Tiempor ilimitado en todas las estaciones
                                </li>
                                <li className="flex items-center gap-3 text-sm text-gray-200">
                                    <Check className="w-4 h-4 text-[#00E676]" /> Sin depósitos ni retenciones
                                </li>
                                <li className="flex items-center gap-3 text-sm text-gray-200">
                                    <Check className="w-4 h-4 text-[#00E676]" /> Acceso prioritario
                                </li>
                            </ul>

                            <Link href="/registro">
                                <Button variant="primary" className="w-full shadow-lg shadow-[#00E676]/20">
                                    Obtener VIP
                                </Button>
                            </Link>
                        </div>

                        {/* Referral Card */}
                        <div className="glass p-8 rounded-3xl border border-white/10 relative overflow-hidden">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-purple-500/20 text-purple-400">
                                    <Users className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-white mb-1">Gana Cargas Gratis</h4>
                                    <p className="text-sm text-gray-400 mb-4">
                                        Invita a 5 amigos y recibe <span className="text-white font-bold">30 mins gratis</span> cuando alquilen.
                                    </p>
                                    <Link href="/registro" className="text-[#00E676] text-sm font-bold hover:underline flex items-center gap-1">
                                        Invitar Amigos →
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};
