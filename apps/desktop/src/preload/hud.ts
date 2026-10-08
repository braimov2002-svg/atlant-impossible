import { contextBridge, ipcRenderer } from 'electron';
import { IPC, type HudBridge, type HudCommand, type HudState, type RecordingFailure } from '../shared/types';

const bridge: HudBridge = {
  onState: (listener) => {
    ipcRenderer.on(IPC.hudState, (_event, state: HudState) => listener(state));
  },
  onCommand: (listener) => {
    ipcRenderer.on(IPC.hudCommand, (_event, command: HudCommand) => listener(command));
  },
  recordingStarted: (session) => ipcRenderer.send(IPC.hudStarted, session),
  sendAudio: (session, wav) => ipcRenderer.send(IPC.hudAudio, session, wav),
  recordingFailed: (session, failure: RecordingFailure) => ipcRenderer.send(IPC.hudFailed, session, failure),
};

contextBridge.exposeInMainWorld('ovozyoz', bridge);
