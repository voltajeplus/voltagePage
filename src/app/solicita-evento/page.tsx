'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import {
    Calendar, MapPin, Users, Zap, CheckCircle2, ArrowRight,
    User, Mail, Phone, Building2, Package, Monitor, Smartphone, Megaphone
} from 'lucide-react';

const eventTypes = [
    { icon: Users, title: "Corporativos", desc: "Congresos, conferencias y lanzamientos" },
    { icon: Package, title: "Feriales", desc: "Exposiciones y ferias comerciales" },
    { icon: Monitor, title: "Musicales", desc: "Conciertos y festivales" },
    { icon: Smartphone, title: "Deportivos", desc: "Eventos y competencias deportivas" }
];

const benefits = [
    { title: "Asistentes Conectados", desc: "Mantén a tu audiencia cargada durante todo el evento." },
    { title: "Branding Incluido", desc: "Pantallas publicitarias para tu marca o patrocinadores." },
    { title: "Operación Llave en Mano", desc: "Instalación, soporte y retiro a cargo de nuestro equipo." }
];

export default function SolicitaEventoPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/event-request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setIsSubmitted(true);
            } else {
                alert('Error: ' + (result.message || 'Hubo un error al enviar la solicitud.'));
            }
        } catch (error) {
            console.error('Error enviando solicitud:', error);
            alert('Hubo un error al enviar la solicitud.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#00E676] selection:text-black">
            <Navbar />

            {/* Hero */}
            <section className="pt-32 pb-12 relative overflow-hidden">
                <div className="absolute top-[-10%] left-[50%] -translate-x-[50%] w-[700px] h-[700px] rounded-full bg-[#00E676] opacity-10 blur-[150px] pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-white/5 border border-white/10 text-[#00E676] text-sm font-bold"
                    >
                        <Calendar className="w-4 h-4" />
                        Solicita tu Evento
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
                    >
                        Energía Profesional <br />
                        <span className="text-[#00E676] text-glow">para tu Próximo Evento</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-400 max-w-2xl mx-auto"
                    >
                        Cuéntanos sobre tu evento y te enviaremos una propuesta personalizada
                        con todo lo que necesitas para mantener a tus asistentes conectados.
                    </motion.p>
                </div>
            </section>

            {/* Event Types Quick Grid */}
            <section className="pb-12">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {eventTypes.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="glass p-5 rounded-2xl border border-white/5 hover:border-[#00E676]/30 transition-all group text-center glass-hover"
                            >
                                <div className="w-12 h-12 mx-auto rounded-xl bg-[#00E676]/10 flex items-center justify-center mb-3 group-hover:bg-[#00E676] group-hover:shadow-[0_0_20px_rgba(0,230,118,0.4)] transition-all duration-300">
                                    <item.icon className="w-6 h-6 text-[#00E676] group-hover:text-black transition-colors" />
                                </div>
                                <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                                <p className="text-xs text-gray-400">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Form Section */}
            <section className="py-12 pb-20 relative">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#00E676] opacity-5 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500 opacity-5 blur-[120px] rounded-full pointer-events-none" />

                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">

                        {/* Left: Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:sticky lg:top-28"
                        >
                            <div className="aspect-[4/3] rounded-3xl overflow-hidden glass border border-white/10 relative shadow-2xl shadow-[#00E676]/5 mb-8">
                                <img
                                    src="/images/ai_generated/event_voltifi.png"
                                    alt="Estación Voltaje en Evento"
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="glass inline-block px-4 py-2 rounded-full text-sm font-bold text-[#00E676]">
                                        +50 eventos · +5.000 cargas exitosas
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold mb-6">
                                ¿Por qué Voltaje en tu <span className="text-[#00E676]">evento</span>?
                            </h2>

                            <div className="space-y-5 mb-8">
                                {benefits.map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="mt-1 shrink-0">
                                            <div className="w-7 h-7 rounded-full bg-[#00E676]/20 flex items-center justify-center text-[#00E676]">
                                                <CheckCircle2 className="w-4 h-4" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-base text-white mb-1">{item.title}</h3>
                                            <p className="text-sm text-gray-400">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="glass rounded-2xl p-5 border border-[#00E676]/20 flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#00E676]/10 flex items-center justify-center text-[#00E676] shrink-0">
                                    <Megaphone className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm mb-1">Respuesta en menos de 24h</h4>
                                    <p className="text-xs text-gray-400">
                                        Nuestro equipo de eventos te contactará con una propuesta a medida.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right: Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="relative"
                        >
                            <div className="glass p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative z-10">
                                <div className="mb-8">
                                    <h2 className="text-2xl md:text-3xl font-bold mb-2">Cuéntanos sobre tu evento</h2>
                                    <p className="text-sm text-gray-400">
                                        Completa los datos y te enviaremos una cotización personalizada.
                                    </p>
                                </div>

                                {isSubmitted ? (
                                    <div className="bg-[#00E676]/10 border border-[#00E676]/30 rounded-2xl p-8 text-center">
                                        <div className="w-16 h-16 bg-[#00E676]/20 rounded-full flex items-center justify-center mx-auto mb-4 text-[#00E676]">
                                            <CheckCircle2 className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">¡Solicitud Enviada!</h3>
                                        <p className="text-gray-400">
                                            Hemos recibido tu información correctamente. Nuestro equipo de eventos te contactará muy pronto.
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
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <input type="hidden" name="_subject" value="Nueva solicitud de evento - Voltaje Plus" />
                                        <input type="hidden" name="_captcha" value="false" />

                                        {/* Contacto */}
                                        <div className="relative">
                                            <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
                                            <input
                                                type="text"
                                                name="Nombre Completo"
                                                required
                                                placeholder="Nombre completo"
                                                className="w-full bg-black/30 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-[#00E676] focus:outline-none transition-colors"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
                                                <input
                                                    type="email"
                                                    name="Email"
                                                    required
                                                    placeholder="Email"
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
                                        </div>

                                        <div className="relative">
                                            <Building2 className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
                                            <input
                                                type="text"
                                                name="Empresa u Organización"
                                                placeholder="Empresa u organización (opcional)"
                                                className="w-full bg-black/30 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-[#00E676] focus:outline-none transition-colors"
                                            />
                                        </div>

                                        <div className="h-px bg-white/10 my-2" />

                                        {/* Datos del evento */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="relative">
                                                <Zap className="absolute left-4 top-3.5 w-5 h-5 text-gray-500 pointer-events-none" />
                                                <select
                                                    name="Tipo de Evento"
                                                    required
                                                    defaultValue=""
                                                    className="w-full bg-black/30 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-[#00E676] focus:outline-none transition-colors appearance-none"
                                                >
                                                    <option value="" disabled className="bg-black">Tipo de evento</option>
                                                    <option value="Corporativo" className="bg-black">Corporativo</option>
                                                    <option value="Feria/Exposición" className="bg-black">Feria / Exposición</option>
                                                    <option value="Concierto/Festival" className="bg-black">Concierto / Festival</option>
                                                    <option value="Deportivo" className="bg-black">Deportivo</option>
                                                    <option value="Otro" className="bg-black">Otro</option>
                                                </select>
                                            </div>
                                            <div className="relative">
                                                <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-gray-500 pointer-events-none" />
                                                <input
                                                    type="date"
                                                    name="Fecha del Evento"
                                                    required
                                                    className="w-full bg-black/30 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-[#00E676] focus:outline-none transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
                                            <input
                                                type="text"
                                                name="Ubicación del Evento"
                                                required
                                                placeholder="Ubicación del evento (ciudad / venue)"
                                                className="w-full bg-black/30 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-[#00E676] focus:outline-none transition-colors"
                                            />
                                        </div>

                                        <div className="relative">
                                            <Users className="absolute left-4 top-3.5 w-5 h-5 text-gray-500 pointer-events-none" />
                                            <select
                                                name="Cantidad de Asistentes"
                                                required
                                                defaultValue=""
                                                className="w-full bg-black/30 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-[#00E676] focus:outline-none transition-colors appearance-none"
                                            >
                                                <option value="" disabled className="bg-black">Cantidad estimada de asistentes</option>
                                                <option value="Menos de 100" className="bg-black">Menos de 100</option>
                                                <option value="100 - 500" className="bg-black">100 - 500</option>
                                                <option value="500 - 1.000" className="bg-black">500 - 1.000</option>
                                                <option value="1.000 - 5.000" className="bg-black">1.000 - 5.000</option>
                                                <option value="Más de 5.000" className="bg-black">Más de 5.000</option>
                                            </select>
                                        </div>

                                        <textarea
                                            rows={4}
                                            name="Mensaje"
                                            placeholder="Cuéntanos más sobre tu evento (duración, requerimientos especiales, etc.)"
                                            className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-[#00E676] focus:outline-none transition-colors resize-none"
                                        />

                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full text-lg py-6 mt-2 group relative overflow-hidden"
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

                                        <p className="text-xs text-center text-gray-500 mt-2">
                                            Al enviar aceptas nuestros términos de privacidad. Tus datos están seguros.
                                        </p>
                                    </form>
                                )}
                            </div>

                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#00E676] rounded-full blur-[80px] opacity-20" />
                            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500 rounded-full blur-[80px] opacity-20" />
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* Contact Footer Info */}
            <section className="pb-20">
                <div className="container mx-auto px-6 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass rounded-3xl p-8 md:p-10 border border-white/10 text-center"
                    >
                        <h3 className="text-xl md:text-2xl font-bold mb-3">
                            ¿Prefieres contactarnos <span className="text-[#00E676]">directamente</span>?
                        </h3>
                        <p className="text-gray-400 text-sm mb-6">
                            También puedes escribirnos por cualquiera de nuestros canales.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm text-gray-300">
                            <a href="mailto:eventosvoltajeplus@gmail.com" className="flex items-center justify-center gap-2 hover:text-[#00E676] transition-colors">
                                <Mail className="w-4 h-4 text-[#00E676]" />
                                eventosvoltajeplus@gmail.com
                            </a>
                            <span className="hidden sm:block text-gray-700">•</span>
                            <a href="tel:+584164049806" className="flex items-center justify-center gap-2 hover:text-[#00E676] transition-colors">
                                <Phone className="w-4 h-4 text-[#00E676]" />
                                +58 416 404 9806
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
