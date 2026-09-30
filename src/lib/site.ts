/**
 * Company contact data, taken from agcg.uz (via its search-indexed pages;
 * the site itself was not reachable from the build environment). Anything
 * `null` is hidden in the UI until the real value is added.
 */
export const site = {
  name: "Atlant Group of Companies",
  shortName: "Atlant",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://agcg.uz",
  office: {
    // TODO(atlant): exact coordinates of Farg‘ona yo‘li 94 (map pin uses the city centre)
    lat: 41.2995,
    lon: 69.2401,
    address: "Toshkent sh., Mirobod tumani, Farg‘ona yo‘li ko‘chasi, 94-uy",
  },
  phones: ["+998 97 130 50 70", "+998 97 410 50 70", "+998 97 738 67 68"],
  email: "office@agcg.uz" as string | null,
  // TODO(atlant): Telegram / Instagram handles
  telegram: null as string | null,
} as const;

export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;
