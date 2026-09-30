/**
 * Cost & timeline estimator — pure, framework-free model behind the widget.
 *
 * Coefficients are planning-grade assumptions for Uzbekistan (USD, 2026) and
 * warranty terms are placeholders for Atlant's contractual policy — tune both
 * with the estimating department before launch.
 */
export type EstimateType = "residential" | "commercial" | "industrial";
export type FinishLevel = "standard" | "premium" | "luxury";

interface TypeProfile {
  /** Fixed months (design, permits, mobilisation) */
  baseMonths: number;
  /** Months added per √(1000 m²) — duration grows sub-linearly with area */
  monthsPerSqrtK: number;
  /** Cost per m² by finish level, USD */
  costPerM2: Record<FinishLevel, number>;
  /** Share of the programme each stage occupies: [start, end] as 0..1 */
  stages: Record<StageKey, [number, number]>;
}

export type StageKey = "design" | "permits" | "foundation" | "frame" | "mep" | "facade" | "finishing" | "handover";

export const STAGE_ORDER: StageKey[] = ["design", "permits", "foundation", "frame", "mep", "facade", "finishing", "handover"];

const BUILDING_STAGES: TypeProfile["stages"] = {
  design: [0, 0.14],
  permits: [0.08, 0.18],
  foundation: [0.16, 0.3],
  frame: [0.28, 0.62],
  mep: [0.45, 0.82],
  facade: [0.55, 0.84],
  finishing: [0.7, 0.96],
  handover: [0.94, 1],
};

export const TYPE_PROFILES: Record<EstimateType, TypeProfile> = {
  residential: { baseMonths: 8, monthsPerSqrtK: 3.2, costPerM2: { standard: 380, premium: 560, luxury: 850 }, stages: BUILDING_STAGES },
  commercial: { baseMonths: 10, monthsPerSqrtK: 3.6, costPerM2: { standard: 450, premium: 680, luxury: 1_000 }, stages: BUILDING_STAGES },
  industrial: {
    baseMonths: 6,
    monthsPerSqrtK: 2.2,
    costPerM2: { standard: 300, premium: 380, luxury: 480 },
    stages: { ...BUILDING_STAGES, frame: [0.26, 0.55], facade: [0.45, 0.72], finishing: [0.66, 0.95] },
  },
};

export const FINISH_FACTORS: Record<FinishLevel, { time: number; finishingWarranty: number }> = {
  standard: { time: 1, finishingWarranty: 2 },
  premium: { time: 1.15, finishingWarranty: 3 },
  luxury: { time: 1.3, finishingWarranty: 5 },
};

export const AREA_LIMITS = { min: 500, max: 150_000, step: 500 } as const;

export interface EstimateInput {
  type: EstimateType;
  areaM2: number;
  finish: FinishLevel;
}

export interface Estimate {
  months: number;
  costLow: number;
  costHigh: number;
  warranty: { structure: number; systems: number; finishing: number };
  stages: { key: StageKey; startMonth: number; endMonth: number }[];
}

export function estimate({ type, areaM2, finish }: EstimateInput): Estimate {
  const p = TYPE_PROFILES[type];
  const f = FINISH_FACTORS[finish];
  const area = Math.min(AREA_LIMITS.max, Math.max(AREA_LIMITS.min, areaM2));

  const months = Math.round((p.baseMonths + p.monthsPerSqrtK * Math.sqrt(area / 1000)) * f.time);
  // Larger sites buy materials cheaper: −8% per 10× area, floored at −15%.
  const scale = Math.max(0.85, 1 - 0.08 * Math.log10(area / 1000 + 1));
  const unit = p.costPerM2[finish] * scale;

  return {
    months,
    costLow: area * unit * 0.9,
    costHigh: area * unit * 1.1,
    warranty: { structure: 15, systems: 5, finishing: f.finishingWarranty },
    stages: STAGE_ORDER.map((key) => {
      const [a, b] = p.stages[key];
      return { key, startMonth: a * months, endMonth: b * months };
    }),
  };
}
