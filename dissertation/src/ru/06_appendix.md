# ПРИЛОЖЕНИЯ

## Приложение А. Исходный код модели спектра (фрагменты)

Разработанная модель (РМ) реализована в модуле Python `xspec.py`; фрагменты приведены без изменений (энергии в кэВ, длины в см). Опущены тормозная способность по Бете (константы из доклада МКРЕ № 37 [@icru37], без поправки на эффект плотности; {{REF:eq:bethe}}, {{REF:eq:fminus}}), глубина проникновения электронов с подобранным $\eta = 0{,}40$ ({{REF:eq:csda}}, {{REF:eq:depth}}), интеграл для толстой мишени при изотропном испускании ({{REF:eq:thick}}), прямой выход K-линий ({{REF:eq:charK}}), а также фильтрация, флюенс и воздушная керма ({{REF:eq:filter}}, {{REF:eq:fluence}}, {{REF:eq:kerma}}).

Функция `brems_dcs` возвращает сечение Крамерса ({{REF:eq:kramers}}) или, по умолчанию, нерелятивистское сечение Бете–Гайтлера ({{REF:eq:bhnr}}) с множителем Эльверта ({{REF:eq:elwert}}); `sigma_K_gryzinski` — сечение ионизации K-оболочки Гризинского ({{REF:eq:gryz}}) для коэффициента перенапряжения $U_K = T/E_K$ (переменная `U`).

```python
def brems_dcs(T, k, Z, model='BH-E'):
    """Bremsstrahlung differential cross-section d(sigma)/dk (cm^2/keV/atom)
    for an electron of kinetic energy T emitting a photon of energy k."""
    T = np.asarray(T, float)
    k = np.asarray(k, float)
    valid = k < T
    b02 = beta2(T)
    if model == 'Kramers':
        val = (16 * np.pi / (3 * np.sqrt(3))) * ALPHA * Z ** 2 * RE ** 2 / (b02 * k)
        return np.where(valid, val, 0.0)
    Tf = np.clip(T - k, 1e-9, None)
    p0 = momentum(T)
    p = momentum(Tf)
    lg = np.log((p0 + p) / np.clip(p0 - p, 1e-30, None))
    val = (16.0 / 3.0) * ALPHA * Z ** 2 * RE ** 2 / (b02 * k) * lg
    b0 = np.sqrt(b02)
    b1 = np.sqrt(beta2(Tf))
    eta0 = 2 * np.pi * Z * ALPHA / b0
    eta1 = 2 * np.pi * Z * ALPHA / np.clip(b1, 1e-12, None)
    elwert = (b0 / np.clip(b1, 1e-12, None)) * (-np.expm1(-eta0)) / (-np.expm1(-eta1))
    return np.where(valid, val * elwert, 0.0)


def sigma_K_gryzinski(T, EK, nK=2):
    """Electron-impact K-shell ionisation cross-section (cm^2), Gryzinski."""
    U = np.asarray(T, float) / EK
    out = np.zeros_like(U)
    m = U > 1
    u = U[m]
    out[m] = (PI_E4 * nK / EK ** 2) / u * ((u - 1) / (u + 1)) ** 1.5 * \
        (1 + (2.0 / 3.0) * (1 - 1 / (2 * u)) * np.log(2.7 + np.sqrt(u - 1)))
    return out
```

Два фрагмента метода `TubeModel._characteristic` вычисляют косвенную флуоресценцию в замкнутой форме ({{REF:eq:indirect}}) по генерируемому тормозному излучению выше K-края, где `tauK` обозначает $\tau_K$, а `b` — $\mu_j/\sin\theta$.

```python
        # indirect: generated bremsstrahlung above edge, surface-source approx.
        above = self.E > EK
        tauK = np.zeros_like(self.E)
        tauK[above] = self.rho * np.array([xr.CS_Photo_Partial(Z, xr.K_SHELL, float(e))
                                           for e in self.E[above]])

            indirect = 0.0
            if self.include_indirect:
                b = muL / np.sin(th)
                Nk = self.brems_generated * self.dE
                indirect = (Nk * (tauK / 2) * np.log1p(b / self.mu_anode) / b).sum() * omega * p / (4 * np.pi)
```

Функция `def_factor` вычисляет DEF в приближении кермы ({{REF:eq:def_spec}}) по правилу смесей ({{REF:eq:mixture}}), ослабляя флюенс энергии в вышележащей ткани ({{REF:eq:def_depth}}) или, при `attenuate_with_agent=True`, в содержащей серебро смеси с плотностью ткани ({{REF:eq:def_slab}}).

```python
def def_factor(E, phi, w, element=47, tissue=TISSUE, depth_cm=0.0, attenuate_with_agent=False):
    """Dose enhancement factor of tissue loaded with mass fraction w of
    element, kerma (CPE) approximation, primary beam at depth depth_cm."""
    mt = mass_coeff(tissue, E, 'muen')
    ma = mass_coeff(element, E, 'muen')
    rho_t = COMPOUND_RHO.get(tissue, 1.0) if isinstance(tissue, str) else 1.0
    att_t = np.exp(-mu_lin(tissue, E) * depth_cm)
    psi = phi * E
    num_att = att_t
    if attenuate_with_agent:
        mu_mix = rho_t * ((1 - w) * mass_coeff(tissue, E, 'mu') + w * mass_coeff(element, E, 'mu'))
        num_att = np.exp(-mu_mix * depth_cm)
    num = (psi * num_att * ((1 - w) * mt + w * ma)).sum()
    den = (psi * att_t * mt).sum()
    return num / den
```

## Приложение Б. Воспроизводимость результатов

Все таблицы и рисунки получены скриптами из `dissertation/code` по данным из `dissertation/data` (без вспомогательных проверок главы 2) с использованием Python 3.13, NumPy 2.5.3 [@harris2020], SciPy 1.18.1 [@virtanen2020], Matplotlib 3.11.2 [@hunter2007], xraylib 4.3.0 [@schoonjans2011] и SpekPy 2.5.4 [@poludniowski2021; @spekpy_soft]. Модуль `nist.py` интерполирует таблицы NIST [@nist_xraymass] для 31 элемента, сухого воздуха, воды и мягкой ткани МКРЕ-44 [@icru44] в двойном логарифмическом масштабе между краями поглощения. Скрипт `run_all.py` подбирает $\eta$ (0,25–0,7) по тормозному излучению SpekPy выше 3 кэВ, выполняет валидацию и рассчитывает базовый спектр, влияние конструкции и фильтров, зависимость DEF от концентрации, глубины и напряжения, самоэкранирование, сравнение элементов, анализ чувствительности и времена облучения (`data/results.json`); `run_sweeps.py` дополнительно рассчитывает зависимости от толщины фильтров и сравнивает 43 материала фильтров при одинаковом пропускании воздушной кермы. Скрипт `mc_dose.py` моделирует $4 \times 10^6$ историй на конфигурацию в пяти сериях с фиксированными начальными значениями генератора случайных чисел (`data/mc_results.json`), а `make_tables.py` и `figures.py` формируют таблицы и рисунки на трёх языках. Поскольку аналитический код детерминирован, а начальные значения фиксированы, запуск пяти скриптов в указанном порядке воспроизводит все результаты.
