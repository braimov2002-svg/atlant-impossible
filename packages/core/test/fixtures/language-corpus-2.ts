// Held-out corpora from the third language-check review (Telegram-style
// dictation outputs plus targeted hard cases). [language, text, tag]
export const GENERAL: ReadonlyArray<readonly [string, string, string]> = [
 [
  "uz-latn",
  "Assalomu alaykum, Jasur aka. Kecha aytgan tovaringiz keldimi? Kelgan bo'lsa, ertaga ertalab olib ketaman.",
  "business/greeting"
 ],
 [
  "uz-latn",
  "Narxi 2 million 400 ming so'm, naqd to'lasangiz 2 million 300 mingga beraman.",
  "price"
 ],
 [
  "uz-latn",
  "Hisob-fakturani yubordim, tekshirib ko'ring. Summasi QQS bilan 12 500 000 so'm.",
  "invoice/price"
 ],
 [
  "uz-latn",
  "Dostavka ertaga soat 14:00 dan 16:00 gacha bo'ladi, uyda bo'lib turing.",
  "delivery/ru-loan"
 ],
 [
  "uz-latn",
  "Shuyerda turibman, darvozaning oldida. Chiqib kelaver.",
  "slang/address"
 ],
 [
  "uz-latn",
  "Keldingmi? Biz allaqachon to'yxonadamiz.",
  "slang/question"
 ],
 [
  "uz-latn",
  "Ok, mayli-mayli, hozir qilib beraman.",
  "slang"
 ],
 [
  "uz-latn",
  "Onajon, dorilaringizni ichdingizmi? Kechqurun kirib o'taman.",
  "family/medicine"
 ],
 [
  "uz-latn",
  "Doktor kuniga ikki mahal, ovqatdan keyin ichasiz dedi. Besh kun davomida.",
  "medicine"
 ],
 [
  "uz-latn",
  "Ertaga bolalarni maktabga kim olib boradi? Men soat sakkizda majlisda bo'laman.",
  "family/school"
 ],
 [
  "uz-latn",
  "Ustoz, uy vazifasi qaysi betdan? 45-betdagi mashqlarmi?",
  "school/question"
 ],
 [
  "uz-latn",
  "Ramazon hayitingiz muborak bo'lsin! Alloh tutgan ro'za va qilgan ibodatlaringizni qabul qilsin 🤲",
  "religion/emoji"
 ],
 [
  "uz-latn",
  "Juma namozidan keyin masjid oldida uchrashamiz.",
  "religion"
 ],
 [
  "uz-latn",
  "Taksi chaqirdim, oq Cobalt, raqami 01 A 777 BA. Besh minutda keladi.",
  "taxi/plate"
 ],
 [
  "uz-latn",
  "Manzil: Mirzo Ulug'bek tumani, Buyuk Ipak Yo'li ko'chasi, 154-uy. Mo'ljal — Korzinka.",
  "address"
 ],
 [
  "uz-latn",
  "Aka, menga 3 qop kartoshka, 2 qop piyoz va 10 kilo guruch kerak. Qachon olib kelasiz?",
  "business/order"
 ],
 [
  "uz-latn",
  "Bozordan olish kerak:\n- non 4 ta\n- sut 2 litr\n- tuxum 30 ta\n- go'sht 2 kilo",
  "list"
 ],
 [
  "uz-latn",
  "Remont qachon tugaydi? Kafelni ertaga olib kelishadimi yoki yo'qmi?",
  "ru-loan/question"
 ],
 [
  "uz-latn",
  "Kecha nastroyeniyem yo'q edi, shuning uchun telefonni ko'tarmadim, uzr.",
  "ru-loan/slang"
 ],
 [
  "uz-latn",
  "Bratan, mashinaga zapravka qilib qo'y, kechqurun Samarqandga chiqamiz.",
  "ru-loan/slang"
 ],
 [
  "uz-latn",
  "Prays-listni yangilab tashlang, iltimos, hali ham eski narxlar turibdi.",
  "business/ru-loan"
 ],
 [
  "uz-latn",
  "Bugun oylik tushdimi? Menga hali kelmadi.",
  "question"
 ],
 [
  "uz-latn",
  "Qaysi kuni bo'shsiz? Uchrashib bir gaplashib olaylik.",
  "question"
 ],
 [
  "uz-latn",
  "Xullas, gap bunday: zakazni dushanbagacha yopishimiz kerak, bo'lmasa shtraf to'laymiz.",
  "business/ru-loan"
 ],
 [
  "uz-latn",
  "Dadam bilan gaplashdim, ular rozi. Sovchilarni shanba kuni kutamiz.",
  "family"
 ],
 [
  "uz-latn",
  "Qizim bugun matematikadan besh oldi 😊",
  "family/school/emoji"
 ],
 [
  "uz-latn",
  "Navro'z bayramingiz muborak! Oilangizga tinchlik, dasturxoningizga baraka tilayman 🌷",
  "holiday/emoji"
 ],
 [
  "uz-latn",
  "Iltimos, sakkizinchi qavatga olib chiqib bering, lift ishlamayapti.",
  "delivery"
 ],
 [
  "uz-latn",
  "Haydovchi aka, Chorsuga emas, Ko'kcha masjidi tomonga boramiz.",
  "taxi"
 ],
 [
  "uz-latn",
  "Tish doktoriga navbatga yozilib qo'ydim, payshanba kuni soat 10:30 ga.",
  "medicine/time"
 ],
 [
  "uz-latn",
  "Yaxshimisiz, ishlaringiz yaxshimi? Oilangiz tinch-omonmi?",
  "greeting/question"
 ],
 [
  "uz-latn",
  "Kartangizga 350 000 so'm o'tkazdim, chekini tashlab qo'ydim.",
  "price"
 ],
 [
  "uz-latn",
  "Zakaz qabul qilindi. Toshkent bo'ylab yetkazib berish bepul, viloyatlarga 30 ming so'm.",
  "business/price"
 ],
 [
  "uz-latn",
  "Tovar omborda qolmadi, keyingi partiya 15-oktabrda keladi.",
  "business/date"
 ],
 [
  "uz-latn",
  "Qachon qaytasan? Onang xavotir olyapti.",
  "family/question"
 ],
 [
  "uz-latn",
  "Hozir mashina haydayapman, keyinroq qo'ng'iroq qilaman.",
  "plain"
 ],
 [
  "uz-latn",
  "Bolalarga aytib qo'y, kompyuterda ko'p o'tirishmasin, darslarini qilishsin.",
  "family/school"
 ],
 [
  "uz-latn",
  "Imtihon natijalari chiqdimi? Saytda hali hech narsa yo'q.",
  "school/question"
 ],
 [
  "uz-latn",
  "Yangi yilingiz bilan! Barchangizga sog'lik va omad tilayman! 🎄🎉",
  "holiday/emoji"
 ],
 [
  "uz-latn",
  "Shu dam olish kunlari dachaga boramizmi yoki uyda qolamizmi?",
  "family/question"
 ],
 [
  "uz-latn",
  "Mijoz to'lovni kechiktiryapti, unga yana bir marta eslatib qo'ying.",
  "business"
 ],
 [
  "uz-latn",
  "Podyezd kodi 2580, uchinchi qavat, chap tomondagi eshik.",
  "address"
 ],
 [
  "uz-latn",
  "Ertaga Toshkentda yomg'ir yog'arkan, soyabon olib chiqinglar.",
  "family"
 ],
 [
  "uz-latn",
  "Bizda aksiya boshlandi! Hamma kurtkalarga 20% skidka, faqat shu hafta oxirigacha.",
  "business/ru-loan"
 ],
 [
  "uz-latn",
  "Dorilar qimmatlashib ketibdi, bitta qutisi 85 ming so'm bo'libdi.",
  "medicine/price"
 ],
 [
  "uz-latn",
  "Nevaramning tug'ilgan kuniga nima sovg'a qilsak ekan?",
  "family/question"
 ],
 [
  "uz-latn",
  "Maktabda ota-onalar majlisi bor ekan, juma kuni soat 17:00 da.",
  "school/time"
 ],
 [
  "uz-latn",
  "Bugun ishdan ertaroq chiqaman, bolani bog'chadan olishim kerak.",
  "family"
 ],
 [
  "uz-latn",
  "Assalomu alaykum. E'loningiz bo'yicha yozyapman, kvartira hali sotilmadimi?",
  "business/question"
 ],
 [
  "uz-latn",
  "Uch xonali, ikkinchi qavat, remonti yangi. Narxi 65 ming dollar, kelishamiz.",
  "business/price"
 ],
 [
  "uz-latn",
  "Hammaga salom! Ertangi uchrashuv bekor bo'ldi, keyingi haftaga ko'chirildi.",
  "plain"
 ],
 [
  "uz-latn",
  "Hisob:\nGo'sht 2 kg — 190 000 so'm\nPiyoz 3 kg — 15 000 so'm\nJami: 205 000 so'm",
  "list/price"
 ],
 [
  "uz-latn",
  "Mayli, kelishdik.",
  "short"
 ],
 [
  "uz-latn",
  "Qo'shnimiz zo'r odam ekan, hamma narsada yordam berdi.",
  "plain"
 ],
 [
  "uz-latn",
  "Opa, oshga qancha guruch solay? Mehmonlar o'n kishi.",
  "family/question"
 ],
 [
  "uz-latn",
  "Telefonim o'chib qolgan ekan, shuning uchun javob berolmadim. Nima bo'ldi?",
  "plain/question"
 ],
 [
  "uz-latn",
  "Ishxonaga kelyapsanmi? Boshliq seni so'rayapti.",
  "slang/question"
 ],
 [
  "uz-latn",
  "Qurbon hayiti oldidan qo'y narxlari oshib ketdi.",
  "religion/price"
 ],
 [
  "uz-latn",
  "Uzr, bugun kela olmayman, ertaga albatta boraman.",
  "short"
 ],
 [
  "uz-latn",
  "Ertaga soat 7:00 da aeroportga olib borib qo'yasizmi? Reys 9:40 da, Istanbulga.",
  "taxi/time"
 ],
 [
  "uz-latn",
  "Qalaysan, jo'ra? Nima gaplar?",
  "slang/question"
 ],
 [
  "uz-latn",
  "Bo'pti, kutaman 👍",
  "slang/emoji"
 ],
 [
  "uz-latn",
  "Ochered katta ekan, keyinroq kelaman.",
  "ru-loan"
 ],
 [
  "uz-latn",
  "Click orqali to'lasangiz ham bo'ladi, Payme ham ishlayapti.",
  "business/brand"
 ],
 [
  "uz-latn",
  "Jami 75 000 so'm, naqd yoki karta orqali.",
  "price"
 ],
 [
  "uz-latn",
  "Bitta kitob 45 000 so'm.",
  "price"
 ],
 [
  "uz-cyrl",
  "Ассалому алайкум, Дилноза опа. Буюртмангиз тайёр, эртага курьер олиб боради.",
  "business/greeting"
 ],
 [
  "uz-cyrl",
  "Нархи 180 000 сўм, етказиб бериш билан 200 000 сўм бўлади.",
  "price"
 ],
 [
  "uz-cyrl",
  "Счёт-фактурани почтага ташладим, текшириб, имзолаб юборинг.",
  "invoice/ru-loan"
 ],
 [
  "uz-cyrl",
  "Шу ерда турибман, магазиннинг олдида. Тезроқ чиқ.",
  "slang/address"
 ],
 [
  "uz-cyrl",
  "Келдингми? Ҳамма сени кутяпти.",
  "slang/question"
 ],
 [
  "uz-cyrl",
  "Майли-майли, ҳозир ўтказиб юбораман.",
  "slang"
 ],
 [
  "uz-cyrl",
  "Отажон, қон босимингизни ўлчадингизми? Дориларни вақтида ичинг.",
  "family/medicine"
 ],
 [
  "uz-cyrl",
  "Врач уч кун ётиб даволаниш керак деди, касалхонага ётқизишди.",
  "medicine"
 ],
 [
  "uz-cyrl",
  "Неварам бугун биринчи синфга борди, жуда хурсанд 😍",
  "family/school/emoji"
 ],
 [
  "uz-cyrl",
  "Ўқитувчи эртага ота-оналарни мактабга чақиряпти, соат тўртда.",
  "school"
 ],
 [
  "uz-cyrl",
  "Рамазон ойи муборак бўлсин! Рўзаларингиз қабул бўлсин.",
  "religion"
 ],
 [
  "uz-cyrl",
  "Жума куни масжидда Қуръон хатми бўлади, ҳаммангиз келинглар.",
  "religion"
 ],
 [
  "uz-cyrl",
  "Таксист ака, Чилонзор метросига олиб боринг, кейин Қатортолга бурамиз.",
  "taxi"
 ],
 [
  "uz-cyrl",
  "Манзил: Сергели тумани, 7-мавзе, 23-уй, 3-подъезд, 5-қават.",
  "address"
 ],
 [
  "uz-cyrl",
  "Буюртма рақами 4521. Тўловни Click орқали қилсангиз бўлади.",
  "business/brand"
 ],
 [
  "uz-cyrl",
  "Рўйхат:\n1. Ун — 2 қоп\n2. Ёғ — 5 литр\n3. Шакар — 10 кило\n4. Чой — 3 пачка",
  "list"
 ],
 [
  "uz-cyrl",
  "Ремонтга яна 3 миллион сўм керак экан, плиткачи нархни оширибди.",
  "ru-loan/price"
 ],
 [
  "uz-cyrl",
  "Кеча дача томонга бордик, ҳаво зўр экан.",
  "family"
 ],
 [
  "uz-cyrl",
  "Ўғлим армиядан келяпти, шанба куни ош қиламиз, албатта келинглар.",
  "family"
 ],
 [
  "uz-cyrl",
  "Бугун ойлик олдим, қарзингизни эртага қайтараман.",
  "price"
 ],
 [
  "uz-cyrl",
  "Қаерга кетдинг? Нега телефонни кўтармаяпсан?",
  "question"
 ],
 [
  "uz-cyrl",
  "Ҳисоб рақамимизга 5 млн сўм тушди, раҳмат, юкни бугун жўнатамиз.",
  "business"
 ],
 [
  "uz-cyrl",
  "Юк машинаси Андижондан чиқди, эртага тушга етиб келади.",
  "delivery"
 ],
 [
  "uz-cyrl",
  "Кечирасиз, бугун боролмайман, болам касал бўлиб қолди.",
  "family"
 ],
 [
  "uz-cyrl",
  "Ҳаммага салом! Эртанги учрашув соат олтига кўчирилди.",
  "plain"
 ],
 [
  "uz-cyrl",
  "Тиш оғриғи қолмаяпти, қайси клиникага борсам экан?",
  "medicine/question"
 ],
 [
  "uz-cyrl",
  "Имтиҳондан ўтдим! 86 балл тўпладим 🎉",
  "school/emoji"
 ],
 [
  "uz-cyrl",
  "Наврўз байрамингиз муборак! Хонадонингизга файзу барака тилайман.",
  "holiday"
 ],
 [
  "uz-cyrl",
  "Пулни картангизга ташлаб қўйдим, текшириб кўринг.",
  "price"
 ],
 [
  "uz-cyrl",
  "Квартира ижарага берилади: 2 хона, мебели билан, ойига 400 доллар.",
  "business"
 ],
 [
  "uz-cyrl",
  "Опа, сумалакка қачон борамиз? Қўшнилар ҳам боришмоқчи.",
  "holiday/question"
 ],
 [
  "uz-cyrl",
  "Бугун кечқурун футбол бор, бирга кўрамизми?",
  "slang/question"
 ],
 [
  "uz-cyrl",
  "Ишхонада интернет йўқ, файлни кечқурун уйдан юбораман.",
  "plain"
 ],
 [
  "uz-cyrl",
  "Келинингиз қалай, соғлиғи яхшими?",
  "family/question"
 ],
 [
  "uz-cyrl",
  "Ҳа, тушундим. Энди нима қиламиз?",
  "short"
 ],
 [
  "uz-cyrl",
  "Ок, бўпти.",
  "slang/short"
 ],
 [
  "uz-cyrl",
  "Бозорда помидор арзонлабди, килоси 8 минг сўм.",
  "price"
 ],
 [
  "uz-cyrl",
  "Болаларни боғчадан олиб келдим, ҳозир овқатлантиряпман.",
  "family"
 ],
 [
  "uz-cyrl",
  "Ўқишга ҳужжат топширдингми? Охирги кун жума.",
  "school/question"
 ],
 [
  "uz-cyrl",
  "Шифокор қон таҳлили топширишни буюрди, эрталаб наҳорга.",
  "medicine"
 ],
 [
  "uz-cyrl",
  "Хўжайин, товар келди, қаерга туширайлик?",
  "business"
 ],
 [
  "uz-cyrl",
  "Магазинга кириб, нон билан сут олиб чиқ.",
  "family"
 ],
 [
  "uz-cyrl",
  "Тўйимизга марҳамат: 12 октябрь, соат 18:00, «Ҳумо» тўйхонаси.",
  "holiday/date"
 ],
 [
  "uz-cyrl",
  "Онамнинг аҳволи яхшиланди, худога шукр.",
  "family/medicine"
 ],
 [
  "uz-cyrl",
  "Шахсий кабинетга киролмаяпман, паролни унутиб қўйибман.",
  "plain"
 ],
 [
  "uz-cyrl",
  "Аэропортдан ким олиб кетади? Самолёт 23:15 да қўнади.",
  "taxi/time"
 ],
 [
  "uz-cyrl",
  "Йиғилиш бўлмайди, раҳбар Тошкентга кетибди.",
  "business"
 ],
 [
  "uz-cyrl",
  "Укажон, дарсларингни қилдингми? Телевизорни ўчир.",
  "family/school"
 ],
 [
  "uz-cyrl",
  "Ҳамма нарса жойида, хавотир олманглар.",
  "short"
 ],
 [
  "uz-cyrl",
  "Етказиб бериш пулли, Тошкент ичида 25 минг сўм.",
  "delivery/price"
 ],
 [
  "uz-cyrl",
  "Бугун ҳаво совуқ, иссиқ кийиниб олинглар.",
  "family"
 ],
 [
  "uz-cyrl",
  "Ҳайит намози эрталаб соат 6:30 да бошланади.",
  "religion/time"
 ],
 [
  "uz-cyrl",
  "Ўртоғимнинг тўйига Фарғонага кетяпман, душанба куни қайтаман.",
  "plain"
 ],
 [
  "uz-cyrl",
  "Шартномага имзо қўйдик, аванс 30 фоиз.",
  "business"
 ],
 [
  "uz-cyrl",
  "Машина бузилиб қолди, эвакуатор чақирдим.",
  "ru-loan"
 ],
 [
  "uz-cyrl",
  "Қизим, уйга келаётганда дорихонадан парацетамол олиб кел.",
  "medicine/family"
 ],
 [
  "uz-cyrl",
  "Нега жавоб бермаяпсиз? Уч марта қўнғироқ қилдим.",
  "question"
 ],
 [
  "uz-cyrl",
  "Мижоз 50 та кўйлак буюртма қилди, ҳар бири 120 минг сўмдан.",
  "business/price"
 ],
 [
  "uz-cyrl",
  "Ҳаммаси зўр бўлди, сизларга катта раҳмат!",
  "short"
 ],
 [
  "uz-cyrl",
  "Кечирасиз, бу рақам кимники? Менга кимдир қўнғироқ қилган экан.",
  "question"
 ],
 [
  "uz-cyrl",
  "Очередь катта экан, кейинроқ келаман.",
  "ru-loan"
 ],
 [
  "uz-cyrl",
  "Адресни скинь, ҳозир чиқаман.",
  "ru-loan/slang"
 ],
 [
  "uz-cyrl",
  "Короче, заказни отмена қилдик, пулини қайтариб беришади.",
  "ru-loan"
 ],
 [
  "uz-cyrl",
  "Нон, сут, тухум, ёғ олиб кел",
  "list"
 ],
 [
  "uz-cyrl",
  "Келасизми?",
  "short/question"
 ],
 [
  "uz-cyrl",
  "Бугун палов қиламиз, кечқурун келинглар.",
  "family"
 ],
 [
  "ru",
  "Добрый день, Бахтиёр. Счёт на оплату отправил на почту, сумма 8 400 000 сум.",
  "invoice/uz-name"
 ],
 [
  "ru",
  "Доставка завтра с 10 до 13, пожалуйста, будьте дома.",
  "delivery"
 ],
 [
  "ru",
  "Щас подъеду, жди у подъезда.",
  "slang"
 ],
 [
  "ru",
  "Норм, всё получилось, спасибо!",
  "slang"
 ],
 [
  "ru",
  "Чё так долго? Мы уже полчаса стоим.",
  "slang/question"
 ],
 [
  "ru",
  "Мам, ты лекарства выпила? Вечером заеду.",
  "family/medicine"
 ],
 [
  "ru",
  "Врач сказал пить таблетки два раза в день после еды, пять дней.",
  "medicine"
 ],
 [
  "ru",
  "Кто завтра заберёт детей из садика? У меня совещание до шести.",
  "family/school"
 ],
 [
  "ru",
  "Учительница просила купить тетради в клетку и альбом для рисования.",
  "school"
 ],
 [
  "ru",
  "Рамазан хайит муборак! Пусть Аллах примет ваш пост и молитвы 🤲",
  "religion/uz-phrase"
 ],
 [
  "ru",
  "С праздником Навруз! Мира и благополучия вашей семье 🌷",
  "holiday/emoji"
 ],
 [
  "ru",
  "Такси заказал, белый Кобальт, номер 01 A 777 BA, будет через пять минут.",
  "taxi/plate"
 ],
 [
  "ru",
  "Адрес: Мирзо-Улугбекский район, улица Буюк Ипак Йули, дом 154, ориентир — Корзинка.",
  "address/uz-place"
 ],
 [
  "ru",
  "Список покупок:\n- хлеб 2 шт\n- молоко 1 л\n- яйца 10 шт\n- курица 1 кг",
  "list"
 ],
 [
  "ru",
  "Ребята, встреча переносится на понедельник, в 15:00.",
  "plain"
 ],
 [
  "ru",
  "Отправил накладную, проверьте, пожалуйста, количество.",
  "business"
 ],
 [
  "ru",
  "Цена за метр 45 000 сум, при заказе от 100 метров скидка 10%.",
  "price"
 ],
 [
  "ru",
  "Товара нет на складе, следующая поставка ожидается 20 октября.",
  "business/date"
 ],
 [
  "ru",
  "Шерзод ака, когда сможете забрать заказ?",
  "uz-name/kin"
 ],
 [
  "ru",
  "Нодира опа приедет из Ферганы в субботу.",
  "uz-name/kin"
 ],
 [
  "ru",
  "Мы сейчас на Чиланзаре, возле базара Фархад.",
  "uz-place"
 ],
 [
  "ru",
  "Афросиаб отправляется из Ташкента в 8:00, в Самарканде будем к десяти.",
  "uz-place/time"
 ],
 [
  "ru",
  "Ладно, давай завтра созвонимся.",
  "short"
 ],
 [
  "ru",
  "Окей, понял, сделаю.",
  "slang/short"
 ],
 [
  "ru",
  "Ты где? Почему трубку не берёшь?",
  "question"
 ],
 [
  "ru",
  "Сколько стоит доставка в Наманган?",
  "question/uz-place"
 ],
 [
  "ru",
  "Записала сына к педиатру на четверг, на 11:30.",
  "medicine/time"
 ],
 [
  "ru",
  "У бабушки поднялось давление, вызвали скорую.",
  "family/medicine"
 ],
 [
  "ru",
  "С днём рождения! Счастья, здоровья и всего самого лучшего 🎂🎉",
  "holiday/emoji"
 ],
 [
  "ru",
  "Деньги перевёл на карту, проверь.",
  "price"
 ],
 [
  "ru",
  "Короче, ситуация такая: клиент не платит, пока не получит товар.",
  "business/slang"
 ],
 [
  "ru",
  "Надо срочно оплатить свет и газ, а то отключат.",
  "plain"
 ],
 [
  "ru",
  "Сдаётся квартира в Юнусабаде, три комнаты, 500 долларов в месяц.",
  "business/uz-place"
 ],
 [
  "ru",
  "Экзамен перенесли на следующую неделю, слава богу.",
  "school"
 ],
 [
  "ru",
  "В пятницу после намаза поедем на кладбище к дедушке.",
  "religion/family"
 ],
 [
  "ru",
  "Брат, скинь номер того мастера по кондиционерам.",
  "slang"
 ],
 [
  "ru",
  "Мы уже выехали, будем минут через сорок, пробки жуткие.",
  "taxi"
 ],
 [
  "ru",
  "Курьер не может найти дом, позвоните ему: +998 90 123 45 67.",
  "delivery/phone"
 ],
 [
  "ru",
  "Не забудь купить подарок Мадине, у неё завтра день рождения.",
  "family/uz-name"
 ],
 [
  "ru",
  "Остаток долга — 1 200 000 сум, верну до конца месяца.",
  "price"
 ],
 [
  "ru",
  "Пацаны, кто сегодня на футбол?",
  "slang/question"
 ],
 [
  "ru",
  "Всё, договорились, жду вас в офисе в девять.",
  "short"
 ],
 [
  "ru",
  "Дочка получила пятёрку по математике 😊",
  "family/school/emoji"
 ],
 [
  "ru",
  "Родительское собрание в пятницу в 17:00, явка обязательна.",
  "school/time"
 ],
 [
  "ru",
  "Пришлите акт сверки за сентябрь до обеда.",
  "business"
 ],
 [
  "ru",
  "Погода испортилась, возьмите зонтики.",
  "plain"
 ],
 [
  "ru",
  "Свадьба Азиза и Лолы будет в ресторане «Ходжа Ахрор».",
  "holiday/uz-name"
 ],
 [
  "ru",
  "Блин, опять свет отключили.",
  "slang"
 ],
 [
  "ru",
  "Как здоровье? Давно не виделись.",
  "question"
 ],
 [
  "ru",
  "Могу подъехать к Алайскому базару через полчаса.",
  "taxi/uz-place"
 ],
 [
  "ru",
  "Скидки на все куртки до конца недели!",
  "business"
 ],
 [
  "ru",
  "Хоп, жду.",
  "slang/uz-loan"
 ],
 [
  "ru",
  "Чё по деньгам? Когда скинешь?",
  "slang/question"
 ],
 [
  "ru",
  "Привезите, пожалуйста, на четвёртый этаж, лифт не работает.",
  "delivery"
 ],
 [
  "ru",
  "Счёт-фактура № 312 от 05.10.2026 оплачена.",
  "invoice/date"
 ],
 [
  "ru",
  "Сегодня ифтар у нас дома, приходите к семи.",
  "religion"
 ],
 [
  "ru",
  "Кондиционер установили, работает отлично.",
  "plain"
 ],
 [
  "ru",
  "Слушай, а у тебя есть зарядка для айфона?",
  "slang/question"
 ],
 [
  "ru",
  "Дорога перекрыта, объезжайте через Беруни.",
  "taxi/uz-place"
 ],
 [
  "ru",
  "Работаем с юрлицами и физлицами.",
  "business"
 ],
 [
  "ru",
  "Поеду с родителями на дачу.",
  "family"
 ],
 [
  "ru",
  "Рахмат, ака, всё получил.",
  "uz-loan/kin"
 ],
 [
  "ru",
  "Среда подходит?",
  "short/question"
 ],
 [
  "ru",
  "Хорошо, займусь документами после обеда.",
  "business"
 ],
 [
  "ru",
  "Шахзода из Андижана, её номер у Дильшода.",
  "uz-name/place"
 ],
 [
  "ru",
  "Яна заболела, на работу сегодня не выйдет.",
  "family/name"
 ],
 [
  "ru",
  "Способы оплаты:\n- наличными\n- Click\n- Payme",
  "list/brand"
 ],
 [
  "en",
  "Hi Bakhtiyor, I've sent the invoice to your email. The total is 8,400,000 so'm.",
  "invoice/uz-name"
 ],
 [
  "en",
  "Delivery is scheduled for tomorrow between 10 and 1, please make sure someone is home.",
  "delivery"
 ],
 [
  "en",
  "Running late, be there in 15.",
  "slang"
 ],
 [
  "en",
  "Did you get the package? The courier says it was delivered.",
  "delivery/question"
 ],
 [
  "en",
  "Mom, did you take your medicine? I'll stop by this evening.",
  "family/medicine"
 ],
 [
  "en",
  "The doctor said to take the pills twice a day after meals for five days.",
  "medicine"
 ],
 [
  "en",
  "Who's picking up the kids from kindergarten tomorrow? I have a meeting until six.",
  "family/school"
 ],
 [
  "en",
  "The teacher asked us to buy grid notebooks and a sketchbook.",
  "school"
 ],
 [
  "en",
  "Eid Mubarak! May Allah accept your fasting and prayers 🤲",
  "religion/emoji"
 ],
 [
  "en",
  "Happy Navruz! Wishing your family peace and prosperity 🌷",
  "holiday/emoji"
 ],
 [
  "en",
  "I ordered a taxi, white Cobalt, plate 01 A 777 BA, arriving in five minutes.",
  "taxi/plate"
 ],
 [
  "en",
  "Address: Mirzo Ulugbek district, Buyuk Ipak Yuli street, building 154, landmark: Korzinka.",
  "address/uz-place"
 ],
 [
  "en",
  "Shopping list:\n- bread x2\n- milk 1L\n- eggs x10\n- chicken 1kg",
  "list"
 ],
 [
  "en",
  "Guys, the meeting is moved to Monday at 3 PM.",
  "plain"
 ],
 [
  "en",
  "Price per meter is 45,000 so'm, 10% off for orders over 100 meters.",
  "price"
 ],
 [
  "en",
  "Out of stock, next shipment expected October 20.",
  "business/date"
 ],
 [
  "en",
  "Sherzod, when can you pick up the order?",
  "uz-name/question"
 ],
 [
  "en",
  "Nodira is coming from Fergana on Saturday.",
  "uz-name/place"
 ],
 [
  "en",
  "We're in Chilanzar now, near Farkhad bazaar.",
  "uz-place"
 ],
 [
  "en",
  "The Afrosiyob train leaves Tashkent at 8:00, we'll be in Samarkand by ten.",
  "uz-place/time"
 ],
 [
  "en",
  "Okay, let's talk tomorrow.",
  "short"
 ],
 [
  "en",
  "Where are you? Why aren't you picking up?",
  "question"
 ],
 [
  "en",
  "How much is shipping to Namangan?",
  "question/uz-place"
 ],
 [
  "en",
  "Booked my son with the pediatrician for Thursday at 11:30.",
  "medicine/time"
 ],
 [
  "en",
  "Grandma's blood pressure went up, we called an ambulance.",
  "family/medicine"
 ],
 [
  "en",
  "Money transferred to your card, please check.",
  "price"
 ],
 [
  "en",
  "Long story short, the client won't pay until he gets the goods.",
  "business/slang"
 ],
 [
  "en",
  "Apartment for rent in Yunusabad, 3 rooms, $500 a month.",
  "business/uz-place"
 ],
 [
  "en",
  "The exam got postponed to next week, thank God.",
  "school"
 ],
 [
  "en",
  "Bro, send me the number of that AC repair guy.",
  "slang"
 ],
 [
  "en",
  "We already left, should be there in about forty minutes, traffic is terrible.",
  "taxi"
 ],
 [
  "en",
  "The courier can't find the house, please call him at +998 90 123 45 67.",
  "delivery/phone"
 ],
 [
  "en",
  "Don't forget to buy a gift for Madina, her birthday is tomorrow.",
  "family/uz-name"
 ],
 [
  "en",
  "Remaining balance is 1,200,000 so'm, I'll pay it back by the end of the month.",
  "price"
 ],
 [
  "en",
  "Anyone up for football tonight?",
  "slang/question"
 ],
 [
  "en",
  "Deal, see you at the office at nine.",
  "short"
 ],
 [
  "en",
  "My daughter got an A in math today 😊",
  "family/school/emoji"
 ],
 [
  "en",
  "Parent-teacher meeting on Friday at 5 PM, attendance is mandatory.",
  "school/time"
 ],
 [
  "en",
  "I need the reconciliation statement for September, please send it before lunch.",
  "business"
 ],
 [
  "en",
  "Aziz and Lola's wedding will be at the Khoja Akhror restaurant.",
  "holiday/uz-name"
 ],
 [
  "en",
  "Ugh, the power is out again.",
  "slang"
 ],
 [
  "en",
  "How's your health? Long time no see.",
  "question"
 ],
 [
  "en",
  "Cool, cool. Talk later.",
  "slang/short"
 ],
 [
  "en",
  "No worries, take your time.",
  "short"
 ],
 [
  "en",
  "Can you send me the location? I'm near Chorsu metro station.",
  "question/uz-place"
 ],
 [
  "en",
  "We're hosting iftar at home today, come by around seven.",
  "religion"
 ],
 [
  "en",
  "The AC is installed and working perfectly.",
  "plain"
 ],
 [
  "en",
  "Hey, do you have an iPhone charger?",
  "slang/question"
 ],
 [
  "en",
  "Invoice #312 dated 05.10.2026 has been paid.",
  "invoice/date"
 ],
 [
  "en",
  "Reminder: rent is due on the 5th. Please transfer 4,000,000 so'm to the usual card.",
  "price/date"
 ],
 [
  "en",
  "Order confirmed! Free delivery within Tashkent, 30k so'm to other regions.",
  "business/price"
 ],
 [
  "en",
  "Kids, dinner's ready. Wash your hands.",
  "family"
 ],
 [
  "en",
  "I'm at the clinic, waiting for the X-ray results.",
  "medicine"
 ],
 [
  "en",
  "My flight lands at 23:15, can someone pick me up?",
  "taxi/time"
 ],
 [
  "en",
  "Did your salary come in? Mine hasn't arrived yet.",
  "question"
 ],
 [
  "en",
  "Congrats on passing the exam! 86 points is amazing 🎉",
  "school/emoji"
 ],
 [
  "en",
  "Alright, I'll handle it.",
  "short"
 ],
 [
  "en",
  "Need 3 bags of potatoes, 2 bags of onions and 10 kg of rice. When can you deliver?",
  "business/order"
 ],
 [
  "en",
  "Sheep prices went up before Qurbon Hayit.",
  "religion/price"
 ],
 [
  "en",
  "Sorry, can't make it today, I'll definitely come tomorrow.",
  "short"
 ],
 [
  "en",
  "Order details:\nItem: cotton shirts\nQty: 50\nUnit price: 120,000 so'm",
  "list/invoice"
 ],
 [
  "en",
  "Ask Kim, she has the keys.",
  "name"
 ],
 [
  "en",
  "Yep, on my way 🚗",
  "slang/emoji"
 ],
 [
  "en",
  "Thanks a lot, received everything.",
  "short"
 ],
 [
  "en",
  "Water's off in our building until 6 PM, heads up.",
  "plain"
 ],
 [
  "en",
  "Happy Eid al-Adha to you and your family!",
  "holiday"
 ],
 [
  "uz-latn",
  "Men hozir yo'ldaman, yarim soatdan keyin yetib boraman.",
  "plain"
 ],
 [
  "uz-latn",
  "Onamga dori olib berishim kerak.",
  "plain"
 ],
 [
  "uz-latn",
  "Bugun kechqurun futbol bor, ko'ramizmi?",
  "question"
 ],
 [
  "uz-latn",
  "Do'konga borib non va sut olib kel.",
  "plain"
 ],
 [
  "uz-latn",
  "Hisobotni juma kuni topshirish kerak.",
  "plain"
 ],
 [
  "uz-latn",
  "Kechqurun qo'ng'iroq qilaman.",
  "plain"
 ],
 [
  "uz-latn",
  "Telefonimning zaryadi tugab qoldi.",
  "loan"
 ],
 [
  "uz-latn",
  "Shanba kuni qishloqqa boramiz.",
  "plain"
 ],
 [
  "uz-latn",
  "Bolalarni maktabdan olib kelasizmi?",
  "question"
 ],
 [
  "uz-latn",
  "Menga manzilni yuboring, iltimos.",
  "plain"
 ],
 [
  "uz-latn",
  "Ish haqi qachon tushadi?",
  "question"
 ],
 [
  "uz-latn",
  "Uyga kelganimda xabar beraman.",
  "plain"
 ],
 [
  "uz-latn",
  "Ota-onamga salom ayting.",
  "plain"
 ],
 [
  "uz-latn",
  "Yangi yil bilan tabriklayman!",
  "plain"
 ],
 [
  "uz-latn",
  "Tug'ilgan kuningiz muborak bo'lsin!",
  "plain"
 ],
 [
  "uz-latn",
  "Bugun havo juda sovuq, issiq kiyining.",
  "plain"
 ],
 [
  "uz-latn",
  "Mashina ta'mirga ketdi, ertaga olaman.",
  "plain"
 ],
 [
  "uz-latn",
  "Bu loyiha bo'yicha yig'ilish soat uchda.",
  "plain"
 ],
 [
  "uz-latn",
  "Kartamga pul o'tkazib yubordingizmi?",
  "question"
 ],
 [
  "uz-latn",
  "Yo'q, hali kelganim yo'q.",
  "short"
 ],
 [
  "uz-latn",
  "Ha, tayyor.",
  "short"
 ],
 [
  "uz-latn",
  "Rahmat, katta yordam berdingiz.",
  "plain"
 ],
 [
  "uz-latn",
  "Ozroq kutib turing, hozir chiqaman.",
  "plain"
 ],
 [
  "uz-latn",
  "Kecha kino ko'rdik, juda zo'r ekan.",
  "plain"
 ],
 [
  "uz-latn",
  "Dadamning tug'ilgan kuni payshanba.",
  "plain"
 ],
 [
  "uz-latn",
  "Narxlar yana oshibdi.",
  "short"
 ],
 [
  "uz-latn",
  "Bozorga borib kelaman.",
  "short"
 ],
 [
  "uz-latn",
  "Shifokor qabuliga yozildim.",
  "plain"
 ],
 [
  "uz-latn",
  "Darsdan keyin kutubxonaga boraman.",
  "plain"
 ],
 [
  "uz-latn",
  "Internet sekin ishlayapti.",
  "loan"
 ],
 [
  "uz-latn",
  "Qalesan, ishlar yaxshimi?",
  "chat"
 ],
 [
  "uz-latn",
  "Ertaga ishga kelmayman, mazam yoq.",
  "no-apostrophe"
 ],
 [
  "uz-latn",
  "Togri aytasan.",
  "no-apostrophe"
 ],
 [
  "uz-latn",
  "Uyga ketyapman.",
  "short"
 ],
 [
  "uz-latn",
  "Nima qilyapsan?",
  "short"
 ],
 [
  "uz-latn",
  "Jasur bilan Samarqandga boramiz.",
  "names"
 ],
 [
  "uz-latn",
  "Click orqali to'lab qo'ydim.",
  "brand"
 ],
 [
  "uz-latn",
  "Zoom'da uchrashuv soat ikkida.",
  "brand"
 ],
 [
  "uz-latn",
  "Payme orqali pul tashladim.",
  "brand"
 ],
 [
  "uz-latn",
  "Dilnoza opa, hujjatlar tayyor bo'ldi.",
  "names"
 ],
 [
  "uz-latn",
  "Soat 14:00 da Chilonzordagi ofisda bo'laman.",
  "time"
 ],
 [
  "uz-latn",
  "Jami 2 million 300 ming so'm bo'ldi.",
  "price"
 ],
 [
  "uz-latn",
  "Uchrashuv 15-mart kuni bo'ladi.",
  "time"
 ],
 [
  "uz-latn",
  "Hurmatli hamkasblar, ertangi majlis bekor qilindi. Yangi sana haqida keyinroq xabar beramiz. Savollar bo'lsa, menga yozing.",
  "long"
 ],
 [
  "uz-latn",
  "Assalomu alaykum, men sizga oldin yozgan edim. Buyurtmam hali yetib kelmadi. Iltimos, tekshirib bering.",
  "long"
 ],
 [
  "uz-latn",
  "Serverni qayta ishga tushirdim, endi hammasi ishlayapti.",
  "loan"
 ],
 [
  "uz-latn",
  "Prezentatsiyani elektron pochtaga jo'natdim.",
  "loan"
 ],
 [
  "uz-latn",
  "Kompaniya yangi ofisga ko'chib o'tdi.",
  "loan"
 ],
 [
  "uz-latn",
  "Dastur yangilanishini o'rnating.",
  "plain"
 ],
 [
  "uz-latn",
  "Bank kartasining muddati tugadi.",
  "loan"
 ],
 [
  "uz-latn",
  "Xo'sh?",
  "short"
 ],
 [
  "uz-latn",
  "Bo'pti.",
  "short"
 ],
 [
  "uz-latn",
  "Kelyapman.",
  "short"
 ],
 [
  "uz-latn",
  "Mayli, ko'rishamiz.",
  "short"
 ],
 [
  "uz-latn",
  "Tushunmadim.",
  "short"
 ],
 [
  "uz-latn",
  "Qachon kelasan?",
  "short"
 ],
 [
  "uz-latn",
  "Yaxshi.",
  "short"
 ],
 [
  "uz-latn",
  "Eshitdim.",
  "short"
 ],
 [
  "uz-latn",
  "Barakalla!",
  "short"
 ],
 [
  "uz-latn",
  "Omon bo'ling.",
  "short"
 ],
 [
  "uz-latn",
  "Bugun men juda charchadim, ertaga gaplashamiz.",
  "plain"
 ],
 [
  "uz-latn",
  "Sizga yana bir narsa aytmoqchi edim.",
  "plain"
 ],
 [
  "uz-latn",
  "Bu masalani direktor bilan hal qilamiz.",
  "plain"
 ],
 [
  "uz-latn",
  "Choy damlab qo'y, hozir boraman.",
  "plain"
 ],
 [
  "uz-latn",
  "Avtobus kechikdi, taksida ketaman.",
  "loan"
 ],
 [
  "uz-latn",
  "Universitetda imtihonlar boshlandi.",
  "loan"
 ],
 [
  "uz-latn",
  "Video montaj qilib berasizmi?",
  "loan"
 ],
 [
  "uz-latn",
  "Men bilan birga boring.",
  "plain"
 ],
 [
  "uz-latn",
  "Hammaga katta rahmat!",
  "plain"
 ],
 [
  "uz-latn",
  "Tez orada javob beraman.",
  "plain"
 ],
 [
  "uz-latn",
  "Ofis manzili: Amir Temur ko'chasi, 108-uy.",
  "address"
 ],
 [
  "uz-latn",
  "Bugun dam olish kuni.",
  "plain"
 ],
 [
  "uz-latn",
  "Iltimos, eshikni yopib keting.",
  "plain"
 ],
 [
  "uz-latn",
  "Men ham borsam bo'ladimi?",
  "question"
 ],
 [
  "uz-latn",
  "Biz tayyormiz.",
  "short"
 ],
 [
  "uz-latn",
  "Ular hali kelmadi.",
  "short"
 ],
 [
  "uz-latn",
  "Shoshilmang, vaqt bor.",
  "short"
 ],
 [
  "uz-latn",
  "Kofe ichamizmi?",
  "loan"
 ],
 [
  "uz-latn",
  "Planshetni zaryadga qo'yib qo'y.",
  "loan"
 ],
 [
  "uz-latn",
  "Maqola tayyor, tekshirib chiqing.",
  "plain"
 ],
 [
  "uz-cyrl",
  "Мен ҳозир йўлдаман, ярим соатдан кейин етиб бораман.",
  "plain"
 ],
 [
  "uz-cyrl",
  "Онамга дори олиб беришим керак.",
  "no-oqgh"
 ],
 [
  "uz-cyrl",
  "Бугун кечқурун футбол бор, кўрамизми?",
  "question"
 ],
 [
  "uz-cyrl",
  "Дўконга бориб нон ва сут олиб кел.",
  "plain"
 ],
 [
  "uz-cyrl",
  "Ҳисоботни жума куни топшириш керак.",
  "plain"
 ],
 [
  "uz-cyrl",
  "Кечқурун қўнғироқ қиламан.",
  "plain"
 ],
 [
  "uz-cyrl",
  "Телефонимнинг заряди тугаб қолди.",
  "loan"
 ],
 [
  "uz-cyrl",
  "Шанба куни қишлоққа борамиз.",
  "plain"
 ],
 [
  "uz-cyrl",
  "Болаларни мактабдан олиб келасизми?",
  "no-oqgh"
 ],
 [
  "uz-cyrl",
  "Менга манзилни юборинг, илтимос.",
  "no-oqgh"
 ],
 [
  "uz-cyrl",
  "Иш ҳақи қачон тушади?",
  "question"
 ],
 [
  "uz-cyrl",
  "Уйга келганимда хабар бераман.",
  "no-oqgh"
 ],
 [
  "uz-cyrl",
  "Ота-онамга салом айтинг.",
  "no-oqgh"
 ],
 [
  "uz-cyrl",
  "Янги йил билан табриклайман!",
  "no-oqgh"
 ],
 [
  "uz-cyrl",
  "Туғилган кунингиз муборак бўлсин!",
  "plain"
 ],
 [
  "uz-cyrl",
  "Бугун ҳаво жуда совуқ, иссиқ кийининг.",
  "plain"
 ],
 [
  "uz-cyrl",
  "Машина таъмирга кетди, эртага оламан.",
  "plain"
 ],
 [
  "uz-cyrl",
  "Мен сенга айтдим-ку.",
  "no-oqgh"
 ],
 [
  "uz-cyrl",
  "Нима гап, ишлар яхшими?",
  "no-oqgh"
 ],
 [
  "uz-cyrl",
  "Кеча кино кўрдик, жуда зўр экан.",
  "plain"
 ],
 [
  "uz-cyrl",
  "Эртага келаман.",
  "short/no-oqgh"
 ],
 [
  "uz-cyrl",
  "Майли, кутаман.",
  "short/no-oqgh"
 ],
 [
  "uz-cyrl",
  "Сизни кутиб турибман.",
  "no-oqgh"
 ],
 [
  "uz-cyrl",
  "Бизнинг уйимиз Чилонзорда.",
  "no-oqgh"
 ],
 [
  "uz-cyrl",
  "Китобни олиб келдингизми?",
  "no-oqgh"
 ],
 [
  "uz-cyrl",
  "Нима дединг?",
  "short/no-oqgh"
 ],
 [
  "uz-cyrl",
  "Тушунмадим.",
  "short/no-oqgh"
 ],
 [
  "uz-cyrl",
  "Яхши, келишдик.",
  "short/no-oqgh"
 ],
 [
  "uz-cyrl",
  "Бозорга бориб келаман.",
  "short/no-oqgh"
 ],
 [
  "uz-cyrl",
  "Дарсдан кейин кутубхонага бораман.",
  "no-oqgh"
 ],
 [
  "uz-cyrl",
  "Жасур билан Самарқандга борамиз.",
  "names"
 ],
 [
  "uz-cyrl",
  "Click орқали тўлаб қўйдим.",
  "brand"
 ],
 [
  "uz-cyrl",
  "Дилноза опа, ҳужжатлар тайёр бўлди.",
  "names"
 ],
 [
  "uz-cyrl",
  "Соат 14:00 да офисда бўламан.",
  "time"
 ],
 [
  "uz-cyrl",
  "Жами 2 миллион 300 минг сўм бўлди.",
  "price"
 ],
 [
  "uz-cyrl",
  "Ҳурматли ҳамкасблар, эртанги мажлис бекор қилинди. Янги сана ҳақида кейинроқ хабар берамиз. Саволлар бўлса, менга ёзинг.",
  "long"
 ],
 [
  "uz-cyrl",
  "Ассалому алайкум, мен сизга олдин ёзган эдим. Буюртмам ҳали етиб келмади. Илтимос, текшириб беринг.",
  "long"
 ],
 [
  "uz-cyrl",
  "Серверни қайта ишга туширдим, энди ҳаммаси ишлаяпти.",
  "loan"
 ],
 [
  "uz-cyrl",
  "Компания янги офисга кўчиб ўтди.",
  "loan"
 ],
 [
  "uz-cyrl",
  "Банк картасининг муддати тугади.",
  "loan/no-oqgh"
 ],
 [
  "uz-cyrl",
  "Хўш?",
  "short"
 ],
 [
  "uz-cyrl",
  "Бўпти.",
  "short"
 ],
 [
  "uz-cyrl",
  "Келяпман.",
  "short/no-oqgh"
 ],
 [
  "uz-cyrl",
  "Қачон келасан?",
  "short"
 ],
 [
  "uz-cyrl",
  "Яхши.",
  "short/no-oqgh"
 ],
 [
  "uz-cyrl",
  "Эшитдим.",
  "short/no-oqgh"
 ],
 [
  "uz-cyrl",
  "Баракалла!",
  "short/no-oqgh"
 ],
 [
  "uz-cyrl",
  "Омон бўлинг.",
  "short"
 ],
 [
  "uz-cyrl",
  "Бугун мен жуда чарчадим, эртага гаплашамиз.",
  "no-oqgh"
 ],
 [
  "uz-cyrl",
  "Сизга яна бир нарса айтмоқчи эдим.",
  "plain"
 ],
 [
  "uz-cyrl",
  "Бу масалани директор билан ҳал қиламиз.",
  "plain"
 ],
 [
  "uz-cyrl",
  "Автобус кечикди, таксида кетаман.",
  "loan/no-oqgh"
 ],
 [
  "uz-cyrl",
  "Университетда имтиҳонлар бошланди.",
  "loan"
 ],
 [
  "uz-cyrl",
  "Мен билан бирга боринг.",
  "no-oqgh"
 ],
 [
  "uz-cyrl",
  "Ҳаммага катта раҳмат!",
  "plain"
 ],
 [
  "uz-cyrl",
  "Тез орада жавоб бераман.",
  "no-oqgh"
 ],
 [
  "uz-cyrl",
  "Бугун дам олиш куни.",
  "no-oqgh"
 ],
 [
  "uz-cyrl",
  "Илтимос, эшикни ёпиб кетинг.",
  "no-oqgh"
 ],
 [
  "uz-cyrl",
  "Биз тайёрмиз.",
  "short/no-oqgh"
 ],
 [
  "uz-cyrl",
  "Улар ҳали келмади.",
  "short"
 ],
 [
  "uz-cyrl",
  "Шошилманг, вақт бор.",
  "short"
 ],
 [
  "uz-cyrl",
  "Кофе ичамизми?",
  "loan/no-oqgh"
 ],
 [
  "uz-cyrl",
  "Мақола тайёр, текшириб чиқинг.",
  "plain"
 ],
 [
  "uz-cyrl",
  "Оғайнилар, шанба куни учрашамиз.",
  "plain"
 ],
 [
  "uz-cyrl",
  "Президент фармонига кўра янги қонун кучга кирди.",
  "loan"
 ],
 [
  "ru",
  "Я сейчас в дороге, буду через полчаса.",
  "plain"
 ],
 [
  "ru",
  "Нужно купить маме лекарства.",
  "plain"
 ],
 [
  "ru",
  "Сегодня вечером футбол, посмотрим?",
  "question"
 ],
 [
  "ru",
  "Зайди в магазин, купи хлеб и молоко.",
  "plain"
 ],
 [
  "ru",
  "Отчёт надо сдать в пятницу.",
  "plain"
 ],
 [
  "ru",
  "Вечером позвоню.",
  "short"
 ],
 [
  "ru",
  "У меня сел телефон.",
  "short"
 ],
 [
  "ru",
  "В субботу едем в кишлак.",
  "plain"
 ],
 [
  "ru",
  "Заберёшь детей из школы?",
  "question"
 ],
 [
  "ru",
  "Скиньте мне адрес, пожалуйста.",
  "plain"
 ],
 [
  "ru",
  "Когда придёт зарплата?",
  "question"
 ],
 [
  "ru",
  "Напишу, как доберусь домой.",
  "plain"
 ],
 [
  "ru",
  "Передай привет родителям.",
  "plain"
 ],
 [
  "ru",
  "С Новым годом!",
  "short"
 ],
 [
  "ru",
  "С днём рождения, сестрёнка!",
  "short"
 ],
 [
  "ru",
  "Сегодня очень холодно, оденьтесь теплее.",
  "plain"
 ],
 [
  "ru",
  "Машина в ремонте, заберу завтра.",
  "plain"
 ],
 [
  "ru",
  "Совещание по проекту в три часа.",
  "plain"
 ],
 [
  "ru",
  "Ты перевёл деньги на карту?",
  "question"
 ],
 [
  "ru",
  "Нет, я ещё не приехал.",
  "short"
 ],
 [
  "ru",
  "Да, готово.",
  "short"
 ],
 [
  "ru",
  "Спасибо, вы очень помогли.",
  "plain"
 ],
 [
  "ru",
  "Подождите немного, сейчас выйду.",
  "plain"
 ],
 [
  "ru",
  "Вчера смотрели кино, очень понравилось.",
  "plain"
 ],
 [
  "ru",
  "Цены опять выросли.",
  "short"
 ],
 [
  "ru",
  "Схожу на рынок.",
  "short"
 ],
 [
  "ru",
  "Записался на приём к врачу.",
  "plain"
 ],
 [
  "ru",
  "Интернет медленно работает.",
  "plain"
 ],
 [
  "ru",
  "Как дела на работе?",
  "question"
 ],
 [
  "ru",
  "Ладно, увидимся.",
  "short"
 ],
 [
  "ru",
  "Мы с Жасуром едем в Самарканд.",
  "uz-names"
 ],
 [
  "ru",
  "Оплатил через Click.",
  "brand"
 ],
 [
  "ru",
  "Встреча в Zoom в два часа.",
  "brand"
 ],
 [
  "ru",
  "Дильноза, документы готовы.",
  "uz-names"
 ],
 [
  "ru",
  "Шухрат ака сказал, что опоздает.",
  "uz-names"
 ],
 [
  "ru",
  "Отправил презентацию Сардору на почту.",
  "uz-names"
 ],
 [
  "ru",
  "Буду в офисе на Чиланзаре в 14:00.",
  "time"
 ],
 [
  "ru",
  "Итого 2 миллиона 300 тысяч сумов.",
  "price"
 ],
 [
  "ru",
  "Встреча 15 марта.",
  "time"
 ],
 [
  "ru",
  "Уважаемые коллеги, завтрашнее совещание отменяется. О новой дате сообщим позже. Если есть вопросы, пишите мне.",
  "long"
 ],
 [
  "ru",
  "Здравствуйте, я вам уже писал. Мой заказ до сих пор не пришёл. Проверьте, пожалуйста.",
  "long"
 ],
 [
  "ru",
  "Перезагрузил сервер, теперь всё работает.",
  "plain"
 ],
 [
  "ru",
  "Компания переехала в новый офис.",
  "plain"
 ],
 [
  "ru",
  "Установите обновление программы.",
  "plain"
 ],
 [
  "ru",
  "Срок действия банковской карты истёк.",
  "plain"
 ],
 [
  "ru",
  "Ну?",
  "short"
 ],
 [
  "ru",
  "Понял.",
  "short"
 ],
 [
  "ru",
  "Еду.",
  "short"
 ],
 [
  "ru",
  "Когда приедешь?",
  "short"
 ],
 [
  "ru",
  "Хорошо, договорились.",
  "short"
 ],
 [
  "ru",
  "Слышу.",
  "short"
 ],
 [
  "ru",
  "Молодец!",
  "short"
 ],
 [
  "ru",
  "Будь здоров.",
  "short"
 ],
 [
  "ru",
  "Не понял.",
  "short"
 ],
 [
  "ru",
  "Конечно.",
  "short"
 ],
 [
  "ru",
  "Ща буду.",
  "chat"
 ],
 [
  "ru",
  "Короче, я опаздываю.",
  "chat"
 ],
 [
  "ru",
  "Давай завтра созвонимся.",
  "chat"
 ],
 [
  "ru",
  "Мам, я дома.",
  "chat"
 ],
 [
  "ru",
  "Сколько с меня?",
  "question"
 ],
 [
  "ru",
  "Сегодня я очень устал, поговорим завтра.",
  "plain"
 ],
 [
  "ru",
  "Хотел вам ещё кое-что сказать.",
  "plain"
 ],
 [
  "ru",
  "Этот вопрос решим с директором.",
  "plain"
 ],
 [
  "ru",
  "Поставь чай, я скоро буду.",
  "plain"
 ],
 [
  "ru",
  "Автобус опоздал, поеду на такси.",
  "plain"
 ],
 [
  "ru",
  "В университете начались экзамены.",
  "plain"
 ],
 [
  "ru",
  "Сможете смонтировать видео?",
  "question"
 ],
 [
  "ru",
  "Пойдёмте со мной.",
  "short"
 ],
 [
  "ru",
  "Всем большое спасибо!",
  "short"
 ],
 [
  "ru",
  "Скоро отвечу.",
  "short"
 ],
 [
  "ru",
  "Адрес офиса: улица Амира Темура, дом 108.",
  "address"
 ],
 [
  "ru",
  "Мы готовы.",
  "short"
 ],
 [
  "ru",
  "Они ещё не пришли.",
  "short"
 ],
 [
  "ru",
  "Не торопитесь, время есть.",
  "short"
 ],
 [
  "ru",
  "Кофе будем?",
  "short"
 ],
 [
  "ru",
  "Поставь планшет на зарядку.",
  "plain"
 ],
 [
  "ru",
  "Статья готова, проверьте.",
  "plain"
 ],
 [
  "ru",
  "Бахтиёр, Ойбек и Нодира придут вечером.",
  "uz-names"
 ],
 [
  "ru",
  "Ғайрат сказал, что всё готово.",
  "uz-names"
 ],
 [
  "ru",
  "Мой номер: +998 90 123 45 67.",
  "number"
 ],
 [
  "en",
  "I'm on my way, I'll be there in half an hour.",
  "plain"
 ],
 [
  "en",
  "I need to buy medicine for my mom.",
  "plain"
 ],
 [
  "en",
  "There's football tonight, want to watch?",
  "question"
 ],
 [
  "en",
  "Stop by the store and get bread and milk.",
  "plain"
 ],
 [
  "en",
  "The report is due on Friday.",
  "plain"
 ],
 [
  "en",
  "I'll call you in the evening.",
  "plain"
 ],
 [
  "en",
  "My phone died.",
  "short"
 ],
 [
  "en",
  "We're driving to the village on Saturday.",
  "plain"
 ],
 [
  "en",
  "Can you pick the kids up from school?",
  "question"
 ],
 [
  "en",
  "Send me the address, please.",
  "plain"
 ],
 [
  "en",
  "When do we get paid?",
  "question"
 ],
 [
  "en",
  "I'll text you when I get home.",
  "plain"
 ],
 [
  "en",
  "Say hi to your parents.",
  "short"
 ],
 [
  "en",
  "Happy New Year!",
  "short"
 ],
 [
  "en",
  "It's really cold today, dress warmly.",
  "plain"
 ],
 [
  "en",
  "The car is in the shop, I'll pick it up tomorrow.",
  "plain"
 ],
 [
  "en",
  "The project meeting is at three.",
  "plain"
 ],
 [
  "en",
  "Did you transfer the money to my card?",
  "question"
 ],
 [
  "en",
  "No, I haven't arrived yet.",
  "short"
 ],
 [
  "en",
  "Yes, it's ready.",
  "short"
 ],
 [
  "en",
  "Thanks, you helped a lot.",
  "short"
 ],
 [
  "en",
  "Wait a bit, I'm coming out now.",
  "plain"
 ],
 [
  "en",
  "We watched a movie yesterday, it was great.",
  "plain"
 ],
 [
  "en",
  "Prices went up again.",
  "short"
 ],
 [
  "en",
  "I'm going to the market.",
  "short"
 ],
 [
  "en",
  "I booked a doctor's appointment.",
  "plain"
 ],
 [
  "en",
  "The internet is slow.",
  "short"
 ],
 [
  "en",
  "How's work?",
  "short"
 ],
 [
  "en",
  "Okay, see you.",
  "short"
 ],
 [
  "en",
  "Jasur and I are going to Samarkand.",
  "uz-names"
 ],
 [
  "en",
  "Paid via Click.",
  "brand"
 ],
 [
  "en",
  "Zoom call at two.",
  "brand"
 ],
 [
  "en",
  "Dilnoza, the documents are ready.",
  "uz-names"
 ],
 [
  "en",
  "Shukhrat said he'll be late.",
  "uz-names"
 ],
 [
  "en",
  "I'll be at the office in Chilanzar at 14:00.",
  "time"
 ],
 [
  "en",
  "Total is 2,300,000 sum.",
  "price"
 ],
 [
  "en",
  "Meeting on March 15.",
  "time"
 ],
 [
  "en",
  "Dear colleagues, tomorrow's meeting is cancelled. We'll announce the new date later. If you have questions, write to me.",
  "long"
 ],
 [
  "en",
  "Hello, I wrote to you earlier. My order still hasn't arrived. Please check.",
  "long"
 ],
 [
  "en",
  "I restarted the server, everything works now.",
  "plain"
 ],
 [
  "en",
  "The company moved to a new office.",
  "plain"
 ],
 [
  "en",
  "Install the software update.",
  "plain"
 ],
 [
  "en",
  "My bank card expired.",
  "short"
 ],
 [
  "en",
  "Well?",
  "short"
 ],
 [
  "en",
  "Got it.",
  "short"
 ],
 [
  "en",
  "On my way.",
  "short"
 ],
 [
  "en",
  "When are you coming?",
  "short"
 ],
 [
  "en",
  "Fine.",
  "short"
 ],
 [
  "en",
  "Noted.",
  "short"
 ],
 [
  "en",
  "Well done!",
  "short"
 ],
 [
  "en",
  "Bless you.",
  "short"
 ],
 [
  "en",
  "Didn't get that.",
  "short"
 ],
 [
  "en",
  "Of course.",
  "short"
 ],
 [
  "en",
  "Be right there.",
  "short"
 ],
 [
  "en",
  "Long story short, I'm running late.",
  "plain"
 ],
 [
  "en",
  "Let's talk tomorrow.",
  "short"
 ],
 [
  "en",
  "Mom, I'm home.",
  "short"
 ],
 [
  "en",
  "How much do I owe?",
  "question"
 ],
 [
  "en",
  "Bring your laptop.",
  "short"
 ],
 [
  "en",
  "Traffic is terrible.",
  "short"
 ],
 [
  "en",
  "Lunch at noon?",
  "short"
 ],
 [
  "en",
  "Kids are asleep.",
  "short"
 ],
 [
  "en",
  "Maybe later.",
  "short"
 ],
 [
  "en",
  "Running late, start without me.",
  "short"
 ],
 [
  "en",
  "I'm really tired today, let's talk tomorrow.",
  "plain"
 ],
 [
  "en",
  "We will solve this issue with the director.",
  "plain"
 ],
 [
  "en",
  "The bus was late, I will take a taxi.",
  "plain"
 ],
 [
  "en",
  "Exams have started at the university.",
  "plain"
 ],
 [
  "en",
  "Can you edit the video?",
  "question"
 ],
 [
  "en",
  "Thank you all so much!",
  "short"
 ],
 [
  "en",
  "Office address: 108 Amir Temur Street.",
  "address"
 ],
 [
  "en",
  "Take your time, there is no rush.",
  "plain"
 ],
 [
  "en",
  "The article is ready, please review it.",
  "plain"
 ],
 [
  "en",
  "Bakhtiyor, Oybek and Nodira will come in the evening.",
  "uz-names"
 ],
 [
  "en",
  "Put the tablet on charge.",
  "short"
 ],
 [
  "en",
  "Coffee?",
  "short"
 ],
 [
  "en",
  "My number is +998 90 123 45 67.",
  "number"
 ],
 [
  "ru",
  "Привези, пожалуйста, зарядку от ноутбука.",
  "ru2"
 ],
 [
  "ru",
  "Мы с коллегами обсудили новый план.",
  "ru2"
 ],
 [
  "ru",
  "Позвоните мне, когда освободитесь.",
  "ru2"
 ],
 [
  "ru",
  "Совещание переносится на четверг.",
  "ru2"
 ],
 [
  "ru",
  "Не забудь купить подарок маме.",
  "ru2"
 ],
 [
  "ru",
  "Я оплатил счёт за свет и газ.",
  "ru2"
 ],
 [
  "ru",
  "Давайте встретимся у метро.",
  "ru2"
 ],
 [
  "ru",
  "Сегодня работаю из дома.",
  "ru2"
 ],
 [
  "ru",
  "Посылка пришла, спасибо.",
  "ru2"
 ],
 [
  "ru",
  "Отправьте договор юристам на проверку.",
  "ru2"
 ],
 [
  "ru",
  "Он занимается этими вопросами уже год.",
  "ru2"
 ],
 [
  "ru",
  "Встречаемся с партнёрами в десять.",
  "ru2"
 ],
 [
  "ru",
  "Проверь почту, я отправил файлы.",
  "ru2"
 ],
 [
  "ru",
  "Курьер будет через час.",
  "ru2"
 ],
 [
  "ru",
  "Нужно поговорить с родителями.",
  "ru2"
 ],
 [
  "ru",
  "Поздравляю с повышением!",
  "ru2"
 ],
 [
  "ru",
  "Сколько стоит доставка?",
  "ru2"
 ],
 [
  "ru",
  "Пробки ужасные, опоздаю минут на двадцать.",
  "ru2"
 ],
 [
  "ru",
  "Оставь ключи у соседей.",
  "ru2"
 ],
 [
  "ru",
  "Дети уже поели?",
  "ru2"
 ],
 [
  "ru",
  "Купи по дороге фрукты и овощи.",
  "ru2"
 ],
 [
  "ru",
  "Работаем над новыми задачами.",
  "ru2"
 ],
 [
  "ru",
  "Перешли мне это сообщение.",
  "ru2"
 ],
 [
  "ru",
  "Я согласен с вами.",
  "ru2"
 ],
 [
  "ru",
  "Свяжитесь с нами по телефону.",
  "ru2"
 ],
 [
  "ru",
  "Заказ оформлен, ждите звонка.",
  "ru2"
 ],
 [
  "ru",
  "Подпишите документы и верните их нам.",
  "ru2"
 ],
 [
  "ru",
  "Сходим в кино на выходных?",
  "ru2"
 ],
 [
  "ru",
  "Сломалась стиральная машина.",
  "ru2"
 ],
 [
  "ru",
  "Мастер придёт завтра утром.",
  "ru2"
 ],
 [
  "ru",
  "Позвони бабушке, она скучает.",
  "ru2"
 ],
 [
  "ru",
  "Мы гордимся вами!",
  "ru2"
 ],
 [
  "ru",
  "Отличная работа, команда.",
  "ru2"
 ],
 [
  "ru",
  "Напомни мне про встречу.",
  "ru2"
 ],
 [
  "ru",
  "Встреча с инвесторами прошла хорошо.",
  "ru2"
 ],
 [
  "ru",
  "Сдал экзамен на отлично.",
  "ru2"
 ],
 [
  "ru",
  "Билеты куплены, вылет в шесть утра.",
  "ru2"
 ],
 [
  "ru",
  "Где ты оставил машину?",
  "ru2"
 ],
 [
  "ru",
  "Хочу заказать пиццу.",
  "ru2"
 ],
 [
  "ru",
  "Обсудим это с руководством.",
  "ru2"
 ],
 [
  "ru",
  "Пусть подождёт немного.",
  "ru2"
 ],
 [
  "ru",
  "Никто не отвечает на звонки.",
  "ru2"
 ],
 [
  "ru",
  "Зайду к вам после обеда.",
  "ru2"
 ],
 [
  "ru",
  "Поменяли пароль от вайфая.",
  "ru2"
 ],
 [
  "ru",
  "Уберите, пожалуйста, на кухне.",
  "ru2"
 ],
 [
  "ru",
  "Сегодня день рождения у Камолы.",
  "ru2"
 ],
 [
  "ru",
  "Возьми зонт, обещают дождь.",
  "ru2"
 ],
 [
  "ru",
  "Мне нужна справка с работы.",
  "ru2"
 ],
 [
  "ru",
  "Цены на бензин опять подняли.",
  "ru2"
 ],
 [
  "ru",
  "Помогите мне с переездом в субботу.",
  "ru2"
 ],
 [
  "ru",
  "Вчера гуляли с друзьями до ночи.",
  "ru2"
 ],
 [
  "ru",
  "Буду рад вас видеть.",
  "ru2"
 ],
 [
  "ru",
  "Поужинаем вместе?",
  "ru2"
 ],
 [
  "ru",
  "Скинь фотки с праздника.",
  "ru2"
 ],
 [
  "ru",
  "Занимаюсь спортом три раза в неделю.",
  "ru2"
 ],
 [
  "ru",
  "Шеф доволен результатами.",
  "ru2"
 ],
 [
  "ru",
  "Перезвоню через пять минут.",
  "ru2"
 ],
 [
  "ru",
  "Документы лежат на столе.",
  "ru2"
 ],
 [
  "ru",
  "Сейчас занят, напишу позже.",
  "ru2"
 ],
 [
  "ru",
  "Надо записать детей в бассейн.",
  "ru2"
 ]
];

export const HARD: ReadonlyArray<readonly [string, string, string]> = [
 [
  "ru",
  "Займусь этими вопросами завтра.",
  "ru-ami"
 ],
 [
  "ru",
  "Работаю с документами.",
  "ru-ami"
 ],
 [
  "ru",
  "Встретился с клиентами и партнёрами.",
  "ru-ami"
 ],
 [
  "ru",
  "Поделись с нами новостями.",
  "ru-ami"
 ],
 [
  "ru",
  "Мы сами разберёмся с ними.",
  "ru-ami"
 ],
 [
  "ru",
  "Поговори с коллегами перед встречей.",
  "ru-ami"
 ],
 [
  "ru",
  "Отдыхаем с друзьями на даче.",
  "ru-ami"
 ],
 [
  "ru",
  "Между нами говоря, проект провалился.",
  "ru-ami"
 ],
 [
  "ru",
  "Спорим с братьями каждый вечер.",
  "ru-ami"
 ],
 [
  "ru",
  "Свяжусь с вами позже.",
  "ru-ami"
 ],
 [
  "ru",
  "Займитесь этими задачами.",
  "ru-ami"
 ],
 [
  "ru",
  "Поздравляю всех с праздниками!",
  "ru-ami"
 ],
 [
  "ru",
  "Заплатил деньгами, а не картой.",
  "ru-ami"
 ],
 [
  "ru",
  "Следите за новостями.",
  "ru-ami"
 ],
 [
  "ru",
  "Поделитесь своими идеями.",
  "ru-ami"
 ],
 [
  "ru",
  "Мы гордимся нашими сотрудниками.",
  "ru-ami"
 ],
 [
  "ru",
  "Сами виноваты.",
  "ru-ami"
 ],
 [
  "ru",
  "Разберёмся с налогами в понедельник.",
  "ru-ami"
 ],
 [
  "ru",
  "Маркетинг и брифинг перенесли на среду.",
  "ru-ing"
 ],
 [
  "ru",
  "Завтра тренинг по продажам.",
  "ru-ing"
 ],
 [
  "ru",
  "Погода сегодня хорошая.",
  "ru-ga"
 ],
 [
  "ru",
  "Заходи в гости.",
  "ru-di"
 ],
 [
  "ru",
  "Дорога заняла два часа.",
  "ru-ga"
 ],
 [
  "ru",
  "Иногда опаздываю.",
  "ru-da"
 ],
 [
  "ru",
  "Среда подходит.",
  "ru-da"
 ],
 [
  "ru",
  "Приходи вечером, поговорим.",
  "ru-di"
 ],
 [
  "ru",
  "Курс доллара вырос.",
  "ru-lar"
 ],
 [
  "ru",
  "Сделал deploy на staging, проверь.",
  "ru-it"
 ],
 [
  "ru",
  "Скинь ссылку на google drive.",
  "ru-it"
 ],
 [
  "ru",
  "Обнови README и сделай merge в main.",
  "ru-it"
 ],
 [
  "ru",
  "Созвон в Google Meet через пять минут.",
  "ru-it"
 ],
 [
  "ru",
  "Отправь мне PDF и Excel файлы.",
  "ru-it"
 ],
 [
  "ru",
  "Закажи такси через Yandex Go.",
  "ru-it"
 ],
 [
  "ru",
  "Поставь лайк и подпишись на канал.",
  "ru-it"
 ],
 [
  "en",
  "Running late.",
  "en-ning"
 ],
 [
  "en",
  "Good evening.",
  "en-ning"
 ],
 [
  "en",
  "Planning session moved.",
  "en-ning"
 ],
 [
  "en",
  "Training starts Monday.",
  "en-ning"
 ],
 [
  "en",
  "Morning standup cancelled.",
  "en-ning"
 ],
 [
  "en",
  "Similar popular regular dollar.",
  "en-lar"
 ],
 [
  "en",
  "Human resources called.",
  "en-man"
 ],
 [
  "en",
  "Chairman approved it.",
  "en-man"
 ],
 [
  "en",
  "Opening hours changed.",
  "en-ning"
 ],
 [
  "en",
  "Learning Uzbek slowly.",
  "en-ning"
 ],
 [
  "en",
  "Burning question: lunch?",
  "en-ning"
 ],
 [
  "en",
  "Agenda attached.",
  "en-da"
 ],
 [
  "en",
  "Check the FAQ.",
  "en-q"
 ],
 [
  "en",
  "Next stop Chorsu.",
  "en-x"
 ],
 [
  "en",
  "Taxi ordered.",
  "en-x"
 ],
 [
  "en",
  "Kids sleeping.",
  "en-short"
 ],
 [
  "en",
  "Dinner ready.",
  "en-short"
 ],
 [
  "en",
  "Battery low.",
  "en-short"
 ],
 [
  "en",
  "Almost done.",
  "en-short"
 ],
 [
  "en",
  "Keys under mat.",
  "en-short"
 ],
 [
  "en",
  "Plans changed, sorry.",
  "en-short"
 ],
 [
  "en",
  "Big news!",
  "en-short"
 ],
 [
  "en",
  "Love you.",
  "en-short"
 ],
 [
  "en",
  "Miss you.",
  "en-short"
 ],
 [
  "en",
  "Landed safely.",
  "en-short"
 ],
 [
  "en",
  "Bring milk.",
  "en-short"
 ],
 [
  "en",
  "Calling in five.",
  "en-short"
 ],
 [
  "uz-latn",
  "Deadline juma kuni.",
  "uzl-codeswitch"
 ],
 [
  "uz-latn",
  "Meeting soat uchda.",
  "uzl-codeswitch"
 ],
 [
  "uz-latn",
  "Pull request ochdim, review qilib bering.",
  "uzl-codeswitch"
 ],
 [
  "uz-latn",
  "Okey, gaplashamiz.",
  "uzl-codeswitch"
 ],
 [
  "uz-latn",
  "Brat, qachon kelasan?",
  "uzl-chat"
 ],
 [
  "uz-latn",
  "Kelasizmi?",
  "uzl-mizmi"
 ],
 [
  "uz-latn",
  "Boramizmi?",
  "uzl-mizmi"
 ],
 [
  "uz-latn",
  "Tayyormisan?",
  "uzl-mizmi"
 ],
 [
  "uz-latn",
  "Charchadingmi?",
  "uzl-mizmi"
 ],
 [
  "uz-latn",
  "Ovqat yedingizmi?",
  "uzl-mizmi"
 ],
 [
  "uz-latn",
  "Ishlayapsanmi?",
  "uzl-mizmi"
 ],
 [
  "uz-latn",
  "OK, kutaman.",
  "uzl-short"
 ],
 [
  "uz-latn",
  "Tabriklayman!",
  "uzl-short"
 ],
 [
  "uz-latn",
  "Xavotir olmang.",
  "uzl-short"
 ],
 [
  "uz-latn",
  "Kechikyapman.",
  "uzl-short"
 ],
 [
  "uz-latn",
  "Chiqyapman.",
  "uzl-short"
 ],
 [
  "uz-latn",
  "Juda chiroyli.",
  "uzl-short"
 ],
 [
  "uz-latn",
  "Ajoyib!",
  "uzl-short"
 ],
 [
  "uz-latn",
  "Ovqat tayyor.",
  "uzl-short"
 ],
 [
  "uz-latn",
  "Sog'liq yaxshimi?",
  "uzl-short"
 ],
 [
  "uz-latn",
  "ERTAGA SOAT TO'QQIZDA.",
  "uzl-caps"
 ],
 [
  "uz-cyrl",
  "Келасизми?",
  "uzc-mizmi"
 ],
 [
  "uz-cyrl",
  "Борамизми?",
  "uzc-mizmi"
 ],
 [
  "uz-cyrl",
  "Тайёрмисан?",
  "uzc-mizmi"
 ],
 [
  "uz-cyrl",
  "Чарчадингми?",
  "uzc-mizmi"
 ],
 [
  "uz-cyrl",
  "Овқат едингизми?",
  "uzc-mizmi"
 ],
 [
  "uz-cyrl",
  "Табриклайман!",
  "uzc-short"
 ],
 [
  "uz-cyrl",
  "Хавотир олманг.",
  "uzc-short"
 ],
 [
  "uz-cyrl",
  "Кечикяпман.",
  "uzc-short"
 ],
 [
  "uz-cyrl",
  "Жуда чиройли.",
  "uzc-short"
 ],
 [
  "uz-cyrl",
  "Ажойиб!",
  "uzc-short"
 ],
 [
  "uz-cyrl",
  "Овқат тайёр.",
  "uzc-short"
 ],
 [
  "uz-cyrl",
  "Документларни директорга бериб юбордим.",
  "uzc-loan"
 ],
 [
  "uz-cyrl",
  "Сергей Петрович билан учрашдим.",
  "uzc-runame"
 ],
 [
  "uz-cyrl",
  "Деадлайн жума куни.",
  "uzc-codeswitch"
 ],
 [
  "uz-cyrl",
  "Pull request очдим, кўриб чиқинг.",
  "uzc-codeswitch"
 ],
 [
  "uz-cyrl",
  "ЭРТАГА СОАТ ТЎҚҚИЗДА.",
  "uzc-caps"
 ],
 [
  "ru",
  "Правда?",
  "ru-weak-first"
 ],
 [
  "ru",
  "Подожди.",
  "ru-weak-first"
 ],
 [
  "ru",
  "Никогда.",
  "ru-weak-first"
 ],
 [
  "ru",
  "Всегда.",
  "ru-weak-first"
 ],
 [
  "ru",
  "Иногда.",
  "ru-weak-first"
 ],
 [
  "ru",
  "Заходи.",
  "ru-weak-first"
 ],
 [
  "ru",
  "Уходи!",
  "ru-weak-first"
 ],
 [
  "ru",
  "Погоди.",
  "ru-weak-first"
 ],
 [
  "ru",
  "Подожди минутку.",
  "ru-weak-first"
 ],
 [
  "ru",
  "Погода отличная.",
  "ru-weak-first"
 ],
 [
  "ru",
  "Книга понравилась.",
  "ru-weak-first"
 ],
 [
  "ru",
  "Дорога свободна.",
  "ru-weak-first"
 ],
 [
  "ru",
  "Еда остыла.",
  "ru-weak-first"
 ],
 [
  "ru",
  "Вода закончилась.",
  "ru-weak-first"
 ],
 [
  "ru",
  "Правда, жаль.",
  "ru-weak-first"
 ],
 [
  "ru",
  "Проходи, садись.",
  "ru-weak-first"
 ],
 [
  "ru",
  "Выходи через пять минут.",
  "ru-weak-first"
 ],
 [
  "ru",
  "Среда или четверг?",
  "ru-weak-first"
 ],
 [
  "ru",
  "Звони вечером.",
  "ru-weak-first"
 ],
 [
  "ru",
  "Иду домой.",
  "ru-weak-first"
 ],
 [
  "ru",
  "Звезда упала.",
  "ru-weak-first"
 ],
 [
  "ru",
  "Брат приехал.",
  "ru-weak-first"
 ],
 [
  "ru",
  "Сестра приедет.",
  "ru-weak-first"
 ],
 [
  "ru",
  "Сломался кран.",
  "ru-weak-first"
 ],
 [
  "en",
  "Evening plans?",
  "en-weak-first"
 ],
 [
  "en",
  "Sedan delivered.",
  "en-weak-first"
 ],
 [
  "en",
  "Agenda changed.",
  "en-weak-first"
 ],
 [
  "en",
  "Yoga class at six.",
  "en-weak-first"
 ],
 [
  "en",
  "Training postponed.",
  "en-weak-first"
 ],
 [
  "en",
  "Next Monday.",
  "en-weak-first"
 ],
 [
  "en",
  "Text me.",
  "en-weak-first"
 ],
 [
  "en",
  "Fixed it.",
  "en-weak-first"
 ],
 [
  "en",
  "Relax, all good.",
  "en-weak-first"
 ],
 [
  "en",
  "Morning, team.",
  "en-weak-first"
 ],
 [
  "en",
  "Banking app crashed.",
  "en-weak-first"
 ],
 [
  "en",
  "Parking is full.",
  "en-weak-first"
 ],
 [
  "en",
  "Dinner at Oqtepa.",
  "en-weak-first"
 ],
 [
  "en",
  "Buying milk.",
  "en-weak-first"
 ],
 [
  "en",
  "Cleaning lady arrives at nine.",
  "en-weak-first"
 ],
 [
  "en",
  "Woman at the door.",
  "en-weak-first"
 ]
];
