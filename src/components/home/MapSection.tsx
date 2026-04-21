'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const GoogleMapComponent = dynamic<any>(() => import('./GoogleMapComponent'), {
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