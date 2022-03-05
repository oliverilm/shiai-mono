import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { DarkModeProvider } from './stores/darkMode/store';
import ErrorBoundary from './ErrorBoundary';
import Language from './Language';
import ThemeProvider from './Theme';
import { useAppDispatch } from '../hooks/useRedux';
import { initUserDataThunk } from '../redux/user/actions';

const AppProviders: React.FC = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initUserDataThunk());
  }, [dispatch]);
  return (
    <Language>
      <DarkModeProvider>
        <ThemeProvider>
          <ErrorBoundary>
            <Router>{children}</Router>
          </ErrorBoundary>
        </ThemeProvider>
      </DarkModeProvider>
    </Language>
  );
};

export default AppProviders;
