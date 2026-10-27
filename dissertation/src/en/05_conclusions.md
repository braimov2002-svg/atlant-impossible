# CONCLUSIONS

1. High-Z dose enhancement is much larger for kilovoltage than megavoltage photons, and silver nanoparticles were reported to radiosensitize glioma, breast and colorectal cancer models. The Ag/tissue ratio of mass energy-absorption coefficients rises from 21–32 below the Ag K-edge (25.514 keV) to 100–139 at 30–45 keV, but the dependence of the dose enhancement factor (DEF) on copper-anode tube design and filtration had not been quantified.

2. The developed model (DM) is a semi-analytical thick-target model of the copper-anode tube spectrum (Bethe stopping power, non-relativistic Bethe–Heitler cross-section with the Elwert factor, Gryziński K-shell cross-section) that includes closed-form bremsstrahlung-induced K fluorescence (4.5–4.8 % of the line intensity), anode self-absorption and filtration.

3. Its single parameter, the electron depth factor $\eta = 0.40$, was fitted to the SpekPy v2 bremsstrahlung shape at 45 kV (root-mean-square deviation 2.46 %). Without refitting, the DM reproduces the half-value layer (HVL) of 1 mm Al-filtered beams at 25–50 kV and 6–30° anode angles within −3.5 to −4.6 %; it underestimates the Cu K lines by 25–43 % and overestimates the air kerma by 8–42 %, yet its DEFs with Al filters agree with SpekPy within 1–2 %.

4. The unfiltered 45 kV spectrum (12° anode, 0.5 mm Be, 10 cm air) is soft (mean energy 10.38 keV, first HVL 0.0478 mm Al), intense (383 mGy/mAs, i.e. 15.3 Gy/s at 40 mA) and dominated by the Cu K lines (68.5 % of photons, against 4.64 % above the Ag K-edge).

5. Anode angle (6–30°), voltage (25–50 kV) and Be window (0.15–2 mm) change the air kerma within 163–463 mGy/mAs but the DEF for 1 % Ag only within 1.19–1.21, because the dose comes mainly from Cu K lines and 3–15 keV photons, where the Ag/tissue ratio is only 21–27.

6. Added filtration is decisive: the DEF for 1 % Ag is 1.48 with 1 mm Al, 1.62 with 2 mm Al and 1.80 with 0.2 mm Cu, at the cost of a 120–1300-fold lower air kerma. DEF − 1 is proportional to the Ag mass fraction.

7. At equal air-kerma transmission, light and medium-Z filters without edges in 9–45 keV (Al, Si, Ca, Sc, Ti) are optimal, whereas K-edge filters at 20–30 keV (Mo, Ag, Sn) absorb where silver is most effective: at 0.1 % transmission, the DEF for 1 % Ag is 1.91 with Ti but 1.34 with Ag.

8. With 1 mm Al and 1 % Ag, the DEF in a thin loaded region rises from 1.48 at the surface to 1.69 at 20 mm (beam hardening) but falls to 1.21 at 10 mm inside a region loaded uniformly from the surface (self-shielding). Monte Carlo DEFs for a 10 mm layer were 1–10 % higher than analytical (reabsorbed Ag K fluorescence, scattered photons), and the dose behind it fell to about 0.80 of the silver-free value.

9. The DEF (1 % Ag, 1 mm Al) rises from 1.27 at 25 kV to 1.52 at 50 kV. Per unit mass at 45 kV, silver is a weaker physical sensitizer than Gd, Pt, Au and Bi (1.48 against 2.16 for Au) and comparable to iodine (1.46), so its reported biological advantage over gold nanoparticles points to chemical, biological and nanoscale mechanisms.

10. For 1 % Ag and 1 mm Al, DEF = 1.48 ± 0.02 ($k = 1$); the reference medium changes it by up to 0.057. The xraylib 4.3.0 function CS_Energy underestimates the oxygen mass energy-absorption coefficient at 30 keV by 37 %, which would raise this DEF to 1.72, so NIST tables must be used.

## Practical recommendations

1. Use 1–2 mm Al (or 0.1–0.3 mm Ti) filtration; avoid unfiltered beams, thin Cu filters and Mo, Ag or Sn filters.
2. Specify the beam (voltage, anode angle, window, filters, measured first HVL; 0.83 mm Al calculated for 1 mm Al) and report the DEF with the spectrum and reference medium.
3. Plan exposures from the tissue kerma (2 Gy in 14.6 s with 1 mm Al and 32.5 s with 2 mm Al at 10 cm, 40 mA) and verify the output dosimetrically.
4. Use silver mass fractions of at least 0.5 % (DEF 1.24 with 1 mm Al).
5. For thick samples, account for the DEF depth dependence, self-shielding and reduced dose behind the loaded region.

## Prospects for further research

Nanoscale Monte Carlo simulations with the obtained spectra would link microscopic dose enhancement around silver nanoparticles to the macroscopic DEF, and CdTe or Si spectrometry would verify the DM's Cu K-line intensity and absolute output. In vitro experiments with the recommended filtration would separate physical dose enhancement from chemical and biological mechanisms such as reactive oxygen species production. Comparing gold and silver nanoparticles at equal mass concentration and identical spectra would test whether silver's biological advantage persists at a known physical DEF.
