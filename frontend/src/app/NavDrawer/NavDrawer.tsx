import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { DarkMode, LightMode } from '@mui/icons-material';
import { Button, Switch } from '@mui/material';
import { Link } from 'react-router-dom';

import { AppRoute } from 'app/routes/AppRoute.enum';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import PageWrapper from 'components/PageWrapper';
import { logout } from 'redux/user/reducer';

import ShiaiIcon from '../../components/ShiaiIcon';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

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

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',

  borderRight: `3px solid ${theme.palette.primary.dark}`,
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const NavDrawer: React.FC<{ showSidebar?: boolean }> = ({
  children,
  showSidebar = true,
}) => {
  const { isLoggedIn, user } = useAppSelector((s) => s.user);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const changeMode = () => {
    // light to dark, vice versa
  };
  const dispatch = useAppDispatch();
  const logOut = () => {
    dispatch(logout());
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar color="primary" open={open}>
        <Toolbar>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Box display="flex" alignItems="center">
              {showSidebar && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{
                    marginRight: '36px',
                    ...(open && { display: 'none' }),
                  }}
                >
                  <MenuIcon />
                </IconButton>
              )}
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
      {showSidebar && (
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              justifyContent: 'space-between',
            }}
          >
            <List>
              {['Inbox', 'Starred', 'Send email', 'Drafts'].map(
                (text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ),
              )}
            </List>
            {isLoggedIn && (
              <>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      {theme.palette.mode === 'dark' ? (
                        <DarkMode />
                      ) : (
                        <LightMode />
                      )}
                    </ListItemIcon>
                    <ListItemText primary="Light" />
                    <Switch
                      value={theme.palette.mode === 'dark'}
                      onChange={changeMode}
                    />
                  </ListItem>

                  <ListItem button onClick={logOut}>
                    <ListItemIcon>
                      <ShiaiIcon icon="Sign-Out" />
                    </ListItemIcon>
                    <ListItemText primary="Log out" />
                  </ListItem>
                </List>
              </>
            )}
          </Box>
          <Divider />
        </Drawer>
      )}
      <Box component="main" sx={{ flexGrow: 1, overflowX: 'hidden' }}>
        <DrawerHeader />
        <PageWrapper>{children}</PageWrapper>
      </Box>
    </Box>
  );
};

export default NavDrawer;

// /*
// import React from 'react';
// import clsx from 'clsx';
// import {
//   createStyles,
//   makeStyles,
//   useTheme,
//   Theme,
// } from '@material-ui/core/styles';
// import Drawer from '@material-ui/core/Drawer';
// import List from '@material-ui/core/List';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Divider from '@material-ui/core/Divider';
// import IconButton from '@material-ui/core/IconButton';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import SportsKabaddiIcon from '@material-ui/icons/SportsKabaddi';
// import HomeIcon from '@material-ui/icons/Home';
// import EqualizerIcon from '@material-ui/icons/Equalizer';
//
// import NavBar from 'app/NavBar';
// import { AppRoute as R } from 'app/routes/AppRoute.enum';
//
// import DrawerLink from './DrawerLink';
//
// const drawerWidth = 240;
//
// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       display: 'flex',
//     },
//     appBar: {
//       zIndex: theme.zIndex.drawer + 1,
//       transition: theme.transitions.create(['width', 'margin'], {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//       }),
//     },
//     appBarShift: {
//       marginLeft: drawerWidth,
//       width: `calc(100% - ${drawerWidth}px)`,
//       transition: theme.transitions.create(['width', 'margin'], {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//     },
//     menuButton: {
//       marginRight: 36,
//     },
//     hide: {
//       display: 'none',
//     },
//     drawer: {
//       width: drawerWidth,
//       flexShrink: 0,
//       whiteSpace: 'nowrap',
//     },
//     drawerOpen: {
//       width: drawerWidth,
//       transition: theme.transitions.create('width', {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//     },
//     drawerClose: {
//       transition: theme.transitions.create('width', {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//       }),
//       overflowX: 'hidden',
//       width: theme.spacing(7) + 1,
//       [theme.breakpoints.up('sm')]: {
//         width: theme.spacing(9) + 1,
//       },
//     },
//     toolbar: {
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'flex-end',
//       padding: theme.spacing(0, 1),
//       // necessary for content to be below app bar
//       ...theme.mixins.toolbar,
//     },
//     content: {
//       flexGrow: 1,
//       padding: theme.spacing(3),
//       marginTop: '64px',
//     },
//   }),
// );
//
// const NavDrawer: React.FC = ({ children }): JSX.Element => {
//   const classes = useStyles();
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);
//
//   const toggleDrawerOpen = () => {
//     setOpen(!open);
//   };
//
//   return (
//     <div className={classes.root}>
//       <CssBaseline />
//
//       <NavBar
//         drawerToggle={toggleDrawerOpen}
//         mainClassName={clsx(classes.appBar, {
//           [classes.appBarShift]: open,
//         })}
//       />
//
//       <Drawer
//         variant="permanent"
//         className={clsx(classes.drawer, {
//           [classes.drawerOpen]: open,
//           [classes.drawerClose]: !open,
//         })}
//         classes={{
//           paper: clsx({
//             [classes.drawerOpen]: open,
//             [classes.drawerClose]: !open,
//           }),
//         }}
//       >
//         <div className={classes.toolbar}>
//           <IconButton onClick={toggleDrawerOpen}>
//             {theme.direction === 'rtl' ? (
//               <ChevronRightIcon />
//             ) : (
//               <ChevronLeftIcon />
//             )}
//           </IconButton>
//         </div>
//         <Divider />
//         <List>
//           <DrawerLink
//             icon={<SportsKabaddiIcon />}
//             to={R.competitions}
//             name="Competitions"
//           />
//           <DrawerLink icon={<HomeIcon />} to={R.clubs} name="Clubs" />
//           <DrawerLink icon={<EqualizerIcon />} to={R.results} name="Results" />
//         </List>
//         <Divider />
//         <List>
//           <DrawerLink
//             icon={<InboxIcon />}
//             to="/competitions/create"
//             name="cc"
//           />
//         </List>
//       </Drawer>
//       <main className={classes.content}>{children}</main>
//     </div>
//   );
// };
//
// export default NavDrawer;
// */
