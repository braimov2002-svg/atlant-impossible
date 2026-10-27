export const meta = {
  name: 'sync-translations',
  description: 'Bring Russian and Uzbek translations in line with the condensed English master, then verify fidelity',
  phases: [
    { title: 'Sync', detail: 'apply the English changes to each translation' },
    { title: 'Verify', detail: 'bilingual fidelity check against the new English' },
  ],
}

const ROOT = '/home/user/atlant-impossible/dissertation'
const PREV = args.prev   // directory with the previous English files
const LANG = {
  ru: { name: 'Russian', ortho: 'Russian: ё where needed, «» quotes, correct dashes, decimal comma (0{,}40 inside LaTeX), units кэВ, кВ, мм, см, мкм, Гр, мГр, мА·с' },
  uz: { name: 'Uzbek (Latin script)', ortho: 'Uzbek Latin: o‘ g‘ with U+2018, tutuq belgisi U+2019, no Cyrillic, decimal comma (0{,}40 inside LaTeX), units keV, kV, mm, sm, mkm, Gr, mGr, mA·s; case suffixes attached directly after {{REF:...}} placeholders and abbreviations (DEFning, 3.2-rasmda)' },
}
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
const items = []
for (const f of args.files) for (const lang of args.langs) items.push({ f, lang })

const common = (lang) => `You maintain the ${LANG[lang].name} version of a master's dissertation in medical physics that must stay IDENTICAL in content, structure and numbers to its English master. Read ${ROOT}/brief/GLOSSARY.md (terminology, typography) and ${ROOT}/brief/CONVENTIONS.md (markup). Markup must stay exactly as in the English file: {{FIG:id|caption}} (translate only the caption), {{TABLE:id}}, {{REF:...}}, {{COUNT:...}}, [@key; ...] citation groups (same order), {#eq:...}/{#tab:...} labels, LaTeX (only decimal points -> {,}), fenced code verbatim, headings with the same numbering and levels (Russian chapters "# ГЛАВА N. ...", Uzbek "# I BOB. ..."). Orthography: ${LANG[lang].ortho}. Style: formal academic ${LANG[lang].name}, consistent with the terminology already used in the other files of ${ROOT}/src/${lang}/.`

const results = await pipeline(
  items,
  it => agent(common(it.lang) + `

The English file ${ROOT}/src/en/${it.f} has just been condensed by the editor (previous version: ${PREV}/${it.f}). The current translation ${ROOT}/src/${it.lang}/${it.f} still corresponds to the PREVIOUS English version.
YOUR ASSIGNMENT: update ${ROOT}/src/${it.lang}/${it.f} so that it is a faithful, complete translation of the NEW English file. Work from the differences (e.g. \`diff <(fold -w 200 -s ${PREV}/${it.f}) <(fold -w 200 -s ${ROOT}/src/en/${it.f})\` or a Python difflib comparison by sentences): delete the translation of every removed sentence, rewrite every changed sentence according to its new English wording, translate any new or merged sentences, and keep the existing wording wherever the English is unchanged (it has already been verified). The result must contain nothing that the new English does not say. Then run \`python3 ${ROOT}/code/check_translation.py ${ROOT}/src/en/${it.f} ${ROOT}/src/${it.lang}/${it.f}\`, fix every structural problem, check the number differences one by one, and make sure the length ratio is plausible (about 0.85–1.0 of the English word count). Return the final checker output.`, { label: `sync:${it.f}:${it.lang}`, phase: 'Sync', schema: SCHEMA }),
  (r, it) => agent(common(it.lang) + `

YOUR ASSIGNMENT: you are the bilingual verifier (native-level ${LANG[it.lang].name}, expert in physics). Compare ${ROOT}/src/en/${it.f} with ${ROOT}/src/${it.lang}/${it.f} paragraph by paragraph and sentence by sentence and fix in place: omissions, additions (anything not in the English must go), mistranslations, wrong or inconsistent terminology, numbers, units, decimal commas, citations, placeholders, labels, equations, grammar, agreement, punctuation and orthography, unnatural calques. Run \`python3 ${ROOT}/code/check_translation.py ${ROOT}/src/en/${it.f} ${ROOT}/src/${it.lang}/${it.f}\` before and after. Sync report: ${JSON.stringify(r)}. Return what you fixed and the final checker output.`, { label: `verify:${it.f}:${it.lang}`, phase: 'Verify', schema: SCHEMA }),
)
return results
