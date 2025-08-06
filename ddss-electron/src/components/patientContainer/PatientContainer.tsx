import React, { useState, useEffect, useCallback } from 'react';
import { CircularProgress } from '@mui/material';
import { CHANNELS } from '../../constants/common';
import { ContainerStyled, TitleButtonStyled, ImageListStyled } from './style';
import { ImageMetadata, Metadata, SeriesMetadata } from 'types/image';
import ImageContainer from '../imageContainer/ImageContainer';
import { PatientContainerProps } from 'types/patient';

const { DDSM_AGENT } = window;

export default function PatientContainer(props: PatientContainerProps) {
  const { patientId, showPatientID, goToPatientView, imageFormat } = props;
  const [loading, setLoading] = useState<boolean>(true);
  const [metadata, setMetadata] = useState<ImageMetadata>();
  const [imageCount, setImageCount] = useState<number>(0);

  useEffect(() => {
    getImageMetadata(patientId);
  }, [props]);

  const getImageMetadata = useCallback(
    async (patientId: string) => {
      const data = {
        patientId: patientId,
        imageFormat: imageFormat || 'full',
      };

      const metadata: Metadata = await DDSM_AGENT.send(CHANNELS.PATIENT_IMAGES_DETAILS, data);
      setMetadata(metadata.imagesMetadata);
      setImageCount(metadata.imageCount);
      setLoading(false);
    },
    [props]
  );

  return (
    <ContainerStyled id={`patient-container-${patientId}`}>
      {showPatientID && (
        <TitleButtonStyled id={`patient-title-${patientId}`} key={patientId} onClick={() => goToPatientView(patientId)}>
          Patient {patientId.split('_')[1]}
        </TitleButtonStyled>
      )}
      {loading || !metadata ? (
        <CircularProgress />
      ) : (
        <ImageListStyled>
          {metadata &&
            metadata.map((seriesMetadata: SeriesMetadata) => {
              return seriesMetadata.sopUIDs.map((sopUID) => {
                return (
                  <ImageContainer
                    key={sopUID}
                    seriesUID={seriesMetadata.uid}
                    sopUID={sopUID}
                    seriesMetadata={seriesMetadata}
                  />
                );
              });
            })}
        </ImageListStyled>
      )}
    </ContainerStyled>
  );
}
