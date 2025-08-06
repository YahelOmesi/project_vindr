import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination, Box } from '@mui/material';
import PatientContainer from '../patientContainer/PatientContainer';
import { PatientSectionProps } from 'types/patient';

export default function PatientSection(props: PatientSectionProps) {
  const { patientIds, pageCount, pageIndex, handlePageChange } = props;
  const navigate = useNavigate();

  const goToPatientView = (patientId: string) => {
    navigate(`/patient/${patientId}`);
  };
  console.log("🧪 patientIds received:", patientIds);

  return (
    <Box id="patients-section-container" sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <Box id="patient-section-patients-container" sx={{ flexWrap: 'wrap', flexDirection: 'row', width: '100%' }}>
      {patientIds &&
          patientIds.map((patientId) => {
            console.log("🧪 PatientSection is rendering patientId:", patientId);
            return (
              <PatientContainer
                key={patientId}
                patientId={patientId}
                showPatientID={true}
                goToPatientView={goToPatientView}
                imageFormat="full"
              />
            );
          })}

      </Box>
      <Box sx={{ display: 'flex', right: 0, bottom: 6, m: 2 }}>
        <Pagination count={pageCount} page={pageIndex} onChange={handlePageChange} size="small" />
      </Box>
    </Box>
  );
}
