import { Box, styled, Typography } from '@mui/material';

export const TitleStyled = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(1),
  padding: theme.spacing(1),
  textAlign: 'center',
  color: 'theme.palette.primary.main',
}));

export const BoxStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  margin: theme.spacing(0),
  padding: theme.spacing(0),
}));

export const BoxClassificationSectionStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '30%',
  backgroundColor: theme.palette.grey[100],
}));

export const BoxContentSectionStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column',
  margin: theme.spacing(1),
  padding: theme.spacing(0),
  width: '65%',
}));
