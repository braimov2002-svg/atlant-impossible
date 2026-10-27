export const meta = {
  name: 'dissertation-final-qa',
  description: 'Cross-file consistency pass over one language version of the dissertation',
  phases: [{ title: 'QA', detail: 'one editor per language' }],
}

const ROOT = '/home/user/atlant-impossible/dissertation'
const SCHEMA = {
  type: 'object',
  properties: {
    lang: { type: 'string' },
    words_total: { type: 'integer' },
    changes: { type: 'array', items: { type: 'string' } },
    remaining_concerns: { type: 'array', items: { type: 'string' } },
  },
  required: ['lang', 'words_total', 'changes', 'remaining_concerns'],
}

const EN = `You are the final editor (examiner level) of a master's dissertation in medical physics, "X-Ray Spectrum Modeling for the Study of Radio-Enhancement in Biological Matter with Ag". Read ${ROOT}/brief/CONVENTIONS.md, ${ROOT}/brief/OUTLINE.md, ${ROOT}/brief/FACTS.md and ${ROOT}/brief/REFS.md, then ALL files of ${ROOT}/src/en/ in name order (they form one document; 00_annotation and 00_abbrev are front matter). The files were just condensed independently of each other to fit about 90 pages, so cross-file problems are expected. Fix in place (Edit tool), keeping the total length (do not add more than ~150 words overall):
1. Every figure fig01..fig23 is inserted exactly once and referenced before it appears; every generated table (t2_1, t2_2, t3_1, t3_1w, t3_2, t3_3, ..., t3_12) and tab:lit_ag, tab:methods inserted once and referenced; every {{REF:...}} target exists (labels of equations are defined with {#eq:...} in some file); equation labels unique.
2. Numbers identical wherever repeated, and equal to FACTS.md / data/tables/en (note: tables t3_3, t3_6, t3_7 were shortened — no sentence may claim that a table lists rows it no longer has); the sensitivity result is DEF = 1.482, u_c = 0.016, i.e. 1.48 ± 0.02 (k = 1); the tissue mu_en/rho variation is applied consistently to both doses (|ΔDEF| = 0.005).
3. The 7 tasks and 5 novelty items of the Introduction, the conclusions of each chapter and the final CONCLUSIONS are mutually consistent, in the same order of topics, and supported by the results; the annotation agrees with them.
4. Abbreviations: defined at first use in the Introduction and again at first use in each chapter; the list of abbreviations (00_abbrev.md) contains every abbreviation and symbol actually used and nothing that is unused.
5. Terminology and notation uniform across files (T_0 for the electron energy = tube voltage times e, θ anode angle, η depth factor, w mass fraction, R(E) and ⟨R⟩, K_air, Φ(E), Ψ(E), DM, DEF, HVL, CPE, MC), cross-references to sections ("Section 2.6") point to the right sections.
6. No duplicated passages between files; transitions between 02_ch1a/02_ch1b, 03_ch2a/03_ch2b, 04_ch3a/04_ch3b are smooth; every citation key used exists in REFS.md.
Report the total \`wc -w\` of all files and the list of changes (file: what).`

const LANG = {
  ru: { name: 'Russian', ortho: 'ё where needed, «» quotes, correct dashes, decimal comma, units кэВ, кВ, мм, см, мкм, Гр, мГр, мА·с' },
  uz: { name: 'Uzbek (Latin script)', ortho: 'o‘ g‘ with U+2018, tutuq belgisi U+2019, no Cyrillic, decimal comma, units keV, kV, mm, sm, mkm, Gr, mGr, mA·s, case suffixes attached directly to abbreviations and to {{REF:...}} placeholders' },
}
const TR = (lang) => `You are the final editor (native-level ${LANG[lang].name}, expert in medical/radiation physics) of the ${LANG[lang].name} version of a master's dissertation. Each file in ${ROOT}/src/${lang}/ is a verified translation of the file with the same name in ${ROOT}/src/en/, made by different translators, so the volume as a whole may be inconsistent. Read ${ROOT}/brief/GLOSSARY.md and ${ROOT}/brief/CONVENTIONS.md, then all files of ${ROOT}/src/${lang}/ in name order. Fix in place (Edit tool), without changing the content relative to the English:
1. Terminology identical across all files and as in GLOSSARY.md (including: reference medium, Elwert factor, tube output, irradiation vs radiation, Ag-loaded, coverage factor, standard error, scale, x-ray diffraction, electron depth factor, CPE, HVL, DM, MC, ROS, AgNP/AuNP and their ${lang === 'ru' ? 'Russian' : 'Uzbek'} abbreviations); one rendering per English term.
2. Abbreviations defined at first use in the Introduction and at first use in each chapter, exactly where the English defines them; the list of abbreviations (00_abbrev.md) uses the same forms as the text.
3. Author names in running text follow one convention (GLOSSARY: ${lang === 'ru' ? 'cited authors in Latin script with «и др.», eponymous formulas/effects in Russian (формула Крамерса, множитель Эльверта, сечение Гризинского)' : 'Latin script as in the original with "va boshq." / "va hammualliflar" used uniformly; eponymous formulas in Uzbek (Kramers formulasi, Elvert ko‘paytuvchisi, Grizinskiy kesimi)'}).
4. Headings: chapter headings ${lang === 'ru' ? '"# ГЛАВА N. ..."' : '"# I BOB. ...", "# II BOB. ...", "# III BOB. ..."'}, section headings numbered as in English; section titles that are mentioned in the text match the headings.
5. Orthography and typography: ${LANG[lang].ortho}; grammar and agreement; natural formal academic style; no leftover English words except names, symbols and software.
6. Do NOT touch markup ({{...}}, [@...], {#...}, LaTeX except decimal {,}, code blocks), and do not add or remove content. After editing, for each file run \`python3 ${ROOT}/code/check_translation.py ${ROOT}/src/en/<file> ${ROOT}/src/${lang}/<file>\` and make sure there are 0 structural problems.
Report the total \`wc -w\` of all files and the list of changes.`

const results = await parallel(args.langs.map(lang => () =>
  agent(lang === 'en' ? EN : TR(lang), { label: 'qa:' + lang, phase: 'QA', schema: SCHEMA })))
return results
