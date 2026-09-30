"use client";

import { useActionState, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, LoaderCircle, MessageCircle, Phone, Send } from "lucide-react";
import { submitConsultation, type ConsultationState } from "@/app/actions/consultation";
import { Button, ButtonShimmer } from "@/components/ui/button";
import { REGIONS } from "@/lib/regions";
import { EASE_OUT_EXPO, stepSlide } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/i18n/dictionaries/uz";

type T = Dictionary["contact"];
type Channel = "telegram" | "whatsapp" | "call";

interface Draft {
  services: string[];
  region: string;
  area: string;
  crop: string;
  name: string;
  phone: string; // 9 national digits
  channel: Channel;
  message: string;
}

const EMPTY: Draft = { services: [], region: "", area: "", crop: "", name: "", phone: "", channel: "telegram", message: "" };

/** "901234567" → "90 123 45 67" */
const formatPhone = (d: string) =>
  [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean).join(" ");

export function ConsultationForm({ t, crops }: { t: T; crops: string[] }) {
  const [state, formAction, pending] = useActionState<ConsultationState, FormData>(submitConsultation, {
    status: "idle",
  });
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState<Draft>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Draft, string>>>({});
  const [resetKey, setResetKey] = useState(0);
  const [dismissed, setDismissed] = useState<string | null>(null);

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = (s: number) => {
    const e: typeof errors = {};
    if (s === 0 && data.services.length === 0) e.services = t.errors.services;
    if (s === 1 && !data.region) e.region = t.errors.region;
    if (s === 2) {
      if (data.name.trim().length < 2) e.name = t.errors.name;
      if (data.phone.length !== 9) e.phone = t.errors.phone;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const go = (delta: 1 | -1) => {
    if (delta === 1 && !validate(step)) return;
    setDir(delta);
    setStep((s) => s + delta);
  };

  if (state.status === "success" && state.ticket !== dismissed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        className="flex min-h-[420px] flex-col items-center justify-center text-center"
      >
        <svg viewBox="0 0 80 80" className="h-20 w-20" aria-hidden>
          <motion.circle cx="40" cy="40" r="36" fill="none" stroke="#00ff66" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, ease: EASE_OUT_EXPO }} />
          <motion.path d="M25 41 L36 52 L56 30" fill="none" stroke="#d4af37" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.6, ease: EASE_OUT_EXPO }} />
        </svg>
        <h3 className="mt-6 font-display text-2xl text-mist">{t.success.title}</h3>
        <p className="mt-3 max-w-sm text-sage">{t.success.body}</p>
        <p className="mt-4 rounded-full border border-emerald-line px-4 py-1.5 font-mono text-xs tracking-widest text-lime">#{state.ticket}</p>
        <Button
          variant="glass"
          className="mt-8"
          onClick={() => {
            setData(EMPTY);
            setStep(0);
            setDismissed(state.ticket);
            setResetKey((k) => k + 1);
          }}
        >
          {t.success.again}
        </Button>
      </motion.div>
    );
  }

  return (
    <form
      key={resetKey}
      action={formAction}
      onSubmit={(e) => {
        if (step < 2 || !validate(2)) {
          e.preventDefault();
          if (step < 2) go(1);
        }
      }}
      noValidate
      className="flex min-h-[420px] flex-col"
    >
      {/* Serialised state — visible steps are controlled inputs without `name` */}
      {data.services.map((s) => (
        <input key={s} type="hidden" name="services" value={s} />
      ))}
      <input type="hidden" name="region" value={data.region} />
      <input type="hidden" name="area" value={data.area} />
      <input type="hidden" name="crop" value={data.crop} />
      <input type="hidden" name="name" value={data.name} />
      <input type="hidden" name="phone" value={`998${data.phone}`} />
      <input type="hidden" name="channel" value={data.channel} />
      <input type="hidden" name="message" value={data.message} />
      {/* Honeypot */}
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="absolute -left-[9999px] h-0 w-0 opacity-0" aria-hidden />

      {/* Progress */}
      <ol className="mb-8 grid grid-cols-3 gap-2">
        {t.steps.map((label, i) => (
          <li key={label}>
            <div className="h-1 overflow-hidden rounded-full bg-forest-800">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-gold to-lime"
                animate={{ width: i < step ? "100%" : i === step ? "50%" : "0%" }}
                transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
              />
            </div>
            <p className={cn("mt-2 font-mono text-[10px] tracking-[0.16em] uppercase", i <= step ? "text-mist" : "text-moss")}>
              0{i + 1} · {label}
            </p>
          </li>
        ))}
      </ol>

      <div className="relative flex-1">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div key={step} custom={dir} variants={stepSlide} initial="enter" animate="center" exit="exit">
            {step === 0 && (
              <Step title={t.step1.title} hint={t.step1.hint} error={errors.services}>
                <div className="grid grid-cols-2 gap-2.5">
                  {t.services.map((s) => {
                    const on = data.services.includes(s.id);
                    return (
                      <button
                        key={s.id}
                        type="button"
                        aria-pressed={on}
                        onClick={() => set("services", on ? data.services.filter((x) => x !== s.id) : [...data.services, s.id])}
                        className={cn(
                          "flex items-center justify-between gap-2 rounded-2xl border px-4 py-4 text-left text-sm transition-all duration-500",
                          on ? "border-gold/60 bg-gold/10 text-gold-soft" : "border-emerald-line text-sage hover:border-lime/40 hover:text-mist",
                        )}
                      >
                        {s.label}
                        <span className={cn("flex h-5 w-5 items-center justify-center rounded-full border transition", on ? "border-gold bg-gold text-forest-950" : "border-emerald-line")}>
                          {on && <Check className="h-3 w-3" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </Step>
            )}

            {step === 1 && (
              <Step title={t.step2.title}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label={t.step2.region} error={errors.region} className="sm:col-span-2">
                    <select
                      value={data.region}
                      onChange={(e) => set("region", e.target.value)}
                      className={inputCls(!!errors.region)}
                      aria-invalid={!!errors.region}
                    >
                      <option value="">{t.step2.regionPlaceholder}</option>
                      {REGIONS.map((r) => (
                        <option key={r.id} value={r.name}>
                          {r.name}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label={t.step2.area}>
                    <input
                      type="number"
                      inputMode="decimal"
                      min={0}
                      value={data.area}
                      onChange={(e) => set("area", e.target.value)}
                      className={inputCls(false)}
                      placeholder="50"
                    />
                  </Field>
                  <Field label={t.step2.crop}>
                    <select value={data.crop} onChange={(e) => set("crop", e.target.value)} className={inputCls(false)}>
                      <option value="">—</option>
                      {crops.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
              </Step>
            )}

            {step === 2 && (
              <Step title={t.step3.title}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label={t.step3.name} error={errors.name}>
                    <input
                      value={data.name}
                      onChange={(e) => set("name", e.target.value)}
                      autoComplete="name"
                      className={inputCls(!!errors.name)}
                      aria-invalid={!!errors.name}
                    />
                  </Field>
                  <Field label={t.step3.phone} error={errors.phone}>
                    <div className={cn(inputCls(!!errors.phone), "flex items-center gap-2 focus-within:border-lime/60")}>
                      <span className="font-mono text-sm text-sage">+998</span>
                      <input
                        value={formatPhone(data.phone)}
                        onChange={(e) => set("phone", e.target.value.replace(/\D/g, "").slice(0, 9))}
                        inputMode="tel"
                        autoComplete="tel-national"
                        placeholder="90 123 45 67"
                        className="w-full bg-transparent font-mono outline-none placeholder:text-moss"
                        aria-invalid={!!errors.phone}
                        aria-label={t.step3.phone}
                      />
                    </div>
                  </Field>
                  <fieldset className="sm:col-span-2">
                    <legend className="mb-2 text-xs text-sage">{t.step3.channel}</legend>
                    <div className="grid grid-cols-3 gap-2">
                      {(Object.keys(t.step3.channels) as Channel[]).map((c) => {
                        const Icon = c === "call" ? Phone : c === "whatsapp" ? MessageCircle : Send;
                        const on = data.channel === c;
                        return (
                          <button
                            key={c}
                            type="button"
                            role="radio"
                            aria-checked={on}
                            onClick={() => set("channel", c)}
                            className={cn(
                              "flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-xs transition",
                              on ? "border-lime/60 bg-lime/10 text-lime" : "border-emerald-line text-sage hover:text-mist",
                            )}
                          >
                            <Icon className="h-3.5 w-3.5" />
                            {t.step3.channels[c]}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                  <Field label={t.step3.message} className="sm:col-span-2">
                    <textarea
                      rows={3}
                      value={data.message}
                      onChange={(e) => set("message", e.target.value)}
                      className={cn(inputCls(false), "resize-none")}
                    />
                  </Field>
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
        {step < 2 ? (
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
    "w-full rounded-xl border bg-forest-950/60 px-4 py-3 text-sm text-mist outline-none transition placeholder:text-moss focus:border-lime/60 focus:shadow-[0_0_0_4px_rgb(0_255_102/0.08)]",
    invalid ? "border-destructive/70" : "border-emerald-line",
  );

function Step({ title, hint, error, children }: { title: string; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-display text-xl text-mist">{title}</h3>
      {hint && <p className="mt-1 text-xs text-moss">{hint}</p>}
      <div className="mt-5">{children}</div>
      {error && (
        <p role="alert" className="mt-3 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

function Field({ label, error, className, children }: { label: string; error?: string; className?: string; children: React.ReactNode }) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-2 block text-xs text-sage">{label}</span>
      {children}
      {error && (
        <span role="alert" className="mt-1.5 block text-xs text-destructive">
          {error}
        </span>
      )}
    </label>
  );
}
