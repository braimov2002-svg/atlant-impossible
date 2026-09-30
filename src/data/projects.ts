/**
 * Project portfolio — language-neutral facts + the procedural 3D model spec.
 * Localised names/descriptions live in the dictionary under `projectsText[id]`.
 *
 * ⚠ SAMPLE DATA: agcg.uz was unreachable when this was built. Every entry is
 * flagged `sample: true` and badged "Namuna" in the UI — replace with the
 * real portfolio (and flip the flag) before launch.
 */
export type ProjectType = "residential" | "commercial" | "industrial" | "infrastructure";
export type ProjectStatus = "completed" | "ongoing";
export type BuildingKind = "twist-tower" | "twin-residential" | "stepped-office" | "industrial" | "courtyard" | "bridge";

export interface BuildingSpec {
  kind: BuildingKind;
  /** Floors rendered in 3D (visual, capped for performance) */
  floors: number;
  seed: number;
  /** Total twist in radians (twist-tower only) */
  twist?: number;
}

export interface Project {
  id: string;
  type: ProjectType;
  status: ProjectStatus;
  cityId: string;
  lat: number;
  lon: number;
  floors: number;
  areaM2: number;
  heightM: number;
  year: number;
  featured?: boolean;
  sample: true;
  spec: BuildingSpec;
}

export const PROJECTS: Project[] = [
  { id: "atlant-tower", type: "commercial", status: "ongoing", cityId: "tashkent", lat: 41.3375, lon: 69.335, floors: 48, areaM2: 118_000, heightM: 212, year: 2026, featured: true, sample: true, spec: { kind: "twist-tower", floors: 48, seed: 1, twist: 1.35 } },
  { id: "luxury-residence", type: "residential", status: "completed", cityId: "tashkent", lat: 41.3647, lon: 69.289, floors: 24, areaM2: 64_000, heightM: 86, year: 2024, featured: true, sample: true, spec: { kind: "twin-residential", floors: 24, seed: 2 } },
  { id: "samarkand-plaza", type: "commercial", status: "completed", cityId: "samarkand", lat: 39.6542, lon: 66.9597, floors: 12, areaM2: 28_500, heightM: 54, year: 2022, featured: true, sample: true, spec: { kind: "stepped-office", floors: 12, seed: 3 } },
  { id: "sergeli-overpass", type: "infrastructure", status: "completed", cityId: "tashkent", lat: 41.227, lon: 69.221, floors: 0, areaM2: 16_000, heightM: 14, year: 2023, featured: true, sample: true, spec: { kind: "bridge", floors: 0, seed: 4 } },
  { id: "industrial-park", type: "industrial", status: "completed", cityId: "chirchiq", lat: 41.4689, lon: 69.5822, floors: 2, areaM2: 42_000, heightM: 18, year: 2021, featured: true, sample: true, spec: { kind: "industrial", floors: 2, seed: 5 } },
  { id: "bukhara-hotel", type: "commercial", status: "completed", cityId: "bukhara", lat: 39.7747, lon: 64.4286, floors: 5, areaM2: 18_400, heightM: 22, year: 2023, sample: true, spec: { kind: "courtyard", floors: 5, seed: 6 } },
  { id: "fergana-riverside", type: "residential", status: "ongoing", cityId: "fergana", lat: 40.3894, lon: 71.7864, floors: 16, areaM2: 51_000, heightM: 58, year: 2026, sample: true, spec: { kind: "twin-residential", floors: 16, seed: 7 } },
  { id: "yakkasaroy-tower", type: "commercial", status: "completed", cityId: "tashkent", lat: 41.288, lon: 69.253, floors: 30, areaM2: 46_000, heightM: 128, year: 2020, sample: true, spec: { kind: "twist-tower", floors: 30, seed: 8, twist: 0.6 } },
  { id: "olmazor-medical", type: "commercial", status: "ongoing", cityId: "tashkent", lat: 41.346, lon: 69.214, floors: 9, areaM2: 22_000, heightM: 38, year: 2026, sample: true, spec: { kind: "stepped-office", floors: 9, seed: 9 } },
  { id: "nukus-logistics", type: "industrial", status: "ongoing", cityId: "nukus", lat: 42.46, lon: 59.61, floors: 1, areaM2: 36_000, heightM: 14, year: 2026, sample: true, spec: { kind: "industrial", floors: 1, seed: 10 } },
];

export const PROJECT_TYPES: ProjectType[] = ["residential", "commercial", "industrial", "infrastructure"];

export interface City {
  id: string;
  lat: number;
  lon: number;
}

/** Administrative / industrial centres used by the map and the about-page footprint. */
export const CITIES: City[] = [
  { id: "tashkent", lat: 41.2995, lon: 69.2401 },
  { id: "chirchiq", lat: 41.4689, lon: 69.5822 },
  { id: "samarkand", lat: 39.6542, lon: 66.9597 },
  { id: "bukhara", lat: 39.7747, lon: 64.4286 },
  { id: "fergana", lat: 40.3894, lon: 71.7864 },
  { id: "namangan", lat: 40.9983, lon: 71.6726 },
  { id: "andijan", lat: 40.7821, lon: 72.3442 },
  { id: "nukus", lat: 42.46, lon: 59.61 },
  { id: "karshi", lat: 38.8606, lon: 65.7891 },
  { id: "termez", lat: 37.2242, lon: 67.2783 },
  { id: "urgench", lat: 41.55, lon: 60.6333 },
  { id: "navoi", lat: 40.0844, lon: 65.3792 },
];

export const TASHKENT = CITIES[0];
