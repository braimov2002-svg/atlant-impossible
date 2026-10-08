'use client';

import {
  DictationError,
  MAX_RECORDING_SECONDS,
  modelOverrides,
  transcribe,
  userMessage,
  type DictationSettings,
} from '@ovozyoz/core';
import { MicRecorder, prepareRecording } from '@ovozyoz/core/browser';
import { useMotionValue, type MotionValue } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { copyText, copyWhenReady } from './clipboard';

export type Phase = 'idle' | 'starting' | 'recording' | 'processing';

export interface DictationConfig {
  settings: DictationSettings;
  apiKey: string;
  autoCopy: boolean;
}

export interface DictationOutcome {
  text: string;
  copied: boolean;
}

interface Options {
  /** Read at the moment of use so changes apply to the next recording. */
  config: () => DictationConfig;
  onResult: (outcome: DictationOutcome) => void;
  onError: (message: string, error: unknown) => void;
}

type WakeLockSentinelLike = { release: () => Promise<void> };

/** Keeps the screen on while recording so auto-lock does not end a dictation. */
function requestWakeLock(): Promise<WakeLockSentinelLike | null> {
  const wakeLock = (navigator as Navigator & {
    wakeLock?: { request: (type: 'screen') => Promise<WakeLockSentinelLike> };
  }).wakeLock;
  return wakeLock ? wakeLock.request('screen').catch(() => null) : Promise.resolve(null);
}

/** Failures of the recording itself: sending the same audio again won't help. */
const RECORDING_PROBLEMS = new Set(['silence', 'too-short', 'decode', 'empty-result']);

export function useDictation({ config, onResult, onError }: Options) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [elapsed, setElapsed] = useState(0);
  const [canRetry, setCanRetry] = useState(false);
  // A motion value, not state: the mic animation updates every frame without
  // re-rendering the whole page.
  const level = useMotionValue(0);
  const recorder = useRef<MicRecorder | null>(null);
  const abort = useRef<AbortController | null>(null);
  const phaseRef = useRef<Phase>('idle');
  const frame = useRef<number>(0);
  const stopRef = useRef<() => void>(() => undefined);
  const wakeLock = useRef<Promise<WakeLockSentinelLike | null> | null>(null);
  /** Audio of the last failed attempt, so it can be sent again. */
  const lastAudio = useRef<Uint8Array | null>(null);

  const update = useCallback((next: Phase) => {
    phaseRef.current = next;
    setPhase(next);
  }, []);

  const releaseWakeLock = useCallback(() => {
    const pending = wakeLock.current;
    wakeLock.current = null;
    void pending?.then((sentinel) => sentinel?.release().catch(() => undefined));
  }, []);

  const stopTicker = useCallback(() => {
    cancelAnimationFrame(frame.current);
    level.set(0);
  }, [level]);

  const tick = useCallback(() => {
    const rec = recorder.current;
    if (!rec || phaseRef.current !== 'recording') return;
    level.set(rec.level());
    const seconds = Math.floor(rec.elapsed);
    setElapsed((current) => (current === seconds ? current : seconds));
    if (rec.elapsed >= MAX_RECORDING_SECONDS) {
      stopRef.current();
      return;
    }
    frame.current = requestAnimationFrame(tick);
  }, [level]);

  const start = useCallback(async () => {
    if (phaseRef.current !== 'idle') return;
    const { apiKey } = config();
    if (!apiKey.trim()) {
      const error = new DictationError('no-api-key');
      onError(userMessage(error), error);
      return;
    }
    recorder.current ??= new MicRecorder();
    // Requested before the first await, while the tap still counts.
    wakeLock.current = requestWakeLock();
    update('starting');
    try {
      await recorder.current.start();
      setElapsed(0);
      setCanRetry(false);
      lastAudio.current = null;
      update('recording');
      frame.current = requestAnimationFrame(tick);
    } catch (error) {
      releaseWakeLock();
      if (error instanceof DictationError && error.code === 'cancelled') return; // cancel() already went idle
      update('idle');
      onError(userMessage(error), error);
    }
  }, [config, onError, releaseWakeLock, tick, update]);

  /** Sends audio and delivers the result; the copy is started inside the tap. */
  const process = useCallback(
    async (getAudio: () => Promise<Uint8Array>) => {
      update('processing');
      const { settings, apiKey, autoCopy } = config();
      const controller = new AbortController();
      abort.current = controller;

      const textPromise = (async () => {
        const audio = await getAudio();
        lastAudio.current = audio;
        const result = await transcribe({
          provider: settings.provider,
          apiKey,
          audio,
          spoken: settings.spoken,
          output: settings.output,
          apostrophes: settings.apostrophes,
          signal: controller.signal,
          ...modelOverrides(settings),
        });
        return result.text;
      })();
      const scheduledCopy = autoCopy ? copyWhenReady(textPromise) : null;

      try {
        const text = await textPromise;
        lastAudio.current = null;
        setCanRetry(false);
        let copied = scheduledCopy ? await scheduledCopy : false;
        if (!copied && autoCopy) copied = await copyText(text);
        onResult({ text, copied });
      } catch (error) {
        const code = error instanceof DictationError ? error.code : '';
        if (RECORDING_PROBLEMS.has(code)) lastAudio.current = null;
        setCanRetry(code !== 'cancelled' && lastAudio.current !== null);
        if (code !== 'cancelled') onError(userMessage(error), error);
      } finally {
        abort.current = null;
        update('idle');
      }
    },
    [config, onError, onResult, update],
  );

  /** Must be called from the tap handler so the clipboard write is allowed. */
  const stop = useCallback(async () => {
    const rec = recorder.current;
    if (!rec || phaseRef.current !== 'recording') return;
    stopTicker();
    releaseWakeLock();
    await process(async () => (await prepareRecording(await rec.stop())).wav);
  }, [process, releaseWakeLock, stopTicker]);

  /** Sends the last recording again after a network or provider error. */
  const retry = useCallback(async () => {
    const audio = lastAudio.current;
    if (!audio || phaseRef.current !== 'idle') return;
    await process(async () => audio);
  }, [process]);

  stopRef.current = () => void stop();

  const cancel = useCallback(() => {
    if (phaseRef.current === 'recording' || phaseRef.current === 'starting') {
      stopTicker();
      releaseWakeLock();
      recorder.current?.cancel();
      update('idle');
    } else if (phaseRef.current === 'processing') {
      abort.current?.abort();
    }
  }, [releaseWakeLock, stopTicker, update]);

  const toggle = useCallback(() => {
    if (phaseRef.current === 'idle') void start();
    else if (phaseRef.current === 'recording') void stop();
  }, [start, stop]);

  // iOS mutes the microphone as soon as the app goes to the background, so
  // finish the recording (and transcribe what was said) instead of losing it.
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden && phaseRef.current === 'recording') stopRef.current();
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  useEffect(
    () => () => {
      cancelAnimationFrame(frame.current);
      recorder.current?.cancel();
      abort.current?.abort();
      releaseWakeLock();
    },
    [releaseWakeLock],
  );

  return {
    phase,
    level: level as MotionValue<number>,
    elapsed,
    canRetry,
    start,
    stop,
    retry,
    cancel,
    toggle,
  };
}
