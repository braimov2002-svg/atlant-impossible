# ANNOTATSIYA

::: {custom-style="Annotation"}
Saratonga qarshi nur terapiyasining samaradorligi hanuzgacha sog‘lom to‘qimalarning chidamliligi bilan cheklanib qolmoqda, masofaviy nur terapiyasida beriladigan dozani optimallashtirish strategiyalaridan biri esa radiosensibilizatorlardan foydalanishdir. Ushbu ishda kilovoltli rentgen nurlari bilan nurlantirilgan biologik muhitda kumushning (Ag) radiokuchaytirish effekti tadqiq qilinadi va u dozani kuchaytirish koeffitsiyenti (DEF) orqali miqdoriy baholanadi. DEFni hisoblash uchun zarur bo‘lgan 45 kV li mis anodli rentgen trubkasining spektri trubka konstruksiyasi, texnik parametrlari va filtrlariga bog‘liq holda modellashtiriladi. Shu maqsadda bitta moslashtirilgan parametrga ega bo‘lgan qalin nishon uchun yarim analitik model — ishlab chiqilgan model (IM) yaratildi va SpekPy v2 bilan solishtirish orqali validatsiya qilindi. DEF kerma yaqinlashuvida NIST massaviy energiya yutilish koeffitsiyentlari yordamida hisoblandi va fotonlar ko‘chishini Monte-Karlo usulida modellashtirish orqali verifikatsiya qilindi.

1 mm Al bilan filtrlangan dastalar uchun IM SpekPy yordamida hisoblangan yarim susaytirish qatlamini 5 % dan oshmaydigan farq bilan, Al filtrlar bilan esa DEFni 2 % dan oshmaydigan farq bilan takrorlaydi. Filtrlanmagan spektrda 8,0–8,9 keV dagi Cu K chiziqlari ustunlik qiladi (fotonlarning 68,5 % qismi), shu sababli massa bo‘yicha 1 % Ag uchun DEF atigi 1,20 ga teng bo‘lib, anod burchagi, trubka kuchlanishi yoki berilliy oyna o‘zgartirilganda 1,19–1,21 oralig‘ida qoladi. Qo‘shimcha filtrlash hal qiluvchi parametr hisoblanadi: 1 mm Al DEFni 1,48 ± 0,02 (k = 1) gacha, 2 mm Al 1,62 gacha, 0,2 mm Cu esa 1,80 gacha oshiradi, bunda havodagi kerma 120–1300 marta kamayadi. O‘tkazish koeffitsiyenti bir xil bo‘lganda yengil va o‘rtacha Z li filtrlar (Al, Ti) optimal hisoblanadi, K-chegaralari 20–30 keV da joylashgan filtrlar (Mo, Ag, Sn) esa kuchli filtrlashda eng kam samarali bo‘ladi. DEF chuqurlik ortishi bilan ortadi (dastaning qattiqlashishi) va Ag ko‘p kiritilgan soha ichida kamayadi (o‘z-o‘zini ekranlash); Monte-Karlo hisoblari bu qiymatlarni 1–10 % doirasida tasdiqlaydi. Massa birligiga nisbatan olinganda Ag Au, Pt, Bi yoki Gdga qaraganda kuchsizroq fizik sensibilizator bo‘lib, yod bilan taqqoslanarli. Yengil elementlar uchun xraylib 4.3.0 kutubxonasidagi energiya yutilish ma’lumotlarining 56 % gacha past baholanganligi aniqlandi, bu esa DEFning oshirib baholanishiga olib kelgan bo‘lar edi. Olingan natijalar Ag saqlovchi radiosensibilizatorlar bilan o‘tkaziladigan tajribalar uchun filtrlash va ekspozitsiya sharoitlarini tanlashga asos bo‘ladi.

**Kalit so‘zlar:** rentgen trubkasi spektri; mis anod; tormozlanish nurlanishi; xarakteristik nurlanish; filtrlash; kumush; radiosensibilizatsiya; dozani kuchaytirish koeffitsiyenti; kilovoltli rentgen nurlari; Monte-Karlo usuli.
:::

# АННОТАЦИЯ

::: {custom-style="Annotation"}
Эффективность противоопухолевой лучевой терапии по-прежнему ограничена толерантностью здоровых тканей, и одной из стратегий оптимизации дозы, подводимой при дистанционной лучевой терапии, является применение радиосенсибилизаторов. В работе исследуется эффект радиоусиления, обусловленный серебром (Ag), в биологической среде, облучаемой киловольтным рентгеновским излучением, и проводится его количественная оценка с помощью коэффициента усиления дозы (DEF). Необходимый для расчёта DEF спектр рентгеновской трубки с медным анодом, работающей при напряжении 45 кВ, моделируется в зависимости от конструкции трубки, её технических параметров и фильтров. С этой целью создана полуаналитическая модель толстой мишени с одним подгоночным параметром — разработанная модель (РМ) — и выполнена её валидация путём сравнения со SpekPy v2. DEF рассчитан в приближении кермы с использованием массовых коэффициентов поглощения энергии NIST и верифицирован моделированием переноса фотонов методом Монте-Карло.

Для пучков, отфильтрованных 1 мм Al, РМ воспроизводит слой половинного ослабления, рассчитанный SpekPy, с точностью до 5 %, а для пучков с алюминиевыми фильтрами — DEF с точностью до 2 %. В нефильтрованном спектре преобладают K-линии Cu с энергиями 8,0–8,9 кэВ (68,5 % фотонов), поэтому DEF при массовой доле Ag 1 % составляет лишь 1,20 и остаётся в пределах 1,19–1,21 при изменении угла анода, напряжения на трубке или бериллиевого окна. Решающим параметром является дополнительная фильтрация: фильтр 1 мм Al повышает DEF до 1,48 ± 0,02 (k = 1), 2 мм Al — до 1,62 и 0,2 мм Cu — до 1,80, при этом воздушная керма уменьшается в 120–1300 раз. При одинаковом пропускании оптимальны фильтры из лёгких элементов и элементов со средним Z (Al, Ti), тогда как фильтры с K-краями в области 20–30 кэВ (Mo, Ag, Sn) при сильной фильтрации наименее эффективны. DEF возрастает с глубиной (ужесточение пучка) и уменьшается внутри области с высоким содержанием серебра (самоэкранирование); расчёты методом Монте-Карло подтверждают эти значения в пределах 1–10 %. В расчёте на единицу массы Ag является более слабым физическим сенсибилизатором, чем Au, Pt, Bi или Gd, и сопоставимо с йодом. Установлено, что данные xraylib 4.3.0 о поглощении энергии для лёгких элементов занижены на величину до 56 %, что привело бы к завышению DEF. Полученные результаты служат обоснованием выбора фильтрации и условий облучения в экспериментах с серебросодержащими радиосенсибилизаторами.

**Ключевые слова:** спектр рентгеновской трубки; медный анод; тормозное излучение; характеристическое излучение; фильтрация; серебро; радиосенсибилизация; коэффициент усиления дозы; киловольтное рентгеновское излучение; метод Монте-Карло.
:::

# ANNOTATION

::: {custom-style="Annotation"}
The effectiveness of anticancer radiotherapy is still limited by the tolerance of healthy tissues, and one strategy to optimise the dose delivered in external radiotherapy is the use of radiosensitizers. This work studies the radio-enhancement effect of silver (Ag) in biological matter irradiated with kilovoltage x-rays and quantifies it by the dose enhancement factor (DEF). The spectrum of a 45 kV copper-anode x-ray tube needed for the DEF calculations is modelled as a function of the tube design, technical parameters and filters. To this end, a semi-analytical thick-target model with one fitted parameter, the developed model (DM), was created and validated against SpekPy v2. The DEF was calculated in the kerma approximation with NIST mass energy-absorption coefficients and verified by Monte Carlo photon transport.

For beams filtered with 1 mm Al, the DM reproduces the SpekPy half-value layer within 5 %, and with Al filters the DEF within 2 %. The unfiltered spectrum is dominated by the Cu K lines at 8.0–8.9 keV (68.5 % of the photons), so the DEF for 1 % Ag by mass is only 1.20 and remains within 1.19–1.21 when the anode angle, tube voltage or beryllium window is changed. Added filtration is the decisive parameter: 1 mm Al raises the DEF to 1.48 ± 0.02 (k = 1), 2 mm Al to 1.62 and 0.2 mm Cu to 1.80, while the air kerma decreases 120–1300-fold. At equal transmission, light and medium-Z filters (Al, Ti) are optimal, whereas filters with K-edges at 20–30 keV (Mo, Ag, Sn) are the least effective at strong filtration. The DEF increases with depth (beam hardening) and decreases inside a heavily loaded region (self-shielding); Monte Carlo calculations confirm these values within 1–10 %. Per unit mass, Ag is a weaker physical sensitizer than Au, Pt, Bi or Gd and is comparable to iodine. The xraylib 4.3.0 energy-absorption data for light elements were found to be up to 56 % too low, which would overestimate the DEF. The results support the choice of filtration and exposure conditions for experiments with Ag-containing radiosensitizers.

**Keywords:** x-ray tube spectrum; copper anode; bremsstrahlung; characteristic radiation; filtration; silver; radiosensitization; dose enhancement factor; kilovoltage x-rays; Monte Carlo method.
:::

# QISQARTMALAR VA BELGILAR RO‘YXATI



| Qisqartma / belgi | Ma’nosi |
|:---|:---|
| AAPM | Amerika tibbiyot fiziklari assotsiatsiyasi |
| AgNZ | kumush nanozarrachasi |
| ALARA | oqilona erishish mumkin bo‘lgan darajada past |
| AuNZ | oltin nanozarrachasi |
| BH-E | Elvert ko‘paytuvchisi kiritilgan norelyativistik Bete–Gaytler tormozlanish nurlanishi kesimi |
| CSDA | uzluksiz sekinlashish yaqinlashuvi |
| DEF | dozani kuchaytirish koeffitsiyenti |
| DNK | dezoksiribonuklein kislota |
| IAEA | Atom energiyasi bo‘yicha xalqaro agentlik |
| ICRU | Radiatsion birliklar va o‘lchovlar bo‘yicha xalqaro komissiya |
| IEC | Xalqaro elektrotexnika komissiyasi |
| IM | ishlab chiqilgan model (ushbu ishdagi rentgen spektrining yarim analitik modeli) |
| KFSh | kislorodning faol shakllari |
| kVp | kilovolt-pik (rentgen trubkasining cho‘qqi kuchlanishi) |
| MK | Monte-Karlo (usuli) |
| NIST | Standartlar va texnologiyalar milliy instituti (AQSh) |
| RT | nur terapiyasi |
| SER | sensibilizatsiya koeffitsiyenti |
| TASMIP | interpolyatsion polinomlardan foydalanadigan volfram anodning spektral modeli |
| TBC | Tucker–Barnes–Chakraborty spektr modeli |
| YSQ | yarim susaytirish qatlami (YSQ1 va YSQ2 — birinchi va ikkinchi yarim susaytirish qatlamlari) |
| ZZM | zaryadli zarralar muvozanati |
| $D$ | yutilgan doza, Gr |
| $E$ | foton energiyasi, keV |
| $\bar{E}$ | spektrdagi fotonlarning o‘rtacha energiyasi, keV |
| $E_K$ | K-qobiqning bog‘lanish energiyasi (K yutilish chegarasining energiyasi), keV |
| $K$ | kerma (massa birligida ozod qilingan kinetik energiya), Gr; $K_{\mathrm{air}}$ — havodagi kerma |
| $R(E)$, $\langle R\rangle$ | $E$ energiyada kumushning $\mu_{en}/\rho$ qiymatining to‘qimanikiga nisbati; uning doza bilan tortilgan spektral o‘rtacha qiymati |
| K$\alpha$, K$\beta$ | K seriyasining xarakteristik chiziqlari (mos ravishda L-qobiqdan hamda M- va N-qobiqlardan K-qobiqqa o‘tishlar) |
| $S(T)$ | kinetik energiyasi $T$ bo‘lgan elektron uchun anod materialining ionizatsion tormozlanish qobiliyati; $S/\rho$ — massaviy ionizatsion tormozlanish qobiliyati, MeV sm^2^/g |
| $T$ | elektronning kinetik energiyasi, keV |
| $T_0$ | elektronlarning anoddagi boshlang‘ich kinetik energiyasi, $T_0 = eU$ (fotonlarning maksimal energiyasi), keV |
| $U$ | trubka kuchlanishi, kV |
| $w$ | to‘qimadagi kumushning (yoki boshqa yuqori Z li elementning) massa ulushi |
| $Z$ | atom raqami |
| $\eta$ | elektronlarning chuqurlik koeffitsiyenti, IMning yagona moslashtiriladigan parametri |
| $\theta$ | anod burchagi (anod sirti bilan dastaning markaziy nuri orasidagi burchak) |
| $\mu$ | chiziqli susayish koeffitsiyenti, sm^−1^ |
| $\mu/\rho$ | massaviy susayish koeffitsiyenti, sm^2^/g ($\rho$ — zichlik) |
| $\mu_{en}/\rho$ | massaviy energiya yutilish koeffitsiyenti, sm^2^/g |
| $\sigma_K$ | elektron zarbasi natijasida K-qobiq ionizatsiyasining kesimi, b |
| $\Phi(E)$ | fotonlarning spektral flyuensi (birlik energiya oralig‘iga to‘g‘ri keladigan fotonlar flyuensi) |
| $\Psi(E)$ | spektral energiya flyuensi, $\Psi(E) = E\,\Phi(E)$ |
| $\omega_K$ | K-qobiqning flyuoressensiya chiqishi |


# KIRISH

**Mavzuning dolzarbligi.** Saraton butun dunyoda kasallanish va o‘limning asosiy sabablaridan biri hisoblanadi [1], bemorlarning qariyb yarmida nur terapiyasi uchun ko‘rsatma mavjud [2], nur terapiyasining samaradorligi esa sog‘lom to‘qimalarning chidamliligi bilan cheklanadi [3, 4]. Terapevtik intervalni radiosensibilizatorlar [5], xususan, hozirgi vaqtda jadal o‘rganilayotgan og‘ir metallarning birikmalari va nanozarrachalari yordamida kengaytirish mumkin [6, 7]. Atom raqami $Z$ yuqori bo‘lgan elementlar fotoeffekt tufayli kilovoltli fotonlarni yumshoq to‘qimaga qaraganda ancha kuchli yutadi [8]. 250 kVp (kilovolt-pik) rentgen nurlari bilan birgalikda qo‘llanilgan oltin nanozarrachalari o‘smasi bor sichqonlarning yashash davomiyligini sezilarli darajada uzaytirgan [9], oltin tufayli dozaning kuchayishi esa kilovoltli dastalarda megavoltli dastalardagiga qaraganda ancha katta [10]. Kumush nanozarrachalari (AgNZ) glioma uchun radiosensibilizator sifatida taklif etilgan [11] va in vitro sharoitda hamda sichqonlarda oltin nanozarrachalaridan (AuNZ) ustun kelgan [12]; bundan tashqari, kumush arzonroq, uning 25,514 keV dagi K-chegarasi esa 45 kV li rentgen trubkasi spektri ichida joylashgan.

Fizik ta’sir dozani kuchaytirish koeffitsiyenti (DEF) bilan miqdoriy tavsiflanadi; u kumush saqlovchi va kumushsiz to‘qimadagi yutilgan dozalarning nisbatidir. Kumush va to‘qimaning massaviy energiya yutilish koeffitsiyentlari nisbati 8–25 keV da atigi 21–32 ni, Ag K-chegarasida taxminan 76 ni, 30–45 keV da esa 103–139 ni tashkil etadi, shu sababli DEF fotonlar energiya flyuensining chegaradan yuqorida joylashgan ulushiga bog‘liq bo‘ladi [10, 13]. Kilovoltli dastalarni odatda tavsiflaydigan trubka kuchlanishi va yarim susaytirish qatlami (YSQ) [14] chegara atrofidagi spektrni bir qiymatli aniqlamaydi, shuning uchun bu spektrni modellashtirish zarur [15]. Volfram anodli trubkalardan [16, 17] farqli ravishda, 45 kV li mis anodli trubka filtrlanmagan dasta fotonlarining asosiy qismini Ag K-chegarasidan ancha pastda joylashgan 8,0–8,9 keV dagi Cu K chiziqlarida chiqaradi. Bu spektr va, demak, DEF ham trubka konstruksiyasi va filtrlanishiga bog‘liq bo‘lgani sababli, spektrni modellashtirish tibbiy fizikaning dolzarb masalasi hisoblanadi.

**Muammoning o‘rganilganlik darajasi.** Yuqori Z li muhitlar yaqinida dozaning kuchayishi masalasi Spiersning nurlantirilgan suyak yaqinida energiya yutilishiga oid tahliliga borib taqaladi [18]; keyinchalik yod tufayli dozaning kuchayishi kilovoltli dastalar uchun hisoblangan [19, 20] va modifikatsiyalangan kompyuter tomografi yordamida bosh miya metastazlarini davolashda qo‘llanilgan [21]. Oltin nanozarrachalari hujayralarda va Monte-Karlo (MK) modellashtirish yordamida o‘rganilgan [22–25], ularning ta’sir mexanizmlari sharh maqolalarda umumlashtirilgan [26–28], elementlar esa turli foton energiyalarida taqqoslangan [13, 29]; nanozarrachalar atrofida dozaning kuchayishi yuqori darajada lokallashgan [30], bu esa dozaning makroskopik kuchayishi doirasidan chiqadigan biologik effektlarni tushuntirib bera oladi [31]. AgNZ yordamidagi radiosensibilizatsiya saraton hujayralarida [32], gliomada [33, 34], sut bezi saratoni hujayralarida [35] va kolorektal saratonda [36] ko‘rsatilgan. AgNZning o‘zi sitotoksik va genotoksik xususiyatga ega bo‘lib, kislorodning faol shakllari hosil bo‘lishini keltirib chiqaradi [37], shu sababli AgNZ ta’sirining bir qismi kimyoviy yoki biologik tabiatga ega bo‘lishi mumkin. Kumush dozimetriyasi MK usulida braxiterapiya uchun [38], kumush kiritilgan o‘sma atrofidagi to‘qimalar uchun [39] va teri uchun [40], shuningdek dozimetrik gellarda [41] o‘rganilgan; ortovoltli dastalarda doza kuchayishining chuqurlikka bog‘liqligi MK usulida fantomda tadqiq etilgan [42].

Spektr modellari empirik [43] va yarim empirik [44, 45] modellardan tortib fizikaga asoslangan deterministik [46–48] va MK modellarigacha [49, 50] bo‘lgan doirani qamrab oladi va asosan volfram anodlar uchun ishlab chiqilgan; o‘lchovlar bilan solishtirib validatsiya qilingan SpekPy [51] o‘zining 2-versiyasida mis anodni qo‘llab-quvvatlaydi [15]. Mis anodli trubkalar asosan rentgen-struktur tahlilida qo‘llaniladi, bunda nikel filtr Cu Kα chizig‘ini ajratib oladi [52], kumush uchun esa uning K-chegarasidan yuqori energiyali fotonlar zarur. Shu sababli bunday trubkaning konstruksiyasi va filtrlanishi uning spektrini hamda kumush kiritilgan to‘qimaning DEF qiymatini qanday belgilashi ko‘rib chiqilgan adabiyotlarda miqdoriy jihatdan baholanmagan.

**Tadqiqotning maqsadi.** Ishning maqsadi 45 kV li mis anodli rentgen trubkasi spektrini uning konstruktiv parametrlari va filtrlanishiga bog‘liq holda modellashtirish va shu tariqa kumush saqlovchi yumshoq to‘qimaning DEF qiymatini hamda maqbul doza quvvatida uni eng katta qiymatga yetkazadigan filtrlashni aniqlashdan iborat.

**Tadqiqotning vazifalari.** Quyidagi vazifalar hal qilindi:

1. Yuqori Z li elementlar, ayniqsa kumush yordamidagi radiosensibilizatsiya hamda spektrni modellashtirishga oid adabiyotlarni sharhlash.
2. Elektronlarning sekinlashishi, tormozlanish nurlanishi, bevosita hosil bo‘ladigan va tormozlanish nurlanishi ta’sirida hosil bo‘ladigan K nurlanish, anodda o‘z-o‘zini yutish va filtrlashni hisobga oluvchi mis anodli trubka spektrining qalin nishon uchun yarim analitik modelini ishlab chiqish.
3. Modelni SpekPy v2 bilan solishtirib validatsiya qilish va uning yagona parametrini moslashtirish.
4. Spektr va dasta sifatini anod burchagi, trubka kuchlanishi, berilliy oyna va filtrlarga bog‘liq holda hisoblash.
5. Massa bo‘yicha 0,1–2 % kumush uchun DEFni hisoblash va maqbul doza quvvatida uni eng katta qiymatga yetkazadigan filtrlarni topish.
6. DEFning chuqurlikka bog‘liqligini va o‘z-o‘zini ekranlashni mustaqil MK verifikatsiyasi bilan o‘rganish.
7. Kumushni boshqa yuqori Z li elementlar bilan taqqoslash, DEF noaniqligini baholash va tajribalar uchun tavsiyalar ishlab chiqish.

**Tadqiqotning obyekti.** Tadqiqot obyekti 45 kV li mis anodli trubkaning rentgen nurlanishi va uning kumush saqlovchi yumshoq to‘qima bilan o‘zaro ta’siridir.

**Tadqiqotning predmeti.** Tadqiqot predmeti spektr shakllanishi, uning trubka konstruksiyasi va filtrlanishiga bog‘liqligi hamda buning natijasida hosil bo‘ladigan DEF qiymatidir.

**Tadqiqot usullari.** Spektr ishlab chiqilgan model (IM) yordamida hisoblanadi; bu model Bete tormozlanish qobiliyatiga, Elvert ko‘paytuvchisi kiritilgan norelyativistik Bete–Gaytler kesimiga va Grizinskiy K-qobiq kesimiga asoslangan qalin nishon uchun yarim analitik modeldir [53–57], SpekPy v2.5.4 esa tayanch model vazifasini bajaradi [58]. O‘zaro ta’sir ma’lumotlari Standartlar va texnologiyalar milliy institutining (NIST) jadvallaridan [59] hamda xraylib kutubxonasidan [60] olinadi, tayanch muhit sifatida Radiatsion birliklar va o‘lchovlar bo‘yicha xalqaro komissiyaning (ICRU) ICRU-44 yumshoq to‘qimasi qabul qilingan [61]. DEF kerma yaqinlashuvida hisoblanadi [62] va ushbu ish uchun yozilgan fotonlar ko‘chishining MK dasturi yordamida verifikatsiya qilinadi; bu dastur Vudkok usulidan (delta-treking) foydalanadi [63], Ag K flyuoressensiyasini, kogerent va nokogerent sochilishni [64] hamda elektronlar energiyasining mahalliy yutilishini hisobga oladi. Noaniqliklar sezgirlik tahlili yordamida baholanadi; dasturda Python tili hamda NumPy, SciPy va Matplotlib kutubxonalaridan foydalanilgan [65–67].

**Tadqiqotning ilmiy yangiligi.** Ilmiy yangilik quyidagilardan iborat:

1. Qaytaruvchi nishonli mis anodli trubka spektrining yarim analitik modeli ishlab chiqildi; unda bitta moslashtiriladigan parametr (elektronlarning chuqurlik koeffitsiyenti $\eta$) qo‘llaniladi, tormozlanish nurlanishi ta’sirida hosil bo‘ladigan K nurlanish esa yopiq ko‘rinishda tavsiflanadi. $\eta = 0{,}40$ qiymatida (SpekPy v2 tormozlanish nurlanishi spektrining shakliga moslashtirilgan, o‘rtacha kvadratik chetlanish 2,46 %) IM qayta moslashtirishsiz 25–50 kV kuchlanishlar va 6–30° anod burchaklarida 1 mm Al uchun SpekPy YSQ qiymatini −3,5 dan −4,6 % gacha bo‘lgan chetlanishlar bilan, o‘rtacha energiyani esa 0,54 keV dan oshmaydigan farq bilan takrorlaydi.
2. Qo‘shimcha filtrlash bo‘lmaganda massa bo‘yicha 1 % kumush uchun DEF atigi 1,20 ga teng (6–30° anod burchaklari, 25–50 kV va 0,15–2 mm qalinlikdagi berilliy oynalarda 1,19–1,21), chunki dozani asosan Cu K chiziqlari va yumshoq tormozlanish nurlanishi hosil qiladi. Filtrlash hal qiluvchi omil hisoblanadi: DEF 1 mm Al bilan 1,48 ga, 2 mm Al bilan 1,62 ga va 0,2 mm Cu bilan 1,80 ga teng bo‘ladi, biroq bunda havodagi kerma 120–1300 marta kamayadi.
3. Havodagi kerma bo‘yicha o‘tkazish koeffitsiyenti bir xil bo‘lganda 9–45 keV da yutilish chegaralariga ega bo‘lmagan yengil va o‘rtacha Z li filtrlar (Al, Si, Ca, Sc, Ti) eng yuqori DEF qiymatini, K-chegaralari 20–30 keV da joylashgan filtrlar (Mo, Ag, Sn) esa kuchli filtrlashda eng past qiymatni beradi: o‘tkazish koeffitsiyenti 0,1 % bo‘lganda 1 % kumush uchun DEF Sc yoki Ti bilan taxminan 1,91 ni, Ag bilan esa 1,34 ni tashkil etadi.
4. 1 mm Al bilan 1 % kumush uchun DEF sirtdagi 1,48 dan 20 mm chuqurlikda 1,69 gacha ortadi (dastaning qattiqlashishi), biroq kumush bir tekis kiritilgan soha ichida 10 mm chuqurlikda 1,21 gacha kamayadi (o‘z-o‘zini ekranlash); 1 % kumush saqlovchi 10 mm qalinlikdagi qatlam ortidagi doza kumushsiz holdagi qiymatning taxminan 0,80 qismigacha pasayadi. Mustaqil MK hisobi ushbu natijalarni 1–10 % doirasida tasdiqladi va qayta yutilgan Ag K flyuoressensiyasi hamda sochilgan fotonlarning rolini ko‘rsatdi.
5. Massa birligiga nisbatan kumush 45 kV da oltin, platina, vismut va gadoliniyga qaraganda kuchsizroq fizik sensibilizator hisoblanadi (1 mm Al bilan DEF 1,48 ga teng, oltin uchun esa 2,16) va yod (1,46) bilan taqqoslanarli; shu sababli AgNZ uchun AuNZga qaraganda kuchliroq biologik effekt qayd etilganligi [12] kimyoviy, biologik va nanomiqyosdagi mexanizmlardan dalolat beradi.

**Tadqiqotning amaliy ahamiyati.** IM dasturiy ta’minoti kumush bilan radiobiologik tajribalarni rejalashtirish uchun past kuchlanishli mis anodli trubkalarning spektri, havodagi kermasi va dasta sifatini hisoblab beradi. 45 kV li trubka uchun 1–2 mm qalinlikdagi alyuminiy filtr (yoki 0,1–0,3 mm titan) tavsiya etiladi; alyuminiy filtr qo‘llanganda namuna sirtida (fokusdan 10 sm masofada, 40 mA) 2 Gr to‘qima kermasiga taxminan 15–33 s ichida erishiladi. xraylib 4.3.0 kutubxonasining CS_Energy funksiyasi 15–45 keV da yengil elementlarning massaviy energiya yutilish koeffitsiyentlarini 56 % gacha (15 keV da uglerod uchun; kislorod uchun 30 keV da 37 %) kamaytirib ko‘rsatadi, bu esa DEFning oshirib baholanishiga olib kelgan bo‘lar edi (1 % kumush va 1 mm Al uchun 1,48 o‘rniga 1,62), shu sababli NIST jadvallaridan foydalanish lozim.

**Natijalarning ishonchliligi.** Natijalarning ishonchliligi baholangan ma’lumotlarga (fotonlarning o‘zaro ta’siri bo‘yicha NIST jadvallari [59], ICRUning 37-hisobotidagi tormozlanish qobiliyati parametrlari [68]) va mustaqil tekshiruvlarga asoslanadi. Bete formulasi 50 keV da suvning NIST ESTAR bazasidagi ionizatsion tormozlanish qobiliyatini (6,603 MeV sm^2^/g) takrorlaydi [69], IM esa 50–100 kV da volfram anod uchun SpekPy YSQ qiymatlarini 6 % doirasida takrorlaydi. MK energiya uzatish koeffitsiyentlari 20–40 keV da H, C va O elementlarining NIST massaviy energiya yutilish koeffitsiyentlarini 0,3 % doirasida takrorlaydi. Sezgirlik tahlili 1 % kumush va 1 mm Al uchun DEF = 1,48 ± 0,02 (qamrov koeffitsiyenti $k = 1$) ekanligini ko‘rsatadi.

**Natijalarning aprobatsiyasi.** Natijalar quyidagi anjumanlarda ma’ruza qilingan: [muallif tomonidan to‘ldiriladi: natijalar ma’ruza qilingan konferensiyalar va seminarlar].

**Natijalarning e’lon qilinganligi.** Natijalar quyidagi ishlarda e’lon qilingan: [muallif tomonidan to‘ldiriladi: nashrlar ro‘yxati].

**Dissertatsiyaning tuzilishi va hajmi.** Dissertatsiya annotatsiyalar, qisqartmalar ro‘yxati, kirish, uch bob, xulosa, foydalanilgan adabiyotlar ro‘yxati va ilovalardan iborat: 95 bet, 23 ta rasm, 17 ta jadval va 121 ta adabiyot manbasi. I bobda adabiyotlar sharhi berilgan, II bobda usullar, III bobda esa natijalar va muhokama bayon etilgan.


# I BOB. YUQORI Z LI ELEMENTLAR YORDAMIDA RADIOSENSIBILIZATSIYA VA RENTGEN SPEKTRINI MODELLASHTIRISH: ADABIYOTLAR SHARHI

## 1.1. Nur terapiyasi va normal to‘qimalar chidamliligi muammosi

Saraton kasalligining global yuki fonida [1] nur terapiyasi (RT) davolashning asosiy usullaridan biri bo‘lib [4], undan foydalanishning dalillarga asoslangan optimal ulushi taxminan 52 % ni tashkil etadi [2]. RT hujayra dezoksiribonuklein kislotasini (DNK) bevosita ikkilamchi elektronlar orqali yoki bilvosita suv radiolizida hosil bo‘ladigan erkin radikallar orqali shikastlaydi [3], biroq energiyaning ajralishi tanlab sodir bo‘lmaydi, shu sababli dasta yo‘lidagi sog‘lom to‘qimalar ham shikastlanadi. O‘smani nazorat qilish va normal to‘qimalarda asoratlar yuzaga kelishining sigmasimon “doza–javob” egri chiziqlari bir-biriga yaqin joylashganda (terapevtik interval kichik bo‘lganda), normal to‘qimalarga nisbatan toksiklik RTni cheklovchi asosiy omilga aylanadi [3, 4]. Kislorod effekti tufayli rentgen nurlanishiga kamroq sezgir bo‘lgan gipoksik o‘sma hujayralari bu muammoni yanada keskinlashtiradi [3].

Fraksiyalash [3] hamda intensivligi modulyatsiyalangan RT kabi tasvir nazorati ostidagi konformal usullar [17] normal to‘qimani asraydi, biroq dastaning bir xil sohasidagi o‘sma va normal hujayralarda massa birligiga to‘g‘ri keladigan yutilgan energiyalar nisbatini o‘zgartirmaydi. O‘sma hujayralariga normal hujayralarga qaraganda kuchliroq ta’sir ko‘rsatadigan radiosensibilizatorlar qatoriga nitroimidazollar kabi kislorod mimetiklari [5] hamda kimyoviy va biologik faollikni og‘ir atomlar bilan birlashtiruvchi o‘tish metallarining (platina, oltin, ruteniy) birikmalari kiradi [6]. Atom raqami $Z$ yuqori bo‘lgan elementlar (yuqori Z li elementlar) fizik yo‘l bilan ta’sir ko‘rsatadi: o‘smada to‘plangan bunday elementlar massa birligiga hisoblaganda yumshoq to‘qimaga qaraganda ko‘proq foton energiyasini yutadi va o‘smadagi dozani oshiradi, elementni saqlamaydigan atrofdagi to‘qimadagi dozani esa oshirmaydi [7, 9]. Bu samara dozani kuchaytirish koeffitsiyenti (DEF), ya’ni vositani saqlovchi va saqlamaydigan to‘qimadagi dozalarning nisbati bilan ifodalanadi (2.6-bo‘lim); kimyoviy sensibilizatsiyadan farqli ravishda, uni nurlanish maydoni ma’lum bo‘lganda o‘zaro ta’sir ma’lumotlari asosida hisoblash mumkin.

Oltin nanozarrachalari uchun bajarilgan Monte-Karlo (MK) hisoblari dozaning makroskopik kuchayishi kilovoltli dastalarda megavoltli dastalardagiga qaraganda ancha katta ekanligini ko‘rsatgan [10], chunki Zga kuchli bog‘liq bo‘lgan fotoeffekt faqat past energiyalarda ustunlik qiladi (1.2-bo‘lim). Kilovoltli dastalar yuza va ortovoltli terapiyada qo‘llaniladi [17], ularning dozimetriya protokollarida esa dasta sifati yarim susaytirish qatlami (YSQ) orqali belgilanadi [14, 70]. Shu sababli DEF qiymatini rentgen spektrini ko‘rsatmasdan keltirib bo‘lmaydi, spektr esa trubka konstruksiyasi va filtrlashga bog‘liq; ushbu ishda bu masala kumush va mis anodli 45 kV li trubka uchun ko‘rib chiqiladi.

## 1.2. Kilovoltli fotonlarning biologik muhit bilan o‘zaro ta’siri

50 keV gacha bo‘lgan energiyalarda fotonlar fotoelektrik yutilish, nokogerent (kompton) va kogerent (reley) sochilish orqali o‘zaro ta’sirlashadi; juftlar hosil bo‘lishi (bo‘sag‘asi $2m_ec^2 = 1{,}022$ MeV) mumkin emas [8, 62]. Massaviy susayish koeffitsiyenti parsial koeffitsiyentlarning yig‘indisiga teng [62, 71]:

$$\frac{\mu}{\rho} = \frac{\tau}{\rho} + \frac{\sigma_{\mathrm{coh}}}{\rho} + \frac{\sigma_{\mathrm{inc}}}{\rho}$$

EQNUM[1.1]


bu yerda $\mu$ — chiziqli susayish koeffitsiyenti, $\rho$ — zichlik, $\tau/\rho$, $\sigma_{\mathrm{coh}}/\rho$ va $\sigma_{\mathrm{inc}}/\rho$ esa mos ravishda fotoelektrik yutilish, kogerent va nokogerent sochilishning massaviy koeffitsiyentlari (sm²/g). Aralashmalarning koeffitsiyentlari elementlar koeffitsiyentlarining massa ulushlari bilan tortilgan yig‘indisiga teng [62], bu koeffitsiyentlar Standartlar va texnologiyalar milliy instituti (NIST) jadvallaridan olinadi [59, 72]. Fotoyutilishda bog‘langan elektron, asosan energetik jihatdan mumkin bo‘lgan eng ichki qobiqdagi elektron, foton energiyasi $E$ dan uning bog‘lanish energiyasini ayirganga teng kinetik energiya bilan atomdan uchib chiqadi; yutilish chegaralari oralig‘ida [8]

$$\frac{\tau}{\rho} \propto \frac{Z^{3}}{E^{3}}$$

EQNUM[1.2]


bu yerda $Z$ — yutuvchining atom raqami; atom kesimi esa $Z^{4}/E^{3}$ ga proporsional ravishda o‘zgaradi [8, 62]. Shu sababli massa birligiga hisoblaganda og‘ir element yumshoq to‘qima massasining deyarli hammasini tashkil etuvchi H, C, N va Oga qaraganda ancha kuchli yutadi [61]. Biroq og‘ir elementning K-chegarasidan past energiyalarda uning K-qobiq elektronlari ishtirok eta olmaydi va ustunlik atom raqamlariga asoslanib kutilganidan ancha kichik bo‘ladi.

Yutilish chegaralari — $\tau/\rho$ ning qobiqlarning bog‘lanish energiyalarida keskin ortishidir [8]; kumush uchun K-chegara 25,514 keV da, L-qobiqcha chegaralari esa 3,35 dan 3,81 keV gacha bo‘lgan oraliqda joylashgan. Vakansiya tashqi qobiqdan to‘ldiriladi, bunda flyuoressent rentgen fotoni yoki Oje elektroni chiqariladi [73, 74]. K-qobiqning flyuoressensiya chiqishi $\omega_K$ atom raqami $Z$ ortishi bilan keskin ortadi va kumush uchun 0,831 ga teng (2.2-jadval) [60, 74]. H, C, N va Oda (K-qobiqdagi bog‘lanish energiyalari 1 keV dan kichik) yutilgan energiyaning deyarli hammasi joyida qoladi, kumush esa uning katta qismini taxminan 22 keV energiyali Kα fotonlari ko‘rinishida qayta chiqaradi, bu fotonlarning yumshoq to‘qimadagi o‘rtacha erkin yugurish yo‘li taxminan 1,5 sm ni tashkil etadi; kumushning past energiyali Oje elektronlari esa o‘z energiyasini atom yaqinida qoldiradi (1.3-bo‘lim).

Bu energiyalarda kompton sochilishida foton o‘z energiyasining katta qismini saqlab qoladi [8, 62], nokogerent sochilish funksiyasi $S(x,Z)$ bilan tavsiflanadigan elektronlarning bog‘langanligi esa past energiyalarda va kichik burchaklarda Kleyn–Nishina kesimini kamaytiradi; atom form-faktori $F(x,Z)$ ($x$ — impuls uzatish o‘zgaruvchisi) bilan tavsiflanadigan reley sochilishi esa fotonni faqat og‘diradi [64]. Yumshoq to‘qimada oraliqning yuqori qismida nokogerent sochilish fotoyutilishdan ustun kela boshlaydi, kumushda esa butun oraliq bo‘ylab fotoyutilish ustunlik qiladi [8, 72]. NIST tomonidan Seltzer hisoblari asosida jadvallashtirilgan massaviy energiya yutilish koeffitsiyenti [59, 75] faqat zaryadli zarralarga uzatilgan va tormozlanish nurlanishi ko‘rinishida qayta chiqarilmagan energiyani hisobga oladi [62]:

$$\frac{\mu_{en}}{\rho} = \left[\frac{\tau}{\rho}\left(1-\frac{X}{E}\right) + \frac{\sigma_{\mathrm{inc}}}{\rho}\,\frac{\bar{T}_{\mathrm{inc}}}{E}\right]\left(1-\bar{g}\right)$$

EQNUM[1.3]


bu yerda $X$ — bitta fotoyutilishda chiqariladigan o‘rtacha flyuoressensiya energiyasi, $\bar{T}_{\mathrm{inc}}$ — kompton tepki elektronining o‘rtacha kinetik energiyasi, $\bar{g}$ — ikkilamchi elektronlar kinetik energiyasining tormozlanish nurlanishiga aylanadigan o‘rtacha ulushi (bu holda e’tiborsiz darajada kichik); qolgan belgilar (1.1) formuladagi kabi [62].

Radiatsion birliklar va o‘lchovlar bo‘yicha xalqaro komissiya (ICRU) ta’riflariga ko‘ra, kerma $K$ — fotonlar tomonidan massa birligida ozod qilingan zaryadli zarralar boshlang‘ich kinetik energiyalarining umumiy yig‘indisi, to‘qnashuv kermasi $K_{\mathrm{col}}$ — uning tormozlanish nurlanishiga aylanmaydigan qismi, yutilgan doza $D$ esa massa birligiga beriladigan o‘rtacha energiya [62, 76]. Zaryadli zarralar muvozanati (ZZM) sharoitida, ya’ni kichik hajmga zaryadli zarralar olib kiradigan energiya undan olib chiqiladigan energiyaga teng bo‘lganda, yutilgan doza to‘qnashuv kermasiga teng bo‘ladi [62, 71]:

$$D = K_{\mathrm{col}} = \Psi\,\frac{\mu_{en}}{\rho}$$

EQNUM[1.4]


bu yerda $\Psi = \Phi E$ — energiyasi $E$ va flyuensi $\Phi$ bo‘lgan monoenergetik fotonlarning energiya flyuensi; polienergetik dasta uchun ifoda spektr bo‘yicha integrallanadi (2.5-bo‘lim). 50 keV dan past energiyali fotonlar ozod qilgan ikkilamchi elektronlarning to‘qimadagi yugurish yo‘llari millimetrdan kichik, shu sababli ZZM chegaralarga yaqin joylardan tashqari hamma joyda o‘rinli bo‘ladi, Fano teoremasiga ko‘ra esa tarkibi bir jinsli bo‘lgan muhitda zichlikning o‘zgarishi uni buzmaydi [77]. Demak, bir xil spektr ta’siridagi ikki muhit spektr bo‘yicha o‘rtalashtirilgan $\mu_{en}/\rho$ qiymatlarining nisbatiga teng nisbatdagi dozalarni oladi, bu esa kermaga asoslangan makroskopik DEFning asosida yotadi (2.6-bo‘lim); bu munosabat faqat yuqori Z li qo‘shilmadan elektronlarning yugurish yo‘llaridan kichik masofalarda buziladi.

1.1-rasmda NIST jadvallari [59] bo‘yicha kumush va ICRU-44 yumshoq to‘qimasining [61] koeffitsiyentlari taqqoslangan. L-chegaralardan yuqorida kumushning ikkala koeffitsiyenti ham to‘qimanikidan bir tartibdan ko‘proq katta, $\mu_{en}/\rho$ qiymatlarining nisbati esa 8 keV dagi 21,1 dan 25 keV dagi 31,9 gacha ortadi. K-chegarada kumushning $\mu/\rho$ koeffitsiyenti 5,8 marta (9,53 dan 55,4 sm²/g gacha) sakrab ortadi, $\mu_{en}/\rho$ koeffitsiyenti esa atigi 2,4 marta (8,53 dan 20,3 sm²/g gacha) ortadi. Buning sababi K-qobiq flyuoressensiyasidir: K-qobiqdagi fotoyutilishlarning aksariyatidan so‘ng K rentgen nurlanishining energiyasi o‘zaro ta’sir joyini tark etadi va $\mu_{en}/\rho$ ga kiritilmaydi.



![1.1-rasm. Kumush va ICRU-44 yumshoq to‘qimasining 1–50 keV dagi massaviy susayish (tutash chiziqlar) va massaviy energiya yutilish (shtrix chiziqlar) koeffitsiyentlari (NIST ma’lumotlari). Vertikal shtrix chiziq 25,51 keV dagi Ag K-chegarasini, strelka esa Ag L-qobiqcha chegaralarini ko‘rsatadi.](/home/user/atlant-impossible/dissertation/code/../figures/uz/fig02_coeffs.png){width=13.5cm}



To‘qima uchun ikkala koeffitsiyent taxminan 10 keV dan yuqorida bir-biridan uzoqlashadi, chunki kam energiya qoldiradigan sochilishning ulushi ortadi. K-chegaradan yuqorida kumushning $\mu_{en}/\rho$ koeffitsiyenti uning $\mu/\rho$ koeffitsiyentiga qaraganda sekinroq kamayadi, chunki flyuoressensiyaning o‘zgarmas energiyasi foton energiyasining kichikroq ulushini tashkil eta boradi; u to‘qimanikiga qaraganda ham sekinroq kamayadi. Shu sababli kumush va to‘qima koeffitsiyentlarining nisbati chegarada taxminan 32 dan taxminan 76 gacha sakrab ortganidan so‘ng ortishda davom etadi: u 30 keV da 102,8 ga, 35 keV da 120,1 ga yetadi va 40–45 keV da taxminan 139 ga teng maksimumga erishadi. Demak, energiya flyuensining Ag K-chegarasidan yuqoridagi ulushi kumush uchun dastaning asosiy xarakteristikasi hisoblanadi.

## 1.3. Yuqori Z li radiosensibilizatorlar: yodli kontrast moddalardan metall nanozarrachalarigacha

Spiers birinchi bo‘lib suyakda energiya yutilishining ortishi va ikkilamchi elektronlarning yugurish yo‘llari suyak ichidagi va uning yaqinidagi yumshoq to‘qima dozasini qanday belgilashini tahlil qilgan [18], Das va Chopra esa kilovoltli dastalarda to‘qima va yuqori Z li material orasidagi bo‘linish chegaralarida teskari sochilish tufayli dozaning g‘alayonlanishini miqdoriy baholagan [78]. Tizimli o‘rganilgan dastlabki vositalar bo‘lgan yodli kontrast moddalar kulturada o‘stirilgan sutemizuvchilar hujayralarining rentgen nurlanishiga sezgirligini oshirgan, gamma-nurlanishga sezgirligini esa oshirmagan [79], bu esa sabab yod tomonidan fotoyutilish ekanligiga ishora qiladi. Yod kiritilgan o‘smalarda dozaning kuchayishi kilovoltli rentgen nurlari uchun [19] va bosh miya o‘smalarini davolash uchun [20] hisoblangan, terapiya uchun modifikatsiyalangan kompyuter tomografi yordamida esa odam bosh miyasi metastazlarini shu tarzda davolash ilk bor amalga oshirilgan [21]. Monoxromatik sinxrotron dastalari yod kiritilgan F98 gliomasi bo‘lgan kalamushlarni davolashda [80] va hujayralarda yodli birikmalar uchun optimal energiyani aniqlashda [81] qo‘llanilgan; kontrast modda bilan kuchaytirilgan kilovoltli RT MK usulida tahlil qilingan [82], modifikatsiyalangan megavoltli dastalar esa yodli va gadoliniyli kontrast moddalar bilan birgalikda ishlatilgan [83]. Platina preparatlari kimyoterapevtik vositaga yuqori Z li atomni qo‘shadi: platinaning K-chegaradagi fotoaktivatsiyasidan foydalanuvchi monoxromatik sinxrotron rentgen nurlari bilan birgalikda qo‘llanilgan sisplatin radiorezistent F98 gliomasi bo‘lgan kalamushlarning tuzalishiga olib kelgan [84]. Pignol va hammualliflar galogenlangan dezoksiuridinlar, platina tuzlari va gadoliniy porfirinlari yordamida radiosensibilizatsiyada ichki qobiqlar ionizatsiyasi va Oje kaskadlarini tahlil qilgan [85]; og‘ir atom DNK ichida yoki uning yaqinida joylashganda, qisqa yugurish yo‘lli Oje elektronlari o‘z energiyasini ushbu kritik nishonda qoldiradi, shu sababli yuqori Z li atomning nafaqat konsentratsiyasi, balki hujayra ichidagi joylashuvi ham muhim ahamiyatga ega.

Zamonaviy bosqich diametri 1,9 nm bo‘lgan oltin nanozarrachalari (AuNZ) 250 kVp (kilovolt-pik) rentgen nurlari bilan nurlantirilgan, o‘smasi bor sichqonlarning bir yillik yashab qolish ko‘rsatkichini sezilarli darajada yaxshilaganidan boshlangan [9]; shundan buyon samaradorlikning asosiy parametrlari (material, o‘lcham, qoplama, foton energiyasi) tizimli tahlil qilingan [86]. In vitro sharoitda AuNZ yordamida radiosensibilizatsiya yuza va ortovoltli terapiya dastalari [23, 87] hamda monoenergetik sinxrotron dastalari [88] bilan namoyish etilgan; zarrachalarning hujayralar tomonidan o‘zlashtirilishi va radiosensibilizatsiya zarrachalar o‘lchamiga bog‘liq [22], DNK bilan o‘tkazilgan tajribalar esa foton energiyasi, o‘lcham va konsentratsiyani hal qiluvchi parametrlar sifatida aniqlagan [89]. Bu natijalar sharh maqolalarda [90–94] hamda klinik “yo‘l xaritasi”da [28] umumlashtirilgan.

Bu hodisaning fizikasi asosan MK modellashtirish orqali o‘rganilgan [10]: o‘smada tanlab kuchayish turli foton manbalari [24] va terapevtik dastalar [95] uchun miqdoriy baholangan, AuNZ bilan kuchaytirilgan yoysimon terapiya uchun esa kilovoltli energiyalar optimal ekanligi aniqlangan [96]. Radiosensibilizatsiya nanozarrachalarning joylashuviga ham bog‘liq [97]; mikroskopik miqyosda kuchayish yuqori darajada lokallashgan [30], Geant4 yordamida bajarilgan modellashtirish esa ikkilamchi elektronlarning fazoviy taqsimotini tavsiflagan [25]. Biroq radiokuchaytirish shunchaki dozaning ortishidan iborat emas: u fizik bosqich (fotonlarning qo‘shimcha yutilishi; fotoelektronlar, Oje elektronlari va flyuoressent nurlanish chiqarilishi), kimyoviy bosqich (kislorodning faol shakllari — KFSh — hosil bo‘lishi) va biologik bosqichni (oksidlovchi stress, hujayra siklining buzilishi, DNK reparatsiyasining ingibirlanishi) o‘z ichiga oladi [7, 26, 27, 98]. McMahon va hammualliflar lokal effekt modeli yordamida og‘ir atomli nanozarrachalar yaqinida energiyaning nanomiqyosda o‘ta notekis ajralishi hujayralarda makroskopik DEFdan ortiq bo‘lgan sensibilizatsiya koeffitsiyentini (SER) tushuntirishi mumkinligini ko‘rsatgan [31]; shunga qaramay, makroskopik DEF fizik hissani kimyoviy va biologik hissalardan ajratish uchun bazaviy daraja bo‘lib qolaveradi.

Adabiyotlarda oltin ustunlik qilsa-da, optimal element foton energiyasi bo‘yicha kermaga asoslangan taqqoslashlar [13] hamda fizik modellashtirish [29] orqali izlangan. Kerma yaqinlashuvida taqqoslash elementning $\mu_{en}/\rho$ qiymatining to‘qimanikiga nisbati $R(E)$ ga keltiriladi, chunki elementning massa ulushi $w$ ga teng bo‘lgan to‘qimaning foton energiyasi $E$ dagi DEF qiymati $1 + w\,[R(E) - 1]$ ga teng (2.6-bo‘lim). 1.2-rasmda Ag, I, Gd, Pt, Au va Bi uchun $R(E)$ nisbati 5–45 keV oralig‘ida ko‘rsatilgan; bu oraliq 45 kV li trubka spektrining deyarli hammasini qamrab oladi.



![1.2-rasm. 5–45 keV oralig‘ida Ag, I, Gd, Pt, Au va Bi massaviy energiya yutilish koeffitsiyentlarining ICRU-44 yumshoq to‘qimasi koeffitsiyentiga nisbati (NIST ma’lumotlari). Vertikal shtrix chiziq 25,51 keV dagi Ag K-chegarasini ko‘rsatadi.](/home/user/atlant-impossible/dissertation/code/../figures/uz/fig03_ratio.png){width=13.5cm}



Taxminan 12 keV dan past energiyalarda kumush, platina, oltin va vismut uchun nisbatlar bir-biriga yaqin, yod uchun esa biroz yuqoriroq. Gadoliniy o‘zining L-chegaralaridan (7,2–8,4 keV) yuqorida va taxminan 13 keV gacha yetakchilik qiladi, bunda taxminan 8,0 keV dagi Cu Kα chiziqlarini ayniqsa samarali yutadi. Platina, oltin va vismutning taxminan 12–16 keV dagi L-chegaralari ularning nisbatlarini bir necha baravar oshiradi, natijada taxminan 12 dan 25,5 keV gacha bo‘lgan oraliqda oltita element orasida eng past nisbat kumushga to‘g‘ri keladi. Kumush o‘zining K-chegarasidan yuqorida avval gadoliniyga (K-chegarasi 50,239 keV, bu fotonlarning maksimal energiyasidan yuqori) tenglashadi, so‘ngra undan oshib ketadi; yoddan esa taxminan 42 keV gacha ustun turadi, biroq yodning K-chegarasidan (33,169 keV) yuqorida faqat biroz ustun bo‘ladi. 40–45 keV da yod, platina va kumush taqqoslanarli bo‘ladi, oltin va vismut esa eng yuqori bo‘lib qolaveradi.

Bundan ikki xulosa kelib chiqadi. Birinchidan, massa birligiga hisoblaganda kumush platina, oltin va vismutga qaraganda kuchsizroq fizik sensibilizator bo‘lishi kerak, yoddan faqat o‘z K-chegarasidan yuqorida, gadoliniydan esa faqat o‘z K-chegarasidan yuqorida va gadoliniyning L3 chegarasidan (7,2 keV) pastda ustun turadi, shu sababli uning elementlar qatoridagi o‘rni spektrga bog‘liq. Ikkinchidan, kumushning to‘qimaga nisbati 8 keV dan chegaragacha bo‘lgan oraliqdagi (u 8,0–8,9 keV dagi Cu K chiziqlarini ham o‘z ichiga oladi) 21–32 dan chegaradan yuqoridagi 76–139 gacha ortgani sababli, energiya flyuensini 25,514 keV ga nisbatan qayta taqsimlaydigan trubkaning konstruktiv parametrlari va, ayniqsa, filtrlash DEF uchun hal qiluvchi ahamiyatga ega bo‘lishi kutiladi; bu III bobda tekshiriladi.


## 1.4. Kumush va kumush nanozarrachalari radiosensibilizator sifatida

Kumush ($Z = 47$) yumshoq to‘qimaning yengil elementlari bilan yuqori Z li radiosensibilizatorlarga oid adabiyotlarda yetakchi o‘rin tutadigan oltin ($Z = 79$) kabi og‘ir elementlar o‘rtasida joylashgan. Kumush nanozarrachalarining (AgNZ) sintezi, xossalari va terapevtik qo‘llanilishi [99], shuningdek, ularning mikroblarga qarshi va saratonga qarshi vosita sifatida qo‘llanilishi [100] sharhlarda yoritilgan; AgNZ oltindan arzonroq va ularni “yashil” sintez usulida, masalan, tuxum oqida olish mumkin [101]. Nur terapiyasi uchun kumushning ikki xossasi muhim: uning biologik faolligi va K-chegarasining kilovoltli trubkalar spektrlari ichida joylashganligi. Ulardan birinchisi toksiklik bilan bog‘liq: AgNZ inson hujayralarida sitotoksik va genotoksik bo‘lib, mitoxondriyalar ishtirokida KFSh hosil bo‘lishini, DNK shikastlanishini va hujayra siklining to‘xtashini qo‘zg‘atadi [37]. Bunday ta’sirlar radiokuchaytirishning kimyoviy va biologik bosqichlariga (1.3-bo‘lim) taalluqli [7, 98], shu sababli AgNZ hujayralarning nurlanishga sezgirligini fizik doza kuchayishi ta’minlay oladigan darajadan ortiqroq oshirishi mumkin. Biroq ularning sitotoksikligi o‘smada tanlab to‘planishni terapiyaning zaruriy shartiga aylantiradi, doza kuchayishining sog‘lom to‘qimalarga ta’sirini esa baholash zarur [39].

Eksperimental dalillar 1.1-jadvalda umumlashtirilgan: Xu va hammualliflarning dastlabki ishidan [32] buyon eng ko‘p o‘rganilgan model glioma bo‘lib kelmoqda [11, 12, 33, 34], jumladan, radiorezistent gipoksik hujayralar ham tadqiq qilingan [3]; sut bezi [35] va kolorektal [36] saraton modellaridan ham foydalanilgan. Tadqiqotlar zarrachalar, qoplamalar, biologik modellar va nurlantirish sharoitlari bo‘yicha farq qiladi va ularni miqdoriy jihatdan taqqoslab bo‘lmaydi. Fizik doza kuchayishi spektrga kuchli bog‘liq bo‘lgani uchun (1.3-bo‘lim), spektr ko‘rsatilmagan holda keltirilgan kuchayish koeffitsiyentini fizik va nofizik qismlarga ajratib bo‘lmaydi.

Table: 1.1-jadval. Kumush nanozarrachalarini radiosensibilizator sifatida o‘rganishga bag‘ishlangan tadqiqotlar.

| Tadqiqot | Tizim / nurlanish turi | Asosiy natija |
|:---|:---|:---|
| Xu va hammualliflar, 2009 [32] | Saraton hujayralari / ionlashtiruvchi nurlanish | Hujayralar halok bo‘lishiga sezgirlikni oshirgan (dastlabki ma’lumot) |
| Lu va hammualliflar, 2012 [101] | Saraton hujayralari / nurlanish | Biologik mos, “yashil” sintez qilingan AgNZ nurlanish ta’sirini kuchaytirgan |
| Liu va hammualliflar, 2013 [11] | Glioma in vitro va in vivo | Oltinga muqobil sifatida taklif etilgan |
| Swanner va hammualliflar, 2015 [35] | Uch karra manfiy va boshqa sut bezi hujayralari | Ta’sirlar hujayra turlariga qarab farq qilgan |
| Liu va hammualliflar, 2016 [12] | U251 glioma; sichqonlarning intrakranial modeli | AuNZdan ustun kelgan |
| Liu va hammualliflar, 2018 [33] | Gipoksik glioma hujayralari / nur terapiyasi | Gipoksiya sharoitida samaradorlik oshgan |
| Zhao va hammualliflar, 2019 [34] | Glioma / nurlantirish terapiyasi | Polietilenglikol va AS1411 aptameri ta’sirni kuchaytirgan |
| Habiba va hammualliflar, 2019 [36] | Kolorektal saraton / nur terapiyasi | Grafen bilan dekoratsiyalangan kumush nanoprizmalar radiosensibilizator sifatida |

AgNZning AuNZdan qayd etilgan ustunligi [12] ibratlidir. Massa birligiga hisoblaganda, taxminan 12 keV dan past energiyalarda kumush va oltin foton energiyasini taqqoslanarli darajada yutadi, biroq taxminan 12 dan 45 keV gacha bo‘lgan oraliqda oltin kuchliroq yutadi (1.2-rasm), megavoltli dastalarda esa makroskopik kuchayish hatto oltin uchun ham ancha kichik [10], chunki u yerda massaviy koeffitsiyenti $Z$ ga faqat sust bog‘liq bo‘lgan kompton sochilishi ustunlik qiladi [8]. Demak, kumushning ustunligini 45 keV dan past energiyalarda ham, megavoltli energiyalarda ham makroskopik fizik doza kuchayishining kattaroq ekanligi bilan tushuntirish ehtimoldan yiroq. Bu kumushning kimyoviy va biologik faolligi [37] hamda energiyaning nanomiqyosda ajralishi [31] sezilarli hissa qo‘shishiga ishora qiladi; buni tasdiqlash uchun aniq belgilangan dasta uchun fizik qismni miqdoriy baholash zarur.

Kumushga oid dozimetrik tadqiqotlar biologik tadqiqotlarga qaraganda kamroq: MK modellashtirish yordamida braxiterapiya vaqtida bosh miya o‘smasidagi AgNZ [38], atrofdagi sog‘lom to‘qimalar [39] hamda qatlamli terida kumush va oltinni taqqoslash [40] masalalari ko‘rib chiqilgan; doza kuchayishi AgNZ bilan boyitilgan dozimetrik gellarda ham o‘lchangan [41], uning ortovoltli dastalardagi chuqurlikka bog‘liqligi esa nanozarrachalar uchun o‘rganilgan [42]. Kilovoltli trubka konstruksiyasi va filtrlash kumush kiritilgan to‘qimaning DEF qiymatini qanday belgilashining tizimli tahlili ko‘rib chiqilgan adabiyotlarda topilmadi.

Dastani tanlash kumushning atom ma’lumotlaridan kelib chiqadi (2.2-jadval): K-chegara — 25,514 keV, L3 chegara — 3,351 keV, Kα1 chiziq — 22,163 keV. $\omega_K = 0{,}831$ bo‘lgani uchun K vakansiyalarining faqat 17 % ga yaqini energiyasini joyida qoldiradigan Oje o‘tishlari orqali relaksatsiyalanadi [73, 74]; qolgan 83 % i esa, asosan, energiyani olib ketadigan Kα fotonlarini chiqaradi (1.2-bo‘lim). Shunga qaramay, kumush va to‘qimaning $\mu_{en}/\rho$ nisbati chegaradan yuqorida 76–139 ni tashkil etadi, 8 keV dan chegaragacha bo‘lgan oraliqda esa 21–32 ga teng (1.2- va 1.3-bo‘limlar). Faqat taxminan 81 kV dan yuqori kuchlanishda foydalanish mumkin bo‘lgan oltin K-chegarasidan (80,725 keV) farqli o‘laroq, kumushning K-chegarasi taxminan 26 kV dan yuqori kuchlanishda ishlaydigan har qanday trubka spektri ichida yotadi. Shu sababli eng qulay spektrlarda energiya flyuensining katta qismi Ag K-chegarasi bilan fotonlarning maksimal energiyasi (bu yerda 45 keV) oralig‘iga to‘g‘ri keladi; bu oraliq filtrlanmagan mis anodli dastaning fotonlar flyuensida ustunlik qiladigan 8,0–8,9 keV dagi Cu K chiziqlaridan ancha yuqorida joylashgan.

## 1.5. Rentgen trubkalari spektrlarini modellashtirish usullari

DEF uchun zarur bo‘lgan spektrni yarimo‘tkazgichli detektorlar yordamida o‘lchash [44] detektor javobiga tuzatishlar kiritishni talab qiladi va har bir konfiguratsiya uchun amalda bajarib bo‘lmaydi, shuning uchun parametrik tadqiqotlarda hisoblangan spektrlardan foydalaniladi; usullarning to‘rt guruhi 1.2-jadvalda taqqoslangan. Empirik TASMIP modeli (interpolyatsion polinomlardan foydalanadigan volfram anodning spektral modeli) 30 dan 140 kV gacha bo‘lgan o‘lchangan volfram anodli spektrlarni interpolyatsiyalaydi [43], spektr 3.0 vositasi esa shunga o‘xshash interpolyatsion modelni amalga oshiradi [102]. Bunday modellar o‘lchangan trubkalarning anod materiali, burchagi va xususiy filtrlashiga bog‘lab qo‘yilgan: qo‘shimcha filtrlashni susayish sifatida modellashtirish mumkin, ushbu ishda o‘rganilayotgan anod materiali va burchagini esa modellashtirib bo‘lmaydi.

Yarim empirik modellar Kramers nazariyasiga borib taqaladi; unga ko‘ra qalin nishon chiqaradigan, foton energiyasining birlik intervaliga to‘g‘ri keladigan energiya $Z(T_0 - E)$ ga proporsional, bu yerda $Z$ — nishonning atom raqami, $T_0$ — elektronlarning boshlang‘ich kinetik energiyasi, $E$ — foton energiyasi [8, 103]. Birch va Marshall o‘z modelini Ge(Li) detektori yordamida o‘tkazilgan o‘lchashlar bilan taqqoslagan [44], Tucker, Barnes va Chakraborty esa volfram uchun TBC modelini taklif qilgan [45]. Bunday modellar tormozlanish nurlanishining soddalashtirilgan kesimini elektronlarning kirib borishi va nishonda o‘z-o‘zini yutishning taqribiy tavsifi bilan birlashtiradi; ular kuchlanish, anod burchagi hamda filtrlashga bog‘liqlikni oshkor ko‘rsatadi, biroq ularning moslashtirilgan parametrlari nishonga, odatda volframga xosdir.

Fizikaga asoslangan deterministik modellar empirik parametrlarning aksariyatini nazariy yoki MK hisoblashlaridan olingan ma’lumotlar bilan almashtiradi. MK modellashtirishdan olingan elektronlarning kirib borish xarakteristikalari [46] nishon ichida rentgen nurlanishining hosil bo‘lishi va filtrlanishini hisoblashda qo‘llanilgan [47] va volfram uchun SpekCalc dasturida amalga oshirilgan [48]. Uning vorisi SpekPy v2 bir nechta fizik modelni, jumladan, ushbu ishda qo‘llanilgan casim modelini, hamda bir nechta anodni, shu jumladan misni taklif etadi [15]; mis anod 2.5.4 versiyasida [58] 10–50 kV uchun mavjud. U K va L nurlanish modellariga [104] hamda tormozlanish nurlanishining energetik va burchak taqsimotlari modellariga [105] tayanadi va 20 dan 300 kV gacha oraliqda [106] hamda o‘lchangan spektrlar va YSQ qiymatlari bilan solishtirib [51] validatsiya qilingan.

Eng to‘liq tavsifni trubkada elektronlar va fotonlarning bog‘langan ko‘chishini MK modellashtirish beradi, masalan, diagnostik va mammografik spektrlar uchun MCNP4C [50] yoki nur terapiyasida qo‘llaniladigan kilovoltli qurilmalar uchun EGS4/BEAM [49]; boshqa umumiy maqsadli dasturlar qatoriga EGSnrc [107], Geant4 [108] va PENELOPE [109] kiradi. Bu usul elektronlarning teskari sochilishini, tormozlanish nurlanishining burchak taqsimotini va trubkaning real geometriyasini hisobga oladi, biroq u sekin ishlaydi va batafsil geometrik ma’lumotlarni talab qiladi, shuning uchun keng ko‘lamli parametrik tadqiqotlardan ko‘ra etalon hisoblashlar uchun ko‘proq mos keladi.

Table: 1.2-jadval. Rentgen spektrini modellashtirish yondashuvlarini taqqoslash.

| Yondashuv | Misollar | Afzalliklari | Cheklovlari |
|:---|:---|:---|:---|
| Empirik | TASMIP [43]; spektr 3.0 [102] | Tez; ma’lumotlar diapazoni doirasida aniq | Anod materiali, burchagi va filtrlash o‘zgarmas |
| Yarim empirik | Kramers [103]; Birch–Marshall [44]; TBC [45] | Sodda; parametrlarga bog‘liqlik oshkor | Soddalashtirilgan fizika; moslashtirilgan parametrlar, asosan volfram uchun |
| Fizikaga asoslangan deterministik | SpekCalc [48]; SpekPy v2 [15]; ishlab chiqilgan model (ushbu ish) | Tez; fizik asoslangan; parametrlar soni kam | Elektronlar ko‘chishi taqribiy; anodlar va kuchlanishlar cheklangan |
| Monte-Karlo | MCNP4C [50]; EGS4/BEAM, EGSnrc [49, 107]; Geant4 [108]; PENELOPE [109] | Eng to‘liq fizika; trubkaning real geometriyasi | Sekin; batafsil geometriya talab etiladi; statistik shovqin |

Kilovoltli dozimetriyada dasta sifati trubka kuchlanishi bilan birga YSQ orqali belgilanadi [110]; Amerika tibbiyot fiziklari assotsiatsiyasining 40–300 kV dastalar uchun protokolida (AAPM TG-61) [14], Atom energiyasi bo‘yicha xalqaro agentlikning (IAEA) TRS-398 amaliy qo‘llanmasida [70] va Xalqaro elektrotexnika komissiyasining standart nurlanish sifatlarida (IEC 61267) [111] shunday qilingan. Demak, YSQ modellar va o‘lchashlarni taqqoslash uchun tabiiy kattalik hisoblanadi. Biroq u energiya flyuensining Ag K-chegarasidan yuqoridagi ulushini bir qiymatli belgilamaydi, shuning uchun YSQ qiymatlari yaqin bo‘lgan dastalar kumush uchun turli DEF qiymatlarini berishi mumkin; III bobda bu yutilish chegaralariga ega filtrlar misolida ko‘rsatiladi (3.5-jadval).

Ushbu modellarning aksariyati tibbiy trubkalarning odatiy nishoni bo‘lgan volfram uchun ishlab chiqilgan [16]. Mis anodli trubkalar asosan rentgen-struktur tahlilida qo‘llaniladi; unda Cu Kα ishchi chiziq bo‘lib xizmat qiladi, Kβ nikel filtr bilan bostiriladi [52], tormozlanish nurlanishining uzluksiz spektri esa istalmagan fon hisoblanadi. Kumush bilan doza kuchayishi uchun esa, aksincha, uzluksiz spektr foydali qism hisoblanadi, chunki faqat tormozlanish nurlanishi fotonlarining energiyasi Ag K-chegarasidan oshishi mumkin; shunga qaramay, mis anodli trubkalarning to‘liq spektri va uning trubka parametrlariga bog‘liqligiga ancha kam e’tibor qaratilgan. Shu sababli ushbu ishda mis anodli trubkaning fizikaga asoslangan yarim analitik modeli — ishlab chiqilgan model (IM) yaratildi; u uzluksiz sekinlashish yaqinlashuvidagi (CSDA) Bete ionizatsion tormozlanish qobiliyatini [53, 68], Elvert ko‘paytuvchisi kiritilgan norelyativistik Bete–Gaytler tormozlanish nurlanishi kesimini [54–56] va Grizinskiy K-qobiq ionizatsiyasi kesimini [57] yagona moslashtiriladigan parametr — elektronlarning chuqurlik koeffitsiyenti bilan birlashtiradi (II bob). Trubka parametrlariga barcha bog‘liqliklar oshkor ko‘rinishda saqlanadi.

## 1.6. I bob bo‘yicha xulosalar

Kilovoltli dastalarda yuqori Z li element bilan fizik doza kuchayishi uning massaviy energiya yutilish koeffitsiyentining to‘qimanikiga nisbati bilan belgilanadi; kumush uchun bu nisbat 25,514 keV dagi K-chegaradan yuqorida keskin ortadi, demak, kumushning fizik samaradorligi asosan energiya flyuensining ushbu chegaradan yuqoridagi ulushi bilan aniqlanadi, DEF qiymati esa faqat o‘z spektri bilan birgalikdagina ma’noga ega. AgNZ glioma, sut bezi saratoni va kolorektal saraton modellarida radiosensibilizator sifatida ta’sir ko‘rsatadi, bir tadqiqotda esa AuNZga qaraganda samaraliroq bo‘lib chiqqan; ularning o‘zi ham sitotoksik bo‘lib, KFSh hosil qiladi. Biroq fizik effektlarni kimyoviy va biologik effektlardan ajratish uchun zarur bo‘lgan, yaxshi tavsiflangan kilovoltli dasta uchun kumushning makroskopik fizik hissasi tizimli ravishda aniqlanmagan.

Spektr modellari asosan volfram anodlar uchun ishlab chiqilgan. Shu sababli ushbu ishda 45 kV li mis anodli trubka spektrining yarim analitik modeli ishlab chiqiladi, SpekPy v2 bilan solishtirib validatsiya qilinadi va har ikkala model spektrni trubka konstruksiyasi va filtrlashga bog‘liq holda hamda kumush kiritilgan yumshoq to‘qimaning DEF qiymatini konsentratsiya, chuqurlik va filtrlashga bog‘liq holda hisoblash uchun qo‘llaniladi. Natijalar MK modellashtirish yordamida verifikatsiya qilinadi, kumush yuqori Z li boshqa elementlar bilan taqqoslanadi, DEFning noaniqligi esa amaliy tavsiyalar uchun asos sifatida baholanadi.


# II BOB. RENTGEN SPEKTRINING FIZIK MODELI VA DOZA KUCHAYISHINI HISOBLASH USULLARI

Ushbu bobda spektrning yarim analitik ishlab chiqilgan modeli (IM), shuningdek, dozani kuchaytirish koeffitsiyentini (DEF) hisoblash va uni Monte-Karlo (MK) usulida verifikatsiya qilish usullari dasturda (A ilova) amalga oshirilgan ko‘rinishda bayon etiladi; agar boshqacha ko‘rsatilmagan bo‘lsa, energiyalar keV da, uzunliklar esa sm da ifodalanadi.

## 2.1. Mis anodli rentgen trubkasining konstruksiyasi va texnik parametrlari

Qizdirilgan katoddan chiqqan elektronlar anodning fokus dog‘iga fokuslanadi va unga $T_0 = eU$ kinetik energiya bilan yetib keladi, bu yerda $U$ — trubka kuchlanishi, $e$ — elementar zaryad (bazaviy konfiguratsiyada 45 keV); bu energiyaning faqat kichik ulushi rentgen nurlanishi ko‘rinishida chiqariladi [8, 16]. Fotonlar soni trubka toki va vaqtning ko‘paytmasiga (mA·s) proporsional, spektr shakli esa tokka bog‘liq emas, shu sababli barcha spektrlar 1 mA·s ga normallashtirilgan. Modellashtirilgan qaytaruvchi nishonli trubkada (2.1-rasm) dasta qalin anodning elektronlar bilan nurlantiriladigan sirti orqali chiqadi. Shu tariqa anod sirti bilan elektronlar dastasiga perpendikulyar bo‘lgan markaziy nur orasidagi anod burchagi $\theta$ elektronlarning sirt normaliga nisbatan tushish burchagi ham, fotonlarning chiqish burchagi ham hisoblanadi. Kichik $\theta$ fokus dog‘ining effektiv o‘lchamini kamaytiradi, biroq anod tomonidagi dastani kuchsizroq va qattiqroq qiladi (“tovon” effekti) [16]; IM faqat markaziy nurni ko‘rib chiqadi. Berilliy oyna va anoddagi o‘z-o‘zini yutish xususiy filtrlashni hosil qiladi; qo‘shimcha metall filtrlar spektrning yumshoq qismini olib tashlaydi va dastani qattiqlashtiradi [17], shundan so‘ng fotonlar havo qatlamini kesib o‘tib, fokus–namuna masofasi $r$ da joylashgan namunaga yetib boradi.



![2.1-rasm. Modellashtirilgan mis anodli qaytaruvchi nishonli trubka va nurlantirish geometriyasi: anod burchagi θ ostida chiqarilgan markaziy nur fotonlari berilliy oyna, qo‘shimcha filtr va havo qatlami (fokus–namuna masofasi d, matnda r bilan belgilangan) orqali Ag saqlovchi to‘qima namunasiga yetib boradi.](/home/user/atlant-impossible/dissertation/code/../figures/uz/fig01_tube.png){width=13.5cm}



Mis anodli trubkalar rentgen-struktur tahlilining standart manbalari bo‘lib, ularda intensiv Cu Kα chizig‘idan foydalaniladi, Kβ esa K-chegarasi bu ikki chiziq orasida joylashgan nikel filtr yordamida bostiriladi [52]. Kumush ishtirokidagi nurlantirishlarda esa foydali fotonlar 25,514 keV dagi Ag K-chegarasidan yuqorida (1.4-bo‘lim), rentgen-struktur tahlilida fon sifatida qaraladigan uzluksiz spektrda joylashgan, shu sababli butun spektrni modellashtirish va filtrlash yordamida shakllantirish zarur; spektr modellarining aksariyati volfram anodlar uchun ishlab chiqilgani sababli (1.5-bo‘lim), mis anodli trubka uchun maxsus model talab etiladi. 2.1-jadvalda trubka parametrlari, ularning bazaviy qiymatlari va III bobda o‘rganilgan oraliqlar keltirilgan; kuchlanish, anod, anod burchagi, oyna va filtrlar spektr shaklini o‘zgartiradi, masofa esa teskari kvadratlar qonuni va havodagi susayish orqali ta’sir ko‘rsatadi. O‘zgarmas kuchlanish faraz qilinadi, shu sababli barcha elektronlar $T_0$ energiya bilan yetib keladi.



Table: 2.1-jadval. Modellashtirilgan rentgen trubkasining bazaviy konstruktiv va texnik parametrlari

| Parametr | Qiymat | O‘rganilgan oraliq |
|:---|---:|---:|
| Trubka kuchlanishi (o‘zgarmas) | 45 kV | 20–50 kV (SpekPy), 80 kV gacha (model) |
| Anod (nishon) materiali | Cu, Z = 29, ρ = 8,96 g/sm³ | W (validatsiya) |
| Anod burchagi θ (markaziy nurning chiqish burchagi) | 12° | 6–30° |
| Berilliy oyna qalinligi | 0,5 mm | 0,15–2,0 mm |
| Fokus–namuna masofasi (havo yo‘li) | 10 sm | – |
| Trubka toki | 40 mA | – |
| Qo‘shimcha filtrlar | yo‘q | Al 0,25–6 mm; Ti, Ni, Cu, Mo, Ag, Sn; Z = 13–83 bo‘lgan 43 element |
| Energiya oralig‘i kengligi | 0,05 keV | – |



## 2.2. Anodda elektronlarning sekinlashishi

Radiatsion yo‘qotishlar e’tiborga olinmagan holda IMda uzluksiz sekinlashish yaqinlashuvi (CSDA) Bete massaviy ionizatsion tormozlanish qobiliyati [53] bilan birga qo‘llaniladi; bunda uning Radiatsion birliklar va o‘lchovlar bo‘yicha xalqaro komissiyaning (ICRU) 37-hisobotidagi ko‘rinishidan [68] foydalaniladi:

$$\frac{S(T)}{\rho} = \frac{\kappa}{2}\,\frac{Z}{A}\,\frac{1}{\beta^{2}}\left[\ln\frac{\tau^{2}(\tau + 2)}{2\,(I/m_ec^{2})^{2}} + F^{-}(\tau)\right]$$

EQNUM[2.1]


bu yerda $S(T)$ — elektronning $T$ kinetik energiyasidagi chiziqli ionizatsion tormozlanish qobiliyati, $\rho$ — anodning zichligi, $\kappa = 4\pi N_A r_e^{2} m_ec^{2} = 0{,}307075$ MeV sm²/mol, $N_A$ — Avogadro doimiysi, $r_e$ — elektronning klassik radiusi, $m_ec^{2}$ = 510,999 keV — elektronning tinchlikdagi energiyasi, $Z$ va $A$ — anodning atom raqami va molyar massasi (g/mol), $\tau = T/m_ec^{2}$, $\beta$ — yorug‘lik tezligi birliklarida ifodalangan elektron tezligi, $\beta^{2} = 1 - (1 + \tau)^{-2}$, $I$ — o‘rtacha uyg‘otish energiyasi, $F^{-}(\tau)$ esa Myoller kesimidan keltirib chiqarilgan elektron hadi:

$$F^{-}(\tau) = 1 - \beta^{2} + \frac{\tau^{2}/8 - (2\tau + 1)\ln 2}{(\tau + 1)^{2}}$$

EQNUM[2.2]


Mis uchun $I$ = 322 eV; zichlik effekti uchun tuzatma (100 keV dan past energiyalarda e’tiborga olmaslik mumkin) va qobiq tuzatmalari (faqat eng past energiyalarda ahamiyatli) tushirib qoldiriladi; suv uchun dastur Standartlar va texnologiyalar milliy institutining (NIST) ESTAR bazasidagi tormozlanish qobiliyatini takrorlaydi [69] (2.8-bo‘lim). $T_0$ dan $T$ gacha bosib o‘tilgan yo‘l uzunligi quyidagiga teng:

$$s(T) = \int_{T}^{T_0} \frac{\mathrm{d}T'}{S(T')}$$

EQNUM[2.3]


bu yerda $T'$ — integrallash o‘zgaruvchisi. Trapetsiyalar usulida (qadam 0,02 keV) $T_{\min}$ = 1 keV gacha hisoblangan bu integral amalda CSDA yugurish yo‘lini beradi: misda 45 keV energiyali elektronlar uchun u 6,48 mkm ga teng. (2.1) formuladagi logarifm o‘zgarmas deb olinsa va $\beta^{2} \approx 2T/m_ec^{2}$ bo‘lsa, $S \propto 1/T$ bo‘ladi, u holda (2.3) ifoda $T_0^{2} - T^{2} \propto s$ munosabatni, ya’ni empirik Tomson–Uiddington qonunini beradi [112]. Ko‘p karrali elastik sochilish elektronlarning diffuziyalanishiga olib kelgani sababli CSDA yo‘li fotonlar hosil bo‘ladigan chuqurlikka teng emas; IMda Poludniowski va Evansning MK modellashtirishdan olingan kirib borish taqsimotlari [46] o‘rniga har bir elektron energiyasi uchun bitta o‘rtacha chuqurlik — kirish chuqurligi (proyektiv chuqurlik) qo‘llaniladi:

$$d(T) = \eta\, s(T)\cos\theta$$

EQNUM[2.4]


bu yerda $d(T)$ — elektron $T$ energiyagacha sekinlashadigan chuqurlik (normal bo‘ylab), $\eta$ — elektronlarning chuqurlik koeffitsiyenti (to‘g‘ri chiziqli harakat uchun $\eta = 1$, diffuziyada $\eta < 1$), $\theta$ esa tushish burchagi. IMning bu yagona moslashtiriladigan parametri SpekPy [15] beradigan tormozlanish nurlanishi spektrining shakliga moslashtirildi (2.8-bo‘lim); natijada $\eta$ = 0,40 qiymat va $\theta$ = 12° da 45 keV energiyali elektronlar uchun 2,54 mkm maksimal kirish chuqurligi olindi. Teskari sochilish (misda elektronlarning taxminan 30 % i) modellashtirilmaydi, bu esa absolyut nurlanish chiqishining ortiqcha baholanishiga hissa qo‘shadi (3.1-bo‘lim). 2.2-rasmning (a) qismida ko‘rsatilganidek, elektron sekinlashgan sari tormozlanish qobiliyati keskin ortadi, shu sababli energiya 45 dan taxminan 20 keV gacha kamayganda chuqurlik tez ortadi, so‘ngra to‘yinadi. Demak, energiyasi $T_0$ ga yaqin fotonlar faqat sirt yaqinida chiqariladi, yumshoq fotonlar esa butun yo‘l bo‘ylab hosil bo‘ladi va o‘z-o‘zini yutishdan eng ko‘p ta’sirlanadi.



![2.2-rasm. Mis anodda elektronlarning sekinlashishi va K-qobiq ionizatsiyasi: (a) Bete ionizatsion tormozlanish qobiliyati (tutash chiziq, chap o‘q) va η = 0,40 hamda θ = 12° da 45 keV energiyali elektron T gacha sekinlashadigan kirish chuqurligi (shtrix chiziq, o‘ng o‘q); (b) K-qobiq ionizatsiyasining Grizinskiy kesimi.](/home/user/atlant-impossible/dissertation/code/../figures/uz/fig04_electron.png){width=13.5cm}



## 2.3. Qalin nishonda tormozlanish nurlanishining hosil bo‘lishi

Uzluksiz spektrning klassik Kramers nazariyasi [103] quyidagi kesimni beradi:

$$\frac{\mathrm{d}\sigma_{\mathrm{Kr}}}{\mathrm{d}E} = \frac{16\pi}{3\sqrt{3}}\,\frac{\alpha Z^{2} r_e^{2}}{\beta_0^{2}\,E}$$

EQNUM[2.5]


bu yerda $\mathrm{d}\sigma_{\mathrm{Kr}}/\mathrm{d}E$ — $E < T$ da bitta atomga va foton energiyasining birligiga to‘g‘ri keladigan kesim (sm²/keV; aks holda nolga teng), $\alpha$ — nozik struktura doimiysi, $\beta_0$ — energiyasi $T$ bo‘lgan elektronning yorug‘lik tezligi birliklarida ifodalangan tezligi. $\beta_0^{2} \propto T$ va $S \propto 1/T$ bo‘lganda sekinlashish bo‘yicha integrallash Kramers qonunini (1.5-bo‘lim), ya’ni $Z(T_0 - E)$ ga proporsional energiya spektrini beradi. IMda bu kesim faqat muqobil variant sifatida saqlab qolingan, sukut bo‘yicha esa Born yaqinlashuvidagi norelyativistik, ekranlanmagan Bete–Gaytler kesimi [54] Koch va Motz [56] tomonidan jamlangan ko‘rinishda qo‘llaniladi:

$$\frac{\mathrm{d}\sigma_{\mathrm{B}}}{\mathrm{d}E} = \frac{16}{3}\,\frac{\alpha Z^{2} r_e^{2}}{\beta_0^{2}\,E}\,\ln\frac{p_0 + p}{p_0 - p}$$

EQNUM[2.6]


bu yerda $p_0$ va $p$ — elektronning foton chiqarishdan oldingi va keyingi impulslari, $p_0c = \sqrt{T(T + 2m_ec^{2})}$ va $pc = \sqrt{(T - E)(T - E + 2m_ec^{2})}$. Born yaqinlashuvi $2\pi Z\alpha/\beta_0 \ll 1$ va $2\pi Z\alpha/\beta \ll 1$ shartlarning bajarilishini talab qiladi, bu yerda $\beta$ — elektronning foton chiqargandan keyingi tezligi [56], mis uchun esa $2\pi Z\alpha/\beta_0$ hatto 45 keV da ham 3 dan oshadi. Bu xatolik elektron to‘lqin funksiyalarining Kulon maydonidagi buzilishini hisobga oladigan Elvert ko‘paytuvchisi yordamida qisman tuzatiladi [55]:

$$f_E = \frac{\beta_0}{\beta}\,\frac{1 - \exp(-2\pi Z\alpha/\beta_0)}{1 - \exp(-2\pi Z\alpha/\beta)}$$

EQNUM[2.7]


IMda $\mathrm{d}\sigma/\mathrm{d}E = f_E\,\mathrm{d}\sigma_{\mathrm{B}}/\mathrm{d}E$ ko‘paytma (BH-E) qo‘llaniladi. $E \to T$ da (2.6) ifoda nolga aylanadi, $f_E$ esa $1/\beta$ kabi ortadi, shu sababli BH-E spektrning yuqori energiyali chekkasida chekli bo‘lib qoladi. Seltzer va Bergerning jadvallashtirilgan kesimlaridan [113] farqli ravishda BH-E atom ekranlanishini va elektron–elektron tormozlanish nurlanishini hisobga olmaydi, bu esa qattiq tormozlanish nurlanishining absolyut chiqishi SpekPyga nisbatan ortiqcha baholanishiga hissa qo‘shadi. Biroq DEF faqat spektr shakliga bog‘liq bo‘lib, $\eta$ moslashtirilgandan so‘ng 45 kV da spektr shakli 2,46 % o‘rtacha kvadratik chetlanish bilan takrorlanadi (3.1-bo‘lim).

Qalin nishonda elektron $\mathrm{d}T$ energiyani yo‘qotish davomida yuza birligiga to‘g‘ri keladigan $n_a\,\mathrm{d}T/S(T)$ ta atomni kesib o‘tadi, $d(T)$ chuqurlikda hosil bo‘lgan foton esa $d(T)/\sin\theta$ chiqish yo‘li bo‘ylab susayadi. Nurlanish izotrop deb faraz qilinsa, markaziy nur bo‘ylab birlik energiya oralig‘iga, bir steradianga va bitta tushayotgan elektronga to‘g‘ri keladigan tormozlanish nurlanishi fotonlari soni quyidagiga teng:

$$N_b(E) = \frac{1}{4\pi}\int_{E}^{T_0} \frac{n_a}{S(T)}\,\frac{\mathrm{d}\sigma}{\mathrm{d}E}(T, E)\,\exp\left[-\frac{\mu(E)\,d(T)}{\sin\theta}\right]\mathrm{d}T$$

EQNUM[2.8]


bu yerda $n_a = \rho N_A/A$ — anodning hajm birligidagi atomlar soni, $\mathrm{d}\sigma/\mathrm{d}E$ — BH-E kesimi, $\mu(E)$ esa xraylib kutubxonasidan [60] olingan anodning chiziqli susayish koeffitsiyenti. Eksponensial ko‘paytuvchi va $1/4\pi$ ko‘paytuvchisiz bu ifoda barcha yo‘nalishlarda chiqariladigan hosil bo‘lgan spektr $N_g(E)$ ni beradi. Integrallar trapetsiyalar usulida 0,05 keV kenglikdagi foton energiyasi intervallarida hisoblanadi; elektronlarning kirib borishi bo‘yicha MK usulida olingan ma’lumotlardan foydalanadigan shunga o‘xshash ifoda SpekCalc dasturining asosini tashkil etadi [46, 47]. O‘z-o‘zini yutish $\theta$ kamayishi bilan ortadi va yumshoq fotonlar uchun hamda misning K-chegarasidan biroz yuqorida eng kuchli bo‘ladi. Ko‘p karrali sochilish yakka o‘zaro ta’sirdagi tormozlanish nurlanishining anizotropiyasini tekislaydi, biroq batafsilroq modellarda [105] qo‘llanilmaydigan izotrop yaqinlashuv IMning cheklovi bo‘lib qolmoqda (3.11-bo‘lim).

## 2.4. Xarakteristik nurlanish

Energiyasi K-qobiqning bog‘lanish energiyasi $E_K$ dan (mis uchun 8,979 keV) yuqori bo‘lgan elektron K-qobiqni ionlashtirishi mumkin; vakansiya to‘ldirilganda yoki $\omega_K$ ehtimollik bilan (flyuoressensiya chiqishi, mis uchun 0,454) xarakteristik foton, yoki Oje elektroni chiqariladi [73, 74]. IM eng kuchli to‘rtta chiziqni o‘z ichiga oladi: K$\alpha_1$ (K–L~3~, 8,048 keV), K$\alpha_2$ (K–L~2~, 8,028 keV), K$\beta_1$ (K–M~3~) va K$\beta_3$ (K–M~2~), oxirgi ikkitasi 8,905 keV da; ularning nisbiy intensivliklari $p_j$ (to‘rtta chiziq bo‘yicha normallashtirilgan nurlanish o‘tishlari ehtimolliklari) mos ravishda 0,583; 0,299; 0,078 va 0,040 ga teng; misning L chiziqlari (1 keV dan past) oynada yutiladi. K vakansiyalar bevosita elektron zarbasi natijasida va bilvosita $E_K$ dan yuqori energiyali tormozlanish nurlanishi fotonlarining yutilishi natijasida hosil bo‘ladi. K-qobiq ionizatsiyasining kesimi Grizinskiyning binar to‘qnashuvlar formulasi [57] bilan beriladi:

$$\sigma_K(T) = \frac{\pi e^{4} n_K}{E_K^{2}}\,\frac{1}{U_K}\left(\frac{U_K - 1}{U_K + 1}\right)^{3/2}\left[1 + \frac{2}{3}\left(1 - \frac{1}{2U_K}\right)\ln\left(2{,}7 + \sqrt{U_K - 1}\right)\right]$$

EQNUM[2.9]


bu yerda $U_K = T/E_K$ — ortiqcha kuchlanish nisbati ($U_K \le 1$ da $\sigma_K = 0$), $n_K = 2$ — K-qobiqdagi elektronlar soni, Gauss birliklarida esa $\pi e^{4} = 6{,}5141\times10^{-20}$ sm² keV². Mis uchun kesim 35 keV atrofida taxminan 351 b ga teng keng maksimumga ega (2.2-rasmning (b) qismi), $n_a\sigma_K/S$ ni sekinlashish bo‘yicha integrallash esa har bir tushayotgan 45 keV energiyali elektronga 0,0159 ta K ionizatsiyani beradi. Grizinskiy formulasi bo‘sag‘a yaqinida juda sekin ortgani sababli IM Cu K chiziqlarining intensivligini SpekPyga nisbatan taxminan 26–43 % ga kam baholaydi; SpekPyning K va L nurlanish modeli [104] buzilgan to‘lqinlar Born yaqinlashuvidagi hisoblashlarga [114] tayanadi, ular esa Llovet va hammualliflar tomonidan eksperimental ma’lumotlar bilan birga sharhlangan [115]; bu kamomad past trubka kuchlanishlarida eng katta bo‘ladi (3.1-bo‘lim). Yutilish chegaralari va chiziqlarning energiyalari, flyuoressensiya chiqishlari va nurlanish o‘tishlari ehtimolliklari xraylib kutubxonasidan [60] olingan (o‘tish energiyalari Deslattes va hammualliflar [116] ma’lumotlariga ko‘ra) va anod, oyna va filtr materiallari hamda yuqori Z li bir nechta radiosensibilizatorlar uchun 2.2-jadvalda keltirilgan. K-chegaralari Ag K-chegarasiga yaqin bo‘lgan Mo, Ag va Sn filtrlari dozani kuchaytirish uchun eng samarali bo‘lgan fotonlarni kuchli yutadi (3.4-bo‘lim).



Table: 2.2-jadval. Foydalanilgan elementlarning atom va fizik ma’lumotlari (xraylib; zichliklar ma’lumotnoma jadvallaridan)

| Element | Z | ρ, g/sm³ | E_K, keV | E_L3, keV | Kα₁, keV | ω_K |
|:---|---:|---:|---:|---:|---:|---:|
| Be | 4 | 1,848 | 0,112 | – | – | 0,001 |
| Al | 13 | 2,699 | 1,560 | 0,073 | 1,487 | 0,039 |
| Ni | 28 | 8,902 | 8,333 | 0,855 | 7,478 | 0,421 |
| Cu | 29 | 8,960 | 8,979 | 0,931 | 8,048 | 0,454 |
| Mo | 42 | 10,22 | 20,000 | 2,520 | 17,479 | 0,767 |
| Ag | 47 | 10,50 | 25,514 | 3,351 | 22,163 | 0,831 |
| Sn | 50 | 7,310 | 29,200 | 3,929 | 25,271 | 0,860 |
| I | 53 | 4,930 | 33,169 | 4,557 | 28,612 | 0,882 |
| Gd | 64 | 7,900 | 50,239 | 7,243 | 42,996 | 0,932 |
| Au | 79 | 19,32 | 80,725 | 11,919 | 68,806 | 0,960 |



$j$ chiziqning markaziy nur bo‘ylab bir steradianga va bitta tushayotgan elektronga to‘g‘ri keladigan bevosita chiqishi quyidagiga teng:

$$N_j^{\mathrm{dir}} = \frac{\omega_K\,p_j}{4\pi}\int_{E_K}^{T_0} \frac{n_a\,\sigma_K(T)}{S(T)}\,\exp\left[-\frac{\mu_j\,d(T)}{\sin\theta}\right]\mathrm{d}T$$

EQNUM[2.10]


bu yerda chiziq energiyasi $E_j$ da $\mu_j = \mu(E_j)$, qolgan belgilar esa (2.8) ifodadagi kabi; misning K-chegarasidan pastda joylashgani sababli chiziqlar anodda kuchsiz yutiladi va o‘zlari K-qobiqni ionlashtira olmaydi. Bilvosita flyuoressensiyani hisoblashda elektronlar faqat bir necha mikrometrga, ya’ni K-chegaradan yuqori energiyalardagi susayish uzunliklaridan kichikroq chuqurlikka kirib borgani sababli, tormozlanish nurlanishi anod sirtidagi izotrop nuqtaviy manba bilan ifodalanadi (sirtiy manba yaqinlashuvi). U holda $u = \cos\vartheta$ kattalik ($\vartheta$ — foton yo‘nalishi bilan ichkariga yo‘nalgan normal orasidagi burchak) $-1 \le u \le 1$ oraliqda 1/2 ga teng ehtimollik zichligiga ega, $u > 0$ bo‘lgan foton esa $z$ dan $z + \mathrm{d}z$ gacha chuqurliklarda $(\mu/u)\exp(-\mu z/u)\,\mathrm{d}z$ ehtimollik bilan o‘zaro ta’sirlashadi, bu yerda $\mu = \mu(E)$, shu sababli bitta chiqarilgan fotonga to‘g‘ri keladigan o‘zaro ta’sir chuqurligi zichligi quyidagiga teng:

$$P(z) = \frac{1}{2}\int_{0}^{1} \frac{\mu}{u}\,\mathrm{e}^{-\mu z/u}\,\mathrm{d}u = \frac{\mu}{2}\,\mathrm{E}_1(\mu z)$$

EQNUM[2.11]


bu yerda $t = 1/u$ almashtirish bajarilgan, $\mathrm{E}_1(x) = \int_{1}^{\infty} t^{-1}\mathrm{e}^{-xt}\,\mathrm{d}t$ esa integral eksponensial funksiya. O‘zaro ta’sirlarning $\tau_K(E)/\mu(E)$ ulushi K-qobiqdagi fotoyutilishlardan iborat, bu yerda $\tau_K(E)$ — misning K-qobiq uchun chiziqli fotoelektrik koeffitsiyenti (xraylib kutubxonasidan). Har bir vakansiyaga $\omega_K p_j$ ehtimollik bilan chiqariladigan $j$ chiziq fotoni markaziy nur bo‘ylab $\exp(-b_j z)$ ko‘paytuvchi bilan susayadi, bu yerda $b_j = \mu_j/\sin\theta$. Demak, bir steradianga va energiyasi $E$ bo‘lgan har bir hosil bo‘lgan tormozlanish nurlanishi fotoniga to‘g‘ri keladigan $j$ chiziq chiqishi quyidagiga teng:

$$Y_j(E) = \frac{\omega_K\,p_j}{4\pi}\int_{0}^{\infty} \frac{\tau_K(E)}{\mu(E)}\,P(z)\,\mathrm{e}^{-b_j z}\,\mathrm{d}z = \frac{\omega_K\,p_j}{4\pi}\,\frac{\tau_K(E)}{2}\int_{0}^{\infty} \mathrm{E}_1(\mu z)\,\mathrm{e}^{-b_j z}\,\mathrm{d}z$$

EQNUM[2.12]


Integrallash tartibini almashtirish orqali $\int_{0}^{\infty}\mathrm{E}_1(x)\,\mathrm{e}^{-sx}\,\mathrm{d}x = \int_{1}^{\infty}\mathrm{d}t/[t(t + s)] = \ln(1 + s)/s$ Laplas almashtirishi olinadi, bunda $x = \mu z$ va $s = b_j/\mu$:

$$\int_{0}^{\infty} \mathrm{E}_1(\mu z)\,\mathrm{e}^{-b_j z}\,\mathrm{d}z = \frac{1}{b_j}\ln\left(1 + \frac{b_j}{\mu}\right)$$

EQNUM[2.13]


$Y_j(E)$ ni $N_g(E)$ bilan tortish va K-chegaradan yuqorida integrallash bir steradianga va bitta tushayotgan elektronga to‘g‘ri keladigan bilvosita chiqishni beradi:

$$N_j^{\mathrm{ind}} = \frac{\omega_K\,p_j}{4\pi}\int_{E_K}^{T_0} N_g(E)\,\frac{\tau_K(E)}{2\,b_j}\,\ln\left[1 + \frac{b_j}{\mu(E)}\right]\mathrm{d}E$$

EQNUM[2.14]


$j$ chiziqning to‘liq chiqishi $N_j = N_j^{\mathrm{dir}} + N_j^{\mathrm{ind}}$ ga teng. Bazaviy trubka uchun bilvosita hissa Kα intensivligining 4,5 % ini va Kβ intensivligining 4,8 % ini tashkil etadi; Kβ uchun u biroz kattaroq, chunki bilvosita vakansiyalar o‘rtacha chuqurroqda joylashadi, Kβ fotonlari esa kamroq susayadi. Shu sababli sirtiy manba yaqinlashuvi va sochilgan fotonlarning hisobga olinmasligi chiziqlar intensivliklariga kam ta’sir ko‘rsatadi.

## 2.5. Filtrlash, dasta sifati parametrlari va havodagi kerma

Oyna, qo‘shimcha filtrlar va havodagi susayish sochilgan fotonlarni hisobga olmaydigan, tor dasta uchun Ber–Lambert qonuniga bo‘ysunadi:

$$\mathcal{T}(E) = \exp\left[-\mu_{\mathrm{Be}}(E)\,t_{\mathrm{Be}} - \sum_{i}\mu_i(E)\,t_i - \mu_{\mathrm{air}}(E)\,r\right]$$

EQNUM[2.15]


bu yerda $\mathcal{T}(E)$ — o‘tkazish koeffitsiyenti, $\mu_{\mathrm{Be}}$, $\mu_i$ va $\mu_{\mathrm{air}}$ — mos ravishda berilliy, $i$-qo‘shimcha filtr va havoning chiziqli susayish koeffitsiyentlari, $t_{\mathrm{Be}}$ va $t_i$ — oyna va filtrlarning qalinliklari, $r$ esa fokus–namuna masofasi. Elementlar uchun xraylib kutubxonasidan olingan, kogerent sochilishni ham o‘z ichiga olgan to‘liq massaviy susayish koeffitsiyentlari 2.2-jadvalda keltirilgan zichliklarga ko‘paytiriladi; quruq havo uchun aralashma qoidasi C, N, O va Ar uchun NIST ma’lumotlariga [59] $1{,}205\times10^{-3}$ g/sm³ zichlik bilan qo‘llaniladi, butun masofani havo deb hisoblash esa susayishni biroz ortiqcha baholaydi. U holda namunadagi fotonlarning spektral flyuensi quyidagiga teng:

$$\Phi(E) = \frac{n_e\,Q}{r^{2}}\,\mathcal{T}(E)\left[N_b(E) + \sum_{j} N_j\,\delta(E - E_j)\right]$$

EQNUM[2.16]


bu yerda $\Phi(E)$ — yuza birligiga va birlik energiya oralig‘iga to‘g‘ri keladigan fotonlar soni (sm^−2^ keV^−1^), $Q$ — mA·s larda ifodalangan ekspozitsiya, $n_e = 6{,}242\times10^{15}$ — bir mA·s ga to‘g‘ri keladigan elektronlar soni, $N_j$ — $j$ chiziqning to‘liq chiqishi, $\delta$ esa Dirak delta-funksiyasi. Sonli hisoblashda har bir delta-funksiya $E_j$ ni o‘z ichiga olgan, kengligi $\Delta E$ = 0,05 keV bo‘lgan intervaldagi $N_j/\Delta E$ qiymat bilan almashtiriladi. Spektral energiya flyuensi $\Psi(E) = E\,\Phi(E)$ bo‘lganda trubkaning nurlanish chiqishi havodagi kerma bilan tavsiflanadi [62, 76]:

$$K_{\mathrm{air}} = \int_{0}^{T_0} \Phi(E)\,E\left(\frac{\mu_{en}}{\rho}\right)_{\mathrm{air}}\mathrm{d}E$$

EQNUM[2.17]


bu yerda $(\mu_{en}/\rho)_{\mathrm{air}}$ — xuddi shu usulda olingan quruq havoning massaviy energiya yutilish koeffitsiyenti, 1 keV/g = $1{,}602\times10^{-13}$ Gr. Qat’iy aytganda, (2.17) ifoda to‘qnashuv kermasini beradi; havoda kilovoltli fotonlar uchun u amalda to‘liq kermaga teng [62]. Havo o‘rniga ICRU-44 yumshoq to‘qimasi [61] olinsa, bu ifoda namuna sirtida teskari sochilishni hisobga olmagan holdagi to‘qima kermasini beradi; u 3.6-bo‘limda ekspozitsiya vaqtlarini baholash uchun qo‘llaniladi. SpekPyning o‘z susayish ma’lumotlari bilan filtrlangan SpekPy spektrlari uchun SpekPy hisoblagan havodagi kerma qo‘llaniladi, mis anodli barcha spektrlarning yarim susaytirish qatlamlari (YSQ) va o‘rtacha energiyalari esa ikkala model uchun bir xil usulda hisoblanadi.

Kilovoltli dastalarning sifati asosan birinchi YSQ bilan belgilanadi; u tor dastaning havodagi kermasini ikki baravar kamaytiradigan tayanch yutkichning (odatda alyuminiy yoki misning) qalinligidir [14, 70, 111]. Alyuminiyda YSQ1 = $x_1$ quyidagi shartdan topiladi:

$$\int_{0}^{T_0} \Phi(E)\,E\left(\frac{\mu_{en}}{\rho}\right)_{\mathrm{air}}\exp\left[-\mu_{\mathrm{Al}}(E)\,x_1\right]\mathrm{d}E = \frac{1}{2}\,K_{\mathrm{air}}$$

EQNUM[2.18]


bu yerda $\mu_{\mathrm{Al}}(E)$ — alyuminiyning chiziqli susayish koeffitsiyenti. Havodagi kermani to‘rt baravar kamaytiradigan $x_2$ qalinlik YSQ2 = $x_2 - x_1$ ni (ikkala qalinlik ham biseksiya usulida topiladi) va bir jinslilik koeffitsiyenti $h$ = YSQ1/YSQ2 ni beradi. Effektiv energiya $E_{\mathrm{eff}}$, ya’ni YSQ1 qiymati berilgan dastanikiga teng bo‘lgan monoenergetik dastaning energiyasi, $\mu_{\mathrm{Al}}(E_{\mathrm{eff}}) = \ln 2/\mathrm{YSQ1}$ tenglamadan Brent usuli bilan topiladi, fotonlar flyuensi spektrining o‘rtacha energiyasi esa quyidagiga teng:

$$\bar{E} = \frac{\int_{0}^{T_0} E\,\Phi(E)\,\mathrm{d}E}{\int_{0}^{T_0} \Phi(E)\,\mathrm{d}E}$$

EQNUM[2.19]


bu yerda ikkala integral ham xarakteristik chiziqlarni o‘z ichiga oladi. Ag K-chegarasidan yuqori energiyali fotonlar ulushi $f_{\mathrm{Ag}} = \int_{E_{K,\mathrm{Ag}}}^{T_0}\Phi(E)\,\mathrm{d}E \big/ \int_{0}^{T_0}\Phi(E)\,\mathrm{d}E$, bu yerda $E_{K,\mathrm{Ag}}$ = 25,514 keV, hamda energiya flyuensining tegishli ulushi spektrning kumush to‘qimaga nisbatan eng kuchli yutadigan qismini tavsiflaydi (1.2- va 1.3-bo‘limlar). DEF kabi, YSQlar va o‘rtacha energiya ham absolyut nurlanish chiqishiga emas, balki faqat spektr shakliga bog‘liq.


## 2.6. Dozani kuchaytirish koeffitsiyenti: ta’riflar va hisoblash

Fizik radiokuchaytirish DEF, ya’ni bir xil nurlantirish sharoitida bir nuqtadagi kumushli va kumushsiz holatdagi yutilgan dozalar nisbati bilan miqdoriy baholanadi:

$$\mathrm{DEF} = \frac{D_{t+\mathrm{Ag}}}{D_t}$$

EQNUM[2.20]


bu yerda $D_{t+\mathrm{Ag}}$ va $D_t$ — mos ravishda kumush kiritilgan va kiritilmagan (tayanch) to‘qimadagi yutilgan dozalar. Ushbu makroskopik DEF kumushning bir jinsli taqsimlanganligini va dozalarning hujayralar o‘lchamidan hamda elektronlarning yugurish yo‘llaridan ancha katta hajmlar bo‘yicha o‘rtachalanganligini nazarda tutadi.

50 keV dan past energiyalarda ikkilamchi elektronlarning to‘qimadagi yugurish yo‘llari millimetrdan kichik, shu sababli bo‘linish chegaralari yaqinidan tashqari zaryadli zarralar muvozanati (ZZM) qaror topadi [62, 71] va doza to‘qnashuv kermasiga (1.4), past Z li muhitlarda esa amalda kermaga teng bo‘ladi [76]. (2.17) ifodaga o‘xshash ravishda:

$$D = \int_{0}^{T_0} \Psi(E)\,\frac{\mu_{en}}{\rho}(E)\,\mathrm{d}E$$

EQNUM[2.21]


bu yerda $\Psi(E) = E\,\Phi(E)$ — spektral energiya flyuensi, $\Phi(E)$ — (2.16) formula bilan aniqlanadigan fotonlarning spektral flyuensi, $\mu_{en}/\rho$ — muhitning massaviy energiya yutilish koeffitsiyenti, $T_0$ = 45 keV esa fotonlarning maksimal energiyasi. $\mu_{en}/\rho$ sochilgan va flyuoressensiya fotonlarining energiyasini hisobga olmasligi sababli [75], Ag K rentgen nurlanishi ($\omega_K = 0{,}831$) chiqib ketadi deb faraz qilinadi. Kumushning massa ulushi $w$ bo‘lganda aralashma qoidasi quyidagini beradi [59]

$$\left(\frac{\mu_{en}}{\rho}\right)_{t+\mathrm{Ag}} = (1-w)\left(\frac{\mu_{en}}{\rho}\right)_t + w\left(\frac{\mu_{en}}{\rho}\right)_{\mathrm{Ag}}$$

EQNUM[2.22]


bu yerda $t$ va Ag indekslari to‘qima va kumushni bildiradi; 0,1–2 % massa ulushlari ko‘rib chiqiladi. (2.21) va (2.22) ifodalarni (2.20) formulaga qo‘yib, sirtdagi DEF topiladi:

$$\mathrm{DEF} = \frac{\int \Psi(E)\left[(1-w)\left(\frac{\mu_{en}}{\rho}\right)_t + w\left(\frac{\mu_{en}}{\rho}\right)_{\mathrm{Ag}}\right]\mathrm{d}E}{\int \Psi(E)\left(\frac{\mu_{en}}{\rho}\right)_t\mathrm{d}E}$$

EQNUM[2.23]


Flyuensning normallashtirilishi qisqarib ketadi, shuning uchun DEF faqat spektr shakliga bog‘liq va IM spektrlarining absolyut nurlanish chiqishi kamroq aniq bo‘lsa-da (3.1-bo‘lim), ulardan foydalanish mumkin. Surat $w$ ga nisbatan chiziqli bo‘lgani uchun (2.23) ifoda aniq ravishda quyidagi ko‘rinishni oladi

$$\mathrm{DEF} = 1 + w\left(\langle R\rangle - 1\right)$$

EQNUM[2.24]


bunda

$$\langle R\rangle = \frac{\int \Psi(E)\left(\frac{\mu_{en}}{\rho}\right)_{\mathrm{Ag}}\mathrm{d}E}{\int \Psi(E)\left(\frac{\mu_{en}}{\rho}\right)_t\mathrm{d}E} = \frac{\int R(E)\,d_t(E)\,\mathrm{d}E}{\int d_t(E)\,\mathrm{d}E}$$

EQNUM[2.25]


bu yerda $R(E) = (\mu_{en}/\rho)_{\mathrm{Ag}}/(\mu_{en}/\rho)_t$, $d_t(E) = \Psi(E)\,(\mu_{en}/\rho)_t$ esa kumush kiritilmagan to‘qimaning doza spektri; demak, $R(E)$ ning doza bilan tortilgan o‘rtacha qiymati bo‘lgan $\langle R\rangle$ faqat spektrga bog‘liq. ICRU-44 to‘qimasi uchun $R(E)$ Ag K-chegarasida (25,514 keV) taxminan 32 dan 76 gacha sakraydi va 40–45 keV da taxminan 139 ga yetadi. Shu sababli doza spektrining K-chegaradan yuqoriga siljishi $\langle R\rangle$ ni va qiyalikni oshiradi, bu esa III bobdagi filtrni optimallashtirishning asosidir.

Kumush faqat $z$ chuqurlikda, dastaga g‘alayon kiritmagan holda mahalliy ravishda mavjud bo‘lsa, birlamchi dasta uchun DEF quyidagiga teng:

$$\mathrm{DEF}(z) = \frac{\int \Psi(E)\,e^{-\mu_t(E)\,z}\left[(1-w)\left(\frac{\mu_{en}}{\rho}\right)_t + w\left(\frac{\mu_{en}}{\rho}\right)_{\mathrm{Ag}}\right]\mathrm{d}E}{\int \Psi(E)\,e^{-\mu_t(E)\,z}\left(\frac{\mu_{en}}{\rho}\right)_t\mathrm{d}E}$$

EQNUM[2.26]


bu yerda $\Psi(E)$ — sirtdagi energiya flyuensi, $\mu_t(E) = \rho_t\,(\mu/\rho)_t(E)$ esa zichligi $\rho_t$ = 1,06 g/sm³ bo‘lgan to‘qimaning chiziqli susayish koeffitsiyenti; sochilish va masofa kvadratiga teskari proporsional kamayish hisobga olinmaydi, $z = 0$ ga normallashtirilgan maxraj esa kumush kiritilmagan to‘qimadagi nisbiy birlamchi dozani beradi. To‘qima dastadan birinchi navbatda $R(E)$ kichik bo‘lgan past energiyali fotonlarni chiqarib tashlaydi, shuning uchun DEF chuqurlik ortishi bilan ortadi. Nuqtadan yuqoridagi sohani to‘ldirgan kumush dastani ham susaytiradi; susayish uning $\mu/\rho$ qiymati 5,8 marta ortadigan K-chegaradan bevosita yuqorida eng kuchli bo‘ladi. Sirtdan $z$ dan chuqurroqqacha kumush kiritilgan yassi qatlam uchun:

$$\mathrm{DEF}_{\mathrm{slab}}(z) = \frac{\int \Psi(E)\,e^{-\mu_{t+\mathrm{Ag}}(E)\,z}\left[(1-w)\left(\frac{\mu_{en}}{\rho}\right)_t + w\left(\frac{\mu_{en}}{\rho}\right)_{\mathrm{Ag}}\right]\mathrm{d}E}{\int \Psi(E)\,e^{-\mu_t(E)\,z}\left(\frac{\mu_{en}}{\rho}\right)_t\mathrm{d}E}$$

EQNUM[2.27]


bu yerda $\mu_{t+\mathrm{Ag}}(E) = \rho_t\left[(1-w)(\mu/\rho)_t + w\,(\mu/\rho)_{\mathrm{Ag}}\right]$ — kumush kiritilgan muhitning chiziqli susayish koeffitsiyenti (zichlik taxminan $\rho_t$ ga teng deb olinadi). Qo‘shimcha susayish dastadan asosan eng samarali fotonlarni chiqarib tashlaydi, shuning uchun $\mathrm{DEF}_{\mathrm{slab}}$ chuqurlik ortishi bilan kamayadi (o‘z-o‘zini ekranlash) va endi $w$ ga nisbatan chiziqli bo‘lmaydi. $w$ = 1 % bo‘lganda kumush o‘zining K-chegarasidan bevosita yuqorida dastani taxminan to‘qimaning o‘zi kabi susaytiradi va kumush kiritilgan soha orqasida doza kumushsiz holdagi qiymatidan pastga tushadi.

Tayanch muhit — ICRU-44 yumshoq to‘qimasi (massa bo‘yicha H 10,2, C 14,3, N 3,4, O 70,8, Na 0,2, P 0,3, S 0,3, Cl 0,2 va K 0,3 %; 1,06 g/sm³) [61], muqobillari — suv va ICRUning to‘rt komponentli to‘qimasi; bu tanlov DEFga ta’sir qiladi (3.10-bo‘lim) va ko‘rsatilishi shart. Hujayra ichi miqyosida qisqa yugurish yo‘lli fotoelektronlar va Oje elektronlari o‘z energiyasining katta qismini nanozarrachalar yaqinida qoldiradi [30]; bu makroskopik kuchayish doirasidan tashqariga chiqadigan biologik ta’sirlarni yuzaga keltirishi mumkin (lokal effekt modeli) [31], ular esa foton energiyasiga hamda zarrachalarning o‘lchami, konsentratsiyasi va joylashuviga bog‘liq [97]. Shunday qilib, hisoblangan DEF kimyoviy, biologik va nanomiqyosdagi hissalarni ajratib ko‘rsatish uchun fizik bazaviy daraja bo‘lib xizmat qiladi.

## 2.7. Verifikatsiya uchun Monte-Karlo usuli

Analitik modeldagi Ag K-flyuoressensiyaning chiqib ketishi va sochilishning hisobga olinmasligi mustaqil MK dasturi (`mc_dose.py`) yordamida tekshiriladi; bu dastur PENELOPE, EGSnrc yoki Geant4 dasturlariga [107–109] qaraganda soddaroq, ammo fotonlarning 50 keV dan past energiyalarda ahamiyatli bo‘lgan barcha o‘zaro ta’sirlarini o‘z ichiga oladi. Ko‘ndalang yo‘nalishda cheksiz, 30 mm qalinlikdagi ICRU-44 to‘qimasidan iborat yassi qatlam sirtga normal bo‘ylab tushuvchi keng parallel dasta bilan nurlantiriladi; 2–12 mm chuqurlikdagi qatlamda $w$ = 1 % kumush mavjud bo‘lib, u $\rho_{\mathrm{Ag}} = \rho_t\,w/(1-w)$ parsial zichlik ko‘rinishida qo‘shiladi. Fotonlar energiyasi $E$, chuqurligi $z$ va yo‘nalish kosinusi $u$ bo‘yicha kuzatib boriladi. 45 kV li trubkaning (θ = 12°, 0,5 mm Be, 10 sm havo) filtrsiz va 1 mm Al filtrli SpekPy spektrlaridan foton energiyalari kumulyativ taqsimotni inversiyalash usuli bilan tanlanadi. Erkin yugurish yo‘llari Vudkok usuli (delta-treking) [63, 117] yordamida $\mu_{\max}(E) = \mu_t(E) + \mu_{\mathrm{Ag}}(E)$ majorant bilan tanlanadi, bu yerda $\mu_{\mathrm{Ag}} = \rho_{\mathrm{Ag}}(\mu/\rho)_{\mathrm{Ag}}$:

$$s = -\frac{\ln \xi_1}{\mu_{\max}(E)}$$

EQNUM[2.28]


bu yerda $s$ — yugurish yo‘lining uzunligi, $\xi_1$ — (0, 1) oraliqda tekis taqsimlangan tasodifiy son; yangi $z + u\,s$ chuqurlikda to‘qnashuv quyidagi ehtimollik bilan haqiqiy bo‘ladi:

$$P_{\mathrm{real}} = \frac{\mu(z,E)}{\mu_{\max}(E)}$$

EQNUM[2.29]


bu yerda $\mu(z,E)$ — mahalliy koeffitsiyent (qatlamdan tashqarida $\mu_t$, uning ichida $\mu_t + \mu_{\mathrm{Ag}}$); aks holda to‘qnashuv virtual bo‘ladi, shu sababli chegaralargacha masofalar hech qachon hisoblanmaydi.

O‘zaro ta’sir turi (to‘qimada yoki kumushda fotoyutilish, nokogerent yoki kogerent sochilish) xraylib [60] asosida 1–46 keV oralig‘ida 5 eV qadam bilan jadvallashtirilgan parsial koeffitsiyentlar bo‘yicha tanlanadi. Kumushda fotoyutilish sodir bo‘lgandan so‘ng K-vakansiya (ehtimolligi $\tau_K/\tau$, ya’ni K-qobiqning fotoelektrik kesimdagi ulushi) $\omega_K$ ehtimollik bilan oltita asosiy K chiziqdan birining fotonini chiqaradi; chiziq nurlanish o‘tishlarining ehtimolliklariga muvofiq tanlanadi, foton esa izotrop ravishda ko‘chiriladi; qolgan barcha yutilgan energiya mahalliy ravishda muhitga beriladi. Sochilish burchagi $\vartheta$ nokogerent sochilish funksiyasiga ko‘paytirilgan Kleyn–Nishina kesimi va atom form-faktorining kvadratiga ko‘paytirilgan Tomson kesimining to‘qima uchun tuzilgan jadvallaridan [64] tanlanadi; kumush sochilishga bor-yo‘g‘i bir necha foiz hissa qo‘shadi. Nokogerent sochilishdan keyin foton energiyasi quyidagiga teng bo‘ladi:

$$E' = \frac{E}{1 + \frac{E}{m_e c^2}\left(1 - \cos\vartheta\right)}$$

EQNUM[2.30]


bu yerda $E$ va $E'$ — fotonning sochilishdan oldingi va keyingi energiyalari, $m_e c^2$ = 510,999 keV — elektronning tinchlikdagi energiyasi; yo‘nalish kosinusi $u' = u\cos\vartheta + \sqrt{1-u^2}\,\sin\vartheta\cos\varphi$ ga aylanadi, bunda $\varphi$ $[0, 2\pi)$ oraliqda tekis taqsimlangan. Energiyasi 1 keV dan past fotonlar va ikkilamchi elektronlarning (yugurish yo‘llari bir necha o‘n mikrometr) energiyasi mahalliy ravishda yutiladi, bu esa tushuvchi flyuens birligiga to‘g‘ri keladigan $j$-intervaldagi dozani beradi:

$$D_j = \frac{1}{N}\,\frac{\sum_{i \in j} \varepsilon_i}{\rho_j\,\Delta z}$$

EQNUM[2.31]


bu yerda $\varepsilon_i$ — intervalda muhitga berilgan alohida energiya miqdorlari, $N$ — tushuvchi fotonlar soni, $\rho_j$ — zichlik ($\rho_t$ yoki $\rho_t + \rho_{\mathrm{Ag}}$), $\Delta z$ = 0,25 mm — interval kengligi. MK bo‘yicha DEF $w$ = 1 % va $w = 0$ dagi dozalar nisbati bo‘lib, beshta seriyadagi $4\times10^{6}$ ta foton tarixidan olinadi, seriyalarning tarqoqligi esa standart xatolikni beradi; analitik tayanch qiymatlar ichki (ko‘milgan) qatlamga qo‘llanilgan (2.27) ifoda bo‘yicha hisoblanadi. Hisoblardan oldin ikkita tekshiruv o‘tkazildi: 30 keV li keng dasta uchun sirtdagi dozaning birlamchi kermaga nisbati maydon o‘lchami va manbagacha masofaga bog‘liq bo‘lgan teskari sochilish [118] hisobiga 1,31 ga teng; xraylib ma’lumotlaridan olingan energiya uzatish koeffitsiyenti 20–40 keV da O, C va H uchun NIST $\mu_{en}/\rho$ qiymatlari bilan 0,3 % aniqlikda mos keladi, bu energiyalarda ikkala koeffitsiyent amalda bir xil bo‘ladi.

## 2.8. Ma’lumotlar manbalari, dasturiy realizatsiya va validatsiya strategiyasi

Barcha $\mu_{en}/\rho$ hamda to‘qima, suv va havoning $\mu/\rho$ qiymatlari elementlar uchun tuzilgan NIST jadvallaridan [59, 75] olinadi, birikmalar uchun esa aralashma qoidasi bo‘yicha hisoblanadi. `nist.py` moduli ularni yutilish chegaralari orasida log–log interpolyatsiya qiladi, bu oraliqlarda koeffitsiyentlar taxminan darajali qonunlarga bo‘ysunadi. Elementlarning $\mu/\rho$ qiymatlari, chegaralar va chiziqlar energiyalari, flyuoressensiya chiqishlari, nurlanish o‘tishlari ehtimolliklari va MK dasturidagi kesimlar xraylib 4.3.0 kutubxonasidan [60] olinadi, uning $\mu/\rho$ qiymatlari esa NIST [72] bilan 0,1 % dan yaxshiroq aniqlikda mos keladi.

Biroq xraylib kutubxonasining `CS_Energy` funksiyasi yengil elementlar uchun 15–45 keV da haddan tashqari past $\mu_{en}/\rho$ qiymatlarini qaytaradi: kislorod uchun 30 keV da 0,173 sm²/g o‘rniga 0,108 sm²/g (−37 %), uglerod uchun 0,0661 o‘rniga 0,0515 sm²/g, kumush uchun esa NIST bilan mos keladi (16,58 va 16,60 sm²/g). Asosan O, C va Hdan iborat to‘qima uchun bu funksiya (2.23) ifodaning maxrajini kamaytirib ko‘rsatgan va DEFni oshirib baholagan bo‘lar edi: 1 mm Al bilan 1 % Ag uchun 1,48 o‘rniga 1,62. Bu holat xraylib kesimlariga ta’sir qilmaydi (2.7-bo‘lim), biroq `CS_Energy` funksiyasini past Z li muhitlar uchun qo‘llashdan oldin NIST bo‘yicha tekshirish shart.

Tayanch spektr modeli — SpekPy v2.5.4 [15, 58] (“casim” fizik modeli, 10–50 kV da mis anodlar); u o‘lchangan spektrlar va YSQ qiymatlari bilan solishtirib validatsiya qilingan [51]; uning spektrlari IMni validatsiya qiladi va DEF uchun asosiy kirish ma’lumotlaridir. Dasturda Python 3.13, NumPy [65], SciPy [66] (minimallashtirish va ildiz topish) va Matplotlib [67] qo‘llaniladi.

Yagona moslashtiriladigan parametr — (2.4) ifodadagi elektronlarning chuqurlik koeffitsiyenti $\eta$ — 45 kV, θ = 12° va 0,5 mm Be sharoitida IM va SpekPy tormozlanish nurlanishi spektrlari orasidagi o‘rtacha kvadratik chetlanishni minimallashtiradi; spektrlar 3 keV dan yuqori sohada birlik yuzaga normallashtiriladi, chetlanish esa tayanch spektr maksimumiga nisbatan olinadi; $\eta$ 0,25–0,7 oralig‘ida izlanadi va verguldan keyingi ikki xonagacha yaxlitlanadi, qolgan barcha konfiguratsiyalar esa bashoratlardir. Validatsiya quyidagilarni o‘z ichiga oladi: model komponentlarini tekshirish, masalan, tormozlanish qobiliyatini NIST ESTAR [69] bilan solishtirish (2.2-bo‘lim); 25–50 kV va 6–30° anod burchaklari uchun, 1 mm Al bilan va usiz, SpekPy bilan taqqoslash, shuningdek volfram anodli trubka uchun tekshiruv; IM va SpekPy spektrlari uchun DEFni taqqoslash; MK verifikatsiyasi hamda DEFning sezgirlik tahlili.

## 2.9. Kilovoltli rentgen trubkasi bilan ishlashda radiatsiyaviy xavfsizlik

Mis anodli 45 kV li trubka juda intensiv past energiyali rentgen nurlanishini chiqaradi: 10 sm masofada filtrsiz dastaning havodagi kermasi 383 mGr/(mA·s) ni, ya’ni 40 mA da 15,3 Gr/s ni tashkil etadi, to‘qima sirti esa 2 Gr dozani 0,12 s da oladi, shu sababli qo‘llarning tasodifan nurlantirilishi bir necha soniya ichida og‘ir mahalliy shikastlanishlarga olib keladi. Birlamchi dasta, namuna va tutqichda sochilgan nurlanish hamda g‘ilofdan sizib chiqadigan nurlanish nazorat qilinishi shart. Himoya Radiologik himoya bo‘yicha xalqaro komissiyaning asoslash, optimallashtirish (oqilona erishish mumkin bo‘lgan darajada past, ALARA) va dozani cheklash tamoyillariga [119] asoslanadi; bu tamoyillar Atom energiyasi bo‘yicha xalqaro agentlikning Asosiy xavfsizlik standartlarida [120], O‘zbekistonda esa “Radiatsiyaviy xavfsizlik to‘g‘risida”gi Qonunda [121] o‘z aksini topgan. Kasbiy effektiv va ekvivalent dozalar (teri, qo‘l-oyoqlar, ko‘z gavhari) belgilangan chegaralardan past bo‘lishi shart.

Asosiy choralar texnik xususiyatga ega: ekranlangan g‘ilof, eshigidagi blokirovka qurilmalari yuqori kuchlanishni o‘chiradigan yoki zatvorni yopadigan kamera, ogohlantiruvchi chiroqlar hamda qo‘llarni dastadan tashqarida saqlaydigan qo‘zg‘almas tutqichlar va kollimatorlar. Xodimlarni o‘qitish, ichki qoidalar, shaxsiy dozimetriya va, ayniqsa texnik xizmat ko‘rsatilgandan keyin, doza quvvatini o‘lchash ularni to‘ldiradi. Yuqori kuchlanish generatori qo‘shimcha xavf manbai hisoblanadi, berilliy oynaga esa tegish mumkin emas (berilliy birikmalari zaharli).

Filtrlash xavfsizlikka ham xizmat qiladi: DEFni sezilarli darajada oshiradigan filtrlar (1 mm Al dan 0,2 mm Cu gacha) havodagi kerma quvvatini 120–1300 marta kamaytiradi; 1 mm Al filtr bilan 40 mA da sirtdagi to‘qima kermasi quvvati 16,5 dan 0,137 Gr/s gacha kamayadi, 2 Gr doza uchun zarur vaqt esa 0,12 dan 14,6 s gacha ortadi, bu vaqtni taymer yoki zatvor yordamida nazorat qilish mumkin. Filtr chiqarib tashlaydigan yumshoq komponent yuza qatlamlarda yutilgan bo‘lar edi: 10 mm chuqurlikdagi nisbiy birlamchi doza filtrsiz holda sirtdagi qiymatning 0,009 qismini, 1 mm Al bilan esa 0,44 qismini tashkil etadi. Shunday qilib, dastasini YSQ orqali tavsiflash mumkin bo‘lgan [14], DEFni maksimal darajaga yetkazadigan filtr ALARAga muvofiq teridagi ortiqcha dozani ham kamaytiradi.

## 2.10. II bob bo‘yicha xulosalar

1. Mis anodli qaytaruvchi nishonli rentgen trubkasining qalin nishon uchun yarim analitik modeli (IM) ishlab chiqildi: elektronlarning Bete bo‘yicha sekinlashishi, Elvert ko‘paytuvchisi kiritilgan norelyativistik Bete–Gaytler tormozlanish nurlanishi, bevosita va tormozlanish nurlanishi ta’sirida hosil bo‘ladigan K nurlanish, anodda o‘z-o‘zini yutish, oyna, havo va filtrlarda susayish hamda bitta moslashtiriladigan parametr — elektronlarning chuqurlik koeffitsiyenti $\eta$.
2. Havodagi kerma va dasta sifati parametrlari (YSQ qiymatlari, bir jinslilik koeffitsiyenti, o‘rtacha va effektiv energiyalar) flyuens spektrlaridan hisoblanadi, bunda dasta sifati parametrlari IM va SpekPy uchun bir xil usulda aniqlanadi.
3. ZZM sharoitida DEF $\mu_{en}/\rho$ ning spektr bo‘yicha tortilgan nisbatidan iborat; sirtda $\mathrm{DEF} - 1$ $w$ ga aniq proporsional, qiyalik esa doza spektrining Ag K-chegarasidan yuqoridagi qismi bilan belgilanadi; chuqurlik va kumush kiritilgan qatlam uchun yozilgan shakllar dastaning qattiqlashishini va o‘z-o‘zini ekranlashni tavsiflaydi.
4. Vudkok usulidan foydalanadigan, kompton va reley sochilishini hamda Ag K-flyuoressensiya nurlanishining ko‘chishini hisobga oladigan mustaqil MK dasturi analitik modelning farazlarini tekshiradi.
5. NIST $\mu_{en}/\rho$ qiymatlaridan foydalaniladi, chunki xraylib 4.3.0 kutubxonasining `CS_Energy` funksiyasi yengil elementlar uchun ularni 56 % gacha (kislorod uchun 37 %) kamaytirib ko‘rsatadi, bu esa DEFning oshirib baholanishiga olib kelgan bo‘lar edi (1,48 o‘rniga 1,62).
6. Filtrsiz nurlanish chiqishi (10 sm masofada va 40 mA da 15,3 Gr/s) ekranlash, blokirovkalar va dozimetrik nazoratni talab qiladi; filtrlash doza quvvatini va yuza dozani kamaytiradi.


# III BOB. SPEKTRNI MODELLASHTIRISH VA DOZA KUCHAYISHINI HISOBLASH NATIJALARI

Natijalar II bobda bayon etilgan ishlab chiqilgan model (IM) va tayanch dastur SpekPy v2.5.4 [15, 58] yordamida olindi. Agar boshqacha ko‘rsatilmagan bo‘lsa, 2.1-jadvalda keltirilgan bazaviy sharoitlar qo‘llaniladi: 45 kV o‘zgarmas kuchlanish, θ = 12° anod burchagi, 0,5 mm qalinlikdagi Be oyna, fokus dog‘i bilan namuna orasidagi 10 sm havo qatlami hamda kengligi 0,05 keV bo‘lgan energiya intervallari. Dozani kuchaytirish koeffitsiyenti (DEF) zaryadli zarralar muvozanatini (ZZM) nazarda tutuvchi kerma yaqinlashuvida Radiatsion birliklar va o‘lchovlar bo‘yicha xalqaro komissiyaning (ICRU) ICRU-44 yumshoq to‘qimasi [61] uchun Standartlar va texnologiyalar milliy institutining (NIST) massaviy energiya yutilish koeffitsiyentlari [59] yordamida hisoblanadi; $R(E)$ — Ag va to‘qima uchun ushbu koeffitsiyentlarning nisbati (2.6-bo‘lim).

## 3.1. Ishlab chiqilgan spektr modelining validatsiyasi

Ushbu trubkaning o‘lchangan spektri mavjud bo‘lmagani sababli IM SpekPy v2 bilan solishtirish orqali validatsiya qilindi; SpekPy v2 — mis anodlarni 10–50 kV oralig‘ida qo‘llab-quvvatlaydigan [15] hamda o‘lchangan spektrlar va yarim susaytirish qatlamlari (YSQ) bilan solishtirib validatsiya qilingan [51, 106], fizik modellarga asoslangan deterministik dastur. IMning yagona moslashtiriladigan parametri — (2.4) ifodadagi elektronlarning chuqurlik koeffitsiyenti $\eta$ — faqat tormozlanish nurlanishining uzluksiz spektriga (ikkala dasturda ham chiziqlar o‘chirilgan; 45 kV, θ = 12°, 0,5 mm Be, havosiz) yuza bo‘yicha normallashtirilgan spektrlarning o‘rtacha kvadratik chetlanishini minimallashtirish orqali moslashtirildi:

$$\delta(\eta) = \frac{1}{\max_i b_i}\left[\frac{1}{N}\sum_{i=1}^{N}\left(a_i(\eta) - b_i\right)^2\right]^{1/2}$$

EQNUM[3.1]


bu yerda $a_i(\eta)$ va $b_i$ — mos ravishda IM va SpekPy bo‘yicha $i$-energiya intervalidagi tormozlanish nurlanishi flyuensi bo‘lib, ularning har biri $E_i > 3$ keV bo‘lgan $N$ ta interval bo‘yicha o‘z yig‘indisiga bo‘lingan, $1/\max_i b_i$ esa $\delta$ ni spektr maksimumining ulushi sifatida ifodalaydi. Moslashtirish natijasida $\eta = 0{,}40$ va $\delta = 2{,}46$ % olindi, elektronlar to‘g‘ri chiziq bo‘ylab kirib boradi deb hisoblanganda ($\eta = 1$) esa bu qiymat 8,47 % ga teng bo‘ladi. Shunday qilib, ko‘p karrali elastik sochilish tufayli fotonlar uzluksiz sekinlashish yaqinlashuvidagi (CSDA) to‘g‘ri chiziqli yo‘lning yarmidan kamroq chuqurlikda hosil bo‘ladi — misdagi 45 keV energiyali elektronlar uchun 6,339 mkm (CSDA yugurish yo‘li 6,481 mkm × cos 12°) o‘rniga 2,536 mkm — va yumshoq tormozlanish nurlanishi anodda kamroq o‘z-o‘zini yutishga uchraydi; shu sababli $\eta = 1$ haddan tashqari qattiq spektr beradi. $\eta$ ning qiymati 0,40 da qat’iy belgilab qo‘yilgach, qolgan barcha konfiguratsiyalar uchun olingan natijalar moslashtirish emas, balki bashorat hisoblanadi.

3.1-jadvalda ikki dastur 25–50 kV va 6–30° uchun havo qatlamisiz taqqoslangan. Cu K chiziqlarini olib tashlaydigan 1 mm Al filtr bilan IMning birinchi YSQsi (2.18) SpekPynikidan 3,5–4,6 % ga kichik. Qo‘shimcha filtrlash bo‘lmaganda chetlanish −2,6 % dan −19,4 % gacha bo‘ladi, chunki IM Cu K chiziqlarini taxminan 26–43 % ga past baholaydi, 8 keV li chiziqning kuchsizroq bo‘lishi esa havodagi kermada yumshoqroq 3–8 keV uzluksiz spektrning hissasini oshiradi. Bu kamomad past kuchlanishlarda eng katta bo‘ladi, chunki bunday kuchlanishlarda Grizinskiy kesimi [57] bo‘sag‘adan yuqorida buzilgan to‘lqinlar Born yaqinlashuvidagi hisoblarga [114, 115] nisbatan juda sekin ortadi; SpekPy [104] aynan shu hisoblardan foydalanadi.



Table: 3.1-jadval. Ishlab chiqilgan model (IM) va SpekPy v2 natijalarini Cu anod uchun solishtirish (0,5 mm Be, havosiz)

| U, kV | θ | Filtr | Ē IM, keV | Ē SpekPy, keV | YSQ IM, mm Al | YSQ SpekPy, mm Al | ΔYSQ, % | K-chiziq/torm. IM | K-chiziq/torm. SpekPy |
|:---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 45 | 12° | qo‘shimcha filtrsiz | 10,38 | 10,08 | 0,0407 | 0,0430 | -5,3 | 1,52 | 2,17 |
| 45 | 12° | Al 1,0 mm | 25,60 | 26,10 | 0,794 | 0,826 | -3,9 | – | – |
| 45 | 6° | qo‘shimcha filtrsiz | 10,79 | 10,43 | 0,0451 | 0,0463 | -2,6 | 1,71 | 2,31 |
| 45 | 6° | Al 1,0 mm | 26,13 | 26,67 | 0,868 | 0,901 | -3,6 | – | – |
| 45 | 20° | qo‘shimcha filtrsiz | 10,15 | 9,88 | 0,0367 | 0,0405 | -9,4 | 1,39 | 2,07 |
| 45 | 20° | Al 1,0 mm | 25,34 | 25,79 | 0,759 | 0,789 | -3,8 | – | – |
| 45 | 30° | qo‘shimcha filtrsiz | 10,00 | 9,74 | 0,0334 | 0,0386 | -13,5 | 1,30 | 2,03 |
| 45 | 30° | Al 1,0 mm | 25,20 | 25,59 | 0,740 | 0,768 | -3,6 | – | – |
| 25 | 12° | qo‘shimcha filtrsiz | 8,60 | 8,64 | 0,0250 | 0,0310 | -19,4 | 0,86 | 1,51 |
| 25 | 12° | Al 1,0 mm | 18,12 | 18,42 | 0,429 | 0,449 | -4,5 | – | – |
| 30 | 12° | qo‘shimcha filtrsiz | 9,10 | 9,03 | 0,0304 | 0,0354 | -14,1 | 1,08 | 1,74 |
| 30 | 12° | Al 1,0 mm | 20,23 | 20,60 | 0,533 | 0,559 | -4,6 | – | – |
| 40 | 12° | qo‘shimcha filtrsiz | 9,96 | 9,74 | 0,0381 | 0,0411 | -7,3 | 1,41 | 2,06 |
| 40 | 12° | Al 1,0 mm | 23,93 | 24,39 | 0,713 | 0,745 | -4,2 | – | – |
| 50 | 12° | qo‘shimcha filtrsiz | 10,80 | 10,43 | 0,0427 | 0,0445 | -4,0 | 1,61 | 2,24 |
| 50 | 12° | Al 1,0 mm | 27,18 | 27,71 | 0,871 | 0,902 | -3,5 | – | – |



10 va 30 keV oralig‘ida spektral shakllar taxminan 10 % aniqlik bilan mos keladi (3.1-rasm). IMning uzluksiz spektri 10–20 keV oralig‘ida biroz yuqoriroq, taxminan 25 keV dan yuqorida esa pastroq bo‘lib, spektrlar nisbati 40 keV da 0,80–0,85 gacha pasayadi; spektrning bu kuchsiz yumshashi filtrlangan dastalar YSQsining kichikroq bo‘lishini tushuntiradi. Buning ehtimoliy sabablari quyidagilar: Elvert ko‘paytuvchisi kiritilgan norelyativistik Born kesimidan [56] foydalanilgani, bu kesim esa jadvallashtirilgan kesimlarni [113] faqat taqriban ifodalaydi, hamda nurlanish izotrop chiqariladi deb faraz qilingani, holbuki SpekPy tormozlanish nurlanishining burchak taqsimotini modellashtiradi [105].



![3.1-rasm. 45 kV li mis anodli trubkaning (bazaviy geometriya) SpekPy v2 va ishlab chiqilgan model bo‘yicha qo‘shimcha filtrsiz (chapda) va 1,0 mm Al bilan (o‘ngda) olingan, 9,6 keV dan yuqorida tormozlanish nurlanishi yuzalari teng bo‘ladigan qilib normallashtirilgan spektrlari; pastki panellarda — ularning nisbati.](/home/user/atlant-impossible/dissertation/code/../figures/uz/fig05_validation_cu.png){width=13.5cm}



IM bo‘yicha havodagi kermaning absolyut qiymati SpekPynikidan filtrlashsiz 1,08–1,22 marta, 1 mm Al bilan esa 1,21–1,42 marta katta; bu asosan IMda elektronlarning teskari sochilishi hisobga olinmasligi bilan bog‘liq (misning teskari sochilish koeffitsiyenti taxminan 0,3 ga teng). DEF faqat spektr shakliga bog‘liq bo‘lib, bu farq unga ta’sir qilmaydi; doza quvvatining absolyut qiymatlari SpekPydan olinadi. Misdan boshqa anod materiali uchun tekshiruv sifatida xuddi shu $\eta$ qiymati 50, 80 va 100 kV da 2,5 mm Al bilan filtrlangan volfram anodga qo‘llanildi; bu filtr IMga kiritilmagan W L chiziqlarini olib tashlaydi (3.2-jadval). YSQ chetlanishlari −5,7 % va +0,5 % oralig‘ida yotadi, 50 kV da esa ikkala qiymat Xalqaro elektrotexnika komissiyasining IEC 61267 standartidagi [111] RQR3 dasta sifatining birinchi YSQsi (1,78 mm Al) bilan taqqoslanarli. Mis anoddagi kabi, IM spektrlarining yuqori energiyali “dumi” biroz kuchsizroq (3.2-rasm). Shunday qilib, $\eta$ ning yagona qiymati Z = 29 va Z = 74 bo‘lgan anodlar uchun yaroqli. IMning asosiy zaif tomoni — Cu K chiziqlari intensivligining past baholanishi — filtrlanmagan va Kα chizig‘i ustunlik qiladigan dastalar uchun muhim; shu sababli DEF bo‘yicha asosiy natijalar SpekPy spektrlari yordamida olindi, IM esa mustaqil tekshiruv vositasi sifatida qo‘llanildi.



Table: 3.2-jadval. Modelni W anod uchun tekshirish (θ = 12°, 2,5 mm Al), SpekPy v2 bilan solishtirish

| U, kV | Ē IM, keV | Ē SpekPy, keV | YSQ IM, mm Al | YSQ SpekPy, mm Al | ΔYSQ, % |
|:---|---:|---:|---:|---:|---:|
| 50 | 31,34 | 32,22 | 1,651 | 1,750 | -5,7 |
| 80 | 41,75 | 42,90 | 2,693 | 2,734 | -1,5 |
| 100 | 48,01 | 49,15 | 3,475 | 3,458 | 0,5 |





![3.2-rasm. Volfram anodli trubkaning (θ = 12°, 2,5 mm Al) 50, 80 va 100 kV dagi SpekPy v2 (tutash chiziqlar) va ishlab chiqilgan model (shtrix chiziqlar, η = 0,40) bo‘yicha olingan, teng yuzaga normallashtirilgan spektrlari.](/home/user/atlant-impossible/dissertation/code/../figures/uz/fig06_validation_w.png){width=13.5cm}



## 3.2. 45 kV li mis anodli trubkaning spektri

Bazaviy spektrda (3.3-rasm) Be oyna va havo qatlami taxminan 3 keV dan past energiyali deyarli barcha fotonlarni olib tashlaydi. Uzluksiz spektr taxminan 7–9 keV da platoga ko‘tariladi va Cu K-chegarasida (8,98 keV) keskin pasayadi; bu chegaradan yuqorida anod ancha kuchli yutadi va o‘zi uchun K-chegarali filtr vazifasini bajaradi. So‘ngra spektr tiklanib, 12–13 keV atrofida yassi maksimumga erishadi va 45 keV da nolgacha kamayadi, shu sababli Ag K-chegarasi uning kuchsiz yuqori energiyali qismiga to‘g‘ri keladi. Kengligi 0,05 keV bo‘lgan energiya intervallarida Cu Kα chizig‘i (8,05 keV) qo‘shni uzluksiz spektrdan ikki tartibdan ko‘proq, Kβ chizig‘i (8,91 keV) esa 45–80 marta yuqori.



![3.3-rasm. 45 kV li mis anodli trubkaning (θ = 12°, 0,5 mm Be, 10 sm havo) SpekPy v2 va ishlab chiqilgan model bo‘yicha olingan spektri. Shtrix chiziq Ag K-chegarasini (25,514 keV) ko‘rsatadi.](/home/user/atlant-impossible/dissertation/code/../figures/uz/fig07_baseline.png){width=13.5cm}



SpekPy ma’lumotlariga ko‘ra, xarakteristik fotonlar fotonlar flyuensining 68,5 % qismini tashkil etadi (3.3-jadval), shu sababli filtrlanmagan dasta mohiyatan Cu K nurlanishi manbai hisoblanadi. SpekPy bo‘yicha Kβ/Kα flyuenslar nisbati 0,1431 ga teng bo‘lib, xraylib bo‘yicha nurlanish o‘tishlari ehtimolliklarining nisbatidan (0,134) [60] biroz katta, chunki energiyasi yuqoriroq bo‘lgan Kβ fotonlari chiqish yo‘lida kamroq susayadi. K-chegarasi (8,333 keV, 2.2-jadval) Kα va Kβ energiyalari orasida joylashgan 20 mkm qalinlikdagi Ni filtr bu nisbatni 0,0023 gacha kamaytiradi va rentgen-struktur tahlilidagi klassik β-filtr vazifasini bajaradi [52].

Dasta sifati juda past: o‘rtacha energiya (2.19) 10,38 keV ga teng, birinchi YSQ 50 mkm Al dan kichik, effektiv energiya esa Kα energiyasidan past bo‘lgani sababli yumshoq to‘qimadagi doza asosan Cu K chiziqlari va yumshoq uzluksiz spektr hisobiga hosil bo‘ladi. Fotonlarning atigi 4,64 % qismi Ag K-chegarasidan yuqorida joylashgan bo‘lib, ular energiya flyuensining 14,1 % qismini tashiydi; ularning kermadagi ulushi esa bundan ham kichik, chunki $\mu_{en}/\rho$ energiya ortishi bilan keskin kamayadi. Nurlanish chiqishi juda yuqori: 10 sm masofada 383 mGr/(mA·s), ya’ni 40 mA da 15,3 Gr/s.



Table: 3.3-jadval. Bazaviy spektrning Cu K xarakteristik chiziqlari va dasta sifati parametrlari (45 kV, θ = 12°, 0,5 mm Be, 10 sm havo)

| Kattalik | Ishlab chiqilgan model | SpekPy v2 |
|:---|---:|---:|
| Kα₁ (K–L₃): energiya, keV; nisbiy ehtimollik | 8,048; 0,583 | – |
| Kα₂ (K–L₂): energiya, keV; nisbiy ehtimollik | 8,028; 0,299 | – |
| Kβ₁,₃ (K–M₂,₃): energiya, keV; nisbiy ehtimollik | 8,905; 0,118 | – |
| Bilvosita (foton) K-flyuoressensiya ulushi, % | 4,5 | – |
| O‘rtacha energiya Ē, keV | 10,74 | 10,38 |
| Birinchi YSQ, mm Al | 0,0464 | 0,0478 |
| Ikkinchi YSQ, mm Al | 0,0570 | 0,0563 |
| Bir jinslilik koeffitsiyenti | 0,81 | 0,85 |
| Effektiv energiya, keV | 7,74 | 7,82 |
| Ag K-chegarasidan yuqori fotonlar ulushi, % | 5,04 | 4,64 |
| Ag K-chegarasidan yuqori energiya ulushi, % | 14,7 | 14,1 |
| Havo kermasi (10 sm), mGr/(mA·s) | 423 | 383 |
| Flyuensda xarakteristik fotonlar ulushi, % | – | 68,5 |



## 3.3. Trubka konstruktiv parametrlarining ta’siri

Anod burchagi, trubka kuchlanishi va Be oyna qalinligi bazaviy konfiguratsiya atrofida birma-bir o‘zgartirildi (3.4-jadval). Anod burchagining 6° dan 30° gacha ortishi anodda o‘z-o‘zini filtrlashning kuchsizlanishi hisobiga havodagi kermani 1,56 marta oshiradi: $d$ chuqurlikda hosil bo‘lgan fotonning $d/\sin\theta$ chiqish yo‘li 6° da 30° dagiga qaraganda taxminan 4,8 marta uzun. Bu effekt mis nurlanishni eng kuchli yutadigan sohalarda — spektrning yumshoq qismida va Cu K-chegarasidan bevosita yuqorida — eng kuchli namoyon bo‘ladi, taxminan 25 keV dan yuqorida esa egri chiziqlar deyarli qo‘shilib ketadi (3.4-rasm). Xuddi shu mexanizm “tovon” effektini [16] yuzaga keltiradi; hisoblar markaziy nurga tegishli bo‘lgani uchun bu effekt bu yerda ko‘rib chiqilmaydi. Shunday qilib, kichik anod burchagi fokus dog‘ining effektiv o‘lchamini kichraytiradi, biroq nurlanish chiqishini pasaytiradi va dastani biroz qattiqlashtiradi.



![3.4-rasm. Anod burchagining (6–30°) 45 kV li mis anodli trubka spektriga ta’siri (0,5 mm Be, 10 sm havo; SpekPy v2). Shtrix chiziq Ag K-chegarasini ko‘rsatadi.](/home/user/atlant-impossible/dissertation/code/../figures/uz/fig08_angle.png){width=13.5cm}



Nurlanish chiqishiga trubka kuchlanishi eng kuchli ta’sir ko‘rsatadi; chiqish asosan Cu K chiziqlari hisobiga ortadi, chunki elektronlar K-qobiq ionizatsiyasi kesimi o‘z maksimumiga (taxminan 35 keV da) yaqin bo‘lgan energiyalarda uzunroq yo‘l bosadi. Uzluksiz spektr yuqori energiyalarda kuchli o‘sadi (3.5-rasm), biroq Cu K-chegarasidan bevosita yuqorida deyarli o‘zgarmaydi, chunki bunday fotonlar anodning faqat yupqa sirt qatlamidan chiqa oladi. DEF birorta foton ham Ag K-chegarasiga yetmaydigan 25 kV dagi 1,1932 dan 50 kV dagi 1,2027 gacha ortadi, xolos, demak, filtrlanmagan dasta uchun kuchayish deyarli to‘liq Agning L va M qobiqlaridagi fotoyutilish hisobiga yuzaga keladi; bu sohada $R(E)$ 32 dan oshmaydi (8–25 keV da 21–32).



![3.5-rasm. Mis anodli trubkaning 25–50 kV trubka kuchlanishlaridagi spektrlari (bazaviy geometriya; SpekPy v2). Shtrix chiziq Ag K-chegarasini ko‘rsatadi.](/home/user/atlant-impossible/dissertation/code/../figures/uz/fig09_kvp.png){width=13.5cm}



Be oyna asosan spektrning yumshoq qismiga ta’sir qiladi (3.6-rasm). Berilliy (Z = 4) kuchsiz yutgani sababli oyna qalinligining 0,15 mm dan 2,0 mm gacha ortishi 6 keV dan past energiyali fotonlarning taxminan to‘rtdan uch qismini, biroq Cu K chiziqlari fotonlarining ham taxminan 30 % qismini olib tashlaydi; havodagi kermaning 423 dan 271 mGr/(mA·s) gacha kamayishining asosiy qismi aynan shu fotonlar hisobiga to‘g‘ri keladi. Trubka konstruksiyasi bilan belgilanadigan oyna qalinligini aniq bilish zarur, chunki u nurlanish chiqishini uchdan bir qismdan ko‘proqqa o‘zgartiradi.



![3.6-rasm. Be oyna qalinligining (0,15–2,0 mm) 45 kV li mis anodli trubka spektrining past energiyali qismiga ta’siri (θ = 12°, 10 sm havo; SpekPy v2).](/home/user/atlant-impossible/dissertation/code/../figures/uz/fig10_be.png){width=13.5cm}



Konstruktiv parametrlarning barcha variantlari uchun IM spektrlari SpekPy qiymatlaridan 0,004 dan ko‘p farq qilmaydigan DEF qiymatlarini beradi. Konstruktiv parametrlar nurlanish chiqishini 1,6 (anod burchagi, oyna) va 2,6 (kuchlanish) martagacha o‘zgartirsa-da, 1 % Ag uchun DEF 1,19 va 1,21 oralig‘ida qoladi, chunki har qanday filtrlanmagan dastada to‘qimadagi dozada Cu K chiziqlari va 3–15 keV energiyali fotonlar ustunlik qiladi. Demak, trubka konstruksiyasi DEFni emas, balki doza quvvatini boshqarish vositasi hisoblanadi; DEFni sezilarli darajada oshirish uchun qo‘shimcha filtrlar talab etiladi.



Table: 3.4-jadval. Trubka konstruktiv parametrlarining dasta sifatiga va 1 % Ag uchun DEF ga ta’siri (SpekPy spektrlari; DEF ishlab chiqilgan model bo‘yicha ham)

| Parametr | Qiymat | Ē, keV | YSQ, mm Al | K_havo, mGr/(mA·s) | DEF (SpekPy) | DEF (IM) |
|:---|---:|---:|---:|---:|---:|---:|
| anod burchagi | 6° | 10,73 | 0,0497 | 296 | 1,204 | 1,204 |
| anod burchagi | 12° | 10,38 | 0,0478 | 383 | 1,202 | 1,201 |
| anod burchagi | 20° | 10,20 | 0,0464 | 433 | 1,200 | 1,199 |
| anod burchagi | 30° | 10,07 | 0,0455 | 463 | 1,199 | 1,197 |
| kuchlanish | 25 kV | 8,93 | 0,0402 | 163 | 1,193 | 1,190 |
| kuchlanish | 35 kV | 9,67 | 0,0452 | 277 | 1,198 | 1,197 |
| kuchlanish | 45 kV | 10,38 | 0,0478 | 383 | 1,202 | 1,201 |
| kuchlanish | 50 kV | 10,75 | 0,0487 | 430 | 1,203 | 1,203 |
| Be oyna | 0,15 mm | 10,23 | 0,0454 | 423 | 1,199 | 1,198 |
| Be oyna | 0,5 mm | 10,38 | 0,0478 | 383 | 1,202 | 1,201 |
| Be oyna | 2,0 mm | 10,99 | 0,0528 | 271 | 1,206 | 1,207 |



## 3.4. Qo‘shimcha filtrlarning spektrga ta’siri

Qo‘shimcha filtrlar (2.15) formuladagi Ber–Lambert o‘tkazish koeffitsiyenti bilan tavsiflanadi va uch guruhni tashkil etadi (3.5-jadval): K-chegarasi (1,56 keV) spektrdan pastda joylashgan alyuminiy; K-chegaralari Cu K chiziqlari yaqinida joylashgan nikel va mis; hamda K-chegaralari 20,0; 25,514 va 29,2 keV da joylashgan Mo, Ag va Sn (2.2-jadval). Alyuminiy klassik qattiqlashtiruvchi filtr vazifasini bajaradi (3.7-rasm): uning fotoelektrik kesimi taxminan $E^{-3}$ ga proporsional ravishda kamayadi, shu sababli yumshoq uzluksiz spektr va Cu K chiziqlari Ag K-chegarasidan yuqori energiyali fotonlarga qaraganda ancha samarali olib tashlanadi. 1–2 mm Al bilan Kα chizig‘i deyarli yo‘qoladi. 0,25 mm li filtrdan 0,5 mm li filtrga o‘tilganda YSQ 0,104 dan 0,454 mm Al gacha sakrab ortadi, chunki yupqaroq filtr ortida qolgan Cu K chiziqlari hali ham havodagi kermaning katta qismini tashiydi. Buning evaziga nurlanish chiqishi kamayadi: 1 mm Al doza quvvatini taxminan 120 marta, 2 mm Al esa taxminan 270 marta kamaytiradi.



![3.7-rasm. 45 kV li mis anodli trubkaning 0,25–2,0 mm qalinlikdagi qo‘shimcha Al filtrlar bilan olingan spektrlari (bazaviy geometriya; SpekPy v2). Shtrix chiziq Ag K-chegarasini ko‘rsatadi.](/home/user/atlant-impossible/dissertation/code/../figures/uz/fig11_al.png){width=13.5cm}



Mis filtrlar o‘zini boshqacha tutadi (3.8-rasm): K-chegarasi (8,979 keV) Kα va Kβ energiyalaridan biroz yuqorida joylashgani sababli mis o‘zining K nurlanishi uchun nisbatan shaffof, biroq 9–20 keV uzluksiz spektrni juda kuchli yutadi. 0,1 mm Cu bilan o‘rtacha energiya 0,5 mm Al bilan olingan qiymatga yaqin, biroq YSQ 6,5 marta kichik: o‘rtacha energiya flyuens bo‘yicha tortilgan bo‘lib, qattiq uzluksiz spektrni aks ettiradi, YSQ esa havodagi kerma bo‘yicha tortilgan bo‘lib, o‘tib kelgan Kα chizig‘i bilan belgilanadi, bu chiziq uchun esa havoning $\mu_{en}/\rho$ koeffitsiyenti ancha katta. Faqat 0,2 mm Cu chiziqlarni yetarli darajada bostiradi, bunda havodagi nisbiy kerma $7{,}64 \times 10^{-4}$ ni tashkil etadi. Kβni va 8,33 keV dan bevosita yuqoridagi uzluksiz spektrni olib tashlaydigan 0,02 mm Ni filtr 8 keV li kvazimonoxromatik dastani qoldiradi; bu dasta rentgen-struktur tahlili uchun yaroqli, biroq Ag yordamida dozani kuchaytirish uchun yaroqsiz.



![3.8-rasm. 45 kV li mis anodli trubkaning 0,02 mm Ni filtr va 0,05–0,2 mm qalinlikdagi Cu filtrlar bilan olingan spektrlari (bazaviy geometriya; SpekPy v2). Shtrix chiziq Ag K-chegarasini ko‘rsatadi.](/home/user/atlant-impossible/dissertation/code/../figures/uz/fig12_cu_ni.png){width=13.5cm}



Har bir K-chegarali filtr o‘z chegarasidan pastdagi energiya oralig‘ini o‘tkazadi va chegaradan yuqorida flyuensni bir necha marta va undan ham ko‘proq kamaytiradi (3.9-rasm). Shu sababli 0,05 mm Ag filtr aynan Ag yordamida kuchaytirish uchun eng foydali bo‘lgan, 25,5 keV dan yuqori energiyali fotonlarni olib tashlaydi: uning YSQsi 0,5 mm Al filtrnikidan katta bo‘lsa-da, Ag K-chegarasidan yuqorida fotonlarning atigi 20,1 % qismi joylashadi (Al filtr bilan esa 38,2 %). Qalay 25,5–29,2 keV oralig‘ini saqlab qoladi, biroq $R(E)$ eng katta bo‘lgan 29,2 keV dan yuqori energiyali fotonlarni olib tashlaydi, shu sababli 0,1 mm Sn 1 mm Al ga qaraganda biroz kattaroq YSQ bersa-da, Ag K-chegarasidan yuqorida kamroq foton qoldiradi (mos ravishda 40,4 % va 49,8 %). Demak, o‘rtacha energiya ham, YSQ ham alohida olinganda spektrning Ag uchun muhim bo‘lgan sohasini tavsiflamaydi. DEF Ag K-chegarasidan yuqori energiyali fotonlar ulushiga faqat kermada Cu K chiziqlari ustunlik qilmagan holdagina muvofiq ravishda o‘zgaradi: fotonlarning 55,1 % qismi chegaradan yuqorida bo‘lishiga qaramay, 0,1 mm Cu atigi 1,288 ga teng DEF beradi, chunki to‘qimadagi dozaning asosiy qismini o‘tib kelgan Kα chizig‘i beradi.



![3.9-rasm. 45 kV li mis anodli trubkaning Mo 0,05 mm, Ag 0,05 mm hamda Sn 0,05 va 0,1 mm filtrlardan o‘tgan spektrlarining 1,0 mm Al bilan olingan spektr bilan taqqoslanishi; spektrlar Al bilan filtrlangan spektr maksimumiga nisbatan ko‘rsatilgan (SpekPy v2). Shtrix chiziq Ag K-chegarasini ko‘rsatadi.](/home/user/atlant-impossible/dissertation/code/../figures/uz/fig13_kedge.png){width=13.5cm}





Table: 3.5-jadval. Turli qo‘shimcha filtrlar uchun dasta sifati parametrlari, havodagi nisbiy kerma va DEF (1 % Ag) (45 kV, θ = 12°, 0,5 mm Be, 10 sm)

| Filtr | Ē, keV | YSQ, mm Al | Ag K-chegarasidan yuqori fotonlar, % | K/K₀ | DEF (SpekPy) | DEF (IM) |
|:---|---:|---:|---:|---:|---:|---:|
| qo‘shimcha filtrsiz | 10,38 | 0,048 | 4,6 | 1 | 1,202 | 1,201 |
| Al 0,25 mm | 19,73 | 0,104 | 25,8 | 0,0588 | 1,265 | 1,271 |
| Al 0,5 mm | 23,78 | 0,454 | 38,2 | 0,0173 | 1,377 | 1,369 |
| Al 1,0 mm | 26,13 | 0,830 | 49,8 | 0,00829 | 1,482 | 1,464 |
| Al 2,0 mm | 28,59 | 1,270 | 65,0 | 0,00372 | 1,623 | 1,601 |
| Cu 0,05 mm | 15,37 | 0,058 | 22,0 | 0,0967 | 1,221 | 1,226 |
| Cu 0,1 mm | 24,08 | 0,070 | 55,1 | 0,0127 | 1,288 | 1,311 |
| Cu 0,2 mm | 33,09 | 1,403 | 91,2 | 0,000764 | 1,804 | 1,843 |
| Ni 0,02 mm | 12,09 | 0,052 | 10,3 | 0,339 | 1,208 | 1,210 |
| Sn 0,05 mm | 23,53 | 0,606 | 34,3 | 0,00986 | 1,385 | 1,376 |
| Sn 0,1 mm | 24,70 | 0,902 | 40,4 | 0,00387 | 1,444 | 1,433 |
| Sn 0,2 mm | 25,62 | 1,208 | 51,2 | 0,0011 | 1,524 | 1,515 |
| Ag 0,05 mm | 23,04 | 0,624 | 20,1 | 0,0067 | 1,342 | 1,335 |
| Mo 0,05 mm | 22,16 | 0,369 | 31,5 | 0,00835 | 1,337 | 1,330 |



## 3.5. Ag kiritilgan yumshoq to‘qimada dozani kuchaytirish koeffitsiyenti

DEF spektr bilan tortilgan ikki integralning nisbati bo‘lib (2.23), u dozaning integral ostidagi funksiyasi $E\,\Phi(E)\,\mu_{en}/\rho$ ning energiya bo‘yicha taqsimoti bilan aniqlanadi (3.10-rasm). Filtrlash bo‘lmaganda integral ostidagi funksiyada Cu K chiziqlari va 3–15 keV uzluksiz spektr ustunlik qiladi, taxminan 20 keV dan yuqorida esa u o‘z maksimumining $10^{-4}$ qismidan pastga tushadi, chunki bu energiyalarda to‘qimaning $\mu_{en}/\rho$ koeffitsiyenti juda kichik; shu sababli Ag K-chegarasidan yuqori energiyali fotonlar dozaga deyarli hissa qo‘shmaydi. Ustunlik qiluvchi sohada $R(E)$ 8 keV da atigi 21,1 ga va 15 keV da 27,0 ga teng, shuning uchun 1 % Ag integral ostidagi funksiyani deyarli bir tekis, taxminan 20 % ga oshiradi. 1 mm Al bilan integral ostidagi funksiya 15 va 45 keV oralig‘ida jamlangan, Ag kiritilgan to‘qimaning integral ostidagi funksiyasi sakrab ortadigan Ag K-chegarasidan yuqorida esa $R(E)$ 25,6 keV dagi 76,8 dan 45 keV dagi 138,5 gacha ortadi. Bu dasta fotonlarining taxminan yarmi chegaradan yuqorida joylashgani sababli kuchayishning katta qismi aynan shu sohaga to‘g‘ri keladi.



![3.10-rasm. ICRU-44 yumshoq to‘qimasi (soyalangan soha) va 1 % Ag saqlovchi to‘qima (chiziq) uchun dozaning integral ostidagi funksiyasi $E\,\Phi(E)\,\mu_{en}/\rho$: filtrlashsiz (chapda) va 1,0 mm Al bilan (o‘ngda); 45 kV li mis anodli trubka, SpekPy v2. Shtrix chiziq Ag K-chegarasini ko‘rsatadi.](/home/user/atlant-impossible/dissertation/code/../figures/uz/fig14_integrand.png){width=13.5cm}



Har bir filtr uchun DEF Ag massa ulushi $w$ ga chiziqli bog‘liq ravishda ortadi (3.11-rasm, 3.6-jadval), bu esa aralashma qoidasidan (2.24) kelib chiqadi: $\mathrm{DEF} = 1 + w(\langle R\rangle - 1)$, bu yerda $\langle R\rangle$ — $R(E)$ ning Ag kiritilmagan to‘qimaning doza spektri bilan tortilgan o‘rtacha qiymati (2.25). 1 % Agga to‘g‘ri keladigan qiyalik filtrsiz holdagi 0,202 dan 0,2 mm Cu bilan 0,804 gacha, ya’ni $\langle R\rangle$ taxminan 21 dan 81 gacha ortadi. 1 % Ag uchun DEF filtrsiz 1,20 ga, 1 mm Al bilan 1,48 ga, 2 mm Al bilan 1,62 ga va 0,2 mm Cu bilan 1,80 ga teng, 0,1 % Agda (to‘qimaning bir grammiga 1 mg Ag) esa kuchayish atigi 2–8 % ni tashkil etadi. Filtrlarning tartiblanishi (3.5-jadval) DEF o‘rtacha energiyaga emas, balki dozaning integral ostidagi funksiyasining Ag K-chegarasidan yuqoridagi ulushiga muvofiq o‘zgarishini tasdiqlaydi: Ni filtr ortidagi deyarli sof Kα dastasi filtrlanmagan dasta bilan amalda bir xil DEF beradi (mos ravishda 1,208 va 1,202), YSQ qiymatlari yaqin bo‘lganda esa 0,1 mm Sn 1 mm Al ga qaraganda kichikroq DEF beradi (mos ravishda 1,444 va 1,482). Qat’iy chiziqlilik sirtda o‘rinli; Ag kiritilgan katta soha ichida esa Agning o‘zi tomonidan susaytirish bog‘lanishni nochiziqli qiladi (3.7-bo‘lim).



![3.11-rasm. Turli qo‘shimcha filtrlar uchun ICRU-44 yumshoq to‘qimasida dozani kuchaytirish koeffitsiyentining Ag massa ulushiga bog‘liqligi (SpekPy v2 spektrlari, sirtda kerma yaqinlashuvi).](/home/user/atlant-impossible/dissertation/code/../figures/uz/fig15_def_conc.png){width=13.5cm}



SpekPyga nisbatan IM beradigan DEF 0,5–2 mm Al bilan 0,6–1,3 % ga, Sn, Ag va Mo filtrlar bilan esa 1 % dan kamroqqa past bo‘ladi; bu uning yuqori energiyali “dumi” kuchsizroq ekanligiga mos keladi. Qolgan Cu K chiziqlari kermaning katta qismini tashiydigan hollarda IM bo‘yicha DEF yuqoriroq bo‘ladi: 0,25 mm Al uchun 0,5 % ga, 0,1 va 0,2 mm Cu uchun esa taxminan 2 % ga, chunki past baholangan chiziqlar dozani qattiq uzluksiz spektr tomon siljitadi. Bu farqlar filtrlar orasidagi farqlarga nisbatan kichik, shuning uchun DEF spektr modeliga nisbatan barqaror. Tayanch muhit sifatida ICRU-44 to‘qimasi o‘rniga suv olinganda filtrlangan dastalar uchun 1 % Agdagi DEF 1,3 % gacha yuqori bo‘ladi (1 mm Al bilan 1,4965 va 0,2 mm Cu bilan 1,8274). ICRU-44 to‘qimasida kislorod suvdagiga qaraganda kamroq bo‘lsa-da, uning tarkibidagi massa bo‘yicha 1,3 % Na, P, S, Cl va K 15–40 keV da uning $\mu_{en}/\rho$ koeffitsiyentini suvnikidan oshiradi va shu bilan DEFni kamaytiradi.



Table: 3.6-jadval. Turli filtrlar uchun yumshoq to‘qima (ICRU-44) dozasini kuchaytirish koeffitsiyentining Ag massa ulushiga bog‘liqligi (SpekPy spektrlari)

| Filtr | w = 0,1 % | w = 0,2 % | w = 0,5 % | w = 1,0 % | w = 2,0 % | (DEF−1)/w, 1 % ga |
|:---|---:|---:|---:|---:|---:|---:|
| qo‘shimcha filtrsiz | 1,020 | 1,040 | 1,101 | 1,202 | 1,403 | 0,202 |
| Al 0,25 mm | 1,026 | 1,053 | 1,132 | 1,265 | 1,530 | 0,265 |
| Al 0,5 mm | 1,038 | 1,075 | 1,189 | 1,377 | 1,755 | 0,377 |
| Al 1,0 mm | 1,048 | 1,096 | 1,241 | 1,482 | 1,964 | 0,482 |
| Al 2,0 mm | 1,062 | 1,125 | 1,312 | 1,623 | 2,246 | 0,623 |
| Cu 0,05 mm | 1,022 | 1,044 | 1,111 | 1,221 | 1,442 | 0,221 |
| Cu 0,1 mm | 1,029 | 1,058 | 1,144 | 1,288 | 1,575 | 0,288 |
| Cu 0,2 mm | 1,080 | 1,161 | 1,402 | 1,804 | 2,608 | 0,804 |
| Ni 0,02 mm | 1,021 | 1,042 | 1,104 | 1,208 | 1,417 | 0,208 |
| Sn 0,05 mm | 1,038 | 1,077 | 1,193 | 1,385 | 1,771 | 0,385 |
| Sn 0,1 mm | 1,044 | 1,089 | 1,222 | 1,444 | 1,888 | 0,444 |
| Sn 0,2 mm | 1,052 | 1,105 | 1,262 | 1,524 | 2,049 | 0,524 |
| Ag 0,05 mm | 1,034 | 1,069 | 1,171 | 1,342 | 1,685 | 0,342 |
| Mo 0,05 mm | 1,034 | 1,067 | 1,168 | 1,337 | 1,674 | 0,337 |



## 3.6. Filtrlashni optimallashtirish

Har qanday filtr DEFni doza quvvati hisobiga oshiradi, shu sababli optimal filtr berilgan o‘tkazish koeffitsiyentida DEFni maksimal qiladi. 3.12-rasmda (filtrlanmagan SpekPy spektriga xraylib susayish koeffitsiyentlari qo‘llanilgan) Al va Ti egri chiziqlari amalda ustma-ust tushadi va 1 dan taxminan $10^{-3}$ gacha bo‘lgan oraliqda eng yuqorida joylashadi, Ni va Cu egri chiziqlari esa Cu Kα chizig‘i filtrdan o‘tishda davom etar ekan, pastda qoladi. K-chegarali filtrlar ortda qoladi: Sn egri chizig‘i o‘tkazish koeffitsiyenti taxminan 10 % gacha kamayguncha Ti egri chizig‘i bilan amalda ustma-ust tushadi, undan kichik o‘tkazish koeffitsiyentlarida esa Al va Tidan pastda joylashadi, Mo egri chizig‘i 1,4 atrofida to‘yinadi, Ag egri chizig‘i esa taxminan 1,35 ga teng maksimumdan o‘tadi.



![3.12-rasm. Qalinligi ortib boruvchi Al, Ti, Ni, Cu, Mo, Ag va Sn filtrlar uchun 1 % Ag holida dozani kuchaytirish koeffitsiyentining havodagi nisbiy kermaga bog‘liqligi (45 kV li mis anodli trubka, bazaviy geometriya; SpekPy v2).](/home/user/atlant-impossible/dissertation/code/../figures/uz/fig16_tradeoff.png){width=13.5cm}



Tizimli taqqoslash uchun har bir filtrning $t$ qalinligi havodagi kerma bo‘yicha o‘tkazish koeffitsiyentlarining tengligi sharti bilan belgilandi:

$$\mathcal{T}_K(t) = \frac{\int_{0}^{T_0} \Phi_0(E)\,E\,\left(\mu_{en}/\rho\right)_{\mathrm{air}}\exp\left[-\mu_f(E)\,t\right]\mathrm{d}E}{\int_{0}^{T_0} \Phi_0(E)\,E\,\left(\mu_{en}/\rho\right)_{\mathrm{air}}\,\mathrm{d}E}$$

EQNUM[3.2]


bu yerda $\mathcal{T}_K(t)$ — havodagi kerma bo‘yicha o‘tkazish koeffitsiyenti, $\Phi_0(E)$ — filtrlanmagan dastaning flyuens spektri, $(\mu_{en}/\rho)_{\mathrm{air}}$ — havoning massaviy energiya yutilish koeffitsiyenti, $\mu_f(E)$ — filtr elementining chiziqli susayish koeffitsiyenti, $T_0$ = 45 keV esa fotonlarning maksimal energiyasi. (3.2) tenglama Al (Z = 13) dan Bi (Z = 83) gacha bo‘lgan elementlar uchun $\mathcal{T}_K$ = 10 %, 1 % va 0,1 % qiymatlarida yechildi; bunda gazlar, suyuqliklar, P, S, Se, ishqoriy metallar, radioaktiv elementlar, Tl va Gddan boshqa lantanoidlar chiqarib tashlandi (3.13-rasm; tanlangan elementlar uchun natijalar 3.7-jadvalda keltirilgan).

Zga bog‘liqlik yutilish chegaralarining Cu chiziqlari va Ag K-chegarasiga nisbatan joylashuvini aks ettiradi; 10 % o‘tkazish koeffitsiyentida barcha elementlar hali 1,220–1,241 qiymatlarni beradi. K-chegaralari Cu Kα energiyasidan pastda joylashgan Aldan Cogacha bo‘lgan elementlar (Z = 13–27) Cu chiziqlarini kuchli yutadi, Nidan Asgacha bo‘lgan elementlar (Z = 28–33) uchun esa K-chegara Kαdan yuqorida joylashgan, o‘tib kelgan chiziq kermada ustunlik qiladi va bu elementlar 10 % va 1 % da eng yomon filtrlar hisoblanadi. Srdan Aggacha bo‘lgan elementlar (Z = 38–47) Ag K-chegarasidan yuqori energiyali fotonlarni yutadi va 0,1 % da chuqur minimum hosil qiladi, eng past qiymatlar Ag, Pd va Rh uchun olinadi (1,335–1,346); K-chegaralari Ag K-chegarasidan yuqorida joylashgan Cddan Bagacha bo‘lgan elementlar (Z = 48–56) uchun DEF Z ortishi bilan ortadi. Og‘irroq elementlar L-qobiqdagi yutilish orqali ta’sir qiladi: L3 chegarasi (7,243 keV) Kαdan pastda joylashgan Gd yengil yutkichlar kabi o‘zini tutadi, Hfdan Bigacha bo‘lgan elementlar uchun esa L3 chegaralari Kαdan yuqorida joylashgan (Au uchun 11,919 keV, 2.2-jadval), W, Au va Pb esa 1 % da atigi 1,350–1,351 qiymatlarni beradi.



![3.13-rasm. Qalinligi havodagi kerma bo‘yicha bir xil — 10 %, 1 % va 0,1 % o‘tkazish koeffitsiyentini ta’minlaydigan, Z = 13–83 elementlardan tayyorlangan filtrlar bilan 1 % Ag uchun dozani kuchaytirish koeffitsiyenti (45 kV li mis anodli trubka, bazaviy geometriya; SpekPy v2).](/home/user/atlant-impossible/dissertation/code/../figures/uz/fig17_filter_scan.png){width=13.5cm}



Yengil va o‘rtacha Z li yutkichlar orasida Al, Si, Ca, Sc va Ti 10 % va 1 % o‘tkazish koeffitsiyentlarida amalda bir xil DEF beradi, 0,1 % da esa Ca, Sc, Ti va V 1,907, Al esa 1,884, ya’ni 1,2 % kamroq qiymat beradi. Kalsiy va skandiy filtr folgasi sifatida yaroqsiz bo‘lgani sababli amaliy materiallar Al va Ti hisoblanadi. Titan uchun ancha yupqa folga talab etiladi (1 % da 824,4 mkm o‘rniga 111,2 mkm) va u kuchli susaytirishda biroz samaraliroq, chunki qalinligi bir necha millimetr bo‘lgan Al filtrda energiyaga kuchsiz bog‘liq bo‘lgan kompton sochilishi qattiq fotonlarning susayishiga kattaroq hissa qo‘shadi.



Table: 3.7-jadval. Havo kermasini bir xil o‘tkazishda filtr materiallari: talab etiladigan qalinlik va DEF (1 % Ag)

| Filtr | Z | t (10 %), mkm | DEF (10 %) | t (1 %), mkm | DEF (1 %) | t (0,1 %), mkm | DEF (0,1 %) |
|:---|---:|---:|---:|---:|---:|---:|---:|
| Al | 13 | 188,8 | 1,241 | 824,4 | 1,454 | 4748,3 | 1,884 |
| Ti | 22 | 29,0 | 1,236 | 111,2 | 1,452 | 634,6 | 1,907 |
| Co | 27 | 12,1 | 1,226 | 50,7 | 1,397 | 181,3 | 1,901 |
| Cu | 29 | 47,5 | 1,221 | 102,8 | 1,307 | 180,8 | 1,736 |
| Mo | 42 | 15,6 | 1,231 | 44,3 | 1,330 | 134,7 | 1,380 |
| Ag | 47 | 11,1 | 1,233 | 36,8 | 1,336 | 138,1 | 1,335 |
| Sn | 50 | 13,8 | 1,236 | 48,4 | 1,384 | 204,2 | 1,529 |
| I | 53 | 17,7 | 1,238 | 63,2 | 1,419 | 294,6 | 1,692 |
| Gd | 64 | 8,7 | 1,232 | 27,3 | 1,431 | 125,5 | 1,883 |
| W | 74 | 7,0 | 1,226 | 15,6 | 1,350 | 34,4 | 1,862 |



Nurlantirish tajribasi uchun 3.8-jadvalda namuna sirtidagi to‘qima kermasi va $I$ trubka tokida $D$ dozani berish uchun zarur vaqt keltirilgan:

$$t_D = \frac{D}{c\,I\int_{0}^{T_0} \Phi(E)\,E\,\left(\mu_{en}/\rho\right)_t\,\mathrm{d}E}$$

EQNUM[3.3]


bu yerda $D$ = 2 Gr, $I$ = 40 mA, $\Phi(E)$ — 10 sm masofadagi, trubka zaryadi birligiga to‘g‘ri keladigan flyuens spektri (sm^−2^ keV^−1^ (mA·s)^−1^), $(\mu_{en}/\rho)_t$ ICRU-44 to‘qimasiga tegishli, $c = 1{,}602 \times 10^{-13}$ Gr·g·keV^−1^ esa keV/g ni Gr ga o‘tkazadi; ZZM sharoitida bu kerma teskari sochilishni hisobga olmaganda sirtdagi yutilgan dozaga teng (2.5-bo‘lim). Filtrsiz 2 Gr doza 0,12 s da beriladi, bunday vaqtni takrorlanuvchan tarzda ta’minlash qiyin, 1 mm va 2 mm Al bilan esa mos ravishda 14,6 va 32,5 s talab etiladi. 0,2 mm Cu filtr o‘rganilgan filtrlar orasidagi eng yuqori DEF qiymatiga (1,80) faqat juda kuchli susaytirish hisobiga erishadi (0,1 % ga teng bir xil o‘tkazish koeffitsiyentida Cu 1,74, Al va Ti esa 1,88–1,91 beradi); u 158,4 s ni talab qiladi, uning DEF qiymati esa qalinlikka keskin bog‘liq (3.12-rasm), bu esa uni qalinlikning ruxsat etilgan chetlanishlariga sezgir qiladi.



Table: 3.8-jadval. Namuna sirtida to‘qima kermasining quvvati (10 sm, 40 mA) va 2 Gr doza berish uchun vaqt

| Filtr | To‘qima kermasi, mGr/(mA·s) | Kerma quvvati, Gr/s | 2 Gr uchun vaqt, s | DEF (1 % Ag) |
|:---|---:|---:|---:|---:|
| qo‘shimcha filtrsiz | 412,9 | 16,52 | 0,12 | 1,202 |
| Al 0,5 mm | 7,15 | 0,286 | 6,99 | 1,377 |
| Al 1,0 mm | 3,42 | 0,137 | 14,6 | 1,482 |
| Al 2,0 mm | 1,54 | 0,062 | 32,5 | 1,623 |
| Cu 0,1 mm | 5,24 | 0,210 | 9,55 | 1,288 |
| Cu 0,2 mm | 0,32 | 0,013 | 158,4 | 1,804 |
| Sn 0,1 mm | 1,60 | 0,064 | 31,3 | 1,444 |
| Ag 0,05 mm | 2,76 | 0,110 | 18,1 | 1,342 |



Shunday qilib, mis anodli trubka bilan Ag yordamida dozani kuchaytirishda filtrlash hal qiluvchi konstruktiv vosita hisoblanadi. Qulay ekspozitsiya vaqtlarini ta’minlaydigan 1–2 mm qalinlikdagi alyuminiy yoki 0,1–0,3 mm qalinlikdagi titan optimal tanlov hisoblanadi. Chegaralari 20–30 keV da joylashgan K-chegarali filtrlardan (Mo, Ag, Sn) va Cu Kα chizig‘ini o‘tkazadigan filtrlardan (Ni, yupqa Cu) foydalanmaslik kerak.


## 3.7. Chuqurlikka bog‘liqlik va o‘z-o‘zini ekranlash

Namunalar, fantomlar yoki hayvonlarda Ag kiritilgan nishon to‘qima ostida joylashganligi sababli, SpekPy spektrlari yordamida birlamchi dasta uchun kerma yaqinlashuvida (sochilish 3.9-bo‘limda baholanadi) ikki holat hisoblandi: Ag kiritilmagan to‘qimada $z$ chuqurlikda joylashgan, Ag kiritilgan kichik soha ((2.26) formula) va sirtdan $z$ chuqurlikkacha Ag bir tekis kiritilgan soha ((2.27) formula). Birinchi holatda DEF chuqurlik ortishi bilan monoton ortadi (3.14-rasm; 3.9-jadvalda sirtdagi $D_0$ dozaga nisbatan $D/D_0$ doza ham keltirilgan), chunki to‘qima past energiyali fotonlarni birinchi navbatda yutadi va flyuensni Ag/to‘qima $\mu_{en}/\rho$ nisbati kattaroq bo‘lgan energiyalar tomon siljitadi. Filtr bo‘lmaganda 1 % Ag uchun DEF 1,20 dan 20 mm chuqurlikda 1,56 gacha ortadi, biroq Cu K chiziqlari va yumshoq tormozlanish nurlanishi yutilishi natijasida doza 10 mm chuqurlikda 0,0090 gacha kamayadi: to‘qima qo‘shimcha filtr vazifasini bajaradi (3.4-bo‘lim). Dastani allaqachon qattiqlashtirgan Al 1 mm filtr bilan DEF 20 mm chuqurlikda bor-yo‘g‘i 1,69 gacha ortadi, doza esa 10 mm chuqurlikda atigi 0,439 gacha kamayadi.



![3.14-rasm. 1 % Ag uchun dozani kuchaytirish koeffitsiyentining Ag kiritilmagan yumshoq to‘qimadagi Ag kiritilgan soha chuqurligiga bog‘liqligi: filtrlanmagan 45 kV li dasta va to‘rtta qo‘shimcha filtr uchun (SpekPy, birlamchi dasta, kerma yaqinlashuvi).](/home/user/atlant-impossible/dissertation/code/../figures/uz/fig18_def_depth.png){width=13.5cm}





Table: 3.9-jadval. Tanlangan filtrlar uchun DEF (1 % Ag) va nisbiy dozaning yumshoq to‘qimadagi chuqurlikka bog‘liqligi (birlamchi dasta)

| Filtr | 0 mm | 1 mm | 3 mm | 5 mm | 10 mm | 20 mm |
|:---|---:|---:|---:|---:|---:|---:|
| qo‘shimcha filtrsiz, DEF | 1,202 | 1,215 | 1,261 | 1,338 | 1,444 | 1,564 |
| qo‘shimcha filtrsiz, D/D₀ | 1,000 | 0,328 | 0,0601 | 0,0222 | 0,0090 | 0,0036 |
| Al 0,5 mm, DEF | 1,377 | 1,401 | 1,435 | 1,463 | 1,525 | 1,630 |
| Al 0,5 mm, D/D₀ | 1,000 | 0,826 | 0,622 | 0,496 | 0,310 | 0,147 |
| Al 1,0 mm, DEF | 1,482 | 1,494 | 1,518 | 1,541 | 1,595 | 1,689 |
| Al 1,0 mm, D/D₀ | 1,000 | 0,909 | 0,759 | 0,642 | 0,439 | 0,229 |
| Cu 0,1 mm, DEF | 1,288 | 1,383 | 1,640 | 1,772 | 1,838 | 1,897 |
| Cu 0,1 mm, D/D₀ | 1,000 | 0,452 | 0,171 | 0,122 | 0,0894 | 0,0557 |
| Sn 0,1 mm, DEF | 1,444 | 1,451 | 1,465 | 1,479 | 1,511 | 1,573 |
| Sn 0,1 mm, D/D₀ | 1,000 | 0,918 | 0,779 | 0,666 | 0,460 | 0,235 |



0,1 mm Cu bilan filtrlangan dasta Cu Kα chizig‘i va qattiq “dum”dan iborat (3.4-bo‘lim); to‘qima Kα chizig‘ini yutgach, DEF 1,29 dan 5 mm chuqurlikda 1,77 gacha keskin ortadi, bu qiymat 0,2 mm Cu bilan sirtda olingan qiymatga (1,80) yaqin, taxminan 2 mm dan chuqurroqda esa boshqa barcha filtrlar bilan olingan qiymatlardan oshib ketadi. Sn 0,1 mm bilan DEF eng kam o‘zgaradi (1,44 dan 20 mm chuqurlikda 1,57 gacha), chunki Sn K-chegarasidan (29,2 keV) yuqori energiyali fotonlar allaqachon kuchli susaytirilgan, qolgan tor energiya oralig‘ini esa to‘qima deyarli qattiqlashtirmaydi. Demak, filtrlarning sirtdagi tartibi chuqurda joylashgan nishonlar uchun o‘rinli emas.

Sirtdan boshlab Ag kiritilgan soha ichida tendensiya teskarisiga o‘zgaradi (3.15-rasm): Ag kuchayishni yuzaga keltiradigan, o‘z K-chegarasidan yuqori energiyali fotonlarni kuchli susaytiradi (25,514 keV energiyada uning massaviy susayish koeffitsiyenti 9,53 dan 55,4 sm²/g gacha, ya’ni 5,8 marta ortadi). Al 1 mm bilan DEF 1 % Ag uchun 1,48 dan 10 mm chuqurlikda 1,21 gacha, 2 % Ag uchun esa 1,96 dan 1,27 gacha kamayadi; o‘z-o‘zini ekranlash konsentratsiya ortishi bilan kuchayadi, (2.24) formula bilan ifodalangan chiziqli bog‘lanish esa faqat yupqa qatlamlar uchun o‘rinli. Spektri Ag K-chegarasidan bevosita yuqorida jamlangan, Sn bilan filtrlangan dasta ko‘proq yo‘qotadi (1 % Ag uchun 1,44 dan 10 mm chuqurlikda 1,15 gacha).



![3.15-rasm. Sirtdan boshlanuvchi, Ag bir tekis kiritilgan soha ichida dozani kuchaytirish koeffitsiyentining chuqurlikka bog‘liqligi: 0,5; 1,0 va 2,0 % Ag, Al 1,0 mm (tutash chiziqlar) va Sn 0,1 mm (shtrix chiziqlar) filtrlar, o‘z-o‘zini ekranlash hisobga olingan.](/home/user/atlant-impossible/dissertation/code/../figures/uz/fig19_def_slab.png){width=13.5cm}



## 3.8. Trubka kuchlanishining ta’siri va yuqori Z li boshqa elementlar bilan taqqoslash

DEFning trubka kuchlanishi $U$ ga bog‘liqligi (3.16-rasm, 3.10-jadval) SpekPy yordamida uning mis anod uchun qo‘llanish sohasi bo‘lgan 20–50 kV oralig‘ida, 60–80 kV uchun esa IM yordamida hisoblandi. Ag K-chegarasidan yuqori energiyali fotonlar faqat 25,5 kV dan yuqori kuchlanishlarda mavjud bo‘ladi, bu kuchlanishdan pastda esa DEF kam o‘zgaradi. Qiyalik 26–27 kV dan boshlab ortadi; 30 va 50 kV oralig‘ida Al 1 mm bilan DEF 1,31 dan 1,52 gacha tobora sekinroq ortadi (45 kV da ±1 kV ga ±0,009, 3.10-bo‘lim), 50 kV dan yuqorida esa o‘sish yanada sekinlashadi, chunki spektr Ag/to‘qima nisbatining 40–45 keV atrofidagi maksimumidan tashqariga chiqadi. 45 kV da IM SpekPyga qaraganda biroz pastroq DEF qiymatlarini berganligi sababli (mos ravishda 1,464 va 1,482), 60–80 kV dagi qiymatlar oshirib emas, balki, aksincha, past baholangan bo‘lishi mumkin, 50 va 60 kV oralig‘idagi yassilanishning bir qismi esa modelning almashinishi bilan bog‘liq.



![3.16-rasm. 1 % Ag uchun dozani kuchaytirish koeffitsiyentining trubka kuchlanishiga bog‘liqligi (Al 0,5 va 1,0 mm filtrlar): 20–50 kV uchun SpekPy v2 (tutash chiziqlar) va 60–80 kV uchun ishlab chiqilgan model (shtrix chiziqlar); vertikal chiziq Ag K-chegarasini ko‘rsatadi.](/home/user/atlant-impossible/dissertation/code/../figures/uz/fig20_def_kvp.png){width=13.5cm}





Table: 3.10-jadval. DEF (1 % Ag) ning trubka kuchlanishiga bog‘liqligi (20–50 kV: SpekPy; 60–80 kV: ishlab chiqilgan model)

| U, kV | 20 | 22 | 24 | 25 | 26 | 27 | 28 | 30 | 35 | 40 | 45 | 50 | 60 | 70 | 80 |
|:---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Al 0,5 mm | 1,246 | 1,250 | 1,253 | 1,255 | 1,257 | 1,260 | 1,265 | 1,277 | 1,312 | 1,346 | 1,377 | 1,406 | 1,452 | 1,499 | 1,541 |
| Al 1,0 mm | 1,261 | 1,266 | 1,270 | 1,272 | 1,275 | 1,282 | 1,291 | 1,314 | 1,376 | 1,433 | 1,482 | 1,524 | 1,577 | 1,633 | 1,679 |



Massa bo‘yicha 1 % I, Gd, Pt, Au yoki Bi saqlovchi to‘qima uchun (3.17-rasm, 3.11-jadval) filtrlanmagan dasta 1,20–1,33 qiymatlarini beradi, chunki doza Cu K chiziqlari va 15 keV dan past energiyali fotonlar hisobiga hosil bo‘ladi, bu sohada esa Pt, Au va Bi (L-chegaralari taxminan 12–16 keV da) massa birligiga Ag bilan deyarli bir xil miqdorda energiya yutadi (1.2-rasm); faqat 7,2–8,4 keV dagi L-chegaralari Cu K chiziqlarini yutadigan Gd (1,33) ajralib turadi. Al 1 mm bilan farqlar ortadi: o‘z L-chegaralaridan yuqorida Pt, Au va Bi butun filtrlangan spektr bo‘ylab, jumladan, Ag faqat L va tashqi qobiqlari hisobiga yutadigan 15–25 keV sohada ham, Agga qaraganda ko‘proq yutadi; Gd (K-chegarasi 50,2 keV, ya’ni spektrdan tashqarida) Agdan faqat Ag K-chegarasidan pastda ustun keladi, bu soha dozaga hamon katta hissa qo‘shadi; yod esa o‘zini Ag kabi tutadi, biroq uning K-chegarasi yuqoriroq (33,2 keV).



![3.17-rasm. Massa bo‘yicha 1 % Ag, I, Gd, Pt, Au yoki Bi saqlovchi yumshoq to‘qimaning dozani kuchaytirish koeffitsiyenti: 45 kV da qo‘shimcha filtrsiz hamda Al 1,0 mm yoki Sn 0,1 mm bilan (SpekPy, kerma yaqinlashuvi).](/home/user/atlant-impossible/dissertation/code/../figures/uz/fig21_elements.png){width=13.5cm}





Table: 3.11-jadval. 45 kV da tarkibida turli yuqori Z li elementlardan 1 % (massa bo‘yicha) bo‘lgan yumshoq to‘qimaning DEF qiymati

| Filtr | Ag | I | Gd | Pt | Au | Bi |
|:---|---:|---:|---:|---:|---:|---:|
| qo‘shimcha filtrsiz | 1,202 | 1,263 | 1,331 | 1,205 | 1,212 | 1,238 |
| Al 1,0 mm | 1,482 | 1,461 | 1,708 | 2,131 | 2,161 | 2,231 |
| Sn 0,1 mm | 1,444 | 1,440 | 1,716 | 2,155 | 2,189 | 2,276 |



Sn 0,1 mm filtr Ag/to‘qima nisbati 100–139 ga yetadigan va yodning K-chegarasi joylashgan 29,2 keV dan yuqori sohadagi fotonlarni susaytirib, Ag va I uchun DEFni kamaytiradi (ikkalasi uchun ham 1,44), nisbati kamroq o‘zgaradigan og‘irroq elementlar uchun esa yumshoq fotonlarni kuchliroq bostirish hisobiga uni biroz oshiradi (YSQ 0,83 mm Al ga nisbatan 0,90 mm Al). Demak, massa birligiga nisbatan olinganda 45 kV da Ag Gd, Pt, Au va Biga qaraganda kuchsizroq fizik sensibilizator bo‘lib, yod bilan taqqoslanarli. Uning afzalliklari boshqa jihatlarda: spektr ichida joylashgan va filtrlash orqali sozlash imkonini beruvchi K-chegara; kislorodning faol shakllarini (KFSh) hosil qiluvchi, biologik faol kumush nanozarrachalari (AgNZ) [37]; hamda oltin yoki platinaga qaraganda arzonroq narx.

## 3.9. Monte-Karlo usuli yordamida verifikatsiya

Analitik DEF qiymatlarida sochilish hisobga olinmaydi va $\mu_{en}/\rho$ koeffitsiyentiga kiritilmagan Ag K-flyuoressensiyasi energiyasi muhitdan chiqib ketadi deb faraz qilinadi. Ikkala faraz ham 2.7-bo‘limda tavsiflangan Monte-Karlo (MK) dasturi va yassi qatlam geometriyasi yordamida (2–12 mm chuqurlikdagi 10 mm qalinlikdagi qatlamda 1 % Ag; filtrlanmagan va Al 1 mm bilan filtrlangan SpekPy spektrlari; beshta seriyada $4\times10^{6}$ ta foton tarixi) xuddi shu geometriya uchun Ag tomonidan susaytirishni ham hisobga oluvchi birlamchi dastaning kerma modeli bilan taqqoslash orqali tekshirildi. Ikkala usul ham profilning bir xil shaklini beradi, bunda MK qiymatlari hamma joyda yuqoriroq (3.18-rasm; sohalar bo‘yicha o‘rtacha qiymatlar 3.12-jadvalda). Al 1 mm bilan DEF qatlamga kirishda keskin ortadi va o‘z-o‘zini ekranlash tufayli chiqish tomon kamayadi. Filtrlanmagan dasta uchun kirishdagi cho‘qqidan keyin taxminan 3–4 mm da minimum va undan keyingi o‘sish kuzatiladi: kirish yaqinida Ag asosan dozada hali ham ustunlik qilayotgan yumshoq komponentlarni susaytiradi, chuqurroqda esa, ular yutilib bo‘lgach, dastaning qattiqlashishi ustunlik qiladi.



![3.18-rasm. 2–12 mm chuqurlikda 1 % Ag saqlovchi 10 mm qalinlikdagi qatlam (kulrang soha) mavjud bo‘lgan yumshoq to‘qimada dozani kuchaytirish koeffitsiyentining chuqurlik profillari, filtrsiz (chapda) va Al 1,0 mm bilan (o‘ngda): Monte-Karlo usuli (tutash chiziq, soyalangan soha ±2 standart xatolik) va analitik kerma modeli (shtrix chiziq).](/home/user/atlant-impossible/dissertation/code/../figures/uz/fig22_mc.png){width=13.5cm}





Table: 3.12-jadval. 10 mm qalinlikdagi Ag li qatlamda (1 % Ag, 2–12 mm chuqurlik) va undan keyin Monte-Karlo va analitik DEF

| Filtr | Soha | DEF Monte-Karlo | DEF analitik | Farq, % |
|:---|---:|---:|---:|---:|
| qo‘shimcha filtrsiz | qatlamga kirish (2–3 mm) | 1,168 | 1,155 | 1,2 |
| qo‘shimcha filtrsiz | butun qatlam (2–12 mm) | 1,172 | 1,116 | 5,0 |
| qo‘shimcha filtrsiz | qatlamdan chiqish (11–12 mm) | 1,165 | 1,094 | 6,5 |
| qo‘shimcha filtrsiz | qatlamdan keyin (15–30 mm) | 0,802 | 0,761 | 5,4 |
| Al 1,0 mm | qatlamga kirish (2–3 mm) | 1,535 | 1,490 | 3,0 |
| Al 1,0 mm | butun qatlam (2–12 mm) | 1,447 | 1,354 | 6,8 |
| Al 1,0 mm | qatlamdan chiqish (11–12 mm) | 1,351 | 1,227 | 10,1 |
| Al 1,0 mm | qatlamdan keyin (15–30 mm) | 0,803 | 0,759 | 5,9 |



MK qiymatlarining bu ortiqligini ikki effekt tushuntiradi: Ag K-flyuoressensiyasining (taxminan 22 keV) bir qismi qayta yutiladi, chunki uning to‘qimadagi o‘rtacha erkin yugurish yo‘li (taxminan 1,5 sm) qatlam qalinligi bilan taqqoslanarli, qiya yo‘nalishdagi fotonlar esa ko‘ndalang yo‘nalishda cheksiz qatlam ichida uzun yo‘l bosib o‘tadi; bundan tashqari, sochilgan fotonlar dozaga hissa qo‘shadi. Ikkala effekt ham chuqurlik ortishi bilan to‘planib boradi, shu sababli farq ortadi; shuningdek, qatlamdan orqaga chiqarilgan flyuoressensiya nurlanishi filtrlangan dasta uchun qatlam oldidagi MK DEF qiymatini birlikdan biroz yuqoriga ko‘taradi. Qatlam ortida doza Ag kiritilmagan holdagi qiymatning 0,80 qismigacha (analitik model bo‘yicha 0,76 qismigacha) kamayadi, bu esa Ag kiritilgan o‘sma ortidagi normal to‘qimani himoya qiladi, biroq Ag ko‘p kiritilgan soha ortidagi o‘sma qismlarida dozani ham pasaytiradi. Shunday qilib, analitik model qalin Ag kiritilgan sohadagi DEFni konservativ tarzda, 10 % gacha past baholaydi.

## 3.10. Noaniqlik va sezgirlik tahlili

Asosiy natija — Al 1 mm bilan 1 % Ag uchun DEF = 1,482 — har bir parametrni navbatma-navbat o‘zining ehtimoliy noaniqligi doirasida o‘zgartirish orqali tekshirildi (3.19-rasm, 3.13-jadval). To‘qima koeffitsiyenti Ag kiritilgan muhitda ham, tayanch muhitda ham birgalikda o‘zgartirildi, bunda u faqat (2.24) formuladagi $\langle R\rangle$ orqali ta’sir ko‘rsatadi. Spektr modeli IM va SpekPy orasidagi farq bilan, $\eta$ (±25 %) esa IM bergan 1,464 qiymatiga nisbatan o‘zgarishlar bilan ifodalanadi.



![3.19-rasm. Dozani kuchaytirish koeffitsiyentining (1 % Ag, Al 1,0 mm, DEF = 1,482) har bir o‘zgartirish oralig‘ining ikki chegarasida kirish parametrlariga sezgirligi.](/home/user/atlant-impossible/dissertation/code/../figures/uz/fig23_sensitivity.png){width=13.5cm}





Table: 3.13-jadval. DEF (1 % Ag, Al 1,0 mm filtr, DEF = 1,482) ning kirish parametrlariga sezgirligi

| Parametr (o‘zgarish) | DEF (quyi) | DEF (yuqori) | |ΔDEF|max |
|:---|---:|---:|---:|
| Kuchlanish ±1 kV | 1,473 | 1,491 | 0,009 |
| Anod burchagi ±3° | 1,492 | 1,476 | 0,009 |
| Be oyna ±0,1 mm | 1,482 | 1,482 | 0,000 |
| Al filtr qalinligi ±5 % | 1,474 | 1,490 | 0,008 |
| Ag uchun μ_en/ρ ±2 % | 1,472 | 1,492 | 0,010 |
| To‘qima uchun μ_en/ρ ±1 % | 1,487 | 1,477 | 0,005 |
| Tayanch muhit: ICRU 4-komponentli to‘qima / suv | 1,539 | 1,496 | 0,057 |
| Spektr modeli: IM / SpekPy | 1,464 | 1,482 | 0,018 |
| IM chuqurlik koeffitsiyenti η ±25 % | 1,457 | 1,470 | 0,007 |
| Umumiy standart noaniqlik (k = 1), tayanch muhit tanlovisiz |  |  | 0,016 |



Eng katta o‘zgarish (0,057) tayanch muhit bilan bog‘liq (ICRUning to‘rt komponentli to‘qimasi uchun 1,539, suv uchun 1,496): ikkalasida ham ICRU-44 to‘qimasining energiya yutishini oshiradigan Na, P, S, Cl va K mikroelementlari mavjud emas, shu sababli $\langle R\rangle$ va DEF ortadi. Ta’rif masalasi bo‘lgan bu tanlov noaniqlikka kiritilmadi, biroq u har doim ko‘rsatilishi lozim. Qolgan parametrlar orasida spektr modeli ustunlik qiladi (0,018), undan keyin Ag koeffitsiyenti, anod burchagi va trubka kuchlanishi keladi (har biri 0,009–0,010). Anod burchagining kichikroq bo‘lishi kuchliroq o‘z-o‘zini filtrlash hisobiga DEFni oshiradi, Be oyna esa ahamiyatsiz (0,0002), chunki oyna susaytirishi mumkin bo‘lgan fotonlarni Al filtr dastadan chiqarib tashlaydi. Har bir maksimal o‘zgarishni to‘g‘ri burchakli taqsimotning yarim kengligi sifatida, parametrlarni esa o‘zaro korrelyatsiyalanmagan deb qabul qilib, umumiy standart noaniqlik quyidagiga teng:

$$u_c(\mathrm{DEF}) = \sqrt{\sum_{i=1}^{n} \frac{\Delta_i^{2}}{3}}$$

EQNUM[3.4]


bu yerda $\Delta_i$ — $i$-parametr tufayli DEFning maksimal absolyut o‘zgarishi, $n = 8$ (tayanch muhitdan tashqari barcha parametrlar). Natijada $u_c = 0{,}016$: DEF = 1,48 ± 0,02 (qamrov koeffitsiyenti $k = 1$) yoki ± 0,03 ($k = 2$); bu noaniqlik kuchayishning o‘zidan ($\mathrm{DEF}-1 = 0{,}48$) bir tartibdan ko‘proq kichik, asosiy filtrlar orasidagi farqlardan (1 mm Al, 2 mm Al va 0,2 mm Cu orasida 0,14–0,32) esa taxminan bir tartibga kichik, shuning uchun filtrlashga oid xulosalar ishonchli. Noto‘g‘ri o‘zaro ta’sir ma’lumotlari ancha katta ahamiyatga ega bo‘lar edi: xraylib 4.3.0 kutubxonasining CS_Energy funksiyasi 1,48 o‘rniga 1,62 ni bergan bo‘lar edi (2.8-bo‘lim).

## 3.11. Muhokama

Dastlabki tadqiqotlarda kilovoltli rentgen nurlari ta’sirida yod kiritilgan o‘smalarda kuchayish hisoblangan [19, 20]; MK usuli oltin nanozarrachalari (AuNZ) tufayli makroskopik kuchayish kilovoltli dastalarda megavoltli dastalardagiga qaraganda ancha katta ekanligini ko‘rsatgan [10]; turli elementlar uchun nanozarrachalar tufayli kuchayish esa foton energiyasining funksiyasi sifatida o‘xshash, kermaga asoslangan yondashuv bilan tavsiflangan [13]. Ortovoltli dastalarda chuqurlikka bog‘liqlik fantomlarda MK usulida o‘rganilgan [42]; Ag uchun esa qalin nishonni sirtdagi yagona qiymat bilan tavsiflab bo‘lmaydi (3.7-bo‘lim). Ushbu ish past kuchlanishli mis anodli trubka holatini qo‘shadi: uning spektrida Ag K-chegarasidan pastdagi chiziqlar ustunlik qiladi, erishish mumkin bo‘lgan DEF esa trubka konstruksiyasi bilan emas, balki filtrlash bilan belgilanadi. Kumushga oid MK tadqiqotlarida (1.4-bo‘lim) bosh miya o‘smasi braxiterapiyasi [38], o‘sma–sog‘lom to‘qima [39] va qatlamli teri [40] geometriyalaridan foydalanilgan, bu esa faqat sifat jihatidan taqqoslash imkonini beradi: Ag kiritilgan qatlam ortida dozaning taxminan 0,80 qismigacha kamayishi [39] ishidagi sog‘lom to‘qima dozalariga, Au va Agning massa birligiga nisbatan DEF qiymatlari (Al 1 mm bilan mos ravishda 2,16 va 1,48) esa [40] ishidagi taqqoslashga taalluqlidir. AgNZ bilan boyitilgan dozimetrik gellardagi o‘lchovlar [41], agar dasta spektri ko‘rsatilsa, hisoblangan DEFni tekshirish imkonini berishi mumkin.

Radiobiologiya bilan taqqoslaganda nomuvofiqlik yuzaga keladi. Qayd etilishicha, AgNZ saraton hujayralarining ionlashtiruvchi nurlanishga sezgirligini oshiradi [32], glioma uchun radiosensibilizator vazifasini bajaradi [11] va U251 glioma hujayralarida in vitro sharoitda hamda sichqonlarning intrakranial modelida AuNZdan ustun kelgan [12]. Bunday effektlar sensibilizatsiya koeffitsiyenti (SER) bilan miqdoriy baholanadi; u DEFdan farqli ravishda barcha mexanizmlarni aks ettiradi [3]. Makroskopik fizika massa ulushi teng bo‘lganda Ag va Au uchun teskari tartibni, kichik massa ulushlarida esa kichik kuchayishni bashorat qiladi (Al 1 mm bilan 0,1 % Ag uchun DEF 1,048). Biologik effektlar nurlanish sifatiga, konsentratsiyaga va hujayradagi joylashuvga ham bog‘liq bo‘lsa-da, AgNZ tufayli qayd etilgan radiosensibilizatsiya, xususan, ularning AuNZdan ustunligi faqat dozaning makroskopik kuchayishi natijasi bo‘lishi dargumon. Buni ikki mexanizm izohlashi mumkin: AgNZ inson hujayralarida KFSh hosil bo‘lishini, dezoksiribonuklein kislota (DNK) shikastlanishini, hujayra siklining to‘xtashini va mitoxondriyalar funksiyasining buzilishini keltirib chiqaradi [37], oltin nanozarrachalari atrofida dozaning kuchayishi esa yuqori darajada lokallashgan [30], bunda nanomiqyosda energiya ajralishi makroskopik kuchayish doirasidan tashqaridagi effektlarni tushuntiradi [31]. Shunday qilib, makroskopik DEF kimyoviy va biologik bosqichlarga ega bo‘lgan radiokuchaytirishning faqat fizik bazaviy darajasidir [7].

Ishning bir qator cheklovlari mavjud. Kerma yaqinlashuvi dozaning nanomiqyosdagi notekisligini hisobga olmaydi, Ag esa bir jinsli taqsimlangan deb faraz qilindi, holbuki nanozarrachalar tufayli radiosensibilizatsiya ularning o‘lchami, konsentratsiyasi va joylashuviga bog‘liq [97]. IM tormozlanish nurlanishini izotrop deb faraz qiladi va elektronlarning anoddan teskari sochilishini hisobga olmaydi, bu esa taqribiy Born kesimi bilan birgalikda nurlanish chiqishini oshirib baholashga olib keladi (havodagi kerma bo‘yicha IM/SpekPy nisbati 1,08–1,42), biroq DEFni oshirib baholashga olib kelmaydi; IM Cu K chiziqlarini 26–43 % ga past baholaganligi sababli asosiy natijalar SpekPy spektrlari yordamida olingan. “Tovon” effekti modellashtirilmadi, chuqurlik bo‘yicha analitik hisoblarda sochilish va flyuoressensiyaning qayta yutilishi hisobga olinmaydi (3.9-bo‘lim), MK geometriyasi esa oddiy yassi qatlamdan iborat. Trubkaning haqiqiy spektri o‘lchanmadi, garchi SpekPy o‘lchangan spektrlar va YSQ qiymatlari bilan solishtirish orqali validatsiya qilingan bo‘lsa-da [51]; biologik javob ham modellashtirilmadi.

45 kV li mis anodli trubka bilan o‘tkaziladigan tajriba uchun 1–2 mm Al (yoki 0,1–0,3 mm Ti) filtr tavsiya etiladi; Al bilan u 1 % Ag uchun 1,48–1,62 ga teng DEF beradi, 10 sm masofada va 40 mA tokda 2 Gr dozaga esa 14,6–32,5 s da erishiladi (3.8-jadval). Yupqa Cu filtrlardan (0,05–0,1 mm) va K-chegaralari 20–30 keV da joylashgan filtrlardan (Mo, Ag, Sn) foydalanmaslik kerak, 0,2 mm Cu filtr esa eng katta DEF qiymatini (1,80) bersa-da, 2 Gr uchun 158 s talab qiladi. Dasta sifatini YSQni o‘lchash [14] va natijani hisoblangan birinchi YSQ bilan (1 mm Al bilan 0,83 mm Al, 2 mm Al bilan 1,27 mm Al) solishtirish orqali tekshirish lozim. Ag massa ulushi kamida 0,5 % bo‘lishi kerak (1 mm Al bilan DEF 1,24), chunki 0,1 % da kuchayish 5 % dan kam. Qalinligi bir necha millimetrdan ortiq bo‘lgan namunalar uchun DEF haqiqiy chuqurlik va Ag miqdori uchun NIST (xraylib CS_Energy emas) koeffitsiyentlari bilan hisoblanishi hamda spektr (yoki trubka kuchlanishi, filtrlash va YSQ), tayanch muhit va chuqurlik bilan birga keltirilishi lozim.

## 3.12. III bob bo‘yicha xulosalar

1. IM (bitta moslashtirilgan parametr, $\eta = 0{,}40$) SpekPy bilan YSQ bo‘yicha 1 mm Al uchun −3,5 dan −4,6 % gacha, DEF bo‘yicha esa Al filtrlar uchun 2 % doirasida mos keladi, biroq Cu K chiziqlarini 26–43 % ga past baholaydi.
2. Filtrlanmagan spektrda Cu K chiziqlari ustunlik qiladi (fotonlarning 68,5 % qismi), shu sababli 1 % Ag uchun DEF atigi 1,20 ga teng; trubkaning konstruktiv parametrlari asosan DEFni emas (1,19–1,21), balki nurlanish chiqishini o‘zgartiradi.
3. Filtrlash hal qiluvchi ahamiyatga ega: 1 % Ag uchun DEF 1,48 (Al 1 mm), 1,62 (Al 2 mm) va 1,80 (Cu 0,2 mm) ga teng, bunda doza quvvati 120–1300 marta past bo‘ladi; o‘tkazish koeffitsiyenti bir xil bo‘lganda Al va Ti optimal, K-chegaralari 20–30 keV da joylashgan filtrlar esa noqulay.
4. Al 1 mm bilan DEF Ag kiritilmagan to‘qimadagi Ag kiritilgan soha chuqurligi ortishi bilan ortadi (20 mm chuqurlikda 1,69), biroq Ag bir tekis kiritilgan soha ichida o‘z-o‘zini ekranlash tufayli kamayadi (10 mm chuqurlikda 1,21, 1 % Ag).
5. MK hisobi analitik modelni 1–10 % doirasida tasdiqlaydi (flyuoressensiyaning qayta yutilishi va sochilish tufayli MK qiymatlari yuqoriroq) va Ag kiritilgan qatlam ortida dozaning taxminan 0,80 qismigacha kamayishini ko‘rsatadi.
6. DEF trubka kuchlanishi ortishi bilan ortadi, eng tez o‘sish esa Ag K-chegarasidan yuqori energiyali fotonlar paydo bo‘lgandan keyin (taxminan 26–27 kV dan yuqorida) kuzatiladi; massa birligiga nisbatan Ag Gd, Pt, Au va Biga qaraganda kuchsizroq fizik sensibilizator bo‘lib, yod bilan taqqoslanarli.
7. DEF (1 % Ag, Al 1 mm) 1,48 ± 0,02 ($k = 1$) ga teng; tayanch muhit uni 0,057 gacha o‘zgartiradi va albatta ko‘rsatilishi lozim.


# XULOSA

1. Yuqori Z li elementlar tufayli dozaning kuchayishi megavoltli fotonlarga qaraganda kilovoltli fotonlar uchun ancha katta, kumush nanozarrachalari esa glioma, sut bezi va kolorektal saraton modellarini radiosensibilizatsiya qilishi qayd etilgan. Massaviy energiya yutilish koeffitsiyentlarining Ag/to‘qima nisbati Ag K-chegarasidan (25,514 keV) pastdagi 21–32 dan 30–45 keV da 103–139 gacha ortadi, biroq dozani kuchaytirish koeffitsiyentining (DEF) mis anodli trubkalarning konstruksiyasi va filtrlanishiga bog‘liqligi miqdoriy baholanmagan edi.

2. Ishlab chiqilgan model (IM) mis anodli trubka spektrining qalin nishon uchun yarim analitik modeli (Bete tormozlanish qobiliyati, Elvert ko‘paytuvchisi kiritilgan norelyativistik Bete–Gaytler kesimi, Grizinskiy K-qobiq kesimi) bo‘lib, tormozlanish nurlanishi ta’sirida hosil bo‘ladigan va yopiq ko‘rinishda tavsiflangan K flyuoressensiyani (chiziqlar intensivligining 4,5–4,8 %), anodda o‘z-o‘zini yutishni va filtrlashni o‘z ichiga oladi.

3. Uning yagona parametri — elektronlarning chuqurlik koeffitsiyenti $\eta = 0{,}40$ — 45 kV da SpekPy v2 tormozlanish nurlanishi spektrining shakliga moslashtirildi (o‘rtacha kvadratik chetlanish 2,46 %). Qayta moslashtirishsiz IM 25–50 kV va 6–30° anod burchaklarida 1 mm Al bilan filtrlangan dastalarning yarim susaytirish qatlamini (YSQ) −3,5 dan −4,6 % gacha chetlanish bilan takrorlaydi; Cu K chiziqlarini 26–43 % ga kam, havodagi kermani esa 8–42 % ga ortiq baholaydi, biroq Al filtrlar bilan uning DEF qiymatlari SpekPy bilan 2 % doirasida mos keladi.

4. Filtrlanmagan 45 kV li spektr (anod burchagi 12°, 0,5 mm Be, 10 sm havo) yumshoq (o‘rtacha energiya 10,38 keV, birinchi YSQ 0,0478 mm Al) va intensiv (383 mGr/(mA·s), ya’ni 40 mA da 15,3 Gr/s) bo‘lib, unda Cu K chiziqlari ustunlik qiladi (fotonlarning 68,5 %, Ag K-chegarasidan yuqorida esa 4,64 %).

5. Anod burchagi (6–30°), kuchlanish (25–50 kV) va Be oyna (0,15–2 mm) havodagi kermani 163–463 mGr/(mA·s) oralig‘ida, 1 % Ag uchun DEFni esa faqat 1,19–1,21 oralig‘ida o‘zgartiradi, chunki doza asosan Cu K chiziqlari va 15 keV dan past energiyali fotonlar hisobiga hosil bo‘ladi, bu sohada esa Ag/to‘qima nisbati 27 dan oshmaydi (Cu K chiziqlarida 21–22).

6. Qo‘shimcha filtrlash hal qiluvchi ahamiyatga ega: 1 % Ag uchun DEF 1 mm Al bilan 1,48 ga, 2 mm Al bilan 1,62 ga va 0,2 mm Cu bilan 1,80 ga teng, biroq buning evaziga havodagi kerma 120–1300 marta kamayadi. DEF − 1 Agning massa ulushiga proporsional.

7. Havodagi kerma bo‘yicha o‘tkazish koeffitsiyenti bir xil bo‘lganda 9–45 keV da yutilish chegaralari bo‘lmagan yengil va o‘rtacha Z li filtrlar (Al, Si, Ca, Sc, Ti) optimal, K-chegaralari 20–30 keV da joylashgan filtrlar (Mo, Ag, Sn) esa kumush eng samarali bo‘lgan energiya sohasida yutadi: o‘tkazish koeffitsiyenti 0,1 % bo‘lganda 1 % Ag uchun DEF Ti bilan 1,91 ga, Ag bilan esa 1,34 ga teng.

8. 1 mm Al va 1 % Ag bo‘lganda kumush kiritilgan yupqa sohadagi DEF sirtdagi 1,48 dan 20 mm chuqurlikda 1,69 gacha ortadi (dastaning qattiqlashishi), biroq sirtdan boshlab bir tekis kumush kiritilgan soha ichida 10 mm chuqurlikda 1,21 gacha kamayadi (o‘z-o‘zini ekranlash). 10 mm qalinlikdagi qatlam uchun Monte-Karlo usulida olingan DEF qiymatlari analitik qiymatlardan 1–10 % ga yuqori bo‘ldi (qayta yutilgan Ag K flyuoressensiyasi, sochilgan fotonlar), qatlam ortidagi doza esa kumushsiz qiymatning taxminan 0,80 qismigacha pasaydi.

9. DEF (1 % Ag, 1 mm Al) 25 kV dagi 1,27 dan 50 kV dagi 1,52 gacha ortadi. 45 kV da massa birligiga nisbatan kumush Gd, Pt, Au va Bi elementlariga qaraganda kuchsizroq fizik sensibilizator (1,48, Au uchun esa 2,16) bo‘lib, yod (1,46) bilan taqqoslanarli, shu sababli kumushning oltin nanozarrachalariga nisbatan qayd etilgan biologik ustunligi kimyoviy, biologik va nanomiqyosdagi mexanizmlarga ishora qiladi.

10. 1 % Ag va 1 mm Al uchun DEF = 1,48 ± 0,02 ($k = 1$); tayanch muhit uni 0,057 gacha o‘zgartiradi. xraylib 4.3.0 kutubxonasining CS_Energy funksiyasi 30 keV da kislorodning massaviy energiya yutilish koeffitsiyentini 37 % ga kam baholaydi, bu esa ushbu DEFni 1,62 gacha oshirar edi, shu sababli NIST jadvallaridan foydalanish zarur.

## Amaliy tavsiyalar

1. 1–2 mm Al (yoki 0,1–0,3 mm Ti) bilan filtrlash lozim; filtrlanmagan dastalar, yupqa Cu filtrlar hamda Mo, Ag yoki Sn filtrlardan qochish kerak.
2. Dastani tavsiflash (kuchlanish, anod burchagi, oyna, filtrlar, o‘lchangan birinchi YSQ; 1 mm Al uchun hisoblangan qiymati 0,83 mm Al), DEFni esa spektr va tayanch muhit bilan birga keltirish lozim.
3. Nurlantirishlarni to‘qima kermasi asosida rejalashtirish (10 sm va 40 mA da 2 Gr ga 1 mm Al bilan 14,6 s da, 2 mm Al bilan 32,5 s da erishiladi), nurlanish chiqishini esa dozimetrik usulda tekshirish kerak.
4. Kumushning kamida 0,5 % massa ulushidan (1 mm Al bilan DEF 1,24) foydalanish lozim.
5. Qalin namunalar uchun DEFning chuqurlikka bog‘liqligini, o‘z-o‘zini ekranlashni va kumush kiritilgan soha ortida dozaning kamayishini hisobga olish zarur.

## Keyingi tadqiqotlar istiqbollari

Olingan spektrlar bilan nanomiqyosdagi Monte-Karlo modellashtirish kumush nanozarrachalari atrofida dozaning mikroskopik kuchayishini makroskopik DEF bilan bog‘lash imkonini beradi, CdTe yoki Si spektrometriyasi esa IMning Cu K chiziqlari intensivligini va absolyut nurlanish chiqishini tekshirishga xizmat qiladi. Tavsiya etilgan filtrlash bilan in vitro tajribalar dozaning fizik kuchayishini kislorodning faol shakllari hosil bo‘lishi kabi kimyoviy va biologik mexanizmlardan ajratish imkonini beradi. Oltin va kumush nanozarrachalarini bir xil massaviy konsentratsiyada va bir xil spektrlarda taqqoslash kumushning biologik ustunligi ma’lum fizik DEFda ham saqlanib qolish-qolmasligini tekshirishga imkon beradi.


# FOYDALANILGAN ADABIYOTLAR RO‘YXATI

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


# ILOVALAR

## A ilova. Spektr modelining boshlang‘ich kodi (fragmentlar)

Ishlab chiqilgan model (IM) Python `xspec.py` modulida amalga oshirilgan; fragmentlar o‘zgarishsiz keltirilgan (energiyalar keV da, uzunliklar sm da). Bete tormozlanish qobiliyati (ICRU 37-hisobotidagi konstantalar [68], zichlik effekti uchun tuzatmasiz; (2.1), (2.2)), moslashtirilgan $\eta = 0{,}40$ bilan elektronlarning kirish chuqurligi ((2.3), (2.4)), izotrop nurlanish uchun qalin nishon integrali (2.8), bevosita hosil bo‘ladigan K chiziqlar (2.10) hamda filtrlash, flyuens va havodagi kerma ((2.15), (2.16), (2.17)) tushirib qoldirilgan.

`brems_dcs` funksiyasi Kramers kesimini (2.5) yoki, sukut bo‘yicha, norelyativistik Bete–Gaytler kesimini (2.6) Elvert ko‘paytuvchisi (2.7) bilan qaytaradi; `sigma_K_gryzinski` — $U_K = T/E_K$ ortiqcha kuchlanish nisbati (`U` o‘zgaruvchisi) uchun Grizinskiy K-qobiq ionizatsiyasi kesimi (2.9).

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

`TubeModel._characteristic` metodining ikkita parchasi bilvosita flyuoressensiyani hosil bo‘lgan tormozlanish nurlanishining K-chegaradan yuqori qismidan yopiq ko‘rinishda (2.14) hisoblaydi; bunda `tauK` — $\tau_K$, `b` esa $\mu_j/\sin\theta$.

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

`def_factor` funksiyasi DEFni kerma yaqinlashuvida (2.23) aralashma qoidasi (2.22) bo‘yicha hisoblaydi, bunda energiya flyuensi ustidagi to‘qimada (2.26) yoki, `attenuate_with_agent=True` bo‘lganda, to‘qima zichligidagi Ag kiritilgan aralashmada (2.27) susaytiriladi.

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

## B ilova. Takrorlanuvchanlik

Barcha jadval va rasmlar `dissertation/code` katalogidagi skriptlar yordamida `dissertation/data` katalogidagi ma’lumotlardan (II bobdagi yordamchi tekshiruvlar bundan mustasno) Python 3.13, NumPy 2.5.3 [65], SciPy 1.18.1 [66], Matplotlib 3.11.2 [67], xraylib 4.3.0 [60] va SpekPy 2.5.4 [15, 58] vositasida olinadi. `nist.py` moduli NIST jadvallarini [59] 31 ta element, quruq havo, suv va ICRU-44 yumshoq to‘qimasi [61] uchun yutilish chegaralari orasida log-log interpolyatsiya qiladi. `run_all.py` skripti $\eta$ ni (0,25–0,7) 3 keV dan yuqoridagi SpekPy tormozlanish nurlanishiga moslashtiradi hamda validatsiyani, bazaviy spektrni, konstruksiya va filtrlar ta’sirini, DEFning konsentratsiya, chuqurlik va kuchlanishga bog‘liqligini, o‘z-o‘zini ekranlashni, elementlarni taqqoslashni, sezgirlikni va ekspozitsiya vaqtlarini hisoblaydi (`data/results.json`); `run_sweeps.py` skripti filtr qalinligi bo‘yicha skanerlashni qo‘shadi va 43 ta filtr materialini havodagi kerma bo‘yicha bir xil o‘tkazish koeffitsiyentida taqqoslaydi. `mc_dose.py` skripti har bir konfiguratsiya uchun $4 \times 10^6$ ta foton tarixini tasodifiy sonlar generatorining boshlang‘ich qiymatlari qat’iy belgilangan beshta seriyada modellashtiradi (`data/mc_results.json`), `make_tables.py` va `figures.py` skriptlari esa jadval va rasmlarni uch tilda yaratadi. Analitik dastur deterministik bo‘lgani va boshlang‘ich qiymatlar qat’iy belgilangani sababli beshta skriptni shu tartibda ishga tushirish barcha natijalarni takrorlaydi.


