import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Uzbek number formatting uses a (narrow) space as the thousands separator. */
export function formatNumber(value: number, fractionDigits = 0) {
  return new Intl.NumberFormat("uz-UZ", {
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
  })
    .format(value)
    .replace(/ |,/g, " ");
}

export function formatUsd(value: number) {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(value >= 10_000_000 ? 0 : 1)}M`;
  if (value >= 10_000) return `$${Math.round(value / 1000)}K`;
  return `$${formatNumber(Math.round(value))}`;
}
