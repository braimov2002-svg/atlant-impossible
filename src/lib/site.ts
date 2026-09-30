/**
 * Company contact data. agcg.uz was not reachable while this was built, so
 * only safe values are filled in. Anything `null` is hidden in the UI until
 * the real value is added.
 */
export const site = {
  name: "Atlant Construction Group",
  shortName: "Atlant",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://agcg.uz",
  office: {
    lat: 41.2995,
    lon: 69.2401,
    // TODO(atlant): street address
    address: null as string | null,
  },
  // TODO(atlant): real contacts
  phone: null as string | null,
  email: null as string | null,
  telegram: null as string | null,
} as const;
