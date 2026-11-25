import writeXlsxFile from 'write-excel-file';
import type { Receipt, RequestDetail } from '../shared/types';
import { api, qs } from './api';
import { latinName } from './filename';
import type { Tr } from './i18n';
import { mapWorkbook, type Workbook } from './workbook';
import { readSheets } from './xlsx';

type Out = { value: string | number | Date | null; type?: unknown; format?: string; fontWeight?: 'bold' } | null;
const head = (labels: string[]): Out[] => labels.map((value) => ({ value, fontWeight: 'bold' }));
const day = (iso: string | null): Out =>
  iso ? { value: new Date(`${iso.slice(0, 10)}T00:00:00Z`), type: Date, format: 'dd.mm.yyyy' } : null;
const number = (value: number | null, format = '#,##0.00'): Out => (value === null ? null : { value, type: Number, format });
const save = (rows: Out[][], widths: number[], fileName: string) =>
  writeXlsxFile(rows as never, { columns: widths.map((width) => ({ width })), fileName });

/** One request as an Excel sheet. */
export async function exportRequest(id: number, t: Tr) {
  const r = await api<RequestDetail>('GET', `/requests/${id}`);
  const rows: Out[][] = [
    head([`${t('number')} ${r.number}`, '', `${t('object')}: ${r.object ?? ''}`, '', `${t('date')}:`]).concat([day(r.date)]),
    [],
    head(['№', t('item_name'), t('unit'), t('asked'), t('arrived'), t('left'), t('place'), t('work'), t('ordered_by'), t('spec'), t('executor')]),
    ...r.items.map((it, i): Out[] => [
      number(i + 1, '0'), { value: it.name }, { value: it.unit }, number(it.qty, '#,##0.###'), number(it.received, '#,##0.###'),
      number(Math.max(0, it.qty - it.received), '#,##0.###'), { value: it.place }, { value: it.work }, { value: it.ordered_by },
      { value: it.spec }, { value: it.executor },
    ]),
  ];
  await save(rows, [6, 44, 10, 12, 12, 12, 22, 22, 18, 18, 18], latinName(`Заявка ${r.number}`, 'xlsx'));
}

/** The receipts journal for a period, in the columns of the old workbook. */
export async function exportReceipts(filter: Record<string, string | number | null | undefined>, t: Tr, name: string) {
  const { rows } = await api<{ rows: Receipt[] }>('GET', `/receipts${qs({ ...filter, limit: 20000 })}`);
  const out: Out[][] = [
    head([t('date'), t('code'), t('object'), t('name'), t('unit'), t('qty'), t('price'), t('sum'), t('supplier'), t('buyer'),
      t('contract_no'), t('invoice_no'), t('vehicle'), t('vehicle_date'), t('note')]),
    ...rows.map((x): Out[] => [
      day(x.date), { value: x.code }, { value: x.object ?? '' }, { value: x.name }, { value: x.unit }, number(x.qty, '#,##0.###'),
      number(x.price), number(x.price === null ? null : x.qty * x.price), { value: x.supplier ?? '' }, { value: x.buyer },
      { value: x.contract_no }, { value: x.invoice_no }, { value: x.vehicle }, day(x.vehicle_date), { value: x.note },
    ]),
    [],
    [null, null, null, { value: t('total'), fontWeight: 'bold' }, null, null, null,
      number(rows.reduce((a, x) => a + x.qty * (x.price ?? 0), 0))],
  ];
  await save(out, [12, 18, 18, 44, 8, 10, 14, 16, 30, 16, 18, 14, 16, 12, 24], latinName(name, 'xlsx'));
}

/** Reads the old workbook in the browser. Throws 'bad_file' without a «Приход» sheet. */
export async function parseWorkbook(file: File): Promise<Workbook> {
  const sheets = readSheets(new Uint8Array(await file.arrayBuffer()), ['Приход', 'заявка']);
  if (!sheets['Приход']) throw new Error('bad_file');
  return mapWorkbook(sheets['Приход'], sheets['заявка'] ?? []);
}

/** Sends the workbook to the server in parts; returns how much was new. */
export async function uploadWorkbook(w: Workbook, progress: (done: number, total: number) => void) {
  const total = w.requests.length + w.receipts.length;
  let done = 0;
  let requests = 0;
  let receipts = 0;
  await api('POST', '/import/objects', { objects: w.objects });
  for (let i = 0; i < w.requests.length; i += 25) {
    const part = w.requests.slice(i, i + 25);
    requests += (await api('POST', '/import/requests', { requests: part })).created;
    progress((done += part.length), total);
  }
  for (let i = 0; i < w.receipts.length; i += 200) {
    const part = w.receipts.slice(i, i + 200);
    receipts += (await api('POST', '/import/receipts', { rows: part })).created;
    progress((done += part.length), total);
  }
  await api('POST', '/import/finish');
  return { requests, receipts };
}
