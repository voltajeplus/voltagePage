'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Calendar, MapPin, Zap } from 'lucide-react';

export const EventsHero = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(true);
    const [showForm, setShowForm] = useState(false);

    const toggleSound = () => {
        if (videoRef.current) {
            if (isMuted) {
                videoRef.current.volume = 0.5;
                videoRef.current.muted = false;
            } else {
                videoRef.current.muted = true;
            }
            setIsMuted(!isMuted);
        }
    };

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
                        Energía para tus Eventos
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                        Lleva Voltaje a tu <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E676] to-[#00C853] text-glow">Próximo Evento.</span>
                    </h1>

                    <p className="text-lg text-gray-400 mb-8 max-w-xl leading-relaxed">
                        Estaciones de carga portátiles para festivales, conciertos, ferias y cualquier evento. 
                        Mantén a tus asistentes conectados mientras disfrutan.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Button
                            size="lg"
                            className="group"
                            onClick={() => setShowForm(true)}
                        >
                            <Calendar className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                            Cotiza tu Evento
                        </Button>
                        <a href="#eventos-galeria">
                            <Button variant="outline" size="lg">
                                <MapPin className="w-5 h-5 mr-2" />
                                Ver Experiencias
                            </Button>
                        </a>
                    </div>

                    <div className="mt-12 flex items-center gap-8 text-gray-500 text-sm font-medium">
                        <div className="flex items-center gap-2">
                            <Zap className="w-5 h-5 text-[#00E676]" />
                            <span>Hasta 200 estaciones</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-[#00E676]" />
                            <span>Configuración Express</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-[#00E676]" />
                            <span>Recorremos el país</span>
                        </div>
                    </div>
                </motion.div>

                {/* Hero Visual - Video */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                >
                    <div className="relative z-10 glass rounded-3xl p-4 md:p-8 aspect-square flex items-center justify-center border-t border-white/10 shadow-2xl shadow-[#00E676]/10 overflow-hidden">
                        <div className="relative w-full h-full rounded-2xl overflow-hidden">
                            <video
                                ref={videoRef}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            >
                                <source src="/videos/autoFestVoltaje.mp4" type="video/mp4" />
                            </video>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
                            
                            <button
                                onClick={toggleSound}
                                className="absolute bottom-4 right-4 z-30 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                            >
                                {isMuted ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                    </svg>
                                )}
                            </button>
                        </div>

                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="absolute top-10 right-10 glass px-4 py-2 rounded-xl flex items-center gap-3 z-20"
                        >
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <span className="text-sm font-medium">Disponible Ya</span>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                            className="absolute bottom-10 left-10 glass px-4 py-2 rounded-xl flex items-center gap-3 z-20"
                        >
                            <Calendar className="w-4 h-4 text-[#00E676]" />
                            <span className="text-sm font-medium">Reserva Ahora</span>
                        </motion.div>
                    </div>
                </motion.div>

            </div>

            {/* Contact Modal */}
            {showForm && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setShowForm(false);
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-[#0a0a0a] border border-white/10 p-8 rounded-3xl max-w-lg w-full relative shadow-2xl"
                    >
                        <button
                            onClick={() => setShowForm(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors p-2"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>

                        <h3 className="text-2xl font-bold mb-2 text-white text-center">Cotiza tu Evento</h3>
                        <p className="text-gray-400 mb-6 text-center text-sm">
                            Déjanos tus datos y te contactaremos en breve.
                        </p>

                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                const form = e.currentTarget;
                                const data = Object.fromEntries(new FormData(form).entries());
                                try {
                                    const res = await fetch('/api/contact', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify(data),
                                    });
                                    const result = await res.json();
                                    if (result.success) {
                                        alert('¡Mensaje enviado con éxito! Te contactaremos pronto.');
                                        setShowForm(false);
                                    } else {
                                        alert('Error al enviar. Intenta de nuevo.');
                                    }
                                } catch {
                                    alert('Error de conexión. Intenta de nuevo.');
                                }
                            }}
                            className="space-y-4"
                        >
                            <input type="hidden" name="_subject" value="Cotización de Evento - Voltaje Plus" />
                            <input type="text" name="Nombre" required placeholder="Nombre" className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 focus:border-[#00E676] focus:outline-none text-white" />
                            <input type="email" name="Email" required placeholder="Email" className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 focus:border-[#00E676] focus:outline-none text-white" />
                            <input type="text" name="Teléfono" required placeholder="Teléfono" className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 focus:border-[#00E676] focus:outline-none text-white" />
                            <input type="text" name="Tipo de Evento" placeholder="Tipo de Evento (Concierto, Feria, etc.)" className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 focus:border-[#00E676] focus:outline-none text-white" />
                            <textarea rows={3} name="Mensaje" required placeholder="Cuéntanos sobre tu evento..." className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 focus:border-[#00E676] focus:outline-none text-white" />
                            <Button type="submit" className="w-full">
                                Enviar Cotización
                            </Button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </section>
    );
};
