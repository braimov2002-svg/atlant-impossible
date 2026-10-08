# OvozYoz — gapiring, matn o'zi yozilsin

**OvozYoz** — o'zbekcha (yoki ruscha, inglizcha) gapirganingizni matnga aylantiradigan dastur.
Matn qaysi tilda chiqishini o'zingiz tanlaysiz:

| Siz gapirasiz | Matn chiqadi |
| --- | --- |
| O'zbekcha, ruscha, inglizcha yoki aralash | **O'zbekcha (lotin)**, **Ўзбекча (кирилл)**, **Русский** yoki **English** |

Masalan, o'zbekcha gapirib, matnni darhol ruscha yoki inglizcha olishingiz mumkin. Dastur tarjimani o'zi qiladi.

Dastur ikki xil ko'rinishda ishlaydi:

- **Kompyuter (Mac va Windows):** istalgan dasturda (Telegram, Word, brauzer...) `⌃⌥D` (Windows'da `Ctrl+Alt+D`) bosib gapirasiz. Qayta bosganingizda matn kursor turgan joyga o'zi yoziladi.
- **Telefon (iPhone va Android):** veb-ilova. Mikrofon tugmasini bosib gapirasiz, matn chiqadi va avtomatik nusxalanadi. Keyin istalgan ilovaga joylaysiz.

---

## 1-qadam. Bepul API kalit oling (bir marta)

Ovozni matnga aylantirishni sun'iy intellekt xizmati bajaradi. Standart xizmat — **Google Gemini**. Uning bepul limiti bor.

1. [aistudio.google.com/apikey](https://aistudio.google.com/apikey) sahifasini oching va Google hisobingiz bilan kiring.
2. **Create API key** tugmasini bosing.
3. `AIza...` bilan boshlanadigan kalitni nusxalang va OvozYoz sozlamalariga joylang.

> **Maxfiylik:** Google bepul tarifdagi so'rovlardan o'z xizmatlarini yaxshilash uchun foydalanishi mumkin. Shaxsiy yoki maxfiy matnlar uchun Google AI Studio'da to'lovni (billing) yoqing yoki OpenAI kalitidan foydalaning.
> Kalit faqat sizning qurilmangizda saqlanadi: kompyuterda tizim shifrlashi bilan, telefonda brauzer xotirasida.

Xohlasangiz, sozlamalarda **OpenAI** xizmatini tanlashingiz ham mumkin (pullik, `sk-...` kalit).

---

## 2-qadam. Kompyuterga o'rnatish

O'rnatuvchilar **Releases** sahifasida: [eng so'nggi versiya](https://github.com/braimov2002-svg/atlant-impossible/releases/latest). Veb-ilova sahifasining pastida ham «macOS uchun» / «Windows uchun» tugmalari bor.

- macOS: [`OvozYoz-mac.dmg`](https://github.com/braimov2002-svg/atlant-impossible/releases/latest/download/OvozYoz-mac.dmg) (Apple Silicon va Intel uchun bitta fayl)
- Windows: [`OvozYoz-Windows-Setup.exe`](https://github.com/braimov2002-svg/atlant-impossible/releases/latest/download/OvozYoz-Windows-Setup.exe)

### macOS (13 Ventura va undan yangi)

Dastur Apple sertifikati bilan imzolanmagan, shuning uchun birinchi ochishda quyidagilarni bajaring:

1. `OvozYoz-mac.dmg` faylni oching va **OvozYoz**ni **Applications** papkasiga torting.
2. OvozYoz'ni oching. Ogohlantirish chiqsa, **Done** ni bosing.
3. **System Settings → Privacy & Security** bo'limiga o'ting va pastdagi **Open Anyway** tugmasini bosing. Parolni kiriting.
4. Agar «OvozYoz is damaged» degan xabar chiqsa, **Terminal**da quyidagini bajaring va dasturni qayta oching:
   ```
   xattr -dr com.apple.quarantine /Applications/OvozYoz.app
   ```
5. Ruxsatlarni bering:
   - **Mikrofon** — birinchi yozishda so'raladi.
   - **Accessibility (Universal access)** — matnni avtomatik joylash uchun kerak: **System Settings → Privacy & Security → Accessibility** bo'limida OvozYoz'ni yoqing.
   - **Automation → System Events** — birinchi joylashda so'raladi, **Allow** ni bosing.

> Yangi versiyani o'rnatgandan keyin matn joylanmay qolsa, OvozYoz'ni Accessibility ro'yxatidan «–» bilan olib tashlang va qayta qo'shing. Imzosiz dasturlarda macOS ruxsatlarni shunday qayta so'raydi.

### Windows 10 / 11

1. `OvozYoz-Windows-Setup.exe` ni ishga tushiring.
2. «Windows protected your PC» chiqsa, **More info → Run anyway** ni bosing.
3. Administrator huquqi kerak emas. Dastur o'rnatilib, o'zi ochiladi.

> Windows 11'da **Smart App Control** yoqilgan bo'lsa, imzosiz dasturlarni umuman ochib bo'lmaydi.

### Kompyuterda ishlatish

| Amal | macOS | Windows |
| --- | --- | --- |
| Yozishni boshlash / to'xtatish | `⌃⌥D` (Control+Option+D) | `Ctrl+Alt+D` |
| Bekor qilish (yozish paytida) | `Esc` | `Esc` |
| Matn tilini almashtirish | `⌃⌥L` | `Ctrl+Alt+L` |

1. Matn yozmoqchi bo'lgan joyga bosing (masalan, Telegram'dagi xabar maydoni).
2. `⌃⌥D` ni bosing. Ekran pastida **«Yozilmoqda... (yana ⌃⌥D)»** oynachasi chiqadi.
3. Gapiring, keyin `⌃⌥D` ni yana bosing. **«Matnga o'girilmoqda...»** chiqadi va bir-ikki soniyada matn kursor turgan joyga yoziladi.

- Til, xizmat va tugmalarni menyu panelidagi (Windows'da tray'dagi) **🎙 OvozYoz** belgisidan o'zgartirasiz.
- **Oxirgi matnni nusxalash** bandi matn joylanmay qolgan holatlar uchun.
- Gapirayotganda **«vergul»**, **«nuqta»**, **«so'roq belgisi»**, **«yangi qator»** desangiz, dastur so'zni emas, belgining o'zini qo'yadi.

---

## 3-qadam. Telefonda ishlatish (iPhone va Android)

Veb-ilovani brauzerda oching. Repozitoriy egasi GitHub Pages'ni yoqqanidan keyin manzil:
`https://braimov2002-svg.github.io/atlant-impossible/`

1. Sahifani oching, ⚙️ **Sozlamalar** ga kiring va API kalitni joylang.
   > Kalit brauzer xotirasida saqlanadi. `*.github.io` manzilida bir egasining barcha saytlari shu xotirani bo'lishadi. Shuning uchun pullik kalitni faqat o'zingizning domeningizdagi nusxada ishlating yoki Google AI Studio'da kalitni faqat Gemini API va shu sayt manzili bilan cheklang.
2. Ilova kabi ishlatish uchun:
   - **iPhone (Safari):** **Ulashish** → **Bosh ekranga** (Add to Home Screen).
   - **Android (Chrome):** ⋮ menyu → **Ilovani o'rnatish** / **Bosh ekranga qo'shish**.
3. «Men gapiraman» va «Matn qaysi tilda chiqsin» ni tanlang.
4. Katta mikrofon tugmasini bosing, gapiring va yana bosing. Matn chiqadi va **avtomatik nusxalanadi**. Uni Telegram yoki boshqa ilovaga joylashingiz mumkin. **Ulashish** tugmasi matnni to'g'ridan-to'g'ri yuboradi.

---

## Dasturchilar uchun

```
apps/desktop   Electron ilova (macOS + Windows): tray, global tugma, HUD, avtomatik joylash
apps/web       Next.js 16 PWA (telefon va brauzer), statik eksport
packages/core  Umumiy yadro: ovoz yozish, 16 kHz WAV, Gemini/OpenAI, tillar, xatolar
scripts/       Ikonkalar va sinov audiosini yaratish
```

```bash
npm ci                     # Node 24 (npm 11) tavsiya etiladi
npm test                   # unit testlar
npm run typecheck
npm run dev:web            # veb-ilova: http://localhost:3000
npm run build:web && npm run e2e:web           # Chromium'da e2e (soxta mikrofon)
npm run start -w @ovozyoz/desktop              # kompyuter ilovasini ishga tushirish
npm run dist -w @ovozyoz/desktop -- --mac      # .dmg (faqat macOS'da)
npm run dist -w @ovozyoz/desktop -- --win      # .exe (faqat Windows'da)
```

**CI** (`.github/workflows/ci.yml`) har push'da testlarni, veb e2e'ni va Electron smoke testini ishga tushiradi, keyin macOS va Windows o'rnatuvchilarini yig'adi.

- **Reliz:** `apps/desktop/package.json` dagi `version` ni oshirib `main` ga push qiling: CI `v<versiya>` relizini o'zi yaratadi va fayllar **Releases** sahifasiga chiqadi. `v0.2.0` kabi teg push qilish ham mumkin (teg versiya bilan bir xil bo'lishi kerak).
- **Veb-ilovani joylash:** **Settings → Pages → Source: GitHub Actions** ni bir marta yoqing. Shundan keyin `main` branchga har push qilinganda sayt yangilanadi.

### Ma'lum cheklovlar

- O'rnatuvchilar imzolanmagan. Apple Developer ID va Windows kod imzosi qo'shilsa, ogohlantirishlar yo'qoladi.
- macOS'da VoiceOver `⌃⌥` tugmalarini ishlatadi. VoiceOver foydalanuvchilari sozlamalarda boshqa tugma tanlasin.
- Ilova internet orqali ishlaydi, oflayn rejim yo'q. O'zbek tilida aniqlik tanlangan xizmat va modelga bog'liq.
- iPhone klaviaturasi mikrofonga ruxsat bermaydi, shuning uchun telefonda matn nusxalash/ulashish orqali joylanadi.

---

*Atlant Group — Создаем будущее, строим успех!*
