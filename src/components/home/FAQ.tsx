'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    {
        question: "¿Cuánto cuesta alquilar un power bank?",
        answer: "El Costo es de 20$ al cambio BCV."
    },
    {
        question: "¿Qué pasa si no devuelvo el power bank?",
        answer: "Las baterías no devueltas en un plazo de 48 horas conllevarán un cargo de $30. Te recomendamos devolver el power bank lo antes posible en cualquiera de nuestras estaciones."
    },
    {
        question: "¿Son compatibles con mi dispositivo?",
        answer: "Si ,excepto con dispositivos Windows"
    },
    {
        question: "¿Cómo puedo pagar?",
        answer: "Pago Movil / Cashea / Paypal/ Binance"
    },
    {
        question: "¿Puedo devolver el power bank en cualquier estación?",
        answer: "Si , en cualquier Estación de Voltaje"
    },
    {
        question: "¿Qué capacidad tienen los power banks?",
        answer: "Capacidad de 6000 mAH a 8000 mAH"
    }
];

export const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-20 bg-black/50">
            <div className="container mx-auto px-6 max-w-3xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Preguntas Frecuentes</h2>
                    <p className="text-gray-400">Todo lo que necesitas saber sobre nuestro servicio.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass rounded-2xl overflow-hidden border border-white/5 hover:border-[#00E676]/30 transition-colors"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className="font-bold text-lg pr-8">{faq.question}</span>
                                <div className={`p-2 rounded-full transition-colors ${openIndex === index ? 'bg-[#00E676] text-black' : 'bg-white/5 text-gray-400'}`}>
                                    {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                </div>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
