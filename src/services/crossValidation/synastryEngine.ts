import { BasicProfile, SecondPersonProfile } from '../../types/auth';
import { SynastryResult, SystemSynastryResult, SynastryVerdict, SynastryFactor } from '../../types/synastry';
import { calculatePersonalDayScore, getYearChi } from '../personalization/personalDayScore';

export function getSynastryVerdict(score: number): SynastryVerdict {
  if (score >= 80) return 'Đại Cát';
  if (score >= 60) return 'Tiểu Cát';
  if (score >= 40) return 'Bình Hòa';
  if (score >= 20) return 'Tiểu Hung';
  return 'Đại Hung';
}

/**
 * Computes Synastry compatibility between exactly 2 people.
 * For P1, evaluates Numerology Life Path resonance and Bát Tự Year Pillar interactions.
 */
export function computeSynastryP1(
  p1: BasicProfile | null | undefined,
  p2: SecondPersonProfile | null | undefined
): SynastryResult | null {
  if (!p1 || !p2 || !p1.birthYear || !p2.birthYear) {
    return null;
  }

  // 1. Numerology Subsystem
  const numerologyFactors: SynastryFactor[] = [];
  let numScore = 50;

  if (p1.lifepathNumber && p2.lifepathNumber) {
    const l1 = p1.lifepathNumber;
    const l2 = p2.lifepathNumber;

    if (l1 === l2) {
      numScore = 90;
      numerologyFactors.push({ name: `Đồng điệu số ${l1}`, description: 'Cùng chung chỉ số Đường Đời, thấu hiểu sâu sắc.', score: +40, isFavorable: true });
    } else {
      // Basic resonance groups
      const groupA = [1, 5, 7];
      const groupB = [2, 4, 8];
      const groupC = [3, 6, 9];

      if ((groupA.includes(l1) && groupA.includes(l2)) ||
          (groupB.includes(l1) && groupB.includes(l2)) ||
          (groupC.includes(l1) && groupC.includes(l2))) {
        numScore = 75;
        numerologyFactors.push({ name: 'Hòa hợp nhóm số', description: 'Cùng nhóm năng lượng Đường Đời.', score: +25, isFavorable: true });
      } else {
        // Tension or neutral
        numScore = 45;
        numerologyFactors.push({ name: 'Khác biệt năng lượng', description: 'Đường Đời thuộc các nhóm đối lập, cần nỗ lực dung hòa.', score: -5, isFavorable: false });
      }
    }
  }

  const numerologySystem: SystemSynastryResult = {
    system: 'numerology',
    score: numScore,
    factors: numerologyFactors,
    isAvailable: !!p1.lifepathNumber && !!p2.lifepathNumber
  };

  // 2. Bát Tự (Chi of Year Base)
  // Re-use personal day score by treating P2's year chi as the "Day" we interact with
  const p2Chi = getYearChi(p2.birthYear);
  const p1ChiInteraction = calculatePersonalDayScore(p1, p2Chi);
  
  const baziFactors: SynastryFactor[] = [];
  let baziScore = 50;

  if (p1ChiInteraction) {
    baziScore += p1ChiInteraction.actionScore * 10;
    baziScore = Math.max(0, Math.min(100, baziScore));

    if (p1ChiInteraction.isTamHop) baziFactors.push({ name: 'Tam Hợp', description: 'Ba tuổi hợp nhau tạo nền tảng vững chắc.', score: 20, isFavorable: true });
    if (p1ChiInteraction.isLucHop) baziFactors.push({ name: 'Lục Hợp', description: 'Sự kết hợp hoàn hảo, hỗ trợ mật thiết.', score: 15, isFavorable: true });
    if (p1ChiInteraction.isTuongXung) baziFactors.push({ name: 'Lục Xung', description: 'Tuổi đối xung, dễ phát sinh xung đột quan điểm.', score: -20, isFavorable: false });
    if (p1ChiInteraction.isTuongHai) baziFactors.push({ name: 'Lục Hại', description: 'Dễ có những tổn thương ngầm, cản trở nhau.', score: -15, isFavorable: false });
    if (p1ChiInteraction.isTuongHinh) baziFactors.push({ name: 'Tương Hình', description: 'Tuổi hình phạt lẫn nhau, thường khắc khẩu.', score: -15, isFavorable: false });
    if (p1ChiInteraction.isTuongPha) baziFactors.push({ name: 'Tương Phá', description: 'Dễ phá ngang, làm giảm phúc lợi của nhau.', score: -10, isFavorable: false });
    
    if (baziFactors.length === 0) {
      baziFactors.push({ name: 'Bình Hòa', description: 'Trạng thái cân bằng, không hợp không khắc.', score: 0, isFavorable: true });
    }
  }

  const baziSystem: SystemSynastryResult = {
    system: 'bazi',
    score: baziScore,
    factors: baziFactors,
    isAvailable: true
  };

  // Future features
  const tuviSystem: SystemSynastryResult = { system: 'tuvi', score: 50, factors: [], isAvailable: false };
  const chiemtinhSystem: SystemSynastryResult = { system: 'chiemtinh', score: 50, factors: [], isAvailable: false };

  // Calculate Overall
  let validSystems = 0;
  let totalScore = 0;

  [numerologySystem, baziSystem, tuviSystem, chiemtinhSystem].forEach(sys => {
    if (sys.isAvailable) {
      validSystems++;
      totalScore += sys.score;
    }
  });

  const overallScore = validSystems > 0 ? Math.round(totalScore / validSystems) : 50;

  return {
    overallScore,
    verdict: getSynastryVerdict(overallScore),
    systems: [baziSystem, numerologySystem, tuviSystem, chiemtinhSystem]
  };
}
