"""Writer briefing files: brief/REFS.md and brief/FACTS.md (generated)."""
import json, os
import numpy as np
from ref_notes import NOTES

HERE = os.path.dirname(os.path.abspath(__file__))
D = os.path.join(HERE, '..')
R = json.load(open(os.path.join(D, 'data', 'results.json')))
MC = json.load(open(os.path.join(D, 'data', 'mc_results.json')))
REFS = json.load(open(os.path.join(D, 'data', 'refs.json')))
os.makedirs(os.path.join(D, 'brief'), exist_ok=True)

# ------------------------------------------------------------------ REFS.md
out = ['# Verified reference list (cite ONLY these keys, as [@key])', '',
       'Every entry below was checked against Crossref (DOI) or is a standard book/report/standard. '
       'The note says what the source may be cited for. Do not attribute to a source any specific number, '
       'result or claim that is not stated in its note or title. Prefer citing several sources for general statements.', '']
for k in NOTES:
    assert k in REFS, k
    out.append(f'- **{k}** — {NOTES[k]}\n  - {REFS[k]["text"]}')
missing = [k for k in REFS if k not in NOTES]
open(os.path.join(D, 'brief', 'REFS.md'), 'w').write('\n'.join(out) + '\n')
print('refs without notes (not offered to writers):', missing)

# ------------------------------------------------------------------ FACTS.md
f = []
A = f.append
b = R['baseline']
A('# Results of the calculations (the ONLY numbers that may be quoted)')
A('')
A('All values below were computed by the author\'s code in `dissertation/code` (run_all.py, run_sweeps.py, mc_dose.py). '
  'Quote them exactly (you may round sensibly, e.g. 1.482 -> 1.48). Tables with the full data are in '
  '`dissertation/data/tables/en/*.md` and are inserted with {{TABLE:id}}; discuss them, do not copy them.')
A('')
A('## Data and software')
A('- Spectra: (1) the developed semi-analytical model (DM, this work, code xspec.py); (2) SpekPy v2.5.4 (reference, "casim" physics model, Cu anode supported 10–50 kV).')
A('- mu/rho and mu_en/rho: NIST tables of Hubbell & Seltzer (SRD 126) for tissue, water, air and Ag/I/Gd/Pt/Au/Bi; elemental attenuation of filters from xraylib 4.3.0 (agrees with NIST to <0.1 %).')
A('- IMPORTANT methodological finding: xraylib 4.3.0 function CS_Energy (mu_en/rho) is wrong for light elements in 15–45 keV: '
  'for O at 30 keV it gives 0.108 cm2/g versus NIST 0.173 cm2/g (−37 %); for C 0.0515 vs 0.0661; for Ag it agrees with NIST (16.58 vs 16.60). '
  'Using it would have overestimated the DEF strongly (e.g. 1.72 instead of 1.48 for 1 % Ag, Al 1 mm). Therefore NIST tables were used directly. '
  'The energy-transfer coefficient reconstructed from xraylib photo-absorption + Compton DCS reproduces NIST mu_en/rho within 0.3 % (O, C, H at 20–40 keV), which also validates the Monte Carlo interaction data.')
A('- Reference tissue: ICRU-44 soft tissue (H 10.2, C 14.3, N 3.4, O 70.8, Na 0.2, P 0.3, S 0.3, Cl 0.2, K 0.3 % by mass; 1.06 g/cm3). Also checked: ICRU four-component tissue, water.')
A('- Python 3.13, NumPy, SciPy, Matplotlib.')
A('')
A('## Developed model (DM) — parameters and electron transport')
e = R['electron_cu']
A(f"- Bethe collision stopping power of Cu (I = 322 eV, ICRU 37): " + ', '.join(f"{t} keV: {s} MeV cm2/g" for t, s in zip(e['T_keV'], e['S_MeVcm2g'])) + '. Check: the same formula gives 6.603 MeV cm2/g for water at 50 keV, identical to NIST ESTAR.')
A(f"- CSDA range of 45 keV electrons in Cu: {e['csda_range_um_45keV']} µm; with eta = {R['eta_fit']['eta']} and cos(12°) the maximum projected depth is {e['mean_depth_um_45keV']} µm.")
A(f"- Gryzinski K-shell ionisation cross-section of Cu (E_K = 8.979 keV): " + ', '.join(f"{t} keV: {s} b" for t, s in zip(e['T_keV'], e['sigmaK_barn'])) + ' (maximum ~351 b near 35 keV).')
A(f"- Single adjustable parameter: electron depth factor eta (projected depth = eta × CSDA path × cos(theta)). Fitted to the SpekPy bremsstrahlung shape at 45 kV, 12°, 0.5 mm Be: eta = {R['eta_fit']['eta']}; RMS shape deviation {R['eta_fit']['rms_percent']} % (it is {R['eta_fit']['rms_eta1_percent']} % for eta = 1, i.e. straight-line electrons). All other configurations are predictions (no refit).")
A(f"- K ionisations per incident 45 keV electron in Cu: {R['cu_atomic']['k_ionisations_per_electron']:.4f}; omega_K(Cu) = {R['cu_atomic']['omegaK']}; Kα1 {R['cu_atomic']['Ka1']} keV, Kα2 {R['cu_atomic']['Ka2']} keV, Kβ {R['cu_atomic']['Kb']} keV.")
for d in R['cu_lines']:
    A(f"  - line {d['name']}: E = {d['E']} keV, relative radiative rate {d['rel_rate']}, indirect (bremsstrahlung-induced) share {d['indirect_frac']*100:.1f} %")
A('')
A('## Validation of the DM against SpekPy (Table t3_1, t3_1w; Fig. fig05, fig06)')
v1 = [v for v in R['validation_cu'] if v['filter'] != 'none']
v0 = [v for v in R['validation_cu'] if v['filter'] == 'none']
A(f"- With 1 mm Al filtration (K lines removed): HVL deviation {min(v['HVL_dev_pct'] for v in v1)} to {max(v['HVL_dev_pct'] for v in v1)} %, mean-energy difference ≤ {max(abs(v['Emean_DM']-v['Emean_SP']) for v in v1):.2f} keV for 25–50 kV and 6–30°.")
A(f"- Unfiltered (0.5 mm Be): HVL deviation {min(v['HVL_dev_pct'] for v in v0)} to {max(v['HVL_dev_pct'] for v in v0)} %; the DM K-line/bremsstrahlung photon ratio is {min(v['char_to_brems_DM'] for v in v0):.2f}–{max(v['char_to_brems_DM'] for v in v0):.2f} versus {min(v['char_to_brems_SP'] for v in v0):.2f}–{max(v['char_to_brems_SP'] for v in v0):.2f} in SpekPy, i.e. the DM underestimates the Cu K lines by ~25–43 % (largest at low kV, where the Gryzinski cross-section rises too slowly near threshold; SpekPy uses PENELOPE/DWBA-based data).")
A(f"- Absolute output: DM/SpekPy air-kerma ratio {min(v['K_ratio'] for v in v0):.2f}–{max(v['K_ratio'] for v in v0):.2f} unfiltered and {min(v['K_ratio'] for v in v1):.2f}–{max(v['K_ratio'] for v in v1):.2f} with 1 mm Al: the DM overestimates the absolute yield of hard bremsstrahlung, mainly because electron backscattering from the anode (backscatter coefficient of Cu ~0.3) is neglected and the non-relativistic Born cross-section is approximate. The DEF depends only on the spectral shape, so this does not affect DEF.")
A('- W anode check (12°, 2.5 mm Al): ' + '; '.join(f"{v['kvp']} kV: HVL DM {v['HVL_DM']} vs SpekPy {v['HVL_SP']} mm Al, mean energy {v['Emean_DM']} vs {v['Emean_SP']} keV" for v in R['validation_w']) + '. (For orientation only: IEC 61267 RQR3, a 50 kV W beam, has first HVL 1.78 mm Al.)')
A('')
A('## Baseline spectrum: 45 kV, Cu, theta 12°, 0.5 mm Be, 10 cm air (Table t3_2; Fig. fig07)')
A(f"- SpekPy: mean energy {b['SP']['Emean']} keV, HVL1 {b['SP']['HVL1_mmAl']} mm Al, HVL2 {b['SP']['HVL2_mmAl']} mm Al, homogeneity coefficient {b['SP']['hc']}, effective energy {b['SP']['Eeff']} keV; photons above the Ag K-edge {b['SP']['frac_above_AgK']*100:.2f} % (energy fraction {b['SP']['energy_frac_above_AgK']*100:.1f} %); characteristic photons are {b['char_fraction_fluence_SP']*100:.1f} % of the fluence.")
A(f"- DM: mean energy {b['DM']['Emean']} keV, HVL1 {b['DM']['HVL1_mmAl']} mm Al.")
A(f"- Air kerma at 10 cm: {b['kerma_mGy_per_mAs_SP']:.0f} mGy/mAs (SpekPy), i.e. {b['kerma_rate_Gy_s_SP']:.1f} Gy/s at 40 mA; fluence {b['fluence_per_mAs_SP']:.3g} photons/cm2/mAs.")
A(f"- Kβ/Kα fluence ratio: {R['kbeta_ka']['none']} without filter, {R['kbeta_ka']['Ni 0.02']} with a 20 µm Ni filter (Ni K-edge 8.33 keV lies between Cu Kα and Kβ).")
A('')
A('## Influence of design parameters (Table t3_3; Figs. fig08–fig10)')
for key, name in [('angle', 'anode angle (deg)'), ('kvp', 'tube voltage (kV)'), ('be', 'Be window (mm)')]:
    A(f"- {name}: " + '; '.join(f"{q['label']}: Ē {q['Emean']} keV, HVL {q['HVL1_mmAl']} mm Al, K {q['kerma_mGy_per_mAs']:.0f} mGy/mAs, DEF(1 %) {q['DEF1_SP']}" for q in R['studies'][key]))
A('- Interpretation: smaller anode angle -> longer exit path in the anode -> stronger self-filtration (heel effect physics) -> harder beam but lower output (296 vs 463 mGy/mAs for 6° vs 30°). Without added filtration the DEF hardly depends on the design parameters (1.19–1.21 for 1 % Ag), because the dose is dominated by Cu K lines and low-energy photons; the design parameters matter mainly for the output (dose rate).')
A('')
A('## Influence of added filters (Table t3_4; Figs. fig11–fig13)')
for q in R['studies']['filters']:
    A(f"- {q['label']}: Ē {q['Emean']} keV, HVL {q['HVL1_mmAl']} mm Al, photons above Ag K-edge {q['frac_above_AgK']*100:.1f} %, kerma {q['kerma_mGy_per_mAs']:.3g} mGy/mAs, DEF(1 %) SpekPy {q['DEF1_SP']}, DM {q['DEF1_DM']}")
A('- Cu filters transmit their own Kα line (below the Cu K-edge, 8.98 keV) while absorbing 9–20 keV strongly: a 0.05–0.1 mm Cu filter produces a beam dominated by Cu Kα plus a hard tail (HVL stays ~0.06–0.07 mm Al), with low DEF; only 0.2 mm Cu suppresses Kα enough (DEF 1.80 at 0.08 % transmission).')
A('- K-edge filters Mo (20.0 keV), Ag (25.5 keV) and Sn (29.2 keV) cut the spectrum just above their edges; Ag and Mo remove the photons above the Ag K-edge that are most useful, Sn keeps the 25.5–29.2 keV window but removes > 29.2 keV.')
A('')
A('## Mass energy-absorption ratio Ag / tissue (Fig. fig02, fig03)')
A('- ' + '; '.join(f"{c['E']} keV: {c['ratio']}" for c in R['coeff_points']) + ' (jump at the K-edge 25.514 keV from ~32 to ~76; maximum ~139 near 40–45 keV).')
A('- Above the Ag K-edge mu/rho of Ag jumps ×5.8 (9.53 -> 55.4 cm2/g) but mu_en/rho only ×2.4 (8.54 -> 20.3), because ~83 % of K vacancies relax by K fluorescence (omega_K(Ag) = 0.831; Ag Kα ≈ 22 keV) whose energy is not absorbed locally in the kerma approximation.')
A('')
A('## DEF (kerma/CPE approximation, surface, ICRU-44 tissue; Table t3_5; Fig. fig15)')
for r_ in R['DEF_table']:
    A(f"- {r_['label']}: " + ', '.join(f"w={w*100:.1f}%: {r_[f'SP_{w}']}" for w in R['WS']) + f" (DM 1 %: {r_['DM_0.01']}; water as reference medium 1 %: {r_['SPw_0.01']})")
A('- DEF − 1 is proportional to w: DEF = 1 + w (<mu_en,Ag>/<mu_en,t> − 1), the bracket being the spectrum-averaged ratio; (DEF−1) per 1 % Ag: 0.20 (no filter), 0.38 (Al 0.5), 0.48 (Al 1.0), 0.62 (Al 2.0), 0.80 (Cu 0.2).')
A('- DM and SpekPy DEFs agree within 0.1 % without filter, within 0.5–1.4 % with Al filters and within 2.2 % at most (Cu 0.1–0.2 mm, where the K-line deficit of the DM matters; DEF values, not DEF−1).')
A('- Energy-resolved analysis (Fig. fig14): without filter the dose integrand is dominated by Cu K lines and 3–15 keV photons where the Ag/tissue ratio is only 21–27; with 1 mm Al the integrand is concentrated at 15–45 keV and ~half of the photons lie above the Ag K-edge.')
A('')
A('## Optimisation of filtration (Tables t3_6, t3_7; Figs. fig16, fig17)')
for TK, lab in [('0.1', '10 %'), ('0.01', '1 %'), ('0.001', '0.1 %')]:
    best = sorted(R['filter_scan'], key=lambda s: -s[f'DEF1_{TK}'])[:4]
    worst = sorted(R['filter_scan'], key=lambda s: s[f'DEF1_{TK}'])[:3]
    A(f"- equal transmission {lab}: best " + ', '.join(f"{s['sym']} {s[f'DEF1_{TK}']} ({s[f't_um_{TK}']} µm)" for s in best) + '; worst ' + ', '.join(f"{s['sym']} {s[f'DEF1_{TK}']}" for s in worst))
A('- At equal transmission the light/medium-Z absorbers Si, Ca, Sc, Al, Ti are practically equivalent at 10 % and 1 % transmission (differences ≤ 0.3 %); at 0.1 % transmission Sc/Ca/Ti/V give 1.907 and Al 1.884 (1.2 % lower); of them Al and Ti are the practical materials (Ca, Sc are chemically/technically unsuitable).')
A('- Conclusion: for a Cu-anode tube, the best filters for Ag dose enhancement are low/medium-Z absorbers without absorption edges in 9–45 keV (Al, Ti) or with K-edges below the Cu Kα energy (Fe, Co: they absorb Cu Kα strongly); K-edge filters with edges between 20 and 30 keV (Mo, Ag, Sn) are the worst at strong filtration because they remove the photons above the Ag K-edge. Practical choice: Al 1–2 mm (or Ti 0.1–0.3 mm).')
for e_ in R['exposure']:
    A(f"- exposure {e_['label']}: tissue kerma {e_['tissue_kerma_Gy_per_mAs']*1e3:.3g} mGy/mAs, {e_['tissue_kerma_Gy_per_mAs']*40:.3g} Gy/s at 40 mA, time for 2 Gy {e_['time_s_2Gy_40mA']} s")
A('')
A('## Depth dependence and self-shielding (Tables t3_8; Figs. fig18, fig19)')
for d in R['DEF_depth']:
    A(f"- {d['label']}: depth {d['depth_mm']} mm -> DEF(1 %) {d['DEF_1pct']}; relative dose {d['rel_dose']}")
for s in R['DEF_slab']:
    A(f"- uniformly loaded slab from the surface, {s['label']}, w = {s['w']*100:.1f} %: DEF {s['DEF'][0]} at 0 mm, {s['DEF'][20]} at 5 mm, {s['DEF'][40]} at 10 mm (self-shielding by Ag)")
A('')
A('## Tube voltage and other elements (Tables t3_9, t3_10; Figs. fig20, fig21)')
A('- DEF(1 %) vs kV: ' + '; '.join(f"{k['kvp']} kV: Al0.5 {k['Al 0.5']}, Al1.0 {k['Al 1.0']}" for k in R['DEF_kvp']) + ' (60–80 kV from DM only). The slope increases visibly above ~26–27 kV, when photons above the Ag K-edge appear.')
for r_ in R['elements']:
    A(f"- {r_['label']}: " + ', '.join(f"{e}: {r_[e]}" for e in ['Ag', 'I', 'Gd', 'Pt', 'Au', 'Bi']))
A('- Honest interpretation: per unit mass, Ag gives a smaller physical DEF than Au, Pt, Bi or Gd at 45 kV (L-shell absorption of the heavy elements at 11.9–16 keV and their higher Z); Ag is comparable to iodine. Advantages of Ag are its intrinsic biological activity (ROS generation, see AshaRani 2009, Liu 2016), low cost, and the fact that its K-edge (25.5 keV) lies inside the 45 kV spectrum. Without filtration Gd gives the largest DEF (1.33) because its L-edges (7.2–8.4 keV) absorb Cu Kα.')
A('')
A('## Monte Carlo verification (Table t3_11; Fig. fig22)')
A(f"- Geometry: laterally infinite ICRU-44 tissue slab 30 mm thick, broad parallel beam, Ag-loaded layer (1 % Ag) at 2–12 mm, scoring bins 0.25 mm, {MC['Al 1.0']['N']:.0e} photons per run (5 batches), Woodcock tracking, photoelectric with Ag K fluorescence transport, Compton and Rayleigh with xraylib DCS (form factors / incoherent scattering functions), local electron deposition.")
A('- Check: for a 30 keV broad beam the surface dose / primary kerma ratio is 1.31 (backscatter), and the reconstructed mu_tr agrees with NIST mu_en (0.3 %).')
for lab in ['none', 'Al 1.0']:
    m = MC[lab]
    z = np.array(m['z_mm']); mc = np.array(m['DEF_MC']); an = np.array(m['DEF_analytic'])
    for a, bb, name in [(2, 3, 'entrance'), (2, 12, 'whole layer'), (11, 12, 'exit'), (15, 30, 'behind layer')]:
        s = (z >= a) & (z < bb)
        A(f"- {lab}, {name} ({a}–{bb} mm): MC {mc[s].mean():.3f}, analytical {an[s].mean():.3f}")
A('- Interpretation: inside the layer MC > analytical by 1–10 % (increasing with depth) because (i) part of the Ag K-fluorescence (~22 keV, mean free path ~1.5 cm in tissue) is reabsorbed in the layer, and (ii) scattered photons contribute. Behind the layer the dose is reduced to ~0.80 of the Ag-free value (shielding by Ag) — a protective/negative consequence for tissues downstream.')
A('')
A('## Sensitivity / uncertainty (Table t3_12; Fig. fig23)')
s = R['sensitivity']
A(f"- base DEF (1 % Ag, Al 1.0 mm, SpekPy) = {s['base']}; " + '; '.join(f"{it['name']}: {it['low']}–{it['high']} (|Δ| {it['delta']})" for it in s['items']) + f". Combined standard uncertainty (rectangular distributions, k = 1, excluding the definitional choice of reference medium) = {s['combined_u']}, i.e. DEF = 1.48 ± 0.02 (k = 1) or ± 0.03 (k = 2).")
open(os.path.join(D, 'brief', 'FACTS.md'), 'w').write('\n'.join(f) + '\n')
print('written')
