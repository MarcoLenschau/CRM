import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  invoke: (channel: string, ...args: any[]) => {
    return ipcRenderer.invoke(channel, ...args);
  },
  on: (channel: string, listener: (...args: any[]) => void) => {
    return ipcRenderer.on(channel, (event, ...args) => listener(...args));
  },
  once: (channel: string, listener: (...args: any[]) => void) => {
    return ipcRenderer.once(channel, (event, ...args) => listener(...args));
  }
});
