# ANNOTATION

::: {custom-style="Annotation"}
The effectiveness of anticancer radiotherapy is still limited by the tolerance of healthy tissues, and one strategy to optimise the dose delivered in external radiotherapy is the use of radiosensitizers. This work studies the radio-enhancement effect of silver (Ag) in biological matter irradiated with kilovoltage x-rays and quantifies it by the dose enhancement factor (DEF). The spectrum of a 45 kV copper-anode x-ray tube needed for the DEF calculations is modelled as a function of the tube design, technical parameters and filters. To this end, a semi-analytical thick-target model with one fitted parameter, the developed model (DM), was created and validated against SpekPy v2. The DEF was calculated in the kerma approximation with NIST mass energy-absorption coefficients and verified by Monte Carlo photon transport.

For beams filtered with 1 mm Al, the DM reproduces the SpekPy half-value layer within 5 %, and with Al filters the DEF within 2 %. The unfiltered spectrum is dominated by the Cu K lines at 8.0–8.9 keV (68.5 % of the photons), so the DEF for 1 % Ag by mass is only 1.20 and remains within 1.19–1.21 when the anode angle, tube voltage or beryllium window is changed. Added filtration is the decisive parameter: 1 mm Al raises the DEF to 1.48 ± 0.02 (k = 1), 2 mm Al to 1.62 and 0.2 mm Cu to 1.80, while the air kerma decreases 120–1300-fold. At equal transmission, light and medium-Z filters (Al, Ti) are optimal, whereas filters with K-edges at 20–30 keV (Mo, Ag, Sn) are the least effective at strong filtration. The DEF increases with depth (beam hardening) and decreases inside a heavily loaded region (self-shielding); Monte Carlo calculations confirm these values within 1–10 %. Per unit mass, Ag is a weaker physical sensitizer than Au, Pt, Bi or Gd and is comparable to iodine. The xraylib 4.3.0 energy-absorption data for light elements were found to be up to 56 % too low, which would overestimate the DEF. The results support the choice of filtration and exposure conditions for experiments with Ag-containing radiosensitizers.

**Keywords:** x-ray tube spectrum; copper anode; bremsstrahlung; characteristic radiation; filtration; silver; radiosensitization; dose enhancement factor; kilovoltage x-rays; Monte Carlo method.
:::

# ANNOTATSIYA

::: {custom-style="Annotation"}
Saratonga qarshi nur terapiyasining samaradorligi hanuzgacha sog‘lom to‘qimalarning chidamliligi bilan cheklanib qolmoqda, masofaviy nur terapiyasida beriladigan dozani optimallashtirish strategiyalaridan biri esa radiosensibilizatorlardan foydalanishdir. Ushbu ishda kilovoltli rentgen nurlari bilan nurlantirilgan biologik muhitda kumushning (Ag) radiokuchayish effekti tadqiq qilinadi va u dozani kuchaytirish koeffitsiyenti (DEF) orqali miqdoriy baholanadi. DEFni hisoblash uchun zarur bo‘lgan 45 kV li mis anodli rentgen trubkasining spektri trubka konstruksiyasi, texnik parametrlari va filtrlariga bog‘liq holda modellashtiriladi. Shu maqsadda bitta moslashtirilgan parametrga ega bo‘lgan qalin nishon uchun yarim analitik model — ishlab chiqilgan model (IM) yaratildi va SpekPy v2 bilan solishtirish orqali validatsiya qilindi. DEF kerma yaqinlashuvida NIST massaviy energiya yutilish koeffitsiyentlari yordamida hisoblandi va fotonlar ko‘chishini Monte-Karlo usulida modellashtirish orqali verifikatsiya qilindi.

1 mm Al bilan filtrlangan dastalar uchun IM SpekPy yordamida hisoblangan yarim susaytirish qatlamini 5 % dan oshmaydigan farq bilan, Al filtrlar bilan esa DEFni 2 % dan oshmaydigan farq bilan takrorlaydi. Filtrlanmagan spektrda 8,0–8,9 keV dagi Cu K chiziqlari ustunlik qiladi (fotonlarning 68,5 % qismi), shu sababli massa bo‘yicha 1 % Ag uchun DEF atigi 1,20 ga teng bo‘lib, anod burchagi, trubka kuchlanishi yoki berilliy oyna o‘zgartirilganda 1,19–1,21 oralig‘ida qoladi. Qo‘shimcha filtrlash hal qiluvchi parametr hisoblanadi: 1 mm Al DEFni 1,48 ± 0,02 (k = 1) gacha, 2 mm Al 1,62 gacha, 0,2 mm Cu esa 1,80 gacha oshiradi, bunda havodagi kerma 120–1300 marta kamayadi. O‘tkazish koeffitsiyenti bir xil bo‘lganda yengil va o‘rtacha Z li filtrlar (Al, Ti) optimal hisoblanadi, K-chegaralari 20–30 keV da joylashgan filtrlar (Mo, Ag, Sn) esa kuchli filtrlashda eng kam samarali bo‘ladi. DEF chuqurlik ortishi bilan ortadi (dastaning qattiqlashishi) va Ag ko‘p kiritilgan soha ichida kamayadi (o‘z-o‘zini ekranlash); Monte-Karlo hisoblari bu qiymatlarni 1–10 % doirasida tasdiqlaydi. Massa birligiga nisbatan olinganda Ag Au, Pt, Bi yoki Gdga qaraganda kuchsizroq fizik sensibilizator bo‘lib, yod bilan taqqoslanarli. Yengil elementlar uchun xraylib 4.3.0 kutubxonasidagi energiya yutilish ma’lumotlarining 56 % gacha past baholanganligi aniqlandi, bu esa DEFning oshirib baholanishiga olib kelgan bo‘lar edi. Olingan natijalar Ag saqlovchi radiosensibilizatorlar bilan o‘tkaziladigan tajribalar uchun filtrlash va ekspozitsiya sharoitlarini tanlashga asos bo‘ladi.

**Kalit so‘zlar:** rentgen trubkasi spektri; mis anod; tormozlanish nurlanishi; xarakteristik nurlanish; filtrlash; kumush; radiosensibilizatsiya; dozani kuchaytirish koeffitsiyenti; kilovoltli rentgen nurlari; Monte-Karlo usuli.
:::

# АННОТАЦИЯ

::: {custom-style="Annotation"}
Эффективность противоопухолевой лучевой терапии по-прежнему ограничена толерантностью здоровых тканей, и одной из стратегий оптимизации дозы, подводимой при дистанционной лучевой терапии, является применение радиосенсибилизаторов. В работе исследуется эффект радиоусиления, обусловленный серебром (Ag), в биологической среде, облучаемой киловольтным рентгеновским излучением, и проводится его количественная оценка с помощью коэффициента усиления дозы (DEF). Необходимый для расчёта DEF спектр рентгеновской трубки с медным анодом, работающей при напряжении 45 кВ, моделируется в зависимости от конструкции трубки, её технических параметров и фильтров. С этой целью создана полуаналитическая модель толстой мишени с одним подгоночным параметром — разработанная модель (РМ) — и выполнена её валидация путём сравнения со SpekPy v2. DEF рассчитан в приближении кермы с использованием массовых коэффициентов поглощения энергии NIST и верифицирован моделированием переноса фотонов методом Монте-Карло.

Для пучков, отфильтрованных 1 мм Al, РМ воспроизводит слой половинного ослабления, рассчитанный SpekPy, с точностью до 5 %, а для пучков с алюминиевыми фильтрами — DEF с точностью до 2 %. В нефильтрованном спектре преобладают K-линии Cu с энергиями 8,0–8,9 кэВ (68,5 % фотонов), поэтому DEF при массовой доле Ag 1 % составляет лишь 1,20 и остаётся в пределах 1,19–1,21 при изменении угла анода, напряжения на трубке или бериллиевого окна. Решающим параметром является дополнительная фильтрация: фильтр 1 мм Al повышает DEF до 1,48 ± 0,02 (k = 1), 2 мм Al — до 1,62 и 0,2 мм Cu — до 1,80, при этом воздушная керма уменьшается в 120–1300 раз. При одинаковом пропускании оптимальны фильтры из лёгких элементов и элементов со средним Z (Al, Ti), тогда как фильтры с K-краями в области 20–30 кэВ (Mo, Ag, Sn) при сильной фильтрации наименее эффективны. DEF возрастает с глубиной (ужесточение пучка) и уменьшается внутри области с высоким содержанием серебра (самоэкранирование); расчёты методом Монте-Карло подтверждают эти значения в пределах 1–10 %. В расчёте на единицу массы Ag является более слабым физическим сенсибилизатором, чем Au, Pt, Bi или Gd, и сопоставимо с йодом. Установлено, что данные xraylib 4.3.0 о поглощении энергии для лёгких элементов занижены на величину до 56 %, что привело бы к завышению DEF. Полученные результаты служат обоснованием выбора фильтрации и условий облучения в экспериментах с серебросодержащими радиосенсибилизаторами.

**Ключевые слова:** спектр рентгеновской трубки; медный анод; тормозное излучение; характеристическое излучение; фильтрация; серебро; радиосенсибилизация; коэффициент усиления дозы; киловольтное рентгеновское излучение; метод Монте-Карло.
:::

# LIST OF ABBREVIATIONS AND SYMBOLS



| Abbreviation / symbol | Meaning |
|:---|:---|
| AAPM | American Association of Physicists in Medicine |
| AgNP | silver nanoparticle |
| ALARA | as low as reasonably achievable |
| AuNP | gold nanoparticle |
| BH-E | non-relativistic Bethe–Heitler bremsstrahlung cross-section with the Elwert factor |
| CPE | charged-particle equilibrium |
| CSDA | continuous-slowing-down approximation |
| DEF | dose enhancement factor |
| DM | developed model (the semi-analytical x-ray spectrum model of this work) |
| DNA | deoxyribonucleic acid |
| HVL | half-value layer (HVL1 and HVL2 are the first and second half-value layers) |
| IAEA | International Atomic Energy Agency |
| ICRU | International Commission on Radiation Units and Measurements |
| IEC | International Electrotechnical Commission |
| kVp | kilovolt peak (peak voltage of the x-ray tube) |
| MC | Monte Carlo (method) |
| NIST | National Institute of Standards and Technology (USA) |
| ROS | reactive oxygen species |
| RT | radiotherapy |
| SER | sensitizer enhancement ratio |
| TASMIP | tungsten anode spectral model using interpolating polynomials |
| TBC | Tucker–Barnes–Chakraborty spectrum model |
| $D$ | absorbed dose, Gy |
| $E$ | photon energy, keV |
| $\bar{E}$ | mean photon energy of a spectrum, keV |
| $E_K$ | K-shell binding energy (K absorption-edge energy), keV |
| $K$ | kerma (kinetic energy released per unit mass), Gy; $K_{\mathrm{air}}$ is the air kerma |
| $R(E)$, $\langle R\rangle$ | ratio of the $\mu_{en}/\rho$ of silver to that of tissue at energy $E$; its dose-weighted spectral mean |
| K$\alpha$, K$\beta$ | characteristic lines of the K series (transitions to the K shell from the L shell and from the M and N shells, respectively) |
| $S(T)$ | collision stopping power of the anode material for an electron of kinetic energy $T$; $S/\rho$ is the mass collision stopping power, MeV cm^2^/g |
| $T$ | kinetic energy of an electron, keV |
| $T_0$ | initial kinetic energy of the electrons at the anode, $T_0 = eU$ (maximum photon energy), keV |
| $U$ | tube voltage, kV |
| $w$ | mass fraction of silver (or of another high-Z element) in the tissue |
| $Z$ | atomic number |
| $\eta$ | electron depth factor, the single adjustable parameter of the DM |
| $\theta$ | anode angle (angle between the anode surface and the central ray of the beam) |
| $\mu$ | linear attenuation coefficient, cm^−1^ |
| $\mu/\rho$ | mass attenuation coefficient, cm^2^/g ($\rho$ is the density) |
| $\mu_{en}/\rho$ | mass energy-absorption coefficient, cm^2^/g |
| $\sigma_K$ | cross-section of K-shell ionisation by electron impact, b |
| $\Phi(E)$ | spectral photon fluence (photon fluence per unit energy interval) |
| $\Psi(E)$ | spectral energy fluence, $\Psi(E) = E\,\Phi(E)$ |
| $\omega_K$ | K-shell fluorescence yield |


# INTRODUCTION

**Relevance of the topic.** Cancer is a major cause of morbidity and mortality worldwide [1], and about half of patients have an indication for radiotherapy [2], whose effectiveness is limited by the tolerance of healthy tissues [3, 4]. The therapeutic window can be widened with radiosensitizers [5], notably heavy-metal compounds and nanoparticles, now studied intensively [6, 7]. Elements of high atomic number $Z$ absorb kilovoltage photons far more strongly than soft tissue owing to the photoelectric effect [8]. Combined with 250 kVp (kilovolt peak) x-rays, gold nanoparticles markedly prolonged survival of tumour-bearing mice [9], and dose enhancement by gold is much larger for kilovoltage than for megavoltage beams [10]. Silver nanoparticles (AgNPs) were proposed as a radiosensitizer for glioma [11] and outperformed gold nanoparticles (AuNPs) in vitro and in mice [12]; silver is also cheaper, and its K-edge at 25.514 keV lies inside the spectrum of a 45 kV x-ray tube.

The physical effect is quantified by the dose enhancement factor (DEF), the ratio of absorbed doses in tissue with and without silver. The silver-to-tissue ratio of mass energy-absorption coefficients is only 21–32 at 8–25 keV, about 76 at the Ag K-edge and 103–139 at 30–45 keV, so the DEF depends on the fraction of the photon energy fluence above the edge [10, 13]. The tube voltage and half-value layer (HVL) that usually specify kilovoltage beams [14] do not fix the spectrum around the edge, which must therefore be modelled [15]. Unlike tungsten-anode tubes [16, 17], a 45 kV copper-anode tube emits most photons of the unfiltered beam in the Cu K lines at 8.0–8.9 keV, far below the Ag K-edge. Since this spectrum, and hence the DEF, depends on tube design and filtration, modelling it is a relevant problem of medical physics.

**Degree of study of the problem.** Dose enhancement near high-Z media goes back to Spiers's analysis of energy absorption near irradiated bone [18]; iodine enhancement was later calculated for kilovoltage beams [19, 20] and used to treat brain metastases with a modified computed tomography scanner [21]. Gold nanoparticles have been studied in cells and by Monte Carlo (MC) simulation [22–25], their mechanisms reviewed [26–28] and elements compared across photon energies [13, 29]; the enhancement around nanoparticles is highly localised [30], which can explain biological effects beyond the macroscopic enhancement [31]. Radiosensitization by AgNPs was shown in cancer cells [32], glioma [33, 34], breast cancer cells [35] and colorectal cancer [36]. AgNPs are themselves cytotoxic and genotoxic, inducing reactive oxygen species [37], so part of their effect may be chemical or biological. Silver dosimetry was studied by MC for brachytherapy [38], tissues around a loaded tumour [39] and skin [40] and in dose gels [41]; depth-dependent enhancement in orthovoltage beams was examined in an MC phantom [42].

Spectrum models range from empirical [43] and semi-empirical [44, 45] to deterministic physics-based [46–48] and MC models [49, 50], mostly for tungsten anodes; SpekPy, validated against measurements [51], supports a copper anode in version 2 [15]. Copper-anode tubes serve mainly x-ray diffraction, with a nickel filter isolating Cu Kα [52], whereas silver needs photons above its K-edge. How the design and filtration of such a tube determine its spectrum and the DEF of silver-loaded tissue has therefore not been quantified in the literature reviewed.

**Aim of the work.** The aim is to model the spectrum of a 45 kV copper-anode x-ray tube as a function of its design parameters and filtration and thus to determine the DEF of silver-containing soft tissue and the filtration that maximises it at an acceptable dose rate.

**Tasks of the research.** The following tasks were solved:

1. To review the literature on radiosensitization by high-Z elements, especially silver, and on spectrum modelling.
2. To develop a semi-analytical thick-target spectrum model of a copper-anode tube including electron slowing-down, bremsstrahlung, direct and bremsstrahlung-induced K radiation, anode self-absorption and filtration.
3. To validate the model against SpekPy v2 and fit its single parameter.
4. To calculate the spectrum and beam quality versus anode angle, tube voltage, beryllium window and filters.
5. To calculate the DEF for 0.1–2 % silver by mass and find the filters that maximise it at an acceptable dose rate.
6. To study the depth dependence of the DEF and self-shielding, with independent MC verification.
7. To compare silver with other high-Z elements, estimate the DEF uncertainty and formulate experimental recommendations.

**Object of the research.** The object is the x-ray radiation of a 45 kV copper-anode tube and its interaction with silver-containing soft tissue.

**Subject of the research.** The subject is spectrum formation, its dependence on tube design and filtration, and the resulting DEF.

**Research methods.** The spectrum is calculated with the developed model (DM), a semi-analytical thick-target model based on the Bethe stopping power, the non-relativistic Bethe–Heitler cross-section with the Elwert factor and the Gryziński K-shell cross-section [53–57], with SpekPy v2.5.4 as the reference [58]. Interaction data come from the National Institute of Standards and Technology (NIST) tables [59] and xraylib [60], with the ICRU-44 soft tissue of the International Commission on Radiation Units and Measurements (ICRU) as the reference medium [61]. The DEF is calculated in the kerma approximation [62] and verified by an in-house MC photon-transport code with Woodcock tracking [63], Ag K fluorescence, coherent and incoherent scattering [64] and local electron energy deposition. Uncertainties are estimated by sensitivity analysis; the code uses Python with NumPy, SciPy and Matplotlib [65–67].

**Scientific novelty.** The novelty is as follows:

1. A semi-analytical spectrum model of a reflection-type copper-anode tube was developed, with one adjustable parameter (the electron depth factor $\eta$) and a closed-form description of bremsstrahlung-induced K radiation. With $\eta = 0.40$ (fitted to the SpekPy v2 bremsstrahlung shape, root-mean-square deviation 2.46 %), the DM reproduces without refitting the SpekPy HVL for 1 mm Al within −3.5 to −4.6 % and the mean energy within 0.54 keV at 25–50 kV and anode angles of 6–30°.
2. Without added filtration, the DEF for 1 % silver by mass is only 1.20 (1.19–1.21 for anode angles of 6–30°, 25–50 kV and beryllium windows of 0.15–2 mm), because Cu K lines and soft bremsstrahlung dominate the dose. Filtration is decisive: the DEF is 1.48 with 1 mm Al, 1.62 with 2 mm Al and 1.80 with 0.2 mm Cu, at the cost of a 120–1300-fold lower air kerma.
3. At equal air-kerma transmission, light and medium-Z filters without absorption edges at 9–45 keV (Al, Si, Ca, Sc, Ti) give the highest DEF and filters with K-edges at 20–30 keV (Mo, Ag, Sn) the lowest under strong filtration: at 0.1 % transmission, the DEF for 1 % silver is about 1.91 with Sc or Ti but 1.34 with Ag.
4. With 1 mm Al, the DEF for 1 % silver rises from 1.48 at the surface to 1.69 at 20 mm depth (beam hardening) but falls to 1.21 at 10 mm inside a uniformly loaded region (self-shielding); the dose behind a 10 mm layer with 1 % silver drops to about 0.80 of the silver-free value. An independent MC calculation confirmed these results within 1–10 % and showed the role of reabsorbed Ag K fluorescence and scattered photons.
5. Per unit mass, silver is a weaker physical sensitizer at 45 kV than gold, platinum, bismuth and gadolinium (DEF 1.48 against 2.16 for gold, 1 mm Al) and comparable to iodine (1.46); the stronger biological effect reported for AgNPs than for AuNPs [12] therefore points to chemical, biological and nanoscale mechanisms.

**Practical significance.** The DM software provides the spectrum, air kerma and beam quality of low-voltage copper-anode tubes for planning radiobiological experiments with silver. For a 45 kV tube, a 1–2 mm aluminium filter (or 0.1–0.3 mm titanium) is recommended; with aluminium, a tissue kerma of 2 Gy at the sample surface (10 cm from the focus, 40 mA) takes about 15–33 s. The CS_Energy function of xraylib 4.3.0 underestimates the mass energy-absorption coefficients of light elements at 15–45 keV by up to 56 % (carbon at 15 keV; oxygen by 37 % at 30 keV), which would overestimate the DEF (1.62 instead of 1.48 for 1 % silver and 1 mm Al), so the NIST tables should be used.

**Reliability of the results.** Reliability rests on evaluated data (NIST photon interaction tables [59], ICRU Report 37 stopping-power parameters [68]) and independent checks. The Bethe formula reproduces the NIST ESTAR collision stopping power of water at 50 keV (6.603 MeV cm^2^/g) [69], and the DM reproduces the SpekPy HVL for a tungsten anode at 50–100 kV within 6 %. The MC energy-transfer coefficients reproduce NIST mass energy-absorption coefficients of H, C and O at 20–40 keV within 0.3 %. The sensitivity analysis gives DEF = 1.48 ± 0.02 (coverage factor $k = 1$) for 1 % silver and 1 mm Al.

**Approbation of the results.** The results were reported at [to be completed by the author: conferences and seminars where the results were reported].

**Publications.** The results are published in [to be completed by the author: list of publications].

**Structure and volume of the dissertation.** The dissertation comprises annotations, a list of abbreviations, an introduction, three chapters, conclusions, references and appendices: 90 pages, 0 figures, 0 tables and 121 references. Chapter 1 reviews the literature, Chapter 2 presents the methods and Chapter 3 the results and discussion.


# CHAPTER 1. RADIOSENSITIZATION BY HIGH-Z ELEMENTS AND X-RAY SPECTRUM MODELING: LITERATURE REVIEW

## 1.1. Radiotherapy and the problem of normal-tissue tolerance

Against the background of the global cancer burden [1], radiotherapy (RT) is one of the principal treatment modalities [4], with an evidence-based optimal utilisation rate of approximately 52 % [2]. RT damages cellular deoxyribonucleic acid (DNA) directly through secondary electrons or indirectly through the free radicals of water radiolysis [3], but energy deposition is not selective, so healthy tissues in the beam are damaged as well. When the sigmoid dose–response curves for tumour control and normal-tissue complications lie close together (a small therapeutic ratio), normal-tissue toxicity becomes the main factor limiting RT [3, 4]. Hypoxic tumour cells, less sensitive to x-rays because of the oxygen effect, aggravate the problem [3].

Fractionation [3] and conformal, image-guided techniques such as intensity-modulated RT [17] spare normal tissue but do not change the ratio of the energy absorbed per unit mass in tumour and normal cells in the same beam region. Radiosensitizers, which act more on tumour than on normal cells, include oxygen mimetics such as the nitroimidazoles [5] and transition-metal compounds (platinum, gold, ruthenium) combining chemical and biological activity with heavy atoms [6]. Elements of high atomic number $Z$ (high-Z elements) act physically: concentrated in the tumour, they absorb more photon energy per unit mass than soft tissue, raising the tumour dose but not that of element-free surrounding tissue [7, 9]. The gain is expressed by the dose enhancement factor (DEF), the ratio of the doses in tissue with and without the agent (Section 2.6), which, unlike chemical sensitization, can be calculated from interaction data once the radiation field is known.

Monte Carlo (MC) calculations for gold nanoparticles showed a much larger macroscopic dose enhancement with kilovoltage than with megavoltage beams [10], because the strongly Z-dependent photoelectric effect dominates only at low energies (Section 1.2). Kilovoltage beams are used in superficial and orthovoltage therapy [17], and their dosimetry protocols specify the beam quality by the half-value layer (HVL) [14, 70]. The DEF therefore cannot be stated without the x-ray spectrum, which depends on the tube design and filtration; this work addresses the problem for silver and a 45 kV copper-anode tube.

## 1.2. Interaction of kilovoltage photons with biological matter

At energies up to 50 keV, photons interact through photoelectric absorption, incoherent (Compton) and coherent (Rayleigh) scattering; pair production (threshold $2m_ec^2 = 1.022$ MeV) is impossible [8, 62]. The mass attenuation coefficient is the sum of the partial coefficients [62, 71]:

$$\frac{\mu}{\rho} = \frac{\tau}{\rho} + \frac{\sigma_{\mathrm{coh}}}{\rho} + \frac{\sigma_{\mathrm{inc}}}{\rho}$$

EQNUM[1.1]


where $\mu$ is the linear attenuation coefficient, $\rho$ the density, and $\tau/\rho$, $\sigma_{\mathrm{coh}}/\rho$ and $\sigma_{\mathrm{inc}}/\rho$ the mass coefficients (cm²/g) of photoelectric absorption, coherent and incoherent scattering. Mixture coefficients are mass-fraction-weighted sums of elemental ones [62], taken from the National Institute of Standards and Technology (NIST) tables [59, 72]. In photoabsorption a bound electron, preferentially of the innermost accessible shell, is ejected with the photon energy $E$ minus its binding energy; between absorption edges [8]

$$\frac{\tau}{\rho} \propto \frac{Z^{3}}{E^{3}}$$

EQNUM[1.2]


where $Z$ is the atomic number of the absorber; the atomic cross-section scales as $Z^{4}/E^{3}$ [8, 62]. Per unit mass, a heavy element thus absorbs far more strongly than H, C, N and O, which make up almost all the mass of soft tissue [61]. Below its K-edge, however, the K-shell electrons cannot take part, and the advantage is much smaller than the atomic numbers suggest.

Absorption edges are abrupt increases of $\tau/\rho$ at the shell binding energies [8]; for silver the K-edge lies at 25.514 keV and the L-subshell edges between 3.35 and 3.81 keV. The vacancy is filled from an outer shell, with emission of a fluorescence x-ray or an Auger electron [73, 74]. The K-shell fluorescence yield $\omega_K$ rises steeply with $Z$ and equals 0.831 for silver (Table 2.2) [60, 74]. In H, C, N and O (K-shell binding energies below 1 keV) practically all the absorbed energy stays local, whereas silver re-emits much of it as Kα photons of about 22 keV with a mean free path of about 1.5 cm in soft tissue; its low-energy Auger electrons deposit their energy close to the atom (Section 1.3).

In Compton scattering at these energies the photon retains most of its energy [8, 62], and electron binding, described by the incoherent scattering function $S(x,Z)$, reduces the Klein–Nishina cross-section at low energies and small angles; Rayleigh scattering, described by the atomic form factor $F(x,Z)$ ($x$ is the momentum-transfer variable), only deflects the photon [64]. In soft tissue incoherent scattering overtakes photoabsorption in the upper part of the range, whereas in silver photoabsorption dominates throughout [8, 72]. The mass energy-absorption coefficient, tabulated by NIST from Seltzer's calculations [59, 75], counts only the energy transferred to charged particles and not re-emitted as bremsstrahlung [62]:

$$\frac{\mu_{en}}{\rho} = \left[\frac{\tau}{\rho}\left(1-\frac{X}{E}\right) + \frac{\sigma_{\mathrm{inc}}}{\rho}\,\frac{\bar{T}_{\mathrm{inc}}}{E}\right]\left(1-\bar{g}\right)$$

EQNUM[1.3]


where $X$ is the mean fluorescence energy emitted per photoabsorption, $\bar{T}_{\mathrm{inc}}$ the mean kinetic energy of the Compton recoil electron and $\bar{g}$ the mean fraction of the secondary-electron kinetic energy converted into bremsstrahlung, negligible here; other symbols are as in (1.1) [62].

According to the International Commission on Radiation Units and Measurements (ICRU), kerma $K$ is the total initial kinetic energy of the charged particles liberated by photons per unit mass, the collision kerma $K_{\mathrm{col}}$ its part not converted into bremsstrahlung, and the absorbed dose $D$ the mean energy imparted per unit mass [62, 76]. Under charged-particle equilibrium (CPE), when the charged-particle energy entering a small volume equals that leaving it, the absorbed dose equals the collision kerma [62, 71]:

$$D = K_{\mathrm{col}} = \Psi\,\frac{\mu_{en}}{\rho}$$

EQNUM[1.4]


where $\Psi = \Phi E$ is the energy fluence of monoenergetic photons of energy $E$ and fluence $\Phi$; for a polyenergetic beam the expression is integrated over the spectrum (Section 2.5). Secondary electrons from photons below 50 keV have sub-millimetre ranges in tissue, so CPE holds except close to boundaries, and by the Fano theorem it is not disturbed by density variations in a medium of uniform composition [77]. Two media in the same spectrum therefore receive doses in the ratio of their spectrum-averaged $\mu_{en}/\rho$, which underlies the macroscopic, kerma-based DEF (Section 2.6); the relation fails only within the electron ranges from a high-Z inclusion.

Fig. 1.1 compares the NIST coefficients [59] of silver and ICRU-44 soft tissue [61]. Above the L-edges both coefficients of silver exceed those of tissue by more than an order of magnitude, the ratio of the $\mu_{en}/\rho$ values rising from 21.1 at 8 keV to 31.9 at 25 keV. At the K-edge $\mu/\rho$ of silver jumps 5.8-fold (from 9.53 to 55.4 cm²/g) but $\mu_{en}/\rho$ only 2.4-fold (from 8.53 to 20.3 cm²/g). The reason is K-shell fluorescence: after most K-shell photoabsorptions the K x-ray energy escapes the interaction site and is excluded from $\mu_{en}/\rho$.



![Fig. 1.1. Mass attenuation (solid) and mass energy-absorption (dashed) coefficients of silver and ICRU-44 soft tissue at 1–50 keV (NIST data). The vertical dashed line marks the Ag K-edge at 25.51 keV, the arrow the Ag L-subshell edges.](/home/user/atlant-impossible/dissertation/code/../figures/en/fig02_coeffs.png){width=13.5cm}



For tissue the two coefficients diverge above about 10 keV, as scattering, which deposits little energy, gains weight. Above the K-edge, $\mu_{en}/\rho$ of silver falls more slowly than its $\mu/\rho$, since the fixed fluorescence energy becomes a smaller fraction of the photon energy, and more slowly than that of tissue. After the jump at the edge from about 32 to about 76, the silver-to-tissue ratio therefore keeps growing, to 102.8 at 30 keV, 120.1 at 35 keV and a maximum of about 139 at 40–45 keV. The fraction of the energy fluence above the Ag K-edge is thus the key beam characteristic for silver.

## 1.3. High-Z radiosensitizers: from iodine contrast to metal nanoparticles

Spiers first analysed how increased energy absorption in bone and secondary-electron ranges determine the soft-tissue dose in and near bone [18], and Das and Chopra quantified the backscatter dose perturbation at tissue–high-Z interfaces in kilovoltage beams [78]. Iodinated contrast media, the first agents studied systematically, sensitized cultured mammalian cells to x-rays but not to gamma rays [79], implicating photoabsorption by iodine. Dose enhancement in iodine-loaded tumours was calculated for kilovoltage x-rays [19] and brain-tumour therapy [20], and a therapy-modified computed tomography scanner delivered the first such treatment of human brain metastases [21]. Monochromatic synchrotron beams treated rats bearing iodine-loaded F98 gliomas [80] and identified the optimal energy for iodinated compounds in cells [81]; contrast-enhanced kilovoltage RT was analysed by MC [82], and modified megavoltage beams were combined with iodine and gadolinium contrast [83]. Platinum drugs add a high-Z atom to a chemotherapeutic agent: cisplatin combined with monochromatic synchrotron x-rays exploiting platinum K-edge photoactivation cured rats bearing radioresistant F98 gliomas [84]. Pignol et al. analysed inner-shell ionisation and Auger cascades in radiosensitization by halogenated deoxyuridines, platinum salts and gadolinium porphyrins [85]; when the heavy atom lies in or near DNA, short-range Auger electrons deposit their energy at this critical target, so the subcellular location of the high-Z atom matters, not only its concentration.

The modern stage began when gold nanoparticles (AuNPs) 1.9 nm in diameter markedly improved the one-year survival of tumour-bearing mice irradiated with 250 kVp (kilovolt peak) x-rays [9], and the key parameters of efficacy (material, size, coating, photon energy) have since been analysed systematically [86]. In vitro, AuNP radiosensitization was shown with superficial and orthovoltage [23, 87] and monoenergetic synchrotron beams [88]; uptake and radiosensitization depend on particle size [22], and DNA experiments identified photon energy, size and concentration as governing parameters [89]. Reviews [90–94] and a clinical roadmap [28] summarise these results.

The physics has been studied mainly by MC simulation [10]: the tumour-selective enhancement was quantified for various photon sources [24] and therapeutic beams [95], and kilovoltage energies proved optimal for AuNP-enhanced arc therapy [96]. Radiosensitization also depends on nanoparticle location [97]; microscopically, the enhancement is highly localised [30], and Geant4 simulations characterised the spatial distribution of the secondary electrons [25]. Radio-enhancement, however, is not a mere dose increase: it comprises a physical stage (additional photon absorption; emission of photoelectrons, Auger electrons and fluorescence), a chemical stage (production of reactive oxygen species, ROS) and a biological stage (oxidative stress, cell-cycle perturbation, inhibition of DNA repair) [7, 26, 27, 98]. With a local effect model, McMahon et al. showed that highly inhomogeneous nanoscale energy deposition near heavy-atom nanoparticles can explain a sensitizer enhancement ratio (SER) in cells exceeding the macroscopic DEF [31], which nevertheless remains the baseline for separating the physical contribution from the chemical and biological ones.

Although gold dominates the literature, the optimal element has been sought through kerma-based comparisons over photon energy [13] and physical modelling [29]. In the kerma approximation the comparison reduces to the ratio $R(E)$ of the $\mu_{en}/\rho$ of the element to that of tissue, since tissue containing a mass fraction $w$ of the element has, at photon energy $E$, a DEF of $1 + w\,[R(E) - 1]$ (Section 2.6). Fig. 1.2 shows $R(E)$ for Ag, I, Gd, Pt, Au and Bi at 5–45 keV, covering practically the whole spectrum of the 45 kV tube.



![Fig. 1.2. Ratio of the mass energy-absorption coefficients of Ag, I, Gd, Pt, Au and Bi to that of ICRU-44 soft tissue at 5–45 keV (NIST data). The vertical dashed line marks the Ag K-edge at 25.51 keV.](/home/user/atlant-impossible/dissertation/code/../figures/en/fig03_ratio.png){width=13.5cm}



Below about 12 keV the ratios for silver, platinum, gold and bismuth are similar and that for iodine is somewhat higher. Above its L-edges (7.2–8.4 keV) and up to about 13 keV gadolinium leads, absorbing the Cu Kα lines at about 8.0 keV particularly efficiently. The L-edges of platinum, gold and bismuth at about 12–16 keV raise their ratios several-fold, leaving silver the lowest of the six between about 12 and 25.5 keV. Above its K-edge silver first equals and then exceeds gadolinium (K-edge 50.239 keV, above the maximum photon energy) and exceeds iodine up to about 42 keV, above the iodine K-edge (33.169 keV) only slightly. At 40–45 keV iodine, platinum and silver become comparable, while gold and bismuth remain the highest.

Two conclusions follow. First, per unit mass silver should be a weaker physical sensitizer than platinum, gold and bismuth, and it surpasses iodine only above its K-edge and gadolinium only above its K-edge and below the L3 edge of gadolinium (7.2 keV), so its ranking depends on the spectrum. Second, as its ratio to tissue rises from 21–32 between 8 keV and the edge (which includes the Cu K lines at 8.0–8.9 keV) to 76–139 above it, the tube design parameters and especially the filtration, which redistribute the energy fluence relative to 25.514 keV, are expected to be decisive for the DEF, as tested in Chapter 3.


## 1.4. Silver and silver nanoparticles as radiosensitizers

Silver ($Z = 47$) lies between the light elements of soft tissue and the heavy elements, such as gold ($Z = 79$), that dominate the literature on high-Z radiosensitizers. Reviews cover the synthesis, properties and therapeutic applications of silver nanoparticles (AgNPs) [99] and their antimicrobial and anticancer uses [100]; AgNPs are cheaper than gold and can be made by green synthesis, for example in egg white [101]. For radiotherapy, two properties of silver matter: its biological activity and the position of its K-edge within kilovoltage tube spectra. The former is linked to toxicity: AgNPs are cytotoxic and genotoxic in human cells, inducing ROS, DNA damage and cell-cycle arrest with mitochondrial involvement [37]. Such effects belong to the chemical and biological stages of radio-enhancement (Section 1.3) [7, 98], so AgNPs may sensitize cells beyond their physical dose enhancement. Their cytotoxicity, however, makes selective tumour accumulation a prerequisite of therapy, and the effect of dose enhancement on healthy tissues must be assessed [39].

Experimental evidence is summarised in Table 1.1: since the early report by Xu et al. [32], glioma has been the most studied model [11, 12, 33, 34], including radioresistant hypoxic cells [3]; breast [35] and colorectal [36] cancers have also been used. The studies differ in particles, coatings, biological models and irradiation conditions and are not quantitatively comparable. Because the physical dose enhancement depends strongly on the spectrum (Section 1.3), an enhancement ratio reported without the spectrum cannot be split into physical and non-physical parts.

Table: Table 1.1. Studies of silver nanoparticles as radiosensitizers.

| Study | System / radiation type | Main finding |
|:---|:---|:---|
| Xu et al., 2009 [32] | Cancer cells / ionising radiation | Sensitized cell killing (early report) |
| Lu et al., 2012 [101] | Cancer cells / radiation | Biocompatible green-synthesised AgNPs enhanced radiation effects |
| Liu et al., 2013 [11] | Glioma in vitro and in vivo | Proposed as an alternative to gold |
| Swanner et al., 2015 [35] | Triple-negative and other breast cells | Effects differed between cell types |
| Liu et al., 2016 [12] | U251 glioma; intracranial mouse model | Outperformed AuNPs |
| Liu et al., 2018 [33] | Hypoxic glioma cells / radiotherapy | Efficacy enhanced under hypoxia |
| Zhao et al., 2019 [34] | Glioma / irradiation therapy | Polyethylene glycol and aptamer AS1411 enhanced the effect |
| Habiba et al., 2019 [36] | Colorectal cancer / radiotherapy | Graphene-decorated silver nanoprisms as radiosensitizers |

The reported advantage of AgNPs over AuNPs [12] is instructive. Per unit mass, silver and gold absorb photon energy comparably below about 12 keV, but gold absorbs more strongly between about 12 and 45 keV (Fig. 1.2), and in megavoltage beams the macroscopic enhancement is much smaller even for gold [10] because Compton scattering, whose mass coefficient depends only weakly on $Z$, dominates [8]. A larger macroscopic physical dose enhancement is thus unlikely to explain the advantage of silver, either below 45 keV or at megavoltage energies. This points to substantial contributions from the chemical and biological activity of silver [37] and from nanoscale energy deposition [31]; confirming this requires quantifying the physical part for a well-defined beam.

Dosimetric studies of silver are fewer than biological ones: MC simulations addressed AgNPs in a brain tumour during brachytherapy [38], surrounding healthy tissues [39] and silver versus gold in layered skin [40]; dose enhancement was also measured in AgNP-enriched dose gels [41], and its depth dependence in orthovoltage beams was studied for nanoparticles [42]. A systematic analysis of how kilovoltage tube design and filtration determine the DEF of silver-loaded tissue has not been found in the literature reviewed.

The choice of beam follows from the atomic data of silver (Table 2.2): K-edge 25.514 keV, L3 edge 3.351 keV and Kα1 line 22.163 keV. With $\omega_K = 0.831$, only about 17 % of K vacancies relax by Auger transitions that deposit their energy locally [73, 74]; the other 83 % emit mainly Kα photons that carry their energy away (Section 1.2). Nevertheless, the silver-to-tissue ratio of $\mu_{en}/\rho$ is 76–139 above the edge, against 21–32 between 8 keV and the edge (Sections 1.2 and 1.3). Unlike the gold K-edge (80.725 keV), usable only above about 81 kV, the silver K-edge lies inside the spectrum of any tube operated above about 26 kV. The most favourable spectra therefore carry much of their energy fluence between the Ag K-edge and the end-point energy (45 keV here), far above the Cu K lines at 8.0–8.9 keV that dominate the photon fluence of the unfiltered copper-anode beam.

## 1.5. Methods of modelling x-ray tube spectra

Measuring the spectrum needed for the DEF with semiconductor detectors [44] requires detector-response corrections and is impractical for every configuration, so parametric studies use calculated spectra; four groups of methods are compared in Table 1.2. The empirical model TASMIP (tungsten anode spectral model using interpolating polynomials) interpolates measured tungsten-anode spectra from 30 to 140 kV [43], and the spektr 3.0 tool implements a similar interpolation model [102]. Such models are tied to the anode material, angle and inherent filtration of the measured tubes: added filtration can be modelled as attenuation, but the anode material and angle, studied in this work, cannot.

Semi-empirical models go back to Kramers' theory, in which the energy emitted from a thick target per unit photon-energy interval is proportional to $Z(T_0 - E)$, where $Z$ is the target atomic number, $T_0$ the initial electron kinetic energy and $E$ the photon energy [8, 103]. Birch and Marshall compared their model with Ge(Li) detector measurements [44], and Tucker, Barnes and Chakraborty proposed the TBC model for tungsten [45]. Such models combine a simplified bremsstrahlung cross-section with approximate electron penetration and target self-absorption; they show the dependence on voltage, anode angle and filtration explicitly, but their fitted parameters are target-specific, usually for tungsten.

Physics-based deterministic models replace most empirical parameters with theoretical or MC-derived data. MC-derived electron-penetration characteristics [46] were used to calculate x-ray production and filtration in the target [47] and implemented for tungsten in SpekCalc [48]. SpekPy v2, its successor, offers several physics models, including the casim model used here, and several anodes, including copper [15], available for 10–50 kV in version 2.5.4 [58]. It builds on models of K and L emission [104] and of bremsstrahlung energy and angular distributions [105], validated from 20 to 300 kV [106] and against measured spectra and HVLs [51].

MC simulation of coupled electron–photon transport in the tube gives the most complete description, for example MCNP4C for diagnostic and mammography spectra [50] or EGS4/BEAM for kilovoltage radiotherapy units [49]; other general-purpose codes are EGSnrc [107], Geant4 [108] and PENELOPE [109]. It includes electron backscattering, the bremsstrahlung angular distribution and the real tube geometry, but is slow and needs detailed geometric data, so it suits benchmarks rather than extensive parametric studies.

Table: Table 1.2. Comparison of x-ray spectrum modelling approaches.

| Approach | Examples | Advantages | Limitations |
|:---|:---|:---|:---|
| Empirical | TASMIP [43]; spektr 3.0 [102] | Fast; accurate within the data range | Fixed anode material, angle and filtration |
| Semi-empirical | Kramers [103]; Birch–Marshall [44]; TBC [45] | Simple; explicit parameter dependence | Simplified physics; fitted parameters, mostly tungsten |
| Physics-based deterministic | SpekCalc [48]; SpekPy v2 [15]; developed model (this work) | Fast; physically founded; few parameters | Approximate electron transport; limited anodes and voltages |
| Monte Carlo | MCNP4C [50]; EGS4/BEAM, EGSnrc [49, 107]; Geant4 [108]; PENELOPE [109] | Most complete physics; real tube geometry | Slow; detailed geometry needed; statistical noise |

In kilovoltage dosimetry, beam quality is specified by the HVL together with the tube voltage [110], as in the protocol of the American Association of Physicists in Medicine for 40–300 kV beams (AAPM TG-61) [14], the TRS-398 code of practice of the International Atomic Energy Agency (IAEA) [70] and the standard radiation qualities of the International Electrotechnical Commission (IEC 61267) [111]. The HVL is thus the natural quantity for comparing models and measurements. It does not, however, fix the energy-fluence fraction above the Ag K-edge, so beams with similar HVLs can give different DEFs for silver, as Chapter 3 shows for filters with absorption edges (Table 3.5).

Most of these models were developed for tungsten, the usual target of medical tubes [16]. Copper-anode tubes serve mainly x-ray diffraction, where Cu Kα is the working line, Kβ is suppressed by a nickel filter [52] and the bremsstrahlung continuum is unwanted background. For silver dose enhancement, by contrast, the continuum is the useful part, since only bremsstrahlung photons can exceed the Ag K-edge; yet the full spectrum of copper-anode tubes and its dependence on tube parameters have received much less attention. This work therefore constructed a semi-analytical physics-based model of the copper-anode tube, the developed model (DM), combining the Bethe collision stopping power in the continuous slowing-down approximation (CSDA) [53, 68], the non-relativistic Bethe–Heitler bremsstrahlung cross-section with the Elwert factor [54–56] and the Gryziński K-shell ionisation cross-section [57], with one adjustable parameter, the electron depth factor (Chapter 2). All dependences on tube parameters remain explicit.

## 1.6. Conclusions to Chapter 1

The physical dose enhancement by a high-Z element in kilovoltage beams is governed by its mass energy-absorption coefficient relative to that of tissue, which for silver rises sharply above the K-edge at 25.514 keV; the physical efficacy of silver is thus set mainly by the fraction of the energy fluence above this edge, and a DEF is meaningful only together with its spectrum. AgNPs radiosensitize glioma, breast and colorectal cancer models, in one study more effectively than AuNPs, and are themselves cytotoxic and generate ROS. However, the macroscopic physical contribution of silver for a well-characterised kilovoltage beam, needed to separate physical from chemical and biological effects, has not been determined systematically.

Spectrum models have been developed mainly for tungsten anodes. This work therefore develops a semi-analytical model of the 45 kV copper-anode tube spectrum, validates it against SpekPy v2, and uses both models to calculate the spectrum versus tube design and filtration and the DEF of silver-loaded soft tissue versus concentration, depth and filtration. The results are verified by MC simulation, silver is compared with other high-Z elements, and the DEF uncertainty is estimated as a basis for practical recommendations.


# CHAPTER 2. PHYSICAL MODEL OF THE X-RAY SPECTRUM AND METHODS OF DOSE-ENHANCEMENT CALCULATION

This chapter presents the semi-analytical developed model (DM) of the spectrum and the methods of calculating the dose enhancement factor (DEF) and its Monte Carlo (MC) verification, as implemented in the code (Appendix A), with energies in keV and lengths in cm unless stated otherwise.

## 2.1. Design and technical parameters of an x-ray tube with a copper anode

Electrons from the heated cathode are focused onto the anode focal spot, which they reach with the kinetic energy $T_0 = eU$, where $U$ is the tube voltage and $e$ the elementary charge (45 keV in the baseline); only a small fraction of this energy is emitted as x-rays [8, 16]. The photon number is proportional to the tube current–time product (mAs), while the spectral shape is independent of the current, so all spectra are normalised to 1 mAs. In the modelled reflection-target tube (Fig. 2.1), the beam leaves through the electron-irradiated face of the thick anode. The anode angle $\theta$ between the anode surface and the central ray, which is perpendicular to the electron beam, is thus both the angle of electron incidence to the surface normal and the photon take-off angle. A small $\theta$ reduces the effective focal spot but makes the beam on the anode side weaker and harder (heel effect) [16]; the DM treats the central ray only. The beryllium window and anode self-absorption form the inherent filtration; added metal filters remove the soft part of the spectrum and harden the beam [17] before the photons cross the air gap to the sample at the focus–sample distance $r$.



![Fig. 2.1. Modelled reflection-target copper-anode tube and irradiation geometry: central-ray photons emitted at the anode angle θ pass the beryllium window, the added filter and the air gap (focus–sample distance d, denoted r in the text) to the Ag-containing tissue sample.](/home/user/atlant-impossible/dissertation/code/../figures/en/fig01_tube.png){width=13.5cm}



Copper-anode tubes are standard x-ray diffraction sources, which use the intense Cu Kα line and suppress Kβ with a nickel filter whose K-edge lies between the two lines [52]. For irradiations with silver, however, the useful photons lie above the Ag K-edge at 25.514 keV (Section 1.4), in the continuum that diffraction treats as background, so the whole spectrum must be modelled and shaped by filtration; as most spectrum models were developed for tungsten anodes (Section 1.5), a dedicated copper-anode model is required. Table 2.1 lists the tube parameters, their baseline values and the ranges studied in Chapter 3; the voltage, anode, anode angle, window and filters change the spectral shape, whereas the distance acts through the inverse-square law and the air attenuation. A constant potential is assumed, so all electrons arrive with the energy $T_0$.



Table: Table 2.1. Baseline design and technical parameters of the modelled X-ray tube

| Parameter | Value | Range studied |
|:---|---:|---:|
| Tube voltage (constant potential) | 45 kV | 20–50 kV (SpekPy), up to 80 kV (model) |
| Anode (target) material | Cu, Z = 29, ρ = 8.96 g/cm³ | W (validation) |
| Anode angle θ (central-ray take-off angle) | 12° | 6–30° |
| Beryllium window thickness | 0.5 mm | 0.15–2.0 mm |
| Focus–sample distance (air path) | 10 cm | – |
| Tube current | 40 mA | – |
| Added filters | none | Al 0.25–6 mm; Ti, Ni, Cu, Mo, Ag, Sn; 43 elements Z = 13–83 |
| Energy bin width | 0.05 keV | – |



## 2.2. Electron slowing-down in the anode

Neglecting radiative losses, the DM uses the continuous-slowing-down approximation (CSDA) with the Bethe mass collision stopping power [53] in the form of Report 37 of the International Commission on Radiation Units and Measurements (ICRU) [68]:

$$\frac{S(T)}{\rho} = \frac{\kappa}{2}\,\frac{Z}{A}\,\frac{1}{\beta^{2}}\left[\ln\frac{\tau^{2}(\tau + 2)}{2\,(I/m_ec^{2})^{2}} + F^{-}(\tau)\right]$$

EQNUM[2.1]


where $S(T)$ is the linear collision stopping power at the electron kinetic energy $T$, $\rho$ the density of the anode, $\kappa = 4\pi N_A r_e^{2} m_ec^{2} = 0.307075$ MeV cm²/mol, $N_A$ the Avogadro constant, $r_e$ the classical electron radius, $m_ec^{2}$ = 510.999 keV the electron rest energy, $Z$ and $A$ the atomic number and molar mass (g/mol) of the anode, $\tau = T/m_ec^{2}$, $\beta$ the electron velocity in units of the speed of light, $\beta^{2} = 1 - (1 + \tau)^{-2}$, $I$ the mean excitation energy, and $F^{-}(\tau)$ the electron term derived from the Møller cross-section:

$$F^{-}(\tau) = 1 - \beta^{2} + \frac{\tau^{2}/8 - (2\tau + 1)\ln 2}{(\tau + 1)^{2}}$$

EQNUM[2.2]


For copper $I$ = 322 eV; the density-effect correction (negligible below 100 keV) and the shell corrections (relevant only at the lowest energies) are omitted; for water the code reproduces the ESTAR stopping power of the National Institute of Standards and Technology (NIST) [69] (Section 2.8). The path length travelled from $T_0$ to $T$ is

$$s(T) = \int_{T}^{T_0} \frac{\mathrm{d}T'}{S(T')}$$

EQNUM[2.3]


where $T'$ is the integration variable. Evaluated by the trapezoidal rule (step 0.02 keV) down to $T_{\min}$ = 1 keV, it gives practically the CSDA range, 6.48 µm for 45 keV electrons in copper. A constant logarithm in (2.1) and $\beta^{2} \approx 2T/m_ec^{2}$ give $S \propto 1/T$, and (2.3) then yields $T_0^{2} - T^{2} \propto s$, the empirical Thomson–Whiddington law [112]. Since multiple elastic scattering makes the electrons diffuse, the CSDA path is not the photon production depth; instead of the MC-derived penetration distributions of Poludniowski and Evans [46], the DM uses one mean depth for each electron energy, the projected depth

$$d(T) = \eta\, s(T)\cos\theta$$

EQNUM[2.4]


where $d(T)$ is the depth (along the normal) at which the electron has slowed down to $T$, $\eta$ is the electron depth factor ($\eta = 1$ for straight-line motion, $\eta < 1$ for diffusion), and $\theta$ is the angle of incidence. This single adjustable parameter of the DM was fitted to the bremsstrahlung shape of SpekPy [15] (Section 2.8), which gave $\eta$ = 0.40 and a maximum projected depth of 2.54 µm for 45 keV electrons at $\theta$ = 12°. Backscattering (about 30 % of the electrons in copper) is not modelled, contributing to the overestimated absolute output (Section 3.1). As panel (a) of Fig. 2.2 shows, the stopping power rises steeply as the electron slows down, so the depth grows rapidly as the energy falls from 45 to about 20 keV and then saturates. Photons close to $T_0$ are therefore emitted only near the surface, whereas soft photons are produced along the whole path and suffer most from self-absorption.



![Fig. 2.2. Electron slowing-down and K-shell ionisation in the copper anode: (a) Bethe collision stopping power (solid, left axis) and projected depth at which a 45 keV electron has slowed down to T, for η = 0.40 and θ = 12° (dashed, right axis); (b) Gryziński K-shell ionisation cross-section.](/home/user/atlant-impossible/dissertation/code/../figures/en/fig04_electron.png){width=13.5cm}



## 2.3. Bremsstrahlung production in a thick target

Kramers' classical theory of the continuous spectrum [103] gives the cross-section

$$\frac{\mathrm{d}\sigma_{\mathrm{Kr}}}{\mathrm{d}E} = \frac{16\pi}{3\sqrt{3}}\,\frac{\alpha Z^{2} r_e^{2}}{\beta_0^{2}\,E}$$

EQNUM[2.5]


where $\mathrm{d}\sigma_{\mathrm{Kr}}/\mathrm{d}E$ is the cross-section per atom per unit photon energy (cm²/keV) for $E < T$ (zero otherwise), $\alpha$ the fine-structure constant, and $\beta_0$ the velocity of an electron of energy $T$ in units of the speed of light. With $\beta_0^{2} \propto T$ and $S \propto 1/T$, integration over the slowing-down yields Kramers' law (Section 1.5), an energy spectrum proportional to $Z(T_0 - E)$. The DM retains it only as an option, using by default the non-relativistic, unscreened Born-approximation cross-section of Bethe and Heitler [54] as compiled by Koch and Motz [56]:

$$\frac{\mathrm{d}\sigma_{\mathrm{B}}}{\mathrm{d}E} = \frac{16}{3}\,\frac{\alpha Z^{2} r_e^{2}}{\beta_0^{2}\,E}\,\ln\frac{p_0 + p}{p_0 - p}$$

EQNUM[2.6]


where $p_0$ and $p$ are the electron momenta before and after the emission, $p_0c = \sqrt{T(T + 2m_ec^{2})}$ and $pc = \sqrt{(T - E)(T - E + 2m_ec^{2})}$. The Born approximation requires $2\pi Z\alpha/\beta_0 \ll 1$ and $2\pi Z\alpha/\beta \ll 1$, $\beta$ being the electron velocity after the emission [56], whereas for copper $2\pi Z\alpha/\beta_0$ exceeds 3 even at 45 keV. The error is partly corrected by the Elwert factor for the Coulomb distortion of the electron wave functions [55]:

$$f_E = \frac{\beta_0}{\beta}\,\frac{1 - \exp(-2\pi Z\alpha/\beta_0)}{1 - \exp(-2\pi Z\alpha/\beta)}$$

EQNUM[2.7]


The DM uses the product $\mathrm{d}\sigma/\mathrm{d}E = f_E\,\mathrm{d}\sigma_{\mathrm{B}}/\mathrm{d}E$ (BH-E). As $E \to T$, (2.6) vanishes while $f_E$ grows as $1/\beta$, so BH-E remains finite at the high-energy end. Unlike the tabulated cross-sections of Seltzer and Berger [113], BH-E neglects atomic screening and electron–electron bremsstrahlung, contributing to the overestimated absolute yield of hard bremsstrahlung relative to SpekPy. The DEF, however, depends only on the spectral shape, which is reproduced at 45 kV with a root-mean-square deviation of 2.46 % after the fit of $\eta$ (Section 3.1).

In a thick target the electron passes $n_a\,\mathrm{d}T/S(T)$ atoms per unit area while losing the energy $\mathrm{d}T$, and a photon produced at the depth $d(T)$ is attenuated along the exit path $d(T)/\sin\theta$. Assuming isotropic emission, the number of bremsstrahlung photons per unit energy interval, per steradian and per incident electron along the central ray is

$$N_b(E) = \frac{1}{4\pi}\int_{E}^{T_0} \frac{n_a}{S(T)}\,\frac{\mathrm{d}\sigma}{\mathrm{d}E}(T, E)\,\exp\left[-\frac{\mu(E)\,d(T)}{\sin\theta}\right]\mathrm{d}T$$

EQNUM[2.8]


where $n_a = \rho N_A/A$ is the number of atoms per unit volume of the anode, $\mathrm{d}\sigma/\mathrm{d}E$ the BH-E cross-section, and $\mu(E)$ the linear attenuation coefficient of the anode from the xraylib library [60]. Without the exponential and the factor $1/4\pi$, it gives the generated spectrum $N_g(E)$, emitted in all directions. The integrals are evaluated by the trapezoidal rule in photon bins of 0.05 keV; a similar formulation with MC-derived penetration data underlies SpekCalc [46, 47]. The self-absorption grows as $\theta$ decreases and is strongest for soft photons and just above the copper K-edge. Multiple scattering smooths the anisotropy of single-interaction bremsstrahlung, but the isotropic approximation, avoided by more detailed models [105], remains a limitation of the DM (Section 3.11).

## 2.4. Characteristic radiation

An electron with an energy above the K-shell binding energy $E_K$ (8.979 keV for copper) can ionise the K shell; the vacancy is filled by emitting either a characteristic photon, with the probability $\omega_K$ (the fluorescence yield, 0.454 for copper), or an Auger electron [73, 74]. The DM includes the four strongest lines, K$\alpha_1$ (K–L~3~, 8.048 keV), K$\alpha_2$ (K–L~2~, 8.028 keV), K$\beta_1$ (K–M~3~) and K$\beta_3$ (K–M~2~), the last two at 8.905 keV, with relative intensities $p_j$ (radiative rates normalised over the four lines) of 0.583, 0.299, 0.078 and 0.040; the copper L lines (below 1 keV) are absorbed in the window. K vacancies arise directly from electron impact and indirectly from the absorption of bremsstrahlung photons above $E_K$. The K-shell ionisation cross-section is Gryziński's binary-encounter formula [57]:

$$\sigma_K(T) = \frac{\pi e^{4} n_K}{E_K^{2}}\,\frac{1}{U_K}\left(\frac{U_K - 1}{U_K + 1}\right)^{3/2}\left[1 + \frac{2}{3}\left(1 - \frac{1}{2U_K}\right)\ln\left(2.7 + \sqrt{U_K - 1}\right)\right]$$

EQNUM[2.9]


where $U_K = T/E_K$ is the overvoltage ratio ($\sigma_K = 0$ for $U_K \le 1$), $n_K = 2$ the number of K-shell electrons, and $\pi e^{4} = 6.5141\times10^{-20}$ cm² keV² in Gaussian units. For copper the cross-section has a broad maximum of about 351 b near 35 keV (panel (b) of Fig. 2.2), and integration of $n_a\sigma_K/S$ over the slowing-down gives 0.0159 K ionisations per incident 45 keV electron. Because the Gryziński formula rises too slowly near the threshold, the DM underestimates the Cu K-line intensity by about 26–43 % relative to SpekPy, whose model of K and L emission [104] relies on distorted-wave Born calculations [114], reviewed together with experimental data by Llovet et al. [115]; the deficit is largest at low tube voltages (Section 3.1). Edge and line energies, fluorescence yields and radiative rates are taken from xraylib [60] (transition energies of Deslattes et al. [116]) and listed in Table 2.2 for the anode, window and filter materials and several high-Z radiosensitizers. Filters of Mo, Ag and Sn, with K-edges close to that of Ag, strongly absorb the photons most effective for dose enhancement (Section 3.4).



Table: Table 2.2. Atomic and physical data of the elements used (xraylib; densities from standard tables)

| Element | Z | ρ, g/cm³ | E_K, keV | E_L3, keV | Kα₁, keV | ω_K |
|:---|---:|---:|---:|---:|---:|---:|
| Be | 4 | 1.848 | 0.112 | – | – | 0.001 |
| Al | 13 | 2.699 | 1.560 | 0.073 | 1.487 | 0.039 |
| Ni | 28 | 8.902 | 8.333 | 0.855 | 7.478 | 0.421 |
| Cu | 29 | 8.960 | 8.979 | 0.931 | 8.048 | 0.454 |
| Mo | 42 | 10.22 | 20.000 | 2.520 | 17.479 | 0.767 |
| Ag | 47 | 10.50 | 25.514 | 3.351 | 22.163 | 0.831 |
| Sn | 50 | 7.310 | 29.200 | 3.929 | 25.271 | 0.860 |
| I | 53 | 4.930 | 33.169 | 4.557 | 28.612 | 0.882 |
| Gd | 64 | 7.900 | 50.239 | 7.243 | 42.996 | 0.932 |
| Au | 79 | 19.32 | 80.725 | 11.919 | 68.806 | 0.960 |



The direct yield of line $j$ along the central ray, per steradian and per incident electron, is

$$N_j^{\mathrm{dir}} = \frac{\omega_K\,p_j}{4\pi}\int_{E_K}^{T_0} \frac{n_a\,\sigma_K(T)}{S(T)}\,\exp\left[-\frac{\mu_j\,d(T)}{\sin\theta}\right]\mathrm{d}T$$

EQNUM[2.10]


where $\mu_j = \mu(E_j)$ at the line energy $E_j$ and the other symbols are as in (2.8); lying below the copper K-edge, the lines are weakly absorbed in the anode and cannot themselves ionise the K shell. For the indirect fluorescence, since the electrons penetrate only a few micrometres, less than the attenuation lengths above the K-edge, the bremsstrahlung is represented by an isotropic point source on the anode surface (surface-source approximation). Then $u = \cos\vartheta$, $\vartheta$ being the angle between the photon direction and the inward normal, has the probability density 1/2 on $-1 \le u \le 1$, and a photon with $u > 0$ interacts at depths $z$ to $z + \mathrm{d}z$ with the probability $(\mu/u)\exp(-\mu z/u)\,\mathrm{d}z$, where $\mu = \mu(E)$, so the interaction-depth density per emitted photon is

$$P(z) = \frac{1}{2}\int_{0}^{1} \frac{\mu}{u}\,\mathrm{e}^{-\mu z/u}\,\mathrm{d}u = \frac{\mu}{2}\,\mathrm{E}_1(\mu z)$$

EQNUM[2.11]


where $t = 1/u$ was substituted and $\mathrm{E}_1(x) = \int_{1}^{\infty} t^{-1}\mathrm{e}^{-xt}\,\mathrm{d}t$ is the exponential integral. A fraction $\tau_K(E)/\mu(E)$ of the interactions are K-shell photoabsorptions, $\tau_K(E)$ being the linear K-shell photoelectric coefficient of copper (from xraylib). A line-$j$ photon, emitted per vacancy with the probability $\omega_K p_j$, is attenuated along the central ray by $\exp(-b_j z)$, where $b_j = \mu_j/\sin\theta$. Per steradian and per generated bremsstrahlung photon of energy $E$, the yield of line $j$ is therefore

$$Y_j(E) = \frac{\omega_K\,p_j}{4\pi}\int_{0}^{\infty} \frac{\tau_K(E)}{\mu(E)}\,P(z)\,\mathrm{e}^{-b_j z}\,\mathrm{d}z = \frac{\omega_K\,p_j}{4\pi}\,\frac{\tau_K(E)}{2}\int_{0}^{\infty} \mathrm{E}_1(\mu z)\,\mathrm{e}^{-b_j z}\,\mathrm{d}z$$

EQNUM[2.12]


Interchanging the order of integration gives the Laplace transform $\int_{0}^{\infty}\mathrm{E}_1(x)\,\mathrm{e}^{-sx}\,\mathrm{d}x = \int_{1}^{\infty}\mathrm{d}t/[t(t + s)] = \ln(1 + s)/s$, with $x = \mu z$ and $s = b_j/\mu$:

$$\int_{0}^{\infty} \mathrm{E}_1(\mu z)\,\mathrm{e}^{-b_j z}\,\mathrm{d}z = \frac{1}{b_j}\ln\left(1 + \frac{b_j}{\mu}\right)$$

EQNUM[2.13]


Weighting $Y_j(E)$ with $N_g(E)$ and integrating above the K-edge gives the indirect yield per steradian and per incident electron:

$$N_j^{\mathrm{ind}} = \frac{\omega_K\,p_j}{4\pi}\int_{E_K}^{T_0} N_g(E)\,\frac{\tau_K(E)}{2\,b_j}\,\ln\left[1 + \frac{b_j}{\mu(E)}\right]\mathrm{d}E$$

EQNUM[2.14]


The total yield of line $j$ is $N_j = N_j^{\mathrm{dir}} + N_j^{\mathrm{ind}}$. For the baseline tube the indirect contribution is 4.5 % of the Kα and 4.8 % of the Kβ intensity; it is slightly larger for Kβ because the indirect vacancies lie deeper on average and Kβ photons are attenuated less. The surface-source approximation and the neglect of scattered photons therefore matter little for the line intensities.

## 2.5. Filtration, beam-quality parameters and air kerma

Attenuation in the window, added filters and air follows the narrow-beam Beer–Lambert law, which neglects scattered photons:

$$\mathcal{T}(E) = \exp\left[-\mu_{\mathrm{Be}}(E)\,t_{\mathrm{Be}} - \sum_{i}\mu_i(E)\,t_i - \mu_{\mathrm{air}}(E)\,r\right]$$

EQNUM[2.15]


where $\mathcal{T}(E)$ is the transmission, $\mu_{\mathrm{Be}}$, $\mu_i$ and $\mu_{\mathrm{air}}$ are the linear attenuation coefficients of beryllium, the $i$-th added filter and air, $t_{\mathrm{Be}}$ and $t_i$ the thicknesses of the window and the filters, and $r$ the focus–sample distance. For the elements, the xraylib total mass attenuation coefficients, including coherent scattering, are multiplied by the densities in Table 2.2; for dry air the mixture rule is applied to the NIST data for C, N, O and Ar [59] with the density $1.205\times10^{-3}$ g/cm³, and treating the whole distance as air slightly overestimates the attenuation. The spectral photon fluence at the sample is then

$$\Phi(E) = \frac{n_e\,Q}{r^{2}}\,\mathcal{T}(E)\left[N_b(E) + \sum_{j} N_j\,\delta(E - E_j)\right]$$

EQNUM[2.16]


where $\Phi(E)$ is the number of photons per unit area and energy interval (cm^−2^ keV^−1^), $Q$ the exposure in mAs, $n_e = 6.242\times10^{15}$ the number of electrons per mAs, $N_j$ the total yield of line $j$, and $\delta$ the Dirac delta function. Numerically, each delta function is replaced by $N_j/\Delta E$ in the bin of width $\Delta E$ = 0.05 keV that contains $E_j$. With the spectral energy fluence $\Psi(E) = E\,\Phi(E)$, the tube output is characterised by the air kerma [62, 76]:

$$K_{\mathrm{air}} = \int_{0}^{T_0} \Phi(E)\,E\left(\frac{\mu_{en}}{\rho}\right)_{\mathrm{air}}\mathrm{d}E$$

EQNUM[2.17]


where $(\mu_{en}/\rho)_{\mathrm{air}}$ is the mass energy-absorption coefficient of dry air, obtained in the same way, and 1 keV/g = $1.602\times10^{-13}$ Gy. Strictly, (2.17) gives the collision kerma, which for kilovoltage photons in air practically equals the total kerma [62]. With ICRU-44 soft tissue [61] instead of air, it gives the tissue kerma at the sample surface without backscatter, used in Section 3.6 to estimate exposure times. For the SpekPy spectra, filtered with SpekPy's own attenuation data, the SpekPy air kerma is used, whereas the half-value layers (HVL) and mean energies of all copper-anode spectra are computed identically for both models.

Kilovoltage beam quality is specified primarily by the first HVL, the thickness of a reference absorber (usually aluminium or copper) that halves the narrow-beam air kerma [14, 70, 111]. In aluminium, HVL1 = $x_1$ follows from

$$\int_{0}^{T_0} \Phi(E)\,E\left(\frac{\mu_{en}}{\rho}\right)_{\mathrm{air}}\exp\left[-\mu_{\mathrm{Al}}(E)\,x_1\right]\mathrm{d}E = \frac{1}{2}\,K_{\mathrm{air}}$$

EQNUM[2.18]


where $\mu_{\mathrm{Al}}(E)$ is the linear attenuation coefficient of aluminium. The thickness $x_2$ that reduces the air kerma to one quarter gives HVL2 = $x_2 - x_1$ (both found by bisection) and the homogeneity coefficient $h$ = HVL1/HVL2. The effective energy $E_{\mathrm{eff}}$, that of the monoenergetic beam with the same HVL1, is found from $\mu_{\mathrm{Al}}(E_{\mathrm{eff}}) = \ln 2/\mathrm{HVL1}$ by Brent's method, and the mean energy of the photon fluence spectrum is

$$\bar{E} = \frac{\int_{0}^{T_0} E\,\Phi(E)\,\mathrm{d}E}{\int_{0}^{T_0} \Phi(E)\,\mathrm{d}E}$$

EQNUM[2.19]


where both integrals include the characteristic lines. The fraction of photons above the Ag K-edge, $f_{\mathrm{Ag}} = \int_{E_{K,\mathrm{Ag}}}^{T_0}\Phi(E)\,\mathrm{d}E \big/ \int_{0}^{T_0}\Phi(E)\,\mathrm{d}E$ with $E_{K,\mathrm{Ag}}$ = 25.514 keV, and the corresponding energy-fluence fraction describe the part of the spectrum in which silver absorbs most strongly relative to tissue (Sections 1.2 and 1.3). Like the DEF, the HVLs and the mean energy depend only on the spectral shape, not on the absolute output.


## 2.6. Dose enhancement factor: definitions and calculation

The physical radio-enhancement is quantified by the DEF, the ratio of absorbed doses at a point with and without silver under identical irradiation:

$$\mathrm{DEF} = \frac{D_{t+\mathrm{Ag}}}{D_t}$$

EQNUM[2.20]


where $D_{t+\mathrm{Ag}}$ and $D_t$ are the absorbed doses in silver-loaded and unloaded (reference) tissue. This macroscopic DEF assumes a homogeneous silver distribution and doses averaged over volumes much larger than cells and electron ranges.

Below 50 keV secondary electrons have sub-millimetre ranges in tissue, so charged-particle equilibrium (CPE) holds except near interfaces [62, 71] and the dose equals the collision kerma (1.4), practically the kerma in low-Z media [76]. By analogy with (2.17),

$$D = \int_{0}^{T_0} \Psi(E)\,\frac{\mu_{en}}{\rho}(E)\,\mathrm{d}E$$

EQNUM[2.21]


where $\Psi(E) = E\,\Phi(E)$ is the spectral energy fluence, $\Phi(E)$ the spectral photon fluence (2.16), $\mu_{en}/\rho$ the mass energy-absorption coefficient of the medium and $T_0$ = 45 keV the maximum photon energy. Since $\mu_{en}/\rho$ excludes the energy of scattered and fluorescence photons [75], the Ag K x-rays ($\omega_K = 0.831$) are assumed to escape. For a silver mass fraction $w$ the mixture rule gives [59]

$$\left(\frac{\mu_{en}}{\rho}\right)_{t+\mathrm{Ag}} = (1-w)\left(\frac{\mu_{en}}{\rho}\right)_t + w\left(\frac{\mu_{en}}{\rho}\right)_{\mathrm{Ag}}$$

EQNUM[2.22]


where $t$ and Ag denote tissue and silver; mass fractions of 0.1–2 % are considered. Substituting (2.21) and (2.22) into (2.20) gives the surface DEF:

$$\mathrm{DEF} = \frac{\int \Psi(E)\left[(1-w)\left(\frac{\mu_{en}}{\rho}\right)_t + w\left(\frac{\mu_{en}}{\rho}\right)_{\mathrm{Ag}}\right]\mathrm{d}E}{\int \Psi(E)\left(\frac{\mu_{en}}{\rho}\right)_t\mathrm{d}E}$$

EQNUM[2.23]


The fluence normalisation cancels, so the DEF depends only on the spectral shape, and DM spectra are usable despite their less accurate absolute output (Section 3.1). As the numerator is linear in $w$, (2.23) becomes exactly

$$\mathrm{DEF} = 1 + w\left(\langle R\rangle - 1\right)$$

EQNUM[2.24]


with

$$\langle R\rangle = \frac{\int \Psi(E)\left(\frac{\mu_{en}}{\rho}\right)_{\mathrm{Ag}}\mathrm{d}E}{\int \Psi(E)\left(\frac{\mu_{en}}{\rho}\right)_t\mathrm{d}E} = \frac{\int R(E)\,d_t(E)\,\mathrm{d}E}{\int d_t(E)\,\mathrm{d}E}$$

EQNUM[2.25]


where $R(E) = (\mu_{en}/\rho)_{\mathrm{Ag}}/(\mu_{en}/\rho)_t$ and $d_t(E) = \Psi(E)\,(\mu_{en}/\rho)_t$ is the dose spectrum of unloaded tissue, so $\langle R\rangle$, the dose-weighted mean of $R(E)$, depends on the spectrum alone. For ICRU-44 tissue, $R(E)$ jumps at the Ag K-edge (25.514 keV) from about 32 to about 76 and reaches about 139 at 40–45 keV. Shifting the dose spectrum above the K-edge therefore raises $\langle R\rangle$ and the slope, the basis of the filter optimisation in Chapter 3.

Where silver is present only locally at depth $z$, without perturbing the beam, the primary-beam DEF is

$$\mathrm{DEF}(z) = \frac{\int \Psi(E)\,e^{-\mu_t(E)\,z}\left[(1-w)\left(\frac{\mu_{en}}{\rho}\right)_t + w\left(\frac{\mu_{en}}{\rho}\right)_{\mathrm{Ag}}\right]\mathrm{d}E}{\int \Psi(E)\,e^{-\mu_t(E)\,z}\left(\frac{\mu_{en}}{\rho}\right)_t\mathrm{d}E}$$

EQNUM[2.26]


where $\Psi(E)$ is the surface energy fluence and $\mu_t(E) = \rho_t\,(\mu/\rho)_t(E)$ the linear attenuation coefficient of tissue of density $\rho_t$ = 1.06 g/cm³; scatter and inverse-square fall-off are neglected, and the denominator normalised to $z = 0$ is the relative primary dose in unloaded tissue. Tissue removes first the low-energy photons, for which $R(E)$ is small, so the DEF increases with depth. Silver filling the region above the point also attenuates the beam, most strongly just above the K-edge, where its $\mu/\rho$ increases 5.8-fold. For a slab loaded from the surface to beyond $z$,

$$\mathrm{DEF}_{\mathrm{slab}}(z) = \frac{\int \Psi(E)\,e^{-\mu_{t+\mathrm{Ag}}(E)\,z}\left[(1-w)\left(\frac{\mu_{en}}{\rho}\right)_t + w\left(\frac{\mu_{en}}{\rho}\right)_{\mathrm{Ag}}\right]\mathrm{d}E}{\int \Psi(E)\,e^{-\mu_t(E)\,z}\left(\frac{\mu_{en}}{\rho}\right)_t\mathrm{d}E}$$

EQNUM[2.27]


where $\mu_{t+\mathrm{Ag}}(E) = \rho_t\left[(1-w)(\mu/\rho)_t + w\,(\mu/\rho)_{\mathrm{Ag}}\right]$ is the linear attenuation coefficient of the loaded medium (density approximated by $\rho_t$). The added attenuation preferentially removes the most effective photons, so $\mathrm{DEF}_{\mathrm{slab}}$ decreases with depth (self-shielding) and is no longer linear in $w$. At $w$ = 1 % silver attenuates just above its K-edge about as much as the tissue itself, and behind a loaded region the dose falls below its silver-free value.

The reference medium is ICRU-44 soft tissue (H 10.2, C 14.3, N 3.4, O 70.8, Na 0.2, P 0.3, S 0.3, Cl 0.2 and K 0.3 % by mass; 1.06 g/cm³) [61], with water and the ICRU four-component tissue as alternatives; the choice affects the DEF (Section 3.10) and must be reported. On the subcellular scale, short-range photo- and Auger electrons deposit much of their energy close to nanoparticles [30], which can produce biological effects beyond the macroscopic enhancement (local effect model) [31] depending on photon energy and particle size, concentration and location [97]. The calculated DEF is thus the physical baseline for identifying chemical, biological and nanoscale contributions.

## 2.7. Monte Carlo method for verification

The escape of Ag K-fluorescence and the neglect of scatter in the analytical model are tested with an independent MC code (`mc_dose.py`), simpler than PENELOPE, EGSnrc or Geant4 [107–109] but including all photon interactions relevant below 50 keV. A laterally infinite 30 mm slab of ICRU-44 tissue is irradiated by a broad parallel beam at normal incidence; a layer at 2–12 mm contains silver with $w$ = 1 %, added as a partial density $\rho_{\mathrm{Ag}} = \rho_t\,w/(1-w)$. Photons are tracked by energy $E$, depth $z$ and direction cosine $u$. The SpekPy spectra of the 45 kV tube (θ = 12°, 0.5 mm Be, 10 cm air), unfiltered and with 1 mm Al, are sampled by inverting the cumulative distribution. Free paths are sampled by Woodcock (delta) tracking [63, 117] with the majorant $\mu_{\max}(E) = \mu_t(E) + \mu_{\mathrm{Ag}}(E)$, where $\mu_{\mathrm{Ag}} = \rho_{\mathrm{Ag}}(\mu/\rho)_{\mathrm{Ag}}$:

$$s = -\frac{\ln \xi_1}{\mu_{\max}(E)}$$

EQNUM[2.28]


where $s$ is the path length and $\xi_1$ a random number uniform in (0, 1); at the new depth $z + u\,s$ the collision is real with probability

$$P_{\mathrm{real}} = \frac{\mu(z,E)}{\mu_{\max}(E)}$$

EQNUM[2.29]


where $\mu(z,E)$ is the local coefficient ($\mu_t$ outside the layer, $\mu_t + \mu_{\mathrm{Ag}}$ inside it); otherwise it is virtual, so boundary distances are never computed.

The interaction type (photoabsorption in tissue or silver, incoherent or coherent scattering) is sampled from partial coefficients tabulated from xraylib [60] at 1–46 keV in 5 eV steps. After photoabsorption in silver, a K vacancy (probability $\tau_K/\tau$, the K-shell share of the photoelectric cross-section) emits with probability $\omega_K$ one of the six principal K lines, chosen by radiative rates and transported isotropically; all other absorbed energy is deposited locally. The scattering angle $\vartheta$ is sampled from tissue tables of the Klein–Nishina cross-section times the incoherent scattering function and of the Thomson cross-section times the squared atomic form factor [64]; silver contributes only a few per cent of scattering. After incoherent scattering

$$E' = \frac{E}{1 + \frac{E}{m_e c^2}\left(1 - \cos\vartheta\right)}$$

EQNUM[2.30]


where $E$ and $E'$ are the photon energies before and after scattering and $m_e c^2$ = 510.999 keV is the electron rest energy; the direction cosine becomes $u' = u\cos\vartheta + \sqrt{1-u^2}\,\sin\vartheta\cos\varphi$ with $\varphi$ uniform in $[0, 2\pi)$. Photons below 1 keV and secondary electrons (ranges of a few tens of micrometres) deposit locally, giving the dose in bin $j$ per unit incident fluence

$$D_j = \frac{1}{N}\,\frac{\sum_{i \in j} \varepsilon_i}{\rho_j\,\Delta z}$$

EQNUM[2.31]


where $\varepsilon_i$ are the energy deposits in the bin, $N$ the number of incident photons, $\rho_j$ the density ($\rho_t$ or $\rho_t + \rho_{\mathrm{Ag}}$) and $\Delta z$ = 0.25 mm the bin width. The MC DEF is the dose ratio for $w$ = 1 % and $w = 0$, from $4\times10^{6}$ histories in five batches whose spread gives the standard error; the analytical reference is (2.27) applied to the buried layer. Two checks preceded the runs: for a broad 30 keV beam the ratio of surface dose to primary kerma is 1.31 owing to backscatter, which depends on field size and source distance [118], and the energy-transfer coefficient from xraylib data agrees with the NIST $\mu_{en}/\rho$ within 0.3 % for O, C and H at 20–40 keV, where the two coefficients practically coincide.

## 2.8. Data sources, software implementation and validation strategy

All $\mu_{en}/\rho$ values and the $\mu/\rho$ of tissue, water and air are obtained from the NIST elemental tables [59, 75], for compounds by the mixture rule. The module `nist.py` interpolates them log–log between absorption edges, where the coefficients follow approximate power laws. Elemental $\mu/\rho$, edge and line energies, fluorescence yields, radiative rates and the MC cross-sections come from xraylib 4.3.0 [60], whose $\mu/\rho$ agree with NIST [72] to better than 0.1 %.

The xraylib function `CS_Energy`, however, returns too low $\mu_{en}/\rho$ for light elements at 15–45 keV: for oxygen at 30 keV 0.108 instead of 0.173 cm²/g (−37 %) and for carbon 0.0515 instead of 0.0661 cm²/g, whereas for silver it agrees with NIST (16.58 versus 16.60 cm²/g). For tissue, composed mainly of O, C and H, it would underestimate the denominator of (2.23) and overestimate the DEF: 1.62 instead of 1.48 for 1 % Ag with 1 mm Al. The xraylib cross-sections are unaffected (Section 2.7), but `CS_Energy` must be checked against NIST before use for low-Z media.

The reference spectrum model is SpekPy v2.5.4 [15, 58] ("casim" physics model, copper anodes at 10–50 kV), validated against measured spectra and HVLs [51]; its spectra validate the DM and are the principal DEF input. The code uses Python 3.13 with NumPy [65], SciPy [66] (minimisation and root-finding) and Matplotlib [67].

The single adjustable parameter, the electron depth factor $\eta$ in (2.4), minimises the root-mean-square deviation between the DM and SpekPy bremsstrahlung spectra at 45 kV, θ = 12° and 0.5 mm Be, normalised to unit area above 3 keV and taken relative to the reference maximum; $\eta$ is searched in 0.25–0.7 and rounded to two decimals, all other configurations being predictions. The validation comprises component checks, e.g. of the stopping power against NIST ESTAR [69] (Section 2.2); comparison with SpekPy for 25–50 kV and anode angles of 6–30°, with and without 1 mm Al, plus a tungsten-anode check; DEF comparison for DM and SpekPy spectra; MC verification; and a DEF sensitivity analysis.

## 2.9. Radiation safety when working with a kilovoltage x-ray tube

A 45 kV copper-anode tube emits very intense low-energy x-rays: the unfiltered air kerma at 10 cm is 383 mGy per mAs, i.e. 15.3 Gy/s at 40 mA, and the tissue surface receives 2 Gy in 0.12 s, so accidental hand exposure causes severe local injuries within seconds. The primary beam, scatter from the sample and holder, and housing leakage must be controlled. Protection follows the principles of justification, optimisation (as low as reasonably achievable, ALARA) and dose limitation of the International Commission on Radiological Protection [119], implemented in the Basic Safety Standards of the International Atomic Energy Agency [120] and, in Uzbekistan, in the Law "On Radiation Safety" [121]. Occupational effective and equivalent doses (skin, extremities, eye lens) must stay below the limits.

The main measures are technical: a shielded housing, an enclosure whose door interlocks switch off the high voltage or close the shutter, warning lights, and fixed holders and collimators that keep hands out of the beam. Staff training, local rules, personal dosimetry and dose-rate surveys, particularly after maintenance, complement them. The high-voltage generator is a further hazard, and the beryllium window must not be touched (beryllium compounds are toxic).

Filtration also serves safety: the filters that markedly raise the DEF (1 mm Al to 0.2 mm Cu) lower the air kerma rate 120–1300-fold; with 1 mm Al the surface tissue kerma rate at 40 mA falls from 16.5 to 0.137 Gy/s and the time for 2 Gy rises from 0.12 to 14.6 s, controllable by a timer or shutter. The removed soft component would be absorbed superficially: the relative primary dose at 10 mm is 0.009 of the surface value without a filter and 0.44 with 1 mm Al. The DEF-maximising filter, whose beam can be specified by its HVL [14], thus also reduces unnecessary skin dose, in line with ALARA.

## 2.10. Conclusions to Chapter 2

1. A semi-analytical thick-target model (DM) of a reflection copper-anode x-ray tube has been formulated: Bethe electron slowing-down, non-relativistic Bethe–Heitler bremsstrahlung with the Elwert factor, direct and bremsstrahlung-induced K radiation, anode self-absorption, attenuation in window, air and filters, and one adjustable parameter, the electron depth factor $\eta$.
2. Air kerma and beam-quality parameters (HVLs, homogeneity coefficient, mean and effective energies) are calculated from the fluence spectra, the latter identically for DM and SpekPy.
3. Under CPE the DEF is a spectrum-weighted ratio of $\mu_{en}/\rho$; at the surface $\mathrm{DEF} - 1$ is exactly proportional to $w$, with a slope set by the dose spectrum above the Ag K-edge; the depth and loaded-slab forms describe beam hardening and self-shielding.
4. An independent MC code with Woodcock tracking, Compton and Rayleigh scattering and Ag K-fluorescence transport tests the assumptions of the analytical model.
5. NIST $\mu_{en}/\rho$ are used, because xraylib 4.3.0 `CS_Energy` underestimates them for light elements by up to 56 % (oxygen by 37 %), which would overestimate the DEF (1.62 instead of 1.48).
6. The unfiltered output (15.3 Gy/s at 10 cm and 40 mA) requires shielding, interlocks and dosimetric control; filtration reduces dose rate and superficial dose.


# CHAPTER 3. RESULTS OF SPECTRUM MODELLING AND DOSE-ENHANCEMENT CALCULATIONS

The results were obtained with the developed model (DM) of Chapter 2 and the reference code SpekPy v2.5.4 [15, 58]. Unless stated otherwise, the baseline conditions of Table 2.1 apply: constant potential 45 kV, anode angle θ = 12°, 0.5 mm Be window, 10 cm of air between focal spot and sample, and 0.05 keV energy bins. The dose enhancement factor (DEF) is calculated in the kerma approximation, which assumes charged-particle equilibrium (CPE), for ICRU-44 soft tissue of the International Commission on Radiation Units and Measurements (ICRU) [61] with mass energy-absorption coefficients of the National Institute of Standards and Technology (NIST) [59]; $R(E)$ is the ratio of these coefficients for Ag and tissue (Section 2.6).

## 3.1. Validation of the developed spectrum model

With no measured spectrum of this tube available, the DM was validated against SpekPy v2, a deterministic physics-based code that supports copper anodes at 10–50 kV [15] and has been validated against measured spectra and half-value layers (HVL) [51, 106]. The only adjustable parameter of the DM, the electron depth factor $\eta$ of (2.4), was fitted to the bremsstrahlung continuum alone (lines switched off in both codes; 45 kV, θ = 12°, 0.5 mm Be, no air) by minimising the root-mean-square deviation of the area-normalised spectra,

$$\delta(\eta) = \frac{1}{\max_i b_i}\left[\frac{1}{N}\sum_{i=1}^{N}\left(a_i(\eta) - b_i\right)^2\right]^{1/2}$$

EQNUM[3.1]


where $a_i(\eta)$ and $b_i$ are the bremsstrahlung fluences of the DM and SpekPy in energy bin $i$, each divided by its sum over the $N$ bins with $E_i > 3$ keV, and $1/\max_i b_i$ expresses $\delta$ as a fraction of the spectrum maximum. The fit gave $\eta = 0.40$ with $\delta = 2.46$ %, against 8.47 % for straight-line penetration ($\eta = 1$). Because of multiple elastic scattering, photons are thus produced at less than half the depth of a straight path in the continuous slowing-down approximation (CSDA), 2.536 µm instead of 6.339 µm (CSDA range 6.481 µm × cos 12°) for 45 keV electrons in copper, and the soft bremsstrahlung is less self-absorbed in the anode; $\eta = 1$ therefore yields too hard a spectrum. With $\eta$ fixed at 0.40, all other configurations are predictions rather than fits.

Table 3.1 compares the two codes for 25–50 kV and 6–30° without the air path. With 1 mm Al, which removes the Cu K lines, the first HVL (2.18) of the DM is 3.5–4.6 % lower than that of SpekPy. Without added filtration the deviation ranges from −2.6 % to −19.4 %, because the DM underestimates the Cu K lines by about 26–43 % and a weaker 8 keV line gives more weight to the softer 3–8 keV continuum in the air kerma. The deficit is largest at low voltage, where the Gryziński cross-section [57] rises too slowly above the threshold compared with the distorted-wave Born calculations [114, 115] used by SpekPy [104].



Table: Table 3.1. Comparison of the developed model (DM) with SpekPy v2 for the Cu anode (0.5 mm Be, no air)

| U, kV | θ | Filter | Ē DM, keV | Ē SpekPy, keV | HVL DM, mm Al | HVL SpekPy, mm Al | ΔHVL, % | K-lines/brems DM | K-lines/brems SpekPy |
|:---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 45 | 12° | no added filter | 10.38 | 10.08 | 0.0407 | 0.0430 | -5.3 | 1.52 | 2.17 |
| 45 | 12° | Al 1.0 mm | 25.60 | 26.10 | 0.794 | 0.826 | -3.9 | – | – |
| 45 | 6° | no added filter | 10.79 | 10.43 | 0.0451 | 0.0463 | -2.6 | 1.71 | 2.31 |
| 45 | 6° | Al 1.0 mm | 26.13 | 26.67 | 0.868 | 0.901 | -3.6 | – | – |
| 45 | 20° | no added filter | 10.15 | 9.88 | 0.0367 | 0.0405 | -9.4 | 1.39 | 2.07 |
| 45 | 20° | Al 1.0 mm | 25.34 | 25.79 | 0.759 | 0.789 | -3.8 | – | – |
| 45 | 30° | no added filter | 10.00 | 9.74 | 0.0334 | 0.0386 | -13.5 | 1.30 | 2.03 |
| 45 | 30° | Al 1.0 mm | 25.20 | 25.59 | 0.740 | 0.768 | -3.6 | – | – |
| 25 | 12° | no added filter | 8.60 | 8.64 | 0.0250 | 0.0310 | -19.4 | 0.86 | 1.51 |
| 25 | 12° | Al 1.0 mm | 18.12 | 18.42 | 0.429 | 0.449 | -4.5 | – | – |
| 30 | 12° | no added filter | 9.10 | 9.03 | 0.0304 | 0.0354 | -14.1 | 1.08 | 1.74 |
| 30 | 12° | Al 1.0 mm | 20.23 | 20.60 | 0.533 | 0.559 | -4.6 | – | – |
| 40 | 12° | no added filter | 9.96 | 9.74 | 0.0381 | 0.0411 | -7.3 | 1.41 | 2.06 |
| 40 | 12° | Al 1.0 mm | 23.93 | 24.39 | 0.713 | 0.745 | -4.2 | – | – |
| 50 | 12° | no added filter | 10.80 | 10.43 | 0.0427 | 0.0445 | -4.0 | 1.61 | 2.24 |
| 50 | 12° | Al 1.0 mm | 27.18 | 27.71 | 0.871 | 0.902 | -3.5 | – | – |



The spectral shapes agree within about 10 % between 10 and 30 keV (Fig. 3.1). The DM continuum is slightly richer at 10–20 keV and poorer above about 25 keV, the ratio falling to 0.80–0.85 at 40 keV; this mild softening explains the HVL deficit of the filtered beams. Its probable causes are the non-relativistic Born cross-section with the Elwert factor [56], which only approximates the tabulated cross-sections [113], and the assumed isotropic emission, whereas SpekPy models the angular distribution of bremsstrahlung [105].



![Fig. 3.1. Spectra of the 45 kV Cu-anode tube (baseline geometry) from SpekPy v2 and the developed model without added filtration (left) and with 1.0 mm Al (right), normalised to equal bremsstrahlung area above 9.6 keV; lower panels: ratio of the two.](/home/user/atlant-impossible/dissertation/code/../figures/en/fig05_validation_cu.png){width=13.5cm}



The absolute air kerma of the DM exceeds that of SpekPy by a factor of 1.08–1.22 without filtration and 1.21–1.42 with 1 mm Al, mainly because the DM neglects electron backscattering (the backscatter coefficient of copper is about 0.3). The DEF depends only on the spectral shape and is unaffected; absolute dose rates are taken from SpekPy. As a check beyond copper, the same $\eta$ was applied to a tungsten anode at 50, 80 and 100 kV with 2.5 mm Al, which removes the W L lines not included in the DM (Table 3.2). The HVL deviations lie between −5.7 % and +0.5 %, and at 50 kV both values are comparable to the first HVL (1.78 mm Al) of the quality RQR3 of the International Electrotechnical Commission standard IEC 61267 [111]. As for copper, the DM spectra have a slightly weaker high-energy tail (Fig. 3.2). A single $\eta$ thus serves anodes with Z = 29 and Z = 74. The main weakness of the DM, the underestimated Cu K-line intensity, matters for unfiltered and Kα-dominated beams, so the main DEF results use SpekPy spectra, with the DM as an independent check.



Table: Table 3.2. Check of the model for a W anode (θ = 12°, 2.5 mm Al), comparison with SpekPy v2

| U, kV | Ē DM, keV | Ē SpekPy, keV | HVL DM, mm Al | HVL SpekPy, mm Al | ΔHVL, % |
|:---|---:|---:|---:|---:|---:|
| 50 | 31.34 | 32.22 | 1.651 | 1.750 | -5.7 |
| 80 | 41.75 | 42.90 | 2.693 | 2.734 | -1.5 |
| 100 | 48.01 | 49.15 | 3.475 | 3.458 | 0.5 |





![Fig. 3.2. Spectra of a tungsten-anode tube (θ = 12°, 2.5 mm Al) at 50, 80 and 100 kV from SpekPy v2 (solid lines) and the developed model (dashed lines, η = 0.40), normalised to equal area.](/home/user/atlant-impossible/dissertation/code/../figures/en/fig06_validation_w.png){width=13.5cm}



## 3.2. Spectrum of the 45 kV copper-anode tube

In the baseline spectrum (Fig. 3.3) the Be window and air remove practically all photons below about 3 keV. The continuum rises to a plateau at about 7–9 keV and drops abruptly at the Cu K-edge (8.98 keV), above which the anode absorbs much more strongly and acts as its own K-edge filter. It then recovers to a shallow maximum near 12–13 keV and decreases to zero at 45 keV, so the Ag K-edge falls into its weak high-energy part. In 0.05 keV bins the Cu Kα line (8.05 keV) exceeds the neighbouring continuum by more than two orders of magnitude and the Kβ line (8.91 keV) by a factor of 45–80.



![Fig. 3.3. Spectrum of the 45 kV Cu-anode tube (θ = 12°, 0.5 mm Be, 10 cm air) from SpekPy v2 and the developed model. The dashed line marks the Ag K-edge (25.514 keV).](/home/user/atlant-impossible/dissertation/code/../figures/en/fig07_baseline.png){width=13.5cm}



According to SpekPy, characteristic photons make up 68.5 % of the photon fluence (Table 3.3), so the unfiltered beam is essentially a source of Cu K radiation. The Kβ/Kα fluence ratio of SpekPy, 0.1431, slightly exceeds the ratio of the radiative rates of xraylib (0.134) [60], because the more energetic Kβ photons are attenuated less on their way out. A 20 µm Ni filter, whose K-edge (8.333 keV, Table 2.2) lies between the Kα and Kβ energies, reduces this ratio to 0.0023, acting as the classical β-filter of x-ray diffraction [52].

The beam quality is very low: the mean energy (2.19) is 10.38 keV, the first HVL below 50 µm Al and the effective energy below that of Kα, so the dose to soft tissue comes mainly from the Cu K lines and the soft continuum. Only 4.64 % of the photons, carrying 14.1 % of the energy fluence, lie above the Ag K-edge, and their share in the kerma is smaller still because $\mu_{en}/\rho$ decreases steeply with energy. The output is very high: 383 mGy/mAs at 10 cm, i.e. 15.3 Gy/s at 40 mA.



Table: Table 3.3. Characteristic Cu K lines and beam-quality parameters of the baseline spectrum (45 kV, θ = 12°, 0.5 mm Be, 10 cm air)

| Quantity | Developed model | SpekPy v2 |
|:---|---:|---:|
| Kα₁ (K–L₃) energy, keV; relative rate | 8.048; 0.583 | – |
| Kα₂ (K–L₂) energy, keV; relative rate | 8.028; 0.299 | – |
| Kβ₁,₃ (K–M₂,₃) energy, keV; relative rate | 8.905; 0.118 | – |
| Share of indirect (photon-induced) K fluorescence, % | 4.5 | – |
| Mean energy Ē, keV | 10.74 | 10.38 |
| First HVL, mm Al | 0.0464 | 0.0478 |
| Second HVL, mm Al | 0.0570 | 0.0563 |
| Homogeneity coefficient | 0.81 | 0.85 |
| Effective energy, keV | 7.74 | 7.82 |
| Photon fraction above the Ag K-edge, % | 5.04 | 4.64 |
| Energy fraction above the Ag K-edge, % | 14.7 | 14.1 |
| Air kerma at 10 cm, mGy/mAs | 423 | 383 |
| Share of characteristic photons in fluence, % | – | 68.5 |



## 3.3. Influence of tube design parameters

The anode angle, tube voltage and Be window thickness were varied one at a time around the baseline (Table 3.4). Increasing the anode angle from 6° to 30° raises the air kerma by a factor of 1.56 through weaker self-filtration in the anode: the exit path $d/\sin\theta$ of a photon produced at depth $d$ is about 4.8 times longer at 6° than at 30°. The effect is strongest where copper is most opaque, at the soft end and just above the Cu K-edge, whereas above about 25 keV the curves nearly merge (Fig. 3.4). The same mechanism causes the heel effect [16], not treated here since the calculations refer to the central ray. A small anode angle thus gives a smaller effective focal spot but a lower output and a slightly harder beam.



![Fig. 3.4. Influence of the anode angle (6–30°) on the spectrum of the 45 kV Cu-anode tube (0.5 mm Be, 10 cm air; SpekPy v2). The dashed line marks the Ag K-edge.](/home/user/atlant-impossible/dissertation/code/../figures/en/fig08_angle.png){width=13.5cm}



The tube voltage has the strongest influence on the output, which grows largely through the Cu K lines, since the electrons travel a longer path at energies where the K-shell ionisation cross-section is near its maximum (at about 35 keV). The continuum grows strongly at high energies (Fig. 3.5) but hardly changes just above the Cu K-edge, because such photons escape only from a thin surface layer of the anode. The DEF increases only from 1.1932 at 25 kV, where no photon reaches the Ag K-edge, to 1.2027 at 50 kV, so the enhancement of the unfiltered beam is caused almost entirely by photoabsorption in the L and M shells of Ag, where $R(E)$ does not exceed 32 (21–32 at 8–25 keV).



![Fig. 3.5. Spectra of the Cu-anode tube at tube voltages of 25–50 kV (baseline geometry; SpekPy v2). The dashed line marks the Ag K-edge.](/home/user/atlant-impossible/dissertation/code/../figures/en/fig09_kvp.png){width=13.5cm}



The Be window acts mainly on the soft end of the spectrum (Fig. 3.6). Because beryllium (Z = 4) absorbs weakly, increasing the window thickness from 0.15 to 2.0 mm removes about three quarters of the photons below 6 keV but also about 30 % of the Cu K-line photons, which account for most of the decrease in air kerma from 423 to 271 mGy/mAs. The thickness, fixed by the tube design, must be known accurately, since it changes the output by more than one third.



![Fig. 3.6. Influence of the Be window thickness (0.15–2.0 mm) on the low-energy part of the spectrum of the 45 kV Cu-anode tube (θ = 12°, 10 cm air; SpekPy v2).](/home/user/atlant-impossible/dissertation/code/../figures/en/fig10_be.png){width=13.5cm}



The DM spectra give DEF values within 0.004 of SpekPy for all design variants. While the design parameters change the output by factors of up to 1.6 (anode angle, window) and 2.6 (voltage), the DEF for 1 % Ag remains between 1.19 and 1.21, because in every unfiltered beam the tissue dose is dominated by the Cu K lines and photons of 3–15 keV. The tube design is therefore a lever for the dose rate rather than the DEF; a substantial increase in the DEF requires added filters.



Table: Table 3.4. Influence of tube design parameters on the beam quality and on the DEF for 1 % Ag (SpekPy spectra; DEF also with the developed model)

| Parameter | Value | Ē, keV | HVL, mm Al | K_air, mGy/mAs | DEF (SpekPy) | DEF (DM) |
|:---|---:|---:|---:|---:|---:|---:|
| anode angle | 6° | 10.73 | 0.0497 | 296 | 1.204 | 1.204 |
| anode angle | 12° | 10.38 | 0.0478 | 383 | 1.202 | 1.201 |
| anode angle | 20° | 10.20 | 0.0464 | 433 | 1.200 | 1.199 |
| anode angle | 30° | 10.07 | 0.0455 | 463 | 1.199 | 1.197 |
| tube voltage | 25 kV | 8.93 | 0.0402 | 163 | 1.193 | 1.190 |
| tube voltage | 35 kV | 9.67 | 0.0452 | 277 | 1.198 | 1.197 |
| tube voltage | 45 kV | 10.38 | 0.0478 | 383 | 1.202 | 1.201 |
| tube voltage | 50 kV | 10.75 | 0.0487 | 430 | 1.203 | 1.203 |
| Be window | 0.15 mm | 10.23 | 0.0454 | 423 | 1.199 | 1.198 |
| Be window | 0.5 mm | 10.38 | 0.0478 | 383 | 1.202 | 1.201 |
| Be window | 2.0 mm | 10.99 | 0.0528 | 271 | 1.206 | 1.207 |



## 3.4. Influence of added filters on the spectrum

The added filters, described by the Beer–Lambert transmission of (2.15), form three groups (Table 3.5): aluminium, with its K-edge (1.56 keV) below the spectrum; nickel and copper, with K-edges near the Cu K lines; and Mo, Ag and Sn, with K-edges at 20.0, 25.514 and 29.2 keV (Table 2.2). Aluminium acts as a classical hardening filter (Fig. 3.7): its photoelectric cross-section falls roughly as $E^{-3}$, so the soft continuum and the Cu K lines are removed far more efficiently than the photons above the Ag K-edge. With 1–2 mm Al the Kα line practically disappears. The HVL jumps from 0.104 to 0.454 mm Al between the 0.25 and 0.5 mm filters, because behind the thinner filter the residual Cu K lines still carry a large part of the air kerma. The price is the output: 1 mm Al reduces the dose rate about 120-fold and 2 mm Al about 270-fold.



![Fig. 3.7. Spectra of the 45 kV Cu-anode tube with added Al filters of 0.25–2.0 mm (baseline geometry; SpekPy v2). The dashed line marks the Ag K-edge.](/home/user/atlant-impossible/dissertation/code/../figures/en/fig11_al.png){width=13.5cm}



Copper filters behave differently (Fig. 3.8): with the K-edge (8.979 keV) just above the Kα and Kβ energies, copper is relatively transparent to its own K radiation but absorbs the 9–20 keV continuum very strongly. With 0.1 mm Cu the mean energy is close to that with 0.5 mm Al, yet the HVL is 6.5 times smaller: the mean energy is weighted by fluence and reflects the hard continuum, whereas the HVL is weighted by air kerma and controlled by the transmitted Kα line, for which $\mu_{en}/\rho$ of air is much larger. Only 0.2 mm Cu suppresses the lines sufficiently, at a relative air kerma of $7.64 \times 10^{-4}$. The 0.02 mm Ni filter, which removes Kβ and the continuum just above 8.33 keV, leaves a quasi-monochromatic 8 keV beam that suits x-ray diffraction but not dose enhancement by Ag.



![Fig. 3.8. Spectra of the 45 kV Cu-anode tube with a 0.02 mm Ni filter and with Cu filters of 0.05–0.2 mm (baseline geometry; SpekPy v2). The dashed line marks the Ag K-edge.](/home/user/atlant-impossible/dissertation/code/../figures/en/fig12_cu_ni.png){width=13.5cm}



Each K-edge filter transmits a band below its edge and cuts the fluence above it several-fold or more (Fig. 3.9). The 0.05 mm Ag filter thus removes precisely the photons above 25.5 keV that are most useful for enhancement by Ag: although its HVL exceeds that of 0.5 mm Al, only 20.1 % of its photons lie above the Ag K-edge, against 38.2 %. Tin preserves the 25.5–29.2 keV window but removes the photons above 29.2 keV, where $R(E)$ is highest, so 0.1 mm Sn gives a slightly larger HVL than 1 mm Al but fewer photons above the Ag K-edge (40.4 % against 49.8 %). Neither the mean energy nor the HVL alone therefore characterises the spectral region that matters for Ag. The DEF follows the fraction of photons above the Ag K-edge only while the kerma is not dominated by the Cu K lines: with 55.1 % of its photons above the edge, 0.1 mm Cu gives a DEF of only 1.288, because the transmitted Kα line delivers most of the tissue dose.



![Fig. 3.9. Spectra of the 45 kV Cu-anode tube filtered by Mo 0.05 mm, Ag 0.05 mm and Sn 0.05 and 0.1 mm compared with 1.0 mm Al, relative to the maximum of the Al-filtered spectrum (SpekPy v2). The dashed line marks the Ag K-edge.](/home/user/atlant-impossible/dissertation/code/../figures/en/fig13_kedge.png){width=13.5cm}





Table: Table 3.5. Beam-quality parameters, relative air kerma and DEF (1 % Ag) for different added filters (45 kV, θ = 12°, 0.5 mm Be, 10 cm)

| Filter | Ē, keV | HVL, mm Al | Photons above Ag K-edge, % | K/K₀ | DEF (SpekPy) | DEF (DM) |
|:---|---:|---:|---:|---:|---:|---:|
| no added filter | 10.38 | 0.048 | 4.6 | 1 | 1.202 | 1.201 |
| Al 0.25 mm | 19.73 | 0.104 | 25.8 | 0.0588 | 1.265 | 1.271 |
| Al 0.5 mm | 23.78 | 0.454 | 38.2 | 0.0173 | 1.377 | 1.369 |
| Al 1.0 mm | 26.13 | 0.830 | 49.8 | 0.00829 | 1.482 | 1.464 |
| Al 2.0 mm | 28.59 | 1.270 | 65.0 | 0.00372 | 1.623 | 1.601 |
| Cu 0.05 mm | 15.37 | 0.058 | 22.0 | 0.0967 | 1.221 | 1.226 |
| Cu 0.1 mm | 24.08 | 0.070 | 55.1 | 0.0127 | 1.288 | 1.311 |
| Cu 0.2 mm | 33.09 | 1.403 | 91.2 | 0.000764 | 1.804 | 1.843 |
| Ni 0.02 mm | 12.09 | 0.052 | 10.3 | 0.339 | 1.208 | 1.210 |
| Sn 0.05 mm | 23.53 | 0.606 | 34.3 | 0.00986 | 1.385 | 1.376 |
| Sn 0.1 mm | 24.70 | 0.902 | 40.4 | 0.00387 | 1.444 | 1.433 |
| Sn 0.2 mm | 25.62 | 1.208 | 51.2 | 0.0011 | 1.524 | 1.515 |
| Ag 0.05 mm | 23.04 | 0.624 | 20.1 | 0.0067 | 1.342 | 1.335 |
| Mo 0.05 mm | 22.16 | 0.369 | 31.5 | 0.00835 | 1.337 | 1.330 |



## 3.5. Dose enhancement factor of Ag-loaded soft tissue

The DEF is a ratio of two spectrum-weighted integrals (2.23), determined by the energy distribution of the dose integrand $E\,\Phi(E)\,\mu_{en}/\rho$ (Fig. 3.10). Without filtration the integrand is dominated by the Cu K lines and the 3–15 keV continuum and falls below $10^{-4}$ of its maximum above about 20 keV, because $\mu_{en}/\rho$ of tissue is so small there; the photons above the Ag K-edge therefore contribute almost nothing to the dose. In the dominant region $R(E)$ is only 21.1 at 8 keV and 27.0 at 15 keV, so 1 % Ag raises the integrand almost uniformly by about 20 %. With 1 mm Al the integrand is concentrated between 15 and 45 keV, and above the Ag K-edge, where the integrand of the loaded tissue jumps, $R(E)$ increases from 76.8 at 25.6 keV to 138.5 at 45 keV. Since about half of the photons of this beam lie above the edge, this region provides the larger part of the enhancement.



![Fig. 3.10. Dose integrand $E\,\Phi(E)\,\mu_{en}/\rho$ for ICRU-44 soft tissue (shaded) and tissue with 1 % Ag (line), without filtration (left) and with 1.0 mm Al (right); 45 kV Cu-anode tube, SpekPy v2. The dashed line marks the Ag K-edge.](/home/user/atlant-impossible/dissertation/code/../figures/en/fig14_integrand.png){width=13.5cm}



The DEF increases linearly with the Ag mass fraction $w$ for every filter (Fig. 3.11, Table 3.6), as follows from the mixture rule (2.24): $\mathrm{DEF} = 1 + w(\langle R\rangle - 1)$, where $\langle R\rangle$ is the mean of $R(E)$ weighted by the dose spectrum of unloaded tissue (2.25). The slope per 1 % Ag grows from 0.202 without a filter to 0.804 with 0.2 mm Cu, i.e. $\langle R\rangle$ from about 21 to 81. For 1 % Ag the DEF is 1.20 without a filter, 1.48 with 1 mm Al, 1.62 with 2 mm Al and 1.80 with 0.2 mm Cu, whereas at 0.1 % Ag (1 mg of Ag per gram of tissue) the enhancement is only 2–8 %. The ranking of the filters (Table 3.5) confirms that the DEF follows the share of the dose integrand above the Ag K-edge rather than the mean energy: the nearly pure Kα beam behind the Ni filter gives practically the same DEF as the unfiltered beam (1.208 against 1.202), and at a similar HVL 0.1 mm Sn yields less than 1 mm Al (1.444 against 1.482). Strict linearity holds at the surface; inside an extended Ag-loaded region the attenuation by Ag itself makes the dependence non-linear (Section 3.7).



![Fig. 3.11. Dose enhancement factor of ICRU-44 soft tissue versus the Ag mass fraction for different added filters (SpekPy v2 spectra, kerma approximation at the surface).](/home/user/atlant-impossible/dissertation/code/../figures/en/fig15_def_conc.png){width=13.5cm}



Compared with SpekPy, the DM gives a DEF lower by 0.6–1.3 % with 0.5–2 mm Al and by less than 1 % with the Sn, Ag and Mo filters, consistent with its weaker high-energy tail. Where residual Cu K lines carry much of the kerma, it is higher, by 0.5 % for 0.25 mm Al and about 2 % for 0.1 and 0.2 mm Cu, because the underestimated lines shift the dose towards the hard continuum. These differences are small compared with those between filters, so the DEF is robust to the spectrum model. With water instead of ICRU-44 tissue as the reference medium, the DEF for 1 % Ag is up to 1.3 % higher for filtered beams (1.4965 with 1 mm Al and 1.8274 with 0.2 mm Cu). Although ICRU-44 tissue contains less oxygen than water, its 1.3 % by mass of Na, P, S, Cl and K raises its $\mu_{en}/\rho$ above that of water at 15–40 keV and so lowers the DEF.



Table: Table 3.6. Dose enhancement factor of ICRU-44 soft tissue versus Ag mass fraction for different filters (SpekPy spectra)

| Filter | w = 0.1 % | w = 0.2 % | w = 0.5 % | w = 1.0 % | w = 2.0 % | (DEF−1)/w, per 1 % |
|:---|---:|---:|---:|---:|---:|---:|
| no added filter | 1.020 | 1.040 | 1.101 | 1.202 | 1.403 | 0.202 |
| Al 0.25 mm | 1.026 | 1.053 | 1.132 | 1.265 | 1.530 | 0.265 |
| Al 0.5 mm | 1.038 | 1.075 | 1.189 | 1.377 | 1.755 | 0.377 |
| Al 1.0 mm | 1.048 | 1.096 | 1.241 | 1.482 | 1.964 | 0.482 |
| Al 2.0 mm | 1.062 | 1.125 | 1.312 | 1.623 | 2.246 | 0.623 |
| Cu 0.05 mm | 1.022 | 1.044 | 1.111 | 1.221 | 1.442 | 0.221 |
| Cu 0.1 mm | 1.029 | 1.058 | 1.144 | 1.288 | 1.575 | 0.288 |
| Cu 0.2 mm | 1.080 | 1.161 | 1.402 | 1.804 | 2.608 | 0.804 |
| Ni 0.02 mm | 1.021 | 1.042 | 1.104 | 1.208 | 1.417 | 0.208 |
| Sn 0.05 mm | 1.038 | 1.077 | 1.193 | 1.385 | 1.771 | 0.385 |
| Sn 0.1 mm | 1.044 | 1.089 | 1.222 | 1.444 | 1.888 | 0.444 |
| Sn 0.2 mm | 1.052 | 1.105 | 1.262 | 1.524 | 2.049 | 0.524 |
| Ag 0.05 mm | 1.034 | 1.069 | 1.171 | 1.342 | 1.685 | 0.342 |
| Mo 0.05 mm | 1.034 | 1.067 | 1.168 | 1.337 | 1.674 | 0.337 |



## 3.6. Optimisation of the filtration

Every filter raises the DEF at the expense of the dose rate, so the optimal filter maximises the DEF at a given transmission. In Fig. 3.12 (xraylib attenuation coefficients applied to the unfiltered SpekPy spectrum) the Al and Ti curves practically coincide and lie highest from 1 down to about $10^{-3}$, whereas Ni and Cu stay low while the Cu Kα line is transmitted. The K-edge filters fall behind: Sn practically coincides with Ti down to about 10 % transmission and falls below Al and Ti at lower transmissions, Mo levels off near 1.4, and Ag passes through a maximum of about 1.35.



![Fig. 3.12. Dose enhancement factor for 1 % Ag versus the relative air kerma for Al, Ti, Ni, Cu, Mo, Ag and Sn filters of increasing thickness (45 kV Cu-anode tube, baseline geometry; SpekPy v2).](/home/user/atlant-impossible/dissertation/code/../figures/en/fig16_tradeoff.png){width=13.5cm}



For a systematic comparison, the thickness $t$ of each filter was set by the condition of equal air-kerma transmission

$$\mathcal{T}_K(t) = \frac{\int_{0}^{T_0} \Phi_0(E)\,E\,\left(\mu_{en}/\rho\right)_{\mathrm{air}}\exp\left[-\mu_f(E)\,t\right]\mathrm{d}E}{\int_{0}^{T_0} \Phi_0(E)\,E\,\left(\mu_{en}/\rho\right)_{\mathrm{air}}\,\mathrm{d}E}$$

EQNUM[3.2]


where $\mathcal{T}_K(t)$ is the air-kerma transmission, $\Phi_0(E)$ the fluence spectrum of the unfiltered beam, $(\mu_{en}/\rho)_{\mathrm{air}}$ the mass energy-absorption coefficient of air, $\mu_f(E)$ the linear attenuation coefficient of the filter element and $T_0$ = 45 keV the maximum photon energy. Equation (3.2) was solved for $\mathcal{T}_K$ = 10 %, 1 % and 0.1 % for the elements from Al (Z = 13) to Bi (Z = 83), excluding gases, liquids, P, S, Se, the alkali metals, radioactive elements, Tl and the lanthanides other than Gd (Fig. 3.13; selected elements in Table 3.7).

The dependence on Z reflects the positions of the absorption edges relative to the Cu lines and the Ag K-edge; at 10 % transmission all elements still give 1.220–1.241. Al to Co (Z = 13–27), with K-edges below the Cu Kα energy, absorb the Cu lines strongly, whereas for Ni to As (Z = 28–33) the K-edge lies above Kα, the transmitted line dominates the kerma, and these are the worst filters at 10 % and 1 %. Sr to Ag (Z = 38–47) absorb the photons above the Ag K-edge and form a deep minimum at 0.1 %, lowest for Ag, Pd and Rh (1.335–1.346); for Cd to Ba (Z = 48–56), with K-edges above the Ag K-edge, the DEF grows with Z. Heavier elements act through L-shell absorption: Gd, with its L3 edge (7.243 keV) below Kα, behaves like the light absorbers, whereas for Hf to Bi the L3 edges lie above Kα (11.919 keV for Au, Table 2.2) and W, Au and Pb give only 1.350–1.351 at 1 %.



![Fig. 3.13. Dose enhancement factor for 1 % Ag with filters of elements Z = 13–83 whose thickness gives an equal air-kerma transmission of 10 %, 1 % and 0.1 % (45 kV Cu-anode tube, baseline geometry; SpekPy v2).](/home/user/atlant-impossible/dissertation/code/../figures/en/fig17_filter_scan.png){width=13.5cm}



Among the light and medium-Z absorbers, Al, Si, Ca, Sc and Ti give practically the same DEF at 10 % and 1 % transmission, whereas at 0.1 % Ca, Sc, Ti and V give 1.907 and Al 1.884, i.e. 1.2 % less. As calcium and scandium are unsuitable as filter foils, Al and Ti are the practical materials. Titanium needs a much thinner foil (111.2 instead of 824.4 µm at 1 %) and is slightly more effective at strong attenuation, because in the several-millimetre-thick Al filter the weakly energy-dependent Compton scattering contributes more to the attenuation of the hard photons.



Table: Table 3.7. Filter materials at equal air-kerma transmission: required thickness and DEF (1 % Ag)

| Filter | Z | t (10 %), µm | DEF (10 %) | t (1 %), µm | DEF (1 %) | t (0.1 %), µm | DEF (0.1 %) |
|:---|---:|---:|---:|---:|---:|---:|---:|
| Al | 13 | 188.8 | 1.241 | 824.4 | 1.454 | 4748.3 | 1.884 |
| Ti | 22 | 29.0 | 1.236 | 111.2 | 1.452 | 634.6 | 1.907 |
| Co | 27 | 12.1 | 1.226 | 50.7 | 1.397 | 181.3 | 1.901 |
| Cu | 29 | 47.5 | 1.221 | 102.8 | 1.307 | 180.8 | 1.736 |
| Mo | 42 | 15.6 | 1.231 | 44.3 | 1.330 | 134.7 | 1.380 |
| Ag | 47 | 11.1 | 1.233 | 36.8 | 1.336 | 138.1 | 1.335 |
| Sn | 50 | 13.8 | 1.236 | 48.4 | 1.384 | 204.2 | 1.529 |
| I | 53 | 17.7 | 1.238 | 63.2 | 1.419 | 294.6 | 1.692 |
| Gd | 64 | 8.7 | 1.232 | 27.3 | 1.431 | 125.5 | 1.883 |
| W | 74 | 7.0 | 1.226 | 15.6 | 1.350 | 34.4 | 1.862 |



For an irradiation experiment, Table 3.8 gives the tissue kerma at the sample surface and the time needed to deliver a dose $D$ at tube current $I$,

$$t_D = \frac{D}{c\,I\int_{0}^{T_0} \Phi(E)\,E\,\left(\mu_{en}/\rho\right)_t\,\mathrm{d}E}$$

EQNUM[3.3]


where $D$ = 2 Gy, $I$ = 40 mA, $\Phi(E)$ is the fluence spectrum per unit tube charge at 10 cm (cm^−2^ keV^−1^ mAs^−1^), $(\mu_{en}/\rho)_t$ refers to ICRU-44 tissue and $c = 1.602 \times 10^{-13}$ Gy g keV^−1^ converts keV/g into Gy; under CPE this kerma equals the absorbed dose at the surface, without backscatter (Section 2.5). Without a filter 2 Gy are delivered in 0.12 s, which is difficult to time reproducibly, whereas 1 mm and 2 mm Al need 14.6 and 32.5 s. The 0.2 mm Cu filter owes the highest DEF of the studied set (1.80) only to its very strong attenuation (at an equal transmission of 0.1 %, Cu gives 1.74, Al and Ti 1.88–1.91); it needs 158.4 s, and its DEF changes steeply with thickness (Fig. 3.12), which makes it sensitive to tolerances.



Table: Table 3.8. Tissue kerma rate at the sample surface (10 cm, 40 mA) and time needed to deliver 2 Gy

| Filter | Tissue kerma, mGy/mAs | Kerma rate, Gy/s | Time for 2 Gy, s | DEF (1 % Ag) |
|:---|---:|---:|---:|---:|
| no added filter | 412.9 | 16.52 | 0.12 | 1.202 |
| Al 0.5 mm | 7.15 | 0.286 | 6.99 | 1.377 |
| Al 1.0 mm | 3.42 | 0.137 | 14.6 | 1.482 |
| Al 2.0 mm | 1.54 | 0.062 | 32.5 | 1.623 |
| Cu 0.1 mm | 5.24 | 0.210 | 9.55 | 1.288 |
| Cu 0.2 mm | 0.32 | 0.013 | 158.4 | 1.804 |
| Sn 0.1 mm | 1.60 | 0.064 | 31.3 | 1.444 |
| Ag 0.05 mm | 2.76 | 0.110 | 18.1 | 1.342 |



Filtration is thus the decisive design lever for dose enhancement by Ag with a copper-anode tube. Aluminium of 1–2 mm, which allows convenient exposure times, or titanium of 0.1–0.3 mm is the optimal choice. K-edge filters with edges at 20–30 keV (Mo, Ag, Sn) and filters that transmit the Cu Kα line (Ni, thin Cu) should be avoided.


## 3.7. Depth dependence and self-shielding

As the Ag-loaded target in samples, phantoms or animals lies beneath tissue, two cases were calculated with SpekPy spectra in the primary-beam kerma approximation (scatter is assessed in Section 3.9): a small loaded region at depth $z$ in Ag-free tissue (equation (2.26)) and a region loaded uniformly from the surface to $z$ (equation (2.27)). In the first case the DEF increases monotonically with depth (Fig. 3.14; Table 3.9 also gives the dose $D/D_0$ relative to the surface dose $D_0$), because tissue preferentially absorbs low-energy photons, shifting the fluence to where the Ag/tissue $\mu_{en}/\rho$ ratio is larger. Without a filter the DEF for 1 % Ag rises from 1.20 to 1.56 at 20 mm, but the dose falls to 0.0090 at 10 mm as the Cu K lines and soft bremsstrahlung are absorbed: tissue acts as an added filter (Section 3.4). With Al 1 mm, which has already hardened the beam, the DEF rises only to 1.69 at 20 mm and the dose falls only to 0.439 at 10 mm.



![Fig. 3.14. Dose enhancement factor for 1 % Ag versus depth of the Ag-loaded region in Ag-free soft tissue for the unfiltered 45 kV beam and four added filters (SpekPy, primary beam, kerma approximation).](/home/user/atlant-impossible/dissertation/code/../figures/en/fig18_def_depth.png){width=13.5cm}





Table: Table 3.9. DEF (1 % Ag) and relative tissue dose versus depth in soft tissue for selected filters (primary beam)

| Filter | 0 mm | 1 mm | 3 mm | 5 mm | 10 mm | 20 mm |
|:---|---:|---:|---:|---:|---:|---:|
| no added filter, DEF | 1.202 | 1.215 | 1.261 | 1.338 | 1.444 | 1.564 |
| no added filter, D/D₀ | 1.000 | 0.328 | 0.0601 | 0.0222 | 0.0090 | 0.0036 |
| Al 0.5 mm, DEF | 1.377 | 1.401 | 1.435 | 1.463 | 1.525 | 1.630 |
| Al 0.5 mm, D/D₀ | 1.000 | 0.826 | 0.622 | 0.496 | 0.310 | 0.147 |
| Al 1.0 mm, DEF | 1.482 | 1.494 | 1.518 | 1.541 | 1.595 | 1.689 |
| Al 1.0 mm, D/D₀ | 1.000 | 0.909 | 0.759 | 0.642 | 0.439 | 0.229 |
| Cu 0.1 mm, DEF | 1.288 | 1.383 | 1.640 | 1.772 | 1.838 | 1.897 |
| Cu 0.1 mm, D/D₀ | 1.000 | 0.452 | 0.171 | 0.122 | 0.0894 | 0.0557 |
| Sn 0.1 mm, DEF | 1.444 | 1.451 | 1.465 | 1.479 | 1.511 | 1.573 |
| Sn 0.1 mm, D/D₀ | 1.000 | 0.918 | 0.779 | 0.666 | 0.460 | 0.235 |



The 0.1 mm Cu beam comprises the Cu Kα line and a hard tail (Section 3.4); once tissue absorbs the Kα line, the DEF rises steeply from 1.29 to 1.77 at 5 mm, near the surface value with 0.2 mm Cu (1.80), and beyond about 2 mm exceeds all others. With Sn 0.1 mm it changes least (1.44 to 1.57 at 20 mm), since photons above the Sn K-edge (29.2 keV) are already strongly attenuated and tissue barely hardens the remaining narrow band. Surface rankings of filters thus fail for deep-seated targets.

Inside a region loaded from the surface the trend reverses (Fig. 3.15): Ag strongly attenuates the photons above its K-edge that produce the enhancement (its mass attenuation coefficient rises 5.8-fold at 25.514 keV, from 9.53 to 55.4 cm²/g). With Al 1 mm the DEF falls from 1.48 to 1.21 at 10 mm for 1 % Ag and from 1.96 to 1.27 for 2 % Ag; self-shielding grows with concentration, and the linear relation of equation (2.24) holds only for thin layers. The Sn-filtered beam, concentrated just above the Ag K-edge, loses more (1.44 to 1.15 at 10 mm, 1 % Ag).



![Fig. 3.15. Dose enhancement factor versus depth inside a uniformly Ag-loaded region starting at the surface: 0.5, 1.0 and 2.0 % Ag, Al 1.0 mm (solid) and Sn 0.1 mm (dashed) filters, self-shielding included.](/home/user/atlant-impossible/dissertation/code/../figures/en/fig19_def_slab.png){width=13.5cm}



## 3.8. Influence of tube voltage and comparison with other high-Z elements

The DEF versus tube voltage $U$ (Fig. 3.16, Table 3.10) was calculated with SpekPy for 20–50 kV, where it supports the Cu anode, and with the DM for 60–80 kV. Photons above the Ag K-edge exist only above 25.5 kV, and below this voltage the DEF changes little. The slope increases from 26–27 kV; between 30 and 50 kV the DEF with Al 1 mm rises from 1.31 to 1.52 ever more slowly (±0.009 per ±1 kV at 45 kV, Section 3.10), and above 50 kV the growth slows further as the spectrum extends beyond the maximum of the Ag/tissue ratio near 40–45 keV. As the DM gives slightly lower DEFs than SpekPy at 45 kV (1.464 versus 1.482), the 60–80 kV values are, if anything, underestimated, and part of the flattening between 50 and 60 kV reflects the change of model.



![Fig. 3.16. Dose enhancement factor for 1 % Ag versus tube voltage (Al 0.5 and 1.0 mm filters): SpekPy v2 for 20–50 kV (solid) and the developed model for 60–80 kV (dashed); the vertical line marks the Ag K-edge.](/home/user/atlant-impossible/dissertation/code/../figures/en/fig20_def_kvp.png){width=13.5cm}





Table: Table 3.10. DEF (1 % Ag) versus tube voltage (20–50 kV: SpekPy; 60–80 kV: developed model)

| U, kV | 20 | 22 | 24 | 25 | 26 | 27 | 28 | 30 | 35 | 40 | 45 | 50 | 60 | 70 | 80 |
|:---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Al 0.5 mm | 1.246 | 1.250 | 1.253 | 1.255 | 1.257 | 1.260 | 1.265 | 1.277 | 1.312 | 1.346 | 1.377 | 1.406 | 1.452 | 1.499 | 1.541 |
| Al 1.0 mm | 1.261 | 1.266 | 1.270 | 1.272 | 1.275 | 1.282 | 1.291 | 1.314 | 1.376 | 1.433 | 1.482 | 1.524 | 1.577 | 1.633 | 1.679 |



For tissue with 1 % by mass of I, Gd, Pt, Au or Bi (Fig. 3.17, Table 3.11) the unfiltered beam gives 1.20–1.33, as the dose comes from the Cu K lines and photons below 15 keV, where Pt, Au and Bi (L-edges at about 12–16 keV) absorb about as much energy per unit mass as Ag (Fig. 1.2); only Gd (1.33), whose L-edges at 7.2–8.4 keV absorb the Cu K lines, stands out. With Al 1 mm the differences grow: above their L-edges Pt, Au and Bi absorb more than Ag over the whole filtered spectrum, including 15–25 keV, where Ag absorbs only through its L and outer shells; Gd (K-edge 50.2 keV, beyond the spectrum) exceeds Ag only below the Ag K-edge, which still contributes much of the dose, and iodine resembles Ag with a higher K-edge (33.2 keV).



![Fig. 3.17. Dose enhancement factor of soft tissue with 1 % by mass of Ag, I, Gd, Pt, Au or Bi at 45 kV without added filter and with Al 1.0 mm or Sn 0.1 mm (SpekPy, kerma approximation).](/home/user/atlant-impossible/dissertation/code/../figures/en/fig21_elements.png){width=13.5cm}





Table: Table 3.11. DEF of soft tissue containing 1 % (by mass) of different high-Z elements at 45 kV

| Filter | Ag | I | Gd | Pt | Au | Bi |
|:---|---:|---:|---:|---:|---:|---:|
| no added filter | 1.202 | 1.263 | 1.331 | 1.205 | 1.212 | 1.238 |
| Al 1.0 mm | 1.482 | 1.461 | 1.708 | 2.131 | 2.161 | 2.231 |
| Sn 0.1 mm | 1.444 | 1.440 | 1.716 | 2.155 | 2.189 | 2.276 |



Sn 0.1 mm lowers the DEF for Ag and I (1.44 for both) by attenuating photons above 29.2 keV, where the Ag/tissue ratio reaches 100–139 and the iodine K-edge lies, but slightly raises it for the heavier elements, whose ratio varies less, through stronger suppression of soft photons (HVL 0.90 versus 0.83 mm Al). Per unit mass, Ag is thus a weaker physical sensitizer at 45 kV than Gd, Pt, Au and Bi and comparable to iodine. Its advantages lie elsewhere: a K-edge inside the spectrum, allowing tuning by filtration; biologically active silver nanoparticles (AgNPs) that generate reactive oxygen species (ROS) [37]; and a lower cost than gold or platinum.

## 3.9. Monte Carlo verification

The analytical DEFs neglect scatter and assume that the Ag K-fluorescence energy, excluded from $\mu_{en}/\rho$, escapes. Both assumptions were tested with the Monte Carlo (MC) code and slab geometry of Section 2.7 (1 % Ag in a 10 mm layer at 2–12 mm depth; unfiltered and Al 1 mm-filtered SpekPy spectra; $4\times10^{6}$ histories in five batches) against the primary-beam kerma model for the same geometry, including attenuation by Ag. The two methods give the same profile shape, MC being higher everywhere (Fig. 3.18; regional averages in Table 3.12). With Al 1 mm the DEF rises sharply at the layer entrance and falls towards the exit through self-shielding. For the unfiltered beam an entrance peak is followed by a minimum at about 3–4 mm and a rise: near the entrance Ag attenuates mainly the soft components that still dominate the dose, whereas deeper, after their absorption, beam hardening prevails.



![Fig. 3.18. Depth profiles of the dose enhancement factor with a 10 mm layer of 1 % Ag at 2–12 mm (grey band) in soft tissue, unfiltered (left) and Al 1.0 mm (right): Monte Carlo (solid, ±2 standard errors shaded) and the analytical kerma model (dashed).](/home/user/atlant-impossible/dissertation/code/../figures/en/fig22_mc.png){width=13.5cm}





Table: Table 3.12. Monte Carlo and analytical DEF in the 10 mm Ag-loaded layer (1 % Ag, 2–12 mm depth) and behind it

| Filter | Region | DEF Monte Carlo | DEF analytical | Difference, % |
|:---|---:|---:|---:|---:|
| no added filter | layer entrance (2–3 mm) | 1.168 | 1.155 | 1.2 |
| no added filter | whole layer (2–12 mm) | 1.172 | 1.116 | 5.0 |
| no added filter | layer exit (11–12 mm) | 1.165 | 1.094 | 6.5 |
| no added filter | behind layer (15–30 mm) | 0.802 | 0.761 | 5.4 |
| Al 1.0 mm | layer entrance (2–3 mm) | 1.535 | 1.490 | 3.0 |
| Al 1.0 mm | whole layer (2–12 mm) | 1.447 | 1.354 | 6.8 |
| Al 1.0 mm | layer exit (11–12 mm) | 1.351 | 1.227 | 10.1 |
| Al 1.0 mm | behind layer (15–30 mm) | 0.803 | 0.759 | 5.9 |



Two effects explain the excess: part of the Ag K-fluorescence (about 22 keV) is reabsorbed, its mean free path in tissue (about 1.5 cm) being comparable to the layer thickness and oblique photons travelling long paths in the laterally infinite layer, and scattered photons add dose. Both build up with depth, hence the growing difference; backward fluorescence also lifts the MC DEF slightly above unity in front of the layer for the filtered beam. Behind the layer the dose drops to 0.80 of the Ag-free value (0.76 analytically), protecting normal tissue behind a loaded tumour but also lowering the dose in tumour regions behind a heavily loaded region. The analytical model thus conservatively underestimates the DEF in a thick loaded region, by up to 10 %.

## 3.10. Uncertainty and sensitivity analysis

The central result, DEF = 1.482 for 1 % Ag with Al 1 mm, was tested by varying each parameter in turn within its plausible uncertainty (Fig. 3.19, Table 3.13). The tissue coefficient was varied jointly in the loaded and reference media, acting only through $\langle R\rangle$ in equation (2.24). The spectrum model is represented by the DM–SpekPy difference, and $\eta$ (±25 %) by changes relative to the DM value of 1.464.



![Fig. 3.19. Sensitivity of the dose enhancement factor (1 % Ag, Al 1.0 mm, DEF = 1.482) to the input parameters at the two limits of each variation.](/home/user/atlant-impossible/dissertation/code/../figures/en/fig23_sensitivity.png){width=13.5cm}





Table: Table 3.13. Sensitivity of DEF (1 % Ag, Al 1.0 mm filter, DEF = 1.482) to the input parameters

| Parameter (variation) | DEF (lower) | DEF (upper) | |ΔDEF|max |
|:---|---:|---:|---:|
| Tube voltage ±1 kV | 1.473 | 1.491 | 0.009 |
| Anode angle ±3° | 1.492 | 1.476 | 0.009 |
| Be window ±0.1 mm | 1.482 | 1.482 | 0.000 |
| Al filter thickness ±5 % | 1.474 | 1.490 | 0.008 |
| μ_en/ρ of Ag ±2 % | 1.472 | 1.492 | 0.010 |
| μ_en/ρ of tissue ±1 % | 1.487 | 1.477 | 0.005 |
| Reference medium: ICRU four-component tissue / water | 1.539 | 1.496 | 0.057 |
| Spectrum model: DM / SpekPy | 1.464 | 1.482 | 0.018 |
| Depth factor η of the DM ±25 % | 1.457 | 1.470 | 0.007 |
| Combined standard uncertainty (k = 1), excluding the reference-medium choice |  |  | 0.016 |



The largest change, 0.057, comes from the reference medium (1.539 for ICRU four-component tissue, 1.496 for water): both lack the trace elements Na, P, S, Cl and K that raise the energy absorption of ICRU-44 tissue, so $\langle R\rangle$ and the DEF increase. This choice, a matter of definition, is excluded from the uncertainty but must always be stated. Otherwise the spectrum model dominates (0.018), followed by the Ag coefficient, anode angle and tube voltage (0.009–0.010 each). A smaller anode angle raises the DEF through stronger self-filtration, whereas the Be window is irrelevant (0.0002), as the Al filter removes the photons it would attenuate. Treating each maximum change as the half-width of a rectangular distribution, with uncorrelated parameters, the combined standard uncertainty is

$$u_c(\mathrm{DEF}) = \sqrt{\sum_{i=1}^{n} \frac{\Delta_i^{2}}{3}}$$

EQNUM[3.4]


where $\Delta_i$ is the maximum absolute change of the DEF due to the $i$-th parameter and $n = 8$ (all parameters except the reference medium). Thus $u_c = 0.016$: DEF = 1.48 ± 0.02 (coverage factor $k = 1$) or ± 0.03 ($k = 2$), more than an order of magnitude below the enhancement ($\mathrm{DEF}-1 = 0.48$) and about an order of magnitude below the differences between the main filters (0.14–0.32 between 1 mm Al, 2 mm Al and 0.2 mm Cu), so the filtration conclusions are robust. Incorrect interaction data would matter far more: the xraylib 4.3.0 function CS_Energy would give 1.62 instead of 1.48 (Section 2.8).

## 3.11. Discussion

Early studies calculated the enhancement in iodine-loaded tumours under kilovoltage x-rays [19, 20]; MC showed a much larger macroscopic enhancement by gold nanoparticles (AuNPs) for kilovoltage than megavoltage beams [10]; and nanoparticle enhancement for various elements was characterised versus photon energy with a similar kerma-based approach [13]. The depth dependence in orthovoltage beams was studied by MC in phantoms [42]; for Ag, a single surface value cannot characterise a thick target (Section 3.7). This work adds a low-voltage Cu-anode tube, whose spectrum is dominated by lines below the Ag K-edge and whose attainable DEF is set by filtration rather than tube design. The MC studies of silver (Section 1.4) used brain-tumour brachytherapy [38], tumour–healthy-tissue [39] and layered-skin [40] geometries, allowing only a qualitative comparison: the dose reduction to about 0.80 behind the loaded layer bears on the healthy-tissue doses of [39], and the per-mass DEFs of Au and Ag (2.16 versus 1.48 with Al 1 mm) on the comparison in [40]. Measurements in AgNP-enriched dose gels [41] could test the calculated DEF if the beam spectrum is specified.

A discrepancy arises with radiobiology. AgNPs reportedly sensitize cancer cells to ionising radiation [32], act as radiosensitizers for glioma [11] and outperformed AuNPs in U251 glioma cells in vitro and in an intracranial mouse model [12]. Such effects are quantified by the sensitizer enhancement ratio (SER), which, unlike the DEF, reflects all mechanisms [3]. Macroscopic physics predicts the opposite Ag–Au ranking at equal mass fraction and little enhancement at low loading (DEF 1.048 for 0.1 % Ag with Al 1 mm). Although biological effects also depend on radiation quality, concentration and cellular localisation, the reported radiosensitization by AgNPs, especially their advantage over AuNPs, is unlikely to result from macroscopic dose enhancement alone. Two mechanisms may explain it: AgNPs cause ROS formation, damage to deoxyribonucleic acid (DNA), cell-cycle arrest and impaired mitochondrial function in human cells [37], and the dose enhancement around gold nanoparticles is highly localised [30], nanoscale energy deposition explaining effects beyond the macroscopic enhancement [31]. The macroscopic DEF is thus only the physical baseline of a radio-enhancement with chemical and biological stages [7].

The work has several limitations. The kerma approximation ignores nanoscale dose heterogeneity, and Ag was assumed homogeneous, whereas radiosensitization by nanoparticles depends on their size, concentration and location [97]. The DM assumes isotropic bremsstrahlung and neglects electron backscattering from the anode, which with the approximate Born cross-section overestimates the output (DM/SpekPy air-kerma ratio 1.08–1.42) but not the DEF; its 26–43 % Cu K-line deficit is why the main results use SpekPy spectra. The heel effect was not modelled, the analytical depth calculations neglect scatter and fluorescence reabsorption (Section 3.9), and the MC geometry is a simple slab. No actual tube spectrum was measured, although SpekPy has been validated against measured spectra and HVLs [51], and no biological response was modelled.

For an experiment with a 45 kV Cu-anode tube, a 1–2 mm Al (or 0.1–0.3 mm Ti) filter is recommended; with Al it gives a DEF of 1.48–1.62 for 1 % Ag and 2 Gy in 14.6–32.5 s at 10 cm and 40 mA (Table 3.8). Thin Cu filters (0.05–0.1 mm) and K-edge filters at 20–30 keV (Mo, Ag, Sn) should be avoided, and 0.2 mm Cu, despite the largest DEF (1.80), needs 158 s for 2 Gy. The beam quality should be verified by an HVL measurement [14] against the calculated first HVL (0.83 mm Al with 1 mm Al, 1.27 mm Al with 2 mm Al). The Ag mass fraction should be at least 0.5 % (DEF 1.24 with 1 mm Al), since at 0.1 % the enhancement is below 5 %. For samples thicker than a few millimetres the DEF should be calculated for the actual depth and loading with NIST (not xraylib CS_Energy) coefficients and reported with the spectrum (or tube voltage, filtration and HVL), reference medium and depth.

## 3.12. Conclusions to Chapter 3

1. The DM (one fitted parameter, $\eta = 0.40$) agrees with SpekPy within −3.5 to −4.6 % in HVL for 1 mm Al and within 2 % in DEF for Al filters but underestimates the Cu K lines by 26–43 %.
2. The unfiltered spectrum is dominated by the Cu K lines (68.5 % of photons), giving a DEF of only 1.20 for 1 % Ag; tube design parameters change mainly the output, not the DEF (1.19–1.21).
3. Filtration is decisive: for 1 % Ag the DEF is 1.48 (Al 1 mm), 1.62 (Al 2 mm) and 1.80 (Cu 0.2 mm), at a 120–1300-fold lower dose rate; at equal transmission Al and Ti are optimal, K-edge filters at 20–30 keV unfavourable.
4. With Al 1 mm the DEF rises with the depth of a loaded region in Ag-free tissue (1.69 at 20 mm) but falls inside a uniformly loaded region by self-shielding (1.21 at 10 mm, 1 % Ag).
5. MC confirms the analytical model within 1–10 % (MC higher owing to fluorescence reabsorption and scatter) and shows a dose reduction to about 0.80 behind the loaded layer.
6. The DEF rises with tube voltage, most steeply once photons above the Ag K-edge appear (above about 26–27 kV); per unit mass, Ag is a weaker physical sensitizer than Gd, Pt, Au and Bi and comparable to iodine.
7. The DEF (1 % Ag, Al 1 mm) is 1.48 ± 0.02 ($k = 1$); the reference medium changes it by up to 0.057 and must be stated.


# CONCLUSIONS

1. High-Z dose enhancement is much larger for kilovoltage than megavoltage photons, and silver nanoparticles were reported to radiosensitize glioma, breast and colorectal cancer models. The Ag/tissue ratio of mass energy-absorption coefficients rises from 21–32 below the Ag K-edge (25.514 keV) to 103–139 at 30–45 keV, but the dependence of the dose enhancement factor (DEF) on copper-anode tube design and filtration had not been quantified.

2. The developed model (DM) is a semi-analytical thick-target model of the copper-anode tube spectrum (Bethe stopping power, non-relativistic Bethe–Heitler cross-section with the Elwert factor, Gryziński K-shell cross-section) that includes closed-form bremsstrahlung-induced K fluorescence (4.5–4.8 % of the line intensity), anode self-absorption and filtration.

3. Its single parameter, the electron depth factor $\eta = 0.40$, was fitted to the SpekPy v2 bremsstrahlung shape at 45 kV (root-mean-square deviation 2.46 %). Without refitting, the DM reproduces the half-value layer (HVL) of 1 mm Al-filtered beams at 25–50 kV and 6–30° anode angles within −3.5 to −4.6 %; it underestimates the Cu K lines by 26–43 % and overestimates the air kerma by 8–42 %, yet its DEFs with Al filters agree with SpekPy within 2 %.

4. The unfiltered 45 kV spectrum (12° anode, 0.5 mm Be, 10 cm air) is soft (mean energy 10.38 keV, first HVL 0.0478 mm Al), intense (383 mGy/mAs, i.e. 15.3 Gy/s at 40 mA) and dominated by the Cu K lines (68.5 % of photons, against 4.64 % above the Ag K-edge).

5. Anode angle (6–30°), voltage (25–50 kV) and Be window (0.15–2 mm) change the air kerma within 163–463 mGy/mAs but the DEF for 1 % Ag only within 1.19–1.21, because the dose comes mainly from the Cu K lines and photons below 15 keV, where the Ag/tissue ratio does not exceed 27 (21–22 at the Cu K lines).

6. Added filtration is decisive: the DEF for 1 % Ag is 1.48 with 1 mm Al, 1.62 with 2 mm Al and 1.80 with 0.2 mm Cu, at the cost of a 120–1300-fold lower air kerma. DEF − 1 is proportional to the Ag mass fraction.

7. At equal air-kerma transmission, light and medium-Z filters without edges in 9–45 keV (Al, Si, Ca, Sc, Ti) are optimal, whereas K-edge filters at 20–30 keV (Mo, Ag, Sn) absorb where silver is most effective: at 0.1 % transmission, the DEF for 1 % Ag is 1.91 with Ti but 1.34 with Ag.

8. With 1 mm Al and 1 % Ag, the DEF in a thin loaded region rises from 1.48 at the surface to 1.69 at 20 mm (beam hardening) but falls to 1.21 at 10 mm inside a region loaded uniformly from the surface (self-shielding). Monte Carlo DEFs for a 10 mm layer were 1–10 % higher than analytical (reabsorbed Ag K fluorescence, scattered photons), and the dose behind it fell to about 0.80 of the silver-free value.

9. The DEF (1 % Ag, 1 mm Al) rises from 1.27 at 25 kV to 1.52 at 50 kV. Per unit mass at 45 kV, silver is a weaker physical sensitizer than Gd, Pt, Au and Bi (1.48 against 2.16 for Au) and comparable to iodine (1.46), so its reported biological advantage over gold nanoparticles points to chemical, biological and nanoscale mechanisms.

10. For 1 % Ag and 1 mm Al, DEF = 1.48 ± 0.02 ($k = 1$); the reference medium changes it by up to 0.057. The xraylib 4.3.0 function CS_Energy underestimates the oxygen mass energy-absorption coefficient at 30 keV by 37 %, which would raise this DEF to 1.62, so NIST tables must be used.

## Practical recommendations

1. Use 1–2 mm Al (or 0.1–0.3 mm Ti) filtration; avoid unfiltered beams, thin Cu filters and Mo, Ag or Sn filters.
2. Specify the beam (voltage, anode angle, window, filters, measured first HVL; 0.83 mm Al calculated for 1 mm Al) and report the DEF with the spectrum and reference medium.
3. Plan exposures from the tissue kerma (2 Gy in 14.6 s with 1 mm Al and 32.5 s with 2 mm Al at 10 cm, 40 mA) and verify the output dosimetrically.
4. Use silver mass fractions of at least 0.5 % (DEF 1.24 with 1 mm Al).
5. For thick samples, account for the DEF depth dependence, self-shielding and reduced dose behind the loaded region.

## Prospects for further research

Nanoscale Monte Carlo simulations with the obtained spectra would link microscopic dose enhancement around silver nanoparticles to the macroscopic DEF, and CdTe or Si spectrometry would verify the DM's Cu K-line intensity and absolute output. In vitro experiments with the recommended filtration would separate physical dose enhancement from chemical and biological mechanisms such as reactive oxygen species production. Comparing gold and silver nanoparticles at equal mass concentration and identical spectra would test whether silver's biological advantage persists at a known physical DEF.


# REFERENCES

::: {custom-style="Reference"}
1. Bray F., Laversanne M., Sung H. [et al.] Global cancer statistics 2022: GLOBOCAN estimates of incidence and mortality worldwide for 36 cancers in 185 countries // CA: A Cancer Journal for Clinicians. – 2024. – Vol. 74, No. 3. – P. 229–263. – DOI: 10.3322/caac.21834.
:::

::: {custom-style="Reference"}
2. Delaney G., Jacob S., Featherstone C., Barton M. The role of radiotherapy in cancer treatment: estimating optimal utilization from a review of evidence-based clinical guidelines // Cancer. – 2005. – Vol. 104, No. 6. – P. 1129–1137. – DOI: 10.1002/cncr.21324.
:::

::: {custom-style="Reference"}
3. Hall E.J., Giaccia A.J. Radiobiology for the Radiologist. – 8th ed. – Philadelphia: Wolters Kluwer, 2018. – 624 p.
:::

::: {custom-style="Reference"}
4. Baskar R., Lee K.A., Yeo R., Yeoh K.-W. Cancer and Radiation Therapy: Current Advances and Future Directions // International Journal of Medical Sciences. – 2012. – Vol. 9, No. 3. – P. 193–199. – DOI: 10.7150/ijms.3635.
:::

::: {custom-style="Reference"}
5. Wardman P. Chemical Radiosensitizers for Use in Radiotherapy // Clinical Oncology. – 2007. – Vol. 19, No. 6. – P. 397–417. – DOI: 10.1016/j.clon.2007.03.010.
:::

::: {custom-style="Reference"}
6. Gill M.R., Vallis K.A. Transition metal compounds as cancer radiosensitizers // Chemical Society Reviews. – 2019. – Vol. 48, No. 2. – P. 540–557. – DOI: 10.1039/c8cs00641e.
:::

::: {custom-style="Reference"}
7. Kuncic Z., Lacombe S. Nanoparticle radio-enhancement: principles, progress and application to cancer treatment // Physics in Medicine & Biology. – 2018. – Vol. 63, No. 2. – Art. 02TR01. – DOI: 10.1088/1361-6560/aa99ce.
:::

::: {custom-style="Reference"}
8. Podgorsak E.B. Radiation Physics for Medical Physicists. – Cham: Springer, 2016. – DOI: 10.1007/978-3-319-25382-4.
:::

::: {custom-style="Reference"}
9. Hainfeld J.F., Slatkin D.N., Smilowitz H.M. The use of gold nanoparticles to enhance radiotherapy in mice // Physics in Medicine and Biology. – 2004. – Vol. 49, No. 18. – P. N309–N315. – DOI: 10.1088/0031-9155/49/18/n03.
:::

::: {custom-style="Reference"}
10. Cho S.H. Estimation of tumour dose enhancement due to gold nanoparticles during typical radiation treatments: a preliminary Monte Carlo study // Physics in Medicine and Biology. – 2005. – Vol. 50, No. 15. – P. N163–N173. – DOI: 10.1088/0031-9155/50/15/n01.
:::

::: {custom-style="Reference"}
11. Liu P., Huang Z., Chen Z. [et al.] Silver nanoparticles: a novel radiation sensitizer for glioma? // Nanoscale. – 2013. – Vol. 5, No. 23. – P. 11829–11836. – DOI: 10.1039/c3nr01351k.
:::

::: {custom-style="Reference"}
12. Liu P., Jin H., Guo Z. [et al.] Silver nanoparticles outperform gold nanoparticles in radiosensitizing U251 cells in vitro and in an intracranial mouse model of glioma // International Journal of Nanomedicine. – 2016. – Vol. 11. – P. 5003–5014. – DOI: 10.2147/IJN.S115473.
:::

::: {custom-style="Reference"}
13. Roeske J.C., Nuñez L., Hoggarth M. [et al.] Characterization of the Theorectical Radiation Dose Enhancement from Nanoparticles // Technology in Cancer Research & Treatment. – 2007. – Vol. 6, No. 5. – P. 395–401. – DOI: 10.1177/153303460700600504.
:::

::: {custom-style="Reference"}
14. Ma C.-M., Coffey C.W., DeWerd L.A. [et al.] AAPM protocol for 40–300 kV x‐ray beam dosimetry in radiotherapy and radiobiology // Medical Physics. – 2001. – Vol. 28, No. 6. – P. 868–893. – DOI: 10.1118/1.1374247.
:::

::: {custom-style="Reference"}
15. Poludniowski G., Omar A., Bujila R., Andreo P. Technical Note: SpekPy v2.0—a software toolkit for modeling x‐ray tube spectra // Medical Physics. – 2021. – Vol. 48, No. 7. – P. 3630–3637. – DOI: 10.1002/mp.14945.
:::

::: {custom-style="Reference"}
16. Bushberg J.T., Seibert J.A., Leidholdt E.M., Boone J.M. The Essential Physics of Medical Imaging. – 3rd ed. – Philadelphia: Lippincott Williams & Wilkins, 2012. – 1030 p.
:::

::: {custom-style="Reference"}
17. Khan F.M., Gibbons J.P. Khan’s The Physics of Radiation Therapy. – 5th ed. – Philadelphia: Lippincott Williams & Wilkins, 2014. – 572 p.
:::

::: {custom-style="Reference"}
18. Spiers F.W. The Influence of Energy Absorption and Electron Range on Dosage in Irradiated Bone // The British Journal of Radiology. – 1949. – Vol. 22, No. 261. – P. 521–533. – DOI: 10.1259/0007-1285-22-261-521.
:::

::: {custom-style="Reference"}
19. Mello R.S., Callisen H., Winter J. [et al.] Radiation dose enhancement in tumors with iodine // Medical Physics. – 1983. – Vol. 10, No. 1. – P. 75–78. – DOI: 10.1118/1.595378.
:::

::: {custom-style="Reference"}
20. Solberg T.D., Iwamoto K.S., Norman A. Calculation of radiation dose enhancement factors for dose enhancement therapy of brain tumours // Physics in Medicine and Biology. – 1992. – Vol. 37, No. 2. – P. 439–443. – DOI: 10.1088/0031-9155/37/2/010.
:::

::: {custom-style="Reference"}
21. Rose J.H., Norman A., Ingram M. [et al.] First radiotherapy of human metastatic brain tumors delivered by a computerized tomography scanner (CTRx) // International Journal of Radiation Oncology\*Biology\*Physics. – 1999. – Vol. 45, No. 5. – P. 1127–1132. – DOI: 10.1016/s0360-3016(99)00347-8.
:::

::: {custom-style="Reference"}
22. Chithrani D.B., Jelveh S., Jalali F. [et al.] Gold Nanoparticles as Radiation Sensitizers in Cancer Therapy // Radiation Research. – 2010. – Vol. 173, No. 6. – P. 719–728. – DOI: 10.1667/rr1984.1.
:::

::: {custom-style="Reference"}
23. Rahman W.N., Bishara N., Ackerly T. [et al.] Enhancement of radiation effects by gold nanoparticles for superficial radiation therapy // Nanomedicine: Nanotechnology, Biology and Medicine. – 2009. – Vol. 5, No. 2. – P. 136–142. – DOI: 10.1016/j.nano.2009.01.014.
:::

::: {custom-style="Reference"}
24. Zhang S.X., Gao J., Buchholz T.A. [et al.] Quantifying tumor-selective radiation dose enhancements using gold nanoparticles: a Monte Carlo simulation study // Biomedical Microdevices. – 2009. – Vol. 11, No. 4. – P. 925–933. – DOI: 10.1007/s10544-009-9309-5.
:::

::: {custom-style="Reference"}
25. Leung M.K.K., Chow J.C.L., Chithrani B.D. [et al.] Irradiation of gold nanoparticles by x‐rays: Monte Carlo simulation of dose enhancements and the spatial properties of the secondary electrons production // Medical Physics. – 2011. – Vol. 38, No. 2. – P. 624–631. – DOI: 10.1118/1.3539623.
:::

::: {custom-style="Reference"}
26. Butterworth K.T., McMahon S.J., Currell F.J., Prise K.M. Physical basis and biological mechanisms of gold nanoparticle radiosensitization // Nanoscale. – 2012. – Vol. 4, No. 16. – P. 4830–4838. – DOI: 10.1039/c2nr31227a.
:::

::: {custom-style="Reference"}
27. Her S., Jaffray D.A., Allen C. Gold nanoparticles for applications in cancer radiotherapy: Mechanisms and recent advancements // Advanced Drug Delivery Reviews. – 2017. – Vol. 109. – P. 84–101. – DOI: 10.1016/j.addr.2015.12.012.
:::

::: {custom-style="Reference"}
28. Schuemann J., Berbeco R., Chithrani D.B. [et al.] Roadmap to Clinical Use of Gold Nanoparticles for Radiation Sensitization // International Journal of Radiation Oncology\*Biology\*Physics. – 2016. – Vol. 94, No. 1. – P. 189–205. – DOI: 10.1016/j.ijrobp.2015.09.032.
:::

::: {custom-style="Reference"}
29. McMahon S.J., Paganetti H., Prise K.M. Optimising element choice for nanoparticle radiosensitisers // Nanoscale. – 2016. – Vol. 8, No. 1. – P. 581–589. – DOI: 10.1039/c5nr07089a.
:::

::: {custom-style="Reference"}
30. Jones B.L., Krishnan S., Cho S.H. Estimation of microscopic dose enhancement factor around gold nanoparticles by Monte Carlo calculations // Medical Physics. – 2010. – Vol. 37, No. 7. – P. 3809–3816. – DOI: 10.1118/1.3455703.
:::

::: {custom-style="Reference"}
31. McMahon S.J., Hyland W.B., Muir M.F. [et al.] Biological consequences of nanoscale energy deposition near irradiated heavy atom nanoparticles // Scientific Reports. – 2011. – Vol. 1, No. 1. – Art. 18. – DOI: 10.1038/srep00018.
:::

::: {custom-style="Reference"}
32. Xu R., Ma J., Sun X. [et al.] Ag nanoparticles sensitize IR-induced killing of cancer cells // Cell Research. – 2009. – Vol. 19, No. 8. – P. 1031–1034. – DOI: 10.1038/cr.2009.89.
:::

::: {custom-style="Reference"}
33. Liu Z., Tan H., Zhang X. [et al.] Enhancement of radiotherapy efficacy by silver nanoparticles in hypoxic glioma cells // Artificial Cells, Nanomedicine, and Biotechnology. – 2018. – Vol. 46, Suppl. 3. – P. S922–S930. – DOI: 10.1080/21691401.2018.1518912.
:::

::: {custom-style="Reference"}
34. Zhao J., Liu P., Ma J. [et al.] Enhancement of Radiosensitization by Silver Nanoparticles Functionalized with Polyethylene Glycol and Aptamer AS1411 for Glioma Irradiation Therapy // International Journal of Nanomedicine. – 2019. – Vol. 14. – P. 9483–9496. – DOI: 10.2147/ijn.s224160.
:::

::: {custom-style="Reference"}
35. Swanner J., Mims J., Carroll D.L. [et al.] Differential cytotoxic and radiosensitizing effects of silver nanoparticles on triple-negative breast cancer and non-triple-negative breast cells // International Journal of Nanomedicine. – 2015. – Vol. 10. – P. 3937–3953. – DOI: 10.2147/ijn.s80349.
:::

::: {custom-style="Reference"}
36. Habiba K., Aziz K., Sanders K. [et al.] Enhancing Colorectal Cancer Radiation Therapy Efficacy using Silver Nanoprisms Decorated with Graphene as Radiosensitizers // Scientific Reports. – 2019. – Vol. 9, No. 1. – Art. 17120. – DOI: 10.1038/s41598-019-53706-0.
:::

::: {custom-style="Reference"}
37. AshaRani P.V., Low Kah Mun G., Hande M.P., Valiyaveettil S. Cytotoxicity and Genotoxicity of Silver Nanoparticles in Human Cells // ACS Nano. – 2009. – Vol. 3, No. 2. – P. 279–290. – DOI: 10.1021/nn800596w.
:::

::: {custom-style="Reference"}
38. Taha E., Djouider F., Banoqitah E. Monte Carlo simulation of dose enhancement due to silver nanoparticles implantation in brain tumor brachytherapy using a digital phantom // Radiation Physics and Chemistry. – 2019. – Vol. 156. – P. 15–21. – DOI: 10.1016/j.radphyschem.2018.10.027.
:::

::: {custom-style="Reference"}
39. Çağlar M., Eşitmez D., Cebe M.S. The Effect of Dose Enhancement in Tumor With Silver Nanoparticles on Surrounding Healthy Tissues: A Monte Carlo Study // Technology in Cancer Research & Treatment. – 2024. – Vol. 23. – Art. 15330338241235771. – DOI: 10.1177/15330338241235771.
:::

::: {custom-style="Reference"}
40. Eşitmez D., Çağlar M., Süsoy Doğan G. Comparative Assessment of Silver and Gold Nanoparticles for Dose Enhancement in Layered Skin Geometries: A Monte Carlo Sensitivity Study // Journal of Advanced Research in Natural and Applied Sciences. – 2026. – Vol. 12, No. 1. – P. 30–44. – DOI: 10.28979/jarnas.1862846.
:::

::: {custom-style="Reference"}
41. Merkis M., Griskonis E., Laurikaitiene J. [et al.] Investigation of dose sensitivity and dose enhancement effect in silver nanoparticle enriched dose gels // Radiation Physics and Chemistry. – 2023. – Vol. 213. – Art. 111213. – DOI: 10.1016/j.radphyschem.2023.111213.
:::

::: {custom-style="Reference"}
42. Chow J.C.L., Jubran S. Depth Dose Enhancement in Orthovoltage Nanoparticle-Enhanced Radiotherapy: A Monte Carlo Phantom Study // Micromachines. – 2023. – Vol. 14, No. 6. – Art. 1230. – DOI: 10.3390/mi14061230.
:::

::: {custom-style="Reference"}
43. Boone J.M., Seibert J.A. An accurate method for computer‐generating tungsten anode x‐ray spectra from 30 to 140 kV // Medical Physics. – 1997. – Vol. 24, No. 11. – P. 1661–1670. – DOI: 10.1118/1.597953.
:::

::: {custom-style="Reference"}
44. Birch R., Marshall M. Computation of bremsstrahlung X-ray spectra and comparison with spectra measured with a Ge(Li) detector // Physics in Medicine & Biology. – 1979. – Vol. 24, No. 3. – P. 505–517. – DOI: 10.1088/0031-9155/24/3/002.
:::

::: {custom-style="Reference"}
45. Tucker D.M., Barnes G.T., Chakraborty D.P. Semiempirical model for generating tungsten target x‐ray spectra // Medical Physics. – 1991. – Vol. 18, No. 2. – P. 211–218. – DOI: 10.1118/1.596709.
:::

::: {custom-style="Reference"}
46. Poludniowski G.G., Evans P.M. Calculation of x‐ray spectra emerging from an x‐ray tube. Part I. Electron penetration characteristics in x‐ray targets // Medical Physics. – 2007. – Vol. 34, No. 6. – P. 2164–2174. – DOI: 10.1118/1.2734725.
:::

::: {custom-style="Reference"}
47. Poludniowski G.G. Calculation of x‐ray spectra emerging from an x‐ray tube. Part II. X‐ray production and filtration in x‐ray targets // Medical Physics. – 2007. – Vol. 34, No. 6. – P. 2175–2186. – DOI: 10.1118/1.2734726.
:::

::: {custom-style="Reference"}
48. Poludniowski G., Landry G., DeBlois F. [et al.] SpekCalc: a program to calculate photon spectra from tungsten anode x-ray tubes // Physics in Medicine and Biology. – 2009. – Vol. 54, No. 19. – P. N433–N438. – DOI: 10.1088/0031-9155/54/19/n01.
:::

::: {custom-style="Reference"}
49. Verhaegen F., Nahum A.E., Van de Putte S., Namito Y. Monte Carlo modelling of radiotherapy kV x-ray units // Physics in Medicine and Biology. – 1999. – Vol. 44, No. 7. – P. 1767–1789. – DOI: 10.1088/0031-9155/44/7/315.
:::

::: {custom-style="Reference"}
50. Ay M.R., Shahriari M., Sarkar S. [et al.] Monte Carlo simulation of x-ray spectra in diagnostic radiology and mammography using MCNP4C // Physics in Medicine and Biology. – 2004. – Vol. 49, No. 21. – P. 4897–4917. – DOI: 10.1088/0031-9155/49/21/004.
:::

::: {custom-style="Reference"}
51. Bujila R., Omar A., Poludniowski G. A validation of SpekPy: A software toolkit for modelling X-ray tube spectra // Physica Medica. – 2020. – Vol. 75. – P. 44–54. – DOI: 10.1016/j.ejmp.2020.04.026.
:::

::: {custom-style="Reference"}
52. Cullity B.D., Stock S.R. Elements of X-Ray Diffraction. – 3rd ed. – Upper Saddle River: Prentice Hall, 2001. – 664 p.
:::

::: {custom-style="Reference"}
53. Bethe H. Zur Theorie des Durchgangs schneller Korpuskularstrahlen durch Materie // Annalen der Physik. – 1930. – Vol. 397, No. 3. – P. 325–400. – DOI: 10.1002/andp.19303970303.
:::

::: {custom-style="Reference"}
54. Bethe H., Heitler W. On the stopping of fast particles and on the creation of positive electrons // Proceedings of the Royal Society of London. Series A, Containing Papers of a Mathematical and Physical Character. – 1934. – Vol. 146, No. 856. – P. 83–112. – DOI: 10.1098/rspa.1934.0140.
:::

::: {custom-style="Reference"}
55. Elwert G. Verschärfte Berechnung von Intensität und Polarisation im kontinuierlichen Röntgenspektrum // Annalen der Physik. – 1939. – Vol. 426, No. 2. – P. 178–208. – DOI: 10.1002/andp.19394260206.
:::

::: {custom-style="Reference"}
56. Koch H.W., Motz J.W. Bremsstrahlung Cross-Section Formulas and Related Data // Reviews of Modern Physics. – 1959. – Vol. 31, No. 4. – P. 920–955. – DOI: 10.1103/revmodphys.31.920.
:::

::: {custom-style="Reference"}
57. Gryziński M. Classical Theory of Atomic Collisions. I. Theory of Inelastic Collisions // Physical Review. – 1965. – Vol. 138, No. 2A. – P. A336–A358. – DOI: 10.1103/physrev.138.a336.
:::

::: {custom-style="Reference"}
58. SpekPy: a software toolkit for modelling the x-ray spectra from x-ray tubes, version 2.5.4 [Electronic resource]. – URL: https://bitbucket.org/spekpy/spekpy_release (accessed 27.10.2026).
:::

::: {custom-style="Reference"}
59. Hubbell J.H., Seltzer S.M. Tables of X-Ray Mass Attenuation Coefficients and Mass Energy-Absorption Coefficients (version 1.4). NIST Standard Reference Database 126 (NISTIR 5632). – Gaithersburg, MD: National Institute of Standards and Technology, 2004. – DOI: 10.18434/T4D01F.
:::

::: {custom-style="Reference"}
60. Schoonjans T., Brunetti A., Golosio B. [et al.] The xraylib library for X-ray–matter interactions. Recent developments // Spectrochimica Acta Part B: Atomic Spectroscopy. – 2011. – Vol. 66, No. 11-12. – P. 776–784. – DOI: 10.1016/j.sab.2011.09.011.
:::

::: {custom-style="Reference"}
61. ICRU Report 44. Tissue Substitutes in Radiation Dosimetry and Measurement. – Bethesda, MD: International Commission on Radiation Units and Measurements, 1989.
:::

::: {custom-style="Reference"}
62. Attix F.H. Introduction to Radiological Physics and Radiation Dosimetry. – New York: Wiley, 1986. – 607 p.
:::

::: {custom-style="Reference"}
63. Woodcock E., Murphy T., Hemmings P., Longworth S. Techniques used in the GEM code for Monte Carlo neutronics calculations in reactors and other systems of complex geometry // Proceedings of the Conference on the Application of Computing Methods to Reactor Problems. ANL-7050. – Argonne: Argonne National Laboratory, 1965. – P. 557–579.
:::

::: {custom-style="Reference"}
64. Hubbell J.H., Veigele W.J., Briggs E.A. [et al.] Atomic form factors, incoherent scattering functions, and photon scattering cross sections // Journal of Physical and Chemical Reference Data. – 1975. – Vol. 4, No. 3. – P. 471–538. – DOI: 10.1063/1.555523.
:::

::: {custom-style="Reference"}
65. Harris C.R., Millman K.J., van der Walt S.J. [et al.] Array programming with NumPy // Nature. – 2020. – Vol. 585, No. 7825. – P. 357–362. – DOI: 10.1038/s41586-020-2649-2.
:::

::: {custom-style="Reference"}
66. Virtanen P., Gommers R., Oliphant T.E. [et al.] SciPy 1.0: fundamental algorithms for scientific computing in Python // Nature Methods. – 2020. – Vol. 17, No. 3. – P. 261–272. – DOI: 10.1038/s41592-019-0686-2.
:::

::: {custom-style="Reference"}
67. Hunter J.D. Matplotlib: A 2D Graphics Environment // Computing in Science & Engineering. – 2007. – Vol. 9, No. 3. – P. 90–95. – DOI: 10.1109/mcse.2007.55.
:::

::: {custom-style="Reference"}
68. ICRU Report 37. Stopping Powers for Electrons and Positrons. – Bethesda, MD: International Commission on Radiation Units and Measurements, 1984.
:::

::: {custom-style="Reference"}
69. Berger M.J., Coursey J.S., Zucker M.A., Chang J. ESTAR, PSTAR, and ASTAR: Computer Programs for Calculating Stopping-Power and Range Tables for Electrons, Protons, and Helium Ions. NIST Standard Reference Database 124. – Gaithersburg, MD: National Institute of Standards and Technology, 2017. – DOI: 10.18434/T4NC7P.
:::

::: {custom-style="Reference"}
70. IAEA Technical Reports Series No. 398. Absorbed Dose Determination in External Beam Radiotherapy: An International Code of Practice for Dosimetry Based on Standards of Absorbed Dose to Water. – Vienna: International Atomic Energy Agency, 2000.
:::

::: {custom-style="Reference"}
71. Andreo P., Burns D.T., Nahum A.E., Seuntjens J., Attix F.H. Fundamentals of Ionizing Radiation Dosimetry. – Weinheim: Wiley-VCH, 2017. – 1000 p.
:::

::: {custom-style="Reference"}
72. Berger M.J., Hubbell J.H., Seltzer S.M., Chang J., Coursey J.S., Sukumar R., Zucker D.S., Olsen K. XCOM: Photon Cross Sections Database. NIST Standard Reference Database 8 (XGAM). – Gaithersburg, MD: National Institute of Standards and Technology, 2010. – DOI: 10.18434/T48G6X.
:::

::: {custom-style="Reference"}
73. Bambynek W., Crasemann B., Fink R.W. [et al.] X-Ray Fluorescence Yields, Auger, and Coster-Kronig Transition Probabilities // Reviews of Modern Physics. – 1972. – Vol. 44, No. 4. – P. 716–813. – DOI: 10.1103/revmodphys.44.716.
:::

::: {custom-style="Reference"}
74. Krause M.O. Atomic radiative and radiationless yields for K and L shells // Journal of Physical and Chemical Reference Data. – 1979. – Vol. 8, No. 2. – P. 307–327. – DOI: 10.1063/1.555594.
:::

::: {custom-style="Reference"}
75. Seltzer S.M. Calculation of Photon Mass Energy-Transfer and Mass Energy-Absorption Coefficients // Radiation Research. – 1993. – Vol. 136, No. 2. – P. 147–170. – DOI: 10.2307/3578607.
:::

::: {custom-style="Reference"}
76. ICRU Report 85. Fundamental Quantities and Units for Ionizing Radiation (Revised) // Journal of the ICRU. – 2011. – Vol. 11, No. 1. – DOI: 10.1093/jicru/ndr011.
:::

::: {custom-style="Reference"}
77. Fano U. Note on the Bragg-Gray Cavity Principle for Measuring Energy Dissipation // Radiation Research. – 1954. – Vol. 1, No. 3. – P. 237–240. – DOI: 10.2307/3570368.
:::

::: {custom-style="Reference"}
78. Das I.J., Chopra K.L. Backscatter dose perturbation in kilovoltage photon beams at high atomic number interfaces // Medical Physics. – 1995. – Vol. 22, No. 6. – P. 767–773. – DOI: 10.1118/1.597594.
:::

::: {custom-style="Reference"}
79. Matsudaira H., Ueno A.M., Furuno I. Iodine Contrast Medium Sensitizes Cultured Mammalian Cells to X Rays but Not to γ Rays // Radiation Research. – 1980. – Vol. 84, No. 1. – P. 144–148. – DOI: 10.2307/3575225.
:::

::: {custom-style="Reference"}
80. Adam J.-F., Elleaume H., Joubert A. [et al.] Synchrotron radiation therapy of malignant brain glioma loaded with an iodinated contrast agent: First trial on rats bearing F98 gliomas // International Journal of Radiation Oncology\*Biology\*Physics. – 2003. – Vol. 57, No. 5. – P. 1413–1426. – DOI: 10.1016/j.ijrobp.2003.07.007.
:::

::: {custom-style="Reference"}
81. Corde S., Joubert A., Adam J.F. [et al.] Synchrotron radiation-based experimental determination of the optimal energy for cell radiotoxicity enhancement following photoelectric effect on stable iodinated compounds // British Journal of Cancer. – 2004. – Vol. 91, No. 3. – P. 544–551. – DOI: 10.1038/sj.bjc.6601951.
:::

::: {custom-style="Reference"}
82. Verhaegen F., Reniers B., Deblois F. [et al.] Dosimetric and microdosimetric study of contrast-enhanced radiotherapy with kilovolt x-rays // Physics in Medicine and Biology. – 2005. – Vol. 50, No. 15. – P. 3555–3569. – DOI: 10.1088/0031-9155/50/15/005.
:::

::: {custom-style="Reference"}
83. Robar J.L., Riccio S.A., Martin M.A. Tumour dose enhancement using modified megavoltage photon beams and contrast media // Physics in Medicine and Biology. – 2002. – Vol. 47, No. 14. – P. 2433–2449. – DOI: 10.1088/0031-9155/47/14/305.
:::

::: {custom-style="Reference"}
84. Biston M.-C., Joubert A., Adam J.-F. [et al.] Cure of Fisher Rats Bearing Radioresistant F98 Glioma Treated with cis-Platinum and Irradiated with Monochromatic Synchrotron X-Rays // Cancer Research. – 2004. – Vol. 64, No. 7. – P. 2317–2323. – DOI: 10.1158/0008-5472.can-03-3600.
:::

::: {custom-style="Reference"}
85. Pignol J.-P., Rakovitch E., Beachey D., Le Sech C. Clinical significance of atomic inner shell ionization (ISI) and Auger cascade for radiosensitization using IUdR, BUdR, platinum salts, or gadolinium porphyrin compounds // International Journal of Radiation Oncology\*Biology\*Physics. – 2003. – Vol. 55, No. 4. – P. 1082–1091. – DOI: 10.1016/s0360-3016(02)04508-x.
:::

::: {custom-style="Reference"}
86. Retif P., Pinel S., Toussaint M. [et al.] Nanoparticles for Radiation Therapy Enhancement: the Key Parameters // Theranostics. – 2015. – Vol. 5, No. 9. – P. 1030–1044. – DOI: 10.7150/thno.11642.
:::

::: {custom-style="Reference"}
87. Khoshgard K., Hashemi B., Arbabi A. [et al.] Radiosensitization effect of folate-conjugated gold nanoparticles on HeLa cancer cells under orthovoltage superficial radiotherapy techniques // Physics in Medicine and Biology. – 2014. – Vol. 59, No. 9. – P. 2249–2263. – DOI: 10.1088/0031-9155/59/9/2249.
:::

::: {custom-style="Reference"}
88. Rahman W.N., Corde S., Yagi N. [et al.] Optimal energy for cell radiosensitivity enhancement by gold nanoparticles using synchrotron-based monoenergetic photon beams // International Journal of Nanomedicine. – 2014. – Vol. 9. – P. 2459–2467. – DOI: 10.2147/ijn.s59471.
:::

::: {custom-style="Reference"}
89. Brun E., Sanche L., Sicard-Roselli C. Parameters governing gold nanoparticle X-ray radiosensitization of DNA in solution // Colloids and Surfaces B: Biointerfaces. – 2009. – Vol. 72, No. 1. – P. 128–134. – DOI: 10.1016/j.colsurfb.2009.03.025.
:::

::: {custom-style="Reference"}
90. Mesbahi A. A review on gold nanoparticles radiosensitization effect in radiation therapy of cancer // Reports of Practical Oncology & Radiotherapy. – 2010. – Vol. 15, No. 6. – P. 176–180. – DOI: 10.1016/j.rpor.2010.09.001.
:::

::: {custom-style="Reference"}
91. Jain S., Hirst D.G., O'Sullivan J.M. Gold nanoparticles as novel agents for cancer therapy // The British Journal of Radiology. – 2012. – Vol. 85, No. 1010. – P. 101–113. – DOI: 10.1259/bjr/59448833.
:::

::: {custom-style="Reference"}
92. Haume K., Rosa S., Grellet S. [et al.] Gold nanoparticles for cancer radiotherapy: a review // Cancer Nanotechnology. – 2016. – Vol. 7, No. 1. – Art. 8. – DOI: 10.1186/s12645-016-0021-x.
:::

::: {custom-style="Reference"}
93. Song G., Cheng L., Chao Y. [et al.] Emerging Nanotechnology and Advanced Materials for Cancer Radiation Therapy // Advanced Materials. – 2017. – Vol. 29, No. 32. – Art. 1700996. – DOI: 10.1002/adma.201700996.
:::

::: {custom-style="Reference"}
94. Penninckx S., Heuskin A.-C., Michiels C., Lucas S. Gold Nanoparticles as a Potent Radiosensitizer: A Transdisciplinary Approach from Physics to Patient // Cancers. – 2020. – Vol. 12, No. 8. – Art. 2021. – DOI: 10.3390/cancers12082021.
:::

::: {custom-style="Reference"}
95. Kakade N.R., Sharma S.D. Dose enhancement in gold nanoparticle-aided radiotherapy for the therapeutic photon beams using Monte Carlo technique // Journal of Cancer Research and Therapeutics. – 2015. – Vol. 11, No. 1. – P. 94–97. – DOI: 10.4103/0973-1482.147691.
:::

::: {custom-style="Reference"}
96. Koger B., Kirkby C. Optimization of photon beam energies in gold nanoparticle enhanced arc radiation therapy using Monte Carlo methods // Physics in Medicine & Biology. – 2016. – Vol. 61, No. 24. – P. 8839–8853. – DOI: 10.1088/1361-6560/61/24/8839.
:::

::: {custom-style="Reference"}
97. Lechtman E., Chattopadhyay N., Cai Z. [et al.] Implications on clinical scenario of gold nanoparticle radiosensitization in regards to photon energy, nanoparticle size, concentration and location // Physics in Medicine and Biology. – 2011. – Vol. 56, No. 15. – P. 4631–4647. – DOI: 10.1088/0031-9155/56/15/001.
:::

::: {custom-style="Reference"}
98. Rosa S., Connolly C., Schettino G. [et al.] Biological mechanisms of gold nanoparticle radiosensitization // Cancer Nanotechnology. – 2017. – Vol. 8, No. 1. – Art. 2. – DOI: 10.1186/s12645-017-0026-0.
:::

::: {custom-style="Reference"}
99. Wei L., Lu J., Xu H. [et al.] Silver nanoparticles: synthesis, properties, and therapeutic applications // Drug Discovery Today. – 2015. – Vol. 20, No. 5. – P. 595–601. – DOI: 10.1016/j.drudis.2014.11.014.
:::

::: {custom-style="Reference"}
100. Burdușel A.-C., Gherasim O., Grumezescu A.M. [et al.] Biomedical Applications of Silver Nanoparticles: An Up-to-Date Overview // Nanomaterials. – 2018. – Vol. 8, No. 9. – Art. 681. – DOI: 10.3390/nano8090681.
:::

::: {custom-style="Reference"}
101. Lu R., Yang D., Cui D., Wang Z., Guo L. Egg white-mediated green synthesis of silver nanoparticles with excellent biocompatibility and enhanced radiation effects on cancer cells // International Journal of Nanomedicine. – 2012. – Vol. 7. – P. 2101–2107. – DOI: 10.2147/ijn.s29762.
:::

::: {custom-style="Reference"}
102. Punnoose J., Xu J., Sisniega A. [et al.] Technical Note: spektr 3.0—A computational tool for x-ray spectrum modeling and analysis // Medical Physics. – 2016. – Vol. 43, No. 8. – P. 4711–4717. – DOI: 10.1118/1.4955438.
:::

::: {custom-style="Reference"}
103. Kramers H.A. On the theory of X-ray absorption and of the continuous X-ray spectrum // The London, Edinburgh, and Dublin Philosophical Magazine and Journal of Science. – 1923. – Vol. 46, No. 275. – P. 836–871. – DOI: 10.1080/14786442308565244.
:::

::: {custom-style="Reference"}
104. Omar A., Andreo P., Poludniowski G. A model for the emission of K and L x rays from an x-ray tube // Nuclear Instruments and Methods in Physics Research Section B: Beam Interactions with Materials and Atoms. – 2018. – Vol. 437. – P. 36–47. – DOI: 10.1016/j.nimb.2018.10.026.
:::

::: {custom-style="Reference"}
105. Omar A., Andreo P., Poludniowski G. A model for the energy and angular distribution of x rays emitted from an x‐ray tube. Part I. Bremsstrahlung production // Medical Physics. – 2020. – Vol. 47, No. 10. – P. 4763–4774. – DOI: 10.1002/mp.14359.
:::

::: {custom-style="Reference"}
106. Omar A., Andreo P., Poludniowski G. A model for the energy and angular distribution of x rays emitted from an x‐ray tube. Part II. Validation of x‐ray spectra from 20 to 300 kV // Medical Physics. – 2020. – Vol. 47, No. 9. – P. 4005–4019. – DOI: 10.1002/mp.14360.
:::

::: {custom-style="Reference"}
107. Kawrakow I. Accurate condensed history Monte Carlo simulation of electron transport. I. EGSnrc, the new EGS4 version // Medical Physics. – 2000. – Vol. 27, No. 3. – P. 485–498. – DOI: 10.1118/1.598917.
:::

::: {custom-style="Reference"}
108. Agostinelli S., Allison J., Amako K. [et al.] Geant4—a simulation toolkit // Nuclear Instruments and Methods in Physics Research Section A: Accelerators, Spectrometers, Detectors and Associated Equipment. – 2003. – Vol. 506, No. 3. – P. 250–303. – DOI: 10.1016/S0168-9002(03)01368-8.
:::

::: {custom-style="Reference"}
109. Salvat F. PENELOPE-2018: A Code System for Monte Carlo Simulation of Electron and Photon Transport. – Paris: OECD Nuclear Energy Agency, 2019. – 420 p.
:::

::: {custom-style="Reference"}
110. Hill R., Healy B., Holloway L. [et al.] Advances in kilovoltage x-ray beam dosimetry // Physics in Medicine and Biology. – 2014. – Vol. 59, No. 6. – P. R183–R231. – DOI: 10.1088/0031-9155/59/6/R183.
:::

::: {custom-style="Reference"}
111. IEC 61267:2005. Medical diagnostic X-ray equipment – Radiation conditions for use in the determination of characteristics. – Geneva: International Electrotechnical Commission, 2005.
:::

::: {custom-style="Reference"}
112. Whiddington R. The transmission of cathode rays through matter // Proceedings of the Royal Society of London. Series A, Containing Papers of a Mathematical and Physical Character. – 1912. – Vol. 86, No. 588. – P. 360–370. – DOI: 10.1098/rspa.1912.0028.
:::

::: {custom-style="Reference"}
113. Seltzer S.M., Berger M.J. Bremsstrahlung energy spectra from electrons with kinetic energy 1 keV–10 GeV incident on screened nuclei and orbital electrons of neutral atoms with Z = 1–100 // Atomic Data and Nuclear Data Tables. – 1986. – Vol. 35, No. 3. – P. 345–418. – DOI: 10.1016/0092-640x(86)90014-8.
:::

::: {custom-style="Reference"}
114. Bote D., Salvat F. Calculations of inner-shell ionization by electron impact with the distorted-wave and plane-wave Born approximations // Physical Review A. – 2008. – Vol. 77, No. 4. – Art. 042701. – DOI: 10.1103/physreva.77.042701.
:::

::: {custom-style="Reference"}
115. Llovet X., Powell C.J., Salvat F., Jablonski A. Cross Sections for Inner-Shell Ionization by Electron Impact // Journal of Physical and Chemical Reference Data. – 2014. – Vol. 43, No. 1. – Art. 013102. – DOI: 10.1063/1.4832851.
:::

::: {custom-style="Reference"}
116. Deslattes R.D., Kessler E.G., Indelicato P. [et al.] X-ray transition energies: new approach to a comprehensive evaluation // Reviews of Modern Physics. – 2003. – Vol. 75, No. 1. – P. 35–99. – DOI: 10.1103/RevModPhys.75.35.
:::

::: {custom-style="Reference"}
117. Kalos M.H., Whitlock P.A. Monte Carlo Methods. – 2nd ed. – Weinheim: Wiley-VCH, 2008. – 215 p.
:::

::: {custom-style="Reference"}
118. Grosswendt B. Dependence of the photon backscatter factor for water on source-to-phantom distance and irradiation field size // Physics in Medicine and Biology. – 1990. – Vol. 35, No. 9. – P. 1233–1245. – DOI: 10.1088/0031-9155/35/9/004.
:::

::: {custom-style="Reference"}
119. ICRP Publication 103. The 2007 Recommendations of the International Commission on Radiological Protection // Annals of the ICRP. – 2007. – Vol. 37, No. 2–4. – P. 1–332.
:::

::: {custom-style="Reference"}
120. IAEA Safety Standards Series No. GSR Part 3. Radiation Protection and Safety of Radiation Sources: International Basic Safety Standards. – Vienna: International Atomic Energy Agency, 2014. – 436 p.
:::

::: {custom-style="Reference"}
121. O‘zbekiston Respublikasining “Radiatsiyaviy xavfsizlik to‘g‘risida”gi Qonuni, 2000-yil 31-avgust, № 120-II [Law of the Republic of Uzbekistan “On Radiation Safety”, 31 August 2000, No. 120-II].
:::


# APPENDICES

## Appendix A. Source code of the spectrum model (fragments)

The developed model (DM) is implemented in the Python module `xspec.py`; the fragments are verbatim (energies in keV, lengths in cm). Omitted are the Bethe stopping power (ICRU Report 37 constants [68], no density-effect correction; (2.1), (2.2)), the electron depth with the fitted $\eta = 0.40$ ((2.3), (2.4)), the thick-target integral for isotropic emission (2.8), the direct K lines (2.10) and the filtration, fluence and air kerma ((2.15), (2.16), (2.17)).

`brems_dcs` returns Kramers' cross-section (2.5) or, by default, the non-relativistic Bethe–Heitler one (2.6) with the Elwert factor (2.7); `sigma_K_gryzinski` is the Gryziński K-shell ionisation cross-section (2.9) for the overvoltage ratio $U_K = T/E_K$ (variable `U`).

```python
def brems_dcs(T, k, Z, model='BH-E'):
    """Bremsstrahlung differential cross-section d(sigma)/dk (cm^2/keV/atom)
    for an electron of kinetic energy T emitting a photon of energy k."""
    T = np.asarray(T, float)
    k = np.asarray(k, float)
    valid = k < T
    b02 = beta2(T)
    if model == 'Kramers':
        val = (16 * np.pi / (3 * np.sqrt(3))) * ALPHA * Z ** 2 * RE ** 2 / (b02 * k)
        return np.where(valid, val, 0.0)
    Tf = np.clip(T - k, 1e-9, None)
    p0 = momentum(T)
    p = momentum(Tf)
    lg = np.log((p0 + p) / np.clip(p0 - p, 1e-30, None))
    val = (16.0 / 3.0) * ALPHA * Z ** 2 * RE ** 2 / (b02 * k) * lg
    b0 = np.sqrt(b02)
    b1 = np.sqrt(beta2(Tf))
    eta0 = 2 * np.pi * Z * ALPHA / b0
    eta1 = 2 * np.pi * Z * ALPHA / np.clip(b1, 1e-12, None)
    elwert = (b0 / np.clip(b1, 1e-12, None)) * (-np.expm1(-eta0)) / (-np.expm1(-eta1))
    return np.where(valid, val * elwert, 0.0)


def sigma_K_gryzinski(T, EK, nK=2):
    """Electron-impact K-shell ionisation cross-section (cm^2), Gryzinski."""
    U = np.asarray(T, float) / EK
    out = np.zeros_like(U)
    m = U > 1
    u = U[m]
    out[m] = (PI_E4 * nK / EK ** 2) / u * ((u - 1) / (u + 1)) ** 1.5 * \
        (1 + (2.0 / 3.0) * (1 - 1 / (2 * u)) * np.log(2.7 + np.sqrt(u - 1)))
    return out
```

Two excerpts of `TubeModel._characteristic` evaluate the indirect fluorescence in closed form (2.14) from the generated bremsstrahlung above the K-edge, where `tauK` is $\tau_K$ and `b` is $\mu_j/\sin\theta$.

```python
        # indirect: generated bremsstrahlung above edge, surface-source approx.
        above = self.E > EK
        tauK = np.zeros_like(self.E)
        tauK[above] = self.rho * np.array([xr.CS_Photo_Partial(Z, xr.K_SHELL, float(e))
                                           for e in self.E[above]])

            indirect = 0.0
            if self.include_indirect:
                b = muL / np.sin(th)
                Nk = self.brems_generated * self.dE
                indirect = (Nk * (tauK / 2) * np.log1p(b / self.mu_anode) / b).sum() * omega * p / (4 * np.pi)
```

`def_factor` calculates the DEF in the kerma approximation (2.23) with the mixture rule (2.22), attenuating the energy fluence in overlying tissue (2.26) or, with `attenuate_with_agent=True`, in the Ag-loaded mixture of tissue density (2.27).

```python
def def_factor(E, phi, w, element=47, tissue=TISSUE, depth_cm=0.0, attenuate_with_agent=False):
    """Dose enhancement factor of tissue loaded with mass fraction w of
    element, kerma (CPE) approximation, primary beam at depth depth_cm."""
    mt = mass_coeff(tissue, E, 'muen')
    ma = mass_coeff(element, E, 'muen')
    rho_t = COMPOUND_RHO.get(tissue, 1.0) if isinstance(tissue, str) else 1.0
    att_t = np.exp(-mu_lin(tissue, E) * depth_cm)
    psi = phi * E
    num_att = att_t
    if attenuate_with_agent:
        mu_mix = rho_t * ((1 - w) * mass_coeff(tissue, E, 'mu') + w * mass_coeff(element, E, 'mu'))
        num_att = np.exp(-mu_mix * depth_cm)
    num = (psi * num_att * ((1 - w) * mt + w * ma)).sum()
    den = (psi * att_t * mt).sum()
    return num / den
```

## Appendix B. Reproducibility

All tables and figures are produced by the scripts in `dissertation/code` from `dissertation/data` (the auxiliary checks of Chapter 2 excluded) with Python 3.13, NumPy 2.5.3 [65], SciPy 1.18.1 [66], Matplotlib 3.11.2 [67], xraylib 4.3.0 [60] and SpekPy 2.5.4 [15, 58]. `nist.py` interpolates the NIST tables [59] for 31 elements, dry air, water and ICRU-44 soft tissue [61] log-log between absorption edges. `run_all.py` fits $\eta$ (0.25–0.7) to the SpekPy bremsstrahlung above 3 keV and computes the validation, baseline spectrum, design and filter effects, DEF versus concentration, depth and voltage, self-shielding, element comparison, sensitivity and exposure times (`data/results.json`); `run_sweeps.py` adds the filter-thickness scans and compares 43 filter materials at equal air-kerma transmission. `mc_dose.py` runs $4 \times 10^6$ histories per configuration in five fixed-seed batches (`data/mc_results.json`), and `make_tables.py` and `figures.py` generate the tables and figures in three languages. As the analytical code is deterministic and the seeds are fixed, running the five scripts in this order reproduces all results.


