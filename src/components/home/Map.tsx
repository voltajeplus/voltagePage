'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Helper component to center map on selection
const MapUpdater = ({ center, bounds }: { center?: [number, number], bounds?: any }) => {
    const map = useMap();
    useEffect(() => {
        if (!bounds || !center) return;
        if (bounds) map.fitBounds(bounds, { padding: [50, 50] });
        else map.flyTo(center, 14);
    }, [center, bounds, map]);
    return null;
};

interface Station {
    id: number;
    lat: number;
    lng: number;
    name: string;
    status: string;
}

interface MapProps {
    stations: Station[];
    selectedStation: Station | null;
}

const Map = ({ stations, selectedStation }: MapProps) => {
    // Correctly handle SSR by not rendering until mounted
    const [isMounted, setIsMounted] = useState(false);
    const [L, setL] = useState<any>(null); // Leaflet instance
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const [routePath, setRoutePath] = useState<[number, number][]>([]);

    useEffect(() => {
        // Dynamically load Leaflet on client
        import('leaflet').then((leaflet) => {
            const LInstance = leaflet.default || leaflet;
            setL(LInstance);

            // Fix Icons
            // @ts-ignore
            delete LInstance.Icon.Default.prototype._getIconUrl;
            LInstance.Icon.Default.mergeOptions({
                iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
                iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
            });
            setIsMounted(true);
        });
    }, []);

    const icons = useMemo(() => {
        if (!L) return null;
        return {
            green: new L.Icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            }),
            user: new L.Icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            })
        };
    }, [L]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation([position.coords.latitude, position.coords.longitude]);
                },
                (error) => console.log("Error getting location:", error),
                { enableHighAccuracy: true }
            );
        }
    }, []);

    useEffect(() => {
        if (userLocation && selectedStation) {
            fetchRoute(userLocation, [selectedStation.lat, selectedStation.lng]);
        }
    }, [userLocation, selectedStation]);

    const fetchRoute = async (start: [number, number], end: [number, number]) => {
        try {
            const startStr = `${start[1]},${start[0]}`;
            const endStr = `${end[1]},${end[0]}`;
            const url = `https://router.project-osrm.org/route/v1/driving/${startStr};${endStr}?overview=full&geometries=geojson`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.routes && data.routes.length > 0) {
                const coordinates = data.routes[0].geometry.coordinates;
                const latLngs = coordinates.map((coord: number[]) => [coord[1], coord[0]] as [number, number]);
                setRoutePath(latLngs);
            }
        } catch (error) {
            console.error("Error fetching route:", error);
            setRoutePath([start, end]);
        }
    };

    const getBounds = () => {
        if (userLocation && selectedStation && L) {
            return L.latLngBounds([userLocation, [selectedStation.lat, selectedStation.lng]]);
        }
        return undefined;
    };

    if (!isMounted || !icons || !L) return <div className="w-full h-full bg-[#111] animate-pulse rounded-2xl flex items-center justify-center text-green-500">Cargando Mapa...</div>;

    return (
        <div className="w-full h-full rounded-2xl overflow-hidden glass border border-white/10 shadow-2xl relative z-0">
            <MapContainer
                center={[10.4806, -66.9036]}
                zoom={12}
                scrollWheelZoom={true}
                style={{ height: '100%', width: '100%' }}
                className="z-0 [&_.leaflet-layer]:filter [&_.leaflet-layer]:invert-[.95] [&_.leaflet-layer]:hue-rotate-180 [&_.leaflet-layer]:brightness-90 [&_.leaflet-layer]:contrast-85"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapUpdater
                    center={selectedStation ? [selectedStation.lat, selectedStation.lng] : undefined}
                    bounds={getBounds()}
                />

                {userLocation && (
                    <Marker position={userLocation} icon={icons.user}>
                        <Popup className="glass-popup">
                            <div className="text-black font-bold">Tu Ubicación</div>
                        </Popup>
                    </Marker>
                )}

                {stations.map((station) => (
                    <Marker
                        key={station.id}
                        position={[station.lat, station.lng]}
                        icon={icons.green}
                    >
                        <Popup className="glass-popup">
                            <div className="text-black font-bold">{station.name}</div>
                            <div className={`text-sm ${station.status === 'Available' ? 'text-green-600' : 'text-red-500'}`}>
                                {station.status === 'Available' ? 'Disponible ⚡️' : 'Ocupado'}
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {routePath.length > 0 && (
                    <Polyline
                        positions={routePath}
                        color="#00E676"
                        weight={5}
                        opacity={0.7}
                        dashArray="10, 10"
                    />
                )}
            </MapContainer>
        </div>
    );
};

export default Map;
