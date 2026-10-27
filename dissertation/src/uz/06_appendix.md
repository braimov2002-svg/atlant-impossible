# ILOVALAR

## A ilova. Spektr modelining boshlang‘ich kodi (fragmentlar)

Ishlab chiqilgan model (IM) Python `xspec.py` modulida amalga oshirilgan; fragmentlar o‘zgarishsiz keltirilgan (energiyalar keV da, uzunliklar sm da). Bete tormozlanish qobiliyati (ICRU 37-hisobotidagi konstantalar [@icru37], zichlik effekti uchun tuzatmasiz; {{REF:eq:bethe}}, {{REF:eq:fminus}}), moslashtirilgan $\eta = 0{,}40$ bilan elektronlarning kirish chuqurligi ({{REF:eq:csda}}, {{REF:eq:depth}}), izotrop nurlanish uchun qalin nishon integrali ({{REF:eq:thick}}), bevosita hosil bo‘ladigan K chiziqlar ({{REF:eq:charK}}) hamda filtrlash, flyuens va havodagi kerma ({{REF:eq:filter}}, {{REF:eq:fluence}}, {{REF:eq:kerma}}) tushirib qoldirilgan.

`brems_dcs` funksiyasi Kramers kesimini ({{REF:eq:kramers}}) yoki, sukut bo‘yicha, norelyativistik Bete–Gaytler kesimini ({{REF:eq:bhnr}}) Elvert ko‘paytuvchisi ({{REF:eq:elwert}}) bilan qaytaradi; `sigma_K_gryzinski` — $U_K = T/E_K$ ortiqcha kuchlanish nisbati (`U` o‘zgaruvchisi) uchun Grizinskiyning K-qobiq ionizatsiyasi kesimi ({{REF:eq:gryz}}).

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

`TubeModel._characteristic` metodining ikkita parchasi bilvosita flyuoressensiyani hosil bo‘lgan tormozlanish nurlanishining K-chegaradan yuqori qismidan yopiq ko‘rinishda ({{REF:eq:indirect}}) hisoblaydi; bunda `tauK` — $\tau_K$, `b` esa $\mu_j/\sin\theta$.

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

`def_factor` funksiyasi DEFni kerma yaqinlashuvida ({{REF:eq:def_spec}}) aralashma qoidasi ({{REF:eq:mixture}}) bo‘yicha hisoblaydi, bunda energiya flyuensi ustidagi to‘qimada ({{REF:eq:def_depth}}) yoki, `attenuate_with_agent=True` bo‘lganda, to‘qima zichligidagi Ag kiritilgan aralashmada ({{REF:eq:def_slab}}) susaytiriladi.

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

## B ilova. Takrorlanuvchanlik

Barcha jadval va rasmlar `dissertation/code` katalogidagi skriptlar yordamida `dissertation/data` katalogidagi ma’lumotlardan (II bobdagi yordamchi tekshiruvlar bundan mustasno) Python 3.13, NumPy 2.5.3 [@harris2020], SciPy 1.18.1 [@virtanen2020], Matplotlib 3.11.2 [@hunter2007], xraylib 4.3.0 [@schoonjans2011] va SpekPy 2.5.4 [@poludniowski2021; @spekpy_soft] vositasida olinadi. `nist.py` moduli NIST jadvallarini [@nist_xraymass] 31 ta element, quruq havo, suv va ICRU-44 yumshoq to‘qimasi [@icru44] uchun yutilish chegaralari orasida log-log interpolyatsiya qiladi. `run_all.py` skripti $\eta$ ni (0,25–0,7) 3 keV dan yuqoridagi SpekPy tormozlanish nurlanishiga moslashtiradi hamda validatsiyani, bazaviy spektrni, konstruksiya va filtrlar ta’sirini, DEFning konsentratsiya, chuqurlik va kuchlanishga bog‘liqligini, o‘z-o‘zini ekranlashni, elementlarni taqqoslashni, sezgirlikni va ekspozitsiya vaqtlarini hisoblaydi (`data/results.json`); `run_sweeps.py` skripti filtr qalinligi bo‘yicha skanerlashni qo‘shadi va 43 ta filtr materialini havodagi kerma bo‘yicha bir xil o‘tkazish koeffitsiyentida taqqoslaydi. `mc_dose.py` skripti har bir konfiguratsiya uchun $4 \times 10^6$ ta tarixni tasodifiy sonlar generatorining boshlang‘ich qiymatlari qat’iy belgilangan beshta seriyada modellashtiradi (`data/mc_results.json`), `make_tables.py` va `figures.py` skriptlari esa jadval va rasmlarni uch tilda yaratadi. Analitik kod deterministik bo‘lgani va boshlang‘ich qiymatlar qat’iy belgilangani sababli beshta skriptni shu tartibda ishga tushirish barcha natijalarni takrorlaydi.
