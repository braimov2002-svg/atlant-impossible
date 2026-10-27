"""
check_translation.py EN_FILE TR_FILE
Compares a translated Markdown section with the English master: placeholders
({{FIG}}, {{TABLE}}, {{REF}}, {{COUNT}}), citation groups, equation labels,
headings, display equations and numbers. Prints the differences (empty output
apart from the summary = structurally identical).
"""
import re, sys
from collections import Counter

en, tr = open(sys.argv[1], encoding='utf-8').read(), open(sys.argv[2], encoding='utf-8').read()


def items(pat, s):
    return re.findall(pat, s, flags=re.S)


def show(name, a, b):
    ca, cb = Counter(a), Counter(b)
    miss, extra = ca - cb, cb - ca
    if miss or extra:
        print(f'## {name}: missing in translation {dict(miss)}; extra in translation {dict(extra)}')
        return 1
    return 0


bad = 0
bad += show('figures', items(r'\{\{FIG:(\w+)\|', en), items(r'\{\{FIG:(\w+)\|', tr))
bad += show('tables', items(r'\{\{TABLE:(\w+)\}\}', en), items(r'\{\{TABLE:(\w+)\}\}', tr))
bad += show('cross-references', items(r'\{\{REF:([\w:]+)\}\}', en), items(r'\{\{REF:([\w:]+)\}\}', tr))
bad += show('counts', items(r'\{\{COUNT:(\w+)\}\}', en), items(r'\{\{COUNT:(\w+)\}\}', tr))
bad += show('equation labels', items(r'\{#(eq:\w+)\}', en), items(r'\{#(eq:\w+)\}', tr))
bad += show('table labels', items(r'\{#(tab:\w+)\}', en), items(r'\{#(tab:\w+)\}', tr))
cit = lambda s: [' '.join(re.findall(r'@(\w+)', g)) for g in re.findall(r'\[(@[^\]]+)\]', s)]
bad += show('citation groups', cit(en), cit(tr))
# order of citation groups
if cit(en) != cit(tr) and Counter(cit(en)) == Counter(cit(tr)):
    print('## citation groups are the same but their ORDER differs (keep the English order where possible)')
hd = lambda s: [len(m) for m in re.findall(r'^(#+)\s', s, flags=re.M)]
if hd(en) != hd(tr):
    print(f'## heading structure differs: EN {hd(en)} vs TR {hd(tr)}')
    bad += 1
eqs = lambda s: [re.sub(r'\s+', '', e).replace('{,}', '.') for e in re.findall(r'\$\$(.+?)\$\$', s, flags=re.S)]
ea, eb = eqs(en), eqs(tr)
if len(ea) != len(eb):
    print(f'## number of display equations differs: {len(ea)} vs {len(eb)}')
    bad += 1
else:
    for i, (a, b) in enumerate(zip(ea, eb)):
        if re.sub(r'\\(mathrm|text)\{[^}]*\}', '', a) != re.sub(r'\\(mathrm|text)\{[^}]*\}', '', b):
            print(f'## display equation {i + 1} differs (check that only \\text/\\mathrm words were translated):\n   EN: {a[:150]}\n   TR: {b[:150]}')
# numbers (outside placeholders and code)
strip = lambda s: re.sub(r'```.*?```|\{\{[^}]*\}\}|\[@[^\]]*\]|\{#[^}]*\}', ' ', s, flags=re.S)
num_en = [x.replace(',', '') for x in re.findall(r'(?<![\w.])\d+(?:\.\d+)?', strip(en))]
num_tr = [x.replace(',', '.') for x in re.findall(r'(?<![\w,])\d+(?:,\d+)?', strip(tr).replace('{,}', ','))]
ca, cb = Counter(num_en), Counter(num_tr)
miss, extra = ca - cb, cb - ca
if miss or extra:
    print(f'## numbers (review each; differences can be legitimate, e.g. chapter numerals): missing {dict(miss)}; extra {dict(extra)}')
if '.md' in sys.argv[2] and '/uz/' in sys.argv[2]:
    cyr = re.findall(r'[А-Яа-яЁё]+', strip(tr))
    if cyr:
        print(f'## Cyrillic words in the Uzbek text: {cyr[:20]}')
    bad_ap = re.findall(r"\b\w*[oOgG]['`ʻʼ’]\w*", strip(tr))
    if bad_ap:
        print(f"## Uzbek o‘/g‘ must use U+2018 (‘): suspicious {bad_ap[:15]}")
w_en, w_tr = len(strip(en).split()), len(strip(tr).split())
print(f'summary: EN words {w_en}, translation words {w_tr} (ratio {w_tr / max(w_en, 1):.2f}); structural problems: {bad}')
