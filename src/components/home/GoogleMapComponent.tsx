'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%'
};

const defaultCenter = {
    lat: 10.4890,
    lng: -66.8545
};

const CARACAS_CENTER = { lat: 10.4890, lng: -66.8545 };

const mapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: true,
    fullscreenControl: true,
    styles: [
        {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [{ "visibility": "off" }]
        }
    ]
};

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

interface GoogleMapComponentProps {
    stations: Station[];
    selectedStation: Station | null;
}

const GoogleMapComponent = ({ stations, selectedStation }: GoogleMapComponentProps) => {
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [selectedMarker, setSelectedMarker] = useState<Station | null>(null);
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [locationLoaded, setLocationLoaded] = useState(false);
    const [locationError, setLocationError] = useState<string | null>(null);

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
    });

    const requestLocation = useCallback(() => {
        setLocationError(null);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const loc = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    setUserLocation(loc);
                    setLocationLoaded(true);
                    if (map) {
                        map.setCenter(loc);
                        map.setZoom(15);
                    }
                },
                (error) => {
                    let msg = "Error al obtener ubicación";
                    if (error.code === error.PERMISSION_DENIED) msg = "Permiso de ubicación denegado";
                    else if (error.code === error.POSITION_UNAVAILABLE) msg = "Ubicación no disponible";
                    setLocationError(msg);
                    setLocationLoaded(true);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
            );
        } else {
            setLocationError("Geolocalización no soportada");
            setLocationLoaded(true);
        }
    }, [map]);

    useEffect(() => {
        requestLocation();
    }, []);

    const mapCenter = locationLoaded 
        ? (userLocation || CARACAS_CENTER) 
        : CARACAS_CENTER;

    const mapZoom = userLocation ? 15 : 13;

    const onLoad = useCallback((map: google.maps.Map) => {
        setMap(map);
    }, []);

    const onUnmount = useCallback(() => {
        setMap(null);
    }, []);

    const onMarkerClick = (station: Station) => {
        setSelectedMarker(station);
    };

    if (loadError) {
        return (
            <div className="w-full h-full bg-gray-100 rounded-2xl flex items-center justify-center text-red-500 p-4 text-center">
                Error al cargar el mapa. Por favor intenta más tarde.
            </div>
        );
    }

    if (!isLoaded) {
        return (
            <div className="w-full h-full bg-gray-100 animate-pulse rounded-2xl flex items-center justify-center text-green-600">
                Cargando Mapa...
            </div>
        );
    }

    return (
        <div className="w-full h-full rounded-2xl overflow-hidden border border-gray-200 shadow-xl relative z-0">
            <div className="absolute top-3 left-3 z-10">
                <button
                    onClick={requestLocation}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-2 rounded-lg shadow-lg flex items-center gap-2 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Mi Ubicación
                </button>
            </div>
            
            {locationError && (
                <div className="absolute top-14 left-3 right-3 z-10 bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded-lg text-sm">
                    {locationError}
                </div>
            )}

            <GoogleMap
                mapContainerStyle={containerStyle}
                center={mapCenter}
                zoom={mapZoom}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={mapOptions}
            >
                {userLocation && (
                    <Marker
                        position={userLocation}
                        icon={{
                            path: google.maps.SymbolPath.CIRCLE,
                            scale: 12,
                            fillColor: '#4285F4',
                            fillOpacity: 1,
                            strokeColor: '#ffffff',
                            strokeWeight: 3
                        }}
                        title="Tu ubicación"
                    />
                )}

                {stations.map((station) => (
                    <Marker
                        key={station.id}
                        position={{ lat: station.lat, lng: station.lng }}
                        onClick={() => onMarkerClick(station)}
                        icon={{
                            url: '/images/marker0.png',
                            scaledSize: new google.maps.Size(35, 45),
                            anchor: new google.maps.Point(17, 45)
                        }}
                        title={station.name}
                    />
                ))}

                {selectedMarker && (
                    <InfoWindow
                        position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                        onCloseClick={() => setSelectedMarker(null)}
                    >
                        <div className="p-2 min-w-[200px]">
                            <h3 className="font-bold text-gray-900 text-base">{selectedMarker.name}</h3>
                            <div className={`text-sm font-semibold mt-1 ${selectedMarker.status === 'Available' ? 'text-green-600' : 'text-red-500'}`}>
                                {selectedMarker.status === 'Available' ? '✅ Disponible' : '❌ Ocupado'}
                            </div>
                            {selectedMarker.freeNum !== undefined && (
                                <p className="text-sm text-gray-600 mt-1">
                                    🔋 {selectedMarker.freeNum} / {selectedMarker.totalNum} cargadores disponibles
                                </p>
                            )}
                            {selectedMarker.dist && (
                                <p className="text-sm text-gray-500">📍 {selectedMarker.dist}</p>
                            )}
                            {selectedMarker.address && (
                                <p className="text-xs text-gray-400 mt-1">{selectedMarker.address}</p>
                            )}
                            <a 
                                href={`https://www.google.com/maps/dir/?api=1&destination=${selectedMarker.lat},${selectedMarker.lng}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-2 text-sm text-blue-600 hover:underline"
                            >
                                🧭 Cómo llegar
                            </a>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </div>
    );
};

export default GoogleMapComponent;