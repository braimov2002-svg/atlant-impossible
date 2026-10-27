"""
make_tables.py - all numerical tables of the dissertation, generated from
data/results.json and data/mc_results.json in three languages
(data/tables/{en,ru,uz}/<id>.md: first line = title, then a pipe table).
"""
import json, os
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, '..', 'data')
R = json.load(open(os.path.join(DATA, 'results.json')))
MC = json.load(open(os.path.join(DATA, 'mc_results.json')))
LANGS = ['en', 'ru', 'uz']


def f(x, nd, lang):
    if x is None:
        return '–'
    s = f'{x:.{nd}f}'
    return s if lang == 'en' else s.replace('.', ',')


def g(x, lang, sig=3):
    """scientific-like formatting for kerma etc."""
    s = f'{x:.{sig}g}'
    if 'e' in s:
        m, e = s.split('e')
        s = f'{m}·10^{int(e)}^'
    return s if lang == 'en' else s.replace('.', ',')


MM = {'en': 'mm', 'ru': 'мм', 'uz': 'mm'}
KEV = {'en': 'keV', 'ru': 'кэВ', 'uz': 'keV'}
KV = {'en': 'kV', 'ru': 'кВ', 'uz': 'kV'}


def flab(label, lang):
    if label == 'none':
        return {'en': 'no added filter', 'ru': 'без доп. фильтра', 'uz': 'qo‘shimcha filtrsiz'}[lang]
    sym, th = label.split()
    return f'{sym} {th if lang == "en" else th.replace(".", ",")} {MM[lang]}'


def table(head, rows):
    out = ['| ' + ' | '.join(head) + ' |', '|' + '|'.join([':---'] + ['---:'] * (len(head) - 1)) + '|']
    for r in rows:
        out.append('| ' + ' | '.join(str(c) for c in r) + ' |')
    return '\n'.join(out)


T = {}

# ---------------------------------------------------------------- t2_1 tube parameters
b = R['baseline']
for L in LANGS:
    title = {'en': 'Baseline design and technical parameters of the modelled X-ray tube',
             'ru': 'Базовые конструктивные и технические параметры моделируемой рентгеновской трубки',
             'uz': 'Modellashtirilgan rentgen trubkasining bazaviy konstruktiv va texnik parametrlari'}[L]
    H = {'en': ['Parameter', 'Value', 'Range studied'], 'ru': ['Параметр', 'Значение', 'Исследованный диапазон'],
         'uz': ['Parametr', 'Qiymat', 'O‘rganilgan oraliq']}[L]
    rows = {
        'en': [['Tube voltage (constant potential)', '45 kV', '20–50 kV (SpekPy), up to 80 kV (model)'],
               ['Anode (target) material', 'Cu, Z = 29, ρ = 8.96 g/cm³', 'W (validation)'],
               ['Anode angle θ (central-ray take-off angle)', '12°', '6–30°'],
               ['Beryllium window thickness', '0.5 mm', '0.15–2.0 mm'],
               ['Focus–sample distance (air path)', '10 cm', '–'],
               ['Tube current', '40 mA', '–'],
               ['Added filters', 'none', 'Al 0.25–6 mm; Ti, Ni, Cu, Mo, Ag, Sn; 43 elements Z = 13–83'],
               ['Energy bin width', '0.05 keV', '–']],
        'ru': [['Напряжение на трубке (постоянное)', '45 кВ', '20–50 кВ (SpekPy), до 80 кВ (модель)'],
               ['Материал анода (мишени)', 'Cu, Z = 29, ρ = 8,96 г/см³', 'W (валидация)'],
               ['Угол анода θ (угол выхода центрального луча)', '12°', '6–30°'],
               ['Толщина бериллиевого окна', '0,5 мм', '0,15–2,0 мм'],
               ['Расстояние фокус–образец (воздушный путь)', '10 см', '–'],
               ['Ток трубки', '40 мА', '–'],
               ['Дополнительные фильтры', 'нет', 'Al 0,25–6 мм; Ti, Ni, Cu, Mo, Ag, Sn; 43 элемента Z = 13–83'],
               ['Ширина энергетического интервала', '0,05 кэВ', '–']],
        'uz': [['Trubka kuchlanishi (o‘zgarmas)', '45 kV', '20–50 kV (SpekPy), 80 kV gacha (model)'],
               ['Anod (nishon) materiali', 'Cu, Z = 29, ρ = 8,96 g/sm³', 'W (validatsiya)'],
               ['Anod burchagi θ (markaziy nurning chiqish burchagi)', '12°', '6–30°'],
               ['Berilliy oyna qalinligi', '0,5 mm', '0,15–2,0 mm'],
               ['Fokus–namuna masofasi (havo yo‘li)', '10 sm', '–'],
               ['Trubka toki', '40 mA', '–'],
               ['Qo‘shimcha filtrlar', 'yo‘q', 'Al 0,25–6 mm; Ti, Ni, Cu, Mo, Ag, Sn; Z = 13–83 bo‘lgan 43 element'],
               ['Energiya oralig‘i kengligi', '0,05 keV', '–']]}[L]
    T.setdefault('t2_1', {})[L] = (title, table(H, rows))

# ---------------------------------------------------------------- t2_2 atomic data
for L in LANGS:
    title = {'en': 'Atomic and physical data of the elements used (xraylib; densities from standard tables)',
             'ru': 'Атомные и физические данные используемых элементов (xraylib; плотности по справочным данным)',
             'uz': 'Foydalanilgan elementlarning atom va fizik ma’lumotlari (xraylib; zichliklar ma’lumotnoma jadvallaridan)'}[L]
    H = {'en': ['Element', 'Z', 'ρ, g/cm³', 'E_K, keV', 'E_L3, keV', 'Kα₁, keV', 'ω_K'],
         'ru': ['Элемент', 'Z', 'ρ, г/см³', 'E_K, кэВ', 'E_L3, кэВ', 'Kα₁, кэВ', 'ω_K'],
         'uz': ['Element', 'Z', 'ρ, g/sm³', 'E_K, keV', 'E_L3, keV', 'Kα₁, keV', 'ω_K']}[L]
    rows = [[a['sym'], a['Z'], f(a['rho'], 3 if a['rho'] < 10 else 2, L), f(a['EK'], 3, L), f(a['EL3'], 3, L),
             f(a['Ka1'], 3, L), f(a['omegaK'], 3, L)] for a in R['atomic_table']]
    T.setdefault('t2_2', {})[L] = (title, table(H, rows))

# ---------------------------------------------------------------- t3_1 validation
for L in LANGS:
    title = {'en': 'Comparison of the developed model (DM) with SpekPy v2 for the Cu anode (0.5 mm Be, no air)',
             'ru': 'Сравнение разработанной модели (РМ) со SpekPy v2 для Cu-анода (0,5 мм Be, без воздуха)',
             'uz': 'Ishlab chiqilgan model (IM) va SpekPy v2 natijalarini Cu anod uchun solishtirish (0,5 mm Be, havosiz)'}[L]
    dm = {'en': 'DM', 'ru': 'РМ', 'uz': 'IM'}[L]
    H = {'en': ['U, kV', 'θ', 'Filter', f'Ē {dm}, keV', 'Ē SpekPy, keV', f'HVL {dm}, mm Al', 'HVL SpekPy, mm Al',
                'ΔHVL, %', f'K-lines/brems {dm}', 'K-lines/brems SpekPy'],
         'ru': ['U, кВ', 'θ', 'Фильтр', f'Ē {dm}, кэВ', 'Ē SpekPy, кэВ', f'СПО {dm}, мм Al', 'СПО SpekPy, мм Al',
                'ΔСПО, %', f'K-линии/торм. {dm}', 'K-линии/торм. SpekPy'],
         'uz': ['U, kV', 'θ', 'Filtr', f'Ē {dm}, keV', 'Ē SpekPy, keV', f'YSQ {dm}, mm Al', 'YSQ SpekPy, mm Al',
                'ΔYSQ, %', f'K-chiziq/torm. {dm}', 'K-chiziq/torm. SpekPy']}[L]
    rows = []
    for v in R['validation_cu']:
        fl = flab('none' if v['filter'] == 'none' else 'Al 1.0', L)
        cb = v['char_to_brems_DM'] if v['filter'] == 'none' else None
        cs = v['char_to_brems_SP'] if v['filter'] == 'none' else None
        rows.append([v['kvp'], f"{v['theta']}°", fl, f(v['Emean_DM'], 2, L), f(v['Emean_SP'], 2, L),
                     f(v['HVL_DM'], 4 if v['HVL_DM'] < 0.1 else 3, L), f(v['HVL_SP'], 4 if v['HVL_SP'] < 0.1 else 3, L),
                     f(v['HVL_dev_pct'], 1, L), f(cb, 2, L), f(cs, 2, L)])
    T.setdefault('t3_1', {})[L] = (title, table(H, rows))

# W check
for L in LANGS:
    title = {'en': 'Check of the model for a W anode (θ = 12°, 2.5 mm Al), comparison with SpekPy v2',
             'ru': 'Проверка модели для W-анода (θ = 12°, 2,5 мм Al), сравнение со SpekPy v2',
             'uz': 'Modelni W anod uchun tekshirish (θ = 12°, 2,5 mm Al), SpekPy v2 bilan solishtirish'}[L]
    dm = {'en': 'DM', 'ru': 'РМ', 'uz': 'IM'}[L]
    H = {'en': ['U, kV', f'Ē {dm}, keV', 'Ē SpekPy, keV', f'HVL {dm}, mm Al', 'HVL SpekPy, mm Al', 'ΔHVL, %'],
         'ru': ['U, кВ', f'Ē {dm}, кэВ', 'Ē SpekPy, кэВ', f'СПО {dm}, мм Al', 'СПО SpekPy, мм Al', 'ΔСПО, %'],
         'uz': ['U, kV', f'Ē {dm}, keV', 'Ē SpekPy, keV', f'YSQ {dm}, mm Al', 'YSQ SpekPy, mm Al', 'ΔYSQ, %']}[L]
    rows = [[v['kvp'], f(v['Emean_DM'], 2, L), f(v['Emean_SP'], 2, L), f(v['HVL_DM'], 3, L), f(v['HVL_SP'], 3, L),
             f((v['HVL_DM'] / v['HVL_SP'] - 1) * 100, 1, L)] for v in R['validation_w']]
    T.setdefault('t3_1w', {})[L] = (title, table(H, rows))

# ---------------------------------------------------------------- t3_2 baseline lines + quality
for L in LANGS:
    title = {'en': 'Characteristic Cu K lines and beam-quality parameters of the baseline spectrum (45 kV, θ = 12°, 0.5 mm Be, 10 cm air)',
             'ru': 'Характеристические K-линии Cu и параметры качества пучка базового спектра (45 кВ, θ = 12°, 0,5 мм Be, 10 см воздуха)',
             'uz': 'Bazaviy spektrning Cu K xarakteristik chiziqlari va dasta sifati parametrlari (45 kV, θ = 12°, 0,5 mm Be, 10 sm havo)'}[L]
    H = {'en': ['Quantity', 'Developed model', 'SpekPy v2'], 'ru': ['Величина', 'Разработанная модель', 'SpekPy v2'],
         'uz': ['Kattalik', 'Ishlab chiqilgan model', 'SpekPy v2']}[L]
    lines = {d['name']: d for d in R['cu_lines']}
    q1, q2 = b['DM'], b['SP']
    nm = {
        'Ka1': {'en': 'Kα₁ (K–L₃) energy, keV; relative rate', 'ru': 'Kα₁ (K–L₃): энергия, кэВ; отн. вероятность', 'uz': 'Kα₁ (K–L₃): energiya, keV; nisbiy ehtimollik'},
        'Ka2': {'en': 'Kα₂ (K–L₂) energy, keV; relative rate', 'ru': 'Kα₂ (K–L₂): энергия, кэВ; отн. вероятность', 'uz': 'Kα₂ (K–L₂): energiya, keV; nisbiy ehtimollik'},
        'Kb1': {'en': 'Kβ₁,₃ (K–M₂,₃) energy, keV; relative rate', 'ru': 'Kβ₁,₃ (K–M₂,₃): энергия, кэВ; отн. вероятность', 'uz': 'Kβ₁,₃ (K–M₂,₃): energiya, keV; nisbiy ehtimollik'},
    }
    rows = [[nm['Ka1'][L], f"{f(lines['Ka1']['E'], 3, L)}; {f(lines['Ka1']['rel_rate'], 3, L)}", '–'],
            [nm['Ka2'][L], f"{f(lines['Ka2']['E'], 3, L)}; {f(lines['Ka2']['rel_rate'], 3, L)}", '–'],
            [nm['Kb1'][L], f"{f(lines['Kb1']['E'], 3, L)}; {f(lines['Kb1']['rel_rate'] + lines['Kb3']['rel_rate'], 3, L)}", '–']]
    lab = {
        'ind': {'en': 'Share of indirect (photon-induced) K fluorescence, %', 'ru': 'Доля косвенной (фотонной) K-флуоресценции, %', 'uz': 'Bilvosita (foton) K-flyuoressensiya ulushi, %'},
        'em': {'en': 'Mean energy Ē, keV', 'ru': 'Средняя энергия Ē, кэВ', 'uz': 'O‘rtacha energiya Ē, keV'},
        'h1': {'en': 'First HVL, mm Al', 'ru': 'Первый СПО, мм Al', 'uz': 'Birinchi YSQ, mm Al'},
        'h2': {'en': 'Second HVL, mm Al', 'ru': 'Второй СПО, мм Al', 'uz': 'Ikkinchi YSQ, mm Al'},
        'hc': {'en': 'Homogeneity coefficient', 'ru': 'Коэффициент однородности', 'uz': 'Bir jinslilik koeffitsiyenti'},
        'ee': {'en': 'Effective energy, keV', 'ru': 'Эффективная энергия, кэВ', 'uz': 'Effektiv energiya, keV'},
        'fa': {'en': 'Photon fraction above the Ag K-edge, %', 'ru': 'Доля фотонов выше K-края Ag, %', 'uz': 'Ag K-chegarasidan yuqori fotonlar ulushi, %'},
        'fe': {'en': 'Energy fraction above the Ag K-edge, %', 'ru': 'Доля энергии выше K-края Ag, %', 'uz': 'Ag K-chegarasidan yuqori energiya ulushi, %'},
        'k': {'en': 'Air kerma at 10 cm, mGy/mAs', 'ru': 'Воздушная керма на 10 см, мГр/(мА·с)', 'uz': 'Havo kermasi (10 sm), mGr/(mA·s)'},
        'cf': {'en': 'Share of characteristic photons in fluence, %', 'ru': 'Доля характеристических фотонов во флюенсе, %', 'uz': 'Flyuensda xarakteristik fotonlar ulushi, %'},
    }
    rows += [[lab['ind'][L], f(lines['Ka1']['indirect_frac'] * 100, 1, L), '–'],
             [lab['em'][L], f(q1['Emean'], 2, L), f(q2['Emean'], 2, L)],
             [lab['h1'][L], f(q1['HVL1_mmAl'], 4, L), f(q2['HVL1_mmAl'], 4, L)],
             [lab['h2'][L], f(q1['HVL2_mmAl'], 4, L), f(q2['HVL2_mmAl'], 4, L)],
             [lab['hc'][L], f(q1['hc'], 2, L), f(q2['hc'], 2, L)],
             [lab['ee'][L], f(q1['Eeff'], 2, L), f(q2['Eeff'], 2, L)],
             [lab['fa'][L], f(q1['frac_above_AgK'] * 100, 2, L), f(q2['frac_above_AgK'] * 100, 2, L)],
             [lab['fe'][L], f(q1['energy_frac_above_AgK'] * 100, 1, L), f(q2['energy_frac_above_AgK'] * 100, 1, L)],
             [lab['k'][L], f(b['kerma_mGy_per_mAs_DM'], 0, L), f(b['kerma_mGy_per_mAs_SP'], 0, L)],
             [lab['cf'][L], '–', f(b['char_fraction_fluence_SP'] * 100, 1, L)]]
    T.setdefault('t3_2', {})[L] = (title, table(H, rows))

# ---------------------------------------------------------------- t3_3 parameter studies
for L in LANGS:
    title = {'en': 'Influence of tube design parameters on the beam quality and on the DEF for 1 % Ag (SpekPy spectra; DEF also with the developed model)',
             'ru': 'Влияние конструктивных параметров трубки на качество пучка и DEF для 1 % Ag (спектры SpekPy; DEF также по разработанной модели)',
             'uz': 'Trubka konstruktiv parametrlarining dasta sifatiga va 1 % Ag uchun DEF ga ta’siri (SpekPy spektrlari; DEF ishlab chiqilgan model bo‘yicha ham)'}[L]
    H = {'en': ['Parameter', 'Value', 'Ē, keV', 'HVL, mm Al', 'K_air, mGy/mAs', 'DEF (SpekPy)', 'DEF (DM)'],
         'ru': ['Параметр', 'Значение', 'Ē, кэВ', 'СПО, мм Al', 'K_возд, мГр/(мА·с)', 'DEF (SpekPy)', 'DEF (РМ)'],
         'uz': ['Parametr', 'Qiymat', 'Ē, keV', 'YSQ, mm Al', 'K_havo, mGr/(mA·s)', 'DEF (SpekPy)', 'DEF (IM)']}[L]
    pn = {'angle': {'en': 'anode angle', 'ru': 'угол анода', 'uz': 'anod burchagi'},
          'kvp': {'en': 'tube voltage', 'ru': 'напряжение', 'uz': 'kuchlanish'},
          'be': {'en': 'Be window', 'ru': 'Be-окно', 'uz': 'Be oyna'}}
    rows = []
    keep = {'angle': ['6', '12', '20', '30'], 'kvp': ['25', '35', '45', '50'], 'be': ['0.15', '0.5', '2.0']}
    for key, unit in [('angle', '°'), ('kvp', ' ' + KV[L]), ('be', ' ' + MM[L])]:
        for q in [q for q in R['studies'][key] if q['label'] in keep[key]]:
            val = q['label'] if L == 'en' else q['label'].replace('.', ',')
            rows.append([pn[key][L], val + unit, f(q['Emean'], 2, L), f(q['HVL1_mmAl'], 4, L),
                         f(q['kerma_mGy_per_mAs'], 0, L), f(q['DEF1_SP'], 3, L), f(q['DEF1_DM'], 3, L)])
    T.setdefault('t3_3', {})[L] = (title, table(H, rows))

# ---------------------------------------------------------------- t3_4 filters
for L in LANGS:
    title = {'en': 'Beam-quality parameters, relative air kerma and DEF (1 % Ag) for different added filters (45 kV, θ = 12°, 0.5 mm Be, 10 cm)',
             'ru': 'Параметры качества пучка, относительная воздушная керма и DEF (1 % Ag) для различных дополнительных фильтров (45 кВ, θ = 12°, 0,5 мм Be, 10 см)',
             'uz': 'Turli qo‘shimcha filtrlar uchun dasta sifati parametrlari, havodagi nisbiy kerma va DEF (1 % Ag) (45 kV, θ = 12°, 0,5 mm Be, 10 sm)'}[L]
    H = {'en': ['Filter', 'Ē, keV', 'HVL, mm Al', 'Photons above Ag K-edge, %', 'K/K₀', 'DEF (SpekPy)', 'DEF (DM)'],
         'ru': ['Фильтр', 'Ē, кэВ', 'СПО, мм Al', 'Фотоны выше K-края Ag, %', 'K/K₀', 'DEF (SpekPy)', 'DEF (РМ)'],
         'uz': ['Filtr', 'Ē, keV', 'YSQ, mm Al', 'Ag K-chegarasidan yuqori fotonlar, %', 'K/K₀', 'DEF (SpekPy)', 'DEF (IM)']}[L]
    k0 = R['studies']['filters'][0]['kerma_mGy_per_mAs']
    rows = [[flab(q['label'], L), f(q['Emean'], 2, L), f(q['HVL1_mmAl'], 3, L), f(q['frac_above_AgK'] * 100, 1, L),
             g(q['kerma_mGy_per_mAs'] / k0, L), f(q['DEF1_SP'], 3, L), f(q['DEF1_DM'], 3, L)]
            for q in R['studies']['filters']]
    T.setdefault('t3_4', {})[L] = (title, table(H, rows))

# ---------------------------------------------------------------- t3_5 DEF matrix
for L in LANGS:
    title = {'en': 'Dose enhancement factor of ICRU-44 soft tissue versus Ag mass fraction for different filters (SpekPy spectra)',
             'ru': 'Коэффициент усиления дозы мягкой ткани (МКРЕ-44) в зависимости от массовой доли Ag для различных фильтров (спектры SpekPy)',
             'uz': 'Turli filtrlar uchun yumshoq to‘qima (ICRU-44) dozasini kuchaytirish koeffitsiyentining Ag massa ulushiga bog‘liqligi (SpekPy spektrlari)'}[L]
    H = [{'en': 'Filter', 'ru': 'Фильтр', 'uz': 'Filtr'}[L]] + [f"w = {f(w * 100, 1, L)} %" for w in R['WS']] + \
        [{'en': '(DEF−1)/w, per 1 %', 'ru': '(DEF−1)/w, на 1 %', 'uz': '(DEF−1)/w, 1 % ga'}[L]]
    rows = [[flab(r_['label'], L)] + [f(r_[f'SP_{w}'], 3, L) for w in R['WS']] + [f((r_['SP_0.01'] - 1), 3, L)]
            for r_ in R['DEF_table']]
    T.setdefault('t3_5', {})[L] = (title, table(H, rows))

# ---------------------------------------------------------------- t3_6 equal-transmission scan + exposure
for L in LANGS:
    title = {'en': 'Filter materials at equal air-kerma transmission: required thickness and DEF (1 % Ag)',
             'ru': 'Материалы фильтров при одинаковом пропускании воздушной кермы: требуемая толщина и DEF (1 % Ag)',
             'uz': 'Havo kermasini bir xil o‘tkazishda filtr materiallari: talab etiladigan qalinlik va DEF (1 % Ag)'}[L]
    um = {'en': 'µm', 'ru': 'мкм', 'uz': 'mkm'}[L]
    H = [{'en': 'Filter', 'ru': 'Фильтр', 'uz': 'Filtr'}[L], 'Z'] + \
        [x for TK in ['10', '1', '0.1'] for x in (f"t ({TK if L == 'en' else TK.replace('.', ',')} %), {um}", f"DEF ({TK if L == 'en' else TK.replace('.', ',')} %)")]
    sel = ['Al', 'Ti', 'Co', 'Cu', 'Mo', 'Ag', 'Sn', 'I', 'Gd', 'W']
    rows = []
    for s in R['filter_scan']:
        if s['sym'] in sel:
            rows.append([s['sym'], s['Z']] + [x for TK in ['0.1', '0.01', '0.001']
                                               for x in (f(s[f't_um_{TK}'], 1, L), f(s[f'DEF1_{TK}'], 3, L))])
    T.setdefault('t3_6', {})[L] = (title, table(H, rows))

for L in LANGS:
    title = {'en': 'Tissue kerma rate at the sample surface (10 cm, 40 mA) and time needed to deliver 2 Gy',
             'ru': 'Мощность кермы в ткани на поверхности образца (10 см, 40 мА) и время облучения дозой 2 Гр',
             'uz': 'Namuna sirtida to‘qima kermasining quvvati (10 sm, 40 mA) va 2 Gr doza berish uchun vaqt'}[L]
    H = {'en': ['Filter', 'Tissue kerma, mGy/mAs', 'Kerma rate, Gy/s', 'Time for 2 Gy, s', 'DEF (1 % Ag)'],
         'ru': ['Фильтр', 'Керма в ткани, мГр/(мА·с)', 'Мощность кермы, Гр/с', 'Время для 2 Гр, с', 'DEF (1 % Ag)'],
         'uz': ['Filtr', 'To‘qima kermasi, mGr/(mA·s)', 'Kerma quvvati, Gr/s', '2 Gr uchun vaqt, s', 'DEF (1 % Ag)']}[L]
    dmap = {r_['label']: r_['SP_0.01'] for r_ in R['DEF_table']}
    rows = [[flab(e['label'], L), f(e['tissue_kerma_Gy_per_mAs'] * 1e3, 2 if e['tissue_kerma_Gy_per_mAs'] < 0.01 else 1, L),
             f(e['tissue_kerma_Gy_per_mAs'] * 40, 3 if e['tissue_kerma_Gy_per_mAs'] * 40 < 1 else 2, L),
             f(e['time_s_2Gy_40mA'], 2 if e['time_s_2Gy_40mA'] < 10 else 1, L), f(dmap[e['label']], 3, L)] for e in R['exposure']
            if e['label'] in ('none', 'Al 0.5', 'Al 1.0', 'Al 2.0', 'Cu 0.1', 'Cu 0.2', 'Sn 0.1', 'Ag 0.05')]
    T.setdefault('t3_7', {})[L] = (title, table(H, rows))

# ---------------------------------------------------------------- t3_8 depth
for L in LANGS:
    title = {'en': 'DEF (1 % Ag) and relative tissue dose versus depth in soft tissue for selected filters (primary beam)',
             'ru': 'DEF (1 % Ag) и относительная доза в ткани в зависимости от глубины для выбранных фильтров (первичный пучок)',
             'uz': 'Tanlangan filtrlar uchun DEF (1 % Ag) va nisbiy dozaning yumshoq to‘qimadagi chuqurlikka bog‘liqligi (birlamchi dasta)'}[L]
    dd = R['DEF_depth']
    depths = dd[0]['depth_mm']
    sel = [0, 2, 4, 5, 7, 9]
    H = [{'en': 'Filter', 'ru': 'Фильтр', 'uz': 'Filtr'}[L]] + [f"{f(depths[i], 1 if depths[i] % 1 else 0, L)} {MM[L]}" for i in sel]
    rows = []
    for d in dd:
        rows.append([flab(d['label'], L) + ', DEF'] + [f(d['DEF_1pct'][i], 3, L) for i in sel])
        rows.append([flab(d['label'], L) + ', D/D₀'] + [f(d['rel_dose'][i], 4 if d['rel_dose'][i] < 0.1 else 3, L) for i in sel])
    T.setdefault('t3_8', {})[L] = (title, table(H, rows))

# ---------------------------------------------------------------- t3_9 kV + elements
for L in LANGS:
    title = {'en': 'DEF of soft tissue containing 1 % (by mass) of different high-Z elements at 45 kV',
             'ru': 'DEF мягкой ткани, содержащей 1 % (по массе) различных элементов с высоким Z, при 45 кВ',
             'uz': '45 kV da tarkibida turli yuqori Z li elementlardan 1 % (massa bo‘yicha) bo‘lgan yumshoq to‘qimaning DEF qiymati'}[L]
    els = ['Ag', 'I', 'Gd', 'Pt', 'Au', 'Bi']
    H = [{'en': 'Filter', 'ru': 'Фильтр', 'uz': 'Filtr'}[L]] + els
    rows = [[flab(r_['label'], L)] + [f(r_[e], 3, L) for e in els] for r_ in R['elements']]
    T.setdefault('t3_9', {})[L] = (title, table(H, rows))
for L in LANGS:
    title = {'en': 'DEF (1 % Ag) versus tube voltage (20–50 kV: SpekPy; 60–80 kV: developed model)',
             'ru': 'DEF (1 % Ag) в зависимости от напряжения на трубке (20–50 кВ: SpekPy; 60–80 кВ: разработанная модель)',
             'uz': 'DEF (1 % Ag) ning trubka kuchlanishiga bog‘liqligi (20–50 kV: SpekPy; 60–80 kV: ishlab chiqilgan model)'}[L]
    kv = R['DEF_kvp']
    H = [f"U, {KV[L]}"] + [str(r_['kvp']) for r_ in kv]
    rows = [[flab(lab, L)] + [f(r_[lab], 3, L) for r_ in kv] for lab in ['Al 0.5', 'Al 1.0']]
    T.setdefault('t3_10', {})[L] = (title, table(H, rows))

# ---------------------------------------------------------------- t3_11 MC vs analytic
for L in LANGS:
    title = {'en': 'Monte Carlo and analytical DEF in the 10 mm Ag-loaded layer (1 % Ag, 2–12 mm depth) and behind it',
             'ru': 'DEF по методу Монте-Карло и аналитически в слое толщиной 10 мм с Ag (1 % Ag, глубина 2–12 мм) и за ним',
             'uz': '10 mm qalinlikdagi Ag li qatlamda (1 % Ag, 2–12 mm chuqurlik) va undan keyin Monte-Karlo va analitik DEF'}[L]
    H = {'en': ['Filter', 'Region', 'DEF Monte Carlo', 'DEF analytical', 'Difference, %'],
         'ru': ['Фильтр', 'Область', 'DEF Монте-Карло', 'DEF аналит.', 'Различие, %'],
         'uz': ['Filtr', 'Soha', 'DEF Monte-Karlo', 'DEF analitik', 'Farq, %']}[L]
    reg = {'en': ['layer entrance (2–3 mm)', 'whole layer (2–12 mm)', 'layer exit (11–12 mm)', 'behind layer (15–30 mm)'],
           'ru': ['вход в слой (2–3 мм)', 'весь слой (2–12 мм)', 'выход из слоя (11–12 мм)', 'за слоем (15–30 мм)'],
           'uz': ['qatlamga kirish (2–3 mm)', 'butun qatlam (2–12 mm)', 'qatlamdan chiqish (11–12 mm)', 'qatlamdan keyin (15–30 mm)']}[L]
    rows = []
    stats = {}
    for lab in ['none', 'Al 1.0']:
        m = MC[lab]
        z = np.array(m['z_mm'])
        mc, an = np.array(m['DEF_MC']), np.array(m['DEF_analytic'])
        for i, (a, b_) in enumerate([(2, 3), (2, 12), (11, 12), (15, 30)]):
            sel = (z >= a) & (z < b_)
            x, y = mc[sel].mean(), an[sel].mean()
            stats[(lab, i)] = (x, y)
            rows.append([flab(lab, L), reg[i], f(x, 3, L), f(y, 3, L), f((x / y - 1) * 100, 1, L)])
    T.setdefault('t3_11', {})[L] = (title, table(H, rows))

# ---------------------------------------------------------------- t3_12 sensitivity
for L in LANGS:
    title = {'en': 'Sensitivity of DEF (1 % Ag, Al 1.0 mm filter, DEF = {}) to the input parameters'.format(f(R['sensitivity']['base'], 3, 'en')),
             'ru': 'Чувствительность DEF (1 % Ag, фильтр Al 1,0 мм, DEF = {}) к входным параметрам'.format(f(R['sensitivity']['base'], 3, 'ru')),
             'uz': 'DEF (1 % Ag, Al 1,0 mm filtr, DEF = {}) ning kirish parametrlariga sezgirligi'.format(f(R['sensitivity']['base'], 3, 'uz'))}[L]
    names = {
        'kVp ±1 kV': {'en': 'Tube voltage ±1 kV', 'ru': 'Напряжение ±1 кВ', 'uz': 'Kuchlanish ±1 kV'},
        'anode angle ±3°': {'en': 'Anode angle ±3°', 'ru': 'Угол анода ±3°', 'uz': 'Anod burchagi ±3°'},
        'Be window ±0.1 mm': {'en': 'Be window ±0.1 mm', 'ru': 'Be-окно ±0,1 мм', 'uz': 'Be oyna ±0,1 mm'},
        'Al filter ±5%': {'en': 'Al filter thickness ±5 %', 'ru': 'Толщина фильтра Al ±5 %', 'uz': 'Al filtr qalinligi ±5 %'},
        'mu_en/rho Ag ±2%': {'en': 'μ_en/ρ of Ag ±2 %', 'ru': 'μ_en/ρ для Ag ±2 %', 'uz': 'Ag uchun μ_en/ρ ±2 %'},
        'mu_en/rho tissue ±1%': {'en': 'μ_en/ρ of tissue ±1 %', 'ru': 'μ_en/ρ для ткани ±1 %', 'uz': 'To‘qima uchun μ_en/ρ ±1 %'},
        'tissue composition (ICRU 4-component / water)': {'en': 'Reference medium: ICRU four-component tissue / water', 'ru': 'Эталонная среда: 4-компонентная ткань МКРЕ / вода', 'uz': 'Tayanch muhit: ICRU 4-komponentli to‘qima / suv'},
        'spectrum model (DM vs SpekPy)': {'en': 'Spectrum model: DM / SpekPy', 'ru': 'Модель спектра: РМ / SpekPy', 'uz': 'Spektr modeli: IM / SpekPy'},
        'DM electron-depth factor eta ±25%': {'en': 'Depth factor η of the DM ±25 %', 'ru': 'Коэффициент глубины η РМ ±25 %', 'uz': 'IM chuqurlik koeffitsiyenti η ±25 %'},
    }
    H = {'en': ['Parameter (variation)', 'DEF (lower)', 'DEF (upper)', '|ΔDEF|max'],
         'ru': ['Параметр (вариация)', 'DEF (нижн.)', 'DEF (верхн.)', '|ΔDEF|max'],
         'uz': ['Parametr (o‘zgarish)', 'DEF (quyi)', 'DEF (yuqori)', '|ΔDEF|max']}[L]
    rows = [[names[it['name']][L], f(it['low'], 3, L), f(it['high'], 3, L), f(it['delta'], 3, L)] for it in R['sensitivity']['items']]
    rows.append([{'en': 'Combined standard uncertainty (k = 1), excluding the reference-medium choice',
                  'ru': 'Суммарная стандартная неопределённость (k = 1) без учёта выбора опорной среды',
                  'uz': 'Umumiy standart noaniqlik (k = 1), tayanch muhit tanlovisiz'}[L], '', '', f(R['sensitivity']['combined_u'], 3, L)])
    T.setdefault('t3_12', {})[L] = (title, table(H, rows))

for L in LANGS:
    d = os.path.join(DATA, 'tables', L)
    os.makedirs(d, exist_ok=True)
    for k, v in T.items():
        open(os.path.join(d, k + '.md'), 'w').write(v[L][0] + '\n\n' + v[L][1] + '\n')
print(sorted(T))
