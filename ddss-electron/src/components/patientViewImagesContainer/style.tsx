import { Box, ImageList, styled, Typography } from '@mui/material';

export const BoxStyled = styled(Box)(({ theme }) => ({
  width: '100%',
}));

export const ContainerStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  borderColor: theme.palette.secondary.main,
  borderWidth: 4,
  margin: theme.spacing(1),
}));

export const ContentBoxStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
}));

export const TitleStyled = styled(Typography)(({ theme }) => ({
  display: 'flex',
  margin: theme.spacing(1),
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.grey[100],
  borderRadius: 4,
}));

export const ImageListStyled = styled(ImageList)({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  borderRadius: 4,
  padding: 0,
  margin: 0,
  height: '90%',
});
