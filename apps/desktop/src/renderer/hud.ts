import { DictationError, userMessage } from '@ovozyoz/core';
import { MicRecorder, prepareRecording } from '@ovozyoz/core/browser';
import type { HudBridge, HudState } from '../shared/types';

const bridge = (window as unknown as { ovozyoz: HudBridge }).ovozyoz;
const pill = document.getElementById('pill')!;
const text = document.getElementById('text')!;
const badge = document.getElementById('badge')!;
const bars = Array.from(document.querySelectorAll<HTMLElement>('#meter i'));

const recorder = new MicRecorder();
let activeSession = -1;
let meterFrame = 0;

function render(state: HudState): void {
  pill.className = `pill ${state.kind}`;
  switch (state.kind) {
    case 'recording':
      text.textContent = `Yozilmoqda... (yana ${state.hotkey})`;
      badge.textContent = state.badge;
      break;
    case 'transcribing':
      text.textContent = "Matnga o'girilmoqda...";
      badge.textContent = state.badge;
      break;
    default:
      text.textContent = state.message.length > 160 ? `${state.message.slice(0, 157)}…` : state.message;
      text.title = state.message;
      badge.textContent = '';
  }
}

function animateMeter(): void {
  cancelAnimationFrame(meterFrame);
  const step = () => {
    if (!recorder.isRecording) {
      bars.forEach((bar) => (bar.style.height = '4px'));
      return;
    }
    const level = recorder.level();
    bars.forEach((bar, i) => {
      const wobble = 0.55 + 0.45 * Math.sin(Date.now() / 90 + i * 1.7);
      bar.style.height = `${Math.round(4 + level * 14 * wobble)}px`;
    });
    meterFrame = requestAnimationFrame(step);
  };
  meterFrame = requestAnimationFrame(step);
}

function failure(error: unknown) {
  return {
    code: error instanceof DictationError ? error.code : 'unknown',
    message: userMessage(error),
  };
}

bridge.onState(render);

bridge.onCommand(async ({ type, session }) => {
  if (type === 'start') {
    activeSession = session;
    try {
      await recorder.start();
      if (activeSession !== session) {
        recorder.cancel(); // cancelled while the microphone was opening
        return;
      }
      animateMeter();
      bridge.recordingStarted(session);
    } catch (error) {
      if (activeSession === session) bridge.recordingFailed(session, failure(error));
    }
  } else if (type === 'stop') {
    if (activeSession !== session) return;
    if (!recorder.isRecording) {
      bridge.recordingFailed(session, failure(new DictationError('mic-unavailable')));
      return;
    }
    try {
      const prepared = await prepareRecording(await recorder.stop());
      if (activeSession === session) bridge.sendAudio(session, prepared.wav);
    } catch (error) {
      if (activeSession === session) bridge.recordingFailed(session, failure(error));
    }
  } else if (type === 'cancel') {
    activeSession = -1;
    recorder.cancel();
  }
});
