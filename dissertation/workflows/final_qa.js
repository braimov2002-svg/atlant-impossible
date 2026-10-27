export const meta = {
  name: 'dissertation-final-qa',
  description: 'Cross-file consistency pass over one language version of the dissertation',
  phases: [{ title: 'QA', detail: 'one editor per language' }, { title: 'Review', detail: 'independent review of the editor diff' }],
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
3. Author names in running text follow one convention (GLOSSARY: ${lang === 'ru' ? 'cited authors in Latin script with «и др.», eponymous formulas/effects in Russian (формула Крамерса, множитель Эльверта, сечение Гризинского)' : 'Latin script as in the original, "et al." always "va hammualliflar"; eponymous formulas in Uzbek (Kramers formulasi, Elvert ko‘paytuvchisi, Grizinskiy kesimi)'}).
4. Headings: chapter headings ${lang === 'ru' ? '"# ГЛАВА N. ..."' : '"# I BOB. ...", "# II BOB. ...", "# III BOB. ..."'}, section headings numbered as in English; section titles that are mentioned in the text match the headings.
5. Orthography and typography: ${LANG[lang].ortho}; grammar and agreement; natural formal academic style; no leftover English words except names, symbols and software.
6. Do NOT touch markup ({{...}}, [@...], {#...}, LaTeX except decimal {,}, code blocks), and do not add or remove content. After editing, for each file run \`python3 ${ROOT}/code/check_translation.py ${ROOT}/src/en/<file> ${ROOT}/src/${lang}/<file>\` and make sure there are 0 structural problems.
Known open items reported by the translators that you must resolve: ${KNOWN[lang]}
Report the total \`wc -w\` of all files and the list of changes.`

const KNOWN = {
  ru: '(a) CPE must be «равновесие заряженных частиц (РЗЧ)» everywhere — 00_abbrev.md and 04_ch3a.md still contain ЭЗЧ / «электронное (зарядовое) равновесие»; (b) cited authors in running text in Latin script (Spiers, Seltzer, Poludniowski и др.) — check 01_intro.md («Спайерсом»), 03_ch2b.md and all other files for Cyrillic transcriptions of cited authors (Зельцер, Спайерс, Бергер, Хаббелл, ...) while eponymous formulas/theorems stay Russian (формула Крамерса, теорема Фано, сечение Клейна–Нишины, формула Бете); (c) missing comma in 02_ch1b.md near «[@caglar2024] а также»; (d) 02_ch1b.md no longer defines XRD/РСА — make sure РСА is defined at its first use in each chapter where it is used, as the English does for XRD; (e) enumerations: if the English uses (i)–(v), use one convention consistently throughout the volume.',
  uz: '(a) "et al." must be "va hammualliflar" in every file (02_ch1b.md has one "va boshq."); (b) irradiation = "nurlantirish" (and its forms), radiation = "nurlanish", never "nurlash"; (c) check that YSQ, IM, MK, ZZM, AgNZ, AuNZ, KFSh are defined at their first use in the Introduction and in each chapter exactly where the English defines HVL, DM, MC, CPE, AgNP, AuNP, ROS; (d) unify renderings that translators chose independently and that are not in the glossary (e.g. "tarix" for MC histories, "bo‘linish chegarasi" for interface, "kerma quvvati" for kerma rate, "dekoratsiyalangan") — choose one rendering per English term for the whole volume.',
}

const REVIEW = (lang, ed) => `You are an independent reviewer (native-level ${LANG[lang].name}, medical/radiation physics) of the edits that a final editor has just made to the ${LANG[lang].name} version of a master's dissertation in ${ROOT}/src/${lang}/ (English master in ${ROOT}/src/en/, same file names; terminology in ${ROOT}/brief/GLOSSARY.md). Run \`git -C ${ROOT} diff ${args.base} -- src/${lang}/\` and examine EVERY changed line against the corresponding English sentence: the edit must keep the meaning of the English exactly, be grammatical and natural formal academic ${LANG[lang].name}, follow the glossary, and must not damage markup ({{...}}, [@...], {#...}, LaTeX, code). Revert or correct any edit that is wrong (Edit tool); leave correct edits alone. Also spot-check that the editor's terminology decisions were applied in ALL files (grep), not only some. Finally run \`python3 ${ROOT}/code/check_translation.py ${ROOT}/src/en/<file> ${ROOT}/src/${lang}/<file>\` for every file and make sure each reports 0 structural problems. Editor report: ${JSON.stringify(ed)}. Report the list of corrections you made (empty if none).`

const results = await pipeline(args.langs,
  lang => agent(lang === 'en' ? EN : TR(lang), { label: 'qa:' + lang, phase: 'QA', schema: SCHEMA }),
  (ed, lang) => lang === 'en' ? ed : agent(REVIEW(lang, ed), { label: 'review:' + lang, phase: 'Review', schema: SCHEMA }).then(r => ({ editor: ed, review: r })))
return results
