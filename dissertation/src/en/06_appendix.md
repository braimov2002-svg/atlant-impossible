# APPENDICES

## Appendix A. Source code of the spectrum model (fragments)

The developed model (DM) is implemented in the Python module `xspec.py`, which uses NumPy, xraylib and the module `nist.py`. The fragments below are copied from it without changes, including the comments; the code between them is omitted. Energies are given in keV, lengths in cm, densities in g/cm$^3$ and cross-sections in cm$^2$.

The first fragment defines constants and material data. The constant `PI_E4` is the product $\pi e^4$ in cm$^2$ keV$^2$ (Gaussian units), `ELECTRONS_PER_MAS` is the number of electrons per milliampere-second, $10^{-3}/e$, and `I_EXC` contains the mean excitation energies of ICRU Report 37 [@icru37], including $I = 322$ eV for copper.

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

The functions `beta2` and `momentum` return $\beta^2$ and the momentum $pc$ of an electron with kinetic energy $T$. The function `stopping_power` evaluates the Bethe collision stopping power in the form of ICRU Report 37 ({{REF:eq:bethe}} and {{REF:eq:fminus}}) without the density-effect correction. The coefficient $0.5 \times 0.307075$ MeV cm$^2$/mol equals $2\pi N_A r_e^2 m_e c^2$, and the result is the linear stopping power in keV/cm.

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

The function `brems_dcs` returns the bremsstrahlung cross-section per atom, differential in the photon energy (variable `k`). It gives either Kramers' cross-section ({{REF:eq:kramers}}) or, by default, the non-relativistic Bethe–Heitler cross-section ({{REF:eq:bhnr}}) multiplied by the Elwert factor ({{REF:eq:elwert}}), in which `eta0` and `eta1` are $2\pi Z\alpha/\beta_0$ and $2\pi Z\alpha/\beta$ for the incident and outgoing electron. The function `sigma_K_gryzinski` implements the Gryziński K-shell ionisation cross-section ({{REF:eq:gryz}}) with two K-shell electrons and the overvoltage $U = T/E_K$.

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

The class `TubeModel` stores the tube voltage, anode atomic number, anode angle and electron depth factor and uses photon bins of 0.05 keV and an electron energy step of 0.02 keV. The default `eta=1.0` corresponds to straight-line electron paths; apart from the fit and the sensitivity test (±25 %), all calculations use the fitted $\eta = 0.40$ passed by `run_all.py`. The method `_compute` integrates $1/S$ by the trapezoidal rule to obtain the path length in the continuous-slowing-down approximation ({{REF:eq:csda}}) and the projected depth ({{REF:eq:depth}}). It then evaluates the thick-target bremsstrahlung integral ({{REF:eq:thick}}) with self-absorption along the exit path $d/\sin\theta$, and the division by $4\pi$ assumes isotropic emission. Without the attenuation and the factor $1/4\pi$, the same sum (`brems_generated`) gives the generated spectrum $N_g(E)$. The method `_characteristic` calculates the Cu K$\alpha_2$, K$\alpha_1$, K$\beta_3$ and K$\beta_1$ lines with the fluorescence yield of xraylib [@schoonjans2011] and its radiative rates normalised over the four lines. The direct contribution ({{REF:eq:charK}}) weights each K-shell ionisation by the escape probability of the line photon, and the indirect contribution is the closed-form expression ({{REF:eq:indirect}}), in which `tauK` is the linear K-shell photoabsorption coefficient $\tau_K$ and `b` is $b_j = \mu_j/\sin\theta$.

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

The method `spectrum` adds the lines to the energy bins, applies the transmission of the Be window, filters and air ({{REF:eq:filter}}) and converts the yield per electron and steradian into the photon fluence per keV per cm$^2$ for a given exposure with the inverse-square law ({{REF:eq:fluence}}). The function `air_kerma` evaluates the air kerma ({{REF:eq:kerma}}) with the NIST coefficients of dry air; the factor `KEV_TO_J * 1e3` converts keV/g into Gy. The functions `hvl`, `mean_energy` and `effective_energy` (not reproduced) calculate the half-value layer by bisection of the air-kerma transmission through aluminium, the mean energy and the effective energy.

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

The function `def_factor` calculates the dose enhancement factor (DEF) in the kerma approximation ({{REF:eq:def_spec}}) with the mixture rule ({{REF:eq:mixture}}) and the NIST mass energy-absorption coefficients. The energy fluence `psi` is attenuated by the overlying tissue ({{REF:eq:def_depth}}). With `attenuate_with_agent=True`, the numerator is attenuated by the silver-loaded mixture, which describes a uniformly loaded region extending from the surface ({{REF:eq:def_slab}}); the density of the mixture is approximated by that of tissue.

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

## Appendix B. Reproducibility

The main numerical results and all tables and figures are produced by the scripts in `dissertation/code` from the data in `dissertation/data`; the auxiliary checks of Chapter 2 (comparison with ESTAR, test of the xraylib function CS_Energy, Monte Carlo tests) are not part of them. The calculations were performed with Python 3.13, NumPy 2.5.3 [@harris2020], SciPy 1.18.1 [@virtanen2020], Matplotlib 3.11.2 [@hunter2007], xraylib 4.3.0 [@schoonjans2011] and SpekPy 2.5.4 [@poludniowski2021; @spekpy_soft]. The NIST tables of the mass attenuation and mass energy-absorption coefficients [@nist_xraymass] for 31 elements, dry air, water and ICRU-44 soft tissue [@icru44] are stored as HTML pages in `data/nist`. The module `nist.py` interpolates them log-log within each segment between absorption edges and calculates the coefficients of tissue, water and air from the elemental tables by the mixture rule; the compound tables are kept only for verification. The SpekPy spectra use the same energy bin as the DM (0.05 keV for copper).

The script `run_all.py` first fits $\eta$ in the interval 0.25–0.7 by bounded minimisation of the root-mean-square deviation between the normalised DM and SpekPy bremsstrahlung spectra above 3 keV. It then calculates the electron and Cu line data, the validation against SpekPy (eight combinations of tube voltage and anode angle with and without 1 mm Al, and a tungsten anode at 50–100 kV) and the baseline spectrum. It also calculates the effects of the anode angle, tube voltage, Be window and 13 added filters, the DEF for 0.1–2 % Ag and its dependence on depth and tube voltage, the self-shielding, the comparison of six high-Z elements, the sensitivity analysis and the exposure times. The results are written to `data/results.json` and the spectra for the figures to CSV files. The script `run_sweeps.py` adds the DEF as a function of the filter thickness for seven materials and compares 43 filter materials from Al to Bi at air-kerma transmissions of 10 %, 1 % and 0.1 %.

The script `mc_dose.py` performs the Monte Carlo calculation with $4 \times 10^6$ photon histories per configuration (command-line argument), divided into five batches with fixed random seeds, and writes `data/mc_results.json`. The scripts `make_tables.py` and `figures.py` generate all tables and figures in English, Russian and Uzbek from these files. Because the analytical calculations contain no random elements and the Monte Carlo seeds are fixed, running the five scripts in the order given above reproduces all tables and figures for the stated software versions.
