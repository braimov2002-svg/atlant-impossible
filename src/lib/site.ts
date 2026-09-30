/**
 * Company contact data. agcg.uz was not reachable while this was built, so
 * only verified-safe values are filled in. Anything left `null` is hidden in
 * the UI until you add the real value.
 */
export const site = {
  name: "Agro Global Consulting Group",
  shortName: "AGCG",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://agcg.uz",
  office: {
    /** Tashkent — used for the 3D map pin */
    lat: 41.2995,
    lon: 69.2401,
    // TODO(agcg): street address, e.g. "Toshkent sh., … ko‘chasi, …-uy"
    address: null as string | null,
  },
  // TODO(agcg): fill in real contacts
  phone: null as string | null,
  email: null as string | null,
  telegram: null as string | null,
  instagram: null as string | null,
} as const;
