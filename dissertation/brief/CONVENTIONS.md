# Writing conventions for the dissertation source files

The dissertation is written as Pandoc Markdown, one file per section, in
`dissertation/src/en/` (English master). Russian and Uzbek versions are
translations with *identical structure*. A build script turns the files into
Word documents (Times New Roman 14 pt, 1.5 spacing), numbers figures, tables
and equations by chapter, and formats the bibliography. Follow this markup
exactly — the build depends on it.

## 1. Headings
- Chapter: `# CHAPTER 2. THEORY OF THE X-RAY SPECTRUM AND METHODS OF DOSE CALCULATION`
  (Russian `# ГЛАВА 2. ...`, Uzbek `# II BOB. ...`). Unnumbered parts:
  `# INTRODUCTION`, `# CONCLUSIONS`, `# REFERENCES`, `# APPENDICES`, `# ANNOTATION`, `# LIST OF ABBREVIATIONS AND SYMBOLS`.
- Section: `## 2.3. Bremsstrahlung production` ; subsection `### 2.3.1. Kramers' law`.
- Do not use deeper levels. Do not use bold text instead of headings.

## 2. Citations
- Cite only keys from `brief/REFS.md`: `[@cho2005]`, several: `[@hainfeld2004; @cho2005; @kuncic2018]`.
- Put the citation before the full stop: `... gold nanoparticles [@hainfeld2004].`
- Never cite a source for a claim that its note in REFS.md does not support.
- Never invent a reference, an author, a number from the literature, a dataset or an experiment.
- Cite generously in Chapter 1 (typically 1–4 citations per paragraph); in
  Chapters 2–3 cite sources of formulas, data and comparison points.

## 3. Figures
- Insert a figure on its own line (blank lines around it):
  `{{FIG:fig07_baseline|Spectrum of the 45 kV Cu-anode tube (θ = 12°, 0.5 mm Be, 10 cm air): SpekPy v2 and the developed model. The dashed line marks the Ag K-edge.}}`
- The id is the PNG name in `figures/en/` (fig01_tube ... fig23_sensitivity).
  The caption text is the full figure title (one to three sentences, ends with a full stop).
- Refer to a figure in the text with `{{REF:fig07_baseline}}` → rendered as "Fig. 3.2".
  Write e.g. `as shown in {{REF:fig07_baseline}}`, `({{REF:fig07_baseline}})`.
- Every figure must be referred to in the text *before* it appears, and discussed.
- Each figure is used exactly once in the whole dissertation (see OUTLINE.md for placement).

## 4. Tables
- Generated numeric tables: insert with `{{TABLE:t3_4}}` on its own line (the title comes with the table).
  Refer with `{{REF:t3_4}}` → "Table 3.4". The ids and contents are in `data/tables/en/`.
- You may write small additional qualitative tables yourself (only where OUTLINE.md says so) as
  pipe tables preceded by a line `Table: {#tab:lit_ag} Title of the table.` and refer with `{{REF:tab:lit_ag}}`.
  Keep them short (≤ 10 rows, ≤ 4 columns, short cells).

## 5. Equations
- Display equations with a label, each on its own lines:
  ```
  $$
  \mathrm{DEF} = \frac{D_{t+\mathrm{Ag}}}{D_t}
  $$ {#eq:def}
  ```
  Refer with `{{REF:eq:def}}` → "(2.12)". Labels must be unique (eq:kramers, eq:bethe, ...).
- Inline math with `$...$`. Use standard LaTeX (`\frac`, `\int`, `\mu_{en}/\rho`, `\mathrm{d}E`).
  No `\begin{align}`, no `\tag`, no macros. One equation per display block.
- After a display equation explain all symbols ("where ... is ...").

## 6. Numbers, units, style
- English: decimal point; Russian and Uzbek: decimal comma (1,48). Thin details: write `45 kV`, `0.5 mm`,
  `25.514 keV`, `1 %`, `10^{-3}` as `$10^{-3}$`, ranges with en dash `20–50 kV`.
- Quote numerical results ONLY from `brief/FACTS.md` or the generated tables. Round sensibly and consistently.
- Abbreviations: define at first use in each chapter (DEF, HVL, CPE, MC, DM, AgNP, AuNP, kVp...). The
  developed model is called "the developed model (DM)".
- Style: formal academic register, impersonal or "in this work"; clear, specific, no filler, no
  marketing adjectives, no bullet-point dumping (use prose; numbered lists only for aims/tasks/novelty/conclusions).
- Paragraphs of 4–9 sentences. No footnotes. No HTML. No emoji.
- Do not write placeholders like "TODO". Where personal data of the author are needed (approbation,
  publications), write exactly `[to be completed by the author: ...]`.
