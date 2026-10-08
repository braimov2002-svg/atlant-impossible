import { contextBridge, ipcRenderer } from 'electron';
import { IPC, type SettingsBridge } from '../shared/types';

const bridge: SettingsBridge = {
  get: () => ipcRenderer.invoke(IPC.settingsGet),
  save: (update) => ipcRenderer.invoke(IPC.settingsSave, update),
  openKeyPage: (provider) => ipcRenderer.send(IPC.settingsOpenKeyPage, provider),
  openPermission: (kind) => ipcRenderer.send(IPC.settingsOpenPermission, kind),
  close: () => ipcRenderer.send(IPC.settingsClose),
};

contextBridge.exposeInMainWorld('ovozyoz', bridge);
