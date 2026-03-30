/**
 * LocationPicker — Searchable location input with autocomplete,
 * quick-pick shortcuts, geolocation, and interactive mini-map.
 *
 * Uses OpenStreetMap Nominatim (free, no API key) for geocoding.
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Icon from '../shared/Icon';
import LocationMap from './LocationMap';
import { useLocationSearch } from '../../hooks/useLocationSearch';
import { reverseGeocode, type NominatimResult } from '../../services/nominatimService';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface SelectedLocation {
    lat: number;
    lng: number;
    timezone: number;
    locationName: string;
}

interface Props {
    onSelect: (location: SelectedLocation) => void;
    initialLat?: number;
    initialLng?: number;
    initialLocationName?: string;
}

// ─── Quick picks (Vietnamese cities) ────────────────────────────────────────

const QUICK_LOCATIONS = [
    { name: 'Hà Nội', lat: 21.0285, lng: 105.8542, tz: 7 },
    { name: 'TP. Hồ Chí Minh', lat: 10.8231, lng: 106.6297, tz: 7 },
    { name: 'Đà Nẵng', lat: 16.0544, lng: 108.2022, tz: 7 },
    { name: 'Huế', lat: 16.4637, lng: 107.5909, tz: 7 },
    { name: 'Hải Phòng', lat: 20.8449, lng: 106.6881, tz: 7 },
    { name: 'Cần Thơ', lat: 10.0452, lng: 105.7469, tz: 7 },
];

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Estimate timezone offset from longitude (rough but standard for astrology) */
function estimateTimezone(lng: number): number {
    return Math.round(lng / 15);
}

/** Format a result for display: City, State, Country */
function formatResult(r: NominatimResult): string {
    const parts: string[] = [];
    if (r.city) parts.push(r.city);
    if (r.state && r.state !== r.city) parts.push(r.state);
    if (r.country) parts.push(r.country);
    return parts.length > 0 ? parts.join(', ') : r.displayName;
}

// ─── Component ──────────────────────────────────────────────────────────────

export default function LocationPicker({ onSelect, initialLat, initialLng, initialLocationName }: Props) {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedName, setSelectedName] = useState(initialLocationName || '');
    const [mapLat, setMapLat] = useState(initialLat || 21.0285);
    const [mapLng, setMapLng] = useState(initialLng || 105.8542);
    const [showMap, setShowMap] = useState(!!(initialLat && initialLng));
    const [geoLoading, setGeoLoading] = useState(false);
    const [geoError, setGeoError] = useState<string | null>(null);

    const { results, isSearching, error: searchError, search, clearResults } = useLocationSearch();
    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // ─── Select a location ──────────────────────────────────────────────

    const selectLocation = useCallback((lat: number, lng: number, name: string, tz?: number) => {
        const timezone = tz ?? estimateTimezone(lng);
        setSelectedName(name);
        setMapLat(lat);
        setMapLng(lng);
        setShowMap(true);
        setIsOpen(false);
        setQuery('');
        clearResults();
        onSelect({ lat, lng, timezone, locationName: name });
    }, [onSelect, clearResults]);

    // ─── Handle search input ────────────────────────────────────────────

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setQuery(val);
        search(val);
        if (val.length >= 2) setIsOpen(true);
    };

    const handleInputFocus = () => {
        if (results.length > 0 || query.length >= 2) setIsOpen(true);
    };

    // ─── Handle result selection ────────────────────────────────────────

    const handleResultClick = (r: NominatimResult) => {
        selectLocation(r.lat, r.lng, formatResult(r));
    };

    // ─── Quick pick ─────────────────────────────────────────────────────

    const handleQuickPick = (loc: typeof QUICK_LOCATIONS[0]) => {
        selectLocation(loc.lat, loc.lng, loc.name, loc.tz);
    };

    // ─── Geolocation ────────────────────────────────────────────────────

    const handleGeolocate = async () => {
        setGeoError(null);
        if (!navigator.geolocation) {
            setGeoError('Trình duyệt không hỗ trợ định vị.');
            return;
        }

        setGeoLoading(true);
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const lat = parseFloat(pos.coords.latitude.toFixed(4));
                const lng = parseFloat(pos.coords.longitude.toFixed(4));
                // Try to reverse geocode for a nice name
                const rev = await reverseGeocode(lat, lng);
                const name = rev ? formatResult(rev) : 'Vị trí hiện tại';
                selectLocation(lat, lng, name);
                setGeoLoading(false);
            },
            (err) => {
                if (err.code === err.PERMISSION_DENIED) {
                    setGeoError('Quyền truy cập vị trí bị từ chối.');
                } else if (err.code === err.POSITION_UNAVAILABLE) {
                    setGeoError('Không thể xác định vị trí.');
                } else {
                    setGeoError('Lỗi định vị. Vui lòng thử lại.');
                }
                setGeoLoading(false);
            },
            { timeout: 10000 }
        );
    };

    // ─── Map click handler ──────────────────────────────────────────────

    const handleMapClick = async (lat: number, lng: number) => {
        const roundedLat = parseFloat(lat.toFixed(4));
        const roundedLng = parseFloat(lng.toFixed(4));
        setMapLat(roundedLat);
        setMapLng(roundedLng);

        // Reverse geocode to get a name
        const rev = await reverseGeocode(roundedLat, roundedLng);
        const name = rev ? formatResult(rev) : `${roundedLat}, ${roundedLng}`;
        selectLocation(roundedLat, roundedLng, name);
    };

    // ─── Render ─────────────────────────────────────────────────────────

    return (
        <div className="space-y-3">
            {/* Label */}
            <label className="block text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark">
                Nơi sinh <span className="text-red-500">*</span>
            </label>

            {/* Search input */}
            <div ref={wrapperRef} className="relative">
                <div className="relative">
                    <Icon name="search" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary-light dark:text-text-secondary-dark opacity-50" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        placeholder={selectedName || 'Tìm kiếm thành phố, tỉnh, quốc gia...'}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-gray-800 text-sm text-text-primary-light dark:text-text-primary-dark placeholder:text-text-secondary-light/50 dark:placeholder:text-text-secondary-dark/50 focus:ring-2 focus:ring-gold/30 dark:focus:ring-gold-dark/30 focus:border-gold dark:focus:border-gold-dark outline-none transition-all"
                    />
                    {isSearching && (
                        <Icon name="progress_activity" className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gold dark:text-gold-dark animate-spin" />
                    )}
                </div>

                {/* Dropdown results */}
                {isOpen && (results.length > 0 || searchError) && (
                    <div className="absolute z-50 mt-1.5 w-full rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-gray-800 shadow-xl max-h-64 overflow-y-auto">
                        {searchError && (
                            <div className="px-4 py-3 text-xs text-red-500 dark:text-red-400 flex items-center gap-1.5">
                                <Icon name="warning" className="w-3.5 h-3.5 shrink-0" /> {searchError}
                            </div>
                        )}
                        {results.map((r) => (
                            <button
                                key={r.placeId}
                                type="button"
                                onClick={() => handleResultClick(r)}
                                className="w-full text-left px-4 py-2.5 text-sm hover:bg-gold/10 dark:hover:bg-gold-dark/10 transition-colors flex items-start gap-2.5 border-b border-border-light/30 dark:border-border-dark/30 last:border-b-0"
                            >
                                <Icon name="location_on" className="w-4 h-4 text-gold dark:text-gold-dark shrink-0 mt-0.5" />
                                <div className="min-w-0">
                                    <div className="font-medium text-text-primary-light dark:text-text-primary-dark truncate">
                                        {r.city || r.state || r.country || r.displayName.split(',')[0]}
                                    </div>
                                    <div className="text-xs text-text-secondary-light dark:text-text-secondary-dark truncate mt-0.5">
                                        {formatResult(r)}
                                    </div>
                                </div>
                                {r.countryCode && (
                                    <span className="ml-auto shrink-0 text-[10px] font-mono text-text-secondary-light/60 dark:text-text-secondary-dark/60 bg-gray-100 dark:bg-gray-700/50 px-1.5 py-0.5 rounded">
                                        {r.countryCode}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Selected location badge */}
            {selectedName && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gold/8 dark:bg-gold-dark/8 border border-gold/20 dark:border-gold-dark/20">
                    <Icon name="location_on" className="w-4 h-4 text-gold dark:text-gold-dark shrink-0" />
                    <span className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark truncate">
                        {selectedName}
                    </span>
                    <span className="ml-auto text-[10px] font-mono text-text-secondary-light/60 dark:text-text-secondary-dark/60">
                        {mapLat.toFixed(2)}°, {mapLng.toFixed(2)}°
                    </span>
                </div>
            )}

            {/* Quick picks + geolocation */}
            <div className="flex flex-wrap gap-1.5">
                {QUICK_LOCATIONS.map(loc => (
                    <button
                        key={loc.name}
                        type="button"
                        onClick={() => handleQuickPick(loc)}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all
                            ${selectedName === loc.name
                                ? 'bg-gold/20 dark:bg-gold-dark/20 text-gold dark:text-gold-dark border border-gold/40 dark:border-gold-dark/40'
                                : 'bg-gray-100 dark:bg-gray-700/50 text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-200 dark:hover:bg-gray-600/50 border border-transparent'}`}
                    >
                        {loc.name}
                    </button>
                ))}
                <button
                    type="button"
                    onClick={handleGeolocate}
                    disabled={geoLoading}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800/40 border border-transparent transition-all disabled:opacity-50"
                >
                    {geoLoading ? (
                        <Icon name="progress_activity" className="w-3 h-3 animate-spin" />
                    ) : (
                        <Icon name="my_location" className="w-3 h-3" />
                    )}
                    Vị trí hiện tại
                </button>
            </div>
            {geoError && (
                <p className="flex items-center gap-1 text-xs text-red-500 dark:text-red-400">
                    <Icon name="warning" className="w-3 h-3 shrink-0" /> {geoError}
                </p>
            )}

            {/* Mini-map */}
            {showMap && (
                <div className="relative">
                    <LocationMap
                        lat={mapLat}
                        lng={mapLng}
                        onMapClick={handleMapClick}
                    />
                    <p className="text-[10px] text-text-secondary-light/60 dark:text-text-secondary-dark/60 mt-1 text-center">
                        Nhấp hoặc kéo ghim trên bản đồ để chỉnh vị trí
                    </p>
                </div>
            )}
        </div>
    );
}
