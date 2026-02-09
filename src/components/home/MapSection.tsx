'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

// Dynamically import the Map component with no SSR
const Map = dynamic<any>(() => import('./Map'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center bg-[#050505] animate-pulse">
            <div className="text-[#00E676] text-xl font-bold">Cargando Mapa...</div>
        </div>
    )
});

export const MapSection = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="order-2 lg:order-1 h-[500px]"
                >
                    <Map
                        stations={[
                            { id: 1, lat: 10.4806, lng: -66.9036, name: 'Sambil Caracas', status: 'Available', dist: "1.2 km" },
                            { id: 2, lat: 10.4910, lng: -66.8500, name: 'CCCT', status: 'Occupied', dist: "3.5 km" },
                            { id: 3, lat: 10.5000, lng: -66.9500, name: 'El Recreo', status: 'Available', dist: "4.1 km" },
                            { id: 4, lat: 10.4650, lng: -66.8000, name: 'Parque Vizcaya', status: 'Available', dist: "8.2 km" }
                        ]}
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
