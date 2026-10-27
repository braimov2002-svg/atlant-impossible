# ANNOTATION

The effectiveness of anticancer radiotherapy is still limited by the tolerance of healthy tissues, and one strategy to optimise the dose delivered in external radiotherapy is the use of radiosensitizers. This work studies the radio-enhancement effect of silver (Ag) in biological matter irradiated with kilovoltage x-rays and quantifies it by the dose enhancement factor (DEF). The spectrum of a 45 kV copper-anode x-ray tube needed for the DEF calculations is modelled as a function of the tube design, technical parameters and filters. To this end, a semi-analytical thick-target model with one fitted parameter, the developed model (DM), was created and validated against SpekPy v2. The DEF was calculated in the kerma approximation with NIST mass energy-absorption coefficients and verified by Monte Carlo photon transport.

The unfiltered spectrum is dominated by the Cu K lines at 8.0–8.9 keV (68.5 % of the photons), so the DEF for 1 % Ag by mass is only 1.20 and remains within 1.19–1.21 when the anode angle, tube voltage or beryllium window is changed. Added filtration is the decisive parameter: 1 mm Al raises the DEF to 1.48, 2 mm Al to 1.62 and 0.2 mm Cu to 1.80, while the air kerma decreases 120–1300-fold. At equal transmission, light and medium-Z filters (Al, Ti) are optimal, whereas filters with K-edges at 20–30 keV (Mo, Ag, Sn) are the least effective at strong filtration. For Al-filtered beams, the DM reproduces the SpekPy half-value layer within 5 % and the DEF within 2 %. The DEF increases with depth (beam hardening) and decreases inside a heavily loaded region (self-shielding); Monte Carlo calculations confirm these values within 1–10 %. Per unit mass, Ag is a weaker physical sensitizer than Au, Pt, Bi or Gd and is comparable to iodine. The xraylib 4.3.0 energy-absorption data for light elements were found to be up to 37 % too low, which would overestimate the DEF. The results support the choice of filtration and exposure conditions for experiments with Ag-containing radiosensitizers.

**Keywords:** x-ray tube spectrum; copper anode; bremsstrahlung; characteristic radiation; filtration; silver; radiosensitization; dose enhancement factor; kilovoltage x-rays; Monte Carlo method.

# ANNOTATSIYA

Saratonga qarshi nur terapiyasining samaradorligi hanuzgacha sog‘lom to‘qimalarning chidamliligi bilan cheklanib qolmoqda, masofaviy nur terapiyasida beriladigan dozani optimallashtirish strategiyalaridan biri esa radiosensibilizatorlardan foydalanishdir. Ushbu ishda kilovoltli rentgen nurlari bilan nurlantirilgan biologik muhitda kumushning (Ag) radiokuchayish effekti tadqiq qilinadi va u dozani kuchaytirish koeffitsiyenti (DEF) orqali miqdoriy baholanadi. DEFni hisoblash uchun zarur bo‘lgan 45 kV li mis anodli rentgen trubkasining spektri trubka konstruksiyasi, texnik parametrlari va filtrlariga bog‘liq holda modellashtiriladi. Shu maqsadda bitta moslashtirilgan parametrga ega bo‘lgan qalin nishonning yarim analitik modeli — ishlab chiqilgan model (IM) yaratildi va SpekPy v2 bilan solishtirish orqali validatsiya qilindi. DEF kerma yaqinlashuvida NIST massaviy energiya yutilish koeffitsiyentlari yordamida hisoblandi va fotonlar ko‘chishini Monte-Karlo usulida modellashtirish orqali verifikatsiya qilindi.

Filtrlanmagan spektrda 8,0–8,9 keV dagi Cu K chiziqlari ustunlik qiladi (fotonlarning 68,5 % qismi), shu sababli massa bo‘yicha 1 % Ag uchun DEF atigi 1,20 ga teng bo‘lib, anod burchagi, trubka kuchlanishi yoki berilliy oyna o‘zgartirilganda 1,19–1,21 oralig‘ida qoladi. Qo‘shimcha filtrlash hal qiluvchi parametr hisoblanadi: 1 mm Al DEFni 1,48 gacha, 2 mm Al 1,62 gacha, 0,2 mm Cu esa 1,80 gacha oshiradi, bunda havodagi kerma 120–1300 marta kamayadi. O‘tkazish koeffitsiyenti bir xil bo‘lganda yengil va o‘rtacha Z li filtrlar (Al, Ti) optimal hisoblanadi, K-chegaralari 20–30 keV da joylashgan filtrlar (Mo, Ag, Sn) esa kuchli filtrlashda eng kam samarali bo‘ladi. Al bilan filtrlangan dastalar uchun IM SpekPy yordamida hisoblangan yarim susaytirish qatlamini 5 % dan, DEFni esa 2 % dan oshmaydigan farq bilan takrorlaydi. DEF chuqurlik ortishi bilan ortadi (dastaning qattiqlashishi) va Ag miqdori yuqori bo‘lgan soha ichida kamayadi (o‘z-o‘zini ekranlash); Monte-Karlo hisoblari bu qiymatlarni 1–10 % doirasida tasdiqlaydi. Massa birligiga nisbatan olinganda Ag fizik sensibilizator sifatida Au, Pt, Bi yoki Gd elementlaridan kuchsizroq bo‘lib, samaradorligi jihatidan yod bilan taqqoslanarli. Yengil elementlar uchun xraylib 4.3.0 kutubxonasidagi energiya yutilish ma’lumotlari 37 % gacha past baholanganligi aniqlandi, bu esa DEFning oshirib baholanishiga olib kelgan bo‘lar edi. Olingan natijalar Ag saqlovchi radiosensibilizatorlar bilan o‘tkaziladigan tajribalar uchun filtrlash va ekspozitsiya sharoitlarini tanlashga asos bo‘ladi.

**Kalit so‘zlar:** rentgen trubkasi spektri; mis anod; tormozlanish nurlanishi; xarakteristik nurlanish; filtrlash; kumush; radiosensibilizatsiya; dozani kuchaytirish koeffitsiyenti; kilovoltli rentgen nurlanishi; Monte-Karlo usuli.

# АННОТАЦИЯ

Эффективность противоопухолевой лучевой терапии по-прежнему ограничена толерантностью здоровых тканей, и одной из стратегий оптимизации дозы, подводимой при дистанционной лучевой терапии, является применение радиосенсибилизаторов. В работе исследуется эффект радиоусиления, обусловленный серебром (Ag), в биологической среде, облучаемой киловольтным рентгеновским излучением, и проводится его количественная оценка с помощью коэффициента усиления дозы (DEF). Необходимый для расчёта DEF спектр рентгеновской трубки с медным анодом, работающей при напряжении 45 кВ, моделируется в зависимости от конструкции трубки, её технических параметров и фильтров. С этой целью создана полуаналитическая модель толстой мишени с одним подгоночным параметром — разработанная модель (РМ), — и выполнена её валидация путём сравнения со SpekPy v2. DEF рассчитан в приближении кермы с использованием массовых коэффициентов поглощения энергии NIST и верифицирован моделированием переноса фотонов методом Монте-Карло.

В нефильтрованном спектре преобладают K-линии Cu с энергиями 8,0–8,9 кэВ (68,5 % фотонов), поэтому DEF при массовой доле Ag 1 % составляет лишь 1,20 и остаётся в пределах 1,19–1,21 при изменении угла анода, напряжения на трубке или бериллиевого окна. Решающим параметром является дополнительная фильтрация: фильтр 1 мм Al повышает DEF до 1,48, 2 мм Al — до 1,62, 0,2 мм Cu — до 1,80, при этом воздушная керма уменьшается в 120–1300 раз. При одинаковом пропускании оптимальны фильтры из лёгких элементов и элементов со средним Z (Al, Ti), тогда как фильтры с K-краями в области 20–30 кэВ (Mo, Ag, Sn) при сильной фильтрации наименее эффективны. Для пучков с алюминиевым фильтром РМ воспроизводит слой половинного ослабления, рассчитанный SpekPy, с точностью до 5 %, а DEF — с точностью до 2 %. DEF возрастает с глубиной (ужесточение пучка) и уменьшается внутри области с высоким содержанием серебра (самоэкранирование); расчёты методом Монте-Карло подтверждают эти значения в пределах 1–10 %. В расчёте на единицу массы Ag является более слабым физическим сенсибилизатором, чем Au, Pt, Bi или Gd, и сопоставимо с йодом. Установлено, что данные xraylib 4.3.0 о поглощении энергии для лёгких элементов занижены на величину до 37 %, что привело бы к завышению DEF. Полученные результаты служат обоснованием выбора фильтрации и условий облучения в экспериментах с серебросодержащими радиосенсибилизаторами.

**Ключевые слова:** спектр рентгеновской трубки; медный анод; тормозное излучение; характеристическое излучение; фильтрация; серебро; радиосенсибилизация; коэффициент усиления дозы; киловольтное рентгеновское излучение; метод Монте-Карло.

# LIST OF ABBREVIATIONS AND SYMBOLS



| Abbreviation / symbol | Meaning |
|:---|:---|
| AgNP | silver nanoparticle |
| AuNP | gold nanoparticle |
| CPE | charged-particle equilibrium |
| CSDA | continuous-slowing-down approximation |
| DCS | differential cross-section |
| DEF | dose enhancement factor |
| DM | developed model (the semi-analytical x-ray spectrum model of this work) |
| HVL | half-value layer (HVL1 and HVL2 are the first and second half-value layers) |
| IAEA | International Atomic Energy Agency |
| ICRP | International Commission on Radiological Protection |
| ICRU | International Commission on Radiation Units and Measurements |
| kVp | kilovolt peak (peak voltage of the x-ray tube) |
| MC | Monte Carlo (method) |
| NIST | National Institute of Standards and Technology (USA) |
| ROS | reactive oxygen species |
| RT | radiotherapy |
| SER | sensitizer enhancement ratio |
| $D$ | absorbed dose, Gy |
| $E$ | photon energy, keV |
| $\bar{E}$ | mean photon energy of a spectrum, keV |
| $E_K$ | K-shell binding energy (K absorption-edge energy), keV |
| $K$ | kerma (kinetic energy released per unit mass), Gy; $K_{\mathrm{air}}$ is the air kerma |
| K$\alpha$, K$\beta$ | characteristic lines of the K series (transitions to the K shell from the L shell and from the M and N shells, respectively) |
| $S(T)$ | collision stopping power of the anode material for an electron of kinetic energy $T$; $S/\rho$ is the mass collision stopping power, MeV cm$^2$/g |
| $T$ | kinetic energy of an electron, keV |
| $U$ | tube voltage, kV |
| $w$ | mass fraction of silver (or of another high-Z element) in the tissue |
| $Z$ | atomic number |
| $\eta$ | electron depth factor, the single adjustable parameter of the DM |
| $\theta$ | anode angle (angle between the anode surface and the central ray of the beam) |
| $\mu$ | linear attenuation coefficient, cm$^{-1}$ |
| $\mu/\rho$ | mass attenuation coefficient, cm$^2$/g ($\rho$ is the density) |
| $\mu_{en}/\rho$ | mass energy-absorption coefficient, cm$^2$/g |
| $\sigma_K$ | cross-section of K-shell ionisation by electron impact, b |
| $\Phi(E)$ | spectral photon fluence (photon fluence per unit energy interval) |
| $\Psi(E)$ | spectral energy fluence, $\Psi(E) = E\,\Phi(E)$ |
| $\omega_K$ | K-shell fluorescence yield |


# INTRODUCTION

**Relevance of the topic.** Cancer is a major cause of morbidity and mortality worldwide [1], and about half of all cancer patients have an indication for radiotherapy (RT) [2]. The effectiveness of anticancer RT is still limited by the tolerance of the healthy tissues that surround the tumour and inevitably receive part of the dose [3, 4]. The therapeutic window can be widened either by improving the conformity of the dose distribution or by increasing the response of the tumour to a given dose [3]. The second strategy relies on radiosensitizers, agents that enhance the effect of radiation in the tissue where they accumulate [3, 5]. Besides chemical radiosensitizers [5], compounds and nanoparticles of heavy metals are now studied intensively [6, 7].

Elements with a high atomic number $Z$ absorb kilovoltage photons much more strongly than soft tissue, because the photoelectric cross-section increases steeply with $Z$ and decreases with photon energy [8]. A tumour loaded with such an element therefore absorbs more energy per unit mass than the surrounding tissue. Gold nanoparticles 1.9 nm in diameter markedly improved the one-year survival of tumour-bearing mice irradiated with 250 kVp (kilovolt peak) x-rays [9], and Monte Carlo (MC) calculations showed that the macroscopic dose enhancement by gold is much larger for kilovoltage than for megavoltage beams [10]. Silver nanoparticles (AgNPs) were proposed as a radiation sensitizer for glioma [11] and were reported to outperform gold nanoparticles (AuNPs) in radiosensitizing glioma cells in vitro and in an intracranial mouse model [12]. Silver is also less expensive than gold, and its K absorption edge at 25.514 keV lies inside the spectrum of a 45 kV x-ray tube.

The physical effect of silver is quantified by the dose enhancement factor (DEF), the ratio of the absorbed dose in tissue containing silver to that in the same tissue without it. Between 8 and 25 keV, the ratio of the mass energy-absorption coefficients of silver and soft tissue is only 21–32; at the Ag K-edge it jumps to about 76 and then rises to 100–139 at 30–45 keV. The DEF therefore depends strongly on the fraction of the photon energy fluence that lies above the Ag K-edge, consistent with the strong energy dependence of dose enhancement by high-Z agents [10, 13]. Kilovoltage beams are usually specified by the tube voltage and the half-value layer (HVL) [14], but these two parameters do not uniquely determine the spectral distribution around an absorption edge, so a reliable DEF calculation requires the spectrum of the source itself, as provided by x-ray spectrum models [15].

This work considers an x-ray tube with a copper anode operated at 45 kV. Unlike the tungsten-anode tubes used in diagnostic radiology and orthovoltage therapy [16, 17], it emits most of the photons of the unfiltered beam in the Cu K lines at 8.0–8.9 keV, far below the Ag K-edge, together with a bremsstrahlung continuum that extends up to 45 keV. The spectrum of such a tube, and hence the DEF, is governed by its design and technical parameters (anode angle, tube voltage, beryllium window) and by the filters placed in the beam. Modelling the spectrum of a copper-anode tube as a function of these parameters, and using it to determine the DEF of biological matter containing silver, is therefore a relevant problem of medical physics.

**Degree of study of the problem.** The concept of dose enhancement near high-Z media goes back to Spiers, who analysed the increased energy absorption in and near bone irradiated with kilovoltage x-rays [18]. Dose enhancement by iodine was calculated for kilovoltage beams [19, 20] and used in the first radiotherapy of human brain metastases delivered with a modified computed tomography scanner [21]. Since the work of Hainfeld et al. [9], gold nanoparticles have been studied extensively in cells and by MC simulation [22–25], and their mechanisms have been reviewed [7, 26–28]. Different elements were compared theoretically as functions of photon energy [13, 29]. It was also shown that the dose enhancement around nanoparticles is highly localised [30] and that such nanoscale energy deposition can explain biological effects beyond the macroscopic dose enhancement [31].

For silver, an early report showed that AgNPs sensitize cancer cells to radiation-induced killing [32], and later studies demonstrated radiosensitization by AgNPs in glioma [11, 12, 33, 34], in breast cancer cells [35] and in colorectal cancer [36]. AgNPs are themselves cytotoxic and genotoxic and induce reactive oxygen species (ROS) and DNA damage [37], so part of their effect may be chemical or biological rather than physical. Dosimetric studies of silver include MC calculations for brain-tumour brachytherapy [38], for the healthy tissues surrounding a loaded tumour [39] and for layered skin geometries in comparison with gold [40], as well as measurements in AgNP-enriched dose gels [41]; the depth dependence of nanoparticle dose enhancement in orthovoltage beams was examined in an MC phantom study [42].

Methods of modelling x-ray tube spectra range from empirical [43] and semi-empirical models [44, 45] to physics-based deterministic models [15, 46–48] and full MC simulation [49, 50]. Most of them were developed for tungsten anodes [43, 45, 48]. The SpekPy toolkit, which has been validated against measured spectra and HVLs [51], supports a copper anode in its version 2 [15]. Copper-anode tubes are used mainly in x-ray diffraction, where a nearly monochromatic Cu Kα beam is obtained with a nickel filter [52], whereas dose enhancement by silver requires photons above the Ag K-edge. Thus, the relation between the design and filtration of a low-voltage copper-anode tube, its spectrum and the DEF of silver-loaded tissue has not been studied quantitatively in the literature reviewed in this work, and this gap determined the aim and tasks of the dissertation.

**Aim of the work.** The aim of the work is to model the spectrum of a 45 kV copper-anode x-ray tube as a function of its design and technical parameters and filtration, and on this basis to determine quantitatively the DEF of soft tissue containing silver and the filtration that maximises it at an acceptable dose rate.

**Tasks of the research.** To achieve this aim, the following tasks were solved:

1. To analyse the literature on radiosensitization by high-Z elements, in particular silver, and on the modelling of x-ray tube spectra.
2. To develop a semi-analytical thick-target model of the spectrum of a copper-anode tube that includes electron slowing-down, bremsstrahlung, direct and bremsstrahlung-induced characteristic K radiation, self-absorption in the anode and attenuation in the window, air and filters.
3. To validate the developed model against the SpekPy v2 toolkit and to determine its single adjustable parameter.
4. To calculate the spectrum and beam-quality parameters of the 45 kV tube and their dependence on the anode angle, tube voltage, beryllium window and added filters.
5. To calculate the DEF of soft tissue containing 0.1–2 % silver by mass and to find the filters that maximise it at an acceptable dose rate.
6. To study the depth dependence of the DEF and the self-shielding by a silver-loaded region, and to verify the analytical results by an independent MC calculation.
7. To compare silver with other high-Z elements, to estimate the uncertainty of the DEF and to formulate practical recommendations for experiments.

**Object of the research.** The object of the research is the x-ray radiation of a 45 kV x-ray tube with a copper anode and its interaction with soft biological tissue containing silver.

**Subject of the research.** The subject of the research is the formation of the x-ray spectrum, its dependence on the tube design and filtration, and the resulting DEF of silver-loaded tissue.

**Research methods.** The spectrum is calculated with the developed model (DM), a semi-analytical thick-target model based on the Bethe collision stopping power in the continuous-slowing-down approximation (CSDA), the non-relativistic Bethe–Heitler bremsstrahlung cross-section with the Elwert factor and the Gryzinski K-shell ionisation cross-section [53–57]; SpekPy v2.5.4 serves as the reference model [15, 58]. Interaction data are taken from the NIST tables of Hubbell and Seltzer [59] and from the xraylib library [60], with ICRU-44 soft tissue as the reference medium [61]. The DEF is calculated in the kerma approximation, which assumes charged-particle equilibrium (CPE) [62], and verified by an MC photon-transport code written for this work that uses Woodcock tracking [63], models Ag K fluorescence and coherent and incoherent scattering [64] and deposits the energy of secondary electrons locally. The uncertainty is estimated by a sensitivity analysis; the calculations are implemented in Python with NumPy, SciPy and Matplotlib [65–67].

**Scientific novelty.** The scientific novelty of the work consists in the following:

1. A semi-analytical model of the spectrum of a reflection-type copper-anode x-ray tube has been developed with a single adjustable parameter, the electron depth factor $\eta$, and with the bremsstrahlung-induced characteristic K radiation described by a closed-form expression. With $\eta = 0.40$, fitted to the SpekPy v2 bremsstrahlung shape (root-mean-square deviation 2.46 %), the DM reproduces without refitting the HVL of SpekPy spectra filtered by 1 mm Al with deviations of −3.5 to −4.6 % and their mean energy within 0.54 keV for 25–50 kV and anode angles of 6–30°.
2. It has been established that, without added filtration, the DEF for 1 % silver by mass is only 1.20 and stays within 1.19–1.21 for anode angles of 6–30°, tube voltages of 25–50 kV and beryllium windows of 0.15–2 mm, because the dose is dominated by the Cu K lines and soft bremsstrahlung. Added filtration is the decisive factor: the DEF is 1.48 with 1 mm Al, 1.62 with 2 mm Al and 1.80 with 0.2 mm Cu, at the cost of a 120–1300-fold lower air kerma.
3. At equal air-kerma transmission, light and medium-Z filters without absorption edges in the 9–45 keV range (Al, Si, Ca, Sc, Ti) give the highest DEF, whereas filters with K-edges at 20–30 keV (Mo, Ag, Sn) are the least effective at strong filtration. At 0.1 % transmission, the DEF for 1 % silver is about 1.91 with Sc or Ti filters but only 1.34 with an Ag filter.
4. With 1 mm Al filtration, the DEF for 1 % silver increases from 1.48 at the surface to 1.69 at a depth of 20 mm (beam hardening) but decreases to 1.21 at 10 mm inside a uniformly loaded region (self-shielding); the dose behind a 10 mm layer containing 1 % silver falls to about 0.80 of the silver-free value. An independent MC calculation for this layer confirmed the analytical model within 1–10 % and revealed the role of reabsorbed Ag K fluorescence and scattered photons.
5. Per unit mass, silver is a weaker physical sensitizer at 45 kV than gold, platinum, bismuth and gadolinium (DEF 1.48 against 2.16 for gold with 1 mm Al filtration) and is comparable to iodine (1.46). The stronger biological radiosensitization reported for AgNPs than for AuNPs [12] therefore points to chemical and biological mechanisms and nanoscale effects beyond the macroscopic physical dose enhancement.

**Practical significance.** The DM and its software calculate the spectrum, air kerma and beam quality of low-voltage copper-anode tubes for given design parameters and filters, as needed for planning radiobiological experiments with silver-containing radiosensitizers. For a 45 kV copper-anode tube, a 1–2 mm aluminium filter (or a 0.1–0.3 mm titanium filter) is recommended: with aluminium, the DEF for 1 % silver is 1.48–1.62, and a tissue kerma of 2 Gy at the sample surface (10 cm from the focal spot, 40 mA) is delivered in about 15–33 s. It was also found that the CS_Energy function of xraylib 4.3.0 underestimates the mass energy-absorption coefficients of light elements at 15–45 keV by up to 37 % (oxygen at 30 keV), which would overestimate the DEF (1.72 instead of 1.48 for 1 % silver and 1 mm Al); the NIST tables should therefore be used.

**Reliability of the results.** Reliability is ensured by established physical models and evaluated data, namely the NIST photon interaction tables [59] and the stopping-power parameters of ICRU Report 37 [68]. The implemented Bethe formula reproduces the NIST ESTAR collision stopping power of water at 50 keV (6.603 MeV cm$^2$/g) [69]. The DM also reproduces the SpekPy HVL for a tungsten anode at 50–100 kV within 6 %, and SpekPy itself has been validated against measurements [51]. The energy-transfer coefficients reconstructed from the interaction data of the MC code reproduce the NIST mass energy-absorption coefficients of H, C and O at 20–40 keV within 0.3 %, and the MC and analytical DEF values agree within 1–10 %. The sensitivity analysis gives DEF = 1.48 ± 0.02 (coverage factor $k = 1$) for 1 % silver and 1 mm Al filtration.

**Approbation of the results.** The main results of the dissertation were reported and discussed at [to be completed by the author: conferences and seminars where the results were reported].

**Publications.** The main results of the dissertation are presented in [to be completed by the author: list of publications].

**Structure and volume of the dissertation.** The dissertation consists of an introduction, three chapters, conclusions, a list of references and appendices, preceded by annotations in three languages (Uzbek, Russian and English) and a list of abbreviations and symbols. The work comprises 120 pages, 23 figures, 17 tables and 121 references. Chapter 1 reviews the literature on high-Z radiosensitizers and spectrum modelling, Chapter 2 describes the DM and the methods of calculating the beam-quality parameters and the DEF, including the MC verification, and Chapter 3 presents and discusses the results. The appendices contain fragments of the source code and information on reproducibility.


# CHAPTER 1. RADIOSENSITIZATION BY HIGH-Z ELEMENTS AND X-RAY SPECTRUM MODELING: LITERATURE REVIEW

This chapter reviews the physical and radiobiological background of the work. It considers the clinical problem that motivates the use of radiosensitizers, the interaction of kilovoltage photons with biological matter and the development of radiosensitization by elements with a high atomic number (high-Z elements), from iodinated contrast agents to metal nanoparticles. It then reviews silver as a radiosensitizer and the methods of modelling x-ray tube spectra. The chapter closes with conclusions that define the tasks of this dissertation.

## 1.1. Radiotherapy and the problem of normal-tissue tolerance

Cancer is a major cause of morbidity and mortality worldwide [1]. Radiotherapy (RT) is, together with surgery and chemotherapy, one of the principal modalities of cancer treatment [4]. An analysis of evidence-based clinical guidelines estimated the optimal rate of RT utilisation at approximately 52 %, so that about half of all cancer patients have an indication for RT [2]. The therapeutic action of RT is based on damage to cellular DNA, produced directly by secondary electrons or indirectly by the free radicals formed in the radiolysis of water; double-strand breaks are the most lethal of these lesions [3]. Because energy deposition by ionising radiation is not selective, the same damage occurs in the healthy tissues traversed by the beam, and their response ultimately limits the dose that can be delivered to the tumour [3, 4].

The quantitative expression of this limitation is the therapeutic ratio. The probabilities of tumour control and of normal-tissue complications both increase with dose along sigmoid dose–response curves, and the therapeutic ratio characterises the separation between them [3]. When the curves lie close together, a dose escalation that would improve local control also produces an unacceptable rate of severe complications, so that the tolerance of the normal tissues and organs near the target limits the prescribed dose. Normal-tissue toxicity is therefore regarded as the main factor limiting the effectiveness of RT [4]. The problem is aggravated for radioresistant tumours, in particular those containing hypoxic cells, which are considerably less sensitive to x-rays than well-oxygenated cells because of the oxygen effect [3].

Several strategies have been developed to widen the therapeutic window. Fractionation of the total dose exploits the differences in repair and recovery between normal and tumour tissues [3, 4]. Conformal techniques such as intensity-modulated RT, combined with image guidance, shape the high-dose region to the target volume and reduce the irradiated volume of normal tissue [4, 17]. Neither approach, however, changes the ratio of the energy absorbed per unit mass in tumour cells and in normal cells located in the same region of the beam. A third strategy acts on this ratio directly: radiosensitizers are agents that increase the effect of radiation on tumour cells more than on normal cells [3, 5].

Chemical radiosensitizers include the oxygen mimetics, such as the nitroimidazoles, which imitate the action of oxygen in hypoxic cells [5]. Compounds of platinum, gold, ruthenium and other transition metals combine chemical and biological activity with the presence of heavy atoms [6]. A distinct, essentially physical principle underlies the use of high-Z elements. An element of this kind concentrated in the tumour absorbs a larger fraction of the energy of the incident photons than soft tissue does, so that the tumour dose increases while the dose to the surrounding tissue that does not contain the element remains, to a first approximation, unchanged [7, 9]. The magnitude of this increase is expressed by the dose enhancement factor (DEF), the ratio of the absorbed dose in tissue containing the high-Z agent to that in the same tissue without it (Section 2.6). In contrast to chemical sensitization, this physical component of the effect can be calculated from interaction data once the radiation field is known.

The physical gain from a high-Z element depends strongly on the photon energy. Monte Carlo (MC) calculations for gold nanoparticles showed that the macroscopic dose enhancement is much larger with kilovoltage than with megavoltage x-ray beams [10], because the strongly Z-dependent photoelectric effect dominates only at low photon energies (Section 1.2). Kilovoltage x-rays are used in superficial and orthovoltage therapy [17], and the dosimetry of 40–300 kV beams in radiotherapy and radiobiology follows dedicated protocols in which the beam quality is specified by the half-value layer (HVL) [14, 70]. Since the enhancement is determined by the photon energy distribution, the DEF of an agent cannot be stated without specifying the x-ray spectrum, which depends on the design of the x-ray tube and on its filtration. The present work addresses this problem for silver irradiated with the beam of a 45 kV x-ray tube with a copper anode.

## 1.2. Interaction of kilovoltage photons with biological matter

At energies up to 50 keV, photons interact with matter through photoelectric absorption, incoherent (Compton) scattering and coherent (Rayleigh) scattering; pair production is impossible, because its threshold, $2m_ec^2 = 1.022$ MeV (twice the electron rest energy), lies far above this range [8, 62]. The mass attenuation coefficient of a material is the sum of the partial coefficients of these processes [62, 71]:

$$\frac{\mu}{\rho} = \frac{\tau}{\rho} + \frac{\sigma_{\mathrm{coh}}}{\rho} + \frac{\sigma_{\mathrm{inc}}}{\rho}$$

EQNUM[1.1]


where $\mu$ is the linear attenuation coefficient, $\rho$ is the density of the medium, and $\tau/\rho$, $\sigma_{\mathrm{coh}}/\rho$ and $\sigma_{\mathrm{inc}}/\rho$ are the mass coefficients of photoelectric absorption, coherent scattering and incoherent scattering, all in cm²/g. For a mixture such as soft tissue, the elemental coefficients are weighted by the mass fractions of the elements [62]; evaluated data are tabulated by the National Institute of Standards and Technology (NIST) [59, 72].

In the photoelectric effect the photon is absorbed by a bound electron, which is ejected with a kinetic energy equal to the photon energy $E$ minus its binding energy [8]. The interaction occurs preferentially with the most tightly bound accessible shell, and between absorption edges the mass photoelectric coefficient varies approximately as

$$\frac{\tau}{\rho} \propto \frac{Z^{3}}{E^{3}}$$

EQNUM[1.2]


where $Z$ is the atomic number of the absorbing element; the atomic cross-section varies approximately as $Z^{4}/E^{3}$ [8, 62]. Per unit mass, a heavy element therefore absorbs photons far more strongly than H, C, N and O, which make up almost the entire mass of soft tissue [61]. This scaling, however, holds only between absorption edges: below the K-edge of a heavy element its K-shell electrons cannot take part in photoabsorption, and the ratio of its coefficient to that of tissue is much smaller than the atomic numbers alone would suggest.

Absorption edges are abrupt increases of $\tau/\rho$ at photon energies equal to the binding energies of the atomic shells [8]; for silver, the K-edge lies at 25.514 keV and the three L-subshell edges lie between 3.35 and 3.81 keV. The vacancy left by photoabsorption is filled from an outer shell, and the released energy is emitted either as a characteristic (fluorescence) x-ray or as an Auger electron [73, 74]. The K-shell fluorescence yield $\omega_K$, the probability of radiative relaxation of a K-shell vacancy, increases rapidly with $Z$: it equals 0.039 for aluminium, 0.454 for copper, 0.831 for silver and 0.960 for gold (Table 2.2) [60, 74]. In H, C, N and O, whose K-shell binding energies are below 1 keV, practically all the absorbed energy remains near the interaction site as kinetic energy of electrons. A heavy element, in contrast, re-emits a large part of it as fluorescence: Ag Kα photons (about 22 keV) have a mean free path of about 1.5 cm in soft tissue, whereas its low-energy Auger electrons deposit their energy in the immediate vicinity of the atom (Section 1.3).

In Compton scattering the photon transfers part of its energy to an atomic electron; at kilovoltage energies the scattered photon retains most of the incident energy [8, 62]. Electron binding reduces the free-electron (Klein–Nishina) cross-section at low energies and small angles, as described by the incoherent scattering function $S(x,Z)$, where $x$ is the momentum-transfer variable; Rayleigh scattering only deflects the photon and is described by the atomic form factor $F(x,Z)$ [64]. In soft tissue incoherent scattering overtakes photoabsorption in the upper part of the interval below 50 keV, while in silver photoabsorption dominates throughout [8, 72]. Since not all the energy of an interacting photon is absorbed locally, the mass energy-absorption coefficient $\mu_{en}/\rho$ includes only the energy transferred to charged particles and not re-emitted by them as bremsstrahlung [62, 75]:

$$\frac{\mu_{en}}{\rho} = \left[\frac{\tau}{\rho}\left(1-\frac{X}{E}\right) + \frac{\sigma_{\mathrm{inc}}}{\rho}\,\frac{\bar{T}_{\mathrm{inc}}}{E}\right]\left(1-\bar{g}\right)$$

EQNUM[1.3]


where $X$ is the mean energy emitted as fluorescence radiation per photoabsorption event, $\bar{T}_{\mathrm{inc}}$ is the mean kinetic energy of the Compton recoil electron, $\bar{g}$ is the mean fraction of the kinetic energy of the secondary electrons converted into bremsstrahlung, which is negligible for kilovoltage photons in low-Z media, and the remaining symbols are as in (1.1) [62]. The NIST values of $\mu_{en}/\rho$ used in this work are based on the calculations of Seltzer [59, 75].

According to the International Commission on Radiation Units and Measurements (ICRU), kerma $K$ is the sum of the initial kinetic energies of all charged particles liberated by photons per unit mass, the collision kerma $K_{\mathrm{col}}$ is its part not converted into bremsstrahlung, and the absorbed dose $D$ is the mean energy imparted per unit mass, in grays (1 Gy = 1 J/kg) [62, 76]. Under charged-particle equilibrium (CPE), when the energy carried into a small volume by charged particles equals the energy carried out of it, the absorbed dose equals the collision kerma [62, 71]:

$$D = K_{\mathrm{col}} = \Psi\,\frac{\mu_{en}}{\rho}$$

EQNUM[1.4]


where $\Psi = \Phi E$ is the energy fluence of monoenergetic photons with energy $E$ and fluence $\Phi$; for a polyenergetic beam the right-hand side is integrated over the photon spectrum (Section 2.5). Secondary electrons released by photons below 50 keV have ranges in tissue much shorter than a millimetre, so that CPE is established close to surfaces and boundaries, and by the Fano theorem it is not disturbed by density variations in a medium of uniform atomic composition [77]. Two media exposed to the same photon spectrum therefore receive absorbed doses in the ratio of their spectrum-averaged mass energy-absorption coefficients. This relation underlies the macroscopic, kerma-based DEF (Section 2.6) and fails only within distances of the order of the electron ranges from a high-Z inclusion.

The coefficients of silver and of ICRU-44 soft tissue [61] are compared in Fig. 1.1, plotted from the NIST tables [59]. Above about 4 keV, that is, above the L-edges, both coefficients of silver exceed those of tissue by more than an order of magnitude, and the ratio of the mass energy-absorption coefficients increases from 21.0 at 8 keV to 31.8 at 25 keV. At the K-edge $\mu/\rho$ of silver increases by a factor of 5.8, from 9.53 to 55.4 cm²/g, whereas $\mu_{en}/\rho$ increases only by a factor of 2.4, from 8.54 to 20.3 cm²/g. The reason is K-shell fluorescence: about 83 % of the K vacancies ($\omega_K = 0.831$) relax by emitting K x-rays, mainly Kα photons of about 22 keV, whose energy leaves the interaction site and is excluded from $\mu_{en}/\rho$.



![Fig. 1.1. Mass attenuation coefficients (solid lines) and mass energy-absorption coefficients (dashed lines) of silver and ICRU-44 soft tissue in the energy range 1–50 keV (NIST data). The vertical dashed line marks the Ag K-edge at 25.51 keV; the arrow indicates the L-subshell edges of silver.](/home/user/atlant-impossible/dissertation/code/../figures/en/fig02_coeffs.png){width=15.5cm}



For soft tissue the two coefficients nearly coincide below about 10 keV and diverge at higher energies, where scattering, which deposits little energy, takes a growing share of the attenuation. Above the K-edge, $\mu_{en}/\rho$ of silver decreases with energy more slowly than its $\mu/\rho$, because the fixed fluorescence energy becomes a progressively smaller fraction of the photon energy, and also more slowly than $\mu_{en}/\rho$ of tissue. Consequently, after the jump at the edge from about 32 to about 76, the silver-to-tissue ratio of the mass energy-absorption coefficients continues to grow, reaching 102.7 at 30 keV, 120.0 at 35 keV and a maximum of about 139 at 40–45 keV. The fraction of the photon energy fluence above the Ag K-edge is therefore the key characteristic of a beam intended for silver-enhanced irradiation, and its determination for a copper-anode tube is a central task of this work.

## 1.3. High-Z radiosensitizers: from iodine contrast to metal nanoparticles

The concept of dose enhancement near a high-Z medium in kilovoltage beams goes back to Spiers, who analysed how the increased energy absorption of bone and the ranges of the secondary electrons determine the dose to soft tissue in and near irradiated bone [18]. This analysis already contained both physical ingredients of later dose-enhancement concepts: enhanced energy transfer to the high-Z material and energy transport by secondary electrons into adjacent tissue. Das and Chopra later quantified the backscatter dose perturbation at interfaces between tissue and high-Z materials in kilovoltage beams [78]. Beyond distances of the order of the electron ranges, the dose is again governed by the local photon fluence and energy-absorption coefficient.

The first systematic studies used iodine, available in clinically approved contrast media. Matsudaira et al. found that an iodinated contrast medium sensitized cultured mammalian cells to x-rays but not to gamma rays [79], which points to the photoelectric absorption of low-energy photons by iodine. Mello et al. calculated the dose enhancement in iodine-loaded tumours for kilovoltage x-rays [19], and Solberg et al. computed DEFs for the dose-enhancement therapy of brain tumours [20]. The concept reached the clinic when a computed tomography scanner modified for therapy (CTRx) delivered the first radiotherapy of human metastatic brain tumours with iodinated contrast [21]. Monochromatic synchrotron beams were later used to treat rats bearing F98 gliomas loaded with an iodinated contrast agent [80] and to determine experimentally the optimal energy for enhancing the radiotoxicity of stable iodinated compounds in cells [81]. Kilovoltage contrast-enhanced radiotherapy was also analysed dosimetrically and microdosimetrically by MC simulation [82], and modified megavoltage beams were combined with iodine and gadolinium contrast media [83].

Platinum-based drugs combine a chemotherapeutic agent with a high-Z atom. Biston et al. reported the cure of rats bearing radioresistant F98 gliomas treated with cisplatin and irradiated with monochromatic synchrotron x-rays, which exploited the photoactivation of platinum at its K-edge [84]. Pignol et al. analysed the clinical significance of inner-shell ionisation and Auger cascades for radiosensitization with iododeoxyuridine, bromodeoxyuridine, platinum salts and gadolinium porphyrin compounds [85]; when the heavy atom lies in or near DNA, the short-range Auger electrons deposit their energy close to this critical target. This work drew attention to the subcellular location of the high-Z atom, not only to its concentration, and transition-metal complexes have since been studied widely as radiosensitizers that combine this physical mechanism with chemical and biological activity [6].

The modern stage of the field began with the study of Hainfeld et al., in which gold nanoparticles (AuNPs) 1.9 nm in diameter markedly improved the one-year survival of tumour-bearing mice irradiated with 250 kVp (kilovolt peak) x-rays [9]. The key parameters that determine the efficacy of nanoparticles, namely their material, size and coating and the photon energy, have been analysed systematically [86]. Radiosensitization by AuNPs has been demonstrated in vitro with superficial kilovoltage x-rays [23], with orthovoltage and superficial beams for folate-conjugated AuNPs in HeLa cells [87], and with monoenergetic synchrotron beams used to find the optimal photon energy [88]. Cellular uptake and radiosensitization depend on the particle size [22], and experiments with DNA in solution identified the photon energy, particle size and concentration as the governing parameters [89]. These results are summarised in several reviews [90–94] and in a roadmap to clinical use [28].

The physics of AuNP radiosensitization has been studied mainly by MC simulation. Following the first MC estimate of the macroscopic tumour dose enhancement by AuNPs in typical radiation treatments [10], Zhang et al. quantified the tumour-selective enhancement for various photon sources [24], Kakade and Sharma estimated it for therapeutic photon beams [95], and Koger and Kirkby found the kilovoltage range optimal for AuNP-enhanced arc radiotherapy [96]. Lechtman et al. showed how radiosensitization depends on the photon energy and on the size, concentration and location of the nanoparticles [97]. On the microscopic scale, the dose enhancement around AuNPs is highly localised [30], and the spatial distribution of their secondary electrons was characterised with the Geant4 toolkit [25]. These studies consistently show a strong energy dependence, so that a reliable description of the incident spectrum is a prerequisite of any dose-enhancement calculation.

The biological effect of high-Z nanoparticles, however, cannot be explained by the increase in the mean dose alone. Radio-enhancement is usually divided into a physical stage, in which the particle absorbs additional photon energy and emits photoelectrons, Auger electrons and fluorescence photons; a chemical stage, with additional production of reactive oxygen species (ROS); and a biological stage, involving oxidative stress, perturbation of the cell cycle and inhibition of DNA repair [7, 26, 27, 98]. McMahon et al. showed with a local effect model that the highly inhomogeneous nanoscale energy deposition near irradiated heavy-atom nanoparticles can explain biological effects that exceed the macroscopic dose enhancement [31]. The sensitizer enhancement ratio (SER) measured in cell experiments may therefore exceed the macroscopic DEF for the same irradiation. The macroscopic DEF nevertheless remains the baseline quantity, needed to separate the physical contribution from the chemical and biological ones.

Although gold dominates the literature, the choice of the element is not obvious. Roeske et al. characterised the theoretical, kerma-based dose enhancement from nanoparticles of various elements as a function of photon energy [13], and McMahon et al. used physical modelling to optimise the choice of element for nanoparticle radiosensitizers [29]. In the kerma approximation the comparison reduces to the ratio $R(E)$ of the mass energy-absorption coefficient of the element to that of tissue: for tissue containing a mass fraction $w$ of the element and irradiated by monoenergetic photons of energy $E$, the DEF equals $1 + w\,[R(E) - 1]$ (Section 2.6). The ratio $R(E)$ for silver, iodine, gadolinium, platinum, gold and bismuth is shown in Fig. 1.2 for 5–45 keV, an interval covering practically the whole spectrum of the 45 kV tube.



![Fig. 1.2. Ratio of the mass energy-absorption coefficient of Ag, I, Gd, Pt, Au and Bi to that of ICRU-44 soft tissue in the energy range 5–45 keV (NIST data). The vertical dashed line marks the Ag K-edge at 25.51 keV.](/home/user/atlant-impossible/dissertation/code/../figures/en/fig03_ratio.png){width=15.5cm}



Below about 12 keV the ratios for silver, platinum, gold and bismuth are similar, and that for iodine is somewhat higher. Above its L-edges (7.2–8.4 keV) and up to about 13 keV gadolinium has the highest ratio, so that it absorbs the Cu Kα lines at about 8.0 keV particularly efficiently. The L-edges of platinum, gold and bismuth at about 12–16 keV raise their ratios several-fold, and between about 12 and 25.5 keV silver has the lowest ratio of the six. Above its K-edge silver first equals and then exceeds gadolinium, whose K-edge (50.239 keV) lies above the maximum photon energy of the beam, and it exceeds iodine up to the iodine K-edge at 33.169 keV. At 40–45 keV the ratios for iodine, platinum and silver become comparable, while gold and bismuth retain the highest values.

Two conclusions follow. First, per unit mass, silver is expected to be a weaker physical sensitizer than platinum, gold and bismuth, whose ratios exceed its own over most of the interval; its advantage over iodine and gadolinium is limited to energies above its K-edge, and whether it yields a higher DEF depends on the spectrum. Second, the physical efficacy of silver is controlled mainly by the fraction of the photon energy fluence above its K-edge: between 8 keV and the edge, which includes the Cu K lines at 8.0–8.9 keV, the mass energy-absorption coefficient of silver exceeds that of tissue only 21–32 times, whereas above the edge it exceeds it 76–139 times. The design parameters of the tube, and especially its filtration, which redistribute the energy fluence relative to 25.514 keV, are therefore expected to be decisive for the DEF, as tested quantitatively in Chapter 3. The arguments that nevertheless favour silver are reviewed in Section 1.4.


## 1.4. Silver and silver nanoparticles as radiosensitizers

Silver ($Z = 47$) occupies an intermediate position between the light elements of soft tissue and the heavy elements, such as gold ($Z = 79$), that dominate the literature on high-Z radiosensitizers. Silver nanoparticles (AgNPs) are widely studied in biomedicine. Their synthesis, properties and therapeutic applications have been reviewed by Wei et al. [99], and their biomedical applications, including antimicrobial and anticancer uses, by Burdușel et al. [100]. Silver is less expensive than gold, and AgNPs can also be obtained by green synthesis, for example with egg white as the reaction medium [101]. For radiotherapy, two properties of silver are of particular interest: its biological activity and the position of its K absorption edge inside the spectra of x-ray tubes operated at a few tens of kilovolts.

The biological activity of AgNPs is closely related to their toxicity. AshaRani et al. showed that AgNPs are cytotoxic and genotoxic in human cells: they induce the formation of ROS, cause DNA damage and cell-cycle arrest, and involve the mitochondria in the toxic response [37]. These effects correspond to the chemical and biological stages of radio-enhancement described in Section 1.3, in which additional ROS, oxidative stress, perturbation of the cell cycle and inhibition of DNA repair amplify the initial physical damage [7, 98]. AgNPs may therefore sensitize cells to radiation beyond what their physical dose enhancement alone would produce. At the same time, their cytotoxicity [37] makes the selective accumulation of AgNPs in the tumour a prerequisite of therapeutic use, and the effect of dose enhancement in the tumour on the surrounding healthy tissues also has to be assessed [39].

Experimental evidence of radiosensitization by silver is summarised in Table 1.1. In an early report, Xu et al. showed that AgNPs sensitize cancer cells to killing by ionising radiation [32]. Lu et al. obtained biocompatible AgNPs by egg-white-mediated green synthesis and observed enhanced radiation effects on cancer cells [101]. Glioma is the tumour model studied most often in this group of works. Liu et al. examined AgNPs as a novel radiation sensitizer for glioma in vitro and in vivo and proposed them as an alternative to gold [11]. In a subsequent study, AgNPs outperformed AuNPs in radiosensitizing U251 glioma cells in vitro and in an intracranial mouse model of glioma [12]. AgNPs also enhanced the efficacy of radiotherapy in hypoxic glioma cells [33], which are less sensitive to x-rays because of the oxygen effect [3], and functionalisation of AgNPs with polyethylene glycol (PEG) and the aptamer AS1411 enhanced their radiosensitizing effect in glioma irradiation therapy [34]. Outside glioma, Swanner et al. found that the cytotoxic and radiosensitizing effects of AgNPs differ between triple-negative breast cancer cells and non-triple-negative breast cells [35], and Habiba et al. used silver nanoprisms decorated with graphene as radiosensitizers to enhance the efficacy of colorectal cancer radiotherapy [36].

Table: Table 1.1. Studies of silver nanoparticles as radiosensitizers.

| Study | System / radiation type | Main finding |
|:---|:---|:---|
| Xu et al., 2009 [32] | Cancer cells / ionising radiation | AgNPs sensitized radiation-induced cell killing (early report) |
| Lu et al., 2012 [101] | Cancer cells / radiation | Green-synthesised AgNPs: good biocompatibility, enhanced radiation effects |
| Liu et al., 2013 [11] | Glioma, in vitro and in vivo / radiation | AgNPs proposed as a radiation sensitizer and an alternative to gold |
| Swanner et al., 2015 [35] | Triple-negative and non-triple-negative breast cells / radiation | Cytotoxic and radiosensitizing effects differed between cell types |
| Liu et al., 2016 [12] | U251 glioma cells; intracranial mouse model / radiation | AgNPs outperformed AuNPs as radiosensitizers |
| Liu et al., 2018 [33] | Hypoxic glioma cells / radiotherapy | AgNPs enhanced the efficacy of radiotherapy under hypoxia |
| Zhao et al., 2019 [34] | Glioma / irradiation therapy | PEG- and AS1411-functionalised AgNPs enhanced radiosensitization |
| Habiba et al., 2019 [36] | Colorectal cancer / radiotherapy | Graphene-decorated silver nanoprisms acted as radiosensitizers |

The studies in Table 1.1 differ in the type and coating of the particles, for example PEG- and aptamer-coated AgNPs [34] or graphene-decorated nanoprisms [36], in the biological models and in the irradiation conditions. Their results therefore cannot be compared quantitatively with one another. Moreover, the physical dose enhancement depends strongly on the photon spectrum (Section 1.3), so that a biological enhancement ratio reported without a specified spectrum cannot be divided into physical and non-physical contributions. The comparison with gold [12] is particularly instructive. Per unit mass, silver and gold absorb photon energy comparably below about 12 keV, whereas between about 12 and 45 keV gold absorbs more strongly (Fig. 1.2). In megavoltage beams, on the other hand, the macroscopic dose enhancement is much smaller than in kilovoltage beams even for gold [10], because Compton scattering, whose mass coefficient depends only weakly on the atomic number, dominates there [8]. For kilovoltage spectra below 45 keV and for megavoltage beams, a larger macroscopic physical dose enhancement is therefore an unlikely explanation for the advantage of AgNPs. This suggests that the chemical and biological activity of silver [37] and nanoscale effects of energy deposition [31] make a substantial contribution; confirming this requires a quantitative estimate of the physical part for a well-defined beam.

In the literature reviewed here, dosimetric studies of silver are fewer than biological ones. Taha et al. used MC simulation with a digital phantom to estimate the dose enhancement due to AgNPs implanted in a brain tumour during brachytherapy [38]. Çağlar et al. studied by MC simulation how the dose enhancement produced by AgNPs in a tumour affects the surrounding healthy tissues [39], and Eşitmez et al. compared silver and gold nanoparticles for dose enhancement in layered skin geometries in an MC sensitivity study [40]. Merkis et al. investigated experimentally the dose sensitivity and the dose enhancement effect in dose gels enriched with AgNPs [41]. The depth dependence of nanoparticle dose enhancement in orthovoltage beams, which is also relevant to silver, was examined by Chow and Jubran in an MC phantom study [42]. A systematic analysis of how the design and filtration of a kilovoltage x-ray tube determine the DEF of silver-loaded tissue has not been found in the literature reviewed in this work.

The choice of a beam for silver follows from its atomic data (Table 2.2). The K-shell binding energy of silver is 25.514 keV, its L3 edge lies at 3.351 keV and its Kα1 line has an energy of 22.163 keV. Because the K-shell fluorescence yield is $\omega_K = 0.831$, only about 17 % of the K vacancies relax by Auger transitions, which deposit their energy close to the atom [73, 74]. The remaining 83 % emit K x-rays, mainly Kα photons of about 22 keV, which have a mean free path of about 1.5 cm in soft tissue and carry this energy away from the absorbing atom. As shown in Sections 1.2 and 1.3, the ratio of the mass energy-absorption coefficients of silver and ICRU-44 soft tissue is 21–32 between 8 keV and the K-edge but 76–139 between the edge and 45 keV. The K-edge of gold lies at 80.725 keV and can be exploited only with tube voltages above about 81 kV, whereas the K-edge of silver lies inside the spectrum of any tube operated above about 26 kV. Kilovoltage spectra with a large fraction of the energy fluence between the Ag K-edge and the end-point energy of the beam, which is 45 keV for the tube considered here, are therefore the most favourable for the physical dose enhancement by silver. The Cu K lines at 8.0–8.9 keV, which dominate the photon fluence of the unfiltered beam of a copper-anode tube, lie far below this window.

## 1.5. Methods of modelling x-ray tube spectra

The calculation of the DEF requires the spectrum of the x-ray source. Spectra can be measured with semiconductor detectors [44], but such measurements require corrections for the detector response and are impractical for every tube configuration, so that parametric studies rely on calculated spectra. The calculation methods fall into four groups: empirical models, which interpolate measured or precomputed spectra; semi-empirical models, which combine a simplified physical description with parameters adjusted to measurements; physics-based deterministic models, which compute the spectrum from cross-sections and electron-penetration data; and full MC simulation of electron and photon transport in the tube. Their main features are compared in Table 1.2.

A representative empirical model is TASMIP (tungsten anode spectral model using interpolating polynomials), which generates tungsten-anode spectra from 30 to 140 kV with interpolating polynomials derived from measured data [43]. The spektr 3.0 tool provides spectrum modelling and analysis on the basis of the TASMICS model [102]. Empirical models are fast and accurate within the range of the underlying data, but they are bound to the anode material, anode angle and inherent filtration of the tubes for which the data were obtained. Added filtration can be included as an attenuation factor, but the influence of the anode material and angle, studied in this work, cannot be described.

Semi-empirical models go back to Kramers' theory of the continuous x-ray spectrum, according to which the energy emitted from a thick target per unit photon-energy interval is proportional to $Z(T_0 - E)$, where $Z$ is the atomic number of the target, $T_0$ is the initial kinetic energy of the electrons and $E$ is the photon energy [8, 103]. Birch and Marshall developed a semi-empirical model of bremsstrahlung spectra and compared it with spectra measured with a lithium-drifted germanium (Ge(Li)) detector [44]. Tucker, Barnes and Chakraborty proposed a semi-empirical model for tungsten-target spectra (the TBC model) [45]. Models of this group combine a simplified bremsstrahlung cross-section with an approximate description of electron penetration and of photon self-absorption in the target and adjust some parameters to experimental data. They are computationally cheap and show explicitly how the spectrum depends on the tube voltage, anode angle and filtration, but their accuracy is limited by the simplified physics and their parameters are specific to the target material, usually tungsten.

Physics-based deterministic models replace most empirical parameters with data derived from theory or from MC calculations. Poludniowski and Evans described the penetration of electrons into x-ray targets with characteristics derived from MC simulations [46], and Poludniowski used them to calculate x-ray production and filtration within the target [47]. This theory was implemented in the SpekCalc program for tungsten anodes [48]. The later SpekPy v2 toolkit offers several physics models, among them the casim model used in this work, and several anode materials, including copper [15]; in version 2.5.4 [58] the copper anode is available for 10–50 kV. SpekPy relies on a model of K and L x-ray emission [104], and the same group developed a model of the energy and angular distribution of bremsstrahlung [105] and validated the resulting spectra from 20 to 300 kV [106]. SpekPy has also been validated against measured spectra and HVLs [51]. Deterministic models are fast and physically well founded but cover only the anode materials and voltages for which precomputed transport data exist.

The most complete description is given by MC simulation of the coupled transport of electrons and photons in the anode and the tube. Ay et al. simulated diagnostic and mammography spectra with the MCNP4C code [50], and Verhaegen et al. modelled radiotherapy kilovoltage x-ray units with the EGS4/BEAM system [49]. General-purpose codes for such simulations include EGSnrc with its condensed-history electron transport [107], the Geant4 toolkit [108] and PENELOPE [109]. MC simulation accounts for electron backscattering, the angular distribution of bremsstrahlung and the real geometry of the tube. It requires, however, detailed geometric data and long computation times and is therefore better suited to benchmark calculations than to extensive parametric studies.

Table: Table 1.2. Comparison of x-ray spectrum modelling approaches.

| Approach | Examples | Advantages | Limitations |
|:---|:---|:---|:---|
| Empirical (interpolation) | TASMIP [43]; spektr 3.0 [102] | Fast; accurate within the range of the data | Fixed anode material, anode angle and inherent filtration |
| Semi-empirical | Kramers [103]; Birch–Marshall [44]; TBC [45] | Simple; explicit dependence on voltage, angle and filtration | Simplified physics; parameters fitted to measurements, mostly for tungsten |
| Physics-based deterministic | SpekCalc [48]; SpekPy v2 [15]; developed model (this work) | Fast; physically founded; few adjustable parameters | Approximate electron transport; limited set of anodes and voltages |
| Monte Carlo | MCNP4C [50]; EGS4/BEAM, EGSnrc [49, 107]; Geant4 [108]; PENELOPE [109] | Most complete physics, including backscattering and real tube geometry | Long computation; detailed geometry required; statistical noise |

Whatever the model, the calculated spectrum must be related to measurable quantities. In kilovoltage dosimetry the beam quality is specified by the HVL together with the tube voltage [110], as in the protocol of the American Association of Physicists in Medicine (AAPM TG-61) for 40–300 kV x-ray beams [14] and in the code of practice of the International Atomic Energy Agency (IAEA TRS-398) [70]. The standard radiation qualities of the International Electrotechnical Commission (IEC 61267), such as the RQR series for diagnostic beams, are also defined by the HVL [111]. The HVL is therefore the natural quantity for comparing models with each other and with measurements. It does not, however, fix the fraction of the energy fluence above the Ag K-edge, so that two beams with similar HVLs can give different DEF values for silver; Chapter 3 shows this for filters with absorption edges (Table 3.5).

Most of the models discussed above were developed for tungsten anodes [43, 45, 48], the usual target material of medical x-ray tubes [16]. Copper-anode tubes are used mainly in x-ray diffraction (XRD), where the Cu Kα line is the working radiation and the Kβ line is suppressed by a nickel filter [52]. In XRD the bremsstrahlung continuum is an unwanted background, whereas for dose enhancement by silver it is the useful part of the beam, because only bremsstrahlung photons can exceed the Ag K-edge. In the literature reviewed here, the full spectrum of copper-anode tubes and its dependence on the tube parameters have received much less attention than those of tungsten-anode tubes. For this reason, a semi-analytical physics-based model of the copper-anode tube, called the developed model (DM), was constructed in this work. It combines the Bethe collision stopping power in the continuous slowing-down approximation (CSDA) [53, 68], the non-relativistic Bethe–Heitler bremsstrahlung cross-section with the Elwert factor [54–56] and the Gryzinski K-shell ionisation cross-section [57] with a single adjustable parameter, the electron depth factor (Chapter 2). All dependences on the tube parameters thus remain explicit, and SpekPy v2 serves as the reference for the validation of the DM.

## 1.6. Conclusions to Chapter 1

The review of the literature leads to the following conclusions, which determine the tasks of this work. The physical dose enhancement by a high-Z element in kilovoltage beams is governed by the ratio of its mass energy-absorption coefficient to that of tissue, which for silver increases from 21–32 between 8 keV and the K-edge at 25.514 keV to 76–139 between the edge and 45 keV. The physical efficacy of silver is therefore determined mainly by the fraction of the photon energy fluence above 25.514 keV, and a DEF value is meaningful only together with the spectrum for which it was obtained. AgNPs act as radiosensitizers in models of glioma, breast cancer and colorectal cancer, in one study more effectively than AuNPs, and they are themselves cytotoxic and generate ROS. However, the macroscopic physical contribution of silver for a well-characterised kilovoltage beam, which is needed to separate physical from chemical and biological effects, has not been determined systematically in the literature reviewed.

Spectrum models are well developed for tungsten anodes, whereas the full spectrum of copper-anode tubes, used mainly in XRD, has received much less attention. Accordingly, this work develops a semi-analytical model of the spectrum of a 45 kV copper-anode tube and validates it against SpekPy v2. Both models are then used to calculate the spectrum as a function of the tube design and filtration and to determine the DEF of silver-loaded soft tissue and its dependence on concentration, depth and filtration. The analytical results are verified by MC simulation, silver is compared with other high-Z elements, and the uncertainty of the DEF is estimated as a basis for practical recommendations.


# CHAPTER 2. PHYSICAL MODEL OF THE X-RAY SPECTRUM AND METHODS OF DOSE-ENHANCEMENT CALCULATION

This chapter presents the semi-analytical x-ray spectrum model of this work, the developed model (DM), and the methods used to characterise the beam and to calculate the dose enhancement factor (DEF). Sections 2.1–2.5 follow the radiation from the tube to the sample. Sections 2.6–2.9 describe the calculation of the DEF, the Monte Carlo (MC) verification, the data and software, and radiation safety. All formulas are given as implemented in the code of the DM (Appendix A), with energies in keV and lengths in cm unless stated otherwise.

## 2.1. Design and technical parameters of an x-ray tube with a copper anode

An x-ray tube is an evacuated envelope with two electrodes, the cathode and the anode, between which a high voltage is applied [16]. Electrons emitted thermionically by the heated cathode filament are shaped by a focusing cup into a beam that strikes a small area of the anode, the focal spot [16]. Accelerated by the tube voltage $U$, the electrons reach the anode with the kinetic energy $T_0 = eU$, where $e$ is the elementary charge; in the baseline configuration $T_0$ = 45 keV. Most of their energy is converted into heat, and only a small fraction is emitted as bremsstrahlung and characteristic x-rays [8, 16]. The tube current determines the number of electrons reaching the anode per unit time, so that the number of emitted photons is proportional to the product of the current and the exposure time, expressed in milliampere-seconds (mAs), whereas the shape of the spectrum does not depend on the current. All spectra in this work are therefore normalised to 1 mAs.

In the reflection-target tube considered here, the useful beam leaves the anode through the same face on which the electrons are incident (Fig. 2.1), and the anode is thick enough to stop every electron. The anode angle $\theta$ is the angle between the anode surface and the central ray of the beam. Because the electron beam is perpendicular to the central ray, the electrons strike the anode at the angle $\theta$ to the surface normal, and the photons on the central ray leave the surface at the take-off angle $\theta$. A small anode angle reduces the effective size of the focal spot (the line-focus principle), but the photons emitted towards the anode side of the field travel longer paths in the anode, so that the beam on that side is weaker and harder (the heel effect) [16]. The DM calculates the spectrum on the central ray, where the anode angle enters through the geometry of electron penetration and of photon self-absorption (Sections 2.2 and 2.3).

The photons leave the vacuum envelope through a thin beryllium window, whose low atomic number and density give weak attenuation of soft x-rays while keeping the window strong and vacuum-tight [16]. The window and the self-absorption in the anode form the inherent filtration of the tube. Added filters are metal foils placed in the beam outside the window; they remove the low-energy part of the spectrum and harden the beam [16, 17]. The photons then cross an air gap to the sample at the focus–sample distance $r$ (labelled d in Fig. 2.1; the symbol $d$ is reserved for the electron depth of Section 2.2).



![Fig. 2.1. Schematic diagram of the modelled reflection-target x-ray tube with a copper anode and of the irradiation geometry. Electrons emitted by the cathode strike the anode at the focal spot; the photons emitted along the central ray at the anode angle θ pass through the beryllium window, the added filter and the air gap to the sample of tissue containing Ag. The focus–sample distance, marked d in the figure, is denoted r in the text.](/home/user/atlant-impossible/dissertation/code/../figures/en/fig01_tube.png){width=15.5cm}



Copper-anode tubes are standard sources for x-ray diffraction (XRD), which uses the intense Cu Kα line (8.05 keV, wavelength 0.154 nm) and suppresses the Kβ line (8.91 keV) with a thin nickel filter whose K absorption edge (8.33 keV) lies between the two lines [52]. For irradiations with silver, however, the most useful photons lie above the Ag K-edge at 25.514 keV, in the bremsstrahlung continuum (Section 1.4), which in diffraction is merely a background. The whole spectrum must therefore be known and, as shown in Chapter 3, shaped by filtration. Because most published spectrum models were developed for tungsten anodes (Section 1.5), a dedicated model of the copper-anode tube is required.

The design and technical parameters of the modelled tube are listed in Table 2.1. The baseline configuration is a copper anode with an anode angle of 12°, a 0.5 mm beryllium window, a constant potential of 45 kV, a current of 40 mA and a focus–sample distance of 10 cm in air, without added filtration; the table also gives the ranges studied in Chapter 3. The tube voltage, the anode material, the anode angle, the window and the added filters change the shape of the spectrum, and the distance acts both through the inverse-square law and through the attenuation in the air path. Under the assumption of a constant potential all electrons reach the anode with the same energy $T_0$; a voltage ripple would produce a weighted superposition of such spectra.



Table: Table 2.1. Baseline design and technical parameters of the modelled X-ray tube

| Parameter | Value | Range studied |
|:---|---:|---:|
| Tube voltage (constant potential) | 45 kV | 20–50 kV (SpekPy), up to 80 kV (model) |
| Anode (target) material | Cu, Z = 29, ρ = 8.96 g/cm³ | W (validation) |
| Anode angle θ (central-ray take-off angle) | 12° | 6–30° |
| Beryllium window thickness | 0.5 mm | 0.15–2.0 mm |
| Focus–sample distance (air path) | 10 cm | – |
| Tube current | 40 mA | – |
| Added filters | none | Al 0.25–6 mm; Ti, Ni, Cu, Mo, Ag, Sn; 54 elements Z = 13–83 |
| Energy bin width | 0.05 keV | – |



## 2.2. Electron slowing-down in the anode

Electrons with energies of a few tens of keV lose energy in the anode mainly by ionisation and excitation of the atoms, while elastic scattering by the nuclei changes their direction of motion. Radiative losses are small and are neglected. The DM uses the continuous-slowing-down approximation (CSDA), in which the mass collision stopping power is given by the Bethe formula [53] in the form of ICRU Report 37 [68]:

$$\frac{S(T)}{\rho} = \frac{\kappa}{2}\,\frac{Z}{A}\,\frac{1}{\beta^{2}}\left[\ln\frac{\tau^{2}(\tau + 2)}{2\,(I/m_ec^{2})^{2}} + F^{-}(\tau)\right]$$

EQNUM[2.1]


where $S(T)$ is the linear collision stopping power for an electron with kinetic energy $T$, $\rho$ is the density of the anode, $\kappa = 4\pi N_A r_e^{2} m_ec^{2} = 0.307075$ MeV cm²/mol, $N_A$ is the Avogadro constant, $r_e$ is the classical electron radius, $m_ec^{2}$ = 510.999 keV is the electron rest energy, $Z$ and $A$ are the atomic number and the molar mass (g/mol) of the anode material, $\tau = T/m_ec^{2}$, $\beta$ is the electron velocity in units of the speed of light, $\beta^{2} = 1 - (1 + \tau)^{-2}$, $I$ is the mean excitation energy, and $F^{-}(\tau)$ is the electron term derived from the Møller cross-section:

$$F^{-}(\tau) = 1 - \beta^{2} + \frac{\tau^{2}/8 - (2\tau + 1)\ln 2}{(\tau + 1)^{2}}$$

EQNUM[2.2]


For copper ($Z$ = 29, $\rho$ = 8.96 g/cm³) the value $I$ = 322 eV is used [68], and the density-effect correction, which is negligible below 100 keV, is omitted. The formula gives 20.99, 13.18, 6.04 and 4.55 MeV cm²/g at 5, 10, 30 and 45 keV, respectively. As a check, the same code gives 6.603 MeV cm²/g for water at 50 keV, which is identical to the NIST ESTAR value [69]. Shell corrections are not included, which affects only the lowest electron energies.

The path length travelled by an electron while slowing down from $T_0$ to $T$ is

$$s(T) = \int_{T}^{T_0} \frac{\mathrm{d}T'}{S(T')}$$

EQNUM[2.3]


where $T'$ is the variable of integration. The integral is evaluated by the trapezoidal rule with a step of 0.02 keV from $T_{\min}$ = 1 keV to $T_0$. The path to the lower limit, $s(T_{\min})$, is practically the CSDA range, which equals 6.48 µm for 45 keV electrons in copper. If the logarithm in (2.1) is regarded as constant and $\beta^{2} \approx 2T/m_ec^{2}$, then $S \propto 1/T$ and (2.3) gives $T_0^{2} - T^{2} \propto s$, which is the form of the empirical Thomson–Whiddington law [112].

Multiple elastic scattering makes the electron trajectories strongly curved, so the CSDA path is not the depth at which the photons are produced: the electrons diffuse into the target, and a considerable fraction of them is backscattered. Poludniowski and Evans described electron penetration in x-ray targets with distributions derived from MC simulations [46]; the DM replaces them by one mean depth for each electron energy, the projected depth

$$d(T) = \eta\, s(T)\cos\theta$$

EQNUM[2.4]


where $d(T)$ is the depth below the anode surface, measured along the normal, at which the electron has slowed down to the energy $T$, $\eta$ is the electron depth factor, and $\theta$ is the anode angle, which equals the angle of electron incidence measured from the surface normal (Section 2.1). The value $\eta = 1$ corresponds to straight-line motion, and $\eta < 1$ accounts for the diffusion of the electrons. This single adjustable parameter of the DM was fitted to the bremsstrahlung shape calculated with the SpekPy toolkit [15] (Section 2.8), which gave $\eta$ = 0.40 and a maximum projected depth of 2.54 µm for 45 keV electrons at $\theta$ = 12°. Electron backscattering, which concerns about 30 % of the electrons in copper, is not modelled, and this contributes to the overestimate of the absolute output discussed in Section 3.1.

Panel (a) of Fig. 2.2 shows the stopping power and the projected depth for the baseline conditions. Because the stopping power is lowest at high energies and rises steeply as the electron slows down, the depth grows rapidly as the energy falls from 45 to about 20 keV and then approaches its maximum slowly. Photons with energies close to $T_0$ are therefore emitted only near the surface, whereas soft photons are produced along the whole path, including its deepest part, and, being attenuated more strongly, are the most affected by self-absorption in the anode. Panel (b) is discussed in Section 2.4.



![Fig. 2.2. Electron slowing-down and K-shell ionisation in the copper anode calculated with the developed model: (a) Bethe collision stopping power (solid line, left axis) and projected depth at which a 45 keV electron has slowed down to the energy T, for η = 0.4 and θ = 12° (dashed line, right axis); (b) Gryziński cross-section of K-shell ionisation of copper by electron impact.](/home/user/atlant-impossible/dissertation/code/../figures/en/fig04_electron.png){width=15.5cm}



## 2.3. Bremsstrahlung production in a thick target

Bremsstrahlung is emitted when an electron is decelerated in the Coulomb field of a nucleus, and the photon energy $E$ can take any value up to the electron kinetic energy $T$ [8]. The classical theory of the continuous spectrum proposed by Kramers [103] leads to the cross-section that is implemented in the DM in the form

$$\frac{\mathrm{d}\sigma_{\mathrm{Kr}}}{\mathrm{d}E} = \frac{16\pi}{3\sqrt{3}}\,\frac{\alpha Z^{2} r_e^{2}}{\beta_0^{2}\,E}$$

EQNUM[2.5]


where $\mathrm{d}\sigma_{\mathrm{Kr}}/\mathrm{d}E$ is the cross-section per atom per unit photon energy (cm²/keV) for $E < T$ and zero otherwise, $\alpha$ is the fine-structure constant, and $\beta_0$ is the velocity of the electron with energy $T$ in units of the speed of light. With $\beta_0^{2} \approx 2T/m_ec^{2}$ and $S \propto 1/T$, integration over the slowing-down gives a number spectrum proportional to $Z(T_0 - E)/E$, i.e. an energy spectrum $E\,N(E)$ proportional to $Z(T_0 - E)$ that falls linearly to zero at $T_0$. This is Kramers' law, the starting point of the semi-empirical models (Section 1.5). The DM keeps the Kramers cross-section only as an option.

Bethe and Heitler derived the bremsstrahlung cross-section in the Born approximation [54]. Its non-relativistic, unscreened form, as compiled by Koch and Motz [56], is implemented as

$$\frac{\mathrm{d}\sigma_{\mathrm{B}}}{\mathrm{d}E} = \frac{16}{3}\,\frac{\alpha Z^{2} r_e^{2}}{\beta_0^{2}\,E}\,\ln\frac{p_0 + p}{p_0 - p}$$

EQNUM[2.6]


where $p_0$ and $p$ are the electron momenta before and after the emission, $p_0c = \sqrt{T(T + 2m_ec^{2})}$ and $pc = \sqrt{(T - E)(T - E + 2m_ec^{2})}$. In the non-relativistic limit the factor $1/\beta_0^{2}$ equals the factor $1/p_0^{2}$ of the original formula with momenta in units of $m_ec$. The Born approximation requires $2\pi Z\alpha/\beta_0 \ll 1$ and $2\pi Z\alpha/\beta \ll 1$, where $\beta$ is the electron velocity after the emission (kinetic energy $T - E$) in units of the speed of light [56]. This condition is violated for copper: with $Z\alpha \approx 0.21$ and $\beta_0 \le 0.4$, the parameter $2\pi Z\alpha/\beta_0$ exceeds 3 even for a 45 keV electron. The resulting error is partly corrected by the Elwert factor, which approximately accounts for the Coulomb distortion of the electron wave functions [55, 56]:

$$f_E = \frac{\beta_0}{\beta}\,\frac{1 - \exp(-2\pi Z\alpha/\beta_0)}{1 - \exp(-2\pi Z\alpha/\beta)}$$

EQNUM[2.7]


with $\beta_0$ and $\beta$ as defined above. The DM uses the product $\mathrm{d}\sigma/\mathrm{d}E = f_E\,\mathrm{d}\sigma_{\mathrm{B}}/\mathrm{d}E$, designated BH-E below. As $E$ approaches $T$, the momentum $p$ tends to zero, the logarithm in (2.6) tends to $2p/p_0$ and the Born cross-section vanishes, while $f_E$ grows as $1/\beta$. The BH-E cross-section therefore remains finite at the high-energy end of the spectrum. The tabulated cross-sections of Seltzer and Berger for 1 keV–10 GeV electrons and $Z$ = 1–100 [113] include atomic screening and electron–electron bremsstrahlung, which the BH-E cross-section neglects. These simplifications contribute to the overestimate of the absolute yield of hard bremsstrahlung by the DM relative to SpekPy, whereas the DEF depends only on the spectral shape, which is reproduced at 45 kV with a root-mean-square deviation of 2.46 % after the fit of $\eta$ (Section 3.1).

In a thick target the emitted spectrum is the sum of the thin-target spectra produced along the whole slowing-down path. In the CSDA the electron passes $n_a\,\mathrm{d}T/S(T)$ atoms per unit area while its energy decreases by $\mathrm{d}T$, and a photon produced at the depth $d(T)$ is attenuated along the exit path $d(T)/\sin\theta$. Assuming isotropic emission, the number of bremsstrahlung photons per unit energy interval, per steradian and per incident electron emitted along the central ray is

$$N_b(E) = \frac{1}{4\pi}\int_{E}^{T_0} \frac{n_a}{S(T)}\,\frac{\mathrm{d}\sigma}{\mathrm{d}E}(T, E)\,\exp\left[-\frac{\mu(E)\,d(T)}{\sin\theta}\right]\mathrm{d}T$$

EQNUM[2.8]


where $n_a = \rho N_A/A$ is the number of atoms per unit volume of the anode, $\mathrm{d}\sigma/\mathrm{d}E$ is the BH-E cross-section, and $\mu(E)$ is the linear attenuation coefficient of the anode material, taken from the xraylib library [60]. The same integral without the exponential factor and without the factor $1/4\pi$ gives the generated spectrum $N_g(E)$, i.e. the photons produced in all directions, which is used in Section 2.4. The integrals are evaluated by the trapezoidal rule, and the photon spectrum is calculated in bins of 0.05 keV from 1 keV to $T_0$. A similar thick-target formulation, with MC-derived electron penetration data, is the basis of SpekCalc [46, 47].

The exponential factor in (2.8) describes the self-absorption in the anode. The exit path grows as the anode angle decreases, and the attenuation is strongest for soft photons and for photons just above the copper K-edge at 8.98 keV, where $\mu$ increases abruptly. The factor $1/4\pi$ expresses the assumption of isotropic emission. Although the bremsstrahlung from a single interaction is anisotropic, multiple scattering in a thick target randomises the electron directions and smooths the angular distribution. The isotropic approximation, which more detailed models of x-ray tube bremsstrahlung avoid [105], is one of the limitations of the DM (Section 3.11).

## 2.4. Characteristic radiation

An electron with an energy above the K-shell binding energy $E_K$ (8.979 keV for copper) can ionise the K shell. The vacancy is filled from an outer shell, and the transition energy is emitted either as a characteristic photon, with the probability given by the fluorescence yield $\omega_K$ (0.454 for copper), or as an Auger electron [73, 74]. The DM includes the four strongest lines, K$\alpha_1$ (K–L$_3$ transition, 8.048 keV), K$\alpha_2$ (K–L$_2$, 8.028 keV), K$\beta_1$ (K–M$_3$) and K$\beta_3$ (K–M$_2$), the last two at 8.905 keV, whose relative intensities $p_j$, the radiative rates normalised over the four lines, are 0.583, 0.299, 0.078 and 0.040. K vacancies are produced both directly by electron impact and indirectly by the absorption of bremsstrahlung photons above $E_K$. The copper L lines (below 1 keV) are absorbed in the beryllium window and are not modelled.

The K-shell ionisation cross-section is calculated with the binary-encounter formula of Gryziński [57]:

$$\sigma_K(T) = \frac{\pi e^{4} n_K}{E_K^{2}}\,\frac{1}{U_K}\left(\frac{U_K - 1}{U_K + 1}\right)^{3/2}\left[1 + \frac{2}{3}\left(1 - \frac{1}{2U_K}\right)\ln\left(2.7 + \sqrt{U_K - 1}\right)\right]$$

EQNUM[2.9]


where $U_K = T/E_K$ is the overvoltage ratio ($\sigma_K = 0$ for $U_K \le 1$), $n_K = 2$ is the number of K-shell electrons, and $\pi e^{4} = 6.5141\times10^{-20}$ cm² keV² in Gaussian units. As shown in panel (b) of Fig. 2.2, the cross-section of copper rises from 25.5 b at 10 keV to 288 b at 20 keV, has a broad maximum of about 351 b near 35 keV and decreases to 339 b at 45 keV. Integration of $n_a\sigma_K/S$ over the slowing-down gives 0.0159 K ionisations per incident 45 keV electron. Experimental and theoretical cross-sections have been compiled by Llovet et al. [114], and the distorted-wave Born calculations of Bote and Salvat are used in the PENELOPE code [115]. Because the Gryziński formula rises too slowly near the threshold, the DM underestimates the Cu K-line intensity by about 25–43 % relative to SpekPy, whose model of K and L emission [104] relies on cross-sections of this distorted-wave type; the deficit is largest at low tube voltages (Section 3.1).

The edge and line energies, fluorescence yields and radiative rates are taken from xraylib [60]. Fluorescence yields were compiled by Krause [74] and evaluated transition energies by Deslattes et al. [116]. The data for the anode, the window, the main filter materials and several high-Z radiosensitizers are collected in Table 2.2, including the nickel K-edge (8.333 keV) mentioned in Section 2.1. The K-edges of molybdenum (20.000 keV), silver (25.514 keV) and tin (29.200 keV) lie close to the Ag K-edge, so that filters of these elements strongly absorb part of the photons that are most effective for dose enhancement by silver (Section 3.4).



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



The direct yield of line $j$, emitted along the central ray per steradian and per incident electron, is

$$N_j^{\mathrm{dir}} = \frac{\omega_K\,p_j}{4\pi}\int_{E_K}^{T_0} \frac{n_a\,\sigma_K(T)}{S(T)}\,\exp\left[-\frac{\mu_j\,d(T)}{\sin\theta}\right]\mathrm{d}T$$

EQNUM[2.10]


where $\mu_j = \mu(E_j)$ is the linear attenuation coefficient of the anode at the line energy $E_j$, and the other symbols are as in (2.8). Because the K lines lie below the K-edge of copper, the anode is relatively transparent to its own lines, and the line photons cannot themselves ionise the K shell.

Indirect fluorescence follows the K-shell photoabsorption of bremsstrahlung photons with $E > E_K$ in the anode. Since the electrons penetrate only a few micrometres (Section 2.2), less than the attenuation lengths of photons above the K-edge, the bremsstrahlung is represented by a point source on the anode surface (the surface-source approximation); half of the isotropically emitted photons enter the anode. Let $u = \cos\vartheta$, where $\vartheta$ is the angle between the photon direction and the inward normal; for isotropic emission $u$ has the probability density 1/2 on the interval $-1 \le u \le 1$. A photon with $u > 0$ reaches the depth $z$ after the path $z/u$ and interacts between $z$ and $z + \mathrm{d}z$ with the probability $(\mu/u)\exp(-\mu z/u)\,\mathrm{d}z$, where $\mu = \mu(E)$. Averaging over the directions gives the probability density of the interaction depth per emitted photon:

$$P(z) = \frac{1}{2}\int_{0}^{1} \frac{\mu}{u}\,\mathrm{e}^{-\mu z/u}\,\mathrm{d}u = \frac{\mu}{2}\,\mathrm{E}_1(\mu z)$$

EQNUM[2.11]


where the substitution $t = 1/u$ has been made and $\mathrm{E}_1(x) = \int_{1}^{\infty} t^{-1}\mathrm{e}^{-xt}\,\mathrm{d}t$ is the exponential integral. Since $\int_{0}^{\infty}\mathrm{E}_1(x)\,\mathrm{d}x = 1$, the integral of $P(z)$ over all depths equals 1/2: every photon entering the semi-infinite anode interacts in it.

A fraction $\tau_K(E)/\mu(E)$ of these interactions are K-shell photoabsorptions, where $\tau_K(E)$ is the linear K-shell photoelectric coefficient of copper (the density multiplied by the partial K-shell photoionisation mass coefficient from xraylib), and $\mu(E)$ is the total linear attenuation coefficient. Each vacancy produces a photon of line $j$ with the probability $\omega_K p_j$, and this photon, emitted from the depth $z$ along the central ray, is attenuated by the factor $\exp(-b_j z)$, where $b_j = \mu_j/\sin\theta$. The yield of line $j$ per steradian along the central ray per generated bremsstrahlung photon of energy $E$ is therefore

$$Y_j(E) = \frac{\omega_K\,p_j}{4\pi}\int_{0}^{\infty} \frac{\tau_K(E)}{\mu(E)}\,P(z)\,\mathrm{e}^{-b_j z}\,\mathrm{d}z = \frac{\omega_K\,p_j}{4\pi}\,\frac{\tau_K(E)}{2}\int_{0}^{\infty} \mathrm{E}_1(\mu z)\,\mathrm{e}^{-b_j z}\,\mathrm{d}z$$

EQNUM[2.12]


The remaining integral is a Laplace transform of the exponential integral. Interchanging the order of integration gives $\int_{0}^{\infty}\mathrm{E}_1(x)\,\mathrm{e}^{-sx}\,\mathrm{d}x = \int_{1}^{\infty}\mathrm{d}t/[t(t + s)] = \ln(1 + s)/s$, and the substitution $x = \mu z$ with $s = b_j/\mu$ yields

$$\int_{0}^{\infty} \mathrm{E}_1(\mu z)\,\mathrm{e}^{-b_j z}\,\mathrm{d}z = \frac{1}{b_j}\ln\left(1 + \frac{b_j}{\mu}\right)$$

EQNUM[2.13]


Weighting $Y_j(E)$ with the generated spectrum and integrating over the photon energies above the K-edge gives the indirect yield per steradian and per incident electron:

$$N_j^{\mathrm{ind}} = \frac{\omega_K\,p_j}{4\pi}\int_{E_K}^{T_0} N_g(E)\,\frac{\tau_K(E)}{2\,b_j}\,\ln\left[1 + \frac{b_j}{\mu(E)}\right]\mathrm{d}E$$

EQNUM[2.14]


where $N_g(E)$ is the generated bremsstrahlung spectrum defined in Section 2.3. The total yield of line $j$ is $N_j = N_j^{\mathrm{dir}} + N_j^{\mathrm{ind}}$. For the baseline tube the indirect contribution is 4.5 % of the Kα intensity and 4.8 % of the Kβ intensity. The share is slightly larger for Kβ because the indirect vacancies lie on average deeper than the direct ones and Kβ photons are attenuated less in the anode than Kα photons. Because the indirect contribution is small, the surface-source approximation and the neglect of scattered photons have only a minor effect on the line intensities.

## 2.5. Filtration, beam-quality parameters and air kerma

Between the anode and the sample, the attenuation of the photons in the beryllium window, the added filters and the air is described by the Beer–Lambert law for narrow-beam geometry, in which scattered photons are assumed not to reach the point of interest:

$$\mathcal{T}(E) = \exp\left[-\mu_{\mathrm{Be}}(E)\,t_{\mathrm{Be}} - \sum_{i}\mu_i(E)\,t_i - \mu_{\mathrm{air}}(E)\,r\right]$$

EQNUM[2.15]


where $\mathcal{T}(E)$ is the transmission at the photon energy $E$, $\mu_{\mathrm{Be}}$, $\mu_i$ and $\mu_{\mathrm{air}}$ are the linear attenuation coefficients of beryllium, of the $i$-th added filter and of air, $t_{\mathrm{Be}}$ and $t_i$ are the thicknesses of the window and of the filters, and $r$ is the focus–sample distance. For the elements, the linear coefficients are the total mass attenuation coefficients from xraylib, which include coherent scattering, multiplied by the densities given in Table 2.2. For dry air, the coefficients are obtained by the mixture rule from the NIST data for its constituent elements (C, N, O and Ar) [59], with the density $1.205\times10^{-3}$ g/cm³. The whole distance is treated as an air path, which slightly overestimates the air attenuation.

The spectral photon fluence at the sample combines the yields of Sections 2.3 and 2.4 with the transmission and the inverse-square law:

$$\Phi(E) = \frac{n_e\,Q}{r^{2}}\,\mathcal{T}(E)\left[N_b(E) + \sum_{j} N_j\,\delta(E - E_j)\right]$$

EQNUM[2.16]


where $\Phi(E)$ is the number of photons per unit area and per unit energy interval (cm$^{-2}$ keV$^{-1}$), $Q$ is the exposure in mAs, $n_e = 6.242\times10^{15}$ is the number of electrons per mAs, $N_j$ is the total yield of line $j$, and $\delta$ is the Dirac delta function. The factor $1/r^{2}$ converts the yield per steradian of a point source into the fluence at the distance $r$. In the numerical spectrum each delta function is replaced by the value $N_j/\Delta E$ in the bin of width $\Delta E$ = 0.05 keV that contains $E_j$. The spectral energy fluence is $\Psi(E) = E\,\Phi(E)$.

The output of the tube is characterised by the air kerma [62, 76]:

$$K_{\mathrm{air}} = \int_{0}^{T_0} \Phi(E)\,E\left(\frac{\mu_{en}}{\rho}\right)_{\mathrm{air}}\mathrm{d}E$$

EQNUM[2.17]


where $(\mu_{en}/\rho)_{\mathrm{air}}$ is the mass energy-absorption coefficient of dry air, obtained in the same way [59]; the result in keV/g is converted to grays with 1 keV/g = $1.602\times10^{-13}$ Gy. Strictly, (2.17) gives the collision kerma, which for kilovoltage photons in air practically equals the total kerma, because the radiative losses of the secondary electrons are negligible [62]. With the coefficient of ICRU-44 soft tissue [61] instead of air, the same expression gives the tissue kerma at the sample surface without backscatter, which is used in Section 3.6 to estimate exposure times. For the SpekPy spectra, which are filtered with the attenuation data of SpekPy itself, the air kerma calculated by SpekPy is used, whereas the HVLs and mean energies of all copper-anode spectra are evaluated with the same routines for both models.

The quality of kilovoltage beams is specified primarily by the first half-value layer (HVL), the thickness of a reference absorber, usually aluminium or copper, that reduces the air kerma of a narrow beam to one half [14, 17, 70]. Standard radiation qualities of diagnostic beams are defined in the same way [111]. The first HVL in aluminium, HVL1 = $x_1$, is found from the condition

$$\int_{0}^{T_0} \Phi(E)\,E\left(\frac{\mu_{en}}{\rho}\right)_{\mathrm{air}}\exp\left[-\mu_{\mathrm{Al}}(E)\,x_1\right]\mathrm{d}E = \frac{1}{2}\,K_{\mathrm{air}}$$

EQNUM[2.18]


where $\mu_{\mathrm{Al}}(E)$ is the linear attenuation coefficient of aluminium. The thickness $x_2$ that reduces the air kerma to one quarter is found in the same way, the second HVL is HVL2 = $x_2 - x_1$, and both equations are solved by bisection. The homogeneity coefficient $h$ = HVL1/HVL2 equals unity for a monoenergetic beam and is normally smaller for a polyenergetic beam, because the first layers of the absorber remove the soft photons and harden the beam. The effective energy $E_{\mathrm{eff}}$ is the energy of the monoenergetic beam with the same first HVL; it is found from $\mu_{\mathrm{Al}}(E_{\mathrm{eff}}) = \ln 2/\mathrm{HVL1}$ by Brent's method.

The mean energy of the photon fluence spectrum is

$$\bar{E} = \frac{\int_{0}^{T_0} E\,\Phi(E)\,\mathrm{d}E}{\int_{0}^{T_0} \Phi(E)\,\mathrm{d}E}$$

EQNUM[2.19]


where both integrals include the characteristic lines. For dose enhancement by silver, the fraction of photons above the Ag K-edge, $f_{\mathrm{Ag}} = \int_{E_{K,\mathrm{Ag}}}^{T_0}\Phi(E)\,\mathrm{d}E \big/ \int_{0}^{T_0}\Phi(E)\,\mathrm{d}E$ with $E_{K,\mathrm{Ag}}$ = 25.514 keV, and the corresponding energy-fluence fraction are also evaluated. They describe the part of the spectrum in which silver absorbs most strongly relative to tissue (Sections 1.2 and 1.3). Like the DEF, the HVLs and the mean energy depend only on the shape of the spectrum and are insensitive to errors in the absolute output.


## 2.6. Dose enhancement factor: definitions and calculation

The physical radio-enhancement by silver is quantified by the DEF, the ratio of the absorbed dose with the sensitizing element to that without it, at the same point of tissue under identical irradiation:

$$\mathrm{DEF} = \frac{D_{t+\mathrm{Ag}}}{D_t}$$

EQNUM[2.20]


where $D_{t+\mathrm{Ag}}$ is the absorbed dose in the silver-loaded tissue, i.e. the energy imparted per unit mass of the tissue–silver mixture, and $D_t$ is the absorbed dose in the unloaded (reference) tissue. Values below unity indicate a dose reduction, for example by shielding. This macroscopic DEF assumes a homogeneous distribution of silver and a dose averaged over volumes much larger than a cell and than the electron ranges; it characterises only the physical stage of radio-enhancement.

Photons below 50 keV release secondary electrons whose ranges in soft tissue are far below a millimetre (Section 1.2), so that charged-particle equilibrium (CPE) holds except in thin layers near surfaces and interfaces [62, 71]. Under CPE the absorbed dose equals the collision kerma (1.4), which practically coincides with the kerma, because the bremsstrahlung losses of these electrons in low-Z media are negligible [62, 76]. For a polyenergetic beam, in analogy with the air kerma (2.17),

$$D = \int_{0}^{T_0} \Psi(E)\,\frac{\mu_{en}}{\rho}(E)\,\mathrm{d}E$$

EQNUM[2.21]


where $\Psi(E) = E\,\Phi(E)$ is the spectral energy fluence at the point of interest, $\Phi(E)$ is the spectral photon fluence (2.16), $\mu_{en}/\rho$ is the mass energy-absorption coefficient of the medium and $T_0$ = 45 keV is the maximum photon energy. Since $\mu_{en}/\rho$ excludes the energy carried away by scattered and fluorescence photons [75], the energy of the Ag K x-rays, emitted in the relaxation of about 83 % of the K-shell vacancies ($\omega_K = 0.831$), is assumed to escape from the point of interaction; this assumption is tested in Section 2.7.

Silver-loaded tissue is treated as a homogeneous mixture. If $w$ is the mass fraction of silver, i.e. the mass of silver per unit mass of the loaded medium, the additivity (mixture) rule gives [59, 62]

$$\left(\frac{\mu_{en}}{\rho}\right)_{t+\mathrm{Ag}} = (1-w)\left(\frac{\mu_{en}}{\rho}\right)_t + w\left(\frac{\mu_{en}}{\rho}\right)_{\mathrm{Ag}}$$

EQNUM[2.22]


where the subscripts $t$ and Ag refer to tissue and silver. The same rule, written over the elemental mass fractions $w_i$ as $\mu/\rho = \sum_i w_i\,(\mu/\rho)_i$, gives the coefficients of soft tissue, water and air from the elemental NIST tables (Section 2.8). Mass fractions from 0.1 to 2 % (1–20 mg of silver per gram of loaded tissue) are considered.

Substituting (2.21) and (2.22) into (2.20) gives the DEF at the surface of the medium:

$$\mathrm{DEF} = \frac{\int \Psi(E)\left[(1-w)\left(\frac{\mu_{en}}{\rho}\right)_t + w\left(\frac{\mu_{en}}{\rho}\right)_{\mathrm{Ag}}\right]\mathrm{d}E}{\int \Psi(E)\left(\frac{\mu_{en}}{\rho}\right)_t\mathrm{d}E}$$

EQNUM[2.23]


where all coefficients are evaluated at the photon energy $E$ and the integrals extend over the whole spectrum. The absolute normalisation of the fluence cancels in this ratio, so the DEF depends only on the spectral shape, and the DM can be used for DEF calculations on an equal footing with SpekPy despite its less accurate absolute output (Section 3.1). In the code (function `def_factor` of `xspec.py`) the integrals are evaluated as sums over the 0.05 keV bins of the spectrum.

Because the numerator of (2.23) is linear in $w$, it can be rearranged exactly into

$$\mathrm{DEF} = 1 + w\left(\langle R\rangle - 1\right)$$

EQNUM[2.24]


with

$$\langle R\rangle = \frac{\int \Psi(E)\left(\frac{\mu_{en}}{\rho}\right)_{\mathrm{Ag}}\mathrm{d}E}{\int \Psi(E)\left(\frac{\mu_{en}}{\rho}\right)_t\mathrm{d}E} = \frac{\int R(E)\,d_t(E)\,\mathrm{d}E}{\int d_t(E)\,\mathrm{d}E}$$

EQNUM[2.25]


where $R(E) = (\mu_{en}/\rho)_{\mathrm{Ag}}/(\mu_{en}/\rho)_t$ is the ratio of the mass energy-absorption coefficients and $d_t(E) = \Psi(E)\,(\mu_{en}/\rho)_t$ is the dose spectrum of unloaded tissue. Thus $\langle R\rangle$ is the mean of $R(E)$ weighted by the tissue dose spectrum, $\mathrm{DEF} - 1$ is strictly proportional to $w$, and the slope $\langle R\rangle - 1$ is a property of the spectrum alone. For ICRU-44 tissue, $R(E)$ grows from 21.0 at 8 keV to 31.8 at 25 keV, jumps at the Ag K-edge (25.514 keV) to about 76 and reaches about 139 at 40–45 keV (Section 1.2). Any shift of the dose spectrum above the K-edge therefore increases the slope, which is the basis of the filter optimisation in Chapter 3.

Inside the medium the spectrum hardens with depth. For a point at depth $z$ where silver is present only locally (a thin layer or a small region that does not perturb the beam), the DEF for the primary beam is

$$\mathrm{DEF}(z) = \frac{\int \Psi(E)\,e^{-\mu_t(E)\,z}\left[(1-w)\left(\frac{\mu_{en}}{\rho}\right)_t + w\left(\frac{\mu_{en}}{\rho}\right)_{\mathrm{Ag}}\right]\mathrm{d}E}{\int \Psi(E)\,e^{-\mu_t(E)\,z}\left(\frac{\mu_{en}}{\rho}\right)_t\mathrm{d}E}$$

EQNUM[2.26]


where $\Psi(E)$ is the energy fluence at the surface and $\mu_t(E) = \rho_t\,(\mu/\rho)_t(E)$ is the linear attenuation coefficient of tissue of density $\rho_t$ = 1.06 g/cm³. Scattered photons and the inverse-square fall-off are neglected. The denominator, normalised to its value at $z = 0$, gives the relative primary dose in unloaded tissue due to attenuation alone. Since the attenuation coefficient of tissue decreases with energy, the low-energy photons, for which $R(E)$ is small, are removed first, and the DEF increases with depth.

When silver fills the whole region between the surface and the point of interest, it also attenuates the beam, especially just above the K-edge, where its mass attenuation coefficient increases 5.8-fold. For a slab loaded uniformly from the surface to a depth larger than $z$,

$$\mathrm{DEF}_{\mathrm{slab}}(z) = \frac{\int \Psi(E)\,e^{-\mu_{t+\mathrm{Ag}}(E)\,z}\left[(1-w)\left(\frac{\mu_{en}}{\rho}\right)_t + w\left(\frac{\mu_{en}}{\rho}\right)_{\mathrm{Ag}}\right]\mathrm{d}E}{\int \Psi(E)\,e^{-\mu_t(E)\,z}\left(\frac{\mu_{en}}{\rho}\right)_t\mathrm{d}E}$$

EQNUM[2.27]


where $\mu_{t+\mathrm{Ag}}(E) = \rho_t\left[(1-w)(\mu/\rho)_t + w\,(\mu/\rho)_{\mathrm{Ag}}\right]$ is the linear attenuation coefficient of the loaded medium, whose density is approximated by $\rho_t$, and the denominator refers to the same depth in silver-free tissue. The additional attenuation removes preferentially the most effective photons above the K-edge, so $\mathrm{DEF}_{\mathrm{slab}}$ decreases with depth (self-shielding) and is no longer linear in $w$. At $w$ = 1 % the attenuation added by silver just above its K-edge is comparable to that of the tissue itself, and behind a loaded region the dose falls below its silver-free value.

The reference medium is ICRU-44 soft tissue (H 10.2, C 14.3, N 3.4, O 70.8, Na 0.2, P 0.3, S 0.3, Cl 0.2 and K 0.3 % by mass; 1.06 g/cm³) [61]; water and the ICRU four-component tissue are used as alternatives. This choice affects the DEF (Section 3.10) and must be reported with it. On the subcellular scale, which the macroscopic DEF does not resolve, the dose enhancement around nanoparticles is highly localised [30], because the short-range photoelectrons and Auger electrons deposit much of their energy close to the particle. Such nanoscale energy deposition can produce biological effects beyond the macroscopic dose enhancement (local effect model) [31], and the outcome depends on the photon energy and on the size, concentration and location of the particles [97]. The DEF calculated here is thus the physical baseline for identifying chemical, biological and nanoscale contributions.

## 2.7. Monte Carlo method for verification

The two main assumptions of the analytical model, the escape of the Ag K-fluorescence energy and the neglect of scattered photons, are tested with an independent MC code (`mc_dose.py`). It is much simpler than the general-purpose codes PENELOPE, EGSnrc and Geant4 [107–109] but includes all photon interactions relevant below 50 keV and the transport of the silver fluorescence.

The geometry is a laterally infinite slab of ICRU-44 tissue, 30 mm thick, irradiated by a broad parallel beam at normal incidence. A layer at depths of 2–12 mm contains silver with $w$ = 1 %, modelled by adding silver of partial density $\rho_{\mathrm{Ag}} = \rho_t\,w/(1-w)$ to the tissue. Photons are tracked by their energy $E$, depth $z$ and direction cosine $u$ relative to the slab normal until absorption or escape, and the deposited energy is scored in 0.25 mm bins. The incident spectra are the SpekPy spectra of the 45 kV tube (θ = 12°, 0.5 mm Be, 10 cm air) without filter and with 1 mm Al, sampled by inversion of the cumulative distribution with a uniform position inside each 0.05 keV bin.

Free paths are sampled by Woodcock (delta) tracking [63, 117] with the majorant $\mu_{\max}(E) = \mu_t(E) + \mu_{\mathrm{Ag}}(E)$, the linear attenuation coefficient of the loaded layer, where $\mu_{\mathrm{Ag}} = \rho_{\mathrm{Ag}}(\mu/\rho)_{\mathrm{Ag}}$ and both terms are calculated from the xraylib cross-sections. The path length is

$$s = -\frac{\ln \xi_1}{\mu_{\max}(E)}$$

EQNUM[2.28]


where $\xi_1$ is a random number uniform in (0, 1); the photon moves to the depth $z + u\,s$. There the collision is real with the probability

$$P_{\mathrm{real}} = \frac{\mu(z,E)}{\mu_{\max}(E)}$$

EQNUM[2.29]


where $\mu(z,E)$ is the actual coefficient ($\mu_t$ outside the layer, $\mu_t + \mu_{\mathrm{Ag}}$ inside it); otherwise the collision is virtual and the photon continues unchanged, and distances to the layer boundaries are never computed.

The type of a real interaction (photoabsorption in tissue or in silver, incoherent or coherent scattering) is sampled from the partial coefficients, tabulated from xraylib [60] at 1–46 keV in 5 eV steps. After photoabsorption in silver above the K-edge, the K shell is selected with the probability $\tau_K/\tau$, the ratio of the K-shell to the total photoelectric cross-section. With the probability $\omega_K$ the vacancy emits a K x-ray of one of the six principal K lines, chosen according to their radiative rates. This photon is emitted isotropically and transported, while the rest of the energy is deposited locally, as is the whole photon energy in all other photoabsorption events.

The polar scattering angle $\vartheta$ is sampled from cumulative tables of the xraylib differential cross-sections: the Klein–Nishina cross-section multiplied by the incoherent scattering function, and the Thomson cross-section multiplied by the squared atomic form factor [60, 64]. The tables (91 energies from 1 to 46 keV, 1441 angles) are computed for tissue and used for all events, since silver contributes only a few per cent of the scattering cross-section of the layer. After incoherent scattering

$$E' = \frac{E}{1 + \frac{E}{m_e c^2}\left(1 - \cos\vartheta\right)}$$

EQNUM[2.30]


where $E$ and $E'$ are the photon energies before and after scattering and $m_e c^2$ = 510.999 keV is the electron rest energy; the energy $E - E'$ is deposited locally. The direction cosine becomes $u' = u\cos\vartheta + \sqrt{1-u^2}\,\sin\vartheta\cos\varphi$, with the azimuthal angle $\varphi$ uniform in $[0, 2\pi)$. Photons below 1 keV are absorbed locally.

Secondary electrons, whose ranges of a few tens of micrometres are much smaller than the bins, deposit their energy locally. The dose in bin $j$ per unit incident fluence is

$$D_j = \frac{1}{N}\,\frac{\sum_{i \in j} \varepsilon_i}{\rho_j\,\Delta z}$$

EQNUM[2.31]


where $\varepsilon_i$ are the energy deposits in the bin, $N$ is the number of incident photons, $\rho_j$ is the density ($\rho_t$ or $\rho_t + \rho_{\mathrm{Ag}}$) and $\Delta z$ = 0.25 mm. The MC DEF is the ratio of the doses for $w$ = 1 % and $w = 0$; each run comprises $4\times10^{6}$ histories in five independent batches, whose spread gives the standard error. The analytical reference is (2.27) generalised to a buried layer, with the silver attenuation and the mixture coefficient applied only inside the layer.

Two checks preceded the runs. For a broad 30 keV beam the ratio of the surface dose to the primary kerma is 1.31 owing to backscattered photons, whose contribution in kilovoltage beams depends on the field size and source distance [118]. The energy-transfer coefficient reconstructed from the xraylib photoabsorption and Compton data agrees with the NIST $\mu_{en}/\rho$ within 0.3 % for O, C and H at 20–40 keV, where the two coefficients practically coincide; the MC interaction data are thus consistent with NIST.

## 2.8. Data sources, software implementation and validation strategy

The mass energy-absorption coefficients $\mu_{en}/\rho$ of all materials and the mass attenuation coefficients $\mu/\rho$ of tissue, water and air are taken from the NIST tables of Hubbell and Seltzer [59], which are based on the $\mu_{en}/\rho$ calculations of Seltzer [75]. The module `nist.py` reads the locally stored tables and interpolates the logarithm of each coefficient linearly in $\ln E$, separately within each segment between absorption edges. Log–log interpolation is appropriate because between the edges the coefficients vary approximately as power laws of energy. The edges are recognised as repeated energies in the tables, and an energy exactly at an edge receives the below-edge value. The mixture rule is applied with the ICRU-44 tissue composition, the stoichiometric composition of water and the NIST composition of dry air. The elemental $\mu/\rho$ of the anode, window and filter materials and of silver, the edge and line energies, fluorescence yields, radiative rates and the cross-sections of the MC code are taken from xraylib 4.3.0 [60]. Its $\mu/\rho$ values agree with the NIST data [59, 72] to better than 0.1 %.

The verification revealed an error in the xraylib 4.3.0 function `CS_Energy`, which returns $\mu_{en}/\rho$. For light elements at 15–45 keV its values are too low: for oxygen at 30 keV it gives 0.108 cm²/g instead of the NIST value 0.173 cm²/g (−37 %), and for carbon at the same energy 0.0515 instead of 0.0661 cm²/g, while for silver it agrees with NIST (16.58 versus 16.60 cm²/g). Since tissue consists mainly of O, C and H, this function would underestimate the denominator of (2.23) and strongly overestimate the DEF: 1.72 instead of 1.48 for 1 % Ag with 1 mm Al. The photoabsorption and scattering cross-sections of xraylib are not affected, as the reconstructed energy-transfer coefficient shows (Section 2.7). All $\mu_{en}/\rho$ values are therefore taken directly from NIST, and `CS_Energy` should be checked against NIST before it is used for low-Z media.

The reference spectrum model is SpekPy v2.5.4 [15, 58] with its "casim" physics model, which supports copper anodes at 10–50 kV. SpekPy has been validated against measured spectra and HVLs [51]. Its spectra serve to validate the DM and as the principal input of the DEF calculations, which are repeated with the DM spectra. The software is written in Python 3.13 with NumPy [65], SciPy [66] and Matplotlib [67]. SciPy provides the bounded minimisation for the model parameter and Brent's root-finding method for the effective energy and the equal-transmission filter thicknesses. The scripts `run_all.py`, `run_sweeps.py` and `mc_dose.py` produce the main results, the filter sweeps and the MC verification, respectively.

The single adjustable parameter of the DM, the electron depth factor $\eta$ in (2.4), minimises the root-mean-square deviation between the DM and SpekPy bremsstrahlung spectra (characteristic lines excluded) at 45 kV, θ = 12° and 0.5 mm Be. Both spectra are normalised to unit area above 3 keV, the deviation is taken relative to the maximum of the reference spectrum, and $\eta$ is searched in the interval 0.25–0.7 and rounded to two decimals. All other configurations are predictions without refitting. The validation comprises five steps: (i) checks of model components, e.g. the Bethe stopping power of water at 50 keV, 6.603 MeV cm²/g, identical to the NIST ESTAR value [69]; (ii) comparison of spectra and beam-quality parameters with SpekPy for 25–50 kV and anode angles of 6–30°, with and without 1 mm Al, supplemented by a tungsten-anode check at 50, 80 and 100 kV; (iii) comparison of the DEF obtained with the DM and SpekPy spectra; (iv) the MC verification; and (v) a sensitivity analysis of the DEF.

## 2.9. Radiation safety when working with a kilovoltage x-ray tube

A 45 kV copper-anode tube is a source of very intense low-energy x-rays. As shown in Chapter 3, the unfiltered air kerma at 10 cm from the focal spot is 383 mGy per mAs, i.e. 15.3 Gy/s at 40 mA, and at the same current the tissue surface receives 2 Gy in 0.12 s. An accidental exposure of the hands to the primary beam can therefore cause severe local radiation injuries within seconds. The primary beam, the radiation scattered by the sample and its holder, and the leakage radiation from the housing must all be controlled.

Radiation protection rests on the principles of justification, optimisation, which keeps exposures as low as reasonably achievable (ALARA), and dose limitation. These principles are formulated by the International Commission on Radiological Protection [119] and implemented in the Basic Safety Standards of the International Atomic Energy Agency [120]. In the Republic of Uzbekistan the legal basis of radiation safety is the Law "On Radiation Safety" [121]. Work with an x-ray tube is a planned exposure situation, in which occupational exposure must remain below the limits on the effective dose and on the equivalent doses to the skin, the extremities and the lens of the eye [119, 120].

The main protective measures are technical. The shielded tube housing lets radiation out only through the window and the shutter, and the sample is irradiated in a closed enclosure whose door interlocks switch off the high voltage or close the shutter. Warning lights show that the high voltage is on and the shutter is open, and fixed holders and collimators keep the hands out of the beam. The high-voltage generator is an additional electrical hazard, and the fragile beryllium window must not be touched, since beryllium compounds are toxic. Staff training, local rules, personal dosimetry and dose-rate surveys around the enclosure, particularly after maintenance, complete these measures.

Added filtration also serves safety. The filters that markedly raise the DEF (from 1 mm Al to 0.2 mm Cu) lower the air kerma rate 120–1300-fold. With 1 mm Al the tissue kerma rate at the surface at 40 mA falls from 16.5 to 0.137 Gy/s, and the time for 2 Gy rises from 0.12 to 14.6 s, which a timer or shutter can control with a small relative error. The filter removes the soft component, which is absorbed in the superficial layers without reaching depth: the relative primary dose at 10 mm, due to attenuation alone, is 0.009 of the surface value without a filter and 0.44 with 1 mm Al. Filtration thus reduces the unnecessary dose to the skin or to the sample surface, and the quality of the filtered beam can be specified by its HVL, as in the kilovoltage dosimetry protocol [14]. The filter that maximises the DEF is therefore also an optimisation measure in the sense of ALARA.

## 2.10. Conclusions to Chapter 2

1. A semi-analytical thick-target model (DM) of the spectrum of a reflection x-ray tube with a copper anode has been formulated. It includes electron slowing-down with the Bethe stopping power, bremsstrahlung with the non-relativistic Bethe–Heitler cross-section and the Elwert factor, direct and bremsstrahlung-induced K radiation, self-absorption in the anode and attenuation in the window, air and filters, with a single adjustable parameter, the electron depth factor $\eta$.
2. The beam-quality parameters (first and second HVL, homogeneity coefficient, mean and effective energies) are calculated with identical routines for the DM and SpekPy spectra, and the air kerma characterises the tube output.
3. Under CPE below 50 keV, the DEF of silver-loaded tissue is a spectrum-weighted ratio of mass energy-absorption coefficients. At the surface, $\mathrm{DEF} - 1$ is exactly proportional to the silver mass fraction, with a slope set by the part of the dose spectrum above the Ag K-edge. The depth and loaded-slab forms of the DEF describe beam hardening and self-shielding.
4. An independent MC code with Woodcock tracking, Compton and Rayleigh scattering and transport of the Ag K-fluorescence tests the assumptions of the analytical model.
5. All $\mu_{en}/\rho$ values are taken from NIST, because the xraylib 4.3.0 function `CS_Energy` underestimates them for light elements by up to 37 % and would overestimate the DEF (1.72 instead of 1.48 for 1 % Ag with 1 mm Al).
6. The unfiltered tube output (15.3 Gy/s at 10 cm and 40 mA) requires shielding, interlocks and dosimetric control; filtration reduces both the dose rate and the superficial dose.


# CHAPTER 3. RESULTS OF SPECTRUM MODELLING AND DOSE-ENHANCEMENT CALCULATIONS

This chapter presents the results obtained with the developed model (DM) of Chapter 2 and with the reference code SpekPy v2.5.4 [15, 58]. It begins with the validation of the DM (Section 3.1) and with the spectrum of the 45 kV copper-anode tube and its dependence on the design parameters and added filters (Sections 3.2–3.4). The dose enhancement factor (DEF) of Ag-loaded soft tissue and the optimisation of the filtration are analysed in Sections 3.5 and 3.6, the depth dependence, the tube voltage and the comparison with other high-Z elements in Sections 3.7 and 3.8, and the Monte Carlo verification, the uncertainty analysis and the discussion in Sections 3.9–3.11. Unless stated otherwise, the baseline conditions of Table 2.1 apply: a constant potential of 45 kV, an anode angle θ = 12°, a 0.5 mm Be window, 10 cm of air between the focal spot and the sample, and an energy bin width of 0.05 keV. The DEF is calculated in the kerma approximation, which assumes charged-particle equilibrium (CPE), for ICRU-44 soft tissue [61] with the NIST mass energy-absorption coefficients [59]. The ratio of the mass energy-absorption coefficients of Ag and tissue, $R(E)$, is defined as in Section 2.6.

## 3.1. Validation of the developed spectrum model

No measured spectrum of the particular tube was available, so the DM was validated against SpekPy v2, a deterministic physics-based toolkit that supports copper anodes at 10–50 kV [15] and has been validated against measured spectra and half-value layers (HVL) [51, 106]. The single adjustable parameter of the DM, the electron depth factor $\eta$ of (2.4), converts the path length in the continuous slowing-down approximation (CSDA) into the mean projected depth of the electrons. It was fitted to the shape of the bremsstrahlung continuum alone, with the characteristic lines switched off in both codes, for 45 kV, θ = 12° and 0.5 mm Be without the air path, by minimising the root-mean-square deviation of the area-normalised spectra,

$$\delta(\eta) = \frac{1}{\max_i b_i}\left[\frac{1}{N}\sum_{i=1}^{N}\left(a_i(\eta) - b_i\right)^2\right]^{1/2}$$

EQNUM[3.1]


where $a_i(\eta)$ and $b_i$ are the bremsstrahlung fluences of the DM and of SpekPy in energy bin $i$, each divided by its sum over the $N$ bins with $E_i > 3$ keV, and the factor $1/\max_i b_i$ expresses the deviation as a fraction of the spectrum maximum. The minimisation (Section 2.8) gave $\eta = 0.40$ with $\delta = 2.46$ %, against $\delta = 8.47$ % for straight-line penetration ($\eta = 1$). Because of multiple elastic scattering, the electrons thus generate photons at less than half the depth implied by a straight CSDA path: with the fitted value, the maximum projected depth of 45 keV electrons in copper is 2.536 µm, whereas their CSDA range is 6.481 µm. A shallower production depth shortens the exit path of the photons in the anode and reduces the self-absorption of the soft bremsstrahlung, which is why $\eta = 1$ yields too hard a spectrum. The value $\eta = 0.40$ was then kept fixed, so all other configurations are predictions rather than fits.

Results for tube voltages of 25–50 kV and anode angles of 6–30°, calculated without the air path, are collected in Table 3.1. With 1 mm Al, which removes the Cu K lines, the first HVL (2.18) of the DM is lower than that of SpekPy by 3.5–4.6 %, and the mean energies differ by no more than 0.54 keV. Without added filtration the HVL deviation ranges from −2.6 % (45 kV, 6°) to −19.4 % (25 kV, 12°). These deviations originate in the characteristic radiation: the ratio of K-line to bremsstrahlung photons is 0.86–1.71 in the DM and 1.51–2.31 in SpekPy, i.e. the DM underestimates the Cu K lines by about 25–43 %. The deficit is largest at low voltage, where the Gryzinski cross-section [57] rises too slowly above the ionisation threshold compared with the distorted-wave Born calculations [114, 115] underlying the K-line model of SpekPy [104]. A weaker 8 keV line gives more weight to the softer 3–8 keV continuum in the air kerma and thus lowers the first HVL of the unfiltered beam.



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



The spectral shapes for the baseline geometry with 10 cm of air are compared in Fig. 3.1. After normalisation to equal bremsstrahlung area above 9.6 keV, the two models agree within about 10 % between 10 and 30 keV, with and without 1 mm Al. The DM continuum is slightly richer in photons at 10–20 keV and poorer above about 25 keV, the ratio of the spectra falling to 0.80–0.85 at 40 keV; this mild softening explains the HVL deficit of about 4 % for filtered beams. Its probable causes are the non-relativistic Born cross-section with the Elwert factor [56], which only approximates the tabulated cross-sections [113], and the assumption of isotropic emission, whereas the model underlying SpekPy describes the energy and angular distribution of bremsstrahlung [15, 105].



![Fig. 3.1. Spectra of the 45 kV Cu-anode tube (θ = 12°, 0.5 mm Be, 10 cm air) calculated with SpekPy v2 and with the developed model, without added filtration (left) and with 1.0 mm Al (right). The spectra are normalised to equal bremsstrahlung area above 9.6 keV and scaled to the maximum of the SpekPy continuum; the lower panels show the ratio of the developed model to SpekPy in the bremsstrahlung region.](/home/user/atlant-impossible/dissertation/code/../figures/en/fig05_validation_cu.png){width=15.5cm}



The absolute air kerma of the DM exceeds that of SpekPy by a factor of 1.08–1.22 without filtration and 1.21–1.42 with 1 mm Al. The main reason is the neglect of electron backscattering: the backscatter coefficient of copper is about 0.3, so a considerable fraction of the electrons leaves the anode before losing all their energy, whereas the DM assumes complete slowing-down of every electron; the approximate non-relativistic cross-section also contributes. Since the DEF depends only on the spectral shape, it is unaffected, and absolute dose rates are taken from SpekPy.

To check that the model is not tuned to copper only, the DM with the same $\eta$ was applied to a tungsten anode (θ = 12°) at 50, 80 and 100 kV with 2.5 mm Al, which removes the W L lines not included in the DM (Table 3.2). The HVL deviations are −5.7 %, −1.5 % and +0.5 %, and the mean energies of the DM are lower by about 1 keV. For orientation, the IEC 61267 radiation quality RQR3, a 50 kV tungsten beam, has a first HVL of 1.78 mm Al [111], comparable to both values obtained at 50 kV. As for copper, the tungsten spectra of the DM are slightly narrower than those of SpekPy, with a higher maximum and a weaker high-energy tail (Fig. 3.2), and the agreement improves with voltage; one value of $\eta$ thus gives HVLs within 6 % for anodes with Z = 29 and Z = 74. Overall, for filtered copper-anode beams the DM reproduces the HVL within about 4 %; its main weakness is the underestimated Cu K-line intensity, which matters for unfiltered beams and for beams dominated by Cu Kα. The main DEF results therefore use SpekPy spectra, with the DM as an independent check.



Table: Table 3.2. Check of the model for a W anode (θ = 12°, 2.5 mm Al), comparison with SpekPy v2

| U, kV | Ē DM, keV | Ē SpekPy, keV | HVL DM, mm Al | HVL SpekPy, mm Al | ΔHVL, % |
|:---|---:|---:|---:|---:|---:|
| 50 | 31.34 | 32.22 | 1.651 | 1.750 | -5.7 |
| 80 | 41.75 | 42.90 | 2.693 | 2.734 | -1.5 |
| 100 | 48.01 | 49.15 | 3.475 | 3.458 | 0.5 |





![Fig. 3.2. Spectra of a tungsten-anode tube (θ = 12°, 2.5 mm Al) at 50, 80 and 100 kV calculated with SpekPy v2 (solid lines) and with the developed model (dashed lines), normalised to equal area and scaled to the maximum of the corresponding SpekPy spectrum. The same electron depth factor η = 0.40 as for the Cu anode was used.](/home/user/atlant-impossible/dissertation/code/../figures/en/fig06_validation_w.png){width=15.5cm}



## 3.2. Spectrum of the 45 kV copper-anode tube

The spectrum of the tube under the baseline conditions is shown in Fig. 3.3. Its low-energy end is determined by the 0.5 mm Be window and the 10 cm air path, which together remove practically all photons below about 3 keV; the small kink near 3.2 keV is caused by the K-edge of the argon contained in air. Below the K-edge of copper the continuum rises to a broad plateau at about 7–9 keV and then drops abruptly at 8.98 keV: photons just above this energy are absorbed in the anode much more strongly than photons just below it, so that the anode acts as its own K-edge filter. Above the edge the continuum recovers to a shallow maximum near 12–13 keV and then decreases to zero at 45 keV, and the Ag K-edge falls into its weak high-energy part. The Cu Kα (8.05 keV) and Kβ (8.91 keV) lines rise far above the continuum; at the bin width of 0.05 keV the Kα peak exceeds the neighbouring continuum by more than two orders of magnitude. The DM reproduces this structure, with a continuum lying above that of SpekPy because of the higher absolute bremsstrahlung yield discussed in Section 3.1.



![Fig. 3.3. Spectrum of the 45 kV Cu-anode tube (θ = 12°, 0.5 mm Be, 10 cm air) at 10 cm from the focal spot calculated with SpekPy v2 and with the developed model. The dashed line marks the Ag K-edge (25.514 keV).](/home/user/atlant-impossible/dissertation/code/../figures/en/fig07_baseline.png){width=15.5cm}



The characteristic radiation and the beam-quality parameters are summarised in Table 3.3. According to SpekPy, characteristic photons make up 68.5 % of the photon fluence, so the unfiltered beam is essentially a source of Cu K radiation with an admixture of bremsstrahlung. In the DM the line intensities follow from 0.0159 K-shell ionisations per incident 45 keV electron, the fluorescence yield of copper $\omega_K = 0.4538$ and the relative radiative rates 0.583 (Kα1, 8.048 keV), 0.299 (Kα2, 8.028 keV) and 0.118 (Kβ1,3, 8.905 keV) from xraylib [60]; indirect fluorescence, excited by bremsstrahlung absorbed in the anode, contributes 4.5 % of the Kα and 4.8 % of the Kβ intensity. In the SpekPy spectrum the Kβ/Kα fluence ratio, integrated over narrow energy windows around the lines, is 0.1431. It slightly exceeds the ratio of the radiative rates (0.118/0.882 = 0.134), because the more energetic Kβ photons, which still lie below the Cu K-edge, are attenuated less in the anode, the window and air, and because the windows also contain some continuum. A 20 µm Ni filter, whose K-edge (8.333 keV, Table 2.2) lies between the Kα and Kβ energies, reduces this ratio to 0.0023; this is the classical β-filter of x-ray diffraction [52].

The quality of the unfiltered beam is very low. SpekPy gives a mean energy $\bar{E}$ (2.19) of 10.38 keV, a first HVL of 0.0478 mm Al, a second HVL of 0.0563 mm Al, a homogeneity coefficient of 0.85 and an effective energy of 7.82 keV; the corresponding DM values are 10.74 keV, 0.0464 mm Al, 0.0570 mm Al, 0.81 and 7.74 keV. An HVL below 50 µm Al and an effective energy below the Kα energy show that the air kerma, and hence the dose to soft tissue, is delivered mainly by the Cu K lines and the soft continuum. Only 4.64 % of the photons (DM: 5.04 %) lie above the Ag K-edge, carrying 14.1 % of the energy fluence (DM: 14.7 %), and their share in the kerma is smaller still because $\mu_{en}/\rho$ decreases steeply with photon energy. The output is very high: the air kerma at 10 cm is 383 mGy/mAs according to SpekPy (423 mGy/mAs in the DM), which corresponds to 15.3 Gy/s at 40 mA, and the photon fluence is $3.66 \times 10^{10}$ cm$^{-2}$ per mAs. Combined with the dominance of 8 keV photons, for which $R(E)$ is only 21.0, this predicts a modest DEF for the bare beam, as quantified in Section 3.5.



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

Three design parameters were varied one at a time around the baseline: the anode angle, the tube voltage and the thickness of the Be window. The spectra are shown in Fig. 3.4, Fig. 3.5 and Fig. 3.6, and the beam-quality parameters, the air kerma and the DEF for 1 % Ag are listed in Table 3.4.

Increasing the anode angle from 6° to 30° raises the air kerma from 296 to 463 mGy/mAs, i.e. by a factor of 1.56, while the mean energy decreases from 10.73 to 10.07 keV and the HVL from 0.0497 to 0.0455 mm Al. The reason is self-filtration in the anode. A photon produced at depth $d$ leaves the anode along the central ray over a path $d/\sin\theta$, which at 6° is about 4.8 times longer than at 30°. As Fig. 3.4 shows, the effect is strongest where copper is most opaque, at the soft end of the spectrum and just above the Cu K-edge, where the fluence at small angles is reduced several-fold. It is weaker between about 6 keV and the edge, and above about 25 keV, where copper is much more transparent, the curves nearly merge. The same mechanism causes the heel effect, the decrease of intensity towards the anode side of the radiation field [16]; the present calculations refer to the central ray only. A small anode angle thus gives a smaller effective focal spot but a lower output and a slightly harder beam, while the DEF for 1 % Ag changes only from 1.2035 at 6° to 1.1991 at 30°.



![Fig. 3.4. Influence of the anode angle (6–30°) on the spectrum of the 45 kV Cu-anode tube (0.5 mm Be, 10 cm air; SpekPy v2). The dashed line marks the Ag K-edge.](/home/user/atlant-impossible/dissertation/code/../figures/en/fig08_angle.png){width=15.5cm}



The tube voltage has the strongest influence on the output. When the voltage rises from 25 to 50 kV, the air kerma increases from 163 to 430 mGy/mAs, the mean energy from 8.93 to 10.75 keV and the HVL from 0.0402 to 0.0487 mm Al. The increase in output comes largely from the Cu K lines: at higher voltage the electrons travel a longer path at energies where the K-shell ionisation cross-section is close to its maximum of about 351 b, reached near 35 keV. Fig. 3.5 shows that the continuum extends up to the maximum photon energy $eU$, where $e$ is the elementary charge and $U$ the tube voltage, and that its high-energy part grows strongly, whereas the fluence just above the Cu K-edge is almost independent of the voltage. Photons of this energy are absorbed in copper so strongly that only those produced in a thin layer below the anode surface escape, while the additional bremsstrahlung that faster electrons produce at greater depths is reabsorbed in the anode. The DEF increases only from 1.1932 at 25 kV to 1.2027 at 50 kV. At 25 kV no photon reaches the Ag K-edge, yet the DEF is already 1.19: the enhancement of the unfiltered beam is therefore caused almost entirely by photoabsorption in the L and M shells of Ag below its K-edge, where $R(E)$ is 21–32.



![Fig. 3.5. Spectra of the Cu-anode tube at tube voltages of 25–50 kV (θ = 12°, 0.5 mm Be, 10 cm air; SpekPy v2). The dashed line marks the Ag K-edge.](/home/user/atlant-impossible/dissertation/code/../figures/en/fig09_kvp.png){width=15.5cm}



The Be window affects only the soft end of the spectrum (Fig. 3.6). Beryllium (Z = 4) absorbs weakly, so increasing the window thickness from 0.15 to 2.0 mm removes mainly photons below about 6 keV; the Cu K lines and the continuum near 8 keV are weakened by a smaller fraction, and the spectrum above 10 keV hardly changes. The air kerma decreases from 423 to 271 mGy/mAs, while the mean energy rises from 10.23 to 10.99 keV, the HVL from 0.0454 to 0.0528 mm Al and the DEF from 1.1989 to 1.2061. Together with the air path, the window sets the low-energy cut-off of the beam reaching the sample. Its thickness is fixed by the tube design rather than chosen by the user, but it must be known accurately for spectrum calculations, since it changes the output by more than one third over the studied range.



![Fig. 3.6. Influence of the Be window thickness (0.15–2.0 mm) on the low-energy part of the spectrum of the 45 kV Cu-anode tube (θ = 12°, 10 cm air; SpekPy v2).](/home/user/atlant-impossible/dissertation/code/../figures/en/fig10_be.png){width=15.5cm}



The DEF values obtained with the DM spectra agree with those of SpekPy within 0.003 for all design variants (Table 3.4). Overall, the design parameters change the output by factors of up to 1.6 (anode angle, window) and 2.6 (voltage), but the DEF for 1 % Ag remains between 1.19 and 1.21. In every unfiltered beam the tissue dose is dominated by the Cu K lines and by photons of 3–15 keV, for which $R(E)$ is only 21–27, and the design parameters shift the balance between these components only slightly. The tube design is therefore a lever for the dose rate rather than for the DEF; a substantial increase in the DEF requires reshaping the spectrum with added filters.



Table: Table 3.4. Influence of tube design parameters on the beam quality and on the DEF for 1 % Ag (SpekPy spectra; DEF also with the developed model)

| Parameter | Value | Ē, keV | HVL, mm Al | K_air, mGy/mAs | DEF (SpekPy) | DEF (DM) |
|:---|---:|---:|---:|---:|---:|---:|
| anode angle | 6° | 10.73 | 0.0497 | 296 | 1.204 | 1.204 |
| anode angle | 9° | 10.51 | 0.0486 | 349 | 1.202 | 1.202 |
| anode angle | 12° | 10.38 | 0.0478 | 383 | 1.202 | 1.201 |
| anode angle | 16° | 10.27 | 0.0470 | 413 | 1.201 | 1.200 |
| anode angle | 20° | 10.20 | 0.0464 | 433 | 1.200 | 1.199 |
| anode angle | 30° | 10.07 | 0.0455 | 463 | 1.199 | 1.197 |
| tube voltage | 25 kV | 8.93 | 0.0402 | 163 | 1.193 | 1.190 |
| tube voltage | 30 kV | 9.31 | 0.0431 | 220 | 1.196 | 1.194 |
| tube voltage | 35 kV | 9.67 | 0.0452 | 277 | 1.198 | 1.197 |
| tube voltage | 40 kV | 10.03 | 0.0467 | 332 | 1.200 | 1.199 |
| tube voltage | 45 kV | 10.38 | 0.0478 | 383 | 1.202 | 1.201 |
| tube voltage | 50 kV | 10.75 | 0.0487 | 430 | 1.203 | 1.203 |
| Be window | 0.15 mm | 10.23 | 0.0454 | 423 | 1.199 | 1.198 |
| Be window | 0.3 mm | 10.30 | 0.0466 | 405 | 1.200 | 1.200 |
| Be window | 0.5 mm | 10.38 | 0.0478 | 383 | 1.202 | 1.201 |
| Be window | 1.0 mm | 10.59 | 0.0500 | 338 | 1.204 | 1.204 |
| Be window | 2.0 mm | 10.99 | 0.0528 | 271 | 1.206 | 1.207 |



## 3.4. Influence of added filters on the spectrum

Added filters reshape the spectrum through the energy-dependent transmission $\exp[-\mu_f(E)\,t]$ of (2.15), where $\mu_f(E)$ is the linear attenuation coefficient of the filter material and $t$ is its thickness; SpekPy applies the same law with its own attenuation data. Three groups of filters were studied: aluminium, whose K-edge (1.56 keV) lies below the spectrum, so that its attenuation decreases smoothly with energy; nickel and copper, whose K-edges lie near the Cu K lines; and molybdenum, silver and tin, whose K-edges (20.0, 25.514 and 29.2 keV, Table 2.2) lie in the hard part of the spectrum. The spectra are shown in Fig. 3.7, Fig. 3.8 and Fig. 3.9, and the beam parameters are given in Table 3.5.

Aluminium filters act as classical hardening filters (Fig. 3.7). In this energy range the attenuation in aluminium is dominated by photoelectric absorption, whose cross-section falls roughly as $E^{-3}$, so the soft continuum and the Cu K lines are removed far more efficiently than the photons above the Ag K-edge. With 0.25 mm Al the Kα line is weakened by more than an order of magnitude but remains visible, and with 1–2 mm Al it practically disappears. The maximum of the continuum moves from below 9 keV without a filter to about 27 keV with 2 mm Al, while the fluence above 30 keV decreases only moderately. Correspondingly, for 0.25, 0.5, 1.0 and 2.0 mm Al the mean energy increases to 19.73, 23.78, 26.13 and 28.59 keV, and the fraction of photons above the Ag K-edge to 25.8, 38.2, 49.8 and 65.0 %. The HVL rises abruptly from 0.104 mm Al with the 0.25 mm filter to 0.454 mm Al with the 0.5 mm filter, because behind the thinner filter the residual Cu K lines still carry a large part of the air kerma and therefore determine the first HVL. The price is the output: the relative air kerma $K/K_0$ is 0.0588, 0.0173, 0.00829 and 0.00372, so 1 mm Al reduces the dose rate about 120-fold and 2 mm Al about 270-fold.



![Fig. 3.7. Spectra of the 45 kV Cu-anode tube with added Al filters of 0.25–2.0 mm (θ = 12°, 0.5 mm Be, 10 cm air; SpekPy v2). The dashed line marks the Ag K-edge.](/home/user/atlant-impossible/dissertation/code/../figures/en/fig11_al.png){width=15.5cm}



Copper filters behave differently (Fig. 3.8). The K-edge of copper (8.979 keV) lies just above its own Kα and Kβ energies, so a copper filter is relatively transparent to the Cu K radiation while absorbing the continuum at 9–20 keV very strongly. A 0.05 mm Cu filter therefore gives $\bar{E}$ = 15.37 keV but an HVL of only 0.0575 mm Al. With 0.1 mm Cu the mean energy (24.08 keV) is close to that obtained with 0.5 mm Al (23.78 keV), yet the HVL (0.0702 mm Al) is 6.5 times smaller. The two quantities are weighted differently: the mean energy is weighted by fluence and reflects the hard continuum, whereas the HVL is weighted by air kerma and is controlled by the transmitted Kα line, for which $\mu_{en}/\rho$ of air is much larger. Only 0.2 mm Cu suppresses the lines sufficiently; this beam has $\bar{E}$ = 33.09 keV, an HVL of 1.403 mm Al and 91.2 % of the photons above the Ag K-edge, but a relative air kerma of only $7.64 \times 10^{-4}$. A 0.02 mm Ni filter, with its K-edge between Kα and Kβ, removes the Kβ line and the continuum just above 8.33 keV, which appears as a step in the spectrum, while transmitting Kα with a moderate loss; the air kerma falls to 0.339 of its unfiltered value. The result is a quasi-monochromatic 8 keV beam ($\bar{E}$ = 12.09 keV, 10.3 % of photons above the Ag K-edge), suitable for x-ray diffraction [52] but not for dose enhancement by Ag.



![Fig. 3.8. Spectra of the 45 kV Cu-anode tube with a 0.02 mm Ni filter and with Cu filters of 0.05–0.2 mm (θ = 12°, 0.5 mm Be, 10 cm air; SpekPy v2). The dashed line marks the Ag K-edge.](/home/user/atlant-impossible/dissertation/code/../figures/en/fig12_cu_ni.png){width=15.5cm}



The K-edge filters of Mo, Ag and Sn are compared with 1 mm Al in Fig. 3.9. Each of them is relatively transparent just below its K-edge and opaque just above it, so it transmits a band below the edge and cuts the fluence above the edge several-fold or more; narrow residual Cu K lines remain visible behind the Mo and thin Sn filters because of their high initial intensity. The 0.05 mm Mo filter transmits the 12–20 keV band, where its spectrum lies above the Al-filtered one, but strongly suppresses the photons above 20 keV, so that only 31.5 % of its photons exceed the Ag K-edge. The 0.05 mm Ag filter follows the Al-filtered curve up to 25.5 keV and then removes precisely the photons that are most useful for enhancement by Ag. Although its HVL (0.624 mm Al) is comparable to that of 0.05 mm Sn (0.606 mm Al) and larger than that of 0.5 mm Al (0.454 mm Al), only 20.1 % of its photons lie above the Ag K-edge, against 34.3 % and 38.2 %. Tin preserves the 25.5–29.2 keV window directly above the Ag K-edge but removes the photons above 29.2 keV, where $R(E)$ is highest (102.7 at 30 keV and 138.8 at 45 keV). Consequently, 0.1 mm Sn gives a slightly larger HVL than 1 mm Al (0.902 against 0.830 mm Al) but a smaller fraction of photons above the Ag K-edge (40.4 % against 49.8 %).



![Fig. 3.9. Spectra of the 45 kV Cu-anode tube filtered by K-edge absorbers (Mo 0.05 mm, Ag 0.05 mm, Sn 0.05 and 0.1 mm) compared with the spectrum filtered by 1.0 mm Al, relative to the maximum of the Al-filtered spectrum (SpekPy v2). The dashed line marks the Ag K-edge.](/home/user/atlant-impossible/dissertation/code/../figures/en/fig13_kedge.png){width=15.5cm}



These results show that neither the mean energy nor the HVL alone characterises the part of the spectrum that matters for Ag. The DEF values in Table 3.5 broadly follow the fraction of photons above the Ag K-edge as long as the kerma is not dominated by the Cu K lines: the 0.1 mm Cu filter, with 55.1 % of the photons above the edge, gives a DEF of only 1.288, because the transmitted Kα line delivers most of the tissue dose. The DEF is analysed in detail in the next section.



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

In the kerma approximation the DEF is the ratio of two spectrum-weighted integrals (2.23), so its value is determined by the distribution of the product $E\,\Phi(E)\,\mu_{en}/\rho$ over energy. This dose integrand is shown in Fig. 3.10 for ICRU-44 tissue and for tissue containing 1 % Ag by mass. Without added filtration the integrand is dominated by the Cu K lines and by the continuum at 3–15 keV, and above about 20 keV it falls below $10^{-4}$ of its maximum: although 14.1 % of the energy fluence lies above the Ag K-edge, $\mu_{en}/\rho$ of tissue is so small there that these photons contribute almost nothing to the dose. In the dominant region $R(E)$ is only 21.0 at 8 keV, 23.0 at 10 keV and 26.9 at 15 keV, so 1 % Ag raises the integrand almost uniformly by about 20 %. With 1 mm Al the integrand is concentrated between 15 and 45 keV with a maximum near 18–19 keV, and the residual Kβ line exceeds the Kα line because aluminium attenuates the lower-energy line more strongly. At the Ag K-edge the integrand of the loaded tissue jumps, whereas that of pure tissue is continuous. Above the edge $R(E)$ increases from 76.2 at 25.6 keV to 102.7 at 30 keV and 138.8 at 45 keV, so the gap between the two curves widens; since about half of the photons of this beam lie above the edge, this region provides the larger part of the enhancement.



![Fig. 3.10. Energy-resolved dose integrand, the product of photon energy, fluence spectrum and mass energy-absorption coefficient, for ICRU-44 soft tissue (shaded) and for tissue containing 1 % Ag (line), without added filtration (left) and with 1.0 mm Al (right); 45 kV Cu-anode tube, SpekPy v2. The values are relative to the maximum of the tissue integrand; the dashed line marks the Ag K-edge.](/home/user/atlant-impossible/dissertation/code/../figures/en/fig14_integrand.png){width=15.5cm}



The DEF increases linearly with the Ag mass fraction $w$ for every filter (Fig. 3.11, Table 3.6). The linearity follows from the mixture rule for $\mu_{en}/\rho$: according to (2.24), $\mathrm{DEF} = 1 + w(\langle R\rangle - 1)$, where $\langle R\rangle$ is the mean of $R(E)$ weighted by the dose spectrum of unloaded tissue (2.25). The slope $(\mathrm{DEF}-1)/w$ per 1 % Ag is 0.202 without a filter, 0.377 with 0.5 mm Al, 0.482 with 1 mm Al, 0.623 with 2 mm Al and 0.804 with 0.2 mm Cu, which corresponds to $\langle R\rangle$ of about 21, 39, 49, 63 and 81. For 1 % Ag the DEF is 1.20 without a filter, 1.48 with 1 mm Al, 1.62 with 2 mm Al and 1.80 with 0.2 mm Cu; for 2 % Ag the corresponding values are 1.40, 1.96, 2.25 and 2.61. At 0.1 % Ag (1 mg of Ag per gram of loaded tissue) the DEF lies between 1.020 and 1.080, an enhancement of only 2–8 %, whereas at 0.5 % it reaches 1.241 with 1 mm Al. The strict linearity holds at the surface of the sample; inside an extended Ag-loaded region the attenuation by Ag itself makes the dependence non-linear (Section 3.7).



![Fig. 3.11. Dose enhancement factor of ICRU-44 soft tissue as a function of the Ag mass fraction for different added filters (45 kV Cu-anode tube, SpekPy v2 spectra, kerma approximation at the surface).](/home/user/atlant-impossible/dissertation/code/../figures/en/fig15_def_conc.png){width=15.5cm}



The ranking of the filters confirms that the DEF is governed by the share of the dose integrand above the Ag K-edge rather than by the mean energy. For 1 % Ag the highest values are obtained with 0.2 mm Cu (1.804) and 2 mm Al (1.623), followed by 0.2 mm Sn (1.524) and 1 mm Al (1.482). The Ag and Mo filters (1.342 and 1.337) remain below 0.5 mm Al (1.377), and the thin Cu and Ni filters (1.208–1.288) improve only slightly on the unfiltered beam. The Ni-filtered beam, being nearly a pure Cu Kα source, gives practically the same DEF as the unfiltered beam (1.208 against 1.202). At a similar HVL, 0.1 mm Sn yields a lower DEF than 1 mm Al (1.444 against 1.482), because it removes the hardest photons.

The last two columns of Table 3.5 compare the DEF obtained with the two spectrum models. Without filtration they practically coincide (1.2012 for the DM against 1.2015 for SpekPy) and differ by less than 0.3 % for all design variants (Table 3.4). With 0.5–2 mm Al the DM is lower by 0.6–1.3 % (for example, 1.4638 against 1.4819 for 1 mm Al), and for the Sn, Ag and Mo filters the deviation is below 1 %. The sign agrees with Section 3.1: the weaker high-energy tail of the DM continuum reduces the weight of the photons above the Ag K-edge. Where residual Cu K lines carry a substantial part of the kerma, the DM gives higher values, by 0.5 % for 0.25 mm Al and by about 2 % for 0.1 and 0.2 mm Cu (1.3107 against 1.2876 and 1.8433 against 1.8041), because the underestimated lines shift the dose towards the hard continuum. Differences of 1–2 % are small compared with the differences between filters, so the DEF is robust to the choice of spectrum model.

The choice of the reference medium has a small but systematic effect. With water instead of ICRU-44 soft tissue, the DEF for 1 % Ag is 1.2018 without a filter, 1.4965 with 1 mm Al, 1.644 with 2 mm Al and 1.8274 with 0.2 mm Cu, i.e. up to 1.3 % higher for filtered beams. Although ICRU-44 tissue contains less oxygen than water, its 1.3 % by mass of Na, P, S, Cl and K, elements of higher atomic number, increases its photoabsorption, so that its $\mu_{en}/\rho$ exceeds that of water at 15–40 keV and the DEF is lower. This difference should be taken into account when DEF values calculated for water are compared with values for tissue.



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

Because every filter raises the DEF at the expense of the dose rate, the best filter is the one giving the highest DEF at a given transmission. Fig. 3.12 shows the DEF for 1 % Ag versus the relative air kerma for Al, Ti, Ni, Cu, Mo, Ag and Sn filters of increasing thickness, applied to the unfiltered SpekPy spectrum with xraylib attenuation coefficients. The Al and Ti curves practically coincide and lie highest from 1 down to about $10^{-3}$. The Ni and Cu curves stay low while the Cu Kα line is transmitted and rise steeply only below about $10^{-2}$. The Sn curve lies below the Al and Ti curves at all transmissions, the Mo curve levels off near 1.4, and the Ag curve passes through a maximum of about 1.35 and then decreases, because a thicker Ag filter removes ever more of the photons above the Ag K-edge.



![Fig. 3.12. Dose enhancement factor for 1 % Ag versus the relative air kerma (transmission) of the beam for filters of Al, Ti, Ni, Cu, Mo, Ag and Sn of increasing thickness (45 kV Cu-anode tube, θ = 12°, 0.5 mm Be, 10 cm air; SpekPy v2).](/home/user/atlant-impossible/dissertation/code/../figures/en/fig16_tradeoff.png){width=15.5cm}



For a systematic comparison of materials, the thickness $t$ of each filter was found from the condition of equal air-kerma transmission

$$\mathcal{T}_K(t) = \frac{\int_{0}^{T_0} \Phi_0(E)\,E\,\left(\mu_{en}/\rho\right)_{\mathrm{air}}\exp\left[-\mu_f(E)\,t\right]\mathrm{d}E}{\int_{0}^{T_0} \Phi_0(E)\,E\,\left(\mu_{en}/\rho\right)_{\mathrm{air}}\,\mathrm{d}E}$$

EQNUM[3.2]


where $\mathcal{T}_K(t)$ is the air-kerma transmission of a filter of thickness $t$, $\Phi_0(E)$ is the fluence spectrum of the unfiltered beam, $(\mu_{en}/\rho)_{\mathrm{air}}$ is the mass energy-absorption coefficient of air, $\mu_f(E)$ is the linear attenuation coefficient of the filter element and $T_0$ = 45 keV is the maximum photon energy. Equation (3.2) was solved for $\mathcal{T}_K$ = 10 %, 1 % and 0.1 % by Brent's method [66] for the elements from Al (Z = 13) to Bi (Z = 83), excluding gases, liquids, P, S, Se, the alkali metals, radioactive elements, Tl and the lanthanides other than Gd. The results are shown in Fig. 3.13 and, for selected elements, in Table 3.7.

The dependence on Z reflects the positions of the absorption edges of the filter relative to the Cu lines and to the Ag K-edge; at 10 % transmission all elements still give 1.220–1.241. Elements from Al to Co (Z = 13–27) have K-edges below the Cu Kα energy, absorb the Cu lines strongly and attenuate the rest of the spectrum smoothly, giving 1.88–1.91 at 0.1 %. At 1 % the DEF decreases from Ti to Co (1.452 to 1.397), because as the K-edge approaches the Kα energy, more of the soft continuum below the edge leaks through; at 0.1 % this window is closed too (Fe 1.904, Co 1.901). For Ni to As (Z = 28–33) the K-edge lies above the Kα energy, so the line is transmitted and dominates the kerma, making these the worst filters at 10 % and 1 %.

Elements from Sr to Ag (Z = 38–47), whose K-edges lie above the Cu K lines and up to the Ag K-edge (for example, 20.0 keV for Mo), absorb the photons above the Ag K-edge and at 0.1 % form a deep minimum, lowest for Ag (1.335), Pd (1.340) and Rh (1.346). For Cd to Ba (Z = 48–56) the K-edges lie above the Ag K-edge, and the DEF at 0.1 % grows with Z (1.529 for Sn, 1.692 for I). Gd and heavier elements, whose K-edges exceed 45 keV, act through L-shell absorption: Gd, with its L3 edge (7.243 keV) below the Cu Kα energy, behaves like the light absorbers (1.883 at 0.1 %), whereas for Hf to Bi the L3 edges lie above Kα (11.919 keV for Au, Table 2.2), the line leaks through, and W, Au and Pb give only 1.350–1.351 at 1 %.



![Fig. 3.13. Dose enhancement factor for 1 % Ag obtained with filters of different elements (Z = 13–83) whose thickness gives an equal air-kerma transmission of 10 %, 1 % and 0.1 % (45 kV Cu-anode tube, θ = 12°, 0.5 mm Be, 10 cm air; SpekPy v2).](/home/user/atlant-impossible/dissertation/code/../figures/en/fig17_filter_scan.png){width=15.5cm}



At 10 % and 1 % transmission the light and medium-Z absorbers Al, Si, Ca, Sc and Ti give practically the same DEF (1.236–1.241 and 1.452–1.455, respectively); at 0.1 % Ca, Sc, Ti and V give 1.907, whereas Al gives 1.884, i.e. 1.2 % less. Since calcium and scandium are chemically or technically unsuitable as filter foils, Al and Ti are the practical materials. Titanium needs a much thinner foil (111.2 instead of 824.4 µm at 1 %) and is slightly more effective at strong attenuation: in the several-millimetre-thick Al filter, Compton scattering, which depends only weakly on energy, contributes more to the attenuation of the hard photons and makes the filter less selective in energy.



Table: Table 3.7. Filter materials at equal air-kerma transmission: required thickness and DEF (1 % Ag)

| Filter | Z | t (10 %), µm | DEF (10 %) | t (1 %), µm | DEF (1 %) | t (0.1 %), µm | DEF (0.1 %) |
|:---|---:|---:|---:|---:|---:|---:|---:|
| Al | 13 | 188.8 | 1.241 | 824.4 | 1.454 | 4748.3 | 1.884 |
| Ti | 22 | 29.0 | 1.236 | 111.2 | 1.452 | 634.6 | 1.907 |
| Fe | 26 | 13.7 | 1.227 | 55.4 | 1.410 | 223.7 | 1.904 |
| Co | 27 | 12.1 | 1.226 | 50.7 | 1.397 | 181.3 | 1.901 |
| Ni | 28 | 46.5 | 1.220 | 102.4 | 1.312 | 182.7 | 1.774 |
| Cu | 29 | 47.5 | 1.221 | 102.8 | 1.307 | 180.8 | 1.736 |
| Zr | 40 | 28.0 | 1.229 | 74.0 | 1.326 | 204.1 | 1.422 |
| Mo | 42 | 15.6 | 1.231 | 44.3 | 1.330 | 134.7 | 1.380 |
| Ag | 47 | 11.1 | 1.233 | 36.8 | 1.336 | 138.1 | 1.335 |
| Sn | 50 | 13.8 | 1.236 | 48.4 | 1.384 | 204.2 | 1.529 |
| I | 53 | 17.7 | 1.238 | 63.2 | 1.419 | 294.6 | 1.692 |
| Gd | 64 | 8.7 | 1.232 | 27.3 | 1.431 | 125.5 | 1.883 |
| W | 74 | 7.0 | 1.226 | 15.6 | 1.350 | 34.4 | 1.862 |
| Au | 79 | 5.9 | 1.227 | 13.3 | 1.350 | 29.4 | 1.832 |
| Pb | 82 | 9.2 | 1.228 | 21.3 | 1.351 | 48.0 | 1.790 |



The consequences for an irradiation experiment are summarised in Table 3.8, which gives the tissue kerma at the sample surface and the time needed to deliver a dose $D$ at tube current $I$,

$$t_D = \frac{D}{c\,I\int_{0}^{T_0} \Phi(E)\,E\,\left(\mu_{en}/\rho\right)_t\,\mathrm{d}E}$$

EQNUM[3.3]


where $D$ = 2 Gy, $I$ = 40 mA, $\Phi(E)$ is the fluence spectrum per unit tube charge at 10 cm (cm$^{-2}$ keV$^{-1}$ mAs$^{-1}$), $(\mu_{en}/\rho)_t$ refers to ICRU-44 tissue and $c = 1.602 \times 10^{-13}$ Gy g keV$^{-1}$ converts the absorbed energy per gram into gray; under CPE the tissue kerma equals the absorbed dose at the surface, and backscatter from deeper layers is not included. Without a filter 2 Gy are delivered in 0.12 s (16.5 Gy/s), which is difficult to time reproducibly. With 1 mm Al the kerma rate is 0.137 Gy/s and the irradiation takes 14.6 s; with 2 mm Al the values are 0.062 Gy/s and 32.5 s. The 0.2 mm Cu filter gives the highest DEF of the studied set (1.80) only because of its very strong attenuation (at an equal transmission of 0.1 %, Cu gives 1.74, Al and Ti 1.88–1.91). It needs 158.4 s, and near this thickness the DEF changes steeply (Fig. 3.12), which makes it sensitive to thickness tolerances.



Table: Table 3.8. Tissue kerma rate at the sample surface (10 cm, 40 mA) and time needed to deliver 2 Gy

| Filter | Tissue kerma, mGy/mAs | Kerma rate, Gy/s | Time for 2 Gy, s | DEF (1 % Ag) |
|:---|---:|---:|---:|---:|
| no added filter | 412.9 | 16.52 | 0.12 | 1.202 |
| Al 0.25 mm | 24.3 | 0.971 | 2.06 | 1.265 |
| Al 0.5 mm | 7.15 | 0.286 | 6.99 | 1.377 |
| Al 1.0 mm | 3.42 | 0.137 | 14.6 | 1.482 |
| Al 2.0 mm | 1.54 | 0.062 | 32.5 | 1.623 |
| Cu 0.05 mm | 39.9 | 1.60 | 1.25 | 1.221 |
| Cu 0.1 mm | 5.24 | 0.210 | 9.55 | 1.288 |
| Cu 0.2 mm | 0.32 | 0.013 | 158.4 | 1.804 |
| Ni 0.02 mm | 139.8 | 5.59 | 0.36 | 1.208 |
| Sn 0.05 mm | 4.07 | 0.163 | 12.3 | 1.385 |
| Sn 0.1 mm | 1.60 | 0.064 | 31.3 | 1.444 |
| Sn 0.2 mm | 0.46 | 0.018 | 109.7 | 1.524 |
| Ag 0.05 mm | 2.76 | 0.110 | 18.1 | 1.342 |
| Mo 0.05 mm | 3.44 | 0.138 | 14.5 | 1.337 |



Filtration is thus the decisive design lever for dose enhancement by Ag with a copper-anode tube. With 1 mm Al the DEF for 1 % Ag rises from 1.20 to 1.48, and with 2 mm Al to 1.62, while the time needed for 2 Gy remains between about 15 and 33 s, which is convenient for experiments. Aluminium of 1–2 mm or titanium of 0.1–0.3 mm is therefore the optimal choice. K-edge filters with edges at 20–30 keV (Mo, Ag, Sn) and filters that transmit the Cu Kα line (Ni, thin Cu) should be avoided.


## 3.7. Depth dependence and self-shielding

The DEF values discussed so far refer to the surface of the medium, whereas in experiments with tissue samples, phantoms or small animals the Ag-loaded target lies beneath tissue that modifies the beam. Two situations were therefore calculated with the SpekPy spectra in the primary-beam kerma approximation (Section 2.6). In the first, a small Ag-loaded region lies at depth $z$ in Ag-free soft tissue, and only the overlying tissue attenuates the beam, as described by equation (2.26). In the second, the region from the surface to the depth $z$ is uniformly loaded with Ag, which itself contributes to the attenuation, as described by equation (2.27). Scattered radiation is not included in either case; its role is assessed in Section 3.9.

The DEF of a loaded region at depth $z$ is shown in Fig. 3.14, and Table 3.9 also gives the relative tissue dose of the primary beam $D/D_0$, where $D_0$ is the dose at the surface. For all filters the DEF increases monotonically with depth, because the overlying tissue preferentially absorbs low-energy photons and shifts the energy fluence towards higher energies, where the Ag/tissue ratio of the mass energy-absorption coefficients is larger. The increase is pronounced for the unfiltered beam, for which the DEF for 1 % Ag rises from 1.20 at the surface to 1.34 at 5 mm and 1.56 at 20 mm. This gain is accompanied by a severe loss of dose: as the Cu K lines and the soft bremsstrahlung are absorbed in the first millimetres, the relative dose falls to 0.328 at 1 mm and 0.0090 at 10 mm. A few millimetres of tissue thus act as an added filter, with the trade-off described in Section 3.6. With the 1 mm Al filter, which has already hardened the beam, the DEF increases more moderately (1.48 at the surface, 1.54 at 5 mm and 1.69 at 20 mm), while the relative dose decreases only to 0.642 at 5 mm and 0.439 at 10 mm.



![Fig. 3.14. Dose enhancement factor for 1 % Ag versus the depth of the Ag-loaded region in Ag-free ICRU-44 soft tissue, for the 45 kV Cu-anode beam without added filter and with Al 0.5 mm, Al 1.0 mm, Cu 0.1 mm and Sn 0.1 mm filters (SpekPy spectra, primary beam, kerma approximation).](/home/user/atlant-impossible/dissertation/code/../figures/en/fig18_def_depth.png){width=15.5cm}





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



The Cu and Sn filters represent the two extremes. The beam filtered by 0.1 mm Cu consists of the transmitted Cu Kα line and a hard bremsstrahlung tail (Section 3.4); as the Kα line is absorbed in the first millimetres of tissue, the DEF rises steeply from 1.29 at the surface to 1.77 at 5 mm and 1.90 at 20 mm. From about 2 mm onwards this curve lies above all others, and at 5 mm its DEF approaches the surface value obtained with 0.2 mm Cu (1.80), because both beams then consist essentially of the hard component. The Sn 0.1 mm filter produces the weakest depth dependence, from 1.44 at the surface to 1.57 at 20 mm, because the photons above the Sn K-edge (29.2 keV) have been strongly attenuated and tissue hardens the remaining narrow band only slightly. The ranking of filters by their surface DEF therefore does not hold for deep-seated targets.

The opposite trend appears when the loaded region extends from the surface (Fig. 3.15). Here the DEF decreases with depth, because Ag most strongly attenuates the photons above its K-edge that produce the enhancement; at 25.514 keV the mass attenuation coefficient of Ag increases 5.8-fold, from 9.53 to 55.4 cm²/g. With the Al 1.0 mm filter the DEF falls from 1.48 at the surface to 1.34 at 5 mm and 1.21 at 10 mm for 1 % Ag, and from 1.96 to 1.57 and 1.27 for 2 % Ag. Self-shielding thus increases with the concentration, and the linear relation between $\mathrm{DEF}-1$ and $w$ given by equation (2.24) is valid only for thin loaded layers. The Sn-filtered beam loses a larger part of its enhancement (for 1 % Ag, from 1.44 at the surface to 1.15 at 10 mm), because its spectrum is concentrated just above the Ag K-edge, where the attenuation by Ag is largest. The enhancement in a uniformly loaded region several millimetres thick is therefore non-uniform and, on average, considerably lower than at the surface.



![Fig. 3.15. Dose enhancement factor inside a uniformly Ag-loaded region extending from the surface of soft tissue, versus depth, for Ag mass fractions of 0.5, 1.0 and 2.0 % with the Al 1.0 mm filter (solid lines) and the Sn 0.1 mm filter (dashed lines); the attenuation of the beam by Ag (self-shielding) is included.](/home/user/atlant-impossible/dissertation/code/../figures/en/fig19_def_slab.png){width=15.5cm}



## 3.8. Influence of tube voltage and comparison with other high-Z elements

The dependence of the DEF on the tube voltage $U$ is shown in Fig. 3.16 and Table 3.10 for the Al 0.5 mm and Al 1.0 mm filters. For 20–50 kV, within the range in which SpekPy supports the Cu anode, SpekPy spectra were used, whereas the points for 60–80 kV are predictions of the DM. Since the maximum photon energy equals $eU$, where $e$ is the elementary charge, photons above the Ag K-edge (25.514 keV) are present only at voltages above 25.5 kV. Below this voltage the DEF depends only weakly on $U$: with Al 1.0 mm it increases from 1.26 at 20 kV to 1.27 at 25 kV, owing to the gradual hardening of the bremsstrahlung. The slope of both curves increases visibly from 26–27 kV, and between 30 and 50 kV the DEF for Al 1.0 mm rises from 1.31 to 1.52 with a gradually decreasing slope, which near 45 kV is consistent with the change of ±0.009 for ±1 kV found in Section 3.10. Above 50 kV the growth slows down further (1.58 at 60 kV and 1.68 at 80 kV), because the spectrum extends beyond the maximum of the Ag/tissue ratio of the mass energy-absorption coefficients near 40–45 keV. As the DM gives slightly lower DEFs than SpekPy at 45 kV (1.369 versus 1.377 for Al 0.5 mm and 1.464 versus 1.482 for Al 1.0 mm), the values at 60–80 kV are, if anything, underestimated, and part of the flattening between 50 and 60 kV reflects the change of the spectrum model.



![Fig. 3.16. Dose enhancement factor for 1 % Ag versus tube voltage for the Cu-anode tube with Al 0.5 mm and Al 1.0 mm filters: SpekPy v2 spectra for 20–50 kV (solid lines, circles) and the developed model for 60–80 kV (dashed lines, squares). The vertical line marks the Ag K-edge.](/home/user/atlant-impossible/dissertation/code/../figures/en/fig20_def_kvp.png){width=15.5cm}





Table: Table 3.10. DEF (1 % Ag) versus tube voltage (20–50 kV: SpekPy; 60–80 kV: developed model)

| U, kV | 20 | 22 | 24 | 25 | 26 | 27 | 28 | 30 | 35 | 40 | 45 | 50 | 60 | 70 | 80 |
|:---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Al 0.5 mm | 1.246 | 1.250 | 1.253 | 1.255 | 1.257 | 1.260 | 1.265 | 1.277 | 1.312 | 1.346 | 1.377 | 1.406 | 1.452 | 1.499 | 1.541 |
| Al 1.0 mm | 1.261 | 1.266 | 1.270 | 1.272 | 1.275 | 1.282 | 1.291 | 1.314 | 1.376 | 1.433 | 1.482 | 1.524 | 1.577 | 1.633 | 1.679 |



To place silver among other candidate radiosensitizers, the DEF was calculated under the same conditions for soft tissue containing 1 % by mass of I, Gd, Pt, Au or Bi (Fig. 3.17, Table 3.11). Without added filtration all elements give similar DEFs of 1.20–1.33, because the dose is dominated by the Cu K lines and by photons below 15 keV. Pt and Au (1.20 and 1.21) hardly differ from Ag: their L-edges, like those of Bi, lie above the Cu lines, at about 12–16 keV, and below these edges they absorb about as much energy per unit mass as Ag (Fig. 1.2). Gd gives the largest value (1.33), since its L-absorption edges at 7.2–8.4 keV make it a strong absorber of the Cu K lines.



![Fig. 3.17. Dose enhancement factor of soft tissue containing 1 % by mass of Ag, I, Gd, Pt, Au or Bi for the 45 kV Cu-anode beam without added filter and with Al 1.0 mm and Sn 0.1 mm filters (SpekPy spectra, kerma approximation).](/home/user/atlant-impossible/dissertation/code/../figures/en/fig21_elements.png){width=15.5cm}





Table: Table 3.11. DEF of soft tissue containing 1 % (by mass) of different high-Z elements at 45 kV

| Filter | Ag | I | Gd | Pt | Au | Bi |
|:---|---:|---:|---:|---:|---:|---:|
| no added filter | 1.202 | 1.263 | 1.331 | 1.205 | 1.212 | 1.238 |
| Al 1.0 mm | 1.482 | 1.461 | 1.708 | 2.131 | 2.161 | 2.231 |
| Sn 0.1 mm | 1.444 | 1.440 | 1.716 | 2.155 | 2.189 | 2.276 |



With the Al 1.0 mm filter the picture changes completely: the DEF reaches 2.13 for Pt, 2.16 for Au, 2.23 for Bi and 1.71 for Gd, whereas Ag (1.48) and I (1.46) remain close to each other. As the ratios of the mass energy-absorption coefficients in Fig. 1.2 show, above their L-edges Pt, Au and Bi absorb more energy per unit mass than Ag over the whole filtered spectrum, including the 15–25 keV region where Ag absorbs only through its L and outer shells. Gd, whose K-edge (50.2 keV) lies above the maximum photon energy, absorbs more than Ag only below the Ag K-edge, but this region still contributes much of the tissue dose of the filtered beam. Iodine behaves like Ag, but its K-edge lies higher, at 33.2 keV. The Sn 0.1 mm filter slightly increases the DEF for Gd, Pt, Au and Bi but decreases it for Ag and I (1.44 for both), because it strongly attenuates the photons above 29.2 keV, where the Ag/tissue ratio reaches 100–139 and where the iodine K-edge lies. For the heavier elements, whose ratio varies much less across the filtered spectrum than that of Ag, the stronger suppression of low-energy photons by Sn, reflected in its larger HVL (0.90 versus 0.83 mm Al), outweighs this loss.

Per unit mass, therefore, Ag is a weaker physical sensitizer at 45 kV than Gd, Pt, Au and Bi and is comparable to iodine: with Al 1 mm its value of $\mathrm{DEF}-1$ (0.48) is less than half that of Au. The arguments in favour of Ag lie elsewhere. Its K-edge lies inside the 45 kV spectrum, which allows its enhancement to be tuned by filtration; silver nanoparticles (AgNPs) are biologically active and generate reactive oxygen species (ROS) [37]; and silver is considerably cheaper than gold or platinum. The choice of Ag must thus be justified by its combined physical and biological action, which is discussed in Section 3.11.

## 3.9. Monte Carlo verification

The analytical DEFs rest on two simplifications: only the primary beam is considered, and the energy of the Ag K-fluorescence photons, which is excluded from the mass energy-absorption coefficient of Ag, is assumed to escape. Both assumptions were tested with the Monte Carlo (MC) code described and verified in Section 2.7. A laterally infinite slab of ICRU-44 soft tissue 30 mm thick was irradiated by a broad parallel beam, and Ag was added to a mass fraction of 1 % in a 10 mm layer at depths of 2–12 mm. For each configuration, $4\times10^{6}$ photon histories in 5 independent batches were tracked with the Woodcock method, including photoelectric absorption with emission and transport of Ag K-fluorescence and Compton and Rayleigh scattering sampled from the xraylib differential cross-sections; the electron energy was deposited locally. The dose was scored in bins of 0.25 mm, and the DEF was obtained as the ratio of the dose profiles with and without Ag for the unfiltered and the Al 1.0 mm-filtered SpekPy spectra. The analytical reference is the primary-beam kerma model for the same geometry, in which the beam is attenuated by tissue and, inside and behind the layer, also by Ag.

The MC and analytical depth profiles of the DEF are compared in Fig. 3.18, and Table 3.12 gives their values averaged over characteristic regions. Both methods reproduce the same shape inside the layer. With Al 1 mm the DEF rises sharply at the entrance and then decreases towards the exit because of self-shielding. For the unfiltered beam a narrow peak at the entrance is followed by a minimum at about 3–4 mm and a subsequent rise, which in the analytical profile forms a broad maximum near 7–8 mm. Near the entrance the additional attenuation by Ag acts mainly on the soft components that still dominate the dose and lowers the DEF, whereas deeper in the layer, after these components have been absorbed, beam hardening raises it again. At the layer entrance the two methods agree within 1.2 % for the unfiltered beam (1.168 versus 1.155) and within 3.0 % for Al 1 mm (1.535 versus 1.490). The difference grows with depth to 6.5 % and 10.1 % at the layer exit, and the averages over the whole layer are 1.172 versus 1.116 and 1.447 versus 1.354, respectively, the MC values being higher in all regions.



![Fig. 3.18. Depth profiles of the dose enhancement factor in ICRU-44 soft tissue with a 10 mm layer containing 1 % Ag at 2–12 mm (grey band) for the unfiltered beam (left) and the Al 1.0 mm filter (right): Monte Carlo (solid line; the shaded band shows ±2 standard errors estimated from 5 batches) and the analytical primary-beam kerma model (dashed line).](/home/user/atlant-impossible/dissertation/code/../figures/en/fig22_mc.png){width=15.5cm}





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



Two effects explain this excess. First, part of the Ag K-fluorescence, with energies of about 22 keV, is reabsorbed within the layer: the mean free path of these photons in tissue, about 1.5 cm, is comparable to the layer thickness, and photons emitted at oblique angles travel long paths inside the laterally infinite layer. Part of the energy that the kerma approximation treats as escaping is therefore deposited in the layer. Second, scattered photons, which the primary-beam model ignores, contribute to the dose. Both contributions build up with depth, which explains why the difference grows towards the exit; fluorescence emitted backwards from the layer also raises the MC DEF slightly above unity in front of it for the filtered beam. Behind the layer the dose is reduced to 0.80 of the Ag-free value according to MC and to 0.76 according to the analytical model, because the layer shields the downstream tissue. This shielding protects normal tissue behind a loaded tumour, but it also lowers the dose in tumour regions behind a heavily loaded region. The analytical model thus underestimates the macroscopic DEF in a thick loaded region by up to 10 % and is in this respect conservative, whereas near the layer entrance the agreement is within 1–3 %.

## 3.10. Uncertainty and sensitivity analysis

The central result, DEF = 1.482 for 1 % Ag with the Al 1.0 mm filter, was tested by a one-at-a-time sensitivity analysis (Fig. 3.19, Table 3.13). Each parameter was varied within its plausible uncertainty while the others were kept fixed. The tube voltage was varied by ±1 kV, the anode angle by ±3°, the Be window by ±0.1 mm and the Al filter thickness by ±5 %. The mass energy-absorption coefficient of Ag was varied by ±2 %, and that of tissue by ±1 % consistently in the loaded and in the reference medium, so that it acts only through $\langle R\rangle$ in equation (2.24). The spectrum model was represented by the DM–SpekPy difference, and the depth factor $\eta$ of the DM was varied by ±25 %, with the changes evaluated relative to the DM value of 1.464.



![Fig. 3.19. Sensitivity of the dose enhancement factor (1 % Ag, Al 1.0 mm filter, DEF = 1.482) to the input parameters: change of the DEF at the two limits of the variation of each parameter. For the spectrum model the bar shows the DM relative to SpekPy, for the reference medium the bars show the ICRU four-component tissue (larger change) and water, and for η the changes are taken relative to the DM value of 1.464.](/home/user/atlant-impossible/dissertation/code/../figures/en/fig23_sensitivity.png){width=15.5cm}





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



The largest change, 0.057, results from the choice of the reference medium: the ICRU four-component tissue gives 1.539 and water 1.496. Both lack the trace elements Na, P, S, Cl and K, whose strong photoabsorption raises the energy absorption of ICRU-44 tissue; a less absorbing reference medium increases $\langle R\rangle$ and hence the DEF. This choice is a matter of definition, not of uncertainty, and was excluded from the combined uncertainty, but the reference medium must always be stated. Among the other parameters the spectrum model dominates (0.018); the coefficient of Ag, the anode angle and the tube voltage contribute 0.009–0.010 each, the Al thickness and $\eta$ contribute 0.008 and 0.007, and the coefficient of tissue 0.005. A smaller anode angle increases the DEF (1.492 at 9° and 1.476 at 15°) through stronger self-filtration in the anode, whereas the Be window is irrelevant (0.0002), because the Al filter removes the soft photons that the window would attenuate. Treating each maximum change as the half-width of a rectangular distribution and the parameters as uncorrelated, the combined standard uncertainty is

$$u_c(\mathrm{DEF}) = \sqrt{\sum_{i=1}^{n} \frac{\Delta_i^{2}}{3}}$$

EQNUM[3.4]


where $\Delta_i$ is the maximum absolute change of the DEF caused by varying the $i$-th parameter and $n = 8$ is the number of parameters included (all except the reference medium). This gives $u_c = 0.016$, i.e. DEF = 1.48 ± 0.02 with the coverage factor $k = 1$, or ± 0.03 with $k = 2$. The uncertainty is more than an order of magnitude smaller than the enhancement itself ($\mathrm{DEF}-1 = 0.48$) and than the differences between the main filter options, so the conclusions about filtration are robust. Incorrect interaction data would matter far more: the xraylib 4.3.0 function CS_Energy would give 1.72 instead of 1.48 (Section 2.8).

## 3.11. Discussion

The results are consistent with earlier work on dose enhancement by high-Z agents. Dose enhancement in iodine-loaded tumours irradiated with kilovoltage x-rays was calculated already in early studies [19, 20], and MC estimates for gold nanoparticles (AuNPs) showed that the macroscopic enhancement is much larger for kilovoltage than for megavoltage beams [10]. The theoretical enhancement from nanoparticles of various elements has been characterised versus photon energy with a kerma-based approach like the present one [13]. The depth dependence of the enhancement in orthovoltage beams has also been studied by MC calculations in phantoms [42], and the present results (Section 3.7) show for Ag that a single surface value cannot characterise a thick target. The present work adds the case of a low-voltage Cu-anode tube, whose spectrum is dominated by characteristic lines below the Ag K-edge and for which the attainable DEF is determined by filtration rather than by the design of the tube.

MC studies of silver include the dose enhancement from AgNPs implanted in a brain tumour during brachytherapy [38], the effect of tumour dose enhancement by AgNPs on the surrounding healthy tissues [39] and a comparison of Ag and Au nanoparticles in layered skin geometries [40]. The present calculations do not reproduce the conditions of these studies, so only qualitative points of contact are noted. The dose reduction to about 0.80 behind a 10 mm layer with 1 % Ag is relevant to the healthy-tissue doses addressed in [39], and the DEFs of Au and Ag per unit mass at 45 kV (2.16 versus 1.48 with Al 1 mm) are relevant to the Ag–Au comparison in [40]. Dose enhancement in AgNP-enriched dose gels has also been investigated experimentally [41]; such measurements could test the calculated DEF if the beam spectrum is specified.

A more significant discrepancy appears in comparison with radiobiological studies. AgNPs have been reported to sensitize cancer cells to killing by ionising radiation [32] and to act as radiation sensitizers for glioma [11], and they outperformed AuNPs in radiosensitizing U251 glioma cells in vitro and in an intracranial mouse model [12]. The biological effect is quantified by the sensitizer enhancement ratio (SER), the ratio of doses giving the same effect without and with the sensitizer; unlike the DEF, it reflects all mechanisms of sensitization [3]. For the beams considered here, macroscopic physics predicts the opposite ranking of Ag and Au at equal mass fraction, and at low mass fractions the physical enhancement is small: with Al 1 mm the DEF is only 1.048 for 0.1 % Ag. A direct numerical comparison is not possible, because the biological effect also depends on the radiation quality, the concentration and the cellular localisation of the nanoparticles; nevertheless, the physical results suggest that the reported radiosensitization by AgNPs, in particular their advantage over AuNPs, is unlikely to be explained by macroscopic dose enhancement alone. Two mechanisms described in the literature may account for the difference. First, AgNPs are biologically active and cause ROS formation, DNA damage, cell-cycle arrest and impaired mitochondrial function in human cells [37]. Second, the dose enhancement around gold nanoparticles is highly localised [30], and nanoscale energy deposition near heavy-atom nanoparticles can explain biological effects beyond the macroscopic dose enhancement [31]. The macroscopic DEF calculated here is thus only the physical baseline of a radio-enhancement that also has chemical and biological stages [7].

The results are subject to several limitations. The DEF was calculated in the kerma approximation, which is appropriate at the macroscopic scale but ignores the nanoscale dose heterogeneity around nanoparticles, and Ag was assumed to be distributed homogeneously, whereas the radiosensitization by nanoparticles depends on their size, concentration and location [97]. The DM assumes isotropic bremsstrahlung emission and neglects electron backscattering from the anode; the latter, together with the approximate Born cross-section, leads to an overestimated absolute output (DM/SpekPy air-kerma ratio 1.08–1.42) but does not affect the DEF. The DM also underestimates the Cu K lines by 25–43 %, which is why the main DEF results were obtained with SpekPy spectra. The off-axis variation of the spectrum caused by the heel effect was not modelled. The analytical depth calculations neglect scattered radiation and fluorescence reabsorption, which leads to an underestimate of the DEF in a thick loaded layer by up to 10 %, and the MC model uses a simple slab geometry. Finally, no spectrum of an actual tube was measured, although SpekPy, used as the reference, has been validated against measured spectra and HVLs [51], and no biological response was modelled.

The results lead to the following recommendations for an experiment with a 45 kV Cu-anode tube. The beam should be filtered with 1–2 mm of Al (or 0.1–0.3 mm of Ti); with Al this gives DEF 1.48–1.62 for 1 % Ag and exposure times for 2 Gy of 14.6–32.5 s at 10 cm and 40 mA. Thin Cu filters (0.05–0.1 mm) and K-edge filters with edges between 20 and 30 keV (Mo, Ag, Sn) should be avoided, and 0.2 mm Cu, although it gives the largest DEF (1.80), requires 158 s for 2 Gy. The beam quality should be verified by an HVL measurement according to the kilovoltage dosimetry protocol [14]; agreement with the calculated first HVL (0.83 mm Al with 1 mm Al, 1.27 mm Al with 2 mm Al) indicates that the spectrum and the filter thickness are as assumed. The Ag mass fraction should be at least 0.5 %, for which the DEF with 1 mm Al is 1.24, since at 0.1 % the enhancement is below 5 %. For samples thicker than a few millimetres the DEF should be calculated for the actual depth and loading, and NIST mass energy-absorption coefficients should be used rather than the xraylib function CS_Energy. Finally, the DEF should always be reported with the spectrum, or at least the tube voltage, filtration and HVL, and with the reference medium and depth.

## 3.12. Conclusions to Chapter 3

The main results of this chapter are as follows.

1. The DM (one fitted parameter, $\eta = 0.40$) agrees with SpekPy for Al-filtered beams within −4.6 to −3.5 % in HVL and 1–2 % in DEF but underestimates the Cu K lines by 25–43 %.
2. The unfiltered 45 kV spectrum is dominated by the Cu K lines (68.5 % of the photons), and the DEF for 1 % Ag is only 1.20; the tube design parameters change mainly the output, not the DEF (1.19–1.21).
3. Filtration is decisive: the DEF for 1 % Ag is 1.48 with Al 1 mm, 1.62 with Al 2 mm and 1.80 with Cu 0.2 mm, at a 120–1300-fold lower dose rate; at equal transmission Al and Ti are optimal and K-edge filters at 20–30 keV unfavourable.
4. With Al 1 mm, the DEF rises with the depth of a loaded region in Ag-free tissue (to 1.69 at 20 mm) but falls inside a uniformly loaded region through self-shielding (to 1.21 at 10 mm for 1 % Ag).
5. The DEF increases with tube voltage, most steeply once photons above the Ag K-edge appear (above about 27 kV); per unit mass, Ag is a weaker physical sensitizer than Gd, Pt, Au and Bi and comparable to iodine.
6. MC confirms the analytical model within 1–10 % (MC higher owing to fluorescence reabsorption and scatter) and shows a dose reduction to about 0.80 behind the loaded layer.
7. The DEF for 1 % Ag with Al 1 mm is 1.48 ± 0.02 ($k = 1$); the reference medium changes it by up to 0.057 and must be stated.


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
114. Llovet X., Powell C.J., Salvat F., Jablonski A. Cross Sections for Inner-Shell Ionization by Electron Impact // Journal of Physical and Chemical Reference Data. – 2014. – Vol. 43, No. 1. – Art. 013102. – DOI: 10.1063/1.4832851.
:::

::: {custom-style="Reference"}
115. Bote D., Salvat F. Calculations of inner-shell ionization by electron impact with the distorted-wave and plane-wave Born approximations // Physical Review A. – 2008. – Vol. 77, No. 4. – Art. 042701. – DOI: 10.1103/physreva.77.042701.
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

The developed model (DM) is implemented in the Python module `xspec.py`, which uses NumPy, xraylib and the module `nist.py`. The fragments below are copied from it without changes, including the comments; the code between them is omitted. Energies are given in keV, lengths in cm, densities in g/cm$^3$ and cross-sections in cm$^2$.

The first fragment defines constants and material data. The constant `PI_E4` is the product $\pi e^4$ in cm$^2$ keV$^2$ (Gaussian units), `ELECTRONS_PER_MAS` is the number of electrons per milliampere-second, $10^{-3}/e$, and `I_EXC` contains the mean excitation energies of ICRU Report 37 [68], including $I = 322$ eV for copper.

```python
RE = 2.8179403262e-13          # classical electron radius, cm
ALPHA = 1.0 / 137.035999084     # fine-structure constant
MEC2 = 510.99895                # electron rest energy, keV
NA = 6.02214076e23              # Avogadro constant, 1/mol
PI_E4 = 6.5141e-20              # pi*e^4 in cm^2 keV^2
ELECTRONS_PER_MAS = 1e-3 / 1.602176634e-19
KEV_TO_J = 1.602176634e-16

# mean excitation energies (ICRU Report 37), eV
I_EXC = {4: 63.7, 13: 166.0, 29: 322.0, 42: 424.0, 45: 449.0, 47: 470.0, 74: 727.0, 79: 790.0}
DENSITY = {4: 1.848, 13: 2.699, 28: 8.902, 29: 8.96, 42: 10.22, 45: 12.41, 47: 10.5,
           50: 7.31, 74: 19.3, 79: 19.32, 40: 6.506}
```

The functions `beta2` and `momentum` return $\beta^2$ and the momentum $pc$ of an electron with kinetic energy $T$. The function `stopping_power` evaluates the Bethe collision stopping power in the form of ICRU Report 37 ((2.1) and (2.2)) without the density-effect correction. The coefficient $0.5 \times 0.307075$ MeV cm$^2$/mol equals $2\pi N_A r_e^2 m_e c^2$, and the result is the linear stopping power in keV/cm.

```python
def beta2(T):
    g = 1.0 + np.asarray(T, float) / MEC2
    return 1.0 - 1.0 / g ** 2


def momentum(T):
    """electron momentum p*c in keV"""
    T = np.asarray(T, float)
    return np.sqrt(np.clip(T * (T + 2 * MEC2), 0, None))


def stopping_power(T, Z, A=None, I_eV=None, rho=None):
    """Bethe collision stopping power for electrons, linear (keV/cm)."""
    A = A if A is not None else xr.AtomicWeight(Z)
    I_eV = I_eV if I_eV is not None else I_EXC.get(Z, 10.0 * Z)
    rho = rho if rho is not None else DENSITY.get(Z, xr.ElementDensity(Z))
    T = np.asarray(T, float)
    tau = T / MEC2
    b2 = beta2(T)
    F = 1 - b2 + (tau ** 2 / 8 - (2 * tau + 1) * np.log(2)) / (tau + 1) ** 2
    Ired = I_eV / 1e3 / MEC2
    arg = tau ** 2 * (tau + 2) / (2 * Ired ** 2)
    s_mass = 0.5 * 0.307075 * (Z / A) / b2 * (np.log(arg) + F)   # MeV cm2/g
    s_mass = np.clip(s_mass, 1e-6, None)
    return s_mass * 1e3 * rho
```

The function `brems_dcs` returns the bremsstrahlung cross-section per atom, differential in the photon energy (variable `k`). It gives either Kramers' cross-section (2.5) or, by default, the non-relativistic Bethe–Heitler cross-section (2.6) multiplied by the Elwert factor (2.7), in which `eta0` and `eta1` are $2\pi Z\alpha/\beta_0$ and $2\pi Z\alpha/\beta$ for the incident and outgoing electron. The function `sigma_K_gryzinski` implements the Gryziński K-shell ionisation cross-section (2.9) with two K-shell electrons and the overvoltage $U = T/E_K$.

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

The class `TubeModel` stores the tube voltage, anode atomic number, anode angle and electron depth factor and uses photon bins of 0.05 keV and an electron energy step of 0.02 keV. The default `eta=1.0` corresponds to straight-line electron paths; apart from the fit and the sensitivity test (±25 %), all calculations use the fitted $\eta = 0.40$ passed by `run_all.py`. The method `_compute` integrates $1/S$ by the trapezoidal rule to obtain the path length in the continuous-slowing-down approximation (2.3) and the projected depth (2.4). It then evaluates the thick-target bremsstrahlung integral (2.8) with self-absorption along the exit path $d/\sin\theta$, and the division by $4\pi$ assumes isotropic emission. Without the attenuation and the factor $1/4\pi$, the same sum (`brems_generated`) gives the generated spectrum $N_g(E)$. The method `_characteristic` calculates the Cu K$\alpha_2$, K$\alpha_1$, K$\beta_3$ and K$\beta_1$ lines with the fluorescence yield of xraylib [60] and its radiative rates normalised over the four lines. The direct contribution (2.10) weights each K-shell ionisation by the escape probability of the line photon, and the indirect contribution is the closed-form expression (2.14), in which `tauK` is the linear K-shell photoabsorption coefficient $\tau_K$ and `b` is $b_j = \mu_j/\sin\theta$.

```python
class TubeModel:
    """Thick-target spectrum model for a reflection x-ray tube."""

    def __init__(self, kvp=45.0, Z=29, theta=12.0, eta=1.0, model='BH-E',
                 dE=0.05, Emin=1.0, dT=0.02, include_char=True, include_indirect=True):
        self.kvp, self.Z, self.theta, self.eta = kvp, Z, theta, eta
        self.model, self.dE, self.Emin, self.dT = model, dE, Emin, dT
        self.include_char, self.include_indirect = include_char, include_indirect
        self.A = xr.AtomicWeight(Z)
        self.rho = DENSITY[Z]
        self.na = self.rho * NA / self.A                        # atoms/cm3
        self.E = np.arange(Emin + dE / 2, kvp, dE)               # bin centres
        self.lines = []                                         # (energy, photons/sr/electron)
        self._compute()

    # --------------------------------------------------------------
    def _compute(self):
        Z, T0 = self.Z, self.kvp
        th = np.radians(self.theta)
        # electron energy grid (from T0 down to Emin) and CSDA depth
        T = np.arange(self.Emin, T0 + self.dT / 2, self.dT)
        S = stopping_power(T, Z)
        # path length from T0 to T: s(T) = int_T^T0 dT'/S
        inv = 1.0 / S
        cum = np.concatenate([[0], np.cumsum(0.5 * (inv[1:] + inv[:-1]) * np.diff(T))])
        s = cum[-1] - cum                         # path length to reach energy T
        depth = self.eta * s * np.cos(th)         # electron incidence angle = theta
        self.T, self.S, self.s, self.depth = T, S, s, depth
        self.csda_range = s[0]
        mu_E = mu_lin(Z, self.E)
        self.mu_anode = mu_E
        # generated bremsstrahlung per electron per keV into 4*pi (no absorption)
        TT, KK = np.meshgrid(T, self.E)          # shape (nE, nT)
        dcs = brems_dcs(TT, KK, Z, self.model)
        w = self.na * dcs / S[None, :]           # photons/keV per keV of slowing
        att = np.exp(-mu_E[:, None] * depth[None, :] / np.sin(th))
        trap = np.full(T.shape, self.dT)
        trap[0] = trap[-1] = self.dT / 2
        self.brems_generated = (w * trap[None, :]).sum(axis=1)                  # 1/(keV e-)
        self.brems = (w * att * trap[None, :]).sum(axis=1) / (4 * np.pi)       # 1/(keV sr e-)
        self.lines = []
        if self.include_char and T0 > xr.EdgeEnergy(Z, xr.K_SHELL):
            self._characteristic(T, S, depth, th, trap)

    def _characteristic(self, T, S, depth, th, trap):
        Z = self.Z
        EK = xr.EdgeEnergy(Z, xr.K_SHELL)
        omega = xr.FluorYield(Z, xr.K_SHELL)
        sigK = sigma_K_gryzinski(T, EK)
        lines = [(xr.KL2_LINE, 'Ka2'), (xr.KL3_LINE, 'Ka1'),
                 (xr.KM2_LINE, 'Kb3'), (xr.KM3_LINE, 'Kb1')]
        # radiative rates
        rates = {}
        for code, name in lines:
            try:
                rates[name] = (xr.LineEnergy(Z, code), xr.RadRate(Z, code))
            except ValueError:
                pass
        tot = sum(r for _, r in rates.values())
        # direct
        nK_direct = self.na * sigK / S                 # ionisations per keV slowing
        self.k_ionisations = (nK_direct * trap).sum()  # K ionisations per electron
        # indirect: generated bremsstrahlung above edge, surface-source approx.
        above = self.E > EK
        tauK = np.zeros_like(self.E)
        tauK[above] = self.rho * np.array([xr.CS_Photo_Partial(Z, xr.K_SHELL, float(e))
                                           for e in self.E[above]])
        self.line_data = []
        for name, (EL, r) in rates.items():
            p = r / tot
            muL = mu_lin(Z, [EL])[0]
            att = np.exp(-muL * depth / np.sin(th))
            direct = omega * p * (nK_direct * att * trap).sum() / (4 * np.pi)
            indirect = 0.0
            if self.include_indirect:
                b = muL / np.sin(th)
                Nk = self.brems_generated * self.dE
                indirect = (Nk * (tauK / 2) * np.log1p(b / self.mu_anode) / b).sum() * omega * p / (4 * np.pi)
            self.lines.append((EL, direct + indirect))
            self.line_data.append(dict(name=name, energy=EL, rel_rate=p,
                                       direct=direct, indirect=indirect))
```

The method `spectrum` adds the lines to the energy bins, applies the transmission of the Be window, filters and air (2.15) and converts the yield per electron and steradian into the photon fluence per keV per cm$^2$ for a given exposure with the inverse-square law (2.16). The function `air_kerma` evaluates the air kerma (2.17) with the NIST coefficients of dry air; the factor `KEV_TO_J * 1e3` converts keV/g into Gy. The functions `hvl`, `mean_energy` and `effective_energy` (not reproduced) calculate the half-value layer by bisection of the air-kerma transmission through aluminium, the mean energy and the effective energy.

```python
    def spectrum(self, filters=(), air_cm=0.0, dist_cm=100.0, mas=1.0, binned=True):
        """photon fluence per keV per cm^2 at distance dist_cm for the given
        exposure (mAs), after the listed filters [(Z_or_name, thickness_cm), ...]."""
        E = self.E
        phi = self.brems.copy()
        if binned:
            for EL, n in self.lines:
                i = int((EL - self.Emin) // self.dE)
                if 0 <= i < len(E):
                    phi[i] += n / self.dE
        T = transmission(E, filters, air_cm)
        return E, phi * T * ELECTRONS_PER_MAS * mas / dist_cm ** 2


def transmission(E, filters=(), air_cm=0.0):
    T = np.ones_like(E)
    for m, t in filters:
        T *= np.exp(-mu_lin(m, E) * t)
    if air_cm > 0:
        T *= np.exp(-mu_lin(AIR, E) * air_cm)
    return T
```

```python
def air_kerma(E, phi, dE=None):
    """air kerma (Gy) for fluence spectrum phi (1/keV/cm2) on grid E"""
    dE = dE if dE is not None else np.gradient(E)
    return (phi * E * mass_coeff(AIR, E, 'muen') * dE).sum() * KEV_TO_J * 1e3
```

The function `def_factor` calculates the dose enhancement factor (DEF) in the kerma approximation (2.23) with the mixture rule (2.22) and the NIST mass energy-absorption coefficients. The energy fluence `psi` is attenuated by the overlying tissue (2.26). With `attenuate_with_agent=True`, the numerator is attenuated by the silver-loaded mixture, which describes a uniformly loaded region extending from the surface (2.27); the density of the mixture is approximated by that of tissue.

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

The main numerical results and all tables and figures are produced by the scripts in `dissertation/code` from the data in `dissertation/data`; the auxiliary checks of Chapter 2 (comparison with ESTAR, test of the xraylib function CS_Energy, Monte Carlo tests) are not part of them. The calculations were performed with Python 3.13, NumPy 2.5.3 [65], SciPy 1.18.1 [66], Matplotlib 3.11.2 [67], xraylib 4.3.0 [60] and SpekPy 2.5.4 [15, 58]. The NIST tables of the mass attenuation and mass energy-absorption coefficients [59] for 31 elements, dry air, water and ICRU-44 soft tissue [61] are stored as HTML pages in `data/nist`. The module `nist.py` interpolates them log-log within each segment between absorption edges and calculates the coefficients of tissue, water and air from the elemental tables by the mixture rule; the compound tables are kept only for verification. The SpekPy spectra use the same energy bin as the DM (0.05 keV for copper).

The script `run_all.py` first fits $\eta$ in the interval 0.25–0.7 by bounded minimisation of the root-mean-square deviation between the normalised DM and SpekPy bremsstrahlung spectra above 3 keV. It then calculates the electron and Cu line data, the validation against SpekPy (eight combinations of tube voltage and anode angle with and without 1 mm Al, and a tungsten anode at 50–100 kV) and the baseline spectrum. It also calculates the effects of the anode angle, tube voltage, Be window and 13 added filters, the DEF for 0.1–2 % Ag and its dependence on depth and tube voltage, the self-shielding, the comparison of six high-Z elements, the sensitivity analysis and the exposure times. The results are written to `data/results.json` and the spectra for the figures to CSV files. The script `run_sweeps.py` adds the DEF as a function of the filter thickness for seven materials and compares 43 filter materials from Al to Bi at air-kerma transmissions of 10 %, 1 % and 0.1 %.

The script `mc_dose.py` performs the Monte Carlo calculation with $4 \times 10^6$ photon histories per configuration (command-line argument), divided into five batches with fixed random seeds, and writes `data/mc_results.json`. The scripts `make_tables.py` and `figures.py` generate all tables and figures in English, Russian and Uzbek from these files. Because the analytical calculations contain no random elements and the Monte Carlo seeds are fixed, running the five scripts in the order given above reproduces all tables and figures for the stated software versions.


