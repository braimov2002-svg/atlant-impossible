/**
 * Booking helpers shared by the inquiry form (client) and the server action.
 * Everything is computed in Tashkent time (UTC+5, no daylight saving).
 */
export const TIME_SLOTS = ["10:00", "11:30", "14:00", "15:30", "17:00"] as const;
export type TimeSlot = (typeof TIME_SLOTS)[number];

export const TZ_OFFSET_MS = 5 * 3600 * 1000;
export const BOOKING_WINDOW_DAYS = 60;

/** Tashkent wall-clock "now" as a Date whose UTC fields hold local time. */
export const tashkentNow = () => new Date(Date.now() + TZ_OFFSET_MS);
export const tashkentToday = () => tashkentNow().toISOString().slice(0, 10);

export interface BookingDay {
  iso: string;
  day: number;
  month: number;
  weekday: number;
  closed: boolean;
}

/** Next `count` calendar days (Sunday is closed). */
export function upcomingDays(count = 14): BookingDay[] {
  const base = tashkentNow();
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(Date.UTC(base.getUTCFullYear(), base.getUTCMonth(), base.getUTCDate() + i));
    return {
      iso: d.toISOString().slice(0, 10),
      day: d.getUTCDate(),
      month: d.getUTCMonth(),
      weekday: d.getUTCDay(),
      closed: d.getUTCDay() === 0,
    };
  });
}

/** A slot is bookable if it starts at least 2 h from now (Tashkent time). */
export function slotAvailable(iso: string, slot: TimeSlot) {
  const [h, m] = slot.split(":").map(Number);
  const start = Date.parse(`${iso}T${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00Z`) - TZ_OFFSET_MS;
  return start - Date.now() > 2 * 3600 * 1000;
}

/** RFC 5545 calendar invite with an explicit Asia/Tashkent VTIMEZONE. */
export function buildIcs({ ticket, date, time, summary, description }: { ticket: string; date: string; time: string; summary: string; description: string }) {
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const start = `${date.replace(/-/g, "")}T${time.replace(":", "")}00`;
  const esc = (s: string) => s.replace(/[\\;,]/g, (c) => `\\${c}`).replace(/\n/g, "\\n");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Atlant Group of Companies//Consultation//UZ",
    "CALSCALE:GREGORIAN",
    "BEGIN:VTIMEZONE",
    "TZID:Asia/Tashkent",
    "BEGIN:STANDARD",
    "DTSTART:19700101T000000",
    "TZOFFSETFROM:+0500",
    "TZOFFSETTO:+0500",
    "TZNAME:+05",
    "END:STANDARD",
    "END:VTIMEZONE",
    "BEGIN:VEVENT",
    `UID:${ticket}@agcg.uz`,
    `DTSTAMP:${stamp}`,
    `DTSTART;TZID=Asia/Tashkent:${start}`,
    "DURATION:PT1H",
    `SUMMARY:${esc(summary)}`,
    `DESCRIPTION:${esc(description)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
