"""Figure labels in English, Russian and Uzbek (Latin script)."""

L = {
    'E': {'en': 'Photon energy, keV', 'ru': 'Энергия фотонов, кэВ', 'uz': 'Foton energiyasi, keV'},
    'Te': {'en': 'Electron kinetic energy, keV', 'ru': 'Кинетическая энергия электрона, кэВ',
           'uz': 'Elektronning kinetik energiyasi, keV'},
    'flu': {'en': r'Fluence, photons keV$^{-1}$ cm$^{-2}$ mAs$^{-1}$',
            'ru': r'Флюенс, фотон кэВ$^{-1}$ см$^{-2}$ мА$^{-1}$ с$^{-1}$',
            'uz': r'Flyuens, foton keV$^{-1}$ sm$^{-2}$ mA$^{-1}$ s$^{-1}$'},
    'rel': {'en': 'Relative fluence per keV', 'ru': 'Относительный флюенс на 1 кэВ',
            'uz': 'Nisbiy flyuens (1 keV ga)'},
    'relmax': {'en': 'Fluence (normalised to maximum)', 'ru': 'Флюенс (нормирован на максимум)',
               'uz': 'Flyuens (maksimumga normallangan)'},
    'relbrem': {'en': 'Fluence (equal-area normalisation)', 'ru': 'Флюенс (нормировка на равную площадь)',
                'uz': 'Flyuens (teng yuzaga normallangan)'},
    'relarea': {'en': 'Fluence (equal-area normalisation)', 'ru': 'Флюенс (нормировка на равную площадь)',
                'uz': 'Flyuens (teng yuzaga normallangan)'},
    'relal': {'en': 'Fluence (relative to Al 1.0 mm maximum)', 'ru': 'Флюенс (отн. максимума для Al 1,0 мм)',
              'uz': 'Flyuens (Al 1,0 mm maksimumiga nisbatan)'},
    'lowvar': {'en': 'lower value of the parameter', 'ru': 'нижнее значение параметра', 'uz': 'parametrning quyi qiymati'},
    'highvar': {'en': 'upper value of the parameter', 'ru': 'верхнее значение параметра', 'uz': 'parametrning yuqori qiymati'},
    'ratio_dm_sp': {'en': 'Ratio model / SpekPy', 'ru': 'Отношение модель / SpekPy',
                    'uz': 'Nisbat model / SpekPy'},
    'mu': {'en': r'Mass coefficient, cm$^2$ g$^{-1}$', 'ru': r'Массовый коэффициент, см$^2$ г$^{-1}$',
           'uz': r'Massaviy koeffitsiyent, sm$^2$ g$^{-1}$'},
    'mu_ag': {'en': r'Ag, $\mu/\rho$', 'ru': r'Ag, $\mu/\rho$', 'uz': r'Ag, $\mu/\rho$'},
    'muen_ag': {'en': r'Ag, $\mu_{en}/\rho$', 'ru': r'Ag, $\mu_{en}/\rho$', 'uz': r'Ag, $\mu_{en}/\rho$'},
    'mu_t': {'en': r'Soft tissue, $\mu/\rho$', 'ru': r'Мягкая ткань, $\mu/\rho$', 'uz': r'Yumshoq to‘qima, $\mu/\rho$'},
    'muen_t': {'en': r'Soft tissue, $\mu_{en}/\rho$', 'ru': r'Мягкая ткань, $\mu_{en}/\rho$',
               'uz': r'Yumshoq to‘qima, $\mu_{en}/\rho$'},
    'ratio_muen': {'en': r'$(\mu_{en}/\rho)_{el}\,/\,(\mu_{en}/\rho)_{tissue}$',
                   'ru': r'$(\mu_{en}/\rho)_{эл}\,/\,(\mu_{en}/\rho)_{ткань}$',
                   'uz': r'$(\mu_{en}/\rho)_{el}\,/\,(\mu_{en}/\rho)_{to‘qima}$'},
    'S': {'en': r'Collision stopping power, MeV cm$^2$ g$^{-1}$', 'ru': r'Ионизационная тормозная способность, МэВ см$^2$ г$^{-1}$',
          'uz': r'Ionizatsion tormozlanish qobiliyati, MeV sm$^2$ g$^{-1}$'},
    'depth_um': {'en': r'Projected depth, $\mu$m', 'ru': r'Глубина проникновения, мкм', 'uz': r'Kirish chuqurligi, mkm'},
    'sigK': {'en': 'K-shell ionisation cross-section, b', 'ru': 'Сечение ионизации K-оболочки, б',
             'uz': 'K-qobiq ionizatsiyasi kesimi, b'},
    'DEF': {'en': 'Dose enhancement factor, DEF', 'ru': 'Коэффициент усиления дозы, DEF',
            'uz': 'Dozani kuchaytirish koeffitsiyenti, DEF'},
    'w': {'en': 'Ag mass fraction, %', 'ru': 'Массовая доля Ag, %', 'uz': 'Ag massa ulushi, %'},
    'depth': {'en': 'Depth in soft tissue, mm', 'ru': 'Глубина в мягкой ткани, мм', 'uz': 'Yumshoq to‘qimadagi chuqurlik, mm'},
    'kerma_rel': {'en': 'Relative air kerma (transmission)', 'ru': 'Относительная воздушная керма (пропускание)',
                  'uz': 'Havodagi nisbiy kerma (o‘tkazish)'},
    'kv': {'en': 'Tube voltage, kV', 'ru': 'Напряжение на трубке, кВ', 'uz': 'Trubka kuchlanishi, kV'},
    'Z': {'en': 'Atomic number of the filter, Z', 'ru': 'Атомный номер фильтра, Z', 'uz': 'Filtrning atom raqami, Z'},
    'none': {'en': 'no added filter', 'ru': 'без доп. фильтра', 'uz': 'qo‘shimcha filtrsiz'},
    'model': {'en': 'Model (this work)', 'ru': 'Модель (данная работа)', 'uz': 'Model (ushbu ish)'},
    'spekpy': {'en': 'SpekPy v2', 'ru': 'SpekPy v2', 'uz': 'SpekPy v2'},
    'angle': {'en': 'anode angle', 'ru': 'угол анода', 'uz': 'anod burchagi'},
    'be': {'en': 'Be window', 'ru': 'Be-окно', 'uz': 'Be oyna'},
    'agK': {'en': 'Ag K-edge 25.51 keV', 'ru': 'K-край Ag 25,51 кэВ', 'uz': 'Ag K-chegarasi 25,51 keV'},
    'agK_s': {'en': 'Ag K-edge', 'ru': 'K-край Ag', 'uz': 'Ag K-chegarasi'},
    'integrand': {'en': r'$E\,\Phi(E)\,\mu_{en}/\rho$ (relative)', 'ru': r'$E\,\Phi(E)\,\mu_{en}/\rho$ (отн. ед.)',
                  'uz': r'$E\,\Phi(E)\,\mu_{en}/\rho$ (nisbiy)'},
    'tissue': {'en': 'tissue', 'ru': 'ткань', 'uz': 'to‘qima'},
    'tissue_ag': {'en': 'tissue + 1 % Ag', 'ru': 'ткань + 1 % Ag', 'uz': 'to‘qima + 1 % Ag'},
    'reldose': {'en': 'Relative dose', 'ru': 'Относительная доза', 'uz': 'Nisbiy doza'},
    'mc': {'en': 'Monte Carlo', 'ru': 'Монте-Карло', 'uz': 'Monte-Karlo'},
    'analytic': {'en': 'analytical (primary beam)', 'ru': 'аналитически (первичный пучок)',
                 'uz': 'analitik (birlamchi dasta)'},
    'with_ag': {'en': 'with Ag layer (1 %)', 'ru': 'со слоем Ag (1 %)', 'uz': 'Ag qatlami bilan (1 %)'},
    'without_ag': {'en': 'without Ag', 'ru': 'без Ag', 'uz': 'Ag siz'},
    'layer': {'en': 'Ag-loaded layer', 'ru': 'слой с Ag', 'uz': 'Ag li qatlam'},
    'dose_rel': {'en': r'Dose per incident photon, keV g$^{-1}$ (rel.)', 'ru': r'Доза на один фотон (отн. ед.)',
                 'uz': r'Bir fotonga to‘g‘ri keladigan doza (nisbiy)'},
    'delta_def': {'en': 'Change of DEF', 'ru': 'Изменение DEF', 'uz': 'DEF ning o‘zgarishi'},
    'eq10': {'en': 'transmission 10 %', 'ru': 'пропускание 10 %', 'uz': 'o‘tkazish 10 %'},
    'eq1': {'en': 'transmission 1 %', 'ru': 'пропускание 1 %', 'uz': 'o‘tkazish 1 %'},
    'eq01': {'en': 'transmission 0.1 %', 'ru': 'пропускание 0,1 %', 'uz': 'o‘tkazish 0,1 %'},
    'cathode': {'en': 'cathode', 'ru': 'катод', 'uz': 'katod'},
    'anode': {'en': 'Cu anode', 'ru': 'Cu-анод', 'uz': 'Cu anod'},
    'ebeam': {'en': 'electron beam', 'ru': 'электронный пучок', 'uz': 'elektron dastasi'},
    'focal': {'en': 'focal spot', 'ru': 'фокусное пятно', 'uz': 'fokus dog‘i'},
    'window': {'en': 'Be window', 'ru': 'Be-окно', 'uz': 'Be oyna'},
    'filter': {'en': 'added filter', 'ru': 'доп. фильтр', 'uz': 'qo‘shimcha filtr'},
    'sample': {'en': 'sample (tissue + Ag)', 'ru': 'образец (ткань + Ag)', 'uz': 'namuna (to‘qima + Ag)'},
    'central': {'en': 'central ray', 'ru': 'центральный луч', 'uz': 'markaziy nur'},
    'vacuum': {'en': 'vacuum', 'ru': 'вакуум', 'uz': 'vakuum'},
    'air': {'en': 'air gap', 'ru': 'воздушный промежуток', 'uz': 'havo oralig‘i'},
    'housing': {'en': 'tube housing', 'ru': 'кожух трубки', 'uz': 'trubka korpusi'},
    'dist': {'en': 'focus–sample distance d', 'ru': 'расстояние фокус–образец d', 'uz': 'fokus–namuna masofasi d'},
    'brems': {'en': 'bremsstrahlung', 'ru': 'тормозное излучение', 'uz': 'tormozlanish nurlanishi'},
    'kalpha': {'en': r'Cu K$\alpha$', 'ru': r'Cu K$\alpha$', 'uz': r'Cu K$\alpha$'},
    'kbeta': {'en': r'Cu K$\beta$', 'ru': r'Cu K$\beta$', 'uz': r'Cu K$\beta$'},
    'w_lab': {'en': 'Ag', 'ru': 'Ag', 'uz': 'Ag'},
}


def t(key, lang):
    return L[key][lang]


def num(x, lang, nd=2):
    """decimal comma for ru/uz"""
    s = f'{x:.{nd}f}'
    return s if lang == 'en' else s.replace('.', ',')


def flab(label, lang):
    """translate a filter label such as 'Al 1.0' or 'none'"""
    if label == 'none':
        return t('none', lang)
    sym, th = label.split()
    return f'{sym} {num(float(th), lang, len(th.split(".")[1]) if "." in th else 0)} ' + ('mm' if lang != 'ru' else 'мм')
