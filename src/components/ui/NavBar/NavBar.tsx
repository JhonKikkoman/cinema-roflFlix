import { Menu } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import {
  AppBar,
  Box,
  Container,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Slide,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useScrollTrigger,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { MOVIE_LIST, TOP_LISTS } from '../../../constant';
import { ColorModeContext } from '../../../context/ToggleColorMode';
import { listsT } from '../../../models/constants.types';
import { Icon } from '../../../utils/icon.utils';
import Search from '../Search';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { mode, toggleColorMode } = useContext(ColorModeContext);

  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setIsOpen(prev => !prev);
  };

  const trigger = useScrollTrigger({
    target: window,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar>
        <Container maxWidth="lg" disableGutters>
          <Toolbar>
            <IconButton color="inherit" onClick={handleDrawerToggle}>
              <Menu />
            </IconButton>
            <Drawer open={isOpen} onClose={handleDrawerToggle}>
              <Box sx={{ width: 250 }} onClick={handleDrawerToggle}>
                <List>
                  {TOP_LISTS.map((item: listsT) => (
                    <Link
                      key={item.title}
                      component={RouterLink}
                      to={item.url}
                      sx={{ textDecoration: 'none' }}
                    >
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <Icon iconName={item.icon} />
                          </ListItemIcon>
                          <ListItemText primary={item.title} />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  ))}
                </List>
                <Divider />
                <List>
                  {MOVIE_LIST.map((item: listsT) => (
                    <Link
                      key={item.title}
                      component={RouterLink}
                      to={item.url}
                      sx={{ textDecoration: 'none' }}
                    >
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <Icon iconName={item.icon} />
                          </ListItemIcon>
                          <ListItemText primary={item.title} />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  ))}
                </List>
                <Divider />
              </Box>
            </Drawer>
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Typography
                sx={{ color: 'white', textDecoration: 'none' }}
                variant="h5"
                component={RouterLink}
                to="/"
              >
                roflFlix
              </Typography>
              <Search />
              <Box display="flex" flexDirection="row" pr={3}>
                <Tooltip title={mode === 'light' ? 'Light' : 'Dark'}>
                  <IconButton color="inherit" onClick={toggleColorMode}>
                    {mode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
                  </IconButton>
                </Tooltip>
                <Tooltip title="Account">
                  <IconButton color="inherit" onClick={() => navigate('/auth')}>
                    <AccountCircleIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </Slide>
  );
}
