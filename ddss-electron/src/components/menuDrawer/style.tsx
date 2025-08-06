import { Box, styled } from '@mui/material';

export const BoxStyled = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
}));
