import {
    ACTIVITY_CATALOG,
    CATEGORIES,
    getActivityById,
    findActivityByName,
    getActivitiesByCategory,
    searchActivities,
} from '../../src/utils/activityCatalog';

describe('Activity Catalog', () => {
    describe('Data Integrity', () => {
        it('exports a non-empty catalog', () => {
            expect(ACTIVITY_CATALOG.length).toBeGreaterThan(30);
        });

        it('exports categories', () => {
            expect(CATEGORIES.length).toBeGreaterThan(5);
            CATEGORIES.forEach((cat) => {
                expect(cat.id).toBeDefined();
                expect(cat.label).toBeDefined();
                expect(cat.icon).toBeDefined();
            });
        });

        it('every activity has required fields', () => {
            ACTIVITY_CATALOG.forEach((a) => {
                expect(a.id).toBeTruthy();
                expect(a.nameVi).toBeTruthy();
                expect(a.category).toBeTruthy();
                expect(a.icon).toBeTruthy();
                expect(Array.isArray(a.aliases)).toBe(true);
            });
        });

        it('all activity IDs are unique', () => {
            const ids = ACTIVITY_CATALOG.map((a) => a.id);
            expect(new Set(ids).size).toBe(ids.length);
        });

        it('every activity category references a valid category', () => {
            const categoryIds = new Set(CATEGORIES.map((c) => c.id));
            ACTIVITY_CATALOG.forEach((a) => {
                expect(categoryIds.has(a.category)).toBe(true);
            });
        });
    });

    describe('getActivityById', () => {
        it('returns an activity for a valid ID', () => {
            const act = getActivityById('cuoi-hoi');
            expect(act).toBeDefined();
            expect(act!.nameVi).toBe('Cưới hỏi');
        });

        it('returns undefined for an invalid ID', () => {
            expect(getActivityById('nonexistent')).toBeUndefined();
        });
    });

    describe('findActivityByName', () => {
        it('finds by exact nameVi', () => {
            const act = findActivityByName('Xây dựng nhà cửa');
            expect(act).toBeDefined();
            expect(act!.id).toBe('xay-dung');
        });

        it('finds by alias', () => {
            const act = findActivityByName('nhập trạch');
            expect(act).toBeDefined();
            expect(act!.id).toBe('chuyen-nha');
        });

        it('is case-insensitive', () => {
            const act = findActivityByName('CƯỚI HỎI');
            expect(act).toBeDefined();
        });

        it('returns undefined for nonsense', () => {
            expect(findActivityByName('flying to mars')).toBeUndefined();
        });
    });

    describe('getActivitiesByCategory', () => {
        it('returns activities for a valid category', () => {
            const acts = getActivitiesByCategory('hon-nhan');
            expect(acts.length).toBeGreaterThan(0);
            acts.forEach((a) => expect(a.category).toBe('hon-nhan'));
        });
    });

    describe('searchActivities', () => {
        it('matches by nameVi substring', () => {
            const results = searchActivities('cưới');
            expect(results.length).toBeGreaterThan(0);
            expect(results.some((r) => r.id === 'cuoi-hoi')).toBe(true);
        });

        it('matches by alias substring', () => {
            const results = searchActivities('khởi công');
            expect(results.length).toBeGreaterThan(0);
        });

        it('returns empty for empty query', () => {
            expect(searchActivities('')).toEqual([]);
            expect(searchActivities('   ')).toEqual([]);
        });
    });
});
