'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Zap, Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';
import { Button } from '../ui/Button';

export const Footer = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const form = e.currentTarget;
        const formData = new FormData(form);

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
                form.reset();
            } else {
                throw new Error('Error al enviar el formulario');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al procesar tu solicitud. Por favor intenta de nuevo.');
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setIsSubmitted(false), 5000); // Hide success message after 5 seconds
        }
    };

    return (
        <footer className="border-t border-white/10 bg-black/50 backdrop-blur-xl relative z-10 pt-20 pb-10">
            <div className="container mx-auto px-6">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2">
                            <img src="/images/logo_voltaje.png" alt="Voltaje" className="h-10 w-auto object-contain" />
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Transformando la forma en que el mundo se conecta y carga.
                            Energía inteligente para un futuro conectado.
                        </p>
                        <div className="flex gap-4">
                            {[Instagram, Twitter, Linkedin, Facebook].map((Icon, i) => (
                                <a key={i} href="#" className="p-2 rounded-full bg-white/5 hover:bg-[#00E676] hover:text-black text-gray-400 transition-all">
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-bold mb-6 text-white">Empresa</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            {['Sobre Nosotros', 'Carreras', 'Blog', 'Prensa'].map((link) => (
                                <li key={link}><a href="#" className="hover:text-[#00E676] transition-colors">{link}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-white">Producto</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            {['Características', 'Precios', 'Casos de Uso', 'Seguridad'].map((link) => (
                                <li key={link}><a href="#" className="hover:text-[#00E676] transition-colors">{link}</a></li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-bold mb-6 text-white">Contacto</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li className="flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#00E676]">📞</span>
                                <a href="tel:04163750325" className="hover:text-[#00E676] transition-colors">0416 375 0325</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#00E676]">✉️</span>
                                <a href="mailto:soportevoltajeplus@gmail.com" className="hover:text-[#00E676] transition-colors">soportevoltajeplus@gmail.com</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#00E676]">📍</span>
                                <span>Caracas, Venezuela</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-bold mb-6 text-white">Mantente al día</h4>
                        {isSubmitted ? (
                            <div className="bg-[#00E676]/10 border border-[#00E676]/30 rounded-lg p-4 text-center">
                                <p className="text-[#00E676] text-sm">¡Gracias por suscribirte!</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input type="hidden" name="_subject" value="Nueva suscripción al Newsletter - Voltaje Plus" />
                                <input type="hidden" name="_captcha" value="false" />
                                <input
                                    type="email"
                                    name="Email"
                                    required
                                    placeholder="Tu correo electrónico"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00E676] transition-colors"
                                />
                                <Button type="submit" disabled={isSubmitting} size="sm" className="w-full">
                                    {isSubmitting ? 'Suscribiendo...' : 'Suscribirse'}
                                </Button>
                            </form>
                        )}
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Voltaje. Todos los derechos reservados.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacidad</a>
                        <a href="#" className="hover:text-white transition-colors">Términos</a>
                        <a href="#" className="hover:text-white transition-colors">Cookies</a>
                    </div>
                </div>

            </div>
        </footer>
    );
};
