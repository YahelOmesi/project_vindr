export const GET_FILTER_OPTIONS = 'filter/options';
export const GET_ABNORMALITY_FILTER_OPTIONS = 'filter/abnormality-options';
export const GET_PATIENT_IDS = 'filter/patients-ids';
export const GET_PATIENTS = 'patients/';
export const GET_PATIENT_DETAILS = (patientId: string) => `patients/${patientId}`;
export const GET_PATIENTS_BY_FILTER = 'patients/filter';
export const GET_IMAGES_DETAILS = (patientId: string) => `images/${patientId}/images-metadata`;
export const GET_IMAGE = `images/full`;
