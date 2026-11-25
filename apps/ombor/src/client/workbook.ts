import { excelDate, type Cell, type SheetRow } from './xlsx';

export interface ImportObject { name: string; prefix: string }
export interface ImportItem { name: string; unit: string; qty: number; place: string; work: string; ordered_by: string; executor: string }
export interface ImportRequest { number: string; date: string; object: string; items: ImportItem[] }
export interface ImportReceipt {
  import_key: string; date: string; code: string; object: string; name: string; unit: string; qty: number;
  price: number | null; supplier: string; buyer: string; contract_no: string; invoice_no: string; vehicle: string;
  vehicle_date: string | null; currency: string; note: string;
}
export interface Workbook { objects: ImportObject[]; requests: ImportRequest[]; receipts: ImportReceipt[] }

const str = (v: Cell) => (v === null ? '' : String(v).replace(/\s+/g, ' ').trim());
const numOf = (v: Cell) => (typeof v === 'number' ? v : Number(String(v ?? '').replace(/\s/g, '').replace(',', '.')));

const ALIAS: Record<string, [object: string, prefix: string]> = {
  sheron: ['Шерон', 'SHERON'], шерон: ['Шерон', 'SHERON'],
  kuchlik: ['Кучлик', 'KUCHLIK'], кучлик: ['Кучлик', 'KUCHLIK'],
};

/**
 * The workbook's «Код материала» column holds either a request number or an
 * object name. The owner's rule: АС-… and «Балтон» are one object (Балтон);
 * SHERON… and «Шерон» are one object (Шерон); every other name is its own
 * object. A name followed by a number is a request of that object:
 * АС-001-10-2025, SHERON 004, BURGER KING 001.
 */
export function readCode(code: string): { object: string; prefix: string; request: string | null } {
  const c = code.replace(/\s+/g, ' ').trim();
  if (!c) return { object: '', prefix: 'АС', request: null };
  if (/^[АA][СC]-/i.test(c)) return { object: 'Балтон', prefix: 'АС', request: c.replace(/^[АA][СC]/i, 'АС') };
  if (/^балтон$/i.test(c)) return { object: 'Балтон', prefix: 'АС', request: null };
  const m = /^(.*?\D)\s*(\d{3})$/.exec(c); // "NAME 004"
  const name = (m ? m[1] : c).trim();
  const [object, prefix] = ALIAS[name.toLowerCase()] ?? [name, m ? name.toUpperCase() : 'АС'];
  return { object, prefix, request: m ? `${prefix} ${m[2]}` : null };
}

/** Turns the «Приход» and «заявка» sheets into what the server imports. */
export function mapWorkbook(prihod: SheetRow[], zayavka: SheetRow[]): Workbook {
  const objects = new Map<string, ImportObject>();
  const requests = new Map<string, ImportRequest>();
  const receipts: ImportReceipt[] = [];
  const seen = new Map<string, number>();
  const noteObject = (o: { object: string; prefix: string }) => {
    if (o.object && !objects.has(o.object.toLowerCase())) objects.set(o.object.toLowerCase(), { name: o.object, prefix: o.prefix });
  };
  const requestFor = (number: string, date: string, object: string) => {
    let r = requests.get(number);
    if (!r) requests.set(number, (r = { number, date, object, items: [] }));
    if (date < r.date) r.date = date;
    return r;
  };

  // «заявка»: what was asked for.
  for (const { cells: c } of zayavka) {
    const date = excelDate(c[0]);
    const code = readCode(str(c[2]));
    const name = str(c[3]);
    const qty = numOf(c[5]);
    if (!date || !code.request || !name || !Number.isFinite(qty)) continue;
    noteObject(code);
    requestFor(code.request, date, code.object).items.push({
      name, unit: str(c[4]), qty, place: str(c[6]), work: str(c[7]), ordered_by: str(c[1]), executor: str(c[13]),
    });
  }

  // «Приход»: what arrived. Data starts under the header row.
  const header = prihod.findIndex((r) => str(r.cells[0]).toLowerCase() === 'дата' && str(r.cells[2]).toLowerCase() === 'наименование');
  const fromSheet = new Set([...requests.values()].flatMap((r) => r.items.map((i) => `${r.number}|${i.name.toLowerCase()}`)));
  for (const { cells: c } of prihod.slice(header + 1)) {
    const date = excelDate(c[0]);
    const name = str(c[2]);
    const qty = numOf(c[4]);
    if (!date || !name || !Number.isFinite(qty) || qty <= 0) continue;
    const code = readCode(str(c[1]));
    noteObject(code);
    const total = numOf(c[6]);
    const price = typeof c[5] === 'number' && c[5] > 0 ? c[5] : Number.isFinite(total) && total > 0 ? total / qty : null;
    const row = {
      date, code: code.request ?? str(c[1]), object: code.object, name, unit: str(c[3]), qty, price,
      supplier: str(c[7]), buyer: str(c[8]), contract_no: str(c[10]), invoice_no: str(c[11]), vehicle: str(c[12]),
      vehicle_date: excelDate(c[13]), currency: str(c[14]) || 'UZS', note: str(c[15]),
    };
    // Identical rows are told apart by their order, so a second import adds nothing.
    const base = [row.date, row.code, row.name, row.qty, row.price ?? '', row.supplier, row.invoice_no].join('|');
    const nth = (seen.get(base) ?? 0) + 1;
    seen.set(base, nth);
    receipts.push({ ...row, import_key: `${base}|#${nth}` });

    // A numbered code is a request. If the «заявка» sheet did not list this
    // material, the request line is what arrived.
    if (code.request) {
      const r = requestFor(code.request, date, code.object);
      if (!fromSheet.has(`${r.number}|${name.toLowerCase()}`)) {
        const item = r.items.find((i) => i.name.toLowerCase() === name.toLowerCase());
        if (item) item.qty += qty;
        else r.items.push({ name, unit: row.unit, qty, place: '', work: '', ordered_by: '', executor: row.buyer });
      }
    }
  }
  return { objects: [...objects.values()], requests: [...requests.values()], receipts };
}
