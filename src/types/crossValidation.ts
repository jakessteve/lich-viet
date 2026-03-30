
export type ACSComputationTier = '2/4' | '4/4';
export type ACSVerdict = 'Rất Tốt' | 'Tốt' | 'Bình Thường' | 'Cẩn Thận' | 'Tránh';

export interface SystemScore {
  score: number; // 0-100
  weight: number; // 0-1 (sums to 1)
  flags: string[];
  isAvailable: boolean;
}

export interface ACSBreakdown {
  bazi: SystemScore;
  tuvi: SystemScore;
  transit: SystemScore;
  numerology: SystemScore;
}

export interface ACSResult {
  score: number; // 0-100 overall consensus score
  verdict: ACSVerdict;
  tier: ACSComputationTier;
  breakdown: ACSBreakdown;
}

export interface ACSWeights {
  bazi: number;
  tuvi: number;
  transit: number;
  numerology: number;
}

// 2/4 Degraded parameters
export const DEGRADED_WEIGHTS: ACSWeights = {
  bazi: 0.67,
  numerology: 0.33,
  tuvi: 0,
  transit: 0
};

// 4/4 Full parameters
export const FULL_WEIGHTS: ACSWeights = {
  bazi: 0.30,
  tuvi: 0.30,
  transit: 0.25,
  numerology: 0.15
};
