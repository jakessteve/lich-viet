/**
 * useLocationSearch — Debounced location search hook using Nominatim.
 * Debounces keyboard input by 400ms to respect the 1req/sec rate limit.
 */

import { useState, useRef, useCallback, useEffect } from 'react';
import { searchLocations, type NominatimResult } from '../services/nominatimService';

interface UseLocationSearchReturn {
    results: NominatimResult[];
    isSearching: boolean;
    error: string | null;
    search: (query: string) => void;
    clearResults: () => void;
}

export function useLocationSearch(): UseLocationSearchReturn {
    const [results, setResults] = useState<NominatimResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const abortRef = useRef(false);

    const search = useCallback((query: string) => {
        // Clear pending debounce
        if (timerRef.current) clearTimeout(timerRef.current);

        // Clear results for short queries
        if (!query || query.trim().length < 2) {
            setResults([]);
            setIsSearching(false);
            setError(null);
            return;
        }

        setIsSearching(true);
        setError(null);
        abortRef.current = false;

        timerRef.current = setTimeout(async () => {
            try {
                const data = await searchLocations(query);
                if (!abortRef.current) {
                    setResults(data);
                }
            } catch {
                if (!abortRef.current) {
                    setError('Không thể tìm kiếm địa điểm. Vui lòng thử lại.');
                }
            } finally {
                if (!abortRef.current) {
                    setIsSearching(false);
                }
            }
        }, 400);
    }, []);

    const clearResults = useCallback(() => {
        abortRef.current = true;
        if (timerRef.current) clearTimeout(timerRef.current);
        setResults([]);
        setIsSearching(false);
        setError(null);
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            abortRef.current = true;
        };
    }, []);

    return { results, isSearching, error, search, clearResults };
}
