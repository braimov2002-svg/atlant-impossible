'use client';

import { motion, useSpring, useTransform, type MotionValue } from 'motion/react';
import type { Phase } from '@/lib/useDictation';

interface Props {
  phase: Phase;
  /** Microphone loudness 0..1, updated every frame without re-rendering. */
  level: MotionValue<number>;
  onPress: () => void;
}

const LABELS: Record<Phase, string> = {
  idle: 'Yozishni boshlash',
  starting: 'Mikrofon ochilmoqda',
  recording: "Yozishni to'xtatish",
  processing: "Matnga o'girilmoqda",
};

export function MicButton({ phase, level, onPress }: Props) {
  const recording = phase === 'recording';
  const busy = phase === 'processing' || phase === 'starting';
  const ringScale = useSpring(useTransform(level, (l) => 1 + l * 0.45), { stiffness: 300, damping: 20 });

  return (
    <div className="relative grid size-56 place-items-center">
      {recording && (
        <>
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full bg-rose-500/20"
            style={{ scale: ringScale }}
          />
          <motion.span
            aria-hidden
            className="absolute inset-6 rounded-full bg-rose-500/25"
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}
      {busy && (
        <motion.span
          aria-hidden
          className="absolute inset-3 rounded-full border-4 border-transparent border-t-sky-500 border-r-emerald-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      )}
      <motion.button
        type="button"
        onClick={onPress}
        disabled={busy}
        aria-label={LABELS[phase]}
        aria-pressed={recording}
        whileTap={{ scale: 0.94 }}
        className={`relative grid size-36 place-items-center rounded-full text-white shadow-xl outline-none transition-colors focus-visible:ring-4 focus-visible:ring-sky-400/60 disabled:cursor-wait ${
          recording
            ? 'bg-rose-600 shadow-rose-500/40'
            : 'bg-gradient-to-br from-sky-600 to-emerald-600 shadow-emerald-500/30'
        }`}
      >
        {recording ? (
          <span className="size-11 rounded-xl bg-white" />
        ) : (
          <svg viewBox="0 0 24 24" className="size-16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor" />
            <path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" />
          </svg>
        )}
      </motion.button>
    </div>
  );
}
