import { app } from 'electron';

export default function handleWindowAllClosed(): void {
  if (process.platform !== 'darwin') {
    app.quit();
  }
}
