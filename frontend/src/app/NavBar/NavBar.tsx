import * as React from 'react';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { Button, styled } from '@mui/material';
import { Link } from 'react-router-dom';

import { AppRoute } from 'app/routes/AppRoute.enum';
import { useAppSelector } from 'hooks/useRedux';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const NavBar: React.FC = () => {
  const { isLoggedIn, user } = useAppSelector((s) => s.user);

  return (
    <>
      <CssBaseline />
      <AppBar color="primary" open={false}>
        <Toolbar>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Box display="flex" alignItems="center">
              <Typography
                variant="h6"
                sx={{ color: 'white', textDecoration: 'none' }}
                noWrap
                component={Link}
                to={AppRoute.home}
              >
                Shiai.eu
              </Typography>
            </Box>
            <Box>
              {isLoggedIn ? (
                <Box>Welcome, {user?.email}</Box>
              ) : (
                <Button component={Link} to={AppRoute.login} color="inherit">
                  Login
                </Button>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
