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

export function useDictation({ config, onResult, onError }: Options) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [level, setLevel] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const recorder = useRef<MicRecorder | null>(null);
  const abort = useRef<AbortController | null>(null);
  const phaseRef = useRef<Phase>('idle');
  const frame = useRef<number>(0);
  const stopRef = useRef<() => void>(() => undefined);

  const update = useCallback((next: Phase) => {
    phaseRef.current = next;
    setPhase(next);
  }, []);

  const stopTicker = useCallback(() => {
    cancelAnimationFrame(frame.current);
    setLevel(0);
  }, []);

  const tick = useCallback(() => {
    const rec = recorder.current;
    if (!rec || phaseRef.current !== 'recording') return;
    setLevel(rec.level());
    setElapsed(rec.elapsed);
    if (rec.elapsed >= MAX_RECORDING_SECONDS) {
      stopRef.current();
      return;
    }
    frame.current = requestAnimationFrame(tick);
  }, []);

  const start = useCallback(async () => {
    if (phaseRef.current !== 'idle') return;
    const { apiKey } = config();
    if (!apiKey.trim()) {
      const error = new DictationError('no-api-key');
      onError(userMessage(error), error);
      return;
    }
    recorder.current ??= new MicRecorder();
    update('starting');
    try {
      await recorder.current.start();
      setElapsed(0);
      update('recording');
      frame.current = requestAnimationFrame(tick);
    } catch (error) {
      if (error instanceof DictationError && error.code === 'cancelled') return; // cancel() already went idle
      update('idle');
      onError(userMessage(error), error);
    }
  }, [config, onError, tick, update]);

  /** Must be called from the tap handler so the clipboard write is allowed. */
  const stop = useCallback(async () => {
    const rec = recorder.current;
    if (!rec || phaseRef.current !== 'recording') return;
    stopTicker();
    update('processing');
    const { settings, apiKey, autoCopy } = config();
    const controller = new AbortController();
    abort.current = controller;

    const textPromise = (async () => {
      const prepared = await prepareRecording(await rec.stop());
      const result = await transcribe({
        provider: settings.provider,
        apiKey,
        audio: prepared.wav,
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
      let copied = scheduledCopy ? await scheduledCopy : false;
      if (!copied && autoCopy) copied = await copyText(text);
      onResult({ text, copied });
    } catch (error) {
      if (!(error instanceof DictationError && error.code === 'cancelled')) onError(userMessage(error), error);
    } finally {
      abort.current = null;
      update('idle');
    }
  }, [config, onError, onResult, stopTicker, update]);

  stopRef.current = () => void stop();

  const cancel = useCallback(() => {
    if (phaseRef.current === 'recording' || phaseRef.current === 'starting') {
      stopTicker();
      recorder.current?.cancel();
      update('idle');
    } else if (phaseRef.current === 'processing') {
      abort.current?.abort();
    }
  }, [stopTicker, update]);

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
    },
    [],
  );

  return { phase, level, elapsed, start, stop, cancel, toggle };
}
