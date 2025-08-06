import { Box, ImageListItem, Typography, styled } from '@mui/material';

export const ContainerStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  borderColor: theme.palette.secondary.main,
  borderWidth: 4,
  margin: theme.spacing(1),
}));

export const TitleStyled = styled(Typography)(({ theme }) => ({
  backgroundColor: 'hotpink',
  color: 'white',
  padding: theme.spacing(0.5),
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: '0.9rem',
  borderTopLeftRadius: 4,
  borderTopRightRadius: 4,
  minHeight: '28px',
}));


export const ImageListItemStyled = styled(ImageListItem)(() => ({
  overflow: 'hidden',
  justifyContent: 'center',
  borderRadius: 4,
  borderWidth: 1,
}));

export const ImageStyled = styled('img')({
  objectFit: 'scale-down',
  height: '250px',
});
