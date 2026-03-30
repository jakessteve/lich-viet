import type { AspectData, PlanetPosition, AspectType, DetectedPattern } from '../types/westernAstro';

// =============================================================================
// Aspect Pattern Detector — Detects Grand Trine, T-Square, Grand Cross,
// Stellium, Yod, Kite, Mystic Rectangle from natal chart data
// =============================================================================


// ─── Helpers ────────────────────────────────────────────────────────────────


/** Build adjacency: for each aspect type, which bodies are connected? */
function buildAspectIndex(aspects: AspectData[]): Map<AspectType, Map<string, Set<string>>> {
    const idx = new Map<AspectType, Map<string, Set<string>>>();
    for (const a of aspects) {
        if (!idx.has(a.type)) idx.set(a.type, new Map());
        const m = idx.get(a.type)!;
        if (!m.has(a.planet1)) m.set(a.planet1, new Set());
        if (!m.has(a.planet2)) m.set(a.planet2, new Set());
        m.get(a.planet1)!.add(a.planet2);
        m.get(a.planet2)!.add(a.planet1);
    }
    return idx;
}

function hasAspect(idx: Map<AspectType, Map<string, Set<string>>>, type: AspectType, a: string, b: string): boolean {
    return idx.get(type)?.get(a)?.has(b) ?? false;
}

function getConnected(idx: Map<AspectType, Map<string, Set<string>>>, type: AspectType, body: string): Set<string> {
    return idx.get(type)?.get(body) ?? new Set();
}

// ─── Pattern Detection ──────────────────────────────────────────────────────

export function detectAspectPatterns(
    aspects: AspectData[],
    planets: PlanetPosition[],
): DetectedPattern[] {
    const patterns: DetectedPattern[] = [];
    const idx = buildAspectIndex(aspects);
    const seen = new Set<string>(); // prevent duplicates

    // ─── Grand Trine: 3 bodies all in mutual trine ───
    const trineBodies = Array.from(idx.get('trine')?.keys() ?? []);
    for (let i = 0; i < trineBodies.length; i++) {
        for (let j = i + 1; j < trineBodies.length; j++) {
            if (!hasAspect(idx, 'trine', trineBodies[i], trineBodies[j])) continue;
            for (let k = j + 1; k < trineBodies.length; k++) {
                if (hasAspect(idx, 'trine', trineBodies[i], trineBodies[k]) &&
                    hasAspect(idx, 'trine', trineBodies[j], trineBodies[k])) {
                    const bodies = [trineBodies[i], trineBodies[j], trineBodies[k]].sort();
                    const key = `grandTrine:${bodies.join(',')}`;
                    if (!seen.has(key)) {
                        seen.add(key);
                        patterns.push({
                            type: 'grandTrine',
                            involvedBodies: bodies,
                            description: bodies.join(' △ '),
                        });
                    }
                }
            }
        }
    }

    // ─── T-Square: 2 in opposition, both square a 3rd ───
    const oppBodies = Array.from(idx.get('opposition')?.keys() ?? []);
    for (const a of oppBodies) {
        for (const b of getConnected(idx, 'opposition', a)) {
            if (a >= b) continue; // avoid duplicates
            for (const apex of getConnected(idx, 'square', a)) {
                if (hasAspect(idx, 'square', b, apex)) {
                    const bodies = [a, b, apex].sort();
                    const key = `tSquare:${bodies.join(',')}`;
                    if (!seen.has(key)) {
                        seen.add(key);
                        patterns.push({
                            type: 'tSquare',
                            involvedBodies: bodies,
                            description: `${a} ☍ ${b}, đỉnh: ${apex}`,
                        });
                    }
                }
            }
        }
    }

    // ─── Grand Cross: 4 bodies in 2 oppositions + 4 squares ───
    for (const a of oppBodies) {
        for (const b of getConnected(idx, 'opposition', a)) {
            if (a >= b) continue;
            for (const c of getConnected(idx, 'square', a)) {
                if (!hasAspect(idx, 'square', b, c)) continue;
                for (const d of getConnected(idx, 'opposition', c)) {
                    if (c >= d) continue;
                    if (d === a || d === b) continue;
                    if (hasAspect(idx, 'square', a, d) && hasAspect(idx, 'square', b, d)) {
                        const bodies = [a, b, c, d].sort();
                        const key = `grandCross:${bodies.join(',')}`;
                        if (!seen.has(key)) {
                            seen.add(key);
                            patterns.push({
                                type: 'grandCross',
                                involvedBodies: bodies,
                                description: bodies.join(' □ '),
                            });
                        }
                    }
                }
            }
        }
    }

    // ─── Stellium: 3+ planets in same sign ───
    const signGroups = new Map<string, string[]>();
    for (const p of planets) {
        if (!signGroups.has(p.sign)) signGroups.set(p.sign, []);
        signGroups.get(p.sign)!.push(p.id);
    }
    for (const [sign, bodies] of signGroups) {
        if (bodies.length >= 3) {
            patterns.push({
                type: 'stellium',
                involvedBodies: bodies.sort(),
                description: `${bodies.length} hành tinh trong ${sign}`,
            });
        }
    }

    // ─── Stellium by house: 3+ planets in same house ───
    const houseGroups = new Map<number, string[]>();
    for (const p of planets) {
        if (!houseGroups.has(p.house)) houseGroups.set(p.house, []);
        houseGroups.get(p.house)!.push(p.id);
    }
    for (const [house, bodies] of houseGroups) {
        if (bodies.length >= 3) {
            const key = `stellium-house:${bodies.sort().join(',')}`;
            if (!seen.has(key)) {
                seen.add(key);
                patterns.push({
                    type: 'stellium',
                    involvedBodies: bodies,
                    description: `${bodies.length} hành tinh trong Nhà ${house}`,
                });
            }
        }
    }

    // ─── Yod: 2 bodies sextile, both quincunx to 3rd (apex) ───
    const sextileBodies = Array.from(idx.get('sextile')?.keys() ?? []);
    for (let i = 0; i < sextileBodies.length; i++) {
        for (const j_body of getConnected(idx, 'sextile', sextileBodies[i])) {
            if (sextileBodies[i] >= j_body) continue;
            for (const apex of getConnected(idx, 'quincunx', sextileBodies[i])) {
                if (hasAspect(idx, 'quincunx', j_body, apex)) {
                    const bodies = [sextileBodies[i], j_body, apex].sort();
                    const key = `yod:${bodies.join(',')}`;
                    if (!seen.has(key)) {
                        seen.add(key);
                        patterns.push({
                            type: 'yod',
                            involvedBodies: bodies,
                            description: `${sextileBodies[i]} ⚹ ${j_body}, đỉnh: ${apex}`,
                        });
                    }
                }
            }
        }
    }

    // ─── Kite: Grand Trine + 4th body opposing one vertex, sextile the other two ───
    for (const gt of patterns.filter(p => p.type === 'grandTrine')) {
        const [a, b, c] = gt.involvedBodies;
        for (const vertex of [a, b, c]) {
            const others = [a, b, c].filter(x => x !== vertex);
            for (const tail of getConnected(idx, 'opposition', vertex)) {
                if (hasAspect(idx, 'sextile', tail, others[0]) &&
                    hasAspect(idx, 'sextile', tail, others[1])) {
                    const bodies = [a, b, c, tail].sort();
                    const key = `kite:${bodies.join(',')}`;
                    if (!seen.has(key)) {
                        seen.add(key);
                        patterns.push({
                            type: 'kite',
                            involvedBodies: bodies,
                            description: `Grand Trine + đuôi: ${tail}`,
                        });
                    }
                }
            }
        }
    }

    // ─── Mystic Rectangle: 2 oppositions + 2 trines + 2 sextiles ───
    for (const a of oppBodies) {
        for (const b of getConnected(idx, 'opposition', a)) {
            if (a >= b) continue;
            for (const c of getConnected(idx, 'trine', a)) {
                if (!hasAspect(idx, 'sextile', b, c)) continue;
                for (const d of getConnected(idx, 'opposition', c)) {
                    if (c >= d) continue;
                    if (d === a || d === b) continue;
                    if (hasAspect(idx, 'trine', b, d) && hasAspect(idx, 'sextile', a, d)) {
                        const bodies = [a, b, c, d].sort();
                        const key = `mysticRect:${bodies.join(',')}`;
                        if (!seen.has(key)) {
                            seen.add(key);
                            patterns.push({
                                type: 'mysticRectangle',
                                involvedBodies: bodies,
                                description: bodies.join(' — '),
                            });
                        }
                    }
                }
            }
        }
    }

    return patterns;
}
