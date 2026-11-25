import { strToU8, zipSync } from 'fflate';
import { describe, expect, it } from 'vitest';
import { mapWorkbook, readCode } from '../src/client/workbook';
import { excelDate, readSheets, type Cell } from '../src/client/xlsx';

const rows = (list: Cell[][]) => list.map((cells, i) => ({ n: i + 1, cells: [...cells, ...new Array(16).fill(null)].slice(0, 16) }));

describe('readCode', () => {
  it('groups codes into objects by the owner’s rule', () => {
    expect(readCode('АС-001-10-2025')).toEqual({ object: 'Балтон', prefix: 'АС', request: 'АС-001-10-2025' });
    expect(readCode('AC-007-11-2025').request).toBe('АС-007-11-2025'); // Latin letters typed by mistake
    expect(readCode('Балтон')).toEqual({ object: 'Балтон', prefix: 'АС', request: null });
    expect(readCode('SHERON 004')).toEqual({ object: 'Шерон', prefix: 'SHERON', request: 'SHERON 004' });
    expect(readCode('Шерон')).toMatchObject({ object: 'Шерон', request: null });
    expect(readCode('KUCHLIK')).toMatchObject({ object: 'Кучлик', request: null });
    expect(readCode('BURGER KING 002')).toEqual({ object: 'BURGER KING', prefix: 'BURGER KING', request: 'BURGER KING 002' });
    expect(readCode('KUCHLIK 001')).toEqual({ object: 'Кучлик', prefix: 'KUCHLIK', request: 'KUCHLIK 001' });
    expect(readCode('Балтон Штаб')).toMatchObject({ object: 'Балтон Штаб', request: null });
    expect(readCode('')).toMatchObject({ object: '', request: null });
  });
});

describe('mapWorkbook', () => {
  const prihod = rows([
    [3783],
    ['Дата', 'Код материала', 'Наименование', 'Ед.изм', 'Кол-во', 'Цена с НДС', 'Сумма', 'поставщик'],
    [null, null, null, null, null, null, 0],
    [45957, 'АС-001-10-2025', 'Леска', 'шт', 60],
    [45958, 'АС-001-10-2025', 'Диск', 'шт', 100, 9940, 994000, 'ASBOB SAVDO'],
    [45958, 'АС-001-10-2025', 'Диск', 'шт', 100, 9940, 994000, 'ASBOB SAVDO'],
    [46233, 'SHERON 004', 'Фанера', 'шт', 50, null, 15125000, 'YOGOCH SAVDO'],
    [46233, 'Лукоил', 'Гвоздь', 'кг', 20],
    [46233, 'Лукоил', 'Без количества', 'кг', null],
  ]);
  const zayavka = rows([
    ['Дта', 'Кем заявлено', 'Заявка №', 'Наименование', 'Ед.изм', 'Кол-во'],
    [45957, 'Шерзод', 'АС-001-10-2025', 'Леска', 'шт', 100],
  ]);
  const w = mapWorkbook(prihod, zayavka);

  it('keeps only real rows and works out missing prices from the sum', () => {
    expect(w.receipts).toHaveLength(5);
    expect(w.receipts[0]).toMatchObject({ date: '2025-10-27', code: 'АС-001-10-2025', object: 'Балтон', price: null });
    expect(w.receipts[3]).toMatchObject({ object: 'Шерон', code: 'SHERON 004', price: 302500 });
  });

  it('gives identical rows different keys', () => {
    expect(new Set(w.receipts.map((r) => r.import_key)).size).toBe(5);
    expect(mapWorkbook(prihod, zayavka).receipts.map((r) => r.import_key)).toEqual(w.receipts.map((r) => r.import_key));
  });

  it('builds requests from the sheet and from numbered receipts', () => {
    expect(w.objects.map((o) => o.name).sort()).toEqual(['Балтон', 'Лукоил', 'Шерон']);
    const ac = w.requests.find((r) => r.number === 'АС-001-10-2025')!;
    expect(ac).toMatchObject({ object: 'Балтон', date: '2025-10-27' });
    // Asked 100 on the sheet (60 arrived); the disks were not on the sheet: 2 × 100 arrived.
    expect(ac.items.map((i) => [i.name, i.qty])).toEqual([['Леска', 100], ['Диск', 200]]);
    expect(ac.items[0].ordered_by).toBe('Шерзод');
    expect(w.requests.find((r) => r.number === 'SHERON 004')!.items).toHaveLength(1);
    expect(w.requests).toHaveLength(2); // «Лукоил» is an object, not a request
  });
});

describe('readSheets', () => {
  const sheet = (body: string) => `<worksheet><sheetData>${body}</sheetData></worksheet>`;
  const file = zipSync({
    'xl/workbook.xml': strToU8('<workbook><sheets><sheet name="Приход" sheetId="2" r:id="rId1"/><sheet name="Other" sheetId="3" r:id="rId2"/></sheets></workbook>'),
    'xl/_rels/workbook.xml.rels': strToU8('<Relationships><Relationship Id="rId2" Target="worksheets/sheet2.xml"/><Relationship Id="rId1" Target="worksheets/sheet1.xml"/></Relationships>'),
    'xl/sharedStrings.xml': strToU8('<sst><si><t>Гвоздь &amp; шуруп</t></si><si><r><t>ООО </t></r><r><t>«A»</t></r></si></sst>'),
    'xl/worksheets/sheet1.xml': strToU8(sheet(
      '<row r="1"><c r="A1" s="1"/></row>' +
      '<row r="5" spans="1:16"><c r="A5" s="2"><v>45957</v></c><c r="C5" t="s"><v>0</v></c><c r="E5"><v>1.5</v></c>' +
      '<c r="H5" t="s"><v>1</v></c><c r="J5" t="str"><f>+B5</f><v>АС-1</v></c><c r="K5" t="e"><v>#REF!</v></c><c r="ZZ5"><v>9</v></c></row>',
    )),
    'xl/worksheets/sheet2.xml': strToU8(sheet('<row r="1"><c r="A1"><v>1</v></c></row>')),
  });

  it('reads values, shared and formula strings, skipping errors and far columns', () => {
    const { Приход: got } = readSheets(file, ['Приход', 'missing']);
    expect(got).toHaveLength(1);
    expect(got[0].n).toBe(5);
    expect(got[0].cells).toEqual([45957, null, 'Гвоздь & шуруп', null, 1.5, null, null, 'ООО «A»', null, 'АС-1', null, null, null, null, null, null]);
  });

  it('converts Excel day numbers', () => {
    expect(excelDate(45957)).toBe('2025-10-27');
    expect(excelDate('24.11.2026')).toBe('2026-11-24');
    expect(excelDate(12)).toBeNull();
    expect(excelDate(null)).toBeNull();
  });
});

describe('latinName', () => {
  it('writes file names in Latin letters', async () => {
    const { latinName } = await import('../src/client/filename');
    expect(latinName('Заявка АС-001-11-2026', 'pdf')).toBe('Zayavka-AS-001-11-2026.pdf');
    expect(latinName('Приход 2026-11-01 2026-11-30', 'xlsx')).toBe('Prixod-2026-11-01-2026-11-30.xlsx');
    expect(latinName('Заявка SHERON 004', 'pdf')).toBe('Zayavka-SHERON-004.pdf');
    expect(latinName('Ғишт / Қум', 'pdf')).toBe('Gisht-Qum.pdf');
    expect(latinName('«»', 'pdf')).toBe('file.pdf');
  });
});
