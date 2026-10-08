import "server-only";
import { defaultLocale, isLocale } from "./config";
import type { Dictionary } from "./dictionaries/uz";

/**
 * Lazy per-locale dictionaries. Adding Russian or English = create
 * dictionaries/ru.ts satisfying `Dictionary`, register it here and in config.ts.
 */
const dictionaries = {
  uz: () => import("./dictionaries/uz").then((m) => m.default),
} satisfies Record<string, () => Promise<Dictionary>>;

export async function getDictionary(locale: string): Promise<Dictionary> {
  return dictionaries[isLocale(locale) ? locale : defaultLocale]();
}
