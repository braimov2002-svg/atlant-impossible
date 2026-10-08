# OvozYoz — iPhone ilovasi va klaviaturasi

Telegram (va istalgan ilova) ichida klaviaturadagi 🎙 tugmasini bosasiz,
o'zbekcha gapirasiz — matn tanlangan tilda (o'zbekcha lotin/kirill, ruscha,
inglizcha) xabar maydoniga yoziladi. **Tarjima** tugmasi esa yozilgan matnni
(masalan, ruschani) shu joyning o'zida tanlangan tilga o'giradi.

## Qanday ishlaydi

- iPhone klaviaturalariga mikrofon berilmaydi (Apple qoidasi, Wispr Flow va
  boshqa ovozli klaviaturalarda ham shunday). Shuning uchun ovozni OvozYoz
  ilovasi yozadi, klaviatura esa uni boshqaradi.
- Mikrofon o'chiq bo'lsa, 🎙 ni birinchi bosganingizda OvozYoz bir lahzaga
  ochiladi va mikrofonni yoqadi. Chap yuqoridagi «◀ Telegram» ni bosib
  qaytasiz, yozish o'zi boshlanadi. Keyin mikrofon tayyor turadi
  (sozlamada: 10/30/60 daqiqa yoki o'zingiz o'chirguningizcha) — keyingi
  bosishlarda ilova ochilmaydi.
- Tarjima tugmasi ilovani ochmaydi.
- Til tekshiruvi web va kompyuter ilovalaridagi bilan bir xil kod
  (`packages/core`): iPhone'da u JavaScriptCore ichida ishlaydi. Natija
  tanlangan tilda chiqmasa, klaviatura uni o'zi qo'ymaydi, «Ruschaga o'girib
  bo'lmadi» deb so'raydi.
- Ovoz va matn faqat siz bosganingizda, sizning Google Gemini kalitingiz
  bilan to'g'ridan-to'g'ri Google'ga yuboriladi. Boshqa server yo'q.

## O'rnatish

Ilova hali App Store'da yo'q. Hozircha uch yo'l bor:

### 1. Mac + Xcode (bepul Apple ID bilan, 7 kun ishlaydi)

1. Mac'ga App Store'dan **Xcode** ni o'rnating (bepul).
2. GitHub'da: **Actions → iOS →** oxirgi yashil (✓) ishga tushirish →
   **Artifacts → OvozYoz-iOS** ni yuklab oling va oching. Ichidagi
   `OvozYoz-Xcode.zip` ni ham oching.
3. `OvozYoz/Config.xcconfig` faylini matn muharririda oching va
   `ismingiz` o'rniga o'zingizga xos so'z yozing:
   ```
   OY_BUNDLE_ID = uz.ovozyoz.ismingiz
   OY_APP_GROUP = group.uz.ovozyoz.ismingiz
   ```
4. `OvozYoz.xcodeproj` ni oching. **Xcode → Settings → Accounts → +** orqali
   Apple ID'ingiz bilan kiring.
5. Chapda **OvozYoz** loyihasini bosing. **OvozYoz** va **OvozYozKeyboard**
   nishonlarining har birida: **Signing & Capabilities → Team** dan
   o'zingizni (Personal Team) tanlang.
6. iPhone'ni kabel bilan ulang va «Ishonish» ni bosing. iPhone'da
   **Sozlamalar → Maxfiylik va xavfsizlik → Dasturchi rejimi** ni yoqing
   (telefon qayta yonadi).
7. Xcode tepasida iPhone'ingizni tanlang va ▶ (Run) ni bosing.
8. Birinchi marta iPhone'da: **Sozlamalar → Asosiy → VPN va qurilmani
   boshqarish →** Apple ID'ingiz → **Ishonish**.

Bepul Apple ID bilan o'rnatilgan ilova 7 kundan keyin ochilmay qoladi:
Mac'da yana ▶ ni bosing.

### 2. Sideloadly (Windows yoki Mac, bepul Apple ID, 7 kun)

**Artifacts → OvozYoz-iOS** ichidagi `OvozYoz-unsigned.ipa` ni
[Sideloadly](https://sideloadly.io) ga tashlang, Apple ID'ingizni yozing va
**Start** ni bosing. Agar klaviaturada «To'liq ruxsat» yoqilgan bo'lsa-yu,
🎙 baribir ishlamasa, Sideloadly ilova va klaviatura orasidagi umumiy
papkani (App Group) sozlay olmagan bo'ladi: 1-yo'ldan foydalaning.

### 3. TestFlight (Apple Developer Program, yiliga $99)

Hisob ochilgach, ilova TestFlight orqali havola bilan o'rnatiladi, har hafta
yangilash shart emas, obunachilarga ham berish mumkin. Buning uchun GitHub
Actions'ga yuklash qadami qo'shiladi.

## Birinchi sozlash (ilova ichida, 2 daqiqa)

1. Rozilik: ovoz va matn Google Gemini'ga yuboriladi.
2. Mikrofonga ruxsat.
3. Gemini kaliti: **Kalitni olish** → Google AI Studio'da «Create API key» →
   nusxalang → ilovada **Joylash** → **Tekshirish**.
4. Klaviaturani yoqish: **Sozlamalar → OvozYoz → Klaviaturalar →** OvozYoz
   ni yoqing va **To'liq ruxsat (Allow Full Access)** ni yoqing.
   Bu ogohlantirish har qanday klaviaturada chiqadi; OvozYoz siz yozgan
   harflarni hech qayerga yubormaydi, faqat 🎙 yoki «Tarjima» bosilganda.
5. Matn tilini tanlang va Telegram'da sinab ko'ring: xabar maydoni → 🌐 →
   OvozYoz → 🎙.

## Dasturchilar uchun

```
node apps/ios/scripts/build-core.mjs   # packages/core → Shared/Resources/ovozyoz-core.js
node apps/ios/scripts/test-core.mjs    # bundle'ni bo'sh JS muhitida sinash
cd apps/ios/OvozYoz && xcodegen generate && open OvozYoz.xcodeproj
```

- `core/` — JavaScriptCore uchun kirish nuqtasi va web API o'rinbosarlari.
- `OvozYoz/Shared/` — ilova va klaviatura uchun umumiy: `CoreBridge`
  (JSContext + URLSession), App Group sozlamalari, ilova ↔ klaviatura
  buyruqlari (Darwin bildirishnomalari), WAV.
- `OvozYoz/App/` — SwiftUI ilova: mikrofon sessiyasi, sozlash, tarix.
- `OvozYoz/Keyboard/` — UIKit klaviatura; `Keyboard/Logic/` dagi UIKit'siz
  mantiq ilova testlarida ham sinaladi.
- CI: `.github/workflows/ios.yml` — simulyatorda testlar, imzosiz qurilma
  yig'ilishi, IPA va Xcode loyihasi artefaktlari.
