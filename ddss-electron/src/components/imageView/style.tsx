import { Box, ImageListItem, styled } from '@mui/material';

export const ContainerStyled = styled(Box)(({ theme }) => ({
  borderColor: theme.palette.secondary.main,
  borderWidth: 4,
  margin: theme.spacing(1),
}));

export const ImageListItemStyled = styled(ImageListItem)(() => ({
  overflow: 'hidden',
  justifyContent: 'center',
}));

export const ImageStyled = styled('img')({
  display: 'flex',
  justifyItems: 'center',
  objectFit: 'scale-down',
  width: '90%',
});
