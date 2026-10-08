// Realistic dictation/chat outputs from the language-check reviews.
// [language the text is written in, text, tag]. "neutral" = no language (numbers, brands).
export const CORPUS: ReadonlyArray<readonly [string, string, string]> = [
 [
  "uz-latn",
  "Salom!",
  "short"
 ],
 [
  "uz-latn",
  "Xo'p, tushundim.",
  "short"
 ],
 [
  "uz-latn",
  "Ha, albatta.",
  "short"
 ],
 [
  "uz-latn",
  "Qayerdasiz?",
  "question"
 ],
 [
  "uz-latn",
  "Hozir kelaman.",
  "short"
 ],
 [
  "uz-latn",
  "Ertaga soat 9:30 da uchrashamiz.",
  "time"
 ],
 [
  "uz-latn",
  "Narxi 150 000 so'm.",
  "price"
 ],
 [
  "uz-latn",
  "Bu telefon necha pul?",
  "loan/question"
 ],
 [
  "uz-latn",
  "Kompyuterim buzilib qoldi, ustaga olib boraman.",
  "loan"
 ],
 [
  "uz-latn",
  "Mashinani yuvdirib keldim.",
  "loan"
 ],
 [
  "uz-latn",
  "Toshkent shahri, Chilonzor tumani, 12-kvartal, 5-uy.",
  "address"
 ],
 [
  "uz-latn",
  "Onamga telefon qilib qo'ying.",
  "loan"
 ],
 [
  "uz-latn",
  "Bugun havo juda issiq ekan.",
  "plain"
 ],
 [
  "uz-latn",
  "Ozbekiston gozal mamlakat.",
  "no-apostrophe"
 ],
 [
  "uz-latn",
  "Men ozbek tilini yaxshi bilaman.",
  "no-apostrophe"
 ],
 [
  "uz-latn",
  "Togri aytasiz, boladi.",
  "no-apostrophe"
 ],
 [
  "uz-latn",
  "Dars soat uchda boshlanadi.",
  "plain"
 ],
 [
  "uz-latn",
  "Tug'ilgan kuningiz bilan tabriklayman! 🎉",
  "emoji"
 ],
 [
  "uz-latn",
  "HUJJATLARNI TAYYORLANG!",
  "caps"
 ],
 [
  "uz-latn",
  "ERTAGA SOAT 10 DA MAJLIS BOR",
  "caps"
 ],
 [
  "uz-latn",
  "Uyga kech qaytaman, kutmanglar.",
  "plain"
 ],
 [
  "uz-latn",
  "Do'konga borib non olib kel.",
  "plain"
 ],
 [
  "uz-latn",
  "Internet ishlamayapti.",
  "loan"
 ],
 [
  "uz-latn",
  "Menga 50 dollar qarz berib turing.",
  "price"
 ],
 [
  "uz-latn",
  "Kim keladi?",
  "question"
 ],
 [
  "uz-latn",
  "Ishlar yaxshimi?",
  "question"
 ],
 [
  "uz-latn",
  "Bolalar maktabga ketishdi.",
  "plain"
 ],
 [
  "uz-latn",
  "Rahmat, hammasi joyida.",
  "plain"
 ],
 [
  "uz-latn",
  "Shanba kuni to'yga boramiz.\nSiz ham keling.",
  "linebreak"
 ],
 [
  "uz-latn",
  "Yo'lda tirbandlik bor, 20 daqiqa kechikaman.",
  "time"
 ],
 [
  "uz-latn",
  "Avtobus bekatida kutib turaman.",
  "loan"
 ],
 [
  "uz-latn",
  "Ovqat tayyor, keling.",
  "plain"
 ],
 [
  "uz-latn",
  "Samarqandga poyezdda ketyapmiz.",
  "plain"
 ],
 [
  "uz-latn",
  "Dushanba kuni ishga chiqaman.",
  "plain"
 ],
 [
  "uz-latn",
  "Yangi kvartira ijaraga oldik.",
  "loan"
 ],
 [
  "uz-latn",
  "Doktorga yozildim.",
  "loan"
 ],
 [
  "uz-latn",
  "Telefonimning zaryadkasi tugadi.",
  "loan"
 ],
 [
  "uz-latn",
  "Mashina remontga ketdi.",
  "loan"
 ],
 [
  "uz-latn",
  "Mayli",
  "short"
 ],
 [
  "uz-latn",
  "Tushunarli",
  "short"
 ],
 [
  "uz-latn",
  "Kelyapman",
  "short"
 ],
 [
  "uz-latn",
  "Albatta",
  "short"
 ],
 [
  "uz-latn",
  "Kechirasiz",
  "short"
 ],
 [
  "uz-latn",
  "Qachon?",
  "short/question"
 ],
 [
  "uz-latn",
  "Necha pul?",
  "short/question"
 ],
 [
  "uz-latn",
  "Zo‘r! 👍",
  "short/emoji"
 ],
 [
  "uz-latn",
  "Narxi $25, yetkazib berish bepul.",
  "price"
 ],
 [
  "uz-latn",
  "Manzil: Yunusobod 4-mavze, 17-uy, 45-xonadon.",
  "address"
 ],
 [
  "uz-latn",
  "Chilonzor tumani, 12-kvartal, 5-uy, Toshkent",
  "address"
 ],
 [
  "uz-latn",
  "Keldimi?",
  "mi-question"
 ],
 [
  "uz-latn",
  "Pul tushdimi?",
  "mi-question"
 ],
 [
  "uz-latn",
  "Ona ishda",
  "collision"
 ],
 [
  "uz-latn",
  "Dars 9 da boshlanadi",
  "collision"
 ],
 [
  "uz-latn",
  "OMAD TILAYMAN",
  "caps"
 ],
 [
  "uz-latn",
  "AKA, PULNI QACHON BERASIZ?",
  "caps"
 ],
 [
  "uz-cyrl",
  "Салом!",
  "short"
 ],
 [
  "uz-cyrl",
  "Хўп, тушундим.",
  "short"
 ],
 [
  "uz-cyrl",
  "Ҳа, албатта.",
  "short"
 ],
 [
  "uz-cyrl",
  "Қаердасиз?",
  "question"
 ],
 [
  "uz-cyrl",
  "Ҳозир келаман.",
  "short"
 ],
 [
  "uz-cyrl",
  "Эртага соат 9:30 да учрашамиз.",
  "time"
 ],
 [
  "uz-cyrl",
  "Нархи 150 000 сўм.",
  "price"
 ],
 [
  "uz-cyrl",
  "Бу телефон неча пул?",
  "loan/question"
 ],
 [
  "uz-cyrl",
  "Компьютерим бузилиб қолди, устага олиб бораман.",
  "loan"
 ],
 [
  "uz-cyrl",
  "Машинани ювдириб келдим.",
  "loan/no-oqgh"
 ],
 [
  "uz-cyrl",
  "Тошкент шаҳри, Чилонзор тумани, 12-квартал, 5-уй.",
  "address"
 ],
 [
  "uz-cyrl",
  "Онамга телефон қилиб қўйинг.",
  "loan"
 ],
 [
  "uz-cyrl",
  "Бугун ҳаво жуда иссиқ экан.",
  "plain"
 ],
 [
  "uz-cyrl",
  "Дарс соат учда бошланади.",
  "no-oqgh"
 ],
 [
  "uz-cyrl",
  "Туғилган кунингиз билан табриклайман! 🎉",
  "emoji"
 ],
 [
  "uz-cyrl",
  "ҲУЖЖАТЛАРНИ ТАЙЁРЛАНГ!",
  "caps"
 ],
 [
  "uz-cyrl",
  "ЭРТАГА СОАТ 10 ДА МАЖЛИС БОР",
  "caps/no-oqgh"
 ],
 [
  "uz-cyrl",
  "Уйга кеч қайтаман, кутманглар.",
  "plain"
 ],
 [
  "uz-cyrl",
  "Интернет ишламаяпти.",
  "loan/no-oqgh"
 ],
 [
  "uz-cyrl",
  "Менга 50 доллар қарз бериб туринг.",
  "price"
 ],
 [
  "uz-cyrl",
  "Ким келади?",
  "question/no-oqgh"
 ],
 [
  "uz-cyrl",
  "Ишлар яхшими?",
  "question/no-oqgh"
 ],
 [
  "uz-cyrl",
  "Болалар мактабга кетишди.",
  "no-oqgh"
 ],
 [
  "uz-cyrl",
  "Раҳмат, ҳаммаси жойида.",
  "plain"
 ],
 [
  "uz-cyrl",
  "Шанба куни тўйга борамиз.\nСиз ҳам келинг.",
  "linebreak"
 ],
 [
  "uz-cyrl",
  "Йўлда тирбандлик бор, 20 дақиқа кечикаман.",
  "time"
 ],
 [
  "uz-cyrl",
  "Автобус бекатида кутиб тураман.",
  "loan/no-oqgh"
 ],
 [
  "uz-cyrl",
  "Овқат тайёр, келинг.",
  "plain"
 ],
 [
  "uz-cyrl",
  "Самарқандга поездда кетяпмиз.",
  "plain"
 ],
 [
  "uz-cyrl",
  "Душанба куни ишга чиқаман.",
  "plain"
 ],
 [
  "uz-cyrl",
  "Янги квартира ижарага олдик.",
  "loan/no-oqgh"
 ],
 [
  "uz-cyrl",
  "Докторга ёзилдим.",
  "loan/no-oqgh"
 ],
 [
  "uz-cyrl",
  "Телефонимнинг зарядкаси тугади.",
  "loan/no-oqgh"
 ],
 [
  "uz-cyrl",
  "Машина ремонтга кетди.",
  "loan/no-oqgh"
 ],
 [
  "uz-cyrl",
  "Майли",
  "short/no-oqgh"
 ],
 [
  "uz-cyrl",
  "Тушунарли",
  "short/no-oqgh"
 ],
 [
  "uz-cyrl",
  "Келяпман",
  "short/no-oqgh"
 ],
 [
  "uz-cyrl",
  "Албатта",
  "short/no-oqgh"
 ],
 [
  "uz-cyrl",
  "Кечирасиз",
  "short/no-oqgh"
 ],
 [
  "uz-cyrl",
  "Қачон?",
  "short/question"
 ],
 [
  "uz-cyrl",
  "Неча пул?",
  "short/question/no-oqgh"
 ],
 [
  "uz-cyrl",
  "Зўр! 👍",
  "short/emoji"
 ],
 [
  "uz-cyrl",
  "Нархи $25, етказиб бериш бепул.",
  "price/no-oqgh"
 ],
 [
  "uz-cyrl",
  "Манзил: Юнусобод 4-мавзе, 17-уй, 45-хонадон.",
  "address/no-oqgh"
 ],
 [
  "uz-cyrl",
  "Мен сени севаман",
  "no-oqgh"
 ],
 [
  "uz-cyrl",
  "Яхши, кейин гаплашамиз",
  "no-oqgh"
 ],
 [
  "uz-cyrl",
  "Пулни ким беради?",
  "question/no-oqgh"
 ],
 [
  "uz-cyrl",
  "Онам касал, дорихонага бориб келаман.",
  "no-oqgh"
 ],
 [
  "uz-cyrl",
  "Келдими?",
  "mi-question"
 ],
 [
  "uz-cyrl",
  "Пул тушдими?",
  "mi-question"
 ],
 [
  "uz-cyrl",
  "Она ишда",
  "collision"
 ],
 [
  "uz-cyrl",
  "Дарс 9 да бошланади",
  "collision"
 ],
 [
  "uz-cyrl",
  "ОМАД ТИЛАЙМАН",
  "caps"
 ],
 [
  "uz-cyrl",
  "АКА, ПУЛНИ ҚАЧОН БЕРАСИЗ?",
  "caps"
 ],
 [
  "ru",
  "Привет!",
  "short"
 ],
 [
  "ru",
  "Хорошо, понял.",
  "short"
 ],
 [
  "ru",
  "Да, конечно.",
  "short"
 ],
 [
  "ru",
  "Где вы?",
  "question"
 ],
 [
  "ru",
  "Сейчас приду.",
  "short"
 ],
 [
  "ru",
  "Встретимся завтра в 9:30.",
  "time"
 ],
 [
  "ru",
  "Цена 150 000 сумов.",
  "price"
 ],
 [
  "ru",
  "Сколько стоит этот телефон?",
  "question"
 ],
 [
  "ru",
  "Мой компьютер сломался, отнесу мастеру.",
  "plain"
 ],
 [
  "ru",
  "Ташкент, Чиланзарский район, 12-й квартал, дом 5.",
  "address"
 ],
 [
  "ru",
  "Позвоните, пожалуйста, маме.",
  "plain"
 ],
 [
  "ru",
  "Сегодня очень жарко.",
  "plain"
 ],
 [
  "ru",
  "Урок начинается в три часа.",
  "time"
 ],
 [
  "ru",
  "С днём рождения! 🎉",
  "emoji"
 ],
 [
  "ru",
  "ПОДГОТОВЬТЕ ДОКУМЕНТЫ!",
  "caps"
 ],
 [
  "ru",
  "СРОЧНО ПЕРЕЗВОНИТЕ",
  "caps"
 ],
 [
  "ru",
  "Вернусь домой поздно, не ждите.",
  "plain"
 ],
 [
  "ru",
  "Интернет не работает.",
  "plain"
 ],
 [
  "ru",
  "Одолжи мне 50 долларов.",
  "price"
 ],
 [
  "ru",
  "Кто придёт?",
  "question"
 ],
 [
  "ru",
  "Как дела?",
  "question"
 ],
 [
  "ru",
  "Дети ушли в школу.",
  "plain"
 ],
 [
  "ru",
  "Спасибо, всё в порядке.",
  "plain"
 ],
 [
  "ru",
  "В субботу идём на свадьбу.\nВы тоже приходите.",
  "linebreak"
 ],
 [
  "ru",
  "На дороге пробка, опоздаю на 20 минут.",
  "time"
 ],
 [
  "ru",
  "Жду на автобусной остановке.",
  "plain"
 ],
 [
  "ru",
  "Еда готова, проходите.",
  "plain"
 ],
 [
  "ru",
  "Едем в Самарканд на поезде.",
  "plain"
 ],
 [
  "ru",
  "Акмаль и Дильноза приедут завтра.",
  "uz-names"
 ],
 [
  "ru",
  "Передай Шухрату, что встреча в понедельник.",
  "uz-names"
 ],
 [
  "ru",
  "Рустам ака, документы у Гульнары.",
  "uz-names"
 ],
 [
  "ru",
  "Скинь мне номер Улугбека",
  "uz-names"
 ],
 [
  "ru",
  "Дилшод Каримов, Юнусабадский район, дом 17.",
  "uz-names/address"
 ],
 [
  "ru",
  "Записался к врачу.",
  "plain"
 ],
 [
  "ru",
  "Сняли новую квартиру.",
  "plain"
 ],
 [
  "ru",
  "Ладно, потом поговорим",
  "short"
 ],
 [
  "ru",
  "Отлично",
  "short"
 ],
 [
  "ru",
  "Понятно",
  "short"
 ],
 [
  "ru",
  "Скинь адрес",
  "short"
 ],
 [
  "ru",
  "Иду",
  "short"
 ],
 [
  "ru",
  "Когда?",
  "short/question"
 ],
 [
  "ru",
  "Сколько?",
  "short/question"
 ],
 [
  "ru",
  "Цена $25, доставка бесплатная.",
  "price"
 ],
 [
  "ru",
  "Машина в ремонте.",
  "loan-shared"
 ],
 [
  "ru",
  "Телефон разрядился.",
  "plain"
 ],
 [
  "ru",
  "Шоҳрух, позвони мне.",
  "name-first"
 ],
 [
  "ru",
  "Ғайрат опоздает.",
  "name-first"
 ],
 [
  "ru",
  "СОБРАНИЕ ОТМЕНЯЕТСЯ",
  "caps"
 ],
 [
  "ru",
  "Машина сломалась",
  "plain"
 ],
 [
  "ru",
  "Конечно",
  "short"
 ],
 [
  "en",
  "Hi!",
  "short"
 ],
 [
  "en",
  "Okay, got it.",
  "short"
 ],
 [
  "en",
  "Yes, of course.",
  "short"
 ],
 [
  "en",
  "Where are you?",
  "question"
 ],
 [
  "en",
  "I'll be right there.",
  "short"
 ],
 [
  "en",
  "Let's meet tomorrow at 9:30.",
  "time"
 ],
 [
  "en",
  "The price is 150,000 so'm.",
  "price"
 ],
 [
  "en",
  "Total: 150 000 so'm",
  "price"
 ],
 [
  "en",
  "How much is this phone?",
  "question"
 ],
 [
  "en",
  "My computer broke down, I'll take it to a repair shop.",
  "plain"
 ],
 [
  "en",
  "Chilanzar district, block 12, house 5, Tashkent.",
  "address"
 ],
 [
  "en",
  "Please call mom.",
  "plain"
 ],
 [
  "en",
  "It's very hot today.",
  "plain"
 ],
 [
  "en",
  "Class starts at three.",
  "time"
 ],
 [
  "en",
  "Happy birthday! 🎉",
  "emoji"
 ],
 [
  "en",
  "PREPARE THE DOCUMENTS!",
  "caps"
 ],
 [
  "en",
  "CALL ME ASAP",
  "caps"
 ],
 [
  "en",
  "I'll be home late, don't wait up.",
  "plain"
 ],
 [
  "en",
  "The internet is down.",
  "plain"
 ],
 [
  "en",
  "Lend me $50.",
  "price"
 ],
 [
  "en",
  "Who's coming?",
  "question"
 ],
 [
  "en",
  "How are you?",
  "question"
 ],
 [
  "en",
  "The kids went to school.",
  "plain"
 ],
 [
  "en",
  "Thanks, everything is fine.",
  "plain"
 ],
 [
  "en",
  "We're going to a wedding on Saturday.\nYou should come too.",
  "linebreak"
 ],
 [
  "en",
  "Traffic jam, I'll be 20 minutes late.",
  "time"
 ],
 [
  "en",
  "Waiting at the bus stop.",
  "plain"
 ],
 [
  "en",
  "Dinner is ready, come in.",
  "plain"
 ],
 [
  "en",
  "We're taking the train to Samarkand.",
  "uz-places"
 ],
 [
  "en",
  "Qarshi is far from here.",
  "uz-places"
 ],
 [
  "en",
  "Qo'qon is beautiful in spring.",
  "uz-places"
 ],
 [
  "en",
  "Farg'ona valley grows the best apricots.",
  "uz-places"
 ],
 [
  "en",
  "Xorazm melons are famous.",
  "uz-places"
 ],
 [
  "en",
  "Meet me near Chorsu bazaar.",
  "uz-places"
 ],
 [
  "en",
  "Flight to Bukhara lands at 18:40.",
  "uz-places/time"
 ],
 [
  "en",
  "Call Shukhrat about the Namangan order.",
  "uz-names"
 ],
 [
  "en",
  "Sounds good",
  "short"
 ],
 [
  "en",
  "Sure",
  "short"
 ],
 [
  "en",
  "Thanks",
  "short"
 ],
 [
  "en",
  "Noted",
  "short"
 ],
 [
  "en",
  "On my way",
  "short"
 ],
 [
  "en",
  "When?",
  "short/question"
 ],
 [
  "en",
  "How much?",
  "short/question"
 ],
 [
  "en",
  "Great! 👍",
  "short/emoji"
 ],
 [
  "en",
  "Price $25, free delivery.",
  "price"
 ],
 [
  "en",
  "Address: Yunusobod 4, building 17, apartment 45.",
  "address-uz-names"
 ],
 [
  "en",
  "Ulugʻbek is late.",
  "name-first"
 ],
 [
  "en",
  "Gʻayrat agreed.",
  "name-first"
 ],
 [
  "en",
  "HAPPY NEW YEAR",
  "caps"
 ],
 [
  "en",
  "MERRY CHRISTMAS",
  "caps"
 ]
];
