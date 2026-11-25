import { strFromU8, unzipSync } from 'fflate';

export type Cell = string | number | null;
/** One worksheet row: its 1-based number and the cells of its first columns. */
export type SheetRow = { n: number; cells: Cell[] };

const ENT: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" };
const decode = (s: string) =>
  s.includes('&')
    ? s.replace(/&(#x?[0-9a-fA-F]+|\w+);/g, (m, e: string) =>
        e[0] === '#' ? String.fromCodePoint(e[1] === 'x' ? parseInt(e.slice(2), 16) : Number(e.slice(1))) : (ENT[e] ?? m))
    : s;

const texts = (xml: string) =>
  [...xml.replace(/<rPh[\s\S]*?<\/rPh>/g, '').matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map((m) => decode(m[1])).join('');

const column = (ref: string) => {
  let n = 0;
  for (let i = 0; i < ref.length && ref.charCodeAt(i) >= 65; i++) n = n * 26 + (ref.charCodeAt(i) - 64);
  return n - 1;
};

/**
 * Reads the named sheets of an .xlsx file, keeping the first `maxCols`
 * columns. Written for this app because the company workbook has sheets
 * declared 1 000+ columns wide, which general-purpose readers expand into
 * gigabytes of memory. Dates come back as Excel day numbers (see excelDate).
 */
export function readSheets(file: Uint8Array, names: string[], maxCols = 16): Record<string, SheetRow[]> {
  const book = unzipSync(file, { filter: (f) => f.name === 'xl/workbook.xml' || f.name === 'xl/_rels/workbook.xml.rels' });
  const workbook = strFromU8(book['xl/workbook.xml'] ?? new Uint8Array());
  const rels = strFromU8(book['xl/_rels/workbook.xml.rels'] ?? new Uint8Array());
  const attr = (tag: string, name: string) => decode(new RegExp(`\\b${name}="([^"]*)"`).exec(tag)?.[1] ?? '');

  const paths = new Map<string, string>(); // sheet name -> file inside the archive
  for (const [tag] of workbook.matchAll(/<sheet\b[^>]*>/g)) {
    const rel = [...rels.matchAll(/<Relationship\b[^>]*>/g)].find(([r]) => attr(r, 'Id') === attr(tag, 'r:id'));
    if (rel) paths.set(attr(tag, 'name').trim().toLowerCase(), `xl/${attr(rel[0], 'Target').replace(/^\/?xl\//, '')}`);
  }
  const wanted = names.map((n) => paths.get(n.toLowerCase())).filter((p): p is string => !!p);
  const files = unzipSync(file, { filter: (f) => f.name === 'xl/sharedStrings.xml' || wanted.includes(f.name) });
  const shared = [...strFromU8(files['xl/sharedStrings.xml'] ?? new Uint8Array()).matchAll(/<si>([\s\S]*?)<\/si>/g)].map((m) => texts(m[1]));

  const out: Record<string, SheetRow[]> = {};
  for (const name of names) {
    const data = files[paths.get(name.toLowerCase()) ?? ''];
    if (!data) continue;
    const xml = strFromU8(data);
    const rows: SheetRow[] = [];
    for (const row of xml.matchAll(/<row\b[^>]*?\br="(\d+)"[^>]*>([\s\S]*?)<\/row>/g)) {
      const cells: Cell[] = new Array(maxCols).fill(null);
      let any = false;
      for (const c of row[2].matchAll(/<c\b([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)) {
        const col = column(/\br="([A-Z]+)/.exec(c[1])?.[1] ?? '');
        if (col < 0 || col >= maxCols || c[2] === undefined) continue;
        const type = /\bt="(\w+)"/.exec(c[1])?.[1];
        const v = /<v[^>]*>([\s\S]*?)<\/v>/.exec(c[2])?.[1];
        let value: Cell = null;
        if (type === 'inlineStr') value = texts(c[2]);
        else if (v === undefined || type === 'e') value = null; // empty, or an error such as #REF!
        else if (type === 's') value = shared[Number(v)] ?? null;
        else if (type === 'str') value = decode(v);
        else value = Number.isFinite(Number(v)) ? Number(v) : null;
        if (typeof value === 'string') value = value.trim() || null;
        if (value !== null) any = true;
        cells[col] = value;
      }
      if (any) rows.push({ n: Number(row[1]), cells });
    }
    out[name] = rows;
  }
  return out;
}

/** Excel day number -> YYYY-MM-DD (null if it is not a sensible date). */
export function excelDate(v: Cell): string | null {
  if (typeof v === 'string') {
    const m = /^(\d{1,2})[./](\d{1,2})[./](\d{4})$/.exec(v);
    return m ? `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}` : null;
  }
  if (typeof v !== 'number' || v < 36526 || v > 73050) return null; // years 2000..2100
  return new Date(Date.UTC(1899, 11, 30) + Math.floor(v) * 86400000).toISOString().slice(0, 10);
}
