import { Theme, useMediaQuery } from '@mui/material';
import { useEffect, useMemo } from 'react';

import { useDarkModeDispatch } from '../../stores/darkMode/store';
import createTheme from '../createTheme';

const useTheme = (): Theme => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const dispatch = useDarkModeDispatch();
  const isDarkMode = false;
  // const isDarkMode = useDarkMode();
  const theme = useMemo(() => createTheme(isDarkMode), [isDarkMode]);

  useEffect(() => {
    dispatch(prefersDarkMode);
  }, [dispatch, prefersDarkMode]);

  return theme;
};

export default useTheme;
