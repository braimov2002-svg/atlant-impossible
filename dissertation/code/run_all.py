"""
run_all.py - all numerical results of the dissertation.

Produces data/results.json (every number quoted in the text) and CSV files
with the spectra used in the figures.
"""
import json, os
import numpy as np
import spekpy as sp
import xraylib as xr
from scipy.optimize import minimize_scalar, brentq
from xspec import (TubeModel, mean_energy, hvl, air_kerma, def_factor, effective_energy,
                   mass_coeff, mu_lin, transmission, stopping_power, sigma_K_gryzinski,
                   TISSUE, WATER, TISSUE4, DENSITY)

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, '..', 'data')
os.makedirs(DATA, exist_ok=True)
R = {}

KVP, THETA, BE_MM, DIST_CM, MA = 45.0, 12.0, 0.5, 10.0, 40.0
DE = 0.05
SYMBOL = {4: 'Be', 13: 'Al', 28: 'Ni', 29: 'Cu', 42: 'Mo', 47: 'Ag', 50: 'Sn'}
WS = [0.001, 0.002, 0.005, 0.01, 0.02]          # Ag mass fractions


def r(x, n=4):
    return float(np.round(float(x), n))


# ------------------------------------------------------------------ 1. eta fit
def spek(kvp=KVP, th=THETA, be_mm=BE_MM, filters=(), air_cm=DIST_CM, char=True, z=DIST_CM, targ='Cu', dk=DE):
    s = sp.Spek(kvp=kvp, th=th, targ=targ, dk=dk, char=char, z=z, mas=1.0)
    if be_mm:
        s.filter('Be', be_mm)
    for m, t_mm in filters:
        s.filter(m, t_mm)
    if air_cm:
        s.filter('Air Dry (Near Sea Level)', air_cm * 10)
    return s


s_ref = spek(be_mm=0.5, air_cm=0, char=False, z=100)
k_ref, f_ref = s_ref.get_spectrum()


def shape_rms(eta):
    m = TubeModel(kvp=45, Z=29, theta=12, eta=eta, include_char=False, dE=DE)
    E, p = m.spectrum(filters=[(4, 0.05)])
    fi = np.interp(E, k_ref, f_ref)
    msk = E > 3
    a, b = p[msk] / p[msk].sum(), fi[msk] / fi[msk].sum()
    return np.sqrt(np.mean(((a - b) / b.max()) ** 2))


fit = minimize_scalar(shape_rms, bounds=(0.25, 0.7), method='bounded', options={'xatol': 1e-4})
ETA = float(np.round(fit.x, 2))
R['eta_fit'] = dict(eta=ETA, rms_percent=r(fit.fun * 100, 2),
                    rms_eta1_percent=r(shape_rms(1.0) * 100, 2))
print('eta', ETA)


def dm(kvp=KVP, th=THETA, **kw):
    return TubeModel(kvp=kvp, Z=kw.pop('Z', 29), theta=th, eta=kw.pop('eta', ETA), dE=DE, **kw)


def mm_filters(filters_mm):
    """[(symbol or Z, mm)] -> [(Z, cm)]"""
    out = []
    for m, t in filters_mm:
        Z = m if isinstance(m, int) else xr.SymbolToAtomicNumber(m)
        out.append((Z, t / 10.0))
    return out


def dm_spectrum(model, be_mm=BE_MM, filters_mm=(), air_cm=DIST_CM, dist=DIST_CM, mas=1.0):
    f = [(4, be_mm / 10.0)] + mm_filters(filters_mm)
    return model.spectrum(filters=f, air_cm=air_cm, dist_cm=dist, mas=mas)


def quality(E, phi):
    h1 = hvl(E, phi)
    h2 = hvl(E, phi, target=0.25) - h1
    return dict(Emean=r(mean_energy(E, phi), 2), HVL1_mmAl=r(h1 * 10, 4), HVL2_mmAl=r(h2 * 10, 4),
                hc=r(h1 / h2, 3), Eeff=r(effective_energy(h1), 2),
                frac_above_AgK=r(phi[E > 25.514].sum() / phi.sum(), 4),
                energy_frac_above_AgK=r((E * phi)[E > 25.514].sum() / (E * phi).sum(), 4))


# ---------------------------------------------------------- 2. stopping power, sigma_K
T = np.array([5, 10, 15, 20, 25, 30, 35, 40, 45])
R['electron_cu'] = dict(T_keV=T.tolist(),
                        S_MeVcm2g=[r(x, 3) for x in stopping_power(T, 29) / 8.96 / 1e3],
                        sigmaK_barn=[r(x, 1) for x in sigma_K_gryzinski(T, xr.EdgeEnergy(29, xr.K_SHELL)) * 1e24])
m0 = dm()
R['electron_cu']['csda_range_um_45keV'] = r(m0.csda_range * 1e4, 3)
R['electron_cu']['mean_depth_um_45keV'] = r(m0.csda_range * 1e4 * ETA * np.cos(np.radians(THETA)), 3)
np.savetxt(os.path.join(DATA, 'electron_cu.csv'),
           np.c_[m0.T, m0.S / 8.96 / 1e3, m0.depth * 1e4,
                 sigma_K_gryzinski(m0.T, xr.EdgeEnergy(29, xr.K_SHELL)) * 1e24],
           delimiter=',', header='T_keV,S_MeVcm2g,depth_um,sigmaK_barn', comments='')

# ------------------------------------------------------------- 3. Cu lines
R['cu_lines'] = [dict(name=d['name'], E=r(d['energy'], 4), rel_rate=r(d['rel_rate'], 4),
                      direct=float(d['direct']), indirect=float(d['indirect']),
                      indirect_frac=r(d['indirect'] / (d['direct'] + d['indirect']), 4))
                 for d in m0.line_data]
R['cu_atomic'] = dict(EK=r(xr.EdgeEnergy(29, xr.K_SHELL), 4), omegaK=r(xr.FluorYield(29, xr.K_SHELL), 4),
                      Ka1=r(xr.LineEnergy(29, xr.KL3_LINE), 4), Ka2=r(xr.LineEnergy(29, xr.KL2_LINE), 4),
                      Kb=r(xr.LineEnergy(29, xr.KM3_LINE), 4),
                      k_ionisations_per_electron=r(m0.k_ionisations, 6))

# --------------------------------------------- 4. validation of the DM vs SpekPy
val = []
for kvp, th in [(45, 12), (45, 6), (45, 20), (45, 30), (25, 12), (30, 12), (40, 12), (50, 12)]:
    for flt in [(), (('Al', 1.0),)]:
        s = spek(kvp=kvp, th=th, filters=flt, air_cm=0, z=100)
        k, f = s.get_spectrum()
        sb = spek(kvp=kvp, th=th, filters=flt, air_cm=0, z=100, char=False)
        kb, fb = sb.get_spectrum()
        m = dm(kvp, th)
        E, p = dm_spectrum(m, filters_mm=flt, air_cm=0, dist=100)
        mb = dm(kvp, th, include_char=False)
        Eb, pb = dm_spectrum(mb, filters_mm=flt, air_cm=0, dist=100)
        qm, qs = quality(E, p), quality(k, f)
        val.append(dict(kvp=kvp, theta=th, filter='Al 1.0 mm' if flt else 'none',
                        Emean_DM=qm['Emean'], Emean_SP=qs['Emean'],
                        HVL_DM=qm['HVL1_mmAl'], HVL_SP=qs['HVL1_mmAl'],
                        HVL_dev_pct=r((qm['HVL1_mmAl'] / qs['HVL1_mmAl'] - 1) * 100, 1),
                        K_DM=r(air_kerma(E, p, DE) * 1e6, 1), K_SP=r(s.get_kerma(), 1),
                        K_ratio=r(air_kerma(E, p, DE) * 1e6 / s.get_kerma(), 3),
                        char_to_brems_DM=r((p.sum() - pb.sum()) / pb.sum(), 3),
                        char_to_brems_SP=r((f.sum() - fb.sum()) / fb.sum(), 3)))
R['validation_cu'] = val

# W-anode check of the generality of the model (L lines neglected => Al filtration)
valw = []
for kvp in [50, 80, 100]:
    s = spek(kvp=kvp, th=12, targ='W', be_mm=0, filters=(('Al', 2.5),), air_cm=0, z=100, dk=0.1)
    k, f = s.get_spectrum()
    m = TubeModel(kvp=kvp, Z=74, theta=12, eta=ETA, dE=0.1)
    E, p = m.spectrum(filters=[(13, 0.25)], dist_cm=100)
    valw.append(dict(kvp=kvp, Emean_DM=r(mean_energy(E, p), 2), Emean_SP=r(s.get_emean(), 2),
                     HVL_DM=r(hvl(E, p) * 10, 3), HVL_SP=r(s.get_hvl1(), 3),
                     K_ratio=r(air_kerma(E, p, 0.1) * 1e6 / s.get_kerma(), 3)))
    np.savetxt(os.path.join(DATA, f'W_{kvp}kV.csv'), np.c_[k, f, np.interp(k, E, p)], delimiter=',',
               header='E_keV,SpekPy,DM', comments='')
R['validation_w'] = valw

# ----------------------------------------------------- 5. baseline spectrum
mb = dm()
E, phi = dm_spectrum(mb, mas=1.0)
s0 = spek()
k0, f0 = s0.get_spectrum()
R['baseline'] = dict(kvp=KVP, theta=THETA, be_mm=BE_MM, dist_cm=DIST_CM, mA=MA,
                     DM=quality(E, phi), SP=quality(k0, f0),
                     kerma_mGy_per_mAs_DM=r(air_kerma(E, phi, DE) * 1e3, 3),
                     kerma_mGy_per_mAs_SP=r(s0.get_kerma() * 1e-3, 3),
                     fluence_per_mAs_DM=float((phi * DE).sum()), fluence_per_mAs_SP=float(s0.get_flu()),
                     kerma_rate_Gy_s_SP=r(s0.get_kerma() * 1e-6 * MA, 3),
                     char_fraction_fluence_SP=r(1 - spek(char=False).get_flu() / s0.get_flu(), 3))
np.savetxt(os.path.join(DATA, 'baseline.csv'), np.c_[E, phi, np.interp(E, k0, f0)], delimiter=',',
           header='E_keV,DM_per_keV_cm2_mAs,SpekPy', comments='')

# ------------------------------------------- 6. parameter studies (SpekPy + DM)
studies = {}


def study(name, cases):
    out = []
    spectra = []
    for label, kw_s, kw_m in cases:
        s = spek(**kw_s)
        k, f = s.get_spectrum()
        m = dm(kw_m.get('kvp', KVP), kw_m.get('th', THETA))
        E, p = dm_spectrum(m, be_mm=kw_m.get('be_mm', BE_MM), filters_mm=kw_m.get('filters_mm', ()))
        q = quality(k, f)
        q.update(label=label, kerma_mGy_per_mAs=r(s.get_kerma() * 1e-3, 4),
                 DEF1_SP=r(def_factor(k, f, 0.01), 4), DEF1_DM=r(def_factor(E, p, 0.01), 4),
                 HVL1_DM=quality(E, p)['HVL1_mmAl'], Emean_DM=r(mean_energy(E, p), 2))
        out.append(q)
        spectra.append((label, k, f, E, p))
    studies[name] = out
    # save spectra on a common grid (zero above each tube voltage)
    kk = np.round(np.arange(DE / 2, 50.0, DE), 4)
    cols = [kk] + [np.interp(kk, sp_[1], sp_[2], left=0, right=0) for sp_ in spectra] + \
        [np.interp(kk, sp_[3], sp_[4], left=0, right=0) for sp_ in spectra]
    hdr = 'E_keV,' + ','.join('SP_' + c[0] for c in spectra) + ',' + ','.join('DM_' + c[0] for c in spectra)
    np.savetxt(os.path.join(DATA, f'study_{name}.csv'), np.c_[tuple(cols)], delimiter=',', header=hdr, comments='')


study('angle', [(f'{a}', dict(th=a), dict(th=a)) for a in [6, 9, 12, 16, 20, 30]])
study('kvp', [(f'{v}', dict(kvp=v), dict(kvp=v)) for v in [25, 30, 35, 40, 45, 50]])
study('be', [(f'{b}', dict(be_mm=b), dict(be_mm=b)) for b in [0.15, 0.3, 0.5, 1.0, 2.0]])
FILTERS = [('none', ()), ('Al 0.25', (('Al', 0.25),)), ('Al 0.5', (('Al', 0.5),)), ('Al 1.0', (('Al', 1.0),)),
           ('Al 2.0', (('Al', 2.0),)), ('Cu 0.05', (('Cu', 0.05),)), ('Cu 0.1', (('Cu', 0.1),)),
           ('Cu 0.2', (('Cu', 0.2),)), ('Ni 0.02', (('Ni', 0.02),)), ('Sn 0.05', (('Sn', 0.05),)),
           ('Sn 0.1', (('Sn', 0.1),)), ('Sn 0.2', (('Sn', 0.2),)), ('Ag 0.05', (('Ag', 0.05),)),
           ('Mo 0.05', (('Mo', 0.05),))]
study('filters', [(lab, dict(filters=f), dict(filters_mm=f)) for lab, f in FILTERS])
R['studies'] = studies

# Ni filter: K-beta suppression
for lab, flt in [('none', ()), ('Ni 0.02', (('Ni', 0.02),))]:
    s = spek(filters=flt)
    k, f = s.get_spectrum()
    ka = f[(k > 7.9) & (k < 8.15)].sum()
    kb = f[(k > 8.8) & (k < 9.0)].sum()
    R.setdefault('kbeta_ka', {})[lab] = r(kb / ka, 4)

# ------------------------------------------------ 7. DEF matrix (SpekPy spectra)
DEFTAB = []
for lab, flt in FILTERS:
    s = spek(filters=flt)
    k, f = s.get_spectrum()
    m = dm()
    E, p = dm_spectrum(m, filters_mm=flt)
    row = dict(label=lab, kerma_rel=None)
    for w in WS:
        row[f'SP_{w}'] = r(def_factor(k, f, w), 4)
        row[f'DM_{w}'] = r(def_factor(E, p, w), 4)
        row[f'SPw_{w}'] = r(def_factor(k, f, w, tissue=WATER), 4)
    row['kerma_mGy_per_mAs'] = r(s.get_kerma() * 1e-3, 4)
    DEFTAB.append(row)
k_none = DEFTAB[0]['kerma_mGy_per_mAs']
for row in DEFTAB:
    row['kerma_rel'] = r(row['kerma_mGy_per_mAs'] / k_none, 5)
    # tissue dose rate (Gy/s at 40 mA) at the surface ~ kerma * (muen_t/muen_air) average
R['DEF_table'] = DEFTAB
R['WS'] = WS

# slope: (DEF-1) per 1 mg Ag / g tissue
R['DEF_slope_per_mg_g'] = {row['label']: r((row['SP_0.001'] - 1), 4) for row in DEFTAB}

# energy-resolved enhancement integrand (baseline + Al 1.0 + Sn 0.1)
for lab, flt in [('none', ()), ('Al 1.0', (('Al', 1.0),)), ('Sn 0.1', (('Sn', 0.1),))]:
    s = spek(filters=flt)
    k, f = s.get_spectrum()
    mt = mass_coeff(TISSUE, k, 'muen')
    ma = mass_coeff(47, k, 'muen')
    np.savetxt(os.path.join(DATA, f'integrand_{lab.replace(" ", "_")}.csv'),
               np.c_[k, f * k * mt, f * k * (0.99 * mt + 0.01 * ma)], delimiter=',',
               header='E_keV,psi_muen_t,psi_muen_mix1pct', comments='')

# --------------------------------------------- 8. DEF vs depth in tissue
depths = [0, 0.5, 1, 2, 3, 5, 7.5, 10, 15, 20]          # mm
dep = []
for lab, flt in [('none', ()), ('Al 0.5', (('Al', 0.5),)), ('Al 1.0', (('Al', 1.0),)), ('Cu 0.1', (('Cu', 0.1),)),
                 ('Sn 0.1', (('Sn', 0.1),))]:
    s = spek(filters=flt)
    k, f = s.get_spectrum()
    mt = mass_coeff(TISSUE, k, 'muen')
    dose0 = (f * k * mt).sum()
    rowd = dict(label=lab, depth_mm=depths,
                DEF_1pct=[r(def_factor(k, f, 0.01, depth_cm=d / 10), 4) for d in depths],
                DEF_05pct=[r(def_factor(k, f, 0.005, depth_cm=d / 10), 4) for d in depths],
                rel_dose=[r((f * k * mt * np.exp(-mu_lin(TISSUE, k) * d / 10)).sum() / dose0, 5) for d in depths])
    dep.append(rowd)
R['DEF_depth'] = dep

# loaded slab self-shielding: Ag-loaded layer from surface, DEF inside it
slab = []
zz = np.linspace(0, 10, 41)
for lab, flt in [('Al 1.0', (('Al', 1.0),)), ('Sn 0.1', (('Sn', 0.1),))]:
    s = spek(filters=flt)
    k, f = s.get_spectrum()
    for w in [0.005, 0.01, 0.02]:
        vals = [def_factor(k, f, w, depth_cm=z / 10, attenuate_with_agent=True) for z in zz]
        slab.append(dict(label=lab, w=w, z_mm=zz.tolist(), DEF=[r(v, 4) for v in vals]))
R['DEF_slab'] = slab

# ------------------------------------------------ 9. DEF vs tube voltage
kv = []
for v in [20, 22, 24, 25, 26, 27, 28, 30, 35, 40, 45, 50]:
    row = dict(kvp=v)
    for lab, flt in [('Al 0.5', (('Al', 0.5),)), ('Al 1.0', (('Al', 1.0),))]:
        s = spek(kvp=v, filters=flt)
        k, f = s.get_spectrum()
        row[lab] = r(def_factor(k, f, 0.01), 4)
    # DM extends beyond SpekPy's 50 kV limit
    kv.append(row)
for v in [60, 70, 80]:
    m = dm(kvp=v)
    row = dict(kvp=v)
    for lab, flt in [('Al 0.5', (('Al', 0.5),)), ('Al 1.0', (('Al', 1.0),))]:
        E, p = dm_spectrum(m, filters_mm=flt)
        row[lab] = r(def_factor(E, p, 0.01), 4)
    row['model'] = 'DM'
    kv.append(row)
R['DEF_kvp'] = kv

# ------------------------------------- 10. equal-attenuation filter material scan
s_none = spek()
k, f = s_none.get_spectrum()
mt_air = mass_coeff('air', k, 'muen')
K0 = (f * k * mt_air).sum()
scan = []
for Z in list(range(13, 84)):
    if Z in (15, 16, 17, 18, 19, 34, 35, 36, 37, 43, 54, 55, 61, 80, 81, 84) or (Z in range(57, 72) and Z != 64):
        continue
    try:
        rho = DENSITY.get(Z, xr.ElementDensity(Z))
        mu = rho * np.array([xr.CS_Total(Z, float(e)) for e in k])
    except Exception:
        continue
    row = dict(Z=Z, sym=xr.AtomicNumberToSymbol(Z), rho=r(rho, 3))
    for TK in [0.10, 0.02]:
        g = lambda t: (f * k * mt_air * np.exp(-mu * t)).sum() / K0 - TK
        try:
            t = brentq(g, 1e-8, 50.0)
        except ValueError:
            continue
        fT = f * np.exp(-mu * t)
        row[f't_um_{TK}'] = r(t * 1e4, 2)
        row[f'DEF1_{TK}'] = r(def_factor(k, fT, 0.01), 4)
    scan.append(row)
R['filter_scan'] = scan

# ------------------------------------------- 11. comparison of elements
elems = [(47, 'Ag'), (53, 'I'), (64, 'Gd'), (78, 'Pt'), (79, 'Au'), (83, 'Bi')]
cmp_ = []
for lab, flt in [('none', ()), ('Al 1.0', (('Al', 1.0),)), ('Sn 0.1', (('Sn', 0.1),))]:
    s = spek(filters=flt)
    k, f = s.get_spectrum()
    row = dict(label=lab)
    for Z, sym in elems:
        row[sym] = r(def_factor(k, f, 0.01, element=Z), 4)
    cmp_.append(row)
R['elements'] = cmp_
Eg = np.round(np.arange(5.0, 45.01, 0.25), 3)
ratio = np.c_[Eg] if False else None
cols = [Eg]
for Z, sym in elems:
    cols.append(mass_coeff(Z, Eg, 'muen') / mass_coeff(TISSUE, Eg, 'muen'))
np.savetxt(os.path.join(DATA, 'muen_ratio.csv'), np.c_[tuple(cols)], delimiter=',',
           header='E_keV,' + ','.join(s for _, s in elems), comments='')
Eg2 = np.logspace(0, np.log10(50), 400)
np.savetxt(os.path.join(DATA, 'coeffs.csv'),
           np.c_[Eg2, mass_coeff(47, Eg2, 'mu'), mass_coeff(47, Eg2, 'muen'), mass_coeff(TISSUE, Eg2, 'mu'),
                 mass_coeff(TISSUE, Eg2, 'muen'), mass_coeff(WATER, Eg2, 'muen'), mass_coeff(29, Eg2, 'mu'),
                 mass_coeff(4, Eg2, 'mu'), mass_coeff(13, Eg2, 'mu'), mass_coeff(50, Eg2, 'mu')],
           delimiter=',', header='E,Ag_mu,Ag_muen,T_mu,T_muen,W_muen,Cu_mu,Be_mu,Al_mu,Sn_mu', comments='')
R['coeff_points'] = [dict(E=e, Ag_mu=r(xr.CS_Total(47, e), 3), Ag_muen=r(xr.CS_Energy(47, e), 3),
                          T_muen=r(mass_coeff(TISSUE, [e], 'muen')[0], 4),
                          ratio=r(xr.CS_Energy(47, e) / mass_coeff(TISSUE, [e], 'muen')[0], 1))
                     for e in [8.0, 10.0, 15.0, 20.0, 25.0, 25.6, 30.0, 35.0, 40.0, 45.0]]
R['atomic_table'] = [dict(sym=xr.AtomicNumberToSymbol(Z), Z=Z, rho=DENSITY.get(Z, xr.ElementDensity(Z)),
                          EK=r(xr.EdgeEnergy(Z, xr.K_SHELL), 3),
                          EL3=(r(xr.EdgeEnergy(Z, xr.L3_SHELL), 3) if Z > 10 else None),
                          Ka1=(r(xr.LineEnergy(Z, xr.KL3_LINE), 3) if Z > 10 else None), omegaK=r(xr.FluorYield(Z, xr.K_SHELL), 3))
                     for Z in [4, 13, 28, 29, 42, 47, 50, 53, 64, 79]]

# ------------------------------------------------ 12. sensitivity analysis
BASE = (('Al', 1.0),)


def def_sp(kvp=KVP, th=THETA, be_mm=BE_MM, filters=BASE, w=0.01, tissue=TISSUE, scale_ag=1.0, scale_t=1.0):
    s = spek(kvp=kvp, th=th, be_mm=be_mm, filters=filters)
    k, f = s.get_spectrum()
    mt = mass_coeff(tissue, k, 'muen') * scale_t
    ma = mass_coeff(47, k, 'muen') * scale_ag
    psi = f * k
    return (psi * ((1 - w) * mt + w * ma)).sum() / (psi * mass_coeff(tissue, k, 'muen')).sum()


d0 = def_sp()
sens = []
for name, lo, hi in [
        ('kVp ±1 kV', def_sp(kvp=44), def_sp(kvp=46)),
        ('anode angle ±3°', def_sp(th=9), def_sp(th=15)),
        ('Be window ±0.1 mm', def_sp(be_mm=0.4), def_sp(be_mm=0.6)),
        ('Al filter ±5%', def_sp(filters=(('Al', 0.95),)), def_sp(filters=(('Al', 1.05),))),
        ('mu_en/rho Ag ±2%', def_sp(scale_ag=0.98), def_sp(scale_ag=1.02)),
        ('mu_en/rho tissue ±1%', def_sp(scale_t=1.01), def_sp(scale_t=0.99)),
        ('tissue composition (ICRU 4-component / water)', def_sp(tissue=TISSUE4), def_sp(tissue=WATER)),
]:
    sens.append(dict(name=name, low=r(lo, 4), high=r(hi, 4), delta=r(max(abs(lo - d0), abs(hi - d0)), 4)))
# spectrum model (DM vs SpekPy) and eta +-25 %
E, p = dm_spectrum(dm(), filters_mm=BASE)
d_dm = def_factor(E, p, 0.01)
Elo, plo = dm_spectrum(dm(eta=ETA * 0.75), filters_mm=BASE)
Ehi, phi_ = dm_spectrum(dm(eta=ETA * 1.25), filters_mm=BASE)
sens.append(dict(name='spectrum model (DM vs SpekPy)', low=r(d_dm, 4), high=r(d0, 4), delta=r(abs(d_dm - d0), 4)))
sens.append(dict(name='DM electron-depth factor eta ±25%', ref=r(d_dm, 4), low=r(def_factor(Elo, plo, 0.01), 4),
                 high=r(def_factor(Ehi, phi_, 0.01), 4),
                 delta=r(max(abs(def_factor(Elo, plo, 0.01) - d_dm), abs(def_factor(Ehi, phi_, 0.01) - d_dm)), 4)))
R['sensitivity'] = dict(base=r(d0, 4), items=sens,
                        combined_u=r(np.sqrt(sum((x['delta'] / np.sqrt(3)) ** 2 for x in sens if 'composition' not in x['name'])), 4))

# --------------------------------------- 13. exposure times for 2 Gy (tissue surface)
expo = []
for lab, flt in FILTERS:
    s = spek(filters=flt)
    k, f = s.get_spectrum()
    Kt = (f * k * mass_coeff(TISSUE, k, 'muen') * DE).sum() * 1.602176634e-16 * 1e3   # Gy per mAs (tissue kerma)
    expo.append(dict(label=lab, tissue_kerma_Gy_per_mAs=r(Kt, 5), time_s_2Gy_40mA=r(2.0 / (Kt * MA), 3)))
R['exposure'] = expo

with open(os.path.join(DATA, 'results.json'), 'w') as fh:
    json.dump(R, fh, indent=1)
print('done')
