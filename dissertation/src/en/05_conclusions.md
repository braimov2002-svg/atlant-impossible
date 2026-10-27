# CONCLUSIONS

The main results of the dissertation are as follows.

1. Literature analysis showed that physical dose enhancement by high-Z elements is largest for kilovoltage photons and that silver nanoparticles were reported to radiosensitize glioma, breast and colorectal cancer cells. The ratio of the mass energy-absorption coefficients of Ag and soft tissue is 21–32 at 8–25 keV, below the Ag K-edge (25.514 keV), and 100–139 at 30–45 keV. The dependence of the dose enhancement factor (DEF) on the design and filtration of copper-anode tubes had not been studied quantitatively in the reviewed literature.

2. A semi-analytical thick-target spectrum model of a copper-anode tube (the developed model, DM) was created. It includes the Bethe stopping power in the continuous-slowing-down approximation, the non-relativistic Bethe–Heitler bremsstrahlung cross-section with the Elwert factor, the Gryzinski K-shell ionisation cross-section, the bremsstrahlung-induced K fluorescence in closed form (4.5–4.8 % of the line intensity), self-absorption in the anode and attenuation in the window, air and filters.

3. The single adjustable parameter, the electron depth factor, was fitted to the SpekPy v2 bremsstrahlung shape at 45 kV: $\eta = 0.40$ gives a root-mean-square deviation of 2.46 % against 8.47 % for $\eta = 1$. Without refitting, the DM reproduces the half-value layer (HVL) of beams filtered with 1 mm Al within 3.5–4.6 % and their mean energy within 0.54 keV for 25–50 kV and anode angles of 6–30°. It underestimates the Cu K lines by 25–43 % and overestimates the absolute air kerma; the latter does not affect the DEF.

4. The unfiltered 45 kV spectrum (anode angle 12°, 0.5 mm Be, 10 cm of air) is dominated by the Cu K lines (68.5 % of the photons), and only 4.64 % of the photons lie above the Ag K-edge. The beam is soft (mean energy 10.38 keV, first HVL 0.0478 mm Al) and intense (383 mGy/mAs, i.e. 15.3 Gy/s at 10 cm and 40 mA).

5. The anode angle (6–30°), tube voltage (25–50 kV) and Be window (0.15–2 mm) change the air kerma between 163 and 463 mGy/mAs, but the DEF for 1 % Ag stays within 1.19–1.21, because the absorbed energy is dominated by the Cu K lines and by 3–15 keV photons, for which the Ag/tissue ratio is only 21–27.

6. Added filtration is the decisive factor: the DEF for 1 % Ag is 1.48 with 1 mm Al, 1.62 with 2 mm Al and 1.80 with 0.2 mm Cu, at the cost of a 120–1300-fold lower air kerma. DEF − 1 is proportional to the Ag mass fraction (0.48 per 1 % Ag with 1 mm Al). The DM and SpekPy spectra give DEFs that agree within 1–2 % for Al filters.

7. At equal transmission, light and medium-Z filters without absorption edges in 9–45 keV (Al, Si, Ca, Sc, Ti) are optimal, whereas filters with K-edges at 20–30 keV (Mo, Ag, Sn) are the least effective at strong filtration: at 0.1 % transmission, the DEF for 1 % Ag is 1.91 with a Ti filter but only 1.34 with an Ag filter.

8. With 1 mm Al, the DEF for 1 % Ag increases with depth from 1.48 at the surface to 1.69 at 20 mm (beam hardening) but decreases to 1.21 at 10 mm inside a uniformly loaded region (self-shielding). A Monte Carlo calculation confirmed the analytical model within 1–10 %, revealed the role of reabsorbed Ag K fluorescence and scattered photons, and showed a dose reduction to about 0.80 behind the loaded layer.

9. Per unit mass, silver is a weaker physical sensitizer at 45 kV than Gd, Pt, Au and Bi (DEF 1.48 against 2.16 for Au with 1 mm Al) and is comparable to iodine (1.46), so the reported biological advantage of silver over gold nanoparticles points to chemical and biological mechanisms. For 1 % Ag and 1 mm Al, DEF = 1.48 ± 0.02 ($k = 1$). The CS_Energy function of xraylib 4.3.0 underestimates the mass energy-absorption coefficient of oxygen at 30 keV by 37 % and would give a DEF of 1.72 instead of 1.48.

## Practical recommendations

1. An aluminium filter 1–2 mm thick (or a titanium filter 0.1–0.3 mm thick) should be used; unfiltered beams and Mo, Ag, Sn or thin Cu filters should be avoided.
2. The beam should be specified by the tube voltage, anode angle, window, filters and measured first HVL (0.83 mm Al with 1 mm Al filtration), and the DEF reported together with the spectrum.
3. Exposures should be planned from the tissue kerma (2 Gy in 14.6 s with 1 mm Al and in 32.5 s with 2 mm Al at 10 cm and 40 mA), and the output confirmed by dosimetry.
4. Silver mass fractions of at least 0.5 % (DEF 1.24 with 1 mm Al) should be used.
5. Thin samples are preferable; for thick samples, the depth dependence of the DEF, self-shielding and the dose reduction behind the loaded region must be considered.
6. The NIST mass energy-absorption coefficients should be used and the reference medium stated, since it changes the DEF by up to 0.057.

## Prospects for further research

The work can be continued in four directions. Nanoscale Monte Carlo simulations of electron transport around silver nanoparticles irradiated with the obtained spectra would relate the microscopic dose enhancement to the macroscopic DEF. Measurements of the tube spectrum with a CdTe or Si spectrometer would verify the Cu K-line intensity and the absolute output, and the DM could be improved by including electron backscattering and more accurate K-shell ionisation cross-sections near threshold. In vitro experiments with silver nanoparticles under the recommended filtration would separate the physical dose enhancement from chemical and biological mechanisms such as the production of reactive oxygen species. Finally, a comparison of gold and silver nanoparticles at equal mass concentrations and identical spectra would show whether the reported biological advantage of silver persists when the physical DEF is known.
