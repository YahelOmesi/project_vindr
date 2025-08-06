import React, { useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import { Button, CircularProgress } from '@mui/material';
import { ImageContainerProps, PatientImages } from 'types/image';
import { TitleStyled, ImageListItemStyled, ImageStyled, ContainerStyled } from './style';
import { CHANNELS } from '../../constants/common';

const { DDSM_AGENT } = window;

export default function ImageContainer(props: ImageContainerProps) {
const { seriesUID, sopUID, seriesMetadata, title, goToImageView, imageView, leftOrRightBreast } = props;
  const [patientImage, setPatientImage] = useState<PatientImages>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("🧾 ImageContainer received props:", { imageView, leftOrRightBreast, sopUID });

    const getPatientImages = async () => {
      const response = await DDSM_AGENT.send(CHANNELS.PATIENT_IMAGE, { seriesUID, sopUID });
      const base64Image = Buffer.from(response, 'binary').toString('base64');
      const imageId = parseInt(sopUID.split('.').pop() as string);
      setPatientImage({
        id: imageId,
        seriesUID,
        sopUID,
        imageFilePath: `data:image/jpeg;base64,${base64Image}`,
        imageView,
        leftOrRightBreast,
      });
      setLoading(false);
    };
    getPatientImages();
  }, [seriesUID, sopUID]);

  return (
    <ContainerStyled>
      {loading || !patientImage ? (
        <CircularProgress />
      ) : (
        <ImageListItemStyled>
          <TitleStyled variant="h6">
            {`${leftOrRightBreast?.toUpperCase() || ''} ${imageView?.toUpperCase() || ''}`}
          </TitleStyled>

          {goToImageView ? (
            <Button key={sopUID} onClick={() => goToImageView(patientImage.imageFilePath)}>
              <ImageStyled src={patientImage.imageFilePath} loading="lazy" />
            </Button>
          ) : (
            <ImageStyled src={patientImage.imageFilePath} loading="lazy" />
          )}
        </ImageListItemStyled>
      )}
    </ContainerStyled>
  );
}
