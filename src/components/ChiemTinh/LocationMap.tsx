/**
 * LocationMap — Interactive Leaflet mini-map for pin placement.
 * Uses OpenStreetMap tiles (free, no API key).
 * Supports click-to-move pin and dark mode.
 */

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MAP_CONFIG } from '../../config/api';

interface Props {
    lat: number;
    lng: number;
    onMapClick?: (lat: number, lng: number) => void;
}

// Fix Leaflet's default marker icon paths (webpack/vite issue)
const defaultIcon = L.icon({
    iconUrl: MAP_CONFIG.markerIcons.iconUrl,
    iconRetinaUrl: MAP_CONFIG.markerIcons.iconRetinaUrl,
    shadowUrl: MAP_CONFIG.markerIcons.shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

export default function LocationMap({ lat, lng, onMapClick }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<L.Map | null>(null);
    const markerRef = useRef<L.Marker | null>(null);
    const initialPos = useRef({ lat, lng });
    const onMapClickRef = useRef(onMapClick);

    useEffect(() => {
        onMapClickRef.current = onMapClick;
    }, [onMapClick]);

    // Initialize map
    useEffect(() => {
        if (!containerRef.current || mapRef.current) return;

        const map = L.map(containerRef.current, {
            center: [initialPos.current.lat, initialPos.current.lng],
            zoom: MAP_CONFIG.defaultZoom,
            zoomControl: true,
            attributionControl: true,
        });

        L.tileLayer(MAP_CONFIG.tileUrl, {
            attribution: MAP_CONFIG.tileAttribution,
            maxZoom: MAP_CONFIG.maxZoom,
        }).addTo(map);

        const marker = L.marker([initialPos.current.lat, initialPos.current.lng], { icon: defaultIcon, draggable: true }).addTo(map);
        markerRef.current = marker;

        // Drag marker to move
        marker.on('dragend', () => {
            const pos = marker.getLatLng();
            onMapClickRef.current?.(pos.lat, pos.lng);
        });

        // Click map to move marker
        map.on('click', (e: L.LeafletMouseEvent) => {
            marker.setLatLng(e.latlng);
            onMapClickRef.current?.(e.latlng.lat, e.latlng.lng);
        });

        mapRef.current = map;

        // Force a resize after mount to fix rendering
        setTimeout(() => map.invalidateSize(), 100);

        return () => {
            map.remove();
            mapRef.current = null;
            markerRef.current = null;
        };
    }, []);

    // Update marker + view when lat/lng changes externally
    useEffect(() => {
        if (!mapRef.current || !markerRef.current) return;
        const currentPos = markerRef.current.getLatLng();
        if (Math.abs(currentPos.lat - lat) > 0.0001 || Math.abs(currentPos.lng - lng) > 0.0001) {
            markerRef.current.setLatLng([lat, lng]);
            mapRef.current.setView([lat, lng], mapRef.current.getZoom(), { animate: true });
        }
    }, [lat, lng]);

    return (
        <div
            ref={containerRef}
            className="w-full rounded-xl overflow-hidden border border-border-light dark:border-border-dark"
            style={{ height: '200px' }}
        />
    );
}
