"""
run_ch2.py - data for Chapter 2 (interaction of x-rays with biological media)
and the dose enhancement factor of Ag in different media:
  * partial cross-sections (photoelectric, incoherent, coherent) of Ag and of
    the media, and the photoelectric/Compton crossover energies;
  * mu/rho and mu_en/rho of ICRU-44 soft tissue, cortical bone, brain and water;
  * DEF for 1 % Ag in each medium for the reference SpekPy spectra;
  * Kanaya-Okayama electron range in copper, compared with the CSDA range.
Writes data/ch2.json, data/media_coeffs.csv and data/partial_cs.csv.
"""
import json, os
import numpy as np
import xraylib as xr
import spekpy as sp
from xspec import mass_coeff
import nist

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, '..', 'data')
MEDIA = ['tissue', 'brain', 'bone', 'water']
COMP = {'tissue': nist.TISSUE_ICRU44, 'brain': nist.BRAIN_ICRU44, 'bone': nist.BONE_ICRU44, 'water': nist.WATER}


def r(x, n=4):
    return float(np.round(float(x), n))


def partial(comp, E):
    """photoelectric, incoherent and coherent mass cross-sections (cm2/g), xraylib, mixture rule"""
    out = np.zeros((3, len(E)))
    for Z, w in comp.items():
        for i, e in enumerate(E):
            out[:, i] += w * np.array([xr.CS_Photo(Z, e), xr.CS_Compt(Z, e), xr.CS_Rayl(Z, e)])
    return out


KVP, THETA, BE_MM, DIST_CM, DE = 45.0, 12.0, 0.5, 10.0, 0.05   # as in run_all.py


def spek(filters=()):
    s = sp.Spek(kvp=KVP, th=THETA, targ='Cu', dk=DE, char=True, z=DIST_CM, mas=1.0)
    s.filter('Be', BE_MM)
    for m, t_mm in filters:
        s.filter(m, t_mm)
    s.filter('Air Dry (Near Sea Level)', DIST_CM * 10)
    return s


R = {}
# --- partial cross-sections and crossover energies
E = np.logspace(0, np.log10(200), 600)
cols, hdr = [E], ['E_keV']
for name, comp in [('Ag', {47: 1.0})] + [(m, COMP[m]) for m in MEDIA]:
    p = partial(comp, E)
    cols += list(p)
    hdr += [f'{name}_photo', f'{name}_incoh', f'{name}_coh']
    if name != 'Ag':
        Ef = np.logspace(0, np.log10(200), 20000)
        pf = partial(comp, Ef[::10])
        i = np.where(np.diff(np.sign(pf[0] - pf[1])))[0]
        R.setdefault('crossover_keV', {})[name] = r(Ef[::10][i[-1]], 1)
np.savetxt(os.path.join(DATA, 'partial_cs.csv'), np.array(cols).T, delimiter=',', header=','.join(hdr), comments='')

# shares of the interaction processes at selected energies
R['shares'] = {}
for name, comp in [('Ag', {47: 1.0})] + [(m, COMP[m]) for m in MEDIA]:
    R['shares'][name] = {}
    for e in [10.0, 20.0, 30.0, 45.0]:
        p = partial(comp, np.array([e]))[:, 0]
        R['shares'][name][str(e)] = dict(photo=r(p[0] / p.sum(), 3), incoh=r(p[1] / p.sum(), 3), coh=r(p[2] / p.sum(), 3))

# --- coefficients of the media
Eg = np.logspace(0, np.log10(100), 400)
cols, hdr = [Eg], ['E_keV']
for m in MEDIA + [47]:
    cols += [nist.coeff(m, Eg, 'mu'), nist.coeff(m, Eg, 'muen')]
    hdr += [f'{m}_mu', f'{m}_muen']
np.savetxt(os.path.join(DATA, 'media_coeffs.csv'), np.array(cols).T, delimiter=',', header=','.join(hdr), comments='')
R['coeff_table'] = []
for e in [8.05, 10.0, 15.0, 20.0, 30.0, 40.0]:
    row = dict(E=e)
    for m in MEDIA:
        row[m + '_mu'] = r(nist.coeff(m, [e], 'mu')[0], 4)
        row[m + '_muen'] = r(nist.coeff(m, [e], 'muen')[0], 4)
        row['ratio_' + m] = r(nist.coeff(47, [e], 'muen')[0] / nist.coeff(m, [e], 'muen')[0], 1)
    R['coeff_table'].append(row)
R['rho'] = {m: nist.RHO[m] for m in MEDIA}
R['composition'] = {m: {str(k): v for k, v in COMP[m].items()} for m in MEDIA}

# --- DEF for 1 % Ag in each medium (kerma approximation, SpekPy spectra at 10 cm)
R['DEF_media'] = []
for lab, flt in [('none', ()), ('Al 1.0', (('Al', 1.0),)), ('Al 2.0', (('Al', 2.0),)), ('Cu 0.2', (('Cu', 0.2),))]:
    k, f = spek(filters=flt).get_spectrum()
    psi = f * k
    row = dict(filter=lab)
    for m in MEDIA:
        mt = mass_coeff(m, k, 'muen')
        ma = mass_coeff(47, k, 'muen')
        row[m] = r((psi * (0.99 * mt + 0.01 * ma)).sum() / (psi * mt).sum(), 4)
    R['DEF_media'].append(row)

# --- Kanaya-Okayama range in copper versus the CSDA range
A, Z, rho, E0 = 63.546, 29, 8.96, 45.0
R['kanaya_okayama_um_45keV'] = r(0.0276 * A * E0 ** 1.67 / (rho * Z ** 0.889), 3)

json.dump(R, open(os.path.join(DATA, 'ch2.json'), 'w'), indent=1)
print(json.dumps({k: R[k] for k in ('crossover_keV', 'DEF_media', 'kanaya_okayama_um_45keV')}, indent=1))
