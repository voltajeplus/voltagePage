'use client';

import React from 'react';
import Link from 'next/link';
import { Zap, Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';
import { Button } from '../ui/Button';

export const Footer = () => {
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
                            Revolucionando la forma en que el mundo se conecta y carga.
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
                                <a href="tel:+584126851090" className="hover:text-[#00E676] transition-colors">+58 412 685 1090</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#00E676]">✉️</span>
                                <a href="mailto:info@voltajevzla.com" className="hover:text-[#00E676] transition-colors">info@voltajevzla.com</a>
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
                        <form className="space-y-4">
                            <input
                                type="email"
                                placeholder="Tu correo electrónico"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00E676] transition-colors"
                            />
                            <Button size="sm" className="w-full">
                                Suscribirse
                            </Button>
                        </form>
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
