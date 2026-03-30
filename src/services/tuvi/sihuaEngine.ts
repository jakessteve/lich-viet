import { TuViPalace, SihuaFlow, MutagenType } from './tuviTypes';
import { getSihuaTable, type TuHoaSchool } from './tuHoaTables';

/**
 * Multi-School Heavenly Stem Tứ Hóa mapping for Flying Star (Phi Tinh) Tử Vi.
 *
 * 7/10 stems are identical across all schools.
 * 3 disputed stems (Mậu, Canh, Nhâm) have school-specific variants.
 * See tuHoaTables.ts for the full academic breakdown.
 *
 * The school parameter selects which variant to use:
 * - 'toanThu' (default): Toàn Thư / Tam Hợp standard
 * - 'trungChau': Trung Châu Phái (Vương Đình Chi)
 * - 'phiTinh': Phi Tinh Phái variants
 */

/**
 * Calculate precise Taiwanese Palace "Flying Star" (Phi Tinh) Tứ Hóa flows.
 * For each palace, we use its heavenly stem to determine which stars receive 
 * the 4 mutagens (Lộc, Quyền, Khoa, Kỵ), and then find which palace currently
 * holds those stars to create a directional link.
 * 
 * @param palaces - The 12 generated palaces of a Tử Vi chart
 * @returns A flat list of all Si Hua flow links identified in the chart
 */
export function calculateSihuaFlows(palaces: TuViPalace[], school: TuHoaSchool = 'toanThu'): SihuaFlow[] {
    const flows: SihuaFlow[] = [];
    const SIHUA_TABLE = getSihuaTable(school);

    // Pre-map stars to their palaces for efficient lookup
    // We use the Earthly Branch as the stable identifier for the palace
    const starToPalaceMap = new Map<string, string>();
    palaces.forEach(palace => {
        const allStars = [
            ...(palace.majorStars || []),
            ...(palace.minorStars || []),
            ...(palace.adjectiveStars || [])
        ];
        allStars.forEach(star => {
            // Some stars might have regional variants, but we match by the primary name
            // used in the mapping table.
            starToPalaceMap.set(star.name, palace.earthlyBranch);
        });
    });

    palaces.forEach(sourcePalace => {
        const stem = sourcePalace.heavenlyStem;
        const mapping = SIHUA_TABLE[stem];
        
        if (!mapping) return;

        (Object.keys(mapping) as MutagenType[]).forEach(mutagen => {
            const targetStar = mapping[mutagen];
            const targetPalaceBranch = starToPalaceMap.get(targetStar);

            if (targetPalaceBranch) {
                flows.push({
                    sourcePalace: sourcePalace.earthlyBranch,
                    targetPalace: targetPalaceBranch,
                    targetStar,
                    mutagen,
                    isSelfHua: sourcePalace.earthlyBranch === targetPalaceBranch
                });
            }
        });
    });

    return flows;
}
