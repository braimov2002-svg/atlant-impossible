# ПРИЛОЖЕНИЯ

## Приложение А. Исходный код модели спектра (фрагменты)

Разработанная модель (РМ) реализована в модуле Python `xspec.py`, который использует библиотеки NumPy и xraylib и модуль `nist.py`. Приведённые ниже фрагменты скопированы из него без изменений, включая комментарии; код между ними опущен. Энергии выражены в кэВ, длины — в см, плотности — в г/см$^3$, сечения — в см$^2$.

Первый фрагмент задаёт константы и данные о материалах. Константа `PI_E4` представляет собой произведение $\pi e^4$ в см$^2$·кэВ$^2$ (в гауссовой системе единиц), `ELECTRONS_PER_MAS` — число электронов на миллиампер-секунду, $10^{-3}/e$, а `I_EXC` содержит средние энергии возбуждения из доклада МКРЕ № 37 [@icru37], в том числе $I = 322$ эВ для меди.

```python
RE = 2.8179403262e-13          # classical electron radius, cm
ALPHA = 1.0 / 137.035999084     # fine-structure constant
MEC2 = 510.99895                # electron rest energy, keV
NA = 6.02214076e23              # Avogadro constant, 1/mol
PI_E4 = 6.5141e-20              # pi*e^4 in cm^2 keV^2
ELECTRONS_PER_MAS = 1e-3 / 1.602176634e-19
KEV_TO_J = 1.602176634e-16

# mean excitation energies (ICRU Report 37), eV
I_EXC = {4: 63.7, 13: 166.0, 29: 322.0, 42: 424.0, 45: 449.0, 47: 470.0, 74: 727.0, 79: 790.0}
DENSITY = {4: 1.848, 13: 2.699, 28: 8.902, 29: 8.96, 42: 10.22, 45: 12.41, 47: 10.5,
           50: 7.31, 74: 19.3, 79: 19.32, 40: 6.506}
```

Функции `beta2` и `momentum` возвращают $\beta^2$ и импульс $pc$ электрона с кинетической энергией $T$. Функция `stopping_power` вычисляет ионизационную тормозную способность по Бете в форме, принятой в докладе МКРЕ № 37 (см. формулы {{REF:eq:bethe}} и {{REF:eq:fminus}}), без поправки на эффект плотности. Коэффициент $0{,}5 \times 0{,}307075$ МэВ·см$^2$/моль равен $2\pi N_A r_e^2 m_e c^2$, а результатом является линейная тормозная способность в кэВ/см.

```python
def beta2(T):
    g = 1.0 + np.asarray(T, float) / MEC2
    return 1.0 - 1.0 / g ** 2


def momentum(T):
    """electron momentum p*c in keV"""
    T = np.asarray(T, float)
    return np.sqrt(np.clip(T * (T + 2 * MEC2), 0, None))


def stopping_power(T, Z, A=None, I_eV=None, rho=None):
    """Bethe collision stopping power for electrons, linear (keV/cm)."""
    A = A if A is not None else xr.AtomicWeight(Z)
    I_eV = I_eV if I_eV is not None else I_EXC.get(Z, 10.0 * Z)
    rho = rho if rho is not None else DENSITY.get(Z, xr.ElementDensity(Z))
    T = np.asarray(T, float)
    tau = T / MEC2
    b2 = beta2(T)
    F = 1 - b2 + (tau ** 2 / 8 - (2 * tau + 1) * np.log(2)) / (tau + 1) ** 2
    Ired = I_eV / 1e3 / MEC2
    arg = tau ** 2 * (tau + 2) / (2 * Ired ** 2)
    s_mass = 0.5 * 0.307075 * (Z / A) / b2 * (np.log(arg) + F)   # MeV cm2/g
    s_mass = np.clip(s_mass, 1e-6, None)
    return s_mass * 1e3 * rho
```

Функция `brems_dcs` возвращает сечение тормозного излучения в расчёте на один атом, дифференциальное по энергии фотона (переменная `k`). Она вычисляет либо сечение Крамерса {{REF:eq:kramers}}, либо (по умолчанию) нерелятивистское сечение Бете–Гайтлера {{REF:eq:bhnr}}, умноженное на множитель Эльверта {{REF:eq:elwert}}, в котором `eta0` и `eta1` равны $2\pi Z\alpha/\beta_0$ и $2\pi Z\alpha/\beta$ для налетающего и вылетающего электронов соответственно. Функция `sigma_K_gryzinski` реализует сечение ионизации K-оболочки Гризинского {{REF:eq:gryz}} с двумя электронами на K-оболочке и перенапряжением $U = T/E_K$.

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

Класс `TubeModel` хранит напряжение на трубке, атомный номер материала анода, угол анода и коэффициент глубины проникновения электронов; в нём используются энергетические интервалы фотонов шириной 0,05 кэВ и шаг по энергии электронов 0,02 кэВ. Значение по умолчанию `eta=1.0` соответствует прямолинейным траекториям электронов; за исключением подгонки и проверки чувствительности (±25 %), во всех расчётах используется подобранное значение $\eta = 0{,}40$, передаваемое скриптом `run_all.py`. Метод `_compute` интегрирует $1/S$ по формуле трапеций, получая длину пути в приближении непрерывного замедления {{REF:eq:csda}} и глубину проникновения {{REF:eq:depth}}. Затем он вычисляет интеграл тормозного излучения для толстой мишени {{REF:eq:thick}} с учётом самопоглощения вдоль пути выхода $d/\sin\theta$, причём деление на $4\pi$ предполагает изотропное испускание. Без ослабления и множителя $1/4\pi$ та же сумма (`brems_generated`) даёт генерируемый спектр $N_g(E)$. Метод `_characteristic` рассчитывает линии Cu K$\alpha_2$, K$\alpha_1$, K$\beta_3$ и K$\beta_1$ с использованием выхода флуоресценции из xraylib [@schoonjans2011] и вероятностей радиационных переходов из той же библиотеки, нормированных по четырём линиям. Прямой вклад {{REF:eq:charK}} учитывает каждую ионизацию K-оболочки с весом, равным вероятности выхода фотона линии из анода, а непрямой вклад представляет собой выражение в замкнутой форме {{REF:eq:indirect}}, в котором `tauK` — линейный коэффициент фотопоглощения на K-оболочке $\tau_K$, а `b` — величина $b_j = \mu_j/\sin\theta$.

```python
class TubeModel:
    """Thick-target spectrum model for a reflection x-ray tube."""

    def __init__(self, kvp=45.0, Z=29, theta=12.0, eta=1.0, model='BH-E',
                 dE=0.05, Emin=1.0, dT=0.02, include_char=True, include_indirect=True):
        self.kvp, self.Z, self.theta, self.eta = kvp, Z, theta, eta
        self.model, self.dE, self.Emin, self.dT = model, dE, Emin, dT
        self.include_char, self.include_indirect = include_char, include_indirect
        self.A = xr.AtomicWeight(Z)
        self.rho = DENSITY[Z]
        self.na = self.rho * NA / self.A                        # atoms/cm3
        self.E = np.arange(Emin + dE / 2, kvp, dE)               # bin centres
        self.lines = []                                         # (energy, photons/sr/electron)
        self._compute()

    # --------------------------------------------------------------
    def _compute(self):
        Z, T0 = self.Z, self.kvp
        th = np.radians(self.theta)
        # electron energy grid (from T0 down to Emin) and CSDA depth
        T = np.arange(self.Emin, T0 + self.dT / 2, self.dT)
        S = stopping_power(T, Z)
        # path length from T0 to T: s(T) = int_T^T0 dT'/S
        inv = 1.0 / S
        cum = np.concatenate([[0], np.cumsum(0.5 * (inv[1:] + inv[:-1]) * np.diff(T))])
        s = cum[-1] - cum                         # path length to reach energy T
        depth = self.eta * s * np.cos(th)         # electron incidence angle = theta
        self.T, self.S, self.s, self.depth = T, S, s, depth
        self.csda_range = s[0]
        mu_E = mu_lin(Z, self.E)
        self.mu_anode = mu_E
        # generated bremsstrahlung per electron per keV into 4*pi (no absorption)
        TT, KK = np.meshgrid(T, self.E)          # shape (nE, nT)
        dcs = brems_dcs(TT, KK, Z, self.model)
        w = self.na * dcs / S[None, :]           # photons/keV per keV of slowing
        att = np.exp(-mu_E[:, None] * depth[None, :] / np.sin(th))
        trap = np.full(T.shape, self.dT)
        trap[0] = trap[-1] = self.dT / 2
        self.brems_generated = (w * trap[None, :]).sum(axis=1)                  # 1/(keV e-)
        self.brems = (w * att * trap[None, :]).sum(axis=1) / (4 * np.pi)       # 1/(keV sr e-)
        self.lines = []
        if self.include_char and T0 > xr.EdgeEnergy(Z, xr.K_SHELL):
            self._characteristic(T, S, depth, th, trap)

    def _characteristic(self, T, S, depth, th, trap):
        Z = self.Z
        EK = xr.EdgeEnergy(Z, xr.K_SHELL)
        omega = xr.FluorYield(Z, xr.K_SHELL)
        sigK = sigma_K_gryzinski(T, EK)
        lines = [(xr.KL2_LINE, 'Ka2'), (xr.KL3_LINE, 'Ka1'),
                 (xr.KM2_LINE, 'Kb3'), (xr.KM3_LINE, 'Kb1')]
        # radiative rates
        rates = {}
        for code, name in lines:
            try:
                rates[name] = (xr.LineEnergy(Z, code), xr.RadRate(Z, code))
            except ValueError:
                pass
        tot = sum(r for _, r in rates.values())
        # direct
        nK_direct = self.na * sigK / S                 # ionisations per keV slowing
        self.k_ionisations = (nK_direct * trap).sum()  # K ionisations per electron
        # indirect: generated bremsstrahlung above edge, surface-source approx.
        above = self.E > EK
        tauK = np.zeros_like(self.E)
        tauK[above] = self.rho * np.array([xr.CS_Photo_Partial(Z, xr.K_SHELL, float(e))
                                           for e in self.E[above]])
        self.line_data = []
        for name, (EL, r) in rates.items():
            p = r / tot
            muL = mu_lin(Z, [EL])[0]
            att = np.exp(-muL * depth / np.sin(th))
            direct = omega * p * (nK_direct * att * trap).sum() / (4 * np.pi)
            indirect = 0.0
            if self.include_indirect:
                b = muL / np.sin(th)
                Nk = self.brems_generated * self.dE
                indirect = (Nk * (tauK / 2) * np.log1p(b / self.mu_anode) / b).sum() * omega * p / (4 * np.pi)
            self.lines.append((EL, direct + indirect))
            self.line_data.append(dict(name=name, energy=EL, rel_rate=p,
                                       direct=direct, indirect=indirect))
```

Метод `spectrum` добавляет линии в соответствующие энергетические интервалы, учитывает пропускание бериллиевого окна, фильтров и воздуха {{REF:eq:filter}} и по закону обратных квадратов {{REF:eq:fluence}} пересчитывает выход на один электрон и стерадиан во флюенс фотонов на кэВ на см$^2$ для заданной экспозиции. Функция `air_kerma` вычисляет воздушную керму {{REF:eq:kerma}} с коэффициентами NIST для сухого воздуха; множитель `KEV_TO_J * 1e3` переводит кэВ/г в Гр. Функции `hvl`, `mean_energy` и `effective_energy` (не приведены) рассчитывают слой половинного ослабления методом бисекции по пропусканию воздушной кермы через алюминий, а также среднюю и эффективную энергии.

```python
    def spectrum(self, filters=(), air_cm=0.0, dist_cm=100.0, mas=1.0, binned=True):
        """photon fluence per keV per cm^2 at distance dist_cm for the given
        exposure (mAs), after the listed filters [(Z_or_name, thickness_cm), ...]."""
        E = self.E
        phi = self.brems.copy()
        if binned:
            for EL, n in self.lines:
                i = int((EL - self.Emin) // self.dE)
                if 0 <= i < len(E):
                    phi[i] += n / self.dE
        T = transmission(E, filters, air_cm)
        return E, phi * T * ELECTRONS_PER_MAS * mas / dist_cm ** 2


def transmission(E, filters=(), air_cm=0.0):
    T = np.ones_like(E)
    for m, t in filters:
        T *= np.exp(-mu_lin(m, E) * t)
    if air_cm > 0:
        T *= np.exp(-mu_lin(AIR, E) * air_cm)
    return T
```

```python
def air_kerma(E, phi, dE=None):
    """air kerma (Gy) for fluence spectrum phi (1/keV/cm2) on grid E"""
    dE = dE if dE is not None else np.gradient(E)
    return (phi * E * mass_coeff(AIR, E, 'muen') * dE).sum() * KEV_TO_J * 1e3
```

Функция `def_factor` вычисляет коэффициент усиления дозы (DEF) в приближении кермы {{REF:eq:def_spec}} с применением правила смесей {{REF:eq:mixture}} и массовых коэффициентов поглощения энергии NIST. Флюенс энергии `psi` ослабляется вышележащим слоем ткани {{REF:eq:def_depth}}. При `attenuate_with_agent=True` числитель ослабляется смесью ткани с серебром, что описывает область с равномерным распределением серебра, простирающуюся от поверхности {{REF:eq:def_slab}}; плотность смеси принимается приближённо равной плотности ткани.

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

Основные численные результаты, а также все таблицы и рисунки получены с помощью скриптов из каталога `dissertation/code` на основе данных из каталога `dissertation/data`; вспомогательные проверки, описанные в главе 2 (сравнение с ESTAR, проверка функции CS_Energy библиотеки xraylib, тесты метода Монте-Карло), в их число не входят. Расчёты выполнены с использованием Python 3.13, NumPy 2.5.3 [@harris2020], SciPy 1.18.1 [@virtanen2020], Matplotlib 3.11.2 [@hunter2007], xraylib 4.3.0 [@schoonjans2011] и SpekPy 2.5.4 [@poludniowski2021; @spekpy_soft]. Таблицы NIST массовых коэффициентов ослабления и массовых коэффициентов поглощения энергии [@nist_xraymass] для 31 элемента, сухого воздуха, воды и мягкой ткани МКРЕ-44 [@icru44] хранятся в виде HTML-страниц в каталоге `data/nist`. Модуль `nist.py` интерполирует их в двойном логарифмическом масштабе в пределах каждого участка между краями поглощения и вычисляет коэффициенты для ткани, воды и воздуха по таблицам элементов с помощью правила смесей; таблицы для самих этих сред хранятся только для проверки. Спектры SpekPy рассчитаны с тем же энергетическим интервалом, что и в РМ (0,05 кэВ для меди).

Скрипт `run_all.py` сначала подбирает $\eta$ в интервале 0,25–0,7, минимизируя в этих границах среднеквадратичное отклонение между нормированными спектрами тормозного излучения РМ и SpekPy при энергиях выше 3 кэВ. Затем он рассчитывает характеристики электронов и линий Cu, результаты валидации по SpekPy (восемь сочетаний напряжения на трубке и угла анода без фильтра и с фильтром 1 мм Al, а также вольфрамовый анод при 50–100 кВ) и базовый спектр. Кроме того, он рассчитывает влияние угла анода, напряжения на трубке, бериллиевого окна и 13 дополнительных фильтров, DEF для 0,1–2 % Ag и его зависимость от глубины и напряжения на трубке, эффект самоэкранирования, данные для сравнения шести элементов с высоким Z и для анализа чувствительности, а также времена облучения. Результаты записываются в файл `data/results.json`, а спектры для рисунков — в файлы CSV. Скрипт `run_sweeps.py` дополнительно рассчитывает DEF в зависимости от толщины фильтра для семи материалов и сравнивает 43 материала фильтров от Al до Bi при пропускании воздушной кермы 10 %, 1 % и 0,1 %.

Скрипт `mc_dose.py` выполняет расчёт методом Монте-Карло с $4 \times 10^6$ историями фотонов для каждой конфигурации (их число задаётся аргументом командной строки), разделёнными на пять серий с фиксированными начальными значениями генератора случайных чисел, и записывает файл `data/mc_results.json`. Скрипты `make_tables.py` и `figures.py` формируют на основе этих файлов все таблицы и рисунки на английском, русском и узбекском языках. Поскольку аналитические расчёты не содержат случайных элементов, а начальные значения генератора для метода Монте-Карло фиксированы, запуск пяти скриптов в указанном выше порядке воспроизводит все таблицы и рисунки при указанных версиях программного обеспечения.
