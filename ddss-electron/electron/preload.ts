import { ipcRenderer, contextBridge } from 'electron';
import { CHANNELS, CLIENT_AGENT_NAME } from './constants/common';

const api = {
  channels: CHANNELS,
  send: async (channel: string, data: any): Promise<any> => {
    return ipcRenderer.invoke(channel, data);
  },
  listen: (channel: string, func: (event: any, ...args: any[]) => void) => {
    ipcRenderer.on(channel, func);
  },
  removeListener: (channel: string) => {
    ipcRenderer.removeAllListeners(channel);
  },
  closeWindow: () => {
    ipcRenderer.send(CHANNELS.CLOSE_WINDOW);
  },
};

contextBridge.exposeInMainWorld(CLIENT_AGENT_NAME, api);
