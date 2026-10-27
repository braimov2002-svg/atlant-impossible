"""
mc_dose.py - Monte Carlo photon transport in a laterally infinite soft-tissue
slab containing an Ag-loaded layer, used to cross-check the analytical
(kerma, primary-beam) dose-enhancement factors.

Physics: photoelectric absorption (with Ag K-shell fluorescence emission and
transport), incoherent (Compton) scattering sampled from the xraylib
differential cross-section that includes the incoherent scattering function,
coherent (Rayleigh) scattering with atomic form factors. Secondary electrons
are absorbed locally (kerma approximation; their ranges, < 40 um, are much
smaller than the 0.25 mm scoring bins). Woodcock (delta) tracking handles the
two-medium geometry.
"""
import json, os, sys
import numpy as np
import xraylib as xr
import spekpy as sp

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, '..', 'data')
from nist import TISSUE_ICRU44 as TCOMP, RHO
RHO_T = RHO['tissue']
MEC2 = 510.99895
EK_AG = xr.EdgeEnergy(47, xr.K_SHELL)
OMEGA_AG = xr.FluorYield(47, xr.K_SHELL)
AG_LINES = [(c, xr.LineEnergy(47, c), xr.RadRate(47, c)) for c in
            (xr.KL2_LINE, xr.KL3_LINE, xr.KM2_LINE, xr.KM3_LINE, xr.KN2_LINE, xr.KN3_LINE)]
LINE_E = np.array([l[1] for l in AG_LINES])
LINE_P = np.cumsum([l[2] for l in AG_LINES]) / sum(l[2] for l in AG_LINES)

# ---------------------------------------------------------------- tables
EG = np.arange(1.0, 46.0, 0.005)


def tab(f):
    return np.array([f(float(e)) for e in EG])


def mix(fn):
    return lambda e: sum(w * fn(Z, e) for Z, w in TCOMP.items())


T_PH = tab(mix(xr.CS_Photo))
T_IN = tab(mix(xr.CS_Compt))
T_CO = tab(mix(xr.CS_Rayl))
A_PH = tab(lambda e: xr.CS_Photo(47, e))
A_PK = tab(lambda e: xr.CS_Photo_Partial(47, xr.K_SHELL, e) if e > EK_AG else 0.0)
A_IN = tab(lambda e: xr.CS_Compt(47, e))
A_CO = tab(lambda e: xr.CS_Rayl(47, e))

ETH = np.arange(1.0, 46.5, 0.5)
TH = np.linspace(1e-6, np.pi, 1441)


def safe(fn, e, t):
    try:
        return sum(w * fn(Z, e, t) for Z, w in TCOMP.items())
    except ValueError:
        return np.nan


def cdf_table(fn):
    out = np.zeros((len(ETH), len(TH)))
    for i, e in enumerate(ETH):
        d = np.array([safe(fn, float(e), float(t)) for t in TH])
        # small-angle values outside the tabulated momentum-transfer range:
        # take the first valid value (forward limit)
        first = np.argmax(np.isfinite(d))
        d[:first] = d[first]
        d = d * np.sin(TH)
        c = np.concatenate([[0], np.cumsum(0.5 * (d[1:] + d[:-1]) * np.diff(TH))])
        out[i] = c / c[-1]
    return out


CDF_IN = cdf_table(xr.DCS_Compt)
CDF_CO = cdf_table(xr.DCS_Rayl)


def idx(E):
    return np.clip(((E - EG[0]) / 0.005).astype(int), 0, len(EG) - 1)


def sample_theta(E, cdf, rng):
    j = np.clip(np.rint((E - ETH[0]) / 0.5).astype(int), 0, len(ETH) - 1)
    u = rng.random(E.size)
    th = np.empty(E.size)
    for jj in np.unique(j):
        m = j == jj
        th[m] = np.interp(u[m], cdf[jj], TH)
    return th


# ---------------------------------------------------------------- transport
def run(spec_E, spec_w, n, w_ag, z1, z2, zmax, dz, seed, batch=400_000):
    rng = np.random.default_rng(seed)
    rho_t = RHO_T
    rho_ag = rho_t * w_ag / (1 - w_ag)          # g/cm3 of Ag added to the layer
    nb = int(round(zmax / dz))
    edep = np.zeros(nb)
    cdf_spec = np.cumsum(spec_w) / spec_w.sum()
    dk = spec_E[1] - spec_E[0]
    done = 0
    while done < n:
        m = min(batch, n - done)
        done += m
        E = spec_E[np.searchsorted(cdf_spec, rng.random(m))] + (rng.random(m) - 0.5) * dk
        z = np.zeros(m)
        u = np.ones(m)
        while E.size:
            i = idx(E)
            mu_t = rho_t * (T_PH[i] + T_IN[i] + T_CO[i])
            mu_a = rho_ag * (A_PH[i] + A_IN[i] + A_CO[i])
            mu_max = mu_t + mu_a
            z = z + u * (-np.log(rng.random(E.size)) / mu_max)
            alive = (z >= 0) & (z < zmax)
            E, z, u, i, mu_t, mu_a, mu_max = E[alive], z[alive], u[alive], i[alive], mu_t[alive], mu_a[alive], mu_max[alive]
            inlay = (z >= z1) & (z < z2)
            mu_here = mu_t + np.where(inlay, mu_a, 0.0)
            real = rng.random(E.size) * mu_max < mu_here
            # virtual collisions: continue unchanged
            Ev, zv, uv = E[~real], z[~real], u[~real]
            E, z, u, i, inlay = E[real], z[real], u[real], i[real], inlay[real]
            # choose interaction
            r = rng.random(E.size) * (rho_t * (T_PH[i] + T_IN[i] + T_CO[i]) +
                                      np.where(inlay, rho_ag * (A_PH[i] + A_IN[i] + A_CO[i]), 0.0))
            c1 = rho_t * T_PH[i]
            c2 = c1 + np.where(inlay, rho_ag * A_PH[i], 0.0)
            c3 = c2 + rho_t * T_IN[i] + np.where(inlay, rho_ag * A_IN[i], 0.0)
            ph_t = r < c1
            ph_a = (r >= c1) & (r < c2)
            inc = (r >= c2) & (r < c3)
            coh = r >= c3
            bins = np.clip((z / dz).astype(int), 0, nb - 1)
            # photo in tissue: local deposition
            np.add.at(edep, bins[ph_t], E[ph_t])
            # photo in Ag
            new_E, new_z, new_u = [], [], []
            if ph_a.any():
                Ea, za, ia, ba = E[ph_a], z[ph_a], i[ph_a], bins[ph_a]
                kshell = rng.random(Ea.size) * A_PH[ia] < A_PK[ia]
                fluo = kshell & (rng.random(Ea.size) < OMEGA_AG)
                el = LINE_E[np.searchsorted(LINE_P, rng.random(Ea.size))]
                dep = np.where(fluo, Ea - el, Ea)
                np.add.at(edep, ba, dep)
                if fluo.any():
                    new_E.append(el[fluo])
                    new_z.append(za[fluo])
                    new_u.append(2 * rng.random(fluo.sum()) - 1)
            # incoherent
            if inc.any():
                Ei, ui = E[inc], u[inc]
                th = sample_theta(Ei, CDF_IN, rng)
                Ep = Ei / (1 + Ei / MEC2 * (1 - np.cos(th)))
                np.add.at(edep, bins[inc], Ei - Ep)
                E[inc] = Ep
                u[inc] = rotate(ui, th, rng)
            if coh.any():
                th = sample_theta(E[coh], CDF_CO, rng)
                u[coh] = rotate(u[coh], th, rng)
            keep = inc | coh
            E, z, u = E[keep], z[keep], u[keep]
            E = np.concatenate([E, Ev] + new_E)
            z = np.concatenate([z, zv] + new_z)
            u = np.concatenate([u, uv] + new_u)
            low = E < 1.0
            if low.any():
                np.add.at(edep, np.clip((z[low] / dz).astype(int), 0, nb - 1), E[low])
                E, z, u = E[~low], z[~low], u[~low]
    zc = (np.arange(nb) + 0.5) * dz
    mass = np.where((zc >= z1) & (zc < z2), rho_t + rho_ag, rho_t) * dz
    return zc, edep / mass / n


def rotate(u, th, rng):
    phi = 2 * np.pi * rng.random(u.size)
    s = np.sqrt(np.clip(1 - u ** 2, 0, None))
    return np.clip(u * np.cos(th) + s * np.sin(th) * np.cos(phi), -1, 1)


def spectrum(filters):
    s = sp.Spek(kvp=45, th=12, targ='Cu', dk=0.05, z=10)
    s.filter('Be', 0.5)
    s.filter('Air Dry (Near Sea Level)', 100)
    for m, t in filters:
        s.filter(m, t)
    return s.get_spectrum()


if __name__ == '__main__':
    N = int(float(sys.argv[1])) if len(sys.argv) > 1 else 2_000_000
    z1, z2, zmax, dz = 0.2, 1.2, 3.0, 0.025       # cm
    out = {}
    for lab, flt in [('Al 1.0', (('Al', 1.0),)), ('none', ())]:
        k, f = spectrum(flt)
        res = {}
        for w in [0.0, 0.01]:
            parts = [run(k, f, N // 5, w, z1, z2, zmax, dz, seed=1000 * b + int(w * 1e4) + len(lab))[1]
                     for b in range(5)]
            parts = np.array(parts)
            res[w] = (parts.mean(0), parts.std(0, ddof=1) / np.sqrt(5))
        zc = (np.arange(int(round(zmax / dz))) + 0.5) * dz
        d0, s0 = res[0.0]
        d1, s1 = res[0.01]
        ratio = d1 / d0
        sr = ratio * np.sqrt((s0 / d0) ** 2 + (s1 / d1) ** 2)
        # analytical primary-beam kerma model for the same geometry
        from xspec import mass_coeff, mu_lin
        mt = mass_coeff('tissue', k, 'muen')
        ma = mass_coeff(47, k, 'muen')
        mut = mu_lin('tissue', k)
        mua = RHO_T * (0.01 / 0.99) * np.array([xr.CS_Total(47, float(e)) for e in k])
        an = []
        for zz in zc:
            d_ref = (f * k * mt * np.exp(-mut * zz)).sum()
            path_l = np.clip(min(zz, z2) - z1, 0, None)
            att = np.exp(-mut * zz - mua * path_l)
            mu_en = (0.99 * mt + 0.01 * ma) if z1 <= zz < z2 else mt
            an.append((f * k * mu_en * att).sum() / d_ref)
        out[lab] = dict(z_mm=(zc * 10).round(4).tolist(), dose0=d0.tolist(), dose1=d1.tolist(),
                        DEF_MC=ratio.round(4).tolist(), DEF_MC_unc=sr.round(4).tolist(),
                        DEF_analytic=np.round(an, 4).tolist(), N=N, w=0.01, layer_mm=[z1 * 10, z2 * 10])
        inl = (zc >= z1) & (zc < z2)
        print(lab, 'mean DEF in layer MC', ratio[inl].mean(), 'analytic', np.mean(np.array(an)[inl]))
    json.dump(out, open(os.path.join(DATA, 'mc_results.json'), 'w'))
