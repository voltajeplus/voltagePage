'use client';

import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from "@/components/layout/Navbar";
import { Search, MapPin, Battery, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const GoogleMapComponent = dynamic(() => import('@/components/home/GoogleMapComponent'), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center text-green-600">Cargando Mapa...</div>
});

interface Station {
    id: number;
    lat: number;
    lng: number;
    name: string;
    status: string;
    category?: string;
    dist?: string;
    freeNum?: number;
    totalNum?: number;
    address?: string;
}

const CATEGORIES = [
    { key: 'all', label: 'Todas', icon: '📍' },
    { key: 'Cafetería', label: 'Cafetería', icon: '☕' },
    { key: 'Restaurante', label: 'Restaurante', icon: '🍽️' },
    { key: 'Centro Comercial', label: 'Centro Comercial', icon: '🏪' },
    { key: 'Hotel', label: 'Hotel', icon: '🏨' },
    { key: 'Clínica', label: 'Clínica', icon: '🏥' },
    { key: 'Bar', label: 'Bar/Eventos', icon: '🎉' },
    { key: 'Oficina', label: 'Oficina', icon: '🏢' },
    { key: 'Entretenimiento', label: 'Entretenimiento', icon: '🎮' },
];

const INITIAL_STATIONS: Station[] = [
    { id: 42, lat: 10.541448204568155, lng: -66.87963462645875, name: 'Finacao - El Avila', status: 'Available', category: 'Hotel', dist: "4km", freeNum: 0, totalNum: 0, address: 'Distrito Capital, G4RC+H48, 1050, Distrito Capital, Venezuela' },
    { id: 33, lat: 10.504093709521328, lng: -66.85031924418031, name: 'Clinica El Avila', status: 'Available', category: 'Clínica', dist: "5km", freeNum: 44, totalNum: 48, address: 'Av. San Juan Bosco, Caracas 1060, Distrito Capital, Venezuela' },
    { id: 6, lat: 10.489046014202566, lng: -66.85450998095091, name: 'C.C. El Sambil Chacao', status: 'Available', category: 'Centro Comercial', dist: "5km", freeNum: 72, totalNum: 72, address: 'F4QW+J5 Caracas, Distrito Capital, Venezuela' },
    { id: 32, lat: 10.500853102543433, lng: -66.84380851534425, name: 'Restaurant PinchoPan', status: 'Available', category: 'Restaurante', dist: "6km", freeNum: 12, totalNum: 12, address: 'Los Palos Grandes, Caracas 1060, Miranda, Venezuela' },
    { id: 8, lat: 10.486476886547981, lng: -66.83935651352692, name: 'EVENTOS-VOLTAJE-PLUS', status: 'Available', category: 'Bar', dist: "7km", freeNum: 80, totalNum: 104, address: 'Parque Simón Bolívar, Caracas 1064, Miranda, Venezuela' },
    { id: 1, lat: 10.4905375, lng: -66.83726560000001, name: 'Eco Café', status: 'Available', category: 'Cafetería', dist: "7km", freeNum: 12, totalNum: 12, address: 'F5R7+636, Caminería de Concreto, Caracas 1071, Miranda, Venezuela' },
    { id: 2, lat: 10.495777056989855, lng: -66.8316165325409, name: 'Prueba Johnson', status: 'Available', category: 'Oficina', dist: "7km", freeNum: 39, totalNum: 48, address: 'Av Romulo Gallegos, Edif Johnson&Johnson Piso 2, Caracas 1071, Miranda, Venezuela' },
    { id: 36, lat: 10.495738434350784, lng: -66.83149333313521, name: 'TRÁNSITO VOLTAJE', status: 'Available', category: 'Entretenimiento', dist: "7km", freeNum: 12, totalNum: 12, address: 'F5W9+8C3, Caracas 1071, Miranda, Venezuela' },
    { id: 44, lat: 10.492563125269852, lng: -66.83045647745962, name: 'La Jungla', status: 'Available', category: 'Bar', dist: "7km", freeNum: 24, totalNum: 24, address: 'Campo Claro, Caracas 1071, Miranda, Venezuela' },
    { id: 43, lat: 10.49185744533558, lng: -66.82964856931152, name: 'Fetuccine', status: 'Available', category: 'Restaurante', dist: "7km", freeNum: 12, totalNum: 12, address: 'Av. Francisco de Miranda, Los Ruices, Caracas 1071, Miranda, Venezuela' }
];

export default function UbicaTuEstacionPage() {
    const [selectedStation, setSelectedStation] = useState<Station | null>(null);
    const [stations, setStations] = useState<Station[]>(INITIAL_STATIONS);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    useEffect(() => {
        const fetchLive = async () => {
            try {
                const res = await fetch('/api/stations');
                const data = await res.json();
                if (data.success && data.stations.length > 0) {
                    setStations(data.stations);
                }
            } catch {
                console.log('Usando estaciones locales');
            }
        };
        fetchLive();
    }, []);

    const filteredStations = useMemo(() => {
        return stations.filter((station) => {
            const matchesSearch = !searchQuery || 
                station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                station.address?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                station.category?.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === 'all' || station.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [stations, searchQuery, activeCategory]);

    const handleStationSelect = (station: Station | null) => {
        setSelectedStation(station);
    };

    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = { all: stations.length };
        stations.forEach((s) => {
            const cat = s.category || 'Otros';
            counts[cat] = (counts[cat] || 0) + 1;
        });
        return counts;
    }, [stations]);

    return (
        <main className="h-screen bg-[#050505] text-white font-sans overflow-hidden flex flex-col">
            <Navbar />

            <div className="flex-1 pt-20 flex flex-col lg:flex-row relative">

                {/* Sidebar */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="w-full lg:w-[420px] h-[40vh] lg:h-full bg-[#0a0a0a] border-r border-white/10 flex flex-col z-20 shadow-2xl"
                >
                    <div className="p-5 border-b border-white/10">
                        <h1 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <MapPin className="text-[#00E676]" />
                            Ubica tu Estación
                        </h1>

                        {/* Search */}
                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Buscar por nombre, dirección o categoría..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm focus:border-[#00E676] focus:outline-none transition-colors"
                            />
                        </div>

                        {/* Category Chips */}
                        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
                            {CATEGORIES.map((cat) => {
                                const count = categoryCounts[cat.key] || 0;
                                if (count === 0 && cat.key !== 'all') return null;
                                return (
                                    <button
                                        key={cat.key}
                                        onClick={() => setActiveCategory(cat.key)}
                                        className={`flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                                            activeCategory === cat.key
                                                ? 'bg-[#00E676] text-black'
                                                : 'bg-white/5 text-gray-300 hover:bg-white/10'
                                        }`}
                                    >
                                        <span>{cat.icon}</span>
                                        <span>{cat.label}</span>
                                        <span className={`text-[10px] ml-0.5 ${activeCategory === cat.key ? 'text-black/60' : 'text-gray-500'}`}>
                                            {count}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Results List */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
                        {filteredStations.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">
                                <MapPin className="w-12 h-12 mx-auto mb-3 opacity-30" />
                                <p className="text-sm">No se encontraron estaciones</p>
                                <p className="text-xs mt-1">Intenta con otro término de búsqueda</p>
                            </div>
                        ) : (
                            filteredStations.map((station, i) => (
                                <motion.div
                                    key={station.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.03 }}
                                    onClick={() => handleStationSelect(station)}
                                    className={`group p-4 rounded-xl flex items-center justify-between transition-all cursor-pointer border-l-4 ${
                                        selectedStation?.id === station.id
                                            ? 'bg-[#00E676]/10 border-l-[#00E676]'
                                            : 'bg-white/[0.02] border-l-transparent hover:bg-white/5 hover:border-l-[#00E676]/50'
                                    }`}
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                                            selectedStation?.id === station.id
                                                ? 'bg-[#00E676]/20'
                                                : 'bg-white/5 group-hover:bg-white/10'
                                        }`}>
                                            <Battery className={`w-4 h-4 ${
                                                selectedStation?.id === station.id ? 'text-[#00E676]' : 'text-gray-400'
                                            }`} />
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="font-semibold text-sm truncate">{station.name}</h4>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                {station.category && (
                                                    <span className="text-[10px] text-gray-500 bg-white/5 px-1.5 py-0.5 rounded">
                                                        {station.category}
                                                    </span>
                                                )}
                                                <span className="text-xs text-gray-500">{station.dist}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-all ${
                                        selectedStation?.id === station.id
                                            ? 'text-[#00E676] opacity-100'
                                            : 'text-gray-600 opacity-0 group-hover:opacity-100'
                                    }`} />
                                </motion.div>
                            ))
                        )}
                    </div>

                    {/* Bottom Stats */}
                    <div className="p-4 border-t border-white/5">
                        <div className="flex items-center justify-between text-xs text-gray-500">
                            <span className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-[#00E676] rounded-full animate-pulse" />
                                {stations.length} estaciones en Caracas
                            </span>
                            <span>{filteredStations.length} mostradas</span>
                        </div>
                    </div>

                </motion.div>

                {/* Full Map */}
                <div className="flex-1 relative z-10 w-full h-full bg-gray-100">
                    <GoogleMapComponent
                        stations={stations}
                        selectedStation={selectedStation}
                        onStationSelect={handleStationSelect}
                    />

                    {/* Floating Info Overlay */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full flex items-center gap-4 text-sm z-[1000] whitespace-nowrap shadow-lg border border-white/20"
                    >
                        <span className="flex items-center gap-2 text-gray-800">
                            <span className="w-2 h-2 bg-[#00E676] animate-pulse rounded-full" />
                            <span className="font-semibold">{filteredStations.length}</span> estaciones
                            {searchQuery && <span className="text-gray-400">encontradas</span>}
                        </span>
                        {selectedStation && (
                            <span className="hidden sm:flex items-center gap-1 text-gray-500 border-l border-gray-200 pl-4">
                                <MapPin className="w-3 h-3" />
                                {selectedStation.name}
                            </span>
                        )}
                    </motion.div>
                </div>

            </div>
        </main>
    );
}
