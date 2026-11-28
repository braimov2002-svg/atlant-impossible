import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { RequestDetail } from '../shared/types';
import { api } from './api';
import { latinName } from './filename';
import bold from './fonts/DejaVuSans-Bold.ttf?url';
import regular from './fonts/DejaVuSans.ttf?url';
import type { Tr } from './i18n';
import { FORM_HEAD, FORM_MIN_ROWS } from './form';

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
export async function requestPdf(r: RequestDetail, _t: Tr): Promise<Blob> {
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

  // Laid out like the company's own form: logo, «ЗАЯВКА», date and number on the right.
  doc.setFont('DejaVu', 'bold').setFontSize(24).setTextColor(...NAVY);
  doc.text('ЗАЯВКА', W / 2, M + 10, { align: 'center' });
  const right = [['Tarih / дата:', dmy(r.date)], ['Istek No / Заявка №:', r.number], ['Объект:', r.object ?? '—']];
  right.forEach(([label, value], i) => {
    const y = M + 3 + i * 5.6;
    doc.setFont('DejaVu', 'bold').setFontSize(10.5).setTextColor(20).text(value, W - M, y, { align: 'right' });
    doc.setFont('DejaVu', 'normal').setTextColor(90).text(label, W - M - doc.getTextWidth(value) - 3, y, { align: 'right' });
  });
  const top = M + logoH + 2;
  doc.setDrawColor(...ORANGE).setLineWidth(0.8).line(M, top, W - M, top);

  const lines = r.items.map((it, i) => [i + 1, it.name, it.unit, qty(it.qty), it.place, it.work, it.ordered_by, it.spec, it.executor]);
  // Empty numbered lines, as on the paper form.
  for (let n = lines.length + 1; n <= FORM_MIN_ROWS; n++) lines.push([n, '', '', '', '', '', '', '', '']);
  autoTable(doc, {
    startY: top + 4,
    margin: { left: M, right: M, bottom: 16 },
    head: [FORM_HEAD],
    body: lines,
    theme: 'grid',
    styles: { font: 'DejaVu', fontSize: 9, cellPadding: 1.8, textColor: 20, lineColor: 90, lineWidth: 0.2, overflow: 'linebreak', minCellHeight: 7.5 },
    headStyles: { font: 'DejaVu', fontStyle: 'bold', fillColor: [238, 240, 245], textColor: NAVY, fontSize: 8, halign: 'center', valign: 'middle' },
    columnStyles: { 0: { cellWidth: 10, halign: 'center' }, 1: { cellWidth: 74 }, 2: { cellWidth: 21, halign: 'center' }, 3: { cellWidth: 23, halign: 'center' } },
    // Page number and company name at the foot of every page.
    didDrawPage: () => {
      doc.setFont('DejaVu', 'normal').setFontSize(8).setTextColor(120);
      doc.text('ООО «Atlant Construction»', M, H - 7);
      doc.text(String(doc.getNumberOfPages()), W - M, H - 7, { align: 'right' });
    },
  });

  let y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 6;
  if (y > H - 38) {
    doc.addPage();
    y = M + 6;
  }
  if (r.note) {
    doc.setFont('DejaVu', 'normal').setFontSize(10).setTextColor(20);
    doc.text(doc.splitTextToSize(`Примечание: ${r.note}`, W - 2 * M), M, y);
    y += 7;
  }
  // Three signature boxes: role, name, a line to sign on.
  const signs: [string, string][] = [['Зав Склад', r.signers.warehouse], ['Прораб', r.signers.foreman], ['Руководитель проекта', r.signers.manager]];
  const col = (W - 2 * M) / signs.length;
  signs.forEach(([role, name], i) => {
    const x = M + i * col;
    doc.setDrawColor(90).setLineWidth(0.2).rect(x, y, col, 7).rect(x, y + 7, col, 7).rect(x, y + 14, col, 10);
    doc.setFont('DejaVu', 'bold').setFontSize(10).setTextColor(20).text(role, x + col / 2, y + 4.8, { align: 'center' });
    doc.setFont('DejaVu', 'normal').text(name, x + col / 2, y + 11.8, { align: 'center' });
  });
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
