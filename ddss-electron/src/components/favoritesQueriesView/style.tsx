import { Box, List, ListItemButton, styled, Typography } from '@mui/material';

export const TitleStyled = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(1),
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.primary.main,
}));

export const ListStyled = styled(List)(({ theme }) => ({
  margin: theme.spacing(1),
  padding: theme.spacing(1),
}));

export const ListItemButtonStyled = styled(ListItemButton)(({ theme }) => ({
  margin: theme.spacing(1),
  padding: theme.spacing(1),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
}));

export const BoxContentSectionStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column',
  margin: theme.spacing(1),
  padding: theme.spacing(0),
  width: '60%',
}));
