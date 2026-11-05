"""Rebuild src/{en,ru,uz} in the structure of the supervisor's plan from the
line-aligned old sources (restructure/old/<lang>) and the new blocks
(restructure/new_<lang>.md). Section references in the old text are remapped."""
import os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, '..', 'src')
LANGS = sys.argv[1:] or ['en', 'ru', 'uz']

MAP = {'1.1': '1.1', '1.2': '2.1', '1.3': '1.4', '1.4': '1.5', '1.5': '3.2.1', '1.6': '1.6',
       '2.1': '3.1.1', '2.2': '3.2.2', '2.3': '3.2.3', '2.4': '3.2.4', '2.5': '3.2.5', '2.6': '3.3.1',
       '2.7': '3.3.2', '2.8': '3.2.6', '2.9': '3.1.2', '2.10': '2.4',
       '3.1': '3.2.7', '3.2': '3.2.8', '3.3': '3.2.9', '3.4': '3.2.10', '3.5': '3.3.3', '3.6': '3.3.5',
       '3.7': '3.3.6', '3.8': '3.3.7', '3.9': '3.3.8', '3.10': '3.3.9', '3.11': '3.4', '3.12': '3.5'}
FILES = {'i': '01_intro', 'a': '02_ch1a', 'b': '02_ch1b', 'c': '03_ch2a', 'd': '03_ch2b', 'e': '04_ch3a',
         'f': '04_ch3b', 'k': '05_conclusions', 'x': '06_appendix', 'n': '00_annotation', 'v': '00_abbrev'}
SPLIT = {  # paragraphs divided between sections: (file, line) -> sentence that starts the second part
    ('a', 19): {'en': 'In photoabsorption a bound electron', 'ru': 'При фотопоглощении связанный электрон',
                'uz': 'Fotoyutilishda bog‘langan elektron'},
    ('a', 29): {'en': 'The mass energy-absorption coefficient, tabulated', 'ru': 'Массовый коэффициент поглощения энергии, табулированный',
                'uz': 'NIST tomonidan Seltzer hisoblari asosida'},
}


def remap_line(s, lang):
    """remap old section numbers in running text (not in code or LaTeX)"""
    parts = re.split(r'(\$[^$]*\$|`[^`]*`)', s)
    out = []
    for p in parts:
        if p.startswith('$') or p.startswith('`'):
            out.append(p)
            continue
        if lang == 'en':
            def rep_ctx(m):
                return re.sub(r'(?<![\d.])(\d\.\d{1,2})(?![\d.])', lambda n: MAP.get(n.group(1), n.group(1)), m.group(0))
            p = re.sub(r'Sections? \d\.\d{1,2}(?:(?:, | and |–)\d\.\d{1,2})*', rep_ctx, p)
        else:
            p = re.sub(r'(?<![\d.,])(\d\.\d{1,2})(?![\d.,]?\d)(?!\.\d)', lambda n: MAP.get(n.group(1), n.group(1)), p)
        out.append(p)
    return ''.join(out)


def load_old(lang):
    old = {}
    for k, f in FILES.items():
        lines = open(os.path.join(HERE, 'old', lang, f + '.md'), encoding='utf-8').read().split('\n')
        in_code = False
        res = []
        for ln in lines:
            if ln.startswith('```'):
                in_code = not in_code
            res.append(ln if in_code or ln.startswith('#') else remap_line(ln, lang))
        old[k] = res
    return old


def load_new(lang):
    txt = open(os.path.join(HERE, f'new_{lang}.md'), encoding='utf-8').read()
    blocks = {}
    for m in re.finditer(r'^@@(\w+)\n(.*?)(?=^@@|\Z)', txt, flags=re.S | re.M):
        blocks[m.group(1)] = m.group(2).strip()
    return blocks


def L(k, a, b=None):
    return ('L', k, a, b if b is not None else a)


def N(i):
    return ('N', i)


def S(k, n, part):
    return ('S', k, n, part)


LAYOUT = {
    '02_ch1a': [N('h1'), N('h1_1'), L('a', 5), N('p1_1a'), N('p1_1b'), L('a', 7), L('a', 9),
                N('h1_2'), N('p1_2a'), N('p1_2b'), N('h1_3'), N('p1_3a'), N('p1_3b'),
                N('h1_4'), L('a', 53), L('a', 55), L('a', 57), L('a', 59), L('a', 61), L('a', 63), L('a', 65)],
    '02_ch1b': [N('h1_5'), L('b', 3), N('p1_5a'), L('b', 5), L('b', 7, 18), L('b', 20), L('b', 22), L('b', 24),
                L('b', 49), ('LIST', [N('c1_new'), N('c1_2'), N('c1_3')])],
    '03_ch2a': [N('h2'), N('p2_0'), N('h2_1'), L('a', 13), L('a', 15, 17), S('a', 19, 0),
                N('h2_1_1'), N('p2_11a'), S('a', 19, 1), L('a', 21, 23), L('a', 25), L('a', 27),
                N('h2_1_2'), N('p2_12a'), S('a', 29, 0), N('h2_1_3'), N('p2_13a'),
                N('h2_2'), N('p2_2a'), N('f2_2'), S('a', 29, 1), L('a', 31, 33), L('a', 35), L('a', 45), L('a', 47), L('a', 49),
                N('h2_3'), N('p2_3a'), N('t2_3'), L('a', 37), L('a', 39, 41), L('a', 43), N('p2_3b'), N('t2_4'), N('f2_3'),
                N('h2_4'), ('LIST', [N('c2_1'), N('c2_2'), N('c2_3'), N('c2_4'), L('d', 113)])],
    '03_ch2b': [N('h3'), N('p3_0'), N('h3_1'), N('h3_1_1'), L('c', 7), L('c', 9), L('c', 11), L('c', 13), N('p3_1a'),
                N('h3_1_2'), L('d', 101), L('d', 103), L('d', 105),
                N('h3_2'), N('h3_2_1'), L('b', 28), L('b', 30), L('b', 32), L('b', 34), L('b', 36, 43), L('b', 45), L('b', 47),
                N('h3_2_2'), L('c', 17, 43), N('p3_22k'), N('h3_2_3'), L('c', 47, 73), N('h3_2_4'), L('c', 77, 117),
                N('h3_2_5'), L('c', 121, 153), N('h3_2_6'), L('d', 91, 97)],
    '04_ch3a': [N('h3_2_7'), L('e', 7, 27), N('h3_2_8'), L('e', 31, 39), N('h3_2_9'), L('e', 43, 57),
                N('h3_2_10'), L('e', 61, 73), N('h3_3'), N('h3_3_1'), L('d', 3, 57), N('h3_3_2'), L('d', 61, 87),
                N('h3_3_3'), L('e', 77, 87), N('h3_3_4'), N('p3_34a'), N('t3_13'), N('h3_3_5'), L('e', 91, 121)],
    '04_ch3b': [N('h3_3_6'), L('f', 3, 13), N('h3_3_7'), L('f', 17, 29), N('h3_3_8'), L('f', 33, 39),
                N('h3_3_9'), L('f', 43, 55), N('h3_4'), L('f', 59, 65), N('h3_5'),
                ('LIST', [L('d', 109), L('d', 110), L('d', 111), L('d', 112), L('d', 114)] +
                 [L('f', n) for n in range(69, 76)] + [N('c3_media')])],
    '01_intro': [L('i', 1, 13), ('LIST', [N('task1'), N('task2')] + [L('i', n) for n in range(16, 22)]),
                 L('i', 22, 44), N('struct')],
    '05_conclusions': [L('k', 1, 2), ('LIST', [L('k', 3), N('concl_new')] + [L('k', n) for n in range(5, 22, 2)]),
                       L('k', 22, 34)],
    '06_appendix': [L('x', 1, 83)], '00_abbrev': [L('v', 1, 51)], '00_annotation': [L('n', 1, 8)],
}


POST = {
    'en': {'00_annotation': [('and is comparable to iodine.', 'and is comparable to iodine. In brain and water the DEF is practically the same as in soft tissue, whereas in cortical bone it is only 1.03–1.12.')],
           '02_ch1b': [('carry their energy away (Section 2.1)', 'carry their energy away (Section 2.1.1)'),
                       ('(Sections 2.1 and 1.4)', '(Sections 2.2 and 1.4)')],
           '03_ch2b': [('(Sections 2.1 and 1.4)', '(Sections 2.2 and 1.4)'),
                       ('ranges studied in Chapter 3', 'ranges studied in Sections 3.2 and 3.3'),
                       ('as Chapter 3 shows', 'as Section 3.3.5 shows'),
                       ('electron depth factor (Chapter 2)', 'electron depth factor (Section 3.2.2)')],
           '04_ch3a': [('filter optimisation in Chapter 3.', 'filter optimisation in Section 3.3.5.')],
           '06_appendix': [('auxiliary checks of Chapter 2 excluded', 'auxiliary checks of Section 3.2 excluded')]},
    'ru': {'00_annotation': [('и сопоставимо с йодом.', 'и сопоставимо с йодом. В головном мозге и воде DEF практически такой же, как в мягкой ткани, тогда как в кортикальной кости он составляет лишь 1,03–1,12.')],
           '02_ch1b': [('(раздел 2.1)', '(раздел 2.1.1)'), ('(разделы 2.1 и 1.4)', '(разделы 2.2 и 1.4)')],
           '03_ch2b': [('(разделы 2.1 и 1.4)', '(разделы 2.2 и 1.4)'),
                       ('исследованные в главе 3;', 'исследованные в разделах 3.2 и 3.3;'),
                       ('как показано в главе 3 для', 'как показано в разделе 3.3.5 для'),
                       ('электронов (глава 2)', 'электронов (раздел 3.2.2)')],
           '04_ch3a': [('оптимизации фильтров в главе 3.', 'оптимизации фильтров в разделе 3.3.5.')],
           '06_appendix': [('вспомогательных проверок главы 2)', 'вспомогательных проверок раздела 3.2)')]},
    'uz': {'00_annotation': [('yod bilan taqqoslanarli.', 'yod bilan taqqoslanarli. Bosh miya va suvda DEF amalda yumshoq to‘qimadagi bilan bir xil, kortikal suyakda esa atigi 1,03–1,12 ga teng.')],
           '02_ch1b': [('(2.1-bo‘lim)', '(2.1.1-bo‘lim)'), ('2.1- va 1.4-bo‘limlar', '2.2- va 1.4-bo‘limlar')],
           '03_ch2b': [('2.1- va 1.4-bo‘limlar', '2.2- va 1.4-bo‘limlar'),
                       ('III bobda o‘rganilgan oraliqlar', '3.2- va 3.3-bo‘limlarda o‘rganilgan oraliqlar'),
                       ('III bobda bu yutilish', '3.3.5-bo‘limda bu yutilish'),
                       ('(II bob)', '(3.2.2-bo‘lim)')],
           '04_ch3a': [('III bobdagi filtrni optimallashtirishning', '3.3.5-bo‘limdagi filtrni optimallashtirishning')],
           '06_appendix': [('II bobdagi yordamchi tekshiruvlar', '3.2-bo‘limdagi yordamchi tekshiruvlar')]},
}


NEW_ABBR = {'en': ['| DSB | double-strand break of DNA |', '| mtDNA | mitochondrial DNA |', '| SSB | single-strand break of DNA |'],
            'ru': ['| ДР | двунитевой разрыв ДНК |', '| мтДНК | митохондриальная ДНК |', '| ОР | однонитевой разрыв ДНК |'],
            'uz': ['| BIU | DNKning bir ipli uzilishi |', '| IIU | DNKning ikki ipli uzilishi |', '| mtDNK | mitoxondrial DNK |']}


def add_abbr(text, lang):
    lines = text.split('\n')
    rows = [i for i, l in enumerate(lines) if l.startswith('| ') and '$' not in l.split('|')[1] and not l.startswith('| Abbrev')
            and not re.match(r'\| (Сокращение|Qisqartma)', l)]
    abbr = [lines[i] for i in rows] + NEW_ABBR[lang]
    cyr = lambda r: bool(re.match(r'\| [А-Яа-яЁё]', r))
    abbr.sort(key=lambda r: (not cyr(r) if lang == 'ru' else 0, r.split('|')[1].strip().lower()))
    out = lines[:rows[0]] + abbr + lines[rows[-1] + 1:]
    return '\n'.join(out)


def renumber(item, n):
    return re.sub(r'^\d+\.\s', f'{n}. ', item, count=1)


def build(lang):
    old, new = load_old(lang), load_new(lang)

    def piece(p):
        if p[0] == 'N':
            return [new[p[1]]]
        if p[0] == 'L':
            return old[p[1]][p[2] - 1:p[3]]
        if p[0] == 'S':
            line = old[p[1]][p[2] - 1]
            key = SPLIT[(p[1], p[2])][lang]
            i = line.index(key)
            return [line[:i].rstrip() if p[3] == 0 else line[i:]]
        raise ValueError(p)

    for fname, layout in LAYOUT.items():
        out = []
        for p in layout:
            if p[0] == 'LIST':
                items = [piece(q)[0] for q in p[1]]
                out.append('\n'.join(renumber(it, i + 1) for i, it in enumerate(items)))
            else:
                out.append('\n'.join(piece(p)).strip('\n'))
        text = '\n\n'.join(x for x in out if x.strip()) + '\n'
        text = re.sub(r'\n{3,}', '\n\n', text)
        if fname == '00_abbrev':
            text = add_abbr(text, lang)
        for a, b in POST[lang].get(fname, []):
            if text.count(a) != 1:
                print('POST mismatch', lang, fname, a, text.count(a))
            text = text.replace(a, b)
        open(os.path.join(SRC, lang, fname + '.md'), 'w', encoding='utf-8').write(text)


for lang in LANGS:
    build(lang)
    print('built', lang)
