# Outline of the master's dissertation

**Title (EN):** X-Ray Spectrum Modeling for the Study of Radio-Enhancement in Biological Matter with Ag
**Title (RU):** Моделирование спектра рентгеновского излучения для исследования радиоусиления в биологической среде с Ag
**Title (UZ):** Biologik muhitda Ag bilan radiokuchayishni tadqiq qilish uchun rentgen nurlanishi spektrini modellashtirish

**Annotation given by the supervisor (keep its meaning):** The effectiveness of anticancer radiotherapy is still
limited by the tolerance of healthy tissues. One strategy to optimise the dose delivered in external radiotherapy is
to use radiosensitizers. For the study of the radio-enhancement effect of Ag in biological matter at kilovoltage x-ray
energies, the quantitative estimate is the dose enhancement factor (DEF). The spectrum of the x-ray tube (45 kVp, Cu
anode) needed for the DEF calculations is modelled as a function of the tube design and technical parameters, taking
into account the filters of the tube.

**Total length:** ≈ 19 000 words of English body text (≈ 90 A4 pages with 23 figures and 17 tables at 14 pt, 1.5 spacing).
Word targets below are for prose only (figures/tables/equations are extra). Stay within ±10 %.

**Golden thread (main messages, use consistently):**
1. Macroscopic physical dose enhancement by Ag depends on how much of the photon energy fluence lies where Ag absorbs
   much more than tissue — above the Ag K-edge (25.514 keV), where (mu_en/rho)_Ag/(mu_en/rho)_tissue rises to 100–139.
2. The bare 45 kV Cu-anode spectrum is dominated by Cu K lines (8.0–8.9 keV, 68.5 % of photons) and soft
   bremsstrahlung, so the DEF for 1 % Ag is only 1.20; tube design parameters (anode angle, kV, Be window) change mainly
   the output, not the DEF.
3. Filtration is the decisive "design" lever: Al 1 mm gives DEF 1.48 (1 % Ag), Al 2 mm 1.62, Cu 0.2 mm 1.80, at the cost
   of a 120–1300-fold lower dose rate. At equal transmission, light/medium-Z filters (Al, Ti) are optimal; K-edge filters
   with edges at 20–30 keV (Mo, Ag, Sn) are not.
4. The developed semi-analytical model (DM) with one fitted parameter reproduces SpekPy v2 within ~4 % in HVL for filtered
   beams and within 1–2 % in DEF; its weakness is the underestimate of Cu K-line intensity.
5. DEF increases with depth (beam hardening), decreases inside a highly loaded region (self-shielding), and the dose
   behind an Ag-loaded layer drops to ~0.8; Monte Carlo confirms the analytical model within 1–10 % and shows the role of
   Ag K-fluorescence reabsorption.
6. Per unit mass, Ag is a weaker physical sensitizer than Au/Pt/Bi/Gd at 45 kV (DEF 1.48 vs 2.16 for Au, Al 1 mm) and
   comparable to iodine; reported biological radiosensitization by AgNPs exceeds what macroscopic physics predicts,
   pointing to chemical/biological mechanisms (ROS) and nanoscale effects.
7. A data-quality finding: xraylib 4.3.0 CS_Energy for light elements is wrong by up to −37 % at 30 keV; NIST tables must
   be used (otherwise the DEF would be overestimated, e.g. 1.72 instead of 1.48).

---------------------------------------------------------------------------------------------------

## File 00_annotation.md — ANNOTATION (≈ 300 words in English)
`# ANNOTATION` — one dense paragraph block: problem, aim, methods (DM + SpekPy + NIST + Monte Carlo), main results with
key numbers (DEF 1.20 → 1.48 → 1.62/1.80; Al/Ti optimal; model agreement; MC), practical value. Plus a line
"Keywords: ..." (8–10 keywords). (The build adds Russian and Uzbek annotations from the translations, so every volume
contains the annotation in all three languages.)

## File 00_abbrev.md — LIST OF ABBREVIATIONS AND SYMBOLS (≈ 1 page)
Two-column pipe table (Abbreviation/Symbol | Meaning) with ~30 rows: AgNP, AuNP, CPE, CSDA, DEF, DM, DCS, HVL, ICRU,
IAEA, MC, NIST, RT, ROS, SER, kVp, Z, E, E_K, Φ(E), Ψ(E), μ/ρ, μ_en/ρ, w, θ, η, S(T), σ_K, ω_K, K (kerma), D.
Start with `Table: {#tab:abbrev} Abbreviations and symbols.` Not counted in figures/tables numbering — fine.

## File 01_intro.md — INTRODUCTION (≈ 2000 words)
`# INTRODUCTION` with run-in paragraphs that start with bold labels, in this order (bold label + text, as is
customary in CIS dissertations): **Relevance of the topic.** **Degree of study of the problem.** **Aim of the work.**
**Tasks of the research.** (numbered list of 7 tasks) **Object of the research.** (x-ray radiation of a 45 kV Cu-anode
tube and its interaction with soft tissue containing Ag) **Subject of the research.** (spectrum formation and its
dependence on design/filtration; dose enhancement factor) **Research methods.** **Scientific novelty.** (numbered, 5
items, each specific and supported by the results) **Practical significance.** **Reliability of the results.**
**Approbation of the results.** (`[to be completed by the author: conferences and seminars where the results were
reported]`) **Publications.** (`[to be completed by the author: list of publications]`) **Structure and volume of the
dissertation.** (introduction, three chapters, conclusions, references, appendices; write the counts with the
placeholders `{{COUNT:pages}}` pages, `{{COUNT:figures}}` figures, `{{COUNT:tables}}` tables and `{{COUNT:refs}}`
references — the build fills them in.)
Relevance: cancer burden [@bray2024], role of RT [@delaney2005; @baskar2012], normal-tissue tolerance [@hall2018],
radiosensitizers [@wardman2007; @gill2019], high-Z nanoparticles [@hainfeld2004; @kuncic2018], silver [@liu2013;
@liu2016], kV beams/spectrum knowledge needed for DEF [@cho2005; @ma2001], spectrum models [@poludniowski2021].

## File 02_ch1.md — CHAPTER 1. RADIOSENSITIZATION BY HIGH-Z ELEMENTS AND X-RAY SPECTRUM MODELING: LITERATURE REVIEW (≈ 5000 words)
- `## 1.1. Radiotherapy and the problem of normal-tissue tolerance` (≈ 700): therapeutic ratio, dose limits, ways to widen the window (fractionation, conformal techniques, radiosensitizers) [@hall2018; @baskar2012; @delaney2005; @khan2014; @wardman2007].
- `## 1.2. Interaction of kilovoltage photons with biological matter` (≈ 1000): photoelectric effect (~Z^3–Z^4/E^3), Compton, Rayleigh; absorption edges; fluorescence vs Auger; kerma, absorbed dose, CPE, mu_en/rho [@attix1986; @andreo2017; @podgorsak2016; @seltzer1993; @hubbell1975; @nist_xraymass; @krause1979; @bambynek1972; @icru85; @fano1954]. Insert {{FIG:fig02_coeffs|...}} (mu/rho and mu_en/rho of Ag and ICRU-44 soft tissue) and discuss the K-edge and why mu_en jumps less than mu (fluorescence).
- `## 1.3. High-Z radiosensitizers: from iodine contrast to metal nanoparticles` (≈ 1200): historical (Spiers, interfaces) [@spiers1949; @das1995]; iodine and kV/synchrotron [@matsudaira1980; @mello1983; @solberg1992; @rose1999; @adam2003; @corde2004; @verhaegen2005; @robar2002]; Pt/Auger [@biston2004; @pignol2003]; gold nanoparticles in vivo/in vitro and MC [@hainfeld2004; @cho2005; @zhang2009; @jones2010; @leung2011; @lechtman2011; @rahman2009; @rahman2014; @chithrani2010; @brun2009; @khoshgard2014; @kakade2015; @koger2016]; mechanisms (physical, chemical, biological; local effect model) [@mcmahon2011; @butterworth2012; @her2017; @rosa2017; @kuncic2018; @retif2015; @penninckx2020; @schuemann2016; @haume2016]; element choice [@roeske2007; @mcmahon2016]. Insert {{FIG:fig03_ratio|...}} (mu_en ratio element/tissue for Ag, I, Gd, Pt, Au, Bi) and discuss.
- `## 1.4. Silver and silver nanoparticles as radiosensitizers` (≈ 1000): properties and biomedical uses [@wei2015; @burdusel2018], cytotoxicity/ROS [@asharani2009], radiosensitization studies [@xu2009; @liu2013; @liu2016; @liu2018; @zhao2019; @lu2012; @swanner2015; @habiba2019], dosimetric/MC studies [@taha2019; @caglar2024; @merkis2023; @chow2023; @esitmez2026]; Ag K-edge 25.514 keV, ω_K = 0.831 → relevance of kV spectra between 25 and 50 keV. Write a qualitative table `Table: {#tab:lit_ag} Studies of silver nanoparticles as radiosensitizers.` (columns: Study | System / radiation type | Main finding — only what the REFS notes say; 8 rows).
- `## 1.5. Methods of modelling x-ray tube spectra` (≈ 900): empirical (TASMIP) [@boone1997], semi-empirical (Kramers, Birch–Marshall, TBC) [@kramers1923; @birch1979; @tucker1991], physics-based deterministic (SpekCalc, SpekPy) [@poludniowski2007a; @poludniowski2007b; @poludniowski2009; @poludniowski2021; @bujila2020; @omar2018; @omar2020a; @omar2020b; @punnoose2016], Monte Carlo (MCNP, EGSnrc/BEAM, Geant4, PENELOPE) [@ay2004; @verhaegen1999; @kawrakow2000; @agostinelli2003; @salvat2019]; beam quality specification (HVL) [@ma2001; @iaea_trs398; @iec61267; @hill2014]. Most models are for W anodes; Cu-anode tubes (XRD) are less covered → motivation. Write a qualitative table `Table: {#tab:methods} Comparison of x-ray spectrum modelling approaches.` (Approach | Examples | Advantages | Limitations; 4 rows).
- `## 1.6. Conclusions to Chapter 1` (≈ 250): gaps → tasks of this work.

## File 03_ch2.md — CHAPTER 2. PHYSICAL MODEL OF THE X-RAY SPECTRUM AND METHODS OF DOSE-ENHANCEMENT CALCULATION (≈ 5600 words)
Read `dissertation/code/xspec.py`, `nist.py`, `mc_dose.py` and `brief/FACTS.md` to describe the methods exactly as implemented.
- `## 2.1. Design and technical parameters of an x-ray tube with a copper anode` (≈ 700): cathode, focusing, reflection anode, anode angle θ and heel effect, focal spot, Be window, housing, added filters, kVp/constant potential, current; Cu tubes in XRD (Kα, Ni filter) [@cullity2001; @bushberg2012; @khan2014]. Insert {{FIG:fig01_tube|...}} and {{TABLE:t2_1}}.
- `## 2.2. Electron slowing-down in the anode` (≈ 700): Bethe formula eq. with ICRU 37 constants (I = 322 eV) [@bethe1930; @icru37]; density effect negligible; CSDA path s(T) = ∫ dT/S; projected depth d = η s cosθ, physical meaning of η (electron diffusion, Whiddington [@whiddington1912; @poludniowski2007a]); CSDA range 6.48 µm; check vs ESTAR for water [@nist_estar]. Insert {{FIG:fig04_electron|...}} (panel a stopping power and depth; panel b K-shell cross-section — discuss panel b in 2.4).
- `## 2.3. Bremsstrahlung production in a thick target` (≈ 700): Kramers cross-section and law [@kramers1923]; non-relativistic Bethe–Heitler (Born) cross-section with Elwert factor [@bethe1934; @elwert1939; @koch1959]; comparison with Seltzer–Berger tables [@seltzer1986]; thick-target integral N(E) = n_a ∫ (dσ/dE)/S dT with self-absorption exp(−μ d/ sinθ); isotropic emission assumption.
- `## 2.4. Characteristic radiation` (≈ 700): Gryzinski σ_K [@gryzinski1965; @llovet2014; @bote2008], fluorescence yield and radiative rates (xraylib) [@krause1979; @schoonjans2011; @deslattes2003], direct K-photon yield with self-absorption; indirect (photon-induced) fluorescence: derive the surface-source result with E_1 and its Laplace transform (absorption-depth density (μ/2)E_1(μz); result (τ_K/2) ln(1+b/μ)/b), b = μ_L/sinθ; share 4.5 %. Insert {{TABLE:t2_2}}.
- `## 2.5. Filtration, beam-quality parameters and air kerma` (≈ 650): Beer–Lambert for window, air, filters; inverse square; fluence spectrum Φ(E) per mAs; air kerma K = ∫ Φ E (mu_en/rho)_air dE; HVL1, HVL2, homogeneity coefficient, mean and effective energy [@ma2001; @iaea_trs398; @iec61267].
- `## 2.6. Dose enhancement factor: definitions and calculation` (≈ 900): DEF = D_with/D_without; kerma (CPE) approximation; mixture rule for mu_en/rho with mass fraction w; DEF formula as spectrum-weighted ratio eq.; linear form DEF = 1 + w(⟨R⟩−1); depth dependence with attenuation exp(−μ_t z); loaded-slab self-shielding with μ_mix; choice of reference medium (ICRU-44 tissue [@icru44], water); limits of macroscopic DEF vs nanoscale effects [@mcmahon2011; @jones2010; @lechtman2011].
- `## 2.7. Monte Carlo method for verification` (≈ 650): geometry, sampling of photon energy from the spectrum, Woodcock tracking [@woodcock1965; @kalos2008], interaction sampling with partial cross-sections (photo, incoherent, coherent) and DCS with form factors and incoherent scattering functions [@hubbell1975; @schoonjans2011], Ag K-shell fluorescence emission/transport, local electron deposition justification, statistics (5 batches), validation checks (30 keV backscatter ratio 1.31; μ_tr vs NIST within 0.3 %). Mention full codes [@salvat2019; @kawrakow2000; @agostinelli2003] as reference tools.
- `## 2.8. Data sources, software implementation and validation strategy` (≈ 550): NIST tables (log-log interpolation by edge segments) [@nist_xraymass; @nist_xcom]; ICRU-44 composition; xraylib usage and the detected CS_Energy error (numbers in FACTS); SpekPy v2.5.4 as reference [@poludniowski2021; @bujila2020; @spekpy_soft]; Python/NumPy/SciPy/Matplotlib [@harris2020; @virtanen2020; @hunter2007]; fitting of η (single parameter) and validation plan.
- `## 2.9. Radiation safety when working with a kilovoltage x-ray tube` (≈ 450): very high output (15 Gy/s air kerma at 10 cm unfiltered), shielding of the housing, interlocks, dose limits and ALARA [@icrp103; @iaea_gsr3; @uz_law_radsafety]; filters also reduce unnecessary skin dose.
- `## 2.10. Conclusions to Chapter 2` (≈ 250).

Equations expected in Chapter 2 (labels): eq:bethe, eq:csda, eq:depth, eq:kramers, eq:bhnr, eq:elwert, eq:thick, eq:gryz,
eq:charK, eq:indirect, eq:filter, eq:fluence, eq:kerma, eq:hvl, eq:emean, eq:mixture, eq:def, eq:def_spec, eq:def_lin,
eq:def_depth, eq:def_slab (about 20 numbered equations).

## File 04_ch3.md — CHAPTER 3. RESULTS OF SPECTRUM MODELLING AND DOSE-ENHANCEMENT CALCULATIONS (≈ 6500 words)
- `## 3.1. Validation of the developed spectrum model` (≈ 800): η fit (0.40; RMS 2.46 % vs 8.47 % for η = 1); {{TABLE:t3_1}}, {{FIG:fig05_validation_cu|...}}, {{TABLE:t3_1w}}, {{FIG:fig06_validation_w|...}}; strengths and the K-line deficit; absolute output.
- `## 3.2. Spectrum of the 45 kV copper-anode tube` (≈ 600): {{FIG:fig07_baseline|...}}, {{TABLE:t3_2}}; Kα/Kβ, Ni filter ratio 0.143 → 0.0023, characteristic fraction, beam quality, output 383 mGy/mAs.
- `## 3.3. Influence of tube design parameters` (≈ 800): {{FIG:fig08_angle|...}}, {{FIG:fig09_kvp|...}}, {{FIG:fig10_be|...}}, {{TABLE:t3_3}}.
- `## 3.4. Influence of added filters on the spectrum` (≈ 900): {{FIG:fig11_al|...}}, {{FIG:fig12_cu_ni|...}}, {{FIG:fig13_kedge|...}}, {{TABLE:t3_4}}.
- `## 3.5. Dose enhancement factor of Ag-loaded soft tissue` (≈ 800): {{FIG:fig14_integrand|...}}, {{FIG:fig15_def_conc|...}}, {{TABLE:t3_5}}; linearity, slope per 1 %, DM vs SpekPy, water vs tissue.
- `## 3.6. Optimisation of the filtration` (≈ 800): {{FIG:fig16_tradeoff|...}}, {{FIG:fig17_filter_scan|...}}, {{TABLE:t3_6}}, {{TABLE:t3_7}} (exposure times).
- `## 3.7. Depth dependence and self-shielding` (≈ 600): {{FIG:fig18_def_depth|...}}, {{FIG:fig19_def_slab|...}}, {{TABLE:t3_8}}.
- `## 3.8. Influence of tube voltage and comparison with other high-Z elements` (≈ 650): {{FIG:fig20_def_kvp|...}}, {{TABLE:t3_10}}, {{FIG:fig21_elements|...}}, {{TABLE:t3_9}}.
- `## 3.9. Monte Carlo verification` (≈ 550): {{FIG:fig22_mc|...}}, {{TABLE:t3_11}}.
- `## 3.10. Uncertainty and sensitivity analysis` (≈ 400): {{FIG:fig23_sensitivity|...}}, {{TABLE:t3_12}}.
- `## 3.11. Discussion` (≈ 900): comparison with literature (kV-range DEF studies for Au/I [@cho2005; @mello1983; @solberg1992; @roeske2007; @chow2023]; Ag MC studies [@taha2019; @caglar2024; @esitmez2026]; biological SER for AgNP [@liu2013; @liu2016; @xu2009] exceeding physical DEF; nanoscale [@mcmahon2011; @jones2010]); limitations (kerma approximation, isotropic emission, no heel-effect off-axis, K-line deficit, homogeneous distribution of Ag, no biology); practical recommendations for an experiment (Al 1–2 mm filter, dosimetry by HVL, exposure times, concentration ≥ 0.5 %, report DEF together with spectrum).
- `## 3.12. Conclusions to Chapter 3` (≈ 250).

## File 05_conclusions.md — CONCLUSIONS (≈ 900 words)
`# CONCLUSIONS` — 8–10 numbered conclusions, each with concrete numbers, mirroring the tasks; then
`## Practical recommendations` (5–6 numbered items) and `## Prospects for further research` (one paragraph:
nanoscale MC, measurements of the spectrum with a CdTe/Si detector, in vitro experiments, Au–Ag comparison).

## File 06_appendix.md — APPENDICES (≈ 900 words + code)
`# APPENDICES` with `## Appendix A. Source code of the spectrum model (fragments)` — short explanation then fenced code
blocks (```python) with the key functions of `xspec.py` (stopping_power, brems_dcs, sigma_K_gryzinski, TubeModel._compute
and _characteristic, def_factor) copied verbatim from the file (~170 lines in total);
`## Appendix B. Reproducibility` — list of scripts and what each produces (run_all.py, run_sweeps.py, mc_dose.py,
make_tables.py, figures.py), data sources and versions.

The REFERENCES section is generated automatically by the build (do not write it).
