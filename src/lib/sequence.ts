/*
 * Hero image sequences (rendered by scripts/render-sequence.mjs into
 * public/sequence/<aspect>/0001.webp …). Swap in real CGI or drone frames by
 * replacing the files and updating `frames`/size here.
 */
export interface SequenceSource {
  path: string;
  frames: number;
  width: number;
  height: number;
  ext: "webp" | "jpg" | "avif";
}

export const SEQUENCES = {
  landscape: { path: "/sequence/landscape", frames: 100, width: 1440, height: 810, ext: "webp" },
  portrait: { path: "/sequence/portrait", frames: 90, width: 720, height: 1280, ext: "webp" },
} satisfies Record<string, SequenceSource>;

/** Viewports narrower than 4:5 get the portrait cut. Keep in sync with the poster <source media>. */
export const PORTRAIT_QUERY = "(max-aspect-ratio: 4/5)";

export const frameUrl = (s: SequenceSource, i: number) => `${s.path}/${String(i + 1).padStart(4, "0")}.${s.ext}`;

/**
 * Chapter boundaries in hero progress (0…1), matched to the rendered timeline:
 * site → foundation → frame → envelope → landscaping → interior.
 */
export const CHAPTER_STARTS = [0, 0.08, 0.16, 0.37, 0.61, 0.8] as const;

export function chapterAt(p: number) {
  let i = 0;
  while (i + 1 < CHAPTER_STARTS.length && p >= CHAPTER_STARTS[i + 1]) i++;
  return i;
}
