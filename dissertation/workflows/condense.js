export const meta = {
  name: 'condense-dissertation-en',
  description: 'Condense English dissertation parts to page budgets while keeping all figures, tables, equations and key content',
  phases: [{ title: 'Condense', detail: 'one editor per file' }],
}

const ROOT = '/home/user/atlant-impossible/dissertation'
const SCHEMA = {
  type: 'object',
  properties: {
    file: { type: 'string' },
    words_before: { type: 'integer' },
    words_after: { type: 'integer' },
    summary: { type: 'string' },
  },
  required: ['file', 'words_before', 'words_after', 'summary'],
}

const results = await parallel(args.items.map(it => () => agent(`You are the senior editor of a master's dissertation in medical physics ("X-Ray Spectrum Modeling for the Study of Radio-Enhancement in Biological Matter with Ag"), written in Pandoc Markdown. The whole dissertation must fit about 90 A4 pages (Times New Roman 14 pt, 1.5 spacing) in each of its three language versions, and it is currently about 35 % too long. Your job: condense ONE file, ${ROOT}/src/en/${it.file}, to at most ${it.budget} words as measured by \`wc -w\` (currently about ${it.now}), editing it in place.

First read ${ROOT}/brief/CONVENTIONS.md (markup rules) and ${ROOT}/brief/OUTLINE.md (structure and main messages), then the whole file.

How to condense (quality must stay at examiner level — this is tightening, not gutting):
- Remove repetition (the same number or argument stated twice, in this file or in a way that duplicates a table: refer to the table instead of reciting its rows), meta-commentary ("This section presents ..."), over-long explanations of elementary points, redundant hedging, and long enumerations that a figure or table already shows.
- Merge short paragraphs; shorten long sentences; keep paragraphs of 3–8 sentences.
- KEEP: every heading (same text and numbering); every {{FIG:...|caption}} (captions may be shortened to 1–2 sentences); every {{TABLE:...}}; every labelled display equation $$...$$ {#eq:...} and its symbol definitions (you may compress the derivation prose; unlabelled intermediate equations may be removed if nothing refers to them); every {{REF:...}} whose target is still present; every citation KEY that occurs in the file (keep each at least once, attached to an appropriate claim — you may thin out long citation lists elsewhere); the numbered lists (tasks, novelty, conclusions) with their numbering, made more concise; all key quantitative results and the physical explanations of why the results look as they do; the honest statements on limitations.
- Do not add new facts or numbers; numbers you keep must stay exactly as they are.
- ${it.extra || ''}
After editing, run \`wc -w ${ROOT}/src/en/${it.file}\` and continue until the count is ≤ ${it.budget} (and not below ${Math.round(it.budget * 0.9)}). Also check that every {{FIG}}, {{TABLE}} and {#eq:} that was in the file is still there (grep). Return file, words before/after and a 2-sentence summary.`, { label: 'condense:' + it.file, phase: 'Condense', schema: SCHEMA })))
return results
