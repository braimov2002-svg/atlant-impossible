"use server";

import { z } from "zod";

/**
 * Consultation request — React 19 Server Action consumed with useActionState.
 * Uses only `fetch`, so it runs unchanged on the Node or Edge runtime.
 * Delivery: Telegram bot (if TELEGRAM_* env vars are set), otherwise logged.
 */
const schema = z.object({
  services: z.array(z.enum(["audit", "irrigation", "greenhouse", "investment"])).min(1),
  region: z.string().min(1).max(40),
  area: z.coerce.number().min(0).max(1_000_000).optional(),
  crop: z.string().max(40).optional(),
  name: z.string().trim().min(2).max(80),
  // +998 XX XXX XX XX → 12 digits
  phone: z
    .string()
    .transform((v) => v.replace(/\D/g, ""))
    .refine((v) => /^998\d{9}$/.test(v)),
  channel: z.enum(["telegram", "whatsapp", "call"]),
  message: z.string().trim().max(1000).optional(),
});

export type ConsultationState =
  | { status: "idle" }
  | { status: "success"; ticket: string }
  | { status: "error"; fields?: string[] };

export async function submitConsultation(
  _prev: ConsultationState,
  formData: FormData,
): Promise<ConsultationState> {
  // Honeypot: humans never see this field — pretend success so bots move on.
  if (formData.get("company_website")) return { status: "success", ticket: "AG-000000" };

  const parsed = schema.safeParse({
    services: formData.getAll("services"),
    region: formData.get("region"),
    area: formData.get("area") || undefined,
    crop: formData.get("crop") || undefined,
    name: formData.get("name"),
    phone: formData.get("phone"),
    channel: formData.get("channel"),
    message: formData.get("message") || undefined,
  });

  if (!parsed.success) {
    return { status: "error", fields: [...new Set(parsed.error.issues.map((i) => String(i.path[0])))] };
  }

  const ticket = `AG-${Date.now().toString(36).toUpperCase().slice(-6)}`;
  const d = parsed.data;
  const text = [
    `🌱 Yangi konsultatsiya so‘rovi · ${ticket}`,
    `Ism: ${d.name}`,
    `Telefon: +${d.phone}`,
    `Aloqa: ${d.channel}`,
    `Yo‘nalish: ${d.services.join(", ")}`,
    `Hudud: ${d.region}${d.area ? ` · ${d.area} ga` : ""}${d.crop ? ` · ${d.crop}` : ""}`,
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
    console.info("[consultation]", text);
  }

  return { status: "success", ticket };
}
