import { BrowserWindow } from 'electron';

export function closeAllWindows(): void {
  const allWindows: BrowserWindow[] = BrowserWindow.getAllWindows();
  allWindows.forEach((window) => {
    window.close();
    window.destroy();
  });
}
