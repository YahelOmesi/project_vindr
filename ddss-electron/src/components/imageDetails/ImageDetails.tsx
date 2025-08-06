import React from 'react';
import { DetailsBoxStyled, BackgroundBoxStyled, BodyStyled } from './style';
import { Details } from 'types/patient';

export default function ImageDetails(props: Details) {
  return (
    <DetailsBoxStyled id={`details-container-${props.imageView}-${props.leftOrRightBreast}`}>
      <BackgroundBoxStyled>
        <BodyStyled>{`Number of Abnormalities: ${props.abnormalityId}`}</BodyStyled>
        <BodyStyled>{`Abnormality Type: ${props.abnormalityType}`}</BodyStyled>
        <BodyStyled>{`Assessment: ${props.assessment}`}</BodyStyled>
        <BodyStyled>{`Breast Density: ${props.breastDensity}`}</BodyStyled>
        <BodyStyled>{`Mass Margins: ${props.massMargins}`}</BodyStyled>
        <BodyStyled>{`Mass Shape: ${props.massShape}`}</BodyStyled>
        <BodyStyled>{`Pathology: ${props.pathology}`}</BodyStyled>
        <BodyStyled>{`Subtlety: ${props.subtlety}`}</BodyStyled>
      </BackgroundBoxStyled>
    </DetailsBoxStyled>
  );
}
