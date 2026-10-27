# ILOVALAR

## A ilova. Spektr modelining boshlang‘ich kodi (fragmentlar)

Ishlab chiqilgan model (IM) Python tilidagi `xspec.py` modulida amalga oshirilgan; bu modul NumPy, xraylib kutubxonalaridan va `nist.py` modulidan foydalanadi. Quyida keltirilgan fragmentlar undan hech qanday o‘zgarishsiz, izohlari bilan birga ko‘chirilgan; ular orasidagi kod tushirib qoldirilgan. Energiyalar keV da, uzunliklar sm da, zichliklar g/sm$^3$ da, kesimlar esa sm$^2$ da berilgan.

Birinchi fragmentda konstantalar va materiallarga oid ma’lumotlar beriladi. `PI_E4` konstantasi sm$^2$ keV$^2$ birliklarida (Gauss birliklar sistemasida) ifodalangan $\pi e^4$ ko‘paytmadir, `ELECTRONS_PER_MAS` — bir milliamper-sekundga to‘g‘ri keladigan elektronlar soni, ya’ni $10^{-3}/e$, `I_EXC` esa ICRUning 37-hisobotidagi [@icru37] o‘rtacha uyg‘otish energiyalarini, jumladan, mis uchun $I = 322$ eV qiymatini o‘z ichiga oladi.

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

`beta2` va `momentum` funksiyalari kinetik energiyasi $T$ bo‘lgan elektron uchun $\beta^2$ ni va $pc$ impulsni qaytaradi. `stopping_power` funksiyasi Bete ionizatsion tormozlanish qobiliyatini ICRUning 37-hisobotidagi ko‘rinishda ({{REF:eq:bethe}} va {{REF:eq:fminus}}) zichlik effekti uchun tuzatmasiz hisoblaydi. $0{,}5 \times 0{,}307075$ MeV sm$^2$/mol koeffitsiyent $2\pi N_A r_e^2 m_e c^2$ ga teng, natija esa keV/sm birliklaridagi chiziqli tormozlanish qobiliyatidir.

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

`brems_dcs` funksiyasi tormozlanish nurlanishining bitta atomga to‘g‘ri keladigan, foton energiyasi (`k` o‘zgaruvchisi) bo‘yicha differensial kesimini qaytaradi. U yoki Kramers kesimini ({{REF:eq:kramers}}), yoki, sukut bo‘yicha, norelyativistik Bete–Gaytler kesimining ({{REF:eq:bhnr}}) Elvert ko‘paytuvchisiga ({{REF:eq:elwert}}) ko‘paytmasini beradi; Elvert ko‘paytuvchisidagi `eta0` va `eta1` mos ravishda tushuvchi va chiquvchi elektron uchun $2\pi Z\alpha/\beta_0$ va $2\pi Z\alpha/\beta$ ga teng. `sigma_K_gryzinski` funksiyasi Grizinskiyning K-qobiq ionizatsiyasi kesimini ({{REF:eq:gryz}}) K-qobiqdagi ikkita elektron va $U = T/E_K$ ortiqcha kuchlanish nisbati bilan amalga oshiradi.

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

`TubeModel` sinfi trubka kuchlanishini, anodning atom raqamini, anod burchagini va elektronlarning chuqurlik koeffitsiyentini saqlaydi hamda kengligi 0,05 keV bo‘lgan foton energiyasi intervallaridan va elektron energiyasining 0,02 keV qadamidan foydalanadi. Sukut bo‘yicha belgilangan `eta=1.0` qiymati elektronlarning to‘g‘ri chiziqli trayektoriyalariga mos keladi; moslashtirish va sezgirlik testidan (±25 %) tashqari barcha hisoblarda `run_all.py` tomonidan uzatiladigan moslashtirilgan $\eta = 0{,}40$ qiymati qo‘llaniladi. `_compute` metodi uzluksiz sekinlashish yaqinlashuvidagi yo‘l uzunligini ({{REF:eq:csda}}) va kirish chuqurligini ({{REF:eq:depth}}) olish uchun $1/S$ ni trapetsiyalar usulida integrallaydi. So‘ngra u $d/\sin\theta$ chiqish yo‘li bo‘ylab o‘z-o‘zini yutishni hisobga olgan holda qalin nishon uchun tormozlanish nurlanishi integralini ({{REF:eq:thick}}) hisoblaydi, $4\pi$ ga bo‘lish esa nurlanish izotrop ekanligini nazarda tutadi. Susayish va $1/4\pi$ ko‘paytuvchisi bo‘lmaganda xuddi shu yig‘indi (`brems_generated`) hosil bo‘lgan $N_g(E)$ spektrni beradi. `_characteristic` metodi Cu K$\alpha_2$, K$\alpha_1$, K$\beta_3$ va K$\beta_1$ chiziqlarini xraylib kutubxonasidagi flyuoressensiya chiqishi [@schoonjans2011] va uning to‘rtta chiziq bo‘yicha normallashtirilgan nurlanish o‘tishi ehtimolliklari yordamida hisoblaydi. Bevosita hissa ({{REF:eq:charK}}) har bir K-qobiq ionizatsiyasini chiziq fotonining anoddan chiqib ketish ehtimolligiga ko‘paytirib hisobga oladi, bilvosita hissa esa yopiq ko‘rinishdagi ifoda ({{REF:eq:indirect}}) bilan beriladi; unda `tauK` — K-qobiqdagi fotoyutilishning chiziqli koeffitsiyenti $\tau_K$, `b` esa $b_j = \mu_j/\sin\theta$.

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

`spectrum` metodi chiziqlarni energiya intervallariga qo‘shadi, Be oyna, filtrlar va havoning o‘tkazish koeffitsiyentini ({{REF:eq:filter}}) hisobga oladi hamda bitta elektron va bir steradianga to‘g‘ri keladigan chiqishni masofa kvadratiga teskari proporsionallik qonuni ({{REF:eq:fluence}}) yordamida berilgan ekspozitsiya uchun keV va sm$^2$ birligiga to‘g‘ri keladigan fotonlar flyuensiga aylantiradi. `air_kerma` funksiyasi havodagi kermani ({{REF:eq:kerma}}) quruq havo uchun NIST koeffitsiyentlari yordamida hisoblaydi; `KEV_TO_J * 1e3` ko‘paytuvchisi keV/g ni Gr ga aylantiradi. `hvl`, `mean_energy` va `effective_energy` funksiyalari (bu yerda keltirilmagan) mos ravishda yarim susaytirish qatlamini (havodagi kerma bo‘yicha alyuminiyning o‘tkazish koeffitsiyentiga kesmani teng ikkiga bo‘lish usulini qo‘llab), o‘rtacha energiyani va effektiv energiyani hisoblaydi.

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

`def_factor` funksiyasi dozani kuchaytirish koeffitsiyentini (DEF) kerma yaqinlashuvida ({{REF:eq:def_spec}}) aralashma qoidasi ({{REF:eq:mixture}}) va NIST massaviy energiya yutilish koeffitsiyentlari yordamida hisoblaydi. `psi` energiya flyuensi ustidagi to‘qima qatlamida susaytiriladi ({{REF:eq:def_depth}}). `attenuate_with_agent=True` bo‘lganda kasrning surati kumush kiritilgan aralashmada susaytiriladi, bu esa sirtdan boshlanuvchi bir tekis kumush kiritilgan sohani tavsiflaydi ({{REF:eq:def_slab}}); aralashmaning zichligi taqriban to‘qima zichligiga teng deb olinadi.

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

## B ilova. Natijalarning takrorlanuvchanligi

Asosiy sonli natijalar hamda barcha jadval va rasmlar `dissertation/code` katalogidagi skriptlar yordamida `dissertation/data` katalogidagi ma’lumotlar asosida olinadi; II bobdagi yordamchi tekshiruvlar (ESTAR bilan solishtirish, xraylib kutubxonasidagi CS_Energy funksiyasini tekshirish, Monte-Karlo testlari) ularga kirmaydi. Hisoblar Python 3.13, NumPy 2.5.3 [@harris2020], SciPy 1.18.1 [@virtanen2020], Matplotlib 3.11.2 [@hunter2007], xraylib 4.3.0 [@schoonjans2011] va SpekPy 2.5.4 [@poludniowski2021; @spekpy_soft] yordamida bajarildi. Massaviy susayish va massaviy energiya yutilish koeffitsiyentlarining NIST jadvallari [@nist_xraymass] 31 ta element, quruq havo, suv va ICRU-44 yumshoq to‘qimasi [@icru44] uchun `data/nist` katalogida HTML sahifalar ko‘rinishida saqlanadi. `nist.py` moduli ularni yutilish chegaralari orasidagi har bir segment ichida log-log masshtabda interpolyatsiya qiladi hamda to‘qima, suv va havo koeffitsiyentlarini elementlar jadvallaridan aralashma qoidasi bo‘yicha hisoblaydi; birikmalar jadvallari faqat tekshirish uchun saqlanadi. SpekPy spektrlarida IMdagi bilan bir xil energiya intervali (mis uchun 0,05 keV) qo‘llaniladi.

`run_all.py` skripti avval $\eta$ ni 0,25–0,7 oralig‘ida 3 keV dan yuqori energiyalarda normallashtirilgan IM va SpekPy tormozlanish nurlanishi spektrlari orasidagi o‘rtacha kvadratik chetlanishni chegaralangan minimallashtirish yo‘li bilan moslashtiradi. So‘ngra u elektronlar va Cu chiziqlariga oid ma’lumotlarni, SpekPy bilan solishtirish orqali validatsiyani (trubka kuchlanishi va anod burchagining 1 mm Al bilan va usiz sakkizta kombinatsiyasi hamda 50–100 kV dagi volfram anod) va bazaviy spektrni hisoblaydi. Shuningdek, u anod burchagi, trubka kuchlanishi, Be oyna va 13 ta qo‘shimcha filtrning ta’sirini, 0,1–2 % Ag uchun DEFni va uning chuqurlik hamda trubka kuchlanishiga bog‘liqligini, o‘z-o‘zini ekranlashni, oltita yuqori Z li elementni taqqoslashni, sezgirlik tahlilini va nurlantirish vaqtlarini hisoblaydi. Natijalar `data/results.json` fayliga, rasmlar uchun spektrlar esa CSV fayllarga yoziladi. `run_sweeps.py` skripti bularga yettita material uchun DEFning filtr qalinligiga bog‘liqligini qo‘shadi hamda Al dan Bi gacha bo‘lgan 43 ta filtr materialini havodagi kerma bo‘yicha o‘tkazish koeffitsiyenti 10 %, 1 % va 0,1 % bo‘lganda taqqoslaydi.

`mc_dose.py` skripti har bir konfiguratsiya uchun $4 \times 10^6$ ta foton tarixi (buyruq satri argumenti) bilan Monte-Karlo hisobini bajaradi, bunda tarixlar tasodifiy sonlar generatorining qat’iy belgilangan boshlang‘ich qiymatlariga ega beshta paketga bo‘linadi, natijalar esa `data/mc_results.json` fayliga yoziladi. `make_tables.py` va `figures.py` skriptlari ushbu fayllar asosida barcha jadval va rasmlarni ingliz, rus va o‘zbek tillarida yaratadi. Analitik hisoblarda tasodifiy elementlar mavjud emasligi va Monte-Karlo hisobidagi boshlang‘ich qiymatlar qat’iy belgilanganligi sababli beshta skriptni yuqorida keltirilgan tartibda ishga tushirish ko‘rsatilgan dasturiy ta’minot versiyalari uchun barcha jadval va rasmlarni takrorlaydi.
