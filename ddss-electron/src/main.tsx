import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);

declare global {
  interface Window {
    DDSM_AGENT?: {
      channels: any;
      send: (channel: string, data?: any) => Promise<any>;
      listen: (channel: string, func: (event: any, ...args: any[]) => void) => void;
      removeListener: (channel: string) => void;
      closeWindow: () => void;
    };
  }
}
