# ANNOTATSIYA

::: {custom-style="Annotation"}
Saratonga qarshi nur terapiyasining samaradorligi hanuzgacha sog‘lom to‘qimalarning chidamliligi bilan cheklanib qolmoqda, masofaviy nur terapiyasida beriladigan dozani optimallashtirish strategiyalaridan biri esa radiosensibilizatorlardan foydalanishdir. Ushbu ishda kilovoltli rentgen nurlari bilan nurlantirilgan biologik muhitda kumushning (Ag) radiokuchayish effekti tadqiq qilinadi va u dozani kuchaytirish koeffitsiyenti (DEF) orqali miqdoriy baholanadi. DEFni hisoblash uchun zarur bo‘lgan 45 kV li mis anodli rentgen trubkasining spektri trubka konstruksiyasi, texnik parametrlari va filtrlariga bog‘liq holda modellashtiriladi. Shu maqsadda bitta moslashtirilgan parametrga ega bo‘lgan qalin nishonning yarim analitik modeli — ishlab chiqilgan model (IM) yaratildi va SpekPy v2 bilan solishtirish orqali validatsiya qilindi. DEF kerma yaqinlashuvida NIST massaviy energiya yutilish koeffitsiyentlari yordamida hisoblandi va fotonlar ko‘chishini Monte-Karlo usulida modellashtirish orqali verifikatsiya qilindi.

Filtrlanmagan spektrda 8,0–8,9 keV dagi Cu K chiziqlari ustunlik qiladi (fotonlarning 68,5 % qismi), shu sababli massa bo‘yicha 1 % Ag uchun DEF atigi 1,20 ga teng bo‘lib, anod burchagi, trubka kuchlanishi yoki berilliy oyna o‘zgartirilganda 1,19–1,21 oralig‘ida qoladi. Qo‘shimcha filtrlash hal qiluvchi parametr hisoblanadi: 1 mm Al DEFni 1,48 gacha, 2 mm Al 1,62 gacha, 0,2 mm Cu esa 1,80 gacha oshiradi, bunda havodagi kerma 120–1300 marta kamayadi. O‘tkazish koeffitsiyenti bir xil bo‘lganda yengil va o‘rtacha Z li filtrlar (Al, Ti) optimal hisoblanadi, K-chegaralari 20–30 keV da joylashgan filtrlar (Mo, Ag, Sn) esa kuchli filtrlashda eng kam samarali bo‘ladi. Al bilan filtrlangan dastalar uchun IM SpekPy yordamida hisoblangan yarim susaytirish qatlamini 5 % dan, DEFni esa 2 % dan oshmaydigan farq bilan takrorlaydi. DEF chuqurlik ortishi bilan ortadi (dastaning qattiqlashishi) va Ag miqdori yuqori bo‘lgan soha ichida kamayadi (o‘z-o‘zini ekranlash); Monte-Karlo hisoblari bu qiymatlarni 1–10 % doirasida tasdiqlaydi. Massa birligiga nisbatan olinganda Ag fizik sensibilizator sifatida Au, Pt, Bi yoki Gd elementlaridan kuchsizroq bo‘lib, samaradorligi jihatidan yod bilan taqqoslanarli. Yengil elementlar uchun xraylib 4.3.0 kutubxonasidagi energiya yutilish ma’lumotlari 37 % gacha past baholanganligi aniqlandi, bu esa DEFning oshirib baholanishiga olib kelgan bo‘lar edi. Olingan natijalar Ag saqlovchi radiosensibilizatorlar bilan o‘tkaziladigan tajribalar uchun filtrlash va ekspozitsiya sharoitlarini tanlashga asos bo‘ladi.

**Kalit so‘zlar:** rentgen trubkasi spektri; mis anod; tormozlanish nurlanishi; xarakteristik nurlanish; filtrlash; kumush; radiosensibilizatsiya; dozani kuchaytirish koeffitsiyenti; kilovoltli rentgen nurlanishi; Monte-Karlo usuli.
:::

# АННОТАЦИЯ

::: {custom-style="Annotation"}
Эффективность противоопухолевой лучевой терапии по-прежнему ограничена толерантностью здоровых тканей, и одной из стратегий оптимизации дозы, подводимой при дистанционной лучевой терапии, является применение радиосенсибилизаторов. В работе исследуется эффект радиоусиления, обусловленный серебром (Ag), в биологической среде, облучаемой киловольтным рентгеновским излучением, и проводится его количественная оценка с помощью коэффициента усиления дозы (DEF). Необходимый для расчёта DEF спектр рентгеновской трубки с медным анодом, работающей при напряжении 45 кВ, моделируется в зависимости от конструкции трубки, её технических параметров и фильтров. С этой целью создана полуаналитическая модель толстой мишени с одним подгоночным параметром — разработанная модель (РМ), — и выполнена её валидация путём сравнения со SpekPy v2. DEF рассчитан в приближении кермы с использованием массовых коэффициентов поглощения энергии NIST и верифицирован моделированием переноса фотонов методом Монте-Карло.

В нефильтрованном спектре преобладают K-линии Cu с энергиями 8,0–8,9 кэВ (68,5 % фотонов), поэтому DEF при массовой доле Ag 1 % составляет лишь 1,20 и остаётся в пределах 1,19–1,21 при изменении угла анода, напряжения на трубке или бериллиевого окна. Решающим параметром является дополнительная фильтрация: фильтр 1 мм Al повышает DEF до 1,48, 2 мм Al — до 1,62, 0,2 мм Cu — до 1,80, при этом воздушная керма уменьшается в 120–1300 раз. При одинаковом пропускании оптимальны фильтры из лёгких элементов и элементов со средним Z (Al, Ti), тогда как фильтры с K-краями в области 20–30 кэВ (Mo, Ag, Sn) при сильной фильтрации наименее эффективны. Для пучков с алюминиевым фильтром РМ воспроизводит слой половинного ослабления, рассчитанный SpekPy, с точностью до 5 %, а DEF — с точностью до 2 %. DEF возрастает с глубиной (ужесточение пучка) и уменьшается внутри области с высоким содержанием серебра (самоэкранирование); расчёты методом Монте-Карло подтверждают эти значения в пределах 1–10 %. В расчёте на единицу массы Ag является более слабым физическим сенсибилизатором, чем Au, Pt, Bi или Gd, и сопоставимо с йодом. Установлено, что данные xraylib 4.3.0 о поглощении энергии для лёгких элементов занижены на величину до 37 %, что привело бы к завышению DEF. Полученные результаты служат обоснованием выбора фильтрации и условий облучения в экспериментах с серебросодержащими радиосенсибилизаторами.

**Ключевые слова:** спектр рентгеновской трубки; медный анод; тормозное излучение; характеристическое излучение; фильтрация; серебро; радиосенсибилизация; коэффициент усиления дозы; киловольтное рентгеновское излучение; метод Монте-Карло.
:::

# ANNOTATION

::: {custom-style="Annotation"}
The effectiveness of anticancer radiotherapy is still limited by the tolerance of healthy tissues, and one strategy to optimise the dose delivered in external radiotherapy is the use of radiosensitizers. This work studies the radio-enhancement effect of silver (Ag) in biological matter irradiated with kilovoltage x-rays and quantifies it by the dose enhancement factor (DEF). The spectrum of a 45 kV copper-anode x-ray tube needed for the DEF calculations is modelled as a function of the tube design, technical parameters and filters. To this end, a semi-analytical thick-target model with one fitted parameter, the developed model (DM), was created and validated against SpekPy v2. The DEF was calculated in the kerma approximation with NIST mass energy-absorption coefficients and verified by Monte Carlo photon transport.

The unfiltered spectrum is dominated by the Cu K lines at 8.0–8.9 keV (68.5 % of the photons), so the DEF for 1 % Ag by mass is only 1.20 and remains within 1.19–1.21 when the anode angle, tube voltage or beryllium window is changed. Added filtration is the decisive parameter: 1 mm Al raises the DEF to 1.48, 2 mm Al to 1.62 and 0.2 mm Cu to 1.80, while the air kerma decreases 120–1300-fold. At equal transmission, light and medium-Z filters (Al, Ti) are optimal, whereas filters with K-edges at 20–30 keV (Mo, Ag, Sn) are the least effective at strong filtration. For Al-filtered beams, the DM reproduces the SpekPy half-value layer within 5 % and the DEF within 2 %. The DEF increases with depth (beam hardening) and decreases inside a heavily loaded region (self-shielding); Monte Carlo calculations confirm these values within 1–10 %. Per unit mass, Ag is a weaker physical sensitizer than Au, Pt, Bi or Gd and is comparable to iodine. The xraylib 4.3.0 energy-absorption data for light elements were found to be up to 37 % too low, which would overestimate the DEF. The results support the choice of filtration and exposure conditions for experiments with Ag-containing radiosensitizers.

**Keywords:** x-ray tube spectrum; copper anode; bremsstrahlung; characteristic radiation; filtration; silver; radiosensitization; dose enhancement factor; kilovoltage x-rays; Monte Carlo method.
:::

# QISQARTMALAR VA BELGILAR RO‘YXATI



| Qisqartma / belgi | Ma’nosi |
|:---|:---|
| AgNZ | kumush nanozarrachasi |
| AuNZ | oltin nanozarrachasi |
| ZZM | zaryadli zarralar muvozanati |
| CSDA | uzluksiz sekinlashish yaqinlashuvi |
| DCS | differensial kesim |
| DEF | dozani kuchaytirish koeffitsiyenti |
| IM | ishlab chiqilgan model (ushbu ishdagi rentgen spektrining yarim analitik modeli) |
| YSQ | yarim susaytirish qatlami (YSQ1 va YSQ2 — birinchi va ikkinchi yarim susaytirish qatlamlari) |
| IAEA | Atom energiyasi bo‘yicha xalqaro agentlik |
| ICRP | Radiologik himoya bo‘yicha xalqaro komissiya |
| ICRU | Radiatsion birliklar va o‘lchovlar bo‘yicha xalqaro komissiya |
| kVp | kilovolt-pik (rentgen trubkasining cho‘qqi kuchlanishi) |
| MK | Monte-Karlo (usuli) |
| NIST | Standartlar va texnologiyalar milliy instituti (AQSh) |
| KFSh | kislorodning faol shakllari |
| RT | nur terapiyasi |
| SER | sensibilizatsiya koeffitsiyenti |
| $D$ | yutilgan doza, Gr |
| $E$ | foton energiyasi, keV |
| $\bar{E}$ | spektrdagi fotonlarning o‘rtacha energiyasi, keV |
| $E_K$ | K-qobiqning bog‘lanish energiyasi (K yutilish chegarasining energiyasi), keV |
| $K$ | kerma (massa birligida ajralgan kinetik energiya), Gr; $K_{\mathrm{air}}$ — havodagi kerma |
| K$\alpha$, K$\beta$ | K seriyasining xarakteristik chiziqlari (mos ravishda L-qobiqdan hamda M- va N-qobiqlardan K-qobiqqa o‘tishlar) |
| $S(T)$ | kinetik energiyasi $T$ bo‘lgan elektron uchun anod materialining ionizatsion tormozlanish qobiliyati; $S/\rho$ — massaviy ionizatsion tormozlanish qobiliyati, MeV sm$^2$/g |
| $T$ | elektronning kinetik energiyasi, keV |
| $U$ | trubka kuchlanishi, kV |
| $w$ | to‘qimadagi kumushning (yoki boshqa yuqori Z li elementning) massa ulushi |
| $Z$ | atom raqami |
| $\eta$ | elektronlarning chuqurlik koeffitsiyenti, IMning yagona moslashtiriladigan parametri |
| $\theta$ | anod burchagi (anod sirti bilan dastaning markaziy nuri orasidagi burchak) |
| $\mu$ | chiziqli susayish koeffitsiyenti, sm$^{-1}$ |
| $\mu/\rho$ | massaviy susayish koeffitsiyenti, sm$^2$/g ($\rho$ — zichlik) |
| $\mu_{en}/\rho$ | massaviy energiya yutilish koeffitsiyenti, sm$^2$/g |
| $\sigma_K$ | elektron zarbasi natijasida K-qobiq ionizatsiyasining kesimi, b |
| $\Phi(E)$ | fotonlarning spektral flyuensi (birlik energiya oralig‘iga to‘g‘ri keladigan fotonlar flyuensi) |
| $\Psi(E)$ | spektral energiya flyuensi, $\Psi(E) = E\,\Phi(E)$ |
| $\omega_K$ | K-qobiqning flyuoressensiya chiqishi |


# KIRISH

**Mavzuning dolzarbligi.** Saraton butun dunyoda kasallanish va o‘limning asosiy sabablaridan biri hisoblanadi [1], barcha onkologik bemorlarning qariyb yarmida esa nur terapiyasi (RT) uchun ko‘rsatma mavjud [2]. Saratonga qarshi RTning samaradorligi hanuzgacha o‘smani o‘rab turgan va dozaning bir qismini muqarrar ravishda oladigan sog‘lom to‘qimalarning chidamliligi bilan cheklanadi [3, 4]. Terapevtik intervalni doza taqsimotining konformligini yaxshilash yoki o‘smaning berilgan dozaga reaksiyasini kuchaytirish orqali kengaytirish mumkin [3]. Ikkinchi strategiya radiosensibilizatorlarga, ya’ni o‘zlari to‘plangan to‘qimada nurlanish ta’sirini kuchaytiradigan vositalarga tayanadi [3, 5]. Kimyoviy radiosensibilizatorlardan [5] tashqari, hozirgi vaqtda og‘ir metallarning birikmalari va nanozarrachalari jadal o‘rganilmoqda [6, 7].

Atom raqami $Z$ yuqori bo‘lgan elementlar kilovoltli fotonlarni yumshoq to‘qimaga qaraganda ancha kuchli yutadi, chunki fotoeffekt kesimi $Z$ ortishi bilan keskin ortadi, foton energiyasi ortishi bilan esa kamayadi [8]. Shu sababli bunday element kiritilgan o‘sma massa birligida atrofdagi to‘qimaga qaraganda ko‘proq energiya yutadi. Diametri 1,9 nm bo‘lgan oltin nanozarrachalari 250 kVp (kilovolt-pik) rentgen nurlari bilan nurlantirilgan, o‘smasi bor sichqonlarning bir yillik yashab qolish ko‘rsatkichini sezilarli darajada oshirgan [9], Monte-Karlo (MK) hisoblari esa oltin tufayli dozaning makroskopik kuchayishi kilovoltli dastalarda megavoltli dastalardagiga qaraganda ancha katta ekanligini ko‘rsatgan [10]. Kumush nanozarrachalari (AgNZ) glioma uchun radiosensibilizator sifatida taklif etilgan [11] va ular glioma hujayralarini in vitro sharoitda hamda sichqonlardagi intrakranial modelda radiosensibilizatsiya qilishda oltin nanozarrachalaridan (AuNZ) ustun ekanligi qayd etilgan [12]. Bundan tashqari, kumush oltindan arzonroq, uning 25,514 keV dagi K yutilish chegarasi esa 45 kV li rentgen trubkasi spektri ichida joylashgan.

Kumushning fizik ta’siri dozani kuchaytirish koeffitsiyenti (DEF) bilan miqdoriy tavsiflanadi; u kumush saqlovchi to‘qimadagi yutilgan dozaning kumushsiz xuddi shu to‘qimadagi yutilgan dozaga nisbatidir. 8 dan 25 keV gacha bo‘lgan oraliqda kumush va yumshoq to‘qimaning massaviy energiya yutilish koeffitsiyentlari nisbati atigi 21–32 ni tashkil etadi; Ag K-chegarasida bu nisbat sakrab taxminan 76 ga yetadi, so‘ngra 30–45 keV da 100–139 gacha ortadi. Shu sababli DEF fotonlar energiya flyuensining Ag K-chegarasidan yuqorida joylashgan ulushiga kuchli bog‘liq bo‘ladi, bu esa yuqori Z li moddalar tufayli dozaning kuchayishi energiyaga kuchli bog‘liq ekanligiga mos keladi [10, 13]. Kilovoltli dastalar odatda trubka kuchlanishi va yarim susaytirish qatlami (YSQ) bilan tavsiflanadi [14], biroq bu ikki parametr yutilish chegarasi atrofidagi spektral taqsimotni bir qiymatli aniqlamaydi, shuning uchun DEFni ishonchli hisoblash uchun manbaning o‘z spektri talab etiladi; bunday spektrni rentgen spektri modellari beradi [15].

Ushbu ishda 45 kV kuchlanishda ishlaydigan mis anodli rentgen trubkasi ko‘rib chiqiladi. Diagnostik radiologiya va ortovoltli terapiyada qo‘llaniladigan volfram anodli trubkalardan [16, 17] farqli ravishda, u filtrlanmagan dasta fotonlarining asosiy qismini Ag K-chegarasidan ancha pastda joylashgan 8,0–8,9 keV dagi Cu K chiziqlarida, 45 keV gacha cho‘ziladigan tormozlanish nurlanishining uzluksiz spektri bilan birga chiqaradi. Bunday trubkaning spektri, demak, DEF ham uning konstruktiv va texnik parametrlari (anod burchagi, trubka kuchlanishi, berilliy oyna) hamda dastaga o‘rnatilgan filtrlar bilan belgilanadi. Shu sababli mis anodli trubka spektrini ushbu parametrlarga bog‘liq holda modellashtirish va undan kumush saqlovchi biologik muhit uchun DEFni aniqlashda foydalanish tibbiy fizikaning dolzarb masalasi hisoblanadi.

**Muammoning o‘rganilganlik darajasi.** Yuqori Z li muhitlar yaqinida dozaning kuchayishi haqidagi tasavvur Spiers ishiga borib taqaladi; u kilovoltli rentgen nurlari bilan nurlantirilgan suyak ichida va uning yaqinida energiya yutilishining ortishini tahlil qilgan [18]. Yod tufayli dozaning kuchayishi kilovoltli dastalar uchun hisoblangan [19, 20] va modifikatsiyalangan kompyuter tomografi yordamida o‘tkazilgan odam bosh miyasi metastazlarining ilk nur terapiyasida qo‘llanilgan [21]. Hainfeld va hammualliflarining ishidan [9] buyon oltin nanozarrachalari hujayralarda va MK modellashtirish yordamida keng o‘rganilmoqda [22–25], ularning ta’sir mexanizmlari esa sharh maqolalarda umumlashtirilgan [7, 26–28]. Turli elementlar foton energiyasiga bog‘liq holda nazariy jihatdan taqqoslangan [13, 29]. Shuningdek, nanozarrachalar atrofida dozaning kuchayishi yuqori darajada lokallashganligi [30] hamda energiyaning bunday nanomiqyosda yutilishi dozaning makroskopik kuchayishi doirasidan chiqadigan biologik effektlarni tushuntirib bera olishi ko‘rsatilgan [31].

Kumushga kelsak, dastlabki ishlardan birida AgNZ saraton hujayralarining nurlanish ta’sirida halok bo‘lishga sezgirligini oshirishi ko‘rsatilgan [32], keyingi tadqiqotlarda esa AgNZning gliomada [11, 12, 33, 34], ko‘krak bezi saratoni hujayralarida [35] va kolorektal saratonda [36] radiosensibilizatsiyalovchi ta’siri namoyish etilgan. AgNZning o‘zi sitotoksik va genotoksik xususiyatga ega bo‘lib, kislorodning faol shakllari (KFSh) hosil bo‘lishini va DNK shikastlanishini keltirib chiqaradi [37], shu sababli ular ta’sirining bir qismi fizik emas, balki kimyoviy yoki biologik tabiatga ega bo‘lishi mumkin. Kumushga oid dozimetrik tadqiqotlar qatoriga bosh miya o‘smalarining braxiterapiyasi uchun [38], kumush kiritilgan o‘smani o‘rab turgan sog‘lom to‘qimalar uchun [39] va oltin bilan taqqoslagan holda qatlamli teri geometriyalari uchun [40] bajarilgan MK hisoblari, shuningdek AgNZ bilan boyitilgan dozimetrik gellardagi o‘lchovlar [41] kiradi; ortovoltli dastalarda nanozarrachalar tufayli dozaning kuchayishining chuqurlikka bog‘liqligi fantomda MK usulida bajarilgan tadqiqotda o‘rganilgan [42].

Rentgen trubkasi spektrlarini modellashtirish usullari empirik [43] va yarim empirik modellardan [44, 45] tortib fizikaviy asoslangan deterministik modellar [15, 46–48] va to‘liq MK modellashtirishgacha [49, 50] bo‘lgan keng doirani qamrab oladi. Ularning aksariyati volfram anodlar uchun ishlab chiqilgan [43, 45, 48]. O‘lchangan spektrlar va YSQ qiymatlari bilan solishtirib validatsiya qilingan [51] SpekPy dasturiy vositalar to‘plami o‘zining 2-versiyasida mis anodni ham qo‘llab-quvvatlaydi [15]. Mis anodli trubkalar asosan rentgen difraksiyasida qo‘llaniladi, bu yerda nikel filtr yordamida deyarli monoxromatik Cu Kα dastasi olinadi [52], kumush tufayli dozaning kuchayishi uchun esa Ag K-chegarasidan yuqori energiyali fotonlar zarur. Shunday qilib, past kuchlanishli mis anodli trubkaning konstruksiyasi va filtrlanishi, uning spektri hamda kumush kiritilgan to‘qimaning DEF qiymati o‘rtasidagi bog‘liqlik ushbu ishda ko‘rib chiqilgan adabiyotlarda miqdoriy jihatdan o‘rganilmagan va aynan shu bo‘shliq dissertatsiyaning maqsadi va vazifalarini belgilab berdi.

**Tadqiqotning maqsadi.** Ishning maqsadi 45 kV li mis anodli rentgen trubkasi spektrini uning konstruktiv va texnik parametrlari hamda filtrlanishiga bog‘liq holda modellashtirish va shu asosda kumush saqlovchi yumshoq to‘qimaning DEF qiymatini hamda maqbul doza quvvatida uni eng katta qiymatga yetkazadigan filtrlashni miqdoriy jihatdan aniqlashdan iborat.

**Tadqiqotning vazifalari.** Qo‘yilgan maqsadga erishish uchun quyidagi vazifalar hal qilindi:

1. Yuqori Z li elementlar, xususan, kumush yordamida radiosensibilizatsiya hamda rentgen trubkasi spektrlarini modellashtirishga oid adabiyotlarni tahlil qilish.
2. Elektronlarning sekinlashishi, tormozlanish nurlanishi, bevosita hosil bo‘ladigan va tormozlanish nurlanishi ta’sirida hosil bo‘ladigan xarakteristik K nurlanish, anodda o‘z-o‘zini yutish, shuningdek oyna, havo va filtrlarda susayishni hisobga oluvchi mis anodli trubka spektrining qalin nishon uchun yarim analitik modelini ishlab chiqish.
3. Ishlab chiqilgan modelni SpekPy v2 dasturiy vositalar to‘plami bilan solishtirib validatsiya qilish va uning yagona moslashtiriladigan parametrini aniqlash.
4. 45 kV li trubkaning spektri va dasta sifati parametrlarini hamda ularning anod burchagi, trubka kuchlanishi, berilliy oyna va qo‘shimcha filtrlarga bog‘liqligini hisoblash.
5. Massa bo‘yicha 0,1–2 % kumush saqlovchi yumshoq to‘qimaning DEF qiymatini hisoblash va maqbul doza quvvatida uni eng katta qiymatga yetkazadigan filtrlarni topish.
6. DEFning chuqurlikka bog‘liqligini va kumush kiritilgan soha tomonidan o‘z-o‘zini ekranlashni o‘rganish hamda analitik natijalarni mustaqil MK hisobi yordamida verifikatsiya qilish.
7. Kumushni boshqa yuqori Z li elementlar bilan taqqoslash, DEF noaniqligini baholash va tajribalar uchun amaliy tavsiyalar ishlab chiqish.

**Tadqiqotning obyekti.** Tadqiqot obyekti mis anodli 45 kV li rentgen trubkasining rentgen nurlanishi va uning kumush saqlovchi yumshoq biologik to‘qima bilan o‘zaro ta’siridir.

**Tadqiqotning predmeti.** Tadqiqot predmeti rentgen spektrining shakllanishi, uning trubka konstruksiyasi va filtrlanishiga bog‘liqligi hamda buning natijasida kumush kiritilgan to‘qima uchun hosil bo‘ladigan DEF qiymatidir.

**Tadqiqot usullari.** Spektr ishlab chiqilgan model (IM) yordamida hisoblanadi; bu model uzluksiz sekinlashish yaqinlashuvida (CSDA) Bethe ionizatsion tormozlanish qobiliyatiga, Elwert ko‘paytuvchisi kiritilgan norelyativistik Bethe–Heitler tormozlanish nurlanishi kesimiga va Gryzinski K-qobiq ionizatsiyasi kesimiga asoslangan qalin nishonning yarim analitik modelidir [53–57]; SpekPy v2.5.4 esa taqqoslash uchun etalon model vazifasini bajaradi [15, 58]. O‘zaro ta’sir ma’lumotlari Hubbell va Seltzerning NIST jadvallaridan [59] hamda xraylib kutubxonasidan [60] olinadi, tayanch muhit sifatida ICRU-44 yumshoq to‘qimasi qabul qilingan [61]. DEF kerma yaqinlashuvida hisoblanadi, bu yaqinlashuv zaryadli zarralar muvozanati (ZZM) mavjudligini nazarda tutadi [62]; hisoblangan qiymatlar ushbu ish uchun yozilgan fotonlar ko‘chishining MK dasturi yordamida verifikatsiya qilinadi, bu dastur Vudkok usulidan (delta-treking) foydalanadi [63], Ag K flyuoressensiyasini hamda kogerent va nokogerent sochilishni modellashtiradi [64] va ikkilamchi elektronlar energiyasini ular hosil bo‘lgan joyda yutilgan deb hisoblaydi. Noaniqlik sezgirlik tahlili yordamida baholanadi; hisoblar Python tilida NumPy, SciPy va Matplotlib kutubxonalaridan foydalangan holda amalga oshirilgan [65–67].

**Tadqiqotning ilmiy yangiligi.** Ishning ilmiy yangiligi quyidagilardan iborat:

1. Qaytaruvchi nishonli mis anodli rentgen trubkasi spektrining yarim analitik modeli ishlab chiqildi; unda yagona moslashtiriladigan parametr — elektronlarning chuqurlik koeffitsiyenti $\eta$ qo‘llaniladi, tormozlanish nurlanishi ta’sirida hosil bo‘ladigan xarakteristik K nurlanish esa yopiq ko‘rinishdagi ifoda bilan tavsiflanadi. SpekPy v2 tormozlanish spektrining shakliga moslashtirilgan $\eta = 0{,}40$ qiymatida (o‘rtacha kvadratik chetlanish 2,46 %) IM qayta moslashtirishsiz 25–50 kV kuchlanishlar va 6–30° anod burchaklari uchun 1 mm Al bilan filtrlangan SpekPy spektrlarining YSQ qiymatini −3,5 dan −4,6 % gacha bo‘lgan chetlanishlar bilan, ularning o‘rtacha energiyasini esa 0,54 keV dan oshmaydigan farq bilan takrorlaydi.
2. Qo‘shimcha filtrlash bo‘lmaganda massa bo‘yicha 1 % kumush uchun DEF atigi 1,20 ga tengligi hamda 6–30° anod burchaklari, 25–50 kV trubka kuchlanishlari va 0,15–2 mm qalinlikdagi berilliy oynalarda 1,19–1,21 oralig‘ida qolishi aniqlandi, chunki dozani asosan Cu K chiziqlari va yumshoq tormozlanish nurlanishi hosil qiladi. Qo‘shimcha filtrlash hal qiluvchi omil hisoblanadi: DEF 1 mm Al bilan 1,48 ga, 2 mm Al bilan 1,62 ga va 0,2 mm Cu bilan 1,80 ga teng bo‘ladi, biroq bunda havodagi kerma 120–1300 marta kamayadi.
3. Havodagi kerma bo‘yicha o‘tkazish koeffitsiyenti bir xil bo‘lganda 9–45 keV oralig‘ida yutilish chegaralariga ega bo‘lmagan yengil va o‘rtacha Z li filtrlar (Al, Si, Ca, Sc, Ti) eng yuqori DEF qiymatini beradi, K-chegaralari 20–30 keV da joylashgan filtrlar (Mo, Ag, Sn) esa kuchli filtrlashda eng kam samarali bo‘ladi. O‘tkazish koeffitsiyenti 0,1 % bo‘lganda 1 % kumush uchun DEF Sc yoki Ti filtrlari bilan taxminan 1,91 ni, Ag filtri bilan esa atigi 1,34 ni tashkil etadi.
4. 1 mm Al bilan filtrlashda 1 % kumush uchun DEF sirtdagi 1,48 dan 20 mm chuqurlikda 1,69 gacha ortadi (dastaning qattiqlashishi), biroq kumush bir tekis kiritilgan soha ichida 10 mm chuqurlikda 1,21 gacha kamayadi (o‘z-o‘zini ekranlash); 1 % kumush saqlovchi 10 mm qalinlikdagi qatlam ortidagi doza kumushsiz holdagi qiymatning taxminan 0,80 qismigacha pasayadi. Ushbu qatlam uchun bajarilgan mustaqil MK hisobi analitik modelni 1–10 % doirasida tasdiqladi va qayta yutilgan Ag K flyuoressensiya nurlanishi hamda sochilgan fotonlarning rolini ochib berdi.
5. Massa birligiga nisbatan kumush 45 kV da oltin, platina, vismut va gadoliniyga qaraganda kuchsizroq fizik sensibilizator hisoblanadi (1 mm Al bilan filtrlashda DEF 1,48 ga teng, oltin uchun esa 2,16) va samaradorligi jihatidan yod (1,46) bilan taqqoslanarli. Shu sababli AgNZ uchun AuNZga qaraganda kuchliroq biologik radiosensibilizatsiya qayd etilganligi [12] dozaning makroskopik fizik kuchayishi doirasidan chiqadigan kimyoviy va biologik mexanizmlar hamda nanomiqyosdagi effektlar mavjudligidan dalolat beradi.

**Tadqiqotning amaliy ahamiyati.** IM va uning dasturiy ta’minoti kumush saqlovchi radiosensibilizatorlar bilan radiobiologik tajribalarni rejalashtirish uchun zarur bo‘lgan past kuchlanishli mis anodli trubkalarning spektri, havodagi kermasi va dasta sifatini berilgan konstruktiv parametrlar va filtrlar uchun hisoblash imkonini beradi. 45 kV li mis anodli trubka uchun 1–2 mm qalinlikdagi alyuminiy filtr (yoki 0,1–0,3 mm qalinlikdagi titan filtr) tavsiya etiladi: alyuminiy filtr qo‘llanganda 1 % kumush uchun DEF 1,48–1,62 ni tashkil etadi, namuna sirtida (fokus dog‘idan 10 sm masofada, 40 mA) to‘qimadagi 2 Gr kerma taxminan 15–33 s ichida beriladi. Shuningdek, xraylib 4.3.0 kutubxonasining CS_Energy funksiyasi 15–45 keV da yengil elementlarning massaviy energiya yutilish koeffitsiyentlarini 37 % gacha (30 keV da kislorod uchun) kamaytirib berishi aniqlandi, bu esa DEFning oshirib baholanishiga olib kelgan bo‘lar edi (1 % kumush va 1 mm Al uchun 1,48 o‘rniga 1,72); shu sababli NIST jadvallaridan foydalanish lozim.

**Natijalarning ishonchliligi.** Natijalarning ishonchliligi umume’tirof etilgan fizik modellar va baholangan ma’lumotlar, xususan, fotonlarning o‘zaro ta’siri bo‘yicha NIST jadvallari [59] va ICRUning 37-hisobotidagi tormozlanish qobiliyati parametrlari [68] bilan ta’minlanadi. Amalga oshirilgan Bethe formulasi 50 keV da suvning NIST ESTAR bazasidagi ionizatsion tormozlanish qobiliyatini (6,603 MeV sm$^2$/g) takrorlaydi [69]. IM, shuningdek, 50–100 kV da volfram anod uchun SpekPy YSQ qiymatlarini 6 % aniqlik bilan takrorlaydi, SpekPyning o‘zi esa o‘lchov natijalari bilan solishtirib validatsiya qilingan [51]. MK dasturining o‘zaro ta’sir ma’lumotlaridan tiklangan energiya uzatish koeffitsiyentlari 20–40 keV da H, C va O elementlarining NIST massaviy energiya yutilish koeffitsiyentlarini 0,3 % aniqlik bilan takrorlaydi, DEFning MK va analitik qiymatlari esa o‘zaro 1–10 % doirasida mos keladi. Sezgirlik tahlili 1 % kumush va 1 mm Al bilan filtrlash uchun DEF = 1,48 ± 0,02 (qamrov koeffitsiyenti $k = 1$) ekanligini ko‘rsatadi.

**Natijalarning aprobatsiyasi.** Dissertatsiyaning asosiy natijalari quyidagi anjumanlarda ma’ruza qilingan va muhokama etilgan: [muallif tomonidan to‘ldiriladi: natijalar ma’ruza qilingan konferensiyalar va seminarlar].

**Natijalarning e’lon qilinganligi.** Dissertatsiyaning asosiy natijalari quyidagi ishlarda bayon etilgan: [muallif tomonidan to‘ldiriladi: nashrlar ro‘yxati].

**Dissertatsiyaning tuzilishi va hajmi.** Dissertatsiya kirish, uch bob, xulosa, foydalanilgan adabiyotlar ro‘yxati va ilovalardan iborat bo‘lib, ulardan oldin uch tildagi (o‘zbek, rus va ingliz tillaridagi) annotatsiyalar hamda qisqartmalar va belgilar ro‘yxati keltirilgan. Ish 90 betda bayon etilgan bo‘lib, 0 ta rasm, 0 ta jadval va 121 ta adabiyot manbasini o‘z ichiga oladi. I bobda yuqori Z li radiosensibilizatorlar va spektrni modellashtirishga oid adabiyotlar sharhi berilgan, II bobda IM hamda dasta sifati parametrlari va DEFni hisoblash usullari, jumladan MK yordamida verifikatsiya bayon etilgan, III bobda esa olingan natijalar keltirilgan va muhokama qilingan. Ilovalarda boshlang‘ich kod fragmentlari va hisoblarning takrorlanuvchanligiga oid ma’lumotlar keltirilgan.


# I BOB. ATOM RAQAMI YUQORI ELEMENTLAR YORDAMIDA RADIOSENSIBILIZATSIYA VA RENTGEN SPEKTRINI MODELLASHTIRISH: ADABIYOTLAR SHARHI

Ushbu bobda ishning fizik va radiobiologik asoslari ko‘rib chiqiladi. Unda radiosensibilizatorlardan foydalanishni taqozo etuvchi klinik muammo, kilovoltli fotonlarning biologik muhit bilan o‘zaro ta’siri hamda atom raqami yuqori elementlar (yuqori Z li elementlar) yordamida radiosensibilizatsiyaning yodli kontrast moddalardan metall nanozarrachalarigacha bo‘lgan rivojlanish yo‘li tahlil qilinadi. So‘ngra kumush radiosensibilizator sifatida hamda rentgen trubkalari spektrlarini modellashtirish usullari sharhlanadi. Bob ushbu dissertatsiyaning vazifalarini belgilab beruvchi xulosalar bilan yakunlanadi.

## 1.1. Nur terapiyasi va normal to‘qimalar chidamliligi muammosi

Saraton butun dunyoda kasallanish va o‘limning asosiy sabablaridan biri hisoblanadi [1]. Nur terapiyasi (RT) jarrohlik va kimyoterapiya bilan bir qatorda saratonni davolashning asosiy usullaridan biridir [4]. Dalillarga asoslangan klinik tavsiyalar tahliliga ko‘ra, RTdan foydalanishning optimal ulushi taxminan 52 % ni tashkil etadi, ya’ni barcha onkologik bemorlarning qariyb yarmida RT uchun ko‘rsatma mavjud [2]. RTning terapevtik ta’siri hujayra DNKsining shikastlanishiga asoslangan; bu shikastlanish bevosita ikkilamchi elektronlar tomonidan yoki bilvosita suv radiolizida hosil bo‘ladigan erkin radikallar tomonidan yuzaga keltiriladi, bunday shikastlanishlarning eng halokatlisi esa DNKning ikki zanjirli uzilishlaridir [3]. Ionlashtiruvchi nurlanish energiyasining ajralishi tanlab sodir bo‘lmagani sababli, xuddi shunday shikastlanishlar dasta o‘tadigan sog‘lom to‘qimalarda ham yuzaga keladi va oxir-oqibat ularning javob reaksiyasi o‘smaga berilishi mumkin bo‘lgan dozani cheklaydi [3, 4].

Bu cheklovning miqdoriy ifodasi terapevtik interval (terapevtik indeks) hisoblanadi. O‘smani nazorat qilish ehtimolligi ham, normal to‘qimalarda asoratlar yuzaga kelish ehtimolligi ham doza ortishi bilan sigmasimon “doza–javob” egri chiziqlari bo‘ylab ortadi, terapevtik interval esa bu egri chiziqlarning bir-biridan qanchalik ajralganligini tavsiflaydi [3]. Egri chiziqlar bir-biriga yaqin joylashganda, mahalliy nazoratni yaxshilashi mumkin bo‘lgan dozani oshirish og‘ir asoratlarning yo‘l qo‘yib bo‘lmaydigan darajada ko‘payishiga ham olib keladi, shu sababli nishon yaqinidagi normal to‘qimalar va a’zolarning chidamliligi buyuriladigan dozani cheklaydi. Shuning uchun normal to‘qimalarga nisbatan toksiklik RT samaradorligini cheklovchi asosiy omil deb hisoblanadi [4]. Radiorezistent o‘smalarda, xususan, gipoksik hujayralarni saqlovchi o‘smalarda bu muammo yanada keskinlashadi, chunki bunday hujayralar kislorod effekti tufayli kislorod bilan yaxshi ta’minlangan hujayralarga qaraganda rentgen nurlanishiga ancha kam sezgir [3].

Terapevtik intervalni kengaytirish uchun bir nechta strategiya ishlab chiqilgan. Umumiy dozani fraksiyalash normal va o‘sma to‘qimalarida shikastlanishlarning reparatsiyasi va tiklanishidagi farqlardan foydalanadi [3, 4]. Intensivligi modulyatsiyalangan RT kabi konformal usullar tasvir nazorati ostida nurlash bilan birgalikda yuqori doza sohasini nishon hajmi shakliga moslashtiradi va normal to‘qimaning nurlanadigan hajmini kamaytiradi [4, 17]. Biroq bu yondashuvlarning hech biri dastaning bir xil sohasida joylashgan o‘sma hujayralari va normal hujayralarda massa birligiga to‘g‘ri keladigan yutilgan energiyalar nisbatini o‘zgartirmaydi. Uchinchi strategiya aynan shu nisbatga bevosita ta’sir ko‘rsatadi: radiosensibilizatorlar nurlanishning o‘sma hujayralariga ta’sirini normal hujayralarga ta’siriga qaraganda ko‘proq kuchaytiradigan vositalardir [3, 5].

Kimyoviy radiosensibilizatorlar qatoriga gipoksik hujayralarda kislorod ta’sirini taqlid qiluvchi kislorod mimetiklari, masalan, nitroimidazollar kiradi [5]. Platina, oltin, ruteniy va boshqa o‘tish metallarining birikmalari kimyoviy va biologik faollikni og‘ir atomlarning mavjudligi bilan birlashtiradi [6]. Atom raqami yuqori elementlardan foydalanish esa boshqacha, mohiyatan fizik tamoyilga asoslanadi. O‘smada to‘plangan bunday element tushayotgan fotonlar energiyasining yumshoq to‘qimaga qaraganda kattaroq ulushini yutadi, natijada o‘smadagi doza ortadi, elementni saqlamaydigan atrofdagi to‘qimadagi doza esa birinchi yaqinlashuvda o‘zgarmay qoladi [7, 9]. Bu ortishning kattaligi dozani kuchaytirish koeffitsiyenti (DEF) bilan ifodalanadi; u atom raqami yuqori vositani saqlovchi to‘qimadagi yutilgan dozaning shu vositasiz xuddi shu to‘qimadagi yutilgan dozaga nisbatidir (2.6-bo‘lim). Kimyoviy sensibilizatsiyadan farqli ravishda, effektning bu fizik tashkil etuvchisini nurlanish maydoni ma’lum bo‘lganda o‘zaro ta’sir ma’lumotlari asosida hisoblash mumkin.

Atom raqami yuqori elementdan olinadigan fizik samara foton energiyasiga kuchli bog‘liq. Oltin nanozarrachalari uchun bajarilgan Monte-Karlo (MK) hisoblari dozaning makroskopik kuchayishi kilovoltli rentgen dastalarida megavoltli dastalardagiga qaraganda ancha katta ekanligini ko‘rsatgan [10], chunki Z ga kuchli bog‘liq bo‘lgan fotoeffekt faqat past foton energiyalarida ustunlik qiladi (1.2-bo‘lim). Kilovoltli rentgen nurlari yuza va ortovoltli terapiyada qo‘llaniladi [17], nur terapiyasi va radiobiologiyada 40–300 kV li dastalar dozimetriyasi esa maxsus protokollarga muvofiq amalga oshiriladi; ularda dasta sifati yarim susaytirish qatlami (YSQ) orqali belgilanadi [14, 70]. Kuchayish fotonlarning energetik taqsimoti bilan aniqlangani sababli, biror vositaning DEF qiymatini rentgen spektrini ko‘rsatmasdan keltirib bo‘lmaydi, spektr esa rentgen trubkasining konstruksiyasi va uning filtrlanishiga bog‘liq. Ushbu ishda bu masala mis anodli 45 kV li rentgen trubkasi dastasi bilan nurlantiriladigan kumush uchun ko‘rib chiqiladi.

## 1.2. Kilovoltli fotonlarning biologik muhit bilan o‘zaro ta’siri

50 keV gacha bo‘lgan energiyalarda fotonlar modda bilan fotoelektrik yutilish, nokogerent (kompton) sochilish va kogerent (reley) sochilish orqali o‘zaro ta’sirlashadi; juftlar hosil bo‘lishi mumkin emas, chunki uning bo‘sag‘asi $2m_ec^2 = 1{,}022$ MeV (elektronning tinchlik energiyasidan ikki baravar katta) bu oraliqdan ancha yuqorida yotadi [8, 62]. Materialning massaviy susayish koeffitsiyenti ushbu jarayonlar parsial koeffitsiyentlarining yig‘indisiga teng [62, 71]:

$$\frac{\mu}{\rho} = \frac{\tau}{\rho} + \frac{\sigma_{\mathrm{coh}}}{\rho} + \frac{\sigma_{\mathrm{inc}}}{\rho}$$

EQNUM[1.1]


bu yerda $\mu$ — chiziqli susayish koeffitsiyenti, $\rho$ — muhitning zichligi, $\tau/\rho$, $\sigma_{\mathrm{coh}}/\rho$ va $\sigma_{\mathrm{inc}}/\rho$ esa mos ravishda fotoelektrik yutilish, kogerent sochilish va nokogerent sochilishning massaviy koeffitsiyentlari bo‘lib, ularning barchasi sm²/g da ifodalanadi. Yumshoq to‘qima kabi aralashma uchun elementlarning koeffitsiyentlari ularning massa ulushlari bilan tortilgan holda qo‘shiladi [62]; baholangan ma’lumotlar Standartlar va texnologiyalar milliy instituti (NIST) tomonidan jadval ko‘rinishida e’lon qilingan [59, 72].

Fotoeffektda foton bog‘langan elektron tomonidan yutiladi va bu elektron foton energiyasi $E$ dan uning bog‘lanish energiyasini ayirganga teng kinetik energiya bilan atomdan uchib chiqadi [8]. O‘zaro ta’sir asosan energetik jihatdan mumkin bo‘lgan eng kuchli bog‘langan qobiq bilan sodir bo‘ladi, yutilish chegaralari oralig‘ida esa fotoeffektning massaviy koeffitsiyenti taqriban quyidagicha o‘zgaradi:

$$\frac{\tau}{\rho} \propto \frac{Z^{3}}{E^{3}}$$

EQNUM[1.2]


bu yerda $Z$ — yutuvchi elementning atom raqami; atom kesimi esa taqriban $Z^{4}/E^{3}$ ga proporsional ravishda o‘zgaradi [8, 62]. Shu sababli massa birligiga hisoblaganda og‘ir element fotonlarni yumshoq to‘qima massasining deyarli hammasini tashkil etuvchi H, C, N va O ga qaraganda ancha kuchli yutadi [61]. Biroq bu bog‘liqlik faqat yutilish chegaralari oralig‘ida bajariladi: og‘ir elementning K-chegarasidan past energiyalarda uning K-qobiq elektronlari fotoyutilishda ishtirok eta olmaydi va uning koeffitsiyentining to‘qima koeffitsiyentiga nisbati faqat atom raqamlariga asoslanib kutilganidan ancha kichik bo‘ladi.

Yutilish chegaralari — $\tau/\rho$ ning atom qobiqlarining bog‘lanish energiyalariga teng foton energiyalarida keskin ortishidir [8]; kumush uchun K-chegara 25,514 keV da, uchta L-qobiqcha chegaralari esa 3,35 dan 3,81 keV gacha bo‘lgan oraliqda joylashgan. Fotoyutilish natijasida hosil bo‘lgan vakansiya tashqi qobiqdan to‘ldiriladi, bunda ajralgan energiya yoki xarakteristik (flyuoressent) rentgen fotoni, yoki Oje elektroni ko‘rinishida chiqariladi [73, 74]. K-qobiqning flyuoressensiya chiqishi $\omega_K$, ya’ni K-qobiq vakansiyasining nurlanish bilan relaksatsiyalanish ehtimolligi, $Z$ ortishi bilan tez ortadi: u alyuminiy uchun 0,039 ga, mis uchun 0,454 ga, kumush uchun 0,831 ga va oltin uchun 0,960 ga teng (2.2-jadval) [60, 74]. K-qobiqdagi bog‘lanish energiyalari 1 keV dan kichik bo‘lgan H, C, N va O da yutilgan energiyaning deyarli hammasi o‘zaro ta’sir joyi yaqinida elektronlarning kinetik energiyasi ko‘rinishida qoladi. Og‘ir element esa, aksincha, uning katta qismini flyuoressensiya ko‘rinishida qayta chiqaradi: Ag Kα fotonlarining (taxminan 22 keV) yumshoq to‘qimadagi o‘rtacha erkin yugurish yo‘li taxminan 1,5 sm ni tashkil etadi, uning past energiyali Oje elektronlari esa o‘z energiyasini atomning bevosita yaqinida qoldiradi (1.3-bo‘lim).

Kompton sochilishida foton o‘z energiyasining bir qismini atom elektroniga uzatadi; kilovoltli energiyalarda sochilgan foton tushayotgan foton energiyasining katta qismini saqlab qoladi [8, 62]. Elektronning bog‘langanligi past energiyalarda va kichik burchaklarda erkin elektron uchun hisoblangan (Klein–Nishina) kesimni kamaytiradi; bu nokogerent sochilish funksiyasi $S(x,Z)$ bilan tavsiflanadi, bu yerda $x$ — impuls uzatish o‘zgaruvchisi; reley sochilishi esa fotonni faqat og‘diradi va atom form-faktori $F(x,Z)$ bilan tavsiflanadi [64]. Yumshoq to‘qimada 50 keV dan past oraliqning yuqori qismida nokogerent sochilish fotoyutilishdan ustun kela boshlaydi, kumushda esa butun oraliq bo‘ylab fotoyutilish ustunlik qiladi [8, 72]. O‘zaro ta’sirlashgan foton energiyasining hammasi ham mahalliy yutilmagani sababli, massaviy energiya yutilish koeffitsiyenti $\mu_{en}/\rho$ faqat zaryadli zarralarga uzatilgan va ular tomonidan tormozlanish nurlanishi ko‘rinishida qayta chiqarilmagan energiyani o‘z ichiga oladi [62, 75]:

$$\frac{\mu_{en}}{\rho} = \left[\frac{\tau}{\rho}\left(1-\frac{X}{E}\right) + \frac{\sigma_{\mathrm{inc}}}{\rho}\,\frac{\bar{T}_{\mathrm{inc}}}{E}\right]\left(1-\bar{g}\right)$$

EQNUM[1.3]


bu yerda $X$ — bitta fotoyutilish hodisasiga to‘g‘ri keladigan, flyuoressent nurlanish ko‘rinishida chiqariladigan o‘rtacha energiya, $\bar{T}_{\mathrm{inc}}$ — kompton tepki elektronining o‘rtacha kinetik energiyasi, $\bar{g}$ — ikkilamchi elektronlar kinetik energiyasining tormozlanish nurlanishiga aylanadigan o‘rtacha ulushi (past Z li muhitlarda kilovoltli fotonlar uchun bu ulush e’tiborsiz qoldirish mumkin bo‘lgan darajada kichik), qolgan belgilar esa (1.1) formuladagi kabi [62]. Ushbu ishda foydalanilgan $\mu_{en}/\rho$ ning NIST qiymatlari Seltzer hisoblariga asoslangan [59, 75].

Radiatsion birliklar va o‘lchovlar bo‘yicha xalqaro komissiya (ICRU) ta’riflariga ko‘ra, kerma $K$ — fotonlar tomonidan massa birligida ozod qilingan barcha zaryadli zarralar boshlang‘ich kinetik energiyalarining yig‘indisi, to‘qnashuv kermasi $K_{\mathrm{col}}$ — uning tormozlanish nurlanishiga aylanmaydigan qismi, yutilgan doza $D$ esa massa birligiga beriladigan o‘rtacha energiya bo‘lib, u greylarda o‘lchanadi (1 Gr = 1 J/kg) [62, 76]. Zaryadli zarralar muvozanati (ZZM) sharoitida, ya’ni zaryadli zarralar tomonidan kichik hajmga olib kiriladigan energiya undan olib chiqiladigan energiyaga teng bo‘lganda, yutilgan doza to‘qnashuv kermasiga teng bo‘ladi [62, 71]:

$$D = K_{\mathrm{col}} = \Psi\,\frac{\mu_{en}}{\rho}$$

EQNUM[1.4]


bu yerda $\Psi = \Phi E$ — energiyasi $E$ va flyuensi $\Phi$ bo‘lgan monoenergetik fotonlarning energiya flyuensi; polienergetik dasta uchun o‘ng tomon foton spektri bo‘yicha integrallanadi (2.5-bo‘lim). 50 keV dan past energiyali fotonlar ozod qilgan ikkilamchi elektronlarning to‘qimadagi yugurish yo‘llari bir millimetrdan ancha qisqa, shu sababli ZZM sirtlar va chegaralarga yaqin joylarda ham qaror topadi, Fano teoremasiga ko‘ra esa atom tarkibi bir jinsli bo‘lgan muhitda zichlikning o‘zgarishi uni buzmaydi [77]. Demak, bir xil foton spektri ta’siridagi ikki muhit spektr bo‘yicha o‘rtalashtirilgan massaviy energiya yutilish koeffitsiyentlarining nisbatiga teng nisbatdagi yutilgan dozalarni oladi. Bu munosabat kermaga asoslangan makroskopik DEFning (2.6-bo‘lim) asosida yotadi va faqat atom raqami yuqori qo‘shilmadan elektronlarning yugurish yo‘llari tartibidagi masofalar ichida buziladi.

Kumush va ICRU-44 yumshoq to‘qimasining [61] koeffitsiyentlari NIST jadvallari [59] asosida qurilgan 1.1-rasmda taqqoslangan. Taxminan 4 keV dan yuqorida, ya’ni L-chegaralardan yuqorida, kumushning ikkala koeffitsiyenti ham to‘qimanikidan bir tartibdan ko‘proq katta, massaviy energiya yutilish koeffitsiyentlarining nisbati esa 8 keV dagi 21,0 dan 25 keV dagi 31,8 gacha ortadi. K-chegarada kumushning $\mu/\rho$ koeffitsiyenti 5,8 marta, ya’ni 9,53 dan 55,4 sm²/g gacha ortadi, $\mu_{en}/\rho$ koeffitsiyenti esa atigi 2,4 marta, ya’ni 8,54 dan 20,3 sm²/g gacha ortadi. Buning sababi K-qobiq flyuoressensiyasidir: K vakansiyalarining taxminan 83 % i ($\omega_K = 0{,}831$) K rentgen nurlanishini, asosan, energiyasi taxminan 22 keV bo‘lgan Kα fotonlarini chiqarish orqali relaksatsiyalanadi; bu fotonlarning energiyasi o‘zaro ta’sir joyini tark etadi va $\mu_{en}/\rho$ ga kiritilmaydi.



![1.1-rasm. NIST ma’lumotlari bo‘yicha kumush va ICRU-44 yumshoq to‘qimasining 1–50 keV energiya oralig‘idagi massaviy susayish koeffitsiyentlari (uzluksiz chiziqlar) va massaviy energiya yutilish koeffitsiyentlari (shtrix chiziqlar). Vertikal shtrix chiziq 25,51 keV dagi Ag K-chegarasini belgilaydi; strelka kumushning L-qobiqcha chegaralarini ko‘rsatadi.](/home/user/atlant-impossible/dissertation/code/../figures/uz/fig02_coeffs.png){width=13.5cm}



Yumshoq to‘qima uchun ikkala koeffitsiyent taxminan 10 keV dan past energiyalarda deyarli ustma-ust tushadi, yuqoriroq energiyalarda esa bir-biridan uzoqlashadi, chunki u yerda kam energiya qoldiradigan sochilish susayishda tobora katta ulushni egallaydi. K-chegaradan yuqorida kumushning $\mu_{en}/\rho$ koeffitsiyenti energiya ortishi bilan uning $\mu/\rho$ koeffitsiyentiga qaraganda sekinroq kamayadi, chunki flyuoressensiyaning o‘zgarmas energiyasi foton energiyasining tobora kichikroq ulushini tashkil eta boradi; u to‘qimaning $\mu_{en}/\rho$ koeffitsiyentiga qaraganda ham sekinroq kamayadi. Natijada kumush va to‘qima massaviy energiya yutilish koeffitsiyentlarining nisbati chegarada taxminan 32 dan taxminan 76 gacha sakrab o‘zgargandan so‘ng ortishda davom etadi: u 30 keV da 102,7 ga, 35 keV da 120,0 ga yetadi va 40–45 keV da taxminan 139 ga teng maksimumga erishadi. Shu sababli fotonlar energiya flyuensining Ag K-chegarasidan yuqoridagi ulushi kumush yordamida kuchaytirilgan nurlash uchun mo‘ljallangan dastaning asosiy xarakteristikasi hisoblanadi, uni mis anodli trubka uchun aniqlash esa ushbu ishning markaziy vazifalaridan biridir.

## 1.3. Atom raqami yuqori radiosensibilizatorlar: yodli kontrast moddalardan metall nanozarrachalarigacha

Kilovoltli dastalarda atom raqami yuqori muhit yaqinida dozaning kuchayishi haqidagi tasavvur Spiers ishiga borib taqaladi; u suyakda energiya yutilishining ortishi va ikkilamchi elektronlarning yugurish yo‘llari nurlantirilgan suyak ichidagi va uning yaqinidagi yumshoq to‘qima dozasini qanday belgilashini tahlil qilgan [18]. Bu tahlil doza kuchayishiga oid keyingi konsepsiyalarning ikkala fizik tarkibiy qismini allaqachon o‘z ichiga olgan edi: atom raqami yuqori materialga energiya uzatilishining kuchayishi va ikkilamchi elektronlar orqali energiyaning qo‘shni to‘qimaga ko‘chirilishi. Keyinchalik Das va Chopra kilovoltli dastalarda to‘qima va atom raqami yuqori materiallar chegaralarida teskari sochilish tufayli dozaning g‘alayonlanishini miqdoriy baholagan [78]. Elektronlarning yugurish yo‘llari tartibidagi masofalardan uzoqroqda doza yana fotonlarning mahalliy flyuensi va energiya yutilish koeffitsiyenti bilan belgilanadi.

Dastlabki tizimli tadqiqotlarda klinik qo‘llashga ruxsat etilgan kontrast moddalar tarkibida mavjud bo‘lgan yoddan foydalanilgan. Matsudaira va hammualliflar yodli kontrast modda kulturada o‘stirilgan sutemizuvchilar hujayralarining rentgen nurlanishiga sezgirligini oshirishini, gamma-nurlanishga sezgirligini esa oshirmasligini aniqlagan [79]; bu past energiyali fotonlarning yod tomonidan fotoelektrik yutilishidan dalolat beradi. Mello va hammualliflar kilovoltli rentgen nurlari uchun yod kiritilgan o‘smalarda dozaning kuchayishini hisoblagan [19], Solberg va hammualliflar esa bosh miya o‘smalarini dozani kuchaytirish orqali davolash uchun DEF qiymatlarini hisoblab chiqqan [20]. Terapiya uchun modifikatsiyalangan kompyuter tomografi (CTRx) yordamida yodli kontrast modda bilan odam bosh miyasining metastatik o‘smalariga ilk bor nur terapiyasi o‘tkazilganda bu konsepsiya klinikaga yetib keldi [21]. Keyinchalik monoxromatik sinxrotron dastalaridan yodli kontrast modda kiritilgan F98 gliomasi bo‘lgan kalamushlarni davolashda [80] hamda hujayralarda barqaror yodli birikmalarning radiotoksikligini kuchaytirish uchun optimal energiyani eksperimental aniqlashda [81] foydalanilgan. Kontrast modda bilan kuchaytirilgan kilovoltli nur terapiyasi MK modellashtirish yordamida dozimetrik va mikrodozimetrik jihatdan ham tahlil qilingan [82], modifikatsiyalangan megavoltli dastalar esa yodli va gadoliniyli kontrast moddalar bilan birgalikda qo‘llanilgan [83].

Platina asosidagi preparatlar kimyoterapevtik vositani atom raqami yuqori atom bilan birlashtiradi. Biston va hammualliflar sisplatin bilan davolangan va monoxromatik sinxrotron rentgen nurlari bilan nurlantirilgan, radiorezistent F98 gliomasi bo‘lgan kalamushlarning tuzalganini xabar qilgan; bunda platinaning K-chegarasidagi fotoaktivatsiyasidan foydalanilgan [84]. Pignol va hammualliflar yododezoksiuridin, bromdezoksiuridin, platina tuzlari va gadoliniy porfirinli birikmalar yordamida radiosensibilizatsiyada ichki qobiqlar ionizatsiyasi va Oje kaskadlarining klinik ahamiyatini tahlil qilgan [85]; og‘ir atom DNK ichida yoki uning yaqinida joylashganda, qisqa yugurish yo‘lli Oje elektronlari o‘z energiyasini ushbu kritik nishon yaqinida qoldiradi. Bu ish e’tiborni atom raqami yuqori atomning nafaqat konsentratsiyasiga, balki uning hujayra ichidagi joylashuviga ham qaratdi, shundan buyon o‘tish metallarining komplekslari ushbu fizik mexanizmni kimyoviy va biologik faollik bilan birlashtiruvchi radiosensibilizatorlar sifatida keng o‘rganilmoqda [6].

Bu sohaning zamonaviy bosqichi Hainfeld va hammualliflarining tadqiqotidan boshlangan; unda diametri 1,9 nm bo‘lgan oltin nanozarrachalari (AuNZ) 250 kVp (kilovolt-pik) rentgen nurlari bilan nurlantirilgan, o‘smasi bor sichqonlarning bir yillik yashab qolish ko‘rsatkichini sezilarli darajada yaxshilagan [9]. Nanozarrachalarning samaradorligini belgilovchi asosiy parametrlar, ya’ni ularning materiali, o‘lchami va qoplamasi hamda foton energiyasi tizimli tahlil qilingan [86]. AuNZ yordamida radiosensibilizatsiya in vitro sharoitda yuza terapiyasida qo‘llaniladigan kilovoltli rentgen nurlari bilan [23], HeLa hujayralarida folat bilan konyugatsiyalangan AuNZ uchun ortovoltli va yuza terapiyasi dastalari bilan [87] hamda optimal foton energiyasini topish uchun qo‘llanilgan monoenergetik sinxrotron dastalari bilan [88] namoyish etilgan. Hujayralarning zarrachalarni o‘zlashtirishi va radiosensibilizatsiya zarrachalar o‘lchamiga bog‘liq [22], eritmadagi DNK bilan o‘tkazilgan tajribalar esa foton energiyasi, zarrachalar o‘lchami va konsentratsiyasini hal qiluvchi parametrlar sifatida aniqlagan [89]. Bu natijalar bir qator sharh maqolalarda [90–94] hamda klinik qo‘llashga olib boruvchi “yo‘l xaritasi”da [28] umumlashtirilgan.

AuNZ yordamida radiosensibilizatsiya fizikasi asosan MK modellashtirish orqali o‘rganilgan. Odatiy nur terapiyasi muolajalarida AuNZ tufayli o‘smadagi dozaning makroskopik kuchayishini MK usulida ilk bor baholagan ishdan [10] so‘ng Zhang va hammualliflar turli foton manbalari uchun o‘smada tanlab kuchayishni miqdoriy baholagan [24], Kakade va Sharma uni terapevtik foton dastalari uchun baholagan [95], Koger va Kirkby esa AuNZ bilan kuchaytirilgan yoysimon nur terapiyasi uchun kilovoltli diapazon optimal ekanligini aniqlagan [96]. Lechtman va hammualliflar radiosensibilizatsiyaning foton energiyasiga hamda nanozarrachalarning o‘lchami, konsentratsiyasi va joylashuviga qanday bog‘liqligini ko‘rsatgan [97]. Mikroskopik miqyosda AuNZ atrofida dozaning kuchayishi yuqori darajada lokallashgan [30], ularning ikkilamchi elektronlarining fazoviy taqsimoti esa Geant4 vositalar to‘plami yordamida tavsiflangan [25]. Bu tadqiqotlar energiyaga kuchli bog‘liqlikni izchil ko‘rsatadi, shu sababli tushayotgan spektrni ishonchli tavsiflash dozaning kuchayishini har qanday hisoblashning zaruriy sharti hisoblanadi.

Biroq atom raqami yuqori nanozarrachalarning biologik ta’sirini faqat o‘rtacha dozaning ortishi bilan tushuntirib bo‘lmaydi. Radiokuchayish odatda quyidagi bosqichlarga ajratiladi: zarracha fotonlarning qo‘shimcha energiyasini yutib, fotoelektronlar, Oje elektronlari va flyuoressent fotonlar chiqaradigan fizik bosqich; kislorodning faol shakllari (KFSh) qo‘shimcha hosil bo‘ladigan kimyoviy bosqich; hamda oksidlovchi stress, hujayra siklining buzilishi va DNK reparatsiyasining ingibirlanishini o‘z ichiga oluvchi biologik bosqich [7, 26, 27, 98]. McMahon va hammualliflar lokal effekt modeli yordamida nurlantirilgan og‘ir atomli nanozarrachalar yaqinida energiyaning nanomiqyosda o‘ta notekis ajralishi makroskopik doza kuchayishidan ortiq bo‘lgan biologik effektlarni tushuntirishi mumkinligini ko‘rsatgan [31]. Shu sababli hujayra tajribalarida o‘lchanadigan sensibilizatsiya koeffitsiyenti (SER) xuddi shu nurlash uchun makroskopik DEFdan katta bo‘lishi mumkin. Shunga qaramay, makroskopik DEF fizik hissani kimyoviy va biologik hissalardan ajratish uchun zarur bo‘lgan tayanch kattalik bo‘lib qolaveradi.

Adabiyotlarda oltin ustunlik qilsa-da, elementni tanlash o‘z-o‘zidan ravshan emas. Roeske va hammualliflar turli elementlarning nanozarrachalari tufayli kermaga asoslangan nazariy doza kuchayishini foton energiyasining funksiyasi sifatida tavsiflagan [13], McMahon va hammualliflar esa nanozarrachali radiosensibilizatorlar uchun elementni optimal tanlashda fizik modellashtirishdan foydalangan [29]. Kerma yaqinlashuvida taqqoslash elementning massaviy energiya yutilish koeffitsiyentining to‘qimanikiga nisbati $R(E)$ ga keltiriladi: elementning massa ulushi $w$ ga teng bo‘lgan va energiyasi $E$ bo‘lgan monoenergetik fotonlar bilan nurlantirilgan to‘qima uchun DEF $1 + w\,[R(E) - 1]$ ga teng (2.6-bo‘lim). Kumush, yod, gadoliniy, platina, oltin va vismut uchun $R(E)$ nisbati 1.2-rasmda 5–45 keV oralig‘ida ko‘rsatilgan; bu oraliq 45 kV li trubka spektrining deyarli hammasini qamrab oladi.



![1.2-rasm. 5–45 keV energiya oralig‘ida Ag, I, Gd, Pt, Au va Bi massaviy energiya yutilish koeffitsiyentining ICRU-44 yumshoq to‘qimasi koeffitsiyentiga nisbati (NIST ma’lumotlari). Vertikal shtrix chiziq 25,51 keV dagi Ag K-chegarasini belgilaydi.](/home/user/atlant-impossible/dissertation/code/../figures/uz/fig03_ratio.png){width=13.5cm}



Taxminan 12 keV dan past energiyalarda kumush, platina, oltin va vismut uchun nisbatlar bir-biriga yaqin, yod uchun esa biroz yuqoriroq. Gadoliniy o‘zining L-chegaralaridan (7,2–8,4 keV) yuqorida va taxminan 13 keV gacha eng yuqori nisbatga ega, shu sababli u taxminan 8,0 keV dagi Cu Kα chiziqlarini ayniqsa samarali yutadi. Platina, oltin va vismutning taxminan 12–16 keV dagi L-chegaralari ularning nisbatlarini bir necha baravar oshiradi, taxminan 12 dan 25,5 keV gacha bo‘lgan oraliqda esa oltita element orasida eng past nisbat kumushga to‘g‘ri keladi. Kumush o‘zining K-chegarasidan yuqorida avval K-chegarasi (50,239 keV) dastadagi fotonlarning maksimal energiyasidan yuqorida joylashgan gadoliniyga tenglashadi, so‘ngra undan oshib ketadi, yodning 33,169 keV dagi K-chegarasigacha esa yoddan ham ustun turadi. 40–45 keV da yod, platina va kumush uchun nisbatlar taqqoslanarli bo‘lib qoladi, oltin va vismut esa eng yuqori qiymatlarni saqlab qoladi.

Bundan ikki xulosa kelib chiqadi. Birinchidan, massa birligiga hisoblaganda kumush platina, oltin va vismutga qaraganda kuchsizroq fizik sensibilizator bo‘lishi kutiladi, chunki oraliqning katta qismida ularning nisbatlari kumushnikidan yuqori; uning yod va gadoliniydan ustunligi faqat o‘z K-chegarasidan yuqori energiyalar bilan cheklangan, u yuqoriroq DEF berish-bermasligi esa spektrga bog‘liq. Ikkinchidan, kumushning fizik samaradorligi asosan fotonlar energiya flyuensining uning K-chegarasidan yuqoridagi ulushi bilan boshqariladi: 8 keV dan chegaragacha bo‘lgan, 8,0–8,9 keV dagi Cu K chiziqlarini ham o‘z ichiga olgan oraliqda kumushning massaviy energiya yutilish koeffitsiyenti to‘qimanikidan atigi 21–32 marta katta, chegaradan yuqorida esa 76–139 marta katta. Shu sababli energiya flyuensini 25,514 keV ga nisbatan qayta taqsimlaydigan trubkaning konstruktiv parametrlari, ayniqsa, uning filtrlanishi DEF uchun hal qiluvchi ahamiyatga ega bo‘lishi kutiladi; bu III bobda miqdoriy jihatdan tekshiriladi. Shunga qaramay, kumush foydasiga guvohlik beruvchi dalillar 1.4-bo‘limda ko‘rib chiqiladi.


## 1.4. Kumush va kumush nanozarrachalari radiosensibilizator sifatida

Kumush ($Z = 47$) yumshoq to‘qimaning yengil elementlari bilan atom raqami yuqori radiosensibilizatorlarga oid adabiyotlarda yetakchi o‘rin tutadigan oltin ($Z = 79$) kabi og‘ir elementlar o‘rtasida oraliq o‘rinni egallaydi. Kumush nanozarrachalari (AgNZ) biotibbiyotda keng o‘rganilmoqda. Ularning sintezi, xossalari va terapevtik qo‘llanilishi Wei va hammualliflar tomonidan [99], biotibbiy qo‘llanilishi, jumladan, mikroblarga qarshi va saratonga qarshi vosita sifatida qo‘llanilishi esa Burdușel va hammualliflar tomonidan [100] sharhlab chiqilgan. Kumush oltindan arzonroq, AgNZni esa “yashil” sintez usulida ham, masalan, reaksiya muhiti sifatida tuxum oqidan foydalanib olish mumkin [101]. Nur terapiyasi uchun kumushning ikki xossasi alohida qiziqish uyg‘otadi: uning biologik faolligi va K yutilish chegarasining bir necha o‘n kilovolt kuchlanishda ishlaydigan rentgen trubkalari spektrlari ichida joylashganligi.

AgNZning biologik faolligi ularning toksikligi bilan chambarchas bog‘liq. AshaRani va hammualliflar AgNZ inson hujayralarida sitotoksik va genotoksik ekanligini ko‘rsatgan: ular KFSh hosil bo‘lishini qo‘zg‘atadi, DNK shikastlanishiga va hujayra siklining to‘xtashiga sabab bo‘ladi hamda toksik javobga mitoxondriyalarni jalb etadi [37]. Bu ta’sirlar 1.3-bo‘limda tavsiflangan radiokuchayishning kimyoviy va biologik bosqichlariga mos keladi; bu bosqichlarda qo‘shimcha KFSh, oksidlovchi stress, hujayra siklining buzilishi va DNK reparatsiyasining ingibirlanishi dastlabki fizik shikastlanishni kuchaytiradi [7, 98]. Shu sababli AgNZ hujayralarning nurlanishga sezgirligini ular yuzaga keltiradigan fizik doza kuchayishining o‘zi ta’minlay oladigan darajadan ortiqroq oshirishi mumkin. Shu bilan birga, ularning sitotoksikligi [37] AgNZning o‘smada tanlab to‘planishini terapevtik qo‘llashning zaruriy shartiga aylantiradi, bundan tashqari, o‘smadagi doza kuchayishining atrofdagi sog‘lom to‘qimalarga ta’sirini ham baholash talab etiladi [39].

Kumush yordamida radiosensibilizatsiyaga oid eksperimental dalillar 1.1-jadvalda umumlashtirilgan. Dastlabki ishlardan birida Xu va hammualliflar AgNZ saraton hujayralarining ionlashtiruvchi nurlanish ta’sirida halok bo‘lishiga sezgirligini oshirishini ko‘rsatgan [32]. Lu va hammualliflar tuxum oqi ishtirokidagi “yashil” sintez orqali biologik mos AgNZ olgan va saraton hujayralariga nurlanish ta’sirining kuchayishini kuzatgan [101]. Ushbu ishlar guruhida eng ko‘p o‘rganilgan o‘sma modeli gliomadir. Liu va hammualliflar AgNZni glioma uchun yangi radiosensibilizator sifatida in vitro va in vivo tadqiq qilgan va ularni oltinga muqobil sifatida taklif etgan [11]. Keyingi tadqiqotda AgNZ U251 glioma hujayralarini in vitro sharoitda va gliomaning kalla ichi sichqon modelida radiosensibilizatsiyalashda AuNZdan ustun kelgan [12]. AgNZ, shuningdek, gipoksik glioma hujayralarida nur terapiyasining samaradorligini oshirgan [33], bu hujayralar esa kislorod effekti tufayli rentgen nurlanishiga kamroq sezgir [3]; AgNZni polietilenglikol (PEG) va AS1411 aptameri bilan funksionallashtirish ularning gliomani nurlash terapiyasidagi radiosensibilizatsiyalovchi ta’sirini kuchaytirgan [34]. Gliomadan tashqari, Swanner va hammualliflar AgNZning sitotoksik va radiosensibilizatsiyalovchi ta’sirlari sut bezi saratonining uch karra manfiy hujayralari va uch karra manfiy bo‘lmagan sut bezi hujayralarida farq qilishini aniqlagan [35], Habiba va hammualliflar esa kolorektal saraton nur terapiyasining samaradorligini oshirish uchun grafen bilan qoplangan kumush nanoprizmalarni radiosensibilizator sifatida qo‘llagan [36].

Table: 1.1-jadval. Kumush nanozarrachalarini radiosensibilizator sifatida o‘rganishga bag‘ishlangan tadqiqotlar.

| Tadqiqot | Tizim / nurlanish turi | Asosiy natija |
|:---|:---|:---|
| Xu va hammualliflar, 2009 [32] | Saraton hujayralari / ionlashtiruvchi nurlanish | AgNZ hujayralarning nurlanish ta’sirida halok bo‘lishiga sezgirligini oshirgan (dastlabki ma’lumot) |
| Lu va hammualliflar, 2012 [101] | Saraton hujayralari / nurlanish | “Yashil” sintez qilingan AgNZ: yaxshi biologik moslik, nurlanish ta’sirining kuchayishi |
| Liu va hammualliflar, 2013 [11] | Glioma, in vitro va in vivo / nurlanish | AgNZ radiosensibilizator va oltinga muqobil sifatida taklif etilgan |
| Swanner va hammualliflar, 2015 [35] | Uch karra manfiy va uch karra manfiy bo‘lmagan sut bezi hujayralari / nurlanish | Sitotoksik va radiosensibilizatsiyalovchi ta’sirlar hujayra turlariga qarab farq qilgan |
| Liu va hammualliflar, 2016 [12] | U251 glioma hujayralari; kalla ichi sichqon modeli / nurlanish | AgNZ radiosensibilizator sifatida AuNZdan ustun kelgan |
| Liu va hammualliflar, 2018 [33] | Gipoksik glioma hujayralari / nur terapiyasi | AgNZ gipoksiya sharoitida nur terapiyasining samaradorligini oshirgan |
| Zhao va hammualliflar, 2019 [34] | Glioma / nurlash terapiyasi | PEG va AS1411 bilan funksionallashtirilgan AgNZ radiosensibilizatsiyani kuchaytirgan |
| Habiba va hammualliflar, 2019 [36] | Kolorektal saraton / nur terapiyasi | Grafen bilan qoplangan kumush nanoprizmalar radiosensibilizator vazifasini bajargan |

1.1-jadvaldagi tadqiqotlar zarrachalarning turi va qoplamasi, masalan, PEG va aptamer bilan qoplangan AgNZ [34] yoki grafen bilan qoplangan nanoprizmalar [36], biologik modellar hamda nurlash sharoitlari bo‘yicha bir-biridan farq qiladi. Shu sababli ularning natijalarini bir-biri bilan miqdoriy jihatdan taqqoslab bo‘lmaydi. Bundan tashqari, fizik doza kuchayishi foton spektriga kuchli bog‘liq (1.3-bo‘lim), shuning uchun spektri ko‘rsatilmagan holda keltirilgan biologik kuchayish koeffitsiyentini fizik va nofizik hissalarga ajratib bo‘lmaydi. Oltin bilan taqqoslash [12] ayniqsa ibratlidir. Massa birligiga hisoblaganda, taxminan 12 keV dan past energiyalarda kumush va oltin foton energiyasini taqqoslanarli darajada yutadi, taxminan 12 dan 45 keV gacha bo‘lgan oraliqda esa oltin kuchliroq yutadi (1.2-rasm). Megavoltli dastalarda esa, hatto oltin uchun ham, makroskopik doza kuchayishi kilovoltli dastalardagiga qaraganda ancha kichik [10], chunki u yerda massaviy koeffitsiyenti atom raqamiga faqat sust bog‘liq bo‘lgan kompton sochilishi ustunlik qiladi [8]. Demak, 45 keV dan past kilovoltli spektrlar va megavoltli dastalar uchun AgNZ ustunligini makroskopik fizik doza kuchayishining kattaroq ekanligi bilan tushuntirish ehtimoldan yiroq. Bu kumushning kimyoviy va biologik faolligi [37] hamda energiya ajralishining nanomiqyosdagi effektlari [31] sezilarli hissa qo‘shishidan dalolat beradi; buni tasdiqlash uchun aniq belgilangan dasta uchun fizik qismni miqdoriy baholash zarur.

Bu yerda ko‘rib chiqilgan adabiyotlarda kumushga oid dozimetrik tadqiqotlar biologik tadqiqotlarga qaraganda kamroq. Taha va hammualliflar braxiterapiya vaqtida bosh miya o‘smasiga kiritilgan AgNZ tufayli doza kuchayishini baholash uchun raqamli fantom bilan MK modellashtirishdan foydalangan [38]. Çağlar va hammualliflar MK modellashtirish yordamida AgNZ tomonidan o‘smada hosil qilingan doza kuchayishi atrofdagi sog‘lom to‘qimalarga qanday ta’sir qilishini o‘rgangan [39], Eşitmez va hammualliflar esa MK usulidagi sezgirlik tadqiqotida qatlamli teri geometriyalarida doza kuchayishi bo‘yicha kumush va oltin nanozarrachalarini taqqoslagan [40]. Merkis va hammualliflar AgNZ bilan boyitilgan dozimetrik gellarda doza sezgirligi va doza kuchayishi effektini eksperimental tadqiq qilgan [41]. Ortovoltli dastalarda nanozarrachalar hisobiga doza kuchayishining kumush uchun ham ahamiyatli bo‘lgan chuqurlikka bog‘liqligi Chow va Jubran tomonidan fantomdagi MK tadqiqotida o‘rganilgan [42]. Kilovoltli rentgen trubkasining konstruksiyasi va filtrlash kumush kiritilgan to‘qimaning DEF qiymatini qanday belgilashining tizimli tahlili ushbu ishda ko‘rib chiqilgan adabiyotlarda topilmadi.

Kumush uchun dastani tanlash uning atom ma’lumotlaridan kelib chiqadi (2.2-jadval). Kumushning K-qobiqdagi bog‘lanish energiyasi 25,514 keV ga teng, uning L3 chegarasi 3,351 keV da joylashgan, Kα1 chizig‘ining energiyasi esa 22,163 keV ni tashkil etadi. K-qobiqning flyuoressensiya chiqishi $\omega_K = 0{,}831$ bo‘lgani uchun K vakansiyalarining faqat 17 % ga yaqini energiyasini atom yaqinida qoldiradigan Oje o‘tishlari orqali relaksatsiyalanadi [73, 74]. Qolgan 83 % vakansiyalar K rentgen nurlanishini, asosan, energiyasi taxminan 22 keV bo‘lgan Kα fotonlarini chiqaradi; bu fotonlarning yumshoq to‘qimadagi o‘rtacha erkin yugurish yo‘li taxminan 1,5 sm ni tashkil etadi va ular bu energiyani yutuvchi atomdan olib ketadi. 1.2- va 1.3-bo‘limlarda ko‘rsatilganidek, kumush va ICRU-44 yumshoq to‘qimasining massaviy energiya yutilish koeffitsiyentlari nisbati 8 keV dan K-chegaragacha bo‘lgan oraliqda 21–32 ni, chegaradan 45 keV gacha bo‘lgan oraliqda esa 76–139 ni tashkil etadi. Oltinning K-chegarasi 80,725 keV da joylashgan va undan faqat taxminan 81 kV dan yuqori trubka kuchlanishlarida foydalanish mumkin, kumushning K-chegarasi esa taxminan 26 kV dan yuqori kuchlanishda ishlaydigan har qanday trubka spektri ichida yotadi. Shu sababli energiya flyuensining katta qismi Ag K-chegarasi bilan dastaning chegaraviy energiyasi (bu yerda ko‘rilayotgan trubka uchun 45 keV) oralig‘iga to‘g‘ri keladigan kilovoltli spektrlar kumush bilan fizik doza kuchayishi uchun eng qulay hisoblanadi. Mis anodli trubkaning filtrlanmagan dastasidagi fotonlar flyuensida ustunlik qiladigan 8,0–8,9 keV dagi Cu K chiziqlari bu oraliqdan ancha pastda joylashgan.

## 1.5. Rentgen trubkalari spektrlarini modellashtirish usullari

DEFni hisoblash uchun rentgen nurlanishi manbaining spektri talab etiladi. Spektrlarni yarimo‘tkazgichli detektorlar yordamida o‘lchash mumkin [44], biroq bunday o‘lchashlar detektor javobiga tuzatishlar kiritishni talab qiladi va trubkaning har bir konfiguratsiyasi uchun amalda bajarib bo‘lmaydi, shuning uchun parametrik tadqiqotlar hisoblangan spektrlarga tayanadi. Hisoblash usullari to‘rt guruhga bo‘linadi: o‘lchangan yoki oldindan hisoblangan spektrlarni interpolyatsiyalovchi empirik modellar; soddalashtirilgan fizik tavsifni o‘lchashlarga moslashtirilgan parametrlar bilan birlashtiruvchi yarim empirik modellar; spektrni kesimlar va elektronlarning kirib borishi haqidagi ma’lumotlar asosida hisoblovchi fizikaga asoslangan deterministik modellar; hamda trubkada elektronlar va fotonlar ko‘chishini to‘liq MK modellashtirish. Ularning asosiy xususiyatlari 1.2-jadvalda taqqoslangan.

Empirik modellarning tipik vakili TASMIP (interpolyatsion polinomlardan foydalanadigan volfram anodning spektral modeli) bo‘lib, u o‘lchangan ma’lumotlardan olingan interpolyatsion polinomlar yordamida 30 dan 140 kV gacha bo‘lgan volfram anodli spektrlarni hosil qiladi [43]. TASMICS modeli asosida spektrni modellashtirish va tahlil qilish imkonini spektr 3.0 vositasi beradi [102]. Empirik modellar tez ishlaydi va asos qilib olingan ma’lumotlar diapazoni doirasida aniq natija beradi, biroq ular ma’lumotlar olingan trubkalarning anod materiali, anod burchagi va xususiy filtrlashiga bog‘lab qo‘yilgan. Qo‘shimcha filtrlashni susayish ko‘paytuvchisi sifatida hisobga olish mumkin, biroq ushbu ishda o‘rganilayotgan anod materiali va burchagining ta’sirini tavsiflab bo‘lmaydi.

Yarim empirik modellar Kramersning uzluksiz rentgen spektri nazariyasiga borib taqaladi; bu nazariyaga ko‘ra qalin nishondan foton energiyasining birlik intervaliga to‘g‘ri keladigan nurlangan energiya $Z(T_0 - E)$ ga proporsional, bu yerda $Z$ — nishonning atom raqami, $T_0$ — elektronlarning boshlang‘ich kinetik energiyasi, $E$ — foton energiyasi [8, 103]. Birch va Marshall tormozlanish nurlanishi spektrlarining yarim empirik modelini ishlab chiqqan va uni litiy bilan dreyflangan germaniy (Ge(Li)) detektori yordamida o‘lchangan spektrlar bilan taqqoslagan [44]. Tucker, Barnes va Chakraborty volfram nishonli trubkalar spektrlari uchun yarim empirik modelni (TBC modeli) taklif qilgan [45]. Bu guruh modellari tormozlanish nurlanishining soddalashtirilgan kesimini nishonda elektronlarning kirib borishi va fotonlarning o‘z-o‘zini yutishining taqribiy tavsifi bilan birlashtiradi hamda ayrim parametrlarni eksperimental ma’lumotlarga moslashtiradi. Ular hisoblash jihatidan arzon va spektrning trubka kuchlanishi, anod burchagi hamda filtrlashga bog‘liqligini oshkor ko‘rsatadi, biroq ularning aniqligi soddalashtirilgan fizika bilan cheklangan, parametrlari esa nishon materialiga, odatda volframga xosdir.

Fizikaga asoslangan deterministik modellar empirik parametrlarning aksariyatini nazariyadan yoki MK hisoblashlaridan olingan ma’lumotlar bilan almashtiradi. Poludniowski va Evans elektronlarning rentgen nishonlariga kirib borishini MK modellashtirishdan olingan xarakteristikalar yordamida tavsiflagan [46], Poludniowski esa ulardan nishon ichida rentgen nurlanishining hosil bo‘lishi va filtrlanishini hisoblashda foydalangan [47]. Bu nazariya volfram anodlar uchun SpekCalc dasturida amalga oshirilgan [48]. Keyinroq yaratilgan SpekPy v2 vositalar to‘plami bir nechta fizik modelni, jumladan, ushbu ishda qo‘llanilgan casim modelini, hamda bir nechta anod materialini, shu jumladan misni taklif etadi [15]; 2.5.4 versiyasida [58] mis anod 10–50 kV uchun mavjud. SpekPy K va L rentgen nurlanishi emissiyasi modeliga tayanadi [104], o‘sha guruh tormozlanish nurlanishining energetik va burchak taqsimoti modelini ishlab chiqqan [105] hamda olingan spektrlarni 20 dan 300 kV gacha oraliqda validatsiya qilgan [106]. SpekPy, shuningdek, o‘lchangan spektrlar va YSQ qiymatlari bilan solishtirib validatsiya qilingan [51]. Deterministik modellar tez ishlaydi va fizik jihatdan yaxshi asoslangan, biroq faqat oldindan hisoblangan ko‘chish ma’lumotlari mavjud bo‘lgan anod materiallari va kuchlanishlarnigina qamrab oladi.

Eng to‘liq tavsifni anod va trubkada elektronlar va fotonlarning bog‘langan ko‘chishini MK modellashtirish beradi. Ay va hammualliflar MCNP4C kodi yordamida diagnostik va mammografik spektrlarni modellashtirgan [50], Verhaegen va hammualliflar esa EGS4/BEAM tizimi yordamida nur terapiyasida qo‘llaniladigan kilovoltli rentgen qurilmalarini modellashtirgan [49]. Bunday modellashtirish uchun umumiy maqsadli kodlar qatoriga elektronlar ko‘chishini kondensatsiyalangan tarixlar usulida hisoblaydigan EGSnrc [107], Geant4 vositalar to‘plami [108] va PENELOPE [109] kiradi. MK modellashtirish elektronlarning teskari sochilishini, tormozlanish nurlanishining burchak taqsimotini va trubkaning real geometriyasini hisobga oladi. Biroq u batafsil geometrik ma’lumotlarni va uzoq hisoblash vaqtini talab qiladi, shuning uchun keng ko‘lamli parametrik tadqiqotlardan ko‘ra etalon hisoblashlar uchun ko‘proq mos keladi.

Table: 1.2-jadval. Rentgen spektrini modellashtirish yondashuvlarini taqqoslash.

| Yondashuv | Misollar | Afzalliklari | Cheklovlari |
|:---|:---|:---|:---|
| Empirik (interpolyatsiya) | TASMIP [43]; spektr 3.0 [102] | Tez; ma’lumotlar diapazoni doirasida aniq | Anod materiali, anod burchagi va xususiy filtrlash o‘zgarmas |
| Yarim empirik | Kramers [103]; Birch–Marshall [44]; TBC [45] | Sodda; kuchlanish, burchak va filtrlashga bog‘liqlik oshkor ko‘rinishda | Soddalashtirilgan fizika; parametrlar o‘lchashlarga, asosan volfram uchun moslashtirilgan |
| Fizikaga asoslangan deterministik | SpekCalc [48]; SpekPy v2 [15]; ishlab chiqilgan model (ushbu ish) | Tez; fizik asoslangan; moslashtiriladigan parametrlar soni kam | Elektronlar ko‘chishi taqribiy; anodlar va kuchlanishlar to‘plami cheklangan |
| Monte-Karlo | MCNP4C [50]; EGS4/BEAM, EGSnrc [49, 107]; Geant4 [108]; PENELOPE [109] | Eng to‘liq fizika, jumladan, teskari sochilish va trubkaning real geometriyasi | Uzoq hisoblash; batafsil geometriya talab etiladi; statistik shovqin |

Model qanday bo‘lishidan qat’i nazar, hisoblangan spektr o‘lchanadigan kattaliklar bilan bog‘lanishi kerak. Kilovoltli dozimetriyada dasta sifati trubka kuchlanishi bilan birga YSQ orqali belgilanadi [110]; xususan, Amerika tibbiyot fiziklari assotsiatsiyasining 40–300 kV rentgen dastalari uchun protokolida (AAPM TG-61) [14] va Atom energiyasi bo‘yicha xalqaro agentlikning amaliy qo‘llanmasida (IAEA TRS-398) [70] shunday qilingan. Xalqaro elektrotexnika komissiyasining standart nurlanish sifatlari (IEC 61267), masalan, diagnostik dastalar uchun RQR seriyasi ham YSQ orqali aniqlanadi [111]. Shu sababli YSQ modellarni o‘zaro va o‘lchashlar bilan taqqoslash uchun tabiiy kattalik hisoblanadi. Biroq u energiya flyuensining Ag K-chegarasidan yuqoridagi ulushini bir qiymatli belgilamaydi, shu sababli YSQ qiymatlari yaqin bo‘lgan ikki dasta kumush uchun turli DEF qiymatlarini berishi mumkin; III bobda bu yutilish chegaralariga ega filtrlar misolida ko‘rsatiladi (??).

Yuqorida ko‘rib chiqilgan modellarning aksariyati volfram anodlar uchun ishlab chiqilgan [43, 45, 48]; volfram tibbiy rentgen trubkalarining odatiy nishon materialidir [16]. Mis anodli trubkalar asosan rentgen difraksiyasida (XRD) qo‘llaniladi; unda Cu Kα chizig‘i ishchi nurlanish bo‘lib xizmat qiladi, Kβ chizig‘i esa nikel filtr bilan bostiriladi [52]. XRDda tormozlanish nurlanishining uzluksiz spektri istalmagan fon hisoblanadi, kumush bilan doza kuchayishi uchun esa u dastaning foydali qismidir, chunki faqat tormozlanish nurlanishi fotonlarining energiyasi Ag K-chegarasidan oshishi mumkin. Bu yerda ko‘rib chiqilgan adabiyotlarda mis anodli trubkalarning to‘liq spektri va uning trubka parametrlariga bog‘liqligiga volfram anodli trubkalarnikiga qaraganda ancha kam e’tibor qaratilgan. Shu sababli ushbu ishda mis anodli trubkaning ishlab chiqilgan model (IM) deb ataluvchi fizikaga asoslangan yarim analitik modeli yaratildi. U uzluksiz sekinlashish yaqinlashuvidagi (CSDA) Bethe ionizatsion tormozlanish qobiliyatini [53, 68], Elwert ko‘paytuvchisi kiritilgan norelyativistik Bethe–Heitler tormozlanish nurlanishi kesimini [54–56] va Gryzinskining K-qobiq ionizatsiyasi kesimini [57] yagona moslashtiriladigan parametr — elektronlarning chuqurlik koeffitsiyenti bilan birlashtiradi (II bob). Shunday qilib, trubka parametrlariga barcha bog‘liqliklar oshkor ko‘rinishda saqlanadi, SpekPy v2 esa IMni validatsiya qilish uchun etalon bo‘lib xizmat qiladi.

## 1.6. I bob bo‘yicha xulosalar

Adabiyotlar sharhi ushbu ishning vazifalarini belgilaydigan quyidagi xulosalarga olib keladi. Kilovoltli dastalarda atom raqami yuqori element bilan fizik doza kuchayishi uning massaviy energiya yutilish koeffitsiyentining to‘qimanikiga nisbati bilan belgilanadi; kumush uchun bu nisbat 8 keV dan 25,514 keV dagi K-chegaragacha bo‘lgan oraliqdagi 21–32 dan chegaradan 45 keV gacha bo‘lgan oraliqdagi 76–139 gacha ortadi. Shu sababli kumushning fizik samaradorligi asosan fotonlar energiya flyuensining 25,514 keV dan yuqoridagi ulushi bilan aniqlanadi, DEF qiymati esa faqat u olingan spektr bilan birgalikdagina ma’noga ega. AgNZ glioma, sut bezi saratoni va kolorektal saraton modellarida radiosensibilizator sifatida ta’sir ko‘rsatadi, bir tadqiqotda esa AuNZga qaraganda samaraliroq bo‘lib chiqqan; bundan tashqari, ularning o‘zi sitotoksik bo‘lib, KFSh hosil qiladi. Biroq fizik effektlarni kimyoviy va biologik effektlardan ajratish uchun zarur bo‘lgan, yaxshi tavsiflangan kilovoltli dasta uchun kumushning makroskopik fizik hissasi ko‘rib chiqilgan adabiyotlarda tizimli ravishda aniqlanmagan.

Spektr modellari volfram anodlar uchun yaxshi ishlab chiqilgan, asosan XRDda qo‘llaniladigan mis anodli trubkalarning to‘liq spektriga esa ancha kam e’tibor qaratilgan. Shunga muvofiq, ushbu ishda 45 kV li mis anodli trubka spektrining yarim analitik modeli ishlab chiqiladi va SpekPy v2 bilan solishtirib validatsiya qilinadi. So‘ngra har ikkala model spektrni trubka konstruksiyasi va filtrlashga bog‘liq holda hisoblash hamda kumush kiritilgan yumshoq to‘qimaning DEF qiymatini va uning konsentratsiya, chuqurlik va filtrlashga bog‘liqligini aniqlash uchun qo‘llaniladi. Analitik natijalar MK modellashtirish yordamida verifikatsiya qilinadi, kumush atom raqami yuqori boshqa elementlar bilan taqqoslanadi, DEFning noaniqligi esa amaliy tavsiyalar uchun asos sifatida baholanadi.


# II BOB. RENTGEN SPEKTRINING FIZIK MODELI VA DOZA KUCHAYISHINI HISOBLASH USULLARI

Ushbu bobda mazkur ishda yaratilgan rentgen spektrining yarim analitik modeli — ishlab chiqilgan model (IM), shuningdek, dastani tavsiflash va dozani kuchaytirish koeffitsiyentini (DEF) hisoblash uchun qo‘llanilgan usullar bayon etiladi. 2.1–2.5-bo‘limlarda nurlanishning trubkadan namunagacha bo‘lgan yo‘li ketma-ket ko‘rib chiqiladi. 2.6–2.9-bo‘limlarda DEFni hisoblash, Monte-Karlo (MK) usuli yordamida verifikatsiya, foydalanilgan ma’lumotlar va dasturiy ta’minot hamda radiatsiyaviy xavfsizlik tavsiflanadi. Barcha formulalar IM kodida (A ilova) amalga oshirilgan ko‘rinishda keltirilgan; agar boshqacha ko‘rsatilmagan bo‘lsa, energiyalar keV da, uzunliklar esa sm da ifodalanadi.

## 2.1. Mis anodli rentgen trubkasining konstruksiyasi va texnik parametrlari

Rentgen trubkasi ichidan havosi so‘rib olingan, ikki elektrod — katod va anod joylashgan ballon bo‘lib, elektrodlar orasiga yuqori kuchlanish beriladi [16]. Qizdirilgan katod tolasidan termoelektron emissiya natijasida chiqqan elektronlar fokuslovchi kosacha yordamida dasta shakliga keltiriladi va bu dasta anodning kichik sohasiga — fokus dog‘iga tushadi [16]. Trubka kuchlanishi $U$ ta’sirida tezlashgan elektronlar anodga $T_0 = eU$ kinetik energiya bilan yetib keladi, bu yerda $e$ — elementar zaryad; bazaviy konfiguratsiyada $T_0$ = 45 keV. Ularning energiyasining katta qismi issiqlikka aylanadi va faqat kichik ulushi tormozlanish nurlanishi hamda xarakteristik rentgen nurlanishi ko‘rinishida chiqariladi [8, 16]. Trubka toki vaqt birligida anodga yetib keladigan elektronlar sonini belgilaydi, shu sababli chiqarilgan fotonlar soni tok bilan ekspozitsiya vaqtining milliamper-sekundlarda (mA·s) ifodalanadigan ko‘paytmasiga proporsional bo‘ladi, spektrning shakli esa tokka bog‘liq emas. Shuning uchun ushbu ishdagi barcha spektrlar 1 mA·s ga normallashtirilgan.

Bu yerda ko‘rib chiqilayotgan qaytaruvchi nishonli trubkada foydali dasta anoddan elektronlar tushadigan sirtning o‘zi orqali chiqadi (2.1-rasm), anod esa barcha elektronlarni to‘xtatish uchun yetarlicha qalin. Anod burchagi $\theta$ — anod sirti bilan dastaning markaziy nuri orasidagi burchak. Elektronlar dastasi markaziy nurga perpendikulyar bo‘lgani sababli elektronlar anodga sirt normaliga nisbatan $\theta$ burchak ostida tushadi, markaziy nurdagi fotonlar esa sirtni $\theta$ chiqish burchagi ostida tark etadi. Kichik anod burchagi fokus dog‘ining effektiv o‘lchamini kamaytiradi (chiziqli fokus prinsipi), biroq maydonning anod tomoniga chiqarilgan fotonlar anodda uzunroq yo‘l bosadi, shu sababli bu tomonda dasta kuchsizroq va qattiqroq bo‘ladi (“tovon” effekti) [16]. IM spektrni markaziy nurda hisoblaydi; bunda anod burchagi elektronlarning kirib borishi va fotonlarning o‘z-o‘zini yutish geometriyasi orqali hisobga olinadi (2.2- va 2.3-bo‘limlar).

Fotonlar vakuum ballonidan yupqa berilliy oyna orqali chiqadi; berilliyning atom raqami va zichligi kichik bo‘lgani uchun oyna yumshoq rentgen nurlanishini kuchsiz susaytiradi va shu bilan birga mustahkam hamda germetik bo‘lib qoladi [16]. Oyna va anoddagi o‘z-o‘zini yutish trubkaning xususiy filtrlashini hosil qiladi. Qo‘shimcha filtrlar — dastaga oynadan tashqarida joylashtiriladigan metall folgalar; ular spektrning past energiyali qismini olib tashlaydi va dastani qattiqlashtiradi [16, 17]. So‘ngra fotonlar fokus–namuna masofasi $r$ da joylashgan namunagacha havo qatlamini kesib o‘tadi (bu masofa 2.1-rasmda d bilan belgilangan; $d$ belgisi 2.2-bo‘limdagi elektron chuqurligi uchun saqlab qo‘yilgan).



![2.1-rasm. Modellashtirilgan mis anodli qaytaruvchi nishonli rentgen trubkasining va nurlash geometriyasining sxemasi. Katod chiqargan elektronlar anodga fokus dog‘ida uriladi; anod burchagi θ ostida markaziy nur bo‘ylab chiqarilgan fotonlar berilliy oyna, qo‘shimcha filtr va havo qatlami orqali Ag saqlovchi to‘qima namunasiga yetib boradi. Rasmda d bilan belgilangan fokus–namuna masofasi matnda r bilan belgilanadi.](/home/user/atlant-impossible/dissertation/code/../figures/uz/fig01_tube.png){width=13.5cm}



Mis anodli trubkalar rentgen-struktur tahlilining (RST) standart manbalari hisoblanadi; unda intensiv Cu Kα chizig‘idan (8,05 keV, to‘lqin uzunligi 0,154 nm) foydalaniladi, Kβ chizig‘i (8,91 keV) esa K yutilish chegarasi (8,33 keV) bu ikki chiziq orasida joylashgan yupqa nikel filtr yordamida bostiriladi [52]. Kumush ishtirokidagi nurlashlarda esa eng foydali fotonlar 25,514 keV dagi Ag K-chegarasidan yuqorida, tormozlanish nurlanishining uzluksiz spektrida joylashgan (1.4-bo‘lim), RSTda esa bu uzluksiz spektr shunchaki fon hisoblanadi. Shu sababli butun spektrni bilish va, III bobda ko‘rsatilganidek, uni filtrlash yordamida shakllantirish zarur. Nashr etilgan spektr modellarining aksariyati volfram anodlar uchun ishlab chiqilgani sababli (1.5-bo‘lim), mis anodli trubka uchun maxsus model talab etiladi.

Modellashtirilgan trubkaning konstruktiv va texnik parametrlari 2.1-jadvalda keltirilgan. Bazaviy konfiguratsiya quyidagilardan iborat: anod burchagi 12° bo‘lgan mis anod, 0,5 mm qalinlikdagi berilliy oyna, 45 kV o‘zgarmas kuchlanish, 40 mA tok va havoda 10 sm fokus–namuna masofasi, qo‘shimcha filtrlashsiz; jadvalda III bobda o‘rganilgan oraliqlar ham keltirilgan. Trubka kuchlanishi, anod materiali, anod burchagi, oyna va qo‘shimcha filtrlar spektr shaklini o‘zgartiradi, masofa esa teskari kvadratlar qonuni orqali ham, havodagi yo‘lda susayish orqali ham ta’sir ko‘rsatadi. O‘zgarmas kuchlanish farazida barcha elektronlar anodga bir xil $T_0$ energiya bilan yetib keladi; kuchlanish pulsatsiyasi esa bunday spektrlarning tortilgan superpozitsiyasini hosil qilgan bo‘lardi.



Table: 2.1-jadval. Modellashtirilgan rentgen trubkasining bazaviy konstruktiv va texnik parametrlari

| Parametr | Qiymat | O‘rganilgan oraliq |
|:---|---:|---:|
| Trubka kuchlanishi (o‘zgarmas) | 45 kV | 20–50 kV (SpekPy), 80 kV gacha (model) |
| Anod (nishon) materiali | Cu, Z = 29, ρ = 8,96 g/sm³ | W (validatsiya) |
| Anod burchagi θ (markaziy nurning chiqish burchagi) | 12° | 6–30° |
| Berilliy oyna qalinligi | 0,5 mm | 0,15–2,0 mm |
| Fokus–namuna masofasi (havo yo‘li) | 10 sm | – |
| Trubka toki | 40 mA | – |
| Qo‘shimcha filtrlar | yo‘q | Al 0,25–6 mm; Ti, Ni, Cu, Mo, Ag, Sn; Z = 13–83 bo‘lgan 54 element |
| Energiya oralig‘i kengligi | 0,05 keV | – |



## 2.2. Anodda elektronlarning sekinlashishi

Energiyasi bir necha o‘n keV bo‘lgan elektronlar anodda energiyasini asosan atomlarni ionlashtirish va uyg‘otish hisobiga yo‘qotadi, yadrolarda elastik sochilish esa ularning harakat yo‘nalishini o‘zgartiradi. Radiatsion yo‘qotishlar kichik va ular hisobga olinmaydi. IMda uzluksiz sekinlashish yaqinlashuvi (CSDA) qo‘llaniladi; unda massaviy ionizatsion tormozlanish qobiliyati Bete formulasi [53] orqali ifodalanadi, bunda uning ICRUning 37-hisobotidagi [68] ko‘rinishidan foydalaniladi:

$$\frac{S(T)}{\rho} = \frac{\kappa}{2}\,\frac{Z}{A}\,\frac{1}{\beta^{2}}\left[\ln\frac{\tau^{2}(\tau + 2)}{2\,(I/m_ec^{2})^{2}} + F^{-}(\tau)\right]$$

EQNUM[2.1]


bu yerda $S(T)$ — kinetik energiyasi $T$ bo‘lgan elektron uchun chiziqli ionizatsion tormozlanish qobiliyati, $\rho$ — anodning zichligi, $\kappa = 4\pi N_A r_e^{2} m_ec^{2} = 0{,}307075$ MeV sm²/mol, $N_A$ — Avogadro doimiysi, $r_e$ — elektronning klassik radiusi, $m_ec^{2}$ = 510,999 keV — elektronning tinchlikdagi energiyasi, $Z$ va $A$ — anod materialining atom raqami va molyar massasi (g/mol), $\tau = T/m_ec^{2}$, $\beta$ — yorug‘lik tezligi birliklarida ifodalangan elektron tezligi, $\beta^{2} = 1 - (1 + \tau)^{-2}$, $I$ — o‘rtacha uyg‘otish energiyasi, $F^{-}(\tau)$ esa Møller kesimidan keltirib chiqarilgan elektron hadi:

$$F^{-}(\tau) = 1 - \beta^{2} + \frac{\tau^{2}/8 - (2\tau + 1)\ln 2}{(\tau + 1)^{2}}$$

EQNUM[2.2]


Mis uchun ($Z$ = 29, $\rho$ = 8,96 g/sm³) $I$ = 322 eV qiymati qo‘llaniladi [68], 100 keV dan past energiyalarda e’tiborga olmaslik mumkin bo‘lgan zichlik effekti uchun tuzatma esa tushirib qoldiriladi. Formula 5, 10, 30 va 45 keV da mos ravishda 20,99; 13,18; 6,04 va 4,55 MeV sm²/g qiymatlarni beradi. Tekshiruv sifatida xuddi shu kod 50 keV da suv uchun 6,603 MeV sm²/g qiymatni beradi, bu NIST ESTAR qiymati [69] bilan aynan mos keladi. Qobiq tuzatmalari kiritilmagan, bu faqat elektronlarning eng past energiyalariga ta’sir qiladi.

Elektron $T_0$ dan $T$ gacha sekinlashguncha bosib o‘tgan yo‘l uzunligi quyidagiga teng:

$$s(T) = \int_{T}^{T_0} \frac{\mathrm{d}T'}{S(T')}$$

EQNUM[2.3]


bu yerda $T'$ — integrallash o‘zgaruvchisi. Integral trapetsiyalar usulida $T_{\min}$ = 1 keV dan $T_0$ gacha 0,02 keV qadam bilan hisoblanadi. Quyi chegaragacha bo‘lgan yo‘l $s(T_{\min})$ amalda CSDA yugurish yo‘liga teng bo‘lib, misda 45 keV energiyali elektronlar uchun u 6,48 mkm ni tashkil etadi. Agar (2.1) formuladagi logarifm o‘zgarmas deb hisoblansa va $\beta^{2} \approx 2T/m_ec^{2}$ bo‘lsa, u holda $S \propto 1/T$ bo‘ladi va (2.3) ifoda $T_0^{2} - T^{2} \propto s$ munosabatni beradi; bu empirik Tomson–Uiddington qonunining ko‘rinishidir [112].

Ko‘p karrali elastik sochilish elektronlar trayektoriyalarini kuchli darajada egri chiziqli qiladi, shu sababli CSDA yo‘li fotonlar hosil bo‘ladigan chuqurlikka teng emas: elektronlar nishon ichiga diffuziyalanadi va ularning sezilarli ulushi teskari sochiladi. Poludniowski va Evans rentgen nishonlarida elektronlarning kirib borishini MK modellashtirishdan olingan taqsimotlar yordamida tavsiflagan [46]; IM ularni har bir elektron energiyasi uchun bitta o‘rtacha chuqurlik — kirish chuqurligi (proyektiv chuqurlik) bilan almashtiradi:

$$d(T) = \eta\, s(T)\cos\theta$$

EQNUM[2.4]


bu yerda $d(T)$ — elektron $T$ energiyagacha sekinlashadigan, anod sirtidan normal bo‘ylab o‘lchanadigan chuqurlik, $\eta$ — elektronlarning chuqurlik koeffitsiyenti, $\theta$ — anod burchagi bo‘lib, u sirt normalidan hisoblangan elektronlarning tushish burchagiga teng (2.1-bo‘lim). $\eta = 1$ qiymat to‘g‘ri chiziqli harakatga mos keladi, $\eta < 1$ esa elektronlarning diffuziyasini hisobga oladi. IMning bu yagona sozlanuvchi parametri SpekPy dasturiy vositalar to‘plami [15] yordamida hisoblangan tormozlanish nurlanishi spektrining shakliga moslashtirildi (2.8-bo‘lim); natijada $\eta$ = 0,40 qiymat va $\theta$ = 12° da 45 keV energiyali elektronlar uchun 2,54 mkm maksimal kirish chuqurligi olindi. Misda elektronlarning taxminan 30 % i teskari sochiladi, biroq bu hodisa modellashtirilmaydi; bu esa 3.1-bo‘limda muhokama qilinadigan absolyut nurlanish chiqishining ortiqcha baholanishiga hissa qo‘shadi.

2.2-rasmning (a) qismida bazaviy sharoitlar uchun tormozlanish qobiliyati va kirish chuqurligi ko‘rsatilgan. Tormozlanish qobiliyati yuqori energiyalarda eng kichik bo‘lib, elektron sekinlashgan sari keskin ortgani sababli energiya 45 dan taxminan 20 keV gacha kamayganda chuqurlik tez ortadi, so‘ngra o‘zining maksimumiga sekin yaqinlashadi. Shu sababli energiyasi $T_0$ ga yaqin fotonlar faqat sirt yaqinida chiqariladi, yumshoq fotonlar esa butun yo‘l bo‘ylab, jumladan uning eng chuqur qismida ham hosil bo‘ladi va kuchliroq susaygani uchun anoddagi o‘z-o‘zini yutishdan eng ko‘p ta’sirlanadi. Rasmning (b) qismi 2.4-bo‘limda muhokama qilinadi.



![2.2-rasm. Ishlab chiqilgan model yordamida hisoblangan mis anodda elektronlarning sekinlashishi va K-qobiq ionizatsiyasi: (a) Bete ionizatsion tormozlanish qobiliyati (uzluksiz chiziq, chap o‘q) va η = 0,4 hamda θ = 12° da 45 keV energiyali elektron T energiyagacha sekinlashadigan kirish chuqurligi (shtrix chiziq, o‘ng o‘q); (b) misning elektron zarbasi bilan K-qobiq ionizatsiyasining Grizinskiy kesimi.](/home/user/atlant-impossible/dissertation/code/../figures/uz/fig04_electron.png){width=13.5cm}



## 2.3. Qalin nishonda tormozlanish nurlanishining hosil bo‘lishi

Tormozlanish nurlanishi elektron yadroning Kulon maydonida tormozlanganda chiqariladi, bunda foton energiyasi $E$ elektronning kinetik energiyasi $T$ gacha bo‘lgan istalgan qiymatni qabul qilishi mumkin [8]. Kramers [103] taklif etgan uzluksiz spektrning klassik nazariyasi IMda quyidagi ko‘rinishda amalga oshirilgan kesimga olib keladi:

$$\frac{\mathrm{d}\sigma_{\mathrm{Kr}}}{\mathrm{d}E} = \frac{16\pi}{3\sqrt{3}}\,\frac{\alpha Z^{2} r_e^{2}}{\beta_0^{2}\,E}$$

EQNUM[2.5]


bu yerda $\mathrm{d}\sigma_{\mathrm{Kr}}/\mathrm{d}E$ — bitta atomga va foton energiyasining birligiga to‘g‘ri keladigan kesim (sm²/keV), u $E < T$ da shu ifoda bilan beriladi va aks holda nolga teng; $\alpha$ — nozik struktura doimiysi, $\beta_0$ — energiyasi $T$ bo‘lgan elektronning yorug‘lik tezligi birliklarida ifodalangan tezligi. $\beta_0^{2} \approx 2T/m_ec^{2}$ va $S \propto 1/T$ bo‘lganda sekinlashish bo‘yicha integrallash $Z(T_0 - E)/E$ ga proporsional bo‘lgan fotonlar soni spektrini, ya’ni $Z(T_0 - E)$ ga proporsional bo‘lgan va $T_0$ da chiziqli ravishda nolgacha kamayadigan $E\,N(E)$ energiya spektrini beradi. Bu Kramers qonuni bo‘lib, yarim empirik modellarning boshlang‘ich nuqtasi hisoblanadi (1.5-bo‘lim). IMda Kramers kesimi faqat muqobil variant sifatida saqlab qolingan.

Bete va Gaytler tormozlanish nurlanishi kesimini Born yaqinlashuvida keltirib chiqargan [54]. Uning Koch va Motz [56] tomonidan jamlangan norelyativistik, ekranlanmagan ko‘rinishi quyidagicha amalga oshirilgan:

$$\frac{\mathrm{d}\sigma_{\mathrm{B}}}{\mathrm{d}E} = \frac{16}{3}\,\frac{\alpha Z^{2} r_e^{2}}{\beta_0^{2}\,E}\,\ln\frac{p_0 + p}{p_0 - p}$$

EQNUM[2.6]


bu yerda $p_0$ va $p$ — elektronning foton chiqarishdan oldingi va keyingi impulslari, $p_0c = \sqrt{T(T + 2m_ec^{2})}$ va $pc = \sqrt{(T - E)(T - E + 2m_ec^{2})}$. Norelyativistik chegarada $1/\beta_0^{2}$ ko‘paytuvchi impulslar $m_ec$ birliklarida ifodalangan asl formuladagi $1/p_0^{2}$ ko‘paytuvchiga teng. Born yaqinlashuvi $2\pi Z\alpha/\beta_0 \ll 1$ va $2\pi Z\alpha/\beta \ll 1$ shartlarning bajarilishini talab qiladi, bu yerda $\beta$ — elektronning foton chiqargandan keyingi (kinetik energiyasi $T - E$ bo‘lgan holatdagi) yorug‘lik tezligi birliklarida ifodalangan tezligi [56]. Mis uchun bu shart buziladi: $Z\alpha \approx 0{,}21$ va $\beta_0 \le 0{,}4$ bo‘lganda $2\pi Z\alpha/\beta_0$ parametr hatto 45 keV energiyali elektron uchun ham 3 dan oshadi. Natijada yuzaga keladigan xatolik elektron to‘lqin funksiyalarining Kulon maydonidagi buzilishini taqribiy hisobga oladigan Elvert ko‘paytuvchisi yordamida qisman tuzatiladi [55, 56]:

$$f_E = \frac{\beta_0}{\beta}\,\frac{1 - \exp(-2\pi Z\alpha/\beta_0)}{1 - \exp(-2\pi Z\alpha/\beta)}$$

EQNUM[2.7]


bu yerda $\beta_0$ va $\beta$ — yuqorida aniqlangan kattaliklar. IMda $\mathrm{d}\sigma/\mathrm{d}E = f_E\,\mathrm{d}\sigma_{\mathrm{B}}/\mathrm{d}E$ ko‘paytma qo‘llaniladi, u quyida BH-E deb belgilanadi. $E$ energiya $T$ ga yaqinlashganda $p$ impuls nolga intiladi, (2.6) formuladagi logarifm $2p/p_0$ ga intiladi va Born kesimi nolga aylanadi, $f_E$ esa $1/\beta$ kabi ortadi. Shu sababli BH-E kesimi spektrning yuqori energiyali chekkasida chekli bo‘lib qoladi. Seltzer va Bergerning 1 keV–10 GeV energiyali elektronlar va $Z$ = 1–100 uchun jadvallashtirilgan kesimlari [113] atom ekranlanishini va elektron–elektron tormozlanish nurlanishini o‘z ichiga oladi, BH-E kesimida esa ular hisobga olinmaydi. Bu soddalashtirishlar IMning qattiq tormozlanish nurlanishining absolyut chiqishini SpekPyga nisbatan ortiqcha baholashiga hissa qo‘shadi, DEF esa faqat spektr shakliga bog‘liq bo‘lib, $\eta$ moslashtirilgandan so‘ng 45 kV da spektr shakli 2,46 % o‘rtacha kvadratik chetlanish bilan takrorlanadi (3.1-bo‘lim).

Qalin nishonda chiqarilgan spektr butun sekinlashish yo‘li bo‘ylab hosil bo‘ladigan yupqa nishon spektrlarining yig‘indisidan iborat. CSDAda elektronning energiyasi $\mathrm{d}T$ ga kamayishi davomida u yuza birligiga to‘g‘ri keladigan $n_a\,\mathrm{d}T/S(T)$ ta atomni kesib o‘tadi, $d(T)$ chuqurlikda hosil bo‘lgan foton esa $d(T)/\sin\theta$ chiqish yo‘li bo‘ylab susayadi. Nurlanish izotrop deb faraz qilinsa, markaziy nur bo‘ylab chiqarilgan, birlik energiya oralig‘iga, bir steradianga va bitta tushayotgan elektronga to‘g‘ri keladigan tormozlanish nurlanishi fotonlari soni quyidagiga teng:

$$N_b(E) = \frac{1}{4\pi}\int_{E}^{T_0} \frac{n_a}{S(T)}\,\frac{\mathrm{d}\sigma}{\mathrm{d}E}(T, E)\,\exp\left[-\frac{\mu(E)\,d(T)}{\sin\theta}\right]\mathrm{d}T$$

EQNUM[2.8]


bu yerda $n_a = \rho N_A/A$ — anodning hajm birligidagi atomlar soni, $\mathrm{d}\sigma/\mathrm{d}E$ — BH-E kesimi, $\mu(E)$ esa xraylib kutubxonasidan [60] olingan anod materialining chiziqli susayish koeffitsiyenti. Xuddi shu integral eksponensial ko‘paytuvchisiz va $1/4\pi$ ko‘paytuvchisiz hosil bo‘lgan spektr $N_g(E)$ ni, ya’ni barcha yo‘nalishlarda hosil bo‘lgan fotonlarni beradi; u 2.4-bo‘limda qo‘llaniladi. Integrallar trapetsiyalar usulida hisoblanadi, foton spektri esa 1 keV dan $T_0$ gacha 0,05 keV kenglikdagi intervallarda hisoblanadi. Elektronlarning kirib borishi bo‘yicha MK usulida olingan ma’lumotlardan foydalanadigan shunga o‘xshash qalin nishon ifodasi SpekCalc dasturining asosini tashkil etadi [46, 47].

(2.8) ifodadagi eksponensial ko‘paytuvchi anoddagi o‘z-o‘zini yutishni tavsiflaydi. Anod burchagi kamayishi bilan chiqish yo‘li uzayadi, susayish esa yumshoq fotonlar uchun va misning 8,98 keV dagi K-chegarasidan biroz yuqoridagi fotonlar uchun eng kuchli bo‘ladi, chunki u yerda $\mu$ keskin ortadi. $1/4\pi$ ko‘paytuvchi nurlanishning izotropligi haqidagi farazni ifodalaydi. Yakka o‘zaro ta’sirdagi tormozlanish nurlanishi anizotrop bo‘lsa-da, qalin nishondagi ko‘p karrali sochilish elektronlar yo‘nalishlarini tartibsizlantiradi va burchak taqsimotini tekislaydi. Rentgen trubkasi tormozlanish nurlanishining batafsilroq modellarida qo‘llanilmaydigan [105] izotrop yaqinlashuv IMning cheklovlaridan biri hisoblanadi (3.11-bo‘lim).

## 2.4. Xarakteristik nurlanish

Energiyasi K-qobiqning bog‘lanish energiyasi $E_K$ dan (mis uchun 8,979 keV) yuqori bo‘lgan elektron K-qobiqni ionlashtirishi mumkin. Vakansiya tashqi qobiqdan to‘ldiriladi, o‘tish energiyasi esa yoki flyuoressensiya chiqishi $\omega_K$ (mis uchun 0,454) bilan beriladigan ehtimollik bilan xarakteristik foton ko‘rinishida, yoki Oje elektroni ko‘rinishida chiqariladi [73, 74]. IM eng kuchli to‘rtta chiziqni o‘z ichiga oladi: K$\alpha_1$ (K–L$_3$ o‘tish, 8,048 keV), K$\alpha_2$ (K–L$_2$, 8,028 keV), K$\beta_1$ (K–M$_3$) va K$\beta_3$ (K–M$_2$), oxirgi ikkitasi 8,905 keV da; ularning nisbiy intensivliklari $p_j$, ya’ni to‘rtta chiziq bo‘yicha normallashtirilgan nurlanish o‘tishlari ehtimolliklari, mos ravishda 0,583; 0,299; 0,078 va 0,040 ga teng. K vakansiyalar ham bevosita elektron zarbasi natijasida, ham bilvosita $E_K$ dan yuqori energiyali tormozlanish nurlanishi fotonlarining yutilishi natijasida hosil bo‘ladi. Misning L chiziqlari (1 keV dan past) berilliy oynada yutiladi va modellashtirilmaydi.

K-qobiq ionizatsiyasining kesimi Grizinskiyning binar to‘qnashuvlar formulasi [57] bo‘yicha hisoblanadi:

$$\sigma_K(T) = \frac{\pi e^{4} n_K}{E_K^{2}}\,\frac{1}{U_K}\left(\frac{U_K - 1}{U_K + 1}\right)^{3/2}\left[1 + \frac{2}{3}\left(1 - \frac{1}{2U_K}\right)\ln\left(2{,}7 + \sqrt{U_K - 1}\right)\right]$$

EQNUM[2.9]


bu yerda $U_K = T/E_K$ — ortiqcha kuchlanish nisbati ($U_K \le 1$ da $\sigma_K = 0$), $n_K = 2$ — K-qobiqdagi elektronlar soni, Gauss birliklarida esa $\pi e^{4} = 6{,}5141\times10^{-20}$ sm² keV². 2.2-rasmning (b) qismida ko‘rsatilganidek, mis uchun kesim 10 keV dagi 25,5 b dan 20 keV dagi 288 b gacha ortadi, 35 keV atrofida taxminan 351 b ga teng keng maksimumga ega bo‘ladi va 45 keV da 339 b gacha kamayadi. $n_a\sigma_K/S$ ni sekinlashish bo‘yicha integrallash har bir tushayotgan 45 keV energiyali elektronga 0,0159 ta K ionizatsiyani beradi. Eksperimental va nazariy kesimlar Llovet va hammualliflar tomonidan jamlangan [115], Bote va Salvatning buzilgan to‘lqinlar Born yaqinlashuvidagi hisoblashlari esa PENELOPE kodida qo‘llaniladi [114]. Grizinskiy formulasi bo‘sag‘a yaqinida juda sekin ortgani sababli IM Cu K chiziqlarining intensivligini SpekPyga nisbatan taxminan 25–43 % ga kam baholaydi, SpekPyning K va L nurlanish modeli [104] esa aynan shu buzilgan to‘lqinlar turidagi kesimlarga tayanadi; bu kamomad past trubka kuchlanishlarida eng katta bo‘ladi (3.1-bo‘lim).

Yutilish chegaralari va chiziqlarning energiyalari, flyuoressensiya chiqishlari va nurlanish o‘tishlari ehtimolliklari xraylib kutubxonasidan olingan [60]. Flyuoressensiya chiqishlari Krause tomonidan [74], baholangan o‘tish energiyalari esa Deslattes va hammualliflar tomonidan [116] jamlangan. Anod, oyna, asosiy filtr materiallari va atom raqami yuqori bo‘lgan bir nechta radiosensibilizatorlarga oid ma’lumotlar, jumladan 2.1-bo‘limda tilga olingan nikelning K-chegarasi (8,333 keV) 2.2-jadvalda jamlangan. Molibden (20,000 keV), kumush (25,514 keV) va qalay (29,200 keV) K-chegaralari Ag K-chegarasiga yaqin joylashgan, shu sababli bu elementlardan tayyorlangan filtrlar kumush yordamida dozani kuchaytirish uchun eng samarali bo‘lgan fotonlarning bir qismini kuchli yutadi (3.4-bo‘lim).



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



$j$ chiziqning markaziy nur bo‘ylab chiqariladigan, bir steradianga va bitta tushayotgan elektronga to‘g‘ri keladigan bevosita chiqishi quyidagiga teng:

$$N_j^{\mathrm{dir}} = \frac{\omega_K\,p_j}{4\pi}\int_{E_K}^{T_0} \frac{n_a\,\sigma_K(T)}{S(T)}\,\exp\left[-\frac{\mu_j\,d(T)}{\sin\theta}\right]\mathrm{d}T$$

EQNUM[2.10]


bu yerda $\mu_j = \mu(E_j)$ — chiziq energiyasi $E_j$ da anodning chiziqli susayish koeffitsiyenti, qolgan belgilar esa (2.8) ifodadagi kabi. K chiziqlar misning K-chegarasidan pastda joylashgani sababli anod o‘zining chiziqlari uchun nisbatan shaffof bo‘ladi, chiziq fotonlarining o‘zi esa K-qobiqni ionlashtira olmaydi.

Bilvosita flyuoressensiya anodda $E > E_K$ energiyali tormozlanish nurlanishi fotonlarining K-qobiqda fotoyutilishi natijasida yuzaga keladi. Elektronlar faqat bir necha mikrometrga, ya’ni K-chegaradan yuqori energiyali fotonlarning susayish uzunliklaridan kichikroq chuqurlikka kirib borgani sababli (2.2-bo‘lim), tormozlanish nurlanishi anod sirtidagi nuqtaviy manba bilan ifodalanadi (sirtiy manba yaqinlashuvi); izotrop chiqarilgan fotonlarning yarmi anodga kiradi. $u = \cos\vartheta$ bo‘lsin, bu yerda $\vartheta$ — foton yo‘nalishi bilan ichkariga yo‘nalgan normal orasidagi burchak; izotrop nurlanishda $u$ kattalik $-1 \le u \le 1$ oraliqda 1/2 ga teng ehtimollik zichligiga ega. $u > 0$ bo‘lgan foton $z/u$ yo‘lni bosib o‘tib $z$ chuqurlikka yetadi va $z$ dan $z + \mathrm{d}z$ gacha bo‘lgan qatlamda $(\mu/u)\exp(-\mu z/u)\,\mathrm{d}z$ ehtimollik bilan o‘zaro ta’sirlashadi, bu yerda $\mu = \mu(E)$. Yo‘nalishlar bo‘yicha o‘rtalashtirish bitta chiqarilgan fotonga to‘g‘ri keladigan o‘zaro ta’sir chuqurligining ehtimollik zichligini beradi:

$$P(z) = \frac{1}{2}\int_{0}^{1} \frac{\mu}{u}\,\mathrm{e}^{-\mu z/u}\,\mathrm{d}u = \frac{\mu}{2}\,\mathrm{E}_1(\mu z)$$

EQNUM[2.11]


bu yerda $t = 1/u$ almashtirish bajarilgan, $\mathrm{E}_1(x) = \int_{1}^{\infty} t^{-1}\mathrm{e}^{-xt}\,\mathrm{d}t$ esa integral eksponensial funksiya. $\int_{0}^{\infty}\mathrm{E}_1(x)\,\mathrm{d}x = 1$ bo‘lgani sababli $P(z)$ ning barcha chuqurliklar bo‘yicha integrali 1/2 ga teng: yarim cheksiz anodga kirgan har bir foton unda o‘zaro ta’sirlashadi.

Bu o‘zaro ta’sirlarning $\tau_K(E)/\mu(E)$ ulushi K-qobiqdagi fotoyutilishlardan iborat, bu yerda $\tau_K(E)$ — misning K-qobiq uchun chiziqli fotoelektrik koeffitsiyenti (zichlikning xraylib kutubxonasidan olingan K-qobiq fotoionizatsiyasining parsial massaviy koeffitsiyentiga ko‘paytmasi), $\mu(E)$ esa to‘liq chiziqli susayish koeffitsiyenti. Har bir vakansiya $\omega_K p_j$ ehtimollik bilan $j$ chiziq fotonini hosil qiladi, $z$ chuqurlikdan markaziy nur bo‘ylab chiqarilgan bu foton esa $\exp(-b_j z)$ ko‘paytuvchi bilan susayadi, bu yerda $b_j = \mu_j/\sin\theta$. Demak, hosil bo‘lgan, energiyasi $E$ ga teng har bir tormozlanish nurlanishi fotoniga nisbatan $j$ chiziqning markaziy nur bo‘ylab bir steradianga to‘g‘ri keladigan chiqishi quyidagiga teng:

$$Y_j(E) = \frac{\omega_K\,p_j}{4\pi}\int_{0}^{\infty} \frac{\tau_K(E)}{\mu(E)}\,P(z)\,\mathrm{e}^{-b_j z}\,\mathrm{d}z = \frac{\omega_K\,p_j}{4\pi}\,\frac{\tau_K(E)}{2}\int_{0}^{\infty} \mathrm{E}_1(\mu z)\,\mathrm{e}^{-b_j z}\,\mathrm{d}z$$

EQNUM[2.12]


Qolgan integral — integral eksponensial funksiyaning Laplas almashtirishi. Integrallash tartibini almashtirish $\int_{0}^{\infty}\mathrm{E}_1(x)\,\mathrm{e}^{-sx}\,\mathrm{d}x = \int_{1}^{\infty}\mathrm{d}t/[t(t + s)] = \ln(1 + s)/s$ natijani beradi, $s = b_j/\mu$ bo‘lganda $x = \mu z$ almashtirish esa quyidagini beradi:

$$\int_{0}^{\infty} \mathrm{E}_1(\mu z)\,\mathrm{e}^{-b_j z}\,\mathrm{d}z = \frac{1}{b_j}\ln\left(1 + \frac{b_j}{\mu}\right)$$

EQNUM[2.13]


$Y_j(E)$ ni hosil bo‘lgan spektr bilan tortib, K-chegaradan yuqori foton energiyalari bo‘yicha integrallash bir steradianga va bitta tushayotgan elektronga to‘g‘ri keladigan bilvosita chiqishni beradi:

$$N_j^{\mathrm{ind}} = \frac{\omega_K\,p_j}{4\pi}\int_{E_K}^{T_0} N_g(E)\,\frac{\tau_K(E)}{2\,b_j}\,\ln\left[1 + \frac{b_j}{\mu(E)}\right]\mathrm{d}E$$

EQNUM[2.14]


bu yerda $N_g(E)$ — 2.3-bo‘limda aniqlangan, hosil bo‘lgan tormozlanish nurlanishi spektri. $j$ chiziqning to‘liq chiqishi $N_j = N_j^{\mathrm{dir}} + N_j^{\mathrm{ind}}$ ga teng. Bazaviy trubka uchun bilvosita hissa Kα intensivligining 4,5 % ini va Kβ intensivligining 4,8 % ini tashkil etadi. Kβ uchun bu ulush biroz kattaroq, chunki bilvosita vakansiyalar o‘rtacha bevosita vakansiyalarga qaraganda chuqurroqda joylashadi, Kβ fotonlari esa anodda Kα fotonlariga qaraganda kamroq susayadi. Bilvosita hissa kichik bo‘lgani sababli sirtiy manba yaqinlashuvi va sochilgan fotonlarning hisobga olinmasligi chiziqlar intensivliklariga faqat kichik ta’sir ko‘rsatadi.

## 2.5. Filtrlash, dasta sifati parametrlari va havodagi kerma

Anod va namuna orasida fotonlarning berilliy oynada, qo‘shimcha filtrlarda va havoda susayishi tor dasta geometriyasi uchun Ber–Lambert qonuni bilan tavsiflanadi; bu geometriyada sochilgan fotonlar qaralayotgan nuqtaga yetib bormaydi deb faraz qilinadi:

$$\mathcal{T}(E) = \exp\left[-\mu_{\mathrm{Be}}(E)\,t_{\mathrm{Be}} - \sum_{i}\mu_i(E)\,t_i - \mu_{\mathrm{air}}(E)\,r\right]$$

EQNUM[2.15]


bu yerda $\mathcal{T}(E)$ — foton energiyasi $E$ dagi o‘tkazish koeffitsiyenti, $\mu_{\mathrm{Be}}$, $\mu_i$ va $\mu_{\mathrm{air}}$ — mos ravishda berilliy, $i$-qo‘shimcha filtr va havoning chiziqli susayish koeffitsiyentlari, $t_{\mathrm{Be}}$ va $t_i$ — oyna va filtrlarning qalinliklari, $r$ esa fokus–namuna masofasi. Elementlar uchun chiziqli koeffitsiyentlar xraylib kutubxonasidan olingan, kogerent sochilishni ham o‘z ichiga olgan to‘liq massaviy susayish koeffitsiyentlarini 2.2-jadvalda keltirilgan zichliklarga ko‘paytirish orqali olinadi. Quruq havo uchun koeffitsiyentlar uning tarkibiy elementlari (C, N, O va Ar) uchun NIST ma’lumotlaridan [59] aralashma qoidasi bo‘yicha, $1{,}205\times10^{-3}$ g/sm³ zichlik bilan olinadi. Butun masofa havodagi yo‘l sifatida qaraladi, bu esa havodagi susayishning biroz ortiqcha baholanishiga olib keladi.

Namunadagi fotonlarning spektral flyuensi 2.3- va 2.4-bo‘limlardagi chiqishlarni o‘tkazish koeffitsiyenti va teskari kvadratlar qonuni bilan birlashtiradi:

$$\Phi(E) = \frac{n_e\,Q}{r^{2}}\,\mathcal{T}(E)\left[N_b(E) + \sum_{j} N_j\,\delta(E - E_j)\right]$$

EQNUM[2.16]


bu yerda $\Phi(E)$ — yuza birligiga va birlik energiya oralig‘iga to‘g‘ri keladigan fotonlar soni (sm$^{-2}$ keV$^{-1}$), $Q$ — mA·s larda ifodalangan ekspozitsiya, $n_e = 6{,}242\times10^{15}$ — bir mA·s ga to‘g‘ri keladigan elektronlar soni, $N_j$ — $j$ chiziqning to‘liq chiqishi, $\delta$ esa Dirakning delta-funksiyasi. $1/r^{2}$ ko‘paytuvchi nuqtaviy manbaning bir steradianga to‘g‘ri keladigan chiqishini $r$ masofadagi flyuensga aylantiradi. Sonli spektrda har bir delta-funksiya $E_j$ ni o‘z ichiga olgan, kengligi $\Delta E$ = 0,05 keV bo‘lgan intervaldagi $N_j/\Delta E$ qiymat bilan almashtiriladi. Spektral energiya flyuensi $\Psi(E) = E\,\Phi(E)$ ga teng.

Trubkaning nurlanish chiqishi havodagi kerma bilan tavsiflanadi [62, 76]:

$$K_{\mathrm{air}} = \int_{0}^{T_0} \Phi(E)\,E\left(\frac{\mu_{en}}{\rho}\right)_{\mathrm{air}}\mathrm{d}E$$

EQNUM[2.17]


bu yerda $(\mu_{en}/\rho)_{\mathrm{air}}$ — xuddi shu usulda olingan quruq havoning massaviy energiya yutilish koeffitsiyenti [59]; keV/g larda olingan natija 1 keV/g = $1{,}602\times10^{-13}$ Gr munosabat yordamida greylarga o‘tkaziladi. Qat’iy aytganda, (2.17) ifoda to‘qnashuv kermasini beradi; havoda kilovoltli fotonlar uchun u amalda to‘liq kermaga teng, chunki ikkilamchi elektronlarning radiatsion yo‘qotishlari sezilarsiz darajada kichik [62]. Havo koeffitsiyenti o‘rniga ICRU-44 yumshoq to‘qimasining [61] koeffitsiyenti qo‘yilsa, xuddi shu ifoda namuna sirtida teskari sochilishni hisobga olmagan holdagi to‘qima kermasini beradi; u 3.6-bo‘limda ekspozitsiya vaqtlarini baholash uchun qo‘llaniladi. SpekPyning o‘z susayish ma’lumotlari bilan filtrlanadigan SpekPy spektrlari uchun SpekPy hisoblagan havodagi kerma qo‘llaniladi, mis anodli barcha spektrlarning YSQlari va o‘rtacha energiyalari esa ikkala model uchun bir xil protseduralar bilan hisoblanadi.

Kilovoltli dastalarning sifati asosan birinchi yarim susaytirish qatlami (YSQ) bilan belgilanadi; YSQ — tor dastaning havodagi kermasini ikki baravar kamaytiradigan etalon yutkichning, odatda alyuminiy yoki misning qalinligi [14, 17, 70]. Diagnostik dastalarning standart nurlanish sifatlari ham xuddi shunday aniqlanadi [111]. Alyuminiydagi birinchi YSQ, ya’ni YSQ1 = $x_1$, quyidagi shartdan topiladi:

$$\int_{0}^{T_0} \Phi(E)\,E\left(\frac{\mu_{en}}{\rho}\right)_{\mathrm{air}}\exp\left[-\mu_{\mathrm{Al}}(E)\,x_1\right]\mathrm{d}E = \frac{1}{2}\,K_{\mathrm{air}}$$

EQNUM[2.18]


bu yerda $\mu_{\mathrm{Al}}(E)$ — alyuminiyning chiziqli susayish koeffitsiyenti. Havodagi kermani to‘rt baravar kamaytiradigan $x_2$ qalinlik xuddi shunday topiladi, ikkinchi YSQ esa YSQ2 = $x_2 - x_1$ ga teng; ikkala tenglama kesmani teng ikkiga bo‘lish (bisektsiya) usuli bilan yechiladi. Bir jinslilik koeffitsiyenti $h$ = YSQ1/YSQ2 monoenergetik dasta uchun birga teng, polienergetik dasta uchun esa odatda birdan kichik bo‘ladi, chunki yutkichning birinchi qatlamlari yumshoq fotonlarni olib tashlaydi va dastani qattiqlashtiradi. Effektiv energiya $E_{\mathrm{eff}}$ — birinchi YSQsi berilgan dastaniki bilan bir xil bo‘lgan monoenergetik dastaning energiyasi; u $\mu_{\mathrm{Al}}(E_{\mathrm{eff}}) = \ln 2/\mathrm{YSQ1}$ tenglamadan Brent usuli bilan topiladi.

Fotonlar flyuensi spektrining o‘rtacha energiyasi quyidagiga teng:

$$\bar{E} = \frac{\int_{0}^{T_0} E\,\Phi(E)\,\mathrm{d}E}{\int_{0}^{T_0} \Phi(E)\,\mathrm{d}E}$$

EQNUM[2.19]


bu yerda ikkala integral ham xarakteristik chiziqlarni o‘z ichiga oladi. Kumush yordamida dozani kuchaytirish nuqtai nazaridan Ag K-chegarasidan yuqori energiyali fotonlar ulushi $f_{\mathrm{Ag}} = \int_{E_{K,\mathrm{Ag}}}^{T_0}\Phi(E)\,\mathrm{d}E \big/ \int_{0}^{T_0}\Phi(E)\,\mathrm{d}E$, bu yerda $E_{K,\mathrm{Ag}}$ = 25,514 keV, hamda energiya flyuensining tegishli ulushi ham hisoblanadi. Ular spektrning kumush to‘qimaga nisbatan eng kuchli yutadigan qismini tavsiflaydi (1.2- va 1.3-bo‘limlar). DEF kabi YSQlar va o‘rtacha energiya ham faqat spektr shakliga bog‘liq bo‘lib, absolyut nurlanish chiqishidagi xatoliklarga sezgir emas.


## 2.6. Dozani kuchaytirish koeffitsiyenti: ta’riflar va hisoblash

Kumush tufayli yuzaga keladigan fizik radiokuchayish DEF, ya’ni bir xil nurlantirish sharoitida to‘qimaning ayni bir nuqtasida sensibilizatsiyalovchi element mavjud bo‘lgandagi yutilgan dozaning u mavjud bo‘lmagandagi yutilgan dozaga nisbati bilan miqdoriy baholanadi:

$$\mathrm{DEF} = \frac{D_{t+\mathrm{Ag}}}{D_t}$$

EQNUM[2.20]


bu yerda $D_{t+\mathrm{Ag}}$ — kumush kiritilgan to‘qimadagi yutilgan doza, ya’ni to‘qima–kumush aralashmasining birlik massasiga berilgan energiya, $D_t$ esa kumush kiritilmagan (taqqoslash uchun olingan) to‘qimadagi yutilgan doza. Birdan kichik qiymatlar dozaning kamayishini, masalan, ekranlash natijasidagi kamayishni bildiradi. Ushbu makroskopik DEF kumushning bir jinsli taqsimlanganligini va dozaning hujayra o‘lchamidan hamda elektronlarning yugurish yo‘llaridan ancha katta hajmlar bo‘yicha o‘rtachalanganligini nazarda tutadi; u radiokuchayishning faqat fizik bosqichini tavsiflaydi.

Energiyasi 50 keV dan past bo‘lgan fotonlar yumshoq to‘qimadagi yugurish yo‘llari millimetrdan ancha kichik bo‘lgan ikkilamchi elektronlarni hosil qiladi (1.2-bo‘lim), shu sababli sirtlar va muhitlarning bo‘linish chegaralari yaqinidagi yupqa qatlamlardan tashqari hamma joyda zaryadli zarralar muvozanati (ZZM) qaror topadi [62, 71]. ZZM sharoitida yutilgan doza (1.4) formulaga muvofiq to‘qnashuv kermasiga teng bo‘ladi, bu kerma esa amalda to‘liq kerma bilan mos tushadi, chunki past Z li muhitlarda bu elektronlarning tormozlanish nurlanishiga sarflanadigan yo‘qotishlari e’tiborga olmasa bo‘ladigan darajada kichik [62, 76]. Polienergetik dasta uchun, havodagi kermaning (2.17) ifodasiga o‘xshash ravishda, yutilgan doza quyidagicha ifodalanadi:

$$D = \int_{0}^{T_0} \Psi(E)\,\frac{\mu_{en}}{\rho}(E)\,\mathrm{d}E$$

EQNUM[2.21]


bu yerda $\Psi(E) = E\,\Phi(E)$ — qaralayotgan nuqtadagi spektral energiya flyuensi, $\Phi(E)$ — (2.16) formula bilan aniqlanadigan fotonlarning spektral flyuensi, $\mu_{en}/\rho$ — muhitning massaviy energiya yutilish koeffitsiyenti, $T_0$ = 45 keV esa fotonlarning maksimal energiyasi. $\mu_{en}/\rho$ sochilgan va flyuoressensiya fotonlari olib ketadigan energiyani hisobga olmaganligi sababli [75], K-qobiq vakansiyalari relaksatsiyalanganda taxminan 83 % hollarda ($\omega_K = 0{,}831$) chiqariladigan Ag K rentgen nurlanishining energiyasi o‘zaro ta’sir nuqtasidan chiqib ketadi deb faraz qilinadi; bu faraz 2.7-bo‘limda tekshiriladi.

Kumush kiritilgan to‘qima bir jinsli aralashma sifatida qaraladi. Agar $w$ — kumushning massa ulushi, ya’ni kumush kiritilgan muhitning birlik massasiga to‘g‘ri keladigan kumush massasi bo‘lsa, additivlik (aralashma) qoidasiga ko‘ra quyidagi ifoda olinadi [59, 62]

$$\left(\frac{\mu_{en}}{\rho}\right)_{t+\mathrm{Ag}} = (1-w)\left(\frac{\mu_{en}}{\rho}\right)_t + w\left(\frac{\mu_{en}}{\rho}\right)_{\mathrm{Ag}}$$

EQNUM[2.22]


bu yerda $t$ va Ag indekslari mos ravishda to‘qima va kumushga tegishli. Xuddi shu qoida elementlarning massa ulushlari $w_i$ orqali $\mu/\rho = \sum_i w_i\,(\mu/\rho)_i$ ko‘rinishida yozilganda, yumshoq to‘qima, suv va havoning koeffitsiyentlarini elementlar uchun tuzilgan NIST jadvallaridan hisoblash imkonini beradi (2.8-bo‘lim). 0,1 dan 2 % gacha bo‘lgan massa ulushlari (kumush kiritilgan to‘qimaning bir grammiga 1–20 mg kumush) ko‘rib chiqiladi.

(2.21) va (2.22) ifodalarni (2.20) formulaga qo‘yib, muhit sirtidagi DEF uchun quyidagi ifoda olinadi:

$$\mathrm{DEF} = \frac{\int \Psi(E)\left[(1-w)\left(\frac{\mu_{en}}{\rho}\right)_t + w\left(\frac{\mu_{en}}{\rho}\right)_{\mathrm{Ag}}\right]\mathrm{d}E}{\int \Psi(E)\left(\frac{\mu_{en}}{\rho}\right)_t\mathrm{d}E}$$

EQNUM[2.23]


bu yerda barcha koeffitsiyentlar foton energiyasi $E$ da hisoblanadi, integrallar esa butun spektr bo‘yicha olinadi. Bu nisbatda flyuensning absolyut normallashtirilishi qisqarib ketadi, shuning uchun DEF faqat spektr shakliga bog‘liq bo‘ladi va IM absolyut nurlanish chiqishini kamroq aniqlik bilan berishiga qaramay (3.1-bo‘lim), DEFni hisoblashda SpekPy bilan teng huquqli ravishda qo‘llanilishi mumkin. Dasturda (`xspec.py` modulining `def_factor` funksiyasida) integrallar spektrning 0,05 keV kenglikdagi intervallari bo‘yicha yig‘indilar sifatida hisoblanadi.

(2.23) ifodaning surati $w$ ga nisbatan chiziqli bo‘lgani uchun uni aniq ravishda quyidagi ko‘rinishga keltirish mumkin

$$\mathrm{DEF} = 1 + w\left(\langle R\rangle - 1\right)$$

EQNUM[2.24]


bunda

$$\langle R\rangle = \frac{\int \Psi(E)\left(\frac{\mu_{en}}{\rho}\right)_{\mathrm{Ag}}\mathrm{d}E}{\int \Psi(E)\left(\frac{\mu_{en}}{\rho}\right)_t\mathrm{d}E} = \frac{\int R(E)\,d_t(E)\,\mathrm{d}E}{\int d_t(E)\,\mathrm{d}E}$$

EQNUM[2.25]


bu yerda $R(E) = (\mu_{en}/\rho)_{\mathrm{Ag}}/(\mu_{en}/\rho)_t$ — massaviy energiya yutilish koeffitsiyentlarining nisbati, $d_t(E) = \Psi(E)\,(\mu_{en}/\rho)_t$ esa kumush kiritilmagan to‘qimaning doza spektri. Shunday qilib, $\langle R\rangle$ — $R(E)$ ning to‘qimaning doza spektri bilan tortilgan o‘rtacha qiymati, $\mathrm{DEF} - 1$ qat’iy ravishda $w$ ga proporsional, $\langle R\rangle - 1$ qiyalik koeffitsiyenti esa faqat spektrning xossasidir. ICRU-44 to‘qimasi uchun $R(E)$ 8 keV dagi 21,0 dan 25 keV dagi 31,8 gacha ortadi, Ag K-chegarasida (25,514 keV) sakrab taxminan 76 ga yetadi va 40–45 keV da taxminan 139 ga erishadi (1.2-bo‘lim). Shu sababli doza spektrining K-chegaradan yuqoriga har qanday siljishi qiyalik koeffitsiyentini oshiradi, bu esa III bobdagi filtrni optimallashtirishning asosi hisoblanadi.

Muhit ichida spektr chuqurlik ortishi bilan qattiqlashadi. Kumush faqat mahalliy ravishda (dastaga g‘alayon kiritmaydigan yupqa qatlam yoki kichik soha ko‘rinishida) mavjud bo‘lgan $z$ chuqurlikdagi nuqtada birlamchi dasta uchun DEF quyidagiga teng:

$$\mathrm{DEF}(z) = \frac{\int \Psi(E)\,e^{-\mu_t(E)\,z}\left[(1-w)\left(\frac{\mu_{en}}{\rho}\right)_t + w\left(\frac{\mu_{en}}{\rho}\right)_{\mathrm{Ag}}\right]\mathrm{d}E}{\int \Psi(E)\,e^{-\mu_t(E)\,z}\left(\frac{\mu_{en}}{\rho}\right)_t\mathrm{d}E}$$

EQNUM[2.26]


bu yerda $\Psi(E)$ — sirtdagi energiya flyuensi, $\mu_t(E) = \rho_t\,(\mu/\rho)_t(E)$ esa zichligi $\rho_t$ = 1,06 g/sm³ bo‘lgan to‘qimaning chiziqli susayish koeffitsiyenti. Sochilgan fotonlar va masofa kvadratiga teskari proporsional kamayish hisobga olinmaydi. $z = 0$ dagi qiymatiga normallashtirilgan maxraj kumush kiritilmagan to‘qimadagi faqat susayish bilan bog‘liq nisbiy birlamchi dozani beradi. To‘qimaning susayish koeffitsiyenti energiya ortishi bilan kamaygani sababli, $R(E)$ kichik bo‘lgan past energiyali fotonlar dastadan birinchi navbatda chiqariladi va DEF chuqurlik ortishi bilan ortadi.

Kumush sirt bilan qaralayotgan nuqta orasidagi butun sohani to‘ldirganda, u dastani ham susaytiradi, ayniqsa uning massaviy susayish koeffitsiyenti 5,8 marta ortadigan K-chegaradan bevosita yuqoridagi sohada. Sirtdan $z$ dan kattaroq chuqurlikkacha bir tekis kumush kiritilgan yassi qatlam uchun quyidagi ifoda o‘rinli:

$$\mathrm{DEF}_{\mathrm{slab}}(z) = \frac{\int \Psi(E)\,e^{-\mu_{t+\mathrm{Ag}}(E)\,z}\left[(1-w)\left(\frac{\mu_{en}}{\rho}\right)_t + w\left(\frac{\mu_{en}}{\rho}\right)_{\mathrm{Ag}}\right]\mathrm{d}E}{\int \Psi(E)\,e^{-\mu_t(E)\,z}\left(\frac{\mu_{en}}{\rho}\right)_t\mathrm{d}E}$$

EQNUM[2.27]


bu yerda $\mu_{t+\mathrm{Ag}}(E) = \rho_t\left[(1-w)(\mu/\rho)_t + w\,(\mu/\rho)_{\mathrm{Ag}}\right]$ — kumush kiritilgan muhitning chiziqli susayish koeffitsiyenti (bu muhitning zichligi taxminan $\rho_t$ ga teng deb olinadi), maxraj esa kumushsiz to‘qimadagi xuddi shu chuqurlikka tegishli. Qo‘shimcha susayish dastadan asosan K-chegaradan yuqoridagi eng samarali fotonlarni chiqaradi, shuning uchun $\mathrm{DEF}_{\mathrm{slab}}$ chuqurlik ortishi bilan kamayadi (o‘z-o‘zini ekranlash) va endi $w$ ga nisbatan chiziqli bo‘lmaydi. $w$ = 1 % bo‘lganda kumush o‘zining K-chegarasidan bevosita yuqorida qo‘shadigan susayish to‘qimaning o‘zidagi susayish bilan taqqoslanarli bo‘ladi va kumush kiritilgan soha orqasida doza kumushsiz holdagi qiymatidan pastga tushadi.

Taqqoslash muhiti sifatida ICRU-44 yumshoq to‘qimasi olingan (massa bo‘yicha H 10,2, C 14,3, N 3,4, O 70,8, Na 0,2, P 0,3, S 0,3, Cl 0,2 va K 0,3 %; 1,06 g/sm³) [61]; muqobil sifatida suv va ICRU ning to‘rt komponentli to‘qimasi qo‘llaniladi. Bu tanlov DEFga ta’sir qiladi (3.10-bo‘lim) va DEF bilan birga ko‘rsatilishi shart. Makroskopik DEF ajrata olmaydigan hujayra ichi miqyosida nanozarrachalar atrofidagi doza kuchayishi kuchli lokallashgan bo‘ladi [30], chunki qisqa yugurish yo‘lli fotoelektronlar va Oje elektronlari o‘z energiyasining katta qismini zarracha yaqinida qoldiradi. Energiyaning bunday nanomiqyosda yutilishi makroskopik doza kuchayishi doirasidan tashqariga chiqadigan biologik ta’sirlarni yuzaga keltirishi mumkin (lokal effekt modeli) [31], natija esa foton energiyasiga hamda zarrachalarning o‘lchami, konsentratsiyasi va joylashuviga bog‘liq [97]. Shunday qilib, ushbu ishda hisoblangan DEF kimyoviy, biologik va nanomiqyosdagi hissalarni ajratib ko‘rsatish uchun fizik tayanch daraja bo‘lib xizmat qiladi.

## 2.7. Verifikatsiya uchun Monte-Karlo usuli

Analitik modelning ikki asosiy farazi — Ag K-flyuoressensiya energiyasining chiqib ketishi va sochilgan fotonlarning hisobga olinmasligi — mustaqil MK dasturi (`mc_dose.py`) yordamida tekshiriladi. Bu dastur umumiy maqsadli PENELOPE, EGSnrc va Geant4 dasturlariga [107–109] qaraganda ancha sodda, ammo 50 keV dan past energiyalarda ahamiyatli bo‘lgan fotonlarning barcha o‘zaro ta’sirlarini va kumush flyuoressensiya nurlanishining ko‘chishini o‘z ichiga oladi.

Geometriya ko‘ndalang yo‘nalishda cheksiz, qalinligi 30 mm bo‘lgan ICRU-44 to‘qimasidan tashkil topgan yassi qatlamdir; u sirtga normal bo‘ylab tushuvchi keng parallel dasta bilan nurlantiriladi. 2–12 mm chuqurlikdagi qatlamda $w$ = 1 % kumush mavjud bo‘lib, bu holat to‘qimaga parsial zichligi $\rho_{\mathrm{Ag}} = \rho_t\,w/(1-w)$ bo‘lgan kumush qo‘shish orqali modellashtiriladi. Fotonlar yutilguncha yoki muhitdan chiqib ketguncha ularning energiyasi $E$, chuqurligi $z$ va qatlam normaliga nisbatan yo‘nalish kosinusi $u$ bo‘yicha kuzatib boriladi, yutilgan energiya esa 0,25 mm kenglikdagi intervallarda qayd etiladi. Tushuvchi spektrlar sifatida 45 kV li trubkaning (θ = 12°, 0,5 mm Be, 10 sm havo) filtrsiz va 1 mm Al filtrli SpekPy spektrlari olinadi; ulardan foton energiyasi kumulyativ taqsimot funksiyasini inversiyalash usuli bilan tanlanadi, bunda energiyaning har bir 0,05 keV li interval ichidagi qiymati tekis taqsimot bo‘yicha olinadi.

Erkin yugurish yo‘llari Vudkok usuli (delta-treking) [63, 117] yordamida tanlanadi, bunda majorant sifatida kumush kiritilgan qatlamning chiziqli susayish koeffitsiyenti $\mu_{\max}(E) = \mu_t(E) + \mu_{\mathrm{Ag}}(E)$ olinadi; bu yerda $\mu_{\mathrm{Ag}} = \rho_{\mathrm{Ag}}(\mu/\rho)_{\mathrm{Ag}}$ bo‘lib, ikkala had ham xraylib kesimlari asosida hisoblanadi. Yugurish yo‘lining uzunligi quyidagicha aniqlanadi:

$$s = -\frac{\ln \xi_1}{\mu_{\max}(E)}$$

EQNUM[2.28]


bu yerda $\xi_1$ — (0; 1) oraliqda tekis taqsimlangan tasodifiy son; foton $z + u\,s$ chuqurlikka ko‘chadi. U yerda to‘qnashuv quyidagi ehtimollik bilan haqiqiy bo‘ladi:

$$P_{\mathrm{real}} = \frac{\mu(z,E)}{\mu_{\max}(E)}$$

EQNUM[2.29]


bu yerda $\mu(z,E)$ — shu nuqtadagi haqiqiy koeffitsiyent (qatlamdan tashqarida $\mu_t$, uning ichida $\mu_t + \mu_{\mathrm{Ag}}$); aks holda to‘qnashuv virtual bo‘ladi va foton harakatini o‘zgarishsiz davom ettiradi, qatlam chegaralarigacha bo‘lgan masofalar esa umuman hisoblanmaydi.

Haqiqiy o‘zaro ta’sirning turi (to‘qimada yoki kumushda fotoyutilish, nokogerent yoki kogerent sochilish) xraylib [60] asosida 1–46 keV oralig‘ida 5 eV qadam bilan jadvallashtirilgan parsial koeffitsiyentlar bo‘yicha tanlanadi. Kumushda K-chegaradan yuqori energiyada fotoyutilish sodir bo‘lgandan so‘ng K-qobiq $\tau_K/\tau$ ehtimollik bilan tanlanadi, bu kattalik K-qobiq fotoelektrik kesimining to‘liq fotoelektrik kesimga nisbatidir. Vakansiya $\omega_K$ ehtimollik bilan oltita asosiy K chiziqdan birining K rentgen fotonini chiqaradi, chiziq esa nurlanish o‘tishlarining ehtimolliklariga muvofiq tanlanadi. Bu foton izotrop ravishda chiqariladi va uning ko‘chishi kuzatiladi, energiyaning qolgan qismi esa mahalliy ravishda yutiladi, xuddi boshqa barcha fotoyutilish hodisalarida fotonning butun energiyasi mahalliy yutilgani kabi.

Qutbiy sochilish burchagi $\vartheta$ xraylib differensial kesimlarining kumulyativ jadvallaridan tanlanadi: nokogerent sochilish funksiyasiga ko‘paytirilgan Kleyn–Nishina kesimi va atom forma faktorining kvadratiga ko‘paytirilgan Tomson kesimi [60, 64]. Jadvallar (1 dan 46 keV gacha 91 ta energiya, 1441 ta burchak) to‘qima uchun hisoblanadi va barcha hodisalar uchun qo‘llaniladi, chunki kumushning qatlamdagi sochilish kesimiga qo‘shadigan hissasi bor-yo‘g‘i bir necha foizni tashkil etadi. Nokogerent sochilishdan keyin foton energiyasi quyidagiga teng bo‘ladi:

$$E' = \frac{E}{1 + \frac{E}{m_e c^2}\left(1 - \cos\vartheta\right)}$$

EQNUM[2.30]


bu yerda $E$ va $E'$ — fotonning sochilishdan oldingi va keyingi energiyalari, $m_e c^2$ = 510,999 keV — elektronning tinchlikdagi energiyasi; $E - E'$ energiya mahalliy ravishda yutiladi. Yo‘nalish kosinusi $u' = u\cos\vartheta + \sqrt{1-u^2}\,\sin\vartheta\cos\varphi$ ga teng bo‘ladi, bunda azimutal burchak $\varphi$ $[0, 2\pi)$ oraliqda tekis taqsimlangan. Energiyasi 1 keV dan past bo‘lgan fotonlar mahalliy ravishda yutiladi.

Yugurish yo‘llari bir necha o‘n mikrometrni tashkil etib, intervallar kengligidan ancha kichik bo‘lgan ikkilamchi elektronlar o‘z energiyasini mahalliy ravishda muhitga beradi. Tushuvchi flyuens birligiga to‘g‘ri keladigan $j$-intervaldagi doza quyidagicha aniqlanadi:

$$D_j = \frac{1}{N}\,\frac{\sum_{i \in j} \varepsilon_i}{\rho_j\,\Delta z}$$

EQNUM[2.31]


bu yerda $\varepsilon_i$ — intervalda muhitga berilgan alohida energiya miqdorlari, $N$ — tushuvchi fotonlar soni, $\rho_j$ — zichlik ($\rho_t$ yoki $\rho_t + \rho_{\mathrm{Ag}}$), $\Delta z$ = 0,25 mm. MK usuli bilan olingan DEF $w$ = 1 % va $w = 0$ bo‘lgandagi dozalar nisbatiga teng; har bir hisob beshta mustaqil seriyaga bo‘lingan $4\times10^{6}$ ta tarixni o‘z ichiga oladi, seriyalar natijalarining tarqoqligi standart xatolikni beradi. Analitik taqqoslash asosi sifatida ichki (ko‘milgan) qatlam uchun umumlashtirilgan (2.27) ifoda olinadi, bunda kumush tufayli susayish va aralashma koeffitsiyenti faqat qatlam ichida qo‘llaniladi.

Hisoblardan oldin ikkita tekshiruv o‘tkazildi. 30 keV li keng dasta uchun sirtdagi dozaning birlamchi kermaga nisbati teskari sochilgan fotonlar hisobiga 1,31 ga teng; kilovoltli dastalarda bu fotonlarning hissasi maydon o‘lchamiga va manbagacha bo‘lgan masofaga bog‘liq [118]. Energiya uzatish koeffitsiyenti xraylib kutubxonasidagi fotoyutilish va kompton sochilishi ma’lumotlaridan tiklanganda, u 20–40 keV da O, C va H uchun NIST $\mu_{en}/\rho$ qiymatlari bilan 0,3 % aniqlikda mos keladi, bu energiyalarda ikkala koeffitsiyent amalda bir xil bo‘ladi; shunday qilib, MK dasturidagi o‘zaro ta’sir ma’lumotlari NIST bilan muvofiqdir.

## 2.8. Ma’lumotlar manbalari, dasturiy realizatsiya va validatsiya strategiyasi

Barcha materiallarning massaviy energiya yutilish koeffitsiyentlari $\mu_{en}/\rho$ hamda to‘qima, suv va havoning massaviy susayish koeffitsiyentlari $\mu/\rho$ Hubbell va Seltzerning NIST jadvallaridan [59] olingan, bu jadvallar Seltzerning $\mu_{en}/\rho$ hisoblariga asoslanadi [75]. `nist.py` moduli lokal saqlangan jadvallarni o‘qiydi va har bir koeffitsiyentning logarifmini yutilish chegaralari orasidagi har bir segment ichida alohida $\ln E$ bo‘yicha chiziqli interpolyatsiya qiladi. Log–log interpolyatsiya o‘rinli, chunki chegaralar orasida koeffitsiyentlar energiyaga taxminan darajali qonun bo‘yicha bog‘liq ravishda o‘zgaradi. Chegaralar jadvallardagi takrorlanuvchi energiya qiymatlari sifatida aniqlanadi, aynan chegaraga to‘g‘ri keladigan energiyaga esa chegaradan pastdagi qiymat beriladi. Aralashma qoidasi ICRU-44 to‘qimasining tarkibi, suvning stexiometrik tarkibi va quruq havoning NIST tarkibi bilan qo‘llaniladi. Anod, oyna va filtr materiallari hamda kumushning elementar $\mu/\rho$ qiymatlari, chegaralar va chiziqlar energiyalari, flyuoressensiya chiqishlari, nurlanish o‘tishlari ehtimolliklari va MK dasturidagi kesimlar xraylib 4.3.0 kutubxonasidan [60] olingan. Uning $\mu/\rho$ qiymatlari NIST ma’lumotlari [59, 72] bilan 0,1 % dan yaxshiroq aniqlikda mos keladi.

Tekshirish jarayonida xraylib 4.3.0 kutubxonasining $\mu_{en}/\rho$ qiymatini qaytaradigan `CS_Energy` funksiyasida xatolik aniqlandi. Yengil elementlar uchun 15–45 keV da uning qiymatlari haddan tashqari past: kislorod uchun 30 keV da u NIST qiymati 0,173 sm²/g o‘rniga 0,108 sm²/g ni beradi (−37 %), uglerod uchun xuddi shu energiyada 0,0661 sm²/g o‘rniga 0,0515 ni beradi, kumush uchun esa NIST bilan mos keladi (16,58 va 16,60 sm²/g). To‘qima asosan O, C va H dan iborat bo‘lgani uchun bu funksiya (2.23) ifodaning maxrajini kamaytirib ko‘rsatgan va DEFni keskin oshirib yuborgan bo‘lar edi: 1 mm Al bilan 1 % Ag uchun 1,48 o‘rniga 1,72. Tiklangan energiya uzatish koeffitsiyenti ko‘rsatganidek (2.7-bo‘lim), xraylib kutubxonasining fotoyutilish va sochilish kesimlariga bu xatolik ta’sir qilmaydi. Shu sababli barcha $\mu_{en}/\rho$ qiymatlari bevosita NIST dan olinadi, `CS_Energy` funksiyasini esa past Z li muhitlar uchun qo‘llashdan oldin NIST bilan solishtirib tekshirish lozim.

Tayanch spektr modeli sifatida “casim” fizik modeli bilan SpekPy v2.5.4 [15, 58] olingan, bu model 10–50 kV da mis anodlarni qo‘llab-quvvatlaydi. SpekPy o‘lchangan spektrlar va YSQ qiymatlari bilan solishtirib validatsiya qilingan [51]. Uning spektrlari IMni validatsiya qilish uchun hamda DEF hisoblarining asosiy kirish ma’lumotlari sifatida xizmat qiladi, bu hisoblar IM spektrlari bilan ham takrorlanadi. Dasturiy ta’minot Python 3.13 tilida NumPy [65], SciPy [66] va Matplotlib [67] kutubxonalaridan foydalanib yozilgan. SciPy model parametrini chegaralangan oraliqda minimallashtirishni hamda effektiv energiyani va bir xil o‘tkazish koeffitsiyentini ta’minlaydigan filtr qalinliklarini topish uchun Brentning ildiz topish usulini ta’minlaydi. `run_all.py`, `run_sweeps.py` va `mc_dose.py` skriptlari mos ravishda asosiy natijalarni, filtrlar bo‘yicha skanerlash natijalarini va MK verifikatsiyasini hosil qiladi.

IMning yagona moslashtiriladigan parametri — (2.4) ifodadagi elektronlarning chuqurlik koeffitsiyenti $\eta$ — 45 kV, θ = 12° va 0,5 mm Be sharoitida IM va SpekPy tormozlanish nurlanishi spektrlari (xarakteristik chiziqlarsiz) orasidagi o‘rtacha kvadratik chetlanishni minimallashtirish sharti bilan aniqlanadi. Ikkala spektr 3 keV dan yuqori sohada birlik yuzaga normallashtiriladi, chetlanish tayanch spektr maksimumiga nisbatan olinadi, $\eta$ esa 0,25–0,7 oralig‘ida izlanadi va verguldan keyingi ikki xonagacha yaxlitlanadi. Qolgan barcha konfiguratsiyalar qayta moslashtirishsiz olingan bashoratlardir. Validatsiya besh bosqichni o‘z ichiga oladi: (i) model komponentlarini tekshirish, masalan, 50 keV da suv uchun Bete tormozlanish qobiliyati 6,603 MeV sm²/g ga teng bo‘lib, NIST ESTAR qiymati bilan bir xil [69]; (ii) 25–50 kV va 6–30° anod burchaklari uchun 1 mm Al filtr bilan va filtrsiz spektrlar va dasta sifati parametrlarini SpekPy bilan taqqoslash, bu taqqoslash 50, 80 va 100 kV da volfram anodli trubka uchun tekshiruv bilan to‘ldiriladi; (iii) IM va SpekPy spektrlari bilan olingan DEF qiymatlarini taqqoslash; (iv) MK verifikatsiyasi hamda (v) DEFning sezgirlik tahlili.

## 2.9. Kilovoltli rentgen trubkasi bilan ishlashda radiatsiyaviy xavfsizlik

Mis anodli 45 kV li trubka juda intensiv past energiyali rentgen nurlanishining manbai hisoblanadi. III bobda ko‘rsatilganidek, fokus dog‘idan 10 sm masofada filtrsiz dastaning havodagi kermasi 383 mGr/(mA·s) ni, ya’ni 40 mA da 15,3 Gr/s ni tashkil etadi, xuddi shu tokda esa to‘qima sirti 2 Gr dozani 0,12 s da oladi. Shu sababli qo‘llarning tasodifan birlamchi dasta ta’siriga uchrashi bir necha soniya ichida og‘ir mahalliy nurlanish shikastlanishlariga olib kelishi mumkin. Birlamchi dasta, namuna va uning tutqichida sochilgan nurlanish hamda trubka g‘ilofidan sizib chiqadigan nurlanishning barchasi nazorat qilinishi shart.

Radiatsiyaviy himoya asoslash, nurlanish dozalarini oqilona erishish mumkin bo‘lgan darajada past saqlashni ko‘zda tutuvchi optimallashtirish (ALARA) hamda dozani cheklash tamoyillariga tayanadi. Bu tamoyillar Radiologik himoya bo‘yicha xalqaro komissiya tomonidan shakllantirilgan [119] va Atom energiyasi bo‘yicha xalqaro agentlikning Asosiy xavfsizlik standartlarida o‘z aksini topgan [120]. O‘zbekiston Respublikasida radiatsiyaviy xavfsizlikning huquqiy asosini “Radiatsiyaviy xavfsizlik to‘g‘risida”gi Qonun tashkil etadi [121]. Rentgen trubkasi bilan ishlash rejalashtirilgan nurlanish vaziyati hisoblanadi, bunda kasbiy nurlanish effektiv doza bo‘yicha, shuningdek teri, ekstremitetlar (qo‘l va oyoq panjalari) hamda ko‘z gavhari uchun ekvivalent dozalar bo‘yicha belgilangan chegaralardan past bo‘lishi shart [119, 120].

Asosiy himoya choralari texnik xususiyatga ega. Ekranlangan trubka g‘ilofi nurlanishni tashqariga faqat oyna va zatvor orqali o‘tkazadi, namuna esa yopiq kamerada nurlantiriladi, kamera eshigidagi blokirovka qurilmalari yuqori kuchlanishni o‘chiradi yoki zatvorni yopadi. Ogohlantiruvchi chiroqlar yuqori kuchlanish yoqilganligini va zatvor ochiqligini ko‘rsatadi, qo‘zg‘almas tutqichlar va kollimatorlar esa qo‘llarni dastadan tashqarida saqlaydi. Yuqori kuchlanish generatori qo‘shimcha elektr xavfi manbai hisoblanadi, mo‘rt berilliy oynaga esa tegish mumkin emas, chunki berilliy birikmalari zaharli. Xodimlarni o‘qitish, ichki qoidalar, shaxsiy dozimetriya hamda kamera atrofida, ayniqsa texnik xizmat ko‘rsatilgandan keyin, doza quvvatini o‘lchash bu choralarni to‘ldiradi.

Qo‘shimcha filtrlash xavfsizlikka ham xizmat qiladi. DEFni sezilarli darajada oshiradigan filtrlar (1 mm Al dan 0,2 mm Cu gacha) havodagi kerma quvvatini 120–1300 marta kamaytiradi. 1 mm Al filtr bilan 40 mA da sirtdagi to‘qima kermasining quvvati 16,5 dan 0,137 Gr/s gacha kamayadi, 2 Gr doza uchun zarur vaqt esa 0,12 dan 14,6 s gacha ortadi, bu vaqtni taymer yoki zatvor yordamida kichik nisbiy xatolik bilan nazorat qilish mumkin. Filtr chuqurlikka yetib bormasdan yuza qatlamlarda yutiladigan yumshoq komponentni dastadan chiqarib tashlaydi: 10 mm chuqurlikdagi faqat susayish bilan bog‘liq nisbiy birlamchi doza filtrsiz holda sirtdagi qiymatning 0,009 qismini, 1 mm Al bilan esa 0,44 qismini tashkil etadi. Shunday qilib, filtrlash teri yoki namuna sirtidagi ortiqcha dozani kamaytiradi, filtrlangan dastaning sifatini esa kilovoltli dozimetriya protokolidagi kabi uning YSQ qiymati orqali belgilash mumkin [14]. Demak, DEFni maksimal darajaga yetkazadigan filtr ALARA ma’nosida optimallashtirish chorasi ham hisoblanadi.

## 2.10. II bob bo‘yicha xulosalar

1. Mis anodli qaytaruvchi nishonli rentgen trubkasi spektrining qalin nishon uchun yarim analitik modeli (IM) ishlab chiqildi. U elektronlarning Bete tormozlanish qobiliyati bilan sekinlashishini, norelyativistik Bete–Gaytler kesimi va Elvert ko‘paytuvchisi yordamida tavsiflanadigan tormozlanish nurlanishini, bevosita va tormozlanish nurlanishi qo‘zg‘atgan K nurlanishni, anodda o‘z-o‘zini yutishni hamda oyna, havo va filtrlarda susayishni o‘z ichiga oladi va yagona moslashtiriladigan parametrga — elektronlarning chuqurlik koeffitsiyenti $\eta$ ga ega.
2. Dasta sifati parametrlari (birinchi va ikkinchi YSQ, bir jinslilik koeffitsiyenti, o‘rtacha va effektiv energiyalar) IM va SpekPy spektrlari uchun bir xil dasturiy protseduralar yordamida hisoblanadi, trubkaning chiqishi esa havodagi kerma bilan tavsiflanadi.
3. 50 keV dan past energiyalarda ZZM sharoitida kumush kiritilgan to‘qimaning DEF qiymati massaviy energiya yutilish koeffitsiyentlarining spektr bo‘yicha tortilgan nisbatidan iborat. Sirtda $\mathrm{DEF} - 1$ kumushning massa ulushiga aniq proporsional bo‘lib, qiyalik koeffitsiyenti doza spektrining Ag K-chegarasidan yuqoridagi qismi bilan belgilanadi. DEFning chuqurlikka bog‘liq va kumush kiritilgan qatlam uchun yozilgan shakllari dastaning qattiqlashishini va o‘z-o‘zini ekranlashni tavsiflaydi.
4. Vudkok usulidan foydalanadigan, kompton va reley sochilishini hamda Ag K-flyuoressensiya nurlanishining ko‘chishini hisobga oladigan mustaqil MK dasturi analitik modelning farazlarini tekshiradi.
5. Barcha $\mu_{en}/\rho$ qiymatlari NIST dan olinadi, chunki xraylib 4.3.0 kutubxonasining `CS_Energy` funksiyasi yengil elementlar uchun ularni 37 % gacha kamaytirib ko‘rsatadi va DEFni oshirib yuborgan bo‘lar edi (1 mm Al bilan 1 % Ag uchun 1,48 o‘rniga 1,72).
6. Trubkaning filtrsiz chiqishi (10 sm masofada va 40 mA da 15,3 Gr/s) ekranlash, blokirovkalar va dozimetrik nazoratni talab qiladi; filtrlash doza quvvatini ham, yuza dozani ham kamaytiradi.


## 3.7. Chuqurlikka bog‘liqlik va o‘z-o‘zini ekranlash

Hozirgacha ko‘rib chiqilgan DEF qiymatlari muhit sirtiga tegishli, holbuki to‘qima namunalari, fantomlar yoki mayda hayvonlar bilan o‘tkaziladigan tajribalarda Ag kiritilgan nishon dastani o‘zgartiruvchi to‘qima ostida joylashadi. Shu sababli SpekPy spektrlari yordamida birlamchi dasta uchun kerma yaqinlashuvida (2.6-bo‘lim) ikki holat hisoblandi. Birinchi holatda Ag kiritilgan kichik soha Ag kiritilmagan yumshoq to‘qimada $z$ chuqurlikda joylashadi va dastani faqat uning ustidagi to‘qima susaytiradi; bu holat (2.26) formula bilan tavsiflanadi. Ikkinchi holatda sirtdan $z$ chuqurlikkacha bo‘lgan sohaga Ag bir tekis kiritilgan bo‘lib, Agning o‘zi ham susayishga hissa qo‘shadi; bu holat (2.27) formula bilan tavsiflanadi. Har ikki holatda ham sochilgan nurlanish hisobga olinmagan; uning roli 3.9-bo‘limda baholanadi.

$z$ chuqurlikda joylashgan Ag kiritilgan sohaning DEF qiymati 2.3-rasmda ko‘rsatilgan, 2.3-jadvalda esa birlamchi dastaning to‘qimadagi nisbiy dozasi $D/D_0$ ham keltirilgan, bu yerda $D_0$ — sirtdagi doza. Barcha filtrlar uchun DEF chuqurlik ortishi bilan monoton ortadi, chunki ustdagi to‘qima past energiyali fotonlarni birinchi navbatda yutadi va energiya flyuensini yuqoriroq energiyalar tomon siljitadi, bu energiyalarda esa massaviy energiya yutilish koeffitsiyentlarining Ag/to‘qima nisbati kattaroq bo‘ladi. Bu ortish filtrlanmagan dasta uchun yaqqol namoyon bo‘ladi: bunda 1 % Ag uchun DEF sirtdagi 1,20 dan 5 mm chuqurlikda 1,34 gacha va 20 mm chuqurlikda 1,56 gacha ortadi. Bu yutuq dozaning keskin kamayishi bilan birga kechadi: Cu K chiziqlari va yumshoq tormozlanish nurlanishi dastlabki millimetrlarda yutilishi natijasida nisbiy doza 1 mm chuqurlikda 0,328 gacha va 10 mm chuqurlikda 0,0090 gacha pasayadi. Shunday qilib, bir necha millimetr to‘qima qo‘shimcha filtr vazifasini bajaradi va bunda 3.6-bo‘limda tavsiflangan murosa yuzaga keladi. Dastani allaqachon qattiqlashtirgan 1 mm Al filtr bilan DEF mo‘tadilroq ortadi (sirtda 1,48, 5 mm chuqurlikda 1,54 va 20 mm chuqurlikda 1,69), nisbiy doza esa 5 mm chuqurlikda atigi 0,642 gacha va 10 mm chuqurlikda 0,439 gacha kamayadi.



![2.3-rasm. 1 % Ag uchun dozani kuchaytirish koeffitsiyentining Ag kiritilmagan ICRU-44 yumshoq to‘qimasidagi Ag kiritilgan soha chuqurligiga bog‘liqligi: 45 kV li mis anodli trubka dastasi qo‘shimcha filtrsiz hamda Al 0,5 mm, Al 1,0 mm, Cu 0,1 mm va Sn 0,1 mm filtrlar bilan (SpekPy spektrlari, birlamchi dasta, kerma yaqinlashuvi).](/home/user/atlant-impossible/dissertation/code/../figures/uz/fig18_def_depth.png){width=13.5cm}





Table: 2.3-jadval. Tanlangan filtrlar uchun DEF (1 % Ag) va nisbiy dozaning yumshoq to‘qimadagi chuqurlikka bog‘liqligi (birlamchi dasta)

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



Cu va Sn filtrlari ikki chekka holatni ifodalaydi. 0,1 mm Cu bilan filtrlangan dasta o‘tib kelgan Cu Kα chizig‘i va tormozlanish nurlanishining qattiq “dumi”dan iborat (3.4-bo‘lim); Kα chizig‘i to‘qimaning dastlabki millimetrlarida yutilishi sababli DEF sirtdagi 1,29 dan 5 mm chuqurlikda 1,77 gacha va 20 mm chuqurlikda 1,90 gacha keskin ortadi. Taxminan 2 mm dan boshlab bu egri chiziq qolgan barcha egri chiziqlardan yuqorida joylashadi, 5 mm chuqurlikda esa uning DEF qiymati 0,2 mm Cu bilan sirtda olingan qiymatga (1,80) yaqinlashadi, chunki bu chuqurlikda ikkala dasta ham asosan qattiq komponentdan iborat bo‘ladi. Sn 0,1 mm filtr chuqurlikka eng kuchsiz bog‘liqlikni beradi — sirtdagi 1,44 dan 20 mm chuqurlikda 1,57 gacha, chunki Sn K-chegarasidan (29,2 keV) yuqori energiyali fotonlar kuchli susaytirilgan, qolgan tor energiya oralig‘ini esa to‘qima juda kam qattiqlashtiradi. Demak, filtrlarning sirtdagi DEF bo‘yicha tartibi chuqurda joylashgan nishonlar uchun o‘rinli emas.

Ag kiritilgan soha sirtdan boshlanganda teskari tendensiya kuzatiladi (2.4-rasm). Bu holda DEF chuqurlik ortishi bilan kamayadi, chunki Ag kuchayishni yuzaga keltiradigan, o‘z K-chegarasidan yuqori energiyali fotonlarni eng kuchli susaytiradi; 25,514 keV energiyada Agning massaviy susayish koeffitsiyenti 9,53 dan 55,4 sm²/g gacha, ya’ni 5,8 marta ortadi. Al 1,0 mm filtr bilan 1 % Ag uchun DEF sirtdagi 1,48 dan 5 mm chuqurlikda 1,34 gacha va 10 mm chuqurlikda 1,21 gacha, 2 % Ag uchun esa 1,96 dan mos ravishda 1,57 va 1,27 gacha kamayadi. Shunday qilib, o‘z-o‘zini ekranlash konsentratsiya ortishi bilan kuchayadi, (2.24) formula bilan ifodalangan $\mathrm{DEF}-1$ va $w$ orasidagi chiziqli bog‘lanish esa faqat Ag kiritilgan yupqa qatlamlar uchun o‘rinli. Sn bilan filtrlangan dasta o‘z kuchayishining kattaroq qismini yo‘qotadi (1 % Ag uchun sirtdagi 1,44 dan 10 mm chuqurlikda 1,15 gacha), chunki uning spektri Ag K-chegarasidan bevosita yuqorida, ya’ni Ag tomonidan susaytirish eng katta bo‘lgan sohada jamlangan. Shu sababli qalinligi bir necha millimetr bo‘lgan, Ag bir tekis kiritilgan sohada kuchayish notekis bo‘lib, o‘rtacha hisobda sirtdagidan sezilarli darajada past bo‘ladi.



![2.4-rasm. Yumshoq to‘qima sirtidan boshlanuvchi, Ag bir tekis kiritilgan soha ichida dozani kuchaytirish koeffitsiyentining chuqurlikka bog‘liqligi: Ag massa ulushi 0,5; 1,0 va 2,0 % bo‘lganda Al 1,0 mm filtr (tutash chiziqlar) va Sn 0,1 mm filtr (shtrix chiziqlar) bilan; dastaning Ag tomonidan susaytirilishi (o‘z-o‘zini ekranlash) hisobga olingan.](/home/user/atlant-impossible/dissertation/code/../figures/uz/fig19_def_slab.png){width=13.5cm}



## 3.8. Trubka kuchlanishining ta’siri va atom raqami yuqori bo‘lgan boshqa elementlar bilan taqqoslash

Al 0,5 mm va Al 1,0 mm filtrlar uchun DEFning trubka kuchlanishi $U$ ga bog‘liqligi 2.5-rasm va 2.4-jadvalda ko‘rsatilgan. SpekPy mis anodni qo‘llab-quvvatlaydigan 20–50 kV oralig‘ida SpekPy spektrlaridan foydalanildi, 60–80 kV uchun nuqtalar esa IM bashoratlaridir. Fotonlarning maksimal energiyasi $eU$ ga teng bo‘lganligi sababli (bu yerda $e$ — elementar zaryad), Ag K-chegarasidan (25,514 keV) yuqori energiyali fotonlar faqat 25,5 kV dan yuqori kuchlanishlarda mavjud bo‘ladi. Bu kuchlanishdan pastda DEF $U$ ga juda kuchsiz bog‘liq: Al 1,0 mm bilan u tormozlanish nurlanishining asta-sekin qattiqlashishi hisobiga 20 kV dagi 1,26 dan 25 kV dagi 1,27 gacha ortadi. Ikkala egri chiziqning qiyaligi 26–27 kV dan boshlab sezilarli darajada ortadi, 30 va 50 kV oralig‘ida esa Al 1,0 mm uchun DEF asta-sekin kamayib boruvchi qiyalik bilan 1,31 dan 1,52 gacha ortadi; 45 kV atrofida bu qiyalik 3.10-bo‘limda aniqlangan o‘zgarishga (±1 kV ga ±0,009) mos keladi. 50 kV dan yuqorida o‘sish yanada sekinlashadi (60 kV da 1,58 va 80 kV da 1,68), chunki spektr massaviy energiya yutilish koeffitsiyentlari Ag/to‘qima nisbatining 40–45 keV atrofidagi maksimumidan tashqariga chiqadi. 45 kV da IM SpekPyga qaraganda biroz pastroq DEF qiymatlarini berganligi sababli (IM va SpekPy bo‘yicha mos ravishda Al 0,5 mm uchun 1,369 va 1,377, Al 1,0 mm uchun 1,464 va 1,482), 60–80 kV dagi qiymatlar oshirib emas, balki, aksincha, past baholangan bo‘lishi mumkin, 50 va 60 kV oralig‘idagi yassilanishning bir qismi esa spektr modelining almashinishi bilan bog‘liq.



![2.5-rasm. Al 0,5 mm va Al 1,0 mm filtrlar qo‘llangan mis anodli trubka uchun 1 % Ag holida dozani kuchaytirish koeffitsiyentining trubka kuchlanishiga bog‘liqligi: 20–50 kV uchun SpekPy v2 spektrlari (tutash chiziqlar, doirachalar) va 60–80 kV uchun ishlab chiqilgan model (shtrix chiziqlar, kvadratchalar). Vertikal chiziq Ag K-chegarasini ko‘rsatadi.](/home/user/atlant-impossible/dissertation/code/../figures/uz/fig20_def_kvp.png){width=13.5cm}





Table: 2.4-jadval. DEF (1 % Ag) ning trubka kuchlanishiga bog‘liqligi (20–50 kV: SpekPy; 60–80 kV: ishlab chiqilgan model)

| U, kV | 20 | 22 | 24 | 25 | 26 | 27 | 28 | 30 | 35 | 40 | 45 | 50 | 60 | 70 | 80 |
|:---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Al 0,5 mm | 1,246 | 1,250 | 1,253 | 1,255 | 1,257 | 1,260 | 1,265 | 1,277 | 1,312 | 1,346 | 1,377 | 1,406 | 1,452 | 1,499 | 1,541 |
| Al 1,0 mm | 1,261 | 1,266 | 1,270 | 1,272 | 1,275 | 1,282 | 1,291 | 1,314 | 1,376 | 1,433 | 1,482 | 1,524 | 1,577 | 1,633 | 1,679 |



Kumushning boshqa nomzod radiosensibilizatorlar orasidagi o‘rnini aniqlash uchun DEF xuddi shu sharoitlarda massa bo‘yicha 1 % I, Gd, Pt, Au yoki Bi saqlovchi yumshoq to‘qima uchun hisoblandi (2.6-rasm, 2.5-jadval). Qo‘shimcha filtrlash bo‘lmaganda barcha elementlar bir-biriga yaqin, 1,20–1,33 oralig‘idagi DEF qiymatlarini beradi, chunki dozada Cu K chiziqlari va 15 keV dan past energiyali fotonlar ustunlik qiladi. Pt va Au (1,20 va 1,21) Agdan deyarli farq qilmaydi: ularning L-chegaralari, xuddi Bi elementiniki kabi, Cu chiziqlaridan yuqorida, taxminan 12–16 keV da joylashgan, bu chegaralardan pastda esa ular massa birligiga Ag bilan deyarli bir xil miqdorda energiya yutadi (1.2-rasm). Eng katta qiymatni (1,33) Gd beradi, chunki 7,2–8,4 keV dagi L yutilish chegaralari uni Cu K chiziqlarining kuchli yutuvchisiga aylantiradi.



![2.6-rasm. Massa bo‘yicha 1 % Ag, I, Gd, Pt, Au yoki Bi saqlovchi yumshoq to‘qimaning dozani kuchaytirish koeffitsiyenti: 45 kV li mis anodli trubka dastasi qo‘shimcha filtrsiz hamda Al 1,0 mm va Sn 0,1 mm filtrlar bilan (SpekPy spektrlari, kerma yaqinlashuvi).](/home/user/atlant-impossible/dissertation/code/../figures/uz/fig21_elements.png){width=13.5cm}





Table: 2.5-jadval. 45 kV da tarkibida turli yuqori Z li elementlardan 1 % (massa bo‘yicha) bo‘lgan yumshoq to‘qimaning DEF qiymati

| Filtr | Ag | I | Gd | Pt | Au | Bi |
|:---|---:|---:|---:|---:|---:|---:|
| qo‘shimcha filtrsiz | 1,202 | 1,263 | 1,331 | 1,205 | 1,212 | 1,238 |
| Al 1,0 mm | 1,482 | 1,461 | 1,708 | 2,131 | 2,161 | 2,231 |
| Sn 0,1 mm | 1,444 | 1,440 | 1,716 | 2,155 | 2,189 | 2,276 |



Al 1,0 mm filtr qo‘llanganda manzara butunlay o‘zgaradi: DEF Pt uchun 2,13, Au uchun 2,16, Bi uchun 2,23 va Gd uchun 1,71 ga yetadi, Ag (1,48) va I (1,46) esa bir-biriga yaqinligicha qoladi. 1.2-rasmda keltirilgan massaviy energiya yutilish koeffitsiyentlarining nisbatlari ko‘rsatganidek, o‘z L-chegaralaridan yuqorida Pt, Au va Bi butun filtrlangan spektr bo‘ylab, jumladan, Ag faqat L va tashqi qobiqlari hisobiga yutadigan 15–25 keV sohada ham, massa birligiga Agga qaraganda ko‘proq energiya yutadi. K-chegarasi (50,2 keV) fotonlarning maksimal energiyasidan yuqorida joylashgan Gd faqat Ag K-chegarasidan pastda Agga qaraganda ko‘proq yutadi, biroq bu soha filtrlangan dastaning to‘qimadagi dozasiga hamon katta hissa qo‘shadi. Yod o‘zini Ag kabi tutadi, biroq uning K-chegarasi yuqoriroqda, 33,2 keV da joylashgan. Sn 0,1 mm filtr Gd, Pt, Au va Bi uchun DEFni biroz oshiradi, Ag va I uchun esa kamaytiradi (ikkalasi uchun ham 1,44), chunki u 29,2 keV dan yuqori energiyali fotonlarni kuchli susaytiradi, aynan shu sohada esa Ag/to‘qima nisbati 100–139 ga yetadi va yodning K-chegarasi joylashgan. Nisbati filtrlangan spektr bo‘ylab Agnikiga qaraganda ancha kam o‘zgaradigan og‘irroq elementlar uchun esa past energiyali fotonlarning Sn tomonidan kuchliroq bostirilishi (u Sn filtrning kattaroq YSQ qiymatida aks etadi: 0,83 mm Al ga nisbatan 0,90 mm Al) bu yo‘qotishdan ustun keladi.

Demak, massa birligiga nisbatan olinganda 45 kV da Ag Gd, Pt, Au va Biga qaraganda kuchsizroq fizik sensibilizator bo‘lib, yod bilan taqqoslanarli: Al 1 mm bilan uning $\mathrm{DEF}-1$ qiymati (0,48) Au uchun olingan qiymatning yarmidan ham kam. Ag foydasiga dalillar boshqa jihatlarda yotadi. Uning K-chegarasi 45 kV li spektr ichida joylashgan, bu esa kuchayishni filtrlash orqali sozlash imkonini beradi; kumush nanozarrachalari (AgNZ) biologik faol bo‘lib, kislorodning faol shakllarini (KFSh) hosil qiladi [37]; bundan tashqari, kumush oltin yoki platinaga qaraganda ancha arzon. Shunday qilib, Agni tanlash uning fizik va biologik ta’sirining birgalikdagi samarasi bilan asoslanishi lozim; bu masala 3.11-bo‘limda muhokama qilinadi.

## 3.9. Monte-Karlo usuli yordamida verifikatsiya

Analitik DEF qiymatlari ikki soddalashtirishga asoslanadi: faqat birlamchi dasta hisobga olinadi va Agning massaviy energiya yutilish koeffitsiyentiga kiritilmagan Ag K-flyuoressensiya fotonlarining energiyasi muhitdan chiqib ketadi deb faraz qilinadi. Ikkala faraz ham 2.7-bo‘limda tavsiflangan va verifikatsiya qilingan Monte-Karlo (MK) dasturi yordamida tekshirildi. Qalinligi 30 mm bo‘lgan, ko‘ndalang yo‘nalishda cheksiz ICRU-44 yumshoq to‘qima qatlami keng parallel dasta bilan nurlantirildi, 2–12 mm chuqurlikda joylashgan 10 mm qalinlikdagi qatlamga esa massa ulushi 1 % bo‘ladigan miqdorda Ag qo‘shildi. Har bir konfiguratsiya uchun 5 ta mustaqil seriyada $4\times10^{6}$ ta foton tarixi Vudkok usuli bilan kuzatib borildi; bunda Ag K-flyuoressensiyasining chiqarilishi va ko‘chishi bilan birga kechadigan fotoelektrik yutilish hamda xraylib differensial kesimlaridan tanlab olinadigan kompton va reley sochilishi hisobga olindi; elektronlar energiyasi ular hosil bo‘lgan joyda yutilgan deb qabul qilindi. Doza 0,25 mm kenglikdagi intervallarda qayd etildi, DEF esa filtrlanmagan va Al 1,0 mm bilan filtrlangan SpekPy spektrlari uchun Ag bor va Ag yo‘q holdagi doza profillarining nisbati sifatida olindi. Analitik taqqoslash asosi sifatida xuddi shu geometriya uchun birlamchi dastaning kerma modeli olindi; bu modelda dasta to‘qima tomonidan, qatlam ichida va qatlam ortida esa Ag tomonidan ham susaytiriladi.

DEFning MK va analitik usullarda olingan chuqurlik profillari 2.7-rasmda taqqoslangan, 2.6-jadvalda esa ularning xarakterli sohalar bo‘yicha o‘rtachalangan qiymatlari keltirilgan. Ikkala usul ham qatlam ichida bir xil shaklni beradi. Al 1 mm bilan DEF qatlamga kirishda keskin ortadi, so‘ngra o‘z-o‘zini ekranlash tufayli chiqish tomon kamayadi. Filtrlanmagan dasta uchun kirishdagi tor cho‘qqidan keyin taxminan 3–4 mm da minimum va undan keyingi o‘sish kuzatiladi, bu o‘sish analitik profilda 7–8 mm atrofida keng maksimum hosil qiladi. Kirish yaqinida Ag tomonidan qo‘shimcha susaytirish asosan dozada hali ham ustunlik qilayotgan yumshoq komponentlarga ta’sir qiladi va DEFni pasaytiradi, qatlamning chuqurroq qismida esa, bu komponentlar yutilib bo‘lgach, dastaning qattiqlashishi uni yana oshiradi. Qatlamga kirishda ikkala usul filtrlanmagan dasta uchun 1,2 % (MK bo‘yicha 1,168, analitik model bo‘yicha 1,155), Al 1 mm uchun esa 3,0 % (1,535 va 1,490) doirasida mos keladi. Farq chuqurlik ortishi bilan kattalashib, qatlamdan chiqishda 6,5 % va 10,1 % ga yetadi, butun qatlam bo‘yicha o‘rtacha qiymatlar esa mos ravishda 1,172 va 1,116 hamda 1,447 va 1,354 ni tashkil etadi; barcha sohalarda MK qiymatlari yuqoriroq.



![2.7-rasm. 2–12 mm chuqurlikda 1 % Ag saqlovchi 10 mm qalinlikdagi qatlam (kulrang soha) mavjud bo‘lgan ICRU-44 yumshoq to‘qimasida dozani kuchaytirish koeffitsiyentining filtrlanmagan dasta (chapda) va Al 1,0 mm filtr (o‘ngda) uchun chuqurlik profillari: Monte-Karlo usuli (tutash chiziq; soyalangan soha 5 ta seriya bo‘yicha baholangan ±2 standart xatolikni ko‘rsatadi) va birlamchi dastaning analitik kerma modeli (shtrix chiziq).](/home/user/atlant-impossible/dissertation/code/../figures/uz/fig22_mc.png){width=13.5cm}





Table: 2.6-jadval. 10 mm qalinlikdagi Ag li qatlamda (1 % Ag, 2–12 mm chuqurlik) va undan keyin Monte-Karlo va analitik DEF

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



Bu ortiqlik ikki effekt bilan tushuntiriladi. Birinchidan, energiyasi taxminan 22 keV bo‘lgan Ag K-flyuoressensiya nurlanishining bir qismi qatlam ichida qayta yutiladi: bu fotonlarning to‘qimadagi o‘rtacha erkin yugurish yo‘li taxminan 1,5 sm bo‘lib, qatlam qalinligi bilan taqqoslanarli, qiya burchaklar ostida chiqarilgan fotonlar esa ko‘ndalang yo‘nalishda cheksiz qatlam ichida uzun yo‘l bosib o‘tadi. Shu sababli kerma yaqinlashuvida muhitdan chiqib ketadi deb hisoblanadigan energiyaning bir qismi qatlamda yutiladi. Ikkinchidan, birlamchi dasta modeli e’tiborga olmaydigan sochilgan fotonlar dozaga hissa qo‘shadi. Ikkala hissa ham chuqurlik ortishi bilan to‘planib boradi, bu esa farqning chiqish tomon ortishini tushuntiradi; bundan tashqari, qatlamdan orqaga chiqarilgan flyuoressensiya nurlanishi filtrlangan dasta uchun qatlam oldidagi MK DEF qiymatini birdan biroz yuqoriga ko‘taradi. Qatlam ortida doza MK bo‘yicha Ag kiritilmagan holdagi qiymatning 0,80 qismigacha, analitik model bo‘yicha esa 0,76 qismigacha kamayadi, chunki qatlam undan keyingi to‘qimani ekranlaydi. Bu ekranlash Ag kiritilgan o‘sma ortidagi normal to‘qimani himoya qiladi, biroq Ag ko‘p kiritilgan soha ortidagi o‘sma qismlarida dozani ham pasaytiradi. Shunday qilib, analitik model qalin Ag kiritilgan sohadagi makroskopik DEFni 10 % gacha past baholaydi va bu jihatdan konservativ hisoblanadi, qatlamga kirish yaqinida esa mos kelish 1–3 % doirasida bo‘ladi.

## 3.10. Noaniqlik va sezgirlik tahlili

Asosiy natija — Al 1,0 mm filtr bilan 1 % Ag uchun DEF = 1,482 — parametrlarni birma-bir o‘zgartirish usulidagi sezgirlik tahlili yordamida tekshirildi (2.8-rasm, 2.7-jadval). Har bir parametr o‘zining ehtimoliy noaniqligi doirasida o‘zgartirildi, qolganlari esa o‘zgarmas saqlandi. Trubka kuchlanishi ±1 kV ga, anod burchagi ±3° ga, Be oyna qalinligi ±0,1 mm ga va Al filtr qalinligi ±5 % ga o‘zgartirildi. Agning massaviy energiya yutilish koeffitsiyenti ±2 % ga, to‘qimaniki esa Ag kiritilgan muhitda ham, tayanch muhitda ham bir xilda ±1 % ga o‘zgartirildi, shuning uchun u faqat (2.24) formuladagi $\langle R\rangle$ orqali ta’sir ko‘rsatadi. Spektr modelining ta’siri IM va SpekPy orasidagi farq bilan ifodalandi, IMning chuqurlik koeffitsiyenti $\eta$ esa ±25 % ga o‘zgartirildi, bunda o‘zgarishlar IM bergan 1,464 qiymatiga nisbatan baholandi.



![2.8-rasm. Dozani kuchaytirish koeffitsiyentining (1 % Ag, Al 1,0 mm filtr, DEF = 1,482) kirish parametrlariga sezgirligi: har bir parametr o‘zgarishining ikki chegarasida DEFning o‘zgarishi. Spektr modeli uchun ustun IMning SpekPyga nisbatan farqini, tayanch muhit uchun ustunlar ICRU to‘rt komponentli to‘qimasini (kattaroq o‘zgarish) va suvni ko‘rsatadi, η uchun esa o‘zgarishlar IM bergan 1,464 qiymatiga nisbatan olingan.](/home/user/atlant-impossible/dissertation/code/../figures/uz/fig23_sensitivity.png){width=13.5cm}





Table: 2.7-jadval. DEF (1 % Ag, Al 1,0 mm filtr, DEF = 1,482) ning kirish parametrlariga sezgirligi

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



Eng katta o‘zgarish (0,057) tayanch muhitni tanlash bilan bog‘liq: ICRU to‘rt komponentli to‘qimasi 1,539, suv esa 1,496 qiymatini beradi. Ikkalasida ham Na, P, S, Cl va K mikroelementlari mavjud emas, ularning kuchli fotoyutilishi esa ICRU-44 to‘qimasining energiya yutishini oshiradi; kamroq yutuvchi tayanch muhit $\langle R\rangle$ ni va, demak, DEFni oshiradi. Bu tanlov noaniqlik emas, balki ta’rif masalasi bo‘lib, yig‘ma noaniqlikka kiritilmadi, biroq tayanch muhit har doim ko‘rsatilishi lozim. Qolgan parametrlar orasida spektr modeli ustunlik qiladi (0,018); Ag koeffitsiyenti, anod burchagi va trubka kuchlanishining har biri 0,009–0,010, Al qalinligi va $\eta$ mos ravishda 0,008 va 0,007, to‘qima koeffitsiyenti esa 0,005 hissa qo‘shadi. Anod burchagining kichikroq bo‘lishi anodda kuchliroq o‘z-o‘zini filtrlash hisobiga DEFni oshiradi (9° da 1,492 va 15° da 1,476), Be oyna esa ahamiyatsiz (0,0002), chunki oyna susaytirishi mumkin bo‘lgan yumshoq fotonlarni Al filtr dastadan chiqarib tashlaydi. Har bir maksimal o‘zgarishni to‘g‘ri burchakli taqsimotning yarim kengligi sifatida, parametrlarni esa o‘zaro korrelyatsiyalanmagan deb qabul qilib, yig‘ma standart noaniqlik quyidagicha topiladi:

$$u_c(\mathrm{DEF}) = \sqrt{\sum_{i=1}^{n} \frac{\Delta_i^{2}}{3}}$$

EQNUM[2.32]


bu yerda $\Delta_i$ — $i$-parametrni o‘zgartirish natijasida DEFning maksimal absolyut o‘zgarishi, $n = 8$ — hisobga olingan parametrlar soni (tayanch muhitdan tashqari barchasi). Natijada $u_c = 0{,}016$ olinadi, ya’ni qamrov koeffitsiyenti $k = 1$ bo‘lganda DEF = 1,48 ± 0,02, $k = 2$ bo‘lganda esa ± 0,03. Bu noaniqlik kuchayishning o‘zidan ($\mathrm{DEF}-1 = 0{,}48$) ham, asosiy filtr variantlari orasidagi farqlardan ham bir tartibdan ko‘proq kichik, shuning uchun filtrlashga oid xulosalar ishonchli. Noto‘g‘ri o‘zaro ta’sir ma’lumotlari ancha katta ahamiyatga ega bo‘lar edi: xraylib 4.3.0 kutubxonasining CS_Energy funksiyasi 1,48 o‘rniga 1,72 ni bergan bo‘lar edi (2.8-bo‘lim).

## 3.11. Muhokama

Olingan natijalar atom raqami yuqori bo‘lgan moddalar yordamida dozani kuchaytirishga oid avvalgi ishlar bilan muvofiq keladi. Kilovoltli rentgen nurlari bilan nurlantirilgan, yod kiritilgan o‘smalarda dozaning kuchayishi dastlabki tadqiqotlardayoq hisoblangan [19, 20], oltin nanozarrachalari (AuNZ) uchun MK baholashlari esa makroskopik kuchayish kilovoltli dastalarda megavoltli dastalardagiga qaraganda ancha katta ekanligini ko‘rsatgan [10]. Turli elementlarning nanozarrachalari tufayli yuzaga keladigan nazariy kuchayish foton energiyasining funksiyasi sifatida ushbu ishdagiga o‘xshash kermaga asoslangan yondashuv bilan tavsiflangan [13]. Ortovoltli dastalarda kuchayishning chuqurlikka bog‘liqligi fantomlarda MK hisoblari yordamida ham o‘rganilgan [42], ushbu ishning natijalari (3.7-bo‘lim) esa Ag uchun qalin nishonni sirtdagi yagona qiymat bilan tavsiflab bo‘lmasligini ko‘rsatadi. Ushbu ish bu tadqiqotlarni past kuchlanishli mis anodli trubka holati bilan to‘ldiradi: bunday trubkaning spektrida Ag K-chegarasidan pastda joylashgan xarakteristik chiziqlar ustunlik qiladi, erishish mumkin bo‘lgan DEF esa trubka konstruksiyasi bilan emas, balki filtrlash bilan belgilanadi.

Kumushga oid MK tadqiqotlari qatoriga braxiterapiya vaqtida bosh miya o‘smasiga implantatsiya qilingan AgNZ tufayli dozaning kuchayishi [38], o‘smadagi dozaning AgNZ tufayli kuchayishining atrofdagi sog‘lom to‘qimalarga ta’siri [39] hamda qatlamli teri geometriyalarida Ag va Au nanozarrachalarini taqqoslash [40] bo‘yicha ishlar kiradi. Ushbu ishdagi hisoblar bu tadqiqotlarning sharoitlarini takrorlamaydi, shu sababli faqat sifat jihatidan umumiy nuqtalar qayd etiladi. 1 % Ag saqlovchi 10 mm qalinlikdagi qatlam ortida dozaning taxminan 0,80 qismigacha kamayishi [39] ishida ko‘rib chiqilgan sog‘lom to‘qima dozalari masalasiga, 45 kV da Au va Agning massa birligiga nisbatan DEF qiymatlari (Al 1 mm bilan mos ravishda 2,16 va 1,48) esa [40] ishidagi Ag–Au taqqoslashiga taalluqlidir. AgNZ bilan boyitilgan dozimetrik gellarda dozaning kuchayishi eksperimental ravishda ham tadqiq qilingan [41]; agar dasta spektri ko‘rsatilsa, bunday o‘lchovlar hisoblangan DEFni tekshirish imkonini berishi mumkin.

Radiobiologik tadqiqotlar bilan taqqoslaganda ancha sezilarli nomuvofiqlik namoyon bo‘ladi. AgNZ saraton hujayralarining ionlashtiruvchi nurlanish ta’sirida halok bo‘lishiga sezgirligini oshirishi [32] va glioma uchun radiosensibilizator vazifasini bajarishi [11] qayd etilgan, ular U251 glioma hujayralarini in vitro sharoitda va kalla ichi sichqon modelida radiosensibilizatsiyalashda AuNZdan ustun kelgan [12]. Biologik effekt sensibilizatsiya koeffitsiyenti (SER) bilan miqdoriy baholanadi; u sensibilizatorsiz va sensibilizator ishtirokida bir xil effektni beruvchi dozalarning nisbati bo‘lib, DEFdan farqli ravishda sensibilizatsiyaning barcha mexanizmlarini aks ettiradi [3]. Bu yerda ko‘rib chiqilgan dastalar uchun makroskopik fizika massa ulushi teng bo‘lganda Ag va Au uchun teskari tartibni bashorat qiladi, kichik massa ulushlarida esa fizik kuchayish kichik: Al 1 mm bilan 0,1 % Ag uchun DEF atigi 1,048 ni tashkil etadi. To‘g‘ridan to‘g‘ri miqdoriy taqqoslash imkonsiz, chunki biologik effekt nurlanish sifatiga, nanozarrachalarning konsentratsiyasi va hujayradagi joylashuviga ham bog‘liq; shunga qaramay, fizik natijalar AgNZ tufayli qayd etilgan radiosensibilizatsiyani, xususan, ularning AuNZdan ustunligini faqat dozaning makroskopik kuchayishi bilan tushuntirib bo‘lishi dargumon ekanligidan dalolat beradi. Bu farqni adabiyotlarda tavsiflangan ikki mexanizm izohlashi mumkin. Birinchidan, AgNZ biologik faol bo‘lib, inson hujayralarida KFSh hosil bo‘lishini, DNK shikastlanishini, hujayra siklining to‘xtashini va mitoxondriyalar funksiyasining buzilishini keltirib chiqaradi [37]. Ikkinchidan, oltin nanozarrachalari atrofida dozaning kuchayishi kuchli lokallashgan [30], og‘ir atomli nanozarrachalar yaqinida nanomiqyosda energiya ajralishi esa dozaning makroskopik kuchayishi doirasidan tashqaridagi biologik effektlarni tushuntira oladi [31]. Shunday qilib, bu yerda hisoblangan makroskopik DEF kimyoviy va biologik bosqichlarga ham ega bo‘lgan radiokuchayishning faqat fizik asosini tashkil etadi [7].

Olingan natijalar bir qator cheklovlarga ega. DEF kerma yaqinlashuvida hisoblandi, bu yaqinlashuv makroskopik miqyosda o‘rinli, biroq nanozarrachalar atrofidagi dozaning nanomiqyosdagi notekisligini hisobga olmaydi; bundan tashqari, Ag bir jinsli taqsimlangan deb faraz qilindi, holbuki nanozarrachalar tufayli radiosensibilizatsiya ularning o‘lchami, konsentratsiyasi va joylashuviga bog‘liq [97]. IM tormozlanish nurlanishi izotrop chiqariladi deb faraz qiladi va elektronlarning anoddan teskari sochilishini hisobga olmaydi; teskari sochilishning hisobga olinmasligi taqribiy Born kesimi bilan birgalikda absolyut nurlanish chiqishining oshirib baholanishiga olib keladi (havodagi kerma bo‘yicha IM/SpekPy nisbati 1,08–1,42), biroq DEFga ta’sir qilmaydi. Bundan tashqari, IM Cu K chiziqlarini 25–43 % ga past baholaydi, shu sababli DEF bo‘yicha asosiy natijalar SpekPy spektrlari yordamida olindi. “Tovon” effekti tufayli spektrning o‘qdan tashqarida o‘zgarishi modellashtirilmadi. Chuqurlik bo‘yicha analitik hisoblarda sochilgan nurlanish va flyuoressensiyaning qayta yutilishi hisobga olinmaydi, bu esa qalin Ag kiritilgan qatlamda DEFning 10 % gacha past baholanishiga olib keladi, MK modelida esa oddiy yassi qatlam geometriyasidan foydalaniladi. Nihoyat, real trubkaning spektri o‘lchanmadi, garchi etalon sifatida foydalanilgan SpekPy o‘lchangan spektrlar va YSQ qiymatlari bilan solishtirish orqali validatsiya qilingan bo‘lsa-da [51]; biologik javob ham modellashtirilmadi.

Olingan natijalar asosida 45 kV li mis anodli trubka bilan o‘tkaziladigan tajriba uchun quyidagi tavsiyalar beriladi. Dastani 1–2 mm Al (yoki 0,1–0,3 mm Ti) bilan filtrlash lozim; Al bilan bu 1 % Ag uchun 1,48–1,62 ga teng DEF beradi, 10 sm masofada va 40 mA tokda 2 Gr dozaga erishish uchun ekspozitsiya vaqti esa 14,6–32,5 s ni tashkil etadi. Yupqa Cu filtrlardan (0,05–0,1 mm) va yutilish chegaralari 20 va 30 keV oralig‘ida joylashgan K-chegarali filtrlardan (Mo, Ag, Sn) foydalanmaslik kerak, 0,2 mm Cu filtr esa eng katta DEF qiymatini (1,80) bersa-da, 2 Gr uchun 158 s talab qiladi. Dasta sifatini kilovoltli dozimetriya protokoliga muvofiq YSQni o‘lchash orqali tekshirish lozim [14]; hisoblangan birinchi YSQ bilan mos kelishi (1 mm Al bilan 0,83 mm Al, 2 mm Al bilan 1,27 mm Al) spektr va filtr qalinligi taxmin qilingandek ekanligini ko‘rsatadi. Ag massa ulushi kamida 0,5 % bo‘lishi kerak, bunda 1 mm Al bilan DEF 1,24 ga teng, chunki 0,1 % da kuchayish 5 % dan kam. Qalinligi bir necha millimetrdan ortiq bo‘lgan namunalar uchun DEF haqiqiy chuqurlik va Ag miqdori uchun hisoblanishi, xraylib kutubxonasining CS_Energy funksiyasi o‘rniga esa NIST massaviy energiya yutilish koeffitsiyentlaridan foydalanilishi lozim. Nihoyat, DEF har doim spektr yoki hech bo‘lmaganda trubka kuchlanishi, filtrlash va YSQ, shuningdek tayanch muhit va chuqurlik bilan birga keltirilishi lozim.

## 3.12. III bob bo‘yicha xulosalar

Ushbu bobning asosiy natijalari quyidagilardan iborat.

1. IM (bitta moslashtirilgan parametr, $\eta = 0{,}40$) Al bilan filtrlangan dastalar uchun SpekPy bilan YSQ bo‘yicha −4,6 dan −3,5 % gacha, DEF bo‘yicha esa 1–2 % doirasida mos keladi, biroq Cu K chiziqlarini 25–43 % ga past baholaydi.
2. Filtrlanmagan 45 kV li spektrda Cu K chiziqlari ustunlik qiladi (fotonlarning 68,5 % qismi), 1 % Ag uchun DEF esa atigi 1,20 ga teng; trubkaning konstruktiv parametrlari asosan DEFni emas (1,19–1,21), balki nurlanish chiqishini o‘zgartiradi.
3. Filtrlash hal qiluvchi ahamiyatga ega: 1 % Ag uchun DEF Al 1 mm bilan 1,48, Al 2 mm bilan 1,62 va Cu 0,2 mm bilan 1,80 ga teng, bunda doza quvvati 120–1300 marta past bo‘ladi; o‘tkazish koeffitsiyenti bir xil bo‘lganda Al va Ti optimal, K-chegaralari 20–30 keV da joylashgan filtrlar esa noqulay hisoblanadi.
4. Al 1 mm bilan DEF Ag kiritilmagan to‘qimadagi Ag kiritilgan soha chuqurligi ortishi bilan ortadi (20 mm chuqurlikda 1,69 gacha), biroq Ag bir tekis kiritilgan soha ichida o‘z-o‘zini ekranlash tufayli kamayadi (1 % Ag uchun 10 mm chuqurlikda 1,21 gacha).
5. DEF trubka kuchlanishi ortishi bilan ortadi, eng tez o‘sish esa Ag K-chegarasidan yuqori energiyali fotonlar paydo bo‘lgandan keyin (taxminan 27 kV dan yuqorida) kuzatiladi; massa birligiga nisbatan Ag Gd, Pt, Au va Biga qaraganda kuchsizroq fizik sensibilizator bo‘lib, yod bilan taqqoslanarli.
6. MK hisobi analitik modelni 1–10 % doirasida tasdiqlaydi (flyuoressensiyaning qayta yutilishi va sochilish tufayli MK qiymatlari yuqoriroq) va Ag kiritilgan qatlam ortida dozaning taxminan 0,80 qismigacha kamayishini ko‘rsatadi.
7. Al 1 mm bilan 1 % Ag uchun DEF 1,48 ± 0,02 ($k = 1$) ga teng; tayanch muhit uni 0,057 gacha o‘zgartiradi, shuning uchun u albatta ko‘rsatilishi lozim.


# XULOSA

Dissertatsiyaning asosiy natijalari quyidagilardan iborat.

1. Adabiyotlar tahlili yuqori Z li elementlar tufayli dozaning kuchayishi megavoltli fotonlarga qaraganda kilovoltli fotonlar uchun ancha katta ekanligini hamda kumush nanozarrachalari glioma, ko‘krak bezi saratoni va kolorektal saraton modellarini radiosensibilizatsiya qilishi qayd etilganini ko‘rsatdi. Ag va yumshoq to‘qimaning massaviy energiya yutilish koeffitsiyentlari nisbati Ag K-chegarasidan (25,514 keV) pastda, 8–25 keV da 21–32 ni, 30–45 keV da esa 100–139 ni tashkil etadi. Dozani kuchaytirish koeffitsiyentining (DEF) mis anodli trubkalarning konstruksiyasi va filtrlanishiga bog‘liqligi ko‘rib chiqilgan adabiyotlarda miqdoriy jihatdan o‘rganilmagan.

2. Mis anodli trubka spektrining qalin nishon uchun yarim analitik modeli — ishlab chiqilgan model (IM) yaratildi. U Bete ionizatsion tormozlanish qobiliyatiga, Elvert ko‘paytuvchisi kiritilgan norelyativistik Bete–Gaytler tormozlanish nurlanishi kesimiga va Grizinskiyning K-qobiq ionizatsiyasi kesimiga asoslangan bo‘lib, tormozlanish nurlanishi ta’sirida hosil bo‘ladigan va yopiq ko‘rinishdagi ifoda bilan tavsiflanadigan K flyuoressensiyani (chiziqlar intensivligining 4,5–4,8 %), anodda o‘z-o‘zini yutishni va filtrlashni o‘z ichiga oladi.

3. Yagona moslashtiriladigan parametr — elektronlarning chuqurlik koeffitsiyenti $\eta = 0{,}40$ — 45 kV da SpekPy v2 tormozlanish nurlanishi spektrining shakliga moslashtirildi (o‘rtacha kvadratik chetlanish 2,46 %, to‘g‘ri chiziqli harakatlanuvchi elektronlar, ya’ni $\eta = 1$ uchun esa 8,47 %). Qayta moslashtirishsiz IM 25–50 kV kuchlanishlar va 6–30° anod burchaklari uchun 1 mm Al bilan filtrlangan dastalarning yarim susaytirish qatlamini (YSQ) −3,5 dan −4,6 % gacha bo‘lgan chetlanishlar bilan, ularning o‘rtacha energiyasini esa 0,54 keV aniqlik bilan takrorlaydi. IM Cu K chiziqlarini 25–43 % ga kam, havodagi kermaning absolyut qiymatini esa 8–42 % ga ortiq baholaydi, biroq Al bilan filtrlangan dastalar uchun uning DEF qiymatlari SpekPy qiymatlari bilan 1–2 % doirasida mos keladi.

4. Filtrlanmagan 45 kV li spektrda (anod burchagi 12°, 0,5 mm Be, 10 sm havo) Cu K chiziqlari ustunlik qiladi (fotonlarning 68,5 %); Ag K-chegarasidan yuqorida fotonlarning atigi 4,64 % joylashgan. Dasta yumshoq (o‘rtacha energiya 10,38 keV, birinchi YSQ 0,0478 mm Al) va intensiv: 10 sm masofada havodagi kerma 383 mGr/(mA·s) ni, ya’ni 40 mA da 15,3 Gr/s ni tashkil etadi.

5. Anod burchagi (6–30°), trubka kuchlanishi (25–50 kV) va Be oyna (0,15–2 mm) havodagi kermani 163–463 mGr/(mA·s) oralig‘ida o‘zgartiradi, biroq 1 % Ag uchun DEF 1,19–1,21 oralig‘ida qoladi, chunki dozani asosan Cu K chiziqlari va 3–15 keV energiyali fotonlar hosil qiladi, ular uchun esa Ag/to‘qima nisbati atigi 21–27 ni tashkil etadi.

6. Qo‘shimcha filtrlash hal qiluvchi omil hisoblanadi: 1 % Ag uchun DEF 1 mm Al bilan 1,48 ga, 2 mm Al bilan 1,62 ga va 0,2 mm Cu bilan 1,80 ga teng bo‘ladi, biroq buning evaziga havodagi kerma 120–1300 marta kamayadi. DEF − 1 kattaligi Agning massa ulushiga proporsional (har 1 % Ag ga filtrsiz 0,20 va 1 mm Al bilan 0,48).

7. Havodagi kerma bo‘yicha o‘tkazish koeffitsiyenti bir xil bo‘lganda 9–45 keV oralig‘ida yutilish chegaralariga ega bo‘lmagan yengil va o‘rtacha Z li filtrlar (Al, Si, Ca, Sc, Ti) optimal hisoblanadi, K-chegaralari 20–30 keV da joylashgan filtrlar (Mo, Ag, Sn) esa kuchli filtrlashda eng kam samarali bo‘ladi, chunki ular aynan kumush eng samarali bo‘lgan sohada kuchli yutadi: o‘tkazish koeffitsiyenti 0,1 % bo‘lganda 1 % Ag uchun DEF Ti filtr bilan 1,91 ga, Ag filtr bilan esa atigi 1,34 ga teng.

8. 1 mm Al bilan filtrlashda kumush kiritilgan yupqa sohadagi 1 % Ag uchun DEF chuqurlik ortishi bilan sirtdagi 1,48 dan 20 mm chuqurlikda 1,69 gacha ortadi (dastaning qattiqlashishi), biroq sirtdan boshlab bir tekis kumush kiritilgan soha ichida 10 mm chuqurlikda 1,21 gacha kamayadi (o‘z-o‘zini ekranlash). 1 % Ag saqlovchi 10 mm qalinlikdagi qatlam uchun Monte-Karlo usulida olingan DEF qiymatlari qayta yutilgan Ag K flyuoressensiya nurlanishi va sochilgan fotonlar hisobiga analitik qiymatlardan 1–10 % yuqori bo‘ldi, qatlam ortidagi doza esa kumushsiz holdagi qiymatning taxminan 0,80 qismigacha pasaydi.

9. 1 mm Al bilan filtrlashda 1 % Ag uchun DEF 25 kV dagi 1,27 dan 50 kV dagi 1,52 gacha ortadi. Massa birligiga nisbatan kumush 45 kV da Gd, Pt, Au va Bi elementlariga qaraganda kuchsizroq fizik sensibilizator hisoblanadi (1 mm Al bilan DEF 1,48 ga teng, Au uchun esa 2,16) va yod (1,46) bilan taqqoslanarli, shu sababli kumush nanozarrachalarining oltin nanozarrachalariga nisbatan qayd etilgan biologik ustunligi kimyoviy, biologik va nanomiqyosdagi mexanizmlarga ishora qiladi.

10. 1 % Ag va 1 mm Al uchun DEF = 1,48 ± 0,02 (qamrov koeffitsiyenti $k = 1$), tayanch muhitni tanlash esa uni 0,057 gacha o‘zgartiradi. xraylib 4.3.0 kutubxonasining CS_Energy funksiyasi 30 keV da kislorodning massaviy energiya yutilish koeffitsiyentini 37 % ga kam baholaydi va 1,48 o‘rniga 1,72 ga teng DEF qiymatiga olib kelgan bo‘lar edi, shu sababli NIST jadvallaridan foydalanish zarur.

## Amaliy tavsiyalar

1. 1–2 mm qalinlikdagi Al filtrdan (yoki 0,1–0,3 mm qalinlikdagi Ti filtrdan) foydalanish lozim; filtrlanmagan dastalar, yupqa Cu filtrlar hamda Mo, Ag yoki Sn filtrlardan foydalanmaslik kerak.
2. Dastani trubka kuchlanishi, anod burchagi, oyna, filtrlar va o‘lchangan birinchi YSQ (1 mm Al bilan filtrlash uchun hisoblangan qiymati 0,83 mm Al) orqali tavsiflash, DEFni esa spektr va tayanch muhit bilan birga keltirish lozim.
3. Nurlantirishlarni to‘qima kermasi asosida rejalashtirish (10 sm masofada va 40 mA da 2 Gr doza 1 mm Al bilan 14,6 s da, 2 mm Al bilan esa 32,5 s da beriladi), trubkaning nurlanish chiqishini esa dozimetriya yordamida tasdiqlash kerak.
4. Kumushning kamida 0,5 % massa ulushidan (1 mm Al bilan DEF 1,24) foydalanish lozim.
5. Qalin namunalar uchun DEFning chuqurlikka bog‘liqligini, o‘z-o‘zini ekranlashni va kumush kiritilgan soha ortida dozaning kamayishini hisobga olish zarur.

## Keyingi tadqiqotlar istiqbollari

Olingan spektrlar bilan nurlantirilgan kumush nanozarrachalari atrofida elektronlar ko‘chishini nanomiqyosda Monte-Karlo usulida modellashtirish dozaning mikroskopik kuchayishini makroskopik DEF bilan bog‘lash imkonini beradi. CdTe yoki Si detektori yordamida spektrni o‘lchash Cu K chiziqlarining intensivligini va trubkaning absolyut nurlanish chiqishini tekshirish hamda IMni takomillashtirish yo‘nalishlarini (elektronlarning teskari sochilishi, bo‘sag‘a yaqinidagi K-qobiq ionizatsiyasi kesimlari) belgilash imkonini beradi. Tavsiya etilgan filtrlash sharoitida o‘tkaziladigan in vitro tajribalar dozaning fizik kuchayishini kislorodning faol shakllari hosil bo‘lishi kabi kimyoviy va biologik mexanizmlardan ajratish imkonini beradi. Nihoyat, kumushning biologik ustunligi fizik DEF ma’lum bo‘lgan sharoitda ham saqlanib qolishini tekshirish uchun oltin va kumush nanozarrachalarini bir xil massaviy konsentratsiyalarda va bir xil spektrlarda taqqoslash lozim.


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

Ishlab chiqilgan model (IM) Python tilidagi `xspec.py` modulida amalga oshirilgan; bu modul NumPy, xraylib kutubxonalaridan va `nist.py` modulidan foydalanadi. Quyida keltirilgan fragmentlar undan hech qanday o‘zgarishsiz, izohlari bilan birga ko‘chirilgan; ular orasidagi kod tushirib qoldirilgan. Energiyalar keV da, uzunliklar sm da, zichliklar g/sm$^3$ da, kesimlar esa sm$^2$ da berilgan.

Birinchi fragmentda konstantalar va materiallarga oid ma’lumotlar beriladi. `PI_E4` konstantasi sm$^2$ keV$^2$ birliklarida (Gauss birliklar sistemasida) ifodalangan $\pi e^4$ ko‘paytmadir, `ELECTRONS_PER_MAS` — bir milliamper-sekundga to‘g‘ri keladigan elektronlar soni, ya’ni $10^{-3}/e$, `I_EXC` esa ICRUning 37-hisobotidagi [68] o‘rtacha uyg‘otish energiyalarini, jumladan, mis uchun $I = 322$ eV qiymatini o‘z ichiga oladi.

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

`beta2` va `momentum` funksiyalari kinetik energiyasi $T$ bo‘lgan elektron uchun $\beta^2$ ni va $pc$ impulsni qaytaradi. `stopping_power` funksiyasi Bete ionizatsion tormozlanish qobiliyatini ICRUning 37-hisobotidagi ko‘rinishda ((2.1) va (2.2)) zichlik effekti uchun tuzatmasiz hisoblaydi. $0{,}5 \times 0{,}307075$ MeV sm$^2$/mol koeffitsiyent $2\pi N_A r_e^2 m_e c^2$ ga teng, natija esa keV/sm birliklaridagi chiziqli tormozlanish qobiliyatidir.

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

`brems_dcs` funksiyasi tormozlanish nurlanishining bitta atomga to‘g‘ri keladigan, foton energiyasi (`k` o‘zgaruvchisi) bo‘yicha differensial kesimini qaytaradi. U yoki Kramers kesimini (2.5), yoki, sukut bo‘yicha, norelyativistik Bete–Gaytler kesimining (2.6) Elvert ko‘paytuvchisiga (2.7) ko‘paytmasini beradi; Elvert ko‘paytuvchisidagi `eta0` va `eta1` mos ravishda tushuvchi va chiquvchi elektron uchun $2\pi Z\alpha/\beta_0$ va $2\pi Z\alpha/\beta$ ga teng. `sigma_K_gryzinski` funksiyasi Grizinskiyning K-qobiq ionizatsiyasi kesimini (2.9) K-qobiqdagi ikkita elektron va $U = T/E_K$ ortiqcha kuchlanish nisbati bilan amalga oshiradi.

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

`TubeModel` sinfi trubka kuchlanishini, anodning atom raqamini, anod burchagini va elektronlarning chuqurlik koeffitsiyentini saqlaydi hamda kengligi 0,05 keV bo‘lgan foton energiyasi intervallaridan va elektron energiyasining 0,02 keV qadamidan foydalanadi. Sukut bo‘yicha belgilangan `eta=1.0` qiymati elektronlarning to‘g‘ri chiziqli trayektoriyalariga mos keladi; moslashtirish va sezgirlik testidan (±25 %) tashqari barcha hisoblarda `run_all.py` tomonidan uzatiladigan moslashtirilgan $\eta = 0{,}40$ qiymati qo‘llaniladi. `_compute` metodi uzluksiz sekinlashish yaqinlashuvidagi yo‘l uzunligini (2.3) va kirish chuqurligini (2.4) olish uchun $1/S$ ni trapetsiyalar usulida integrallaydi. So‘ngra u $d/\sin\theta$ chiqish yo‘li bo‘ylab o‘z-o‘zini yutishni hisobga olgan holda qalin nishon uchun tormozlanish nurlanishi integralini (2.8) hisoblaydi, $4\pi$ ga bo‘lish esa nurlanish izotrop ekanligini nazarda tutadi. Susayish va $1/4\pi$ ko‘paytuvchisi bo‘lmaganda xuddi shu yig‘indi (`brems_generated`) hosil bo‘lgan $N_g(E)$ spektrni beradi. `_characteristic` metodi Cu K$\alpha_2$, K$\alpha_1$, K$\beta_3$ va K$\beta_1$ chiziqlarini xraylib kutubxonasidagi flyuoressensiya chiqishi [60] va uning to‘rtta chiziq bo‘yicha normallashtirilgan nurlanish o‘tishi ehtimolliklari yordamida hisoblaydi. Bevosita hissa (2.10) har bir K-qobiq ionizatsiyasini chiziq fotonining anoddan chiqib ketish ehtimolligiga ko‘paytirib hisobga oladi, bilvosita hissa esa yopiq ko‘rinishdagi ifoda (2.14) bilan beriladi; unda `tauK` — K-qobiqdagi fotoyutilishning chiziqli koeffitsiyenti $\tau_K$, `b` esa $b_j = \mu_j/\sin\theta$.

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

`spectrum` metodi chiziqlarni energiya intervallariga qo‘shadi, Be oyna, filtrlar va havoning o‘tkazish koeffitsiyentini (2.15) hisobga oladi hamda bitta elektron va bir steradianga to‘g‘ri keladigan chiqishni masofa kvadratiga teskari proporsionallik qonuni (2.16) yordamida berilgan ekspozitsiya uchun keV va sm$^2$ birligiga to‘g‘ri keladigan fotonlar flyuensiga aylantiradi. `air_kerma` funksiyasi havodagi kermani (2.17) quruq havo uchun NIST koeffitsiyentlari yordamida hisoblaydi; `KEV_TO_J * 1e3` ko‘paytuvchisi keV/g ni Gr ga aylantiradi. `hvl`, `mean_energy` va `effective_energy` funksiyalari (bu yerda keltirilmagan) mos ravishda yarim susaytirish qatlamini (havodagi kerma bo‘yicha alyuminiyning o‘tkazish koeffitsiyentiga kesmani teng ikkiga bo‘lish usulini qo‘llab), o‘rtacha energiyani va effektiv energiyani hisoblaydi.

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

`def_factor` funksiyasi dozani kuchaytirish koeffitsiyentini (DEF) kerma yaqinlashuvida (2.23) aralashma qoidasi (2.22) va NIST massaviy energiya yutilish koeffitsiyentlari yordamida hisoblaydi. `psi` energiya flyuensi ustidagi to‘qima qatlamida susaytiriladi (2.26). `attenuate_with_agent=True` bo‘lganda kasrning surati kumush kiritilgan aralashmada susaytiriladi, bu esa sirtdan boshlanuvchi bir tekis kumush kiritilgan sohani tavsiflaydi (2.27); aralashmaning zichligi taqriban to‘qima zichligiga teng deb olinadi.

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

## B ilova. Natijalarning takrorlanuvchanligi

Asosiy sonli natijalar hamda barcha jadval va rasmlar `dissertation/code` katalogidagi skriptlar yordamida `dissertation/data` katalogidagi ma’lumotlar asosida olinadi; II bobdagi yordamchi tekshiruvlar (ESTAR bilan solishtirish, xraylib kutubxonasidagi CS_Energy funksiyasini tekshirish, Monte-Karlo testlari) ularga kirmaydi. Hisoblar Python 3.13, NumPy 2.5.3 [65], SciPy 1.18.1 [66], Matplotlib 3.11.2 [67], xraylib 4.3.0 [60] va SpekPy 2.5.4 [15, 58] yordamida bajarildi. Massaviy susayish va massaviy energiya yutilish koeffitsiyentlarining NIST jadvallari [59] 31 ta element, quruq havo, suv va ICRU-44 yumshoq to‘qimasi [61] uchun `data/nist` katalogida HTML sahifalar ko‘rinishida saqlanadi. `nist.py` moduli ularni yutilish chegaralari orasidagi har bir segment ichida log-log masshtabda interpolyatsiya qiladi hamda to‘qima, suv va havo koeffitsiyentlarini elementlar jadvallaridan aralashma qoidasi bo‘yicha hisoblaydi; birikmalar jadvallari faqat tekshirish uchun saqlanadi. SpekPy spektrlarida IMdagi bilan bir xil energiya intervali (mis uchun 0,05 keV) qo‘llaniladi.

`run_all.py` skripti avval $\eta$ ni 0,25–0,7 oralig‘ida 3 keV dan yuqori energiyalarda normallashtirilgan IM va SpekPy tormozlanish nurlanishi spektrlari orasidagi o‘rtacha kvadratik chetlanishni chegaralangan minimallashtirish yo‘li bilan moslashtiradi. So‘ngra u elektronlar va Cu chiziqlariga oid ma’lumotlarni, SpekPy bilan solishtirish orqali validatsiyani (trubka kuchlanishi va anod burchagining 1 mm Al bilan va usiz sakkizta kombinatsiyasi hamda 50–100 kV dagi volfram anod) va bazaviy spektrni hisoblaydi. Shuningdek, u anod burchagi, trubka kuchlanishi, Be oyna va 13 ta qo‘shimcha filtrning ta’sirini, 0,1–2 % Ag uchun DEFni va uning chuqurlik hamda trubka kuchlanishiga bog‘liqligini, o‘z-o‘zini ekranlashni, oltita yuqori Z li elementni taqqoslashni, sezgirlik tahlilini va nurlantirish vaqtlarini hisoblaydi. Natijalar `data/results.json` fayliga, rasmlar uchun spektrlar esa CSV fayllarga yoziladi. `run_sweeps.py` skripti bularga yettita material uchun DEFning filtr qalinligiga bog‘liqligini qo‘shadi hamda Al dan Bi gacha bo‘lgan 43 ta filtr materialini havodagi kerma bo‘yicha o‘tkazish koeffitsiyenti 10 %, 1 % va 0,1 % bo‘lganda taqqoslaydi.

`mc_dose.py` skripti har bir konfiguratsiya uchun $4 \times 10^6$ ta foton tarixi (buyruq satri argumenti) bilan Monte-Karlo hisobini bajaradi, bunda tarixlar tasodifiy sonlar generatorining qat’iy belgilangan boshlang‘ich qiymatlariga ega beshta paketga bo‘linadi, natijalar esa `data/mc_results.json` fayliga yoziladi. `make_tables.py` va `figures.py` skriptlari ushbu fayllar asosida barcha jadval va rasmlarni ingliz, rus va o‘zbek tillarida yaratadi. Analitik hisoblarda tasodifiy elementlar mavjud emasligi va Monte-Karlo hisobidagi boshlang‘ich qiymatlar qat’iy belgilanganligi sababli beshta skriptni yuqorida keltirilgan tartibda ishga tushirish ko‘rsatilgan dasturiy ta’minot versiyalari uchun barcha jadval va rasmlarni takrorlaydi.


