export const locales = ["uz"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "uz";

export const localeLabels: Record<Locale, string> = {
  uz: "O‘zbekcha",
};

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);
