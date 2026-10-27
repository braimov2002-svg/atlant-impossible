export const meta = {
  name: 'translate-dissertation',
  description: 'Translate dissertation parts from English into Russian and Uzbek and verify fidelity',
  phases: [
    { title: 'Translate', detail: 'one translator per part and language' },
    { title: 'Verify', detail: 'bilingual fidelity check and in-place correction' },
  ],
}

const ROOT = '/home/user/atlant-impossible/dissertation'
const FILES = {
  intro: ['00_annotation.md', '00_abbrev.md', '01_intro.md'],
  ch1a: ['02_ch1a.md'], ch1b: ['02_ch1b.md'], ch2a: ['03_ch2a.md'], ch2b: ['03_ch2b.md'],
  ch3a: ['04_ch3a.md'], ch3b: ['04_ch3b.md'], concl: ['05_conclusions.md', '06_appendix.md'],
}
const LANG = {
  ru: {
    name: 'Russian',
    rules: `Target: formal academic Russian of a Russian-language master's dissertation in physics (научный стиль; безличные и пассивные конструкции, «в работе», «нами»; никаких англицизмов там, где есть русский термин). Typography: «ёлочки», decimal comma (1,48; in LaTeX write 0{,}40), units кэВ, кВ, мм, см, мкм, Гр, мГр, мА·с, с; "Table/Fig." are inserted by the build as «табл. 3.4», «рис. 3.2», so write e.g. «на {{REF:fig07_baseline}}», «в {{REF:t3_4}}», «(см. {{REF:fig07_baseline}})», «по формуле {{REF:eq:def}}». Headings: "# ГЛАВА 1. ..." for chapters; "# ВВЕДЕНИЕ", "# ЗАКЛЮЧЕНИЕ", "# ПРИЛОЖЕНИЯ" (appendix sections "## Приложение А. ...", "## Приложение Б. ..."), "# АННОТАЦИЯ", "# СПИСОК СОКРАЩЕНИЙ И ОБОЗНАЧЕНИЙ"; section headings keep their numbers ("## 2.3. Образование тормозного излучения в толстой мишени"). Bold run-in labels of the introduction: **Актуальность темы.**, **Степень изученности проблемы.**, **Цель работы.**, **Задачи исследования.**, **Объект исследования.**, **Предмет исследования.**, **Методы исследования.**, **Научная новизна.**, **Практическая значимость.**, **Достоверность результатов.**, **Апробация результатов.**, **Публикации.**, **Структура и объём диссертации.** Abbreviations: DEF stays DEF; HVL → СПО; DM → РМ; MC → МК; CPE → ЭЗЧ (define at first use in each chapter, as the English text does). The placeholder text "[to be completed by the author: ...]" becomes "[заполняется автором: ...]".`,
  },
  uz: {
    name: 'Uzbek (Latin script)',
    rules: `Target: formal academic Uzbek in the official Latin script, as in an Uzbek-language master's dissertation in physics (ilmiy uslub; "ushbu ishda", "tadqiqotda", passive and impersonal constructions; correct case suffixes and agreement; standard Uzbek scientific terminology; Russian/English loanwords only where they are the established Uzbek terms). Orthography: o‘ and g‘ with U+2018 (‘) — e.g. to‘qima, bog‘liq, o‘lchov; the tutuq belgisi with U+2019 (’) — e.g. ma’lumot, ta’sir, sun’iy; NO Cyrillic letters. Typography: decimal comma (1,48; in LaTeX write 0{,}40), units keV, kV, mm, sm, mkm, Gr, mGr, mA·s, s; quotes “...”. The build inserts figure/table references as "3.2-rasm", "3.4-jadval" and equations as "(2.3)", so attach Uzbek case suffixes directly after the placeholder: "{{REF:fig07_baseline}}da ko‘rsatilgan", "{{REF:t3_4}}da keltirilgan", "{{REF:eq:def}} formula bo‘yicha". Headings: "# I BOB. ...", "# II BOB. ...", "# III BOB. ..." for chapters (Roman numeral + BOB); "# KIRISH", "# XULOSA", "# ILOVALAR" (appendix sections "## A ilova. ...", "## B ilova. ..."), "# ANNOTATSIYA", "# QISQARTMALAR VA BELGILAR RO‘YXATI"; section headings keep their numbers ("## 2.3. Qalin nishonda tormozlanish nurlanishining hosil bo‘lishi"). Bold run-in labels of the introduction: **Mavzuning dolzarbligi.**, **Muammoning o‘rganilganlik darajasi.**, **Tadqiqotning maqsadi.**, **Tadqiqotning vazifalari.**, **Tadqiqotning obyekti.**, **Tadqiqotning predmeti.**, **Tadqiqot usullari.**, **Tadqiqotning ilmiy yangiligi.**, **Tadqiqotning amaliy ahamiyati.**, **Natijalarning ishonchliligi.**, **Natijalarning aprobatsiyasi.**, **Natijalarning e’lon qilinganligi.**, **Dissertatsiyaning tuzilishi va hajmi.** Abbreviations: DEF stays DEF; HVL → YSQ; DM → IM; MC → MK; CPE → ZZM; AgNP → AgNZ; AuNP → AuNZ; ROS → KFSh (define at first use in each chapter, as the English text does). The placeholder "[to be completed by the author: ...]" becomes "[muallif tomonidan to‘ldiriladi: ...]".`,
  },
}

const COMMON = (lang) => `You are an expert scientific translator (medical physics / radiation physics) translating a master's dissertation from English into ${LANG[lang].name}. The three language versions must be identical in content, structure and numbers — a faithful, complete, natural translation, not a summary or a rewrite.

Read first: ${ROOT}/brief/GLOSSARY.md (mandatory terminology and typography), ${ROOT}/brief/CONVENTIONS.md (markup), and skim ${ROOT}/brief/OUTLINE.md (context; it contains the official titles in all three languages).

Markup that must be preserved EXACTLY (only the human-readable text is translated):
- {{FIG:id|caption}}: keep "{{FIG:id|" and "}}", translate only the caption.
- {{TABLE:id}}, {{REF:...}}, {{COUNT:...}}, [@key; @key] citation groups, {#eq:label} and {#tab:label} labels: copy unchanged, at the corresponding place in the sentence.
- Display and inline LaTeX: copy unchanged, except (a) decimal points in numbers become {,} (0.40 -> 0{,}40) and (b) words inside \\text{} or \\mathrm{} that are English words (not symbols/abbreviations like DEF, Ag, t, mix) may be translated.
- Pipe tables written in the text (e.g. tab:lit_ag, tab:methods, abbreviations): translate cell text, keep the structure; author names, element symbols and software names stay as they are.
- Fenced code blocks: copy verbatim (do not translate code or code comments).
- Heading levels, numbering, paragraph breaks, lists: identical to the English file.
Every sentence of the English file must be translated; nothing may be added or omitted; every number must be preserved (with decimal comma).

Language-specific rules: ${LANG[lang].rules}
`

const items = []
for (const part of args.parts) for (const lang of args.langs) items.push({ part, lang })

const SCHEMA = {
  type: 'object',
  properties: {
    files: { type: 'array', items: { type: 'string' } },
    checker_output: { type: 'string' },
    issues_fixed: { type: 'array', items: { type: 'string' } },
    remaining_concerns: { type: 'array', items: { type: 'string' } },
  },
  required: ['files', 'checker_output', 'issues_fixed', 'remaining_concerns'],
}

const results = await pipeline(
  items,
  it => agent(COMMON(it.lang) + `
YOUR ASSIGNMENT: translate ${FILES[it.part].map(f => ROOT + '/src/en/' + f).join(', ')} into ${LANG[it.lang].name} and write the result to the same file name(s) in ${ROOT}/src/${it.lang}/ (create the directory if needed). Translate the whole file(s), paragraph by paragraph. Then run, for each file, \`python3 ${ROOT}/code/check_translation.py ${ROOT}/src/en/<file> ${ROOT}/src/${it.lang}/<file>\` and fix every structural problem it reports (placeholders, citations, labels, headings, equations); review the reported number differences one by one and fix the real ones. Return the files written and the final checker output.`, { label: `tr:${it.part}:${it.lang}`, phase: 'Translate', schema: SCHEMA }),
  (r, it) => agent(COMMON(it.lang) + `
YOUR ASSIGNMENT: you are the bilingual verifier (native-level ${LANG[it.lang].name}, expert in physics). Compare ${FILES[it.part].map(f => ROOT + '/src/en/' + f).join(', ')} with the translation(s) in ${ROOT}/src/${it.lang}/ (same file names) paragraph by paragraph and sentence by sentence. Fix in place (Edit tool):
1. Omissions, additions, mistranslations, changes of meaning, wrong physics terminology (use GLOSSARY.md), inconsistent terms.
2. Numbers, units, decimal commas, citations, placeholders, labels, equations (run \`python3 ${ROOT}/code/check_translation.py <en> <tr>\` before and after your edits).
3. Grammar, spelling, case endings/agreement, punctuation, orthography (${it.lang === 'uz' ? 'Uzbek Latin: o‘ g‘ with U+2018, tutuq belgisi U+2019, no Cyrillic' : 'Russian: ё where needed, «» quotes, correct hyphens and dashes'}), natural formal academic style (rephrase calques into natural ${LANG[it.lang].name} while keeping the exact meaning).
4. Headings and introduction labels exactly as prescribed.
Translator report: ${JSON.stringify(r)}
Return what you fixed, the final checker output and any remaining concerns.`, { label: `verify:${it.part}:${it.lang}`, phase: 'Verify', schema: SCHEMA }),
)
return results
