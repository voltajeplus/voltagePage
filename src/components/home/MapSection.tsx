'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const GoogleMapComponent = dynamic(() => import('./GoogleMapComponent'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center bg-[#050505] animate-pulse">
            <div className="text-[#00E676] text-xl font-bold">Cargando Mapa...</div>
        </div>
    )
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

export const MapSection = () => {
    const [stations, setStations] = useState<Station[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStations = async () => {
            try {
                const res = await fetch('/api/stations');
                const data = await res.json();
                if (data.success && data.stations.length > 0) {
                    setStations(data.stations);
                    setLoading(false);
                    return;
                }
            } catch {
                console.log('Error al conectar con API, usando datos locales');
            }

            const hardcodedStations: Station[] = [
                { id: 42, lat: 10.541448204568155, lng: -66.87963462645875, name: 'Finacao - El Avila', status: 'Occupied', dist: "4km", freeNum: 0, totalNum: 0, address: 'Distrito Capital, G4RC+H48, 1050, Distrito Capital, Venezuela' },
                { id: 33, lat: 10.504093709521328, lng: -66.85031924418031, name: 'Clinica El Avila', status: 'Available', dist: "5km", freeNum: 44, totalNum: 48, address: 'Av. San Juan Bosco, Caracas 1060, Distrito Capital, Venezuela' },
                { id: 6, lat: 10.489046014202566, lng: -66.85450998095091, name: 'C.C. El Sambil Chacao', status: 'Available', dist: "5km", freeNum: 72, totalNum: 72, address: 'F4QW+J5 Caracas, Distrito Capital, Venezuela' },
                { id: 32, lat: 10.500853102543433, lng: -66.84380851534425, name: 'Restaurant PinchoPan', status: 'Available', dist: "6km", freeNum: 12, totalNum: 12, address: 'Los Palos Grandes, Caracas 1060, Miranda, Venezuela' },
                { id: 8, lat: 10.486476886547981, lng: -66.83935651352692, name: 'EVENTOS-VOLTAJE-PLUS', status: 'Available', dist: "7km", freeNum: 80, totalNum: 104, address: 'Parque Simón Bolívar, Caracas 1064, Miranda, Venezuela' },
                { id: 1, lat: 10.4905375, lng: -66.83726560000001, name: 'Eco Café', status: 'Available', dist: "7km", freeNum: 12, totalNum: 12, address: 'F5R7+636, Caminería de Concreto, Caracas 1071, Miranda, Venezuela' },
                { id: 2, lat: 10.495777056989855, lng: -66.8316165325409, name: 'Prueba Johnson', status: 'Available', dist: "7km", freeNum: 39, totalNum: 48, address: 'Av Romulo Gallegos, Edif Johnson&Johnson Piso 2, Caracas 1071, Miranda, Venezuela' },
                { id: 36, lat: 10.495738434350784, lng: -66.83149333313521, name: 'TRÁNSITO VOLTAJE', status: 'Available', dist: "7km", freeNum: 12, totalNum: 12, address: 'F5W9+8C3, Caracas 1071, Miranda, Venezuela' },
                { id: 44, lat: 10.492563125269852, lng: -66.83045647745962, name: 'La Jungla', status: 'Available', dist: "7km", freeNum: 24, totalNum: 24, address: 'Campo Claro, Caracas 1071, Miranda, Venezuela' },
                { id: 43, lat: 10.49185744533558, lng: -66.82964856931152, name: 'Fetuccine', status: 'Available', dist: "7km", freeNum: 12, totalNum: 12, address: 'Av. Francisco de Miranda, Los Ruices, Caracas 1071, Miranda, Venezuela' }
            ];
            setStations(hardcodedStations);
            setLoading(false);
        };

        fetchStations();
    }, []);

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="order-2 lg:order-1 h-[500px]"
                >
                    <GoogleMapComponent
                        stations={stations}
                        selectedStation={null}
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="order-1 lg:order-2"
                >
                    <div className="inline-block px-3 py-1 mb-4 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 text-[#00E676] text-sm font-bold">
                        Red Voltaje
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Encuentra una Estación <span className="text-[#00E676]">Cerca de Ti</span>
                    </h2>
                    <p className="text-gray-400 text-lg mb-8">
                        Nuestra red de estaciones inteligentes está en constante expansión.
                        Utiliza nuestro mapa interactivo para localizar el punto de carga más cercano.
                    </p>

                    <ul className="space-y-4">
                        {['Disponible 24/7 en ubicaciones premium', 'Sin necesidad de llevar cables', 'Compatible con todos los dispositivos'].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-gray-300">
                                <div className="w-2 h-2 rounded-full bg-[#00E676]" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </motion.div>

            </div>
        </section>
    );
};