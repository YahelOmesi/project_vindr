import React from 'react';
import { Button } from '@mui/material';
import { ImageListItemStyled, ImageStyled, ContainerStyled } from './style';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

export default function ImageView() {
  const { state } = useLocation();
  const { imageFilePath } = state;
  const navigate = useNavigate();

  const goToPatientView = () => {
    navigate(-1);
  };

  return (
    <ContainerStyled>
      <Button size="medium" onClick={goToPatientView}>
        <ArrowBack />
        Back
      </Button>
      <ImageListItemStyled>
        <ImageStyled src={imageFilePath} loading="lazy" />
      </ImageListItemStyled>
    </ContainerStyled>
  );
}
