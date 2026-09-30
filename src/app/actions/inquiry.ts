"use server";

import { z } from "zod";
import { BOOKING_WINDOW_DAYS, TIME_SLOTS, TZ_OFFSET_MS, slotAvailable, tashkentToday } from "@/lib/booking";

/**
 * Consultation booking — React 19 Server Action (useActionState).
 * Only uses `fetch` → runs on the Node or Edge runtime unchanged.
 * Delivery: Telegram bot when TELEGRAM_* env vars are set, otherwise logged.
 * Slots are validated in Tashkent time (UTC+5, no DST).
 */
const schema = z
  .object({
    type: z.enum(["residential", "commercial", "industrial", "infrastructure"]),
    services: z.array(z.enum(["design", "construction", "infrastructure", "interior"])).min(1),
    area: z.coerce.number().min(0).max(10_000_000).optional(),
    city: z.string().min(1).max(40),
    budget: z.string().max(40).optional(),
    message: z.string().trim().max(1000).optional(),
    format: z.enum(["office", "online", "site"]),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    time: z.enum(TIME_SLOTS),
    name: z.string().trim().min(2).max(80),
    phone: z
      .string()
      .transform((v) => v.replace(/\D/g, ""))
      .refine((v) => /^998\d{9}$/.test(v)),
    email: z.email().optional(),
  })
  .superRefine((d, ctx) => {
    const today = tashkentToday();
    const max = new Date(Date.now() + TZ_OFFSET_MS + BOOKING_WINDOW_DAYS * 864e5).toISOString().slice(0, 10);
    const sunday = new Date(`${d.date}T00:00:00Z`).getUTCDay() === 0;
    if (d.date < today || d.date > max || sunday || !slotAvailable(d.date, d.time)) {
      ctx.addIssue({ code: "custom", path: ["date"], message: "unavailable" });
    }
  });

export type InquiryState =
  | { status: "idle" }
  | { status: "success"; ticket: string; date: string; time: string; format: string }
  | { status: "error"; fields?: string[] };

export async function submitInquiry(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  // Honeypot: humans never see this field — pretend success so bots move on.
  if (formData.get("company_website")) return { status: "success", ticket: "AT-000000", date: "", time: "", format: "" };

  const parsed = schema.safeParse({
    type: formData.get("type"),
    services: formData.getAll("services"),
    area: formData.get("area") || undefined,
    city: formData.get("city"),
    budget: formData.get("budget") || undefined,
    message: formData.get("message") || undefined,
    format: formData.get("format"),
    date: formData.get("date"),
    time: formData.get("time"),
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email") || undefined,
  });
  if (!parsed.success) {
    return { status: "error", fields: [...new Set(parsed.error.issues.map((i) => String(i.path[0])))] };
  }

  const d = parsed.data;
  const ticket = `AT-${Date.now().toString(36).toUpperCase().slice(-6)}`;
  const text = [
    `🏗 Uchrashuv so‘rovi · ${ticket}`,
    `📅 ${d.date} ${d.time} (Toshkent) · ${d.format}`,
    `Ism: ${d.name}`,
    `Telefon: +${d.phone}${d.email ? ` · ${d.email}` : ""}`,
    `Obyekt: ${d.type} · ${d.services.join(", ")}`,
    `Shahar: ${d.city}${d.area ? ` · ${d.area} m²` : ""}${d.budget ? ` · ${d.budget}` : ""}`,
    d.message ? `Izoh: ${d.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (token && chatId) {
    try {
      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text }),
        cache: "no-store",
      });
      if (!res.ok) return { status: "error" };
    } catch {
      return { status: "error" };
    }
  } else {
    console.info("[inquiry]", text);
  }

  return { status: "success", ticket, date: d.date, time: d.time, format: d.format };
}
