"""
run_sweeps.py - filter-thickness sweeps (DEF versus beam transmission) and the
equal-transmission comparison of filter materials. Results are merged into
data/results.json.
"""
import json, os
import numpy as np
import spekpy as sp
import xraylib as xr
from scipy.optimize import brentq
from xspec import mass_coeff, def_factor, DENSITY

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, '..', 'data')
R = json.load(open(os.path.join(DATA, 'results.json')))

s = sp.Spek(kvp=45, th=12, targ='Cu', dk=0.05, z=10)
s.filter('Be', 0.5)
s.filter('Air Dry (Near Sea Level)', 100)
k, f = s.get_spectrum()
mt_air = mass_coeff('air', k, 'muen')
K0 = (f * k * mt_air).sum()


def mu(Z):
    rho = DENSITY.get(Z, xr.ElementDensity(Z))
    return rho * np.array([xr.CS_Total(Z, float(e)) for e in k])


sweeps = {}
for sym, tmax_mm in [('Al', 6.0), ('Ti', 0.8), ('Ni', 0.3), ('Cu', 0.35), ('Mo', 0.3), ('Ag', 0.25), ('Sn', 0.5)]:
    Z = xr.SymbolToAtomicNumber(sym)
    m = mu(Z)
    rows = []
    for t in np.linspace(0, tmax_mm, 61):
        fT = f * np.exp(-m * t / 10)
        rows.append(dict(t_mm=float(np.round(t, 4)),
                         kerma_rel=float((fT * k * mt_air).sum() / K0),
                         DEF1=float(np.round(def_factor(k, fT, 0.01), 4)),
                         DEF05=float(np.round(def_factor(k, fT, 0.005), 4))))
    sweeps[sym] = rows
R['sweeps'] = sweeps

scan = []
for Z in range(13, 84):
    if Z in (15, 16, 17, 18, 19, 34, 35, 36, 37, 43, 54, 55, 61, 80, 81, 84) or (57 <= Z <= 71 and Z != 64):
        continue
    m = mu(Z)
    row = dict(Z=Z, sym=xr.AtomicNumberToSymbol(Z))
    ok = True
    for TK in [0.1, 0.01, 0.001]:
        g = lambda t: (f * k * mt_air * np.exp(-m * t)).sum() / K0 - TK
        try:
            t = brentq(g, 1e-8, 50.0)
        except ValueError:
            ok = False
            break
        row[f't_um_{TK}'] = float(np.round(t * 1e4, 2))
        row[f'DEF1_{TK}'] = float(np.round(def_factor(k, f * np.exp(-m * t), 0.01), 4))
    if ok:
        scan.append(row)
R['filter_scan'] = scan
json.dump(R, open(os.path.join(DATA, 'results.json'), 'w'), indent=1)
for row in scan:
    if row['sym'] in ('Al', 'Ti', 'Co', 'Ni', 'Cu', 'Mo', 'Ag', 'Sn', 'I', 'Gd', 'W', 'Au'):
        print(row)
