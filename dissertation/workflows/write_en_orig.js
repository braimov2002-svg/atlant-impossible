export const meta = {
  name: 'write-dissertation-en',
  description: 'Write the English master text of the dissertation section by section, then review each part against facts, references and conventions',
  phases: [
    { title: 'Write', detail: 'one writer per dissertation part' },
    { title: 'Review', detail: 'fact/citation/physics/markup review and in-place fixes' },
    { title: 'Consistency', detail: 'cross-file consistency pass' },
  ],
}

const ROOT = '/home/user/atlant-impossible/dissertation'
const COMMON = `You are writing part of a master's dissertation (physics / medical physics) titled "X-Ray Spectrum Modeling for the Study of Radio-Enhancement in Biological Matter with Ag". The dissertation is written as Pandoc Markdown in English (it will later be translated into Russian and Uzbek, so write clear, well-structured sentences that translate well).

Before writing, READ these files completely:
- ${ROOT}/brief/CONVENTIONS.md  (markup rules: headings, [@key] citations, {{FIG:id|caption}}, {{TABLE:id}}, {{REF:...}}, $$...$$ {#eq:label})
- ${ROOT}/brief/OUTLINE.md      (structure, word targets, placement of figures/tables, main messages)
- ${ROOT}/brief/FACTS.md        (the ONLY source of numerical results you may quote)
- ${ROOT}/brief/REFS.md         (the ONLY references you may cite, with what each may be cited for)
Also look at the generated tables you insert (${ROOT}/data/tables/en/<id>.md) and VIEW every figure you insert (${ROOT}/figures/en/<id>.png, use the Read tool on the PNG) so that captions and discussion describe what the figure really shows. For methods, the implementation is in ${ROOT}/code/xspec.py, nist.py, mc_dose.py, run_all.py — describe methods exactly as implemented.

Hard rules:
- Never invent facts, numbers, references, experiments, conferences or publications. Literature claims must be consistent with the REFS.md notes; numerical results only from FACTS.md / tables.
- Physics must be correct and precise (units, symbols, signs). Define every symbol after each equation.
- Formal academic style, coherent paragraphs (4–9 sentences), smooth transitions, no filler, no marketing language, no bullet dumps.
- Respect the word targets in OUTLINE.md (prose only; ±10 %).
- Write ONLY your assigned file(s) with the Write tool. Do not modify any other file.
`

const PARTS = [
  { key: 'intro', files: '00_annotation.md, 00_abbrev.md and 01_intro.md', task: 'Write three files: (1) ' + ROOT + '/src/en/00_annotation.md — the ANNOTATION (≈300 words + keywords line); (2) ' + ROOT + '/src/en/00_abbrev.md — LIST OF ABBREVIATIONS AND SYMBOLS; (3) ' + ROOT + '/src/en/01_intro.md — the INTRODUCTION (≈2000 words) exactly following the OUTLINE (bold run-in labels, 7 numbered tasks, 5 numbered novelty items, placeholders for approbation/publications, {{COUNT:...}} placeholders in the structure paragraph).' },
  { key: 'ch1a', files: '02_ch1a.md', task: 'Write ' + ROOT + '/src/en/02_ch1a.md containing the chapter heading "# CHAPTER 1. RADIOSENSITIZATION BY HIGH-Z ELEMENTS AND X-RAY SPECTRUM MODELING: LITERATURE REVIEW" and sections 1.1, 1.2 and 1.3 (≈2900 words total), with figures fig02_coeffs (in 1.2) and fig03_ratio (in 1.3). This is a literature review: cite densely and accurately.' },
  { key: 'ch1b', files: '02_ch1b.md', task: 'Write ' + ROOT + '/src/en/02_ch1b.md containing sections 1.4, 1.5 and 1.6 (≈2150 words total; NO chapter heading — it is in 02_ch1a.md), including the two qualitative tables tab:lit_ag and tab:methods described in the OUTLINE. Literature review: cite densely and accurately; for each silver study say only what its REFS.md note supports.' },
  { key: 'ch2a', files: '03_ch2a.md', task: 'Write ' + ROOT + '/src/en/03_ch2a.md containing the chapter heading "# CHAPTER 2. PHYSICAL MODEL OF THE X-RAY SPECTRUM AND METHODS OF DOSE-ENHANCEMENT CALCULATION" and sections 2.1–2.5 (≈3450 words total) with fig01_tube, fig04_electron, tables t2_1 and t2_2, and the labelled equations listed in the OUTLINE for these sections (eq:bethe, eq:csda, eq:depth, eq:kramers, eq:bhnr, eq:elwert, eq:thick, eq:gryz, eq:charK, eq:indirect, eq:filter, eq:fluence, eq:kerma, eq:hvl, eq:emean). Derive the indirect-fluorescence surface-source formula step by step. The formulas must match xspec.py exactly (read it carefully: units keV, cm; Bethe constant 0.307075 MeV cm2/mol; BH non-relativistic Born ln((p0+p)/(p0-p)) with Elwert factor; Gryzinski with pi e^4 = 6.5141e-20 cm2 keV2 and nK = 2; projected depth eta*s*cos(theta); exit path d/sin(theta)).' },
  { key: 'ch2b', files: '03_ch2b.md', task: 'Write ' + ROOT + '/src/en/03_ch2b.md containing sections 2.6–2.10 (≈2800 words total; NO chapter heading) with the labelled equations eq:mixture, eq:def, eq:def_spec, eq:def_lin, eq:def_depth, eq:def_slab and any needed for the Monte Carlo description. Describe the Monte Carlo code (mc_dose.py) and the NIST data handling (nist.py) exactly as implemented. Include the xraylib CS_Energy finding with its numbers from FACTS.md. Section 2.9 is about radiation safety; section 2.10 conclusions to Chapter 2.' },
  { key: 'ch3a', files: '04_ch3a.md', task: 'Write ' + ROOT + '/src/en/04_ch3a.md containing the chapter heading "# CHAPTER 3. RESULTS OF SPECTRUM MODELLING AND DOSE-ENHANCEMENT CALCULATIONS" and sections 3.1–3.6 (≈4700 words total) with figures fig05–fig17 and tables t3_1, t3_1w, t3_2, t3_3, t3_4, t3_5, t3_6, t3_7 placed as in the OUTLINE. Interpret every figure and table physically (why the curves look as they do), quote numbers precisely from FACTS.md/tables.' },
  { key: 'ch3b', files: '04_ch3b.md', task: 'Write ' + ROOT + '/src/en/04_ch3b.md containing sections 3.7–3.12 (≈3300 words total; NO chapter heading) with figures fig18–fig23 and tables t3_8, t3_9, t3_10, t3_11, t3_12. Section 3.11 Discussion must compare honestly with the literature (only what REFS.md notes support), list limitations and give practical recommendations; 3.12 conclusions to Chapter 3.' },
  { key: 'concl', files: '05_conclusions.md and 06_appendix.md', task: 'Write ' + ROOT + '/src/en/05_conclusions.md (CONCLUSIONS ≈900 words: 8–10 numbered conclusions with concrete numbers mirroring the 7 research tasks — read ' + ROOT + '/src/en/01_intro.md if it exists to mirror its tasks, otherwise follow the OUTLINE; then "## Practical recommendations" and "## Prospects for further research") and ' + ROOT + '/src/en/06_appendix.md (APPENDICES: Appendix A with verbatim code fragments from xspec.py as described in the OUTLINE, Appendix B reproducibility).' },
]

const WRITE_SCHEMA = {
  type: 'object',
  properties: {
    files: { type: 'array', items: { type: 'string' } },
    words: { type: 'integer' },
    figures: { type: 'array', items: { type: 'string' } },
    tables: { type: 'array', items: { type: 'string' } },
    equations: { type: 'array', items: { type: 'string' } },
    citations: { type: 'array', items: { type: 'string' } },
    notes: { type: 'string' },
  },
  required: ['files', 'words', 'figures', 'tables', 'equations', 'citations', 'notes'],
}
const REVIEW_SCHEMA = {
  type: 'object',
  properties: {
    files: { type: 'array', items: { type: 'string' } },
    words_after: { type: 'integer' },
    issues_fixed: { type: 'array', items: { type: 'string' } },
    remaining_concerns: { type: 'array', items: { type: 'string' } },
  },
  required: ['files', 'words_after', 'issues_fixed', 'remaining_concerns'],
}

const results = await pipeline(
  PARTS,
  p => agent(COMMON + '\nYOUR ASSIGNMENT: ' + p.task + '\n\nWhen done, return the structured summary (files written, total prose word count measured with `wc -w`, figure ids, table ids, equation labels and citation keys you used, and short notes).', { label: 'write:' + p.key, phase: 'Write', schema: WRITE_SCHEMA }),
  (w, p) => agent(COMMON + `\nYOUR ASSIGNMENT: You are a strict reviewer and editor (examiner level) of the file(s) ${p.files} in ${ROOT}/src/en/ that another writer just produced (writer summary: ${JSON.stringify(w)}). Check and FIX IN PLACE (using Edit/Write) every problem you find:
1. Every number matches FACTS.md or the tables exactly (check each one).
2. Every citation key exists in REFS.md and the cited source supports the claim per its note; remove or replace unsupported claims; no invented facts.
3. Physics correctness of every statement and equation (compare equations with ${ROOT}/code/xspec.py / mc_dose.py / nist.py where relevant); symbols defined; units right.
4. Markup conventions (CONVENTIONS.md): headings, {{FIG}}, {{TABLE}}, {{REF}}, equation labels, each figure referenced before it appears, no forbidden constructs (no align, no tag, no HTML, no footnotes).
5. Structure and word target per OUTLINE.md (±10 %; expand thin sections with substantive content or trim padding).
6. Academic style: coherent paragraphs, precise terminology, no repetition, no filler, consistent terms (developed model (DM), dose enhancement factor (DEF), half-value layer (HVL)).
Return what you fixed and any remaining concerns.`, { label: 'review:' + p.key, phase: 'Review', schema: REVIEW_SCHEMA }),
)

const cons = await agent(COMMON + `\nYOUR ASSIGNMENT: Final cross-file consistency pass over ALL files in ${ROOT}/src/en/ (read them all in name order; they form one dissertation). Fix in place:
- each figure fig01..fig23 used exactly once and referenced before it appears; each generated table (t2_1, t2_2, t3_1, t3_1w, t3_2 ... t3_12) inserted exactly once and referenced; no reference to a non-existent label; equation labels unique and every {{REF:eq:...}} target exists;
- the 7 tasks in the Introduction, the scientific novelty items, the chapter conclusions and the final Conclusions are mutually consistent and supported by the results;
- terminology, abbreviations and notation consistent across files (one symbol per quantity, e.g. w for Ag mass fraction, theta for anode angle, eta for depth factor);
- no duplicated passages between files; smooth transitions between 02_ch1a/02_ch1b, 03_ch2a/03_ch2b, 04_ch3a/04_ch3b;
- numbers identical wherever repeated.
Report the total word count of all files (wc -w) and what you changed. Reviewer reports: ${JSON.stringify(results)}`, { label: 'consistency', phase: 'Consistency', schema: REVIEW_SCHEMA })

return { results, cons }
