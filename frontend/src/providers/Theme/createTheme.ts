import type { Theme } from '@mui/material';
import { createTheme } from '@mui/material';

// full color palette : https://flatuicolors.com/palette/defo
export const shade = {
  '1000': '#000000',
  '900': '#1A1A1A',
  '800': '#333333',
  '700': '#4D4D4D',
  '600': '#666666',
  '500': '#808080',
  '400': '#999999',
  '300': '#B3B3B3',
  '200': '#CCCCCC',
  '100': '#E6E6E6',
  '50': '#F2F2F2',
  '25': '#F9F9F9',
  '0': '#FFFFFF',
} as const;
export const shadeArray = Object.values(shade);

const createBaseTheme = (isDarkMode: boolean): Theme =>
  createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: { main: '#2c3e50', light: '#34495e', dark: '#2c3e50' },
      secondary: { main: '#2980b9', light: '#3498db' },
      tertiary: { main: '#8e44ad' },
      warning: { main: '#f39c12' },
      error: { main: '#e74c3c' },
      divider: 'rgb(255,255,255,0.2)',
      shade,
    },
    components: {
      MuiDivider: {
        styleOverrides: {
          root: {
            background: '#d4d4d4',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: '#2c3e50 !important',
            color: 'white !important',
          },
        },
      },
    },
  });

export default createBaseTheme;
