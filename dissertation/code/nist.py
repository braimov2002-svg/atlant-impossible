"""
nist.py - photon mass attenuation (mu/rho) and mass energy-absorption
(mu_en/rho) coefficients from the NIST tables of Hubbell & Seltzer
(NISTIR 5632, physics.nist.gov/PhysRefData/XrayMassCoef), with log-log
interpolation inside each absorption-edge segment, as recommended by NIST.
The raw HTML tables are stored in data/nist/.
"""
import os
import re
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
NDIR = os.path.join(HERE, '..', 'data', 'nist')
_cache = {}
NUM = re.compile(r'\d\.\d+E[-+]\d+')

# compositions by mass (ICRU Report 44 / NIST table 2)
TISSUE_ICRU44 = {1: 0.102, 6: 0.143, 7: 0.034, 8: 0.708, 11: 0.002, 15: 0.003, 16: 0.003, 17: 0.002, 19: 0.003}
WATER = {1: 0.111894, 8: 0.888106}
AIR = {6: 0.000124, 7: 0.755268, 8: 0.231781, 18: 0.012827}
RHO = {'tissue': 1.06, 'water': 1.0, 'air': 1.20479e-3}


def _load(name):
    if name in _cache:
        return _cache[name]
    fn = os.path.join(NDIR, (f'z{name:02d}' if isinstance(name, (int, np.integer)) else name) + '.html')
    txt = re.sub(r'<[^>]*>', ' ', open(fn, encoding='latin-1').read())
    vals = [float(v) for v in NUM.findall(txt)]
    tab = np.array(vals[: len(vals) // 3 * 3]).reshape(-1, 3)
    tab[:, 0] *= 1e3        # MeV -> keV
    _cache[name] = tab
    return tab


def _interp(tab, E, col):
    """log-log interpolation segment by segment (edges = repeated energies)."""
    e, v = tab[:, 0], tab[:, col]
    E = np.atleast_1d(np.asarray(E, float))
    out = np.empty_like(E)
    edges = np.where(np.diff(e) == 0)[0]            # index i: e[i] == e[i+1]
    starts = np.concatenate([[0], edges + 1])
    ends = np.concatenate([edges + 1, [len(e)]])
    for s, t in zip(starts, ends):
        lo, hi = e[s], e[t - 1]
        m = (E >= lo) & (E <= hi) if s == 0 else (E > lo) & (E <= hi)
        if s == 0:
            m |= E < lo
        if m.any():
            out[m] = np.exp(np.interp(np.log(E[m]), np.log(e[s:t]), np.log(v[s:t])))
    return out


def coeff(material, E, kind='muen'):
    """material: atomic number, 'tissue' (ICRU-44 soft tissue), 'water', 'air',
    or a dict {Z: mass fraction}. kind: 'mu' or 'muen'. Returns cm^2/g."""
    col = 1 if kind == 'mu' else 2
    if isinstance(material, (int, np.integer)):
        return _interp(_load(int(material)), E, col)
    comp = material if isinstance(material, dict) else {'tissue': TISSUE_ICRU44, 'water': WATER, 'air': AIR}[material]
    E = np.atleast_1d(np.asarray(E, float))
    out = np.zeros_like(E)
    for Z, w in comp.items():
        out += w * _interp(_load(int(Z)), E, col)
    return out


def compound_table(name, E, kind='muen'):
    """direct interpolation in the NIST compound table (for verification)."""
    return _interp(_load(name), E, 1 if kind == 'mu' else 2)
