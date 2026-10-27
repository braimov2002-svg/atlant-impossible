# Results of the calculations (the ONLY numbers that may be quoted)

All values below were computed by the author's code in `dissertation/code` (run_all.py, run_sweeps.py, mc_dose.py). Quote them exactly (you may round sensibly, e.g. 1.482 -> 1.48). Tables with the full data are in `dissertation/data/tables/en/*.md` and are inserted with {{TABLE:id}}; discuss them, do not copy them.

## Data and software
- Spectra: (1) the developed semi-analytical model (DM, this work, code xspec.py); (2) SpekPy v2.5.4 (reference, "casim" physics model, Cu anode supported 10–50 kV).
- mu/rho and mu_en/rho: NIST tables of Hubbell & Seltzer (SRD 126) for tissue, water, air and Ag/I/Gd/Pt/Au/Bi; elemental attenuation of filters from xraylib 4.3.0 (agrees with NIST to <0.1 %).
- IMPORTANT methodological finding: xraylib 4.3.0 function CS_Energy (mu_en/rho) is wrong for light elements in 15–45 keV: for O at 30 keV it gives 0.108 cm2/g versus NIST 0.173 cm2/g (−37 %); for C 0.0515 vs 0.0661; for Ag it agrees with NIST (16.58 vs 16.60). Using it would have overestimated the DEF strongly (e.g. 1.72 instead of 1.48 for 1 % Ag, Al 1 mm). Therefore NIST tables were used directly. The energy-transfer coefficient reconstructed from xraylib photo-absorption + Compton DCS reproduces NIST mu_en/rho within 0.3 % (O, C, H at 20–40 keV), which also validates the Monte Carlo interaction data.
- Reference tissue: ICRU-44 soft tissue (H 10.2, C 14.3, N 3.4, O 70.8, Na 0.2, P 0.3, S 0.3, Cl 0.2, K 0.3 % by mass; 1.06 g/cm3). Also checked: ICRU four-component tissue, water.
- Python 3.13, NumPy, SciPy, Matplotlib.

## Developed model (DM) — parameters and electron transport
- Bethe collision stopping power of Cu (I = 322 eV, ICRU 37): 5 keV: 20.994 MeV cm2/g, 10 keV: 13.179 MeV cm2/g, 15 keV: 9.907 MeV cm2/g, 20 keV: 8.07 MeV cm2/g, 25 keV: 6.881 MeV cm2/g, 30 keV: 6.043 MeV cm2/g, 35 keV: 5.419 MeV cm2/g, 40 keV: 4.935 MeV cm2/g, 45 keV: 4.548 MeV cm2/g. Check: the same formula gives 6.603 MeV cm2/g for water at 50 keV, identical to NIST ESTAR.
- CSDA range of 45 keV electrons in Cu: 6.481 µm; with eta = 0.4 and cos(12°) the maximum projected depth is 2.536 µm.
- Gryzinski K-shell ionisation cross-section of Cu (E_K = 8.979 keV): 5 keV: 0.0 b, 10 keV: 25.5 b, 15 keV: 193.2 b, 20 keV: 287.8 b, 25 keV: 331.3 b, 30 keV: 348.2 b, 35 keV: 351.2 b, 40 keV: 347.0 b, 45 keV: 339.1 b (maximum ~351 b near 35 keV).
- Single adjustable parameter: electron depth factor eta (projected depth = eta × CSDA path × cos(theta)). Fitted to the SpekPy bremsstrahlung shape at 45 kV, 12°, 0.5 mm Be: eta = 0.4; RMS shape deviation 2.46 % (it is 8.47 % for eta = 1, i.e. straight-line electrons). All other configurations are predictions (no refit).
- K ionisations per incident 45 keV electron in Cu: 0.0159; omega_K(Cu) = 0.4538; Kα1 8.0478 keV, Kα2 8.0279 keV, Kβ 8.9053 keV.
  - line Ka2: E = 8.0279 keV, relative radiative rate 0.2991, indirect (bremsstrahlung-induced) share 4.5 %
  - line Ka1: E = 8.0478 keV, relative radiative rate 0.5828, indirect (bremsstrahlung-induced) share 4.5 %
  - line Kb3: E = 8.9053 keV, relative radiative rate 0.0399, indirect (bremsstrahlung-induced) share 4.8 %
  - line Kb1: E = 8.9053 keV, relative radiative rate 0.0782, indirect (bremsstrahlung-induced) share 4.8 %

## Validation of the DM against SpekPy (Table t3_1, t3_1w; Fig. fig05, fig06)
- With 1 mm Al filtration (K lines removed): HVL deviation -4.6 to -3.5 %, mean-energy difference ≤ 0.54 keV for 25–50 kV and 6–30°.
- Unfiltered (0.5 mm Be): HVL deviation -19.4 to -2.6 %; the DM K-line/bremsstrahlung photon ratio is 0.86–1.71 versus 1.51–2.31 in SpekPy, i.e. the DM underestimates the Cu K lines by ~25–43 % (largest at low kV, where the Gryzinski cross-section rises too slowly near threshold; SpekPy uses PENELOPE/DWBA-based data).
- Absolute output: DM/SpekPy air-kerma ratio 1.08–1.22 unfiltered and 1.21–1.42 with 1 mm Al: the DM overestimates the absolute yield of hard bremsstrahlung, mainly because electron backscattering from the anode (backscatter coefficient of Cu ~0.3) is neglected and the non-relativistic Born cross-section is approximate. The DEF depends only on the spectral shape, so this does not affect DEF.
- W anode check (12°, 2.5 mm Al): 50 kV: HVL DM 1.651 vs SpekPy 1.75 mm Al, mean energy 31.34 vs 32.22 keV; 80 kV: HVL DM 2.693 vs SpekPy 2.734 mm Al, mean energy 41.75 vs 42.9 keV; 100 kV: HVL DM 3.475 vs SpekPy 3.458 mm Al, mean energy 48.01 vs 49.15 keV. (For orientation only: IEC 61267 RQR3, a 50 kV W beam, has first HVL 1.78 mm Al.)

## Baseline spectrum: 45 kV, Cu, theta 12°, 0.5 mm Be, 10 cm air (Table t3_2; Fig. fig07)
- SpekPy: mean energy 10.38 keV, HVL1 0.0478 mm Al, HVL2 0.0563 mm Al, homogeneity coefficient 0.85, effective energy 7.82 keV; photons above the Ag K-edge 4.64 % (energy fraction 14.1 %); characteristic photons are 68.5 % of the fluence.
- DM: mean energy 10.74 keV, HVL1 0.0464 mm Al.
- Air kerma at 10 cm: 383 mGy/mAs (SpekPy), i.e. 15.3 Gy/s at 40 mA; fluence 3.66e+10 photons/cm2/mAs.
- Kβ/Kα fluence ratio: 0.1431 without filter, 0.0023 with a 20 µm Ni filter (Ni K-edge 8.33 keV lies between Cu Kα and Kβ).

## Influence of design parameters (Table t3_3; Figs. fig08–fig10)
- anode angle (deg): 6: Ē 10.73 keV, HVL 0.0497 mm Al, K 296 mGy/mAs, DEF(1 %) 1.2035; 9: Ē 10.51 keV, HVL 0.0486 mm Al, K 349 mGy/mAs, DEF(1 %) 1.2023; 12: Ē 10.38 keV, HVL 0.0478 mm Al, K 383 mGy/mAs, DEF(1 %) 1.2015; 16: Ē 10.27 keV, HVL 0.047 mm Al, K 413 mGy/mAs, DEF(1 %) 1.2007; 20: Ē 10.2 keV, HVL 0.0464 mm Al, K 433 mGy/mAs, DEF(1 %) 1.2001; 30: Ē 10.07 keV, HVL 0.0455 mm Al, K 463 mGy/mAs, DEF(1 %) 1.1991
- tube voltage (kV): 25: Ē 8.93 keV, HVL 0.0402 mm Al, K 163 mGy/mAs, DEF(1 %) 1.1932; 30: Ē 9.31 keV, HVL 0.0431 mm Al, K 220 mGy/mAs, DEF(1 %) 1.196; 35: Ē 9.67 keV, HVL 0.0452 mm Al, K 277 mGy/mAs, DEF(1 %) 1.1982; 40: Ē 10.03 keV, HVL 0.0467 mm Al, K 332 mGy/mAs, DEF(1 %) 1.2; 45: Ē 10.38 keV, HVL 0.0478 mm Al, K 383 mGy/mAs, DEF(1 %) 1.2015; 50: Ē 10.75 keV, HVL 0.0487 mm Al, K 430 mGy/mAs, DEF(1 %) 1.2027
- Be window (mm): 0.15: Ē 10.23 keV, HVL 0.0454 mm Al, K 423 mGy/mAs, DEF(1 %) 1.1989; 0.3: Ē 10.3 keV, HVL 0.0466 mm Al, K 405 mGy/mAs, DEF(1 %) 1.2002; 0.5: Ē 10.38 keV, HVL 0.0478 mm Al, K 383 mGy/mAs, DEF(1 %) 1.2015; 1.0: Ē 10.59 keV, HVL 0.05 mm Al, K 338 mGy/mAs, DEF(1 %) 1.2036; 2.0: Ē 10.99 keV, HVL 0.0528 mm Al, K 271 mGy/mAs, DEF(1 %) 1.2061
- Interpretation: smaller anode angle -> longer exit path in the anode -> stronger self-filtration (heel effect physics) -> harder beam but lower output (296 vs 463 mGy/mAs for 6° vs 30°). Without added filtration the DEF hardly depends on the design parameters (1.19–1.21 for 1 % Ag), because the dose is dominated by Cu K lines and low-energy photons; the design parameters matter mainly for the output (dose rate).

## Influence of added filters (Table t3_4; Figs. fig11–fig13)
- none: Ē 10.38 keV, HVL 0.0478 mm Al, photons above Ag K-edge 4.6 %, kerma 383 mGy/mAs, DEF(1 %) SpekPy 1.2015, DM 1.2012
- Al 0.25: Ē 19.73 keV, HVL 0.1044 mm Al, photons above Ag K-edge 25.8 %, kerma 22.5 mGy/mAs, DEF(1 %) SpekPy 1.2647, DM 1.2708
- Al 0.5: Ē 23.78 keV, HVL 0.4539 mm Al, photons above Ag K-edge 38.2 %, kerma 6.64 mGy/mAs, DEF(1 %) SpekPy 1.3775, DM 1.369
- Al 1.0: Ē 26.13 keV, HVL 0.8304 mm Al, photons above Ag K-edge 49.8 %, kerma 3.18 mGy/mAs, DEF(1 %) SpekPy 1.4819, DM 1.4638
- Al 2.0: Ē 28.59 keV, HVL 1.2698 mm Al, photons above Ag K-edge 65.0 %, kerma 1.43 mGy/mAs, DEF(1 %) SpekPy 1.6232, DM 1.6014
- Cu 0.05: Ē 15.37 keV, HVL 0.0575 mm Al, photons above Ag K-edge 22.0 %, kerma 37 mGy/mAs, DEF(1 %) SpekPy 1.2209, DM 1.2258
- Cu 0.1: Ē 24.08 keV, HVL 0.0702 mm Al, photons above Ag K-edge 55.1 %, kerma 4.86 mGy/mAs, DEF(1 %) SpekPy 1.2876, DM 1.3107
- Cu 0.2: Ē 33.09 keV, HVL 1.4025 mm Al, photons above Ag K-edge 91.2 %, kerma 0.293 mGy/mAs, DEF(1 %) SpekPy 1.8041, DM 1.8433
- Ni 0.02: Ē 12.09 keV, HVL 0.0521 mm Al, photons above Ag K-edge 10.3 %, kerma 130 mGy/mAs, DEF(1 %) SpekPy 1.2082, DM 1.21
- Sn 0.05: Ē 23.53 keV, HVL 0.6063 mm Al, photons above Ag K-edge 34.3 %, kerma 3.78 mGy/mAs, DEF(1 %) SpekPy 1.3853, DM 1.3758
- Sn 0.1: Ē 24.7 keV, HVL 0.9021 mm Al, photons above Ag K-edge 40.4 %, kerma 1.48 mGy/mAs, DEF(1 %) SpekPy 1.4441, DM 1.4327
- Sn 0.2: Ē 25.62 keV, HVL 1.2075 mm Al, photons above Ag K-edge 51.2 %, kerma 0.422 mGy/mAs, DEF(1 %) SpekPy 1.5244, DM 1.5148
- Ag 0.05: Ē 23.04 keV, HVL 0.6239 mm Al, photons above Ag K-edge 20.1 %, kerma 2.57 mGy/mAs, DEF(1 %) SpekPy 1.3424, DM 1.3347
- Mo 0.05: Ē 22.16 keV, HVL 0.3688 mm Al, photons above Ag K-edge 31.5 %, kerma 3.2 mGy/mAs, DEF(1 %) SpekPy 1.3368, DM 1.3303
- Cu filters transmit their own Kα line (below the Cu K-edge, 8.98 keV) while absorbing 9–20 keV strongly: a 0.05–0.1 mm Cu filter produces a beam dominated by Cu Kα plus a hard tail (HVL stays ~0.06–0.07 mm Al), with low DEF; only 0.2 mm Cu suppresses Kα enough (DEF 1.80 at 0.08 % transmission).
- K-edge filters Mo (20.0 keV), Ag (25.5 keV) and Sn (29.2 keV) cut the spectrum just above their edges; Ag and Mo remove the photons above the Ag K-edge that are most useful, Sn keeps the 25.5–29.2 keV window but removes > 29.2 keV.

## Mass energy-absorption ratio Ag / tissue (Fig. fig02, fig03)
- 8.0 keV: 21.0; 10.0 keV: 23.0; 15.0 keV: 26.9; 20.0 keV: 29.9; 25.0 keV: 31.8; 25.6 keV: 76.2; 30.0 keV: 102.7; 35.0 keV: 120.0; 40.0 keV: 136.7; 45.0 keV: 138.8 (jump at the K-edge 25.514 keV from ~32 to ~76; maximum ~139 near 40–45 keV).
- Above the Ag K-edge mu/rho of Ag jumps ×5.8 (9.53 -> 55.4 cm2/g) but mu_en/rho only ×2.4 (8.54 -> 20.3), because ~83 % of K vacancies relax by K fluorescence (omega_K(Ag) = 0.831; Ag Kα ≈ 22 keV) whose energy is not absorbed locally in the kerma approximation.

## DEF (kerma/CPE approximation, surface, ICRU-44 tissue; Table t3_5; Fig. fig15)
- none: w=0.1%: 1.0201, w=0.2%: 1.0403, w=0.5%: 1.1007, w=1.0%: 1.2015, w=2.0%: 1.403 (DM 1 %: 1.2012; water as reference medium 1 %: 1.2018)
- Al 0.25: w=0.1%: 1.0265, w=0.2%: 1.0529, w=0.5%: 1.1324, w=1.0%: 1.2647, w=2.0%: 1.5295 (DM 1 %: 1.2708; water as reference medium 1 %: 1.2679)
- Al 0.5: w=0.1%: 1.0377, w=0.2%: 1.0755, w=0.5%: 1.1887, w=1.0%: 1.3775, w=2.0%: 1.7549 (DM 1 %: 1.369; water as reference medium 1 %: 1.3867)
- Al 1.0: w=0.1%: 1.0482, w=0.2%: 1.0964, w=0.5%: 1.241, w=1.0%: 1.4819, w=2.0%: 1.9639 (DM 1 %: 1.4638; water as reference medium 1 %: 1.4965)
- Al 2.0: w=0.1%: 1.0623, w=0.2%: 1.1246, w=0.5%: 1.3116, w=1.0%: 1.6232, w=2.0%: 2.2464 (DM 1 %: 1.6014; water as reference medium 1 %: 1.644)
- Cu 0.05: w=0.1%: 1.0221, w=0.2%: 1.0442, w=0.5%: 1.1105, w=1.0%: 1.2209, w=2.0%: 1.4418 (DM 1 %: 1.2258; water as reference medium 1 %: 1.2218)
- Cu 0.1: w=0.1%: 1.0288, w=0.2%: 1.0575, w=0.5%: 1.1438, w=1.0%: 1.2876, w=2.0%: 1.5753 (DM 1 %: 1.3107; water as reference medium 1 %: 1.2899)
- Cu 0.2: w=0.1%: 1.0804, w=0.2%: 1.1608, w=0.5%: 1.4021, w=1.0%: 1.8041, w=2.0%: 2.6082 (DM 1 %: 1.8433; water as reference medium 1 %: 1.8274)
- Ni 0.02: w=0.1%: 1.0208, w=0.2%: 1.0416, w=0.5%: 1.1041, w=1.0%: 1.2082, w=2.0%: 1.4165 (DM 1 %: 1.21; water as reference medium 1 %: 1.2088)
- Sn 0.05: w=0.1%: 1.0385, w=0.2%: 1.0771, w=0.5%: 1.1927, w=1.0%: 1.3853, w=2.0%: 1.7706 (DM 1 %: 1.3758; water as reference medium 1 %: 1.3959)
- Sn 0.1: w=0.1%: 1.0444, w=0.2%: 1.0888, w=0.5%: 1.222, w=1.0%: 1.4441, w=2.0%: 1.8882 (DM 1 %: 1.4327; water as reference medium 1 %: 1.4579)
- Sn 0.2: w=0.1%: 1.0524, w=0.2%: 1.1049, w=0.5%: 1.2622, w=1.0%: 1.5244, w=2.0%: 2.0488 (DM 1 %: 1.5148; water as reference medium 1 %: 1.542)
- Ag 0.05: w=0.1%: 1.0342, w=0.2%: 1.0685, w=0.5%: 1.1712, w=1.0%: 1.3424, w=2.0%: 1.6848 (DM 1 %: 1.3347; water as reference medium 1 %: 1.352)
- Mo 0.05: w=0.1%: 1.0337, w=0.2%: 1.0674, w=0.5%: 1.1684, w=1.0%: 1.3368, w=2.0%: 1.6736 (DM 1 %: 1.3303; water as reference medium 1 %: 1.3445)
- DEF − 1 is proportional to w: DEF = 1 + w (<mu_en,Ag>/<mu_en,t> − 1), the bracket being the spectrum-averaged ratio; (DEF−1) per 1 % Ag: 0.20 (no filter), 0.38 (Al 0.5), 0.48 (Al 1.0), 0.62 (Al 2.0), 0.80 (Cu 0.2).
- DM and SpekPy DEFs agree within 0.1 % without filter, within 0.5–1.4 % with Al filters and within 2.2 % at most (Cu 0.1–0.2 mm, where the K-line deficit of the DM matters; DEF values, not DEF−1).
- Energy-resolved analysis (Fig. fig14): without filter the dose integrand is dominated by Cu K lines and 3–15 keV photons where the Ag/tissue ratio is only 21–27; with 1 mm Al the integrand is concentrated at 15–45 keV and ~half of the photons lie above the Ag K-edge.

## Optimisation of filtration (Tables t3_6, t3_7; Figs. fig16, fig17)
- equal transmission 10 %: best Al 1.241 (188.79 µm), Si 1.241 (169.95 µm), Ca 1.2394 (95.81 µm), Sc 1.2379 (47.54 µm); worst Ni 1.22, Cu 1.2208, Zn 1.221
- equal transmission 1 %: best Ca 1.4548 (385.94 µm), Si 1.4546 (737.1 µm), Sc 1.454 (186.78 µm), Al 1.4538 (824.42 µm); worst Cu 1.3073, Zn 1.3081, Ga 1.3088
- equal transmission 0.1 %: best Sc 1.9073 (1086.03 µm), Ca 1.9072 (2261.65 µm), Ti 1.9072 (634.6 µm), V 1.9066 (421.81 µm); worst Ag 1.3354, Pd 1.3399, Rh 1.3464
- At equal transmission the light/medium-Z absorbers Si, Ca, Sc, Al, Ti are practically equivalent at 10 % and 1 % transmission (differences ≤ 0.3 %); at 0.1 % transmission Sc/Ca/Ti/V give 1.907 and Al 1.884 (1.2 % lower); of them Al and Ti are the practical materials (Ca, Sc are chemically/technically unsuitable).
- Conclusion: for a Cu-anode tube, the best filters for Ag dose enhancement are low/medium-Z absorbers without absorption edges in 9–45 keV (Al, Ti) or with K-edges below the Cu Kα energy (Fe, Co: they absorb Cu Kα strongly); K-edge filters with edges between 20 and 30 keV (Mo, Ag, Sn) are the worst at strong filtration because they remove the photons above the Ag K-edge. Practical choice: Al 1–2 mm (or Ti 0.1–0.3 mm).
- exposure none: tissue kerma 413 mGy/mAs, 16.5 Gy/s at 40 mA, time for 2 Gy 0.121 s
- exposure Al 0.25: tissue kerma 24.3 mGy/mAs, 0.971 Gy/s at 40 mA, time for 2 Gy 2.059 s
- exposure Al 0.5: tissue kerma 7.15 mGy/mAs, 0.286 Gy/s at 40 mA, time for 2 Gy 6.992 s
- exposure Al 1.0: tissue kerma 3.42 mGy/mAs, 0.137 Gy/s at 40 mA, time for 2 Gy 14.614 s
- exposure Al 2.0: tissue kerma 1.54 mGy/mAs, 0.0616 Gy/s at 40 mA, time for 2 Gy 32.521 s
- exposure Cu 0.05: tissue kerma 39.9 mGy/mAs, 1.6 Gy/s at 40 mA, time for 2 Gy 1.253 s
- exposure Cu 0.1: tissue kerma 5.24 mGy/mAs, 0.21 Gy/s at 40 mA, time for 2 Gy 9.549 s
- exposure Cu 0.2: tissue kerma 0.32 mGy/mAs, 0.0128 Gy/s at 40 mA, time for 2 Gy 158.395 s
- exposure Ni 0.02: tissue kerma 140 mGy/mAs, 5.59 Gy/s at 40 mA, time for 2 Gy 0.358 s
- exposure Sn 0.05: tissue kerma 4.07 mGy/mAs, 0.163 Gy/s at 40 mA, time for 2 Gy 12.295 s
- exposure Sn 0.1: tissue kerma 1.6 mGy/mAs, 0.064 Gy/s at 40 mA, time for 2 Gy 31.323 s
- exposure Sn 0.2: tissue kerma 0.46 mGy/mAs, 0.0184 Gy/s at 40 mA, time for 2 Gy 109.749 s
- exposure Ag 0.05: tissue kerma 2.76 mGy/mAs, 0.11 Gy/s at 40 mA, time for 2 Gy 18.096 s
- exposure Mo 0.05: tissue kerma 3.44 mGy/mAs, 0.138 Gy/s at 40 mA, time for 2 Gy 14.535 s

## Depth dependence and self-shielding (Tables t3_8; Figs. fig18, fig19)
- none: depth [0, 0.5, 1, 2, 3, 5, 7.5, 10, 15, 20] mm -> DEF(1 %) [1.2015, 1.209, 1.2146, 1.2319, 1.2612, 1.338, 1.4036, 1.4437, 1.5077, 1.5644]; relative dose [1.0, 0.54808, 0.32764, 0.13011, 0.06012, 0.02216, 0.01257, 0.009, 0.00544, 0.0036]
- Al 0.5: depth [0, 0.5, 1, 2, 3, 5, 7.5, 10, 15, 20] mm -> DEF(1 %) [1.3775, 1.3898, 1.4007, 1.4193, 1.4353, 1.4633, 1.495, 1.5247, 1.5798, 1.6302]; relative dose [1.0, 0.90308, 0.82606, 0.70922, 0.62213, 0.49565, 0.38687, 0.30965, 0.20852, 0.14695]
- Al 1.0: depth [0, 0.5, 1, 2, 3, 5, 7.5, 10, 15, 20] mm -> DEF(1 %) [1.4819, 1.4882, 1.4944, 1.5065, 1.5183, 1.5412, 1.5685, 1.5947, 1.6438, 1.689]; relative dose [1.0, 0.95269, 0.9086, 0.8289, 0.75883, 0.64161, 0.52738, 0.43882, 0.31248, 0.22891]
- Cu 0.1: depth [0, 0.5, 1, 2, 3, 5, 7.5, 10, 15, 20] mm -> DEF(1 %) [1.2876, 1.3291, 1.3828, 1.5152, 1.6402, 1.7719, 1.8181, 1.8383, 1.8694, 1.8974]; relative dose [1.0, 0.65824, 0.45225, 0.24995, 0.17131, 0.12151, 0.10181, 0.08941, 0.07024, 0.05568]
- Sn 0.1: depth [0, 0.5, 1, 2, 3, 5, 7.5, 10, 15, 20] mm -> DEF(1 %) [1.4441, 1.4477, 1.4512, 1.4582, 1.4651, 1.4787, 1.4952, 1.5114, 1.5427, 1.5729]; relative dose [1.0, 0.95811, 0.91846, 0.84528, 0.77937, 0.66584, 0.55127, 0.45983, 0.32579, 0.23531]
- uniformly loaded slab from the surface, Al 1.0, w = 0.5 %: DEF 1.241 at 0 mm, 1.1847 at 5 mm, 1.1307 at 10 mm (self-shielding by Ag)
- uniformly loaded slab from the surface, Al 1.0, w = 1.0 %: DEF 1.4819 at 0 mm, 1.3383 at 5 mm, 1.2101 at 10 mm (self-shielding by Ag)
- uniformly loaded slab from the surface, Al 1.0, w = 2.0 %: DEF 1.9639 at 0 mm, 1.5682 at 5 mm, 1.2659 at 10 mm (self-shielding by Ag)
- uniformly loaded slab from the surface, Sn 0.1, w = 0.5 %: DEF 1.222 at 0 mm, 1.1574 at 5 mm, 1.0954 at 10 mm (self-shielding by Ag)
- uniformly loaded slab from the surface, Sn 0.1, w = 1.0 %: DEF 1.4441 at 0 mm, 1.2867 at 5 mm, 1.1479 at 10 mm (self-shielding by Ag)
- uniformly loaded slab from the surface, Sn 0.1, w = 2.0 %: DEF 1.8882 at 0 mm, 1.4769 at 5 mm, 1.1717 at 10 mm (self-shielding by Ag)

## Tube voltage and other elements (Tables t3_9, t3_10; Figs. fig20, fig21)
- DEF(1 %) vs kV: 20 kV: Al0.5 1.2457, Al1.0 1.2609; 22 kV: Al0.5 1.2498, Al1.0 1.2661; 24 kV: Al0.5 1.2534, Al1.0 1.2704; 25 kV: Al0.5 1.2551, Al1.0 1.2723; 26 kV: Al0.5 1.2569, Al1.0 1.275; 27 kV: Al0.5 1.2605, Al1.0 1.2818; 28 kV: Al0.5 1.2654, Al1.0 1.2912; 30 kV: Al0.5 1.2773, Al1.0 1.3139; 35 kV: Al0.5 1.3117, Al1.0 1.3758; 40 kV: Al0.5 1.3458, Al1.0 1.4325; 45 kV: Al0.5 1.3775, Al1.0 1.4819; 50 kV: Al0.5 1.4061, Al1.0 1.5241; 60 kV: Al0.5 1.4519, Al1.0 1.5771; 70 kV: Al0.5 1.4989, Al1.0 1.6333; 80 kV: Al0.5 1.5406, Al1.0 1.6787 (60–80 kV from DM only). The slope increases visibly above ~26–27 kV, when photons above the Ag K-edge appear.
- none: Ag: 1.2015, I: 1.2633, Gd: 1.3312, Pt: 1.2048, Au: 1.2123, Bi: 1.2384
- Al 1.0: Ag: 1.4819, I: 1.4612, Gd: 1.7075, Pt: 2.1312, Au: 2.1613, Bi: 2.2307
- Sn 0.1: Ag: 1.4441, I: 1.4395, Gd: 1.7159, Pt: 2.1553, Au: 2.1892, Bi: 2.276
- Honest interpretation: per unit mass, Ag gives a smaller physical DEF than Au, Pt, Bi or Gd at 45 kV (L-shell absorption of the heavy elements at 11.9–16 keV and their higher Z); Ag is comparable to iodine. Advantages of Ag are its intrinsic biological activity (ROS generation, see AshaRani 2009, Liu 2016), low cost, and the fact that its K-edge (25.5 keV) lies inside the 45 kV spectrum. Without filtration Gd gives the largest DEF (1.33) because its L-edges (7.2–8.4 keV) absorb Cu Kα.

## Monte Carlo verification (Table t3_11; Fig. fig22)
- Geometry: laterally infinite ICRU-44 tissue slab 30 mm thick, broad parallel beam, Ag-loaded layer (1 % Ag) at 2–12 mm, scoring bins 0.25 mm, 4e+06 photons per run (5 batches), Woodcock tracking, photoelectric with Ag K fluorescence transport, Compton and Rayleigh with xraylib DCS (form factors / incoherent scattering functions), local electron deposition.
- Check: for a 30 keV broad beam the surface dose / primary kerma ratio is 1.31 (backscatter), and the reconstructed mu_tr agrees with NIST mu_en (0.3 %).
- none, entrance (2–3 mm): MC 1.168, analytical 1.155
- none, whole layer (2–12 mm): MC 1.172, analytical 1.116
- none, exit (11–12 mm): MC 1.165, analytical 1.094
- none, behind layer (15–30 mm): MC 0.802, analytical 0.761
- Al 1.0, entrance (2–3 mm): MC 1.535, analytical 1.490
- Al 1.0, whole layer (2–12 mm): MC 1.447, analytical 1.354
- Al 1.0, exit (11–12 mm): MC 1.351, analytical 1.227
- Al 1.0, behind layer (15–30 mm): MC 0.803, analytical 0.759
- Interpretation: inside the layer MC > analytical by 1–10 % (increasing with depth) because (i) part of the Ag K-fluorescence (~22 keV, mean free path ~1.5 cm in tissue) is reabsorbed in the layer, and (ii) scattered photons contribute. Behind the layer the dose is reduced to ~0.80 of the Ag-free value (shielding by Ag) — a protective/negative consequence for tissues downstream.

## Sensitivity / uncertainty (Table t3_12; Fig. fig23)
- base DEF (1 % Ag, Al 1.0 mm, SpekPy) = 1.4819; kVp ±1 kV: 1.4727–1.4909 (|Δ| 0.0093); anode angle ±3°: 1.4915–1.4757 (|Δ| 0.0095); Be window ±0.1 mm: 1.4817–1.4821 (|Δ| 0.0002); Al filter ±5%: 1.4737–1.49 (|Δ| 0.0082); mu_en/rho Ag ±2%: 1.4721–1.4918 (|Δ| 0.0098); mu_en/rho tissue ±1%: 1.4869–1.4771 (|Δ| 0.005); tissue composition (ICRU 4-component / water): 1.5389–1.4965 (|Δ| 0.0569); spectrum model (DM vs SpekPy): 1.4638–1.4819 (|Δ| 0.0182); DM electron-depth factor eta ±25%: 1.4572–1.4701 (|Δ| 0.0066). Combined standard uncertainty (rectangular distributions, k = 1, excluding the definitional choice of reference medium) = 0.0157, i.e. DEF = 1.48 ± 0.02 (k = 1) or ± 0.03 (k = 2).
