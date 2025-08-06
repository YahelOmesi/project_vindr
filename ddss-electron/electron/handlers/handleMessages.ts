import { ipcMain } from 'electron';
import axios from '../axios.js';
import {
  GET_ABNORMALITY_FILTER_OPTIONS,
  GET_FILTER_OPTIONS,
  GET_IMAGES_DETAILS,
  GET_IMAGE,
  GET_PATIENT_IDS,
  GET_PATIENTS,
  GET_PATIENT_DETAILS,
  GET_PATIENTS_BY_FILTER,
} from '../constants/endpoints.js';
import { CHANNELS } from '../constants/common';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function handleMessages(): void {
  ipcMain.handle(CHANNELS.FILTER_OPTIONS, async () => {
    try {
      const response = await axios.get(GET_FILTER_OPTIONS);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  });

  ipcMain.handle(CHANNELS.ABNORMALITY_FILTER_OPTIONS, async () => {
    try {
      const response = await axios.get(GET_ABNORMALITY_FILTER_OPTIONS);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  });

  ipcMain.handle(CHANNELS.PATIENTS, async () => {
    try {
      const response = await axios.get(GET_PATIENTS, { timeout: 10000 });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  });

  ipcMain.handle(CHANNELS.PATIENT_DETAILS, async (event: Electron.IpcMainInvokeEvent, patientId: string) => {
    try {
      const response = await axios.get(GET_PATIENT_DETAILS(patientId));
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  });

  ipcMain.handle(CHANNELS.PATIENT_IDS, async () => {
    try {
      const response = await axios.get(GET_PATIENT_IDS);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  });

  ipcMain.handle(CHANNELS.PATIENT_IMAGES_DETAILS, async (event: Electron.IpcMainInvokeEvent, data) => {
    try {
      const { patientId, imageFormat } = data;
      const response = await axios.get(GET_IMAGES_DETAILS(patientId), {
        timeout: 60000,
        params: { format: imageFormat },
      });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  });

  ipcMain.handle(CHANNELS.FILTER_PATIENTS, async (event: Electron.IpcMainInvokeEvent, filters) => {
    try {
      const response = await axios.get(GET_PATIENTS_BY_FILTER, { params: { filters: JSON.stringify(filters) } });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  });

  ipcMain.handle(CHANNELS.PATIENT_IMAGE, async (event: Electron.IpcMainInvokeEvent, data) => {
    try {
      const { seriesUID, sopUID } = data;
      const response = await axios.get(GET_IMAGE, {
        responseType: 'arraybuffer',
        timeout: 60000,
        params: { series_UID: seriesUID, sop_uid: sopUID },
      });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  });

  ipcMain.handle(CHANNELS.SAVE_QUERY, async (event: Electron.IpcMainInvokeEvent, value) => {
    try {
      const folderPath = path.join(__dirname, 'savedQueries');

      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }

      const filePath = path.join(folderPath, `${value.queryName}.json`);
      const data = JSON.stringify(value.filters, null, 2);
      fs.writeFileSync(filePath, data, 'utf-8');
      return 'success';
    } catch (error) {
      return 'error';
    }
  });

  ipcMain.handle(CHANNELS.LOAD_QUERIES, async () => {
    try {
      const folderPath = path.join(__dirname, 'savedQueries');
      const files = fs.readdirSync(folderPath);
      const queries = files.map((file) => {
        const filePath = path.join(folderPath, file);
        const data = fs.readFileSync(filePath, 'utf-8');
        return { queryName: file.replace('.json', ''), filters: JSON.parse(data) };
      });
      return queries;
    } catch (error) {
      return [];
    }
  });

  ipcMain.handle(CHANNELS.DELETE_QUERY, async (event: Electron.IpcMainInvokeEvent, queryName: string) => {
    try {
      const folderPath = path.join(__dirname, 'savedQueries');
      const filePath = path.join(folderPath, `${queryName}.json`);
      fs.unlinkSync(filePath);
      return 'success';
    } catch (error) {
      return 'error';
    }
  });
}
