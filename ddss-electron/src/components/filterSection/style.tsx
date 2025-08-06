// בתוך style.tsx של filterSection
import { Box, styled } from '@mui/material';

export const BoxFilterMenuStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(2),
  justifyContent: 'flex-start',
  padding: theme.spacing(2),
}));

export const FilterColumn = styled(Box)(({ theme }) => ({
  flex: '0 0 300px',         // ⬅️ תופס 300px בדיוק, לא מתרחב
  maxWidth: 170,             // ⬅️ גבול קשיח
  minWidth: 170,
  overflow: 'hidden',
  backgroundColor: '#ffe6f0',
  padding: theme.spacing(2),
  borderRadius: 12,
}));
