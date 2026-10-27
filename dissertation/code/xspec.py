"""
xspec.py - semi-analytical model of the x-ray spectrum emitted by a
reflection-target x-ray tube (thick target), developed for the master's
dissertation "X-ray spectrum modeling for the study of radio-enhancement
in biological matter with Ag".

Physics included
  * electron slowing-down in the anode: Bethe collision stopping power
    (ICRU Report 37 form, no density-effect correction, which is negligible
    below 100 keV), continuous-slowing-down approximation (CSDA);
  * electron depth: projected depth d(T) = eta * s(T) * cos(theta_e),
    where s is the CSDA path length and eta < 1 accounts for electron
    diffusion (single adjustable parameter of the model);
  * bremsstrahlung: non-relativistic Bethe-Heitler (Born) cross-section
    multiplied by the Elwert Coulomb correction factor ("BH-E"),
    Kramers' cross-section kept as an alternative;
  * characteristic K radiation: direct electron-impact K-shell ionisation
    (Gryzinski binary-encounter cross-section), fluorescence yield and
    radiative-rate line fractions from xraylib, plus indirect K
    fluorescence excited by bremsstrahlung absorbed inside the anode;
  * self-absorption in the anode for the exit path d / sin(theta);
  * attenuation by the Be window, air gap and added filters;
  * inverse-square law to the point of interest.

Mass energy-absorption coefficients mu_en/rho and the attenuation
coefficients of tissue, water and air are interpolated in the NIST tables of
Hubbell & Seltzer (module nist.py). Elemental attenuation and photo-absorption
cross-sections, edge and line energies, fluorescence yields and radiative
rates are taken from xraylib (their mu/rho agree with NIST to < 0.1 %).

Units: energy keV, length cm, density g/cm^3, cross-section cm^2.
"""
import numpy as np
import xraylib as xr
import nist

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

AIR = 'air'
TISSUE = 'tissue'          # ICRU-44 soft tissue, rho = 1.06 g/cm3
WATER = 'water'
TISSUE4 = {1: 0.101174, 6: 0.111, 7: 0.026, 8: 0.761826}   # ICRU four-component
COMPOUND_RHO = {'tissue': 1.06, 'water': 1.0, 'air': 1.20479e-3}


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


def mu_lin(Z_or_cmp, E, rho=None):
    """linear attenuation coefficient (1/cm) of an element (int) or compound (str)"""
    E = np.atleast_1d(np.asarray(E, float))
    if isinstance(Z_or_cmp, (int, np.integer)):
        rho = rho if rho is not None else DENSITY.get(int(Z_or_cmp), xr.ElementDensity(int(Z_or_cmp)))
        return rho * np.array([xr.CS_Total(int(Z_or_cmp), float(e)) for e in E])
    rho = rho if rho is not None else COMPOUND_RHO.get(Z_or_cmp, 1.0)
    return rho * mass_coeff(Z_or_cmp, E, 'mu')


def mass_coeff(cmp, E, kind='mu'):
    """mass attenuation (mu) or energy-absorption (muen) coefficient, cm^2/g,
    for an element (int), 'tissue'/'water'/'air' or a dict {Z: w}.
    mu_en/rho always from the NIST tables; mu/rho of elements from xraylib."""
    E = np.atleast_1d(np.asarray(E, float))
    if kind == 'muen' or not isinstance(cmp, (int, np.integer)):
        return nist.coeff(cmp, E, kind)
    return np.array([xr.CS_Total(int(cmp), float(e)) for e in E])


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

    # --------------------------------------------------------------
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


# ---------------------------------------------------------------------
# beam-quality quantities
def air_kerma(E, phi, dE=None):
    """air kerma (Gy) for fluence spectrum phi (1/keV/cm2) on grid E"""
    dE = dE if dE is not None else np.gradient(E)
    return (phi * E * mass_coeff(AIR, E, 'muen') * dE).sum() * KEV_TO_J * 1e3


def hvl(E, phi, Z=13, target=0.5):
    """half-value layer thickness (cm) of element Z (default Al)"""
    dE = np.gradient(E)
    w = phi * E * mass_coeff(AIR, E, 'muen') * dE
    mu = mu_lin(Z, E)
    K0 = w.sum()
    lo, hi = 0.0, 1.0
    while (w * np.exp(-mu * hi)).sum() > target * K0:
        hi *= 2
    for _ in range(80):
        mid = 0.5 * (lo + hi)
        if (w * np.exp(-mu * mid)).sum() > target * K0:
            lo = mid
        else:
            hi = mid
    return 0.5 * (lo + hi)


def mean_energy(E, phi):
    return (E * phi).sum() / phi.sum()


def effective_energy(hvl_cm, Z=13):
    """energy of the monoenergetic beam that has the same first HVL"""
    from scipy.optimize import brentq
    mu_target = np.log(2) / hvl_cm
    f = lambda e: mu_lin(Z, [e])[0] - mu_target
    return brentq(f, 1.5, 150.0)


# ---------------------------------------------------------------------
# dose enhancement
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
