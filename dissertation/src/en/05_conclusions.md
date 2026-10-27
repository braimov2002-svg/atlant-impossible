# CONCLUSIONS

The main results of the dissertation are as follows.

1. The literature analysis showed that dose enhancement by high-Z elements is much larger for kilovoltage than for megavoltage photons and that silver nanoparticles were reported to radiosensitize glioma, breast and colorectal cancer models. The ratio of the mass energy-absorption coefficients of Ag and soft tissue is 21–32 at 8–25 keV, below the Ag K-edge (25.514 keV), and 100–139 at 30–45 keV. The dependence of the dose enhancement factor (DEF) on the design and filtration of copper-anode tubes had not been studied quantitatively in the reviewed literature.

2. A semi-analytical thick-target model of the spectrum of a copper-anode tube, the developed model (DM), was created. It is based on the Bethe collision stopping power, the non-relativistic Bethe–Heitler bremsstrahlung cross-section with the Elwert factor and the Gryziński K-shell ionisation cross-section, and includes closed-form bremsstrahlung-induced K fluorescence (4.5–4.8 % of the line intensity), anode self-absorption and filtration.

3. The single adjustable parameter, the electron depth factor $\eta = 0.40$, was fitted to the SpekPy v2 bremsstrahlung shape at 45 kV (root-mean-square deviation 2.46 % against 8.47 % for straight-line electrons, $\eta = 1$). Without refitting, the DM reproduces the half-value layer (HVL) of beams filtered with 1 mm Al with deviations of −3.5 to −4.6 % and their mean energy within 0.54 keV for 25–50 kV and anode angles of 6–30°. It underestimates the Cu K lines by 25–43 % and overestimates the absolute air kerma by 8–42 %, but for Al-filtered beams its DEFs agree with those of SpekPy within 1–2 %.

4. The unfiltered 45 kV spectrum (anode angle 12°, 0.5 mm Be, 10 cm of air) is dominated by the Cu K lines (68.5 % of the photons); only 4.64 % lie above the Ag K-edge. The beam is soft (mean energy 10.38 keV, first HVL 0.0478 mm Al) and intense: the air kerma at 10 cm is 383 mGy/mAs, i.e. 15.3 Gy/s at 40 mA.

5. The anode angle (6–30°), tube voltage (25–50 kV) and Be window (0.15–2 mm) change the air kerma within 163–463 mGy/mAs, but the DEF for 1 % Ag stays within 1.19–1.21, because the dose is dominated by the Cu K lines and 3–15 keV photons, for which the Ag/tissue ratio is only 21–27.

6. Added filtration is the decisive factor: the DEF for 1 % Ag is 1.48 with 1 mm Al, 1.62 with 2 mm Al and 1.80 with 0.2 mm Cu, at the cost of a 120–1300-fold lower air kerma. DEF − 1 is proportional to the Ag mass fraction (0.20 per 1 % Ag without a filter and 0.48 with 1 mm Al).

7. At equal air-kerma transmission, light and medium-Z filters without absorption edges in 9–45 keV (Al, Si, Ca, Sc, Ti) are optimal, whereas filters with K-edges at 20–30 keV (Mo, Ag, Sn) are the least effective at strong filtration, because they absorb strongly where silver is most effective: at 0.1 % transmission, the DEF for 1 % Ag is 1.91 with a Ti filter but only 1.34 with an Ag filter.

8. With 1 mm Al, the DEF for 1 % Ag in a thin loaded region increases with depth from 1.48 at the surface to 1.69 at 20 mm (beam hardening), but inside a region loaded uniformly from the surface it falls to 1.21 at 10 mm (self-shielding). For a 10 mm layer with 1 % Ag, the Monte Carlo DEFs were 1–10 % above the analytical values, owing to reabsorbed Ag K fluorescence and scattered photons, and the dose behind the layer fell to about 0.80 of its silver-free value.

9. With 1 mm Al, the DEF for 1 % Ag rises from 1.27 at 25 kV to 1.52 at 50 kV. Per unit mass, silver is a weaker physical sensitizer at 45 kV than Gd, Pt, Au and Bi (DEF 1.48 against 2.16 for Au with 1 mm Al) and is comparable to iodine (1.46), so the reported biological advantage of silver over gold nanoparticles points to chemical, biological and nanoscale mechanisms.

10. For 1 % Ag and 1 mm Al, DEF = 1.48 ± 0.02 (coverage factor $k = 1$), and the choice of the reference medium changes it by up to 0.057. The CS_Energy function of xraylib 4.3.0 underestimates the mass energy-absorption coefficient of oxygen at 30 keV by 37 % and would give a DEF of 1.72 instead of 1.48, so NIST tables must be used.

## Practical recommendations

1. A 1–2 mm Al filter (or a 0.1–0.3 mm Ti filter) should be used; unfiltered beams, thin Cu filters and Mo, Ag or Sn filters should be avoided.
2. The beam should be specified by the tube voltage, anode angle, window, filters and measured first HVL (0.83 mm Al calculated for 1 mm Al filtration), and the DEF reported with the spectrum and the reference medium.
3. Exposures should be planned from the tissue kerma (2 Gy in 14.6 s with 1 mm Al and in 32.5 s with 2 mm Al at 10 cm and 40 mA), and the output confirmed by dosimetry.
4. Silver mass fractions of at least 0.5 % (DEF 1.24 with 1 mm Al) should be used.
5. For thick samples, the depth dependence of the DEF, self-shielding and the dose reduction behind the loaded region must be considered.

## Prospects for further research

Nanoscale Monte Carlo simulations of electron transport around silver nanoparticles irradiated with the obtained spectra would relate the microscopic dose enhancement to the macroscopic DEF. Spectrum measurements with a CdTe or Si detector would verify the Cu K-line intensity and the absolute output and guide improvements of the DM (electron backscattering, K-shell ionisation cross-sections near threshold). In vitro experiments under the recommended filtration would separate the physical dose enhancement from chemical and biological mechanisms such as the production of reactive oxygen species. Finally, gold and silver nanoparticles should be compared at equal mass concentrations and identical spectra to test whether the biological advantage of silver persists at a known physical DEF.
