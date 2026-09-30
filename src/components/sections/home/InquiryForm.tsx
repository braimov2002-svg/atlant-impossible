"use client";

import { useActionState, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Building, Check, Download, Factory, House, LoaderCircle, MapPin, Route, Send, Video } from "lucide-react";
import { submitInquiry, type InquiryState } from "@/app/actions/inquiry";
import { Button, ButtonShimmer } from "@/components/ui/button";
import { TIME_SLOTS, buildIcs, slotAvailable, upcomingDays, type TimeSlot } from "@/lib/booking";
import { CITIES } from "@/data/projects";
import { EASE_OUT_EXPO, stepSlide } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/i18n/dictionaries/uz";

type T = Dictionary["contact"];
type ObjType = "residential" | "commercial" | "industrial" | "infrastructure";
type Format = "office" | "online" | "site";

interface Draft {
  type: ObjType | "";
  services: string[];
  area: string;
  city: string;
  budget: string;
  message: string;
  format: Format;
  date: string;
  time: TimeSlot | "";
  name: string;
  phone: string; // 9 national digits
  email: string;
}

const EMPTY: Draft = { type: "", services: [], area: "", city: "", budget: "", message: "", format: "office", date: "", time: "", name: "", phone: "", email: "" };
const TYPE_ICONS: Record<ObjType, typeof House> = { residential: House, commercial: Building, industrial: Factory, infrastructure: Route };
const FORMAT_ICONS: Record<Format, typeof House> = { office: Building, online: Video, site: MapPin };
const formatPhone = (d: string) => [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean).join(" ");

export function InquiryForm({ t, types, cities }: { t: T; types: Record<ObjType, string>; cities: Record<string, string> }) {
  const [state, formAction, pending] = useActionState<InquiryState, FormData>(submitInquiry, { status: "idle" });
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState<Draft>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Draft, string>>>({});
  const [dismissed, setDismissed] = useState<string | null>(null);
  const [resetKey, setResetKey] = useState(0);
  const days = useMemo(() => upcomingDays(14), []);

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = (s: number) => {
    const e: typeof errors = {};
    if (s === 0) {
      if (!data.type) e.type = t.errors.type;
      if (!data.services.length) e.services = t.errors.services;
    }
    if (s === 1 && !data.city) e.city = t.errors.city;
    if (s === 2 && (!data.date || !data.time)) e.date = t.errors.slot;
    if (s === 3) {
      if (data.name.trim().length < 2) e.name = t.errors.name;
      if (data.phone.length !== 9) e.phone = t.errors.phone;
      if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) e.email = t.errors.email;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const go = (d: 1 | -1) => {
    if (d === 1 && !validate(step)) return;
    setDir(d);
    setStep((s) => s + d);
  };

  if (state.status === "success" && state.ticket !== dismissed) {
    const download = () => {
      const ics = buildIcs({
        ticket: state.ticket,
        date: state.date,
        time: state.time,
        summary: "Atlant Construction — arxitektor bilan uchrashuv",
        description: `${t.step3.formats[state.format as Format] ?? ""} · #${state.ticket}`,
      });
      const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
      const a = Object.assign(document.createElement("a"), { href: url, download: `atlant-${state.ticket}.ics` });
      a.click();
      URL.revokeObjectURL(url);
    };
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        className="flex min-h-[480px] flex-col items-center justify-center text-center"
      >
        <svg viewBox="0 0 80 80" className="h-20 w-20" aria-hidden>
          <motion.circle cx="40" cy="40" r="36" fill="none" stroke="#00f0ff" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, ease: EASE_OUT_EXPO }} />
          <motion.path d="M25 41 L36 52 L56 30" fill="none" stroke="#e2b859" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.6, ease: EASE_OUT_EXPO }} />
        </svg>
        <h3 className="font-sharp mt-6 text-2xl font-light text-mist">{t.success.title}</h3>
        <p className="mt-3 max-w-sm text-steel">{t.success.body}</p>
        <p className="mt-5 rounded-2xl border border-line px-5 py-3 font-mono text-sm text-mist">
          <span className="text-gold">{state.date}</span> · {state.time} · <span className="text-cyan">#{state.ticket}</span>
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button onClick={download}>
            <Download /> {t.success.calendar}
          </Button>
          <Button
            variant="glass"
            onClick={() => {
              setData(EMPTY);
              setStep(0);
              setDismissed(state.ticket);
              setResetKey((k) => k + 1);
            }}
          >
            {t.success.again}
          </Button>
        </div>
      </motion.div>
    );
  }

  const last = t.steps.length - 1;

  return (
    <form
      key={resetKey}
      action={formAction}
      noValidate
      onSubmit={(e) => {
        if (step < last || !validate(last)) {
          e.preventDefault();
          if (step < last) go(1);
        }
      }}
      className="flex min-h-[480px] flex-col"
    >
      {/* Serialised draft */}
      <input type="hidden" name="type" value={data.type} />
      {data.services.map((s) => (
        <input key={s} type="hidden" name="services" value={s} />
      ))}
      {(["area", "city", "budget", "message", "format", "date", "time", "name", "email"] as const).map((k) => (
        <input key={k} type="hidden" name={k} value={data[k]} />
      ))}
      <input type="hidden" name="phone" value={`998${data.phone}`} />
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="absolute -left-[9999px] h-0 w-0 opacity-0" aria-hidden />

      <ol className="mb-8 grid grid-cols-4 gap-2">
        {t.steps.map((label, i) => (
          <li key={label}>
            <div className="h-1 overflow-hidden rounded-full bg-titanium-800">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-gold to-cyan"
                animate={{ width: i < step ? "100%" : i === step ? "50%" : "0%" }}
                transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
              />
            </div>
            <p className={cn("mt-2 truncate font-mono text-[9.5px] tracking-[0.14em] uppercase", i <= step ? "text-mist" : "text-slate")}>
              0{i + 1} · {label}
            </p>
          </li>
        ))}
      </ol>

      <div className="relative flex-1">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div key={step} custom={dir} variants={stepSlide} initial="enter" animate="center" exit="exit">
            {step === 0 && (
              <Step title={t.step1.title}>
                <Label>{t.step1.type}</Label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {(Object.keys(types) as ObjType[]).map((k) => {
                    const Icon = TYPE_ICONS[k];
                    const on = data.type === k;
                    return (
                      <Choice key={k} on={on} onClick={() => set("type", k)} role="radio">
                        <Icon className={cn("h-5 w-5", on ? "text-gold" : "text-cyan/80")} />
                        {types[k]}
                      </Choice>
                    );
                  })}
                </div>
                <FieldError msg={errors.type} />
                <Label className="mt-6">
                  {t.step1.services} <span className="text-slate normal-case">· {t.step1.hint}</span>
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {t.services.map((s) => {
                    const on = data.services.includes(s.id);
                    return (
                      <button
                        key={s.id}
                        type="button"
                        aria-pressed={on}
                        onClick={() => set("services", on ? data.services.filter((x) => x !== s.id) : [...data.services, s.id])}
                        className={cn(
                          "flex items-center justify-between gap-2 rounded-xl border px-4 py-3 text-left text-sm transition-all",
                          on ? "border-gold/60 bg-gold/10 text-gold-soft" : "border-line text-steel hover:border-cyan/40 hover:text-mist",
                        )}
                      >
                        {s.label}
                        <span className={cn("flex h-5 w-5 items-center justify-center rounded-full border", on ? "border-gold bg-gold text-obsidian-900" : "border-line")}>
                          {on && <Check className="h-3 w-3" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <FieldError msg={errors.services} />
              </Step>
            )}

            {step === 1 && (
              <Step title={t.step2.title}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label={t.step2.city} error={errors.city}>
                    <select value={data.city} onChange={(e) => set("city", e.target.value)} className={inputCls(!!errors.city)} aria-invalid={!!errors.city}>
                      <option value="">—</option>
                      {CITIES.map((c) => (
                        <option key={c.id} value={cities[c.id]}>
                          {cities[c.id]}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label={t.step2.area}>
                    <input type="number" inputMode="numeric" min={0} value={data.area} onChange={(e) => set("area", e.target.value)} className={inputCls(false)} placeholder="12 000" />
                  </Field>
                  <fieldset className="sm:col-span-2">
                    <Label>{t.step2.budget}</Label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {t.step2.budgets.map((b) => (
                        <Choice key={b} small on={data.budget === b} onClick={() => set("budget", data.budget === b ? "" : b)} role="radio">
                          {b}
                        </Choice>
                      ))}
                    </div>
                  </fieldset>
                  <Field label={t.step2.message} className="sm:col-span-2">
                    <textarea rows={3} value={data.message} onChange={(e) => set("message", e.target.value)} className={cn(inputCls(false), "resize-none")} />
                  </Field>
                </div>
              </Step>
            )}

            {step === 2 && (
              <Step title={t.step3.title}>
                <Label>{t.step3.format}</Label>
                <div className="grid grid-cols-3 gap-2">
                  {(Object.keys(t.step3.formats) as Format[]).map((f) => {
                    const Icon = FORMAT_ICONS[f];
                    return (
                      <Choice key={f} small on={data.format === f} onClick={() => set("format", f)} role="radio">
                        <Icon className="h-4 w-4" /> {t.step3.formats[f]}
                      </Choice>
                    );
                  })}
                </div>
                <Label className="mt-6">{t.step3.date}</Label>
                <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1" data-lenis-prevent>
                  {days.map((d) => {
                    const on = data.date === d.iso;
                    const anySlot = TIME_SLOTS.some((s) => slotAvailable(d.iso, s));
                    const disabled = d.closed || !anySlot;
                    return (
                      <button
                        key={d.iso}
                        type="button"
                        disabled={disabled}
                        title={d.closed ? t.step3.closed : undefined}
                        aria-pressed={on}
                        onClick={() => {
                          set("date", d.iso);
                          if (data.time && !slotAvailable(d.iso, data.time)) set("time", "");
                        }}
                        className={cn(
                          "flex w-14 shrink-0 flex-col items-center rounded-xl border py-2.5 transition-all",
                          on ? "border-gold bg-gold/15 text-gold-soft" : "border-line text-steel hover:border-cyan/40",
                          disabled && "cursor-not-allowed opacity-30 hover:border-line",
                        )}
                      >
                        <span className="font-mono text-[9px] tracking-wider uppercase">{t.step3.weekdays[d.weekday]}</span>
                        <span className="font-sharp text-xl leading-tight text-mist">{d.day}</span>
                        <span className="font-mono text-[9px] text-slate">{t.step3.months[d.month]}</span>
                      </button>
                    );
                  })}
                </div>
                <Label className="mt-5">{t.step3.time}</Label>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                  {TIME_SLOTS.map((s) => {
                    const ok = !!data.date && slotAvailable(data.date, s);
                    return (
                      <button
                        key={s}
                        type="button"
                        disabled={!ok}
                        aria-pressed={data.time === s}
                        onClick={() => set("time", s)}
                        className={cn(
                          "rounded-xl border py-2.5 font-mono text-sm transition-all",
                          data.time === s ? "border-cyan bg-cyan/15 text-cyan" : "border-line text-steel hover:border-cyan/40 hover:text-mist",
                          !ok && "cursor-not-allowed opacity-30",
                        )}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
                <FieldError msg={errors.date} />
              </Step>
            )}

            {step === 3 && (
              <Step title={t.step4.title}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label={t.step4.name} error={errors.name}>
                    <input value={data.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" className={inputCls(!!errors.name)} aria-invalid={!!errors.name} />
                  </Field>
                  <Field label={t.step4.phone} error={errors.phone}>
                    <div className={cn(inputCls(!!errors.phone), "flex items-center gap-2 focus-within:border-cyan/60")}>
                      <span className="font-mono text-sm text-steel">+998</span>
                      <input
                        value={formatPhone(data.phone)}
                        onChange={(e) => set("phone", e.target.value.replace(/\D/g, "").slice(0, 9))}
                        inputMode="tel"
                        autoComplete="tel-national"
                        placeholder="90 123 45 67"
                        aria-label={t.step4.phone}
                        aria-invalid={!!errors.phone}
                        className="w-full bg-transparent font-mono outline-none placeholder:text-slate"
                      />
                    </div>
                  </Field>
                  <Field label={t.step4.email} error={errors.email} className="sm:col-span-2">
                    <input type="email" value={data.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" className={inputCls(!!errors.email)} />
                  </Field>
                  {data.date && data.time && (
                    <p className="glass-cyan rounded-xl px-4 py-3 font-mono text-xs text-cyan sm:col-span-2">
                      📅 {data.date} · {data.time} · {t.step3.formats[data.format]}
                    </p>
                  )}
                </div>
              </Step>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {state.status === "error" && (
        <p role="alert" className="mt-4 text-sm text-destructive">
          {t.errors.generic}
        </p>
      )}

      <div className="mt-8 flex items-center justify-between gap-3">
        <Button type="button" variant="ghost" onClick={() => go(-1)} className={cn(step === 0 && "invisible")}>
          <ArrowLeft /> {t.back}
        </Button>
        {step < last ? (
          <Button type="button" variant="glass" onClick={() => go(1)} data-cursor="→">
            {t.next} <ArrowRight />
          </Button>
        ) : (
          <Button type="submit" disabled={pending} data-cursor="✓">
            {pending ? (
              <>
                <LoaderCircle className="animate-spin" /> {t.sending}
              </>
            ) : (
              <>
                {t.submit} <Send />
              </>
            )}
            <ButtonShimmer />
          </Button>
        )}
      </div>
    </form>
  );
}

const inputCls = (invalid: boolean) =>
  cn(
    "w-full rounded-xl border bg-obsidian-900/60 px-4 py-3 text-sm text-mist outline-none transition placeholder:text-slate focus:border-cyan/60 focus:shadow-[0_0_0_4px_rgb(0_240_255/0.08)]",
    invalid ? "border-destructive/70" : "border-line",
  );

function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-sharp text-xl font-light text-mist">{title}</h3>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("mb-2.5 font-mono text-[10px] tracking-[0.16em] text-steel uppercase", className)}>{children}</p>;
}

function FieldError({ msg }: { msg?: string }) {
  return msg ? (
    <p role="alert" className="mt-2 text-xs text-destructive">
      {msg}
    </p>
  ) : null;
}

function Choice({ on, onClick, children, small, role }: { on: boolean; onClick: () => void; children: React.ReactNode; small?: boolean; role?: string }) {
  return (
    <button
      type="button"
      role={role}
      aria-checked={role === "radio" ? on : undefined}
      onClick={onClick}
      className={cn(
        "flex items-center justify-center gap-2 rounded-xl border text-center transition-all duration-300",
        small ? "px-2 py-2.5 text-xs" : "flex-col px-2 py-3.5 text-xs",
        on ? "border-gold/60 bg-gold/10 text-gold-soft" : "border-line text-steel hover:border-cyan/40 hover:text-mist",
      )}
    >
      {children}
    </button>
  );
}

function Field({ label, error, className, children }: { label: string; error?: string; className?: string; children: React.ReactNode }) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-2 block text-xs text-steel">{label}</span>
      {children}
      {error && (
        <span role="alert" className="mt-1.5 block text-xs text-destructive">
          {error}
        </span>
      )}
    </label>
  );
}
