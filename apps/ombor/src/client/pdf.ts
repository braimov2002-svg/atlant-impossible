import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { RequestDetail } from '../shared/types';
import { api } from './api';
import { latinName } from './filename';
import bold from './fonts/DejaVuSans-Bold.ttf?url';
import regular from './fonts/DejaVuSans.ttf?url';
import type { Tr } from './i18n';

const NAVY: [number, number, number] = [18, 38, 92];
const ORANGE: [number, number, number] = [240, 125, 20];
const LOGO = { w: 532, h: 180 }; // public/logo.png

const base64 = async (url: string) => {
  const bytes = new Uint8Array(await (await fetch(url)).arrayBuffer());
  let s = '';
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(s);
};
const dmy = (d: string) => `${d.slice(8, 10)}.${d.slice(5, 7)}.${d.slice(0, 4)}`;
const qty = (n: number) => new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 3 }).format(n).replace(/ | /g, ' ');

/** Builds the request as an A4 PDF with the company logo. */
export async function requestPdf(r: RequestDetail, t: Tr): Promise<Blob> {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  // PDF's built-in fonts have no Cyrillic, so the font travels inside the file.
  const [reg, bld, logo] = await Promise.all([base64(regular), base64(bold), base64('/logo.png')]);
  doc.addFileToVFS('DejaVuSans.ttf', reg);
  doc.addFont('DejaVuSans.ttf', 'DejaVu', 'normal');
  doc.addFileToVFS('DejaVuSans-Bold.ttf', bld);
  doc.addFont('DejaVuSans-Bold.ttf', 'DejaVu', 'bold');

  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const M = 12;
  const logoW = 58;
  const logoH = (logoW * LOGO.h) / LOGO.w;
  doc.addImage(`data:image/png;base64,${logo}`, 'PNG', M, M - 2, logoW, logoH);

  doc.setFont('DejaVu', 'bold').setFontSize(17).setTextColor(...NAVY);
  doc.text(`ЗАЯВКА № ${r.number}`, W - M, M + 5, { align: 'right' });
  doc.setFont('DejaVu', 'normal').setFontSize(10).setTextColor(60);
  doc.text(`${t('object')}: ${r.object ?? '—'}`, W - M, M + 11.5, { align: 'right' });
  doc.text(`${t('date')}: ${dmy(r.date)}`, W - M, M + 16.5, { align: 'right' });
  const top = M + logoH + 2;
  doc.setDrawColor(...ORANGE).setLineWidth(0.8).line(M, top, W - M, top);

  autoTable(doc, {
    startY: top + 4,
    margin: { left: M, right: M, bottom: 16 },
    head: [['№', t('item_name'), t('unit_short'), t('qty'), t('place'), t('work'), t('ordered_by'), t('spec'), t('executor')]],
    body: r.items.map((it, i) => [i + 1, it.name, it.unit, qty(it.qty), it.place, it.work, it.ordered_by, it.spec, it.executor]),
    theme: 'grid',
    styles: { font: 'DejaVu', fontSize: 9, cellPadding: 1.8, textColor: 20, lineColor: 120, lineWidth: 0.15, overflow: 'linebreak' },
    headStyles: { font: 'DejaVu', fontStyle: 'bold', fillColor: NAVY, textColor: 255, fontSize: 8.5, valign: 'middle' },
    columnStyles: { 0: { cellWidth: 9, halign: 'center' }, 1: { cellWidth: 74 }, 2: { cellWidth: 20 }, 3: { cellWidth: 20, halign: 'right' } },
    // Page number and company name at the foot of every page.
    didDrawPage: () => {
      doc.setFont('DejaVu', 'normal').setFontSize(8).setTextColor(120);
      doc.text('ООО «Atlant Construction»', M, H - 7);
      doc.text(String(doc.getNumberOfPages()), W - M, H - 7, { align: 'right' });
    },
  });

  let y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 8;
  if (y > H - 34) {
    doc.addPage();
    y = M + 6;
  }
  doc.setFont('DejaVu', 'normal').setFontSize(10).setTextColor(20);
  if (r.note) {
    doc.text(doc.splitTextToSize(`${t('note')}: ${r.note}`, W - 2 * M), M, y);
    y += 8;
  }
  const signs = [t('sign_author'), t('sign_supply'), t('sign_boss')];
  const col = (W - 2 * M) / signs.length;
  y += 10;
  signs.forEach((label, i) => {
    const x = M + i * col;
    doc.setDrawColor(60).setLineWidth(0.2).line(x, y, x + col - 14, y);
    doc.setFontSize(8.5).setTextColor(90).text(label, x, y + 4.5);
  });
  if (r.created_by_name) doc.setFontSize(10).setTextColor(20).text(r.created_by_name, M, y - 1.5);
  return doc.output('blob');
}

const fileName = (r: RequestDetail) => latinName(`Заявка ${r.number}`, 'pdf');

/** Downloads the request as a PDF file. */
export async function downloadRequestPdf(id: number, t: Tr) {
  const r = await api<RequestDetail>('GET', `/requests/${id}`);
  const url = URL.createObjectURL(await requestPdf(r, t));
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName(r);
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

/** Can this device send a PDF straight to another app (Telegram, mail…)? */
export const canSharePdf = () =>
  typeof navigator.canShare === 'function' && navigator.canShare({ files: [new File([''], 'a.pdf', { type: 'application/pdf' })] });

export async function shareRequestPdf(id: number, t: Tr) {
  const r = await api<RequestDetail>('GET', `/requests/${id}`);
  const file = new File([await requestPdf(r, t)], fileName(r), { type: 'application/pdf' });
  try {
    await navigator.share({ files: [file], title: `Заявка ${r.number}` });
  } catch (e) {
    if ((e as Error).name !== 'AbortError') throw e; // closing the share sheet is not an error
  }
}
