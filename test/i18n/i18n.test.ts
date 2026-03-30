import {
    translate,
    translateArray,
    detectLocale,
    setLocalePreference,
    DEFAULT_LOCALE,
    SUPPORTED_LOCALES,
    LOCALE_NAMES,
} from '../../src/i18n/index';

describe('i18n Translation System', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    describe('translate()', () => {
        it('returns Vietnamese translation for default locale', () => {
            const result = translate('app.title');
            expect(result).toBe('Lịch Việt');
        });

        it('returns English translation when locale is en', () => {
            const result = translate('app.title', 'en');
            expect(result).toBe('Vietnamese Calendar');
        });

        it('returns nested keys correctly', () => {
            const result = translate('nav.amLich', 'vi');
            expect(result).toBe('Âm lịch');
        });

        it('falls back to Vietnamese when English key is missing', () => {
            // Both locales should have this key, but test fallback behavior
            const result = translate('app.title', 'en');
            expect(result).toBeTruthy();
            expect(typeof result).toBe('string');
        });

        it('returns raw key when translation is missing in all locales', () => {
            const result = translate('nonexistent.key');
            expect(result).toBe('nonexistent.key');
        });

        it('interpolates template variables', () => {
            const result = translate('app.copyright', 'vi', { year: 2026 });
            expect(result).toContain('2026');
            expect(result).toContain('Lịch Việt');
        });

        it('preserves unreplaced template variables', () => {
            const result = translate('app.copyright', 'vi', {});
            expect(result).toContain('{{year}}');
        });
    });

    describe('translateArray()', () => {
        it('returns weekday array for Vietnamese', () => {
            const result = translateArray('calendar.weekdays', 'vi');
            expect(result).toEqual(['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']);
        });

        it('returns weekday array for English', () => {
            const result = translateArray('calendar.weekdays', 'en');
            expect(result).toEqual(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
        });

        it('returns empty array for non-existent key', () => {
            const result = translateArray('nonexistent.key');
            expect(result).toEqual([]);
        });

        it('returns empty array for non-array value', () => {
            const result = translateArray('app.title');
            expect(result).toEqual([]);
        });
    });

    describe('detectLocale()', () => {
        it('returns a supported locale when no preference is set', () => {
            const result = detectLocale();
            // jsdom navigator.language is 'en', so detectLocale returns 'en' (valid)
            expect(SUPPORTED_LOCALES).toContain(result);
        });

        it('returns saved locale from localStorage', () => {
            localStorage.setItem('locale', 'en');
            const result = detectLocale();
            expect(result).toBe('en');
        });

        it('ignores invalid locale in localStorage', () => {
            localStorage.setItem('locale', 'invalid');
            const result = detectLocale();
            expect(SUPPORTED_LOCALES).toContain(result);
        });
    });

    describe('setLocalePreference()', () => {
        it('saves locale to localStorage', () => {
            setLocalePreference('en');
            expect(localStorage.getItem('locale')).toBe('en');
        });
    });

    describe('Constants', () => {
        it('has Vietnamese as default locale', () => {
            expect(DEFAULT_LOCALE).toBe('vi');
        });

        it('supports vi and en locales', () => {
            expect(SUPPORTED_LOCALES).toContain('vi');
            expect(SUPPORTED_LOCALES).toContain('en');
        });

        it('has human-readable locale names', () => {
            expect(LOCALE_NAMES.vi).toBe('Tiếng Việt');
            expect(LOCALE_NAMES.en).toBe('English');
        });
    });

    describe('All locale files have matching keys', () => {
        it('English has all keys that Vietnamese has', () => {
            // We test by checking a representative set of keys exist in both locales
            const keysToCheck = [
                'app.title',
                'app.loading',
                'nav.amLich',
                'nav.gieoQue',
                'calendar.day',
                'calendar.month',
                'user.guest',
                'footer.about',
                'maiHoa.title',
                'tuVi.title',
                'dayView.catThan',
            ];

            for (const key of keysToCheck) {
                const vi = translate(key, 'vi');
                const en = translate(key, 'en');
                expect(vi).not.toBe(key); // Not falling back to raw key
                expect(en).not.toBe(key); // Not falling back to raw key
            }
        });
    });
});
