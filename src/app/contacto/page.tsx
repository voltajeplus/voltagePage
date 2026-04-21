'use client';


import React, { useState, useEffect } from 'react';
import nextDynamic from 'next/dynamic';
import { Navbar } from "@/components/layout/Navbar";
import { Search, Filter, MapPin, Battery, CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const GoogleMapComponent = nextDynamic<any>(() => import('@/components/home/GoogleMapComponent'), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center text-green-600">Cargando Mapa...</div>
});

interface Station {
    id: number;
    lat: number;
    lng: number;
    name: string;
    status: string;
    dist?: string;
    freeNum?: number;
    totalNum?: number;
    address?: string;
}

export default function UbicaTuEstacionPage() {
    const [selectedStation, setSelectedStation] = useState<Station | null>(null);
    const [stations, setStations] = useState<Station[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const hardcodedStations: Station[] = [
            { id: 1, lat: 10.489046014202566, lng: -66.85450998095091, name: 'C.C. El Sambil Chacao', status: 'Available', dist: "2km", freeNum: 23, totalNum: 24, address: 'F4QW+J5 Caracas, Distrito Capital' },
            { id: 2, lat: 10.489039377007927, lng: -66.85453080158577, name: 'C.C. El Sambil Chacao (Fast)', status: 'Available', dist: "2km", freeNum: 56, totalNum: 57, address: 'F4QW+J5 Caracas, Distrito Capital' },
            { id: 3, lat: 10.490175357222666, lng: -66.8406271116394, name: 'Parque Generalísimo Francisco de Miranda', status: 'Occupied', dist: "2km", freeNum: 0, totalNum: 0, address: 'F5R5+GHF, Caracas' },
            { id: 4, lat: 10.4905375, lng: -66.83726560000001, name: 'Eco Café', status: 'Occupied', dist: "2km", freeNum: 0, totalNum: 0, address: 'F5R7+636, Caracas' },
            { id: 5, lat: 10.495777056989855, lng: -66.8316165325409, name: 'Prueba Johnson', status: 'Available', dist: "3km", freeNum: 6, totalNum: 12, address: 'Av Romulo Gallegos. Edif Johnson&Johnson' },
            { id: 6, lat: 10.49568206138428, lng: -66.83112587050017, name: 'Torre Johnson & Johnson', status: 'Available', dist: "3km", freeNum: 158, totalNum: 260, address: 'Av. Rómulo Gallegos, Caracas' }
        ];
        setStations(hardcodedStations);
        setLoading(false);
    }, []);

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
                        {!loading && stations.map((station) => (
                            <div
                                key={station.id}
                                onClick={() => setSelectedStation(station)}
                                className={`p-4 rounded-xl flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer border-l-4 ${selectedStation?.id === station.id ? 'bg-white/10 border-l-[#00E676]' : 'glass border-l-transparent'}`}
                            >
                                <div>
                                    <h4 className="font-bold text-sm">{station.name}</h4>
                                    <p className="text-xs text-gray-500">{station.dist} • {station.freeNum !== undefined ? `${station.freeNum} disponibles` : 'Abierto 24/7'}</p>
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
                <div className="flex-1 relative z-10 w-full h-full bg-gray-100">
                    <GoogleMapComponent stations={stations} selectedStation={selectedStation} />

                    {/* Floating Info Overlay */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-full flex items-center gap-4 text-sm z-[1000] whitespace-nowrap shadow-lg"
                    >
                        <span className="flex items-center gap-2 text-gray-800">
                            <span className="w-2 h-2 bg-[#00E676] animate-pulse rounded-full" />
                            {stations.length} Estaciones Activas en Caracas
                        </span>
                    </motion.div>
                </div>

            </div>
        </main>
    );
}