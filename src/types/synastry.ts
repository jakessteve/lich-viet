
export type SynastryVerdict = 'Đại Cát' | 'Tiểu Cát' | 'Bình Hòa' | 'Tiểu Hung' | 'Đại Hung';

export interface SynastryFactor {
  name: string;
  description: string;
  score: number; // typically -10 to +10, or 0-100 depending on normalization
  isFavorable: boolean;
}

export interface SystemSynastryResult {
  system: 'bazi' | 'tuvi' | 'numerology' | 'chiemtinh';
  score: number; // 0-100 subsystem consensus
  factors: SynastryFactor[];
  isAvailable: boolean;
}

export interface SynastryResult {
  overallScore: number; // 0-100 overall compatibility
  verdict: SynastryVerdict;
  systems: SystemSynastryResult[];
}
