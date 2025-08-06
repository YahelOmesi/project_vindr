import { ListItemButton, styled } from '@mui/material';

export const ListItemButtonStyled = styled(ListItemButton)(({ theme }) => ({
  margin: theme.spacing(1),
  padding: theme.spacing(1),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
}));
