import { defineConfig } from 'vite';
import path from 'node:path';
import electron from 'vite-plugin-electron/simple';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      electron({
        main: {
          entry: path.resolve(__dirname, 'electron/main.ts'),
        },
        preload: {
          input: path.resolve(__dirname, 'electron/preload.ts'),
        },
      }),
    ],
    define: {
      'process.env': {},
    },
    resolve: {
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
    },
  };
});
