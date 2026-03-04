'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Building2, MapPin, User, Phone, Mail } from 'lucide-react';

export default function RegistroPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch('https://formsubmit.co/ajax/soportevoltajeplus@gmail.com', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            });

            if (response.ok) {
                setIsSubmitted(true);
            } else {
                alert('Hubo un error al enviar el formulario. Por favor intenta nuevamente.');
            }
        } catch (error) {
            console.error('Error enviando formulario:', error);
            alert('Hubo un error al enviar el formulario.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-black text-white selection:bg-[#00E676] selection:text-black">
            <Navbar />

            <div className="pt-24 pb-20 relative">
                {/* Background Decorations */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00E676] opacity-10 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500 opacity-5 blur-[120px] rounded-full pointer-events-none" />

                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">

                        {/* Left Column: Value Proposition */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex flex-col justify-center"
                        >
                            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 text-[#00E676] text-sm font-bold w-fit">
                                Únete a la Red Voltaje
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                Transforma tu Negocio en un <br />
                                <span className="text-[#00E676] text-glow">Punto de Energía</span>
                            </h1>
                            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                                Ofrece carga segura a tus clientes, aumenta su tiempo de permanencia y genera ingresos adicionales. Todo sin costo de instalación.
                            </p>

                            <div className="space-y-6 mb-10">
                                {[
                                    { title: "Aumenta el Tráfico", desc: "Atrae a usuarios buscando carga activa en la app." },
                                    { title: "Retención de Clientes", desc: "Los clientes se quedan más tiempo mientras cargan." },
                                    { title: "Instalación Gratuita", desc: "Nosotros nos encargamos de todo el equipo." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="mt-1">
                                            <div className="w-6 h-6 rounded-full bg-[#00E676]/20 flex items-center justify-center text-[#00E676]">
                                                <CheckCircle2 className="w-4 h-4" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-white">{item.title}</h3>
                                            <p className="text-sm text-gray-400">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="p-6 rounded-2xl bg-[#00E676]/5 border border-[#00E676]/10">
                                <p className="text-sm text-gray-300 italic">
                                    "Desde que instalamos Voltaje, nuestros clientes pasan 20% más de tiempo en el local. ¡Es un servicio esencial!"
                                </p>
                                <div className="mt-4 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden">
                                        {/* Placeholder avatar or initial */}
                                        <div className="w-full h-full flex items-center justify-center bg-gray-600 text-xs">CM</div>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-white">Carlos Martínez</p>
                                        <p className="text-[10px] text-[#00E676]">Gerente de Cafetería</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column: Lead Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="relative"
                        >
                            <div className="glass p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative z-10">
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold mb-2">Registra tu Interés</h2>
                                    <p className="text-sm text-gray-400">
                                        Completa el formulario y recibe una propuesta personalizada en menos de 24h.
                                    </p>
                                </div>

                                {isSubmitted ? (
                                    <div className="bg-[#00E676]/10 border border-[#00E676]/30 rounded-2xl p-8 text-center">
                                        <div className="w-16 h-16 bg-[#00E676]/20 rounded-full flex items-center justify-center mx-auto mb-4 text-[#00E676]">
                                            <CheckCircle2 className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">¡Solicitud Enviada!</h3>
                                        <p className="text-gray-400">
                                            Hemos recibido tu información correctamente. Nuestro equipo se pondrá en contacto contigo muy pronto.
                                        </p>
                                        <Button
                                            className="mt-6"
                                            onClick={() => setIsSubmitted(false)}
                                            variant="outline"
                                        >
                                            Enviar otra solicitud
                                        </Button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <input type="hidden" name="_subject" value="Nuevo registro de negocio - Voltaje Plus" />
                                        <input type="hidden" name="_captcha" value="false" />

                                        <div className="space-y-4">
                                            <div className="relative">
                                                <Building2 className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
                                                <input
                                                    type="text"
                                                    name="Negocio"
                                                    required
                                                    placeholder="Nombre del Negocio"
                                                    className="w-full bg-black/30 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-[#00E676] focus:outline-none transition-colors"
                                                />
                                            </div>
                                            <div className="relative">
                                                <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
                                                <input
                                                    type="text"
                                                    name="Ubicación"
                                                    required
                                                    placeholder="Ubicación (Ciudad/Dirección)"
                                                    className="w-full bg-black/30 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-[#00E676] focus:outline-none transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <div className="h-px bg-white/10 my-4" />

                                        <div className="space-y-4">
                                            <div className="relative">
                                                <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
                                                <input
                                                    type="text"
                                                    name="Contacto"
                                                    required
                                                    placeholder="Nombre de la Persona de Contacto"
                                                    className="w-full bg-black/30 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-[#00E676] focus:outline-none transition-colors"
                                                />
                                            </div>
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
                                                <input
                                                    type="tel"
                                                    name="Teléfono"
                                                    required
                                                    placeholder="Teléfono"
                                                    className="w-full bg-black/30 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-[#00E676] focus:outline-none transition-colors"
                                                />
                                            </div>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
                                                <input
                                                    type="email"
                                                    name="Email"
                                                    required
                                                    placeholder="Correo Electrónico"
                                                    className="w-full bg-black/30 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-[#00E676] focus:outline-none transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full text-lg py-6 mt-4 group relative overflow-hidden"
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center justify-center">
                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Enviando...
                                                </span>
                                            ) : (
                                                <>
                                                    Enviar Solicitud
                                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </Button>

                                        <p className="text-xs text-center text-gray-500 mt-4">
                                            Al enviar aceptas nuestros términos de privacidad. Tus datos están seguros.
                                        </p>
                                    </form>
                                )}
                            </div>

                            {/* Decorative Elements behind form */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#00E676] rounded-full blur-[80px] opacity-20" />
                            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500 rounded-full blur-[80px] opacity-20" />
                        </motion.div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
