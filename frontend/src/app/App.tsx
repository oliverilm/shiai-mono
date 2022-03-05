import React, { ReactElement, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Backdrop, CircularProgress, useTheme } from '@mui/material';
import { ToastContainer } from 'react-toastify';

import AppProviders from 'providers/AppProviders';

import AppRoutes from './routes/AppRoutes';
import NavDrawer from './NavDrawer';
import BottomNav from './BottomNav';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchCompetitionsThunk } from '../redux/competition/actions';
import { fetchClubsThunk, fetchPendingUsers } from '../redux/club/actions';

import 'react-toastify/dist/ReactToastify.css';

type IApp = {
  (): ReactElement;
};

export const App: IApp = () => {
  const theme = useTheme();
  const isDrawer = useMediaQuery(theme.breakpoints.up('sm'));
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.status);

  useEffect(() => {
    dispatch(fetchCompetitionsThunk());
    dispatch(fetchClubsThunk());
    dispatch(fetchPendingUsers());
  }, [dispatch]);

  return (
    <AppProviders>
      {/* eslint-disable-next-line no-nested-ternary */}
      {loading !== 0 ? (
        <Backdrop open>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : isDrawer ? (
        <NavDrawer>
          <AppRoutes />
        </NavDrawer>
      ) : (
        <BottomNav>
          <AppRoutes />
        </BottomNav>
      )}
      <ToastContainer />
    </AppProviders>
  );
};
