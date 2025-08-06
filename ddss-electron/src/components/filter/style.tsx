import { FormControl, InputLabel, styled } from '@mui/material';

export const FormControlStyled = styled(FormControl)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column',
  marginTop: theme.spacing(2),
  padding: theme.spacing(1),
  width: '100%',
  maxWidth: 250,         // ✅ מגביל את הרוחב של כל פילטר
  overflow: 'hidden',    // ✅ חותך תוכן חורג במקום להרחיב
}));

export const InputLabelStyled = styled(InputLabel)(() => ({
  overflow: 'hidden',
  fontSize: 14,
}));
