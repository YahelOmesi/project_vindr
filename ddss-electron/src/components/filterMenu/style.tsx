import { Box, Typography, styled } from '@mui/material';

export const BoxStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column',
  width: '100%',
  margin: theme.spacing(1),
  maxWidth: 300,
  overflowWrap: 'break-word',
  whiteSpace: 'normal',
  wordBreak: 'break-word',
}));

export const BoxFilterMenuStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',         // ⬅️ שיהיו שתי עמודות זו ליד זו
  gap: theme.spacing(2),        // ⬅️ ריווח בין העמודות
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  backgroundColor: '#ffe6f0',   // ⬅️ צבע ורוד בהיר לעמודות הפילטרים
  borderRadius: 12,
}));

export const TitleStyled = styled(Typography)(({ theme }) => ({
  display: 'flex',
  textAlign: 'center',
  justifyContent: 'center',
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  padding: theme.spacing(1),
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.fontWeightBold,
  fontSize: theme.typography.h6.fontSize,
  color: theme.palette.primary.contrastText,
  backgroundColor: 'deeppink',
  borderRadius: 12,
  height: 70,
}));
