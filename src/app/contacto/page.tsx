'use client';



import React, { useState } from 'react';
import nextDynamic from 'next/dynamic';
import { Navbar } from "@/components/layout/Navbar";
import { Search, Filter, MapPin, Battery, CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Map = nextDynamic<any>(() => import('@/components/home/Map'), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-[#050505] animate-pulse flex items-center justify-center text-[#00E676]">Cargando Mapa...</div>
});

// Data moved here to share with Map
const stationsData = [
    { id: 1, lat: 10.4806, lng: -66.9036, name: 'Sambil Caracas', status: 'Available', dist: "1.2 km" },
    { id: 2, lat: 10.4910, lng: -66.8500, name: 'CCCT', status: 'Occupied', dist: "3.5 km" },
    { id: 3, lat: 10.5000, lng: -66.9500, name: 'El Recreo', status: 'Available', dist: "4.1 km" },
    { id: 4, lat: 10.4650, lng: -66.8000, name: 'Parque Vizcaya', status: 'Available', dist: "8.2 km" }
];

export default function UbicaTuEstacionPage() {
    const [selectedStation, setSelectedStation] = useState<any>(null);

    return (
        <main className="h-screen bg-[#050505] text-white font-sans overflow-hidden flex flex-col">
            <Navbar />

            {/* Dashboard Layout - Starts below navbar */}
            <div className="flex-1 pt-20 flex flex-col lg:flex-row relative">

                {/* Sidebar */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="w-full lg:w-[400px] h-[40vh] lg:h-full bg-[#0a0a0a] border-r border-white/10 flex flex-col z-20 shadow-2xl"
                >
                    <div className="p-6 border-b border-white/10">
                        <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <MapPin className="text-[#00E676]" />
                            Buscar Estaciones
                        </h1>

                        {/* Search */}
                        <div className="relative mb-6">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Buscar por ciudad, centro comercial..."
                                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm focus:border-[#00E676] focus:outline-none transition-colors"
                                defaultValue="Caracas"
                            />
                        </div>

                        {/* Filters */}
                        <div className="mb-6">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Servicios</p>
                            <div className="space-y-3">
                                {[
                                    { id: 'voltaje', label: 'Estación de Voltaje', icon: Battery, checked: true },

                                    { id: 'tech', label: 'Soporte Técnico', icon: Filter, checked: false },
                                ].map((filter) => (
                                    <label key={filter.id} className="flex items-center gap-3 cursor-pointer group">
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filter.checked ? 'bg-[#00E676] border-[#00E676]' : 'border-gray-600 group-hover:border-[#00E676]'}`}>
                                            {filter.checked && <CheckCircle className="w-3 h-3 text-black" />}
                                        </div>
                                        <span className="text-sm text-gray-300 group-hover:text-white">{filter.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Status Legend */}
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Estado</p>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 bg-[#00E676]/10 px-3 py-1.5 rounded-lg border border-[#00E676]/20">
                                    <div className="w-2 h-2 rounded-full bg-[#00E676]" />
                                    <span className="text-xs font-medium text-[#00E676]">Disponible</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                                    <div className="w-2 h-2 rounded-full bg-gray-500" />
                                    <span className="text-xs font-medium text-gray-400">Ocupado</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Results List */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {stationsData.map((station) => (
                            <div
                                key={station.id}
                                onClick={() => setSelectedStation(station)}
                                className={`p-4 rounded-xl flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer border-l-4 ${selectedStation?.id === station.id ? 'bg-white/10 border-l-[#00E676]' : 'glass border-l-transparent'}`}
                            >
                                <div>
                                    <h4 className="font-bold text-sm">{station.name}</h4>
                                    <p className="text-xs text-gray-500">{station.dist} • Abierto 24/7</p>
                                </div>
                                {station.status === 'Available' ? (
                                    <div className="bg-[#00E676]/20 p-2 rounded-full"><Battery className="w-4 h-4 text-[#00E676]" /></div>
                                ) : (
                                    <div className="bg-red-500/20 p-2 rounded-full"><XCircle className="w-4 h-4 text-red-500" /></div>
                                )}
                            </div>
                        ))}
                    </div>

                </motion.div>

                {/* Full Map */}
                <div className="flex-1 relative z-10 w-full h-full bg-[#111]">
                    <Map stations={stationsData} selectedStation={selectedStation} />

                    {/* Floating Info Overlay */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 glass px-6 py-3 rounded-full flex items-center gap-4 text-sm z-[1000] whitespace-nowrap"
                    >
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-[#00E676] animate-pulse rounded-full" />
                            {stationsData.length} Estaciones Activas en Caracas
                        </span>
                    </motion.div>
                </div>

            </div>
        </main>
    );
}
