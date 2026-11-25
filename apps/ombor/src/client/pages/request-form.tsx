import { useEffect, useState } from 'react';
import type { ObjectFolder, RequestDetail } from '../../shared/types';
import { api, qs } from '../api';
import { ErrorLine, Field, go, Icon, PageHead, Suggest, today, useAction, useApp, useLoad } from '../ui';

interface Item { id?: number; name: string; unit: string; qty: string; spec: string; place: string; work: string; ordered_by: string; executor: string }
const blank = (): Item => ({ name: '', unit: 'шт', qty: '', spec: '', place: '', work: '', ordered_by: '', executor: '' });
const UNITS = ['шт', 'кг', 'т.н', 'м', 'п/м', 'м2', 'м3', 'литр', 'пара', 'комплект', 'пачка', 'мешок', 'рулон'];

/** New request, or editing one when `id` is given. */
export function RequestFormPage({ id }: { id?: number }) {
  const { t, refreshBadges } = useApp();
  const preset = new URLSearchParams(window.location.hash.split('?')[1] ?? '').get('object') ?? '';
  const [f, setF] = useState({ number: '', date: today(), object_id: preset, note: '' });
  const [items, setItems] = useState<Item[]>([blank()]);
  const [names, setNames] = useState<{ name: string; unit: string }[]>([]);
  const [ready, setReady] = useState(!id);
  const objects = useLoad(() => api<ObjectFolder[]>('GET', '/objects'), []);
  const act = useAction();

  useEffect(() => {
    if (!id) return;
    api<RequestDetail>('GET', `/requests/${id}`).then((r) => {
      setF({ number: r.number, date: r.date, object_id: String(r.object_id ?? ''), note: r.note });
      setItems(r.items.map((i) => ({ ...i, qty: String(i.qty) })));
      setReady(true);
    }, (e) => act.setError(String(e.message)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // For a new request, show the number it will get.
  const [suggested, setSuggested] = useState('');
  useEffect(() => {
    if (id || !f.object_id || !f.date) return setSuggested('');
    api('GET', `/requests/next-number${qs({ object_id: f.object_id, date: f.date })}`).then((r) => setSuggested(r.number), () => {});
  }, [id, f.object_id, f.date]);

  const setItem = (i: number, patch: Partial<Item>) => setItems(items.map((it, k) => (k === i ? { ...it, ...patch } : it)));
  const typeName = (i: number, name: string) => {
    const known = names.find((n) => n.name === name);
    setItem(i, known ? { name, unit: known.unit || items[i].unit } : { name });
    if (name.length >= 2 && !known) api('GET', `/names${qs({ q: name })}`).then(setNames, () => {});
  };

  const save = async () => {
    const body = { ...f, object_id: Number(f.object_id), items: items.filter((i) => i.name.trim()) };
    const ok = await act.run(async () => {
      const saved = id ? (await api('PUT', `/requests/${id}`, body), { id }) : await api('POST', '/requests', body);
      refreshBadges();
      go(`/requests/${saved.id}`);
    });
    return ok;
  };

  const active = (objects.data ?? []).filter((o) => o.active || String(o.id) === f.object_id);
  return (
    <form onSubmit={(e) => { e.preventDefault(); void save(); }}>
      <PageHead back={id ? `/requests/${id}` : '/requests'} title={t(id ? 'edit_request' : 'new_request')} />
      {!ready ? <ErrorLine text={act.error} /> : (
        <>
          <div className="card form">
            <Field label={t('object')}>
              <select value={f.object_id} onChange={(e) => setF({ ...f, object_id: e.target.value })} required>
                <option value="" />
                {active.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
              </select>
            </Field>
            <Field label={t('date')}><input type="date" value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} required /></Field>
            <Field label={t('number')} hint={id ? undefined : t('number_auto')}>
              <input value={f.number} onChange={(e) => setF({ ...f, number: e.target.value })} placeholder={suggested} required={!!id} />
            </Field>
            <Field label={t('note')}><input value={f.note} onChange={(e) => setF({ ...f, note: e.target.value })} /></Field>
          </div>

          <h2>{t('items')}</h2>
          {items.map((it, i) => (
            <div className="item-edit" key={i}>
              <div className="line">
                <b>{i + 1}.</b>
                {items.length > 1 && (
                  <button type="button" className="iconbtn" aria-label={t('delete')} onClick={() => setItems(items.filter((_, k) => k !== i))}>
                    <Icon name="trash" size={18} />
                  </button>
                )}
              </div>
              <div className="form">
                <Field label={t('item_name')} wide>
                  <Suggest id={`names-${i}`} value={it.name} onChange={(v) => typeName(i, v)} options={names.map((n) => n.name)} required={i === 0} />
                </Field>
                <Field label={t('qty')}><input inputMode="decimal" value={it.qty} onChange={(e) => setItem(i, { qty: e.target.value })} required={!!it.name} /></Field>
                <Field label={t('unit')}><Suggest id="units" value={it.unit} onChange={(v) => setItem(i, { unit: v })} options={UNITS} /></Field>
                <Field label={t('place')}><input value={it.place} onChange={(e) => setItem(i, { place: e.target.value })} /></Field>
                <Field label={t('work')}><input value={it.work} onChange={(e) => setItem(i, { work: e.target.value })} /></Field>
                <Field label={t('ordered_by')}><input value={it.ordered_by} onChange={(e) => setItem(i, { ordered_by: e.target.value })} /></Field>
                <Field label={t('executor')}><input value={it.executor} onChange={(e) => setItem(i, { executor: e.target.value })} /></Field>
                <Field label={t('spec')} wide><input value={it.spec} onChange={(e) => setItem(i, { spec: e.target.value })} /></Field>
              </div>
            </div>
          ))}
          <button type="button" className="btn" onClick={() => setItems([...items, { ...blank(), place: items.at(-1)!.place, ordered_by: items.at(-1)!.ordered_by, executor: items.at(-1)!.executor }])}>
            <Icon name="plus" size={18} /> {t('add_item')}
          </button>
          <ErrorLine text={act.error} />
          <div className="row">
            <button className="btn primary" disabled={act.busy}>{t('save')}</button>
            <a className="btn" href={id ? `#/requests/${id}` : '#/requests'}>{t('cancel')}</a>
          </div>
        </>
      )}
    </form>
  );
}
