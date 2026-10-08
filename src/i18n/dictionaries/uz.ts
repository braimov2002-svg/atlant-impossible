/**
 * Uzbek (Latin) copy for every page. Typography: oʻ/gʻ use U+2018 (‘) and the
 * tutuq belgisi uses U+2019 (’) — both exist in every font we load.
 *
 * SOURCE: every company fact here comes from agcg.uz (home, /about,
 * /partnership and ens.agcg.uz/mission, read through their search-indexed
 * text because the site itself is blocked from the build environment).
 * Nothing is invented: no sample projects, dates, prices or history.
 * See README → "Content" for what still needs confirming with Atlant.
 */
const uz = {
  meta: {
    title: "Atlant Group of Companies — biz kelajakni yaratamiz",
    description:
      "Qurilish, muhandislik, logistika va savdo sohalarini birlashtirgan kompaniyalar guruhi. Loyihalash va qurilishdan yetkazib berish va avtomatlashtirishgacha — to‘liq sikl. Toshkent, O‘zbekiston.",
    pages: {
      projects: "Loyihalar — Atlant Group of Companies",
      services: "Xizmatlar — Atlant Group of Companies",
      about: "Kompaniya guruhi haqida — Atlant Group of Companies",
    },
  },
  nav: {
    items: [
      { href: "", label: "Bosh sahifa" },
      { href: "/about", label: "Kompaniya guruhi" },
      { href: "/services", label: "Xizmatlar" },
      { href: "/projects", label: "Loyihalar" },
      { href: "#contact", label: "Aloqa" },
    ],
    cta: "Bog‘lanish",
    menu: "Menyu",
    close: "Yopish",
  },
  common: {
    readMore: "Batafsil",
    years: "Yillar",
    scope: "Ish hajmi",
  },

  hero: {
    eyebrow: "Atlant Group of Companies · Toshkent",
    titleA: "Biz kelajakni yaratamiz,",
    titleB: "muvaffaqiyatga erishamiz!",
    lead: "Qurilish, muhandislik, logistika va savdo sohalarining yetakchi ishtirokchilarini birlashtirgan kompaniyalar guruhi. Loyihalash va qurilishdan yetkazib berish va avtomatlashtirishgacha — to‘liq sikl.",
    ctaPrimary: "Kompaniya guruhi haqida",
    ctaSecondary: "Loyiha bo‘yicha so‘rov",
    sectorsLabel: "Faoliyat yo‘nalishlari",
    sectors: ["Qurilish", "Muhandislik", "Logistika", "Savdo"],
    scroll: "Pastga",
  },

  /** Group-wide figures as published on agcg.uz. */
  figures: [
    { value: 1200, suffix: "+", label: "Amalga oshirilgan loyihalar" },
    { value: 50, suffix: "+", label: "Muvaffaqiyatli hamkorlik" },
    { value: 4, suffix: "", label: "Faoliyat yo‘nalishi" },
  ],

  group: {
    eyebrow: "Kompaniya guruhi",
    title: "Yetakchi ishtirokchilar —",
    accent: "bitta guruhda",
    description:
      "AGC — qurilish, muhandislik, logistika va savdo sohalarining asosiy ishtirokchilarini birlashtirgan, jadal rivojlanayotgan kompaniyalar guruhi. Yillar davomida to‘plangan tajriba va professionallik mijozlarimizga yuqori sifatli xizmat, innovatsion yechimlar va strategik hamkorlikni kafolatlaydi.",
    missionLabel: "Missiyamiz",
    mission:
      "Hamkorlarimizga muvaffaqiyatli biznes qurish va eng yuqori maqsadlarga erishishda yordam beradigan samarali, texnologik va barqaror yechimlarni yaratish va rivojlantirish.",
    companies: [
      {
        id: "atlant-construction",
        name: "Atlant Construction",
        sector: "Qurilish",
        text: "Turar-joy majmualaridan noyob tijorat va sanoat obyektlarigacha — har qanday murakkablikdagi vazifalarni bajaramiz. Faqat yuqori sifatli materiallar va ilg‘or qurilish texnologiyalari.",
      },
      {
        id: "ens",
        name: "ENS",
        sector: "Muhandislik",
        text: "Zamonaviy muhandislik tizimlarini loyihalash, ishlab chiqish va joriy etish. Maqsad — nafaqat mahsulot yetkazish, balki aniqlik, ishonchlilik va jarayonlarni optimallashtirish orqali mijoz muvaffaqiyatiga hissa qo‘shish.",
      },
      {
        id: "deal-zone-imex",
        name: "Deal Zone Imex",
        sector: "Savdo va logistika",
        text: "Guruhning savdo va logistika kompaniyasi: tashqi iqtisodiy faoliyat, tovarlarni import va eksport qilish.",
      },
    ],
  },

  cycle: {
    eyebrow: "To‘liq sikl",
    title: "Loyihalashdan",
    accent: "avtomatlashtirishgacha",
    description: "Biznes ehtiyojlarini qamrab oluvchi xizmatlarning to‘liq sikli: bitta guruh, bitta mas’uliyat.",
    steps: [
      { title: "Loyihalash", text: "Mijoz vazifasi va obyekt sharoitidan kelib chiqqan holda optimal yechim." },
      { title: "Qurilish", text: "Turar-joy, tijorat, sanoat va logistika obyektlari — har qanday murakkablikda." },
      { title: "Yetkazib berish va jihozlash", text: "Texnologik jihozlarni yetkazib berish va obyektni kalit topshirish." },
      { title: "Avtomatlashtirish", text: "Boshqaruv va monitoring tizimlari — yetakchi sanoat brendlari bilan hamkorlikda." },
    ],
    scopeLabel: "Har qanday murakkablikdagi obyektlar",
    scope: ["Turar-joy majmualari", "Tijorat obyektlari", "Sanoat obyektlari", "Logistika majmualari"],
  },

  projects: {
    eyebrow: "Loyihalar",
    title: "Rahbarligimizda",
    accent: "ishga tushirilgan loyihalar",
    description: "Yirik qurilish loyihalari: loyihalashdan jihozlarni kalit topshirishgacha.",
    viewAll: "Barcha loyihalar",
    items: [
      {
        id: "lift",
        name: "«Lift» logistika majmuasi",
        category: "Yirik qurilish loyihasi · Logistika",
        years: "2021–2024",
        scope: ["Loyihalash", "Qurilish", "Jihozlarni kalit topshirish"],
        text: "Logistika majmuasi to‘liq sikl bo‘yicha: loyihalash, qurilish va jihozlarni kalit topshirish sharti bilan yetkazib berish.",
        image: null as string | null,
      },
      {
        id: "balton-warehouse",
        name: "Balton ombori",
        category: "Yakunlangan loyiha · Ombor",
        years: null as string | null,
        scope: ["Muhandislik tizimlari · ENS"],
        text: "Guruhning muhandislik kompaniyasi ENS tomonidan yakunlangan loyihalar qatorida.",
        image: null as string | null,
      },
    ],
  },

  partners: {
    eyebrow: "Hamkorlar",
    title: "50+ muvaffaqiyatli",
    accent: "hamkorlik",
    description:
      "Neft-gaz, metallurgiya, og‘ir texnika, sanoat avtomatikasi, kimyo, moliya va chakana savdo sohalarining yetakchilari bilan ishlaymiz.",
    names: [
      "LUKOIL Uzbekistan",
      "Siemens",
      "Hyundai",
      "BASF",
      "ISUZU",
      "XCMG",
      "JCB",
      "Zoomlion",
      "Endress+Hauser",
      "WIKA",
      "Emerson",
      "KAESER Kompressoren",
      "Donaldson",
      "Pall",
      "Toshkent quvur zavodi",
      "Tashkent INDEX",
      "TCT Cluster",
      "Binokor Temir Beton Servis",
      "Ipoteka-bank",
      "Korzinka",
      "Balton Asia",
      "Computrols",
      "Export Plus",
      "VED-Center",
      "Navobod Naslli Parranda",
      "Zahna-Fliesen",
    ],
  },

  principles: {
    eyebrow: "Tamoyillarimiz",
    title: "Nimaga",
    accent: "tayanamiz",
    items: [
      { title: "Sifat", text: "Faqat yuqori sifatli materiallar va ilg‘or qurilish texnologiyalari — obyektlarning uzoq muddatliligi va xavfsizligi uchun." },
      { title: "Moslashuvchanlik", text: "Mijozning har qanday talab va istaklariga moslashamiz, turli obyekt va sharoitlar uchun optimal yechim topamiz." },
      { title: "Ishonchlilik", text: "Zamonaviy muhandislik tizimlarini loyihalash, ishlab chiqish va joriy etishda ishonchli hamkor." },
      { title: "Barqarorlik", text: "Samarali, texnologik va barqaror yechimlar — hamkorlarimiz biznesining barqaror rivoji uchun." },
    ],
  },

  contact: {
    eyebrow: "Aloqa",
    title: "Loyihangizni",
    accent: "muhokama qilamiz",
    description: "To‘rt qadam: obyekt, tafsilotlar, qulay vaqt va aloqa ma’lumotlari. Loyiha menejerimiz siz bilan bog‘lanadi.",
    perks: ["Loyiha menejeri bilan uchrashuv", "Ofisda, onlayn yoki obyektda", "Toshkent vaqti · UTC+5"],
    hq: "Bosh ofis",
    city: "Toshkent, O‘zbekiston",
    steps: ["Obyekt", "Tafsilotlar", "Uchrashuv", "Aloqa"],
    types: { residential: "Turar-joy", commercial: "Tijorat", industrial: "Sanoat", logistics: "Logistika" },
    step1: { title: "Qanday obyekt rejalashtiryapsiz?", type: "Obyekt turi", services: "Kerakli xizmatlar", hint: "Bir nechtasini tanlash mumkin" },
    services: [
      { id: "design", label: "Loyihalash" },
      { id: "construction", label: "Qurilish" },
      { id: "engineering", label: "Muhandislik tizimlari" },
      { id: "equipment", label: "Jihozlarni yetkazib berish" },
      { id: "automation", label: "Avtomatlashtirish" },
      { id: "trade", label: "Logistika, import va eksport" },
    ],
    step2: {
      title: "Loyiha tafsilotlari",
      area: "Taxminiy maydon (m²)",
      city: "Hudud",
      regions: [
        "Toshkent shahri",
        "Toshkent viloyati",
        "Andijon viloyati",
        "Buxoro viloyati",
        "Farg‘ona viloyati",
        "Jizzax viloyati",
        "Xorazm viloyati",
        "Namangan viloyati",
        "Navoiy viloyati",
        "Qashqadaryo viloyati",
        "Qoraqalpog‘iston Respublikasi",
        "Samarqand viloyati",
        "Sirdaryo viloyati",
        "Surxondaryo viloyati",
        "O‘zbekistondan tashqarida",
      ],
      budget: "Taxminiy byudjet",
      budgets: ["$1 mln gacha", "$1–10 mln", "$10–50 mln", "$50 mln dan yuqori"],
      message: "Qisqacha tavsif (ixtiyoriy)",
    },
    step3: {
      title: "Qulay vaqtni tanlang",
      format: "Uchrashuv formati",
      formats: { office: "Ofisda", online: "Onlayn", site: "Obyektda" },
      date: "Sana",
      time: "Vaqt (Toshkent, UTC+5)",
      weekdays: ["Ya", "Du", "Se", "Ch", "Pa", "Ju", "Sh"],
      months: ["yan", "fev", "mar", "apr", "may", "iyn", "iyl", "avg", "sen", "okt", "noy", "dek"],
      closed: "Yakshanba — dam olish kuni",
    },
    step4: { title: "Aloqa ma’lumotlari", name: "Ism va familiya", company: "Kompaniya (ixtiyoriy)", phone: "Telefon", email: "Email (ixtiyoriy)" },
    next: "Keyingi",
    back: "Orqaga",
    submit: "So‘rov yuborish",
    sending: "Yuborilmoqda…",
    success: {
      title: "So‘rovingiz qabul qilindi",
      body: "Loyiha menejerimiz uchrashuv vaqtini tasdiqlash uchun siz bilan bog‘lanadi.",
      calendar: "Kalendarga qo‘shish (.ics)",
      again: "Yangi so‘rov",
      icsSummary: "Atlant Group — loyiha bo‘yicha uchrashuv",
    },
    errors: {
      type: "Obyekt turini tanlang",
      services: "Kamida bitta xizmatni tanlang",
      city: "Hududni tanlang",
      slot: "Sana va vaqtni tanlang",
      name: "Ismingizni kiriting",
      phone: "Telefon raqamini to‘liq kiriting",
      email: "Email manzili noto‘g‘ri",
      generic: "Xatolik yuz berdi. Iltimos, qaytadan urinib ko‘ring yoki bizga qo‘ng‘iroq qiling.",
    },
  },

  projectsPage: {
    eyebrow: "Loyihalar",
    title: "Yirik loyihalar —",
    accent: "loyihalashdan kalit topshirishgacha",
    description:
      "Turar-joy majmualaridan noyob tijorat va sanoat obyektlarigacha: guruh kompaniyalari 1200 dan ortiq loyihani amalga oshirgan.",
  },
  servicesPage: {
    eyebrow: "Xizmatlar",
    title: "Qurilish, muhandislik,",
    accent: "logistika va savdo",
    description: "Guruh kompaniyalari biznes ehtiyojlarini to‘liq sikl bo‘yicha qamrab oladi — loyihalash va qurilishdan yetkazib berish va avtomatlashtirishgacha.",
    services: [
      {
        id: "construction",
        company: "Atlant Construction",
        title: "Qurilish",
        text: "Turar-joy majmualaridan noyob tijorat va sanoat obyektlarigacha — har qanday murakkablikdagi loyihalarni amalga oshiramiz. Obyektlarning uzoq muddatliligi va xavfsizligi uchun faqat yuqori sifatli materiallar va ilg‘or texnologiyalar.",
        points: ["Turar-joy majmualari", "Tijorat obyektlari", "Sanoat obyektlari", "Logistika majmualari"],
      },
      {
        id: "engineering",
        company: "ENS",
        title: "Muhandislik tizimlari",
        text: "Zamonaviy muhandislik tizimlarini loyihalash, ishlab chiqish va joriy etish — har bir mijozning ehtiyoj va vazifalaridan kelib chiqib. Aniqlik, ishonchlilik va jarayonlarni optimallashtirish.",
        points: ["Loyihalash", "Ishlab chiqish", "Joriy etish", "Jarayonlarni optimallashtirish"],
      },
      {
        id: "equipment",
        company: "Atlant Group",
        title: "Jihozlash va kalit topshirish",
        text: "Texnologik jihozlarni yetkazib berish va obyektni kalit topshirish — loyihalash va qurilish bilan bitta jamoa tomonidan. «Lift» logistika majmuasi (2021–2024) aynan shu modelda bajarilgan.",
        points: ["Jihozlarni yetkazib berish", "O‘rnatish va ishga tushirish", "Kalit topshirish"],
      },
      {
        id: "automation",
        company: "Atlant Group",
        title: "Avtomatlashtirish",
        text: "Xizmatlar sikli boshqaruv va monitoring tizimlari bilan yakunlanadi — sanoat avtomatikasi va o‘lchash texnikasining yetakchi ishlab chiqaruvchilari bilan hamkorlikda.",
        points: ["Boshqaruv tizimlari", "Monitoring", "Sanoat avtomatikasi"],
      },
      {
        id: "trade",
        company: "Deal Zone Imex",
        title: "Logistika va savdo",
        text: "Guruhning savdo va logistika kompaniyasi: tashqi iqtisodiy faoliyat, tovarlarni import va eksport qilish, loyihalar uchun ta’minot.",
        points: ["Import va eksport", "Logistika", "Loyiha ta’minoti"],
      },
    ],
  },
  aboutPage: {
    eyebrow: "Kompaniya guruhi haqida",
    title: "Biz kelajakni yaratamiz,",
    accent: "muvaffaqiyatga erishamiz",
    description:
      "Atlant Group of Companies (AGC) — qurilish, muhandislik, logistika va savdo sohalarining yetakchi ishtirokchilarini birlashtirgan, jadal rivojlanayotgan kompaniyalar guruhi. Mijozlarimiz g‘oyalari va loyihalarini hayotga tatbiq etamiz.",
  },
  cta: {
    title: "Keyingi yirik loyihani birga quramiz",
    button: "Loyiha bo‘yicha so‘rov",
  },
  footer: {
    tagline: "Biz kelajakni yaratamiz, muvaffaqiyatga erishamiz! Qurilish, muhandislik, logistika va savdo — bitta guruhda.",
    pages: "Sahifalar",
    contact: "Aloqa",
    rights: "Barcha huquqlar himoyalangan.",
    backToTop: "Yuqoriga",
  },
  notFound: { title: "Sahifa topilmadi", back: "Bosh sahifaga" },
};

export type Dictionary = typeof uz;
export default uz;
