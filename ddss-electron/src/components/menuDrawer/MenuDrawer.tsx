import * as React from 'react';
import { Box, Drawer, Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import MenuIcon from '@mui/icons-material/Menu';
import { BoxStyled } from './style';
import { useNavigate } from 'react-router-dom';

export default function MenuDrawer() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const openFavoritesView = () => {
    navigate(`/favorites`);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['Favorite Queries Menu'].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={openFavoritesView}>
              <ListItemIcon>{<BookmarksIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <BoxStyled>
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </BoxStyled>
  );
}
