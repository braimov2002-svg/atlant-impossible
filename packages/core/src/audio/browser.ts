// Browser-only microphone capture (web app and Electron renderer).
import { DictationError, MIN_RECORDING_SECONDS } from '../errors';
import { downmixToMono, peakLevel, resample } from './resample';
import { encodeWavPcm16, SPEECH_SAMPLE_RATE } from './wav';

/** Peak level below which a recording is treated as silence. */
export const SILENCE_PEAK = 0.015;

// Chrome/Edge/Electron record webm/opus, Safari (iOS + macOS) records mp4/AAC.
const PREFERRED_TYPES = ['audio/webm;codecs=opus', 'audio/mp4', 'audio/ogg;codecs=opus', 'audio/webm'];

export interface PreparedRecording {
  wav: Uint8Array;
  durationSec: number;
  peak: number;
}

export function pickMimeType(): string | undefined {
  if (typeof MediaRecorder === 'undefined' || typeof MediaRecorder.isTypeSupported !== 'function') {
    return undefined;
  }
  return PREFERRED_TYPES.find((type) => MediaRecorder.isTypeSupported(type));
}

export function isRecordingSupported(): boolean {
  return (
    typeof navigator !== 'undefined' &&
    !!navigator.mediaDevices?.getUserMedia &&
    typeof MediaRecorder !== 'undefined'
  );
}

type AudioContextCtor = typeof AudioContext;

function audioContextCtor(): AudioContextCtor | undefined {
  const w = globalThis as unknown as { AudioContext?: AudioContextCtor; webkitAudioContext?: AudioContextCtor };
  return w.AudioContext ?? w.webkitAudioContext;
}

function micError(error: unknown): DictationError {
  const name = error instanceof Error ? error.name : '';
  if (name === 'NotAllowedError' || name === 'SecurityError') return new DictationError('mic-denied');
  if (name === 'NotFoundError' || name === 'NotReadableError' || name === 'OverconstrainedError') {
    return new DictationError('mic-unavailable');
  }
  return new DictationError('mic-unavailable', error instanceof Error ? error.message : String(error));
}

/** Records the microphone with MediaRecorder; one instance per screen/window. */
export class MicRecorder {
  private stream: MediaStream | null = null;
  private recorder: MediaRecorder | null = null;
  private chunks: Blob[] = [];
  private meterContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private meterBuffer: Float32Array<ArrayBuffer> | null = null;
  private startedAt = 0;

  get isRecording(): boolean {
    return this.recorder?.state === 'recording';
  }

  /** Seconds since start() resolved. */
  get elapsed(): number {
    return this.startedAt ? (Date.now() - this.startedAt) / 1000 : 0;
  }

  async start(): Promise<void> {
    if (!isRecordingSupported()) throw new DictationError('unsupported');
    this.cancel();
    // iOS only lets an AudioContext run if it is created during the tap,
    // i.e. before the first await.
    const meterContext = this.createMeterContext();

    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true, channelCount: 1 },
      });
    } catch (error) {
      void meterContext?.close().catch(() => undefined);
      throw micError(error);
    }

    const mimeType = pickMimeType();
    let recorder: MediaRecorder;
    try {
      try {
        recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      } catch {
        recorder = new MediaRecorder(stream);
      }
    } catch {
      stream.getTracks().forEach((track) => track.stop());
      void meterContext?.close().catch(() => undefined);
      throw new DictationError('unsupported');
    }
    this.stream = stream;
    this.recorder = recorder;
    this.chunks = [];
    recorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) this.chunks.push(event.data);
    };
    // A timeslice makes the browser hand over data regularly, so a long
    // recording is never lost to a single giant final chunk.
    recorder.start(1000);
    this.startedAt = Date.now();
    this.startMeter(meterContext, stream);
  }

  /** Current input loudness 0..1 for animations; 0 when unavailable. */
  level(): number {
    if (!this.analyser || !this.meterBuffer) return 0;
    this.analyser.getFloatTimeDomainData(this.meterBuffer);
    let sum = 0;
    for (const v of this.meterBuffer) sum += v * v;
    const rms = Math.sqrt(sum / this.meterBuffer.length);
    return Math.min(1, rms * 6);
  }

  /** Stops recording and returns the encoded audio as recorded by the browser. */
  async stop(): Promise<Blob> {
    const recorder = this.recorder;
    if (!recorder) throw new DictationError('too-short');
    if (recorder.state !== 'inactive') {
      await new Promise<void>((resolve) => {
        recorder.onstop = () => resolve();
        recorder.stop();
      });
    }
    const type = recorder.mimeType || this.chunks[0]?.type || 'audio/webm';
    const blob = new Blob(this.chunks, { type });
    this.release();
    return blob;
  }

  /** Stops without producing audio and turns the microphone off. */
  cancel(): void {
    const recorder = this.recorder;
    if (recorder && recorder.state !== 'inactive') {
      recorder.ondataavailable = null;
      recorder.onstop = null;
      try {
        recorder.stop();
      } catch {
        // already stopped
      }
    }
    this.release();
  }

  private createMeterContext(): AudioContext | null {
    const Ctor = audioContextCtor();
    try {
      return Ctor ? new Ctor() : null;
    } catch {
      return null; // too many contexts or no audio output: the meter is decoration only
    }
  }

  private startMeter(context: AudioContext | null, stream: MediaStream): void {
    if (!context) return;
    this.meterContext = context;
    try {
      const analyser = context.createAnalyser();
      analyser.fftSize = 1024;
      context.createMediaStreamSource(stream).connect(analyser);
      this.analyser = analyser;
      this.meterBuffer = new Float32Array(analyser.fftSize);
      void context.resume?.().catch(() => undefined);
    } catch {
      // The meter is decoration only.
    }
  }

  private release(): void {
    this.stream?.getTracks().forEach((track) => track.stop());
    void this.meterContext?.close().catch(() => undefined);
    this.stream = null;
    this.recorder = null;
    this.meterContext = null;
    this.analyser = null;
    this.meterBuffer = null;
    this.startedAt = 0;
  }
}

/**
 * Decodes whatever the browser recorded and converts it to 16 kHz mono WAV,
 * lifting quiet recordings so the recogniser hears them clearly.
 * Throws 'too-short' / 'silence' so callers never upload useless audio.
 */
export async function prepareRecording(blob: Blob): Promise<PreparedRecording> {
  const data = await blob.arrayBuffer();
  if (data.byteLength === 0) throw new DictationError('too-short');

  const Ctor = audioContextCtor();
  if (!Ctor) throw new DictationError('unsupported');
  const context = new Ctor();
  let decoded: AudioBuffer;
  try {
    decoded = await new Promise<AudioBuffer>((resolve, reject) => {
      // Old Safari only supports the callback form; new browsers return a promise too.
      const maybePromise = context.decodeAudioData(data, resolve, reject) as Promise<AudioBuffer> | undefined;
      maybePromise?.then(resolve, reject);
    });
  } catch {
    throw new DictationError('too-short', 'Audio could not be decoded');
  } finally {
    void context.close?.().catch(() => undefined);
  }

  const channels = Array.from({ length: decoded.numberOfChannels }, (_, i) => decoded.getChannelData(i));
  const mono = resample(downmixToMono(channels), decoded.sampleRate, SPEECH_SAMPLE_RATE);
  const durationSec = mono.length / SPEECH_SAMPLE_RATE;
  if (durationSec < MIN_RECORDING_SECONDS) throw new DictationError('too-short');

  const peak = peakLevel(mono);
  if (peak < SILENCE_PEAK) throw new DictationError('silence');
  if (peak < 0.7) {
    const gain = Math.min(20, 0.9 / peak);
    for (let i = 0; i < mono.length; i++) mono[i] *= gain;
  }

  return { wav: encodeWavPcm16(mono, SPEECH_SAMPLE_RATE), durationSec, peak };
}
