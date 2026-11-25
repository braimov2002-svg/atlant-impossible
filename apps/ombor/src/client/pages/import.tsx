import { useState } from 'react';
import { parseWorkbook, uploadWorkbook } from '../excel';
import { errorText } from '../i18n';
import { Icon, PageHead, useApp } from '../ui';
import type { Workbook } from '../workbook';

/** One-time loading of the old «АС материал» workbook (safe to repeat). */
export function ImportPage() {
  const { t } = useApp();
  const [book, setBook] = useState<Workbook | null>(null);
  const [stage, setStage] = useState<'idle' | 'reading' | 'ready' | 'uploading' | 'done'>('idle');
  const [progress, setProgress] = useState({ done: 0, total: 1 });
  const [result, setResult] = useState({ requests: 0, receipts: 0 });
  const [error, setError] = useState('');

  const choose = async (file: File | undefined) => {
    if (!file) return;
    setError('');
    setStage('reading');
    try {
      setBook(await parseWorkbook(file));
      setStage('ready');
    } catch {
      setError(t('bad_file'));
      setStage('idle');
    }
  };
  const upload = async () => {
    setStage('uploading');
    setError('');
    try {
      setResult(await uploadWorkbook(book!, (done, total) => setProgress({ done, total })));
      setStage('done');
    } catch (e) {
      // Whatever was sent stays; pressing again continues without duplicates.
      setError(errorText(e, t));
      setStage('ready');
    }
  };

  return (
    <>
      <PageHead back="/menu" title={t('import')} sub={t('import_sub')} />
      <div className="card">
        <label className="btn primary">
          <Icon name="upload" size={18} /> {t('choose_file')}
          <input type="file" accept=".xlsx" hidden disabled={stage === 'reading' || stage === 'uploading'} onChange={(e) => choose(e.target.files?.[0])} />
        </label>
        <p className="muted" style={{ marginTop: 10 }}>{t('import_again')}</p>
        {stage === 'reading' && <p style={{ marginTop: 10 }}>{t('reading')}</p>}
        {error && <p className="err" role="alert">{error}</p>}
      </div>
      {book && stage !== 'idle' && stage !== 'reading' && (
        <div className="card">
          <h3>{t('found')}</h3>
          <div className="nums">
            <div><span>{t('receipts')}</span><b>{book.receipts.length}</b></div>
            <div><span>{t('requests')}</span><b>{book.requests.length}</b></div>
            <div><span>{t('objects')}</span><b>{book.objects.length}</b></div>
          </div>
          {stage === 'ready' && <button className="btn primary" onClick={upload}>{t('upload')}</button>}
          {stage === 'uploading' && (
            <>
              <p>{t('uploading')}: {progress.done} / {progress.total}</p>
              <progress value={progress.done} max={progress.total} />
            </>
          )}
          {stage === 'done' && (
            <p className="ok">
              {t('import_done')}: {t('receipts')} +{result.receipts}, {t('requests')} +{result.requests} {t('added')}.
            </p>
          )}
        </div>
      )}
    </>
  );
}
