import { Box, styled } from '@mui/material';

export const BoxStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  margin: theme.spacing(0),
  padding: theme.spacing(0),
}));

export const BoxFilterSectionStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  margin: theme.spacing(1),
  padding: theme.spacing(0),
  width: '35%',
}));

export const BoxContentSectionStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column',
  margin: theme.spacing(1),
  padding: theme.spacing(0),
  width: '60%',
}));
