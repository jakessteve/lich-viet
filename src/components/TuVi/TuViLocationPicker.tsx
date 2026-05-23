import React, { useEffect, useMemo, useState } from 'react';
import type { TuViBirthLocation } from '../../types/tuvi';

interface TuViLocationPickerProps {
  value?: TuViBirthLocation;
  onChange: (location: TuViBirthLocation) => void;
}

interface NominatimResult {
  display_name: string;
  lat: string;
  lon: string;
  address?: {
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    country?: string;
  };
}

const QUICK_LOCATIONS: TuViBirthLocation[] = [
  { locationName: 'Hà Nội, Việt Nam', lat: 21.028511, lng: 105.804817, timezone: 7 },
  { locationName: 'TP. Hồ Chí Minh, Việt Nam', lat: 10.776889, lng: 106.700806, timezone: 7 },
  { locationName: 'Đà Nẵng, Việt Nam', lat: 16.047079, lng: 108.20623, timezone: 7 },
  { locationName: 'Huế, Việt Nam', lat: 16.463713, lng: 107.590866, timezone: 7 },
  { locationName: 'Hải Phòng, Việt Nam', lat: 20.844912, lng: 106.688084, timezone: 7 },
  { locationName: 'Cần Thơ, Việt Nam', lat: 10.045162, lng: 105.746857, timezone: 7 },
];

const estimateTimezone = (longitude: number) => Math.max(-12, Math.min(14, Math.round(longitude / 15)));

const formatDisplayName = (result: NominatimResult): string => {
  const address = result.address;
  const locality = address?.city ?? address?.town ?? address?.village ?? address?.state;
  const country = address?.country;
  return [locality, country].filter(Boolean).join(', ') || result.display_name;
};

export const TuViLocationPicker: React.FC<TuViLocationPickerProps> = ({ value, onChange }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<TuViBirthLocation[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');

  const selectedName = value?.locationName ?? '';

  const selectedQuickIndex = useMemo(
    () => QUICK_LOCATIONS.findIndex((location) => location.locationName === selectedName),
    [selectedName],
  );

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setIsSearching(true);
      setError('');
      try {
        const params = new URLSearchParams({
          q: trimmed,
          format: 'jsonv2',
          addressdetails: '1',
          limit: '5',
          'accept-language': 'vi',
        });
        const response = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, {
          signal: controller.signal,
          headers: { Accept: 'application/json' },
        });

        if (!response.ok) {
          throw new Error('Không tìm được địa điểm.');
        }

        const data = (await response.json()) as NominatimResult[];
        const nextResults = data.map((item) => {
          const lat = Number(item.lat);
          const lng = Number(item.lon);
          return {
            locationName: formatDisplayName(item),
            lat,
            lng,
            timezone: estimateTimezone(lng),
          };
        });
        setResults(nextResults);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'Không tìm được địa điểm.');
      } finally {
        setIsSearching(false);
      }
    }, 350);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [query]);

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Trình duyệt không hỗ trợ định vị.');
      return;
    }

    setIsSearching(true);
    setError('');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onChange({
          locationName: `Vị trí hiện tại (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`,
          lat: latitude,
          lng: longitude,
          timezone: estimateTimezone(longitude),
        });
        setIsSearching(false);
      },
      () => {
        setError('Không lấy được vị trí hiện tại.');
        setIsSearching(false);
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 },
    );
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {QUICK_LOCATIONS.map((location, index) => (
          <button
            key={location.locationName}
            type="button"
            onClick={() => onChange(location)}
            className={`rounded-xl border px-3 py-2 text-xs font-semibold transition-all ${
              selectedQuickIndex === index
                ? 'border-gold-light bg-gold/10 text-gold dark:border-gold dark:bg-gold/20 dark:text-gold-light'
                : 'border-border-light bg-gray-100 text-text-secondary-light hover:bg-gray-200 dark:border-border-dark dark:bg-white/5 dark:text-text-secondary-dark dark:hover:bg-white/10'
            }`}
          >
            {location.locationName.replace(', Việt Nam', '')}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <span className="material-icons-round pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-base text-text-secondary-light/70 dark:text-text-secondary-dark/70">
            travel_explore
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm tỉnh/thành, quốc gia sinh..."
            className="w-full rounded-xl border border-border-light bg-gray-100 py-2.5 pl-9 pr-3 text-sm text-text-primary-light transition-all placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold/40 dark:border-border-dark dark:bg-white/10 dark:text-text-primary-dark"
          />
        </div>
        <button
          type="button"
          onClick={useCurrentLocation}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border-light bg-gray-100 text-text-secondary-light transition-all hover:bg-gray-200 dark:border-border-dark dark:bg-white/5 dark:text-text-secondary-dark dark:hover:bg-white/10"
          title="Dùng vị trí hiện tại"
          aria-label="Dùng vị trí hiện tại"
        >
          <span className="material-icons-round text-base">my_location</span>
        </button>
      </div>

      {selectedName && (
        <div className="rounded-xl border border-gold/20 bg-gold/5 px-3 py-2 text-xs text-text-secondary-light dark:text-text-secondary-dark">
          <span className="font-semibold text-text-primary-light dark:text-text-primary-dark">Nơi sinh:</span>{' '}
          {selectedName}
          {value && (
            <span className="ml-1 text-[0.7rem] opacity-75">
              ({value.lat.toFixed(3)}, {value.lng.toFixed(3)}, UTC{value.timezone >= 0 ? '+' : ''}
              {value.timezone})
            </span>
          )}
        </div>
      )}

      {(isSearching || error || results.length > 0) && (
        <div className="rounded-xl border border-border-light bg-gray-50 p-2 dark:border-border-dark dark:bg-white/5">
          {isSearching && (
            <div className="flex items-center gap-2 px-2 py-1.5 text-xs text-text-secondary-light dark:text-text-secondary-dark">
              <span className="material-icons-round text-sm animate-spin">progress_activity</span>
              Đang tìm địa điểm...
            </div>
          )}
          {error && <p className="px-2 py-1.5 text-xs text-red-500 dark:text-red-400">{error}</p>}
          {!isSearching &&
            results.map((location) => (
              <button
                key={`${location.locationName}-${location.lat}-${location.lng}`}
                type="button"
                onClick={() => {
                  onChange(location);
                  setQuery('');
                  setResults([]);
                }}
                className="flex w-full items-start justify-between gap-3 rounded-lg px-2 py-2 text-left text-xs text-text-secondary-light transition-colors hover:bg-gold/10 dark:text-text-secondary-dark"
              >
                <span className="font-medium text-text-primary-light dark:text-text-primary-dark">
                  {location.locationName}
                </span>
                <span className="shrink-0 opacity-70">
                  UTC{location.timezone >= 0 ? '+' : ''}
                  {location.timezone}
                </span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
};
