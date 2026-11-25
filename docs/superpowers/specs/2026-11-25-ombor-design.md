# Омбор бошқаруви (Atlant Construction) — design

## Intent
Replace the «АС материал» Excel workbook with a phone-first web system for
ООО «Atlant Construction»: material requests (заявка), supply and payment
approval, and goods receipt (приход). Several people use it at once, each
with a login and password, at a free web address.

## Goals
- Заявка → payment approval → receipt flow, as in the owner's mockup:
  `Жараёнда` → `Тўлов тасдиқланди` → `Қабул қилинди`.
- Приход journal with the workbook's columns.
- Management view: receipt totals and payments by period, per-object spend,
  Excel report.
- Import of the workbook's `Приход` and `заявка` sheets.
- Uzbek (Cyrillic) and Russian interface, chosen per user.
- The company banner on the login and home screens.

## Non-goals (owner's decision)
- No расход, остаток or накладной: only the Приход and Заявка parts of the
  workbook are taken.
- No offline entry.

## Anti-goals
- Company purchase data must never be committed to the repository; it is
  imported through the app by an admin.

## Approaches
1. Windows desktop app, local file — rejected by the owner (needs phones,
   several users).
2. Static site + hosted database service (Supabase/Firebase) — free projects
   pause when idle, and access rules live in a third-party console.
3. **Cloudflare Worker + D1 + static assets (chosen, my call).** One free
   deployment at `*.workers.dev`, does not sleep, server-side auth we own.

## Roles
| Role | Can |
|---|---|
| admin | everything, users, Excel import, delete |
| warehouse (омборчи) | requests, receive into приход, приход journal |
| supply (снабженец) | requests, create payments, mark paid |
| boss (раҳбар) | approve/reject payments, mark paid, objects, reports |

Everyone signed in can read everything.

## Flow
1. A request (number `АС-NNN-MM-YYYY`, NNN restarts each month) is created
   with an object and items (name, unit, qty, place of use, work, who
   ordered, executor). Status `open`.
2. Supply adds a payment (supplier, amount) → `pending`. Boss approves or
   rejects. First approval moves the request to `approved`.
   Approved payments are later marked `paid`.
3. Warehouse receives items (qty, price, supplier, invoice, vehicle). Each
   line becomes a приход row linked to the request item. When every item is
   fully received the request becomes `received`; warehouse may also close
   it early.

## Calls I made
- Payments are created by supply and approved by the boss (owner did not
  object).
- Receiving is allowed in any status (materials sometimes arrive before
  paperwork).
- In the workbook the «Код материала» column holds a request number or an
  object name. On import, `АС-…` stays a request number; anything else
  becomes the row's object (`SHERON…` → Шерон, `KUCHLIK…` → Кучлик).
- PDF is the browser's print dialog with a print layout.
- Sessions: 30-day HttpOnly cookie; passwords PBKDF2-SHA256, 100 000 rounds.
