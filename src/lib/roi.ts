/**
 * Indicative ROI / yield model behind the calculator widget.
 *
 * Every coefficient below is a planning-grade assumption for Uzbekistan
 * (yields, prices and capex per hectare) — tune them with AGCG agronomists.
 * The model is pure and framework-free so it can run on the server, in a
 * worker or in unit tests.
 */
export type CropType = "greenhouse" | "cotton" | "grain" | "orchard";
export type WaterSource = "canal" | "well" | "reservoir";

interface CropProfile {
  /** Baseline yield, t/ha/yr */
  baseYield: number;
  /** Farm-gate price, USD/t */
  price: number;
  /** Smart-system capex, USD/ha (before scale discount) */
  capexPerHa: number;
  /** Relative yield increase from the upgrade */
  yieldBoost: number;
  /** Relative water saving */
  waterSaving: number;
  /** Opex saving (water, energy, fertiliser, labour), USD/ha/yr */
  opexSavingPerHa: number;
  /** Seasonal water demand, m³/ha/yr (baseline) */
  waterPerHa: number;
  /** Months from install to first improved harvest */
  rampUpMonths: number;
  /** Largest sensible project area, ha */
  maxArea: number;
}

export const CROP_PROFILES: Record<CropType, CropProfile> = {
  greenhouse: { baseYield: 160, price: 620, capexPerHa: 140_000, yieldBoost: 0.45, waterSaving: 0.55, opexSavingPerHa: 9_500, waterPerHa: 12_000, rampUpMonths: 4, maxArea: 60 },
  cotton: { baseYield: 3.2, price: 560, capexPerHa: 2_300, yieldBoost: 0.33, waterSaving: 0.4, opexSavingPerHa: 190, waterPerHa: 9_500, rampUpMonths: 6, maxArea: 2_000 },
  grain: { baseYield: 5.2, price: 260, capexPerHa: 1_450, yieldBoost: 0.26, waterSaving: 0.35, opexSavingPerHa: 95, waterPerHa: 5_500, rampUpMonths: 7, maxArea: 2_000 },
  orchard: { baseYield: 22, price: 430, capexPerHa: 4_200, yieldBoost: 0.4, waterSaving: 0.45, opexSavingPerHa: 320, waterPerHa: 8_000, rampUpMonths: 10, maxArea: 1_000 },
};

interface WaterProfile {
  /** Capex multiplier (pumps, filtration, storage) */
  capexFactor: number;
  /** Extra efficiency when water is pumped (energy cost makes every m³ count) */
  savingBonus: number;
  /** Extra opex saving multiplier — pumping energy saved */
  opexFactor: number;
}

export const WATER_PROFILES: Record<WaterSource, WaterProfile> = {
  canal: { capexFactor: 1, savingBonus: 0, opexFactor: 1 },
  well: { capexFactor: 1.16, savingBonus: 0.04, opexFactor: 1.35 },
  reservoir: { capexFactor: 1.07, savingBonus: 0.02, opexFactor: 1.12 },
};

export interface RoiInput {
  areaHa: number;
  crop: CropType;
  water: WaterSource;
}

export interface RoiResult {
  yieldBoostPct: number;
  waterSavedPct: number;
  waterSavedM3: number;
  capex: number;
  annualGain: number;
  paybackMonths: number;
  /** Cumulative cash position per month, 0..60 */
  cashflow: number[];
}

export const AREA_LIMITS = { min: 1, max: 2000 } as const;

export function calculateRoi({ areaHa, crop, water }: RoiInput): RoiResult {
  const c = CROP_PROFILES[crop];
  const w = WATER_PROFILES[water];
  const area = Math.min(c.maxArea, Math.max(AREA_LIMITS.min, areaHa));

  // Economies of scale: ~12% cheaper per 10× area, floored at 55% of list price.
  const scale = Math.max(0.55, 1 - 0.12 * Math.log10(area));
  const capex = c.capexPerHa * area * scale * w.capexFactor;

  const extraRevenue = c.baseYield * c.yieldBoost * c.price * area;
  const opexSaving = c.opexSavingPerHa * area * w.opexFactor;
  const annualGain = extraRevenue + opexSaving;
  const monthlyGain = annualGain / 12;

  const waterSaving = Math.min(0.75, c.waterSaving + w.savingBonus);

  // Payback accounts for the ramp-up period with no improved harvest yet.
  const paybackMonths = Math.ceil(c.rampUpMonths + capex / monthlyGain);

  const cashflow = Array.from({ length: 61 }, (_, m) =>
    -capex + Math.max(0, m - c.rampUpMonths) * monthlyGain,
  );

  return {
    yieldBoostPct: Math.round(c.yieldBoost * 100),
    waterSavedPct: Math.round(waterSaving * 100),
    waterSavedM3: c.waterPerHa * waterSaving * area,
    capex,
    annualGain,
    paybackMonths,
    cashflow,
  };
}
