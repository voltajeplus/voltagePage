'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Zap, Monitor, MapPin, Battery, Clock, Eye, TrendingUp, ArrowRight, Play, Users, Package, ChevronRight, Check, Shield, Wifi, Smartphone } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const GoogleMapComponent = dynamic(() => import('@/components/home/GoogleMapComponent'), {
    ssr: false,
    loading: () => (
        <div className="w-full aspect-[21/9] rounded-2xl bg-[#0a0f0d] border border-white/8 flex items-center justify-center">
            <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-[#00E676]/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#00E676]" />
                </div>
                <p className="text-sm text-gray-500">Cargando mapa interactivo...</p>
            </div>
        </div>
    )
});

// ─── REVEAL WRAPPER ───
const Reveal = ({ children, delay = 0, className = '' }: {
    children: React.ReactNode; delay?: number; className?: string;
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay, ease: 'easeOut' }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// ─── PAGE ───
export default function DoohPage() {
    const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
    const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(true);

    // Stations data for the map — fetched live from API like the main page
    const [stations, setStations] = useState<any[]>([]);

    useEffect(() => {
        const fetchStations = async () => {
            try {
                const res = await fetch('/api/stations');
                const data = await res.json();
                if (data.success && data.stations.length > 0) {
                    setStations(data.stations);
                    return;
                }
            } catch {
                console.log('API error, using fallback data');
            }
            // Fallback matches MapSection hardcoded stations
            setStations([
                { id: 42, lat: 10.541448204568155, lng: -66.87963462645875, name: 'Finacao - El Avila', status: 'Occupied', category: 'Hotel', dist: '4km', freeNum: 0, totalNum: 0, address: 'Distrito Capital, Caracas' },
                { id: 33, lat: 10.504093709521328, lng: -66.85031924418031, name: 'Clinica El Avila', status: 'Available', category: 'Clínica', dist: '5km', freeNum: 44, totalNum: 48, address: 'Av. San Juan Bosco, Caracas' },
                { id: 6, lat: 10.489046014202566, lng: -66.85450998095091, name: 'C.C. El Sambil Chacao', status: 'Available', category: 'Centro Comercial', dist: '5km', freeNum: 72, totalNum: 72, address: 'Chacao, Caracas' },
                { id: 32, lat: 10.500853102543433, lng: -66.84380851534425, name: 'Restaurant PinchoPan', status: 'Available', category: 'Restaurante', dist: '6km', freeNum: 12, totalNum: 12, address: 'Los Palos Grandes, Caracas' },
                { id: 8, lat: 10.486476886547981, lng: -66.83935651352692, name: 'EVENTOS-VOLTAJE-PLUS', status: 'Available', category: 'Bar', dist: '7km', freeNum: 80, totalNum: 104, address: 'Parque Simón Bolívar, Caracas' },
                { id: 1, lat: 10.4905375, lng: -66.83726560000001, name: 'Eco Café', status: 'Available', category: 'Cafetería', dist: '7km', freeNum: 12, totalNum: 12, address: 'Los Ruices, Caracas' },
                { id: 2, lat: 10.495777056989855, lng: -66.8316165325409, name: 'Prueba Johnson', status: 'Available', category: 'Oficina', dist: '7km', freeNum: 39, totalNum: 48, address: 'Av Romulo Gallegos, Caracas' },
                { id: 36, lat: 10.495738434350784, lng: -66.83149333313521, name: 'TRÁNSITO VOLTAJE', status: 'Available', category: 'Entretenimiento', dist: '7km', freeNum: 12, totalNum: 12, address: 'Los Ruices, Caracas' },
                { id: 44, lat: 10.492563125269852, lng: -66.83045647745962, name: 'La Jungla', status: 'Available', category: 'Bar', dist: '7km', freeNum: 24, totalNum: 24, address: 'Campo Claro, Caracas' },
                { id: 43, lat: 10.49185744533558, lng: -66.82964856931152, name: 'Fetuccine', status: 'Available', category: 'Restaurante', dist: '7km', freeNum: 12, totalNum: 12, address: 'Av. Francisco de Miranda, Caracas' },
            ]);
        };
        fetchStations();
    }, []);

    useEffect(() => {
        const move = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
        const interval = setInterval(() => {
            setRingPos(prev => ({ x: prev.x + (cursorPos.x - prev.x) * 0.12, y: prev.y + (cursorPos.y - prev.y) * 0.12 }));
        }, 16);
        window.addEventListener('mousemove', move);
        return () => { window.removeEventListener('mousemove', move); clearInterval(interval); };
    }, [cursorPos]);

    const toggleSound = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    const tickerItems = [
        'DOOH INDOOR CARACAS ● TOTAL CUSTODIED VIEWING ● 10 MARCAS POR PANTALLA / MES ● LOOP DE 120 SEGUNDOS ● DE <1m DE DISTANCIA AL CLIENTE ● PUBLICIDAD DONDE EL TIEMPO ES TUYO',
    ];

    const locations = [
        { icon: Users, title: 'Discotecas y Vida Nocturna', desc: 'Las Mercedes · público joven, alto consumo, noches de fin de semana' },
        { icon: Smartphone, title: 'Supermercados', desc: 'Tráfico diario y recurrente, decisión de compra cerca de la pantalla' },
        { icon: Monitor, title: 'Centros Comerciales', desc: 'Alto flujo, tiempo de permanencia largo, público familiar' },
        { icon: MapPin, title: 'Centros Turísticos', desc: 'Visitantes con tiempo de espera y disposición a explorar ofertas' },
        { icon: Zap, title: 'Gimnasios', desc: 'Audiencia cautiva y repetida, varias veces por semana' },
    ];

    const loopSegments = Array.from({ length: 12 }, (_, i) => ({
        type: i < 10 ? 'client' as const : 'brand',
        label: i < 10 ? String(i + 1) : 'Voltaje',
    }));

    const plans = [
        {
            name: 'Estándar 24',
            format: 'Tótem 23.8" Full HD · 1080×1580 (split screen)',
            price: 150,
            features: ['Spot de 10s, rotativo en loop de 2 min', '1 cambio de arte al mes sin costo', 'Hasta 12.600 apariciones al mes'],
            who: 'Ideal para: comercios internos, restaurantes y servicios locales',
            featured: false,
        },
        {
            name: 'Premium 43',
            format: 'Tótem 43" Full HD · 1080×1920 (full screen / split)',
            price: 350,
            features: ['Spot de 10s, rotativo en loop de 2 min', 'Mayor formato y jerarquía visual', '1 cambio de arte al mes sin costo'],
            who: 'Ideal para: marcas nacionales, bancos, agencias y tiendas ancla',
            featured: true,
        },
        {
            name: 'Dominancia Exclusiva',
            format: 'Tótem 43" Full HD · pantalla completa, buyout',
            price: 1800,
            features: ['100% del tiempo de pauta, sin compartir loop', 'Contenido a medida durante todo el ciclo', 'Prioridad de reserva para fechas clave'],
            who: 'Ideal para: lanzamientos de marca y eventos especiales',
            featured: false,
        },
    ];

    const specs = [
        { label: 'Formato', value: 'Video vertical MP4' },
        { label: 'Códec', value: 'H.264' },
        { label: 'Cuadros', value: '24 fps' },
        { label: 'Resolución', value: '1080×1920 px (43") · 1080×1580 px (23.8", split)' },
    ];

    const totems = [
        {
            name: 'Tótem 24 PB',
            model: 'ZBJ-166 (Tótem Estándar)',
            image: '/images/maquina24pb.png',
            specs: [
                '24 ranuras (slots) para baterías',
                'Pantalla publicitaria 23.8" Full HD (1080×1920px)',
                'Dimensiones: 189 × 30 × 54 cm',
                'Peso: 30.85 kg (sin baterías) / 38.85 kg (total)',
                'Potencia Máxima: 160W',
            ],
        },
        {
            name: 'Tótem 48 PB — Máxima Capacidad',
            model: 'ZBJ-166-3',
            image: '/images/maquina48pb.png',
            specs: [
                '48 ranuras (slots) para baterías',
                'Pantalla publicitaria 43" Full HD (1080×1920px)',
                'Dimensiones: 217 × 31 × 71 cm',
                'Peso: 57.3 kg (sin baterías)',
            ],
        },
    ];

    // Note for the 32PB model — same screen specs as 48PB, just fewer batteries
    const totemNote = 'Contamos también con el modelo de 32 PB (ZBJ-166-6) con pantalla publicitaria 43" y especificaciones técnicas equivalentes al modelo de 48 PB, variando únicamente la capacidad de power banks.';

    return (
        <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#00E676] selection:text-black overflow-x-hidden">
            {/* Custom cursor */}
            <motion.div
                className="fixed rounded-full pointer-events-none z-[9999] mix-blend-screen"
                style={{ width: 10, height: 10, background: '#00E676', left: cursorPos.x, top: cursorPos.y, transform: 'translate(-50%, -50%)' }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
            />
            <motion.div
                className="fixed rounded-full pointer-events-none z-[9998] border border-[#00E676]/40"
                style={{ width: 36, height: 36, left: ringPos.x, top: ringPos.y, transform: 'translate(-50%, -50%)' }}
            />

            <Navbar />

            {/* ══════════════════════════════════════ HERO ══════════════════════════════════════ */}
            <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[#050505]" />
                    <video
                        ref={videoRef}
                        autoPlay loop muted playsInline
                        className="w-full h-full object-cover opacity-40"
                    >
                        <source src="/videos/hero-video.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-[#050505]/30 to-[#050505]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-[#050505]/80" />
                    <div className="absolute inset-0 opacity-[0.03]"
                        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,230,118,0.15) 2px, rgba(0,230,118,0.15) 4px)' }} />
                </div>

                <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] rounded-full bg-[#00E676] opacity-[0.07] blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[20%] right-[5%] w-[300px] h-[300px] rounded-full bg-[#FF2000] opacity-[0.05] blur-[100px] pointer-events-none" />

                <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="relative z-10 container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00E676]/30 bg-[#00E676]/5 text-[#00E676] text-xs font-bold tracking-[0.2em] uppercase mb-8"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E676] opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E676]" />
                        </span>
                        Propuesta Comercial 2026
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight mb-6"
                    >
                        Tu marca, a menos de{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E676] to-[#00C853] text-glow">
                            un metro
                        </span>{' '}
                        del cliente.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        Pantallas DOOH dentro del punto de mayor tráfico: más tiempo de exposición
                        que una valla de autopista, visibilidad real y un precio pensado para el comercio local.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.65 }}
                        className="flex flex-wrap justify-center gap-4 mb-14"
                    >
                        <Link href="#planes" className="group inline-flex items-center gap-2 px-8 py-4 bg-[#00E676] text-black font-bold rounded-xl hover:bg-[#00C853] transition-all shadow-[0_0_30px_rgba(0,230,118,0.4)] hover:shadow-[0_0_50px_rgba(0,230,118,0.6)]">
                            <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            Ver planes y precios
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link href="#contacto" className="inline-flex items-center gap-2 px-8 py-4 border border-white/15 text-white font-medium rounded-xl hover:bg-white/5 hover:border-[#00E676]/40 transition-all">
                            <Play className="w-4 h-4" />
                            Hablar con ventas
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-1 max-w-2xl mx-auto"
                    >
                        {[
                            { value: '< 1 m', label: 'Distancia de visualización', icon: Eye },
                            { value: '10.800–12.600', label: 'Apariciones al mes por marca', icon: TrendingUp },
                            { value: '10 s', label: 'Duración del spot en el loop', icon: Clock },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white/[0.03] border border-white/8 backdrop-blur-sm p-5 text-center group hover:border-[#00E676]/30 transition-colors">
                                <stat.icon className="w-5 h-5 text-[#00E676] mx-auto mb-2 opacity-70" />
                                <b className="block text-2xl text-[#00E676] font-bold">{stat.value}</b>
                                <span className="text-xs text-gray-500 mt-1 block">{stat.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
                    <div className="w-[1px] h-12 bg-gradient-to-b from-[#00E676] to-transparent animate-pulse" />
                    <span className="text-[10px] tracking-[0.3em] text-gray-500 uppercase">Scroll</span>
                </div>
            </section>

            {/* ══════════════════════════════════════ TICKER ══════════════════════════════════════ */}
            <div className="border-y border-white/8 bg-white/[0.02] overflow-hidden py-3">
                <motion.div
                    className="flex whitespace-nowrap"
                    animate={{ x: [0, -2000] }}
                    transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
                >
                    {Array.from({ length: 4 }).flatMap((_, rep) =>
                        tickerItems.map((text, i) => (
                            <span key={`${rep}-${i}`} className="mx-12 text-xs font-mono tracking-[0.25em] text-gray-400">
                                {text}
                            </span>
                        ))
                    )}
                </motion.div>
            </div>

            {/* ══════════════════════════════════════ COMPARE ══════════════════════════════════════ */}
            <section className="py-28 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#FF2000] opacity-[0.04] blur-[150px] pointer-events-none" />
                <div className="container mx-auto px-6">
                    <Reveal>
                        <span className="text-[#FF2000] text-xs font-mono tracking-[0.2em] uppercase mb-4 block">Indoor vs. Exterior</span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 max-w-xl">
                            El tráfico ya está cautivo — solo hay que{' '}
                            <span className="text-[#00E676]">mostrarle algo.</span>
                        </h2>
                        <p className="text-gray-400 text-base max-w-2xl leading-relaxed">
                            Una banderola de autopista compite con la velocidad y el tráfico. Nuestras pantallas
                            compiten con la espera: el cliente retira o devuelve su power bank a menos de un metro
                            de tu anuncio, con tiempo de sobra para leerlo.
                        </p>
                    </Reveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mt-10">
                        <Reveal delay={0.1}>
                            <div className="bg-white/[0.02] border border-white/8 rounded-2xl p-8 h-full">
                                <h3 className="text-lg font-bold mb-6 text-gray-300 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-gray-500" />
                                    Publicidad exterior
                                </h3>
                                <ul className="space-y-3">
                                    {['Vista a distancia, en movimiento', 'Formato masivo, precio elevado', 'Segundos de exposición real', 'Sin público cautivo'].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-500 text-sm">
                                            <span className="w-1 h-1 rounded-full bg-gray-600 mt-2 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>

                        <Reveal delay={0.25}>
                            <div className="bg-[#00E676]/[0.04] border border-[#00E676]/25 rounded-2xl p-8 h-full relative overflow-hidden">
                                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00E676] to-transparent" />
                                <div className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-[#00E676]/15 border border-[#00E676]/30 text-[#00E676] text-[10px] font-bold tracking-wider uppercase">
                                    Recomendado
                                </div>
                                <h3 className="text-lg font-bold mb-6 text-[#00E676] flex items-center gap-2">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E676] opacity-75" />
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E676]" />
                                    </span>
                                    Voltaje Plus Indoor
                                </h3>
                                <ul className="space-y-3">
                                    {['Visibilidad a menos de 1 metro', 'Pantalla individual, precio ágil', 'Dwell time: minutos de espera frente al tótem', 'Público cautivo mientras carga su batería'].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-200 text-sm">
                                            <span className="w-1 h-1 rounded-full bg-[#00E676] mt-2 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════ LOCATIONS ══════════════════════════════════════ */}
            <section className="py-28 bg-white/[0.015] border-y border-white/5 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#00E676] opacity-[0.04] blur-[120px] pointer-events-none" />
                <div className="container mx-auto px-6 relative z-10">
                    <Reveal>
                        <span className="text-[#00E676] text-xs font-mono tracking-[0.2em] uppercase mb-4 block">Dónde está la red</span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">
                            Un mismo formato, <span className="text-[#00E676]">distinto tráfico</span> según el sitio.
                        </h2>
                        <p className="text-gray-400 text-base max-w-2xl leading-relaxed">
                            La red Voltaje Plus vive en los lugares donde la gente ya se detiene a esperar.
                            Cada tipo de sitio aporta un momento distinto de atención.
                        </p>
                    </Reveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-10">
                        {locations.map((loc, i) => (
                            <Reveal key={i} delay={0.1 + i * 0.07}>
                                <div className="group bg-white/[0.03] border border-white/8 rounded-2xl p-6 hover:border-[#00E676]/30 hover:bg-[#00E676]/[0.04] transition-all duration-300 h-full">
                                    <div className="w-12 h-12 rounded-xl bg-[#00E676]/10 flex items-center justify-center mb-4 group-hover:bg-[#00E676] group-hover:shadow-[0_0_20px_rgba(0,230,118,0.4)] transition-all duration-300">
                                        <loc.icon className="w-6 h-6 text-[#00E676] group-hover:text-black transition-colors" />
                                    </div>
                                    <h4 className="font-bold text-sm mb-2 group-hover:text-[#00E676] transition-colors">{loc.title}</h4>
                                    <p className="text-xs text-gray-500 leading-relaxed">{loc.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════ TOTEM SHOWCASE ══════════════════════════════════════ */}
            <section className="py-28 relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <Reveal>
                        <span className="text-[#00E676] text-xs font-mono tracking-[0.2em] uppercase mb-4 block">Especificaciones físicas</span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">
                            Así se ven nuestros <span className="text-[#00E676]">tótems</span> en el punto de venta.
                        </h2>
                        <p className="text-gray-400 text-base max-w-2xl leading-relaxed mb-10">
                            Un mueble premium, de pie, con power banks en la base y pantalla publicitaria
                            en la parte superior — foto real del equipo que se instala en el sitio.
                        </p>
                    </Reveal>

                    <div className="space-y-8">
                        {totems.map((totem, idx) => (
                            <Reveal key={idx} delay={idx * 0.15}>
                                <div className="glass rounded-3xl border border-white/5 hover:border-[#00E676]/20 transition-all overflow-hidden">
                                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                                        {/* Image */}
                                        <div className="lg:col-span-2 relative aspect-[3/4] lg:aspect-auto bg-[#0a0f0d] flex items-center justify-center p-8 overflow-hidden">
                                            <div className="absolute inset-0 opacity-[0.06]"
                                                style={{ backgroundImage: 'radial-gradient(circle at 50% 30%, #00E676, transparent 60%)' }} />
                                            <img
                                                src={totem.image}
                                                alt={totem.name}
                                                className="relative z-10 w-full h-full object-contain"
                                            />
                                        </div>
                                        {/* Info */}
                                        <div className="lg:col-span-3 p-8 md:p-10">
                                            <div className="flex items-start justify-between gap-4 mb-6">
                                                <div>
                                                    <h3 className="text-2xl font-bold mb-1">{totem.name}</h3>
                                                    <p className="text-sm text-[#00E676] font-mono">{totem.model}</p>
                                                </div>
                                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00E676]/10 border border-[#00E676]/20">
                                                    <Monitor className="w-3.5 h-3.5 text-[#00E676]" />
                                                    <span className="text-xs font-bold text-[#00E676]">DOOH Ready</span>
                                                </div>
                                            </div>
                                            <ul className="space-y-3">
                                                {totem.specs.map((spec, sIdx) => (
                                                    <li key={sIdx} className="flex items-start gap-3 text-sm text-gray-300">
                                                        <ChevronRight className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
                                                        {spec}
                                                    </li>
                                                ))}
                                            </ul>
                                    <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-2 gap-3">
                                        <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4">
                                            <b className="block text-[#00E676] text-sm font-mono mb-1">{totem.name.includes('24') ? '23.8" Full HD' : '43" Full HD'}</b>
                                            <span className="text-xs text-gray-500">Pantalla publicitaria vertical</span>
                                        </div>
                                        <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4">
                                            <b className="block text-[#00E676] text-sm font-mono mb-1">OTA + WiFi</b>
                                            <span className="text-xs text-gray-500">Gestión remota sin SIM</span>
                                        </div>
                                    </div>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    {/* Additional specs note */}
                    <Reveal delay={0.3}>
                        <div className="mt-8 glass rounded-2xl border border-white/5 p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Battery className="w-5 h-5 text-[#00E676]" />
                                <h3 className="font-bold text-base">Reglas de contenido publicitario</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    'Logo de marca visible al menos el 80% del tiempo del video',
                                    'Texto, logo o detalle gráfico con altura mínima de 24 px',
                                    'Evitar fondos blancos puros: mejor contraste y color en pantalla',
                                ].map((rule, i) => (
                                    <div key={i} className="flex items-start gap-2 text-sm text-gray-400">
                                        <span className="text-[#FF2000] font-bold mt-0.5 flex-shrink-0">+</span>
                                        {rule}
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 pt-4 border-t border-white/5">
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    <span className="text-[#00E676] font-semibold">Modelo 32 PB disponible:</span> {totemNote}
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ══════════════════════════════════════ LOOP VISUAL ══════════════════════════════════════ */}
            <section className="py-28 bg-white/[0.015] border-y border-white/5 relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <Reveal>
                        <span className="text-[#00E676] text-xs font-mono tracking-[0.2em] uppercase mb-4 block">Cómo funciona el loop</span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">
                            Un ciclo de 120 segundos, <span className="text-[#00E676]">doce espacios.</span>
                        </h2>
                        <p className="text-gray-400 text-base max-w-2xl leading-relaxed">
                            Cada pantalla repite un bucle fijo en Yodeck: diez espacios de 10 segundos
                            para marcas y dos bloques de branding propio / instrucciones de alquiler.
                            Solo se venden los diez espacios de marca.
                        </p>
                    </Reveal>

                    <Reveal delay={0.15}>
                        <div className="mt-10 bg-white/[0.02] border border-white/8 rounded-2xl p-8">
                            <div className="flex justify-between items-baseline mb-6">
                                <span className="font-bold text-base flex items-center gap-2">
                                    <Monitor className="w-4 h-4 text-[#00E676]" />
                                    Loop del tótem
                                </span>
                                <span className="text-xs font-mono text-gray-500">120s totales · 10 clientes + branding propio</span>
                            </div>

                            {/* Loop track */}
                            <div className="flex gap-1 h-16 rounded-xl overflow-hidden mb-3">
                                {loopSegments.map((seg, i) => (
                                    <div key={i}
                                        className={`flex-1 rounded-lg flex items-center justify-center text-xs font-bold transition-all hover:scale-105 cursor-default ${
                                            seg.type === 'client'
                                                ? 'bg-gradient-to-b from-[#00E676] to-[#00C853] text-black'
                                                : 'border border-dashed border-[#FF2000]/50 text-[#FF2000] text-[10px]'
                                        }`}
                                    >
                                        {seg.label}
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between font-mono text-[10px] text-gray-600 mb-6">
                                {['0s', '30s', '60s', '90s', '120s'].map(t => <span key={t}>{t}</span>)}
                            </div>

                            <div className="h-[1px] w-full mb-6" style={{ background: 'linear-gradient(90deg, transparent, #00E676, transparent)', boxShadow: '0 0 8px #00E676' }} />

                            <div className="grid grid-cols-3 gap-6">
                                {[
                                    { val: '10', label: 'Cupos disponibles por pantalla, al mes', color: '#00E676' },
                                    { val: '30/h', label: 'Impresiones por hora, en promedio', color: '#ffffff' },
                                    { val: '360–420', label: 'Repeticiones diarias (según horario)', color: '#FF2000' },
                                ].map((s, i) => (
                                    <div key={i} className="text-center">
                                        <b className="block text-2xl font-bold font-mono" style={{ color: s.color }}>{s.val}</b>
                                        <span className="text-xs text-gray-500 mt-1 block">{s.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ══════════════════════════════════════ PLANS ══════════════════════════════════════ */}
            <section id="planes" className="py-28 relative overflow-hidden">
                <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#00E676] opacity-[0.05] blur-[150px] pointer-events-none" />
                <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-[#FF2000] opacity-[0.04] blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <Reveal>
                        <span className="text-[#00E676] text-xs font-mono tracking-[0.2em] uppercase mb-4 block">Planes comerciales</span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">
                            Un formato para cada <span className="text-[#00E676]">tamaño de marca.</span>
                        </h2>
                        <p className="text-gray-400 text-base max-w-2xl leading-relaxed">
                            Tres formas de estar en la pantalla: rotativo en la de 23.8", rotativo en la de 43"
                            con mayor jerarquía visual, o dominancia total de una pantalla para un lanzamiento.
                        </p>
                    </Reveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
                        {plans.map((plan, i) => (
                            <Reveal key={i} delay={0.1 + i * 0.1}>
                                <div className={`relative bg-white/[0.03] border rounded-2xl p-8 h-full flex flex-col transition-all duration-300 ${
                                    plan.featured
                                        ? 'border-[#00E676]/40 bg-[#00E676]/[0.05] shadow-[0_0_50px_rgba(0,230,118,0.12)]'
                                        : 'border-white/8 hover:border-white/15'
                                }`}>
                                    {plan.featured && (
                                        <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-[#00E676] text-black text-[10px] font-bold tracking-wider uppercase">
                                            Recomendado
                                        </div>
                                    )}
                                    <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
                                    <p className="text-xs text-gray-500 mb-6">{plan.format}</p>
                                    <div className="mb-6">
                                        <span className="text-4xl font-bold font-mono">${plan.price}</span>
                                        <span className="text-gray-500 text-sm ml-1">USD</span>
                                        <p className="text-xs text-gray-600 mt-1">por pantalla / mes</p>
                                    </div>
                                    <ul className="space-y-3 flex-1 mb-6">
                                        {plan.features.map((f, fi) => (
                                            <li key={fi} className="flex items-start gap-2 text-sm text-gray-300">
                                                <Check className="w-4 h-4 text-[#00E676] mt-0.5 flex-shrink-0" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3 text-xs text-gray-400">
                                        {plan.who}
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    <Reveal delay={0.3}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
                            <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-8">
                                <h3 className="font-bold text-base mb-2 flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4 text-[#00E676]" />
                                    Paquete Red Local
                                </h3>
                                <p className="text-sm text-gray-400 mb-5">
                                    Circuito de 5 tótems de 43" en simultáneo, en lugar de contratar pantalla por pantalla.
                                </p>
                                <div className="flex items-baseline gap-3 mb-3">
                                    <span className="text-gray-500 line-through text-sm font-mono">$1.750</span>
                                    <span className="text-3xl font-bold font-mono text-[#FF2000]">$1.400</span>
                                    <span className="text-xs text-gray-500">USD / pantalla / mes</span>
                                </div>
                                <span className="inline-block bg-[#FF2000]/10 border border-[#FF2000]/30 text-[#FF2000] text-xs font-mono px-3 py-1 rounded-lg">
                                    Ahorra $350 USD por pantalla al mes
                                </span>
                            </div>

                            <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-8">
                                <h3 className="font-bold text-base mb-2">Descuento por permanencia</h3>
                                <p className="text-sm text-gray-400 mb-5">Aplica sobre cualquier plan, a mayor compromiso, mejor tarifa.</p>
                                {[
                                    { months: 'Contrato a 3 meses', discount: '10% OFF' },
                                    { months: 'Contrato a 6 meses', discount: '20% OFF' },
                                ].map((d, i) => (
                                    <div key={i} className="flex justify-between items-center py-3 border-t border-white/5 last:border-0">
                                        <span className="text-sm text-gray-300">{d.months}</span>
                                        <span className="text-[#00E676] font-mono font-bold text-sm">{d.discount}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ══════════════════════════════════════ SPECS ══════════════════════════════════════ */}
            <section className="py-20 border-y border-white/5 bg-white/[0.01]">
                <div className="container mx-auto px-6">
                    <Reveal>
                        <span className="text-gray-500 text-xs font-mono tracking-[0.2em] uppercase mb-4 block">Ficha técnica</span>
                        <h2 className="text-2xl md:text-4xl font-bold mb-8">
                            Lo que necesita tu equipo creativo.
                        </h2>
                    </Reveal>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
                        {specs.map((s, i) => (
                            <Reveal key={i} delay={i * 0.08}>
                                <div className="bg-white/[0.02] border border-white/6 p-5">
                                    <b className="block text-[#00E676] text-xs font-mono mb-2 uppercase tracking-wider">{s.label}</b>
                                    <span className="text-sm text-gray-300">{s.value}</span>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                    <p className="mt-6 text-sm text-gray-500">
                        <span className="text-white font-semibold">Incluido en todos los planes:</span> 1 cambio de arte o video al mes sin costo adicional.
                    </p>
                </div>
            </section>

            {/* ══════════════════════════════════════ MAP ══════════════════════════════════════ */}
            <section className="py-28 relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <Reveal>
                            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 text-[#00E676] text-xs font-bold tracking-wider uppercase">
                                Red Voltaje
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-4">
                                Caracas, <span className="text-[#00E676]">cada esquina cuenta.</span>
                            </h2>
                            <p className="text-gray-400 text-base leading-relaxed mb-6">
                                Nuestra red de tótems está posicionada en los puntos de mayor tráfico peatonal
                                y vehicular de la zona metropolitana. Cada ubicación fue elegida estratégicamente
                                para maximizar el tiempo de exposición de tu marca.
                            </p>
                            <ul className="space-y-3">
                                {['Disponible 24/7 en ubicaciones premium', 'Sin necesidad de llevar cables', 'Compatible con todos los dispositivos'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                                        <div className="w-2 h-2 rounded-full bg-[#00E676]" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <div className="h-[500px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-[#00E676]/5">
                                {stations.length > 0 ? (
                                    <GoogleMapComponent
                                        stations={stations}
                                        selectedStation={null}
                                    />
                                ) : (
                                    <div className="w-full h-full bg-[#0a0f0d] flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-[#00E676]/10 flex items-center justify-center animate-pulse">
                                                <MapPin className="w-5 h-5 text-[#00E676]" />
                                            </div>
                                            <p className="text-sm text-gray-500">Cargando estaciones...</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════ CTA ══════════════════════════════════════ */}
            <section id="contacto" className="py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00E676]/[0.03] to-transparent" />
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#00E676] opacity-[0.06] blur-[150px] pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#FF2000] opacity-[0.04] blur-[120px] pointer-events-none" />
                <div className="absolute inset-0 opacity-[0.02]"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")` }} />

                <div className="container mx-auto px-6 relative z-10">
                    <Reveal>
                        <div className="max-w-3xl mx-auto text-center">
                            <span className="text-[#00E676] text-xs font-mono tracking-[0.2em] uppercase mb-6 block">Reserva tu espacio</span>
                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.9] mb-6">
                                Tu marca en{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E676] to-[#00C853]">
                                    cada pantalla
                                </span>
                            </h2>
                            <p className="text-gray-400 text-lg mb-4">Cupos limitados: 10 marcas por pantalla, al mes.</p>
                            <p className="text-gray-500 text-sm mb-10">Cotización en 24 horas · Sin costo de asesoría</p>

                            <div className="flex flex-wrap justify-center gap-4 mb-16">
                                <Link
                                    href="https://wa.me/584126851090?text=Hola%2C%20quiero%20información%20sobre%20publicidad%20DOOH%20indoor%20con%20Voltaje%20Plus"
                                    target="_blank"
                                    className="group inline-flex items-center gap-3 px-10 py-5 bg-[#00E676] text-black font-bold rounded-xl hover:bg-[#00C853] transition-all shadow-[0_0_40px_rgba(0,230,118,0.4)] hover:shadow-[0_0_70px_rgba(0,230,118,0.6)] hover:scale-105"
                                >
                                    <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                    Solicitar Cotización
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <a
                                    href="mailto:voltajevzla@gmail.com"
                                    className="inline-flex items-center gap-3 px-10 py-5 border border-white/15 text-white font-medium rounded-xl hover:bg-white/5 hover:border-[#00E676]/40 transition-all"
                                >
                                    <span>✉</span>
                                    Escríbenos directo
                                </a>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-xl mx-auto">
                                {[
                                    { icon: Zap, val: '24h', lbl: 'Tiempo de respuesta' },
                                    { icon: Shield, val: '$0', lbl: 'Asesoría gratuita' },
                                    { icon: MapPin, val: 'CCS', lbl: 'Caracas, Venezuela' },
                                ].map((c, i) => (
                                    <div key={i} className="bg-white/[0.03] border border-white/8 rounded-xl p-4 text-center">
                                        <c.icon className="w-5 h-5 text-[#00E676] mx-auto mb-2" />
                                        <b className="block text-[#00E676] font-bold text-lg">{c.val}</b>
                                        <span className="text-[10px] text-gray-500 uppercase tracking-wider">{c.lbl}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <div className="mt-16 max-w-2xl mx-auto bg-white/[0.02] border border-white/8 rounded-2xl p-8">
                            <h3 className="font-bold text-base mb-6 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-[#00E676]" />
                                Contacto directo
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                {[
                                    { label: 'Contacto', value: 'Marco Jaimes — CEO, Voltaje Plus' },
                                    { label: 'WhatsApp / Tel', value: '0412-685-1090' },
                                    { label: 'Correo', value: 'voltajevzla@gmail.com' },
                                    { label: 'Web', value: 'www.voltajeplus.com' },
                                    { label: 'Instagram', value: '@voltajevzla_' },
                                    { label: 'TikTok', value: '@voltajevzla' },
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col">
                                        <span className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">{item.label}</span>
                                        <span className="text-gray-200 font-medium">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            <Footer />
        </main>
    );
}
