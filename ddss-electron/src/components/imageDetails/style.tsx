import { Box, styled, Typography } from '@mui/material';

export const BoxClassificationSectionStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  margin: theme.spacing(1),
  padding: theme.spacing(0),
}));

export const DetailsBoxStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  margin: theme.spacing(1),
  padding: theme.spacing(1),
  width: '30%',
}));

export const BackgroundBoxStyled = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  borderRadius: 4,
}));

export const BodyStyled = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.subtitle1.fontSize,
  fontFamily: theme.typography.subtitle1.fontFamily,
  fontWeight: theme.typography.subtitle1.fontWeight,
  margin: theme.spacing(1),
}));
