'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/Button";
import {
    Zap, Monitor, Smartphone, Shield, Check,
    ChevronRight, Package, Users, Megaphone, ClipboardList,
    BatteryCharging, Wifi
} from 'lucide-react';

const plans = [
    {
        name: "Voltaje Plus Premium",
        tag: "Recomendado",
        description: "Ideal para marcas que desean ofrecer un beneficio exclusivo y gratuito a los asistentes.",
        features: [
            "Carga 100% gratuita e ilimitada para el asistente",
            "Promotora de Protocolo para asistencia técnica y atención al cliente",
            "Pantalla del Tótem incluida para branding del patrocinante (sin costo adicional)"
        ],
        equipments: [
            { name: "Estación 12 PB (con pantalla)", price: "$150", model: "ZBJ-SP12-SP" },
            { name: "Estación 12 PB (sin pantalla)", price: "$120", model: "ZBJ-SP12-SP" },
            { name: "Estación 24 PB (con pantalla)", price: "$250", model: "ZBJ-166 (Tótem Estándar)" },
            { name: "Estación 32 PB (con pantalla)", price: "$350", model: "ZBJ-166-6" },
            { name: "Estación 48 PB (con pantalla)", price: "$400", model: "ZBJ-166-3 (Máxima Capacidad)" }
        ]
    },
    {
        name: "Voltaje Plus Estándar",
        tag: null,
        description: "Ideal para organizadores que buscan cubrir la necesidad de carga con opción a monetización publicitaria.",
        features: [
            "El usuario final paga por su consumo a través de la App",
            "Estaciones autosustentables (sin personal de Voltaje en sitio)",
            "Espacios publicitarios disponibles para venta a terceros"
        ],
        equipments: [
            { name: "Estación 12 PB (con pantalla)", price: "$70", model: "ZBJ-SP12-SP" },
            { name: "Estación 12 PB (sin pantalla)", price: "$60", model: "ZBJ-SP12-SP" },
            { name: "Estación 24 PB (con pantalla)", price: "$120", model: "ZBJ-166 (Tótem Estándar)" },
            { name: "Estación 32 PB (con pantalla)", price: "$150", model: "ZBJ-166-6" },
            { name: "Estación 48 PB (con pantalla)", price: "$200", model: "ZBJ-166-3 (Máxima Capacidad)" }
        ]
    }
];

const stations = [
    {
        name: "Estación Inteligente 12 PB",
        model: "ZBJ-SP12-SP",
        image: "/images/maquina12pb.png",
        specs: [
            "12 ranuras (slots) para baterías",
            "Pantalla publicitaria 10.1\" (1280×800px) — opcional",
            "Dimensiones: 52.5 × 29.5 × 27.5 cm",
            "Peso: 7.15 kg (con baterías)",
            "Material: ABS ignífugo (VO Fireproof) + Metal",
            "Conectividad: 4G / WiFi"
        ]
    },
    {
        name: "Tótem 24 PB",
        model: "ZBJ-166 (Tótem Estándar)",
        image: "/images/maquina24pb.png",
        specs: [
            "24 ranuras (slots) para baterías",
            "Pantalla publicitaria 23.8\" Full HD (1080×1920px)",
            "Dimensiones: 189 × 30 × 54 cm",
            "Peso: 30.85 kg (sin baterías) / 38.85 kg (total)",
            "Potencia Máxima: 160W"
        ]
    },
    {
        name: "Tótem 32 PB",
        model: "ZBJ-166-6",
        image: "/images/maquina32pb.png",
        specs: [
            "32 ranuras (slots) para baterías",
            "Pantalla publicitaria 43\" (1080×1920px)",
            "Dimensiones: 217 × 31 × 71 cm",
            "Peso: 53.6 kg (sin baterías)"
        ]
    },
    {
        name: "Tótem 48 PB — Máxima Capacidad",
        model: "ZBJ-166-3",
        image: "/images/maquina48pb.png",
        specs: [
            "48 ranuras (slots) para baterías",
            "Pantalla publicitaria 43\" (1080×1920px)",
            "Dimensiones: 217 × 31 × 71 cm",
            "Peso: 57.3 kg (sin baterías)"
        ]
    }
];

const powerbanks = [
    "Modelos: PS886 / ZBJ115",
    "Capacidad: 6000mAh a 8000mAh",
    "Cables integrados: Lightning, Micro-USB y Type-C",
    "Protección contra sobrecalentamiento, sobrecarga y cortocircuitos",
    "Certificaciones: CE, FCC, RoHS, MSDS"
];

export const EventsSection = () => {
    const [activePlan, setActivePlan] = useState<'premium' | 'standard'>('premium');

    return (
        <>
            {/* Hero */}
            <section className="py-20 md:py-32 relative overflow-hidden">
                <div className="absolute top-[-20%] left-[50%] -translate-x-[50%] w-[800px] h-[800px] bg-[#00E676] opacity-[0.05] blur-[150px] rounded-full pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#00E676] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#00E676] text-sm font-bold mb-6">
                                <Zap className="w-4 h-4" />
                                Soluciones para Eventos
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                                Energía para tus <br />
                                <span className="text-[#00E676] text-glow">Asistentes</span>
                            </h1>
                            <p className="text-xl text-gray-400 mb-8 max-w-lg">
                                Mantén a tus invitados conectados durante todo el evento con estaciones inteligentes de power bank. 
                                Experiencia de carga, visibilidad de marca y operación confiable.
                            </p>
                            <Link href="/registro">
                                <Button size="lg" className="shadow-[0_0_30px_rgba(0,230,118,0.3)]">
                                    GRATIS para tu negocio
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
                            <div className="aspect-[4/3] rounded-3xl overflow-hidden glass border border-white/10 relative shadow-2xl shadow-[#00E676]/5">
                                <img
                                    src="/images/ai_generated/event_voltifi.png"
                                    alt="Estación Voltaje en Evento"
                                    className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="glass inline-block px-4 py-2 rounded-full text-sm font-bold text-[#00E676]">
                                        Eventos Corporativos • Ferias • Musicales • Deportivos
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Formats */}
            <section className="py-20 bg-black/50">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">
                            Nos Adaptamos a tu <span className="text-[#00E676]">Evento</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Distintos formatos de evento con esquemas flexibles de operación.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {[
                            { icon: Users, title: "Corporativos", desc: "Congresos, conferencias y lanzamientos" },
                            { icon: Package, title: "Feriales", desc: "Exposiciones y ferias comerciales" },
                            { icon: Monitor, title: "Musicales", desc: "Conciertos y festivales" },
                            { icon: Smartphone, title: "Deportivos", desc: "Eventos y competencias deportivas" }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass p-6 md:p-8 rounded-2xl border border-white/5 hover:border-[#00E676]/30 transition-all group text-center glass-hover"
                            >
                                <div className="w-14 h-14 mx-auto rounded-xl bg-[#00E676]/10 flex items-center justify-center mb-4 group-hover:bg-[#00E676] group-hover:text-black group-hover:shadow-[0_0_20px_rgba(0,230,118,0.4)] transition-all duration-300">
                                    <item.icon className="w-7 h-7 group-hover:text-black transition-colors" />
                                </div>
                                <h3 className="font-bold text-lg mb-2 group-hover:text-white transition-colors">{item.title}</h3>
                                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Plans */}
            <section id="eventos-planes" className="py-20 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00E676] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">
                            Planes de <span className="text-[#00E676]">Alquiler y Gestión</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Elige el modelo que mejor se adapte a los objetivos de tu marca y presupuesto.
                        </p>
                    </motion.div>

                    {/* Plan Toggle */}
                    <div className="flex justify-center mb-12">
                        <div className="glass inline-flex rounded-xl p-1 border border-white/10">
                            <button
                                onClick={() => setActivePlan('premium')}
                                className={`px-6 py-3 rounded-lg font-bold text-sm transition-all ${activePlan === 'premium' ? 'bg-[#00E676] text-black shadow-lg shadow-[#00E676]/30' : 'text-gray-400 hover:text-white'}`}
                            >
                                Premium
                            </button>
                            <button
                                onClick={() => setActivePlan('standard')}
                                className={`px-6 py-3 rounded-lg font-bold text-sm transition-all ${activePlan === 'standard' ? 'bg-[#00E676] text-black shadow-lg shadow-[#00E676]/30' : 'text-gray-400 hover:text-white'}`}
                            >
                                Estándar
                            </button>
                        </div>
                    </div>

                    {plans.map((plan, planIdx) => (
                        <div key={planIdx}>
                            {activePlan === (planIdx === 0 ? 'premium' : 'standard') && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    {/* Plan Header */}
                                    <div className="max-w-3xl mx-auto text-center mb-12">
                                        <div className="flex items-center justify-center gap-3 mb-4">
                                            <h3 className="text-3xl font-bold">{plan.name}</h3>
                                            {plan.tag && (
                                                <span className="bg-gradient-to-r from-[#00E676] to-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                                                    {plan.tag}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-gray-400 mb-8">{plan.description}</p>
                                        <div className="flex flex-wrap justify-center gap-3 mb-8">
                                            {plan.features.map((feat, fIdx) => (
                                                <div key={fIdx} className="flex items-center gap-2 text-sm text-gray-300 bg-white/5 rounded-full px-4 py-2">
                                                    <Check className="w-4 h-4 text-[#00E676] shrink-0" />
                                                    {feat}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Pricing Grid */}
                                    <div className="max-w-5xl mx-auto mb-8">
                                        <h4 className="text-center text-sm uppercase tracking-widest text-[#00E676] font-bold mb-6">
                                            Inversión Diaria + IVA
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {plan.equipments.map((eq, eqIdx) => (
                                                <div
                                                    key={eqIdx}
                                                    className="glass p-6 rounded-2xl border border-white/5 hover:border-[#00E676]/30 transition-all group"
                                                >
                                                    <p className="text-sm text-gray-400 font-mono mb-1">{eq.model}</p>
                                                    <h5 className="font-bold mb-3 min-h-[2.5rem]">{eq.name}</h5>
                                                    <div className="flex items-baseline gap-1 mb-4">
                                                        <span className="text-3xl font-bold text-[#00E676]">{eq.price}</span>
                                                        <span className="text-sm text-gray-500">/día</span>
                                                    </div>
                                                    <div className="text-xs text-gray-500">+ IVA</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Equipment Showcase */}
            <section id="eventos-equipos" className="py-20 bg-black/50">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">
                            Nuestros <span className="text-[#00E676]">Equipos</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Estaciones inteligentes con pantalla publicitaria, diseñadas para cualquier tipo de evento.
                        </p>
                    </motion.div>

                    <div className="space-y-8">
                        {stations.map((station, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="glass rounded-3xl border border-white/5 hover:border-[#00E676]/20 transition-all overflow-hidden"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                                    {station.image && (
                                        <div className="lg:col-span-2 relative aspect-[4/3] lg:aspect-auto bg-black/80 flex items-center justify-center p-6 overflow-hidden">
                                            <img
                                                src={station.image}
                                                alt={station.name}
                                                className="w-full h-full object-contain"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />
                                        </div>
                                    )}
                                    <div className={`p-8 ${station.image ? 'lg:col-span-3' : 'lg:col-span-5'}`}>
                                        <div className="flex items-start justify-between gap-4 mb-4">
                                            <div>
                                                <h3 className="text-2xl font-bold mb-1">{station.name}</h3>
                                                <p className="text-sm text-[#00E676] font-mono">{station.model}</p>
                                            </div>
                                        </div>
                                        <ul className="space-y-2">
                                            {station.specs.map((spec, sIdx) => (
                                                <li key={sIdx} className="flex items-start gap-3 text-sm text-gray-300">
                                                    <ChevronRight className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
                                                    {spec}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Power Banks Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-8 glass rounded-3xl border border-white/5 p-8"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <BatteryCharging className="w-6 h-6 text-[#00E676]" />
                            <h3 className="text-2xl font-bold">Baterías Power Banks</h3>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            <div className="grid grid-cols-3 gap-4">
                                {["/images/bateria1.png", "/images/bateria2.png", "/images/bateria3.png"].map((src, i) => (
                                    <div key={i} className="glass rounded-2xl p-4 border border-white/5 flex items-center justify-center aspect-square">
                                        <img
                                            src={src}
                                            alt={`Power Bank ${i + 1}`}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {powerbanks.map((pb, pbIdx) => (
                                    <div key={pbIdx} className="flex items-center gap-2 text-sm text-gray-300 bg-white/5 rounded-xl p-3">
                                        <Check className="w-4 h-4 text-[#00E676] shrink-0" />
                                        {pb}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Advertising */}
            <section className="py-20">
                <div className="container mx-auto px-6 max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass rounded-3xl border border-white/5 p-8 md:p-12"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <Megaphone className="w-6 h-6 text-[#00E676]" />
                                    <h2 className="text-3xl font-bold">Publicidad y <span className="text-[#00E676]">Servicios Adicionales</span></h2>
                                </div>
                                <p className="text-gray-400 mb-6">
                                    Para el Plan Estándar, ofrecemos la comercialización de espacios en pantalla.
                                </p>
                                <div className="glass inline-block rounded-2xl p-6 border border-white/5">
                                    <p className="text-sm text-gray-400 mb-2">Costo por Slot Publicitario</p>
                                    <div className="flex items-baseline gap-2 mb-2">
                                        <span className="text-4xl font-bold text-[#00E676]">$30</span>
                                        <span className="text-gray-500">USD + IVA</span>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        Rotación de 15 segundos en bucle continuo durante el evento.
                                    </p>
                                </div>
                            </div>
                            <div className="glass rounded-2xl p-8 border border-[#00E676]/20 text-center">
                                <Wifi className="w-12 h-12 text-[#00E676] mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Conectividad Sin Límites</h3>
                                <p className="text-gray-400 text-sm">
                                    Todas nuestras estaciones cuentan con conectividad 4G/WiFi, 
                                    garantizando operación continua y actualización en tiempo real.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Terms & Payment */}
            <section className="py-20 bg-black/50">
                <div className="container mx-auto px-6 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass rounded-3xl p-8 md:p-12 border border-white/5"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <Shield className="w-6 h-6 text-[#00E676]" />
                            <h2 className="text-2xl md:text-3xl font-bold">Términos y <span className="text-[#00E676]">Condiciones</span></h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <ClipboardList className="w-5 h-5 text-[#00E676]" />
                                    <h3 className="font-bold text-lg">Resguardo de Equipos</h3>
                                </div>
                                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                                    El contratante asume la responsabilidad por el resguardo y custodia de los equipos durante el evento.
                                    En caso de pérdida, robo o daño total, se aplicarán los costos de reposición establecidos.
                                </p>
                                <p className="text-gray-500 text-xs">
                                    * Costo de transporte ajustable según ubicación del evento (Plan Estándar).
                                </p>
                            </div>

                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <Shield className="w-5 h-5 text-[#00E676]" />
                                    <h3 className="font-bold text-lg">Condiciones de Pago</h3>
                                </div>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3 text-sm text-gray-300">
                                        <Check className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
                                        Todas las tarifas se calculan en divisas.
                                    </li>
                                    <li className="flex items-start gap-3 text-sm text-gray-300">
                                        <Check className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
                                        Pagaderas a la tasa Euro BCV del día.
                                    </li>
                                    <li className="flex items-start gap-3 text-sm text-gray-300">
                                        <Check className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
                                        Pago por anticipado.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-20">
                <div className="container mx-auto px-6 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass rounded-3xl p-8 md:p-16 border border-[#00E676]/20 text-center relative overflow-hidden"
                    >
                        <div className="absolute top-[-50%] left-[-50%] w-[400px] h-[400px] bg-[#00E676] opacity-[0.05] blur-[100px] rounded-full pointer-events-none" />
                        <div className="absolute bottom-[-50%] right-[-50%] w-[400px] h-[400px] bg-[#00E676] opacity-[0.05] blur-[100px] rounded-full pointer-events-none" />

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">
                                ¿Listo para potenciar tu <span className="text-[#00E676]">evento</span>?
                            </h2>
                            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                                Solicita una cotización personalizada y descubre cómo Voltaje Plus puede mantener a tus asistentes conectados.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/registro">
                                    <Button size="lg" className="shadow-[0_0_30px_rgba(0,230,118,0.3)] w-full sm:w-auto">
                                        GRATIS para tu negocio
                                    </Button>
                                </Link>
                                <Link href="/contacto">
                                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                        Más Información
                                    </Button>
                                </Link>
                            </div>
                            <div className="mt-8 text-sm text-gray-500">
                                <p>📍 Av Sucre, Los Dos Caminos, Residencia Comercial Yutaje, Ofc. 083, Miranda, Caracas</p>
                                <p className="mt-1">📧 voltajevzla@gmail.com | 📞 0212-2351952 / 0212-2354994</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
};
