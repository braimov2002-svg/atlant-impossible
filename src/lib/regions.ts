/**
 * Uzbekistan's agricultural regions (administrative centres) and the global
 * agro-tech hubs drawn as "technology transfer" arcs on the hero globe.
 * Crop / focus notes are general agronomic facts per region, not company data.
 */
export type RegionId =
  | "tashkent"
  | "samarkand"
  | "fergana"
  | "andijan"
  | "namangan"
  | "bukhara"
  | "navoi"
  | "kashkadarya"
  | "surkhandarya"
  | "jizzakh"
  | "syrdarya"
  | "khorezm"
  | "karakalpakstan";

export interface AgroRegion {
  id: RegionId;
  name: string;
  center: string;
  lat: number;
  lon: number;
  crops: string[];
  focus: string;
  /** Major nodes get a permanent label on the globe. */
  major?: boolean;
  hq?: boolean;
}

export const REGIONS: AgroRegion[] = [
  { id: "tashkent", name: "Toshkent", center: "Toshkent", lat: 41.2995, lon: 69.2401, crops: ["Issiqxona sabzavotlari", "Mevali bog‘lar"], focus: "Bosh ofis · sanoat issiqxonalari klasteri", major: true, hq: true },
  { id: "samarkand", name: "Samarqand", center: "Samarqand", lat: 39.6542, lon: 66.9597, crops: ["Uzum", "Mevali bog‘lar", "Sabzavot"], focus: "Intensiv bog‘dorchilik va uzumchilik", major: true },
  { id: "fergana", name: "Farg‘ona", center: "Farg‘ona", lat: 40.3894, lon: 71.7864, crops: ["Paxta", "Bog‘dorchilik", "Pillachilik"], focus: "Yer resursi cheklangan — intensiv texnologiyalar", major: true },
  { id: "andijan", name: "Andijon", center: "Andijon", lat: 40.7821, lon: 72.3442, crops: ["Paxta", "G‘alla", "Meva-sabzavot"], focus: "Yuqori zichlikdagi sug‘oriladigan yerlar" },
  { id: "namangan", name: "Namangan", center: "Namangan", lat: 40.9983, lon: 71.6726, crops: ["Bog‘dorchilik", "Uzum", "Gulchilik"], focus: "Bog‘ va issiqxona xo‘jaliklari" },
  { id: "bukhara", name: "Buxoro", center: "Buxoro", lat: 39.7747, lon: 64.4286, crops: ["Paxta", "G‘alla", "Poliz"], focus: "Suv tanqisligi — tomchilatib sug‘orish ustuvor", major: true },
  { id: "navoi", name: "Navoiy", center: "Navoiy", lat: 40.0844, lon: 65.3792, crops: ["G‘alla", "Paxta"], focus: "Qurg‘oqchil zona — suv tejovchi yechimlar" },
  { id: "kashkadarya", name: "Qashqadaryo", center: "Qarshi", lat: 38.8606, lon: 65.7891, crops: ["G‘alla", "Paxta"], focus: "Keng maydonli aylanma (pivot) sug‘orish" },
  { id: "surkhandarya", name: "Surxondaryo", center: "Termiz", lat: 37.2242, lon: 67.2783, crops: ["Erta sabzavot", "Anor", "Paxta"], focus: "Issiq iqlim — erta hosil va eksport" },
  { id: "jizzakh", name: "Jizzax", center: "Jizzax", lat: 40.1158, lon: 67.8422, crops: ["G‘alla", "Paxta"], focus: "Yangi o‘zlashtirilgan yerlar" },
  { id: "syrdarya", name: "Sirdaryo", center: "Guliston", lat: 40.4897, lon: 68.7842, crops: ["Paxta", "G‘alla"], focus: "Sho‘rlanishga qarshi melioratsiya" },
  { id: "khorezm", name: "Xorazm", center: "Urganch", lat: 41.55, lon: 60.6333, crops: ["Sholi", "Poliz", "Paxta"], focus: "Amudaryo quyi oqimi — suvni tejash" },
  { id: "karakalpakstan", name: "Qoraqalpog‘iston", center: "Nukus", lat: 42.46, lon: 59.61, crops: ["Sholi", "Paxta"], focus: "Tuproq sho‘rlanishi va Orol muammosi" },
];

export const HQ = REGIONS[0];

/** Centre of Uzbekistan's farmland — where the globe comes to rest. */
export const UZ_FOCUS = { lat: 40.4, lon: 66.2 };

export interface TechHub {
  name: string;
  tech: string;
  lat: number;
  lon: number;
}

export const TECH_HUBS: TechHub[] = [
  { name: "Niderlandiya", tech: "Issiqxona texnologiyalari", lat: 52.0, lon: 4.2 },
  { name: "Isroil", tech: "Tomchilatib sug‘orish", lat: 31.5, lon: 34.8 },
  { name: "Ispaniya", tech: "Intensiv sabzavotchilik", lat: 36.84, lon: -2.46 },
  { name: "Turkiya", tech: "Issiqxona qurilishi", lat: 36.9, lon: 30.7 },
  { name: "Xitoy", tech: "Agro-robototexnika", lat: 36.86, lon: 118.73 },
  { name: "BAA", tech: "Agro-investitsiyalar", lat: 25.2, lon: 55.27 },
];
