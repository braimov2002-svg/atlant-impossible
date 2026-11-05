# APPENDICES

## Appendix A. Source code of the spectrum model (fragments)

The developed model (DM) is implemented in the Python module `xspec.py`; the fragments are verbatim (energies in keV, lengths in cm). Omitted are the Bethe stopping power (ICRU Report 37 constants [@icru37], no density-effect correction; {{REF:eq:bethe}}, {{REF:eq:fminus}}), the electron depth with the fitted $\eta = 0.40$ ({{REF:eq:csda}}, {{REF:eq:depth}}), the thick-target integral for isotropic emission ({{REF:eq:thick}}), the direct K lines ({{REF:eq:charK}}) and the filtration, fluence and air kerma ({{REF:eq:filter}}, {{REF:eq:fluence}}, {{REF:eq:kerma}}).

`brems_dcs` returns Kramers' cross-section ({{REF:eq:kramers}}) or, by default, the non-relativistic Bethe–Heitler one ({{REF:eq:bhnr}}) with the Elwert factor ({{REF:eq:elwert}}); `sigma_K_gryzinski` is the Gryziński K-shell ionisation cross-section ({{REF:eq:gryz}}) for the overvoltage ratio $U_K = T/E_K$ (variable `U`).

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

Two excerpts of `TubeModel._characteristic` evaluate the indirect fluorescence in closed form ({{REF:eq:indirect}}) from the generated bremsstrahlung above the K-edge, where `tauK` is $\tau_K$ and `b` is $\mu_j/\sin\theta$.

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

`def_factor` calculates the DEF in the kerma approximation ({{REF:eq:def_spec}}) with the mixture rule ({{REF:eq:mixture}}), attenuating the energy fluence in overlying tissue ({{REF:eq:def_depth}}) or, with `attenuate_with_agent=True`, in the Ag-loaded mixture of tissue density ({{REF:eq:def_slab}}).

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

All tables and figures are produced by the scripts in `dissertation/code` from `dissertation/data` (the auxiliary checks of Chapter 2 excluded) with Python 3.13, NumPy 2.5.3 [@harris2020], SciPy 1.18.1 [@virtanen2020], Matplotlib 3.11.2 [@hunter2007], xraylib 4.3.0 [@schoonjans2011] and SpekPy 2.5.4 [@poludniowski2021; @spekpy_soft]. `nist.py` interpolates the NIST tables [@nist_xraymass] for 31 elements, dry air, water and ICRU-44 soft tissue [@icru44] log-log between absorption edges. `run_all.py` fits $\eta$ (0.25–0.7) to the SpekPy bremsstrahlung above 3 keV and computes the validation, baseline spectrum, design and filter effects, DEF versus concentration, depth and voltage, self-shielding, element comparison, sensitivity and exposure times (`data/results.json`); `run_sweeps.py` adds the filter-thickness scans and compares 43 filter materials at equal air-kerma transmission. `mc_dose.py` runs $4 \times 10^6$ histories per configuration in five fixed-seed batches (`data/mc_results.json`), and `make_tables.py` and `figures.py` generate the tables and figures in three languages. As the analytical code is deterministic and the seeds are fixed, running the five scripts in this order reproduces all results.
